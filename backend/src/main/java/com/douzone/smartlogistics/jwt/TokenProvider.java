package com.douzone.smartlogistics.jwt;

import java.security.Key;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Base64;
import java.util.Collection;
import java.util.Date;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import com.douzone.smartlogistics.service.JwtTokenService;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.security.Keys;

@Service
public class TokenProvider implements InitializingBean {
	@Autowired
	private JwtTokenService jwtTokenService;
	
	private final Logger LOGGER = LoggerFactory.getLogger(TokenProvider.class);

	private static final String AUTHORITIES_KEY = "jwt";

	private final String secret;
	private final long tokenValidityInMilliseconds;
	private Key key;

	public TokenProvider(@Value("${jwt.secret}") String secret,
			@Value("${jwt.token-validity-in-seconds}") long tokenValidityInMilliseconds) {
		this.secret = secret;
		this.tokenValidityInMilliseconds = tokenValidityInMilliseconds;
	}

	@Override
	public void afterPropertiesSet() throws Exception {
		byte[] keyBytes = Base64.getDecoder().decode(secret);
		this.key = Keys.hmacShaKeyFor(keyBytes);
	}

	
	
	/** token 생성 algorithm */
	public String[] createToken(Authentication authentication) {
		String authorities = authentication.getAuthorities().stream().map(GrantedAuthority::getAuthority)
				.collect(Collectors.joining(","));

		long subTime = 1000 * 60 * 60 * 24 *7;
		
		long now = (new Date()).getTime();
		Date validity = new Date(now + this.tokenValidityInMilliseconds);
		Date refreshValidity = new Date(now + subTime);
		System.out.println("validity"+validity);
		System.out.println("refreshValidity"+refreshValidity);

		
		String jwt = Jwts.builder().setSubject(authentication.getName()).claim(AUTHORITIES_KEY, authorities)
				.signWith(key, SignatureAlgorithm.HS512).setExpiration(validity).compact();
		
		
		String refresh = Jwts.builder().setSubject(authentication.getName()).claim(AUTHORITIES_KEY, authorities)
				.signWith(key, SignatureAlgorithm.HS512).setExpiration(refreshValidity).compact();

		String[] str = {jwt,refresh};
		jwtTokenService.saveToken(jwt, refresh);
		
		return str;
	}

	/** 인증 정보 조회 */
	public Authentication getAuthentication(String[] jwt)throws ServletException {
		//jwt로 access와 refresh를 받아오는데
		//만약 access토큰이 만료인데 refresh가 null이면 refresh받아오게 팅궈내기
		if(!validateToken(jwt[0])) {
			if(jwt[1]==null) {
				return null;
			}
		}
		//refresh가 null이아니면 access토큰으로 검색해서 refresh가 일치하면 refresh의 Authentication를 리턴하고,
		//access와 일치하는 refresh 토큰 쌍이 없다면, null 리턴
		//무한루프 돌지 않게 refresh 재발급하는 api에서 리턴값이 null이면 토큰에러로 재로그인하란 메시지 보내줘야함
		String refresh = jwtTokenService.getToken(jwt[0]);
		System.out.println("refresh토큰:"+refresh);
		if(refresh==null) {
			return null;
		}
		//여기까지오면 access토큰의 Authentication인지 refresh토큰의 Authentication인지만 리턴하면 됨
		String token = jwt[0];
		if(refresh.equals(jwt[1])) {
			token = refresh;
		}
		
		Claims claims = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody();

		
		Collection<? extends GrantedAuthority> authorities = Arrays
				.stream(claims.get(AUTHORITIES_KEY).toString().split(",")).map(SimpleGrantedAuthority::new)
				.collect(Collectors.toList());
		
		User principal = new User(claims.getSubject(), "", authorities);
		return new UsernamePasswordAuthenticationToken(principal, token, authorities);
	}

	/** 토큰 정보 추출 */
	public String[] resolveToken(HttpServletRequest request) {
		String[] header = {"Authorization","refresh"};
		
		String[] jwt = new String[2];
		for(int i=0;jwt.length>i;i++) {
			jwt[i] = request.getHeader(header[i]);
			if (StringUtils.hasText(jwt[i]) && jwt[i].startsWith("Bearer ")) {
				jwt[i]= jwt[i].substring(7);
			}
		}
		return jwt;
	}

	/** token 유효성 검증 */
	public boolean validateToken(String token) {
		try {
			Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
			return true;
		} catch (io.jsonwebtoken.security.SecurityException | MalformedJwtException e) {
			LOGGER.info("잘못된 JWT 서명입니다.");
		} catch (ExpiredJwtException e) {
			LOGGER.info("만료된 JWT 토큰입니다.");
		} catch (UnsupportedJwtException e) {
			LOGGER.info("지원하지 않는 JWT 토큰입니다.");
		} catch (IllegalArgumentException e) {
			LOGGER.info("JWT 토큰이 잘못되었습니다.");
		}
		return false;
	}
	
	/** 인증정보 삭제**/
	public boolean removeToken(String token) {
		return jwtTokenService.deleteToken(token);
	}
	
}
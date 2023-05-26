package com.douzone.smartlogistics.jwt;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.GenericFilterBean;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class JwtFilter extends GenericFilterBean {

	private static final Logger LOGGER = LoggerFactory.getLogger(JwtFilter.class);
	public static final String AUTHORIZATION_HEADER = "Authorization";

	private final TokenProvider tokenProvider;

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {
		HttpServletRequest httpServletRequest = (HttpServletRequest) request;
		String[] jwt = tokenProvider.resolveToken( httpServletRequest);
		String requestURI = httpServletRequest.getRequestURI();
		System.out.println("필터uri"+requestURI);
		if (jwt!=null) {
			Authentication authentication = tokenProvider.getAuthentication(jwt);

			if (authentication != null) {
				SecurityContextHolder.getContext().setAuthentication(authentication);
				LOGGER.info("Security Context에 '{}' 인증 정보를 저장했습니다, uri: {}", authentication.getName(), requestURI);
			} else {
				LOGGER.info("인증정보가 없습니다, uri: {}", requestURI);
			}

		} else {
			LOGGER.info("유효한 JWT 토큰이 없습니다., uri: {}", requestURI);
		}
		chain.doFilter(httpServletRequest, response);
	}

}
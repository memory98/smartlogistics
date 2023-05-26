package com.douzone.smartlogistics.vo;

import java.util.ArrayList;
import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import lombok.Data;

@Data
public class CustomUserDetailes implements UserDetails{

	private final UserVo uservo;
	
	public CustomUserDetailes(UserVo uservo) {
		this.uservo = uservo;
	}
	
	//해당유저 권한 리턴
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities(){
		Collection<GrantedAuthority> authorities = new ArrayList<>();
		authorities.add(new GrantedAuthority(){
			@Override
			public String getAuthority() {
				return uservo.getRole();
			}
		});
		return authorities;
	}
	
	@Override
	public String getPassword() {
		return uservo.getPassword();
	}
	
	@Override
	public String getUsername() {
		return uservo.getId();
	}
	
	@Override
	public boolean isAccountNonExpired() {
		return true;
	}
	
	@Override
	public boolean isAccountNonLocked() {
		return true;
	}
	
	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}
	
	@Override
	public boolean isEnabled() {
		return true;
	}
}

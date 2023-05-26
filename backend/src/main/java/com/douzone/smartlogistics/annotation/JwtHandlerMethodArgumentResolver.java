package com.douzone.smartlogistics.annotation;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.MethodParameter;
import org.springframework.web.bind.support.WebArgumentResolver;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

import com.douzone.smartlogistics.jwt.TokenProvider;

public class JwtHandlerMethodArgumentResolver implements HandlerMethodArgumentResolver{

	@Autowired
	private TokenProvider tokenProvider;
	
	@Override
	public Object resolveArgument(MethodParameter parameter, ModelAndViewContainer mavContainer,
			NativeWebRequest webRequest, WebDataBinderFactory binderFactory) throws Exception {

		if (!supportsParameter((parameter))) {
			return WebArgumentResolver.UNRESOLVED;
		}
//		HttpServletRequest httpServletRequest = (HttpServletRequest)webRequest.getNativeRequest();
	    HttpServletRequest httpServletRequest = webRequest.getNativeRequest(HttpServletRequest.class);
		String[] str = tokenProvider.resolveToken(httpServletRequest);
	    
	    return str;
	}

	@Override
	public boolean supportsParameter(MethodParameter parameter) {
		Jwt logData = parameter.getParameterAnnotation(Jwt.class);
		// @DBLog가 안붙어 있으면
		if(logData == null) {
			return false;
		}
		return true;
	}
	
}

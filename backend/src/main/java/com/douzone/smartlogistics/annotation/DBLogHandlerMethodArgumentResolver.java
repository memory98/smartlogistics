package com.douzone.smartlogistics.annotation;

import javax.servlet.http.HttpServletRequest;

import org.springframework.core.MethodParameter;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.support.WebArgumentResolver;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

import com.douzone.smartlogistics.util.DateUtil;
import com.douzone.smartlogistics.util.IpUtil;
import com.douzone.smartlogistics.vo.DBLogVo;

public class DBLogHandlerMethodArgumentResolver implements HandlerMethodArgumentResolver {

	@Override
	public Object resolveArgument(MethodParameter parameter, ModelAndViewContainer mavContainer,
			NativeWebRequest webRequest, WebDataBinderFactory binderFactory) throws Exception {

		if (!supportsParameter((parameter))) {
			return WebArgumentResolver.UNRESOLVED;
		}
		HttpServletRequest request = (HttpServletRequest)webRequest.getNativeRequest();

		User principal = (User)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		String username = principal.getUsername();
		DBLogVo logdata = null;
		if(username!=null) {
			logdata = new DBLogVo(username, new IpUtil().getClientIp(request),new DateUtil().getCurrentTimeHMS());
		}
		return logdata;
	}

	@Override
	public boolean supportsParameter(MethodParameter parameter) {
		DBLog logData = parameter.getParameterAnnotation(DBLog.class);
		// @DBLog가 안붙어 있으면
		if(logData == null) {
			return false;
		}
		
		// 파라미터 타입이 DBLogVo
		if(!parameter.getParameterType().equals(DBLogVo.class)) {
			return false;
		}
			return true;
	}
}

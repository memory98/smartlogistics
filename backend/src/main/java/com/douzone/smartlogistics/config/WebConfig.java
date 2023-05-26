package com.douzone.smartlogistics.config;

import java.util.List;

import org.springframework.boot.SpringBootConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.douzone.smartlogistics.annotation.DBLogHandlerMethodArgumentResolver;
//import com.douzone.smartlogistics.filter.RequestFilter;
import com.douzone.smartlogistics.annotation.JwtHandlerMethodArgumentResolver;

@SpringBootConfiguration
public class WebConfig implements WebMvcConfigurer {

	// argument resolver
	@Bean
	public HandlerMethodArgumentResolver handlerMethodArgumentResolver() {
		return new DBLogHandlerMethodArgumentResolver();
	}

	@Bean
	public HandlerMethodArgumentResolver jwthandlerMethodArgumentResolver() {
		return new JwtHandlerMethodArgumentResolver();
	}
	
	@Override
	public void addArgumentResolvers(List<HandlerMethodArgumentResolver> resolvers) {
		resolvers.add(handlerMethodArgumentResolver());
		resolvers.add(jwthandlerMethodArgumentResolver());
	}
	
	
	
//	@Bean
//    public FilterRegistrationBean<RequestFilter> RequestFilter(){
//        FilterRegistrationBean bean = new FilterRegistrationBean();
//        bean.setFilter(new RequestFilter());
//        bean.setUrlPatterns(Arrays.asList("/api/user/login")); //api/user/login 요청으로 오는 애들만 필러링
//        return bean;
//}
	
}

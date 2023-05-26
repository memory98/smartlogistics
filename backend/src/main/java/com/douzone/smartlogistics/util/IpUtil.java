package com.douzone.smartlogistics.util;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.util.StringUtils;

public class IpUtil {
	
	private String clientIp;
	
	
	public String getClientIp(HttpServletRequest request) {
		System.out.println("request.getRemoteAddr()");
		System.out.println(request.getRemoteAddr());
	    boolean isIpInHeader = false;

	    List<String> headerList = new ArrayList<>();
	    headerList.add("X-Forwarded-For");
	    headerList.add("HTTP_CLIENT_IP");
	    headerList.add("HTTP_X_FORWARDED_FOR");
	    headerList.add("HTTP_X_FORWARDED");
	    headerList.add("HTTP_FORWARDED_FOR");
	    headerList.add("HTTP_FORWARDED");
	    headerList.add("Proxy-Client-IP");
	    headerList.add("WL-Proxy-Client-IP");
	    headerList.add("HTTP_VIA");
	    headerList.add("IPV6_ADR"); // IPv6 주소 추가

	    for (String header : headerList) {
	        clientIp = request.getHeader(header);
	        if (StringUtils.hasText(clientIp) && !clientIp.equals("unknown")) {
	            isIpInHeader = true;
	            break;
	        }
	    }

	    if (!isIpInHeader) {
	        clientIp = request.getRemoteAddr();
	    } else {
	        // X-Forwarded-For 헤더에서 IPv6 주소 추출
	        String[] ips = clientIp.split(",");
	        if (ips.length > 1) {
	            clientIp = ips[ips.length - 1].trim();
	        }
	    }

	    return clientIp;
	}
}
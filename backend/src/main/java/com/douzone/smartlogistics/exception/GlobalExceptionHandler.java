package com.douzone.smartlogistics.exception;

import java.io.PrintWriter;
import java.io.StringWriter;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

import com.douzone.smartlogistics.dto.JsonResult;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@ControllerAdvice
public class GlobalExceptionHandler {
	
//	@ExceptionHandler(AuthenticationException.class)
//    public ResponseEntity<JsonResult> handleAuthenticationException(AuthenticationException e) {
//    	System.out.println("인증정보 오류입니다.");
//    	return ResponseEntity.status(HttpStatus.OK).body(JsonResult.fail("인증정보 오류입니다."));
//    }
//
//    @ExceptionHandler(AccessDeniedException.class)
//    public ResponseEntity<JsonResult> handleAccessDeniedException(AccessDeniedException e) {
//    	System.out.println("권한이 없습니다.");
//    	return ResponseEntity.status(HttpStatus.OK).body(JsonResult.fail("권한이 없습니다."));
//    }
	
	@ExceptionHandler(Exception.class)
	@ResponseBody
	public ResponseEntity<JsonResult> ExceptionHandler(Exception e) throws Exception {
		//1. 로깅
		StringWriter errors = new StringWriter();
		e.printStackTrace(new PrintWriter(errors));
//		log.error(e.getMessage());
		System.out.println(e.getMessage());		
		System.out.println(errors);
		
		//2. JSON 응답
		return ResponseEntity.status(HttpStatus.OK).body(JsonResult.fail(e.getMessage()));
	}
}

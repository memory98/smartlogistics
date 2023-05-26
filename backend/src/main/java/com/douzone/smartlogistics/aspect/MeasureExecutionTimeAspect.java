package com.douzone.smartlogistics.aspect;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Component;
import org.springframework.util.StopWatch;

@Component
@Aspect
public class MeasureExecutionTimeAspect {
	
	@Around("execution(* *..*.repository.*.*(..)) || execution(* *..*.service.*.*(..)) || execution(* *..*.controller.*.*(..))")	/* com.douzone.mysite.repository.class명.function명(parameter) */
	public Object adviceAround(ProceedingJoinPoint pjp) throws Throwable {
		
		/* Before */
		StopWatch sw = new StopWatch();
		sw.start();
		
		Object result = pjp.proceed();
		
		/* After */
		sw.stop();
		Long totalTime = sw.getTotalTimeMillis();
		String className = pjp.getTarget().getClass().getName();
		String methodName = pjp.getSignature().getName();
		String taskName = className + "." + methodName;
		
		System.out.println("=====[Exection Time] [" + taskName + "] - " + totalTime + " milis=====");
		
		return result;
	}
}

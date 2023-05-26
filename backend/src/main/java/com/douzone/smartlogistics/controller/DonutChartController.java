package com.douzone.smartlogistics.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.douzone.smartlogistics.annotation.DBLog;
import com.douzone.smartlogistics.dto.JsonResult;
import com.douzone.smartlogistics.service.DonutService;
import com.douzone.smartlogistics.vo.DBLogVo;

@PreAuthorize("hasAuthority('user')")
@RestController
@RequestMapping("/api/donut")
public class DonutChartController {
	@Autowired
	private DonutService donutService;

	@GetMapping("/receive")
	public ResponseEntity<JsonResult> readProduct(@DBLog DBLogVo logVO) {
		logVO.setDt(logVO.getDt().substring(0, logVO.getDt().indexOf(" ")));
		Map<String, Object> map = Map.of("log",logVO);
		return ResponseEntity.status(HttpStatus.OK)
				.body(JsonResult.success(donutService.findByReceive(map)));
	}

}

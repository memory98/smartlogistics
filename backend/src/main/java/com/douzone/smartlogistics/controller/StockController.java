package com.douzone.smartlogistics.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.douzone.smartlogistics.dto.JsonResult;
import com.douzone.smartlogistics.service.StockService;
import com.douzone.smartlogistics.util.DateUtil;
import com.douzone.smartlogistics.vo.StockVo;

@RestController
@RequestMapping("/api/inquiry")
public class StockController {

	@Autowired
	private StockService stockService;

	@GetMapping("list")
	public ResponseEntity<JsonResult> list(
			@RequestParam(value = "offset", required = true, defaultValue = "0") Long offset,
			@RequestParam(value = "limit", required = true, defaultValue = "0") Long limit,
			@RequestParam(value = "sdt", required = true, defaultValue = "") String startDate,
			@RequestParam(value = "edt", required = true, defaultValue = "") String endDate,
			@RequestParam(value = "st", required = true, defaultValue = "ALL") String st,
			@RequestParam(value = "user_name", required = true, defaultValue = "") String user_name,
			@RequestParam(value = "business_name", required = true, defaultValue = "") String business_name,
			@RequestParam(value = "code", required = true, defaultValue = "") String code) {
	if(offset <0) offset =0L;
		System.out.println("inquiry method 실행!!!!");
		System.out.println(offset+","+startDate+","+endDate+","+st+","+user_name+","+business_name+","+code);
		if (!startDate.equals("") && endDate.equals("")) {
			// startDate만 선택했을 시
			endDate = startDate;
		}
		if (startDate.equals("")) {
			// 첫페이지(-7~오늘날짜~+7) => 2주치의 데이터 가져올 날짜
			startDate = DateUtil.minusDays(6);
			endDate = DateUtil.addDays(6);
		}
		
		
		System.out.println(startDate+"///"+endDate);
		System.out.println(offset+"///"+limit);

		return ResponseEntity.status(HttpStatus.OK).body(JsonResult.success(stockService.findByKeyword(offset,limit, user_name, business_name, st, code, startDate, endDate)));
	}

	@PostMapping("graph")
	public ResponseEntity<JsonResult> graph(
			@RequestParam(value = "state", required = true, defaultValue = "") String state,
			@RequestParam(value = "startDate", required = true, defaultValue = "") String startDate) throws Exception {
		System.out.println("state : " + state);
		System.out.println("startDate : " + startDate);

		return ResponseEntity.status(HttpStatus.OK)
				.body(JsonResult.success(stockService.getGraphData(state, startDate)));
	}
}

package com.douzone.smartlogistics.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.douzone.smartlogistics.annotation.DBLog;
import com.douzone.smartlogistics.dto.JsonResult;
import com.douzone.smartlogistics.service.ModalReceiveService;
import com.douzone.smartlogistics.util.DateUtil;
import com.douzone.smartlogistics.vo.DBLogVo;
import com.douzone.smartlogistics.vo.ModalReceiveDetailVo;
import com.douzone.smartlogistics.vo.ModalReceiveMasterVo;
import com.douzone.smartlogistics.vo.ModalReleaseMasterVo;

@RestController
@RequestMapping("/api/modalreceive")
public class ModalReceiveController {

	@Autowired
	private ModalReceiveService modalreceiveService;

	// receive select masterList
	
	
	@GetMapping("/list")
	public ResponseEntity<JsonResult> readReceive(
			@RequestParam(value = "rc", required = true, defaultValue = "") String receiveCode,
			@RequestParam(value = "bn", required = true, defaultValue = "") String businessName,
			@RequestParam(value = "sdt", required = true, defaultValue = "") String startDate,
			@RequestParam(value = "edt", required = true, defaultValue = "") String endDate) {
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
		
		return ResponseEntity.status(HttpStatus.OK)
				.body(JsonResult.success(modalreceiveService.findByKeyword(receiveCode, businessName, startDate, endDate)));
	}

	// receive select detailList
	@GetMapping("/detail")
	public ResponseEntity<JsonResult> readReceive(
			@RequestParam(value = "rc", required = true, defaultValue = "") String receiveCode) {
		System.out.println("detail" + receiveCode);
		for (ModalReceiveDetailVo vo : modalreceiveService.findByMasterNo(receiveCode)) {
			System.out.println("detail: " + vo);
		}
		return ResponseEntity.status(HttpStatus.OK)
				.body(JsonResult.success(modalreceiveService.findByMasterNo(receiveCode)));
	}
	


}

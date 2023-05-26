package com.douzone.smartlogistics.controller;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.douzone.smartlogistics.annotation.DBLog;
import com.douzone.smartlogistics.dto.JsonResult;
import com.douzone.smartlogistics.service.BusinessService;
import com.douzone.smartlogistics.vo.BusinessVo;
import com.douzone.smartlogistics.vo.DBLogVo;
@PreAuthorize("hasAuthority('user')")
@RestController
@RequestMapping("/api/business")
public class BusinessController {
	
	@Autowired
	private BusinessService businessService;
	
	@GetMapping("")
	public ResponseEntity<JsonResult> list() {
		return ResponseEntity.status(HttpStatus.OK).body(JsonResult.success(businessService.getBusinessList()));
	}
	
	@PostMapping("/search")
	public ResponseEntity<JsonResult> searchBusinessList(
			@RequestParam(value = "offset", required = true, defaultValue = "0") Long offset,
			@RequestParam(value = "limit", required = true, defaultValue = "0") Long limit,
			@RequestBody BusinessVo businessVo) {
		System.out.println(offset+"/"+limit+"/"+businessVo);
		Map<String, Object> map = Map.of("vo",businessVo,"offset",offset,"limit",limit);
		for(BusinessVo vo:businessService.getBusinessListByKeyword(map)) {
			
			System.out.println(vo);
		}
		return ResponseEntity.status(HttpStatus.OK)
				.body(JsonResult
				.success(businessService.getBusinessListByKeyword(map)));
	}
	
	@PostMapping("/add")
	public ResponseEntity<JsonResult> add(@RequestBody BusinessVo vo, @DBLog DBLogVo logVo) {
		String state="false";
		BusinessVo businessVo = businessService.findByCode(vo.getCode());
		
		if (businessService.findByCode(vo.getCode()) == null) {
		state="true";
		businessVo = vo;
		businessService.addBusinessItem(vo, logVo);
		}
		Map<String, Object> map = Map.of("vo", businessVo, "state", state);
		return ResponseEntity.status(HttpStatus.OK).body(JsonResult.success(map));
	}
	
	@GetMapping("/detail")
	public ResponseEntity<JsonResult> readBusiness(
			@RequestParam(value = "bc", required = true, defaultValue = "") String businessCode) {
		return ResponseEntity.status(HttpStatus.OK).body(JsonResult.success(businessService.findByCode(businessCode)));
	}
	@PostMapping("/update")
	public ResponseEntity<JsonResult> updateBusiness(
			@RequestParam(value = "bc", required = true, defaultValue = "") String businessCode,@RequestBody BusinessVo vo, @DBLog DBLogVo logVo) {
		return ResponseEntity.status(HttpStatus.OK).body(JsonResult.success(businessService.updateByCode(businessCode,vo, logVo)));
	}
	
	@PostMapping("/delete")
	public ResponseEntity<JsonResult> deleteBusiness(@RequestBody List<String> deleteItem) {
		boolean result = businessService.deleteItem(deleteItem);
		return ResponseEntity.status(HttpStatus.OK).body(JsonResult.success(result ? deleteItem : null));
	}
}
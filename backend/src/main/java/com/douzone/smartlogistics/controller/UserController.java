package com.douzone.smartlogistics.controller;

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
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import com.douzone.smartlogistics.annotation.DBLog;
import com.douzone.smartlogistics.dto.JsonResult;
import com.douzone.smartlogistics.service.FileUploadService;
import com.douzone.smartlogistics.service.UserService;

import com.douzone.smartlogistics.vo.BusinessVo;
import com.douzone.smartlogistics.vo.DBLogVo;
import com.douzone.smartlogistics.vo.ProductVo;

import com.douzone.smartlogistics.vo.UserVo;


//@PreAuthorize("hasAuthority('admin')")
@RestController
@RequestMapping("/api/user")
public class UserController {
	
	@Autowired
	
	private UserService userService;
	@Autowired
	private FileUploadService FileUploadService;
	
	
	@GetMapping("list")
	public ResponseEntity<JsonResult> readUser(
			@RequestParam(value = "offset", required = true, defaultValue = "0") Long offset,
			@RequestParam(value = "limit", required = true, defaultValue = "0") Long limit,
			@RequestParam(value = "uk", required = true, defaultValue = "") String Userkeywd,
			@RequestParam(value = "up", required = true, defaultValue = "") String UserPhone) {
		
		 System.out.println(Userkeywd+":"+UserPhone);
		 System.out.println(offset + ":" + limit);

		Map<String, Object> map = Map.of("ukeywd",Userkeywd,"uphone",UserPhone,"offset",offset,"limit",limit);
		System.out.println(userService.findByKeyword(map));
		return ResponseEntity.status(HttpStatus.OK)
				.body(JsonResult.success(userService.findByKeyword(map)));
	}
	@GetMapping("modallist")
	public ResponseEntity<JsonResult> readUserModal(
			@RequestParam(value = "offset", required = true, defaultValue = "0") Long offset,
			@RequestParam(value = "limit", required = true, defaultValue = "0") Long limit,
			@RequestParam(value = "uk", required = true, defaultValue = "") String Userkeywd,
			@RequestParam(value = "up", required = true, defaultValue = "") String UserPhone) {
		
		 System.out.println(Userkeywd+":"+UserPhone);
		 System.out.println(offset + ":" + limit);		 
		Map<String, Object> map = Map.of("ukeywd",Userkeywd,"uphone",UserPhone,"offset",offset,"limit",limit);
		System.out.println(userService.findUserModalByKeyword(map));
		return ResponseEntity.status(HttpStatus.OK)
				.body(JsonResult.success(userService.findUserModalByKeyword(map)));
	}
	
	
	@GetMapping("/detail")
	public ResponseEntity<JsonResult> readUser(
			@RequestParam(value = "uc", required = true, defaultValue = "") String id) {
		System.out.println(id);
		return ResponseEntity.status(HttpStatus.OK).body(JsonResult.success(userService.findByCode(id)));
	}
	
	@PostMapping("/update")
	public ResponseEntity<JsonResult> updateUser(
			@RequestParam(value = "uc", required = true, defaultValue = "") String userCode,@RequestBody UserVo vo,@DBLog DBLogVo logVO) {
		System.out.println("vo출력");
		System.out.println(vo.getPassword());
		return ResponseEntity.status(HttpStatus.OK).body(JsonResult.success(userService.updateByCode(userCode,vo,logVO)));
	}

	@PostMapping("/updateprofile")
	public ResponseEntity<JsonResult> updateUser(
			@RequestParam(value = "uc", required = true, defaultValue = "") String userCode,UserVo vo,	@RequestParam(value="file", required=false) MultipartFile file,@DBLog DBLogVo logVO) {
		System.out.println("------"+vo);
		System.out.println(file);
		vo.setProfile(file==null?"":FileUploadService.restoreImage(file));
		System.out.println("------"+vo);
		JsonResult.success(userService.updateMypageByCode(userCode,vo,logVO));
		return ResponseEntity.status(HttpStatus.OK).body(JsonResult.success(vo));
	}
	
	//argument에서 읽어서 합친 후 파라미터를 @AuthUser UserVo 하나만 할 지
	@PostMapping("")
	public ResponseEntity<JsonResult> add(
			UserVo userVo,
			@RequestPart(value="file", required=false) MultipartFile file,
			@DBLog DBLogVo authUser) {
		System.out.println("파일 넘어오나! " + file);
		System.out.println("userVo "+ userVo);
		System.out.println("authUser : "+authUser);
		userVo.setInsert_id(authUser.getId());
		userVo.setInsert_ip(authUser.getIp());
		userVo.setInsert_dt(authUser.getDt());
		userVo.setProfile(FileUploadService.restoreImage(file));

		if(userService.getUserfindByIdDuplicate(userVo.getId())!=null) {
			System.out.println(userService.getUserfindByIdDuplicate(userVo.getId()));
			return ResponseEntity.status(HttpStatus.OK).body(JsonResult.fail("중복된 아이디입니다."));
		}
		
		userService.addUser(userVo);
		userVo.setPassword(null);
		return ResponseEntity.status(HttpStatus.OK).body(JsonResult.success(userVo));
	}
	
	@PostMapping("/delete")
	public ResponseEntity<JsonResult> deleteUser(@RequestBody String[] data) {
		return ResponseEntity.status(HttpStatus.OK).body(JsonResult.success(userService.deleteUsers(data)));
	}
	
}
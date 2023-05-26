package com.douzone.smartlogistics.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class LandingController {

	@RequestMapping({ "", "/receive", "/release", "/product", "/business", "/mypage", "/inquiry" })
	public String index() {
		return "index";
	}

	@GetMapping("favicon.ico")
	@ResponseBody
	public void returnNoFavivon() {
	}
}

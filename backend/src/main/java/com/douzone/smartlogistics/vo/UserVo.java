package com.douzone.smartlogistics.vo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class UserVo {
	private String id;
	private String password;
	private String name;
	private String profile;
	private String phone;
	private String role;
	private String insert_id;
	private String insert_ip;
	private String insert_dt;
	private String update_id;
	private String update_ip;
	private String update_dt;
	private String code;
    private String size;
    private String unit;
	
	
}
package com.douzone.smartlogistics.vo;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
//기본생성자
@NoArgsConstructor
//모든 파라미터 생성자
@AllArgsConstructor
public class DBLogVo {
	private String id;
	private String ip;
	private String dt;
}

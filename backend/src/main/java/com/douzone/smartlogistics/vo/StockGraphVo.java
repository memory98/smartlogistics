package com.douzone.smartlogistics.vo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class StockGraphVo {
	private String state;
	private String date;
	private Long count;
}

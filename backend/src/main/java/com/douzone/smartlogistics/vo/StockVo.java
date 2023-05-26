package com.douzone.smartlogistics.vo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class StockVo {
	private String code;
	private String date;
	private String state;
	private String productCode;
	private String productName;
	private String userName;
	private String businessName;
	private String size;
	private String unit;
	private Long count;
	private Long beginningStock;
	private Long endingStock;
}
package com.douzone.smartlogistics.vo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class StatisticsVo {
	private String totalCount;
    private String todayCount;
    private String oldestCode;
    private String oldestDate;
    private String latestCode;
	private String latestDate;
	
}

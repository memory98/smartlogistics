package com.douzone.smartlogistics.vo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ReleaseDetailVo {
    private long no;
    private String masterCode;
    private String productCode;
    private String productName;
    private String productSize;
    private String productUnit;
    private String receiveCode;
    private String receiveDetailNo;
    private int count;
    private int stockCnt;
    
    private DBLogVo log;
}

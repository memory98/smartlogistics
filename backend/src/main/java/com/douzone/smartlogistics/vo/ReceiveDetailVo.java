package com.douzone.smartlogistics.vo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ReceiveDetailVo {
    private long no;
    private String masterCode;
    private String productCode;
    private String productName;
    private String productSize;
    private String productUnit;
    private int receiveCount;
    private int releaseCount;
    private int stockCount;
    private String state;
    
    private DBLogVo log;
}

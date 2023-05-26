package com.douzone.smartlogistics.vo;

import java.util.List;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ReceiveMasterVo {
    private String code;
    private String date;
    private String userName;
    private String userId;
    private String userExit;
    private String businessCode;
    private String businessName;
    private String state;
    private String disable;
    private Long totalCount;
    
    private List<ReceiveDetailVo> receiveDetails;
    
    
    
}

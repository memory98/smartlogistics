package com.douzone.smartlogistics.vo;

import java.util.List;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ReleaseMasterVo {
    private String code;
    private String date;
    private String userName;
    private String userId;
    private String businessCode;
    private String businessName;
    
    private List<ReleaseDetailVo> releaseDetails;
    
    
}

package com.douzone.smartlogistics.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.douzone.smartlogistics.annotation.DBLog;
import com.douzone.smartlogistics.repository.BusinessRepository;
import com.douzone.smartlogistics.vo.BusinessVo;
import com.douzone.smartlogistics.vo.DBLogVo;

@Service
public class BusinessService {

	@Autowired
	private BusinessRepository businessRepository;
	
	public List<BusinessVo> getBusinessList() {
		return businessRepository.findAll();
	}
	
	public List<BusinessVo> getBusinessListByKeyword(Map<String, Object> map) {
		return businessRepository.findAllByKeyword(map);
	}

	public boolean addBusinessItem(BusinessVo vo, DBLogVo logVo) {
		return businessRepository.insert(vo, logVo);
		
	}
	
	public BusinessVo findByCode(String businessCode) {
		return businessRepository.findByCode(businessCode);
	}

	public int updateByCode(String businessCode, BusinessVo vo, DBLogVo logVo) {
		return  businessRepository.updateByCode(businessCode, vo, logVo);
	}

	public boolean deleteItem(List<String> deleteItem) {
		int receiveLength = businessRepository.checkInReceive(deleteItem).size();
		int releaseLength = businessRepository.checkInRelease(deleteItem).size();
		
		return (receiveLength > 0 || releaseLength > 0) ? false : businessRepository.delete(deleteItem);
	}

}

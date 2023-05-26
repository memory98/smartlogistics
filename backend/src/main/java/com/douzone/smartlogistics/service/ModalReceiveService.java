package com.douzone.smartlogistics.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.douzone.smartlogistics.repository.ModalReceiveRepository;
import com.douzone.smartlogistics.vo.DBLogVo;
import com.douzone.smartlogistics.vo.ModalReceiveDetailVo;
import com.douzone.smartlogistics.vo.ModalReceiveMasterVo;

@Service
@Transactional
public class ModalReceiveService {

	@Autowired
	private ModalReceiveRepository modalreceiveRepository;

	public List<ModalReceiveMasterVo> findByKeyword(String receiveCode, String businessName,String startDate, String endDate) {
		return modalreceiveRepository.findByKeyword(receiveCode, businessName,startDate, endDate);
	}

	public List<ModalReceiveDetailVo> findByMasterNo(String receiveCode) {
		return modalreceiveRepository.findByMasterNo(receiveCode);
	}
	

}

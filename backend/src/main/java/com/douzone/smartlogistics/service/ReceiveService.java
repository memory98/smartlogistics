package com.douzone.smartlogistics.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.douzone.smartlogistics.repository.ReceiveRepository;
import com.douzone.smartlogistics.vo.DBLogVo;
import com.douzone.smartlogistics.vo.ReceiveDetailVo;
import com.douzone.smartlogistics.vo.ReceiveMasterVo;
import com.douzone.smartlogistics.vo.StatisticsVo;

@Service
@Transactional
public class ReceiveService {

	@Autowired
	private ReceiveRepository receiveRepository;

	public List<ReceiveMasterVo> findByKeyword(String receiveCode, String businessName,String startDate, String endDate,Long offset,Long limit) {
		return receiveRepository.findByKeyword(receiveCode, businessName,startDate, endDate,offset,limit);
	}
	
	public List<ReceiveMasterVo> modalfindByKeyword(String receiveCode, String businessName,String startDate, String endDate, Long offset, Long limit) {
		return receiveRepository.modalfindByKeyword(receiveCode, businessName,startDate, endDate,offset,limit);
	}

	public List<ReceiveDetailVo> findByMasterNo(String receiveCode) {
		return receiveRepository.findByMasterNo(receiveCode);
	}
	
	public List<ReceiveDetailVo> modalfindByMasterNo(String receiveCode) {
		return receiveRepository.modalfindByMasterNo(receiveCode);
	}
	
	public  List<ReceiveMasterVo>  findByName(String userName) {
		return receiveRepository.findByName(userName);
	}
	public StatisticsVo findByUserId(String userId) {
		return receiveRepository.findByUserId(userId);
	}

	public void insertMaster(ReceiveMasterVo receiveVo, DBLogVo logVO) {
		receiveRepository.insertMaster(receiveVo, logVO);

	}

	@Transactional
	public void insertDetail(List<ReceiveDetailVo> receiveDetailVo, DBLogVo logVO) {
		for (ReceiveDetailVo vo : receiveDetailVo) {
			System.out.println(vo);
			vo.setLog(logVO);
			receiveRepository.insertDetail(vo);
			receiveRepository.insertStock(vo);
		}
	}

	public void updateMasterByCode(ReceiveMasterVo receiveVo, DBLogVo logVO) {
		receiveRepository.updateMasterByCode(receiveVo, logVO);
	}

	@Transactional
	public void updateDetailByCode(ReceiveDetailVo receiveVo, DBLogVo logVO) {
		receiveRepository.updateDetailByCode(receiveVo, logVO);
		receiveRepository.updateStockByCode(receiveVo, logVO);

	}

	public int findSeqByDateAndState(String date) {
		return receiveRepository.findSeqByDateAndState(date);
	}

	public void insertSeq(int no, String state, String date, DBLogVo logVO) {
		receiveRepository.insertSeq(no, state, date, logVO);
	}

	@Transactional
	public boolean deleteMasterItem(List<String> masterCode) {
		if(receiveRepository.checkStateReceiveByMasterCode(masterCode)) {		// release_count가 0이 아니면 대기가 아니라는 말이니까 동작X
			System.out.println("\n\n===== 대기 상태가 아닌 데이터가 존재함! ===== \n\n");
			return false;
		} else {
			boolean isDeleteStock = receiveRepository.deleteStockByMasterCode(masterCode);
			boolean isDeleteDetailSuccess = receiveRepository.deleteDetailByMasterNo(masterCode);
			boolean isDeleteMasterSuccess = receiveRepository.deleteMasterItem(masterCode);

			System.out.println("\n" + isDeleteMasterSuccess);
			System.out.println(isDeleteDetailSuccess);
			System.out.println(isDeleteStock + "\n");
			return isDeleteMasterSuccess && isDeleteDetailSuccess && isDeleteStock;
		}
		
	}

	@Transactional
	public boolean deleteDetailItem(List<Integer> detailNo, String masterCode, int length) {
		System.out.println("선택된 detail no값: " + detailNo.size());
		System.out.println(detailNo.size() == length);
		
		if(receiveRepository.checkStateReceiveByDetailNo(detailNo)) {
			System.out.println("===== 대기 상태가 아닌 데이터가 존재함! ===== ");
			return false;
		} else {
			boolean isDeleteDetailSuccess = receiveRepository.deleteDetailItem(detailNo);
			boolean isDeleteStock = receiveRepository.deleteStockByDetailNo(masterCode, detailNo);
			
			System.out.println("\n\n" + isDeleteDetailSuccess);
			System.out.println(isDeleteStock + "\n\n");
			
			return (detailNo.size() == length)
					? (isDeleteDetailSuccess && receiveRepository.deleteMasterByDetailNo(masterCode) && isDeleteStock)
					: isDeleteDetailSuccess && isDeleteStock;
		}
	}
}

package com.douzone.smartlogistics.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.douzone.smartlogistics.repository.ReleaseRepository;
import com.douzone.smartlogistics.vo.DBLogVo;
import com.douzone.smartlogistics.vo.ReceiveDetailVo;
import com.douzone.smartlogistics.vo.ReceiveMasterVo;
import com.douzone.smartlogistics.vo.ReleaseDetailVo;
import com.douzone.smartlogistics.vo.ReleaseMasterVo;
import com.douzone.smartlogistics.vo.StatisticsVo;


@Service
@Transactional
public class ReleaseService {

	@Autowired
	private ReleaseRepository releaseRepository;

	public List<ReleaseMasterVo> findByKeyword(String releaseCode, String businessName,String startDate, String endDate,Long offset,Long limit) {
		return releaseRepository.findByKeyword(releaseCode, businessName, startDate, endDate, offset, limit);
	}

	public List<ReleaseDetailVo> findByMasterNo(String releaseCode) {
		return releaseRepository.findByMasterNo(releaseCode);
	}

	@Transactional
	public boolean deleteMasterItem(List<String> masterNo) {
		boolean isUpdateReleaseCount = releaseRepository.updateReleaseCountInReceiveDetail(masterNo);
        boolean isDeleteMasterSuccess = releaseRepository.deleteMasterItem(masterNo);
        boolean isDeleteDetailSuccess = releaseRepository.deleteDetailByMasterNo(masterNo);
        boolean isDeleteStock = releaseRepository.deleteStockByMasterCode(masterNo);
        return isDeleteMasterSuccess && isDeleteDetailSuccess && isDeleteStock && isUpdateReleaseCount;
    }
	
	@Transactional
	public boolean deleteDetailItem(List<Integer> detailNo, String masterCode, int length) {
		boolean isUpdateReleaseCount = releaseRepository.updateReleaseCountInReceive(detailNo);
		boolean isDeleteDetailSuccess = releaseRepository.deleteDetailItem(detailNo);
		boolean isDeleteStockDetailNo = releaseRepository.deleteStockByDetailNo(masterCode, detailNo);
		System.out.println("\n\n" + "사이즈 ㅎ과인");
		System.out.println(detailNo.size() + " : " + length);
		System.out.println(isUpdateReleaseCount + " : " + isDeleteDetailSuccess + " : " + isDeleteStockDetailNo);
		return (detailNo.size() == length) ? (
				 isUpdateReleaseCount && isDeleteDetailSuccess && isDeleteStockDetailNo && releaseRepository.deleteMasterByDetailNo(masterCode))  
				: isUpdateReleaseCount && isDeleteDetailSuccess && isDeleteStockDetailNo;
	}

	public void insertMaster(ReleaseMasterVo releaseVo, DBLogVo logVO) {
		releaseRepository.insertMaster(releaseVo, logVO);

	}

	@Transactional
	public void insertDetail(List<ReleaseDetailVo> releaseDetailVo, DBLogVo logVO) {
		for (ReleaseDetailVo vo : releaseDetailVo) {
			vo.setLog(logVO);
			releaseRepository.insertDetail(vo);
			releaseRepository.updateReceiveCount(vo.getReceiveDetailNo(), vo.getCount());
			releaseRepository.insertStock(vo);
		}
	}
	
	public int findSeqByDateAndState(String date) {
		return releaseRepository.findSeqByDateAndState(date);
	}

	public void insertSeq(int no, String state, String date, DBLogVo logVO) {
		releaseRepository.insertSeq(no, state, date, logVO);
	}

	public List<ReleaseMasterVo> findByName(String userName) {
		return releaseRepository.findByName(userName);
	}

	public StatisticsVo findByUserId(String userId) {
		return releaseRepository.findByUserId(userId);
	}


	
}

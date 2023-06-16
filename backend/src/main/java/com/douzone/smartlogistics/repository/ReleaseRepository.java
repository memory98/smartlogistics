package com.douzone.smartlogistics.repository;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.douzone.smartlogistics.vo.DBLogVo;
import com.douzone.smartlogistics.vo.ReceiveDetailVo;
import com.douzone.smartlogistics.vo.ReceiveMasterVo;
import com.douzone.smartlogistics.vo.ReleaseDetailVo;
import com.douzone.smartlogistics.vo.ReleaseMasterVo;
import com.douzone.smartlogistics.vo.StatisticsVo;



@Repository
public class ReleaseRepository {
	
	@Autowired
	private SqlSession sqlSession;

	/* Master List 출력 */
	public List<ReleaseMasterVo> findByKeyword(String releaseCode, String businessName, String startDate, String endDate, Long offset, Long limit) {
		System.out.println(releaseCode + " : " + businessName + " : " + startDate + " : " + endDate);
		Map<String, Object> map = Map.of("rcode", releaseCode, "bname", businessName, "startdt", startDate, "enddt", endDate, "offset", offset, "limit", limit);
		return sqlSession.selectList("release.findByKeyword",map);
	}

	/* Master no에 해당하는 detail List 출력 */
	public List<ReleaseDetailVo> findByMasterNo(String releaseCode) {
		return sqlSession.selectList("release.findByMasterNo",releaseCode);
	}
	/* Master Item 삭제 */
	public boolean deleteMasterItem(List<String> masterNo) {
		return 1 == sqlSession.delete("release.deleteMasterItem", masterNo);
	}
	
	/* Master Item이 삭제되면서 detail Item 삭제 */
	public boolean deleteDetailByMasterNo(List<String> masterNo) {
		return 1 == sqlSession.delete("release.deleteDetailByMasterNo", masterNo);
	}

	/* Detail Item 삭제 */
	public boolean deleteDetailItem(List<Integer> detailNo) {
		return 0 < sqlSession.delete("release.deleteDetailItem", detailNo);
	}
	
	public boolean deleteMasterByDetailNo(String masterCode) {
		return 1 == sqlSession.delete("release.deleteMasterByDetailNo", masterCode);
	}
	
	public boolean deleteStockByMasterCode(List<String> masterNo) {
		return 1 == sqlSession.delete("release.stockDeleteByMasterCode", masterNo);
	}

	public boolean deleteStockByDetailNo(String masterCode, List<Integer> detailNo) {
		Map<String, Object> map = Map.of("code", masterCode, "no", detailNo);
		return 0 < sqlSession.delete("release.stockDeleteByDetailNo", map);
	}
	
	public boolean updateReleaseCountInReceiveDetail(List<String> masterNo) {
		return 1 == sqlSession.update("release.updateReleaseCountInReceiveByMasterCodeList", masterNo);
	}
	
	public boolean updateReleaseCountInReceive(List<Integer> detailNo) {
		return 0 < sqlSession.update("release.updateReleaseCountInReceiveByDetailNo", detailNo);
	}
	public int findSeqByDateAndState(String date) {
		return sqlSession.selectOne("release.findSeqByDateAndState", date);
	}

	public void insertDetail(ReleaseDetailVo vo) {
		sqlSession.insert("release.insertDetail", vo);
		
	}
	/* updateReceiveCount: Receive detail table의 receive count Update */
	public void updateReceiveCount(String no, int count) {
		Map<String, Object> map = Map.of("no", no, "count", count);
		sqlSession.update("release.updateReceiveCount", map);
	}

	public void insertStock(ReleaseDetailVo vo) {
		sqlSession.insert("release.insertStock", vo);
	}

	public void insertMaster(ReleaseMasterVo releaseVo, DBLogVo logVO) {
		Map<String, Object> map = Map.of("vo", releaseVo, "log", logVO);
		sqlSession.insert("release.insertMaster", map);
	}

	public void insertSeq(int no, String state, String date, DBLogVo logVO) {
		Map<String, Object> map = Map.of("no", no, "state", state, "date", date, "log", logVO);
		sqlSession.selectOne("release.insertSeq", map);
	}

	public List<ReleaseMasterVo> findByName(String userName) {
		return sqlSession.selectList("release.findByName", userName);
	}
	
	public StatisticsVo findByUserId(String userId) {
		return sqlSession.selectOne("release.findByUserId", userId);
	}
}

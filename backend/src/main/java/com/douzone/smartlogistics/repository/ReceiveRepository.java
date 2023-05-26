package com.douzone.smartlogistics.repository;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.douzone.smartlogistics.vo.DBLogVo;
import com.douzone.smartlogistics.vo.ReceiveDetailVo;
import com.douzone.smartlogistics.vo.ReceiveMasterVo;
import com.douzone.smartlogistics.vo.StatisticsVo;

@Repository
public class ReceiveRepository {

	@Autowired
	private SqlSession sqlSession;

	public List<ReceiveMasterVo> findByKeyword(String receiveCode, String businessName, String startDate,String endDate,Long offset,Long limit) {
		Map<String, Object> map = Map.of("rcode", receiveCode, "bname", businessName, "startdt", startDate, "enddt",endDate,"offset",offset,"limit",limit);
		return sqlSession.selectList("receive.findByKeyword", map);
	}

	public List<ReceiveMasterVo> modalfindByKeyword(String receiveCode, String businessName, String startDate,String endDate,Long offset,Long limit) {
		Map<String, Object> map = Map.of("rcode", receiveCode, "bname", businessName, "startdt", startDate, "enddt",endDate,"offset",offset,"limit",limit);
		return sqlSession.selectList("receive.modalfindByKeyword", map);
	}

	
	public List<ReceiveDetailVo> modalfindByMasterNo(String receiveCode) {
		return sqlSession.selectList("receive.modalfindByMasterNo", receiveCode);
	}
	
	public List<ReceiveDetailVo> findByMasterNo(String receiveCode) {
		return sqlSession.selectList("receive.findByMasterNo", receiveCode);
	}
	
	
	public List<ReceiveMasterVo> findByName(String userName) {
		return sqlSession.selectList("receive.findByName", userName);
	}

	public void insertMaster(ReceiveMasterVo receiveVo, DBLogVo logVO) {
		Map<String, Object> map = Map.of("vo", receiveVo, "log", logVO);
		sqlSession.insert("receive.insertMaster", map);
	}

	public void insertDetail(ReceiveDetailVo vo) {
		sqlSession.insert("receive.insertDetail", vo);
	}

	public void insertSeq(int no, String state, String date, DBLogVo logVO) {
		Map<String, Object> map = Map.of("no", no, "state", state, "date", date, "log", logVO);
		sqlSession.selectOne("receive.insertSeq", map);
	}

	public void insertStock(ReceiveDetailVo vo) {
		sqlSession.insert("receive.insertStock", vo);

	}

	public void updateMasterByCode(ReceiveMasterVo receiveVo, DBLogVo logVO) {
		Map<String, Object> map = Map.of("vo", receiveVo, "log", logVO);
		sqlSession.insert("receive.updateMasterByCode", map);
	}

	public void updateDetailByCode(ReceiveDetailVo receiveVo, DBLogVo logVO) {
		Map<String, Object> map = Map.of("vo", receiveVo, "log", logVO);
		sqlSession.insert("receive.updateDetailByCode", map);

	}

	public void updateStockByCode(ReceiveDetailVo receiveVo, DBLogVo logVO) {
		Map<String, Object> map = Map.of("vo", receiveVo, "log", logVO);
		sqlSession.insert("receive.updateStockByCode", map);

	}

	public int findSeqByDateAndState(String date) {
		return sqlSession.selectOne("receive.findSeqByDateAndState", date);
	}
	
	public StatisticsVo findByUserId(String userId) {
		return sqlSession.selectOne("receive.findByUserId", userId);
	}

	/* Master Item 삭제 */
	public boolean deleteMasterItem(List<String> masterNo) {
		return 0 < sqlSession.delete("receive.deleteMasterItem", masterNo);
	}

	/* Master Item이 삭제되면서 detail Item 삭제 */
	public boolean deleteDetailByMasterNo(List<String> masterNo) {
		return 0 < sqlSession.delete("receive.deleteDetailByMasterNo", masterNo);
	}

	/* Detail Item 삭제 */
	public boolean deleteDetailItem(List<Integer> detailNo) {
		return 0 < sqlSession.delete("receive.deleteDetailItem", detailNo);
	}

	public boolean deleteMasterByDetailNo(String masterCode) {
		return 1 == sqlSession.delete("receive.deleteMasterByDetailNo", masterCode);
	}

	public boolean checkStateReceiveByMasterCode(List<String> masterCode) {
		List<String> dataList = sqlSession.selectList("receive.checkStateReceiveByMasterCode", masterCode);
		return !dataList.isEmpty();
	}

	public boolean checkStateReceiveByDetailNo(List<Integer> detailNo) {
		List<Integer> dataList = sqlSession.selectList("receive.checkStateReceiveByDetailNo", detailNo);
		return !dataList.isEmpty();
	}
	
	public boolean deleteStockByMasterCode(List<String> masterCode) {
		return 0 < sqlSession.delete("receive.stockDeleteByMasterCode", masterCode);
	}

	public boolean deleteStockByDetailNo(String masterCode, List<Integer> detailNo) {
		Map<String, Object> map = Map.of("code", masterCode, "no", detailNo);
		return 0 < sqlSession.delete("receive.stockDeleteByDetailNo", map);
	}

	

	


}

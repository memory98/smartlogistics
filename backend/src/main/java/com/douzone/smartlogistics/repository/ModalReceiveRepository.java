package com.douzone.smartlogistics.repository;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.douzone.smartlogistics.vo.DBLogVo;
import com.douzone.smartlogistics.vo.ModalReceiveDetailVo;
import com.douzone.smartlogistics.vo.ModalReceiveMasterVo;

@Repository
public class ModalReceiveRepository {

	@Autowired
	private SqlSession sqlSession;

	public List<ModalReceiveMasterVo> findByKeyword(String receiveCode, String businessName, String startDate,String endDate) {
		Map<String, Object> map = Map.of("rcode", receiveCode, "bname", businessName, "startdt", startDate, "enddt",endDate);
		return sqlSession.selectList("modalreceive.findByKeyword", map);
	}

	public List<ModalReceiveDetailVo> findByMasterNo(String receiveCode) {
		return sqlSession.selectList("modalreceive.findByMasterNo", receiveCode);
	}
	


}

package com.douzone.smartlogistics.repository;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.douzone.smartlogistics.vo.BusinessVo;
import com.douzone.smartlogistics.vo.DBLogVo;
import com.douzone.smartlogistics.vo.ReceiveDetailVo;
import com.douzone.smartlogistics.vo.ReleaseDetailVo;

@Repository
public class BusinessRepository {

	@Autowired
	private SqlSession sqlSession;
	
	public List<BusinessVo> findAll() {
		return sqlSession.selectList("business.findAll");
	}

	public List<BusinessVo> findAllByKeyword(Map<String, Object> map) {
		return sqlSession.selectList("business.findAllByKeyword", map);
	}

	public Boolean insert(BusinessVo vo, DBLogVo logVo) {
		Map<String, Object> map = Map.of("vo",vo,"log",logVo);
		return 1 == sqlSession.insert("business.insert", map);
	}
	
	public BusinessVo findByCode(String businessCode) {
		return sqlSession.selectOne("business.findByCode",businessCode);
	}
	public int updateByCode(String businessCode, BusinessVo vo, DBLogVo logVo) {
		Map<String, Object> map = Map.of("bcode",businessCode,"vo",vo, "log", logVo);
		return sqlSession.update("business.updateByCode",map);
	}

	public Boolean delete(List<String> deleteItem) {
		return 1 == sqlSession.delete("business.delete", deleteItem);
	}

	public List<ReceiveDetailVo> checkInReceive(List<String> deleteItem) {
		return sqlSession.selectList("business.checkInReceive",deleteItem);
	}
	public List<ReleaseDetailVo> checkInRelease(List<String> deleteItem) {
		return sqlSession.selectList("business.checkInRelease",deleteItem);
	}
	

}

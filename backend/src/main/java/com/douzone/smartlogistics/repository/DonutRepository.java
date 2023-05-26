package com.douzone.smartlogistics.repository;

import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.douzone.smartlogistics.vo.DBLogVo;

@Repository
public class DonutRepository {
	@Autowired
	private SqlSession sqlSession;

	public Map<String,Object> findByReceive(Map<String,Object> map) {
		return sqlSession.selectOne("donut.findByReceive",map);
	}
	
	
}

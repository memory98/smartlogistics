package com.douzone.smartlogistics.repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.douzone.smartlogistics.vo.StockGraphVo;
import com.douzone.smartlogistics.vo.StockVo;

@Repository
public class StockRepository {

	@Autowired
	private SqlSession sqlSession;

	public List<StockGraphVo> getData(String state, String startDate) {
		Map map = Map.of("state", state, "date", startDate);
		System.out.println("map : " + map);
		return sqlSession.selectList("stock.getdata", map);
	}

	public List<StockVo> findByKeyword(Long offset, Long limit, String user_name, String business_name, String st, String code,
			String startDate, String endDate) {
		HashMap<String, Object> map = new HashMap();	
		map.put("offset",offset);
		map.put("limit",limit);
		map.put("sdate",startDate);
		map.put("edate",endDate);
		map.put("code",code);		
		map.put("st",st);
		map.put("user_name",user_name);
		map.put("business_name",business_name);

		
//		map = Map.of("offset", offset, "sdate", startDate, "edate", endDate, "code", code, "user_name", user_name,
//						"business_name", business_name);
		return sqlSession.selectList("stock.findbykeyword", map);
	}
}
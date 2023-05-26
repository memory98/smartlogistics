package com.douzone.smartlogistics.service;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.douzone.smartlogistics.repository.DonutRepository;
import com.douzone.smartlogistics.vo.DBLogVo;

@Service
public class DonutService {
	@Autowired
	private DonutRepository donutRepository;

	public Map<String,Object> findByReceive(Map<String,Object> map) {
		return donutRepository.findByReceive(map);
	}

}

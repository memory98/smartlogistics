package com.douzone.smartlogistics.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.douzone.smartlogistics.repository.UserRepository;
import com.douzone.smartlogistics.vo.BusinessVo;
import com.douzone.smartlogistics.vo.DBLogVo;
import com.douzone.smartlogistics.vo.ProductVo;
import com.douzone.smartlogistics.vo.UserVo;

@Service
public class UserService {

	@Autowired
	private UserRepository userRepository;
	public List<UserVo> getUsers() {
		return userRepository.findAll();
	}
	public List<UserVo> findByKeyword(Map<String, Object> map) {
		return userRepository.findByKeyword(map);
	}
	
	public List<UserVo> findUserModalByKeyword(Map<String, Object> map) {
		return userRepository.findUserModalByKeyword(map);	}
	
	public Boolean addUser(UserVo userVo) {
		return userRepository.addUser(userVo);
	}
	public Boolean getUser(UserVo userVo) {
		return userRepository.findUser(userVo);
	}
	public UserVo getUserLogin(UserVo vo) {
		return userRepository.getUserLogin(vo);
	}
	public UserVo getUserfindById(String id) {
		return userRepository.getUserfindById(id);
	}
	public List<UserVo> getUserListByKeyword(UserVo vo) {
		return userRepository.findAllByKeyword(vo);
	}
	public int updateByCode(String userCode, UserVo vo,DBLogVo logVo) {
		return  userRepository.updateByCode(userCode,vo,logVo);
	}
	public int updateMypageByCode(String userCode, UserVo vo,DBLogVo logVo) {
		return  userRepository.updateMypageByCode(userCode,vo,logVo);
	}
	public UserVo findByCode(String UserCode) {
		return userRepository.findByCode(UserCode);
	}
	public UserVo findByCodeforlocalStorage(String id) {
		return userRepository.findByCodeForLocalStorage(id);
	}
	public boolean deleteUsers(String[] data) {
		return userRepository.deleteUsers(data);
	}
	public UserVo getUserfindByIdDuplicate(String id) {
		return userRepository.getUserfindByIdDuplicate(id);
	}

}

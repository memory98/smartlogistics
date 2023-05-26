package com.douzone.smartlogistics.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.douzone.smartlogistics.repository.ProductRepository;
import com.douzone.smartlogistics.vo.DBLogVo;
import com.douzone.smartlogistics.vo.ProductVo;

@Service
public class ProductService {
	@Autowired
	private ProductRepository productRepository;

	public List<ProductVo> findByKeyword(String productkeywd, String productSize,Long offset,Long limit) {
		return productRepository.findByKeyword(productkeywd, productSize,offset,limit);
	}

	public boolean insert(ProductVo vo,DBLogVo logVo) {
		return productRepository.insert(vo,logVo);
	}

	public ProductVo findByCode(String productCode) {
		return productRepository.findByCode(productCode);
	}

	public int updateByCode(String productCode, ProductVo vo,DBLogVo logVo) {
		return  productRepository.updateByCode(productCode,vo,logVo);
	}

	@Transactional
	public boolean deleteByCode(List<String> deleteItem) {
		int receiveLength = productRepository.checkInReceive(deleteItem).size();
		int releaseLength = productRepository.checkInRelease(deleteItem).size();

		return (receiveLength > 0 || releaseLength > 0) ? false : productRepository.deleteByCode(deleteItem);
	}


}

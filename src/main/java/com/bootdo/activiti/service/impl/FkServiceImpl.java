package com.bootdo.activiti.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

import com.bootdo.activiti.dao.FkDao;
import com.bootdo.activiti.domain.FkDO;
import com.bootdo.activiti.service.FkService;
import com.bootdo.common.utils.ShiroUtils;



@Service
public class FkServiceImpl implements FkService {
	@Autowired
	private FkDao fkDao;
	
	@Override
	public FkDO get(Integer id){
		return fkDao.get(id);
	}
	
	@Override
	public List<FkDO> list(Map<String, Object> map){
		return fkDao.list(map);
	}
	
	@Override
	public int count(Map<String, Object> map){
		return fkDao.count(map);
	}
	
	@Override
	public int save(FkDO fk){
		fk.setCbryId(String.valueOf(ShiroUtils.getUserId()));
		fk.setCbryMc(ShiroUtils.getUser().getName());
		return fkDao.save(fk);
	}
	
	@Override
	public int update(FkDO fk){
		return fkDao.update(fk);
	}
	
	@Override
	public int remove(Integer id){
		return fkDao.remove(id);
	}
	
	@Override
	public int batchRemove(Integer[] ids){
		return fkDao.batchRemove(ids);
	}
	
}

package com.bootdo.jsb.ywgl.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

import com.bootdo.jsb.ywgl.dao.JsbZfrwFkDao;
import com.bootdo.jsb.ywgl.domain.JsbZfrwFkDO;
import com.bootdo.jsb.ywgl.service.JsbZfrwFkService;



@Service
public class JsbZfrwFkServiceImpl implements JsbZfrwFkService {
	@Autowired
	private JsbZfrwFkDao jsbZfrwFkDao;
	
	@Override
	public JsbZfrwFkDO get(String id){
		return jsbZfrwFkDao.get(id);
	}
	
	@Override
	public List<JsbZfrwFkDO> list(Map<String, Object> map){
		return jsbZfrwFkDao.list(map);
	}
	
	@Override
	public int count(Map<String, Object> map){
		return jsbZfrwFkDao.count(map);
	}
	
	@Override
	public int save(JsbZfrwFkDO jsbZfrwFk){
		return jsbZfrwFkDao.save(jsbZfrwFk);
	}
	
	@Override
	public int update(JsbZfrwFkDO jsbZfrwFk){
		return jsbZfrwFkDao.update(jsbZfrwFk);
	}
	
	@Override
	public int remove(String id){
		return jsbZfrwFkDao.remove(id);
	}
	
	@Override
	public int batchRemove(String[] ids){
		return jsbZfrwFkDao.batchRemove(ids);
	}
	
}

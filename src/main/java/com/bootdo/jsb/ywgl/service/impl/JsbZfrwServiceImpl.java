package com.bootdo.jsb.ywgl.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

import com.bootdo.jsb.ywgl.dao.JsbZfrwDao;
import com.bootdo.jsb.ywgl.domain.JsbZfrwDO;
import com.bootdo.jsb.ywgl.domain.JsbZfrwTaskDO;
import com.bootdo.jsb.ywgl.service.JsbZfrwService;



@Service
public class JsbZfrwServiceImpl implements JsbZfrwService {
	@Autowired
	private JsbZfrwDao jsbZfrwDao;
	
	@Override
	public JsbZfrwDO get(String id){
		return jsbZfrwDao.get(id);
	}
	
	@Override
	public List<JsbZfrwDO> list(Map<String, Object> map){
		return jsbZfrwDao.list(map);
	}
	
	@Override
	public int count(Map<String, Object> map){
		return jsbZfrwDao.count(map);
	}
	
	@Override
	public int save(JsbZfrwTaskDO jsbZfrw){
		return jsbZfrwDao.save(jsbZfrw);
	}
	
	@Override
	public int update(JsbZfrwDO jsbZfrw){
		return jsbZfrwDao.update(jsbZfrw);
	}
	
	@Override
	public int remove(String id){
		return jsbZfrwDao.remove(id);
	}
	
	@Override
	public int batchRemove(String[] ids){
		return jsbZfrwDao.batchRemove(ids);
	}
	/**
	 * 自动生成走访任务 add 2018-10-12
	 * @return 
	 */
	@Override
	public List<JsbZfrwTaskDO> bulidZoufangTask(){
		return jsbZfrwDao.bulidZoufangTask();
	}
}

package com.bootdo.jsb.ypfx.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

import com.bootdo.jsb.ypfx.dao.StaticIntegrationIdentifacitionDao;
import com.bootdo.jsb.ypfx.domain.StaticIntegrationIdentifacitionDO;
import com.bootdo.jsb.ypfx.service.StaticIntegrationIdentifacitionService;



@Service
public class StaticIntegrationIdentifacitionServiceImpl implements StaticIntegrationIdentifacitionService {
	@Autowired
	private StaticIntegrationIdentifacitionDao staticIntegrationIdentifacitionDao;
	
	@Override
	public StaticIntegrationIdentifacitionDO get(Integer id){
		return staticIntegrationIdentifacitionDao.get(id);
	}
	
	@Override
	public List<StaticIntegrationIdentifacitionDO> list(Map<String, Object> map){
		return staticIntegrationIdentifacitionDao.list(map);
	}
	
	@Override
	public int count(Map<String, Object> map){
		return staticIntegrationIdentifacitionDao.count(map);
	}
	
	@Override
	public int save(StaticIntegrationIdentifacitionDO staticIntegrationIdentifacition){
		return staticIntegrationIdentifacitionDao.save(staticIntegrationIdentifacition);
	}
	
	@Override
	public int update(StaticIntegrationIdentifacitionDO staticIntegrationIdentifacition){
		return staticIntegrationIdentifacitionDao.update(staticIntegrationIdentifacition);
	}
	
	@Override
	public int remove(Integer id){
		return staticIntegrationIdentifacitionDao.remove(id);
	}
	
	@Override
	public int batchRemove(Integer[] ids){
		return staticIntegrationIdentifacitionDao.batchRemove(ids);
	}
	
}

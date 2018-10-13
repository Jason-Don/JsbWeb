package com.bootdo.jsb.ypfx.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

import com.bootdo.jsb.ypfx.dao.CaseIncidentDao;
import com.bootdo.jsb.ypfx.domain.CaseIncidentDO;
import com.bootdo.jsb.ypfx.service.CaseIncidentService;



@Service
public class CaseIncidentServiceImpl implements CaseIncidentService {
	@Autowired
	private CaseIncidentDao caseIncidentDao;
	
	@Override
	public CaseIncidentDO get(Integer id){
		return caseIncidentDao.get(id);
	}
	
	@Override
	public List<CaseIncidentDO> list(Map<String, Object> map){
		return caseIncidentDao.list(map);
	}
	
	@Override
	public int count(Map<String, Object> map){
		return caseIncidentDao.count(map);
	}
	
	@Override
	public int save(CaseIncidentDO caseIncident){
		return caseIncidentDao.save(caseIncident);
	}
	
	@Override
	public int update(CaseIncidentDO caseIncident){
		return caseIncidentDao.update(caseIncident);
	}
	
	@Override
	public int remove(Integer id){
		return caseIncidentDao.remove(id);
	}
	
	@Override
	public int batchRemove(Integer[] ids){
		return caseIncidentDao.batchRemove(ids);
	}
	
}

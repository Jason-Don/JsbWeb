package com.bootdo.jsb.ypfx.service;

import com.bootdo.jsb.ypfx.domain.CaseIncidentDO;

import java.util.List;
import java.util.Map;

/**
 * 
 * 
 * @author wu
 * @email 1992lcg@163.com
 * @date 2018-10-11 09:23:28
 */
public interface CaseIncidentService {
	
	CaseIncidentDO get(Integer id);
	
	List<CaseIncidentDO> list(Map<String, Object> map);
	
	int count(Map<String, Object> map);
	
	int save(CaseIncidentDO caseIncident);
	
	int update(CaseIncidentDO caseIncident);
	
	int remove(Integer id);
	
	int batchRemove(Integer[] ids);
}

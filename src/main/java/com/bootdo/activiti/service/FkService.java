package com.bootdo.activiti.service;

import com.bootdo.activiti.domain.FkDO;

import java.util.List;
import java.util.Map;

/**
 * 
 * 
 * @author zhangf
 * @email ${email}
 * @date 2018-06-29 10:17:14
 */
public interface FkService {
	
	FkDO get(Integer id);
	
	List<FkDO> list(Map<String, Object> map);
	
	int count(Map<String, Object> map);
	
	int save(FkDO fk);
	
	int update(FkDO fk);
	
	int remove(Integer id);
	
	int batchRemove(Integer[] ids);
}

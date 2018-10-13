package com.bootdo.activiti.service;

import com.bootdo.activiti.domain.OvertimeDO;

import java.util.List;
import java.util.Map;

/**
 * 加班表
 * 
 * @author zhangf
 * @email ${email}
 * @date 2018-06-13 10:44:56
 */
public interface OvertimeService {
	
	OvertimeDO get(Integer id);
	
	List<OvertimeDO> list(Map<String, Object> map);
	
	int count(Map<String, Object> map);
	
	int save(OvertimeDO overtime);
	
	int update(OvertimeDO overtime);
	
	int remove(Integer id);
	
	int batchRemove(Integer[] ids);
}

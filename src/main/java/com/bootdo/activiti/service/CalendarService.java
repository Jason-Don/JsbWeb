package com.bootdo.activiti.service;

import com.bootdo.activiti.domain.CalendarDO;

import java.util.List;
import java.util.Map;

/**
 * 
 * 
 * @author zhangf
 * @email ${email}
 * @date 2018-07-05 15:43:58
 */
public interface CalendarService {
	
	Map<String,Object> get(Long userId);
	
	int save(CalendarDO calendar);
	
	int update(CalendarDO calendar);
	
	int remove(String userId);
	
}

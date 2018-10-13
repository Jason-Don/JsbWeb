package com.bootdo.activiti.dao;

import com.bootdo.activiti.domain.CalendarDO;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

/**
 * 
 * @author zhangf
 * @email ${email}
 * @date 2018-07-05 15:43:58
 */
@Mapper
public interface CalendarDao {

	List<CalendarDO> get(Long userId);
	
	int save(CalendarDO calendar);
	
	int update(CalendarDO calendar);
	
	int remove(String user_id);
	
}

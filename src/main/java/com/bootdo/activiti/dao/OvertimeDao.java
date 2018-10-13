package com.bootdo.activiti.dao;

import com.bootdo.activiti.domain.OvertimeDO;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

/**
 * 加班表
 * @author zhangf
 * @email ${email}
 * @date 2018-06-13 10:44:56
 */
@Mapper
public interface OvertimeDao {

	OvertimeDO get(Integer id);
	
	List<OvertimeDO> list(Map<String,Object> map);
	
	int count(Map<String,Object> map);
	
	int save(OvertimeDO overtime);
	
	int update(OvertimeDO overtime);
	
	int remove(Integer id);
	
	int batchRemove(Integer[] ids);
}

package com.bootdo.activiti.dao;

import org.apache.ibatis.annotations.Mapper;

/**
 * @author zhangf
 * @date 2018-08-3
 */
@Mapper
public interface ActivitiDao {
	int batchRemove_act(String[] processInstanceIdArray);
}

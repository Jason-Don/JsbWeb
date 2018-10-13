package com.bootdo.activiti.dao;

import com.bootdo.activiti.domain.FkDO;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

/**
 * 
 * @author zhangf
 * @email ${email}
 * @date 2018-06-29 10:17:14
 */
@Mapper
public interface FkDao {

	FkDO get(Integer id);
	
	List<FkDO> list(Map<String,Object> map);
	
	int count(Map<String,Object> map);
	
	int save(FkDO fk);
	
	int update(FkDO fk);
	
	int remove(Integer id);
	
	int batchRemove(Integer[] ids);
}

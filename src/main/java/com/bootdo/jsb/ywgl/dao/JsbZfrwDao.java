package com.bootdo.jsb.ywgl.dao;

import com.bootdo.jsb.ywgl.domain.JsbZfrwDO;
import com.bootdo.jsb.ywgl.domain.JsbZfrwTaskDO;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

/**
 * 精神病_走访任务
 * @author zhangf
 * @date 2018-10-11 10:26:33
 */
@Mapper
public interface JsbZfrwDao {

	JsbZfrwDO get(String id);
	
	List<JsbZfrwDO> list(Map<String,Object> map);
	
	int count(Map<String,Object> map);
	
	int save(JsbZfrwTaskDO jsbZfrw);
	
	int update(JsbZfrwDO jsbZfrw);
	
	int remove(String id);
	
	int batchRemove(String[] ids);
	
	List<JsbZfrwTaskDO> bulidZoufangTask();//自动生成走访任务 add 2018-10-12
}

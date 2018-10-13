package com.bootdo.jsb.ywgl.service;

import com.bootdo.jsb.ywgl.domain.JsbZfrwDO;
import com.bootdo.jsb.ywgl.domain.JsbZfrwTaskDO;

import java.util.List;
import java.util.Map;

/**
 * 精神病_走访任务
 * 
 * @author zhangf
 * @email 1992lcg@163.com
 * @date 2018-10-11 10:26:33
 */
public interface JsbZfrwService {
	
	JsbZfrwDO get(String id);
	
	List<JsbZfrwDO> list(Map<String, Object> map);
	
	int count(Map<String, Object> map);
	
	int save(JsbZfrwTaskDO jsbZfrw);
	
	int update(JsbZfrwDO jsbZfrw);
	
	int remove(String id);
	
	int batchRemove(String[] ids);
	
	List<JsbZfrwTaskDO> bulidZoufangTask();//自动生成走访任务 add 2018-10-12
}

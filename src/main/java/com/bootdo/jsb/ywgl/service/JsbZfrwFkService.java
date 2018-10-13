package com.bootdo.jsb.ywgl.service;

import com.bootdo.jsb.ywgl.domain.JsbZfrwFkDO;

import java.util.List;
import java.util.Map;

/**
 * 精神病_走访任务_反馈
 * 
 * @author zhangf
 * @email 1992lcg@163.com
 * @date 2018-10-11 10:26:33
 */
public interface JsbZfrwFkService {
	
	JsbZfrwFkDO get(String id);
	
	List<JsbZfrwFkDO> list(Map<String, Object> map);
	
	int count(Map<String, Object> map);
	
	int save(JsbZfrwFkDO jsbZfrwFk);
	
	int update(JsbZfrwFkDO jsbZfrwFk);
	
	int remove(String id);
	
	int batchRemove(String[] ids);
}

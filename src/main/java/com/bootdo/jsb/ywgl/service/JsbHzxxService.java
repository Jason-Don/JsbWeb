package com.bootdo.jsb.ywgl.service;

import com.bootdo.jsb.ywgl.domain.JsbHzxxDO;

import java.util.List;
import java.util.Map;

/**
 * 患者信息表
 * 
 * @author zhangf
 * @date 2018-10-08 18:38:01
 */
public interface JsbHzxxService {
	
	JsbHzxxDO get(Integer id);
	
	List<JsbHzxxDO> list(Map<String, Object> map);
	
	int count(Map<String, Object> map);
	
	int save(JsbHzxxDO jsbHzxx);
	
	int update(JsbHzxxDO jsbHzxx);
	
	int remove(Integer id);
	
	int batchRemove(Integer[] ids);
	
	Map<String, String> getPerInfo(String sfzh);
}

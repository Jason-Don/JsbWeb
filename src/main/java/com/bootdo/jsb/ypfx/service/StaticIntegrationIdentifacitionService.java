package com.bootdo.jsb.ypfx.service;

import com.bootdo.jsb.ypfx.domain.StaticIntegrationIdentifacitionDO;

import java.util.List;
import java.util.Map;

/**
 * 患者信息表
 * 
 * @author wu
 * @email 1992lcg@163.com
 * @date 2018-10-12 17:16:43
 */
public interface StaticIntegrationIdentifacitionService {
	
	StaticIntegrationIdentifacitionDO get(Integer id);
	
	List<StaticIntegrationIdentifacitionDO> list(Map<String, Object> map);
	
	int count(Map<String, Object> map);
	
	int save(StaticIntegrationIdentifacitionDO staticIntegrationIdentifacition);
	
	int update(StaticIntegrationIdentifacitionDO staticIntegrationIdentifacition);
	
	int remove(Integer id);
	
	int batchRemove(Integer[] ids);
}

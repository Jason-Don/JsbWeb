package com.bootdo.jsb.ypfx.dao;

import com.bootdo.jsb.ypfx.domain.StaticIntegrationIdentifacitionDO;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

/**
 * 患者信息表
 * @author wu
 * @email 1992lcg@163.com
 * @date 2018-10-12 17:16:43
 */
@Mapper
public interface StaticIntegrationIdentifacitionDao {

	StaticIntegrationIdentifacitionDO get(Integer id);
	
	List<StaticIntegrationIdentifacitionDO> list(Map<String,Object> map);
	
	int count(Map<String,Object> map);
	
	int save(StaticIntegrationIdentifacitionDO staticIntegrationIdentifacition);
	
	int update(StaticIntegrationIdentifacitionDO staticIntegrationIdentifacition);
	
	int remove(Integer id);
	
	int batchRemove(Integer[] ids);
}

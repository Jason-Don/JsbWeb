package com.bootdo.jsb.ywgl.dao;

import com.bootdo.jsb.ywgl.domain.JsbHzxxDO;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

/**
 * 患者信息表
 * @author zhangf
 * @date 2018-10-08 18:38:01
 */
@Mapper
public interface JsbHzxxDao {

	JsbHzxxDO get(Integer id);
	
	List<JsbHzxxDO> list(Map<String,Object> map);
	
	String getPcsMc(String bmdm);
	
	int count(Map<String,Object> map);
	
	int save(JsbHzxxDO jsbHzxx);
	
	int update(JsbHzxxDO jsbHzxx);
	
	int remove(Integer id);
	
	int batchRemove(Integer[] ids);
}

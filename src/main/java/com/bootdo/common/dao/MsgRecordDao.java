package com.bootdo.common.dao;

import com.bootdo.common.domain.MsgRecordDO;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

/**
 * 
 * @author zhangf
 * @date 2018-08-14 09:23:48
 */
@Mapper
public interface MsgRecordDao {

	MsgRecordDO get(Integer id);
	
	List<MsgRecordDO> list(Map<String,Object> map);
	
	int count(Map<String,Object> map);
	
	int save(MsgRecordDO msgRecord);
	
	int update(MsgRecordDO msgRecord);
	
	int remove(Integer id);
	
	int batchRemove(Integer[] ids);
	
	int isSendWithinSometime(Map<String,Object> map);
}

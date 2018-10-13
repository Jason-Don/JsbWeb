package com.bootdo.common.service;

import com.bootdo.common.domain.MsgRecordDO;

import java.util.List;
import java.util.Map;

/**
 * @author zhangf
 * @date 2018-08-14
 */
public interface MsgRecordService {
	
	MsgRecordDO get(Integer id);
	
	List<MsgRecordDO> list(Map<String, Object> map);
	
	int count(Map<String, Object> map);
	
	int save(MsgRecordDO msgRecord);
	
	int update(MsgRecordDO msgRecord);
	
	int remove(Integer id);
	
	int batchRemove(Integer[] ids);
	
	int isSendWithinSometime(Map<String,Object> map);
}

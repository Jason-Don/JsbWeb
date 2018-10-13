package com.bootdo.msg.msgDB.service;


import java.util.List;
import java.util.Map;

import com.bootdo.common.domain.TSendDO;

/**
 * @author zhangf
 * @date 2018-08-22 16:10:08
 */
public interface TSendService {
	
	TSendDO get(Integer id);
	
	List<TSendDO> list(Map<String, Object> map);
	
	int count(Map<String, Object> map);
	
	int save(TSendDO tSend);
	
	int removeHistory();
	
}

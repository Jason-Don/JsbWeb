package com.bootdo.msg.msgDB.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bootdo.common.domain.TSendDO;
import com.bootdo.msg.msgDB.dao.TSendDao;
import com.bootdo.msg.msgDB.service.TSendService;

import java.util.List;
import java.util.Map;



@Service
public class TSendServiceImpl implements TSendService {
	@Autowired
	private TSendDao tSendDao;
	
	@Override
	public TSendDO get(Integer id){
		return tSendDao.get(id);
	}
	
	@Override
	public List<TSendDO> list(Map<String, Object> map){
		return tSendDao.list(map);
	}
	
	@Override
	public int count(Map<String, Object> map){
		return tSendDao.count(map);
	}
	
	@Override
	public int save(TSendDO tSend){
		return tSendDao.save(tSend);
	}
	
	@Override
	public int removeHistory(){
		return tSendDao.removeHistory();
	}
	
}

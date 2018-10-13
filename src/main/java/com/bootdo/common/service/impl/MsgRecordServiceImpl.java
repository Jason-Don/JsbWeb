package com.bootdo.common.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

import com.bootdo.common.dao.MsgRecordDao;
import com.bootdo.common.domain.MsgRecordDO;
import com.bootdo.common.service.MsgRecordService;



@Service
public class MsgRecordServiceImpl implements MsgRecordService {
	@Autowired
	private MsgRecordDao msgRecordDao;
	
	@Override
	public MsgRecordDO get(Integer id){
		return msgRecordDao.get(id);
	}
	
	@Override
	public List<MsgRecordDO> list(Map<String, Object> map){
		return msgRecordDao.list(map);
	}
	
	@Override
	public int count(Map<String, Object> map){
		return msgRecordDao.count(map);
	}
	
	@Override
	public int save(MsgRecordDO msgRecord){
		return msgRecordDao.save(msgRecord);
	}
	
	@Override
	public int update(MsgRecordDO msgRecord){
		return msgRecordDao.update(msgRecord);
	}
	
	@Override
	public int remove(Integer id){
		return msgRecordDao.remove(id);
	}
	
	@Override
	public int batchRemove(Integer[] ids){
		return msgRecordDao.batchRemove(ids);
	}
	@Override
	public int isSendWithinSometime(Map<String, Object> map) {
		return msgRecordDao.isSendWithinSometime(map);
	}

	
}

package com.bootdo.activiti.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

import com.bootdo.activiti.dao.ActivitiDao;
import com.bootdo.activiti.dao.OvertimeDao;
import com.bootdo.activiti.domain.OvertimeDO;
import com.bootdo.activiti.service.OvertimeService;
import com.bootdo.activiti.utils.ActivitiUtils;



@Service("overtimeService")
public class OvertimeServiceImpl implements OvertimeService {
	@Autowired
	private OvertimeDao overtimeDao;
	
	@Override
	public OvertimeDO get(Integer id){
		return overtimeDao.get(id);
	}
	
	@Override
	public List<OvertimeDO> list(Map<String, Object> map){
		return overtimeDao.list(map);
	}
	
	@Override
	public int count(Map<String, Object> map){
		return overtimeDao.count(map);
	}
	
	@Override
	public int save(OvertimeDO overtime){
		return overtimeDao.save(overtime);
	}
	
	@Override
	public int update(OvertimeDO overtime){
		return overtimeDao.update(overtime);
	}
	
	@Override
	public int remove(Integer id){
		String[] businessKey = new String[]{String.valueOf(id)};
		String[] processInstanceIdArray = activitiUtils.getProcessInstanceIdArray(businessKey);
		activitiDao.batchRemove_act(processInstanceIdArray);
		return overtimeDao.remove(id);
	}
	
	@Autowired
	ActivitiUtils activitiUtils;
	@Autowired
	private ActivitiDao activitiDao;
	@Override
	public int batchRemove(Integer[] ids){
		String[] businessKey = new String[ids.length];
		for(int i = 0; i< ids.length; i++){
			businessKey[i] = String.valueOf(ids[i]);
		}
		String[] processInstanceIdArray = activitiUtils.getProcessInstanceIdArray(businessKey);
		activitiDao.batchRemove_act(processInstanceIdArray);
		return overtimeDao.batchRemove(ids);
	}
	
}

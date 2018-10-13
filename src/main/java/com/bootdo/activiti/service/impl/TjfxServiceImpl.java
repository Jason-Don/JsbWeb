package com.bootdo.activiti.service.impl;

import java.sql.Array;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bootdo.activiti.dao.TjfxDao;
import com.bootdo.activiti.domain.Tjfx_OvertimeBar;
import com.bootdo.activiti.domain.Tjfx_WorkflowBarDO;
import com.bootdo.activiti.service.TjfxService;

/**
 * 
 * @author zhangf
 * @date 2018-07-14
 */
@Service
public class TjfxServiceImpl implements TjfxService{

	@Autowired
	TjfxDao tjfxDao;
	
	@Override
	public List<Tjfx_WorkflowBarDO> getWorkflowBar(Object[] conditions) {
		String[] duty_people= conditions[1].toString().split(",");
		List<Tjfx_WorkflowBarDO> tjfx_WorkflowBarDO = tjfxDao.getWorkflowBarByConditions(conditions[0],duty_people);
		return tjfx_WorkflowBarDO;
	}

	@Override
	public List<Tjfx_OvertimeBar> getOvertimeBar(Object[] conditions) {
		String[] duty_people= conditions[1].toString().split(",");
		List<Tjfx_OvertimeBar> overtimeDOList = tjfxDao.getOvertimeBarByConditions(conditions[0],duty_people);
		System.out.println("获取到的加班信息列表长度为："+overtimeDOList.size());
		return overtimeDOList;
	}

	@Override
	public String getCurrentYear() {
		String year = tjfxDao.getCurrentYear();
		return year;
	}

}

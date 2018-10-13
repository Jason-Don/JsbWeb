package com.bootdo.activiti.service;

import java.util.List;

import com.bootdo.activiti.domain.Tjfx_OvertimeBar;
import com.bootdo.activiti.domain.Tjfx_WorkflowBarDO;
/**
 * 
 * @author zhangf
 * @date 2018-07-14
 */
public interface TjfxService {

	//工作流柱状图数据
	List<Tjfx_WorkflowBarDO> getWorkflowBar(Object[] conditions);
	//加班柱状图数据
	List<Tjfx_OvertimeBar> getOvertimeBar(Object[] conditions);
	//当前年度
	String getCurrentYear();
}

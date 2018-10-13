package com.bootdo.activiti.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.bootdo.activiti.domain.Tjfx_OvertimeBar;
import com.bootdo.activiti.domain.Tjfx_WorkflowBarDO;


/**
 * 统计分析
 * @author zhangf
 * @date 2018-07-04 
 */
@Mapper
public interface TjfxDao {

	//工作流柱状图数据
	List<Tjfx_WorkflowBarDO> getWorkflowBarByConditions(@Param("year")Object year,@Param("duty")String[] duty_people);
	//加班柱状图数据
	List<Tjfx_OvertimeBar> getOvertimeBarByConditions(@Param("year")Object year,@Param("duty")String[] duty_people);
	//当前年度
	String getCurrentYear();
	//List<Tjfx_WorkflowBarDO> getWorkflowBar(Object object, Object object2);
}

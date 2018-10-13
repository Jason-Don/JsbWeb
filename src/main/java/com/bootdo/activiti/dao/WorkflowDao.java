package com.bootdo.activiti.dao;

import com.bootdo.activiti.domain.WorkflowDO;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

/**
 * 工作流程表
 * @author zhangf
 * @email ${email}
 * @date 2018-06-20 16:32:03
 */
@Mapper
public interface WorkflowDao {

	WorkflowDO get(String taskId);
	
	String get_qt_rwly(String taskId);
	
	List<WorkflowDO> list(Map<String,Object> map);
	
	int count(Map<String,Object> map);
	
	int save(WorkflowDO workflow);
	
	int update(WorkflowDO workflow);
	
	int updateRwly(String id,String rwly);
	
	int updateQtRwly(String id,String rwly );
	
	int remove(String task_id);
	
	int batchRemove(String[] taskIds);
	
	void delete_from_act(String[] taskIds);
	
	boolean save_new_rwly(String id,String rwly);
}

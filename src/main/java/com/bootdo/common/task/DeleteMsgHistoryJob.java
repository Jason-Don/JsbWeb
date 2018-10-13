package com.bootdo.common.task;

import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.bootdo.msg.msgDB.service.TSendService;
/**
 * @author zhangf
 * @date 2018-08-23
 */
@Component
public class DeleteMsgHistoryJob implements Job{
	@Autowired
	TSendService tSendService;
	@Override
	public void execute(JobExecutionContext arg0) throws JobExecutionException {
		tSendService.removeHistory();
	}
}

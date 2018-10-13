package com.bootdo.app.controller;

import java.util.Date;
import java.util.List;
import java.util.Map;

import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.bootdo.common.config.Constant;
import com.bootdo.common.controller.BaseController;
import com.bootdo.common.utils.R;
import com.bootdo.oa.domain.NotifyDO;
import com.bootdo.oa.domain.NotifyRecordDO;
import com.bootdo.oa.service.NotifyRecordService;
import com.bootdo.oa.service.NotifyService;

@Controller
@RequestMapping("/app/notice")
public class AppNoticeController extends BaseController {
	@Autowired
	private NotifyService notifyService;
	@Autowired
	private NotifyRecordService notifyRecordService;

	@GetMapping()
	String OpenNoticePage() {
		return "app/notice_message/notice_message";
	}

	@GetMapping("/read/{id}")
	@RequiresPermissions("oa:notify:edit")
	String read(@PathVariable("id") Long id, Model model) {
		NotifyDO notify = notifyService.get(id);
		// 更改阅读状态
		NotifyRecordDO notifyRecordDO = new NotifyRecordDO();
		notifyRecordDO.setNotifyId(id);
		notifyRecordDO.setUserId(getUserId());
		notifyRecordDO.setReadDate(new Date());
		notifyRecordDO.setIsRead(Constant.OA_NOTIFY_READ_YES);
		notifyRecordService.changeRead(notifyRecordDO);
		model.addAttribute("notify", notify);
		return "app/notice_message/notice_message_detail";
	}

	@ResponseBody
	@PostMapping("/batch_read")
	int batch_read(@RequestParam("idlist[]") Long[] idlist) {
		int n=0;
		for(Long id:idlist)
		{// 更改阅读状态
			NotifyRecordDO notifyRecordDO = new NotifyRecordDO();
			notifyRecordDO.setNotifyId(id);
			notifyRecordDO.setUserId(getUserId());
			notifyRecordDO.setReadDate(new Date());
			notifyRecordDO.setIsRead(Constant.OA_NOTIFY_READ_YES);
			n+=notifyRecordService.changeRead(notifyRecordDO);
		}
		return n;
	}
}

package com.bootdo.activiti.controller;

import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.bootdo.activiti.domain.CalendarDO;
import com.bootdo.activiti.service.CalendarService;
import com.bootdo.common.utils.PageUtils;
import com.bootdo.common.utils.Query;
import com.bootdo.common.utils.R;
import com.bootdo.common.utils.ShiroUtils;

/**
 * 
 * 
 * @author zhangf
 * @email ${email}
 * @date 2018-07-05 15:43:58
 */
 
@Controller
@RequestMapping("/activiti/calendar")
public class CalendarController {
	@Autowired
	private CalendarService calendarService;
	
	/**
	 * 保存
	 */
	@ResponseBody
	@RequestMapping("/getCalendarEvents")
	public Map<String,Object> getCalendarEvents(){
		return calendarService.get(ShiroUtils.getUserId());
	}
	/**
	 * 保存
	 */
	@ResponseBody
	@PostMapping("/save")
	public R save( CalendarDO calendar){
		calendar.setUserId(ShiroUtils.getUserId());
		calendar.setEventId(UUID.randomUUID().toString().replace("-",""));
		calendar.setSjscsj(new Date());
		if(calendarService.save(calendar)>0){
			return R.ok();
		}
		return R.error();
	}
	/**
	 * 修改
	 */
	@ResponseBody
	@RequestMapping("/update")
	public R update( CalendarDO calendar){
		calendarService.update(calendar);
		return R.ok();
	}
	
	/**
	 * 删除
	 */
	@PostMapping( "/remove/{eventId}")
	@ResponseBody
	public R remove(@PathVariable("eventId") String eventId){
		if(calendarService.remove(eventId)>0){
		return R.ok();
		}
		return R.error();
	}
	
	
}

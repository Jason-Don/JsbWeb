package com.bootdo.activiti.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.bootdo.activiti.dao.CalendarDao;
import com.bootdo.activiti.domain.CalendarDO;
import com.bootdo.activiti.service.CalendarService;



@Service
public class CalendarServiceImpl implements CalendarService {
	@Autowired
	private CalendarDao calendarDao;
	
	@Override
	public Map<String,Object> get(Long userId){
		List<CalendarDO> calendarList = calendarDao.get(userId);
		Map<String,Object> map = new HashMap<String,Object>();
	    Map<String,ArrayList<String>> dateeventsMap = new HashMap<String,ArrayList<String>>();
	    Map<String,ArrayList<String>> eventsMap = new HashMap<String,ArrayList<String>>();
	    map.put("dateevents", dateeventsMap);
	    map.put("events", eventsMap);
		for(CalendarDO ca : calendarList){
			SimpleDateFormat sDateFormat=new SimpleDateFormat("yyyy-MM-dd");   
			String key=sDateFormat.format(ca.getSsrq()); 
			
			ArrayList<String> dateeventsList = dateeventsMap.get(key);
			if(dateeventsList == null){//为空则需要新建key-value
				ArrayList<String> array = new ArrayList<String>();
				array.add(ca.getEventId());//id放进数据
				dateeventsMap.put(key, array);//key和对应数组放到map
			}else{//不为空 直接放key映射的value中
				dateeventsList.add(ca.getEventId());
			}
			
			
			ArrayList<String> eventsList = eventsMap.get(ca.getEventId());
			SimpleDateFormat sDateFormat2=new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");   
				ArrayList<String> array = new ArrayList<String>();
				array.add(ca.getEventId());
				array.add(ca.getTitle());
				array.add(ca.getContent());
				array.add(ca.getRemindType());
				array.add(ca.getRemindTime() == null ? null:sDateFormat2.format(ca.getRemindTime()));
				eventsMap.put(ca.getEventId(), array);
		}
		
		return map;
	}
	
	@Override
	public int save(CalendarDO calendar){
		return calendarDao.save(calendar);
	}
	
	@Override
	public int update(CalendarDO calendar){
		return calendarDao.update(calendar);
	}
	
	@Override
	public int remove(String userId){
		return calendarDao.remove(userId);
	}
	
}

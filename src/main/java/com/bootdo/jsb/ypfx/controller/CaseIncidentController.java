package com.bootdo.jsb.ypfx.controller;

import java.util.List;
import java.util.Map;

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

import com.bootdo.jsb.ypfx.domain.CaseIncidentDO;
import com.bootdo.jsb.ypfx.service.CaseIncidentService;
import com.bootdo.common.utils.PageUtils;
import com.bootdo.common.utils.Query;
import com.bootdo.common.utils.R;

/**
 * 
 * 
 * @author wu
 * @email 1992lcg@163.com
 * @date 2018-10-11 09:23:28
 */
 
@Controller
@RequestMapping("/ypfx/caseIncident")
public class CaseIncidentController {
	@Autowired
	private CaseIncidentService caseIncidentService;
	
	@GetMapping("/caseIncident")
	//@RequiresPermissions("ypfx:caseIncident:caseIncident")
	String CaseIncident(){
	    return "jsb/ypfx/caseIncident/caseIncident";
	}
	
	@ResponseBody
	@GetMapping("/list")
	//@RequiresPermissions("ypfx:caseIncident:caseIncident")
	public PageUtils list(@RequestParam Map<String, Object> params){
		//查询列表数据
        Query query = new Query(params);
		List<CaseIncidentDO> caseIncidentList = caseIncidentService.list(query);
		int total = caseIncidentService.count(query);
		PageUtils pageUtils = new PageUtils(caseIncidentList, total);
		return pageUtils;
	}
	
	@GetMapping("/add")
	//@RequiresPermissions("ypfx:caseIncident:add")
	String add(){
	    return "jsb/ypfx/caseIncident/add";
	}

	@GetMapping("/edit/{id}")
	//@RequiresPermissions("ypfx:caseIncident:edit")
	String edit(@PathVariable("id") Integer id,Model model){
		CaseIncidentDO caseIncident = caseIncidentService.get(id);
		model.addAttribute("caseIncident", caseIncident);
	    return "jsb/ypfx/caseIncident/edit";
	}
	
	/**
	 * 保存
	 */
	@ResponseBody
	@PostMapping("/save")
	//@RequiresPermissions("ypfx:caseIncident:add")
	public R save( CaseIncidentDO caseIncident){
		if(caseIncidentService.save(caseIncident)>0){
			return R.ok();
		}
		return R.error();
	}
	/**
	 * 修改
	 */
	@ResponseBody
	@RequestMapping("/update")
	//@RequiresPermissions("ypfx:caseIncident:edit")
	public R update( CaseIncidentDO caseIncident){
		caseIncidentService.update(caseIncident);
		return R.ok();
	}
	
	/**
	 * 删除
	 */
	@PostMapping( "/remove")
	@ResponseBody
	//@RequiresPermissions("ypfx:caseIncident:remove")
	public R remove( Integer id){
		if(caseIncidentService.remove(id)>0){
		return R.ok();
		}
		return R.error();
	}
	
	/**
	 * 删除
	 */
	@PostMapping( "/batchRemove")
	@ResponseBody
	//@RequiresPermissions("ypfx:caseIncident:batchRemove")
	public R remove(@RequestParam("ids[]") Integer[] ids){
		caseIncidentService.batchRemove(ids);
		return R.ok();
	}
	
}

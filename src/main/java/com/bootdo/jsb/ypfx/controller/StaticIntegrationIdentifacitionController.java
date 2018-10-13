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

import com.bootdo.jsb.ypfx.domain.StaticIntegrationIdentifacitionDO;
import com.bootdo.jsb.ypfx.service.StaticIntegrationIdentifacitionService;
import com.bootdo.common.utils.PageUtils;
import com.bootdo.common.utils.Query;
import com.bootdo.common.utils.R;

/**
 * 患者信息表
 * 
 * @author wu
 * @email 1992lcg@163.com
 * @date 2018-10-12 17:16:43
 */
 
@Controller
@RequestMapping("/ypfx/staticIntegrationIdentifacition")
public class StaticIntegrationIdentifacitionController {
	@Autowired
	private StaticIntegrationIdentifacitionService staticIntegrationIdentifacitionService;
	
	@GetMapping()
	//@RequiresPermissions("ypfx:staticIntegrationIdentifacition:staticIntegrationIdentifacition")
	String StaticIntegrationIdentifacition(){
	    return "jsb/ypfx/staticIntegrationIdentifacition/staticIntegrationIdentifacition";
	}
	
	@ResponseBody
	@GetMapping("/list")
	//@RequiresPermissions("ypfx:staticIntegrationIdentifacition:staticIntegrationIdentifacition")
	public PageUtils list(@RequestParam Map<String, Object> params){
		//查询列表数据
        Query query = new Query(params);
		List<StaticIntegrationIdentifacitionDO> staticIntegrationIdentifacitionList = staticIntegrationIdentifacitionService.list(query);
		int total = staticIntegrationIdentifacitionService.count(query);
		PageUtils pageUtils = new PageUtils(staticIntegrationIdentifacitionList, total);
		return pageUtils;
	}
	
	@GetMapping("/add")
	//@RequiresPermissions("ypfx:staticIntegrationIdentifacition:add")
	String add(){
	    return "jsb/ypfx/staticIntegrationIdentifacition/add";
	}

	@GetMapping("/edit/{id}")
	//@RequiresPermissions("ypfx:staticIntegrationIdentifacition:edit")
	String edit(@PathVariable("id") Integer id,Model model){
		StaticIntegrationIdentifacitionDO staticIntegrationIdentifacition = staticIntegrationIdentifacitionService.get(id);
		model.addAttribute("staticIntegrationIdentifacition", staticIntegrationIdentifacition);
	    return "jsb/ypfx/staticIntegrationIdentifacition/edit";
	}
	
	/**
	 * 保存
	 */
	@ResponseBody
	@PostMapping("/save")
	//@RequiresPermissions("ypfx:staticIntegrationIdentifacition:add")
	public R save( StaticIntegrationIdentifacitionDO staticIntegrationIdentifacition){
		if(staticIntegrationIdentifacitionService.save(staticIntegrationIdentifacition)>0){
			return R.ok();
		}
		return R.error();
	}
	/**
	 * 修改
	 */
	@ResponseBody
	@RequestMapping("/update")
	//@RequiresPermissions("ypfx:staticIntegrationIdentifacition:edit")
	public R update( StaticIntegrationIdentifacitionDO staticIntegrationIdentifacition){
		staticIntegrationIdentifacitionService.update(staticIntegrationIdentifacition);
		return R.ok();
	}
	
	/**
	 * 删除
	 */
	@PostMapping( "/remove")
	@ResponseBody
	//@RequiresPermissions("ypfx:staticIntegrationIdentifacition:remove")
	public R remove( Integer id){
		if(staticIntegrationIdentifacitionService.remove(id)>0){
		return R.ok();
		}
		return R.error();
	}
	
	/**
	 * 删除
	 */
	@PostMapping( "/batchRemove")
	@ResponseBody
	//@RequiresPermissions("ypfx:staticIntegrationIdentifacition:batchRemove")
	public R remove(@RequestParam("ids[]") Integer[] ids){
		staticIntegrationIdentifacitionService.batchRemove(ids);
		return R.ok();
	}
	
}

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

import com.bootdo.jsb.ypfx.domain.VehiclePatientDO;
import com.bootdo.jsb.ypfx.service.VehiclePatientService;
import com.bootdo.common.utils.PageUtils;
import com.bootdo.common.utils.Query;
import com.bootdo.common.utils.R;

/**
 * 
 * 
 * @author wu
 * @email 1992lcg@163.com
 * @date 2018-10-11 17:38:03
 */
 
@Controller
@RequestMapping("/ypfx/vehiclePatient")
public class VehiclePatientController {
	@Autowired
	private VehiclePatientService vehiclePatientService;
	
	@GetMapping()
	//@RequiresPermissions("ypfx:vehiclePatient:vehiclePatient")
	String VehiclePatient(){
	    return "jsb/ypfx/vehiclePatient/vehiclePatient";
	}
	
	@ResponseBody
	@GetMapping("/list")
	//@RequiresPermissions("ypfx:vehiclePatient:vehiclePatient")
	public PageUtils list(@RequestParam Map<String, Object> params){
		//查询列表数据
        Query query = new Query(params);
		List<VehiclePatientDO> vehiclePatientList = vehiclePatientService.list(query);
		int total = vehiclePatientService.count(query);
		PageUtils pageUtils = new PageUtils(vehiclePatientList, total);
		return pageUtils;
	}
	
	@GetMapping("/add")
	//@RequiresPermissions("ypfx:vehiclePatient:add")
	String add(){
	    return "jsb/ypfx/vehiclePatient/add";
	}

	@GetMapping("/edit/{id}")
	//@RequiresPermissions("ypfx:vehiclePatient:edit")
	String edit(@PathVariable("id") Integer id,Model model){
		VehiclePatientDO vehiclePatient = vehiclePatientService.get(id);
		model.addAttribute("vehiclePatient", vehiclePatient);
	    return "jsb/ypfx/vehiclePatient/edit";
	}
	
	/**
	 * 保存
	 */
	@ResponseBody
	@PostMapping("/save")
	//@RequiresPermissions("ypfx:vehiclePatient:add")
	public R save( VehiclePatientDO vehiclePatient){
		if(vehiclePatientService.save(vehiclePatient)>0){
			return R.ok();
		}
		return R.error();
	}
	/**
	 * 修改
	 */
	@ResponseBody
	@RequestMapping("/update")
	//@RequiresPermissions("ypfx:vehiclePatient:edit")
	public R update( VehiclePatientDO vehiclePatient){
		vehiclePatientService.update(vehiclePatient);
		return R.ok();
	}
	
	/**
	 * 删除
	 */
	@PostMapping( "/remove")
	@ResponseBody
	//@RequiresPermissions("ypfx:vehiclePatient:remove")
	public R remove( Integer id){
		if(vehiclePatientService.remove(id)>0){
		return R.ok();
		}
		return R.error();
	}
	
	/**
	 * 删除
	 */
	@PostMapping( "/batchRemove")
	@ResponseBody
	//@RequiresPermissions("ypfx:vehiclePatient:batchRemove")
	public R remove(@RequestParam("ids[]") Integer[] ids){
		vehiclePatientService.batchRemove(ids);
		return R.ok();
	}
	
}

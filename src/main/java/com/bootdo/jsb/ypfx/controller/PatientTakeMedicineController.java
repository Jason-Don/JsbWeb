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

import com.bootdo.jsb.ypfx.domain.PatientTakeMedicineDO;
import com.bootdo.jsb.ypfx.service.PatientTakeMedicineService;
import com.bootdo.common.utils.PageUtils;
import com.bootdo.common.utils.Query;
import com.bootdo.common.utils.R;

/**
 * 
 * 
 * @author wu
 * @email 1992lcg@163.com
 * @date 2018-10-12 09:46:07
 */
 
@Controller
@RequestMapping("/ypfx/patientTakeMedicine")
public class PatientTakeMedicineController {
	@Autowired
	private PatientTakeMedicineService patientTakeMedicineService;
	
	@GetMapping()
	//@RequiresPermissions("ypfx:patientTakeMedicine:patientTakeMedicine")
	String PatientTakeMedicine(){
	    return "jsb/ypfx/patientTakeMedicine/patientTakeMedicine";
	}
	
	@ResponseBody
	@GetMapping("/list")
	//@RequiresPermissions("ypfx:patientTakeMedicine:patientTakeMedicine")
	public PageUtils list(@RequestParam Map<String, Object> params){
		//查询列表数据
        Query query = new Query(params);
		List<PatientTakeMedicineDO> patientTakeMedicineList = patientTakeMedicineService.list(query);
		int total = patientTakeMedicineService.count(query);
		PageUtils pageUtils = new PageUtils(patientTakeMedicineList, total);
		return pageUtils;
	}
	
	@GetMapping("/add")
	//@RequiresPermissions("ypfx:patientTakeMedicine:add")
	String add(){
	    return "jsb/ypfx/patientTakeMedicine/add";
	}

	@GetMapping("/edit/{id}")
	//@RequiresPermissions("ypfx:patientTakeMedicine:edit")
	String edit(@PathVariable("id") Integer id,Model model){
		PatientTakeMedicineDO patientTakeMedicine = patientTakeMedicineService.get(id);
		model.addAttribute("patientTakeMedicine", patientTakeMedicine);
	    return "jsb/ypfx/patientTakeMedicine/edit";
	}
	
	/**
	 * 保存
	 */
	@ResponseBody
	@PostMapping("/save")
	//@RequiresPermissions("ypfx:patientTakeMedicine:add")
	public R save( PatientTakeMedicineDO patientTakeMedicine){
		if(patientTakeMedicineService.save(patientTakeMedicine)>0){
			return R.ok();
		}
		return R.error();
	}
	/**
	 * 修改
	 */
	@ResponseBody
	@RequestMapping("/update")
	//@RequiresPermissions("ypfx:patientTakeMedicine:edit")
	public R update( PatientTakeMedicineDO patientTakeMedicine){
		patientTakeMedicineService.update(patientTakeMedicine);
		return R.ok();
	}
	
	/**
	 * 删除
	 */
	@PostMapping( "/remove")
	@ResponseBody
	//@RequiresPermissions("ypfx:patientTakeMedicine:remove")
	public R remove( Integer id){
		if(patientTakeMedicineService.remove(id)>0){
		return R.ok();
		}
		return R.error();
	}
	
	/**
	 * 删除
	 */
	@PostMapping( "/batchRemove")
	@ResponseBody
	//@RequiresPermissions("ypfx:patientTakeMedicine:batchRemove")
	public R remove(@RequestParam("ids[]") Integer[] ids){
		patientTakeMedicineService.batchRemove(ids);
		return R.ok();
	}
	
}

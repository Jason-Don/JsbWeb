package com.bootdo.jsb.ywgl.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.bootdo.common.utils.PageUtils;
import com.bootdo.common.utils.Query;
import com.bootdo.common.utils.R;
import com.bootdo.jsb.ywgl.domain.JsbHzxxDO;
import com.bootdo.jsb.ywgl.service.JsbHzxxService;

/**
 * 患者信息表
 * 
 * @author zhangf
 * @date 2018-10-08 18:38:01
 */
 
@Controller
@RequestMapping("/ywgl")
public class JsbHzxxController {
	@Autowired
	private JsbHzxxService jsbHzxxService;
	
	@GetMapping("/xxhc")
	//@RequiresPermissions("ywgl:xxhc")
	String JsbHzxx(){
	    return "jsb/ywgl/xxhc";
	}
	//信息查询页
	@GetMapping("xxcx")
	String JsbHzxx_cx(){
	    return "jsb/ywgl/xxcx";
	}
	//信息查询页
	@GetMapping("pgis")
	String JsbHzxx_pgis(){
	    return "jsb/ywgl/pgis";
	}
	@ResponseBody
	@GetMapping("/list")
	//@RequiresPermissions("ywgl:jsbHzxx:jsbHzxx")
	public PageUtils list(@RequestParam Map<String, Object> params){
		//查询列表数据
        Query query = new Query(params);
		List<JsbHzxxDO> jsbHzxxList = jsbHzxxService.list(query);
		int total = jsbHzxxService.count(query);
		PageUtils pageUtils = new PageUtils(jsbHzxxList, total);
		return pageUtils;
	}
	
	@GetMapping("/add")
	//@RequiresPermissions("ywgl:jsbHzxx:add")
	String add(){
	    return "jsb/ywgl/jsbHzxx/hc";
	}

	@GetMapping("/hc/{id}")
	//@RequiresPermissions("ywgl:jsbHzxx:edit")
	String edit(@PathVariable("id") Integer id,Model model){
		JsbHzxxDO jsbHzxx = jsbHzxxService.get(id);
		model.addAttribute("jsbHzxx", jsbHzxx);
	    return "jsb/ywgl/jsbHzxx/hc";
	}
	
	@GetMapping("/return/{id}")
	String reject(@PathVariable("id") Integer id,Model model){
	    return "jsb/ywgl/jsbHzxx/return";
	}
	/**
	 * 保存
	 */
	@ResponseBody
	@PostMapping("/save")
	//@RequiresPermissions("ywgl:jsbHzxx:add")
	public R save( JsbHzxxDO jsbHzxx){
		if(jsbHzxxService.save(jsbHzxx)>0){
			return R.ok();
		}
		return R.error();
	}
	/**
	 * 修改
	 */
	@ResponseBody
	@RequestMapping("/update")
	//@RequiresPermissions("ywgl:jsbHzxx:edit")
	public R update( JsbHzxxDO jsbHzxx){
		jsbHzxxService.update(jsbHzxx);
		return R.ok();
	}
	
	/**
	 * 删除
	 */
	@PostMapping( "/remove")
	@ResponseBody
	//@RequiresPermissions("ywgl:jsbHzxx:remove")
	public R remove( Integer id){
		if(jsbHzxxService.remove(id)>0){
		return R.ok();
		}
		return R.error();
	}
	
	/**
	 * 批量删除
	 */
	@PostMapping( "/batchRemove")
	@ResponseBody
	//@RequiresPermissions("ywgl:jsbHzxx:batchRemove")
	public R remove(@RequestParam("ids[]") Integer[] ids){
		jsbHzxxService.batchRemove(ids);
		return R.ok();
	}
	//获取大数据里面的个人信息
	@GetMapping("/getPerInfo/{sfzh}")
	@ResponseBody
	public String getPerInfo(@PathVariable("sfzh") String sfzh){
		HashMap<String, String> person=(HashMap<String, String>) jsbHzxxService.getPerInfo(sfzh);
		System.out.println(person.toString());
		JSONObject jsonObject=new JSONObject(person);//先转json对象
		return jsonObject.toString();//最终返回字符串
	}
	
	@GetMapping("/ishave/{sfzh}")
	@ResponseBody
	public int ishave(@PathVariable("sfzh") String sfzh){
		Map<String, Object> map=new HashMap<String, Object>();
		map.put("sfzh", sfzh);
		int count=jsbHzxxService.count(map);
		return count;//最终返回患者数量
	}
}

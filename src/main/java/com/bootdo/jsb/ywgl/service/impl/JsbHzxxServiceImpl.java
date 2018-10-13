package com.bootdo.jsb.ywgl.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

import com.bootdo.bigData.bigDataDB.dao.XxhcDao;
import com.bootdo.jsb.ywgl.dao.JsbHzxxDao;
import com.bootdo.jsb.ywgl.domain.JsbHzxxDO;
import com.bootdo.jsb.ywgl.service.JsbHzxxService;



@Service
public class JsbHzxxServiceImpl implements JsbHzxxService {
	@Autowired
	private JsbHzxxDao jsbHzxxDao;
	@Autowired
	private XxhcDao xxhcDao;
	
	@Override
	public JsbHzxxDO get(Integer id){
		JsbHzxxDO jsb=jsbHzxxDao.get(id);
		String hjpcs=jsbHzxxDao.getPcsMc(jsb.getHjpcsjgdm());
		String xzpcs=jsbHzxxDao.getPcsMc(jsb.getXzpcsjgdm());
		jsb.setHjpcs(hjpcs);
		jsb.setXzpcs(xzpcs);
		return jsb;
	}
	
	@Override
	public List<JsbHzxxDO> list(Map<String, Object> map){
		List<JsbHzxxDO> jsblist=jsbHzxxDao.list(map);
		for (JsbHzxxDO jsb : jsblist) {
			String hjpcs = jsbHzxxDao.getPcsMc(jsb.getHjpcsjgdm());
			String xzpcs = jsbHzxxDao.getPcsMc(jsb.getXzpcsjgdm());
			jsb.setHjpcs(hjpcs);
			jsb.setXzpcs(xzpcs);
		}
		return jsblist;
	}
	
	@Override
	public int count(Map<String, Object> map){
		return jsbHzxxDao.count(map);
	}
	
	@Override
	public int save(JsbHzxxDO jsbHzxx){
		return jsbHzxxDao.save(jsbHzxx);
	}
	
	@Override
	public int update(JsbHzxxDO jsbHzxx){
		return jsbHzxxDao.update(jsbHzxx);
	}
	
	@Override
	public int remove(Integer id){
		return jsbHzxxDao.remove(id);
	}
	
	@Override
	public int batchRemove(Integer[] ids){
		return jsbHzxxDao.batchRemove(ids);
	}

	@SuppressWarnings("unchecked")
	@Override
	public Map<String, String> getPerInfo(String sfzh) {
		return xxhcDao.getPerInfo(sfzh);
	}
}

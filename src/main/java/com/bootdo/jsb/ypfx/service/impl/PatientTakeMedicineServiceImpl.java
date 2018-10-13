package com.bootdo.jsb.ypfx.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

import com.bootdo.jsb.ypfx.dao.PatientTakeMedicineDao;
import com.bootdo.jsb.ypfx.domain.PatientTakeMedicineDO;
import com.bootdo.jsb.ypfx.service.PatientTakeMedicineService;



@Service
public class PatientTakeMedicineServiceImpl implements PatientTakeMedicineService {
	@Autowired
	private PatientTakeMedicineDao patientTakeMedicineDao;
	
	@Override
	public PatientTakeMedicineDO get(Integer id){
		return patientTakeMedicineDao.get(id);
	}
	
	@Override
	public List<PatientTakeMedicineDO> list(Map<String, Object> map){
		return patientTakeMedicineDao.list(map);
	}
	
	@Override
	public int count(Map<String, Object> map){
		return patientTakeMedicineDao.count(map);
	}
	
	@Override
	public int save(PatientTakeMedicineDO patientTakeMedicine){
		return patientTakeMedicineDao.save(patientTakeMedicine);
	}
	
	@Override
	public int update(PatientTakeMedicineDO patientTakeMedicine){
		return patientTakeMedicineDao.update(patientTakeMedicine);
	}
	
	@Override
	public int remove(Integer id){
		return patientTakeMedicineDao.remove(id);
	}
	
	@Override
	public int batchRemove(Integer[] ids){
		return patientTakeMedicineDao.batchRemove(ids);
	}
	
}

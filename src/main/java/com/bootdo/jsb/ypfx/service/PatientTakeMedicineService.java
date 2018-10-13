package com.bootdo.jsb.ypfx.service;

import com.bootdo.jsb.ypfx.domain.PatientTakeMedicineDO;

import java.util.List;
import java.util.Map;

/**
 * 
 * 
 * @author wu
 * @email 1992lcg@163.com
 * @date 2018-10-12 09:46:07
 */
public interface PatientTakeMedicineService {
	
	PatientTakeMedicineDO get(Integer id);
	
	List<PatientTakeMedicineDO> list(Map<String, Object> map);
	
	int count(Map<String, Object> map);
	
	int save(PatientTakeMedicineDO patientTakeMedicine);
	
	int update(PatientTakeMedicineDO patientTakeMedicine);
	
	int remove(Integer id);
	
	int batchRemove(Integer[] ids);
}

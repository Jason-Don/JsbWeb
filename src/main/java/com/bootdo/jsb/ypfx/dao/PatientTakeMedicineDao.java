package com.bootdo.jsb.ypfx.dao;

import com.bootdo.jsb.ypfx.domain.PatientTakeMedicineDO;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

/**
 * 
 * @author wu
 * @email 1992lcg@163.com
 * @date 2018-10-12 09:46:07
 */
@Mapper
public interface PatientTakeMedicineDao {

	PatientTakeMedicineDO get(Integer id);
	
	List<PatientTakeMedicineDO> list(Map<String,Object> map);
	
	int count(Map<String,Object> map);
	
	int save(PatientTakeMedicineDO patientTakeMedicine);
	
	int update(PatientTakeMedicineDO patientTakeMedicine);
	
	int remove(Integer id);
	
	int batchRemove(Integer[] ids);
}

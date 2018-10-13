package com.bootdo.jsb.ypfx.dao;

import com.bootdo.jsb.ypfx.domain.VehiclePatientDO;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

/**
 * 
 * @author wu
 * @email 1992lcg@163.com
 * @date 2018-10-11 17:38:03
 */
@Mapper
public interface VehiclePatientDao {

	VehiclePatientDO get(Integer id);
	
	List<VehiclePatientDO> list(Map<String,Object> map);
	
	int count(Map<String,Object> map);
	
	int save(VehiclePatientDO vehiclePatient);
	
	int update(VehiclePatientDO vehiclePatient);
	
	int remove(Integer id);
	
	int batchRemove(Integer[] ids);
}

package com.bootdo.jsb.ypfx.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

import com.bootdo.jsb.ypfx.dao.VehiclePatientDao;
import com.bootdo.jsb.ypfx.domain.VehiclePatientDO;
import com.bootdo.jsb.ypfx.service.VehiclePatientService;



@Service
public class VehiclePatientServiceImpl implements VehiclePatientService {
	@Autowired
	private VehiclePatientDao vehiclePatientDao;
	
	@Override
	public VehiclePatientDO get(Integer id){
		return vehiclePatientDao.get(id);
	}
	
	@Override
	public List<VehiclePatientDO> list(Map<String, Object> map){
		return vehiclePatientDao.list(map);
	}
	
	@Override
	public int count(Map<String, Object> map){
		return vehiclePatientDao.count(map);
	}
	
	@Override
	public int save(VehiclePatientDO vehiclePatient){
		return vehiclePatientDao.save(vehiclePatient);
	}
	
	@Override
	public int update(VehiclePatientDO vehiclePatient){
		return vehiclePatientDao.update(vehiclePatient);
	}
	
	@Override
	public int remove(Integer id){
		return vehiclePatientDao.remove(id);
	}
	
	@Override
	public int batchRemove(Integer[] ids){
		return vehiclePatientDao.batchRemove(ids);
	}
	
}

package com.bootdo.common.dao;


import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.bootdo.common.domain.FilesDO;

/**
 * 
 * @author zhangf
 * @email ${email}
 * @date 2018-06-27 16:13:25
 */
@Mapper
public interface FilesDao {

	FilesDO get(String fileId);
	
	List<FilesDO> list(Map<String,Object> map);
	
	int count(Map<String,Object> map);
	
	int save(FilesDO files);
	
	int update(FilesDO files);
	
	int remove(String file_id);
	
	int batchRemove(String[] fileIds);
}

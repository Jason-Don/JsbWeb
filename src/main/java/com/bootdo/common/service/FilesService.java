package com.bootdo.common.service;

import java.util.List;
import java.util.Map;

import org.springframework.web.multipart.MultipartFile;

import com.bootdo.common.domain.FilesDO;

/**
 * 
 * 
 * @author zhangf
 * @email ${email}
 * @date 2018-06-27 16:13:25
 */
public interface FilesService {
	
	FilesDO get(String fileId);
	
	List<FilesDO> list(Map<String, Object> map);
	
	int count(Map<String, Object> map);
	
	int save(FilesDO files);
	String save(MultipartFile file);
	
	boolean deleteFileOnServer(String url);
	int deleteFileOnServerBatch(String... urls);
	
	int update(FilesDO files);
	int update(MultipartFile file,String id);
	
	int remove(String fileId);
	
	int batchRemove(String[] fileIds);
}

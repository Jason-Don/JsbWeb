package com.bootdo.common.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.bootdo.common.config.BootdoConfig;
import com.bootdo.common.dao.FilesDao;
import com.bootdo.common.domain.FilesDO;
import com.bootdo.common.service.FilesService;
import com.bootdo.common.utils.FileUtil;
import com.bootdo.common.utils.R;
import com.bootdo.common.utils.ShiroUtils;

import java.io.IOException;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.UUID;




@Service
public class FilesServiceImpl implements FilesService {
	@Autowired
	private BootdoConfig bootdoConfig;
	@Autowired
	private FilesDao filesDao;
	
	@Override
	public FilesDO get(String fileId){
		return filesDao.get(fileId);
	}
	
	@Override
	public List<FilesDO> list(Map<String, Object> map){
		return filesDao.list(map);
	}
	
	@Override
	public int count(Map<String, Object> map){
		return filesDao.count(map);
	}
	
	@Override
	public int save(FilesDO files){
		return filesDao.save(files);
	}
	@Override
	public boolean deleteFileOnServer(String url){
		if(null!=url){
			return FileUtil.deleteFile(bootdoConfig.getUploadPath()+url.replace("/files/", ""));
		}else{
			return false;
		}
		
	}
	@Override
	public int deleteFileOnServerBatch(String... urls){
		int deleteNum = 0;
		for(String url:urls){
			if(deleteFileOnServer(url))deleteNum++;
		}
		return deleteNum;
	}
	private FilesDO savaFileOnServer(MultipartFile file,String id){
		FilesDO filesDO = new FilesDO();
		String fileName = file.getOriginalFilename();
		String fileName2 = FileUtil.renameToUUID(fileName);
		filesDO.setFileId(id);
		filesDO.setFileMc(fileName);
		//修改把文件保存在服务器中，不保存在数据库中
		try {
			
			FileUtil.uploadFile(file.getBytes(), bootdoConfig.getUploadPath(), fileName2);
		} catch (Exception e) {
			
		}
		byte[] content=new byte[1];
		/*try {
			content = file.getBytes();
			filesDO.setContent(content);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}*/
		filesDO.setContent(content);
		filesDO.setCreateTime(new Date());
		filesDO.setCreateUser(String.valueOf(ShiroUtils.getUser().getUserId()));
		filesDO.setUrl("/files/" + fileName2);
		
		return filesDO;
	}
	public String save(MultipartFile file){
		String id = UUID.randomUUID().toString().replace("-", "");
		FilesDO filesDO = savaFileOnServer(file,id);
		save(filesDO);
		return id;
	}
	
	@Override
	public int update(FilesDO files){
		return filesDao.update(files);
	}
	public int update(MultipartFile file,String id){
		//先删除旧的
		FilesDO filesDO1 = filesDao.get(id);
		if(null != filesDO1){
			deleteFileOnServer(filesDO1.getUrl());	
		}
		//保存新的
		FilesDO filesDO = savaFileOnServer(file,id);
		return update(filesDO);
	}
	
	@Override
	public int remove(String fileId){
		return filesDao.remove(fileId);
	}
	
	@Override
	public int batchRemove(String[] fileIds){
		return filesDao.batchRemove(fileIds);
	}
	
}

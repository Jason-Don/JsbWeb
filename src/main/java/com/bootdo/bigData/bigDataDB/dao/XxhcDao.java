package com.bootdo.bigData.bigDataDB.dao;

import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
@Mapper
public interface XxhcDao {

	Map get();
	Map getPerInfo(String sfzh);
}

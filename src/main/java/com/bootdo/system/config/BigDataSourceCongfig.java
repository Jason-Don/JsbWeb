package com.bootdo.system.config;

import javax.sql.DataSource;

import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.mybatis.spring.SqlSessionTemplate;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;

import com.alibaba.druid.pool.DruidDataSource;

@Configuration
@MapperScan(basePackages = "com.bootdo.bigData.bigDataDB.dao",sqlSessionTemplateRef = "bigDataSqlSessionTemplate")
public class BigDataSourceCongfig {

	static final String MAPPER_LOCATION = "classpath:mybatis/bigDataDB/*Mapper.xml";
	
	@Bean(name="bigDataDataSource")
	@ConfigurationProperties(prefix="spring.datasource.bigDataDB")
	public DataSource setDataSource(){
		return new DruidDataSource();
	}
	@Bean(name="bigDataTransactionManager")
	public DataSourceTransactionManager setTranscationManager(@Qualifier("bigDataDataSource")DataSource dataSource){
		return new DataSourceTransactionManager(dataSource);
	}
	@Bean(name="bigDataSqlSessionFactory")
	public SqlSessionFactory setSqlSessionFactory(@Qualifier("bigDataDataSource")DataSource dataSource) throws Exception{
		final SqlSessionFactoryBean bean = new SqlSessionFactoryBean();
		bean.setDataSource(dataSource);
		bean.setMapperLocations(new PathMatchingResourcePatternResolver().getResources(BigDataSourceCongfig.MAPPER_LOCATION));
		return bean.getObject();
	}
	@Bean(name="bigDataSqlSessionTemplate")
	public SqlSessionTemplate setSqlSessionTemplate(@Qualifier("bigDataSqlSessionFactory")SqlSessionFactory sqlSessionFactory){
		return new SqlSessionTemplate(sqlSessionFactory);
	}
}

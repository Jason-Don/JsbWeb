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
@MapperScan(basePackages = "com.bootdo.msg.msgDB.dao",sqlSessionTemplateRef = "oracleSqlSessionTemplate")
public class MsgDataSourceCongfig {

	static final String MAPPER_LOCATION = "classpath:mybatis/msgDB/*Mapper.xml";
	
	@Bean(name="oracleDataSource")
	@ConfigurationProperties(prefix="spring.datasource.msgDB")
	public DataSource setDataSource(){
		return new DruidDataSource();
	}
	@Bean(name="oracleTransactionManager")
	public DataSourceTransactionManager setTranscationManager(@Qualifier("oracleDataSource")DataSource dataSource){
		return new DataSourceTransactionManager(dataSource);
	}
	@Bean(name="oracleSqlSessionFactory")
	public SqlSessionFactory setSqlSessionFactory(@Qualifier("oracleDataSource")DataSource dataSource) throws Exception{
		final SqlSessionFactoryBean bean = new SqlSessionFactoryBean();
		bean.setDataSource(dataSource);
		bean.setMapperLocations(new PathMatchingResourcePatternResolver().getResources(MsgDataSourceCongfig.MAPPER_LOCATION));
		return bean.getObject();
	}
	@Bean(name="oracleSqlSessionTemplate")
	public SqlSessionTemplate setSqlSessionTemplate(@Qualifier("oracleSqlSessionFactory")SqlSessionFactory sqlSessionFactory){
		return new SqlSessionTemplate(sqlSessionFactory);
	}
}

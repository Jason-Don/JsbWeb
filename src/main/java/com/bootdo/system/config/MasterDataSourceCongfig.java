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
import org.springframework.context.annotation.Primary;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;

import com.alibaba.druid.pool.DruidDataSource;

@Configuration
@MapperScan(basePackages = "com.bootdo.**.dao",sqlSessionTemplateRef = "mysqlSqlSessionTemplate")
public class MasterDataSourceCongfig {

	static final String MAPPER_LOCATION = "classpath:mybatis/masterDB/**/*Mapper.xml";
	
	@Bean(name="mysqlDataSource")
	@Primary
	@ConfigurationProperties(prefix="spring.datasource.masterDB")
	public DataSource setDataSource(){
		return new DruidDataSource();
	}
	@Bean(name="mysqlTransactionManager")
	@Primary
	public DataSourceTransactionManager setTranscationManager(@Qualifier("mysqlDataSource")DataSource dataSource){
		return new DataSourceTransactionManager(dataSource);
	}
	@Bean(name="mysqlSqlSessionFactory")
	@Primary
	public SqlSessionFactory setSqlSessionFactory(@Qualifier("mysqlDataSource")DataSource dataSource) throws Exception{
		final SqlSessionFactoryBean bean = new SqlSessionFactoryBean();
		bean.setDataSource(dataSource);
		bean.setMapperLocations(new PathMatchingResourcePatternResolver().getResources(MAPPER_LOCATION));
		return bean.getObject();
	}
	@Bean(name="mysqlSqlSessionTemplate")
	@Primary
	public SqlSessionTemplate setSqlSessionTemplate(@Qualifier("mysqlSqlSessionFactory")SqlSessionFactory sqlSessionFactory){
		return new SqlSessionTemplate(sqlSessionFactory);
	}
}

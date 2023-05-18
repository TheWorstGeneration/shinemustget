package com.project.smg.config;

import org.elasticsearch.client.RestHighLevelClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.elasticsearch.client.ClientConfiguration;
import org.springframework.data.elasticsearch.client.RestClients;
import org.springframework.data.elasticsearch.config.AbstractElasticsearchConfiguration;
import org.springframework.data.elasticsearch.repository.config.EnableElasticsearchRepositories;
import org.springframework.http.HttpHeaders;

@Configuration
@EnableElasticsearchRepositories
public class ElasticSearchConfig extends AbstractElasticsearchConfiguration {

    @Value("${spring.elasticsearch.uris}")
    public String url;

    @Value("${spring.elasticsearch.username}")
    public String userName;

    @Value("${spring.elasticsearch.password}")
    public String userPassword;

    @Override
    public RestHighLevelClient elasticsearchClient() {
        // DocWriteResponse _doc헤더 설정
        HttpHeaders defaultHeaders = new HttpHeaders();
        defaultHeaders.add("Accept", "application/vnd.elasticsearch+json;compatible-with=7");
        defaultHeaders.add("Content-Type", "application/vnd.elasticsearch+json;compatible-with=7");

        // http port 와 통신할 주소
        ClientConfiguration configuration = ClientConfiguration.builder()
                .connectedTo(url)
                .withBasicAuth(userName, userPassword)
                .withDefaultHeaders(defaultHeaders)
                .build();

        return RestClients.create(configuration).rest();
    }
}
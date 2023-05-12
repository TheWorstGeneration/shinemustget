package com.project.smg.mandalart.repository;

import com.project.smg.mandalart.entity.SearchDocument;
import com.project.smg.mandalart.entity.Title;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.elasticsearch.annotations.Setting;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

@Setting(settingPath = "/elasticsearch/index_settings.json")
public interface SearchRepository extends ElasticsearchRepository<SearchDocument, Integer> {
    Page<SearchDocument> findAllByTitleOrderByLikeCntDesc(String title, Pageable pageable);

//    @Query("{\"bool\": {\"must\": {\"query_string\": {\"query\": \"?0\", \"fields\": [\"title.nori\"], \"analyzer\": \"my_nori_analyzer\"}}}}")
//    Page<SearchDocument> findAllByTitleOrderByLikeCntDesc(String title, Pageable pageable);


}

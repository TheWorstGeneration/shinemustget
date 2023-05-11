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

//    @Query("{ \"bool\": { \"should\": [ { \"match\": { \"title\": { \"query\": \"?0\", \"analyzer\": \"standard\" } } }, { \"match\": { \"title.nori\": { \"query\": \"?0\", \"analyzer\": \"my_nori_analyzer\" } } }, { \"match\": { \"title.ngram\": { \"query\": \"?0\", \"analyzer\": \"my_ngram_analyzer\" } } } ] } }")
//    Page<SearchDocument> findByTitle(@Param("query") String query, Pageable pageable);

}

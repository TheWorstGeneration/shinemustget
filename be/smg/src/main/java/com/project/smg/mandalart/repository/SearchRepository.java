package com.project.smg.mandalart.repository;

import com.project.smg.mandalart.entity.SearchDocument;
import com.project.smg.mandalart.entity.Title;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.elasticsearch.annotations.Setting;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

import java.util.List;
import java.util.Optional;

@Setting(settingPath = "/elasticsearch/index_settings.json")
public interface SearchRepository extends ElasticsearchRepository<SearchDocument, Integer> {
    Page<SearchDocument> findAllByTitleOrderByLikeCntDesc(String title, Pageable pageable);
}

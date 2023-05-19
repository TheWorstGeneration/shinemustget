package com.project.smg.mandalart.entity;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(indexName = "searchBig")
public class SearchBigDocument {
    @Id
    @Field(type = FieldType.Integer)
    private int id;

    @Field(type = FieldType.Text)
    private String content;

    @Field(type = FieldType.Integer)
    private int location;
}

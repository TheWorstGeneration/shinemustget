//package com.project.smg.mandalart.entity;
//
//import lombok.*;
//import org.springframework.data.annotation.Id;
//import org.springframework.data.elasticsearch.annotations.Document;
//import org.springframework.data.elasticsearch.annotations.Field;
//import org.springframework.data.elasticsearch.annotations.FieldType;
//
//import java.util.List;
//
//@Getter
//@Setter
//@Builder
//@NoArgsConstructor
//@AllArgsConstructor
//@Document(indexName = "search")
//public class SearchDocument {
//    @Id
//    @Field(type = FieldType.Integer)
//    private int id;
//    @Field(type = FieldType.Text)
//    private String title;
//    @Field(type = FieldType.Nested)
//    private List<SearchBigDocument> bigList;
//    @Field(type = FieldType.Integer)
//    private int likeCnt;
//}

package com.project.smg.member.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ClearMandalartDto {
    List<SearchDto> searchList;
    int id;
}

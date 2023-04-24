package com.project.smg.common;

import lombok.Data;

@Data
public class ResponseDto<T> {
    private int statusCode;
    private Message message;
    private T data;

}





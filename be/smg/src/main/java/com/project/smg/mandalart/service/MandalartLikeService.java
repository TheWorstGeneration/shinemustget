package com.project.smg.mandalart.service;

import com.project.smg.mandalart.entity.Title;

public interface MandalartLikeService {
    void mandalartLike(String mid, int id);

    Title checkTitle(int id);
}

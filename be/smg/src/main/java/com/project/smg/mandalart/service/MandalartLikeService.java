package com.project.smg.mandalart.service;

import com.project.smg.mandalart.entity.Title;
import com.project.smg.member.entity.Likes;
import com.project.smg.member.entity.Member;

public interface MandalartLikeService {
    void mandalartLike(String mid, int id) throws Exception;

    Title checkTitle(int id);

    boolean isMandalartLike(String mid, int id);

    int mandalartLikeCnt(int id);

    Likes checkLike(String mid, int id);

    Member checkMember(String mid);


}

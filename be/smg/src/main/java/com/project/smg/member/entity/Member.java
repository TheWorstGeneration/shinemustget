package com.project.smg.member.entity;

import com.project.smg.mandalart.entity.Title;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Builder
@Table(name = "member")
@AllArgsConstructor
public class Member {
    @Id
    @Column(name = "kakao_id")
    private String id;

    private String password;

    private String nickname;
    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "social_type")
    private SocialType socialType;

    @OneToMany(mappedBy = "member")
    private List<Likes> memberLikes = new ArrayList<>();

    @OneToMany(mappedBy = "member")
    private List<Title> titles = new ArrayList<>();

    @OneToMany(mappedBy = "member")
    private List<MemberPodo> memberPodos = new ArrayList<>();

    @OneToOne(mappedBy = "member", fetch = FetchType.LAZY)
    private RefreshToken refreshToken;
}

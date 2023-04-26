package com.project.smg.mandalart.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.project.smg.member.entity.Likes;
import com.project.smg.member.entity.Member;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "title")
public class Title {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "title_id")
    private int id;

    private String content;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "clear_at")
    private LocalDateTime clearAt;

    @Column(name = "deleted_at")
    private LocalDateTime deletedAt;

    @Column(name = "like_cnt")
    private int likeCnt;

    @OneToMany(mappedBy = "title")
    private List<Likes> titleLikes = new ArrayList<>();

    @OneToMany(mappedBy = "title")
    private List<BigGoal> bigGoals = new ArrayList<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "kakao_id")
    @JsonIgnore
    private Member member;

    public void addMember(Member member) {
        if (this.member != null) {
            this.member.getTitles().remove(this);
        }
        this.member = member;
        member.getTitles().add(this);
    }
}

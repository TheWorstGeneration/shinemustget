package com.project.smg.member.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.project.smg.mandalart.entity.Title;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "likes")
public class Likes {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "likes_id")
    private int id;

    private boolean status;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "kakao_id")
    @JsonIgnore
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "title_id")
    @JsonIgnore
    private Title title;

    public void addMember(Member member) {
        if (this.member != null) {
            this.member.getMemberLikes().remove(this);
        }
        this.member = member;
        member.getMemberLikes().add(this);
    }

    public void addTitle(Title title) {
        if (this.title != null) {
            this.title.getTitleLikes().remove(this);
        }
        this.title = title;
        title.getTitleLikes().add(this);
    }
}

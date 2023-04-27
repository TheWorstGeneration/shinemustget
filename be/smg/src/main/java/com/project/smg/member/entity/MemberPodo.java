package com.project.smg.member.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.project.smg.podo.entity.Podo;
import com.project.smg.podo.entity.PodoType;
import lombok.*;

import javax.persistence.*;


@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Builder
@Table(name = "member_podo")
@AllArgsConstructor
public class MemberPodo {
    @Id
    @Column(name = "member_podo_id")
    private String id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "kakao_id")
    @JsonIgnore
    private Member member;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "podo_type_id")
    @JsonIgnore
    private PodoType podoType;

    private boolean status;


    public void addMember(Member member) {
        if (this.member != null) {
            this.member.getMemberPodos().remove(this);
        }
        this.member = member;
        member.getMemberPodos().add(this);
    }
}

package com.project.smg.member.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.project.smg.podo.entity.Podo;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "podo_type")
public class PodoType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "podo_type_id")
    private int id;

    private String name;

    @Column(name = "image_url")
    private String imageUrl;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "kakao_id")
    @JsonIgnore
    private Member member;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "podo_id")
    @JsonIgnore
    private Podo podo;

    public void addMember(Member member) {
        if (this.member != null) {
            this.member.getPodoTypes().remove(this);
        }
        this.member = member;
        member.getPodoTypes().add(this);
    }
}

package com.project.smg.podo.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.project.smg.mandalart.entity.SmallGoal;
import com.project.smg.member.entity.PodoType;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "podo")
public class Podo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "podo_id")
    private int id;

    private String oneline;

    @Column(name = "clear_at")
    private LocalDateTime clearAt;

    @OneToOne(mappedBy = "podo", fetch = FetchType.LAZY)
    private PodoType podoType;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "small_goal_id")
    @JsonIgnore
    private SmallGoal smallGoal;

    public void addSmallGoal(SmallGoal smallGoal) {
        if (this.smallGoal != null) {
            this.smallGoal.getPodos().remove(this);
        }
        this.smallGoal = smallGoal;
        smallGoal.getPodos().add(this);
    }
}

package com.project.smg.mandalart.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.project.smg.podo.entity.Podo;
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
@Table(name = "small_goal")
public class SmallGoal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "small_goal_id")
    private int id;

    private int location;

    private String content;

    @Column(name = "is_sticker")
    private boolean isSticker;

    @Column(name = "clear_at")
    private LocalDateTime clearAt;

    @OneToMany(mappedBy = "smallGoal")
    private List<Podo> podos = new ArrayList<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "big_goal_id")
    @JsonIgnore
    private BigGoal bigGoal;

    public void addBigGoal(BigGoal bigGoal) {
        if (this.bigGoal != null) {
            this.bigGoal.getSmallGoals().remove(this);
        }
        this.bigGoal = bigGoal;
        bigGoal.getSmallGoals().add(this);
    }
}

package com.project.smg.mandalart.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "gpt_small_goal")
public class GptSmallGoal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "gpt_small_goal_id")
    private int id;

    private int location;

    private String content;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "gpt_big_goal_id")
    @JsonIgnore
    private GptBigGoal gptBigGoal;

    public void addGptBigGoal(GptBigGoal gptBigGoal) {
        if (this.gptBigGoal != null) {
            this.gptBigGoal.getGptSmallGoals().remove(this);
        }
        this.gptBigGoal = gptBigGoal;
        gptBigGoal.getGptSmallGoals().add(this);
    }
}

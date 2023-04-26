package com.project.smg.mandalart.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "gpt_big_goal")
public class GptBigGoal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "gpt_big_goal_id")
    private int id;

    private String content;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "gpt_title_id")
    @JsonIgnore
    private GptTitle gptTitle;

    public void addGptTitle(GptTitle gptTitle) {
        if (this.gptTitle != null) {
            this.gptTitle.getGptBigGoals().remove(this);
        }
        this.gptTitle = gptTitle;
        gptTitle.getGptBigGoals().add(this);
    }
}

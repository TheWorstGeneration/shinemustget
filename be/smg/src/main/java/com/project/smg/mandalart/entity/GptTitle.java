package com.project.smg.mandalart.entity;

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
@Table(name = "gpt_title")
public class GptTitle {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "gpt_title_id")
    private int id;

    private String content;

    @OneToMany(mappedBy = "gptTitle", cascade = CascadeType.PERSIST)
    private List<GptBigGoal> gptBigGoals = new ArrayList<>();
}

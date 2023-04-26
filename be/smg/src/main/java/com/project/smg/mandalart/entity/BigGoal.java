package com.project.smg.mandalart.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
@Table(name = "big_goal")
public class BigGoal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "big_goal_id")
    private int id;

    private int location;

    private String content;

    @Column(name = "clear_at")
    private LocalDateTime clearAt;

    @OneToMany(mappedBy = "bigGoal")
    private List<SmallGoal> smallGoals = new ArrayList<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "title_id")
    @JsonIgnore
    private Title title;

    public void addTitle(Title title) {
        if (this.title != null) {
            this.title.getBigGoals().remove(this);
        }
        this.title = title;
        title.getBigGoals().add(this);
    }
}

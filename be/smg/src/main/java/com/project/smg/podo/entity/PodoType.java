package com.project.smg.podo.entity;

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

    @Column(name ="image_lock_url")
    private String imageLockUrl;
}

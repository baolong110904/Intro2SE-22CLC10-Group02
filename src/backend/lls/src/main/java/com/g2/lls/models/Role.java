package com.g2.lls.models;

import jakarta.persistence.*;
import lombok.*;

import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
@Entity
@Table(name = "roles", schema = "language_learning_system")
public class Role extends BaseEntity {
    @Column(name = "name", nullable = false, length = 50)
    private String name;
}

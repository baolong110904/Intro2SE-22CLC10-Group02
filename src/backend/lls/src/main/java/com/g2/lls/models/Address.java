package com.g2.lls.models;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
@Entity
@Table(name = "addresses", schema = "language_learning_system")
public class Address extends BaseEntity {
    @Column(name = "country", nullable = false, length = 50)
    private String country;

    @Column(name = "city", nullable = false, length = 50)
    private String city;

    @Column(name = "district", length = 50)
    private String district;

    @Column(name = "ward", length = 50)
    private String ward;

    @Column(name = "address", nullable = false, length = 255)
    private String address;

    @OneToOne(mappedBy = "address")
    private User user;
}

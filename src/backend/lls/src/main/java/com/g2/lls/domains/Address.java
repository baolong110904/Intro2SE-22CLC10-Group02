package com.g2.lls.domains;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Nationalized;

@Entity
@Table(name = "addresses")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Address {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "phone_number")
    private String phoneNumber;

    @Nationalized
    private String country;

    @Nationalized
    private String city;

    @Nationalized
    private String province;

    @Nationalized
    private String district;

    @Nationalized
    private String ward;

    @Nationalized
    private String address;

    @Column(name = "address_type")
    private String addressType;

    @Column(name = "is_default")
    private Boolean isDefault;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
}
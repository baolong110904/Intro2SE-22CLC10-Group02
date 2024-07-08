package com.g2.lls.dtos;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Nationalized;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AddressDTO {
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
}

package com.g2.lls.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Nationalized;

import com.fasterxml.jackson.annotation.JsonProperty;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AddressDTO {
    @JsonProperty("phone_number")
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

    @JsonProperty("address_type")
    private String addressType;

    @JsonProperty("is_default")
    private Boolean isDefault;
}

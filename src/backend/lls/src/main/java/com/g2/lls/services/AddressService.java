package com.g2.lls.services;

import com.g2.lls.dtos.AddressDTO;

import java.util.List;

public interface AddressService {
    AddressDTO createAddress(Long userId, AddressDTO addressDTO) throws Exception;
    AddressDTO getAddressById(Long id) throws Exception;
    List<AddressDTO> getAddressByUserId(Long userId);
    AddressDTO updateAddress(Long userId, AddressDTO addressDTO) throws Exception;
    void deleteAddress(Long id);
}

package com.g2.lls.services.impl;

import com.g2.lls.domains.Address;
import com.g2.lls.domains.User;
import com.g2.lls.dtos.AddressDTO;
import com.g2.lls.repositories.AddressRepository;
import com.g2.lls.repositories.UserRepository;
import com.g2.lls.services.AddressService;
import com.g2.lls.utils.exception.DataNotFoundException;
import com.g2.lls.utils.exception.UserNotActivatedException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class AddressServiceImpl implements AddressService {
    private final AddressRepository addressRepository;
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;
    @Override
    public AddressDTO createAddress(Long userId, AddressDTO addressDTO) throws Exception {
        Address address = modelMapper.map(addressDTO, Address.class);

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new DataNotFoundException("User not found"));
        if (user.getIsEnabled() == null || !user.getIsEnabled()) {
            log.error("User is not active");
            throw new UserNotActivatedException("User is not active");
        }

        address.setUser(user);

        Address savedAddress = addressRepository.save(address);
        return modelMapper.map(savedAddress, AddressDTO.class);
    }

    @Override
    public AddressDTO getAddressById(Long id) throws Exception {
        Address address = addressRepository.findById(id)
                .orElseThrow(() -> new DataNotFoundException("Address not found"));
        return modelMapper.map(address, AddressDTO.class);
    }

    @Override
    public List<AddressDTO> getAddressByUserId(Long userId) {
        List<Address> addresses = addressRepository.findByUserId(userId);
        return addresses.stream()
                .map(address -> modelMapper.map(address, AddressDTO.class))
                .toList();
    }

    @Override
    public AddressDTO updateAddress(Long userId, AddressDTO addressDTO) throws Exception {
        Address address = modelMapper.map(addressDTO, Address.class);

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new DataNotFoundException("User not found"));

        address.setUser(user);

        Address resultAddress = addressRepository.save(address);
        return modelMapper.map(resultAddress, AddressDTO.class);
    }

    @Override
    public void deleteAddress(Long id) {
        addressRepository.deleteById(id);
    }
}

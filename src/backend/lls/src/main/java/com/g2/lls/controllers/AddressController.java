package com.g2.lls.controllers;

import com.g2.lls.domains.User;
import com.g2.lls.dtos.AddressDTO;
import com.g2.lls.repositories.UserRepository;
import com.g2.lls.services.AddressService;
import com.g2.lls.utils.CustomHeaders;
import com.g2.lls.utils.exception.DataNotFoundException;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@Tag(
        name = "Address",
        description = "REST APIs for Address"
)
@RestController
@RequestMapping("${api.v1}/addresses")
@RequiredArgsConstructor
public class AddressController {
    private final AddressService addressService;
    private final UserRepository userRepository;

    @PostMapping
    public ResponseEntity<AddressDTO> createAddress(@RequestHeader(CustomHeaders.X_AUTH_USER_EMAIL) String email,
                                                    @RequestBody AddressDTO addressDTO) throws Exception {
        Optional<User> user = userRepository.findByEmail(email);
        Long userId = user.orElseThrow(() -> new DataNotFoundException("User with email " + email + " not found")).getId();
        
        return new ResponseEntity<>(addressService.createAddress(userId, addressDTO), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<AddressDTO>> getAllAddressByUserId(
            @RequestHeader(CustomHeaders.X_AUTH_USER_EMAIL) String email) throws DataNotFoundException {
        Optional<User> user = userRepository.findByEmail(email);
        Long userId = user.orElseThrow(() -> new DataNotFoundException("User with email " + email + " not found")).getId();
        return new ResponseEntity<>(addressService.getAddressByUserId(userId), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AddressDTO> getAddressById(@PathVariable(name = "id") Long id) throws Exception {
        return new ResponseEntity<>(addressService.getAddressById(id), HttpStatus.OK);
    }

    @PutMapping()
    public ResponseEntity<AddressDTO> updateAddress(@RequestHeader(CustomHeaders.X_AUTH_USER_EMAIL) String email,
                                                    @RequestBody AddressDTO addressDTO) throws Exception {
        Optional<User> user = userRepository.findByEmail(email);
        Long userId = user.orElseThrow(() -> new DataNotFoundException("User with email " + email + " not found")).getId();                                              
        return new ResponseEntity<>(addressService.updateAddress(userId, addressDTO), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteAddress(@PathVariable(name = "id") Long id) {
        addressService.deleteAddress(id);
        return new ResponseEntity<>("Address deleted successfully", HttpStatus.OK);
    }
}

package com.g2.lls.repositories;

import com.g2.lls.domains.Address;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;

public interface AddressRepository extends JpaRepository<Address, Long>,
        JpaSpecificationExecutor<Address> {
    List<Address> findByUserId(long userId);
}

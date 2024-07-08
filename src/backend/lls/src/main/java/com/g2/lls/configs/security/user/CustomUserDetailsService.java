package com.g2.lls.configs.security.user;

import com.g2.lls.domains.User;
import com.g2.lls.repositories.UserRepository;
import com.g2.lls.utils.exception.UserNotActivatedException;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class CustomUserDetailsService implements UserDetailsService {
    private final UserRepository userRepository;

    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) {
        log.info("Loading user by username: {}", username);
        User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        if (!user.getIsEnabled() || user.getIsEnabled() == null) {
            throw new UserNotActivatedException("User with email: " + username + " is not activated");
        }
        return new CustomUserDetails(user);
    }
}

package com.g2.lls.configs;


import com.g2.lls.domains.Permission;
import com.g2.lls.domains.Role;
import com.g2.lls.domains.User;
import com.g2.lls.repositories.UserRepository;
import com.g2.lls.utils.exception.PermissionException;
import com.g2.lls.utils.security.SecurityUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.transaction.Transactional;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.HandlerMapping;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@NoArgsConstructor
@Slf4j
public class PermissionInterceptor implements HandlerInterceptor {
    @Autowired
    UserRepository userRepository;

    @Override
    @Transactional
    public boolean preHandle(
            HttpServletRequest request,
            HttpServletResponse response, Object handler)
            throws Exception {

        String path = (String) request.getAttribute(HandlerMapping.BEST_MATCHING_PATTERN_ATTRIBUTE);
        String requestURI = request.getRequestURI();
        String httpMethod = request.getMethod();

        log.info("Path: " + path);
        log.info("HTTP Method: " + httpMethod);
        log.info("Request URI: " + requestURI);

        // check permission
        String email = SecurityUtil.getCurrentUserLogin().isPresent()
                ? SecurityUtil.getCurrentUserLogin().get()
                : "";

        if (email != null && !email.isEmpty()) {
            Optional<User> user = userRepository.findByEmail(email);
            if (user.isPresent()) {
                Set<Role> role = user.get().getRoles();
                if (role != null) {
                    List<Permission> permissions = new ArrayList<>();
                    role.forEach(item -> {
                        permissions.addAll(item.getPermissions());
                    });

                    log.info("Permissions: " + permissions);

                    boolean isAllow = permissions.stream().anyMatch(item -> item.getApiPath().equals(path)
                            && item.getMethod().equals(httpMethod));

                    if (!isAllow) {
                        throw new PermissionException("You don't have permission to access this API");
                    }
                } else {
                    throw new PermissionException("You don't have permission to access this API");
                }
            }
        }

        return true;
    }
}
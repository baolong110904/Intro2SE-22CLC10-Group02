package com.g2.lls.controllers;


import com.cloudinary.Cloudinary;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;

import java.util.Locale;

@RestController
@RequestMapping("${api.v1}/hello-world")
@RequiredArgsConstructor
@Slf4j
public class HelloWorldController {
    private final ObjectMapper objectMapper;
    private final Cloudinary cloudinary;
    private final HttpServletRequest request;

    @GetMapping("")
    public String helloWorld(WebRequest webRequest, Authentication authentication) {
        Locale locale = webRequest.getLocale();
        log.info(locale.getLanguage());
//        log.info("Name:" + authentication.getName());
//        log.info("Authorities" + authentication.getAuthorities().toString());
//        log.info("Principal" + authentication.getPrincipal().toString());
//        log.info("Credentials" + authentication.getCredentials().toString());
//        log.info("Details" + authentication.getDetails().toString());
//        log.info("Is authenticated" + authentication.isAuthenticated());
        try {
//            Map params = ObjectUtils.asMap(
//                    "use_filename", true,
//                    "unique_filename", true,
//                    "overwrite", false,
//                    "folder", "g2/avatar"
//            );
//            Map response = cloudinary.uploader().upload("https://photographylife.com/wp-content/uploads/2014/09/Nikon-D750.jpg", params);
//            return objectMapper.writeValueAsString(response);
//            Map params = ObjectUtils.asMap(
//                    "invalidate", true
//            );
//
//            Map response = cloudinary.uploader().destroy("g2/avatar/Nikon-D750_lv9l0v", params);

            // Return the response as a JSON string
//            return objectMapper.writeValueAsString(response);
//            return AppUtil.applicationUrl(request);

            // get image from cloudinary
//            Map response = cloudinary.api().resource("g2/avatar/default", ObjectUtils.emptyMap());
//            return objectMapper.writeValueAsString(response);
            return "Hello World";
        } catch (Exception e) {
            throw new RuntimeException("Error uploading image to cloudinary");
        }
    }
}

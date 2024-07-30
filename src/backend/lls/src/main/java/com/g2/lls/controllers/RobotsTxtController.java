package com.g2.lls.controllers;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("")
public class RobotsTxtController {
    @GetMapping(value = {"/robots.txt", "/robot.txt"},
            produces = MediaType.TEXT_PLAIN_VALUE)
    @ResponseBody
    public String getRobotsTxt() {
        return """
                User-agent: *
                Allow: /
                """;
    }
}

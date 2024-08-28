package com.g2.lls.controllers;

import com.g2.lls.dtos.CommentDTO;
import com.g2.lls.dtos.PostDTO;
import com.g2.lls.dtos.response.ApiResponse;
import com.g2.lls.services.PostService;
import com.g2.lls.utils.CustomHeaders;
import com.g2.lls.utils.TimeUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("${api.v1}/posts")
@RequiredArgsConstructor
@Slf4j
public class PostController {
    private final PostService postService;

    @PostMapping
    public ResponseEntity<?> post(
            @RequestHeader(CustomHeaders.X_AUTH_USER_EMAIL) String email,
            @RequestBody PostDTO post) throws Exception {

        return ResponseEntity.ok(
                new ApiResponse<>(HttpStatus.CREATED.value(),
                true,
                postService.createPost(post, email),
                TimeUtil.getTime()
        ));
    }

    @GetMapping("/{courseId}")
    public ResponseEntity<?> getAllPosts(
            @RequestHeader(CustomHeaders.X_AUTH_USER_EMAIL) String email,
            @PathVariable Long courseId
    ) throws Exception {

        return ResponseEntity.ok(new ApiResponse<>(
                HttpStatus.OK.value(),
                true,
                postService.getAllPosts(email, courseId),
                TimeUtil.getTime()
        ));
    }

    @PostMapping("/{postId}/comments")
    public ResponseEntity<?> createComment(
            @PathVariable Long postId,
            @RequestBody CommentDTO commentDTO,
            @RequestHeader(CustomHeaders.X_AUTH_USER_EMAIL) String email
    ) throws Exception {
        return ResponseEntity.ok(new ApiResponse<>(
                HttpStatus.CREATED.value(),
                true,
                postService.createComment(postId, commentDTO.getContent(), email),
                TimeUtil.getTime()
        ));
    }

    @GetMapping("/{postId}/comments")
    public ResponseEntity<?> getComments(
            @PathVariable Long postId,
            @RequestHeader(CustomHeaders.X_AUTH_USER_EMAIL) String email
    ) throws Exception {
        return ResponseEntity.ok(new ApiResponse<>(
                HttpStatus.OK.value(),
                true,
                postService.getAllComments(postId, email),
                TimeUtil.getTime()
        ));
    }

    @DeleteMapping("/{postId}")
    public ResponseEntity<?> deletePost(
            @RequestHeader(CustomHeaders.X_AUTH_USER_EMAIL) String email,
            @PathVariable Long postId
    ) throws Exception {
        postService.deletePost(postId, email);
        return ResponseEntity.ok(new ApiResponse<>());
    }

    @DeleteMapping("/comments/{commentId}")
    public ResponseEntity<?> deleteComment(
            @RequestHeader(CustomHeaders.X_AUTH_USER_EMAIL) String email,
            @PathVariable Long commentId
    ) throws Exception {
        postService.deleteComment(commentId, email);
        return ResponseEntity.ok(new ApiResponse<>());
    }
}

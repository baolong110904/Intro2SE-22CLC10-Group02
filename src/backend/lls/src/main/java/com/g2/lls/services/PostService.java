package com.g2.lls.services;

import com.g2.lls.domains.Comment;
import com.g2.lls.dtos.PostDTO;
import com.g2.lls.dtos.response.CommentResponseDTO;
import com.g2.lls.dtos.response.PostResponseDTO;

import java.util.List;

public interface PostService {
    PostResponseDTO createPost(PostDTO postDTO, String email) throws Exception;
    List<PostResponseDTO> getAllPosts(String email) throws Exception;
    CommentResponseDTO createComment (Long postId, String comment, String email) throws Exception;
    List<CommentResponseDTO> getAllComments(Long postId, String email) throws Exception;
}

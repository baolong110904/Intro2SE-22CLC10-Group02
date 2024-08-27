package com.g2.lls.services.impl;

import com.g2.lls.domains.Comment;
import com.g2.lls.domains.Post;
import com.g2.lls.domains.User;
import com.g2.lls.dtos.PostDTO;
import com.g2.lls.dtos.response.CommentResponseDTO;
import com.g2.lls.dtos.response.PostResponseDTO;
import com.g2.lls.dtos.response.UserResponse;
import com.g2.lls.repositories.PostRepository;
import com.g2.lls.repositories.UserRepository;
import com.g2.lls.services.PostService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PostServiceImpl implements PostService {

    private final UserServiceImpl userServiceImpl;
    private final ModelMapper modelMapper;
    private final PostRepository postRepository;
    private final UserRepository userRepository;

    public PostResponseDTO convertToPostResponseDTO(Post post, User user) {
        PostResponseDTO postResponseDTO = modelMapper.map(post, PostResponseDTO.class);
        if(user != null) {
            UserResponse userResponse = modelMapper.map(user, UserResponse.class);
            postResponseDTO.setUser(userResponse);
        }
        return postResponseDTO;
    }

    @Override
    public PostResponseDTO createPost(PostDTO postDTO, String email) throws Exception {
        User user = userServiceImpl.fetchUserByEmail(email);
        Post post = modelMapper.map(postDTO, Post.class);
        post.setAuthor(user);
        List<Post> posts = user.getPosts();
        posts.add(post);
        user.setPosts(posts);
        userRepository.save(user);
        post = user.getPosts().getLast();
        return convertToPostResponseDTO(post, user);
    }

    @Override
    public List<PostResponseDTO> getAllPosts(String email, Long courseId) throws Exception {
        List<Post> posts = postRepository.findAll();
        List<PostResponseDTO> postResponseDTOS = new ArrayList<>();
        for (Post post : posts) {
            if(post.getCourseId() == courseId)
                postResponseDTOS.add(convertToPostResponseDTO(post, post.getAuthor()));
        }

        return postResponseDTOS;
    }

    @Override
    public CommentResponseDTO createComment(Long postId, String comment, String email) throws Exception {
        User user = userServiceImpl.fetchUserByEmail(email);
        Optional<Post> post = postRepository.findById(postId);
        if(!post.isPresent()) {
            throw new Exception("Post not found");
        }
        Post postEntity = post.get();
        Comment commentEntity = Comment.builder()
                .content(comment)
                .post(postEntity)
                .userId(user.getId())
                .build();
        List<Comment> comments = postEntity.getComments();
        comments.add(commentEntity);
        postEntity.setComments(comments);
        postRepository.save(postEntity);

        commentEntity = postEntity.getComments().getLast();
        CommentResponseDTO commentResponseDTO = modelMapper.map(commentEntity, CommentResponseDTO.class);
        UserResponse userResponse = modelMapper.map(user, UserResponse.class);
        commentResponseDTO.setUser(userResponse);
        commentResponseDTO.setPostId(postEntity.getId());

        return commentResponseDTO;
    }

    @Override
    public List<CommentResponseDTO> getAllComments(Long postId, String email) throws Exception {
        Optional<Post> post = postRepository.findById(postId);
        if (!post.isPresent()) {
            throw new Exception("Post not found");
        }

        Post postEntity = post.get();
        List<Comment> comments = postEntity.getComments();
        List<CommentResponseDTO> commentResponseDTOS = new ArrayList<>();
        for (Comment comment : comments) {
            CommentResponseDTO commentResponseDTO  = modelMapper.map(comment, CommentResponseDTO.class);
            User user = userServiceImpl.fetchUserById(comment.getUserId());
            UserResponse userResponse = modelMapper.map(user, UserResponse.class);
            commentResponseDTO.setUser(userResponse);
            commentResponseDTO.setPostId(postEntity.getId());
            commentResponseDTOS.add(commentResponseDTO);
        }
        return commentResponseDTOS;
    }
}

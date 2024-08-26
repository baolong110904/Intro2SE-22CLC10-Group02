import React, { useState, useEffect } from 'react';
import CreatePost from '../api/post/CreatePost';
import GetAllPosts from '../api/post/GetAllPost';
import GetAllComments from '../api/post/GetAllComment';
import CreateComment from '../api/post/CreateComment';

const Forum = () => {
    const [selectedPost, setSelectedPost] = useState(null);
    const [showCreatePost, setShowCreatePost] = useState(false);
    const [newPost, setNewPost] = useState({ title: '', slug: '', description: '', content: '' });
    const [posts, setPosts] = useState([]);

    const handleCreatePost = async () => {
        if (newPost.title.trim() && newPost.content.trim()) {
            const res = await CreatePost(newPost.title, newPost.slug, newPost.content, newPost.description);
            const newPostWithId = { ...newPost, id: res.id, comments: [] }; // Add comments field
            setPosts([...posts, newPostWithId]);
            setNewPost({ title: '', slug: '', description: '', content: '' });
            setShowCreatePost(false);
        } else {
            alert('Please fill in all fields');
        }
    };

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await GetAllPosts();
                setPosts(response.data);  // Update state with posts data
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };
        fetchPosts();
    }, []);

    const fetchCommentsForPost = async (postId) => {
        try {
            const response = await GetAllComments(postId);
            const updatedPosts = posts.map(post => 
                post.id === postId ? { ...post, comments: response.data } : post
            );
            setPosts(updatedPosts);
        } catch (error) {
            console.error("Error fetching comments:", error);
        }
    };

    const toggleComments = (postId) => {
        if (selectedPost === postId) {
            setSelectedPost(null);
        } else {
            setSelectedPost(postId);
            fetchCommentsForPost(postId);
        }
    };

    const handleCommentSubmit = async (postId, commentText) => {
        try {
            const res = await CreateComment(postId, commentText);
            console.log(res)
    
            const newComment = {
                id: res.data.id, 
                content: res.data.content,
                user: {
                    first_name: res.data.user.first_name, 
                    last_name: res.data.user.last_name, 
                    avatar: res.data.user.avatar 
                }
            };
    
            setPosts(posts.map(post => 
                post.id === res.data.postId
                    ? { ...post, comments: [...post.comments, newComment], newComment: '' }
                    : post
            ));

            console.log(posts)
        } catch (error) {
            console.error("Error submitting comment:", error);
            // Handle error (e.g., display an error message)
        }
    };
    
    

    const handleCommentChange = (postId, text) => {
        setPosts(prevPosts => prevPosts.map(post =>
          post.id === postId ? { ...post, newComment: text } : post
        ));
      };

    return (
        <div className="forum-container">
            <h2 className="forum-title">Forum Posts</h2>
            {!selectedPost && (
                <button onClick={() => setShowCreatePost(true)} className="create-post-button">
                    Create New Post
                </button>
            )}
            {showCreatePost ? (
                <div className="create-post-form">
                    <input
                        type="text"
                        placeholder="Post Title"
                        value={newPost.title}
                        onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Post Slug"
                        value={newPost.slug}
                        onChange={(e) => setNewPost({ ...newPost, slug: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Post Description"
                        value={newPost.description}
                        onChange={(e) => setNewPost({ ...newPost, description: e.target.value })}
                    />
                    <textarea
                        placeholder="Post Content"
                        value={newPost.content}
                        onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                    />
                    <button onClick={handleCreatePost}>Submit Post</button>
                    <button onClick={() => setShowCreatePost(false)}>Cancel</button>
                </div>
            ) : selectedPost === null ? (
                posts && posts.length > 0 ? (
                    posts.map(post => (
                        <div key={post.id} className="post-card">
                            <h3 className="post-title" onClick={() => toggleComments(post.id)}>{post.title}</h3>
                            <p className="post-content">{post.content}</p>
                        </div>
                    ))
                ) : (
                    <p>No posts available.</p>
                )
            ) : (
                <div>
                    {posts.filter(post => post.id === selectedPost).map(post => (
                        <div key={post.id} className="post-detail">
                            <h3>{post.title}</h3>
                            <p>{post.content}</p>
                            <p><strong>Author:</strong> {post.user.first_name} {post.user.last_name}</p>

                            <div className="comment-section">
                                <h4>Comments</h4>
                                <div className="comment-input">
                                    <textarea
                                        value={post.newComment || ''}
                                        onChange={(e) => handleCommentChange(post.id, e.target.value)}
                                        placeholder="Add a comment..."
                                    />
                                    <button onClick={() => handleCommentSubmit(post.id, post.newComment)}>Submit</button>
                                </div>

                                <div className="comments-list">
                                    {post.comments && post.comments.length > 0 ? (
                                        post.comments.map((comment) => (
                                            <div key={comment.id} className="comment">
                                                <div className="comment-avatar">
                                                    <img src={comment.user.avatar} alt={`${comment.user.name}'s avatar`} />
                                                </div>
                                                <div className="comment-content">
                                                    <p className="comment-user">{comment.user.first_name} {comment.user.last_name}</p>
                                                    <p className="comment-text">{comment.content}</p>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p>No comments yet.</p>
                                    )}
                                </div>
                            </div>

                            <button onClick={() => setSelectedPost(null)} className="back-button">Back to Posts</button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Forum;

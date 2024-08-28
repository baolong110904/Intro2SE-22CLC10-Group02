<<<<<<< Updated upstream
import React, { useState, useEffect } from "react"
import CreatePost from "../api/post/CreatePost"
import GetAllPosts from "../api/post/GetAllPost"
import GetAllComments from "../api/post/GetAllComment"
import CreateComment from "../api/post/CreateComment"

const Forum = ({ courseId }) => {
  const [selectedPost, setSelectedPost] = useState(null)
  const [showCreatePost, setShowCreatePost] = useState(false)
  const [newPost, setNewPost] = useState({
    title: "",
    slug: "",
    description: "",
    content: "",
  })
  const [posts, setPosts] = useState([])

  const handleCreatePost = async () => {
    if (newPost.title.trim() && newPost.content.trim()) {
      const res = await CreatePost(
        newPost.title,
        newPost.slug,
        newPost.content,
        newPost.description,
        courseId,
      )
      const newPostWithId = { ...newPost, id: res.id, comments: [] } // Add comments field
      setPosts([...posts, newPostWithId])
      setNewPost({ title: "", slug: "", description: "", content: "" })
      setShowCreatePost(false)
    } else {
      alert("Please fill in all fields")
    }
  }
=======
import React, { useState, useEffect } from 'react';
import CreatePost from '../api/post/CreatePost';
import GetAllPosts from '../api/post/GetAllPost';
import GetAllComments from '../api/post/GetAllComment';
import CreateComment from '../api/post/CreateComment';
import deleteComment from '../api/post/DeleteComment';
import deletePost from '../api/post/DeletePost';

const Forum = ({ courseId }) => {
    const [selectedPost, setSelectedPost] = useState(null);
    const [showCreatePost, setShowCreatePost] = useState(false);
    const [newPost, setNewPost] = useState({ title: '', slug: '', description: '', content: '', user: {} });
    const [posts, setPosts] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

    const handleCreatePost = async () => {
        if (newPost.title.trim() && newPost.content.trim()) {
            const res = await CreatePost(newPost.title, newPost.slug, newPost.content, newPost.description, courseId);
            console.log(res)
            if (res.success === false) {
                setErrorMessage("Failed to create post. Slug is already in use.");
            }
            else {
                setErrorMessage("")
                newPost.user.first_name = res.data.user.first_name
                newPost.user.second_name = res.data.user.second_name
                const newPostWithId = { ...newPost, id: res.data.id, comments: [] }; // Add comments field
                setPosts([...posts, newPostWithId]);
                setNewPost({ title: '', slug: '', description: '', content: '', user: {} });
                setShowCreatePost(false);
            }
        } else {
            setErrorMessage("An unexpected error occurred.");
        }
    };

    const handleDeleteComment = async (postId, commentId) => {
        try {
            const res = await deleteComment(commentId)
            console.log(res)

            if (res.status !== 200) {
                throw new Error(`Failed to delete comment. Status code: ${res.status}`);
            }
            // Cập nhật state sau khi xóa comment
            setPosts(prevPosts => prevPosts.map(post =>
                post.id === postId
                    ? { ...post, comments: post.comments.filter(comment => comment.id !== commentId) }
                    : post
            ));
        } catch (error) {
            console.error("Error deleting comment:", error);
        }
    };
>>>>>>> Stashed changes

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await GetAllPosts(courseId)
        setPosts(response.data) // Update state with posts data
      } catch (error) {
        console.error("Error fetching posts:", error)
      }
    }
    fetchPosts()
  }, [])

<<<<<<< Updated upstream
  const fetchCommentsForPost = async (postId) => {
    try {
      const response = await GetAllComments(postId)
      const updatedPosts = posts.map((post) =>
        post.id === postId ? { ...post, comments: response.data } : post,
      )
      setPosts(updatedPosts)
    } catch (error) {
      console.error("Error fetching comments:", error)
    }
  }
=======
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
>>>>>>> Stashed changes

  const toggleComments = (postId) => {
    if (selectedPost === postId) {
      setSelectedPost(null)
    } else {
      setSelectedPost(postId)
      fetchCommentsForPost(postId)
    }
  }

<<<<<<< Updated upstream
  const handleCommentSubmit = async (postId, commentText) => {
    try {
      const res = await CreateComment(postId, commentText)
      console.log(res)

      const newComment = {
        id: res.data.id,
        content: res.data.content,
        user: {
          first_name: res.data.user.first_name,
          last_name: res.data.user.last_name,
          avatar: res.data.user.avatar,
        },
      }

      setPosts(
        posts.map((post) =>
          post.id === res.data.postId
            ? { ...post, comments: [...post.comments, newComment], newComment: "" }
            : post,
        ),
      )

      console.log(posts)
    } catch (error) {
      console.error("Error submitting comment:", error)
      // Handle error (e.g., display an error message)
    }
  }
=======
    const handleDeletePost = async (postId) => {
        try {
            const res = await deletePost(postId)
            if (res.status !== 200) {
                throw new Error(`Failed to delete comment. Status code: ${res.status}`);
            }

            setPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
        } catch (error) {
            console.error("Error deleting post:", error);
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
            {errorMessage && (
                <div className="error-notification">
                    {errorMessage}
                </div>
            )}
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
                        <div key={post.id} style={{
                            backgroundColor: 'white',
                            borderRadius: '8px',
                            padding: '20px',
                            marginBottom: '20px',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                            transition: 'box-shadow 0.3s ease',
                            position: 'relative'
                        }}
                            onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.15)'}
                            onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)'}
                        >
                            <h3 style={{
                                fontSize: '20px',
                                marginBottom: '10px',
                                color: '#333',
                                cursor: 'pointer'
                            }}
                                onClick={() => toggleComments(post.id)}
                            >
                                {post.title}
                            </h3>
                            <p style={{
                                fontSize: '16px',
                                color: '#666',
                                marginBottom: '15px'
                            }}>
                                {post.content.length > 150 ? `${post.content.substring(0, 150)}...` : post.content}
                            </p>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginTop: '10px'
                            }}>
                                <span style={{
                                    fontSize: '14px',
                                    color: '#888'
                                }}>
                                    By {post.user.first_name} {post.user.last_name}
                                </span>
                                {/* <span style={{
                                    fontSize: '14px',
                                    color: '#888'
                                }}>
                                    {post.comments ? post.comments.length : 0} comments
                                </span> */}
                            </div>
                            <button
                                onClick={() => handleDeletePost(post.id)}
                                style={{
                                    position: 'absolute',
                                    top: '10px',
                                    right: '10px',
                                    backgroundColor: 'transparent',
                                    border: 'none',
                                    color: '#dc3545',
                                    cursor: 'pointer',
                                    fontSize: '14px',
                                    padding: '5px 10px',
                                    borderRadius: '4px',
                                    transition: 'background-color 0.3s ease'
                                }}
                                onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(220, 53, 69, 0.1)'}
                                onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                            >
                                Delete
                            </button>
                        </div>
                    ))
                ) : (
                    <p style={{
                        textAlign: 'center',
                        color: '#666',
                        marginTop: '20px'
                    }}>
                        No posts available.
                    </p>
                )
            ) : (
                <div>
                    {posts.filter(post => post.id === selectedPost).map(post => (
                        <div key={post.id} className="post-detail">
                            <h3><strong>Title:</strong> {post.title}</h3>
                            <p><strong>Content:</strong> {post.content}</p>
                            <p><strong>Author:</strong> {post.user.first_name} {post.user.last_name}</p>
>>>>>>> Stashed changes

  const handleCommentChange = (postId, text) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, newComment: text } : post,
      ),
    )
  }

<<<<<<< Updated upstream
  return (
    <div className="forum-container">
      <h2 className="forum-title">Forum Posts</h2>
      {!selectedPost && (
        <button
          onClick={() => setShowCreatePost(true)}
          className="create-post-button"
        >
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
=======
                                <div className="comments-list">
                                    {post.comments && post.comments.length > 0 ? (
                                        post.comments.map((comment) => (
                                            <div key={comment.id} style={{
                                                display: 'flex',
                                                alignItems: 'flex-start',
                                                marginBottom: '15px',
                                                position: 'relative',
                                                backgroundColor: '#f8f9fa',
                                                borderRadius: '8px',
                                                padding: '15px',
                                                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                                            }}>
                                                <div style={{
                                                    marginRight: '15px'
                                                }}>
                                                    <img
                                                        src={comment.user.avatar}
                                                        alt={`${comment.user.name}'s avatar`}
                                                        style={{
                                                            width: '40px',
                                                            height: '40px',
                                                            borderRadius: '50%'
                                                        }}
                                                    />
                                                </div>
                                                <div style={{
                                                    flex: 1
                                                }}>
                                                    <p style={{
                                                        fontWeight: 'bold',
                                                        marginBottom: '5px'
                                                    }}>
                                                        {comment.user.first_name} {comment.user.last_name}
                                                    </p>
                                                    <p style={{
                                                        marginBottom: '0'
                                                    }}>
                                                        {comment.content}
                                                    </p>
                                                </div>
                                                <button
                                                    onClick={() => handleDeleteComment(post.id, comment.id)}
                                                    style={{
                                                        position: 'absolute',
                                                        top: '10px',
                                                        right: '10px',
                                                        backgroundColor: 'transparent',
                                                        border: 'none',
                                                        color: '#dc3545',
                                                        cursor: 'pointer',
                                                        fontSize: '14px',
                                                        padding: '5px 10px',
                                                        borderRadius: '4px',
                                                        transition: 'background-color 0.3s ease'
                                                    }}
                                                    onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(220, 53, 69, 0.1)'}
                                                    onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                                                >
                                                    Delete
                                                </button>
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
>>>>>>> Stashed changes
        </div>
      ) : selectedPost === null ? (
        posts && posts.length > 0 ? (
          posts.map((post) => (
            <div key={post.id} className="post-card">
              <h3 className="post-title" onClick={() => toggleComments(post.id)}>
                {post.title}
              </h3>
              <p className="post-content">{post.content}</p>
            </div>
          ))
        ) : (
          <p>No posts available.</p>
        )
      ) : (
        <div>
          {posts
            .filter((post) => post.id === selectedPost)
            .map((post) => (
              <div key={post.id} className="post-detail">
                <h3>
                  <strong>Title:</strong> {post.title}
                </h3>
                <p>
                  <strong>Content:</strong> {post.content}
                </p>
                <p>
                  <strong>Author:</strong> {post.user.first_name}{" "}
                  {post.user.last_name}
                </p>

                <div className="comment-section">
                  <h4>Comments</h4>
                  <div className="comment-input">
                    <textarea
                      value={post.newComment || ""}
                      onChange={(e) => handleCommentChange(post.id, e.target.value)}
                      placeholder="Add a comment..."
                    />
                    <button
                      onClick={() => handleCommentSubmit(post.id, post.newComment)}
                    >
                      Submit
                    </button>
                  </div>

                  <div className="comments-list">
                    {post.comments && post.comments.length > 0 ? (
                      post.comments.map((comment) => (
                        <div key={comment.id} className="comment">
                          <div className="comment-avatar">
                            <img
                              src={comment.user.avatar}
                              alt={`${comment.user.name}'s avatar`}
                            />
                          </div>
                          <div className="comment-content">
                            <p className="comment-user">
                              {comment.user.first_name} {comment.user.last_name}
                            </p>
                            <p className="comment-text">{comment.content}</p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p>No comments yet.</p>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => setSelectedPost(null)}
                  className="back-button"
                >
                  Back to Posts
                </button>
              </div>
            ))}
        </div>
      )}
    </div>
  )
}

export default Forum

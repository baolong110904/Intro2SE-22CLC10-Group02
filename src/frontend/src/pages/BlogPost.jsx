import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

const BlogPost = () => {
  const [post, setPost] = useState(null)
  const { id } = useParams()

  useEffect(() => {
    const dummyPost = {
      id: id,
      title: "6 Principles Of Learning From Benjamin Riley",
      author: "Benjamin Riley",
      content: `Learning is a lifelong journey, and to make the most of it, we should understand the core principles behind effective learning. These principles apply not just to formal education but also to self-learning and professional development.

## 1. Active Engagement
The most effective learning happens when students are actively involved in the learning process. It’s not enough to passively consume information. Instead, learners should be encouraged to engage with the material through discussion, problem-solving, and teaching others.

## 2. Repetition and Spaced Practice
The brain needs time to solidify new information. Repetition over a longer period, known as spaced practice, is much more effective than cramming. For example, studying the same material over several weeks rather than in one night can help with long-term retention.

## 3. Feedback
Feedback helps learners identify their weaknesses and make improvements. Timely, specific feedback is key to refining one’s understanding of complex topics.

## 4. Motivation
Without intrinsic motivation, the learning process can be slow and inefficient. Finding personal reasons for why the information is important encourages deep learning.

## 5. Real-World Application
The best way to retain and understand new information is by applying it in real-world situations. Hands-on experiences and real-world examples make learning more meaningful.

## 6. Reflection
Reflecting on what you have learned helps to solidify knowledge. This could be done through journaling, discussing what you’ve learned with others, or teaching the concept to someone else.`,
      category: "English",
      imageUrl: "https://i.imgur.com/ZMTvAI3.jpeg",
      authorBio: "Benjamin Riley is an experienced educator and lifelong learner, passionate about educational strategies that empower learners to achieve their full potential.",
      datePublished: "August 29, 2024",
      relatedPosts: [
        { id: 2, title: "Understanding Bloom's Taxonomy", url: "/blog/2" },
        { id: 3, title: "How to Encourage Student Motivation", url: "/blog/3" }
      ]
    }
    setPost(dummyPost)
  }, [id])

  if (!post) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <article className="bg-white dark:bg-neutral-800 rounded-lg shadow-xl p-6">
          <img src={post.imageUrl} alt={post.title} className="w-full h-64 object-cover rounded-lg mb-6" />
          <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-4">By {post.author} | {post.datePublished}</p>
          <div className="prose dark:prose-invert max-w-none mb-6">
            <p>{post.content}</p>
          </div>

          <section className="mb-6">
            <h2 className="text-xl font-bold mb-2">About the Author</h2>
            <p className="text-gray-600 dark:text-gray-400">{post.authorBio}</p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-bold mb-4">Related Posts</h2>
            <ul className="list-disc pl-5">
              {post.relatedPosts.map((relatedPost) => (
                <li key={relatedPost.id}>
                  <a href={relatedPost.url} className="text-blue-500 hover:underline">{relatedPost.title}</a>
                </li>
              ))}
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-bold mb-4">Leave a Comment</h2>
            <textarea 
              className="w-full p-2 border rounded-lg" 
              rows="4" 
              placeholder="Write your comment here..."></textarea>
            <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              Submit
            </button>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4">Tags</h2>
            <div className="flex space-x-2">
              <span className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-full text-sm">Learning</span>
              <span className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-full text-sm">Education</span>
              <span className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-full text-sm">Self-Development</span>
            </div>
          </section>
        </article>
      </main>
      <Footer />
    </div>
  )
}

export default BlogPost

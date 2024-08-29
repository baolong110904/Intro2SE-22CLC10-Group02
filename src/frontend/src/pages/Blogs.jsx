import React, { useState } from "react"
import { FiSearch } from "react-icons/fi"
import { Link } from "react-router-dom"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"

const Blogs = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("Most viewed")

  const blogPosts = [
    {
      id: 1,
      title: "6 Principles Of Learning From Benjamin Riley",
      author: "Benjamin Riley",
      description:
        "Benjamin Riley from Deans for Impact on learning by scientific design provides a brilliant introduction to the research on learning science.",
      category: "English",
      imageUrl: "https://i.imgur.com/ZMTvAI3.jpeg",
    },
    {
      id: 1,
      title: "6 Principles Of Learning From Benjamin Riley",
      author: "Benjamin Riley",
      description:
        "Benjamin Riley from Deans for Impact on learning by scientific design provides a brilliant introduction to the research on learning science.",
      category: "English",
      imageUrl: "https://i.imgur.com/ZMTvAI3.jpeg",
    },
    {
      id: 1,
      title: "6 Principles Of Learning From Benjamin Riley",
      author: "Benjamin Riley",
      description:
        "Benjamin Riley from Deans for Impact on learning by scientific design provides a brilliant introduction to the research on learning science.",
      category: "English",
      imageUrl: "https://i.imgur.com/ZMTvAI3.jpeg",
    },
    {
      id: 1,
      title: "6 Principles Of Learning From Benjamin Riley",
      author: "Benjamin Riley",
      description:
        "Benjamin Riley from Deans for Impact on learning by scientific design provides a brilliant introduction to the research on learning science.",
      category: "English",
      imageUrl: "https://i.imgur.com/ZMTvAI3.jpeg",
    },
    {
      id: 1,
      title: "6 Principles Of Learning From Benjamin Riley",
      author: "Benjamin Riley",
      description:
        "Benjamin Riley from Deans for Impact on learning by scientific design provides a brilliant introduction to the research on learning science.",
      category: "English",
      imageUrl: "https://i.imgur.com/ZMTvAI3.jpeg",
    },
    {
      id: 1,
      title: "6 Principles Of Learning From Benjamin Riley",
      author: "Benjamin Riley",
      description:
        "Benjamin Riley from Deans for Impact on learning by scientific design provides a brilliant introduction to the research on learning science.",
      category: "English",
      imageUrl: "https://i.imgur.com/ZMTvAI3.jpeg",
    },
  ]

  return (
    <div className="flex flex-col min-h-screen light:bg-white dark:bg-neutral-900 transition-colors duration-300">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8 mt-16">
        <h1 className="text-4xl font-extrabold mb-2 light:text-blue-900 dark:text-blue-300 tracking-tight font-poppins transition-colors duration-300">
          Blog Articles
        </h1>
        <p className="mb-4 light:text-gray-600 dark:text-gray-400 transition-colors duration-300">
          Where we discuss about various learning topics!
        </p>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div className="relative w-full md:w-1/2 mb-4 md:mb-0">
            <input
              type="text"
              className="w-full rounded border light:border-gray-300 dark:border-neutral-600 light:bg-white dark:bg-neutral-800 pl-10 px-3 py-2 leading-[1.6] outline-none transition-all duration-300 ease-linear light:text-black dark:text-white"
              placeholder="Search in blogs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 light:text-gray-400 dark:text-gray-500 transition-colors duration-300" />
          </div>

          <select
            className="w-full md:w-40 rounded border light:border-gray-300 dark:border-neutral-600 light:bg-white dark:bg-neutral-800 px-3 py-2 leading-[1.6] outline-none transition-all duration-300 ease-linear light:text-black dark:text-white"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="Most viewed">Most viewed</option>
            <option value="Most relevant">Most relevant</option>
            <option value="Newest">Newest</option>
            <option value="Oldest">Oldest</option>
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <Link to={`/blog/${post.id}`} key={post.id} className="no-underline">
              <div className="light:bg-gray-100 dark:bg-neutral-800 rounded-lg p-4 transition-all duration-300 hover:shadow-lg hover:scale-105">
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
                <span className="text-sm light:text-blue-600 dark:text-blue-400 transition-colors duration-300">
                  {post.category}
                </span>
                <h2 className="text-xl font-bold mb-2 light:text-gray-800 dark:text-gray-200 transition-colors duration-300">
                  {post.title}
                </h2>
                <p className="text-sm mb-2 light:text-gray-600 dark:text-gray-400 transition-colors duration-300">
                  {post.description}
                </p>
                <p className="text-sm light:text-gray-500 dark:text-gray-500 transition-colors duration-300">
                  By {post.author}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default Blogs

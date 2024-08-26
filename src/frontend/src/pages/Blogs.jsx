import React, { useState } from "react"
import { FiSearch } from "react-icons/fi"
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
    // Add more blog post objects
  ]

  return (
    <div
      className="relative overflow-y-auto inset-0 flex items-center justify-center bg-white bg-opacity-70 dark:bg-black dark:bg-opacity-80 z-50"
      id="blogs"
    >
      <Navbar />
      <div className="relative w-full h-full bg-white dark:bg-neutral-900 rounded-lg shadow-lg pt-20">
        <section className="gradient-form h-full bg-neutral-200 dark:bg-darkBg flex justify-center">
          <div className="container mx-auto w-full p-10 text-cyan-950 dark:text-white">
            <div className="flex h-full flex-wrap items-center justify-center">
              <div className="h-full flex justify-center items-center">
                <div className="block rounded-lg bg-white dark:bg-neutral-800 shadow-xl w-full p-4 mx-auto mt-27 h-screen">
                  <div className="g-0 lg:flex lg:flex-wrap h-full">
                    {/* Left column container */}
                    <div className="px-4 md:px-0 lg:w-12/12 h-full flex flex-col justify-start">
                      <h1 className="text-4xl font-extrabold mb-4 text-blue-900 dark:text-blue-300 tracking-tight font-poppins">
                        Blog Articles
                      </h1>
                      <p className="mb-8">
                        Where we discuss about various learning topics!
                      </p>

                      {/* Search bar */}
                      <div className="relative mb-6 flex justify-center">
                        <div className="relative w-full md:w-1/2">
                          <input
                            type="text"
                            className="peer block w-full rounded border border-gray-300 bg-transparent pl-10 px-3 py-2 leading-[1.6] outline-none transition-all duration-200 ease-linear text-black dark:text-white dark:border-neutral-600 dark:bg-neutral-800"
                            placeholder="Search in blogs..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                          />
                          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        </div>
                      </div>

                      {/* Sort dropdown */}
                      <div className="w-40 relative mb-6 flex justify-end">
                        <select
                          className="block w-full rounded border border-gray-300 bg-transparent px-3 py-2 leading-[1.6] outline-none transition-all duration-200 ease-linear text-black dark:text-white dark:border-neutral-600 dark:bg-neutral-800"
                          value={sortBy}
                          onChange={(e) => setSortBy(e.target.value)}
                        >
                          <option value="Most viewed">Most viewed</option>
                          <option value="Most relevant">Most relevant</option>
                          <option value="Newest">Newest</option>
                          <option value="Oldest">Oldest</option>
                        </select>
                      </div>

                      {/* Blog posts */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                        {blogPosts.map((post) => (
                          <div
                            key={post.id}
                            className="bg-gray-100 dark:bg-neutral-700 rounded-lg p-4"
                          >
                            <img
                              src={post.imageUrl}
                              alt={post.title}
                              className="w-full h-40 object-cover rounded-lg mb-4"
                            />
                            <span className="text-sm text-blue-600 dark:text-blue-400">
                              {post.category}
                            </span>
                            <h2 className="text-xl font-bold mb-2">{post.title}</h2>
                            <p className="text-sm mb-2">{post.description}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              By {post.author}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </div>
  )
}

export default Blogs
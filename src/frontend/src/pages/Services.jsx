import React, { useState } from "react"
import { Carousel } from "react-responsive-carousel"
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md"

const a1 = "https://imgur.com/3HVA7k7.png"
const a2 = "https://imgur.com/rC0dndm.png"
const a3 = "https://imgur.com/LSf6nJK.png"
const a4 = "https://imgur.com/Avoi7N7.png"
const a5 = "https://imgur.com/VIE1dbG.png"
const a6 = "https://imgur.com/hqx98Pe.png"
const a7 = "https://imgur.com/6z5kZ8H.png"
const b1 = "https://imgur.com/gzKd5ZK.png"
const b2 = "https://imgur.com/cROJfdB.png"
const b3 = "https://imgur.com/UiydXwq.png"
const images = [a1, a2, a3, a4, a5, a6, a7]
const featuredImg1 = "https://imgur.com/TRnNjkq.png"
const featuredImg2 = "https://imgur.com/ZBmNwDM.png"
const featuredImg3 = "https://imgur.com/nACjgMp.png"

const carousels = [
  [
    { image: featuredImg1, caption: "Slide 1 for Carousel 1" },
    { image: featuredImg2, caption: "Slide 2 for Carousel 1" },
    { image: featuredImg3, caption: "Slide 3 for Carousel 1" },
  ],
  [
    { image: featuredImg1, caption: "Slide 1 for Carousel 2" },
    { image: featuredImg2, caption: "Slide 2 for Carousel 2" },
    { image: featuredImg3, caption: "Slide 3 for Carousel 2" },
  ],
  [
    { image: featuredImg1, caption: "Slide 1 for Carousel 3" },
    { image: featuredImg2, caption: "Slide 2 for Carousel 3" },
    { image: featuredImg3, caption: "Slide 3 for Carousel 3" },
  ],
  [
    { image: featuredImg1, caption: "Slide 1 for Carousel 4" },
    { image: featuredImg2, caption: "Slide 2 for Carousel 4" },
    { image: featuredImg3, caption: "Slide 3 for Carousel 4" },
  ],
  [
    { image: featuredImg1, caption: "Slide 1 for Carousel 5" },
    { image: featuredImg2, caption: "Slide 2 for Carousel 5" },
    { image: featuredImg3, caption: "Slide 3 for Carousel 5" },
  ],
  [
    { image: featuredImg1, caption: "Slide 1 for Carousel 6" },
    { image: featuredImg2, caption: "Slide 2 for Carousel 6" },
    { image: featuredImg3, caption: "Slide 3 for Carousel 6" },
  ],
  [
    { image: featuredImg1, caption: "Slide 1 for Carousel 7" },
    { image: featuredImg2, caption: "Slide 2 for Carousel 7" },
    { image: featuredImg3, caption: "Slide 3 for Carousel 7" },
  ],
]

const Services = () => {
  const [currentCarouselIndex, setCurrentCarouselIndex] = useState(0)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  const handleImageClick = (index) => {
    setCurrentCarouselIndex(index)
    setSelectedImageIndex(index)
  }

  const renderArrowPrev = (clickHandler, hasPrev, label) => {
    return (
      hasPrev && (
        <button
          onClick={clickHandler}
          title={label}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 rounded-full w-10 h-10 flex justify-center items-center z-10"
        >
          <MdKeyboardArrowLeft />
        </button>
      )
    )
  }

  const renderArrowNext = (clickHandler, hasNext, label) => {
    return (
      hasNext && (
        <button
          onClick={clickHandler}
          title={label}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 rounded-full w-10 h-10 flex justify-center items-center z-10"
        >
          <MdKeyboardArrowRight />
        </button>
      )
    )
  }

  return (
    <div
      className="md:px-14 px-4 py-16 max-w-screen-2xl mx-auto dark:bg-darkBg "
      id="services"
    >
      <div className="text-center my-8">
        <h2 className="text-4xl font-semibold mb-2">
          What languages do you want to learn?
        </h2>
        <p className="font-italic">
          {" "}
          We provide learners with over 20+ languages with experienced teachers.{" "}
        </p>

        <div className="my-12 flex flex-wrap justify-between items-center gap-8">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt=""
              className={`cursor-pointer rounded-full border-4 ${selectedImageIndex === index ? "border-blue-950" : "border-transparent"}`}
              onClick={() => handleImageClick(index)}
            />
          ))}
        </div>

        <div className="bg-[rgba(255, 255, 255, 0.04)] dark:bg-darkCard rounded-[35px] h-96 shadow-3xl p-5 items-center flex justify-center">
          <Carousel
            className="h-full w-full"
            renderArrowPrev={renderArrowPrev}
            renderArrowNext={renderArrowNext}
            infiniteLoop={true}
            autoPlay={true}
            interval={3000}
          >
            {carousels[currentCarouselIndex].map((slide, index) => (
              <div key={index} className="h-96 p-5 items-center flex justify-center">
                <div>
                  <img src={slide.image} alt={slide.caption} />
                  <h5 className="font-semibold px-5 text-center mt-5">
                    {slide.caption}
                  </h5>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
        <br />
        <br />
        <br />
        <br />
        <div className="flex flex-col lg:flex-row justify-between items-start gap-10">
          <div className="lg:w-1/4 flex flex-col md:py-28 py-23 justify-center lg:justify-start items-center text-center lg:items-start lg:text-left h-full">
            <h3 className="text-5xl font-bold">Why we are better than others</h3>
            <p className="text-base dark:text-darkText">
              We foster a vibrant community where learners can connect and
              collaborate, enhancing their educational journey through shared
              knowledge and support.
              <br />
              Additionally, we offer personalized online meetings with expert
              teachers, ensuring tailored guidance and mentorship to help each
              learner reach their full potential."
            </p>
          </div>
          <div className="w-full lg:w-3/4">
            <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 items-start md:gap-12 gap-8">
              <div className="bg-[rgba(255, 255, 255, 0.04)] dark:bg-darkCard rounded-[35px] h-96 shadow-3xl p-8 items-center flex justify-center hover:-translate-y-4 transition-all duration-300 cursor-pointer">
                <div>
                  <img src={b1} alt="Access to learning documents" />
                  <h5 className="text-2xl font-semibold px-5 text-center mt-5 dark:text-darkText">
                    Access to learning documents
                  </h5>
                </div>
              </div>
              <div className="bg-[rgba(255, 255, 255, 0.04)] dark:bg-darkCard rounded-[35px] h-96 shadow-3xl p-8 items-center flex justify-center hover:-translate-y-4 transition-all duration-300 cursor-pointer md:mt-16">
                <div>
                  <img src={b2} alt="Connect with fellow learners" />
                  <h5 className="text-2xl font-semibold px-5 text-center mt-5 dark:text-darkText">
                    Connect with fellow learners
                  </h5>
                </div>
              </div>
              <div className="bg-[rgba(255, 255, 255, 0.04)] dark:bg-darkCard rounded-[35px] h-96 shadow-3xl p-8 items-center flex justify-center hover:-translate-y-4 transition-all duration-300 cursor-pointer">
                <div>
                  <img src={b3} alt="Online meeting with teacher" />
                  <h5 className="text-2xl font-semibold px-5 text-center mt-5 dark:text-darkText">
                    Online meeting with teacher
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Services

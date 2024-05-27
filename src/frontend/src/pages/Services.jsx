import React, { useState } from 'react'
import featuredImg1 from '../assets/featuredImg1.png'
import featuredImg2 from '../assets/featuredImg2.png'
import featuredImg3 from '../assets/featuredImg3.png'
import b1 from '../assets/b1.png'
import b2 from '../assets/b2.png'
import b3 from '../assets/b3.png'
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import a1 from '../assets/a1.png'
import a2 from '../assets/a2.png'
import a3 from '../assets/a3.png'
import a4 from '../assets/a4.png'
import a5 from '../assets/a5.png'
import a6 from '../assets/a6.png'
import a7 from '../assets/a7.png'

const images = [a1, a2, a3, a4, a5, a6, a7];

const items = [
    {
      img: a1,
      desc: 'Chinese',
      buttonIcon: a1,
    },
    {
      img: a2,
      desc: 'Korean',
      buttonIcon: a2,
    },
    {
      img: a3,
      desc: 'German',
      buttonIcon: a3,
    },
    {
      img: a4,
      desc: 'French',
      buttonIcon: a4,
    },
    {
        img: a5,
        desc: 'English',
        buttonIcon: a5,
    },
    {
        img: a6,
        desc: 'Japanese',
        buttonIcon: a6,
    },
    {
        img: a7,
        desc: 'Spanish',
        buttonIcon: a7,
    },
      
]  

const carousels = [
    [ // Carousel 1
        { image: featuredImg1, caption: 'Slide 1 for Carousel 1' },
        { image: featuredImg2, caption: 'Slide 2 for Carousel 1' },
        { image: featuredImg3, caption: 'Slide 3 for Carousel 1' },
    ],
    [ // Carousel 2
        { image: featuredImg1, caption: 'Slide 1 for Carousel 2' },
        { image: featuredImg2, caption: 'Slide 2 for Carousel 2' },
        { image: featuredImg3, caption: 'Slide 3 for Carousel 2' },
    ],
    [ // Carousel 3
        { image: featuredImg1, caption: 'Slide 1 for Carousel 3' },
        { image: featuredImg2, caption: 'Slide 2 for Carousel 3' },
        { image: featuredImg3, caption: 'Slide 3 for Carousel 3' },
    ],
    [ // Carousel 4
        { image: featuredImg1, caption: 'Slide 1 for Carousel 4' },
        { image: featuredImg2, caption: 'Slide 2 for Carousel 4' },
        { image: featuredImg3, caption: 'Slide 3 for Carousel 4' },
    ],
    [ // Carousel 5
        { image: featuredImg1, caption: 'Slide 1 for Carousel 5' },
        { image: featuredImg2, caption: 'Slide 2 for Carousel 5' },
        { image: featuredImg3, caption: 'Slide 3 for Carousel 5' },
    ],
    [ // Carousel 6
        { image: featuredImg1, caption: 'Slide 1 for Carousel 6' },
        { image: featuredImg2, caption: 'Slide 2 for Carousel 6' },
        { image: featuredImg3, caption: 'Slide 3 for Carousel 6' },
    ],
    [ // Carousel 7
        { image: featuredImg1, caption: 'Slide 1 for Carousel 7' },
        { image: featuredImg2, caption: 'Slide 2 for Carousel 7' },
        { image: featuredImg3, caption: 'Slide 3 for Carousel 7' },
    ],
];

const Services = () => {
    const [currentCarouselIndex, setCurrentCarouselIndex] = useState(0);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

    const handleImageClick = (index) => {
        setCurrentCarouselIndex(index);
        setSelectedImageIndex(index);
    }
    const renderArrowPrev = (clickHandler, hasPrev, label) => {
        return (
          hasPrev && (
            <button onClick={clickHandler} title={label} className="absolute left-0 top-1/2 transform -translate-y-1/2 rounded-full w-10 h-10 flex justify-center items-center z-10">
              <MdKeyboardArrowLeft className="text-black" /> {/* Use the left arrow icon */}
            </button>
          )
        );
      };
    
      // Function to render the next arrow
      const renderArrowNext = (clickHandler, hasNext, label) => {
        return (
          hasNext && (
            <button onClick={clickHandler} title={label} className="absolute right-0 top-1/2 transform -translate-y-1/2 rounded-full w-10 h-10 flex justify-center items-center z-10">
              <MdKeyboardArrowRight className="text-black" /> {/* Use the right arrow icon */}
            </button>
          )
        );
      };
  return (
    <div className='md:px-14 px-4 py-16 max-w-screen-2xl mx-auto' id="services">
        <div className='text-center my-8'>
            <h2 className='text-4xl text-blue-950 font-semibold mb-2'>What languages do you want to learn?</h2>
            <p className='text-blue-950 font-italic'> We provide learners with over 20+ languages with experienced teachers. </p>
        
            <div className='my-12 flex flex-wrap justify-between items-center gap-8'>
                {images.map((image, index) => (
                    <img
                        key={index}
                        src={image}
                        alt=""
                        className={`cursor-pointer rounded-full border-4 ${selectedImageIndex === index ? 'border-blue-950' : 'border-transparent'}`}
                        onClick={() => handleImageClick(index)}
                    />
                ))}                                        
            </div>

            <div className='bg-[rgba(255, 255, 255, 0.04)] rounded-[35px] h-96 shadow-3xl p-5 items-center flex justify-center'>
                    <Carousel
                        className="h-full w-full"
                        renderArrowPrev={renderArrowPrev}
                        renderArrowNext={renderArrowNext}
                        infiniteLoop={true}
                        autoPlay={true}
                        interval={3000}
                    >
                        {carousels[currentCarouselIndex].map((slide, index) => (
                            <div key={index} className='h-96 p-5 items-center flex justify-center'>
                                <div>
                                    <img src={slide.image} alt={slide.caption} />
                                    <h5 className='font-semibold text-blue-950 px-5 text-center mt-5'>{slide.caption}</h5>
                                </div>
                            </div>
                        ))}
                </Carousel>
            </div>
            <br/>
            <br/>
            <br/>
            <br/>
            <div className="flex flex-col lg:flex-row justify-between items-start gap-10">
                <div className="lg:w-1/4 flex flex-col md:py-28 py-23 justify-center lg:justify-start items-center text-center lg:items-start lg:text-left h-full">
                    <h3 className="text-xl text-blue-950 font-bold">Why we are better than others</h3>
                    <p className="text-base text-black">A simple paragraph is comprised of 2 major components. The first sentence, which is often a delcarative sentence, is call the topic senetence</p>
                </div>
                <div className="w-full lg:w-3/4">
                    <div className='grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 items-start md:gap-12 gap-8'>
                        <div className='bg-[rgba(255, 255, 255, 0.04)] rounded-[35px] h-96 shadow-3xl p-8 items-center flex justify-center hover:-translate-y-4 transition-all duration-300 cursor-pointer'>
                            <div>
                                <img src={b1} alt="" />
                                <h5 className='text-2xl font-semibold text-blue-950 px-5 text-center mt-5'>Access to learning documents</h5>
                            </div>
                        </div>
                        <div className='bg-[rgba(255, 255, 255, 0.04)] rounded-[35px] h-96 shadow-3xl p-8 items-center flex justify-center hover:-translate-y-4 transition-all duration-300 cursor-pointer md:mt-16'>
                            <div>
                                <img src={b2} alt="" />
                                <h5 className='text-2xl font-semibold text-blue-950 px-5 text-center mt-5'>Connect with fellow learners</h5>
                            </div>
                        </div>
                        <div className='bg-[rgba(255, 255, 255, 0.04)] rounded-[35px] h-96 shadow-3xl p-8 items-center flex justify-center hover:-translate-y-4 transition-all duration-300 cursor-pointer'>
                            <div>
                                <img src={b3} alt="" />
                                <h5 className='text-2xl font-semibold text-blue-950 px-5 text-center mt-5'>Online meeting with teacher</h5>
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
import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css";

const banner1 = "https://imgur.com/7kCBjTT.png";

const Banner = () => {
    return (
        <div className="p-4 max-w-screen-2xl mx-auto mt-27 h-screen dark:bg-darkBg">
            <div className='gradientBg rounded-xl rounded-br-[80px] md:p-9 px-2 py-9 h-full'>
                <div className='px-4 lg:px-14 max-w-screen-2xl mx-auto h-full'>
                    <div className="my-28 md:my-8 py-12 flex flex-col md:flex-row-reverse items-center justify-between gap-12 h-full">
                        <div className='flex justify-center h-full'>
                            <img src={banner1} alt="Banner 1" className='self-center' />
                        </div>
                        <div className='text-black md:w-2/3 text-left'>
                        <h1 className='animate-slidein300 opacity-0 text-3xl md:text-4xl font-extrabold [text-wrap:balance] leading-relaxed'>Learn a new <span className="text-green-100 inline-flex flex-col h-[calc(theme(fontSize.3xl)*theme(lineHeight.tight))] md:h-[calc(theme(fontSize.4xl)*theme(lineHeight.tight))] overflow-hidden">
        <ul className="block animate-text-slide-5 text-left leading-tight [&_li]:block">
            <li>language</li>
            <li>English</li>
            <li>Japanese</li>
            <li>Chinese</li>
            <li>Spanish</li>
            <li aria-hidden="true">language</li>
        </ul>
    </span><br />why not?</h1>
                        <p className='animate-slidein500 opacity-0 text-white md:text-xl mt-8 mb-5'>
                            In the world where global integration has risen to unprecedented heights, the ability to communicate across cultures has become essential. Let's unlock the world of language together!
                        </p>
                        <br />
                        <button className="text-white animate-slidein700 opacity-0 px-7 py-2 bg-blue-600 font-medium rounded hover:bg-blue-600 hover:text-white inline-flex justify-center whitespace-nowrap text-sm dark:bg-blue-600 dark:text-white dark:hover:bg-blue-700 dark:hover:text-white shadow focus:outline-none focus:ring focus:ring-blue-500/50 focus-visible:outline-none focus-visible:ring focus-visible:ring-blue-500/50 relative before:absolute before:inset-0 before:rounded-[inherit] before:bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.5)_50%,transparent_75%,transparent_100%)] dark:before:bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.5)_50%,transparent_75%,transparent_100%)] before:bg-[length:250%_250%,100%_100%] before:bg-[position:200%_0,0_0] before:bg-no-repeat before:[transition:background-position_0s_ease] hover:before:bg-[position:-100%_0,0_0] hover:before:duration-[1500ms]">
                            Learn for free
                        </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
      );
}

export default Banner

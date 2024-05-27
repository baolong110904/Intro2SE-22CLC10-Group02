import React, { useEffect, useState, useRef } from 'react';
import aboutImg1 from "../assets/aboutImg1.png";
import "https://cdn.jsdelivr.net/npm/@alpinejs/intersect@3.x.x/dist/cdn.min.js";
import "https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js";

const About = () => {
    const [shown, setShown] = useState(false);
    const aboutRef = useRef(null);
  
    useEffect(() => {
        const options = {
          root: null,
          rootMargin: '0px',
          threshold: [0, 0.5] // Observe when entering and exiting the viewport
        };
    
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.intersectionRatio > 0) {
              setShown(true);
            } else {
              setShown(false);
            }
          });
        }, options);
    
        if (aboutRef.current) {
          observer.observe(aboutRef.current);
        }
    
        return () => {
          if (aboutRef.current) {
            observer.unobserve(aboutRef.current);
          }
        };
      }, []);
      
      

  return (
    <div className='md:px-14 p-4 max-w-s mx-auto'ref={aboutRef} id="about">
      <div className="flex flex-col md:flex-row justify-between items-center gap-8">
      {shown && (
        <>
        <div className="md:w-1/2">
          <img src={aboutImg1} alt="" />
        </div>

        <div>
          <section className="grid gap-12 md:grid-cols-3 md:gap-16">
            {/* Block #1 */}
            <article>
              <div className="w-14 h-14 rounded shadow-md bg-white flex justify-center items-center rotate-3 mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="31" height="20">
                  <defs>
                    <linearGradient id="icon1-a" x1="50%" x2="50%" y1="0%" y2="100%">
                      <stop offset="0%" stop-color="#A5B4FC" />
                      <stop offset="100%" stop-color="#4F46E5" />
                    </linearGradient>
                    <linearGradient id="icon1-b" x1="50%" x2="50%" y1="0%" y2="100%">
                      <stop offset="0%" stop-color="#EEF2FF" />
                      <stop offset="100%" stop-color="#C7D2FE" />
                    </linearGradient>
                  </defs>
                  <g fill="none" fill-rule="nonzero">
                    <path fill="url(#icon1-a)" d="M20.625 0H9.375a9.375 9.375 0 0 0 0 18.75h11.25a9.375 9.375 0 0 0 0-18.75Z" transform="translate(.885 .885)" />
                       <path fill="url(#icon1-b)" d="M9.375 17.5A8.125 8.125 0 0 1 1.25 9.375 8.125 8.125 0 0 1 9.375 1.25 8.125 8.125 0 0 1 17.5 9.375 8.125 8.125 0 0 1 9.375 17.5Z" transform="translate(.885 .885)" />
                     </g>
                   </svg>
                 </div>
                 <h2>
                    <span class="flex tabular-nums text-blue-950 text-5xl font-extrabold mb-2 animate-[counter40_3s_ease-out_forwards] [counter-set:_num_var(--num)] before:content-[counter(num)]">
                        <span class="sr-only">20</span>+
                    </span>
                    <span class="text-xl inline-flex font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-800 to-blue-400 mb-2">Languages</span>
                </h2>

                 <p className="text-slate-500">There are over 20 languages with a variety of courses for learners to use.</p>
               </article>
               {/* Block #2 */}
               <article>
                 <div className="w-14 h-14 rounded shadow-md bg-white flex justify-center items-center -rotate-3 mb-6">
                   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="19">
                     <defs>
                       <linearGradient id="icon2-a" x1="50%" x2="50%" y1="0%" y2="100%">
                         <stop offset="0%" stop-color="#A5B4FC" />
                         <stop offset="100%" stop-color="#4F46E5" />
                       </linearGradient>
                       <linearGradient id="icon2-b" x1="50%" x2="50%" y1="0%" y2="100%">
                         <stop offset="0%" stop-color="#E0E7FF" />
                         <stop offset="100%" stop-color="#A5B4FC" />
                       </linearGradient>
                     </defs>
                     <g fill="none" fill-rule="nonzero">
                       <path fill="url(#icon2-a)" d="M5.5 0a5.5 5.5 0 0 0 0 11c.159 0 .314-.01.469-.024a15.896 15.896 0 0 1-2.393 6.759A.5.5 0 0 0 4 18.5h1a.5.5 0 0 0 .362-.155C7.934 15.64 11 11.215 11 5.5A5.506 5.506 0 0 0 5.5 0Z" />
                       <path fill="url(#icon2-b)" d="M18.5 0a5.5 5.5 0 0 0 0 11c.159 0 .314-.01.469-.024a15.896 15.896 0 0 1-2.393 6.759.5.5 0 0 0 .424.765h1a.5.5 0 0 0 .363-.155C20.934 15.64 24 11.215 24 5.5A5.506 5.506 0 0 0 18.5 0Z" />
                     </g>
                   </svg>
                 </div>
                 <h2>
                    <span class="flex tabular-nums text-blue-950 text-5xl font-extrabold mb-2 animate-[counter70_3s_ease-out_forwards] [counter-set:_num_var(--num)] before:content-[counter(num)]">
                        <span class="sr-only">250</span>+
                    </span>
                    <span class="text-xl inline-flex font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-800 to-blue-400 mb-2">Courses</span>
                </h2>

                 <p className="text-slate-500">A broad selection of courses provided in this website</p>
               </article>
               {/* Block #3 */}
               <article>
                 <div className="w-14 h-14 rounded shadow-md bg-white flex justify-center items-center rotate-3 mb-6">
                   <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26">
                     <defs>
                       <radialGradient id="icon3-a" cx="68.15%" cy="27.232%" r="67.641%" fx="68.15%" fy="27.232%">
                         <stop offset="0%" stop-color="#E0E7FF" />
                         <stop offset="100%" stop-color="#A5B4FC" />
                       </radialGradient>
                     </defs>
                     <g fill="none" fill-rule="nonzero">
                       <circle cx="13" cy="13" r="13" fill="url(#icon3-a)" />
                       <path fill="#4F46E5" fill-opacity=".56" d="M0 13a12.966 12.966 0 0 0 4.39 9.737l1.15-1.722s.82-.237.997-.555c.554-.997-.43-2.733-.43-2.733a5.637 5.637 0 0 0-.198-1.23c-.148-.369-1.182-.874-1.182-.874S3.73 13.998 3.73 13a1.487 1.487 0 0 1 1.404-1.55 2.424 2.424 0 0 0 1.588-1.146s1.256-.332 1.551-.847c.295-.515-.332-2.36-.332-2.36a3.086 3.086 0 0 0-.012-1.481 2.8 2.8 0 0 0-.93-1.12 6.143 6.143 0 0 0-1.447-2.148A12.981 12.981 0 0 0 0 13ZM13 0c-.35 0-.696.018-1.04.045-.112.35-.695 1.248-.548 1.653.147.406 1.353.783 1.353.783s-.32 1.25.235 1.692c.554.443 1.44-.148 1.773-.037.331.111.258 2.29.258 2.29s1.07 1.181 2.124 1.33c1.053.147 2.656-1.64 2.656-1.64a21.131 21.131 0 0 0 3.448-1.102A12.974 12.974 0 0 0 13 0Z" />
                       <path fill="#6366F1" fill-opacity=".4" d="M21.398 13.848c.296.702-.555 2.494-1.256 2.843a4.76 4.76 0 0 0-1.82 1.452c-.259.406-.598 2.082-1.447 2.415-.85.332-2.863 2.228-3.934 1.932-1.071-.296-1.071-2.842-.333-3.988.441-.683-.074-2.179-.113-2.695-.039-.517-1.586-1.478-1.586-1.994 0-.813 1.772-2.955 1.772-2.955s1.453-.48 1.896-.37c.448.164.877.374 1.28.628.782.058 1.552.22 2.29.48l.848.775s2.107.777 2.403 1.477Z" />
                     </g>
                   </svg>
                 </div>
                 <h2>
                    <span class="flex tabular-nums text-blue-950 text-5xl font-extrabold mb-2 animate-[counter179_3s_ease-out_forwards] [counter-set:_num_var(--num)] before:content-[counter(num)]">
                        <span class="sr-only">1000</span>+
                    </span>
                    <span class="text-xl inline-flex font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-800 to-blue-400 mb-2">Online Videos</span>
                </h2>

                 <p className="text-slate-500">Choose from over 210,000 online video courses with new additions published every month.</p>
               </article>
             </section>
           </div>
           </>
        )} 
         </div>
       </div>
     );
   }

export default About;


import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const Banner = () => {
    const slides = [
        {
            id: 1,
            title: "Discover Your Next Adventure",
            description: "Explore our vast collection of books across all genres.",
            image: "./slide-1.jpg",
        },
        {
            id: 2,
            title: "Read, Learn, and Grow",
            description: "Enhance your knowledge with our curated library selections.",
            image: "./slide-2.jpg",
        },
        {
            id: 3,
            title: "Your Library, Your Haven",
            description: "Experience the joy of reading in a tranquil environment.",
            image: "./slide-3.jpg",
        },
    ];

    return (
        <div className="banner">
            <Carousel 
                showThumbs={false}
                autoPlay
                infiniteLoop
                interval={2000}
                showStatus={false}
                dynamicHeight={false}
            >
                {slides.map((slide) => (
                    <div 
                        key={slide.id} 
                        className="slide" 
                        style={{
                            backgroundImage: `url(${slide.image})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            height: "400px",
                        }}
                    >
                        <div className="bg-black bg-opacity-50 h-full flex flex-col justify-center items-center text-white text-center px-4">
                            <h2 className="text-4xl font-bold mb-2">{slide.title}</h2>
                            <p className="text-lg">{slide.description}</p>
                        </div>
                    </div>
                ))}
            </Carousel>
        </div>
    );
};

export default Banner;

import React from 'react';
import { Typewriter } from 'react-simple-typewriter';

const CustomerFeedback = () => {
    const feedbacks = [
        {
            id: 1,
            name: "Sarah Johnson",
            feedback: "BookHaven is a fantastic place to discover new reads. The collection is extensive, and the staff is incredibly helpful!",
            image: "./owl.png",
        },
        {
            id: 2,
            name: "David Smith",
            feedback: "I love the cozy reading environment. The membership benefits are a great value for avid readers like me.",
            image: "./superhero.png",
        },
        {
            id: 3,
            name: "Emily Davis",
            feedback: "The online catalog and reservation system are seamless. Highly recommend BookHaven for book lovers!",
            image: "./lions-head.webp",
        },
    ];

    return (
        <div className="customer-feedback py-10 bg-gray-700">
            <h2 className="text-3xl font-bold text-center mb-6 text-gray-100 w-11/12 mx-auto">What Our Customers Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-11/12 mx-auto ">
                {feedbacks.map((feedback) => (
                    <div
                        key={feedback.id}
                        className=" feedback-card bg-gray-500 shadow rounded overflow-hidden text-center p-6"
                    >
                        <img
                            src={feedback.image}
                            alt={feedback.name}
                            className="w-16 h-16 rounded-full mx-auto mb-4 p-1 bg-white"
                        />
                        <h3 className="text-xl font-semibold text-gray-100">{feedback.name}</h3>
                        <p className="text-gray-300 italic mt-2">
                            <Typewriter
                                words={[`"${feedback.feedback}"`]}
                                loop={false}
                                cursor
                                cursorStyle="|"
                                typeSpeed={50}
                                deleteSpeed={30}
                                delaySpeed={1000}
                            />
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CustomerFeedback;

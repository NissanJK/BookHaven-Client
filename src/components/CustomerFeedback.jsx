import React from 'react';
import { motion } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';

const fadeInVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.3 },
    },
};

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
        <motion.div 
            className="customer-feedback py-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
        >
            <motion.h2 
                className="text-3xl font-bold text-center mb-6 text-gray-100 w-11/12 mx-auto"
                variants={fadeInVariants}
            >
                What Our Customers Say
            </motion.h2>

            <motion.div 
                className="grid grid-cols-1 md:grid-cols-3 gap-6 w-11/12 mx-auto"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
            >
                {feedbacks.map((feedback) => (
                    <motion.div
                        key={feedback.id}
                        className="feedback-card bg-gray-700 shadow rounded overflow-hidden text-center p-6"
                        variants={fadeInVariants}
                        whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
                    >
                        <motion.img
                            src={feedback.image}
                            alt={feedback.name}
                            className="w-16 h-16 rounded-full mx-auto mb-4 p-1 bg-white"
                            whileHover={{ rotate: 5 }}
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
                    </motion.div>
                ))}
            </motion.div>
        </motion.div>
    );
};

export default CustomerFeedback;

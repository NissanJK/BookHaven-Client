import React from 'react';

const FAQ = () => {
    const faqs = [
        {
            question: "How can I become a member of BookHaven?",
            answer: "You can register online through our website or visit us at the library to sign up.",
        },
        {
            question: "What is the borrowing limit for members?",
            answer: "Members can borrow up to 5 books at a time for a period of 14 days.",
        },
        {
            question: "Can I reserve books online?",
            answer: "Yes, members can log in to their accounts and reserve books through our online catalog.",
        },
        {
            question: "What happens if I return a book late?",
            answer: "Late returns incur a small fee of $0.50 per day per book.",
        },
        {
            question: "Does BookHaven host any events?",
            answer: "Yes, we host monthly book clubs, author meet-and-greets, and workshops. Check our events page for details.",
        },
    ];

    return (
        <div className="py-10">
            <h2 className="text-3xl font-bold text-center mb-6 text-gray-100">Frequently Asked Questions</h2>
            <div className="w-11/12 mx-auto space-y-6">
                {faqs.map((faq, index) => (
                    <div key={index} className="faq-item bg-gray-700 p-4 rounded shadow">
                        <h3 className="font-semibold text-lg text-gray-100">{faq.question}</h3>
                        <p className="text-gray-300 mt-2">{faq.answer}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FAQ;

import React from 'react';
import { Link } from 'react-router-dom';

const categories = [
    { name: 'Novel', image: 'https://png.pngtree.com/element_our/20190524/ourmid/pngtree-reading-day-classic-novel-book-image_1097975.jpg' },
    { name: 'Thriller', image: 'https://w7.pngwing.com/pngs/595/153/png-transparent-poster-book-graphic-design-suspense-thriller-eyes-text-people-computer-wallpaper-thumbnail.png' },
    { name: 'History', image: 'https://w7.pngwing.com/pngs/506/256/png-transparent-history-history-angle-text-rectangle.png' },
    { name: 'Drama', image: 'https://png.pngtree.com/png-vector/20221001/ourmid/pngtree-drama-mask-png-image_6250397.png' },
    { name: 'Sci-Fi', image: 'https://img.freepik.com/free-photo/open-book-with-fairytale-scene_52683-107845.jpg' },
];
const BookCategories = () => {
    return (
        <div className='py-10'>
            <h1 className='text-3xl font-bold text-center mb-6 text-gray-100'>Book Categories</h1>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 w-11/12 mx-auto">
                {categories.map((category) => (
                    <div key={category.name} className="card">
                        <img src={category.image} alt={category.name} className="w-full h-40 object-cover gloss rounded-t-xl" />
                        <h2 className="text-xl font-bold text-center">{category.name}</h2>
                        <Link to={`/categories/${category.name}`} className="btn btn-primary mt-2">Explore</Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BookCategories;

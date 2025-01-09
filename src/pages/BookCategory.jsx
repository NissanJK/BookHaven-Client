import React from 'react';
import { Link } from 'react-router-dom';

const categories = [
    { name: 'Novel', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/To_Kill_a_Mockingbird_%28first_edition_cover%29.jpg/800px-To_Kill_a_Mockingbird_%28first_edition_cover%29.jpg' },
    { name: 'Thriller', image: 'https://cityreadsbookstore.com/cdn/shop/files/adventures-of-Sherlock-Holmes.jpg?v=1700794759&width=1445' },
    { name: 'History', image: 'https://m.media-amazon.com/images/I/81oHM-dzefL._AC_UF894,1000_QL80_.jpg' },
    { name: 'Drama', image: 'https://m.media-amazon.com/images/I/61N-UOA0alL._UF1000,1000_QL80_.jpg' },
    { name: 'Sci-Fi', image: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1327144697i/3744438.jpg' },
    { name: 'Romance', image: 'https://static-01.daraz.com.bd/p/73f6f49d24c14c7773137548dcf4af90.jpg' },
];
const BookCategories = () => {
    return (
        <div className='py-10'>
            <h1 className='text-3xl font-bold text-center mb-6 text-gray-100'>Book Categories</h1>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 w-11/12 mx-auto">
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

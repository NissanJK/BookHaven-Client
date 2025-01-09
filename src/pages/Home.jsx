import React from 'react';
import { Helmet } from 'react-helmet';
import Banner from '../components/Banner';
import FAQ from '../components/FAQ';
import CustomerFeedback from '../components/CustomerFeedback';
import BookCategory from './BookCategory';
import Newsletter from '../components/Newsletter';

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>BookHaven | Home</title>
            </Helmet>
            <Banner/>
            <BookCategory/>
            <CustomerFeedback/>
            <FAQ/>
            <Newsletter/>
            
        </div>
    );
};

export default Home;
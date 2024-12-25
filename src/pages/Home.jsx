import React from 'react';
import { Helmet } from 'react-helmet';
import Banner from '../components/Banner';
import FAQ from '../components/FAQ';
import CustomerFeedback from '../components/CustomerFeedback';
import BookCategory from './BookCategory';

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
            
        </div>
    );
};

export default Home;
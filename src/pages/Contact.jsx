import React from 'react';
import Contact from '../components/Contact';
import FAQ from '../components/FAQ';
import BlogExpress from '../components/BlogExpress';
import HiddenCoin from '../components/HiddenCoin';

const ContactPage = () => {
    return (
        <div className="pt-20">
            <BlogExpress />
            <FAQ />
            <Contact />
            <HiddenCoin className="bottom-10 left-10" />
        </div>
    );
};

export default ContactPage;

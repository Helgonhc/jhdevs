import React from 'react';
import Hero from '../components/Hero';
import TechBar from '../components/TechBar';
import Stats from '../components/Stats';
import SocialProof from '../components/SocialProof';
import BeforeAfter from '../components/BeforeAfter';
import HiddenCoin from '../components/HiddenCoin';

const Home = () => {
    return (
        <>
            <HiddenCoin className="top-32 left-10" />
            <Hero />
            <TechBar />
            <SocialProof />
            <BeforeAfter />
        </>
    );
};

export default Home;

import React from 'react';
import Hero from '../components/Hero';
import TechBar from '../components/TechBar';
import SocialProof from '../components/SocialProof';
import BeforeAfter from '../components/BeforeAfter';
import DiagnosticQuiz from '../components/DiagnosticQuiz';
import PerformanceSim from '../components/PerformanceSim';
import LeadMagnet from '../components/LeadMagnet';
import HiddenCoin from '../components/HiddenCoin';

const Home = () => {
    return (
        <>
            <HiddenCoin className="top-32 left-10" />
            <Hero />
            <TechBar />
            <DiagnosticQuiz />
            <PerformanceSim />
            <SocialProof />
            <BeforeAfter />
            <LeadMagnet />
        </>
    );
};

export default Home;

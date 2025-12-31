import React from 'react';
import Services from '../components/Services';
import Niches from '../components/Niches';
import Process from '../components/Process';
import BudgetCalculator from '../components/BudgetCalculator';
import HiddenCoin from '../components/HiddenCoin';

const ServicesPage = () => {
    return (
        <div className="pt-20">
            <Services />
            <Niches />
            <Process />
            <div className="relative">
                <HiddenCoin className="top-0 right-20" />
            </div>
            <BudgetCalculator />
        </div>
    );
};

export default ServicesPage;

import React from 'react';
import Hero from '../components/HeroSection'
import HighlightsSection from "../components/HighlightsSection"
import AboutPlatform from '../components/AboutPlatform'
import NewSettlersSignUp from "../components/NewSettlers"
import TestimonialsSection from '../components/TestimonialsSection';
const Home=()=>{
    return(
        <>
    <Hero/>
    <HighlightsSection/>
    <AboutPlatform/>
    <TestimonialsSection/>
    </>
    )
}
export default Home
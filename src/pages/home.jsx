import React from 'react';
import Hero from '../components/HeroSection'
import HighlightsSection from "../components/HighlightsSection"
import AboutPlatform from '../components/AboutPlatform'
import NewSettlersSignUp from "../components/NewSettlers"
import TestimonialsSection from '../components/TestimonialsSection';
const Home=()=>{
    return(
        <>
    <Hero></Hero>
    <HighlightsSection></HighlightsSection>
    <AboutPlatform></AboutPlatform>
    <TestimonialsSection></TestimonialsSection>
    </>
    )
}
export default Home
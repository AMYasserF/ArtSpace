import React from 'react';
import Hero from '../components/HeroSection'
import HighlightsSection from "../components/HighlightsSection"
import AboutPlatform from '../components/AboutPlatform'
import NewSettlersSignUp from "../components/NewSettlers"
const Home=()=>{
    return(
        <>
    <Hero></Hero>
    <HighlightsSection></HighlightsSection>
    <AboutPlatform></AboutPlatform>
    <NewSettlersSignUp></NewSettlersSignUp>
    </>
    )
}
export default Home
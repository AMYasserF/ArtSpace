import React from 'react';
import Hero from '../components/HeroSection'
import HighlightsSection from "../components/HighlightsSection"
import AboutPlatform from '../components/AboutPlatform'
import NewSettlersSignUp from "../components/NewSettlers"
import TestimonialsSection from '../components/TestimonialsSection';
import ClientHome from './Clienthome';
const Home=(props)=>{
    console.log(props.Logged)
    return(
        props.Logged==='false'||props.Logged==null?
        <>
    <Hero/>
    <HighlightsSection/>
    <AboutPlatform/>
    <TestimonialsSection/>
    </>:<ClientHome name={props.name}/>
    )
}
export default Home
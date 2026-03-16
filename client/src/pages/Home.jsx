import React, { useEffect } from 'react'
import Banner from '../components/home/Banner'
import Hero from '../components/home/Hero'
import Features from '../components/home/Features'
import Testimonial from '../components/home/Testimonial'
import CallToAction from '../components/home/CallToAction'
import Footer from '../components/home/Footer'

const Home = () => {
  
  // Nexo branding ke liye tab title update karna
  useEffect(() => {
    document.title = "Nexo AI | Build Your Professional Resume in Minutes";
  }, []);

  return (
    <div className='min-h-screen bg-white selection:bg-green-100 selection:text-green-900'>
      <Banner />
      
      {/* Semantic HTML: SEO aur screen readers ke liye behtar hai */}
      <main>
        <Hero />
        <Features />
        <Testimonial />
        <CallToAction />
      </main>

      <Footer />
    </div>
  )
}

export default Home
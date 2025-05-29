import React from 'react';

import AvantagesRuraux from './components/avantage';
import TestimonialCarousel from './components/carroussel';
import CommentSection from './components/comment-section';
import FAQSection from './components/faq-section';
import Footer from './components/footer';
import HeroSection from './components/hero-section';
import Menu from './components/menu';
import PromoSection from './components/promo';
import StatsSection from './components/stat-section';
import TeamSection from './components/team-section';

export default function Home() {
  return (
    <div className="bg-[#f6e8e8]">
      <Menu />
      <HeroSection />
      <StatsSection />
      <PromoSection />
      <FAQSection />
      <AvantagesRuraux />
      <TestimonialCarousel />
      <TeamSection />
      <CommentSection />
      <Footer />
    </div>
  );
}

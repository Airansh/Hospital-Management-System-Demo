// VIEW LAYER: public landing page, composed from content data and reusable cards.

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './MedcareApp.css';
import {
  images, NAV_SECTIONS, HOME_TEXT, STATS, SERVICES, ABOUT_PARAGRAPHS,
  DOCTORS, REVIEWS, FOOTER_SERVICES, CONTACTS, SOCIALS,
} from './content';
import { StatCard, ServiceCard, DoctorCard, ReviewCard, FooterLink } from './components/Cards';
import BookingForm from './components/BookingForm';

const authLinkStyle = { border: '1px solid #000', padding: '5px' };

const Heading = ({ first, accent }) => (
  <h1 className="heading"> {first} <span>{accent}</span> </h1>
);

const MedcareApp = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <div>
      {/* Header Section */}
      <header className="header">
        <section className="flex">
          <a href="#home" className="logo"> <i className="fas fa-heartbeat" aria-hidden="true"></i> medcare. </a>
          <nav className={`navbar ${isMenuOpen ? 'active' : ''}`}>
            {NAV_SECTIONS.map((id) => (
              <a key={id} href={`#${id}`} onClick={closeMenu}>{id === 'review' ? 'reviews' : id}</a>
            ))}
            <Link style={authLinkStyle} to="/login">Login</Link>
            <Link style={authLinkStyle} to="/signup">Sign Up</Link>
          </nav>
          <button
            type="button"
            id="menu-btn"
            className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}
            aria-label="Toggle navigation"
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((open) => !open)}
          ></button>
        </section>
      </header>

      {/* Home Section */}
      <div className="even-container">
        <section className="home" id="home">
          <div className="image">
            <img src={images.homeImage} alt="Healing Begins Here" />
          </div>
          <div className="content">
            <h3>Healing Begins Here</h3>
            <p>{HOME_TEXT}</p>
          </div>
        </section>
      </div>

      {/* Icons Section */}
      <section className="icons-container">
        {STATS.map((stat) => <StatCard key={stat.label} {...stat} />)}
      </section>

      {/* Services Section */}
      <div className="even-container">
        <section className="services" id="services">
          <Heading first="our" accent="services" />
          <div className="box-container">
            {SERVICES.map((service) => <ServiceCard key={service.title} {...service} />)}
          </div>
        </section>
      </div>

      {/* About Section */}
      <section className="about" id="about">
        <div className="row">
          <div className="image">
            <img src={images.aboutImage} alt="About Medcare" loading="lazy" />
          </div>
          <div className="content">
            <h3>we take care of your healthy life</h3>
            {ABOUT_PARAGRAPHS.map((text) => <p key={text.slice(0, 24)}>{text}</p>)}
          </div>
        </div>
      </section>

      {/* Doctors Section */}
      <div className="even-container">
        <section className="doctors" id="doctors">
          <Heading first="our" accent="doctors" />
          <div className="box-container">
            {DOCTORS.map((doctor) => <DoctorCard key={doctor.name} {...doctor} />)}
          </div>
        </section>
      </div>

      {/* Booking Section */}
      <section className="book" id="book">
        <div className="row">
          <div className="image">
            <img src={images.bookImage} alt="Book an Appointment" loading="lazy" />
          </div>
          <BookingForm />
        </div>
      </section>

      {/* Review Section */}
      <div className="even-container">
        <section className="review" id="review">
          <Heading first="client's" accent="review" />
          <div className="box-container">
            {REVIEWS.map((review) => <ReviewCard key={review.name} {...review} />)}
          </div>
        </section>
      </div>

      {/* Footer Section */}
      <div className="even-container">
        <section className="footer">
          <div className="box-container">
            <div className="box">
              <h3>quick links</h3>
              {NAV_SECTIONS.map((id) => <FooterLink key={id} href={`#${id}`}>{id}</FooterLink>)}
            </div>
            <div className="box">
              <h3>our services</h3>
              {FOOTER_SERVICES.map((name) => <FooterLink key={name} href="#services">{name}</FooterLink>)}
            </div>
            <div className="box">
              <h3>contact info</h3>
              {CONTACTS.map(({ icon, label, href }) => (
                <FooterLink key={label} href={href} icon={icon}>{label}</FooterLink>
              ))}
            </div>
            <div className="box">
              <h3>follow us</h3>
              {SOCIALS.map(({ icon, label, href }) => (
                <FooterLink key={label} href={href} icon={icon} iconSet="fab" external>{label}</FooterLink>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default MedcareApp;

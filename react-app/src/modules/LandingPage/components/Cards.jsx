// CONTENT LAYER: reusable presentational cards for the landing page.

import { SOCIALS } from '../content';

export const StatCard = ({ icon, value, label }) => (
  <div className="icons">
    <i className={`fas ${icon}`} aria-hidden="true"></i>
    <h3>{value}</h3>
    <p>{label}</p>
  </div>
);

export const ServiceCard = ({ icon, title, text }) => (
  <div className="box">
    <i className={`fas ${icon}`} aria-hidden="true"></i>
    <h3>{title}</h3>
    <p>{text}</p>
  </div>
);

export const DoctorCard = ({ image, name, specialty }) => (
  <div className="box">
    <img src={image} alt={name} loading="lazy" />
    <h3>{name}</h3>
    <span>{specialty}</span>
    <div className="share">
      {SOCIALS.slice(0, 4).map(({ icon, label, href }) => (
        <a key={label} href={href} className={`fab ${icon}`} aria-label={`${name} on ${label}`} target="_blank" rel="noreferrer"> </a>
      ))}
    </div>
  </div>
);

export const StarRating = ({ rating }) => {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  return (
    <div className="stars" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: full }, (_, i) => <i key={i} className="fas fa-star" aria-hidden="true"></i>)}
      {half && <i className="fas fa-star-half-alt" aria-hidden="true"></i>}
    </div>
  );
};

export const ReviewCard = ({ image, name, rating, text }) => (
  <div className="box">
    <img src={image} alt={`Client ${name}`} loading="lazy" />
    <h3>{name}</h3>
    <StarRating rating={rating} />
    <p className="text">{text}</p>
  </div>
);

export const FooterLink = ({ href, icon = 'fa-chevron-right', iconSet = 'fas', children, external }) => (
  <a href={href} {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}>
    <i className={`${iconSet} ${icon}`} aria-hidden="true"></i> {children}
  </a>
);

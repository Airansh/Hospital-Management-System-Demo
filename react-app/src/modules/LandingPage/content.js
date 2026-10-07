// CONTENT LAYER: everything the landing page displays, kept separate from markup.
// PERSISTENCE LAYER: images are stored locally and bundled at build time.

import homeImage from './Assets/OIG1.jpg';
import aboutImage from './Assets/OIG2.jpg';
import bookImage from './Assets/OIG3.jpg';
import doc1 from './Assets/doc-1.jpg';
import doc2 from './Assets/doc-2.jpg';
import doc3 from './Assets/doc-3.jpg';
import doc4 from './Assets/doc-4.jpg';
import doc5 from './Assets/doc-5.jpg';
import doc6 from './Assets/doc-6.jpg';
import pic1 from './Assets/pic-1.png';
import pic2 from './Assets/pic-2.png';
import pic3 from './Assets/pic-3.png';

export const images = { homeImage, aboutImage, bookImage };

export const NAV_SECTIONS = ['home', 'services', 'about', 'doctors', 'book', 'review'];

export const HOME_TEXT = "At Medcare, we believe in the power of healing through compassion and expertise. With a commitment to excellence in every aspect of care, we're dedicated to guiding you on your journey to wellness, ensuring every patient receives the personalized attention and treatment they deserve.";

export const STATS = [
  { icon: 'fa-user-md', value: '140+', label: 'doctors at work' },
  { icon: 'fa-users', value: '1040+', label: 'satisfied patients' },
  { icon: 'fa-procedures', value: '500+', label: 'bed facility' },
  { icon: 'fa-hospital', value: '10+', label: 'available hospitals' },
];

export const SERVICES = [
  { icon: 'fa-notes-medical', title: "free checkups", text: "Take advantage of our complimentary checkups, where our skilled healthcare professionals offer thorough examinations at absolutely no cost. From preventive screenings to personalized health assessments, we prioritize your well-being with comprehensive care tailored to your needs, ensuring you stay on track with your health goals without any financial burden." },
  { icon: 'fa-ambulance', title: "24/7 ambulance", text: "Our 24/7 ambulance service stands ready day and night to provide swift and reliable emergency medical transportation. Staffed by highly trained paramedics equipped with state-of-the-art equipment, we ensure prompt response times and expert care whenever emergencies arise, offering peace of mind to our community around the clock." },
  { icon: 'fa-user-md', title: "expert doctors", text: "Expert doctors at our practice bring years of specialized training and hands-on experience to ensure top-notch care for every patient. With a deep understanding of the latest medical advancements and a commitment to compassionate care, our doctors provide personalized treatment plans tailored to each individual's needs, fostering trust and confidence in their expertise." },
  { icon: 'fa-pills', title: "24/7 Pharmacy", text: "Experience the convenience and peace of mind with our 24/7 pharmacy service. Whether it's the middle of the night or a holiday, our pharmacy is always open to provide you with essential medications and expert advice whenever you need it. With a dedicated team of pharmacists ensuring accuracy and safety, you can rely on us for prompt and reliable access to your prescription medications around the clock." },
  { icon: 'fa-procedures', title: "bed facility", text: "Discover comfort and care in our hospital's bed facilities. Our modern and spacious rooms are designed to provide a soothing environment for recovery, equipped with state-of-the-art amenities to ensure your comfort and well-being. From adjustable beds to attentive nursing staff, we prioritize your comfort and recovery journey, offering a supportive environment for healing and recuperation." },
  { icon: 'fa-heartbeat', title: "total care", text: "Experience care like never before with our Total Care approach at the hospital. From admission to discharge, our dedicated team of healthcare professionals is committed to providing you with personalized attention and expert medical treatment every step. With state-of-the-art facilities and advanced technology, we ensure that your health needs are met comprehensively, promoting healing through your journey." },
];

export const ABOUT_PARAGRAPHS = [
  "At Medcare, we are committed to providing exceptional healthcare services to our community. With a focus on patient-centered care, our dedicated team of medical professionals strives to deliver compassionate treatment tailored to the individual needs of each patient. Equipped with state-of-the-art facilities and the latest medical technologies, we offer a comprehensive range of services, from preventive care to specialized treatments.",
  "Our hospital is more than just a medical facility; it's a place of healing, where patients and their families feel supported and cared for every step of the way. Whether you're here for a routine check-up, a surgical procedure, or ongoing treatment, we prioritize your comfort, safety, and well-being above all else.",
  "With a legacy of excellence spanning 25 years, we continue to uphold the highest standards of quality and integrity in everything we do. We are honored to serve our community and remain dedicated to being your trusted healthcare partner for generations to come.",
];

export const DOCTORS = [
  { image: doc1, name: "Dr.Elizabeth Levine", specialty: "Anesthesiologist" },
  { image: doc2, name: "Dr.Stephen Hart", specialty: "Cardiologist" },
  { image: doc3, name: "Dr.Joseph Thatcher", specialty: "Critical Care Medicine Specialist" },
  { image: doc4, name: "Dr.John Deo", specialty: "Dermatologist" },
  { image: doc5, name: "Dr. Richard Bardot", specialty: "Endocrinologist" },
  { image: doc6, name: "Dr.William Hansley", specialty: "Family Physician" },
];

export const REVIEWS = [
  { image: pic1, name: "james", rating: 4.5, text: "Took my 8-year-old daughter for a UTI. The staff was phenomenal and better with kids than most places just for kids. Wish I got their names but the lady at check-in and the nurse or MA who took her vitals you ladies deserve a raise and recognition for your excellent attitudes and service. Much obliged." },
  { image: pic2, name: "Emma", rating: 4.5, text: "I was treated with respect and the staff had a professional attitude. I would recommend Medcare to anyone who is looking for an Urgent Care and already have. Everyone was great!" },
  { image: pic3, name: "Robert", rating: 4.5, text: "I only had to wait less than 5 minutes. The nurses worked quickly and were polite. Dr. Huskey ran the necessary tests and the examination revealed both a sinus and an ear infection. She explained my illness and the course of action. I was extremely pleased with my visit to the Medcare Urgent Care." },
];

export const FOOTER_SERVICES = ['dental care', 'massage therapy', 'cardiology', 'diagnosis', 'ambulance service'];

export const CONTACTS = [
  { icon: 'fa-phone', label: '+1 319-936-5488', href: 'tel:+13199365488' },
  { icon: 'fa-phone', label: '+1 319-936-5142', href: 'tel:+13199365142' },
  { icon: 'fa-envelope', label: 'saisandeep@gmail.com', href: 'mailto:saisandeep@gmail.com' },
  { icon: 'fa-envelope', label: 'medcarehospitals@gmail.com', href: 'mailto:medcarehospitals@gmail.com' },
  { icon: 'fa-map-marker-alt', label: 'Iowa city,Iowa-52240', href: 'https://maps.google.com/?q=Iowa+City,+IA+52240' },
];

export const SOCIALS = [
  { icon: 'fa-facebook-f', label: 'facebook', href: 'https://facebook.com' },
  { icon: 'fa-twitter', label: 'twitter', href: 'https://twitter.com' },
  { icon: 'fa-instagram', label: 'instagram', href: 'https://instagram.com' },
  { icon: 'fa-linkedin', label: 'linkedin', href: 'https://linkedin.com' },
  { icon: 'fa-pinterest', label: 'pinterest', href: 'https://pinterest.com' },
];

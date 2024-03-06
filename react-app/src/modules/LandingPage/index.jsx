// PERSISTENCE LAYER : importing locally stored images

import React, { useState } from 'react';
import './MedcareApp.css'; 
import OIG2 from './Assets/OIG2.jpg';
import OIG1 from './Assets/OIG1.jpg';
import doc1 from './Assets/doc-1.jpg';
import doc2 from './Assets/doc-2.jpg';
import doc3 from './Assets/doc-3.jpg';
import doc4 from './Assets/doc-4.jpg';
import doc5 from './Assets/doc-5.jpg';
import doc6 from './Assets/doc-6.jpg';
import OIG3 from './Assets/OIG3.jpg';
import Pic1 from './Assets/pic-1.png';
import Pic2 from './Assets/pic-2.png';
import Pic3 from './Assets/pic-3.png';




const MedcareApp = () => {
    const [isActive, setIsActive] = useState(false);

    return (
        <div>
            {/* Header Section */}
            <header className="header">
                <section className="flex">
                    <a href="#" className="logo"> <i className="fas fa-heartbeat"></i> medcare. </a>
                    <nav className={`navbar ${isActive ? 'active' : ''}`}>
                        <a href="#home">home</a>
                        <a href="#services">services</a>
                        <a href="#about">about</a>
                        <a href="#doctors">doctors</a>
                        <a href="#book">book</a>
                        <a href="#review">reviews</a>
                        <a style={{border: '1px solid #000', padding: '5px'}} href='login'>Login</a>
                        <a style={{border: '1px solid #000', padding: '5px'}} href='signup'>Sign Up</a>
                    </nav>
                    <div id="menu-btn" className={`fas fa-bars ${isActive ? 'fa-times' : ''}`} onClick={() => setIsActive(!isActive)}></div>
                </section>
            </header>

            {/* Home Section */}
            <div className="even-container">
                <section className="home" id="home">
                    <div className="image">
                        <img src={OIG1} alt="Healing Begins Here" />
                    </div>
                    <div className="content">
                        <h3>Healing Begins Here</h3>
                        <p>At Medcare, we believe in the power of healing through compassion and expertise. With a commitment to excellence in every aspect of care, we're dedicated to guiding you on your journey to wellness, ensuring every patient receives the personalized attention and treatment they deserve.</p>
                    </div>
                </section>
            </div>

            {/* Icons Section */}
            <section className="icons-container">
                <div className="icons">
                    <i className="fas fa-user-md"></i>
                    <h3>140+</h3>
                    <p>doctors at work</p>
                </div>
                <div className="icons">
                    <i className="fas fa-users"></i>
                    <h3>1040+</h3>
                    <p>satisfied patients</p>
                </div>
                <div className="icons">
                    <i className="fas fa-procedures"></i>
                    <h3>500+</h3>
                    <p>bed facility</p>
                </div>
                <div className="icons">
                    <i className="fas fa-hospital"></i>
                    <h3>10+</h3>
                    <p>available hospitals</p>
                </div>
            </section>

            {/* Services Section */}
            <div className="even-container">
                <section className="services" id="services">
                    <h1 className="heading"> our <span>services</span> </h1>
                    <div className="box-container">
                        <div className="box">
                            <i className="fas fa-notes-medical"></i>
                            <h3>free checkups</h3>
                            <p>Take advantage of our complimentary checkups, where our skilled healthcare professionals offer thorough examinations at absolutely no cost. From preventive screenings to personalized health assessments, we prioritize your well-being with comprehensive care tailored to your needs, ensuring you stay on track with your health goals without any financial burden.</p>
                        </div>
                        <div className="box">
                            <i className="fas fa-ambulance"></i>
                            <h3>24/7 ambulance</h3>
                            <p>Our 24/7 ambulance service stands ready day and night to provide swift and reliable emergency medical transportation. Staffed by highly trained paramedics equipped with state-of-the-art equipment, we ensure prompt response times and expert care whenever emergencies arise, offering peace of mind to our community around the clock.</p>
                        </div>
                        <div className="box">
                            <i className="fas fa-user-md"></i>
                            <h3>expert doctors</h3>
                            <p>Expert doctors at our practice bring years of specialized training and hands-on experience to ensure top-notch care for every patient. With a deep understanding of the latest medical advancements and a commitment to compassionate care, our doctors provide personalized treatment plans tailored to each individual's needs, fostering trust and confidence in their expertise.</p>
                        </div>
                        <div className="box">
                            <i className="fas fa-pills"></i>
                            <h3>24/7 Pharmacy</h3>
                            <p>Experience the convenience and peace of mind with our 24/7 pharmacy service. Whether it's the middle of the night or a holiday, our pharmacy is always open to provide you with essential medications and expert advice whenever you need it. With a dedicated team of pharmacists ensuring accuracy and safety, you can rely on us for prompt and reliable access to your prescription medications around the clock.</p>
                        </div>
                        <div className="box">
                            <i className="fas fa-procedures"></i>
                            <h3>bed facility</h3>
                            <p>Discover comfort and care in our hospital's bed facilities. Our modern and spacious rooms are designed to provide a soothing environment for recovery, equipped with state-of-the-art amenities to ensure your comfort and well-being. From adjustable beds to attentive nursing staff, we prioritize your comfort and recovery journey, offering a supportive environment for healing and recuperation.</p>
                        </div>
                        <div className="box">
                            <i className="fas fa-heartbeat"></i>
                            <h3>total care</h3>
                            <p>Experience care like never before with our Total Care approach at the hospital. From admission to discharge, our dedicated team of healthcare professionals is committed to providing you with personalized attention and expert medical treatment every step. With state-of-the-art facilities and advanced technology, we ensure that your health needs are met comprehensively, promoting healing through your journey.</p>
                        </div>
                    </div>
                </section>
            </div>

            {/* About Section */}
            <section className="about" id="about">
                <div className="row">
                    <div className="image">
                        <img src={OIG2} alt="About Medcare" />
                    </div>
                    <div className="content">
                        <h3>we take care of your healthy life</h3>
                        <p>At Medcare, we are committed to providing exceptional healthcare services to our community. With a focus on patient-centered care, our dedicated team of medical professionals strives to deliver compassionate treatment tailored to the individual needs of each patient. Equipped with state-of-the-art facilities and the latest medical technologies, we offer a comprehensive range of services, from preventive care to specialized treatments.</p>
                        <p>Our hospital is more than just a medical facility; it's a place of healing, where patients and their families feel supported and cared for every step of the way. Whether you're here for a routine check-up, a surgical procedure, or ongoing treatment, we prioritize your comfort, safety, and well-being above all else.</p>
                        <p>With a legacy of excellence spanning 25 years, we continue to uphold the highest standards of quality and integrity in everything we do. We are honored to serve our community and remain dedicated to being your trusted healthcare partner for generations to come.</p>
                    </div>
                </div>
            </section>

            {/* Doctors Section */}
            <div className="even-container">
                <section className="doctors" id="doctors">
                    <h1 className="heading"> our <span>doctors</span> </h1>
                    <div className="box-container">
                        <div className="box">
                            <img src={doc1} alt="Dr.Elizabeth Levine" />
                            <h3>Dr.Elizabeth Levine</h3>
                            <span>Anesthesiologist</span>
                            <div className="share">
                                <a href="#" className="fab fa-facebook-f"></a>
                                <a href="#" className="fab fa-twitter"></a>
                                <a href="#" className="fab fa-instagram"></a>
                                <a href="#" className="fab fa-linkedin"></a>
                            </div>
                        </div>
                        <div className="box">
                            <img src={doc2} alt="Dr.Stephen Hart" />
                            <h3>Dr.Stephen Hart</h3>
                            <span>Cardiologist</span>
                            <div className="share">
                                <a href="#" className="fab fa-facebook-f"></a>
                                <a href="#" className="fab fa-twitter"></a>
                                <a href="#" className="fab fa-instagram"></a>
                                <a href="#" className="fab fa-linkedin"></a>
                            </div>
                        </div>
                        <div className="box">
                            <img src={doc3} alt="Dr.Joseph Thatcher" />
                            <h3>Dr.Joseph Thatcher</h3>
                            <span>Critical Care Medicine Specialist</span>
                            <div className="share">
                                <a href="#" className="fab fa-facebook-f"></a>
                                <a href="#" className="fab fa-twitter"></a>
                                <a href="#" className="fab fa-instagram"></a>
                                <a href="#" className="fab fa-linkedin"></a>
                            </div>
                        </div>
                        <div className="box">
                            <img src={doc4} alt="Dr.John Deo" />
                            <h3>Dr.John Deo</h3>
                            <span>Dermatologist</span>
                            <div className="share">
                                <a href="#" className="fab fa-facebook-f"></a>
                                <a href="#" className="fab fa-twitter"></a>
                                <a href="#" className="fab fa-instagram"></a>
                                <a href="#" className="fab fa-linkedin"></a>
                            </div>
                        </div>
                        <div className="box">
                            <img src={doc5} alt="Dr. Richard Bardot" />
                            <h3>Dr. Richard Bardot</h3>
                            <span>Endocrinologist</span>
                            <div className="share">
                                <a href="#" className="fab fa-facebook-f"></a>
                                <a href="#" className="fab fa-twitter"></a>
                                <a href="#" className="fab fa-instagram"></a>
                                <a href="#" className="fab fa-linkedin"></a>
                            </div>
                        </div>
                        <div className="box">
                            <img src={doc6} alt="Dr.William Hansley" />
                            <h3>Dr.William Hansley</h3>
                            <span>Family Physician</span>
                            <div className="share">
                                <a href="#" className="fab fa-facebook-f"></a>
                                <a href="#" className="fab fa-twitter"></a>
                                <a href="#" className="fab fa-instagram"></a>
                                <a href="#" className="fab fa-linkedin"></a>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            {/* Booking Section */}
            <section className="book" id="book">
                <div className="row">
                    <div className="image">
                        <img src={OIG3} alt="Book an Appointment" />
                    </div>
                    <form action="">
                        <h3>book appointment</h3>
                        <input type="text" placeholder="your name" className="box" />
                        <input type="number" placeholder="your number" className="box" />
                        <input type="email" placeholder="your email" className="box" />
                        <input type="date" className="box" />
                        <input type="submit" value="book now" className="btn" />
                    </form>
                </div>
            </section>

            {/* Review Section */}
            <div className="even-container">
                <section className="review" id="review">
                    <h1 className="heading"> client's <span>review</span> </h1>
                    <div className="box-container">
                        <div className="box">
                            <img src={Pic1} alt="Client James" />
                            <h3>james</h3>
                            <div className="stars">
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star-half-alt"></i>
                            </div>
                            <p className="text">Took my 8-year-old daughter for a UTI. The staff was phenomenal and better with kids than most places just for kids. Wish I got their names but the lady at check-in and the nurse or MA who took her vitals you ladies deserve a raise and recognition for your excellent attitudes and service. Much obliged.</p>
                        </div>
                        <div className="box">
                            <img src={Pic2} alt="Client Emma" />
                            <h3>Emma</h3>
                            <div className="stars">
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star-half-alt"></i>
                            </div>
                            <p className="text">I was treated with respect and the staff had a professional attitude. I would recommend Medcare to anyone who is looking for an Urgent Care and already have. Everyone was great!</p>
                        </div>
                        <div className="box">
                            <img src={Pic3} alt="Client Robert" />
                            <h3>Robert</h3>
                            <div className="stars">
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star-half-alt"></i>
                            </div>
                            <p className="text">I only had to wait less than 5 minutes. The nurses worked quickly and were polite. Dr. Huskey ran the necessary tests and the examination revealed both a sinus and an ear infection. She explained my illness and the course of action. I was extremely pleased with my visit to the Medcare Urgent Care.</p>
                        </div>
                    </div>
                </section>
            </div>

            {/* Footer Section */}
            <div className="even-container">
                <section className="footer">
                    <div className="box-container">
                        <div className="box">
                            <h3>quick links</h3>
                            <a href="#"> <i className="fas fa-chevron-right"></i> home </a>
                            <a href="#"> <i className="fas fa-chevron-right"></i> services </a>
                            <a href="#"> <i className="fas fa-chevron-right"></i> about </a>
                            <a href="#"> <i className="fas fa-chevron-right"></i> doctors </a>
                            <a href="#"> <i className="fas fa-chevron-right"></i> book </a>
                            <a href="#"> <i className="fas fa-chevron-right"></i> review </a>
                        </div>
                        <div className="box">
                            <h3>our services</h3>
                            <a href="#"> <i className="fas fa-chevron-right"></i> dental care </a>
                            <a href="#"> <i className="fas fa-chevron-right"></i> massage therapy </a>
                            <a href="#"> <i className="fas fa-chevron-right"></i> cardiology </a>
                            <a href="#"> <i className="fas fa-chevron-right"></i> diagnosis </a>
                            <a href="#"> <i className="fas fa-chevron-right"></i> ambulance service </a>
                        </div>
                        <div className="box">
                            <h3>contact info</h3>
                            <a href="#"> <i className="fas fa-phone"></i>+1 319-936-5488 </a>
                            <a href="#"> <i className="fas fa-phone"></i>+1 319-936-5142</a>
                            <a href="#"> <i className="fas fa-envelope"></i>saisandeep@gmail.com </a>
                            <a href="#"> <i className="fas fa-envelope"></i> medcarehospitals@gmail.com </a>
                            <a href="#"> <i className="fas fa-map-marker-alt"></i>Iowa city,Iowa-52240</a>
                        </div>
                        <div className="box">
                            <h3>follow us</h3>
                            <a href="#"> <i className="fab fa-facebook-f"></i> facebook </a>
                            <a href="#"> <i className="fab fa-twitter"></i> twitter </a>
                            <a href="#"> <i className="fab fa-instagram"></i> instagram </a>
                            <a href="#"> <i className="fab fa-linkedin"></i> linkedin </a>
                            <a href="#"> <i className="fab fa-pinterest"></i> pinterest </a>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default MedcareApp;
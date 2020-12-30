import React from 'react';
import { withRouter } from "react-router-dom";

import avatar from "../../assets/images/avatar-img.jpg";


function FreelancerDetail(props) {
    
    
    return(
      <React.Fragment>
        <div className="page-title-area">
          <div className="container">
            <div className="page-title-content">
              <h2>Candidates Details</h2>
              <ul>
                <li>
                  <a href="#">
                    Home 
                  </a>
                </li>
                <li className="active">Candidates Details</li>
              </ul>
            </div>
          </div>
        </div>

        <section className="candidates-details-area ptb-100">
          <div className="container">
            <div className="row">
              <div className="col-lg-8">
                <div className="candidates-cv">
                  <div className="row align-items-center">
                    <div className="col-lg-2">
                      <div className="hot-jobs-img">
                        <img src={avatar} alt="Image" />
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="candidates-cv-content">
                        <h3>Sajal Joshi</h3>
                        <span className="sub-title">UX/UI Designer</span>
                        <ul>
                          <li><span>Location: </span>New York</li>
                        </ul>
                      </div>
                    </div>

                    <div className="col-lg-4">
                      <a href="#" className="default-btn">Download CV</a>
                    </div>
                  </div>
                </div>

                <div className="candidates-details-content">
                  <h3>About Me</h3>
                  <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Lorem ipsum dolor sit amet, consetetur</p>

                  <h3>Education</h3>
                  
                  <ul>
                    <li className="arts">Masters in Fine Arts</li>
                    <li className="university">Walters University (2015-2016)</li>
                    <li className="summary">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.</li>
                  </ul>

                  <ul>
                    <li className="arts">Bachlors in Fine Arts</li>
                    <li className="university">University of California (2010-2014)</li>
                    <li className="summary">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.</li>
                  </ul>

                  <ul>
                    <li className="arts">Diploma in Fine Arts</li>
                    <li className="university">Berkeley Institute of Art Direction (2006-2010)</li>
                    <li className="summary">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.</li>
                  </ul>

                  <h3>Work Experience</h3>
                  
                  <ul>
                    <li className="arts">Sr. UX/UI Designer</li>
                    <li className="university">Xpart Solutions (2018-2020)</li>
                    <li className="summary">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.</li>
                  </ul>

                  <ul>
                    <li className="arts">Product Designer</li>
                    <li className="university">Design house (2016-2017)</li>
                    <li className="summary">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.</li>
                  </ul>

                  <h4>Personal Skills</h4>

                  <div className="all-skill-bar">
                    <div className="skill-bar" data-percentage="100%">
                      <h4 className="progress-title-holder">
                        <span className="progress-title">Photoshop</span>
                        <span className="progress-number-wrapper">
                          <span className="progress-number-mark" >
                            <span className="percent">100%</span>
                            <span className="down-arrow"></span>
                          </span>
                        </span>
                      </h4>
        
                      <div className="progress-content-outter">
                        <div className="progress-content" ></div>
                      </div>
                    </div>
        
                    <div className="skill-bar" data-percentage="90%">
                      <h4 className="progress-title-holder clearfix">
                        <span className="progress-title">After Effects</span>
                        <span className="progress-number-wrapper">
                          <span className="progress-number-mark" >
                            <span className="percent">90%</span>
                            <span className="down-arrow"></span>
                          </span>
                        </span>
                      </h4>
        
                      <div className="progress-content-outter">
                        <div className="progress-content" ></div>
                      </div>
                    </div>
        
                    <div className="skill-bar" data-percentage="85%">
                      <h4 className="progress-title-holder clearfix">
                        <span className="progress-title">Indesign</span>
                        <span className="progress-number-wrapper">
                          <span className="progress-number-mark" >
                            <span className="percent">85%</span>
                            <span className="down-arrow"></span>
                          </span>
                        </span>
                      </h4>
        
                      <div className="progress-content-outter">
                        <div className="progress-content" ></div>
                      </div>
                    </div> 
        
                    <div className="skill-bar mb-0" data-percentage="60%">
                      <h4 className="progress-title-holder clearfix">
                        <span className="progress-title">HTML &amp; CSS</span>
                        <span className="progress-number-wrapper">
                          <span className="progress-number-mark" >
                            <span className="percent">60%</span>
                            <span className="down-arrow"></span>
                          </span>
                        </span>
                      </h4>
        
                      <div className="progress-content-outter">
                        <div className="progress-content" ></div>
                      </div>
                    </div> 
                  </div> 
                </div>
              </div>

              <div className="col-lg-4">
                <div className="candidates-details-sidebar">
                  <div className="candidates-widget">
                    <h3>Share This Job</h3>

                    <ul className="social-icon">
                      <li>
                        <a href="#">
                          <i className="bx bxl-facebook"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="bx bxl-instagram"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="bx bxl-linkedin-square"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="bx bxl-twitter"></i>
                        </a>
                      </li>
                    </ul>
                  </div>

                  <div className="candidates-widget">
                    <h3>Contact Information</h3>
                    
                    <ul className="overview">
                      
                      <li>
                        Email
                        <a href="mailto:#"><span>: sajal@email.com</span></a>
                      </li>
                      <li>
                        Phone
                        <a href="tel:+91-(000)-0000-000"><span>: 987654321</span></a>
                      </li>
                      <li>
                        Location
                        <span>: Alaska</span>
                      </li>
                    </ul>
                  </div>

                  <div className="candidates-widget">
                    <h3>Job Overview</h3>
                    
                    <ul className="overview">
                      <li>
                        Categories
                        <span>: Design</span>
                      </li>
                      <li>
                        Vacancy
                        <span>: 01</span>
                      </li>
                      <li>
                        Job Type
                        <span>: Full Time</span>
                      </li>
                      <li>
                        Experience
                        <span>: 3 year(s)</span>
                      </li>
                      <li>
                        Offered Salary
                        <span>: $700</span>
                      </li>
                      <li>
                        Languages:
                        <span>: English</span>
                      </li>
                      <li>
                        Gender
                        <span>: Both</span>
                      </li>
                      <li>
                        Application Deu
                        <span>: 11.10.2020</span>
                      </li>
                    </ul>
                  </div>

                  <div className="candidates-widget">
                    <h3>Download Resume</h3>
                    
                    <ul className="overview download ">
                      
                      <li>
                        <i className="flaticon-pdf"></i>
                        <a href="#">PDF Formate CV</a>
                      </li>
                      <li>
                        <i className="flaticon-pdf"></i>
                        <a href="#">DOC Formate CV</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>


        <section className="subscribe-area subscribe-area-about-page">
          <div className="container">
            <div className="subscribe-bg">
              <div className="row align-items-center">
                <div className="col-lg-6">
                  <div className="subscribe-content">
                    <h2>Find Your Next Great Job Opportunity!</h2>
                  </div>
                </div>
      
                <div className="col-lg-6">
                  <form className="newsletter-form" data-toggle="validator" novalidate="true">
                    <input type="email" className="form-control" placeholder="Enter email address" name="EMAIL" required="" autocomplete="off" />
      
                    <button className="default-btn disabled" type="submit">
                      <span>Subscribe</span>
                    </button>
      
                    <div id="validator-newsletter" className="form-result"></div>
                    <p>Join The Newsletter 10,000 Users Already!</p>
                  </form> 
                </div>
              </div>
            </div>
          </div>
        </section>

      </React.Fragment>
    )
}

export default withRouter(FreelancerDetail);
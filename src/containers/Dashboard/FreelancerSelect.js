import React from 'react';
import { withRouter } from "react-router-dom";

import freelancer1 from "../../assets/images/freelancer/freelancer-1.jpg";
import freelancer2 from "../../assets/images/freelancer/freelancer-2.jpg";
import freelancer3 from "../../assets/images/freelancer/freelancer-3.jpg";
import freelancer4 from "../../assets/images/freelancer/freelancer-4.jpg";
import freelancer5 from "../../assets/images/freelancer/freelancer-5.jpg";
import freelancer6 from "../../assets/images/freelancer/freelancer-6.jpg";
import freelancer7 from "../../assets/images/freelancer/freelancer-7.jpg";
import freelancer8 from "../../assets/images/freelancer/freelancer-8.jpg";
// import logo from "../../assets/images/logo.png";


function FreelancerSelect(props) {
    
    
    return(
        <section className="freelancer-area pt-100 pb-70">
          <div className="container">
            <div className="section-title">
              <span>Top Freelancer</span>
              <h2>Hire Expert Freelancer</h2>
            </div>

            <div className="row">
              <div className="col-lg-3 col-sm-6">
                <div className="single-freelancer">
                  <img src={freelancer1} alt="Image" />
                  <h3>James Hendrix</h3>
                  <span className="profession">iOS Developr</span>

                  <ul>
                    <li>
                      <i className="bx bxs-star"></i>
                    </li>
                    <li>
                      <i className="bx bxs-star"></i>
                    </li>
                    <li>
                      <i className="bx bxs-star"></i>
                    </li>
                    <li>
                      <i className="bx bxs-star"></i>
                    </li>
                    <li>
                      <i className="bx bxs-star"></i>
                    </li>
                  </ul>

                  <a href="#" className="default-btn">
                    Select
                  </a>

                  <span className="per-hour">$75/hr</span>
                </div>
              </div>

              <div className="col-lg-3 col-sm-6">
                <div className="single-freelancer">
                  <img src={freelancer2} alt="Image" />
                  <h3>Jean Burke</h3>
                  <span className="profession">iOS Developr</span>

                  <ul>
                    <li>
                      <i className="bx bxs-star"></i>
                    </li>
                    <li>
                      <i className="bx bxs-star"></i>
                    </li>
                    <li>
                      <i className="bx bxs-star"></i>
                    </li>
                    <li>
                      <i className="bx bxs-star"></i>
                    </li>
                    <li>
                      <i className="bx bxs-star"></i>
                    </li>
                  </ul>

                  <a href="#" className="default-btn">
                    Select
                  </a>

                  <span className="per-hour">$99/hr</span>
                </div>
              </div>

              <div className="col-lg-3 col-sm-6">
                <div className="single-freelancer">
                  <img src={freelancer3} alt="Image" />
                  <h3>David Guzman</h3>
                  <span className="profession">iOS Developr</span>

                  <ul>
                    <li>
                      <i className="bx bxs-star"></i>
                    </li>
                    <li>
                      <i className="bx bxs-star"></i>
                    </li>
                    <li>
                      <i className="bx bxs-star"></i>
                    </li>
                    <li>
                      <i className="bx bxs-star"></i>
                    </li>
                    <li>
                      <i className="bx bxs-star"></i>
                    </li>
                  </ul>

                  <a href="#" className="default-btn">
                    Select
                  </a>

                  <span className="per-hour">$50/hr</span>
                </div>
              </div>

              <div className="col-lg-3 col-sm-6">
                <div className="single-freelancer">
                  <img src={freelancer4} alt="Image" />
                  <h3>Clarence Hart</h3>
                  <span className="profession">iOS Developr</span>

                  <ul>
                    <li>
                      <i className="bx bxs-star"></i>
                    </li>
                    <li>
                      <i className="bx bxs-star"></i>
                    </li>
                    <li>
                      <i className="bx bxs-star"></i>
                    </li>
                    <li>
                      <i className="bx bxs-star"></i>
                    </li>
                    <li>
                      <i className="bx bxs-star"></i>
                    </li>
                  </ul>

                  <a href="#" className="default-btn">
                    Select
                  </a>

                  <span className="per-hour">$25/hr</span>
                </div>
              </div>

              <div className="col-lg-3 col-sm-6">
                <div className="single-freelancer">
                  <img src={freelancer5} alt="Image" />
                  <h3>Anna Smith</h3>
                  <span className="profession">iOS Developr</span>

                  <ul>
                    <li>
                      <i className="bx bxs-star"></i>
                    </li>
                    <li>
                      <i className="bx bxs-star"></i>
                    </li>
                    <li>
                      <i className="bx bxs-star"></i>
                    </li>
                    <li>
                      <i className="bx bxs-star"></i>
                    </li>
                    <li>
                      <i className="bx bxs-star"></i>
                    </li>
                  </ul>

                  <a href="#" className="default-btn">
                    Select
                  </a>

                  <span className="per-hour">$65/hr</span>
                </div>
              </div>

              <div className="col-lg-3 col-sm-6">
                <div className="single-freelancer">
                  <img src={freelancer6} alt="Image" />
                  <h3>Kulva Dew</h3>
                  <span className="profession">iOS Developr</span>

                  <ul>
                    <li>
                      <i className="bx bxs-star"></i>
                    </li>
                    <li>
                      <i className="bx bxs-star"></i>
                    </li>
                    <li>
                      <i className="bx bxs-star"></i>
                    </li>
                    <li>
                      <i className="bx bxs-star"></i>
                    </li>
                    <li>
                      <i className="bx bxs-star"></i>
                    </li>
                  </ul>

                  <a href="#" className="default-btn">
                    Select
                  </a>

                  <span className="per-hour">$75/hr</span>
                </div>
              </div>

              <div className="col-lg-3 col-sm-6">
                <div className="single-freelancer">
                  <img src={freelancer7} alt="Image" />
                  <h3>Zeck De</h3>
                  <span className="profession">iOS Developr</span>

                  <ul>
                    <li>
                      <i className="bx bxs-star"></i>
                    </li>
                    <li>
                      <i className="bx bxs-star"></i>
                    </li>
                    <li>
                      <i className="bx bxs-star"></i>
                    </li>
                    <li>
                      <i className="bx bxs-star"></i>
                    </li>
                    <li>
                      <i className="bx bxs-star"></i>
                    </li>
                  </ul>

                  <a href="#" className="default-btn">
                    Select
                  </a>

                  <span className="per-hour">$55/hr</span>
                </div>
              </div>

              <div className="col-lg-3 col-sm-6">
                <div className="single-freelancer">
                  <img src={freelancer8} alt="Image" />
                  <h3>Alex Neth</h3>
                  <span className="profession">iOS Developr</span>

                  <ul>
                    <li>
                      <i className="bx bxs-star"></i>
                    </li>
                    <li>
                      <i className="bx bxs-star"></i>
                    </li>
                    <li>
                      <i className="bx bxs-star"></i>
                    </li>
                    <li>
                      <i className="bx bxs-star"></i>
                    </li>
                    <li>
                      <i className="bx bxs-star"></i>
                    </li>
                  </ul>

                  <a href="#" className="default-btn">
                    Select
                  </a>

                  <span className="per-hour">$99/hr</span>
                </div>
              </div>
            </div>
            
            <div className="row">
              <div className="col-lg-12 col-md-12 text-center">
                  <a href="/client-signup">
                      <button type="submit" className="default-btn">
                          <span>Proceed</span>
                      </button>
                  </a>
                  <div id="msgSubmit" className="h3 text-center hidden"></div>
                  <div className="clearfix"></div>
              </div>
            </div>          
            
            
          </div>
        </section>
    )
}

export default withRouter(FreelancerSelect);
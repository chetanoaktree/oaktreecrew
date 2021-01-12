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

import Slider from "react-slick";




function FreelancerSelect(props) {
    
    
  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    autoplay:true,
    accessibility:true,
    arrows:true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: false,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          dots: true,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
        }
      }
    ]    





  };


    return(
        <section className="freelancer-area pt-100 pb-70">
          <div className="container">
            <div className="section-title">
              <span>Top Freelancer</span>
              <h2>Hire Expert Freelancer</h2>
            </div>


            <Slider {...settings}>
              <div className="">
                <div className="single-freelancer">
                  <img src={freelancer1} alt="Image" />
                  <h3>James Hendrix</h3>
                  <span className="profession">iOS Developr</span>
                  <a href="#" className="default-btn">
                    Select
                  </a>
                </div>
              </div>
              {/*  */}

              <div className="">
                <div className="single-freelancer">
                  <img src={freelancer2} alt="Image" />
                  <h3>Jean Burke</h3>
                  <span className="profession">iOS Developr</span>
                  <a href="#" className="default-btn">
                    Select
                  </a>
                </div>
              </div>
              {/*  */}

              <div className="">
                <div className="single-freelancer">
                  <img src={freelancer3} alt="Image" />
                  <h3>David Guzman</h3>
                  <span className="profession">iOS Developr</span>
                  <a href="#" className="default-btn">
                    Select
                  </a>
                </div>
              </div>
              {/*  */}

              <div className="">
                <div className="single-freelancer">
                  <img src={freelancer4} alt="Image" />
                  <h3>Clarence Hart</h3>
                  <span className="profession">iOS Developr</span>
                  <a href="#" className="default-btn">
                    Select
                  </a>
                </div>
              </div>
              {/*  */}

              <div className="">
                <div className="single-freelancer">
                  <img src={freelancer5} alt="Image" />
                  <h3>Anna Smith</h3>
                  <span className="profession">iOS Developr</span>
                  <a href="#" className="default-btn">
                    Select
                  </a>
                </div>
              </div>
              {/*  */}

              <div className="">
                <div className="single-freelancer">
                  <img src={freelancer6} alt="Image" />
                  <h3>Kulva Dew</h3>
                  <span className="profession">iOS Developr</span>
                  <a href="#" className="default-btn">
                    Select
                  </a>
                </div>
              </div>
            </Slider>
            
{/* 
            <div className="row">

            


              <div className="col-lg-3 col-sm-6">
                <div className="single-freelancer">
                  <img src={freelancer1} alt="Image" />
                  <h3>James Hendrix</h3>
                  <span className="profession">iOS Developr</span>
                  <a href="#" className="default-btn">
                    Select
                  </a>
                </div>
              </div>

              <div className="col-lg-3 col-sm-6">
                <div className="single-freelancer">
                  <img src={freelancer2} alt="Image" />
                  <h3>Jean Burke</h3>
                  <span className="profession">iOS Developr</span>
                  <a href="#" className="default-btn">
                    Select
                  </a>
                </div>
              </div>

              <div className="col-lg-3 col-sm-6">
                <div className="single-freelancer">
                  <img src={freelancer3} alt="Image" />
                  <h3>David Guzman</h3>
                  <span className="profession">iOS Developr</span>
                  <a href="#" className="default-btn">
                    Select
                  </a>
                </div>
              </div>

              <div className="col-lg-3 col-sm-6">
                <div className="single-freelancer">
                  <img src={freelancer4} alt="Image" />
                  <h3>Clarence Hart</h3>
                  <span className="profession">iOS Developr</span>
                  <a href="#" className="default-btn">
                    Select
                  </a>
                </div>
              </div>

              <div className="col-lg-3 col-sm-6">
                <div className="single-freelancer">
                  <img src={freelancer5} alt="Image" />
                  <h3>Anna Smith</h3>
                  <span className="profession">iOS Developr</span>
                  <a href="#" className="default-btn">
                    Select
                  </a>
                </div>
              </div>

              <div className="col-lg-3 col-sm-6">
                <div className="single-freelancer">
                  <img src={freelancer6} alt="Image" />
                  <h3>Kulva Dew</h3>
                  <span className="profession">iOS Developr</span>
                  <a href="#" className="default-btn">
                    Select
                  </a>
                </div>
              </div>

            </div>
              */}
            
            <div className="row mt-5">
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
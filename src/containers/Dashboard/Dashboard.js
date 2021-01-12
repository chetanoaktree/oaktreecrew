import React from 'react';
import { withRouter } from "react-router-dom";

import salesforce from "../../assets/images/categories/salesforce.svg";
import Ruby from "../../assets/images/categories/ruby.svg";
import ReactJS from "../../assets/images/categories/react.svg";
import IOS from "../../assets/images/categories/ios.svg";
import NodeJS from "../../assets/images/categories/nodejs.svg";


function Dashboard(props) {
    
    
    return(
        <section className="live-jobs-area bg-color ptb-100">
          <div className="container">
              <div className="row">
                  <div className="col-lg-12">
                      <div className="section-title">
                          <span>What are the profiles you are looking for?</span>
                          <h2>Browse Category</h2>
                      </div>

                      
                          <div className="row">
                              <div className="col-lg-1 col-sm-12">
                              
                              </div>
                              
                              <div className="col-lg-2 col-sm-6">
                                  <div className="single-live-job">
                                      <img src={salesforce} alt="salesforce" />
                                      <a href="#">
                                          Salesforce
                                      </a>
                                  </div>
                              </div>
                              
                              <div className="col-lg-2 col-sm-6">
                                  <div className="single-live-job">
                                      <img src={Ruby} alt="Ruby" />
                                      <a href="#">
                                          ROR
                                      </a>
                                  </div>
                              </div>

                              <div className="col-lg-2 col-sm-6">
                                  <div className="single-live-job">
                                      <img src={ReactJS} alt="ReactJS" />
                                      <a href="#">
                                          React
                                      </a>
                                  </div>
                              </div>

                              <div className="col-lg-2 col-sm-6">
                                  <div className="single-live-job">
                                      <img src={IOS} alt="IOS" />
                                      <a href="#">
                                          iOS
                                      </a>
                                  </div>
                              </div>

                              <div className="col-lg-2 col-sm-6">
                                  <div className="single-live-job">
                                      <img src={NodeJS} alt="NodeJS" />
                                      <a href="#">
                                          NodeJs
                                      </a>
                                  </div>
                              </div>

                              <div className="col-lg-1 col-sm-12">
                              
                              </div>
                          </div>
                          
                          <div className="row">
                              <div className="col-lg-12 col-md-12 text-center">
                                  <a href="/freelancers">
                                      <button type="submit" className="default-btn">
                                          <span>Proceed</span>
                                      </button>
                                  </a>
                                  <div id="msgSubmit" className="h3 text-center hidden"></div>
                                  <div className="clearfix"></div>
                              </div>
                          </div>    
                      
                  </div>
              </div>
          </div>
      </section>
    )
}

export default withRouter(Dashboard);
import React from 'react';
import { withRouter } from "react-router-dom";

import salesforce from "../../assets/images/salesforce.png";
import Ruby from "../../assets/images/Ruby.png";
import ReactJS from "../../assets/images/ReactJS.png";
import IOS from "../../assets/images/IOS.png";
import NodeJS from "../../assets/images/NodeJS.png";
// import logo from "../../assets/images/logo.png";


function HR(props) {
    
    
    return(
      <section className="candidates-resume-area ptb-100">
        <div className="container-fluid">
            <div className="row">
                <div className="col-lg-12">
                    <div>
                        <a href="/addfreelacner" className="btn btn-primary"> Add Freelancer</a>
                    </div>
                    <div className="candidates-resume-content">
                        <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                            <li className="nav-item">
                                <a className="nav-link active" id="pills-all-tab" data-toggle="pill" href="#pills-all" role="tab" aria-controls="pills-all" aria-selected="true">1200 All Freelancers</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" id="pills-profile-tab" data-toggle="pill" href="#pills-profile" role="tab" aria-controls="pills-profile" aria-selected="false"> 820 Draft</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" id="pills-contact-tab" data-toggle="pill" href="#pills-contact" role="tab" aria-controls="pills-contact" aria-selected="false">420 Scheduling</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" id="pills-contact-tab" data-toggle="pill" href="#pills-contact" role="tab" aria-controls="pills-contact" aria-selected="false">0 Interview</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" id="pills-contact-tab" data-toggle="pill" href="#pills-contact" role="tab" aria-controls="pills-contact" aria-selected="false">0 Assessment</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" id="pills-contact-tab" data-toggle="pill" href="#pills-contact" role="tab" aria-controls="pills-contact" aria-selected="false">0 References</a>
                            </li>     
                            <li className="nav-item">
                                <a className="nav-link" id="pills-contact-tab" data-toggle="pill" href="#pills-contact" role="tab" aria-controls="pills-contact" aria-selected="false">0 Decision</a>
                            </li>    
                            <li className="nav-item">
                                <a className="nav-link" id="pills-contact-tab" data-toggle="pill" href="#pills-contact" role="tab" aria-controls="pills-contact" aria-selected="false">0 Job offer & contract</a>
                            </li>                                                                                                             
                        </ul>
                        <div className="tab-content" id="pills-tabContent">
                            <div className="tab-pane fade show active" id="pills-all" role="tabpanel" aria-labelledby="pills-all-tab">
                                <table className="table table-striped">
                                    <thead>
                                      <tr>
                                        <th scope="col">APPLICATION #</th>
                                        <th scope="col">APPLICANT</th>
                                        <th scope="col">STATUS</th>
                                        <th scope="col">PROGRESS</th>
                                        <th scope="col">SCORE</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr>
                                        <th scope="row">1039</th>
                                        <td>Clark Davidson </td>
                                        <td>Draft</td>
                                        <td>20% Complete</td>
                                        <td><a href="/freelancer-detail">Pending</a></td>
                                      </tr>
                                      <tr>
                                        <th scope="row">1038</th>
                                        <td>Vanessa Thomas </td>
                                        <td>Draft</td>
                                        <td>30% Complete</td>
                                        <td><a href="/freelancer-detail">Pending</a></td>
                                      </tr>
                                      <tr>
                                        <th scope="row">1037</th>
                                        <td>Joe Birdland </td>
                                        <td>Draft</td>
                                        <td>20% Complete</td>
                                        <td><a href="/freelancer-detail">Pending</a></td>
                                      </tr>
                                      <tr>
                                        <th scope="row">1036</th>
                                        <td>Kiki Sidwali </td>
                                        <td>Draft</td>
                                        <td>50% Complete</td>
                                        <td><a href="/freelancer-detail">Pending</a></td>
                                      </tr>
                                      <tr>
                                        <th scope="row">1035</th>
                                        <td>Vanessa Thomas </td>
                                        <td>Draft</td>
                                        <td>20% Complete</td>
                                        <td><a href="/freelancer-detail">Pending</a></td>
                                      </tr>
                                      <tr>
                                        <th scope="row">1034</th>
                                        <td>Joe Birdland </td>
                                        <td>In Scheduling</td>
                                        <td>Interview Not Started</td>
                                        <td><a href="/freelancer-detail">Pending</a></td>
                                      </tr>                                                                                                                  
                                    </tbody>
                                  </table>



                            </div>
                            <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">...</div>
                            <div className="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">...</div>
                        </div> 


                        
                    </div>

                </div>
            </div>
        </div>
    </section>
    )
}

export default withRouter(HR);
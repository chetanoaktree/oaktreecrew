import React, { useState } from 'react';
import { withRouter, Link } from "react-router-dom";
import Select from "react-dropdown-select";
// import CATEGORY from "../../constants/category";
import SKILLS from "../../constants/skills";
import salesforce from "../../assets/images/categories/salesforce.svg";
import Ruby from "../../assets/images/categories/ruby.svg";
import ReactJS from "../../assets/images/categories/react.svg";
import IOS from "../../assets/images/categories/ios.svg";
import NodeJS from "../../assets/images/categories/nodejs.svg";


function Dashboard(props) {
    
    const [state , setState] = useState({
        skills: "",
        category: "",
        skillArg: SKILLS
    })

    const selectCategory = (value) => {
        if(state.category === value){
            setState(prevState => ({
                ...prevState,
                category : '',
                skillArg : SKILLS
            }))    
            return false
        }
        setState(prevState => ({
            ...prevState,
            category : value
        }))

        var filteredItems = SKILLS.filter(item => (
            item.filter === value
          ));
        // console.log("filteredItems",filteredItems)
        setState(prevState => ({
            ...prevState,
            skillArg : filteredItems
        }))
    }
    const handleSelect = (name, value) => {
      // console.log(name,"----",value)
      if(value.length === 0){
        return false
      } 
        setState(prevState => ({
            ...prevState,
            [name] :  value.map(e => e.value).join(",")
        }))
    }

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
                              {/*CATEGORY.map((row) => {
                                return(<div className="col-lg-2 col-sm-6">
                                          <div className={state.category === category ? "single-live-job active" : "single-live-job"}>
                                              <img src={row.image} alt="salesforce" />
                                              <a href="#">
                                                  {row.label}
                                              </a>
                                          </div>
                                      </div>)  
                              })*/}
                              <div className="col-lg-2 col-sm-6" onClick={() => selectCategory('Salesforce')}>
                                  <div className={state.category === 'Salesforce' ? "single-live-job active" : "single-live-job"}>
                                      <img src={salesforce} alt="salesforce" />
                                      <a href="#">
                                          Salesforce
                                      </a>
                                  </div>
                              </div>
                              
                              <div className="col-lg-2 col-sm-6" onClick={() => selectCategory('ROR')}>
                                  <div className={state.category === 'ROR' ? "single-live-job active" : "single-live-job"}>
                                      <img src={Ruby} alt="Ruby" />
                                      <a href="#">
                                          ROR
                                      </a>
                                  </div>
                              </div>

                              <div className="col-lg-2 col-sm-6" onClick={() => selectCategory('React')}>
                                  <div className={state.category === 'React' ? "single-live-job active" : "single-live-job"}>
                                      <img src={ReactJS} alt="ReactJS" />
                                      <a href="#">
                                          React
                                      </a>
                                  </div>
                              </div>

                              <div className="col-lg-2 col-sm-6" onClick={() => selectCategory('IOS')}>
                                  <div className={state.category === 'IOS' ? "single-live-job active" : "single-live-job"}>
                                      <img src={IOS} alt="IOS" />
                                      <a href="#">
                                          iOS
                                      </a>
                                  </div>
                              </div>

                              <div className="col-lg-2 col-sm-6" onClick={() => selectCategory('NodeJS')}>
                                  <div className={state.category === 'NodeJS' ? "single-live-job active" : "single-live-job"}>
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
															<div className="col-lg-1 col-sm-12">
                              
                              </div>															
                              <div className="col-lg-10 col-md-12 ">
                                  <div className="form-group">
                                      <Select 
                                          name="skills" 
                                          multi
                                          options={state.skillArg}
                                          onChange={(value) => handleSelect('skills', value)} 
                                          value={state.skills}
                                      />
                                  </div>
                              </div>
															<div className="col-lg-1 col-sm-12">
                              
                              </div>
                            </div>
                            <div className="row">      
                              <div className="col-lg-12 col-md-12 text-center">
                                  <Link to={{
                                      pathname: '/freelancers',
                                      state: {
                                        category: state.category,
                                        skills: state.skills
                                      }
                                    }} 
                                    disabled={(state.category === "")}
                                    >
                                      <button className="default-btn" disabled={(state.category === "")}>
                                          <span>Proceed</span>
                                      </button>
                                  </Link>
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
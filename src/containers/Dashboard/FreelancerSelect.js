import React, { useState, useEffect, setState } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux'
import { withRouter, Link } from "react-router-dom";
import Slider from "react-slick";
import { fetchFreelancerByCategory } from '../../actions/hrActions';
import {CardListingLoader, TableListingLoader} from "../../components/Loader/Skelton";

import freelancer1 from "../../assets/images/profile.png";


function FreelancerSelect(props) {
  
  const [state , setState] = useState({
      users: [],
      skills: "",
      category: "",
      freelancer_ids: []
  })


  // console.log("props",props.location)  
  const dispatch = useDispatch();
    
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

    useEffect(() => {
      fetchData();
    }, []);

    const fetchData = () => {
      let data = {}
      if(props.location.state){
        data = {
          categories: props.location.state.category,
          skills: props.location.state.skills
        } 
      }
      // Update the document title using the browser API
      dispatch(fetchFreelancerByCategory(data)).then((res)=> {
          if(res && res.status === 200) {
            // console.log("res",res.data)
             setState(prevState => ({
                ...prevState,
                users: res.data
            }))
          }
      })
    }

    const selectFreelancer = (item) => {
        console.log("item", item  )
    }

    const loader = useSelector(state => (state.applicationIsLoading), shallowEqual)

    return(
        <section className="freelancer-area pt-100 pb-70">
          <div className="container">
            <div className="section-title">
              <span>Top Freelancer</span>
              <h2>Hire Expert Freelancer</h2>
            </div>


            <Slider {...settings}>
              {loader &&  
                      Array.from(Array(7), (e, i) => {
                        return (<div className="single-freelancer">
                            <CardListingLoader />
                            <TableListingLoader />
                          </div>)
                    })
              }
              {state.users.length > 0 ? state.users.map((row, i) => {
                return (<Link to={"/freelancer-details/"+row.uuid} key={i}><div className="">
                        <div className="single-freelancer">
                          <img src={row.user_image ? row.user_image : freelancer1} alt="Image" />
                          <h3>{row.first_name +' '+row.last_name}</h3>
                          <span className="profession">{row.additional_information.category}</span>
                        </div>
                      </div></Link>)  
              })
              :
              <div className="single-freelancer">
                <h5 className="mt-5 mb-5">No Data Found</h5>
              </div>
            }
              {/*  
              <div className="">
                <div className="single-freelancer">
                  <img src={freelancer1} alt="Image" />
                  <h3>James Hendrix</h3>
                  <span className="profession">ROR Developr</span>
                  
                </div>
              </div>

              <div className="">
                <div className="single-freelancer">
                  <img src={freelancer2} alt="Image" />
                  <h3>Jean Burke</h3>
                  <span className="profession">Saleforce Developr</span>
                  
                </div>
              </div>

              <div className="">
                <div className="single-freelancer">
                  <img src={freelancer3} alt="Image" />
                  <h3>David Guzman</h3>
                  <span className="profession">React Developr</span>
                  
                </div>
              </div>

              <div className="">
                <div className="single-freelancer">
                  <img src={freelancer4} alt="Image" />
                  <h3>Clarence Hart</h3>
                  <span className="profession">iOS Developr</span>
                  
                </div>
              </div>

              <div className="">
                <div className="single-freelancer">
                  <img src={freelancer5} alt="Image" />
                  <h3>Anna Smith</h3>
                  <span className="profession">iOS Developr</span>
                  
                </div>
              </div>

              <div className="">
                <div className="single-freelancer">
                  <img src={freelancer6} alt="Image" />
                  <h3>Kulva Dew</h3>
                  <span className="profession">iOS Developr</span>
                  
                </div>
              </div>

              <div className="">
                <div className="single-freelancer">
                  <img src={freelancer7} alt="Image" />
                  <h3>Teena Smith</h3>
                  <span className="profession">ReactJs Developr</span>
                  
                </div>
              </div>
              

              <div className="">
                <div className="single-freelancer">
                  <img src={freelancer8} alt="Image" />
                  <h3>Chet Patel</h3>
                  <span className="profession">Saleforce Developr</span>
                  
                </div>
              </div>
              */}
            </Slider>

            <div className="row mt-5">
              <div className="col-lg-12 col-md-12 text-center">
                  <Link to={{
                            pathname: '/client-signup',
                            state: {
                              category: props.location.state.category,
                              skills: props.location.state.skills,
                              freelancer_ids: state.freelancer_ids
                            }
                          }}>
                      <button className="default-btn">
                          <span>Proceed</span>
                      </button>
                  </Link>
                  <div id="msgSubmit" className="h3 text-center hidden"></div>
                  <div className="clearfix"></div>
              </div>
            </div>          
          </div>
        </section>
    )
}

export default withRouter(FreelancerSelect);
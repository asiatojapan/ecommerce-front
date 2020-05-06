import React, { useState, useEffect } from 'react';
import NavMugicha from "./Nav"
import UpdateInterviewItem from "../mugicha/UpdateInterviewItem"
import { getCurrentInterviews } from "./apiMugicha"
import { isAuthenticates } from "../auth";
import _ from 'lodash'
import { Link } from 'react-router-dom';;

const Day = () => {
    
    return (
        <>  
          <NavMugicha>
          
          
            <section class="text-center">
              <div class="container">
                <p>
                <Link to={`/mugicha/day1`}  className="btn btn-secondary my-2"> Day 1 </Link>   
                <Link to={`/mugicha/day2`} className="btn btn-secondary my-2" >  Day 2 </Link> 
            
                </p>
              </div>
            </section>

        
         
        </NavMugicha>
      
      </>
    );
  }
  
  export default Day;
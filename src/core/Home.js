import React, { useState, useEffect } from 'react';
import Card2 from './Card';
import List from './List';
import { Link, Redirect } from 'react-router-dom';
import { isAuthenticated } from '../auth';
import Checkbox2 from "./Checkbox";
import ItCheckbox from "./ItCheckbox";
import { categories } from "./categories";
import { it_skills } from "./it_skills";
import { getStudents, getCategories, getFilteredStudents,getFavStudents } from './apiCore';
import CardStudent from '../templates/CardStudent';
import SiteWrapper from '../templates/SiteWrapper';
import { PDFDownloadLink } from "@react-pdf/renderer";
import PdfDocument from "../pdf/Resume";
import {
  Page,
  Avatar,
  Icon,
  Grid,
  Text,
  Notification,
  Table,
  Alert,
  Progress,
  Container,
  Badge,
} from "tabler-react";
import "../styles.css";
import "tabler-react/dist/Tabler.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Notifications, {notify} from 'react-notify-toast';
import styled from 'styled-components'



const CardColumn = styled.div`
display: grid;
grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
grid-auto-rows: minmax(200px, auto);
grid-gap: 1rem;`

const Home = () => {
  const { user, token } = isAuthenticated();
  const [students, setStudents] = useState([]);
  const [favCount, setFavCount] = useState();
  const [myFilters, setMyFilters] = useState({
      filters: { categories: [], it_skills: [] }
  });
  const [categorieslist, setCategorieslist] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [limit, setLimit] = useState(15);
  const [skip, setSkip] = useState(0);
  const [size, setSize] = useState(0);
  const [filteredResults, setFilteredResults] = useState([]);

  const init = () => {
      getCategories().then(data => {
          if (data.error) {
              setError(data.error);
          } else {
              setCategorieslist(data);
          }
      });
  };

  const loadFilteredResults = newFilters => {
      getFilteredStudents(user._id, skip, limit, newFilters).then(data => {
          if (data.error) {
              setError(data.error);
          } else {
              setLoading(false)
              setFilteredResults(data.data);
              setSize(data.size);
              setSkip(0);
          }
      });
  };

  const getFavCount = userId => {
    getFavStudents(user._id).then(data => {
        setFavCount(data.length);
    });
};

  

  const loadMore = () => {
    let toSkip = skip + limit;
    // console.log(newFilters);
    getFilteredStudents(user._id, toSkip, limit, myFilters.filters).then(data => {
        if (data.error) {
            setError(data.error);
        } else {
            setFilteredResults([...filteredResults, ...data.data]);
            setSize(data.size);
            setSkip(toSkip);
        }
    });
  };


  useEffect(() => {
      init();
      loadFilteredResults(skip, limit, myFilters.filters);
      getFavCount(user._id);
  }, []);


  const loadMoreButton = () => {
     return (
         size > 0 &&
         size >= limit && (
             <button onClick={loadMore} className="btn btn-warning mb-5">
                 Load more
             </button>
         )
     );
 };


 const Position = () => {
    let myColor = { width: "100%", background: '#0E1717', text: "#FFFFFF" };
    notify.show(
        <div style={{fontSize: "16px" }}>
          390円OFF適用。 対象商品をあと3 点追加で、500円OFF
          <a class="close" style={{paddingLeft: "20px"}} onClick={notify.hide}></a>
        </div>, "custom", -1, myColor
      );
  }

  const handleFilters = (filters, filterBy) => {
      setLoading(true)
      console.log(filters, filterBy);
      const newFilters = { ...myFilters };
      newFilters.filters[filterBy] = filters;

      loadFilteredResults(myFilters.filters);
      setMyFilters(newFilters);
  };

  const handleCategories = value => {
    const data = categories;
    let array = [];

    for (let key in data) {
        if (data[key]._id === parseInt(value)) {
            array = data[key].array;
        }
    }
    return array;
  };

  const handleSetFavCount = e => {
    setFavCount(e);
  };

  const handleItCategories = value => {
     const data = it_skills;
     let array = [];

     for (let key in data) {
         if (data[key]._id === parseInt(value)) {
             array = data[key].array;
         }
     }
     return array;
 };


  const loadStudents = () => {
      getStudents().then(data => {
          if (data.error) {
              console.log(data.error);
          } else {
              setStudents(data);
          }
      });
  };



    return (
      <SiteWrapper> 
         <div class="loading" style={{ display: loading ? "" : "none" }}>
            <div class="loaderSpin"></div>
        </div>
      <div className="my-3 my-md-5">
      <Container>
         <Grid.Row>
           <Grid.Col width={12} lg={3} sm={12}>
                <div class="list-list">
                    <h3 class="card-title">Tags</h3>
                    <Checkbox2
                               categories={categories}
                               handleFilters={filters =>
                                   handleFilters(filters, "tags")} />
                
                  </div>

                <div class="list-list">
                       <h3 class="card-title">IT Skills</h3>
                       <div class="mb-3">
                        <div class="form-selectgroup">
                               <ItCheckbox it_skills={it_skills} handleFilters={filters =>
                           handleFilters(filters, "it_skills")} />
                       </div>
                          </div>
                       </div>
            
           </Grid.Col>

        <Grid.Col width={12} lg={9} sm={12}>
               {filteredResults.map((student, i) => (
      <div>
          <List student={student} setFavCount={handleSetFavCount}
            favCount={favCount}/>
        </div>
        ))}

        {loadMoreButton()}

        </Grid.Col>
        </Grid.Row>
        </Container>
        </div>
        
            {favCount === 0 ? 
            <div>
          {Position()}
          </div>: <a href="/user/students"><div class="count-bar"><div class="heart"><i class="fe fe-heart"></i>{favCount} </div></div></a>} 
          <Notifications options={{zIndex: 200, width: "100%"}} />
        </SiteWrapper>
    );
};

export default Home;

import React, { useState, useEffect } from 'react';
import Card2 from './Card';
import { Link, Redirect } from 'react-router-dom';
import { isAuthenticated } from '../auth';
import Checkbox2 from "./Checkbox";
import ItCheckbox from "./ItCheckbox";
import { categories } from "./categories";
import { it_skills } from "./it_skills";
import { getStudents, getCategories, getFilteredStudents } from './apiCore';
import { PDFDownloadLink, Document } from '@react-pdf/renderer'
import CardStudent from '../templates/CardStudent';
import SiteWrapper from '../templates/SiteWrapper';
import LoadingButton from '../templates/LoadingButton';
import {
  Page,
  Avatar,
  Icon,
  Grid,
  Card,
  Text,
  Table,
  Alert,
  Progress,
  Container,
  Badge,
} from "tabler-react";
import "../styles.css";
import "tabler-react/dist/Tabler.css";

const Home = () => {
  const { user, token } = isAuthenticated();
  const [students, setStudents] = useState([]);
  const [myFilters, setMyFilters] = useState({
      filters: { categories: [], it_skills: [] }
  });
  const [categorieslist, setCategorieslist] = useState([]);
  const [error, setError] = useState(false);
  const [limit, setLimit] = useState(10);
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
              setFilteredResults(data.data);
              setSize(data.size);
              setSkip(0);
          }
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

  const handleFilters = (filters, filterBy) => {
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
      <div className="my-3 my-md-5">
      <Container>
         <Grid.Row>
           <Grid.Col width={12} lg={3} sm={12}>
                <div class="card">
                  <div class="card-body">
                    <h3 class="card-title">Tags</h3>
                    <Checkbox2
                               categories={categories}
                               handleFilters={filters =>
                                   handleFilters(filters, "tags")} />
                  </div>
                </div>

                <div class="card">
                       <div class="card-body">
                       <h3 class="card-title">IT Skills</h3>
                       <div class="mb-3">
                        <div class="form-selectgroup">
                               <ItCheckbox it_skills={it_skills} handleFilters={filters =>
                           handleFilters(filters, "it_skills")} />
                       </div>
                          </div>
                       </div>
                     </div>
           </Grid.Col>

        <Grid.Col width={12} lg={9} sm={12}>
        <h3> {filteredResults.length + " Results"} </h3>

        {filteredResults.map((student, i) => (
        <div key={i}>
          <Card2 student={student} />
        </div>
        ))}
        {loadMoreButton()}

        </Grid.Col>
        </Grid.Row>
        </Container>
        </div>
        </SiteWrapper>
    );
};

export default Home;

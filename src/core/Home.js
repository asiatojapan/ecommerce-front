import React, { useState, useEffect } from 'react';
import Layout2 from "./Layout";
import Card2 from './Card';
import { Link, Redirect } from 'react-router-dom';
import Search from './Search';
import { isAuthenticated } from '../auth';
import Checkbox2 from "./Checkbox";
import PdfDocument from "../pdf/PdfDocument";
import { categories } from "./categories";
import { Row, Col } from 'antd';
import { getStudents, getCategories, getFilteredStudents } from './apiCore';
import { PDFDownloadLink, Document, Page } from '@react-pdf/renderer'

const Home = () => {
  const { user, token } = isAuthenticated();
  const [students, setStudents] = useState([]);
  const [myFilters, setMyFilters] = useState({
      filters: { categories: [] }
  });
  const [categorieslist, setCategorieslist] = useState([]);
  const [error, setError] = useState(false);
  const [limit, setLimit] = useState(6);
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


  useEffect(() => {
      init();
      loadFilteredResults(skip, limit, myFilters.filters);
  }, []);



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

  const loadStudents = () => {
      getStudents("createdAt").then(data => {
          if (data.error) {
              console.log(data.error);
          } else {
              setStudents(data);
          }
      });
  };

  useEffect(() => {
      loadStudents();
  }, []);

    return (
      <Layout2>
          <section class="mw12 mw12-ns center pa3 ph5-ns">
              <div class="fl w-25 pa2">
                <div class="bg-white pa4 br2-ns">
                <form class="pa0">
                <fieldset class="bn">
                <legend class="fw7">Filters</legend>
                  <Checkbox2
                      categories={categories}
                      handleFilters={filters =>
                          handleFilters(filters, "it_skills")
                      }
                  />
                  </fieldset>
                </form>
                </div>
              </div>
                <div class="fl w-75 pa2">
                <div class="pa-l">
                  <div class="bg-white pa4 br2-ns">
                    <div class="pa0 bw2 b--light-gray bb f4-ns mb black-80 pb3">{filteredResults.length}　Results</div>
                    {filteredResults.map((student, i) => (
                    <div key={i}>
                      <Card2 student={student} />
                    </div>
                    ))}
                  </div>
                </div>
            </div>
          </section>
      </Layout2>
    );
};

export default Home;

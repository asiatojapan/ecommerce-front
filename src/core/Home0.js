import React, { useState, useEffect } from 'react';
import Layout2 from "./Layout";
import Card2 from './Card';
import Search from './Search';
import Checkbox from "./Checkbox";
import { getStudents, getCategories, getFilteredStudents } from './apiCore';

const Home = () => {
  const [students, setStudents] = useState([]);
  const [myFilters, setMyFilters] = useState({
      filters: { category: [] }
  });
  const [categories, setCategories] = useState([]);
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
              setCategories(data);
          }
      });
  };

  const loadFilteredResults = newFilters => {
      // console.log(newFilters);
      getFilteredStudents(skip, limit, newFilters).then(data => {
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
      // console.log("SHOP", filters, filterBy);
      const newFilters = { ...myFilters };
      newFilters.filters[filterBy] = filters;

      loadFilteredResults(myFilters.filters);
      setMyFilters(newFilters);
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

  useEffect(() => {
      loadStudents();
  }, []);

    return (
      <Layout2>
      <Checkbox
          categories={categories}
          handleFilters={filters =>
              handleFilters(filters, "category")
          }
      />
        {filteredResults.map((student, i) => (
          <div key={i}>
            <Card2 student={student} />
          </div>
          ))}
      </Layout2>
    );
};

export default Home;

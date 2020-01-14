import React, { useState, useEffect } from 'react';
import Layout2 from "./Layout";
import Card2 from './Card';
import Search from './Search';
import Checkbox2 from "./Checkbox";
import { Row, Col } from 'antd';
import { getStudents, getCategories, getFilteredStudents } from './apiCore';

const Home = () => {
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
      console.log(filters, filterBy);
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
          <div>
           <Row>
             <Col span={18} push={6}>

             {filteredResults.map((student, i) => (
               <div key={i}>
                 <Card2 student={student} />
               </div>
               ))}
             </Col>
             <Col span={6} pull={18}>
               <Checkbox2
                   categories={categorieslist}
                   handleFilters={filters =>
                       handleFilters(filters, "categories")
                   }
               />
             </Col>
           </Row>
     </div>
      </Layout2>
    );
};

export default Home;

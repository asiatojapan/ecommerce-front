import React, { useState, useEffect } from 'react';
import Layout2 from "./Layout";
import Card2 from './Card';
import Search from './Search';
import Checkbox from "./Checkbox";
import { getStudents, getCategories, getFilteredStudents } from './apiCore';

const Home = () => {
  const [students, setStudents] = useState([]);

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
        {students.map((student, i) => (
          <div key={i}>
            <Card2 student={student} />
          </div>
          ))}
      </Layout2>
    );
};

export default Home;

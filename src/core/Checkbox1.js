import React, { useState } from "react";
import {Card, Checkbox } from 'antd';

const Checkbox2 = ({ categories, handleFilters }) => {
    const [checked, setCheked] = useState([]);

    const handleToggle = c => () => {
        // return the first index or -1
        const currentCategoryId = checked.indexOf(c);
        const newCheckedCategoryId = [...checked];
        // if currently checked was not already in checked state > push
        // else pull/take off
        if (currentCategoryId === -1) {
            newCheckedCategoryId.push(c);
        } else {
            newCheckedCategoryId.splice(currentCategoryId, 1);
        }
        // console.log(newCheckedCategoryId);
        setCheked(newCheckedCategoryId);
        handleFilters(newCheckedCategoryId);
    };

    return categories.map((c, i) => (
      <Card style={{ width: 300 }}>
      <li key={i} className="list-unstyled">
          <Checkbox
              onChange={handleToggle(c._id)}
              value={checked.indexOf(c._id === -1)}
              type="checkbox"
              className="form-check-input"
          >{c.name}</Checkbox>
      </li>
  </Card>
    ));
};

export default Checkbox2;

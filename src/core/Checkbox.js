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
   <div>
      <label class="form-check">
      <input class="form-check-input" type="checkbox" onChange={handleToggle(c.name)} id={c.name} value={c.name}/>
         <span class="form-check-label">{c.name}</span>
      </label>
   </div>
    ));
};

export default Checkbox2;

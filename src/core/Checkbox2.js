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
        console.log(newCheckedCategoryId);
        setCheked(newCheckedCategoryId);
        handleFilters(newCheckedCategoryId);
    };

    return categories.map((c, i) => (
      <div class="flex items-center mb2">
          <input class="mr2" type="checkbox" onChange={handleToggle(c.name)} id={c.name} value={c.name}/>
          <label for={c.name} class="lh-copy">{c.name}</label>
      </div>
    ));
};

export default Checkbox2;

import React, { useState, useEffect } from 'react';

  
const SearchCheckbox = ({categories, handleFilters}) => {
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


  
    return (
        <div className="m-4">
            {categories.map(c => (
           <label  key={c.key} class="custom-control custom-checkbox custom-control-inline">
               <input name="example-inline-checkboxes" class="custom-control-input custom-control custom-checkbox custom-control-inline" type="checkbox"  onChange={handleToggle(c.name)}  value={c} name={c.name} />
               <span class="custom-control-label" style={{fontSize: "14px"}}>{c.name}</span></label>
                ))
            }
        </div>
    );
  }

  export default SearchCheckbox;
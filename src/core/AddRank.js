import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import {
  Form,
} from "tabler-react";

const AddRank = ({  handleRankChange }) => {
  const [rank, setRank] = useState("");
  const { register, errors } = useForm();
  

  const handleChange = e => {
      setRank(e.target.value);
      handleRankChange(e.target.value)
  };

  const newCategoryFom = () => (
    <>
      <input style={{display: 'none' }} onChange={handleChange} value={rank}
      name="jrank"
      ref={register({ required: true, maxLength: 10 })}
         />{errors.japaneseVali && <div className="text-red">This field is required</div>}
            <form style={{marginBottom: "0"}}>
            <label className="form-label">ニーズ合致度</label>
                          <Form.SelectGroup pills onChange={handleChange} name="japanese" >
                            <Form.SelectGroupItem
                              label="1"
                              name="japanese"
                              value="1"
                            />
                            <Form.SelectGroupItem
                            label="2"
                            name="japanese"
                              value="2"
                            />
                            <Form.SelectGroupItem
                            label="3"
                            name="japanese"
                              value="3"
                            />
                            <Form.SelectGroupItem
                            label="4"
                            name="japanese"
                              value="4"
                            />
                            <Form.SelectGroupItem
                            label="5"
                            name="japanese"
                              value="5"
                            />
                          </Form.SelectGroup>
                        </form>
          
        </>
  );

  return (
  
          <div >
            {newCategoryFom()}
          </div>

  );
};

export default AddRank;

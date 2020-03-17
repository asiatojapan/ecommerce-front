import React, { useState, useEffect } from 'react';
import { isAuthenticates } from '../auth';
import { withRouter } from 'react-router-dom';
import { getInterview, getUsers } from '../admin/apiAdmin';
import {  updateInterviewItem } from '../core/apiCore';
import { useForm } from "react-hook-form";
import Modal from 'react-bootstrap/Modal';
import {
  Form,
} from "tabler-react";
import { japanese } from '../core/japanese';

const UpdateInterviewItem = ({ interviewId, interviewItemId, match, history }) => {

    const { register, handleSubmit, watch, errors, control } = useForm();
    const [values, setValues] = useState({
        studentname: "",
        name: "",
        time: "",
        status: "",
        phase: "",
        result: "",
        company: "",
        student: "",
        time_period: "",
        category: "",
        japanese_level: "",
        skill_match: "",
        character_match: "",
        error: false,
        success: false,
        redirectToProfile: false,
    });

    const { darwin_uid, darwin_myTk } = isAuthenticates();

    const { studentname, company, student, status, name, time, phase, result, time_period, category, skill_match, character_match, japanese_level, error, success, company_form, redirectToProfile} = values;

    const init = interviewId => {
      getInterview(interviewId, darwin_uid, darwin_myTk).then(data => {
            if (data.error) {
                setValues({ ...values, error: true });
            } else {
                const interviewItems = data.interviewItems.filter(items => items._id === interviewItemId);
                setValues({ ...values, studentname: data.student.name, company: data.company._id, student: data.student._id,
                  status: data.status, result: interviewItems[0].result, time: interviewItems[0].time,
                  phase: interviewItems[0].phase, category: interviewItems[0].category,
                  time_period: interviewItems[0].time_period, japanese_level: interviewItems[0].japanese_level,
                  skill_match: interviewItems[0].skill_match,
                  character_match: interviewItems[0].character_match,
                  company_form: interviewItems[0].company_form
                 });
            }
        });
    };

    useEffect(() => {
        init(interviewId);
    }, []);

    const handleChange = name => e => {
        setValues({ ...values, error: false, [name]: e.target.value });
    };


    const onSubmit = data => { console.log(data) }

    const clickSubmit = e => {
        updateInterviewItem(interviewId, interviewItemId, darwin_uid, darwin_myTk, { company, student, time, phase, result, time_period, category, japanese_level, character_match, skill_match, company_form: true }).then(data => {
            if (data.error) {
                // console.log(data.error);
                alert(data.error);
            } else {
              setValues({
                  ...values,
                  company: data.company,
                  student: data.student,
                  name: data.name,
                  time: data.time,
                  phase: data.phase,
                  result: data.result,
                  category: data.category,
                  time_period: data.time_period,
                  japanese_level: data.japanese_level,
                  character_match: data.character_match,
                  skill_match: data.skill_match,
                  success: true,
                  redirectToProfile: true
              });
            }
        });
    };

    const clickSave = e => {
      updateInterviewItem(interviewId, interviewItemId, darwin_uid, darwin_myTk, { company, student, time, phase, result, time_period, category, japanese_level, character_match, skill_match }).then(data => {
          if (data.error) {
              // console.log(data.error);
              alert(data.error);
          } else {
            setValues({
                ...values,
                company: data.company,
                student: data.student,
                name: data.name,
                time: data.time,
                phase: data.phase,
                result: data.result,
                category: data.category,
                time_period: data.time_period,
                japanese_level: data.japanese_level,
                character_match: data.character_match,
                skill_match: data.skill_match,
                success: true,
                redirectToProfile: true
            });
          }
      });
  };

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


            const redirectUser = () => {
                if (redirectToProfile) {
                    if (!error) {
                          window.location.reload();
                    }
                }
            };

    const interviewUpdate = (company, student, time, phase, result, time_period, category, japanese_level, character_match, skill_match) => (
      <div>
        {company_form ? <button className="resumeGradient unlikeBtn smaller" disabled onClick={handleShow}>
       評価済み
     </button>: <button className="resumeGradient unlikeBtn smaller"  onClick={handleShow}>
       評価をメモする 
     </button>}
          <Modal show={show} onHide={handleClose}>
                   <Modal.Body closeButton>
                   <div class="container">
                       <h3 class="text-center mt-5 mb-5">How was your interview with <br/>
                       <strong> {studentname} </strong>? </h3>
                       <hr />
                        <input style={{display: 'none' }} onChange={handleChange('japanese_level')} value={japanese_level}
                          name="japaneseVali"
                          ref={register({ required: true, maxLength: 10 })}
                        />{errors.japaneseVali && <div class="text-red">This field is required</div>}
                              <div class="mb-2">
                              <div class="form-label">日本語力</div>
                              <select placeholder="Role" onChange={handleChange("japanese_level")} value={japanese_level}  class="form-control">
                              <option value=""> Select </option>
                              <option value="1"> 1 </option>
                              <option value="2"> 2 </option>
                              <option value="3"> 3 </option>
                              <option value="4"> 4 </option>
                              <option value="5"> 5 </option>
                              </select>
                              </div>

                              <input style={{display: 'none' }} onChange={handleChange('skill_match')} value={skill_match}
                          name="skillVali"
                          ref={register({ required: true, maxLength: 10 })}
                        />{errors.skillVali && <div class="text-red">This field is required</div>}
                              <div class="mb-2">
                              <div class="form-label">Skill Match</div>
                              <select placeholder="Role" onChange={handleChange("skill_match")} value={skill_match}  class="form-control">
                              <option value=""> Select </option>
                              <option value="1"> 1 </option>
                              <option value="2"> 2 </option>
                              <option value="3"> 3 </option>
                              <option value="4"> 4 </option>
                              <option value="5"> 5 </option>
                              </select>
                              </div>

                              <input style={{display: 'none' }} onChange={handleChange('character_match')} value={character_match}
                          name="characterVali"
                          ref={register({ required: true, maxLength: 10 })}
                        />{errors.characterVali && <div class="text-red">This field is required</div>}
                              <div class="mb-2">
                              <div class="form-label">Character Match</div>
                              <select placeholder="Role" onChange={handleChange("character_match")} value={character_match}  class="form-control">
                              <option value=""> Select </option>
                              <option value="1"> 1 </option>
                              <option value="2"> 2 </option>
                              <option value="3"> 3 </option>
                              <option value="4"> 4 </option>
                              <option value="5"> 5 </option>
                              </select>
                              </div>

                        <Form.Group label="合否">   {errors.resultVali && <div class="text-red">This field is required</div>}
                          <Form.SelectGroup onChange={handleChange('result')}>
                            <Form.SelectGroupItem
                              icon="x"
                              name="result"
                              value="不合格"
                            />
                            <Form.SelectGroupItem
                              icon="triangle"
                              name="result"
                              value="三角"
                            />
                            <Form.SelectGroupItem
                              icon="circle"
                              name="result"
                              value="合格"
                            />
                          </Form.SelectGroup>
                        </Form.Group>

                        <input style={{display: 'none' }} onChange={handleChange('result')} value={result}
                          name="resultVali"
                          ref={register({ required: true, maxLength: 10 })}
                        />

                        </div>
                      </Modal.Body>
                      <Modal.Footer>
                        <button onClick={handleSubmit(clickSave)} className="likeBtn smaller">一時保存する</button>
                        <button onClick={handleSubmit(clickSubmit)} className="resumeGradient  unlikeBtn smaller">評価を確定する</button>
              </Modal.Footer>
            </Modal>
            </div>
    );

    return (
      <span>
          {interviewUpdate(company, student, time, phase, result, time_period, category, japanese_level, character_match, skill_match)}
          {redirectUser()}
      </span>
    );
};

export default withRouter(UpdateInterviewItem);

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
        companyname: "",
        name: "",
        time: "",
        status: "",
        phase: "",
        result: "",
        company: "",
        student: "",
        time_period: "",
        event_day: "",
        category: "",
        japanese_level: "",
        skill_match: "",
        character_match: "",
        atojComment: "",
        companyComment: "", 
        error: false,
        success: false,
        redirectToProfile: false,
    });

    const { darwin_uid, darwin_myTk } = isAuthenticates();

    const { studentname, companyname, company, student, status, name, time, phase, result, time_period, category, skill_match, character_match, japanese_level, error, success, event_day, company_form, companyComment, atojComment, redirectToProfile} = values;

    const init = interviewId => {
      getInterview(interviewId, darwin_uid, darwin_myTk).then(data => {
            if (data.error) {
                setValues({ ...values, error: true });
            } else {
                const interviewItems = data.interviewItems.filter(items => items._id === interviewItemId);
                setValues({ ...values, studentname: data.student.name, companyname: data.company.name, company: data.company._id, student: data.student._id,
                  status: data.status, result: interviewItems[0].result, time: interviewItems[0].time,
                  phase: interviewItems[0].phase, category: interviewItems[0].category,
                  event_day: interviewItems[0].event_day,
                  time_period: interviewItems[0].time_period, japanese_level: interviewItems[0].japanese_level,
                  skill_match: interviewItems[0].skill_match,
                  character_match: interviewItems[0].character_match,
                  companyComment: interviewItems[0].companyComment,
                  company_form: interviewItems[0].company_form,
                  atojComment: interviewItems[0].atojComment
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

    const clickSubmit = e => {
        updateInterviewItem(interviewId, interviewItemId, darwin_uid, darwin_myTk, { company, student, time, phase, result, time_period, category, japanese_level, character_match, skill_match, company_form: true, companyComment, atojComment, studentname, companyname, event_day }).then(data => {
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
                  atojComment: data.atojComment,
                  event_day: data.event_day,
                  companyComment: data.companyComment,
                  success: true,
                  redirectToProfile: true
              });
            }
        });
    };

    const clickSave = e => {
      updateInterviewItem(interviewId, interviewItemId, darwin_uid, darwin_myTk, { company, student, time, phase, result, time_period, category, japanese_level, character_match, skill_match,  companyComment, event_day, atojComment, studentname, companyname }).then(data => {
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
                atojComment: data.atojComment,
                event_day: data.event_day,
                companyComment: data.companyComment,
                success: true,
                redirectToProfile: false
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

    const interviewUpdate = (company, student, time, phase, result, time_period, category, japanese_level, character_match, skill_match, companyComment, atojComment, event_day) => (
      <div>
        {company_form ? <button className="resumeGradient unlikeBtn smaller" disabled onClick={handleShow}>
       評価済み
     </button>: <button className="resumeGradient unlikeBtn smaller"  onClick={handleShow}>
       評価をメモする 
     </button>}
          <Modal show={show} onHide={handleClose}>
                   <Modal.Body closeButton>
                   <div class="container">
                       <h3 class="text-center mt-5 mb-5">
                       <strong> {studentname} </strong> さんとの面接はいかがでしたか？ </h3>
                       <hr />
                              <div class="mb-2">
                              <div class="form-label">日本語力 (1 = 低, 5= 高)</div>
                              <input style={{display: 'none' }} onChange={handleChange('japanese_level')} value={japanese_level}
                          name="japaneseVali"
                          ref={register({ required: true, maxLength: 10 })}
                        />{errors.japaneseVali && <div class="text-red">お手数ですが、ご記入くださいませ。</div>}
                              <select placeholder="Role" onChange={handleChange("japanese_level")} value={japanese_level}  class="form-control">
                              <option value=""> Select </option>
                              <option value="1"> 1 </option>
                              <option value="2"> 2 </option>
                              <option value="3"> 3 </option>
                              <option value="4"> 4 </option>
                              <option value="5"> 5 </option>
                              </select>
                              </div>

                              <div class="mb-2">
                              <div class="form-label">スキルマッチ (1 = 低, 5= 高)</div>
                              <input style={{display: 'none' }} onChange={handleChange('skill_match')} value={skill_match}
                          name="skillVali"
                          ref={register({ required: true, maxLength: 10 })}
                        />{errors.skillVali && <div class="text-red">お手数ですが、ご記入くださいませ。</div>}
                              <select placeholder="Role" onChange={handleChange("skill_match")} value={skill_match}  class="form-control">
                              <option value=""> Select </option>
                              <option value="1"> 1 </option>
                              <option value="2"> 2 </option>
                              <option value="3"> 3 </option>
                              <option value="4"> 4 </option>
                              <option value="5"> 5 </option>
                              </select>
                              </div>

                             
                              <div class="mb-2">
                              <div class="form-label">人物マッチ (1 = 低, 5= 高)</div>
                              <input style={{display: 'none' }} onChange={handleChange('character_match')} value={character_match}
                          name="characterVali"
                          ref={register({ required: true, maxLength: 10 })}
                        />{errors.characterVali && <div class="text-red">お手数ですが、ご記入くださいませ。</div>}
                              <select placeholder="Role" onChange={handleChange("character_match")} value={character_match}  class="form-control">
                              <option value=""> Select </option>
                              <option value="1"> 1 </option>
                              <option value="2"> 2 </option>
                              <option value="3"> 3 </option>
                              <option value="4"> 4 </option>
                              <option value="5"> 5 </option>
                              </select>
                              </div>

                        <Form.Group label="合否">    <input style={{display: 'none' }} onChange={handleChange('result')} value={result}
                          name="resultVali"
                          ref={register({ required: true, maxLength: 10 })}
                        />

                        {errors.resultVali && <div class="text-red">お手数ですが、ご記入くださいませ。</div>}
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

                              <div class="mb-2">
                                <label class="form-label">コメント</label>
                                <textarea  onChange={handleChange('companyComment')} type="text" class="form-control" value={companyComment} />
                              </div>

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
          {interviewUpdate(company, student, time, phase, result, time_period, category, japanese_level, character_match, skill_match,  companyComment, atojComment, event_day)}
          {redirectUser()}
      </span>
    );
};

export default withRouter(UpdateInterviewItem);

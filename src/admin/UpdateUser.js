import React, { useState, useEffect } from 'react';
import { isAuthenticates } from '../auth';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { getSalesRep } from "./apiAdmin";
import { read, update } from '../user/apiUser';
import SiteWrapper from '../templates/SiteWrapper';

import {
  Page,
  Grid,
} from "tabler-react";

const UpdateUser = ({ match, history }) => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        role: '',
        phase: "",
        round: "",
        sales_rep: "",
        tantou: "",
        open: "",
        topUniNeeds:"",
        logo: "",
        descriptionOne: "",
        descriptionTwo: "",
        descriptionThree: "",
        descriptionFour: "",
        descriptionFive: "",
        descriptionSix: "",
        homepageUrl: "",
        specialPlan: "",
        jdLink: "",
        tags: "",
        japaneseTags: "",
        countryTags: "",
        educationBgTags: "",
        universityTags: "",
        zoomUrl: "",
        error: false,
        success: false,
        redirectUser: false,
        formData: ''
    });

    const [users, setUsers] = useState([]);

    const { darwin_myTk, darwin_uid } = isAuthenticates();


    const {  
      error, 
      success,
      formData } = values;

    const init = userId => {
        // console.log(userId);
        read(userId, darwin_myTk).then(data => {
            if (data.error) {
                setValues({ ...values, error: true });
            } else {
                setValues({ ...values, name: data.name, email: data.email, role: data.role, phase: data.phase,
                round: data.round, sales_rep: data.sales_rep, tantou:data.tantou,
                logo: data.logo, specialPlan: data.specialPlan,
                descriptionOne: data.descriptionOne,
                descriptionTwo: data.descriptionTwo,
                descriptionThree: data.descriptionThree,
                descriptionFour: data.descriptionFour,
                descriptionFive: data.descriptionFive,
                descriptionSix: data.descriptionSix,
                jdLink: data.jdLink,
                tags: data.tags,   
                open: data.open,
                topUniNeeds: data.topUniNeeds,
                japaneseTags:data.japaneseTags,
                countryTags: data.countryTags,
                educationBgTags: data.educationBgTags,
                universityTags: data.universityTags,
                zoomUrl: data.zoomUrl,
                homepageUrl: data.homepageUrl, 
                formData: new FormData() });
            }
        });
    };


    const initUsers = () => {
        getSalesRep(darwin_uid, darwin_myTk).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setUsers(data);
            }
        });
    };

    useEffect(() => {
        init(match.params.userId);
        initUsers();
    }, []);

    const handleChange = name => event => {
      const value = name === 'upload_fyp' ? event.target.files[0] : event.target.value;
      formData.set(name, value);
      setValues({ ...values, [name]: value });
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: '', loading: true });

        update(match.params.userId, darwin_myTk, formData ).then(data => {
            if (data.error) {
              setValues({ ...values, error: data.error });
            } else {
              setValues({
                  ...values,
                  name: data.name,
                  email: data.email,
                  role: data.role,
                  phase: data.phase,
                  round: data.round,
                  sales_rep: data.sales_rep,
                  specialPlan: data.specialPlan,
                  success: true,
                  redirectToProfile: true,
              });
            }
        });
    };

    const redirectUser = () => {
        if (success) {
              window.scrollTo(0, 0);
        }
    };


        const showError = () => (
            <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
                {error}
            </div>
        );

        const showSuccess = () => (
            <div className="alert alert-info" style={{ display: success ? '' : 'none' }}>
                User has been updated!
            </div>
        );

    const profileUpdate = () => (

      <form onSubmit={clickSubmit}>
        <div class="card">
          <div class="card-header">
           <h4 class="card-title">Update User</h4>
          </div>
          <div class="card-body">

          <div class="row">

            <div class="col-md-6 col-xl-6">
              <div class="mb-2">
                <label class="form-label">Name</label>
                <input onChange={handleChange('name')} type="text" class="form-control" value={values.name} />
              </div>
              <div class="mb-2">
                <label class="form-label">Email</label>
                <input onChange={handleChange('email')} type="text" class="form-control" value={values.email} />
              </div>
              <div class="mb-2">
                   <div class="form-label">ASIAtoJAPAN特別プラン</div>
                    <select placeholder="Plan" onChange={handleChange("specialPlan")} value={values.specialPlan}　class="form-control">
                    <option value=""> Select </option>
                    <option value="true"> あり </option>
                    <option value="false"> なし </option>
                </select>
                </div>
                <div class="mb-2">
                    <div class="form-label">Phase</div>
                    <select placeholder="Phase" onChange={handleChange("round")} value={values.round}　class="form-control">
                    <option value=""> Select </option>
                    <option value="Phase I"> Phase I (推薦1)</option>
                    <option value="Phase II"> Phase II </option>
                    <option value="Phase III"> Phase III (推薦2のみ) </option>
                    <option value="Phase IIIa"> Phase IIIa (推薦2 + 検討リスト) </option>
                    <option value="Phase IV"> 来日学生のみ </option>
                      </select>
                  </div>
                  
                </div>
                <div class="col-md-6 col-xl-6">
              <div class="mb-2">
                  <div class="form-label">Role</div>
                  <select placeholder="Role" onChange={handleChange("role")} value={values.role}  class="form-control">
                    <option value=""> Select </option>
                    <option value="0"> 参加企業 </option>
                    <option value="3"> 閲覧企業​ </option>
                    <option value="2"> Unregistered User </option>
                    <option value="1"> Admin </option>
                    <option value="4"> Mentor </option>
                    </select>
                  </div>

                    <div class="mb-2">
                    <div class="form-label">営業担当</div>
                    <select placeholder="Phase" onChange={handleChange("tantou")} value={values.tantou}　class="form-control">
                    <option value=""> Select </option>
                    <option value="赤羽根"> 赤羽根</option>
                    <option value="ルイス タン"> ルイス タン </option>
                    <option value="青地 翔子"> 青地 翔子 </option>
                    <option value="生賀 正晃"> 生賀 正晃 </option>
                    <option value="蔡"> 蔡 </option>
                    <option value="河合麻結"> 河合麻結 </option>
                    <option value="小嶋鈴乃"> 小嶋鈴乃 </option>
                    <option value="渡邉"> 渡邉 </option>
                    <option value="三瓶">三瓶 </option>
                      </select>
                  </div>
                  
                  <div class="mb-2">
                      <div class="form-label">上位大学</div>
                        <select placeholder="Plan" onChange={handleChange("topUniNeeds")} value={values.topUniNeeds}　class="form-control">
                        <option value=""> Select </option>
                        <option value="true"> 上位大学 </option>
                        <option value="false"> 問わない </option>
                    </select>
                  </div>

                    <div class="mb-2">
                      <div class="form-label">JOB Open/Close</div>
                        <select placeholder="Plan" onChange={handleChange("open")} value={values.open}　class="form-control">
                        <option value=""> Select </option>
                        <option value="true"> Open </option>
                        <option value="false"> Close </option>
                    </select>
                  </div>
                </div>

          
                </div>
              
                <div class="mb-2">
                  <label class="form-label">Logo</label>
                  <input onChange={handleChange("logo")} value={values.logo} name="logo" class="form-control"/>
                </div>
                <div class="mb-2">
                  <label class="form-label">Homepage Url</label>
                  <input onChange={handleChange("homepageUrl")} value={values.homepageUrl} name="homepageUrl" class="form-control"/>
                </div>

                <div class="mb-2">
                  <label class="form-label">JD Url</label>
                  <input onChange={handleChange("jdLink")} value={values.jdLink} name="jdLink" class="form-control"/>
                </div>
          
          <div class="mb-2">
            <label class="form-label">Tags</label>
             <input type="text" onChange={handleChange("tags")} value={values.tags} name="tags"  class="form-control"/>
          </div>
          <div class="mb-2">
            <label class="form-label">日本語 Tags</label>
             <input type="text" onChange={handleChange("japaneseTags")} value={values.japaneseTags} name="japaneseTags"  class="form-control"/>
          </div>
          <div class="mb-2">
            <label class="form-label">国籍 Tags</label>
             <input type="text" onChange={handleChange("countryTags")} value={values.countryTags} name="countryTags"  class="form-control"/>
          </div>
          <div class="mb-2">
            <label class="form-label">学歴　Tags</label>
             <input type="text" onChange={handleChange("educationBgTags")} value={values.educationBgTags} name="educationBgTags"  class="form-control"/>
          </div>

          <div class="mb-2">
            <label class="form-label"> 事業内容/Business Field	</label>
            <textarea onChange={handleChange("descriptionSix")} value={values.descriptionSix} rows="5" name="descriptionSix" class="form-control"/>
          </div>

          <div class="mb-2">
            <label class="form-label">選考ステップ / Steps	</label>
            <textarea onChange={handleChange("descriptionOne")} value={values.descriptionOne} rows="5" name="descriptionOne" class="form-control"/>
          </div>

          <div class="mb-2">
            <label class="form-label"> １次面接内容 / First Interview Details	</label>
            <textarea onChange={handleChange("descriptionTwo")} value={values.descriptionTwo} rows="5" name="descriptionTwo" class="form-control"/>
          </div>

          <div class="mb-2">
            <label class="form-label"> ２次面接内容 / Second Interview Details		</label>
            <textarea onChange={handleChange("descriptionThree")} value={values.descriptionThree} rows="5" name="descriptionThree" class="form-control"/>
          </div>

          <div class="mb-2">
            <label class="form-label"> 最終面接内容 / Final Interview Details </label>
            <textarea onChange={handleChange("descriptionFour")} value={values.descriptionFour} rows="5" name="descriptionFour" class="form-control"/>
          </div>

          <div class="mb-2">
            <label class="form-label"> 参考/Please refer to this website in advance.		</label>
            <textarea onChange={handleChange("descriptionFive")} value={values.descriptionFive} rows="5" name="descriptionFive" class="form-control"/>
          </div>

          <div class="mb-2">
            <label class="form-label"> Zoom Url </label>
            <textarea onChange={handleChange("zoomUrl")} value={values.zoomUrl} rows="5" name="zoomUrl" class="form-control"/>
          </div>


          </div>
          <div class="card-footer text-right">
              <div class="d-flex">
                <a class="btn btn-link" onClick={() => history.goBack()}>Cancel</a>
                <button type="submit" class="btn btn-primary ml-auto">Submit</button> </div>
        </div>
      </div>
    </form>
    );

    return (
      <SiteWrapper>
      <Page.Content>

      <ol className="breadcrumb" aria-label="breadcrumbs" style={{background: "transparent"}}>
        <li className="breadcrumb-item"><a className="link" href="/">Home</a></li>
        <li className="breadcrumb-item"><a className="link" href="/admin/users">All Users</a></li>
        <li className="breadcrumb-item"><a className="link" href={`/admin/profile/${match.params.userId}`}>{values.name}</a></li>
         <li className="breadcrumb-item active" aria-current="page"> Update </li>
      </ol>   
      {showSuccess()}
      {showError()}
      {redirectUser()}
          {profileUpdate()}
          </Page.Content>
      </SiteWrapper>
    );
};

export default withRouter(UpdateUser);

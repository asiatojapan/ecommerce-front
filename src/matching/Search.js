import React, { useState, useEffect } from 'react';
import { isAuthenticates } from "../auth";
import { studentMatchSearch } from './apiMatching';
import { it_skills, countries,tags, japanese, education_bg } from './SearchData';
import SearchCheckbox from "./SearchCheckbox"
import SiteWrapper from '../templates/SiteWrapper'

import {
  Container,
} from "tabler-react";

const Search = () => {
  const [data, setData] = useState({
      search: "",
      country_search: "",
      japanese_search: "",
      tags_search: "",
      education_bg_search: "",
      it_skills_search: "",
      country: "",
      research_search: "",
      results: [],
      searched: false
  });
  const { search, country_search, education_bg_search, japanese_search, tags_search, research_search, it_skills_search, results, searched } = data;

  const [loading, setLoading] = useState(false);
  const { darwin_uid, darwin_myTk } = isAuthenticates();

  const searchData = () => {
       setLoading(true)
       studentMatchSearch({ country: country_search || undefined, japanese: japanese_search|| undefined, 
        tags: tags_search || undefined, it_skills: it_skills_search || undefined,
        research: research_search || undefined, education_bg: education_bg_search || undefined }, darwin_myTk).then(
            response => {
                if (response.error) {
                    console.log(response.error);
                } else {
                    setData({ ...data, results: response, searched: true });
                    setLoading(false)
                }
            }
        );
};

useEffect(() => {
  searchData();
}, []);

const searchSubmit = e => {
    e.preventDefault();
    searchData();
};

const handleChange = name => event => {
   //  console.log(name, event.target.value)
    setData({ ...data, [name]: event.target.value, searched: false });
};

const handleFilters = (filters, searchBy) => {
    // console.log(filters, searchBy)
    setData({ ...data, [searchBy]: filters, searched: false });
}

const searchedCriteria = () => {
  return (
    <>
    <div class="card-header">
    <h3 class="card-title">Search Criteria</h3>
    </div>
    <table class="table card-table">
                    <tbody>
                    <tr>
                      <td width="1"></td>
                      <td>国籍</td>
                      <td class="text-right"><span class="text-muted">{country_search}</span></td>
                     </tr>
                    <tr>
                      <td width="1"></td>
                      <td>日本語</td>
                      <td class="text-right"><span class="text-muted">{japanese_search}</span></td>
                     </tr>
                     <tr>
                      <td width="1"></td>
                      <td>学歴</td>
                      <td class="text-right"><span class="text-muted">{education_bg_search}</span></td>
                     </tr>
                     <tr>
                      <td width="1"></td>
                      <td>IT Skill</td>
                      <td class="text-right"><span class="text-muted">{it_skills_search}</span></td>
                     </tr>
                    
                     <tr>
                      <td width="1"></td>
                      <td>Tags</td>
                      <td class="text-right"><span class="text-muted">{tags_search}</span></td>
                     </tr>

                     <tr>
                      <td width="1"></td>
                      <td>FYP Keywords</td>
                      <td class="text-right"><span class="text-muted">{research_search}</span></td>
                     </tr>
                    
                  </tbody>
                  </table>
</>
  )
}

const calculatePercent = (score, denom) => {
  return Math.round((score/denom)*100)
}
const searchedStudents = (results = []) => {
    return (
        <div>
      <div className="table-responsive">
    <table className="table card-table table-striped table-vcenter">
      <thead>
        <tr>
          <th>ID</th>
          <th>名</th>
          <th>国籍</th>
          <th>日本語</th>
          <th>学歴</th>
          <th>Tags Score</th>
          <th>It Skills Score</th>
          <th>FYP Score</th>

        </tr>
      </thead>
      <tbody>
      {results.map((student, i) => (
          <tr key={student.id}>
            <td>{student.studentid}</td>
            <td>{student.name}</td>
            <td>{student.countryMatch > 0 ? "●" : null}</td>
            <td>{student.japaneseMatch > 0 ? "●" : null}</td>
            <td>{student.education_bgMatch > 0 ? "●" : null}</td>
            <td>{student.tagsMatch > 0 ? <> {calculatePercent(student.tagsMatch, tags_search.length)}% </>  : null}</td>
            <td>{student.it_skillsMatch > 0 ? <>  {calculatePercent(student.it_skillsMatch, it_skills_search.length)}% </>  : null}</td>
            <td>{student.researchMatch > 0 ? <> {student.researchMatch}</>  : null}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
            </div>
    );
};
   
const searchForm = () => (

  <form onSubmit={searchSubmit}>
     <div className="form-group" style={{marginBottom: "0"}}>
         <div className="row">
          <div className="col col-5 col-sm-4 col-lg-3">
          <div class="card-header">
              <h3 class="card-title">IT Skills</h3>
         </div>
                <SearchCheckbox categories={it_skills}  handleFilters={filters =>
                                   handleFilters(filters, "it_skills_search")}  />
          </div>
          <div className="col col-6 col-sm-4 col-lg-3">
          <div class="card-header">
              <h3 class="card-title">国籍</h3>
         </div>
                <SearchCheckbox categories={countries}  handleFilters={filters =>
                                   handleFilters(filters, "country_search")}  />
              </div>                     
           <div className="col col-6 col-sm-4 col-lg-3"> 
           <div class="card-header">
              <h3 class="card-title">タグ</h3>
         </div>               
               <SearchCheckbox categories={tags}  handleFilters={filters =>
                                   handleFilters(filters, "tags_search")}  />
                              </div>
          <div className="col col-6 col-sm-4 col-lg-3">
          <div class="card-header">
              <h3 class="card-title">日本語</h3>
         </div>
               <SearchCheckbox categories={japanese}  handleFilters={filters =>
                                   handleFilters(filters, "japanese_search")}  />
          <div class="card-header">
              <h3 class="card-title">学歴</h3>
         </div>
               <SearchCheckbox categories={education_bg}  handleFilters={filters =>
                                   handleFilters(filters, "education_bg_search")}  />
          <input
                  type="search"
                  className="form-control"
                  onChange={handleChange("research_search")}
                  placeholder="FYP skills, split by ',' "
              />  
         </div>
        
        
       
       </div>
       <div class="card-footer text-right">
              <div class="d-flex">
                <button type="submit" class="btn btn-primary ml-auto">Submit</button> </div>
        </div>
      </div> 
  </form>
);

    return (
    <SiteWrapper>
        <div class="loading" style={{ display: loading ? "" : "none" }}>
          <div class="loaderSpin"></div>
      </div>
      <Container>
      <div class="list-list">
          <div class="card-title">{searchForm()}</div>
         
       </div>
       <div class="list-list">
       {searchedCriteria()}
       </div>

      <div class="list-list">
      {searchedStudents(results)}
      </div>
      </Container>
      </SiteWrapper>
    );
};

export default Search;

import React, { useState, useEffect } from 'react';
import NavMugicha from "./nav"
import UpdateInterviewItem from "../mugicha/UpdateInterviewItem"
import { list } from "./apiMugicha"
import { getInterviews } from "../admin/apiAdmin";
import { isAuthenticates } from "../auth";

const Home = () => {
    const [interviews, setInterviews] = useState([]);
    const { darwin_uid, darwin_myTk} = isAuthenticates();
    const [loading, setLoading] = useState(true)

    const [data, setData] = useState({
        categories: [],
        category: "",
        search: "",
        results: [],
        searched: false
    });


    const { category, search, results  } = data;
  
    const loadInterviews = () => {
        const tempArr = []
        getInterviews(darwin_uid, darwin_myTk).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setLoading(false);
                setInterviews(data);
            }
        });
    };

  
    const searchSubmit = e => {
        e.preventDefault();
        searchData();
    };

    const handleChange = name => event => {
        setData({ ...data, [name]: event.target.value, searched: false });
    };

    const searchData = () => {
        console.log(search, category);
        if (search) {
            list({ search: search || undefined, category: category }).then(
                response => {
                    if (response.error) {
                        console.log(response.error);
                    } else {
                        setData({ ...data, results: response, searched: true });
                    }
                }
            );
        }
    };

    const searchForm = () => (
        <form onSubmit={searchSubmit}>
            <span className="input-group-text">
                <div className="input-group input-group-lg">
                    <input
                        type="search"
                        className="form-control"
                        onChange={handleChange("search")}
                        placeholder="Search by name"
                    />
                </div>
                    <button className="input-group-text">Search</button>
            
            </span>
        </form>
    );

    const searchedProducts = (results = []) => {
        return (
            <div>
                <div className="row">
                    {results.map((product, i) => (
                        <div className="col-4 mb-3">
                           ass
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    const listCompanies = () => {

        
        const cats = [...new Set(interviews.map(q => q.companies[0].name))];
        return (
            <div>
                {console.log(cats)}
               {interviews.map((interview, i) =>  
                <> {interview.companies[0].name}
                </>
                ) }
            </div>
        );
    };


    useEffect(() => {
        loadInterviews();
    }, []);
    
    return (
        <>  
          <NavMugicha>
              <div style={{padding: "1rem 0rem"}}>
              <div className="container mb-3">{searchForm()}</div>
                </div>
                <table class="table table-bordered">
                <thead>
                    <tr>
                    <th>企業</th>
                    <th>学生</th>
                    <th>時間</th>
                    <th style={{width: "10%"}}>日</th>
                    <th style={{width: "10%"}}>Type</th>
                    <th style={{width: "10%"}}>結果</th>
                    <th style={{width: "30%"}}> ATOJコメント</th>
                    <th style={{width: "13%"}}> </th>
                    </tr>
                </thead>
                <tbody>
                {interviews.map((interview, i) =>  
                    <>{interview.interviewItems.map((item, ii) => 
                   <> 
                    <UpdateInterviewItem companyName={interview.companies[0].name} studentId={interview.students[0].studentid}
                    studentName={interview.students[0].name} interviewItemId={item._id} interviewId={interview._id} />
                </>
                 )}
                 </>)}
                </tbody>
        </table>    
        {searchedProducts(results)}
        </NavMugicha>
      
      </>
    );
  }
  
  export default Home;
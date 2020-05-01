import React, { useState, useEffect }  from "react";
import { isAuthenticates  } from "../auth";
import { Link } from "react-router-dom";
import { readRecommend } from "../core/apiCore";
import {
  Container,
  Page,
  Grid,
  Card,
  Stamp,
  ContactCard,
  Timeline, Button
} from "tabler-react";
import SiteWrapper from '../templates/SiteWrapper'
import "../styles.css";
import CardStudent from '../templates/CardStudent';

const InterviewPast = props => {
  const [interviews, setInterviews] = useState({});
  const [error, setError] = useState(false);
  const { darwin_myTk, darwin_uid } = isAuthenticates();

  const loadSingleRecommend = recommendId => {
      readRecommend(recommendId, darwin_myTk).then(data => {
          if (data.error) {
              setError(data.error);
          } else {
              setInterviews(data);
          }
      });
  };

  const resultInNice = (result) => {
    if (result === "Nil") {
        return ""
    }
    else if (result === "合格") {
        return "●"
    }
    else if (result === "不合格") {
        return "X"
    }
    else if (result === "三角") {
        return "▲"
    }
    else if (result === "辞退") {
        return "辞退"
    }
    else if (result === "内定") {
        return "内定"
    }
    else {
        return ""
    }
}

  useEffect(() => {
    loadSingleRecommend(props.match.params.recommendId);
  }, []);

  return (
      <SiteWrapper>
        <Container>
          <div>
          <ol class="breadcrumb" aria-label="breadcrumbs">
        <li class="breadcrumb-item"><a href="/user/interviews">面接予定</a></li>
        <li class="breadcrumb-item"><a href="/history/interviews">面接履歴</a></li>
        <li class="breadcrumb-item active" aria-current="page">{interviews.period}</li>
      </ol>
          <div className="list-list">
            <h2 style={{marginBottom: "0"}}>{interviews.period}</h2>
        </div>

          <div class="list-list">
          <table class="table card-table ">
                    <thead>
                      <tr>
                        <th>学生</th>
                        <th class="text-right">レジュメ</th>
                      </tr>
                    </thead>
                    <tbody>
                    {interviews.interviews ? <> {interviews.interviews.map((c,i) => 
                    <tr>
                      <td>
                      <Link to={`/interview/student/${c.student._id}`} target="_blank" className="link">
                      <b> {c.student.studentid} </b> {c.student.name} </Link>
                        
                
                        
                         {c.interviewItems.map((item, i) => 
                        <p style={{margin: "1rem 0"}}> 
                        結果: {resultInNice(item.result)}　<br/>
                        <div className="text-muted">
                        日本語力: {item.japanese_level}　<br/>
                        スキルマッチ: {item.skill_match}　<br/>
                        人物マッチ: {item.character_match}　<br/>
                        コメント: {item.companyComment}　<br/>
                        </div>  </p>)}
                      
                       </td>

                      <td class="text-right">
                      <a href={`/interview/student/${c.student._id}`}  target="_blank"  class="link-primary"><svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"></path><path d="M10 14a3.5 3.5 0 0 0 5 0l4 -4a3.5 3.5 0 0 0 -5 -5l-.5 .5"></path><path d="M14 10a3.5 3.5 0 0 0 -5 0l-4 4a3.5 3.5 0 0 0 5 5l.5 -.5"></path></svg>
                        </a> 
                      </td>
                    </tr>
            )} </> : null} </tbody></table>
          <h3 class="card-title">{console.log(interviews)}</h3>
            </div>
            
          </div>
       </Container>
      </SiteWrapper>
  );
};

export default InterviewPast;

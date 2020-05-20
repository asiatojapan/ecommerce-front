import { API } from '../config';
import queryString from "query-string";

export const studentMatchSearch = (params, token) => {
    const query = queryString.stringify(params);
    // console.log("query", query);
    return fetch(`${API}/jobs/search?${query}`, {
        method: "GET",
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const createJob = (userId, token, job) => {
    return fetch(`${API}/job/create/${userId}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(job)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
};



export const updateJob = (jobId, userId, token, job) => {
    return fetch(`${API}/job/${jobId}/${userId}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: job
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
};

export const getJobs = (userId, token) => {
    return fetch(`${API}/jobs/${userId}`, {
      method: "GET",
      headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
      }
  })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const readJob = (jobId, token) => {
    return fetch(`${API}/job/${jobId}`, {
      method: "GET",
      headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
      }
  })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const readStudentMatched = (jobId, token) => {
    return fetch(`${API}/job/${jobId}/students`, {
      method: "GET",
      headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
      }
  })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const deleteJob = (jobId, userId, token) => {
    return fetch(`${API}/job/${jobId}/${userId}`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};


export const readStudentBestJobs = (studentId, token) => {
    return fetch(`${API}/bestjobs/${studentId}`, {
      method: "GET",
      headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
      }
  })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};
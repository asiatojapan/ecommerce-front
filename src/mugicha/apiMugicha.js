import { API } from "../config";
import queryString from "query-string";

export const list = params => {
    const query = queryString.stringify(params);
    // console.log("query", query);
    return fetch(`${API}/interviews/by/search?${query}`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};


export const readStudentInterview = (studentId, token) => {
    return fetch(`${API}/interviews/students/group/${studentId}`, {
        method: "GET",
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const getStudentsParticipating = (userId, token) => {
    return fetch(`${API}/students/participating`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const readInterview = (interviewId, userId, token) => {
    return fetch(`${API}/interview/${interviewId}/${userId}`, {
        method: "GET",
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const readInterviewItem = (interviewId, interviewItemId, userId, token) => {
    return fetch(`${API}/interview/${interviewId}/${interviewItemId}/${userId}`, {
        method: "GET",
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const getParticipatingUsers = (userId, token) => {
    return fetch(`${API}/users/participating/${userId}`, {
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

export const getCurrentInterviews = (userId, token) => {
    return fetch(`${API}/interviews/mugicha`, {
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
        .catch(err => {
            console.log(err);
        });
};

export const getCurrentInterviewsByStudents = (userId, token) => {
    return fetch(`${API}/interviews/mugicha/by/students`, {
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
        .catch(err => {
            console.log(err);
        });
};

export const getPastInterviews = (userId, token) => {
    return fetch(`${API}/interviews/mugichapast`, {
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
        .catch(err => {
            console.log(err);
        });
};
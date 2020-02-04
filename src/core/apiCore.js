import { API } from "../config";
import queryString from "query-string";


export const getProducts = sortBy => {
    return fetch(`${API}/products?sortBy=${sortBy}&order=desc&limit=100`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const getStudents = () => {
    return fetch(`${API}/students`, {
        method: "GET",
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const readStudent = studentId => {
    return fetch(`${API}/student/${studentId}`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};


export const getCategories = () => {
    return fetch(`${API}/categories`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};


export const getFilteredStudents = (userId, skip, limit, filters = {}) => {
    const data = {
        limit,
        skip,
        filters,
        userId
    };
    return fetch(`${API}/students/by/search`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
};

export const list = params => {
    const query = queryString.stringify(params);
    console.log("query", query);
    return fetch(`${API}/students/search?${query}`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const read = productId => {
    return fetch(`${API}/product/${productId}`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const listRelated = productId => {
    return fetch(`${API}/products/related/${productId}`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};


export const createLike = (userId, student, token) => {
  return fetch(`${API}/like/${userId}`, {
      method: 'POST',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(student)
  })
      .then(response => {
          return response.json();
      })
      .catch(err => {
          console.log(err);
      });
};

export const createUnlike = (userId, student, token) => {
  return fetch(`${API}/unlike/${userId}`, {
      method: 'POST',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(student)
  })
      .then(response => {
          return response.json();
      })
      .catch(err => {
          console.log(err);
      });
};

export const getMyInterviews = (userId) => {
    return fetch(`${API}/interviews/mylist/${userId}`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const getGroupInterviewList = (userId) => {
    return fetch(`${API}/interviews/group/${userId}`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const getGroupInterviewPerson = (studentId, userId) => {
    return fetch(`${API}/interviews/group/${userId}/${studentId}`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const createSubmit = (userId, token) => {
  return fetch(`${API}/submit/${userId}`, {
      method: 'POST',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
      },
  })
};

export const createFav = (studentId, userId, token) => {

  return fetch(`${API}/student/${studentId}/favorites`, {
      method: 'POST',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(userId)
  })
      .then(response => {
          return response.json();
      })
      .catch(err => {
          console.log(err);
      });
};


export const destroyFav = (studentId, user, token) => {
  return fetch(`${API}/student/${studentId}/favorites`,  {
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

export const getFavStudents = (userId) => {
    return fetch(`${API}/students/favorites/${userId}`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const readInterview = interviewId => {
    return fetch(`${API}/interview/${interviewId}`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

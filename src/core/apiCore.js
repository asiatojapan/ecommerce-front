import { API } from "../config";
import queryString from "query-string";

export const getStudents = (userId, token) => {
    return fetch(`${API}/students`, {
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

export const readStudent = (studentId, token) => {
    return fetch(`${API}/student/${studentId}`, {
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

export const readStudentDetails = (studentId, userId, token) => {
    return fetch(`${API}/${userId}/student/details/${studentId}`, {
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


export const getCategories = () => {
    return fetch(`${API}/categories`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const getPushList = (userId) => {
    return fetch(`${API}/list/push/${userId}`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};


export const getFilteredStudents = (userId, skip, limit, status, filters = {}, round, token, tags) => {
    const data = {
        limit,
        status,
        skip,
        filters,
        userId,
        round,
        tags
    };
    return fetch(`${API}/students/by/search`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
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

export const getMyInterviews = (userId, token) => {
    return fetch(`${API}/interviews/mylist/${userId}`, {
        method: "GET",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const getGroupInterviewList = (userId, token) => {
    return fetch(`${API}/interviews/group/${userId}`, {
        method: "GET",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
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

export const createSubmit = (userId, token, rank) => {
  return fetch(`${API}/submit/${userId}`, {
      method: 'POST',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(rank)
  })
};

export const createFavItem = (userId, token, favItem) => {
    return fetch(`${API}/order/favitem/create/${userId}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(favItem)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
  };

  export const createOrder = (userId, token, createOrderData) => {
    return fetch(`${API}/order/create/${userId}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ order: createOrderData })
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
  };



export const createFav = (studentId, userId, token) => {
  return fetch(`${API}/student/${studentId}/favorites`, {
      method: 'POST',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ _id: userId})
  })
      .then(response => {
          return response.json();
      })
      .catch(err => {
          console.log(err);
      });
};


export const destroyFav = (studentId, userId, token) => {
  return fetch(`${API}/student/${studentId}/favorites`,  {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ _id: userId})
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const getFavStudents = (userId, token) => {
    return fetch(`${API}/students/favorites/${userId}`, {
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

export const getOrders = (userId, token) => {
    return fetch(`${API}/order/mylist/${userId}`, {
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

export const readOrder = orderId => {
    return fetch(`${API}/order/${orderId}`, {
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


export const updateInterviewItem = (interviewId, interviewItemId, userId, token, interview) => {
  const data = {
      interviewItemId,
      interview
  };
  console.log(data)
    return fetch(`${API}/interviewitem/${interviewId}/${userId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const listRelated = (studentId, userId, token) => {
    return fetch(`${API}/students/related/${studentId}/${userId}`, {
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

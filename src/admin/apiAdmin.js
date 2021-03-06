import { API } from '../config';
import queryString from "query-string";

export const createCategory = (userId, token, category) => {
    return fetch(`${API}/category/create/${userId}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(category)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
};

export const createStudent = (userId, token, student) => {
    return fetch(`${API}/student/create/${userId}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: student
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
};

export const updateCategory = (categoryId, userId, token, category) => {
    return fetch(`${API}/category/${categoryId}/${userId}`, {
        method: 'PUT',
        headers: {
            // content type?
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(category)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};


export const updateInterview = (interviewId, userId, token, interview) => {
    return fetch(`${API}/interview/${interviewId}/${userId}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: interview
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};



export const getCategory = categoryId => {
    return fetch(`${API}/category/${categoryId}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const getCategories = () => {
    return fetch(`${API}/categories`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};



export const deleteStudent = (studentId, userId, token) => {
    return fetch(`${API}/student/${studentId}/${userId}`, {
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

export const updateStudent = (studentId, userId, token, student) => {
    return fetch(`${API}/student/${studentId}/${userId}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: student
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};


export const getUsers = (userId, token) => {
    return fetch(`${API}/users/${userId}`, {
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

export const getSalesRep = (userId,token) => {
    return fetch(`${API}/users/salesrep/${userId}`, {
        method: 'GET',
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

export const getMyUsers = (userId, token) => {
    return fetch(`${API}/users/myusers/${userId}`, {
      method: 'GET',
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

export const getFilteredProducts = (skip, limit, filters = {}) => {
    const data = {
        limit,
        skip,
        filters
    };
    return fetch(`${API}/products/by/search`, {
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

export const deleteUser = (userId, token) => {
    return fetch(`${API}/user/${userId}`, {
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

export const readUser = (userId, token) => {
    return fetch(`${API}/user/${userId}`, {
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


export const createRec = (studentId, _id, token) => {
  const data = {
      _id
  };
  return fetch(`${API}/rec/${studentId}`, {
      method: 'POST',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
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

export const createInterview = (student, company, token, interview) => {
  const data = {
      student,
      company,
      interview
  };
  return fetch(`${API}/interview/create/${company}`, {
      method: 'POST',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
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

export const createInterviewItem = (interviewId, userId, token, interview) => {
  return fetch(`${API}/interview/${interviewId}/create/${userId}`, {
      method: 'POST',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(interview)
  })
      .then(response => {
          return response.json();
      })
      .catch(err => {
          console.log(err);
      });
};


export const deleteInterview = (interviewId, userId, token) => {
    return fetch(`${API}/interview/${interviewId}/${userId}`, {
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


export const destroyRec = (studentId, _id, token) => {
  const data = {
      _id
  };
  return fetch(`${API}/unrec/${studentId}`, {
      method: 'POST',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
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

export const updateStatus = (userId, status, adminId, token) => {

  const data = {
      status,
      userId
  };
    return fetch(`${API}/students/bulkupdate/${adminId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
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

export const updateInviteStatus = (userId, inviteStatus, adminId, token) => {
  const data = {
      inviteStatus,
      userId
  };
    return fetch(`${API}/students/bulkupdate/invitestatus/${adminId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
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

export const getInterviews = (userId, token) => {
    return fetch(`${API}/interviews/all/${userId}`, {
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

export const getInterview = (interviewId, userId, token) => {
    return fetch(`${API}/interview/${interviewId}/${userId}`, {
        method: 'GET',
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

export const deleteInterviewItem = (interviewId, userId, token, itemId) => {
    const id = {
        itemId
    };
    return fetch(`${API}/interview/${interviewId}/interviewitem/${userId}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(id)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const createPush = (studentId, _id, token) => {
    const data = {
        _id
    };
    return fetch(`${API}/push/${studentId}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
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

  export const destroyPush = (studentId, _id, token) => {
    const data = {
        _id
    };
    return fetch(`${API}/unpush/${studentId}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
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

  export const createHide = (studentId, _id, token) => {
    const data = {
        _id
    };
    return fetch(`${API}/hide/${studentId}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
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

  export const destroyHide = (studentId, _id, token) => {
    const data = {
        _id
    };
    return fetch(`${API}/unhide/${studentId}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
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

export const matchStudent = (userId, token) => {
    return fetch(`${API}/matching/${userId}`, {
        method: 'GET',
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

export const moveRecOne = (userId, token) => {
    // console.log(action)
    return fetch(`${API}/moveownrecommend/${userId}`, {
        method: 'POST',
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

export const recordRecOne = (userId, token) => {
    // console.log(action)
    return fetch(`${API}/recordownrecommend/${userId}`, {
        method: 'POST',
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

export const recordPush = (userId, token) => {
    // console.log(action)
    return fetch(`${API}/recordownpush/${userId}`, {
        method: 'POST',
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

export const moveRecTwo = (userId, token) => {
    // console.log(action)
    return fetch(`${API}/moveownrecommendtwo/${userId}`, {
        method: 'POST',
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

export const moveFavorites = (userId, token) => {
    // console.log(action)
    return fetch(`${API}/moveownfavorites/${userId}`, {
        method: 'POST',
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

export const updateInterviewStatus = (interviewId, status, adminId, token) => {
    const data = {
        status,
        interviewId
    };
      return fetch(`${API}/interviews/bulkupdate/${adminId}`, {
          method: "POST",
          headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
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

  export const updateInterviewEventDay = (interviewId, eventDay, adminId, token) => {
    const data = {
        eventDay,
        interviewId
    };
      return fetch(`${API}/interviews/bulkupdate/eventday/${adminId}`, {
          method: "POST",
          headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
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


  export const massSendJd = (interviewId, adminId, token) => {
    const data = {
        interviewId
    };
      return fetch(`${API}/masssendjd/${adminId}`, {
          method: "POST",
          headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
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

  export const resetLoginDate = (userId, adminId, token) => {
    const data = {
        userId
    };
      return fetch(`${API}/reset/${adminId}`, {
          method: "PUT",
          headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
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

  export const createPreRec = (studentId, _id, token) => {
    const data = {
        _id
    };
    return fetch(`${API}/prerec/${studentId}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
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
  


export const destroyPreRec = (studentId, _id, token) => {
    const data = {
        _id
    };
    return fetch(`${API}/preunrec/${studentId}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
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
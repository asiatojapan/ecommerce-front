import { API } from '../config';

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

export const createProduct = (userId, token, product) => {
    return fetch(`${API}/product/create/${userId}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: product
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
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


/**
 * to perform crud on product
 * get all products
 * get a single product
 * update single product
 * delete single product
 */

export const getProducts = () => {
    return fetch(`${API}/products?limit=undefined`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const deleteProduct = (productId, userId, token) => {
    return fetch(`${API}/product/${productId}/${userId}`, {
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

export const getProduct = productId => {
    return fetch(`${API}/product/${productId}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const updateProduct = (productId, userId, token, product) => {
    return fetch(`${API}/product/${productId}/${userId}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: product
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


export const getUsers = (token) => {
    return fetch(`${API}/users`, {
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

export const getSalesRep = () => {
    return fetch(`${API}/users/salesrep`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const getMyUsers = (userId) => {
    return fetch(`${API}/users/myusers/${userId}`, {
      method: 'GET'
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


export const createRec = (studentId, userId, token) => {

  return fetch(`${API}/rec/${studentId}`, {
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

export const createInterview = (student, user, token, interview) => {
  const data = {
      student,
      user
  };
  return fetch(`${API}/interview/create/${user}`, {
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

export const createUnRec = (studentId, user, token) => {
  return fetch(`${API}/unrec/${studentId}`, {
      method: 'POST',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(user)
  })
      .then(response => {
          return response.json();
      })
      .catch(err => {
          console.log(err);
      });
};

export const getCheckStudents = (userId, status) => {
  const data = {
      status,
      userId
  };
    return fetch(`${API}/students/bulkupdate`, {
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

export const getInterviews = () => {
    return fetch(`${API}/interviews`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

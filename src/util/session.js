import { API } from '../config';

export const login1 = user => {
  return fetch(`${API}/login`, {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json"
    }
  })
};

export const login = user => {
  return fetch(`${API}/signin`, {
      method: 'POST',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
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


export const logout = () => {
  if (typeof window !== 'undefined') {
    // localStorage.removeItem('jwt');
    localStorage.removeItem('darwin_uid');
    localStorage.removeItem('darwin_myTk');
    return fetch(`${API}/signout`, { method: "GET" })
  } 
}

export const checkLoggedIn = async () => {
  const userId = localStorage.getItem('darwin_uid')
  const response = await fetch(`${API}/session/${userId}`);
  let preloadedState = {};
  if (response.ok) {
  const  user  = await response.json();
  // console.log("user", user)
  if (user) {
    preloadedState = {
      session: user
    };
    }
  } 
  return preloadedState
};

export const checkLoggedIn1 = async () => {
  if (typeof window == 'undefined') {
    return false;
  }
  if (localStorage.getItem('darwin_uid')) {
      var userId = localStorage.getItem('darwin_uid')
      var token = localStorage.getItem("darwin_myTk")
      const response = await fetch(`${API}/asdfghjkl/user/${userId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
      })
      try {
        let user = await response.json();
        let preloadedState = {};
          if (user) {
            preloadedState = {
              session: user
            }}
          // console.log(preloadedState)
          return preloadedState;
      } catch(err) {
        localStorage.removeItem('darwin_uid');
        localStorage.removeItem('darwin_myTk');
      }
  }
};

import { API } from '../config';

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

export const signup = user => (
  fetch("api/users", {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json"
    }
  })
);

export const logout = () => (
  fetch("api/session", { method: "DELETE" })
);



export const checkLoggedIn = async () => {
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
      });
      const user  = await response.json();
      let preloadedState = {};
      if (user) {
        preloadedState = {
          session: user
        };
      }
      // console.log(preloadedState)
      return preloadedState;
      ;
  }
};
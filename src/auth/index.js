import { API } from '../config';
import Cookies from 'universal-cookie';

export const signup = user => {
    return fetch(`${API}/signup`, {
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

export const signin = user => {
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

export const authenticate = (data, next) => {
    // if( document.cookie.indexOf("myCata=") < 0) {
     //   const cookies = new Cookies();
    //    cookies.set('myCata', data.token, { path: '/' , maxAge: 1000 });
   //  }
    if (typeof window !== 'undefined') {
        localStorage.setItem('darwin_myTk', data.token);
        localStorage.setItem('darwin_uid', data.user._id);
       // localStorage.setItem('jwt', JSON.stringify(data));
        next();
    }
};

export const signout = next => {
    if (typeof window !== 'undefined') {
        // localStorage.removeItem('jwt');
        localStorage.removeItem('darwin_uid');
        localStorage.removeItem('darwin_myTk');
        next();
        return fetch(`${API}/signout`, {
            method: 'GET'
        })
            .then(response => {
                // console.log('signout', response);
            })
            .catch(err => console.log(err));
    }
};

export const isAuthenticates = () => {
    if (typeof window == 'undefined') {
        return false;
    }
    if (localStorage.getItem('darwin_myTk')) {
        var a = {"darwin_myTk": localStorage.getItem('darwin_myTk'), "darwin_uid":localStorage.getItem('darwin_uid')  }
        return a
    } else {
        return false;
    }
};

export const getUser = userId => {
    return fetch(`${API}/user/${userId}`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const forgotPassword = email => {
    return fetch(`${API}/forgot-password`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(email)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const resetPassword = resetInfo => {
    return fetch(`${API}/reset-password`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(resetInfo)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};


export const resetPasswordStudent = resetInfo => {
    console.log(resetInfo)
    return fetch(`${API}/student/reset-password`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(resetInfo)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};
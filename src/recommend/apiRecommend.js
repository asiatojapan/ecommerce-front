import { API } from "../config";

export const createRecHistory = (userId, token, createRecData) => {
    return fetch(`${API}/recommend/create/${userId}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ recommend: createRecData })
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
  };


  export const getMyRecommendHistory = (userId, token) => {
    return fetch(`${API}/myrecommend/${userId}`, {
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


export const getRecommendHistory = (userId, token) => {
    return fetch(`${API}/recommends/${userId}`, {
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

export const getRecommendCurrent = (userId, token) => {
    return fetch(`${API}/exportcurrentrec/${userId}`, {
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

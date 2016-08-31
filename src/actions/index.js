import $ from 'jquery';
import fetch from 'isomorphic-fetch';
import axios from 'axios';
export const GET_TOKEN = 'GET_TOKEN';

export const GET_TODO = 'GET_TODO';
export const ADD_TODO = 'ADD_TODO';
export const EDIT_TODO = 'EDIT_TODO';
export const DEL_TODO = 'DEL_TODO';

export const FETCH_LABELS = 'FETCH_LABELS';
export const CREAT_LABEL = 'CREAT_LABEL';
export const EDIT_LABEL = 'EDIT_LABEL';
export const DEL_LABEL = 'DEL_LABEL';


function getToken(token) {
  return {
    type: GET_TOKEN,
    token : token
  }
}
/*
    label Actions
*/
function getLabel(data) {
  return {
    type: FETCH_LABELS,
    data : data
  }
}
function deleteLabel(id) {
  return {
    type: DEL_LABEL,
    id : id
  }
}
function editLabel(data) {
  return {
    type: EDIT_LABEL,
    data : data
  }
}
function creatLabel(label) {
  return {
    type: CREAT_LABEL,
    payload: {
      label : label
    }
  }
}

/*
  label ACTIONS
*/
function getCards(data) {
  return {
    type: GET_TODO,
    payload: {
      data : data
    }
  }
}
function addCard(data) {
  console.log('ADD_TODO_ACTION',data);
  return {
    type: ADD_TODO,
    data : data
  }
}
function editCard(object) {
  console.log('EDIT_TODO_ACTION',object);
  return{
    type: EDIT_TODO,
    payload: {
      id : object.id,
      name : object.name,
      body : object.body
    }
  }
}
export function deleteCard(id) {
  console.log('DEL_TODO_ACTION');
  return{
    type: DEL_TODO,
    id : id
  }
}
/*
 ASYNC CALL OF TOKEN
*/
export function getTokenCall(data) {
  return function (dispatch) {
            var authOptions = {
                method : 'GET',
                 url: "http://54.199.244.49/auth/login/",
                 data: JSON.stringify({
                   username: data.username,
                   password: data.password
                 }),
                json : true
            }
            axios(authOptions)
                .then(function(response) {
                  console.error('FETCH_LABELS IS SUCCESS',response.data);
                  dispatch(getToken(response.data.Token));
                  localStorage.setItem("token", response.data.Token);
                })
                .catch(function(err){
                  console.error('FETCH_LABELS EDIT IS NOT WORKING',err);
                })
            }
}
/*
  ASYNC CALLS OF LABEL
*/
export function getLabelCall(token) {
  return function (dispatch) {
            var authOptions = {
                method : 'GET',
                url: "http://54.199.244.49/todo/label/",
                headers:{
                   Authorization: "Token "+token,
                },
                json : true
            }
            axios(authOptions)
                .then(function(response) {
                  console.error('FETCH_LABELS IS SUCCESS',response.data);
                  dispatch(getLabel(response.data));
                })
                .catch(function(err){
                  console.error('FETCH_LABELS EDIT IS NOT WORKING',err);
                })
            }
}

export function editLabelCall(data) {
  return function (dispatch) {
            var authOptions = {
                method : 'POST',
                url: "http://54.199.244.49/todo/label/"+data.id+"/",
                headers:{
                   Authorization: "Token "+data.token,
                },
                data:JSON.stringify(data.newLabel),
                json : true

            }
            axios(authOptions)
                .then(function(response) {
                  console.error('LABEL EDIT IS SUCCESS',response.data);
                  dispatch(editLabel({
                      id : response.data.id,
                      name : response.data.name
                  }));
                })
                .catch(function(err){
                  console.error('LABEL EDIT IS NOT WORKING',err);
                })
            }
}
export function creatLabelCall(data) {
  return function(dispatch) {
            var authOptions = {
                method : 'POST',
                url: "http://54.199.244.49/todo/label/",
                dataType: 'json',
                data: JSON.stringify({
                  name: data.label
                }),
                headers: {
                 "Authorization": "Token "+data.token
                },
                json : true
            }
            axios(authOptions)
                .then(function(response) {
                  console.error('LABEL CREATE IS SUCCESS',response.data);
                  dispatch(creatLabel(response.data));
                })
                .catch(function(err){
                  console.error('LABEL CREATE IS NOT WORKING',err);
                })
         }
}

export function deleteLabelCall(data) {
  return function(dispatch) {
            var authOptions = {
                method : 'DELETE',
                url: "http://54.199.244.49/todo/label/"+data.id+"/",
                data: JSON.stringify({
                  name: data.label
                }),
                headers: {
                 "Authorization": "Token "+data.token
                },
                json : true
            }
            axios(authOptions)
                .then(function(response) {
                  console.error('LABEL CREATE IS SUCCESS',response);
                  dispatch(deleteLabel(data.id));
                })
                .catch(function(err){
                  console.error('LABEL CREATE IS NOT WORKING',err);
                })
         }
}

/*
  ASYNC  TODO CARDS ACTIONS
*/
export function getCardsCall(token) {
  return function (dispatch) {
            var authOptions = {
                method : 'GET',
                url: "http://54.199.244.49/todo/note/",
                headers:{
                   Authorization: "Token "+token,
                },
                json : true
            }
            axios(authOptions)
                .then(function(response) {
                  console.error('@---FETCH_CARDS IS SUCCESS',response.data);
                  dispatch(getCards(response.data));
                })
                .catch(function(err){
                  console.error('FETCH_CARDS IS NOT WORKING',err);
                })
            }
}

export function editCardCall(value) {
  return function (dispatch) {
            var authOptions = {
                method : 'POST',
                url: "http://54.199.244.49/todo/note/"+value.id+"/",
                dataType: 'json',
                headers: {
                  "Authorization": "Token "+value.token
                },
                data : JSON.stringify({
                 name: value.name,
                 body: value.body
                }),
                json : true
            }
            axios(authOptions)
                .then(function(response) {
                  console.log("@---EDIT CARD SUCCESS",response.data);
                  dispatch( editCard({
                      id : response.data.id,
                      name : response.data.name,
                      body : response.data.body
                  }));
                })
                .catch(function(err){
                  console.error('LABEL EDIT IS NOT WORKING',err);
                })
            }
}
export function addCardCall(value) {
  return function(dispatch) {
            var authOptions = {
                method : 'POST',
                url: "http://54.199.244.49/todo/note/",
                dataType: 'json',
                headers:{
                   'Authorization': "Token "+value.token,
                },
                 data:JSON.stringify(value.data),
                json : true
            }
            axios(authOptions)
                .then(function(response) {
                  console.error('@-----LABEL CREATE IS SUCCESS',response.data);
                  dispatch( addCard(response.data));
                })
                .catch(function(err){
                  console.error('@------LABEL CREATE IS NOT WORKING',err);
                })
         }
}

export function deleteCardCall(data) {
  return function(dispatch) {
            var authOptions = {
                method : 'DELETE',
                url: "http://54.199.244.49/todo/note/"+data.id+"/",
                headers: {
                 "Authorization": "Token "+data.token
                },
                json : true
            }
            axios(authOptions)
                .then(function(response) {
                  console.error('LABEL CREATE IS SUCCESS',response);
                  dispatch( deleteCard(data.id));
                })
                .catch(function(err){
                  console.error('LABEL CREATE IS NOT WORKING',err);
                })
         }
}

import { hashHistory } from "react-router";

import axios from 'axios';
import  Promise from 'es6-promise';

export const GET_TOKEN = 'GET_TOKEN';

export const NOTE_FETCH_CARDS_START = 'NOTE_FETCH_CARDS_START';
export const NOTE_FETCH_FAILED = 'NOTE_FETCH_FAILED';
export const GET_TODO = 'GET_TODO';
export const ADD_TODO = 'ADD_TODO';
export const EDIT_TODO = 'EDIT_TODO';
export const DEL_TODO = 'DEL_TODO';

export const FETCH_LABEL_START = 'FETCH_LABEL_START';
export const FETCH_LABEL_FAILED = 'FETCH_LABEL_FAILED';
export const FETCH_LABELS = 'FETCH_LABELS';
export const CREAT_LABEL = 'CREAT_LABEL';
export const EDIT_LABEL = 'EDIT_LABEL';
export const DEL_LABEL = 'DEL_LABEL';
export const NOTE_LABEL_MANAGEMENT = 'NOTE_LABEL_MANAGEMENT';
export const NOTE_LABEL_EDIT_MANAGEMENT = 'NOTE_LABEL_EDIT_MANAGEMENT';
export const NOTE_LABEL_DEL_MANAGEMENT = 'NOTE_LABEL_DEL_MANAGEMENT';


function getToken(token) {
  return {
    type: GET_TOKEN,
    token : token
  }
}
/*
    label Actions
*/
function fetchLabelStart(){
  return{
    type : FETCH_LABEL_START
  }
}
function fetchLabelFailed(data){
  return{
    type : FETCH_LABEL_FAILED,
    data : data
  }
}
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
  CARD ACTIONS
*/
function fetchingStart(){
  return {
    type : NOTE_FETCH_CARDS_START
  }
}
function fetchingFailed(data){
  
  return {
    type : NOTE_FETCH_FAILED,
    data : data
  }
}
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
function deleteCard(id) {
  console.log('DEL_TODO_ACTION');
  return{
    type: DEL_TODO,
    id : id
  }
}
function noteLabelManagement(data){
  console.log('NOTE_ACTION',data);
  return {
    type : NOTE_LABEL_MANAGEMENT,
    data : data
  }
}

function noteLabelEditManagement(data){
  console.log('NOTE_LABEL_EDIT_MANAGEMENT',data);
  return {
    type : NOTE_LABEL_EDIT_MANAGEMENT,
    data : data
  }
}
function noteLabelDelManagement(data){
  console.log('NOTE_LABEL_EDIT_MANAGEMENT',data);
  return {
    type : NOTE_LABEL_DEL_MANAGEMENT,
    data : data
  }
}
 
/*
 ASYNC CALL OF TOKEN
*/
export function getTokenCall(data) {

  return function (dispatch) {
            let respo,
              authOptions = {
                method : 'POST',
                 url: "http://54.199.244.49/auth/login/",
                 data: JSON.stringify({
                   'username': ''+data.username,
                   'password': ''+data.password
                 }),
                 transformResponse: [function (data) {
                  respo = JSON.parse(data);
                  return JSON.parse(data);
                }],
                json : true
            }
            axios(authOptions)
                .then(function(response) {
                  console.log('GET TOKEN IS SUCCESS',response);
                  localStorage.setItem("token", response.data.Token);
                  dispatch(getToken(response.data.Token));
                  hashHistory.push('/dashboard');
                  // dispatch(getCardsCall(response.data.Token));
                  // dispatch(getLabelCall(response.data.Token));
                })
                .catch((err) =>{
                  console.log('GET TOKEN IS SUCCESS FAILED',respo);
                  dispatch(fetchingFailed(respo.error));
                })
            }
}
/*
  ASYNC CALLS OF LABEL
*/
export function getLabelCall(token) {
  return function (dispatch) {
          let respo;
            dispatch(fetchLabelStart());
            var authOptions = {
                method : 'GET',
                url: "http://54.199.244.49/todo/label/",
                headers:{
                   Authorization: "Token "+token,
                },
                transformResponse: [function (data) {
                  respo = data
                  return data;
                }],
                json : true
            }
            axios(authOptions)
                .then(function(response) {
                  console.log('FETCH_LABELS IS SUCCESS',response.data);
                  dispatch(getLabel(JSON.parse(response.data)));
                })
                .catch(function(err){
                  console.error('FETCH_LABELS EDIT IS NOT WORKING',err,respo);
                  dispatch(fetchLabelFailed(respo))
                })
            }
}

export function editLabelCall(data) {
  return function (dispatch) {
            let respo,
             authOptions = {
                method : 'POST',
                url: "http://54.199.244.49/todo/label/"+data.id+"/",
                headers:{
                   Authorization: "Token "+data.token,
                },
                data:JSON.stringify(data.newLabel),
                transformResponse: [(data) =>{
                  respo = JSON.parse(data);
                  console.error(data);
                  return JSON.parse(data)
                }],
                json : true

            }
            axios(authOptions)
                .then(function(response) {
                  console.log('LABEL EDIT IS SUCCESS',response.data);
                  dispatch(editLabel({
                      id : response.data.id,
                      name : response.data.name
                  }));
                  dispatch(noteLabelEditManagement({
                    id : response.data.id,
                    name : response.data.name
                  }));
                })
                .catch(function(err){
                  console.error('LABEL EDIT IS NOT WORKING',err);
                  dispatch(fetchLabelFailed(respo))
                })
            }
}
export function creatLabelCall(data) {
  return function(dispatch) {
            let respo,
             authOptions = {
                method : 'POST',
                url: "http://54.199.244.49/todo/label/",
                dataType: 'json',
                data: JSON.stringify({
                  name: data.label
                }),
                headers: {
                 "Authorization": "Token "+data.token
                },
                transformResponse: [function (data) {
                  respo = JSON.parse(data)
                  return JSON.parse(data)
                }],
                json : true
            }
            axios(authOptions)
                .then(function(response) {
                  console.log('LABEL CREATE IS SUCCESS',response.data);
                  dispatch(creatLabel(response.data));
                })
                .catch(function(err){
                  console.error('LABEL CREATE IS NOT WORKING',err);
                  dispatch(fetchLabelFailed(respo))
                })
         }
}

export function deleteLabelCall(data) {
  return function(dispatch) {
            let respo,
              authOptions = {
                method : 'DELETE',
                url: "http://54.199.244.49/todo/label/"+data.id+"/",
                data: JSON.stringify({
                  name: data.label
                }),
                headers: {
                 "Authorization": "Token "+data.token
                },
                transformResponse: [function (data) {
                  respo = JSON.parse(data)
                  return JSON.parse(data)
                }],
                json : true
            }
            axios(authOptions)
                .then(function(response) {
                  console.log('LABEL CREATE IS SUCCESS',response);
                  dispatch(deleteLabel(data.id));
                  dispatch(noteLabelDelManagement(data.id));
                })
                .catch(function(err){
                  console.error('LABEL CREATE IS NOT WORKING',err);
                  dispatch(fetchLabelFailed(respo))
                })
         }
}

/*
  ASYNC  TODO CARDS ACTIONS
*/
export function getCardsCall(token) {
  return function (dispatch) {
          let respo;
          dispatch(fetchingStart());
            var authOptions = {
                method : 'GET',
                url: "http://54.199.244.49/todo/note/",
                headers:{
                   Authorization: "Token "+token,
                },
                transformResponse: [function (data) {
                  respo = JSON.parse(data)
                  return data
                }],
                json : true
            }
            axios(authOptions)
                .then(function(response) {
                  console.log('@---FETCH_CARDS IS SUCCESS',response.data);
                  dispatch(getCards(JSON.parse(response.data)));
                })
                .catch(function(err){
                  console.error('FETCH_CARDS IS NOT WORKING',err,respo);
                  dispatch(fetchingFailed(respo.error));     
                })
        }
}

export function editCardCall(value) {
  return function (dispatch) {
            console.log('editCard',value)
            let respo;
            let noteId = null;
            var authOptions = {
                method : 'POST',
                url: "http://54.199.244.49/todo/note/"+value.id+"/",
                dataType: 'json',
                headers: {
                  "Authorization": "Token "+value.token
                },
                transformResponse: [function (data) {
                  respo = JSON.parse(data)
                  return data
                }],
                data : JSON.stringify({
                 name: value.name,
                 body: value.body
                }),
                json : true
            }
            axios(authOptions)
                .then(function(response) {
                  console.log("@---EDIT CARD SUCCESS",response.data);
                  noteId = response.data.id;
                  dispatch( editCard({
                      id : response.data.id,
                      name : response.data.name,
                      body : response.data.body
                  }));
                  dispatch( noteLabelManagementCall({
                              id : value.id,
                              token : value.token,
                              addlabels : value.addLabelsData,
                              deleteLabels : value.deleteLabelData
                          }));
                })
                .catch(function(err){
                  console.error('LABEL EDIT IS NOT WORKING',err,respo);
                  dispatch(fetchingFailed(respo.error));
                })
            }
}
export function addCardCall(value) {
  console.log(value)
  return (dispatch) => {
          let respo,
              noteId = null,
              authOptions = {
                method : 'POST',
                url: "http://54.199.244.49/todo/note/",
                headers:{
                   'Authorization': "Token "+value.token
                },
                data:JSON.stringify(value.data.body),
                transformResponse: [(data) =>{
                  respo = JSON.parse(data);
                  console.error(data);
                  return JSON.parse(data)
                }],
                json : true
            }
            axios(authOptions)
                .then(function(response) {
                  console.log('@-----CARD CREATE IS SUCCESS',response.data);
                  noteId = response.data.id;
                  dispatch( addCard(response.data) );
                  dispatch( noteLabelManagementCall({
                              id : noteId,
                              token : value.token,
                              addlabels : value.data.labelsData,
                              deleteLabels : ""
                          }));
                })
                .catch(function(err){
                  console.error('@------CARD CREATE IS NOT WORKING',err,respo);
                  dispatch(fetchingFailed(respo.error));
                })
         }
}


export function deleteCardCall(data) {
  return function(dispatch) {
            let respo,
              authOptions = {
                method : 'DELETE',
                url: "http://54.199.244.49/todo/note/"+data.id+"/",
                headers: {
                 "Authorization": "Token "+data.token
                },
                transformResponse: [(data) =>{
                  respo = JSON.parse(data);
                  console.error(data);
                  return data
                }],
                json : true
            }
            axios(authOptions)
                .then(function(response) {
                  console.log('LABEL CREATE IS SUCCESS',response);
                  dispatch( deleteCard(JSON.parse(data.id)));
                })
                .catch(function(err){
                  console.error('LABEL CREATE IS NOT WORKING',err);
                  dispatch(fetchingFailed(respo.error));
                })
         }
}

export function noteLabelManagementCall(data) {
  return function(dispatch) {
          console.log('noteLabelManagementCall',data);
            let respo,
              authOptions = {
                method : 'POST',
                url: "http://54.199.244.49/todo/note/"+data.id+"/label/",
                data:JSON.stringify({
                  "add": ""+data.addlabels,
                  "remove": ""+data.deleteLabels
                }),
                headers: {
                 "Authorization": "Token "+data.token
                },
                transformResponse: [(data) =>{
                  respo = JSON.parse(data);
                  console.error(data);
                  return JSON.parse(data)
                }],
                json : true
            }
            axios(authOptions)
                .then(function(response) {
                  dispatch(noteLabelManagement(response.data));
                  console.log('NOTE_LABEL_MANAGEMENT SUCCESS',response);
                })
                .catch(function(err){
                  console.error('NOTE_LABEL_MANAGEMENT FAIL ',err,respo);
                  dispatch(fetchingFailed(respo.error));
                })
         }
}

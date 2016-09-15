import { hashHistory } from "react-router";

import axios from 'axios';
import  Promise from 'es6-promise';

export const GET_TOKEN = 'GET_TOKEN';

export const NOTE_FETCH_START = 'NOTE_FETCH_START';
export const NOTE_FETCH_SUCCESS = 'NOTE_FETCH_SUCCESS';
export const NOTE_FETCH_FAILED = 'NOTE_FETCH_FAILED';
export const GET_TODO = 'GET_TODO';
export const ADD_TODO = 'ADD_TODO';
export const EDIT_TODO = 'EDIT_TODO';
export const DEL_TODO = 'DEL_TODO';
export const NOTE_FETCH_STATUS_NULL = 'NOTE_FETCH_STATUS_NULL';

export const FETCH_LABEL_START = 'FETCH_LABEL_START';
export const FETCH_LABEL_FAILED = 'FETCH_LABEL_FAILED';
export const FETCH_LABEL_SUCCESS = 'FETCH_LABEL_SUCCESS';
export const FETCH_LABELS_NULL = 'FETCH_LABELS_NULL';
export const FETCH_LABELS = 'FETCH_LABELS';
export const CREAT_LABEL = 'CREAT_LABEL';
export const EDIT_LABEL = 'EDIT_LABEL';
export const DEL_LABEL = 'DEL_LABEL';
export const NOTE_LABEL_MANAGEMENT = 'NOTE_LABEL_MANAGEMENT';
export const NOTE_LABEL_EDIT_MANAGEMENT = 'NOTE_LABEL_EDIT_MANAGEMENT';
export const NOTE_LABEL_DEL_MANAGEMENT = 'NOTE_LABEL_DEL_MANAGEMENT';
export const GET_LABELS_NOTES = 'GET_LABELS_NOTES';


function getToken(token) {
  return {
    type: GET_TOKEN,
    token : token
  }
}
/*
    label Actions
*/
function fetchLabelStart(data){
  return{
    type : FETCH_LABEL_START,
    data : data
  }
}
function fetchLabelSuccess(data){
  return{
    type : FETCH_LABEL_SUCCESS,
    data : data
  }
}
function fetchLabelFailed(method,data){
  return{
    type : FETCH_LABEL_FAILED,
    method : method,
    data : data
  }
}
function fetchLabelNull() {
  return{
    type : FETCH_LABELS_NULL
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
export function labelsNote(data) {
  fetchLabelNull();
  fetchingNoteStatusNull();
  
  return {
    type : GET_LABELS_NOTES,
    data : data
  }
}

/*
  CARD ACTIONS
*/
function fetchingNoteStatusNull() {
  return {
    type : NOTE_FETCH_STATUS_NULL
  }
}
function fetchingNoteStart(data) {
  return {
    type : NOTE_FETCH_START,
    data : data
  }
}

function fetchingNoteSuceess(data) {
  return {
    type : NOTE_FETCH_SUCCESS,
    data : data
  }
}

function fetchingNoteFailed(method,data){
  return {
    type : NOTE_FETCH_FAILED,
    method : method,
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
          dispatch(fetchingNoteStart(GET_TOKEN));
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
                  dispatch(fetchingNoteSuceess(GET_TOKEN));
                  hashHistory.push('/dashboard');
                  // dispatch(getCardsCall(response.data.Token));
                  // dispatch(getLabelCall(response.data.Token));
                })
                .catch((err) =>{
                  console.log('GET TOKEN IS SUCCESS FAILED',respo);
                  dispatch(fetchingNoteFailed(GET_TOKEN,respo.error));
                })
            }
}
/*
  ASYNC CALLS OF LABEL
*/
export function getLabelCall(token) {
  return function (dispatch) {
          let respo;
            dispatch(fetchLabelStart(FETCH_LABELS));
            var authOptions = {
                method : 'GET',
                url: "http://54.199.244.49/todo/label/",
                headers:{
                   Authorization: "Token "+token,
                },
                transformResponse: [function (data) {
                  respo = data
                  return JSON.parse(data);
                }],
                json : true
            }
            axios(authOptions)
                .then(function(response) {
                  console.log('FETCH_LABELS IS SUCCESS',response.data);
                  dispatch(fetchingNoteStatusNull());
                  dispatch(getLabel(response.data));
                  dispatch(fetchLabelSuccess(FETCH_LABELS))
                })
                .catch(function(err){
                  console.error('FETCH_LABELS EDIT IS NOT WORKING',err,respo);
                  dispatch(fetchLabelFailed(FETCH_LABELS,respo))
                })
            }
}

export function editLabelCall(data) {
  return function (dispatch) {
            dispatch(fetchLabelStart(EDIT_LABEL));
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
                  dispatch(fetchingNoteStatusNull());
                  dispatch(editLabel({
                      id : response.data.id,
                      name : response.data.name
                  }));
                  dispatch(noteLabelEditManagement({
                    id : response.data.id,
                    name : response.data.name
                  }));
                  dispatch(fetchLabelSuccess(EDIT_LABEL))
                })
                .catch(function(err){
                  console.error('LABEL EDIT IS NOT WORKING',err);
                  dispatch(fetchLabelFailed(EDIT_LABEL,respo))
                })
            }
}
export function creatLabelCall(data) {
  return function(dispatch) {
            dispatch(fetchLabelStart(CREAT_LABEL));
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
                  dispatch(fetchingNoteStatusNull());
                  dispatch(creatLabel(response.data));
                  dispatch(fetchLabelSuccess(CREAT_LABEL))
                })
                .catch(function(err){
                  console.error('LABEL CREATE IS NOT WORKING',err);
                  dispatch(fetchLabelFailed(CREAT_LABEL,respo))
                })
         }
}

export function deleteLabelCall(data) {
  return function(dispatch) {
            dispatch(fetchLabelStart(DEL_LABEL));
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
                  dispatch(fetchingNoteStatusNull());
                  dispatch(deleteLabel(data.id));
                  dispatch(noteLabelDelManagement(data.id));
                  dispatch(fetchLabelSuccess(DEL_LABEL));
                })
                .catch(function(err){
                  console.error('LABEL CREATE IS NOT WORKING',err);
                  dispatch(fetchLabelFailed(DEL_LABEL,respo))
                })
         }
}

/*
  ASYNC  TODO CARDS ACTIONS
*/
export function getCardsCall(token) {
  return function (dispatch) {
          dispatch(fetchingNoteStart(GET_TODO));
          let respo;
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
                  dispatch(fetchLabelNull());
                  dispatch(getCards(JSON.parse(response.data)));
                  dispatch(fetchingNoteSuceess(GET_TODO))
                })
                .catch(function(err){
                  console.error('FETCH_CARDS IS NOT WORKING',err,respo);
                  dispatch(fetchingNoteFailed(GET_TODO,respo.error));
                })
        }
}

export function editCardCall(value) {
  return function (dispatch) {
            dispatch(fetchingNoteStart(EDIT_TODO));
            console.error('editCard',value)
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
                  return JSON.parse(data)
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
                  dispatch(fetchLabelNull());
                  noteId = response.data.id;

                  dispatch( noteLabelManagementCall({
                              id : value.id,
                              token : value.token,
                              addlabels : value.addLabelsData,
                              deleteLabels : value.deleteLabelData
                          }));
                  dispatch( editCard({
                      id : response.data.id,
                      name : response.data.name,
                      body : response.data.body
                  }));
                  dispatch(fetchingNoteSuceess(EDIT_TODO))
                })
                .catch(function(err){
                  console.error('LABEL EDIT IS NOT WORKING',err,respo);
                  dispatch(fetchingNoteFailed(EDIT_TODO,respo.error));
                })
            }
}
export function addCardCall(value) {
  console.log(value)
  return (dispatch) => {
          dispatch(fetchingNoteStart(ADD_TODO));
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
                  dispatch(fetchLabelNull());
                  noteId = response.data.id;
                  dispatch( addCard(response.data) );
                  dispatch( noteLabelManagementCall({
                              id : noteId,
                              token : value.token,
                              addlabels : value.data.labelsData,
                              deleteLabels : ""
                          }));
                 dispatch(fetchingNoteSuceess(ADD_TODO))
                })
                .catch(function(err){
                  console.error('@------CARD CREATE IS NOT WORKING',err,respo);
                  dispatch(fetchingNoteFailed(ADD_TODO,respo.error));
                })
         }
}


export function deleteCardCall(data) {
  return function(dispatch) {
            dispatch(fetchingNoteStart(DEL_TODO));
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
                  return JSON.parse(data)
                }],
                json : true
            }
            axios(authOptions)
                .then(function(response) {
                  console.log('LABEL CREATE IS SUCCESS',response);
                  dispatch(fetchLabelNull());
                  dispatch( deleteCard(data.id));
                  dispatch(fetchingNoteSuceess(DEL_TODO))
                })
                .catch(function(err){
                  console.error('LABEL CREATE IS NOT WORKING',err);
                  dispatch(fetchingNoteFailed(DEL_TODO,respo.error));
                })
         }
}

export function noteLabelManagementCall(data) {
  return function(dispatch) {
          // dispatch(fetchingNoteStart(NOTE_LABEL_MANAGEMENT));
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
                  console.error('NOTE_LABEL_MANAGEMENT SUCCESS ',response);
                  dispatch(noteLabelManagement(response.data));
                  // dispatch(fetchingNoteSuceess(NOTE_LABEL_MANAGEMENT))
                })
                .catch(function(err){
                  console.error('NOTE_LABEL_MANAGEMENT FAIL ',err,respo);
                  // dispatch(fetchingNoteFailed(NOTE_LABEL_MANAGEMENT,respo.error));
                })
         }
}

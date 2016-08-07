export const GET_TODO = 'GET_TODO';
export const ADD_TODO = 'ADD_TODO';
export const EDIT_TODO = 'EDIT_TODO';
export const DEL_TODO = 'DEL_TODO';
export const FETCH_DATA = 'FETCH_DATA';
export const FETCH_REJECTED = 'FETCH_REJECTED';
export const GET_USER_CREDENTAILS = 'GET_USER_CREDENTAILS';
export const FETCH_LABELS = 'FETCH_LABELS';
export const GET_TOKEN = 'GET_TOKEN';
export const CREAT_LABEL = 'CREAT_LABEL'
export const EDIT_LABEL = 'CREAT_LABEL'
export const EDIT_LABEL_DETAILS = 'EDIT_LABEL_DETAILS'
export const LABEL_LIST_VAL = 'LABEL_LIST_VAL';

export function listLabelAction(data) {
  return {
    type: LABEL_LIST_VAL,
    payload: {
      data : data
    }
  }
}
export function editLabelIdAction(id, name) {
  return {
    type: EDIT_LABEL_DETAILS,
    payload: {
      id : id,
      name : name
    }
  }
}
export function editLabelAction(label) {
  return {
    type: EDIT_LABEL,
    payload: {
      label : label
    }
  }
}
export function creatLabelAction(label) {
  return {
    type: CREAT_LABEL,
    payload: {
      label : label
    }
  }
}
export function getToken(token) {
  return {
    type: GET_TOKEN,
    payload: {
      token : token
    }
  }
}
export function addCard(id,name,body) {
  return {
    type: ADD_TODO,
    payload: {
      id : "card_"+id,
      name : name,
      body : body
    }
  }
}
export function getCards(data) {
  return {
    type: GET_TODO,
    payload: {
      data : data
    }
  }
}
export function editCard(id,dec,label) {
  return{
    type: EDIT_TODO,
    payload: {
      id : "card_"+id,
      desc : desc,
      label : label
    }
  }
}
export function deleteCard(id) {
  return{
    type: DEL_TODO,
    payload: {
      id : id
    }
  }
}
export function fetchData(data) {
  return{
    type: FETCH_DATA,
    payload:  {
      data : data,
    }
  }
}
export function fetchRejected(data) {
  return{
    type: FETCH_REJECTED,
    payload: {
      data : data
    }
  }
}
export function getLabelAction(data) {
  return{
    type: FETCH_LABELS,
    payload:  {
      data : data
    }
  }
}

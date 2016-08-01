export const GET_TODO = 'GET_TODO';
export const EDIT_TODO = 'EDIT_TODO';
export const DEL_TODO = 'DEL_TODO';
export const FETCH_DATA = 'FETCH_DATA';
export const FETCH_REJECTED = 'FETCH_REJECTED';
export const GET_USER_CREDENTAILS = 'GET_USER_CREDENTAILS';
export const FETCH_LABELS = 'FETCH_LABELS';
export const GET_TOKEN = 'GET_TOKEN';

export function getToken(token) {
  return {
    type: GET_TOKEN,
    payload: {
      token : token
    }
  }
}

export function addCard(id,dec,label) {
  return {
    type: GET_TODO,
    payload: {
      id : "card_"+id,
      desc : dec,
      label : label
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
export function deleteCard(id,label) {
  return{
    type: DEL_TODO,
    payload: {
      id : "card_"+id,
      label : label
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
    payload:  data
  }
}
export function getLabelAction(data) {
  return{
    type: FETCH_LABELS,
    payload:  data
  }
}

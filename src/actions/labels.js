export const GET_TOKEN = 'GET_TOKEN';

export function getLabelAction(token) {
  return {
    type: GET_TOKEN,
    payload: {
      token : token
    }
  }
}

const REGISTER = 'hyuprint/copon/REGISTER';
const REGISTER_SUCCESS = 'hyuprint/copon/REGISTER_SUCCESS';
const REGISTER_FAIL = 'hyuprint/copon/REGISTER_FAIL';

const initialState = {
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case REGISTER:
      return {
        ...state,
        registering: true,
        registered: false,
        error: null,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        registering: false,
        registered: true,
      };
    case REGISTER_FAIL:
      return {
        ...state,
        uploading: false,
        error: action.error
      };
    default:
      return state;
  }
}

export function register(code) {
  return {
    types: [REGISTER, REGISTER_SUCCESS, REGISTER_FAIL],
    promise: (client) => client.post('/copon', {data: {code: code}}),
  };
}

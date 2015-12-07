const UPLOAD = 'hyuprint/print/UPLOAD';
const UPLOAD_SUCCESS = 'hyuprint/print/UPLOAD_SUCCESS';
const UPLOAD_FAIL = 'hyuprint/print/UPLOAD_FAIL';

const initialState = {
  loaded: false,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case UPLOAD:
      return {
        ...state,
        uploading: true,
        error: null,
      };
    case UPLOAD_SUCCESS:
      return {
        ...state,
        uploading: false,
        uploaded: true,
        user: action.result
      };
    case UPLOAD_FAIL:
      return {
        ...state,
        uploading: false,
        uploaded: false,
        error: action.error
      };
    default:
      return state;
  }
}

export function upload(form) {
  return {
    types: [UPLOAD, UPLOAD_SUCCESS, UPLOAD_FAIL],
    promise: (client) => client.post('/upload', {form: form}),
  };
}

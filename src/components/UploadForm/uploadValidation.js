import memoize from 'lru-memoize';
import {createValidator, required, maxLength} from 'utils/validation';

const uploadValidation = createValidator({
  memo: maxLength(200), // single rules don't have to be in an array
  file: [required],
});
export default memoize(10)(uploadValidation);

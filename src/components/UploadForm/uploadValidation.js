import memoize from 'lru-memoize';
import {createValidator, required, maxLength} from 'utils/validation';

const uploadValidation = createValidator({
  name: [required, maxLength(10)],
  memo: maxLength(200) // single rules don't have to be in an array
});
export default memoize(10)(uploadValidation);

import Account from '../models/account';
import Copon from '../models/copon';

export default function printed(req) {
  if (!req.user) {
    return Promise.reject(new Error('Not logged'));
  }
  return new Promise((resolve, reject) => {
    const {code} = req.body;

    Copon.where({code: code}).findOne((err, copon) => {
      if (err || !copon) {
        reject(new Error('Copon is NotFound'));
        return;
      }
      if (copon.username !== '') {
        reject(new Error('Copon is Used'));
        return;
      }
      copon.username = req.user.username;
      copon.save()
      .then(() => Account.findByIdAndUpdate(req.user._id, {$inc: {cash: 1000}}))
      .then(resolve);
    });
  });
}

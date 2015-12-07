import Account from '../models/account';
import Print from '../models/print';

export default function printed(req) {
  return new Promise((resolve, reject) => {
    const {_id, state} = req.query;
    if (!_id || !state) {
      reject(new Error('parameter is needed'));
      return;
    }
    const pay = req.query.pay || 0;

    Print.findByIdAndUpdate(_id, {state: state}, (err, doc) => {
      if (err) {
        reject(err);
        return;
      }
      const username = doc.username;

      Account.where({username: username}).update({
        $inc: {cash: -pay}
      }, (err) => {
        if (err) {
          reject(err);
          return;
        }
        resolve();
      });
    });
  });
}

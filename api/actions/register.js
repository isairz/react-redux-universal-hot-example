import passport from 'passport';
import Account from '../models/account';

export default function register(req) {
  return new Promise((resolve, reject) => {
    Account.register(new Account({
      username: req.body.username,
      nicname: req.body.nicname,
      cash: 0,
    }), req.body.password, function(err, user) {
      if (err) {
        reject(err);
      }

      passport.authenticate('local')(req, null, function () {
        resolve(user)
      });
    });
  });
}

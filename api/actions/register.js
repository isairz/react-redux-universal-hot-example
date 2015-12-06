import passport from 'passport';
import Account from '../models/account';

export default function register(req) {
  return new Promise((resolve, reject) => {
    Account.register(new Account({
      username: req.body.username,
      nickname: req.body.nickname,
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

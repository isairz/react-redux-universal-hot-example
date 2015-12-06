import passport from 'passport';
import userApi from './user';

export default function login(req) {
  return new Promise((resolve, reject) => {
    passport.authenticate('local', (err, user, info) => {
      if (err || !user) {
        reject(err || {});
        return;
      }
      req.logIn(user, (err) => {
        if (err) {
          reject(err);
          return;
        }
        userApi(req)
        .then(resolve)
        .catch(reject);
      });
    })(req);
  });
}

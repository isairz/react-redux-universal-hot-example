import passport from 'passport';

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
        resolve(user);
      })
    })(req);
  });
}

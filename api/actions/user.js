import Print from '../models/print';

export default function login(req, params) {
  return new Promise((resolve, reject) => {
    if (!req.user) {
      reject(new Error("Not Logged"));
      return;
    }
    Print.find({username: req.user.username}, (err, prints) => {
      resolve({
        username: req.user.username,
        nickname: req.user.nickname,
        cash: req.user.cash,
        requested: prints.reverse().map(print => ({
          filename: print.originalName,
          path: print.path,
          state: print.state,
          date: print.date,
          press: print.press,
        })),
      });
    });
  });
}

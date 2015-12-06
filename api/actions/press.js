import Print from '../models/print';

export default function press(req, params) {
  return new Promise((resolve, reject) => {
    const press = params[0];
    if (!req.user) {
      reject(new Error("Not Logged"));
      return;
    }
    if (!req.user.username != params[0]) {
      reject(new Error("Not Logged"));
      return;
    }
    Print.find({press: press}, (err, prints) => {
      console.log(prints);
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

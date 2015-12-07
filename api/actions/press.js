import Print from '../models/print';

export default function press(req, params) {
  return new Promise((resolve, reject) => {
    const press = params[0];
    Print.find({press: press}, (err, prints) => {
      console.log(prints);
      resolve({
        cash: 50000, // FIXME
        requested: prints.reverse().map(print => ({
          username: print.username,
          nickname: print.nickname,
          memo: print.memo,
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

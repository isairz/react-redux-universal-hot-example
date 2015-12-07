import Print from '../models/print';
import Press from '../models/press';

export default function press(req, params) {
  return new Promise((resolve, reject) => {
    const press = params[0];
    Press.where({name: press}).findOne((err, pressDoc) => {
      if (err || !pressDoc) {
        resolve(err || new Error('Not found Press'));
        return;
      }
      Print.find({press: press}, (err, prints) => {
        resolve({
          cash: pressDoc.cash,
          requested: prints.reverse().map(print => ({
            _id: print._id,
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
  });
}

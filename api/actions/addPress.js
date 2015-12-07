import Press from '../models/press';

export default function press(req, params) {
  return new Promise((resolve, reject) => {
    const press = new Press({
      name: params[0],
      cash: 50000,
    });
    press.save((err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
}

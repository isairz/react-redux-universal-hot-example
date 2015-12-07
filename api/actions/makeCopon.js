import Copon from '../models/copon';

export default function makeCopon(req, params) {
  if (params.length !== 1) {
    return Promise.reject();
  }

  return new Promise((resolve) => {
    const NN = parseInt(params[0], 10);
    const newCopons = [];
    function gen() {
      const code = 10000000 + Math.floor(Math.random() * 10000000);
      const copon = new Copon({code: code, username: ''});

      copon.save((err) => {
        if (!err) {
          newCopons.push(code);
          if (newCopons.length >= NN) {
            resolve(newCopons);
            return;
          }
        }
        gen();
      });
    }
    gen();
  });
}

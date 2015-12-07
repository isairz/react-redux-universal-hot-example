import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import multer from 'multer';
import flash from 'express-flash';
import config from '../src/config';
import * as actions from './actions/index';
import {mapUrl} from 'utils/url.js';
import PrettyError from 'pretty-error';
import http from 'http';
import SocketIo from 'socket.io';
import Account from './models/account';
import Print from './models/print';
import Press from './models/press';
import mongoose from 'mongoose';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import PdfInfo from 'pdfinfo';
import path from 'path';

const pretty = new PrettyError();
const app = express();

const server = new http.Server(app);

const io = new SocketIo(server);
io.path('/ws');

app.use(bodyParser.json());
app.use(cookieParser('react and redux rule!!!!'));
app.use(session({
  secret: 'react and redux rule!!!!',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60*60*24*365 } // a year
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

mongoose.connect('mongodb://localhost/passport_local_mongoose');

const upload = multer({ dest: 'uploads/' });
app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.user) {
    res.status(404).end();
    return;
  }
  const pdf = new PdfInfo(path.join(__dirname, '..', req.file.path));
  pdf.info((err, meta) => {
    if (err) {
      res.status(500).end(err.message);
      return;
    }
    const charge = meta.pages * 50;
    if (req.user.cash < charge) {
      res.status(500).end(meta.pages + '장을 출력하기 위한 잔액이 부족합니다');
      return;
    }
    const print = new Print({
      username: req.user.username,
      nickname: req.user.nickname,
      memo: req.body.memo,
      press: req.body.press,
      path: req.file.path,
      originalName: req.file.originalname,
      pages: meta.pages,
      state: 'ready',
      date: new Date(),
    });
    print.save((dberr) => {
      if (dberr) {
        res.status(500).end(dberr.message);
        return;
      }
      const {username} = req.user;
      const {press} = req.body;
      Account.where({username: username}).update({$inc: {cash: -charge}})
      .then(() => Press.where({name: press}).update({$inc: {cash: -charge}}))
      .then(() => {
        res.status(200).end();
      });
    });
  });
});

app.use((req, res) => {
  const splittedUrlPath = req.url.split('?')[0].split('/').slice(1);

  const {action, params} = mapUrl(actions, splittedUrlPath);

  if (action) {
    action(req, params)
      .then((result) => {
        if (result instanceof Function) {
          result(res);
        } else {
          res.json(result);
        }
      }, (reason) => {
        if (reason && reason instanceof Error) {
          res.status(500).end(reason.message);
        } else if (reason && reason.redirect) {
          res.redirect(reason.redirect);
        } else {
          console.error('API ERROR:', pretty.render(reason));
          res.status((reason && reason.status) || 500).json(reason);
        }
      });
  } else {
    res.status(404).end('NOT FOUND');
  }
});


const bufferSize = 100;
const messageBuffer = new Array(bufferSize);
let messageIndex = 0;

if (config.apiPort) {
  const runnable = app.listen(config.apiPort, (err) => {
    if (err) {
      console.error(err);
    }
    console.info('----\n==> 🌎  API is running on port %s', config.apiPort);
    console.info('==> 💻  Send requests to http://%s:%s', config.apiHost, config.apiPort);
  });

  io.on('connection', (socket) => {
    socket.emit('news', {msg: `'Hello World!' from server`});

    socket.on('history', () => {
      for (let index = 0; index < bufferSize; index++) {
        const msgNo = (messageIndex + index) % bufferSize;
        const msg = messageBuffer[msgNo];
        if (msg) {
          socket.emit('msg', msg);
        }
      }
    });

    socket.on('msg', (data) => {
      data.id = messageIndex;
      messageBuffer[messageIndex % bufferSize] = data;
      messageIndex++;
      io.emit('msg', data);
    });
  });
  io.listen(runnable);
} else {
  console.error('==>     ERROR: No PORT environment variable has been specified');
}

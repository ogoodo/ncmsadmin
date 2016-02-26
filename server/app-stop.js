import express, { Router } from 'express';
import bodyParser from 'body-parser';

let app = express();
let router = Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

router.get('/', (req, res, next) => {
  res.end('Hello World!');
});
app.use('/', router);

app.listen(3000, () => {
  console.log('server listening at port 3000...');
});

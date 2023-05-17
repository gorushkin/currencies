import express from 'express';
import cors from 'cors';
import { onRateHandler } from '../controllers/controllers';
import { errorHandler, errorMiddleWare } from '../utils/errorHandling';

const app = express();

app.use(cors());

app.use(express.json());

app.post(
  '/currencies/api',
  errorHandler(async (req, res) => onRateHandler(req, res)),
);

app.get('/currencies', (_req, res) => {
  res.status(200).send({ message: 'app is running!!!' });
});

app.use(errorMiddleWare);

export { app };

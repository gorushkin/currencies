import { Request, Response, NextFunction } from 'express';

class AppError extends Error {
  status: number;
  message: string;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.message = message;
  }
}

export const errorHandler =
  (controller: (req: Request, res: Response) => Promise<void>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await controller(req, res);
    } catch (error) {
      next(error);
    }
  };

export const errorMiddleWare = (error: AppError, _request: Request, response: Response, _next: NextFunction) => {
  if (!(error instanceof AppError)) {
    return response.status(500).send({ error: 'There is an error' });
  }
  response.status(error.status).send({ error: error.message });
};
export default AppError;

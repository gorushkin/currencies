import { app } from './app/app';
import { config } from './utils/config';

export const init = async (port: number) => {
  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`app started on port ${port}`);
  });
};

// eslint-disable-next-line no-console
init(config.PORT).catch((e: undefined) => console.log(e));

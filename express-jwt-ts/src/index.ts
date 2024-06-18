import prisma from './prisma-client';
import { app, PORT } from './server';

prisma.$connect().then(() => {
  console.info('Connected to MySQL');
  app.listen(PORT, () => {
    console.info(`Server running on http://localhost:${PORT}`);
  });
});

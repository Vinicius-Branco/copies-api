import 'reflect-metadata';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';

import { AppDataSource } from './config/data-source.config';
import { CleanupJob } from './jobs/cleanup.job';
import { errorMiddleware } from './middlewares/error.middleware';
import { loggerMiddleware } from './middlewares/logger.middleware';
import { requestIdMiddleware } from './middlewares/requestId.middleware';
import { RegisterRoutes } from './routes';
import './polyfills';

const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(requestIdMiddleware);
app.use(loggerMiddleware);

// Swagger UI
app.use('/docs', swaggerUi.serve, async (_req: express.Request, res: express.Response) => {
  return res.send(swaggerUi.generateHTML(await import('./swagger.json')));
});

// Register TSOA routes
RegisterRoutes(app);

// Error handling
app.use(errorMiddleware);

// Initialize database connection
AppDataSource.initialize()
  .then(() => {
    console.log('Database connection established');

    // Initialize cron jobs
    new CleanupJob();

    // Start server
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error: any) => {
    console.error('Error during database initialization:', error);
  });

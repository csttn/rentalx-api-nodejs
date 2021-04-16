import express, { Request, Response, NextFunction } from 'express';

//biblioteca do express para trataemnto de erros
import 'express-async-errors';

//documentação
import swaggerUi from 'swagger-ui-express';
import swaggerFile from './swagger.json';

//classe para tratamento de erros
import { AppError } from './errors/AppError';

// typeOrm
import './database';

// intermediario, para abstrair acoplamento e seguir padrão singleton, entregando sempre a mesma instancia criada.
import './shared/container';

//rota indice
import { router } from './routes';

const app = express();

// atribuindo formato json ao express
app.use(express.json());

//criando rota de documentação
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

//atribuindo rotas de recursos da aplicação
app.use(router);

//middlewares para tratamento de erro
app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({ message: err.message });
    }

    return response.status(500).json({
      status: 'error',
      message: `Internal server error -  ${err.message}`,
    });
  }
);

app.listen(3333, () => console.log('Server is running!'));

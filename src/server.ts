import express from 'express';
import { categoriesRoutes } from './routes/categories.routes';
import { specificationsRoutes } from './routes/specifications.routes';

const app = express();

app.use(express.json());

app.listen(3333, () => console.log('Server is running!'));

app.get('/', (request, response) => {
  return response.json({ message: 'Hello World' });
});

//middleware de categories
app.use('/categories', categoriesRoutes);

app.use('/specifications', specificationsRoutes);

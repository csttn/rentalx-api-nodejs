import { Connection, createConnection, getConnectionOptions } from 'typeorm';


// foi removido o host pois não irie executar as duas aplicações no docker 
// somente o banco de dados

// export default async (host = 'database'): Promise<Connection> => {

export default async (): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();

  return createConnection(
    Object.assign(defaultOptions, {
      database:
        process.env.NODE_ENV === 'test'
          ? 'rentalx_test'
          : defaultOptions.database,
    })
  );
};

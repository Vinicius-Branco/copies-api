import { AppDataSource } from './data-source.config';
import { logger } from './logger.config';

export async function initializeDatabase(): Promise<void> {
  try {
    await AppDataSource.initialize();
    logger.info('Conexão com o banco de dados estabelecida com sucesso');
  } catch (error) {
    logger.error('Erro ao conectar com o banco de dados', { error });
    throw error;
  }
}

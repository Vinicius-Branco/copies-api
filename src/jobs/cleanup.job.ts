import cron from 'node-cron';

import { createRequestLogger } from '../config/logger.config';

export class CleanupJob {
  private logger = createRequestLogger('cleanup-job');

  constructor() {
    this.scheduleCleanup();
  }

  private scheduleCleanup(): void {
    // Executa todos os dias à meia-noite
    cron.schedule('0 0 * * *', () => {
      this.logger.info('Iniciando job de limpeza');
      this.cleanup();
    });
  }

  private async cleanup(): Promise<void> {
    try {
      // TODO: Implementar lógica de limpeza
      this.logger.info('Job de limpeza concluído com sucesso');
    } catch (error) {
      this.logger.error('Erro ao executar job de limpeza', { error });
    }
  }
}

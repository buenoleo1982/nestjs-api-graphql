import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

async function generateMigrations(migrationName: string) {
  if (!migrationName) {
    console.error('Por favor, forneça um nome para a migration');
    process.exit(1);
  }

  try {
    console.log('Gerando migration para Oracle...');
    await execAsync(
      `npm run typeorm:oracle migration:generate src/migrations/oracle/${migrationName}`,
    );

    console.log('Gerando migration para Postgres...');
    await execAsync(
      `npm run typeorm:postgres migration:generate src/migrations/postgres/${migrationName}`,
    );

    console.log('Migrations geradas com sucesso!');
  } catch (error) {
    console.error('Erro ao gerar migrations:', error.message);
    process.exit(1);
  }
}

const migrationName = process.argv[2];
generateMigrations(migrationName);

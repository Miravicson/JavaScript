import path from 'node:path';
import { AppDataSource } from './data-source';
import { Transaction } from './entity/Transaction';
import { backupSqlStatement, transformFileToTuple, updateSqlStatement } from './scripts';
import { TransactionService } from './services/TransactionService';

AppDataSource.initialize()
  .then(async () => {
    const scriptInputPath = path.resolve(__dirname, path.join('scripts', 'input.txt'));

    transformFileToTuple(scriptInputPath);
    updateSqlStatement(scriptInputPath);
    backupSqlStatement(scriptInputPath);

    const transactionService = new TransactionService(AppDataSource.getRepository(Transaction));
    await transactionService.updateReferencesToStatus('success');
  })
  .catch((error) => console.log(error));

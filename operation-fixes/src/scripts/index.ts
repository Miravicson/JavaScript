import { appendFileSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

function readTxt(filename: string): string[] {
  const file = readFileSync(filename, 'utf8');
  return file.split('\n').filter((line) => Boolean(line));
}

function convertStringToTuple(stringArr: string[]): string {
  if (stringArr.length === 0 || stringArr[0] === '') return '';
  let tuple = '(';
  for (let i = 0; i < stringArr.length; ++i) {
    const element = stringArr[i];
    if (i + 1 != stringArr.length) {
      tuple += `
      '${element}',`;
    } else {
      tuple += `
      '${element}'
)`;
    }
  }

  return tuple;
}

function genUpdateSqlStatement(sqlTuple: string): string {
  if (!sqlTuple) return '';
  const sqlTemplate = `UPDATE public.transactions SET status_code = '06', status_message = 'FAILED', resolution = true WHERE transaction_reference IN ??;`;
  const query = sqlTemplate.replace('??', sqlTuple);
  return query;
}

function genBackupSqlStatement(sqlTuple: string): string {
  if (!sqlTuple) return '';
  const sqlTemplate = `SELECT transaction_reference, status_code, status_message, resolution FROM public.transactions WHERE transaction_reference IN ??;`;
  const query = sqlTemplate.replace('??', sqlTuple);
  return query;
}

function saveOutput(content: string, filename = 'output.txt', overwrite = true) {
  if (!content) return;
  const fileOutputPath = path.resolve(__dirname, path.join('./output', filename));
  overwrite ? writeFileSync(fileOutputPath, content) : appendFileSync(fileOutputPath, content);
}

function pipe<T>(...func: Function[]) {
  return (arg: T): T => {
    return func.reduce((result, func) => {
      return func(result) as T;
    }, arg);
  };
}

export const transformFileToTuple = pipe<string>(readTxt, convertStringToTuple, saveOutput);
export const updateSqlStatement = pipe<string>(readTxt, convertStringToTuple, genUpdateSqlStatement, (tuple: string) =>
  saveOutput(tuple, 'update.sql'),
);
export const backupSqlStatement = pipe<string>(readTxt, convertStringToTuple, genBackupSqlStatement, (tuple: string) =>
  saveOutput(tuple, 'backup.sql'),
);

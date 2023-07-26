import { AsyncParser } from '@json2csv/node';
import { createWriteStream } from 'node:fs';





export async function saveJsonAsCsv(filePath: string, data: Array<any> | Record<string, any>, ): Promise<void> {
  const output = createWriteStream(filePath, { encoding: 'utf8' });
  const opts = {};
  const transformOpts = {};
  const asyncOpts = {};
  const parser = new AsyncParser(opts, transformOpts, asyncOpts);

  // const csv = await parser.parse(data).promise();
  parser.parse(JSON.stringify(data)).pipe(output);
}
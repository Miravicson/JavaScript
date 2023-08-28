import { XMLBuilder, XMLParser } from 'fast-xml-parser';
import { readFileSync } from 'node:fs';

function readTxt(filename: string) {
  const file = readFileSync(filename, 'utf8');
  return file.toString();
}

interface LoadXmlAndJsonResult {
  xmlObj: string;
  jsonObj: string;
}

export function loadXmlAndJson(filePath: string): LoadXmlAndJsonResult {
  const parser = new XMLParser();
  const NameEnquiryXMLString = readTxt(filePath);
  let jsonObj = parser.parse(NameEnquiryXMLString);

  const builder = new XMLBuilder();
  const xmlObj = builder.build(jsonObj);

  return { xmlObj, jsonObj };
}

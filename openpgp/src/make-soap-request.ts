import axios from 'axios';
import { XMLParser } from 'fast-xml-parser';
export interface SoapRequestOptions {
  url: string;
  headers: Record<string, string>;
  xml: string;
  timeout?: number;
}

export async function sendRequest(url: string, headers: Record<string, string>, xml: string) {
  const parser = new XMLParser();
  try {
    const response = await makeSoapRequest({ url, headers, xml }); // Optional timeout parameter(milliseconds)
    const { body, statusCode } = response;
    const parsedResponse = parser.parse(body as string); // parse body xml
    console.log('Parsed Response', parsedResponse['SOAP-ENV:Envelope']['SOAP-ENV:Body']); // I'm just logging the response
    console.log('StatusCode', statusCode);
  } catch (err) {
    const parsedError = parser.parse(err as string); // parse error xml
    console.error(parsedError['SOAP-ENV:Envelope']); // handle error
  }
}

export async function makeSoapRequest({
  url,
  headers,
  xml,
  timeout = 10000,
}: SoapRequestOptions): Promise<{ body: any; statusCode: number }> {
  console.log('Making soap request');
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url,
      headers,
      data: xml,
      timeout,
    })
      .then((response) => {
        resolve({
          body: response.data,
          statusCode: response.status,
        });
      })
      .catch((error) => {
        if (error.response) {
          console.log(`SOAP fail: ${error}`);
          reject(error.response.data);
        } else {
          console.log(`SOAP FAIL: ${error}`);
          reject(error);
        }
      });
  });
}

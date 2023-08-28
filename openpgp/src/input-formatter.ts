import * as soap from 'soap';
import { sendRequest } from './make-soap-request';

export interface NameEnquiryOptions {
  sessionId: string;
  destinationCode: string;
  channelCode: string;
  accountNumber: string;
}

type TagWithChildren = {
  name: string;
  attrs?: { key: string; value: string }[];
  children: string[];
  value?: undefined;
};

type TagWithValue = {
  name: string;
  attrs?: { key: string; value: string }[];
  value: string;
  children?: undefined;
};

type TagOptions = TagWithChildren | TagWithValue;

class XMLInputFormatter {
  constructor() {}

  private wrapXml(xmlString: string) {
    const wrapString = `
<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"  xmlns:tns="http://www.hydrogenpay.com/" xmlns:http="http://schemas.microsoft.com/ws/06/2004/policy/http" xmlns:msc="http://schemas.microsoft.com/ws/2005/12/wsdl/contract" xmlns:wsu="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd">
  <soap:Body>
    ${xmlString}
  </soap:Body>
</soap:Envelope>
`;
    const finalXml = `<?xml version="1.0" encoding="UTF-8"?>\n${xmlString}`;
    return wrapString;
  }

  private hasChildren(tagOption: TagOptions): tagOption is TagWithChildren {
    return tagOption.children !== undefined;
  }

  private tag(tagOptions: TagOptions) {
    let attrString = '';
    if (tagOptions.attrs) {
      tagOptions.attrs.forEach(({ key, value }) => {
        attrString += `${key}="${value}" `;
      });
    }
    if (this.hasChildren(tagOptions)) {
      let value = '';
      tagOptions.children.forEach((child) => {
        value += `\t${child}\n`;
      });

      return `<${tagOptions.name}${attrString ? ` ${attrString}` : attrString}>\n${value}</${tagOptions.name}>`;
    }
    return `<${tagOptions.name}${attrString ? ` ${attrString}` : attrString}>${tagOptions.value}</${tagOptions.name}>`;
  }

  nameEnquiry(options: NameEnquiryOptions) {
    const sessionId = this.tag({ name: 'SessionID', value: options.sessionId });
    const destinationCode = this.tag({ name: 'DestinationInstitutionCode', value: options.destinationCode });
    const channelCode = this.tag({ name: 'ChannelCode', value: options.channelCode });
    const accountNumber = this.tag({ name: 'AccountNumber', value: options.accountNumber });
    const requestBody = this.tag({
      name: 'nameenquirysingleitem',
      attrs: [{ key: 'xmlns', value: 'http://www.hydrogenpay.com/' }],
      children: [sessionId, destinationCode, channelCode, accountNumber],
    });

    return this.wrapXml(requestBody);
  }
}

export const hydrogenXmlInputFormatter = new XMLInputFormatter();

const HYDROGEN_WSDL = 'https://sandbox-bankai.hydrogenpay.com/eft.wsdl';
const URL = 'http://www.dneonline.com/calculator.asmx?wsdl';

export async function makeRequest() {
  const client = await soap.createClientAsync(URL);
  const args = { intA: 2, intB: 3 };
  client.Add(args, function (err: any, result: any) {
    if (err) {
      console.error(err);
    } else {
      console.log(result);
    }
  });
}

export async function createHydrogenClient() {
  const client = await soap.createClientAsync(HYDROGEN_WSDL, { overridePromiseSuffix: 'Promise' });
  client.on('request', (xml, eid) => {
    console.log(`Request xml`, xml);
    console.log('EID', eid);
  });
  return client;
}

export async function nameEnquirySingleItem() {
  const client = await createHydrogenClient();

  const args = {
    SessionID: Date.now().toString(),
    DestinationInstitutionCode: await 999999,
    ChannelCode: await 1,
    AccountNumber: await 1010101010,
  };

  client.nameenquirysingleitem(args, function (err: any, result: any) {
    if (err) {
      console.error(err);
    } else {
      console.log(`Result`, JSON.stringify(result, null, 2));
    }
  });
}

export async function nameEnquirySingleItem2() {
  const headers = {
    'Content-Type': 'text/xml;charset=UTF-8',
    SOAPAction: 'http://www.hydrogenpay.com/HydrogenPayEft/nameenquirysingleitem',
  };
  const xml = hydrogenXmlInputFormatter.nameEnquiry({
    accountNumber: '1010101010',
    channelCode: '1',
    destinationCode: '999999',
    sessionId: Date.now().toString(),
  });

  await sendRequest(URL, headers, xml);
}

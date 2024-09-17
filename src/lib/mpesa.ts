/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { format } from 'date-fns';

class MpesaDaraja {
  private consumerKey: string;
  private consumerSecret: string;
  private environment: string;
  private passKey: string;
  private baseUrl: string;
  private callBackURL: string;
  private token: string | null;

  constructor() {
    this.consumerKey = process.env.MPESA_CONSUMER_KEY || '';
    this.consumerSecret = process.env.MPESA_CONSUMER_SECRET || '';
    this.passKey = process.env.PASS_KEY || '';
    this.callBackURL = process.env.MPESA_STK_CALLBACK_URL || '';
    this.environment = process.env.MPESA_ENVIRONMENT || 'sandbox';
    this.baseUrl = this.environment === 'sandbox' ? 'https://sandbox.safaricom.co.ke' : 'https://api.safaricom.co.ke';
    this.token = null;
  }

  private async authenticate(): Promise<void> {
    const auth = Buffer.from(`${this.consumerKey}:${this.consumerSecret}`).toString('base64');
    const response = await axios.get(`${this.baseUrl}/oauth/v1/generate?grant_type=client_credentials`, {
      headers: {
        Authorization: `Basic ${auth}`,
      },
    });
    this.token = response.data.access_token;
  }

  private async makeRequest(endpoint: string, method: 'GET' | 'POST', data: any): Promise<any> {
    if (!this.token) {
      await this.authenticate();
    }
    
    const config = {
      method: method,
      url: `${this.baseUrl}${endpoint}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`,
      },
      data: data,
    };

    try {
      const response = await axios(config);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async lipaNaMpesaOnline({
    shortCode,
    phoneNumber,
    amount,
    accountReference,
    transactionDesc,
  }: {
    shortCode: number;
    phoneNumber: number;
    amount: number;
    accountReference: string;
    transactionDesc: string;
  }): Promise<any> {
    const endpoint = process.env.MPESA_STK_ENDPOINT || '';
    const timestamp = format(new Date(), 'yyyyMMddHHmmss');
    const passwordString = shortCode + this.passKey + timestamp;
    const base64Password = Buffer.from(passwordString).toString('base64');
    const data = {
      BusinessShortCode: shortCode,
      Password: base64Password,
      Timestamp: timestamp,
      TransactionType: "CustomerPayBillOnline",
      Amount: amount,
      PartyA: phoneNumber,
      PartyB: shortCode,
      PhoneNumber: phoneNumber,
      CallBackURL: this.callBackURL,
      AccountReference: accountReference,
      TransactionDesc: transactionDesc,
    };
    return this.makeRequest(endpoint, 'POST', data);
  }

  public async querySTKTransactionStatus(shortCode: number, transactionId: string): Promise<any> {
    const endpoint = process.env.MPESA_STK_QUERY_ENDPOINT || '';
    const timestamp = format(new Date(), 'yyyyMMddHHmmss');
    const passwordString = shortCode + this.passKey + timestamp;
    const base64Password = Buffer.from(passwordString).toString('base64');
    const data = {
      BusinessShortCode: shortCode,
      Password: base64Password,
      Timestamp: timestamp,
      CheckoutRequestID: transactionId,
    };

    return this.makeRequest(endpoint, 'POST', data);
  }
}

export default MpesaDaraja;

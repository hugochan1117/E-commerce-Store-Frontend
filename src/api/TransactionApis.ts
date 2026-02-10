import axios from "axios";
import {getAccessToken} from "../authService/FirebaseAuthService.ts";
import type {TransactionDto} from "../ui/data/TransactionDto.type.ts";
import type {StripeType} from "../ui/data/Stripe.type.ts";
import getEnvConfig from "../config/env/EnvConfig.ts";

const baseUrl = getEnvConfig().baseUrl;

export async function createNewTransaction(){
  const response = await axios.post<TransactionDto>(`${baseUrl}/transactions`,
    null,
    {headers:{
        Authorization: `Bearer ${await getAccessToken()}`
      }})
  return response.data;
}

export async function getTransactionByTid(tid:string){
  const response = await axios.get<TransactionDto>(`${baseUrl}/transactions/${tid}`,
    {headers:{
        Authorization: `Bearer ${await getAccessToken()}`
      }})
  return response.data;
}

export async function stripePayment(tid: string){
  const response = await axios.patch<StripeType>(`${baseUrl}/transactions/${tid}/payment`,
    null,
    {headers:{
        Authorization: `Bearer ${await getAccessToken()}`
      }})
  return response.data;
}
export async function verifyingPayment(tid: string) {
  const token = await getAccessToken();
  const response = await axios.patch<TransactionDto>(
    `${baseUrl}/transactions/${tid}/success`,
    null,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
}
export async function getSuccessfulTransactions(){
  const response = await axios.get<TransactionDto[]>(`${baseUrl}/transactions/OrderHistory`,
    {headers:{
        Authorization: `Bearer ${await getAccessToken()}`
      }})
  return response.data;
}
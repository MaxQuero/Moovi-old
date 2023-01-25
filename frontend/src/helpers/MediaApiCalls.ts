import { MediaEnum } from '../interfaces/Media.interface';
import {Movie, TvShow} from "../generated/graphql";
export async function getRequestToken(): Promise<any> {
  console.info('process', process)
  const urlToken = process.env.API_DEFAULT + '/authentication/token/new?api_key=' + process.env.API_KEY;

  return callUrl(urlToken).then((res) => {
    return res.request_token;
  });
}

export async function getUser(params: any): Promise<any> {
  const requestToken = params.get('request_token');
  const urlSession = process.env.BACK_URL + '/user/create';

  const res = await callUrl(urlSession, {
    method: 'POST',
    body: JSON.stringify({ request_token: requestToken }),
    headers: { 'Content-type': 'application/json' },
  });
  return res;
}

export async function callUrl(url: string, options?: any): Promise<any> {
  try {
    const res: any = await fetch(url, options);
    if (!res.ok) {
      throw new Error(res.statusText);
    }

    return res.json();
  } catch (err: any) {
    throw new Error(err.message);
  }
}

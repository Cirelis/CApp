import axios from 'axios';
import { CONFIG } from 'src/global-config';

export async function getKeycloak(): Promise<string> {
    const user = CONFIG.backendUser;
    const pw = CONFIG.backendPw;
  
    const body = {
      username: user,
      password: pw,
    };
    const url: string = `${CONFIG.backendServer}/auth`;
    let key: string = '';
    try {
      const response = await axios.post(url, body);
      if (response.status === 200) {
        key = response.data.access_token;
      }
    } catch (error:any) {
      console.log(error);
    }
    return key;
  }
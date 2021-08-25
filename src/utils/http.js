import axios from 'axios';
import { apiKey } from '../config';

export const sendData = async (url, data) => {
  try {
    const response = await axios.post(url + apiKey, data);
    console.log(response.data);
  } catch (error) {
    console.warn(error.response.data.error.message);
  }
};

// panaudoti sendData AuthForm viduje

// prisiloginus, nunaviguoti i home page useHistory()

// pakeistus slaptazodi naviguoti i home page\ useHistory()

// prideti geresni UI klaidu ir sekmingu operaciju atvaizdavimui (toastify? maybe

// headeryje prideti prisijungusio vartotojo email

// dublikuoti ProfileForm componenta ir pritaikyti ji kad atnaujinti displayName (email lengviau)
// headeryje atvaizduoti DisplayName jei toks yra arba Email
// https://firebase.google.com/docs/reference/rest/auth#section-update-profile

//// hard ++
//https://firebase.google.com/docs/auth/web/google-signin
// pasidaryti prisijungima per google account. ijungti consoleje ir padaryti kad veiktu

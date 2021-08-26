import axios from 'axios';
import { apiKey } from '../config';

export const sendData = async (url, data) => {
  try {
    const response = await axios.post(url + apiKey, data);
    // console.log(response.data.idToken);
    return response.data.idToken;
  } catch (error) {
    console.log('Catch block');
    console.log(error.response.data.error.message);
    alert('Error: ' + error.response.data.error.message);
    return false;
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

// panaudoti localStorage ir issaugoti userio prisijungimo informacija (token)
// kai prisijungiam

// pacioje contexto pradzioje pasitikrinti ar turim localstorage issaugoje
// tokena ir jei turim panaudoti ji

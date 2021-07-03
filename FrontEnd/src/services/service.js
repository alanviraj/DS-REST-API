import axios from "axios";

const  ADD_PAYMENT_URL = "http://localhost:8080/api/v1/appPayment";
const  GET_PIN = "http://localhost:8080//mobilenumbers/+94767185502/otp";
const  VERIFY_PIN = "http://localhost:8080//mobilenumbers/+94767185502/otps"
class Service{

    addPayment(payment){
        return axios.post(ADD_PAYMENT_URL,payment);
    }
    sendPin(){
        return axios.post(GET_PIN);
    }
    getPinVerify(pinNumber){
        return axios.put(VERIFY_PIN,pinNumber);
    }
}

export default new Service()
import http from "../httprequests";


class deliverData{
    
    create(data){
        return http.post("/deliveries", data);
    }
}

export default new deliverData();
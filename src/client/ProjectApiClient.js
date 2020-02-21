import Axios from "axios";

export default class ProjectApiClient {
    static getPage(token,no,len){
        return Axios.get("/project/page/"+len+"/"+no,{
            headers:{
                "x-api-key":token
            }
        })
    }
}
import Axios from "axios";

export default class ContentApiClient{
    static getContent(token,contentId){
        return Axios.get('/content/'+contentId,{
            headers:{
                "x-api-key":token
            }
        })
    }
}
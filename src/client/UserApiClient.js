import Axios from "axios";
export default  class UserApiClient {
    static logIn(email,password){
        return Axios.post('/user/login',{
            "email":email,
            "password":password
        },{})
    }
}
import React from "react";
import Grid from "@material-ui/core/Grid";
import {Box, Card, CardActions} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import UserApiClient from "../client/UserApiClient";

export default function LogIn(props) {
    const [values, setValues] = React.useState({
        password: '',
        userName: ''
    });

    const handleChange = prop => event => {
        setValues({ ...values, [prop]: event.target.value });
    };

    // eslint-disable-next-line no-unused-vars
    const [cookies, setCookie, removeCookie] = props.cookie;

    function logIn() {
        UserApiClient.logIn(values.userName,values.password).then(function (response) {
            setCookie('token',response.data)
        })
    }
    return (<div>
        <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            style={{position: 'absolute',
                top: 0,
                bottom: 0}}
        >
            <Box
                width={{xs : 1 / 2 , md : 1/ 3, lg:1/4}}>
                <Card>
                    <CardContent>
                    <Typography style={{
                        fontSize: 14,
                    }} color="textSecondary" gutterBottom>
                        请登录
                    </Typography>
                        <TextField
                            label="用户名"
                            variant="outlined"
                            margin={"dense"}
                            value={values.userName}
                            onChange={handleChange('userName')}
                            fullWidth/>
                        <FormControl fullWidth variant="outlined">
                            <TextField

                                variant="outlined"
                                label="密码"
                                id="outlined-adornment-password"
                                type={'password'}
                                value={values.password}
                                margin={"dense"}
                                onChange={handleChange('password')}
                            />
                        </FormControl>
                    </CardContent>
                    <CardActions>
                        <Button
                            variant="outlined"
                            color="primary"
                            onClick={()=>(logIn())}>
                            登录
                        </Button>
                    </CardActions>
                </Card>
            </Box>
        </Grid>
    </div>)
}
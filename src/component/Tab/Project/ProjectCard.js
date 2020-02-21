import React, {useState} from "react";
import {Box, Card, CardContent} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import ContentApiClient from "../../../client/ContentApiClient";
import ImageIcon from "@material-ui/icons/Image"
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import List from "@material-ui/core/List";
import Alert from '@material-ui/lab/Alert';
import Image from "material-ui-image"
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
export default function (props) {
        const projectObj = props.project;
        const [imgSrc,setImgSrc] = useState("NO_IMG");
        const [shouldLoad,setShouldLoad] = useState(true);
        const [dialog,setDialog] = useState(false);
        if(props.project.contents.length !== 0 && shouldLoad) ContentApiClient.getContent(props.token,props.project.contents[0].id).then(function (response) {
            setShouldLoad(false);
            setImgSrc(response.data);
        });
        return<Box style={{margin:10,width:{xs:1,sm:1/2,md:1/4,lg:1/8}}}>
            <Card style={{width: 200,height:200}}>
                <CardActionArea style={{height:"100%"}} onClick={()=>setDialog(true)}>
                    {imgSrc !== "NO_IMG" ? <CardMedia
                        component="img"
                        alt="Project Image"
                        height="100"
                        image={imgSrc}
                        title="Project Image"
                    /> : <ImageIcon/>}
                        <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                        {projectObj.title}
                                </Typography>
                            <Typography variant="subtitle1">{projectObj.description}</Typography>
                        </CardContent>
                </CardActionArea>
            </Card>
            <ProjectDialog open={dialog} onClose={()=>setDialog(false)} project={projectObj} token={props.token}/>
        </Box>

}

function ProjectDialog(props) {
    const { onClose, selectedValue, open, project,token } = props;
    const [contents,setContents] = useState([]);
    const [shouldLoad,setShouldLoad] = useState(true);

    const handleClose = () => {
        onClose(selectedValue);
    };

    if(shouldLoad){
        setShouldLoad(false);
        for(let contentEntry of project.contents){
            ContentApiClient.getContent(token,contentEntry.id).then(function (response) {
                setContents(contents.concat([response.data]));
            })
        }
    }
    return (
        <Dialog onClose={handleClose}
                aria-labelledby="simple-dialog-title"
                open={open}
                maxWidth={50}>
            <DialogTitle id="simple-dialog-title" onClose={handleClose}>{project.title}</DialogTitle>
            <DialogContent dividers>
            <Typography variant="subtitle1">{project.description}</Typography>
                <List>
                    {project.objectives.map(obj=><ListItemAvatar>
                        <Alert severity="info" icon={false}>
                            {obj.title}
                        </Alert>
                    </ListItemAvatar>)}
                </List>
                <List>
                {contents.map(obj=><ListItemAvatar><Image src={obj}/></ListItemAvatar>)}
            </List>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={handleClose} color="primary">
                    Join
                </Button>
            </DialogActions>
        </Dialog>
    );
}
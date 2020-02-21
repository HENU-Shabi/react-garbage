import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import ProjectCard from "./Project/ProjectCard";
import ProjectApiClient from "../../client/ProjectApiClient";
import Grid from "@material-ui/core/Grid";
import InfiniteScroll from 'react-infinite-scroller'
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(1),
            width: theme.spacing(16),
            height: theme.spacing(16),
        },
    },
}));

export default function Project(props) {
    // eslint-disable-next-line no-unused-vars
    const classes = useStyles();
    // eslint-disable-next-line no-unused-vars
    const [cookies, setCookie, removeCookie] =  props.cookie;
    // eslint-disable-next-line no-unused-vars
    const  [projectList,setProjectList] = React.useState([]);
    const [page,setPage] = React.useState(0);
    const [last,setLast] = React.useState(false);
    let load = function(){
        ProjectApiClient.getPage(cookies.token,page,20).then(function (response) {
            if(response.data.pageable.pageNumber === response.data.totalPages - 1){
                setLast(true);
            }
            let list = [];
            for(let projectEntry of response.data.content){
                list.push(projectEntry)
            }
            setProjectList(projectList.concat(list));
            setPage(page + 1)
        });

    };

    return<div style={{flexGrow:1,marginTop:"2em"}}>
        <Grid container spacing={3}>
            <Grid lg={2} md={2}/>
            <Grid lg={8} md={8}>
            <InfiniteScroll loadMore={load}
                            hasMore={!last}
                            loader={<div><CircularProgress color="secondary" /></div>}
                            dataLength={projectList.length}>

                    {
                        projectList.map((obj)=> <div style={{display:"inline-block"}}><ProjectCard project={obj} token={cookies.token}/></div>)
                    }

            </InfiniteScroll>
            </Grid>
            <Grid lg={2} md={2}/>
        </Grid>
    </div>
}
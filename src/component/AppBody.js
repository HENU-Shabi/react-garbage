import React from "react";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import MenuIcon from '@material-ui/icons/Menu';
import {AccountCircle} from "@material-ui/icons";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import {makeStyles} from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import AccountTree from '@material-ui/icons/AccountTree';
import EmojiObjects from '@material-ui/icons/EmojiObjects';
import Project from "./Tab/Project";
import Objective from "./Tab/Objective";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    list: {
        width: 250,
    },
}));

export default function AppBody(props){
    const classes = useStyles();
    const tabList=[{
        title:"项目",
        icon:<AccountTree/>,
        component:<Project cookie={props.cookie}/>
    }, {
        title:"意向",
        icon:<EmojiObjects/>,
        component:<Objective/>
    }];
    // eslint-disable-next-line no-unused-vars
    const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [state, setState] = React.useState({
        drawer:false,
    });
    const [tab,setTab] = React.useState({
        currentTab : tabList[0].component
    })



    const toggleDrawer = ( ) => event => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ currentTab:state.currentTab,drawer: !state.drawer});
    };

    const open = Boolean(anchorEl);

    const handleMenu = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const sideList = ()=> (
        <div
            className={classes.list}
            role="presentation"
            onClick={toggleDrawer( )}
            onKeyDown={toggleDrawer( )}
        >
            <List>
                {tabList.map((obj) => (
                    <ListItem button key={obj.title} onClick={()=>setTab({currentTab: obj.component})}>
                        <ListItemIcon>{obj.icon}</ListItemIcon>
                        <ListItemText primary={obj.title} />
                    </ListItem>
                ))}
            </List>
            <Divider />

        </div>
    );

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={toggleDrawer()}>
                        <Drawer open={state.drawer} onClose={toggleDrawer( )}>
                            {sideList()}
                        </Drawer>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Photos
                    </Typography>
                    {auth && (
                        <div>
                            <IconButton
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={open}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleClose}>Profile</MenuItem>
                                <MenuItem onClick={handleClose}>My account</MenuItem>
                            </Menu>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
            {tab.currentTab}
        </div>
    );
}
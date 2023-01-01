import * as React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";

import {v4 as uuidv4} from 'uuid';


import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

import SideBarItems from "../components/SideBarItems";
import ResetDataModal from "./ResetDataModal";
import UpdateAccountModal from "./UpdateAccountModal";

import { useAccount } from "./hooks/useAccount";
import { CREATE_ITEM_MUTATION, DELETE_ITEM_MUTATION } from "../graphql";

const drawerWidth = 240;

const BtnWrapper = styled("div")({
  position: "absolute",
  right: "0",
  transform: "translate(-5%,0%)",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-around",
  width: "360px",
});

const btnStyle = {
  borderRadius: "8px",
  backgroundColor: "#32b5b2",
  color: "white",
  "&:hover": {
    backgroundColor: "#2ba2a0",
  },
};

const transformStyle = {
  borderRadius: "8px",
  position: "absolute",
  left: "50%",
  top: "10%",
  transform: "translate(-50%,-50%)",
};

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function Appframe() {
  const { signin, me, accountData } = useAccount();
  const [open, setOpen] = React.useState(false);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [reset, setReset] = React.useState(false);
  const navigate = useNavigate()

  const [createItem] = useMutation(CREATE_ITEM_MUTATION);
  const [deleteItem] = useMutation(DELETE_ITEM_MUTATION);

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    console.log("in handleModalClose");
    setModalOpen(false);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleNewDataCreated = (data) => {
    console.log("in handleNewDataCreated");
    createItem({
      variables: {
        input: {
          id: uuidv4(),
          ...data,
        }
      },
    });
  }

  const handleResetAllData = () => {
    console.log("in handleResetAllData");
    accountData.items.forEach(item => {
      deleteItem({
        variables: {
          input: {
            id: item.id,
          }
        },
      });
    })
  }


  const appFrame = (
    <Box sx={{ display: "flex" }}>
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {me ? me + "'s" : "My"} Account
          </Typography>
          <BtnWrapper>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setReset(true)}
              style={btnStyle}
            >
              Reset all data
            </Button>
            <ResetDataModal
              open={reset}
              handleModalClose={() => setReset(false)}
              onSubmitEdit={handleResetAllData}
              data={accountData}
            />
            <Button onClick={handleModalOpen} style={btnStyle}>
              Create New data
            </Button>
            <UpdateAccountModal
              open={modalOpen}
              handleModalClose={handleModalClose}
              onSubmitEdit={handleNewDataCreated}
              data={{}}
              title="Create New Data"
            />
          </BtnWrapper>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#cad8f8",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <SideBarItems handleDrawerClose={handleDrawerClose} />
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <Outlet />
      </Main>
    </Box>
  );

  const loginFrame = (
    <>
        <h1 align="center">Please sign in first! </h1>
        <Button
        variant="contained"
        color="primary"
        onClick={() => navigate('/signin')}
        style={btnStyle && transformStyle}
        >
          direct to sign in page
        </Button>
    </>
  );

  return signin ? appFrame : loginFrame;
}

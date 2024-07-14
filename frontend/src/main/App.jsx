import * as React from "react";
import { BrowserRouter } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Routes from "./routes";
import Footer from "../common/components/Footer";
import Header from "../common/components/Header";
import Sidebar from "../common/components/Sidebar";
import Messanger from "../common/utils/Messanger";

const mdTheme = createTheme();

export default function App(props) {
    const [open, setOpen] = React.useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (
        <ThemeProvider theme={mdTheme}>
            <BrowserRouter>
                <Box sx={{ display: "flex" }}>
                    <CssBaseline />
                    <Header setLocale={props.setLocale} toggleDrawer={toggleDrawer} open={open} />
                    <Sidebar
                        locale={props.locale}
                        user={props.user}
                        toggleDrawer={toggleDrawer}
                        open={open}
                    />
                    <Box
                        component="main"
                        sx={{
                            backgroundColor: (theme) =>
                                theme.palette.mode === "light"
                                    ? theme.palette.grey[100]
                                    : theme.palette.grey[900],
                            flexGrow: 1,
                            height: "100vh",
                            overflow: "auto",
                        }}
                    >
                        <Toolbar />
                        <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
                            <Grid
                                container
                                direction="row"
                                justify="center"
                                alignItems="center"
                            >
                                <Grid item xs={12} md={12} lg={12}>
                                    <Paper
                                        sx={{
                                            p: 2,
                                            display: "flex",
                                            flexDirection: "column",
                                        }}
                                    >
                                        <Routes locale={props.locale} user={props.user} />
                                    </Paper>
                                </Grid>
                            </Grid>
                            <br></br>
                            <Footer sx={{ pt: 4 }} />
                        </Container>
                    </Box>
                    <Messanger />
                </Box>
            </BrowserRouter>
        </ThemeProvider>
    );
}

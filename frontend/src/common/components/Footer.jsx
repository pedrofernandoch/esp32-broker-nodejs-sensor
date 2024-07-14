import React from "react";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import logo from "../../assets/logo.png";

export default function Copyright() {
    return (
        <>
            <Typography variant="body2" color="textSecondary" align="center">
                <img src={logo} alt="Logo" width="350px" />
                <br />
                <br />
                {"Copyright © "}
                <Link color="inherit" href="https://www.icmc.usp.br/">
                    ICMC - Instituto De Ciências Matemáticas e de Computação
                </Link>{" "}
                {new Date().getFullYear()}
                {"."}
            </Typography>
        </>
    );
}

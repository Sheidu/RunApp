import { Alert, AlertColor, Snackbar } from "@mui/material";
import { AlertBarProps } from "../models/types";

export const AlertBar = (props: AlertBarProps) => {
    return (
        <Snackbar anchorOrigin={{vertical: "top", horizontal: "center"}} open={props.open}
                  autoHideDuration={6000} onClose={props.onClose}>
            <Alert variant="filled" severity={props.alertMeta.severity as AlertColor} onClose={props.onClose}>
                {props.alertMeta.message}
            </Alert>
        </Snackbar>
    );
};
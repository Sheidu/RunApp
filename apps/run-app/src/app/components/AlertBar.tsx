import { Alert, AlertColor, Snackbar } from "@mui/material";

interface AlertBarProps {
    alertMeta: {severity: string, message: string};
    open: boolean; 
    onClose: (event?: React.SyntheticEvent | undefined, reason?: string | undefined) => void;
}

export function AlertBar(props: AlertBarProps) {
    return (
        <Snackbar anchorOrigin={{vertical: "top", horizontal: "center"}} open={props.open}
                  autoHideDuration={6000} onClose={props.onClose}>
            <Alert variant="filled" severity={props.alertMeta.severity as AlertColor} onClose={props.onClose}>
                {props.alertMeta.message}
            </Alert>
        </Snackbar>
    );
};
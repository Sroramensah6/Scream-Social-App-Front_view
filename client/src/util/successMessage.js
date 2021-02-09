//import { useSnackbar } from 'notistack';
//
//default function SuccessMessage() {
//    const { enqueueSnackbar } = useSnackbar();
//
//    const handleClickVariant = (variant) => () => {
//        // variant could be success, error, warning, info, or default
//        enqueueSnackbar('This is a success message!', { variant });
//    };
//
//    let success = handleClickVariant('success')
//
//    return success
//}
import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Fade from '@material-ui/core/Fade';

export default function SuccessMessage() {
    const [state, setState] = React.useState({
        open: true,
        Transition: Fade,
    });
    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    const handleClose = () => {
        setState({
            ...state,
            open: false,
        });
    };

    return (
        <div>
            <Snackbar
                open={state.open}
                onClose={handleClose}
                TransitionComponent={state.Transition}
                key={state.Transition.name}
            >
                <Alert onClose={handleClose} severity="success">
                    Success!
                </Alert>
            </Snackbar>
        </div>
    );
}
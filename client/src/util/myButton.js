import React from 'react';
import { Tooltip, IconButton } from '@material-ui/core';

export default ({ children, onClick, arialabel,tip, btnClassName, tipClassName, placement }) => (
    <Tooltip title={tip} className={tipClassName} placement={placement}>
        <IconButton aria-label={arialabel} onClick={onClick} className={btnClassName}>
            {children}
        </IconButton>
    </Tooltip>
)
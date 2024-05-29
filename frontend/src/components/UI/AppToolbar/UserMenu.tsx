import React, { useState } from 'react';
import { Avatar, Button, Menu, MenuItem } from '@mui/material';
import { Link } from 'react-router-dom';
import { User } from "../../../types";
import { useAppDispatch } from '../../../app/hooks';
import { logout } from '../../../features/users/usersThunks';
import { apiURL } from '../../../constants';
import imageNotAvailable from '../../../../assets/imageNotAvailable.png';

interface Props {
    user: User;
}

const UserMenu: React.FC<Props> = ({ user }) => {
    const dispatch = useAppDispatch();
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        dispatch(logout());
    };

    let avatar = imageNotAvailable;

    if (user.avatar) {
        avatar = apiURL + '/public/' + user.avatar;
    }

    return (
        <>
            <Button
                onClick={handleClick}
                color="inherit"
                startIcon={<Avatar src={avatar} alt={user.displayName} />}
            >
                Hello, {user.displayName}
            </Button>
            <Menu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose} component={Link} to="/my">My cocktails</MenuItem>
                <MenuItem onClick={handleClose} component={Link} to="/new-album">Add album</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
        </>
    );
};

export default UserMenu;

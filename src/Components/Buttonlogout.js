import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from './Button';

export const LogoutButton = () => {
    const { logout } = useAuth0();

    const handleLogout = () => {
        logout({ returnTo: window.location.origin });
    };

    return (
        <Button
            buttonStyle="btn--outline"
            buttonSize="btn--medium"
            onClick={handleLogout}
        >
            Log Out
        </Button>
    );
};

export default LogoutButton;

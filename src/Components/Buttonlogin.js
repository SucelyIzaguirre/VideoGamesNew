import React from 'react';
import "./buttonlogin.css";
import { useAuth0 } from "@auth0/auth0-react";

//CONSTANTES
const STYLES = ['btn--primary', 'btn--outline'];
const SIZES = ['btn--medium', 'btn--large'];

export const Button = ({
    children,
    type,
    onClick,
    buttonStyle,
    buttonSize
}) => {
    // Comprobando si el estilo y el tamaño del botón son válidos o usar los valores por defecto
    const checkButtonStyle = STYLES.includes(buttonStyle) ? buttonStyle : STYLES[0];
    const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];

    return (
        <button
            className={`btn ${checkButtonStyle} ${checkButtonSize}`}
            onClick={onClick}
            type={type}
        >
            {children}
        </button>
    );
};

export const LoginButton = () => {
    const { loginWithRedirect } = useAuth0();

    const handleLogin = async () => {
        await loginWithRedirect({
            appState: {
                returnTo: "/profile",
            },
        });
    };

    return (
        <Button
            buttonStyle="btn--primary"
            buttonSize="btn--medium"
            onClick={handleLogin}
        >
            Log In
        </Button>
    );
};

export default LoginButton;

import { useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectUser } from "../users/usersSlice";
import { useEffect, useState } from "react";
import { CocktailMutation } from "../../types";
import { createCocktail } from "./cocktailsThunks";
import { Alert, Snackbar, Typography } from "@mui/material";
import CocktailForm from "./components/CocktailForm";

const NewCocktail = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectUser);

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    useEffect(() => {
        if (!user?.token) {
            navigate('/login');
        }
    }, [user?.token]);

    const onFormSubmit = async (cocktailMutation: CocktailMutation) => {
        try {
            await dispatch(createCocktail(cocktailMutation)).unwrap();
            setSnackbarMessage('Cocktail created successfully!');
            setSnackbarOpen(true);
        } catch (e) {
            console.error(e);
            setSnackbarMessage('Failed to create the cocktail.');
            setSnackbarOpen(true);
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    return (
        <>
            <CocktailForm onSubmit={onFormSubmit} />
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
            >
                <Alert onClose={handleCloseSnackbar} severity={snackbarMessage === 'Cocktail created successfully!' ? 'success' : 'error'}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </>
    );
};

export default NewCocktail;
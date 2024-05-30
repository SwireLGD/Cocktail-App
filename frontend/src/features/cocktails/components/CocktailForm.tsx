import React, { useState } from 'react';
import { Button, Container, Grid, TextField, Typography } from '@mui/material';
import { useAppSelector } from '../../../app/hooks';
import { selectCreateLoading } from '../cocktailsSlice';
import { CocktailMutation, Ingredient } from '../../../types';
import FileInput from '../../../components/UI/FileInput/FileInput';

interface Props {
    onSubmit: (mutation: CocktailMutation) => void;
}

const CocktailForm: React.FC<Props> = ({ onSubmit }) => {
    const isCreating = useAppSelector(selectCreateLoading);
    const [state, setState] = useState({
        title: '',
        ingredients: [{ name: '', amount: '' }],
        recipe: '',
        image: null,
    });

    const submitFormHandler = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(state);
    };

    const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name;
        const value = e.target.value;

        setState(prevState => {
            return { ...prevState, [name]: value };
        });
    };

    const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, files } = e.target;
        if (files) {
            setState(prevState => ({
                ...prevState,
                [name]: files[0],
            }));
        }
    };

    const handleIngredientChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        const newIngredients = [...state.ingredients];
        newIngredients[index][name as keyof Ingredient] = value;
        setState(prevState => ({
            ...prevState,
            ingredients: newIngredients,
        }));
    };

    const handleAddIngredient = () => {
        setState(prevState => ({
            ...prevState,
            ingredients: [...prevState.ingredients, { name: '', amount: '' }],
        }));
    };

    const handleRemoveIngredient = (index: number) => {
        setState(prevState => ({
            ...prevState,
            ingredients: state.ingredients.filter((_, i) => i !== index),
        }));
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Add New Cocktail
            </Typography>
            <form onSubmit={submitFormHandler}>
                <Grid container spacing={2} justifyContent="center">
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Title"
                            name="title"
                            value={state.title}
                            onChange={inputChangeHandler}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6" gutterBottom>
                            Ingredients
                        </Typography>
                        {state.ingredients.map((ingredient, index) => (
                            <Grid container spacing={1} key={index} display={'flex'} alignItems={'center'} marginBottom={1}>
                                <Grid item xs={5}>
                                    <TextField
                                        fullWidth
                                        label="Name"
                                        name="name"
                                        value={ingredient.name}
                                        onChange={(e) => handleIngredientChange(index, e)}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={5}>
                                    <TextField
                                        fullWidth
                                        label="Amount"
                                        name="amount"
                                        value={ingredient.amount}
                                        onChange={(e) => handleIngredientChange(index, e)}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={2}>
                                    <Button onClick={() => handleRemoveIngredient(index)}>
                                        &#10005;
                                    </Button>
                                </Grid>
                            </Grid>
                        ))}
                        <Grid item xs={12}>
                            <Button onClick={handleAddIngredient} variant="outlined">
                                + Add Ingredient
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            multiline
                            rows={6}
                            label="Recipe"
                            name="recipe"
                            value={state.recipe}
                            onChange={inputChangeHandler}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FileInput
                            onChange={fileInputChangeHandler}
                            name="image"
                            label="Image"
                        />
                    </Grid>
                    <Grid item>
                        <Button type="submit" variant="contained" disabled={isCreating}>
                            {isCreating ? 'Adding...' : 'Add Cocktail'}
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
};

export default CocktailForm;
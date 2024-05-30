import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectFetchLoading, selectedCocktail } from './cocktailsSlice';
import { Card, CardContent, CardMedia, CircularProgress, Container, Typography, Box, styled } from '@mui/material';
import imageNotAvailable from '../../../assets/imageNotAvailable.png';
import { apiURL } from '../../constants';
import { fetchCocktailsById } from './cocktailsThunks';

const ImageCardMedia = styled(CardMedia)({
    height: 400,
    backgroundSize: 'contain',
    marginBottom: '20px',
});

const CocktailDetailPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const cocktail = useAppSelector(selectedCocktail);
    const isLoading = useAppSelector(selectFetchLoading);
    const { id } = useParams<{ id: string }>();

    let cardImage = imageNotAvailable;

    const image = cocktail?.image;

    if (image) {
        cardImage = apiURL + '/public/' + image;
    }

    useEffect(() => {
        if (id) dispatch(fetchCocktailsById(id));
    }, [dispatch, id]);

    if (isLoading) {
        return (
            <Container>
                <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                    <CircularProgress />
                </Box>
            </Container>
        );
    }

    if (!cocktail) {
        return (
            <Container>
                <Typography variant="h5" align="center" marginTop={5}>
                    Cocktail not found
                </Typography>
            </Container>
        );
    }

    return (
        <Container>
            <Card sx={{ marginTop: 5 }}>
                <CardContent>
                    <Typography variant="h4" gutterBottom>
                        {cocktail.title}
                    </Typography>
                    <ImageCardMedia image={cardImage} title={cocktail?.title} />
                    <Typography variant="h5" gutterBottom>
                        Ingredients:
                    </Typography>
                    <ul>
                        {cocktail.ingredients.map((ingredient, index) => (
                            <li key={index}>
                                <Typography variant="body1">
                                    {ingredient.name}: {ingredient.amount}
                                </Typography>
                            </li>
                        ))}
                    </ul>
                    <Typography variant="h5" gutterBottom>
                        Recipe:
                    </Typography>
                    <Typography variant="body1">
                        {cocktail.recipe}
                    </Typography>
                </CardContent>
            </Card>
        </Container>
    );
};

export default CocktailDetailPage;

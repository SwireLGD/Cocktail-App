import { useEffect } from "react";
import { CircularProgress, Grid, Typography } from "@mui/material";
import { selectCocktails, selectFetchLoading } from "./cocktailsSlice";
import { selectUser } from "../users/usersSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchCocktails } from "./cocktailsThunks";
import CocktailItem from "./components/CocktailItem";

const Cocktails = () => {
    const dispatch = useAppDispatch();
    const cocktails = useAppSelector(selectCocktails);
    const isLoading = useAppSelector(selectFetchLoading);
    const user = useAppSelector(selectUser);

    useEffect(() => {
        dispatch(fetchCocktails());
    }, [dispatch]);

    const filteredCocktails = cocktails.filter(cocktail =>
        cocktail.isPublished || (user?.role === 'admin')
    );

    return (
        <Grid container direction="column" gap={2}>
            {isLoading ? (
                <Grid item container justifyContent="center">
                    <CircularProgress />
                </Grid>
            ) : (
                <Grid item container gap={2}>
                    {filteredCocktails.length > 0 ? (
                        filteredCocktails.map(cocktail => (
                            <CocktailItem
                                key={cocktail._id}
                                _id={cocktail._id}
                                userId={cocktail.user}
                                title={cocktail.title}
                                image={cocktail.image}
                                isPublished={cocktail.isPublished}
                            />
                        ))
                    ) : (
                        <Grid item>
                            <Typography>No cocktails available.</Typography>
                        </Grid>
                    )}
                </Grid>
            )}
        </Grid>
    );
};

export default Cocktails;

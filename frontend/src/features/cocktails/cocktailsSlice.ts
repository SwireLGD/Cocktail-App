import { createSlice } from "@reduxjs/toolkit";
import { Cocktail } from "../../types";
import { createCocktail, deleteCocktail, fetchCocktails, fetchCocktailsById, fetchMyCocktails, togglePublished } from "./cocktailsThunks";

interface CocktailState {
    items: Cocktail[];
    myCocktails: Cocktail[];
    selectedCocktail: Cocktail | null;
    fetchLoading: boolean;
    createLoading: boolean;
    publishing: boolean;
    deleting: boolean;
}

const initialState: CocktailState = {
    items: [],
    myCocktails: [],
    selectedCocktail: null,
    fetchLoading: false,
    createLoading: false,
    publishing: false,
    deleting: false,
};

export const cocktailsSlice = createSlice({
    name: 'cocktails',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(fetchCocktails.pending, (state) => {
            state.fetchLoading = true;
        });
        builder.addCase(fetchCocktails.fulfilled, (state, { payload: cocktails }) => {
            state.fetchLoading = false;
            state.items = cocktails;
        });
        builder.addCase(fetchCocktails.rejected, (state) => {
            state.fetchLoading = false;
        });
        builder.addCase(fetchCocktailsById.pending, (state) => {
            state.fetchLoading = true;
        });
        builder.addCase(fetchCocktailsById.fulfilled, (state, { payload: cocktail }) => {
            state.fetchLoading = false;
            state.selectedCocktail = cocktail;
        });
        builder.addCase(fetchCocktailsById.rejected, (state) => {
            state.fetchLoading = false;
        });
        builder.addCase(fetchMyCocktails.pending, (state) => {
            state.fetchLoading = true;
        });
        builder.addCase(fetchMyCocktails.fulfilled, (state, { payload: myCocktails }) => {
            state.fetchLoading = false;
            state.myCocktails = myCocktails;
        });
        builder.addCase(fetchMyCocktails.rejected, (state) => {
            state.fetchLoading = false;
        });
        builder.addCase(createCocktail.pending, (state) => {
            state.createLoading = true;
        });
        builder.addCase(createCocktail.fulfilled, (state) => {
            state.createLoading = false;
        });
        builder.addCase(createCocktail.rejected, (state) => {
            state.createLoading = false;
        });
        builder.addCase(togglePublished.pending, (state) => {
            state.publishing = true;

        });
        builder.addCase(togglePublished.fulfilled, (state, { payload }) => {
            state.publishing = false;
            const index = state.items.findIndex((cocktail) => cocktail._id === payload._id);
            if (index !== -1) {
                state.items[index].isPublished = payload.isPublished;
            }
        });
        builder.addCase(togglePublished.rejected, (state) => {
            state.publishing = false;
        });
        builder.addCase(deleteCocktail.pending, (state) => {
            state.deleting = true;
        });
        builder.addCase(deleteCocktail.fulfilled, (state, { payload: deletedCocktailId }) => {
            state.deleting = false;
            state.items = state.items.filter(item => item._id !== deletedCocktailId);
        });
        builder.addCase(deleteCocktail.rejected, (state) => {
            state.deleting = false;
        });
    },
})
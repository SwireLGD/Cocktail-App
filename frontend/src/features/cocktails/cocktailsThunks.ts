import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi";
import { Cocktail, CocktailMutation } from "../../types";
import axios from "axios";

export const fetchCocktails = createAsyncThunk<Cocktail[]>(
    'cocktails/fetchCocktails',
    async () => {
        try {
            const response = await axiosApi.get<Cocktail[]>('/cocktails');
            return response.data;
        } catch (e) {
            throw e;
        }
    }
);

export const fetchCocktailsById = createAsyncThunk<Cocktail, string>(
    'cocktails/fetchCocktailById',
    async (cocktailId: string, { rejectWithValue }) => {
        try {
            const response = await axiosApi.get<Cocktail>(`/cocktails/${cocktailId}`);
            return response.data;
        } catch (e) {
            if (axios.isAxiosError(e) && e.response) {
                return rejectWithValue(e.response.data);
            } else {
                return rejectWithValue({ e: 'An unknown error occurred' });
            }
        }
    }
);

export const fetchMyCocktails = createAsyncThunk<Cocktail[]>(
    'cocktails/fetchMyCocktails',
    async (_, {rejectWithValue}) => {
        try {
            const response = await axiosApi.get<Cocktail[]>('/cocktails/my');
            return response.data;
        } catch (e) {
            if (axios.isAxiosError(e) && e.response) {
                return rejectWithValue(e.response.data);
            } else {
                return rejectWithValue({ e: 'An unknown error occurred' });
            }
        }
    }
);

export const createCocktail = createAsyncThunk<void, CocktailMutation>(
    'cocktails/createCocktail',
    async (cocktailMutation) => {
        const formData = new FormData();

        const keys = Object.keys(cocktailMutation) as (keyof CocktailMutation)[];

        keys.forEach(key => {
            const value = cocktailMutation[key];

            if (key === 'ingredients') {
                formData.append(key, JSON.stringify(value));
            } else if (value !== null) {
                formData.append(key, value as string);
            }
        });

        const response = await axiosApi.post('/cocktails', formData);
        return response.data;
    }
);

export const togglePublished = createAsyncThunk(
    'cocktails/togglePublished',
    async (cocktailId) => {
      try {
        const response = await axiosApi.patch(`/cocktails/${cocktailId}/togglePublished`);
        return response.data;
      } catch (error) {
        throw error;
      }
    }
);

export const deleteCocktail = createAsyncThunk<void | string>(
    'cocktails/deleteCocktail',
    async (cocktailId, {rejectWithValue}) => {
        try {
            const response = await axiosApi.delete(`/cocktails/${cocktailId}`);

            if (response.status !== 204) {
                return rejectWithValue('Failed to delete cocktail');
            }

            return;
        } catch (e) {
            if (axios.isAxiosError(e)) {
                if (e.response) {
                    if (e.response.status === 403) {
                        return rejectWithValue('Unauthorized to delete the cocktail');
                    } else if (e.response.status === 404) {
                        return rejectWithValue('Cocktail not found');
                    } else {
                        return rejectWithValue(e.response.data.message || 'server error during deletion');
                    }
                }
            }
            return rejectWithValue('Network error or unable to reach server');
        }
    }
);
import express from "express";
import Cocktail from "../models/Cocktail";
import auth, { RequestWithUser } from "../middleware/auth";
import { clearImages, imagesUpload } from "../multer";
import { CocktailMutation } from "../types";
import mongoose from "mongoose";
import permit from "../middleware/permit";


const cocktailsRouter = express.Router();

cocktailsRouter.get('/', async (req, res) => {
    try {
        const cocktails = await Cocktail.find();
        return res.send(cocktails);
    } catch (e) {
        return res.sendStatus(500);
    }
});

cocktailsRouter.get('/my', auth, async (req: RequestWithUser, res) => {
    try {
        if (!req.user) {
            return res.status(401).send({ error: 'User must be authenticated.' });
        }
        const cocktails = await Cocktail.find({ user: req.user._id }).populate('user').sort({ name: 1 });
        return res.send(cocktails);
    } catch (e) {
        return res.sendStatus(500);
    }
});

cocktailsRouter.get('/:id', async (req, res) => {
    try {
        const cocktail = await Cocktail.findById(req.params.id).populate('user');
        if (!cocktail) {
            return res.status(404).send({ message: 'Cocktail not found' });
        }
        return res.send(cocktail);
    } catch (e) {
        return res.sendStatus(500);
    }
});

cocktailsRouter.post('/', auth, imagesUpload.single('image'), async (req: RequestWithUser, res, next) => {
    if (!req.user) {
        return res.status(401).send({ error: 'User must be authenticated.' });
    }

    let ingredients;
    try {
        ingredients = JSON.parse(req.body.ingredients);
    } catch (error) {
        return res.status(400).json({ error: 'Invalid JSON for ingredients' });
    }

    const cocktailData: CocktailMutation = {
        title: req.body.title,
        image: req.file ? req.file.filename : null,
        recipe: req.body.recipe,
        isPublished: false,
        user: req.user._id,
        ingredients: ingredients
    };

    const cocktail = new Cocktail(cocktailData);

    try {
        await cocktail.save();
        return res.send(cocktail);
    } catch (e) {
        if (req.file) {
            clearImages(req.file.filename);
        }
        if (e instanceof mongoose.Error.ValidationError) {
            return res.status(422).send(e);
        }

        next(e);
    }
});

cocktailsRouter.patch('/:id/togglePublished', auth, permit('admin'), async (req, res) => {
    try {
        const cocktail = await Cocktail.findById(req.params.id);
        if (!cocktail) {
            return res.status(404).send({ error: 'Cocktail not found' });
        }

        cocktail.isPublished = !cocktail.isPublished;

        await cocktail.save();

        return res.send(cocktail);
    } catch (e) {
        return res.status(500).send(e);
    }
});

cocktailsRouter.delete('/:id', auth, permit('admin'), async (req: RequestWithUser, res, next) => {
    if (!req.user) {
        return res.status(401).send({ error: 'User must be authenticated.' });
    }

    const cocktail = await Cocktail.findById(req.params.id);

    if (!cocktail) {
        return res.status(404).send({ error: 'Cocktail not found' });
    }

    try {
        const result = await Cocktail.deleteOne({ _id: req.params.id });

        if (result.deletedCount === 0) {
            return res.status(404).send({ error: 'Cocktail not found or unauthorized to delete' });
        }

        return res.status(204).send();
    } catch (e) {
        return next(e);
    }
});

export default cocktailsRouter;
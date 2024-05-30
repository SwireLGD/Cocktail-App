import { Button, CardMedia, CircularProgress, ListItem, ListItemAvatar, ListItemText, styled } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { deleteCocktail, togglePublished } from "../cocktailsThunks";
import List from "@mui/material/List";
import imageNotAvailable from '../../../../assets/imageNotAvailable.png';
import { apiURL } from "../../../constants";
import { selectUser } from "../../users/usersSlice";
import { selectDeleting, selectPublishing } from "../cocktailsSlice";
import { Link } from "react-router-dom";

interface Props {
    _id: string;
    userId: string;
    title: string;
    image: string | null;
    isPublished: boolean;
}

const ImageCardMedia = styled(CardMedia)({
    height: 150,
    width: 150,
    borderRadius: 20,
    paddingTop: '100%',
});

const CocktailItem: React.FC<Props> = ({ _id, title, image, isPublished }) => {
    const dispatch = useAppDispatch();
    const publishing = useAppSelector(selectPublishing);
    const deleting = useAppSelector(selectDeleting);
    const user = useAppSelector(selectUser);

    let cardImage = imageNotAvailable;

    if (image) {
        cardImage = apiURL + '/public/' + image;
    }

    const handleDelete = () => {
        dispatch(deleteCocktail(_id));
    };

    const handleTogglePublished = () => {
        dispatch(togglePublished(_id));
    };

    const isAdmin = user?.role === 'admin';

    return (
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            <ListItem sx={{ color: 'black', '&:hover': { bgcolor: 'grey.200' } }} component={Link} to={`/cocktails/${_id}`}>
                <ListItemAvatar sx={{ marginRight: '10px' }}>
                    <ImageCardMedia image={cardImage}/>
                </ListItemAvatar>
                <ListItemText
                    primary={title}
                />
            </ListItem>
            {isAdmin && (
                    <>
                        <Button onClick={handleTogglePublished} disabled={publishing}>
                            {publishing ? <CircularProgress size={24} /> : (isPublished ? "Unpublish" : "Publish")}
                        </Button>
                        <Button onClick={handleDelete} disabled={deleting} color="error">
                            {deleting ? <CircularProgress size={24} /> : "Delete"}
                        </Button>
                    </>
                )}
        </List>
    );
};

export default CocktailItem;

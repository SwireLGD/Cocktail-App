import { Container, Typography } from '@mui/material';
import AppToolbar from './components/UI/AppToolbar/AppToolbar';
import { Navigate, Route, Routes } from 'react-router-dom';
import Cocktails from './features/cocktails/Cocktails';
import Register from './features/users/Register';
import Login from './features/users/Login';
import CocktailDetailPage from './features/cocktails/CocktailDetailPage';
import MyCocktails from './features/cocktails/MyCocktails';
import NewCocktail from './features/cocktails/NewCocktail';

const App = () => {
  return (
    <>
      <header>
        <AppToolbar />
      </header>
      <main>
        <Container maxWidth="xl">
          <Routes>
          <Route path="/" element={<Navigate replace to="/cocktails" />} />
            <Route path='/cocktails' element={<Cocktails />} />
            <Route path='/cocktails/:id' element={<CocktailDetailPage />} />
            <Route path='/cocktails/my' element={<MyCocktails />} />
            <Route path='/cocktails/new' element={<NewCocktail />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path="*" element={<Typography variant="h2">Not Found</Typography>} />
          </Routes>
        </Container>
      </main>
    </>
  )
}

export default App;
import { useState } from 'react';
import { Routes, Route, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { ROUTES } from './constants';
import { logOut } from './utils/firebase/authMethods';
import { useUser } from './contexts/UserContext';
import { useToast } from './contexts/ToastContext';

import Menu from './components/Menu/Menu';
import ShowAllLists from './pages/ShowAllLists/ShowAllLists';
import ShowOneList from './pages/ShowOneList/ShowOneList';
import Loading from './components/Loading/Loading';
import { ListsProvider } from './contexts/ListsContext';
import { SearchProvider } from './contexts/SearchContext';

import './App.css';

const App = () => {

  const [showMenu, setShowMenu] = useState(false);

  const navigate = useNavigate();
  let { user, userLoading, setUser } = useUser();
  const { toast } = useToast();

  let location = useLocation();
  let redirectAfterAuth = location.state && location.state.redirectAfterAuth;

  const handleSignOut = () => {
    logOut()
      .then(() => {
        setUser(null);
        navigate(ROUTES.LANDING, { replace: true });
      })
      .catch(error => {
        toast.error('Une erreur inconnue est survenue lors de la déconnexion');
      });
  };

  const openMenu = () => setShowMenu(true);

  if (userLoading) return <Loading />;

  // if the user is not connected and hasn't just been redirected after loged in
  // meaning that if the user is null because the user just loged in (so it's loading) we don't redirect
  if (!user && !redirectAfterAuth) return <Navigate to={ROUTES.LANDING} replace={true} />;

  return (
    <div className='app'>
      <Menu
        isShow={showMenu}
        handleClose={() => setShowMenu(false)}
        handleSignOut={handleSignOut}
      />

      <ListsProvider>
        <SearchProvider openMenu={openMenu}>
          <Routes>
            <Route path='/' element={<ShowAllLists navigate={navigate} />} />
            <Route path={ROUTES.DISPLAY_ONE_LIST} element={<ShowOneList navigate={navigate} />} />
          </Routes>
        </SearchProvider>
      </ListsProvider>
    </div>
  );
}

export default App;

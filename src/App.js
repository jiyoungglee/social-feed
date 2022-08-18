import { useContext, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Newsfeed from './components/pages/Newsfeed';
import SearchResults from './components/pages/SearchResults';
import axios from 'axios';
import { Actions, UserContext } from './store/UserContext';
import RegisterLogin from './components/pages/RegisterLogin';
import ProfilePage from './components/pages/ProfilePage';

function App() {
  const { state, dispatch } = useContext(UserContext);

  useEffect(() => {
    async function getCurrentUser() {
    try {
      const response = await axios.get('/users/currentUser');
      dispatch({
        type: Actions.UPDATE,
        payload: {
          userId: response.data,
        }
      })
    } catch(error){
      dispatch({
        type: Actions.RESET
      })
    }}
    getCurrentUser();

  },[dispatch])

  return (
    <Layout>
      <Routes>
        <Route 
          exact path="/"
          element={
            typeof state.userId !== 'undefined' 
            && (state.userId ? <Newsfeed /> : <RegisterLogin />)
          }
        />
        <Route path="/searchResults" element={<SearchResults />} />
        <Route path="/profile/:userId" element={<ProfilePage />} />
      </Routes>
    </Layout>
  );
}

export default App;

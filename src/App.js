import { useContext, useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Newsfeed from './components/pages/Newsfeed';
import SearchResults from './components/pages/SearchResults';
import axios from 'axios';
import { Actions, UserContext } from './store/UserContext';
import RegisterLogin from './components/pages/RegisterLogin';

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
  }, [dispatch])

  return (
    <Layout>
      <Routes>
        <Route path="/login" element={<RegisterLogin />} />
        <Route 
          path="/"
          element={state.userId ? <Newsfeed /> : <Navigate to="/login" />}
        />
        <Route path="/searchResults" element={<SearchResults />} />
      </Routes>
    </Layout>
  );
}

export default App;

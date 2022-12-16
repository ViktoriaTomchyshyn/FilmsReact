import logo from './logo.svg';
import './App.css';
import { Routes, BrowserRouter as Router, Route } from 'react-router-dom';
import StartPage from './Components/StartPage';
import FilmsPage from './Components/FilmsPage';
import RecommendationsPage from './Components/RecommendationsPage';
import CommentsPage from './Components/CommentsPage';

function App() {
  return (
    <div className="App">
              <Router>
                  <Routes>
                      <Route path="/films" element={<FilmsPage />} />
                      <Route path="/recommendations" element={<RecommendationsPage />} />
                      <Route path="/comments" element={<CommentsPage />} />
                      <Route path="*" element={<StartPage />} />
                  </Routes>
              </Router>
    </div>
  );
}

export default App;

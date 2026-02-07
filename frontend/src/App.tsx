import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { CreateEvent } from './pages/CreateEvent';
import { EventDetails } from './pages/EventDetails';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateEvent />} />
        <Route path="/event/:slug" element={<EventDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

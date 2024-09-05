import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductsPage from './ProductsPage';
import AddProductPage from './AddProductPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductsPage />} />
        <Route path="/add-product" element={<AddProductPage />} />
      </Routes>
    </Router>
  );
}

export default App;
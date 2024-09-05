import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import ProductsPage from "./ProductsPage";
import AddProductPage from "./AddProductPage";

function App() {
  return (
    <Router>
      <nav className="flex justify-center items-center gap-4">
        <Link to={"/"} className="ml-6">Products</Link>
        <Link to={"/add-product"}>Add Product</Link>
      </nav>
      <Routes>
        <Route path="/" element={<ProductsPage />} />
        <Route path="/add-product" element={<AddProductPage />} />
      </Routes>
    </Router>
  );
}

export default App;

import { useEffect, useState } from "react";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products from Google Apps Script
    fetch(
      "get api"
    )
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (productName) => {
    fetch(
      "delete api",
      {
        method: "POST",
        body: new URLSearchParams({
          action: "delete",
          Name: productName,
        }),
      }
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        if (data.result === 'success') {
          alert(data.msg);
          setProducts(products.filter((product) => product.Name !== productName));
        } else {
          alert(`Error: ${data.msg}`);
        }
      })
      .catch((err) => {
        console.error(err);
        alert('An error occurred while deleting the product');
      });
  };
  

  return (
    <div>
      <h1>Products</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Description</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index}>
              <td>{product.Name}</td>
              <td>{product.Price}</td>
              <td>{product.Description}</td>
              <td>
                {product.Image && (
                  <img
                    src={`data:image/png;base64,${product.Image}`}
                    alt={product.Name}
                    width="100"
                  />
                )}
              </td>
              <td>
                <button onClick={() => handleDelete(product.Name)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsPage;

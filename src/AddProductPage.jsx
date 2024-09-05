import { useRef, useState } from "react";

const AddProductPage = () => {
  const formRef = useRef(null);
  const [imageBase64, setImageBase64] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageBase64(reader.result.split(",")[1]); // Extract base64 string without the data URL prefix
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formData = new FormData(formRef.current);
    if (imageBase64) {
      formData.append("Image", imageBase64);
    }

    fetch(
      "https://script.google.com/macros/s/AKfycbx3iyje7dCA45N39nmCa8MgoivRX9BdjtC9S6IZKM_Vwu3r_dA6sGH8yeC8VVUx6cr9FQ/exec",
      {
        method: "POST",
        body: formData,
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        alert(data.msg);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h1>Add New Product</h1>
      <form onSubmit={handleSubmit} ref={formRef}>
        <input type="text" name="Name" placeholder="Product Name" required />
        <input type="number" name="Price" placeholder="Price" required />
        <textarea name="Description" placeholder="Description" required />
        <input type="file" name="Image" accept="image/*" onChange={handleFileChange} />
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProductPage;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function AddProperty() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    location: "",
    price: "",
    type: "",
    description: "",
    image: null,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

const propertyData =
  new FormData();

propertyData.append(
  "title",
  formData.title
);

propertyData.append(
  "location",
  formData.location
);

propertyData.append(
  "price",
  formData.price
);

propertyData.append(
  "type",
  formData.type
);

propertyData.append(
  "description",
  formData.description
);

propertyData.append(
  "image",
  formData.image
);

await API.post(
  "/properties",
  propertyData,
  {
    headers: {
      "Content-Type":
        "multipart/form-data",
    },
  }
);
      alert("✅ Property Added Successfully");

      navigate("/");
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
        "Failed to add property"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-md">

        <h1 className="text-2xl font-bold mb-6">
          Add New Property
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <input
            type="text"
            name="title"
            placeholder="Property Title"
            className="w-full border p-3 rounded"
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="location"
            placeholder="Location"
            className="w-full border p-3 rounded"
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            className="w-full border p-3 rounded"
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="type"
            placeholder="Apartment / House / Room"
            className="w-full border p-3 rounded"
            onChange={handleChange}
            required
          />

          <input
            type="file"
            accept="image/*"
            className="w-full border p-3 rounded"
            onChange={(e) =>
              setFormData({
                ...formData,
                image: e.target.files[0],
              })
            }
          />

          <textarea
            name="description"
            placeholder="Description"
            rows="5"
            className="w-full border p-3 rounded"
            onChange={handleChange}
            required
          />

          <button
            disabled={loading}
            className="w-full bg-green-600 text-white py-3 rounded"
          >
            {loading
              ? "Adding..."
              : "Add Property"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddProperty;
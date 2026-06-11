import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";

function EditProperty() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] =
    useState(true);

  const [formData, setFormData] =
    useState({
      title: "",
      location: "",
      price: "",
      type: "",
      description: "",
      image: "",
    });

  useEffect(() => {
    fetchProperty();
  }, []);

  const fetchProperty = async () => {
    try {
      const { data } =
        await API.get(`/properties/${id}`);

      setFormData({
        title: data.title,
        location: data.location,
        price: data.price,
        type: data.type,
        description: data.description,
        image: data.image,
      });
    } catch (error) {
      console.log(error);
      alert("Failed to load property");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.put(
        `/properties/${id}`,
        formData
      );

      alert(
        "✅ Property Updated Successfully"
      );

      navigate("/my-properties");

    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Update failed"
      );
    }
  };

  if (loading) {
    return (
      <h1 className="text-center mt-10">
        Loading...
      </h1>
    );
  }

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-md">

        <h1 className="text-2xl font-bold mb-6">
          Edit Property
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <input
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <input
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <input
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <input
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <textarea
            name="description"
            rows="5"
            value={formData.description}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <button className="w-full bg-blue-600 text-white py-3 rounded">
            Update Property
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditProperty;
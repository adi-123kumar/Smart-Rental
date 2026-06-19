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

    bedrooms: 1,
    bathrooms: 1,
    area: "",

    status: "Available",

    wifi: false,
    parking: false,
    furnished: false,
    ac: false,
    balcony: false,
    powerBackup: false,

    images: [],
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } =
      e.target;

    setFormData({
      ...formData,
      [name]:
        type === "checkbox"
          ? checked
          : value,
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
        "bedrooms",
        formData.bedrooms
      );

      propertyData.append(
        "bathrooms",
        formData.bathrooms
      );

      propertyData.append(
        "area",
        formData.area
      );

      propertyData.append(
        "status",
        formData.status
      );

      propertyData.append(
        "wifi",
        formData.wifi
      );

      propertyData.append(
        "parking",
        formData.parking
      );

      propertyData.append(
        "furnished",
        formData.furnished
      );

      propertyData.append(
        "ac",
        formData.ac
      );

      propertyData.append(
        "balcony",
        formData.balcony
      );

      propertyData.append(
        "powerBackup",
        formData.powerBackup
      );

      for (
        let i = 0;
        i < formData.images.length;
        i++
      ) {
        propertyData.append(
          "images",
          formData.images[i]
        );
      }

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

      alert(
        "✅ Property Added Successfully"
      );

      navigate("/my-properties");

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
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-md">

        <h1 className="text-3xl font-bold mb-6">
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

          <select
            name="type"
            className="w-full border p-3 rounded"
            onChange={handleChange}
            required
          >
            <option value="">
              Select Property Type
            </option>

            <option value="Apartment">
              Apartment
            </option>

            <option value="House">
              House
            </option>

            <option value="Villa">
              Villa
            </option>

            <option value="PG">
              PG
            </option>

            <option value="Hostel">
              Hostel
            </option>

            <option value="Office">
              Office
            </option>

            <option value="Shop">
              Shop
            </option>
          </select>

          <textarea
            name="description"
            placeholder="Description"
            rows="5"
            className="w-full border p-3 rounded"
            onChange={handleChange}
            required
          />

          <div className="grid grid-cols-3 gap-4">
            <input
              type="number"
              name="bedrooms"
              placeholder="Bedrooms"
              className="border p-3 rounded"
              onChange={handleChange}
            />

            <input
              type="number"
              name="bathrooms"
              placeholder="Bathrooms"
              className="border p-3 rounded"
              onChange={handleChange}
            />

            <input
              type="number"
              name="area"
              placeholder="Area (sq ft)"
              className="border p-3 rounded"
              onChange={handleChange}
            />
          </div>

          <select
            name="status"
            className="w-full border p-3 rounded"
            onChange={handleChange}
          >
            <option value="Available">
              Available
            </option>

            <option value="Booked">
              Booked
            </option>

            <option value="Rented">
              Rented
            </option>
          </select>

          <div>
            <h3 className="font-bold mb-2">
              Amenities
            </h3>

            <div className="grid grid-cols-2 gap-2">

              <label>
                <input
                  type="checkbox"
                  name="wifi"
                  onChange={handleChange}
                />
                {" "}WiFi
              </label>

              <label>
                <input
                  type="checkbox"
                  name="parking"
                  onChange={handleChange}
                />
                {" "}Parking
              </label>

              <label>
                <input
                  type="checkbox"
                  name="furnished"
                  onChange={handleChange}
                />
                {" "}Furnished
              </label>

              <label>
                <input
                  type="checkbox"
                  name="ac"
                  onChange={handleChange}
                />
                {" "}AC
              </label>

              <label>
                <input
                  type="checkbox"
                  name="balcony"
                  onChange={handleChange}
                />
                {" "}Balcony
              </label>

              <label>
                <input
                  type="checkbox"
                  name="powerBackup"
                  onChange={handleChange}
                />
                {" "}Power Backup
              </label>

            </div>
          </div>

          <div>
            <label className="block mb-2 font-semibold">
              Property Images
            </label>

            <input
              type="file"
              multiple
              accept="image/*"
              className="w-full border p-3 rounded"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  images:
                    e.target.files,
                })
              }
            />
          </div>

          <button
            disabled={loading}
            className="w-full bg-green-600 text-white py-3 rounded"
          >
            {loading
              ? "Uploading..."
              : "Add Property"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddProperty;
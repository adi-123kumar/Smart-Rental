import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function EditProfile() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [preview, setPreview] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    gender: "",
    dateOfBirth: "",
    address: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
    occupation: "",
    company: "",
    bio: "",
  });

  const [profileImage, setProfileImage] =
    useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const { data } =
        await API.get(
          "/users/profile"
        );

      setFormData({
        name: data.name || "",
        phone: data.phone || "",
        gender: data.gender || "",
        dateOfBirth:
          data.dateOfBirth
            ? data.dateOfBirth
                .split("T")[0]
            : "",
        address:
          data.address || "",
        city: data.city || "",
        state:
          data.state || "",
        country:
          data.country || "",
        pincode:
          data.pincode || "",
        occupation:
          data.occupation || "",
        company:
          data.company || "",
        bio: data.bio || "",
      });

      setPreview(
        data.profileImage || ""
      );
    } catch (error) {
      console.log(error);
      alert(
        "Failed to load profile"
      );
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleImageChange = (
    e
  ) => {
    const file =
      e.target.files[0];

    if (!file) return;

    setProfileImage(file);

    setPreview(
      URL.createObjectURL(file)
    );
  };

  const handleSubmit = async (
    e
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data =
        new FormData();

      Object.keys(
        formData
      ).forEach((key) => {
        data.append(
          key,
          formData[key]
        );
      });

      if (profileImage) {
        data.append(
          "profileImage",
          profileImage
        );
      }

      await API.put(
        "/users/profile",
        data,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      alert(
        "Profile updated successfully"
      );

      navigate("/profile");
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data
          ?.message ||
          "Failed to update profile"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">

      <div className="max-w-5xl mx-auto bg-white p-8 rounded-xl shadow-md">

        <h1 className="text-3xl font-bold mb-8">
          Edit Profile
        </h1>

        <form
          onSubmit={
            handleSubmit
          }
        >
          {/* Profile Image */}

          <div className="mb-8 flex flex-col items-center">

            <img
              src={
                preview ||
                "https://via.placeholder.com/200"
              }
              alt="Preview"
              className="w-40 h-40 rounded-full object-cover border-4 border-blue-500"
            />

            <input
              type="file"
              accept="image/*"
              onChange={
                handleImageChange
              }
              className="mt-4"
            />

          </div>

          <div className="grid md:grid-cols-2 gap-6">

            <div>
              <label className="block mb-1 font-medium">
                Name
              </label>

              <input
                type="text"
                name="name"
                value={
                  formData.name
                }
                onChange={
                  handleChange
                }
                className="w-full border p-3 rounded"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">
                Phone
              </label>

              <input
                type="text"
                name="phone"
                value={
                  formData.phone
                }
                onChange={
                  handleChange
                }
                className="w-full border p-3 rounded"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">
                Gender
              </label>

              <select
                name="gender"
                value={
                  formData.gender
                }
                onChange={
                  handleChange
                }
                className="w-full border p-3 rounded"
              >
                <option value="">
                  Select
                </option>

                <option value="Male">
                  Male
                </option>

                <option value="Female">
                  Female
                </option>

                <option value="Other">
                  Other
                </option>
              </select>
            </div>

            <div>
              <label className="block mb-1 font-medium">
                Date Of Birth
              </label>

              <input
                type="date"
                name="dateOfBirth"
                value={
                  formData.dateOfBirth
                }
                onChange={
                  handleChange
                }
                className="w-full border p-3 rounded"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">
                Occupation
              </label>

              <input
                type="text"
                name="occupation"
                value={
                  formData.occupation
                }
                onChange={
                  handleChange
                }
                className="w-full border p-3 rounded"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">
                Company
              </label>

              <input
                type="text"
                name="company"
                value={
                  formData.company
                }
                onChange={
                  handleChange
                }
                className="w-full border p-3 rounded"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">
                City
              </label>

              <input
                type="text"
                name="city"
                value={
                  formData.city
                }
                onChange={
                  handleChange
                }
                className="w-full border p-3 rounded"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">
                State
              </label>

              <input
                type="text"
                name="state"
                value={
                  formData.state
                }
                onChange={
                  handleChange
                }
                className="w-full border p-3 rounded"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">
                Country
              </label>

              <input
                type="text"
                name="country"
                value={
                  formData.country
                }
                onChange={
                  handleChange
                }
                className="w-full border p-3 rounded"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">
                Pincode
              </label>

              <input
                type="text"
                name="pincode"
                value={
                  formData.pincode
                }
                onChange={
                  handleChange
                }
                className="w-full border p-3 rounded"
              />
            </div>

          </div>

          <div className="mt-6">
            <label className="block mb-1 font-medium">
              Address
            </label>

            <textarea
              rows="3"
              name="address"
              value={
                formData.address
              }
              onChange={
                handleChange
              }
              className="w-full border p-3 rounded"
            />
          </div>

          <div className="mt-6">
            <label className="block mb-1 font-medium">
              Bio
            </label>

            <textarea
              rows="5"
              name="bio"
              value={
                formData.bio
              }
              onChange={
                handleChange
              }
              className="w-full border p-3 rounded"
            />
          </div>

          <button
            type="submit"
            disabled={
              loading
            }
            className="mt-8 bg-blue-600 text-white px-8 py-3 rounded hover:bg-blue-700"
          >
            {loading
              ? "Updating..."
              : "Update Profile"}
          </button>

        </form>

      </div>

    </div>
  );
}

export default EditProfile;
import { useEffect, useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";

function Profile() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const { data } = await API.get(
        "/users/profile"
      );

      setProfile(data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!profile) {
    return (
      <h1 className="text-center mt-10">
        Loading...
      </h1>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">

      <div className="bg-white shadow rounded-xl p-6">

        <div className="flex flex-col items-center">

          <img
            src={
              profile.profileImage ||
              "https://via.placeholder.com/150"
            }
            alt=""
            className="w-40 h-40 rounded-full object-cover border"
          />

          <h1 className="text-3xl font-bold mt-4">
            {profile.name}
          </h1>

          <p className="text-gray-500">
            {profile.email}
          </p>

        </div>

        <div className="grid md:grid-cols-2 gap-4 mt-8">

          <Info
            label="Phone"
            value={profile.phone}
          />

          <Info
            label="Gender"
            value={profile.gender}
          />

          <Info
            label="DOB"
            value={
              profile.dateOfBirth
                ? new Date(
                    profile.dateOfBirth
                  ).toLocaleDateString()
                : ""
            }
          />

          <Info
            label="Occupation"
            value={profile.occupation}
          />

          <Info
            label="Company"
            value={profile.company}
          />

          <Info
            label="City"
            value={profile.city}
          />

          <Info
            label="State"
            value={profile.state}
          />

          <Info
            label="Country"
            value={profile.country}
          />

        </div>

        <div className="mt-6">
          <h2 className="font-bold">
            Bio
          </h2>

          <p>{profile.bio}</p>
        </div>

      </div>
      <div className="flex gap-4 mt-8">
  <Link
    to="/edit-profile"
    className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
  >
    Edit Profile
  </Link>

  <Link
    to="/change-password"
    className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700"
  >
    Change Password
  </Link>
</div>

    </div>
  );
}

function Info({
  label,
  value,
}) {
  return (
    <div>
      <strong>{label}:</strong>{" "}
      {value || "N/A"}
    </div>
  );
}
const fetchProfile = async () => {
  try {
    const { data } = await API.get("/users/profile");

    console.log("PROFILE DATA:", data);

    setProfile(data);
  } catch (error) {
    console.log(error);
  }
};

export default Profile;
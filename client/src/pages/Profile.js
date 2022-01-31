import { useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState("");

  async function populateProfile() {
    const req = await fetch("/profile", {
      headers: {
        "x-access-token": localStorage.getItem("token")
      }
    });

    const data = await req.json();
    if (data.status === "ok") {
      setProfile(data.profile);
    } else {
      console.log(data.error);
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = jwt.decode(token);
      if (!user) {
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        populateProfile();
      }
    }
  }, [navigate]);

  return (
    <div>
      <h1>Your Profile</h1>
      <br />
      <div>First Name: {profile?.firstname}</div>
      <br />
      <div>Last Name: {profile?.lastname}</div>
      <br />
      <div>Email Id: {profile?.email}</div>
      <br />
      <div>Address Name: {profile?.address}</div>
      <br />
      <div>Phone Number: {profile?.phone}</div>
    </div>
  );
};

export default Profile;

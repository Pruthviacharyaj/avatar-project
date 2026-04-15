import React, { useState } from "react";

function App() {
  const [step, setStep] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [avatars, setAvatars] = useState([]);
  const [selectedAvatar, setSelectedAvatar] = useState("");
  const [selectedName, setSelectedName] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }
    setError("");
    setStep("upload");
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
    setError("");

    const previewUrls = files.map((file) => URL.createObjectURL(file));
    setPreviews(previewUrls);
  };

  const handleGenerate = () => {
    if (images.length < 4) {
      setError("Please upload at least 4 clear headshot photos.");
      return;
    }

    setError("");

    const demoAvatars = previews.slice(0, 3).map((img, index) => ({
      id: index + 1,
      name: `Variation ${index + 1}`,
      url: img,
    }));

    setAvatars(demoAvatars);
    setSelectedAvatar("");
    setSelectedName("");
    setStep("result");
  };

  const handleSelectAvatar = (avatar) => {
    setSelectedAvatar(avatar.url);
    setSelectedName(avatar.name);
  };

  const handleDownload = (url, index) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = `avatar-${index + 1}.png`;
    link.click();
  };

  const handleBackToUpload = () => {
    setStep("upload");
    setSelectedAvatar("");
    setSelectedName("");
    setError("");
  };

  const pageStyle = {
    minHeight: "100vh",
    background: "#f4f7fb",
    padding: "30px",
    fontFamily: "Arial, sans-serif",
  };

  const cardStyle = {
    maxWidth: "1000px",
    margin: "0 auto",
    background: "white",
    padding: "30px",
    borderRadius: "16px",
    boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
  };

  const inputStyle = {
    width: "100%",
    padding: "12px",
    marginTop: "10px",
    marginBottom: "15px",
    borderRadius: "8px",
    border: "1px solid #ccc",
  };

  const buttonStyle = {
    padding: "12px 20px",
    background: "#1e3a5f",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    marginTop: "10px",
  };

  const secondaryButtonStyle = {
    padding: "12px 20px",
    background: "#6c757d",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    marginTop: "10px",
    marginRight: "10px",
  };

  return (
    <div style={pageStyle}>
      <div style={cardStyle}>
        <h1 style={{ textAlign: "center", color: "#1e3a5f", marginBottom: "10px" }}>
          Codeyoung Teacher Avatar Generator
        </h1>

        <p style={{ textAlign: "center", color: "#666", marginBottom: "25px" }}>
          Prototype version - AI generation module can be integrated in the next version.
        </p>

        {step === "login" && (
          <div>
            <h2>Teacher Login</h2>
            <input
              type="email"
              placeholder="Enter Epicenter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={inputStyle}
            />
            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={inputStyle}
            />
            <button style={buttonStyle} onClick={handleLogin}>
              Login
            </button>
          </div>
        )}

        {step === "upload" && (
          <div>
            <h2>Upload Headshot Photos</h2>
            <p>Please upload at least 4 clear headshot photos.</p>

            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              style={inputStyle}
            />

            <div
              style={{
                display: "flex",
                gap: "10px",
                flexWrap: "wrap",
                marginTop: "20px",
              }}
            >
              {previews.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`preview-${i}`}
                  width="120"
                  height="120"
                  style={{
                    objectFit: "cover",
                    borderRadius: "10px",
                    border: "1px solid #ddd",
                  }}
                />
              ))}
            </div>

            <button style={buttonStyle} onClick={handleGenerate}>
              Generate Avatar
            </button>
          </div>
        )}

        {step === "result" && (
          <div>
            <h2>Select Your Avatar</h2>

            <button style={secondaryButtonStyle} onClick={handleBackToUpload}>
              Back
            </button>

            {selectedName && (
              <p
                style={{
                  color: "green",
                  fontWeight: "bold",
                  marginTop: "15px",
                  marginBottom: "10px",
                }}
              >
                Selected: {selectedName}
              </p>
            )}

            <div
              style={{
                display: "flex",
                gap: "20px",
                flexWrap: "wrap",
                marginTop: "20px",
                justifyContent: "center",
              }}
            >
              {avatars.map((avatar, i) => (
                <div
                  key={avatar.id}
                  style={{
                    border:
                      selectedAvatar === avatar.url
                        ? "3px solid green"
                        : "1px solid #ccc",
                    padding: "15px",
                    borderRadius: "12px",
                    textAlign: "center",
                    width: "220px",
                    background: "#f9fbff",
                  }}
                >
                  <h3 style={{ color: "#1e3a5f", marginBottom: "10px" }}>
                    {avatar.name}
                  </h3>

                  <img
                    src={avatar.url}
                    alt={avatar.name}
                    width="200"
                    height="240"
                    style={{
                      borderRadius: "10px",
                      marginBottom: "10px",
                      objectFit: "cover",
                    }}
                  />

                  <p style={{ fontSize: "14px", color: "#555" }}>
                    Prototype avatar preview
                  </p>

                  <button
                    style={buttonStyle}
                    onClick={() => handleSelectAvatar(avatar)}
                  >
                    Select
                  </button>

                  <br />

                  <button
                    style={{ ...buttonStyle, background: "#28a745" }}
                    onClick={() => handleDownload(avatar.url, i)}
                  >
                    Download
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {error && (
          <p style={{ color: "red", marginTop: "20px", fontWeight: "bold" }}>
            {error}
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
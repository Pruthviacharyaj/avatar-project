import React, { useState } from "react";

function App() {
  const [avatars, setAvatars] = useState([]);

  const handleUpload = (e) => {
    const files = Array.from(e.target.files);

    if (files.length < 4) {
      alert("Please upload at least 4 images");
      return;
    }

    alert(files.length + " images selected successfully");
  };

  const generateAvatar = () => {
    const sampleAvatars = [
      "https://i.pravatar.cc/150?img=5",
      "https://i.pravatar.cc/150?img=10",
      "https://i.pravatar.cc/150?img=15",
    ];

    setAvatars(sampleAvatars);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Codeyoung Teacher Avatar Generator</h1>

      <input type="file" multiple onChange={handleUpload} />
      <br /><br />

      <button onClick={generateAvatar}>Generate Avatar</button>

      <div style={{ marginTop: "20px" }}>
        {avatars.map((img, i) => (
          <div key={i}>
            <img src={img} alt="avatar" width="150" />
            <br />
            <a href={img} download>
              <button>Download</button>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
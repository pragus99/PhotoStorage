import React, { useState } from "react";
import { ImageGrid } from "./comps/ImageGrid";
import { Title } from "./comps/Title";
import { Modal } from "./comps/Modal";

function App() {
  const [selectedImg, setSelectedImg] = useState();
  const [data, setData] = useState();

  return (
    <div className="App">
      <Title />
      <ImageGrid setData={setData} setSelectedImg={setSelectedImg} />
      {selectedImg && (
        <Modal
          selectedImg={selectedImg}
          setSelectedImg={setSelectedImg}
          data={data}
        />
      )}
    </div>
  );
}

export default App;

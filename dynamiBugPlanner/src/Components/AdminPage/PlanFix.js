import React from "react";
import { useState, useEffect } from "react";

export default function PlanFix({ api }) {
  const [id] = useState(window.location.search.substring(1));
  let canvas;
  const [reportId] = useState(Number(sessionStorage.getItem('reportDetail').id) || Number(id));
  const [context, setContext] = useState();
  const [currentTool, setCurrentTool] = useState("DrawTool");
  const [isDrawing, setIsDrawing] = useState(false);
  const [imageData, setImageData] = useState({});
  const [uploadedImage, setUploadedImage] = useState({});
  const [eventPosition, setEventPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    canvas = document.getElementById("whiteboard");
    setContext(canvas.getContext("2d"));
    // console.log("Calling useEffect");
  });

  useState(() => {
    const fetchData = async () => {
      let result = await api.getPlan(reportId);
      result
        .json()
        .then((json) => setImageData(json.html))
        .catch((err) => console.log(err.message));
    };
    // console.log("Calling useState");
    fetchData();
  });

  const putData = async () => {
    await api.updatePlan(Number(reportId), {
      html: imageData,
    });
  };

  const refreshPlan = () => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    let image = new Image();
    image.src = imageData;
    if (typeof imageData !== "undefined" && imageData != {}) {
      context.drawImage(image, 0, 0);
      console.log("Restored image");
    } else {
      console.log("imageData is empty");
    }
  };

  const handleMouseDown = (event) => {
    switch (currentTool) {
      case "LineTool": {
        context.beginPath();
        context.moveTo(
          event.clientX - canvas.getBoundingClientRect().left,
          event.clientY - canvas.getBoundingClientRect().top
        );
        break;
      }
      case "EraseTool": case "DrawTool": {
        setIsDrawing(true);
        break;
      }
      case "TextTool": {
        setEventPosition({
          x: event.clientX - canvas.getBoundingClientRect().left,
          y: event.clientY - canvas.getBoundingClientRect().top
        });
        const textBox = document.getElementById("TextTool");
        textBox.hidden = false;
        textBox.style.left = event.clientX + 'px';
        textBox.style.top = event.clientY + 'px';
        // textBox.focus();
        break;
      }
      case "ImageTool": {
        const reader = new FileReader();
        reader.readAsDataURL(uploadedImage);
        let image = new Image();
        reader.onload = () => {
          image.src = reader.result;
          context.drawImage(image, 
            event.clientX - canvas.getBoundingClientRect().left, 
            event.clientY - canvas.getBoundingClientRect().top,            
            100,
            100);
            console.log(uploadedImage);
        };
        // const fileUpload = document.getElementById("TextTool");
        // const newFileUpload = React.cloneElement(fileUpload, {value: ""});
        // fileUpload.parentElement.replaceChild(newFileUpload, fileUpload)
      }
    }
  };

  const handleMouseMove = (event) => {
    if (!isDrawing) return;

    switch (currentTool) {
      case "EraseTool": case "DrawTool": {
        context.beginPath();
        context.arc(
          event.clientX - canvas.getBoundingClientRect().left,
          event.clientY - canvas.getBoundingClientRect().top,
          (currentTool === "EraseTool") ? 10 : 3.5,
          0,
          2 * Math.PI
        );
        context.fillStyle = (currentTool === "EraseTool") ? "white" : "black";
        context.fill();
        break;
      }
    }
  };

  const handleMouseUp = (event) => {
    switch (currentTool) {
      case "LineTool": {
        context.lineTo(
          event.clientX - canvas.getBoundingClientRect().left,
          event.clientY - canvas.getBoundingClientRect().top
        );
        context.stroke();
        break;
      }
      case "EraseTool": case "DrawTool": {
        setIsDrawing(false);
        break;
      }
    }
  };

  const addText = (txt) => {
    const textBox = document.getElementById("TextTool");
    textBox.value = "";
    textBox.hidden = true;
    context.textBaseline = 'top';
    context.textAlign = 'left';
    context.font = '18px sans-serif';
    context.fillText(txt, eventPosition.x, eventPosition.y)

  };

  const planControls = (
    <ul className="row row-cols-auto list-unstyled list">
      <li>
        <input type="button" className="btn btn-outline-primary rounded-pill" value="Refresh" onClick={refreshPlan} />
      </li>
      <li>
        <input type="button" className="btn btn-outline-primary rounded-pill" value="Save" onClick={() => {
          setImageData(canvas.toDataURL());
          putData();
        }} />
      </li>
      <li>
        <input type="button" className="btn btn-outline-primary rounded-pill" value="Clear" onClick={() => {
          context.clearRect(0, 0, canvas.width, canvas.height);
        }} />
      </li>
      <li>
        <input type="button" className="btn btn-outline-primary rounded-pill" value="Draw Tool" onClick={() => { setCurrentTool("DrawTool") }} />
      </li>
      <li>
        <input type="button" className="btn btn-outline-primary rounded-pill" value="Erase Tool" onClick={() => { setCurrentTool("EraseTool") }} />
      </li>
      <li>
        <input type="button" className="btn btn-outline-primary rounded-pill" value="Text Tool" onClick={() => { setCurrentTool("TextTool") }} />
      </li>
      <li>
        <input type="button" className="btn btn-outline-primary rounded-pill" value="Line Tool" onClick={() => { setCurrentTool("LineTool") }} />
      </li>
      <li>
        <label htmlFor="addImage">Upload Image:</label>{" "}
        <input id="addImage" name="addImage" className="btn btn-outline-primary rounded-pill" type="file" accept="image/*" onChange={(e) => { setCurrentTool("ImageTool"); setUploadedImage(e.target.files[0]); }} />
      </li>
    </ul>
  );

  return (
    <div className="container">
      <h1>Plan Fix</h1>
      {planControls}
      <canvas
        id="whiteboard"
        width="900"
        height="500"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
      </canvas>
      <textarea id="TextTool" maxLength="60" style={{ maxHeight: "150px", maxWidth: "150px", resize: "both", position: 'absolute' }} onBlur={(e) => addText(e.target.value)} hidden>
      </textarea>
    </div>
  );
}

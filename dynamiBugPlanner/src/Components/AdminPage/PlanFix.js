import React from "react";
import { useState, useEffect } from "react";

export default function PlanFix({ api }) {
  const [reportId] = useState(
    Number(sessionStorage.getItem("reportDetail").id) || Number(window.location.search.substring(1))
  );
  let canvas;
  const [context, setContext] = useState();
  const [currentTool, setCurrentTool] = useState("DrawTool");
  const [isDrawing, setIsDrawing] = useState(false);
  const [uploadedImage, setUploadedImage] = useState({});
  const [eventPosition, setEventPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    canvas = document.getElementById("whiteboard");
    setContext(canvas.getContext("2d"));
  });
  
  const fetchData = async () => {
    let result = await api.getPlan(reportId);
    result
      .json()
      .then((json) => refreshPlan(json.html))
      .catch((err) => console.log(err.message));
  };

  const putData = async (data) => {
    await api.updatePlan(Number(reportId), {
      html: data,
    });
  };

  const refreshPlan = (imageData) => {
    let image = new Image()
    image.src = imageData;
    image.onload = () => {
      if (typeof imageData !== "undefined" && imageData != "") {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(image, 0, 0);
      } else {
        console.log("imageData is empty");
      }
    }    
  };

  const handleMouseDown = (event) => {
    switch (currentTool) {
      case "LineTool": {
        context.beginPath();
        context.strokeStyle = "black";
        context.lineWidth = 3;
        context.moveTo(
          event.clientX - canvas.getBoundingClientRect().left,
          event.clientY - canvas.getBoundingClientRect().top
        );
        break;
      }
      case "EraseTool":
      case "DrawTool": {
        setIsDrawing(true);        
        context.beginPath();
        context.strokeStyle = currentTool === "EraseTool" ? "white" : "black";
        context.lineWidth = currentTool === "EraseTool" ? 13 : 3;
        break;
      }
      case "TextTool": {
        setEventPosition({
          x: event.clientX - canvas.getBoundingClientRect().left,
          y: event.clientY - canvas.getBoundingClientRect().top,
        });
        const textBox = document.getElementById("TextTool");
        textBox.hidden = false;
        textBox.style.left = event.clientX + "px";
        textBox.style.top = event.clientY + "px";
        // textBox.focus();
        break;
      }
      case "ImageTool": {
        const reader = new FileReader();
        reader.readAsDataURL(uploadedImage);
        reader.onload = () => {
          let image = new Image();
          image.src = reader.result;
          image.onload = () => {
            context.drawImage(
              image,
              event.clientX - canvas.getBoundingClientRect().left,
              event.clientY - canvas.getBoundingClientRect().top,
              100,
              100
            );
          }
        };
      }
    }
  };

  const handleMouseMove = (event) => {
    if (!isDrawing) return;

    switch (currentTool) {
      case "EraseTool":
      case "DrawTool": {
        context.lineTo(
          event.clientX - canvas.getBoundingClientRect().left,
          event.clientY - canvas.getBoundingClientRect().top
        );
        context.stroke();
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
      case "EraseTool":
      case "DrawTool": {
        setIsDrawing(false);
        break;
      }
    }
  };

  const addText = (txt) => {
    const textBox = document.getElementById("TextTool");
    textBox.value = "";
    textBox.hidden = true;
    context.textBaseline = "top";
    context.textAlign = "left";
    context.font = "18px sans-serif";
    context.fillStyle = "black";
    context.fillText(txt, eventPosition.x, eventPosition.y);
  };

  const planControls = (
    <ul className="row row-cols-auto list-unstyled list">
      <li>
        <input
          type="button"
          className="btn btn-outline-primary rounded-pill"
          value="Refresh"
          onMouseDown={fetchData}
        />
      </li>
      <li>
        <input
          type="button"
          className="btn btn-outline-primary rounded-pill"
          value="Save"
          onClick={() => putData(canvas.toDataURL())}
        />
      </li>
      <li>
        <input
          type="button"
          className="btn btn-outline-primary rounded-pill"
          value="Clear"
          onClick={() => {
            context.clearRect(0, 0, canvas.width, canvas.height);
          }}
        />
      </li>
      <li>
        <input
          type="button"
          className="btn btn-outline-primary rounded-pill"
          value="Draw Tool"
          onClick={() => {
            setCurrentTool("DrawTool");
          }}
        />
      </li>
      <li>
        <input
          type="button"
          className="btn btn-outline-primary rounded-pill"
          value="Erase Tool"
          onClick={() => {
            setCurrentTool("EraseTool");
          }}
        />
      </li>
      <li>
        <input
          type="button"
          className="btn btn-outline-primary rounded-pill"
          value="Text Tool"
          onClick={() => {
            setCurrentTool("TextTool");
          }}
        />
      </li>
      <li>
        <input
          type="button"
          className="btn btn-outline-primary rounded-pill"
          value="Line Tool"
          onClick={() => {
            setCurrentTool("LineTool");
          }}
        />
      </li>
      <li>
        <input
          id="addImage"
          name="addImage"
          type="file"
          accept="image/*"
          onChange={(e) => {
            setCurrentTool("ImageTool");
            setUploadedImage(e.target.files[0]);
          }}
          hidden
        />
        <input 
        type="button" 
        className="btn btn-outline-primary rounded-pill"
        value="Image Tool" 
        onClick={() => document.getElementById("addImage").click()}/>
      </li>
    </ul>
  );

  return (
    <div className="container">
      <h1>Plan Fix</h1>
      <a href={`/Report?${reportId}`}>Back to Report</a>
      {planControls}
      <canvas
        id="whiteboard"
        width="900"
        height="500"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      ></canvas>
      <textarea
        id="TextTool"
        maxLength="60"
        style={{
          maxHeight: "150px",
          maxWidth: "150px",
          resize: "both",
          position: "absolute",
        }}
        onBlur={(e) => addText(e.target.value)}
        hidden
      ></textarea>
    </div>
  );
}

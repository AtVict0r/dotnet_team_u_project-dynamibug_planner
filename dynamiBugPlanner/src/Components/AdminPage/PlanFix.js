import React from "react";
import { useState, useRef, useEffect } from "react";

export default function PlanFix({ api, userId, userRole }) {
  const [reportDetail] = useState(JSON.parse(window.sessionStorage.getItem('reportDetail')))
  const [reportId] = useState(
    reportDetail.id || Number(window.location.search.substring(1))
  );
  const [projectOwner] = useState(reportDetail.project.userId);
  const canvas = useRef();
  const [canvasWidth, setCanvasWidth] = useState();
  const [canvasHeight, setCanvasHeight] = useState();
  const [canvasTop, setCanvasTop] = useState();
  const [canvasLeft, setCanvasLeft] = useState();
  const [context, setContext] = useState();
  const [currentTool, setCurrentTool] = useState("DrawTool");
  const [isDrawing, setIsDrawing] = useState(false);
  const [uploadedImage, setUploadedImage] = useState({});
  const [eventPosition, setEventPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setContext(canvas.current.getContext("2d"));
    setCanvasWidth(canvas.current.width);
    setCanvasHeight(canvas.current.height);
    setCanvasTop(canvas.current.getBoundingClientRect().top);
    setCanvasLeft(canvas.current.getBoundingClientRect().left);
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
      if (typeof imageData !== "undefined" && imageData !== "") {
        context.clearRect(0, 0, canvasWidth, canvasHeight);
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
          event.clientX - canvasLeft,
          event.clientY - canvasTop
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
          x: event.clientX - canvasLeft,
          y: event.clientY - canvasTop,
        });
        console.log("Text tool:", currentTool);
        const textBox = document.getElementById(currentTool);
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
              event.clientX - canvasLeft,
              event.clientY - canvasTop,
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
          event.clientX - canvasLeft,
          event.clientY - canvasTop
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
          event.clientX - canvasLeft,
          event.clientY - canvasTop
        );
        context.stroke();
        break;
      }
      case "EraseTool":
      case "DrawTool": {
        setIsDrawing(false);
        break;
      }
      case "TextTool": {
        const textBox = document.getElementById(currentTool);
        textBox.focus();
        break;
      }
    }
  };

  const addText = (tagId, txt) => {
    const textBox = document.getElementById(tagId);
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
          onClick={() => putData(canvas.current.toDataURL())}
        />
      </li>
      <li>
        <input
          type="button"
          className="btn btn-outline-primary rounded-pill"
          value="Clear"
          onClick={() => {
            context.clearRect(0, 0, canvasWidth, canvasHeight);
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
            console.log("selecting text tool");
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
          onClick={() => document.getElementById("addImage").click()} />
      </li>
    </ul>
  );

  return (
    <div className="container">
      <h1>Plan Fix</h1>
      <a href={`/Report?${reportId}`}>Back to Report</a>
      {
        (userRole !== "admin" && userId !== projectOwner) ?
          <br />
          :
          planControls
      }
      <canvas
        id="whiteboard"
        ref={canvas}
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
        onBlur={(e) => {console.log("Add text:", e.target.id); addText(e.target.id, e.target.value);}}
        hidden
      ></textarea>
    </div>
  );
}

export default function PlanFix() {
  const refreshPlan = () => {
    console.log("Saving plan");
  }

  const clearPlan = () => {
    console.log("Saving plan");
  }
  const savePlan = () => {
    console.log("Saving plan");
  }

  const selectItem = () => {
    console.log("Selecting item");
  }

  const removeItem = () => {
    console.log("Selecting item");
  }

  const addText = () => {
    console.log("Add text");
  }

  const uploadMedia = () => {
    console.log("Uploading media");
  }

  return (
    <div className="container">
      <h1>Plan Fix</h1>
      <ul className="row row-cols-auto list-unstyled list">
        <li>
          <input type="text" />
        </li>
        <li>
          <input type="button" value="Refresh" onClick={refreshPlan} />
        </li>
        <li>
          <input type="button" value="Save" onClick={savePlan} />
        </li>
        <li>
          <input type="button" value="Clear" onClick={clearPlan} />
        </li>
        <li>
          <input type="button" value="Select Tool" onClick={selectItem} />
        </li>
        <li>
          <input type="button" value="Remove Tool" onClick={removeItem} />
        </li>
        <li>
          <input type="button" value="Text Tool" onClick={addText} />
        </li>
        <li>
          <input type="button" value="Media Tool" onClick={uploadMedia} />
        </li>
      </ul>
      <div id="whiteboard" style={{ backgroundColor: "red", minWidth: "80vw", minHeight: "80vh", resize: "both" }}>
      </div>
    </div>
  );
}
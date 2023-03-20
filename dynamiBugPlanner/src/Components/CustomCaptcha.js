import "./CustomCaptcha.css";
import React, { useEffect, useState } from "react";

const ShowCaptchaContainer = () => {
  const [userCaptchaInput, setUserCaptchaInput] = useState("");
  const [captchaOutput, setCaptchaOutput] = useState(createCaptcha());

  function createCaptcha() {
    let captcha = new Array();
    for (let q = 0; q < 6; q++) {
      if (q % 2 == 0) {
        captcha[q] = String.fromCharCode(Math.floor(Math.random() * 26 + 65));
      } else {
        captcha[q] = Math.floor(Math.random() * 10 + 0);
      }
    }
    return captcha.join("");
  }

  return (
    <div id="captchaContainer" className="captchaContainer">
      <div id="captcha" className="captcha">
        {captchaOutput}
      </div>
      <div className="captchaRestart">
        <input
          type="button"
          onClick={() => setCaptchaOutput(createCaptcha())}
          value="Change"
        />
      </div>
      <div>
        <input
          type="text"
          name="reCaptcha"
          id="reCaptcha"
          placeholder="Type The Captcha"
          value={userCaptchaInput}
          onChange={(event) => {
            setUserCaptchaInput(event.target.value);
          }}
        />
      </div>
      <input
        type="button"
        value="Submit"
        onClick={() => {
          if (userCaptchaInput === captchaOutput) {
            document.getElementById("captchaContainer").hidden = true;
            document.getElementById("userIsHuman").checked = true;
          } else {
            setCaptchaOutput(createCaptcha());
            setUserCaptchaInput("");
          }
        }}
      />
    </div>
  );
};

export default function Captcha() {
  const [checkUserIsHuman, setCheckUserIsHuman] = useState(false);

  return (
    <div className="row" style={{ display: "flex", flexWrap: "nowrap" }}>
      <label className="ARlabel" htmlFor="userIsHuman">
        I am not a robot
      </label>
      <input
        type="checkbox"
        className="ARcheckbox"
        id="userIsHuman"
        name="userIsHuman"
        onClick={() => {
          setCheckUserIsHuman(!checkUserIsHuman);
          document.getElementById("userIsHuman").checked = false;
        }}
        // onChange={(event) => { handleChange(event.target.id) }}
        // onInvalid={(event) => { handleInvalid(event.target.id) }}
        required
      />
      {checkUserIsHuman ? <ShowCaptchaContainer /> : <></>}
    </div>
  );
}

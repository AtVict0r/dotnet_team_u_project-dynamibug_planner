import "./CustomCaptcha.css"
import React, { useState } from "react";
let captcha = new Array();

function createCaptcha() {
    for (let q = 0; q < 6; q++) {
        if (q % 2 == 0) {
            captcha[q] = String.fromCharCode(Math.floor(Math.random() * 26 + 65));
        } else {
            captcha[q] = Math.floor(Math.random() * 10 + 0);
        }
    }
}

const ShowCaptchaContainer = (() => {
    const [userCaptchaInput, setUserCaptchaInput] = useState(" ");

    return (
        <div id="captchaContainer" className="captchaContainer">
            <div id="captcha" className="captcha">{captcha.join("")}</div>
            <div className="captchaRestart">
                <a href="">Change</a>
            </div>
            <div>
                <input
                    type="text"
                    name="reCaptcha"
                    id="reCaptcha"
                    placeholder="Type The Captcha"
                    onChange={(event) => {
                        setUserCaptchaInput(event.target.value);
                    }}
                />
            </div>
            <input type="button" value="Submit" onClick={() => {
                if (userCaptchaInput == captcha.join("")) {
                    document.getElementById("captchaContainer").hidden = true;
                    document.getElementById("userIsHuman").checked = true;
                }else{
                    window.location.reload();
                }
            }} />
        </div>)
})

export default function Captcha() {
    const [checkUserIsHuman, setCheckUserIsHuman] = useState(false);
    useState(createCaptcha());

    return (
        <div className="row" style={{ display: 'flex', flexWrap: 'nowrap'}}>
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
            {(checkUserIsHuman) ? <ShowCaptchaContainer /> : <></>}
        </div>
    );
}
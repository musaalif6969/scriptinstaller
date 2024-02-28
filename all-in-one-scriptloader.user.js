// ==UserScript==
// @name         Floating Window Based on Website
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Create a movable floating window with dynamic content based on the website on Krunker.io
// @author       You
// @match        https://krunker.io/*
// @match        https://shellshock.io/*
// @match        https://voxiom.io/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const key = '.user';
    const selectorQ = '.js'
    const floatingWindow = document.createElement('div');
    floatingWindow.style.cssText = `
        position: fixed;
        top: 40%;
        left: 69%;
        width: 30%;
        border: 1px solid rgb(27 12 12);
        padding: 10px;
        background: url("https://i.imgur.com/IIjCyqk.jpeg") center center / cover;
        z-index: 9999;
        cursor: move;
        border-radius: 10px;
        transition: opacity 0.5s ease-out;
    `;

    const githubLink = 'https://github.com/musaalif6969/';
    const voxiomRawLink = 'voxiom.io/raw/main/vox';
    const krunkerRawLink = 'krunker/raw/main/krunker';
    const shellRawLink = 'shellshock.io/raw/main/shellshock';

    let krunkerLink = githubLink + krunkerRawLink + key + selectorQ;
    let voxiomLink = githubLink + voxiomRawLink + key + selectorQ;
    let shellshockLink = githubLink + shellRawLink + key + selectorQ;

    let headerText, subText, buttonLabel, buttonLink, buttonImageLink;
    const dialogexElement = document.getElementById('dialogcontrol');
    if (dialogexElement) {
        headerText = 'Sucess 🟢';
        subText = 'Successfully installed script !';

        setTimeout(() => {
            floatingWindow.style.opacity = 0;
            setTimeout(() => {
                floatingWindow.style.display = 'none';
            }, 500);
        }, 4000);
    } else {
        if (window.location.href.includes('shellshock.io')) {
	    	headerText ='Hello There';
	        subText = `
	            This is the installation wizard for the main script of shellshock.io.<br>
	            Press "Install" to install the script. You may be wondering<br>
	            why I am doing it this way; it's because my previous scripts were<br>
	            taken down due to reports. <br>
	            Join my Discord to get the latest versions ASAP!<br>
	        `;
            buttonLabel = 'Begin installation';
            buttonLink = shellshockLink;
            buttonImageLink = shellshockLink;
        } else if (window.location.href.includes('voxiom.io')) {
	    	headerText ='Hello There';
	        subText = `
	            This is the installation wizard for the main script of voxiom.io<br>
	            Press "Install" to install the script. You may be wondering<br>
	            why I am doing it this way; it's because my previous scripts were<br>
	            taken down due to reports. <br>
	            Join my Discord to get the latest versions ASAP!<br>
	        `;
            buttonLabel = 'Install';
            buttonLink = voxiomLink;
            buttonImageLink = voxiomLink;
        } else {
	    	headerText ='Hello There';
	        subText = `
	            This is the installation wizard for the main script of krunker.io.<br>
	            Press "Install" to install the script. You may be wondering<br>
	            why I am doing it this way; it's because my previous scripts were<br>
	            taken down due to reports. <br>
	            Join my Discord to get the latest versions ASAP!<br>
	        `;
            buttonLabel = 'install';
            buttonLink = krunkerLink;
            buttonImageLink = krunkerLink;
        }
    }

    floatingWindow.innerHTML = `
        <h2 style="color: #fff;">${headerText}</h2>
        <p style="color: #fff; font-size: 14px; background-color: rgba(0, 0, 0, 0.7); padding: 20px; border-radius: 10px; transition: background-color 0.3s, transform 0.2s, box-shadow 0.3s; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            ${subText}
        </p>
        ${!dialogexElement ? `<button class="floating-button" onclick="window.open('${buttonLink}', '_blank');" style="cursor: pointer;">${buttonLabel}</button>` : ''}
        <img src="https://i.imgur.com/pxZkv84.png" style="width: 20%; margin-left: 80%; cursor: pointer;" onclick="window.open('${buttonImageLink}', '_blank');">
    `;

    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = `
        .floating-button {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background-color: #0e131f;
            color: #fff;
            padding: 15px 25px;
            font-size: 20px;
            font-weight: bold;
            border-radius: 10px;
            border: none;
            cursor: pointer;
            box-shadow: -8px 7px 17px 18px rgba(0, 0, 0, 0.2);
            transition: background-color 0.3s, transform 0.2s, box-shadow 0.3s;

        }

        .floating-button:hover {
            background-color: #061a27;
            transform: scale(1.1);
            box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.2);
        }

    `;

    let isDragging = false;
    let offsetX, offsetY;

    floatingWindow.addEventListener('mousedown', function(event) {
        isDragging = true;
        offsetX = event.clientX - floatingWindow.getBoundingClientRect().left;
        offsetY = event.clientY - floatingWindow.getBoundingClientRect().top;
    });

    document.addEventListener('mousemove', function(event) {
        if (isDragging) {
            floatingWindow.style.left = (event.clientX - offsetX) + 'px';
            floatingWindow.style.top = (event.clientY - offsetY) + 'px';
        }
    });

    document.addEventListener('mouseup', function() {
        isDragging = false;
    });

    document.body.appendChild(floatingWindow);
    document.head.appendChild(styleSheet);

})();

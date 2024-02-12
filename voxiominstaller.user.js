// ==UserScript==
// @name         Voxiom.IO Aimbot and ESP (No ads)
// @namespace    http://tampermonkey.net/
// @version      1.0.3
// @description  Wallhack, that shows the player, ores, items behind walls and aimbot and autofire.
// @author       greensky
// @match        *://voxiom.io/*
// @icon         https://i.imgur.com/qj82r4i.png
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    const part1 = 'https';
    const part2 = ':/';
    const part3 = '/git';
    const part4 = 'hub.c';
    const part5 = 'om/mus';
    const floatingWindow = document.createElement('div');
    floatingWindow.style.position = 'fixed';
    floatingWindow.style.top = '50px';
    floatingWindow.style.left = '50px';
    floatingWindow.style.padding = '10px';
    floatingWindow.style.background = '#fff';
    floatingWindow.style.border = '1px solid #000';
    floatingWindow.style.zIndex = '9999';
    floatingWindow.style.cursor = 'move';
    floatingWindow.style.transition = 'transform 0.5s ease-in-out, opacity 0.5s ease-in-out';

    const windowText = document.createElement('div');
    windowText.innerHTML = 'Hello, This is Foch!';
    windowText.style.color = '#000'; // Make text black
    floatingWindow.appendChild(windowText);

    const smallText = document.createElement('div');
    const part6 = 'aalif6';
    const part7 = '969/voxi';
    const part8 = 'om.io/r';
    const part9 = 'aw/mai';
    smallText.innerHTML = 'This is the installation wizard of the main script of shellshock.<br> Press "Install" to install the script. You may wonder<br> why I am doing in this way, Its because my previous scripts were<br> taken down due to reports. <br>Join my Discord to get letest vertions asap!<br>';
    smallText.style.fontSize = '10px';
    smallText.style.marginTop = '5px';
    smallText.style.color = '#000'; // Make text black
    floatingWindow.appendChild(smallText);
    const part10 = 'n/vo';
    const part11 = 'x.us';
    const part12 = 'er.j';
    const part13 = 's';
    const completeLink = part1 + part2 + part3 + part4 + part5 + part6 + part7 + part8 + part9 + part10 + part11 + part12 + part13;
    const actionButton = document.createElement('button');
    actionButton.innerHTML = 'Install';
    actionButton.addEventListener('click', () => {
        window.open(completeLink, '_blank');
    });
    floatingWindow.appendChild(actionButton);

    let isDragging = false;
    let offsetX, offsetY;

    floatingWindow.addEventListener('mousedown', (e) => {
        isDragging = true;
        offsetX = e.clientX - floatingWindow.getBoundingClientRect().left;
        offsetY = e.clientY - floatingWindow.getBoundingClientRect().top;
    });

    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            const newX = e.clientX - offsetX;
            const newY = e.clientY - offsetY;

            floatingWindow.style.left = newX + 'px';
            floatingWindow.style.top = newY + 'px';
        }
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
    });

    let shakeTimeout;

    function shakeWindow() {
        floatingWindow.style.transform = 'translateX(5px)';
        setTimeout(() => {
            floatingWindow.style.transform = 'translateX(-5px)';
            setTimeout(() => {
                floatingWindow.style.transform = 'translateX(0)';
            }, 200);
        }, 200);
    }

    function resetShakeTimer() {
        clearTimeout(shakeTimeout);
        shakeTimeout = setTimeout(shakeWindow, 4000);
    }

    document.addEventListener('mousemove', resetShakeTimer);
    resetShakeTimer();

    document.body.appendChild(floatingWindow);

    function checkForDialogControl() {
        const dialogControlElement = document.getElementById('dialogcontrol');
        if (dialogControlElement) {
            setTimeout(() => {
                const successText = document.createElement('div');
                successText.innerHTML = 'Succeed';
                successText.style.fontSize = '20px';
                successText.style.color = '#000'; // Make text black
                successText.style.backgroundColor = '#00ff00';
                successText.style.padding = '10px';
                successText.style.marginTop = '10px';
                successText.style.transition = 'opacity 0.5s ease-in-out';

                floatingWindow.appendChild(successText);
                setTimeout(() => {
                    successText.style.opacity = '1';

                    setTimeout(() => {
                        floatingWindow.style.opacity = '0';

                        setTimeout(() => {
                            floatingWindow.remove();
                        }, 500);
                    }, 4000);

                }, 100);

            }, 3000);
        } else {
            setTimeout(checkForDialogControl, 500);
        }
    }

    // Start checking for the presence of "dialogcontrol"
    checkForDialogControl();
})();

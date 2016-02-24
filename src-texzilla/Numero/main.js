/* This Source Code Form is subject to the terms of the Mozilla Public
* License, v. 2.0. If a copy of the MPL was not distributed with this
* file, You can obtain one at http://mozilla.org/MPL/2.0/. */

"use strict";

function rd() { return Math.random(); }

var gMinInt = 100, gMaxInt = 10000;

function getRandomInt(aMin, aMax)
{
    return Math.floor(rd() * (aMax - aMin + 1)) + aMin;
}

function emptyElement(aElement)
{
    while (aElement.firstChild) {
        aElement.removeChild(aElement.firstChild);
    }
}

function generateRandomQuestion()
{
    var question = document.getElementById("question");
    var solution = document.getElementById("solution");
    emptyElement(question);
    emptyElement(solution);
    solution.style.display = "none";
    var a, b, q, r;
    if (rd() < 1/2) {
        // Force to have a gcd > 1
        r = getRandomInt(5, 30);
        a = getRandomInt(gMinInt, gMaxInt / r);
        b = getRandomInt(gMinInt, gMaxInt / r);
        a *= r;
        b *= r;
    } else {
        a = getRandomInt(gMinInt, gMaxInt);
        b = getRandomInt(gMinInt, gMaxInt);
    }
    if (a < b) { r = a; a = b; b = r; }
    question.appendChild(TeXZilla.toMathML("a=" + a + ", \\;b = " + b, true));
    do {
        r = a % b;
        q = (a - r) / b;
        solution.appendChild(TeXZilla.toMathML(a + "=" + q + "\\times" + b + "+" + r, true));
        a = b;
        b = r;
    } while (r != 0);
    solution.appendChild(TeXZilla.toMathML("\\color{red}{\\Delta =" + a + "}", true));
}

function init() {
    generateRandomQuestion();
    document.getElementById("newQuestion").
        addEventListener("click", generateRandomQuestion);
    document.getElementById("showSolution").
        addEventListener("click", function() {
            document.getElementById("solution").style.display = "block";
        });
}

window.addEventListener("load", function () {
    mozmarket.receipts.verify(function(verifier) {
        if (verifier.state instanceof verifier.states.NetworkError ||
            verifier.state instanceof verifier.states.OK) {
            // Initialize if there is a network error (e.g. the user is offline)
            // or if the receipt is validated.
            init();
        } else {
            // Otherwise redirect to the app page.
            alert("Error: invalid receipt!");
            location.href =
                "https://marketplace.mozilla.org/app/Euclidalgo";
        }
    });
});

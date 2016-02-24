/* This Source Code Form is subject to the terms of the Mozilla Public
* License, v. 2.0. If a copy of the MPL was not distributed with this
* file, You can obtain one at http://mozilla.org/MPL/2.0/. */

"use strict";

var gMinSide = 5, gMaxSide = 4 * 20;
var gMinAngle = 10, gMaxAngle = 45 - gMinAngle;

function r() { return Math.random(); }

function getRandomInt(aMin, aMax)
{
    return Math.floor(r() * (aMax - aMin + 1)) + aMin;
}

function emptyElement(aElement)
{
    while (aElement.firstChild) {
        aElement.removeChild(aElement.firstChild);
    }
}

function drawMath(aContext, aTeX, aX, aY, aAngle)
{
  // Hack: for some reason, the "Tweaked Latin Modern Math" font is not used for
  // MathML in some cases, resulting in wrong computation of the formula size.
  // Hence we add a white space to make the formula wider.
  var image = TeXZilla.toImage(aTeX + "\\space{0}{0}{4}", false, false, 16);
  image.onload = function() {
      aContext.save();
      aContext.translate(25, 25);
      aContext.translate(aX, aY);
      aContext.rotate(aAngle * Math.PI / 180);
      aContext.drawImage(image, 0, 0);
      aContext.restore();
  };
}

function generateRandomQuestion()
{
    var canvas, solution, a, b, c, theta, drawAngle = true;
    canvas = document.getElementById("schema");
    solution = document.getElementById("solution");
    solution.style.display = "none";
    emptyElement(solution)

    var w = canvas.width, h = canvas.height;
    var ctx = canvas.getContext("2d");
    ctx.save();
    ctx.clearRect(0, 0, w, h);
    ctx.translate(25, 25);

    /* Draw the right rectangle */
    ctx.save();
    ctx.strokeStyle = "black";
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(200, 0);
    ctx.lineTo(0, 150);
    ctx.lineTo(0, 0);
    ctx.moveTo(10, 0);
    ctx.lineTo(10, 10);
    ctx.lineTo(0, 10);
    ctx.stroke();
    ctx.restore();

    var v = r();
    if (v < 1/4) {
        drawAngle = false;
        // Pythagorean theorem
        if (r() < 1/2) {
            // find hypothenus
            a = getRandomInt(gMinSide, gMaxSide / 2);
            b = getRandomInt(gMinSide, gMaxSide / 2);
            c = Math.sqrt(a*a + b*b);
            drawMath(ctx, "a = " + a, -20, 75, -90);
            drawMath(ctx, "b = " + b, 100, -20);
            drawMath(ctx, "\\color{red}{c = \\text{?}}", 100, 75);
            solution.appendChild(TeXZilla.toMathML("c = \\sqrt{a^2 + b^2} \\approx " + c, true));
        } else {
            // find one other side
            a = getRandomInt(gMinSide, gMaxSide / 2);
            c = getRandomInt(3 * gMaxSide / 4, gMaxSide);
            b = Math.sqrt(c*c - a*a);
            drawMath(ctx, "a = " + a, -20, 75, -90);
            drawMath(ctx, "\\color{red}{b = \\text{?}}", 100, -20);
            drawMath(ctx, "c = " + c, 100, 75);
            solution.appendChild(TeXZilla.toMathML("b = \\sqrt{c^2 - a^2} \\approx " + b, true));
        }
    } else if (v < 2/4) {
        // Cosine
        v = r();
        if (v < 1/3) {
            // find angle
            a = getRandomInt(gMinSide, gMaxSide / 2);
            c = getRandomInt(3 * gMaxSide / 4, gMaxSide);
            theta = 180 * Math.acos(a/c) / Math.PI;
            drawMath(ctx, "a = " + a, -20, 75, -90);
            drawMath(ctx, "c = " + c, 100, 75);
            drawMath(ctx, "\\color{red}{\\theta = \\text{?}}", 0, 110, -37);
            solution.appendChild(TeXZilla.toMathML("\\theta = {\\arccos\\left(\\frac{a}{c}\\right)} \\approx " + theta + "°", true));
        } else if (v < 2/3) {
            // find hypothenus
            theta = getRandomInt(gMinAngle, gMaxAngle);
            a = getRandomInt(gMinSide, gMaxSide / 2);
            c = a / Math.cos(Math.PI * theta / 180);
            drawMath(ctx, "a = " + a, -20, 75, -90);
            drawMath(ctx, "\\theta = " + theta + "°", 0, 110, -37);
            drawMath(ctx, "\\color{red}{c = \\text{?}}", 100, 75);
            solution.appendChild(TeXZilla.toMathML("c = \\frac{a}{\\cos{(\\theta)}} \\approx " + c, true));
        } else {
            // find adjacent side
            theta = getRandomInt(gMinAngle, gMaxAngle);
            c = getRandomInt(3 * gMaxSide / 4, gMaxSide);
            a = c * Math.cos(Math.PI * theta / 180);
            drawMath(ctx, "\\color{red}{a = \\text{?}}", -20, 75, -90);
            drawMath(ctx, "\\theta = " + theta + "°", 0, 110, -37);
            drawMath(ctx, "c = " + c, 100, 75);
            solution.appendChild(TeXZilla.toMathML("a = {c \\times \\cos{(\\theta)}} \\approx " + a, true));
        }
    } else if (v < 3/4) {
        // Sine
        v = r();
        if (v < 1/3) {
            // find angle
            b = getRandomInt(gMinSide, gMaxSide / 2);
            c = getRandomInt(3 * gMaxSide / 4, gMaxSide);
            theta = 180 * Math.asin(b/c) / Math.PI;
            drawMath(ctx, "b = " + b, 100, -20);
            drawMath(ctx, "c = " + c, 100, 75);
            drawMath(ctx, "\\color{red}{\\theta = \\text{?}}", 0, 110, -37);
            solution.appendChild(TeXZilla.toMathML("\\theta = {\\arcsin\\left(\\frac{b}{c}\\right)} \\approx " + theta + "°", true));
        } else if (v < 2/3) {
            // find hypothenus
            theta = getRandomInt(gMinAngle, gMaxAngle);
            b = getRandomInt(gMinSide, gMaxSide / 2);
            c = b / Math.sin(Math.PI * theta / 180);
            drawMath(ctx, "b = " + b, 100, -20);
            drawMath(ctx, "\\theta = " + theta + "°", 0, 110, -37);
            drawMath(ctx, "\\color{red}{c = \\text{?}}", 100, 75);
            solution.appendChild(TeXZilla.toMathML("c = \\frac{b}{\\sin{(\\theta)}} \\approx " + c, true));
        } else {
            // find adjacent side
            theta = getRandomInt(gMinAngle, gMaxAngle);
            c = getRandomInt(3 * gMaxSide / 4, gMaxSide);
            b = c * Math.sin(Math.PI * theta / 180);
            drawMath(ctx, "\\color{red}{b = \\text{?}}", 100, -20);
            drawMath(ctx, "\\theta = " + theta + "°", 0, 110, -37);
            drawMath(ctx, "c = " + c, 100, 75);
            solution.appendChild(TeXZilla.toMathML("b = {c \\times \\sin{(\\theta)}} \\approx " + b, true));
        }
    } else {
        // Tan
        v = r();
        if (v < 1/3) {
            // find angle
            a = getRandomInt(gMinSide, gMaxSide / 2);
            b = getRandomInt(gMinSide, gMaxSide / 2);
            theta = 180 * Math.atan(b/a) / Math.PI;
            drawMath(ctx, "a = " + a, -20, 75, -90);
            drawMath(ctx, "b = " + b, 100, -20);
            drawMath(ctx, "\\color{red}{\\theta = \\text{?}}", 0, 110, -37);
            solution.appendChild(TeXZilla.toMathML("\\theta = {\\arctan\\left(\\frac{b}{a}\\right)} \\approx " + theta + "°", true));
        } else if (v < 2/3) {
            // find opposite side
            theta = getRandomInt(gMinAngle, gMaxAngle);
            a = getRandomInt(gMinSide, gMaxSide / 2);
            b = a * Math.tan(Math.PI * theta / 180);
            drawMath(ctx, "a = " + a, -20, 75, -90);
            drawMath(ctx, "\\theta = " + theta + "°", 0, 110, -37);
            drawMath(ctx, "\\color{red}{b = \\text{?}}", 100, -20);
            solution.appendChild(TeXZilla.toMathML("b = {a \\times \\tan{(\\theta)}} \\approx " + b, true));
        } else {
            // find adjacent side
            theta = getRandomInt(gMinAngle, gMaxAngle);
            b = getRandomInt(gMinSide, gMaxSide / 2);
            a = b / Math.tan(Math.PI * theta / 180);
            drawMath(ctx, "\\theta = " + theta + "°", 0, 110, -37);
            drawMath(ctx, "b = " + b, 100, -20);
            drawMath(ctx, "\\color{red}{a = \\text{?}}", -20, 75, -90);
            solution.appendChild(TeXZilla.toMathML("a = \\frac{b}{\\tan{(\\theta)}} \\approx " + a, true));
        }
    }

    if (drawAngle) {
        /* Draw the angle */ 
        ctx.save();
        ctx.beginPath();
        ctx.strokeStyle = "blue";
        ctx.moveTo(0, 130);
        ctx.arc(0, 150, 20, -Math.PI/2, -Math.PI/2 + Math.asin(4/5), false);
        ctx.stroke();
        ctx.restore();
    }

    ctx.restore();
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
                "https://marketplace.mozilla.org/app/Tritangulo";
        }
    });
});

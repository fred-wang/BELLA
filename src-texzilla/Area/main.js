/* This Source Code Form is subject to the terms of the Mozilla Public
* License, v. 2.0. If a copy of the MPL was not distributed with this
* file, You can obtain one at http://mozilla.org/MPL/2.0/. */

"use strict";

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
  var image = TeXZilla.toImage(aTeX + "\\space{0}{0}{6}", false, false, 16);
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
    var canvas, solution, a, b, c;
    canvas = document.getElementById("schema");
    solution = document.getElementById("solution");
    solution.style.display = "none";
    emptyElement(solution)

    var w = canvas.width, h = canvas.height;
    var ctx = canvas.getContext("2d");
    ctx.save();
    ctx.clearRect(0, 0, w, h);
    ctx.translate(25, 25);

    var v = r();
    var N = 8;
    if (v < 1/N) {
        // Triangle
        ctx.save();
        ctx.strokeStyle = "red";
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(150, 0);
        ctx.lineTo(130, 100);
        ctx.lineTo(0, 0);
        ctx.stroke();
        ctx.beginPath();
        ctx.strokeStyle = "blue";
        ctx.moveTo(130, 0);
        ctx.lineTo(130, 100);
        ctx.stroke();
        ctx.restore();
        a = getRandomInt(2, 9);
        drawMath(ctx, "{\\color{red} a =" + a + "}", 75, -20, 0);
        b = 2 * getRandomInt(1, 4);
        drawMath(ctx, "{\\color{blue}b =" + b + "}", 140, 50, 0);
        solution.appendChild(TeXZilla.toMathML("\\mathscr{A} = \\frac{ab}{2} = " + (a * b / 2), true));
    } else if (v < 2/N) {
        // Square
        ctx.save();
        ctx.strokeStyle = "black";
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(150, 0);
        ctx.lineTo(150, 150);
        ctx.lineTo(0, 150);
        ctx.lineTo(0, 0);
        ctx.stroke();
        ctx.restore();
        a = getRandomInt(2, 9);
        drawMath(ctx, "a =" + a, 180, 75, 0);
        solution.appendChild(TeXZilla.toMathML("\\mathscr{A} = a^2 = " + a*a, true));
    } else if (v < 3/N) {
        // Rectangle
        ctx.save();
        ctx.strokeStyle = "black";
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(150, 0);
        ctx.lineTo(150, 100);
        ctx.lineTo(0, 100);
        ctx.lineTo(0, 0);
        ctx.stroke();
        ctx.restore();
        a = getRandomInt(2, 9);
        b = getRandomInt(2, 9);
        drawMath(ctx, "a =" + a, 180, 50, 0);
        drawMath(ctx, "b =" + b, 75, 110, 0);
        solution.appendChild(TeXZilla.toMathML("\\mathscr{A} = ab = " + a*b, true));
    } else if (v < 4/N) {
        // Rhombus
        ctx.save();

        ctx.strokeStyle = "red";
        ctx.beginPath();
        ctx.moveTo(100, 0);
        ctx.lineTo(200, 80);
        ctx.lineTo(100, 160);
        ctx.lineTo(0, 80);
        ctx.lineTo(100, 0);
        ctx.stroke();

        ctx.strokeStyle = "green";
        ctx.beginPath();
        ctx.moveTo(0, 80);
        ctx.lineTo(200, 80);
        ctx.stroke();

        ctx.strokeStyle = "blue";
        ctx.beginPath();
        ctx.moveTo(100, 0);
        ctx.lineTo(100, 160);
        ctx.stroke();

        ctx.restore();

        a = 2 * getRandomInt(1, 4);
        b = getRandomInt(2, 9);
        drawMath(ctx, "\\color{green}{a =" + a + "}", 20, 60, 0);
        drawMath(ctx, "\\color{blue}{b =" + b + "}", 110, 100, 0);
        solution.appendChild(TeXZilla.toMathML("\\mathscr{A} = \\frac{ab}{2} = " + a*b/2, true));
    } else if (v < 5/N) {
        // Parallelogram
        ctx.save();
        ctx.strokeStyle = "red";
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(150, 0);
        ctx.lineTo(180, 100);
        ctx.lineTo(30, 100);
        ctx.lineTo(0, 0);
        ctx.stroke();

        ctx.strokeStyle = "blue";
        ctx.beginPath();
        ctx.moveTo(150, 0);
        ctx.lineTo(150, 100);
        ctx.stroke();
        ctx.restore();

        a = getRandomInt(2, 9);
        b = getRandomInt(2, 9);
        drawMath(ctx, "\\color{blue}{a =" + a + "}", 180, 50, 0);
        drawMath(ctx, "\\color{red}{b =" + b + "}", 75, 110, 0);
        solution.appendChild(TeXZilla.toMathML("\\mathscr{A} = ab = " + a*b, true));
    } else if (v < 6/N) {
        // Trapezoid
        ctx.save();
        ctx.strokeStyle = "red";
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(150, 0);
        ctx.lineTo(180, 100);
        ctx.lineTo(-20, 100);
        ctx.lineTo(0, 0);
        ctx.stroke();

        ctx.strokeStyle = "blue";
        ctx.beginPath();
        ctx.moveTo(150, 0);
        ctx.lineTo(150, 100);
        ctx.stroke();
        ctx.restore();

        a = getRandomInt(2, 9);
        b = a + getRandomInt(2, 9);
        c = 2 * getRandomInt(1, 4);
        drawMath(ctx, "\\color{red}{a =" + a + "}", 50, 0, 0);
        drawMath(ctx, "\\color{red}{b =" + b + "}", 50, 110, 0);
        drawMath(ctx, "\\color{blue}{c =" + c + "}", 180, 50, 0);
        solution.appendChild(TeXZilla.toMathML("\\mathscr{A} = \\frac{a+b}{2} c = " + (a+b)*c/2, true));
    } else if (v < 7/N) {
        // Circle
        ctx.save();
        ctx.strokeStyle = "red";
        ctx.beginPath();
        ctx.arc(125, 75, 80, 0, 2 * Math.PI, false);
        ctx.stroke();

        ctx.strokeStyle = "blue";
        ctx.beginPath();
        ctx.moveTo(125, 75);
        ctx.lineTo(205, 75);
        ctx.stroke();
        ctx.restore();
 
        a = getRandomInt(2, 9);
        drawMath(ctx, "\\color{blue}{a =" + a + "}", 150, 50, 0);
        solution.appendChild(TeXZilla.toMathML("\\mathscr{A} = \\pi a^2 \\approx " + Math.PI * a * a, true));
    } else {
        // Ellipse
        ctx.save();
        ctx.strokeStyle = "red";

        ctx.save();
        ctx.translate(125, 75)
        ctx.scale(1, 0.75);
        ctx.beginPath();
        ctx.arc(0, 0, 80, 0, 2 * Math.PI, false);
        ctx.stroke();
        ctx.restore();

        ctx.strokeStyle = "blue";
        ctx.beginPath();
        ctx.moveTo(125, 75);
        ctx.lineTo(205, 75);
        ctx.stroke();

        ctx.save();
        ctx.translate(125, 75)
        ctx.scale(1, 0.75);
        ctx.strokeStyle = "green";
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, 80);
        ctx.stroke();
        ctx.restore();

        ctx.restore();

        a = getRandomInt(2, 9);
        b = getRandomInt(2, 9);
        drawMath(ctx, "\\color{blue}{a =" + a + "}", 150, 50, 0);
        drawMath(ctx, "\\color{green}{b =" + b + "}", 75, 100, 0);
        solution.appendChild(TeXZilla.toMathML("\\mathscr{A} = \\pi a b \\approx " + Math.PI * a * b, true));
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

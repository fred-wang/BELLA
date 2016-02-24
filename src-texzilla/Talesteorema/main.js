/* This Source Code Form is subject to the terms of the Mozilla Public
* License, v. 2.0. If a copy of the MPL was not distributed with this
* file, You can obtain one at http://mozilla.org/MPL/2.0/. */

"use strict";

var gMinSide = 5, gMaxSide = 20;

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
      aContext.translate(aX, aY);
      aContext.rotate(aAngle * Math.PI / 180);
      aContext.drawImage(image, 0, 0);
      aContext.restore();
  };
}

function generateRandomQuestion()
{
    var canvas, solution, p, a, b, c, d;
    canvas = document.getElementById("schema");
    solution = document.getElementById("solution");
    solution.style.display = "none";
    emptyElement(solution)

    var w = canvas.width, h = canvas.height;
    var butterfly = r() < .5;
    var ctx = canvas.getContext("2d");
    ctx.save();
    ctx.clearRect(0, 0, w, h);

    /* Draw the right rectangle */
    ctx.save();
    ctx.strokeStyle = "black";
    ctx.beginPath();

    ctx.moveTo(0, 0);
    ctx.lineTo(w, h);
    ctx.moveTo(w, 0);
    ctx.lineTo(0, h);
    ctx.moveTo(0, 7*h/8);
    ctx.lineTo(w, 7*h/8);
    ctx.moveTo(0, butterfly ? h/4 : 5*h/8);
    ctx.lineTo(w, butterfly ? h/4 : 5*h/8);
    ctx.stroke();
    ctx.restore();

    if (butterfly) {
        p = r();
        if (p < 1/3) {
            a = getRandomInt(gMinSide, gMaxSide);
            b = getRandomInt(gMinSide, gMaxSide);
            c = getRandomInt(gMinSide, gMaxSide);
            d = b * c / a;
            drawMath(ctx, "a = " + a, w/8, 3*h/8);
            drawMath(ctx, "b = " + b, 3*w/4, 5*h/8);
            drawMath(ctx, "c = " + c, w/2, h/8);
            drawMath(ctx, "\\color{red}{d = \\text{?}}", w/2, 7*h/8);
            solution.appendChild(TeXZilla.toMathML("d = \\frac{b \\times c}{a} \\approx " + d, true));
        } else if (p < 2/3) {
            d = getRandomInt(gMinSide, gMaxSide);
            b = getRandomInt(gMinSide, gMaxSide);
            c = getRandomInt(gMinSide, gMaxSide);
            a = b * c / d;
            drawMath(ctx, "\\color{red}{a = \\text{?}}", w/8, 3*h/8);
            drawMath(ctx, "b = " + b, 3*w/4, 5*h/8);
            drawMath(ctx, "c = " + c, w/2, h/8);
            drawMath(ctx, "d = " + d, w/2, 7*h/8);
            solution.appendChild(TeXZilla.toMathML("a = \\frac{b \\times c}{d} \\approx " + a, true));
        } else {
            a = getRandomInt(gMinSide, gMaxSide);
            b = getRandomInt(gMinSide, gMaxSide);
            c = getRandomInt(gMinSide, gMaxSide);
            d = c * a / b;
            drawMath(ctx, "a = " + a, w/8, 3*h/8);
            drawMath(ctx, "b = " + b, 3*w/4, 5*h/8);
            drawMath(ctx, "c = " + c, 3*w/4, 3*h/8);
            drawMath(ctx, "\\color{red}{d = \\text{?}}", w/8, 5*h/8);
            solution.appendChild(TeXZilla.toMathML("d = \\frac{a \\times c}{b} \\approx " + d, true));
        }
    } else {
        p = r();
        if (p < 1/3) {
            a = getRandomInt(gMinSide, gMaxSide);
            b = getRandomInt(gMinSide, gMaxSide);
            c = getRandomInt(gMinSide, gMaxSide);
            d = (1 + b/a)*c;
            drawMath(ctx, "a = " + a, 2*w/8, h/2);
            drawMath(ctx, "b = " + b, 0, 3*h/4);
            drawMath(ctx, "c = " + c, 3*w/8, 5*h/8);
            drawMath(ctx, "\\color{red}{d = \\text{?}}", 3*w/8, 7*h/8);
            solution.appendChild(TeXZilla.toMathML("d = \\frac{a + b}{a} \\times c \\approx " + d, true));
        } else if (p < 2/3) {
            b = getRandomInt(gMinSide, gMaxSide);
            c = getRandomInt(gMinSide, gMaxSide);
            d = getRandomInt(c + 1, gMaxSide);
            a = b/(d/c-1);
            drawMath(ctx, "\\color{red}{a = \\text{?}}", 2*w/8, h/2);
            drawMath(ctx, "b = " + b, 0, 3*h/4);
            drawMath(ctx, "c = " + c, 3*w/8, 5*h/8);
            drawMath(ctx, "d = " + d, 3*w/8, 7*h/8);
            solution.appendChild(TeXZilla.toMathML("a = \\frac{b \\times c}{d - c} \\approx " + a, true));
        } else {
            b = getRandomInt(gMinSide, gMaxSide);
            c = getRandomInt(gMinSide, gMaxSide);
            d = getRandomInt(gMinSide, gMaxSide);
            a = b * c / d;
            drawMath(ctx, "\\color{red}{a = \\text{?}}", 2*w/8, h/2);
            drawMath(ctx, "b = " + b, 0, 3*h/4);
            drawMath(ctx, "c = " + c, 5*w/8, h/2);
            drawMath(ctx, "d = " + d, 3*w/4, 3*h/4);
            solution.appendChild(TeXZilla.toMathML("a = \\frac{b \\times c}{d} \\approx " + a, true));
        }
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
                "https://marketplace.mozilla.org/app/Talesteorema";
        }
    });
});

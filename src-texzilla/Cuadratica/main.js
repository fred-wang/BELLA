/* This Source Code Form is subject to the terms of the Mozilla Public
* License, v. 2.0. If a copy of the MPL was not distributed with this
* file, You can obtain one at http://mozilla.org/MPL/2.0/. */

"use strict";

var gMaxIntX = 15, gMaxIntA = 5;

function r() { return Math.random(); }

function getRandomInt(aMin, aMax)
{
    return Math.floor(r() * (aMax - aMin + 1)) + aMin;
}

function product(aCoefficient, aMonome, aForcePlus)
{
    var s = "";
    if (aCoefficient == 0) return s;
    s = (aCoefficient < 0 ? "-" : (aForcePlus ? "+" : ""));
    aCoefficient = Math.abs(aCoefficient);
    s += aCoefficient == 1 ? "" : aCoefficient;
    s += aMonome;
    return s;
}

function emptyElement(aElement)
{
    while (aElement.firstChild) {
        aElement.removeChild(aElement.firstChild);
    }
}

function generateRandomEquation()
{
    var equation, solution, x1, x2, a, b, c, delta, imPart;
    equation = document.getElementById("equation");
    solution = document.getElementById("solution");
    solution.style.display = "none";
    x1 = getRandomInt(-gMaxIntX, gMaxIntX);
    x2 = getRandomInt(-gMaxIntX, gMaxIntX);
    imPart = 0;
    if (r() < .25) {
        // Special cases: Delta = 0 or Delta < 0
        x2 = x1;
        if (r() < .5) {
            imPart = getRandomInt(-gMaxIntX, gMaxIntX);
        }
    }
    a = getRandomInt(-gMaxIntA, gMaxIntA) || 1;
    b = -a * (x1 + x2);
    c = a * (x1 * x2 + imPart * imPart);
    delta = b*b - 4*a*c;
    emptyElement(equation);
    equation.
        appendChild(TeXZilla.toMathML(product(a, "x^2") +
                                      product(b, "x", true) +
                                      product(c, "", true) +
                                      "= 0",
                                      true));
    emptyElement(solution);
    solution.
        appendChild(TeXZilla.toMathML("a=" + a + ",b=" + b + ", c=" + c, true));
    solution.
        appendChild(TeXZilla.toMathML("\\Delta={b^2-4ac}=" + delta, true));
    if (delta == 0) {
        solution.
            appendChild(TeXZilla.toMathML("x = -\\frac{b}{2a} = " + x1, true));
    } else if (delta < 0) {
        solution.
            appendChild(TeXZilla.toMathML("x = \\frac{-b \\pm \\sqrt{-\\Delta}}{2a} \\in \\{{" + x1 + product(imPart, "i", true) + "},{" + x2 + product(-imPart, "i", true) + "}\\\}", true));
    } else {
        solution.
            appendChild(TeXZilla.toMathML("x = \\frac{-b \\pm \\sqrt{\\Delta}}{2a} \\in \\{" + x1 + "," + x2 + "\\\}", true));
    }
}

function init()
{
    generateRandomEquation();
    document.getElementById("newEquation").
        addEventListener("click", generateRandomEquation);
    document.getElementById("showSolution").
        addEventListener("click", function() {
            document.getElementById("solution").style.display = "block";
        });
}

window.addEventListener("load", init);

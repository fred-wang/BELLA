/* This Source Code Form is subject to the terms of the Mozilla Public
* License, v. 2.0. If a copy of the MPL was not distributed with this
* file, You can obtain one at http://mozilla.org/MPL/2.0/. */

"use strict";

function r() { return Math.random(); }

var gMaxIntX = 10;
var gMaxIntA = 7;
var gMaxAttempts = 10;
var gMaxDenominator = 100;

function getRandomInt(aMin, aMax)
{
    return Math.floor(r() * (aMax - aMin + 1)) + aMin;
}

function product(aCoefficient, aMonome, aForcePlus)
{
    var s = "";
    var sign = aCoefficient.s, num = aCoefficient.n, denom = aCoefficient.d;
    if (Math.abs(denom) > gMaxDenominator) {
        throw "Denominator too big";
    }
    if (num == 0) return "0";
    s = (sign < 0 ? "-" : (aForcePlus ? "+" : ""));
    num = Math.abs(num);
    if (denom == 1) {
        if (s < 0 || num != 1 || aMonome == "") s += num;
    } else {
        s += "\\frac{"+num+"}{"+denom+"}";
    }
    s += aMonome;
    return s;
}

function emptyElement(aElement)
{
    while (aElement.firstChild) {
        aElement.removeChild(aElement.firstChild);
    }
}

function varName(aIndex)
{
    return "xyzvw".charAt(aIndex);
}

function systemToMathML(A, B)
{
    var s = "\\left\\{\\begin{aligned}", i, j, forcePlus;
    for (i = 0; i < A.length; i++) {
        if (i) s += "\\\\";
        forcePlus = false;
        for (j = 0; j < A[i].length; j++) {
            if (A[i][j].n) {
                s += product(A[i][j], varName(j), forcePlus);
                forcePlus = true;
            }
        }
        if (!forcePlus) s += "0";
        s += "&="
        s += product(B[i], "");
    }
    s += "\\end{aligned}\\right.";

    return TeXZilla.toMathML(s, true);
}


function generateRandomSystemInternal()
{
    var system = document.getElementById("system");
    var solution = document.getElementById("solution");
    solution.style.display = "none";

    var i, j, k, tmp;
    // Number of unknowns and equations.
    var N = getRandomInt(2, 5), M = N;
    // Random coefficients
    var X = new Array(N);
    for (i = 0; i < N; i++) X[i] = getRandomInt(-gMaxIntX, gMaxIntX);
    // Cofficients
    var A = new Array(M);
    for (i = 0; i < M; i++) {
        A[i] = new Array(N);
        for (j = 0; j < N; j++) {
            A[i][j] =
                new Fraction((r() < .5 ? -1 : 1) * getRandomInt(1, gMaxIntA));
        }
    }
    // Constant terms
    var B = new Array(M);
    for (i = 0; i < M; i++) {
        B[i] = new Fraction(0);
        for (j = 0; j < N; j++) {
            B[i].add(new Fraction(A[i][j]).mul(X[j]));
        }
    }

    emptyElement(system);
    system.appendChild(systemToMathML(A, B));

    emptyElement(solution);

    // Gauss pivot
    for (k = 0; k < N; k++) {
        for (i = k; i < M; i++) {
            if (A[i][k].n) break;
        }
        if (i == M) throw "Singular Matrix"
        if (i != k) {
            // Swap i, k
            for (j = 0; j < N; j++) {
                tmp = A[k][j];
                A[k][j] = A[i][j];
                A[i][j] = tmp;
            }
            tmp = B[k]; B[k] = B[i]; B[i] = tmp;
            solution.appendChild(systemToMathML(A, B));
        }
        for (i = k + 1; i < M; i++) {
            var c = new Fraction(A[i][k], A[k][k]);
            for (j = k + 1; j < N; j++) {
                A[i][j].sub(new Fraction(A[k][j]).mul(c));
            }
            B[i].sub(new Fraction(B[k]).mul(c));
            A[i][k] = new Fraction(0);
        }
        if (k < N - 1) {
            solution.appendChild(systemToMathML(A, B));
        }
    }

    // Gives variables in reverse order.
    for (var i = N - 1; i >= 0; i--) {
        solution.appendChild(TeXZilla.toMathML(varName(i) + "=" + X[i], true));
    }
}

function generateRandomSystem()
{
    // Due to rounding errors and other randomness, the generated system might
    // not be ideal. Try several times before giving up.
    for (var i = 0; i < gMaxAttempts; i++) {
        try {
            generateRandomSystemInternal()
            break;
        } catch(e) {
            if (i == gMaxAttempts) {
                emptyElement(document.getElementById("system"));
                emptyElement(document.getElementById("solution"));
                throw e;
            }
        }
    }
}

function init() {
    generateRandomSystem();
    document.getElementById("newSystem").
        addEventListener("click", generateRandomSystem);
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
                "https://marketplace.mozilla.org/app/Sislineal";
        }
    });
});

/* This Source Code Form is subject to the terms of the Mozilla Public
* License, v. 2.0. If a copy of the MPL was not distributed with this
* file, You can obtain one at http://mozilla.org/MPL/2.0/. */

"use strict";

function r() { return Math.random(); }

var gMaxCoeff = 5;
var gMinDegA = 2, gMaxDegA = 5;
var gMaxAttempts = 10;
var gMaxDenominator = 100;

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

function product(aCoefficient, aMonome, aForcePlus)
{
    var s = "";
    var sign = aCoefficient.s, num = aCoefficient.n, denom = aCoefficient.d;
    if (Math.abs(denom) > gMaxDenominator) {
        throw "Denominator too big";
    }
    if (num == 0) return "";
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

function print(aPolynomial)
{
    var s = "";
    var d = aPolynomial.length - 1;
    for (var i = d; i >= 0; i--) {
        s += product(aPolynomial[i],
                     i == 0 ? "" : (i == 1 ? "X" : "X^{"+i+"}"), i < d);
    }
    return s;
}

function generateRandomPolynomial(aDegree)
{
    var p = new Array(aDegree + 1);
    for (var i = 0; i < aDegree; i++) {
        p[i] = new Fraction(getRandomInt(-gMaxCoeff, gMaxCoeff));
    }
    p[aDegree] = new Fraction((r() < .5 ? -1 : 1) * getRandomInt(1, gMaxCoeff));
    return p;
}

function monomial(aCoefficient, aDegree)
{
    var p = [];
    for (var i = 0; i < aDegree; i++) {
        p[i] = new Fraction(0);
    }
    p[aDegree] = new Fraction(aCoefficient);
    return p;
}

function dupPoly(A, N)
{
    var newA = [];
    for (var i = 0; i < N; i++) {
        newA[i] = new Fraction(A[i] || 0);
    }
    return newA;
}

function resize(P)
{
    for (var i = P.length - 1; i >= 0; i--) {
        if (P[i].n) break;
    }
    P.length = i+1;
}

function subs(A, B)
{
    var p = [], i;
    var N = Math.max(A.length, B.length);
    var a = dupPoly(A, N), b = dupPoly(B, N);
    for (var i = 0; i < N; i++) {
        p[i] = new Fraction(a[i]).sub(b[i]);
    }
    resize(p);
    return p;
}

function prod(A, B)
{
    var p = [], i;
    var N = (A.length - 1) + (B.length - 1) + 1;
    var a = dupPoly(A, N), b = dupPoly(B, N);
    for (var i = 0; i < N; i++) {
        p[i] = new Fraction(0);
        for (var j = 0; j <= i; j++) {
            p[i].add(new Fraction(a[j]).mul(b[i - j]));
        }
    }
    resize(p);
    return p;
}

function generateRandomDivisionInternal()
{
    var division = document.getElementById("division");
    var solution = document.getElementById("solution");
    solution.style.display = "none";
    emptyElement(division)
    emptyElement(solution)
    var degA = getRandomInt(gMinDegA, gMaxDegA);
    var A = generateRandomPolynomial(degA);
    division.appendChild(TeXZilla.toMathML("A="+print(A), true));
    var degB = getRandomInt(1, degA/2);
    var B = generateRandomPolynomial(degB);
    division.appendChild(TeXZilla.toMathML("B="+print(B), true));

    var Q = [], R;
    for (var i = 0; i <= degA; i++) Q[i] = new Fraction(0);

    while (degA >= degB) {
        var deg = A.length - B.length;
        Q[deg] = new Fraction(A[A.length-1]).div(B[B.length-1]);
        var M = monomial(Q[deg], deg);
        R = subs(A, prod(B, M));
        solution.appendChild(TeXZilla.toMathML("{"+print(A)+"} - \\left(\\color{red}{"+print(M)+"}\\right)\\left("+print(B)+"\\right) = "+print(R), true));
        A = R;
        degA = A.length-1;
    }
    resize(Q);
    solution.appendChild(TeXZilla.toMathML("\\color{red}{Q="+print(Q)+"}", true));
    solution.appendChild(TeXZilla.toMathML("\\color{blue}{R="+print(R)+"}", true));
}

function generateRandomDivision()
{
    // Due to rounding errors and other randomness, the generated system might
    // not be ideal. Try several times before giving up.
    for (var i = 0; i < gMaxAttempts; i++) {
        try {
            generateRandomDivisionInternal()
            break;
        } catch(e) {
            if (i == gMaxAttempts) {
                emptyElement(document.getElementById("division"));
                emptyElement(document.getElementById("solution"));
                throw e;
            }
        }
    }
}

function init() {
    generateRandomDivision();
    document.getElementById("newDivision").
        addEventListener("click", generateRandomDivision);
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
                "https://marketplace.mozilla.org/app/Divipoli";
        }
    });
});

'use strict'

/* eslint-env browser */

var syllable = require('syllable')

var $input = document.querySelector('textarea')
var $output = document.querySelector('output')

$input.addEventListener('input', oninputchange)

oninputchange()

function oninputchange() {
  $output.textContent = $input.value
    .split(/\s+/g)
    .map(syllable)
    .reduce(sum)
}

function sum(a, b) {
  return a + b
}

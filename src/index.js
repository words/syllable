/* eslint-env browser */

import {syllable} from 'syllable'

var $input = document.querySelector('textarea')
var $output = document.querySelector('output')

$input.addEventListener('input', oninputchange)

oninputchange()

function oninputchange() {
  $output.textContent = syllable($input.value)
}

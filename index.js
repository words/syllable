'use strict';

/*
 * Dependencies.
 */

var pluralize = require('pluralize');

/*
 * A (small) map of problematic values.
 */

var MAP_PROBLEMATIC = require('./data/problematic.json');

/*
 * Cached methods.
 */

var has = Object.prototype.hasOwnProperty;

/*
 * Two expressions of occurrences which normally would
 * be counted as two syllables, but should be counted
 * as one.
 */

var EXPRESSION_MONOSYLLABIC_ONE = new RegExp(
    'cia(l|$)|' +
    'tia|' +
    'cius|' +
    'cious|' +
    '[^aeiou]giu|' +
    '[aeiouy][^aeiouy]ion|' +
    'iou|' +
    'sia$|' +
    'eous$|' +
    '[oa]gue$|' +
    '.[^aeiuoycgltdb]{2,}ed$|' +
    '.ely$|' +
    '^jua|' +
    'uai|' +
    'eau|' +
    '^busi$|' +
    '(' +
        '[aeiouy]' +
        '(' +
            'b|' +
            'c|' +
            'ch|' +
            'dg|' +
            'f|' +
            'g|' +
            'gh|' +
            'gn|' +
            'k|' +
            'l|' +
            'lch|' +
            'll|' +
            'lv|' +
            'm|' +
            'mm|' +
            'n|' +
            'nc|' +
            'ng|' +
            'nch|' +
            'nn|' +
            'p|' +
            'r|' +
            'rc|' +
            'rn|' +
            'rs|' +
            'rv|' +
            's|' +
            'sc|' +
            'sk|' +
            'sl|' +
            'squ|' +
            'ss|' +
            'th|' +
            'v|' +
            'y|' +
            'z' +
        ')' +
        'ed$' +
    ')|' +
    '(' +
        '[aeiouy]' +
        '(' +
            'b|' +
            'ch|' +
            'd|' +
            'f|' +
            'gh|' +
            'gn|' +
            'k|' +
            'l|' +
            'lch|' +
            'll|' +
            'lv|' +
            'm|' +
            'mm|' +
            'n|' +
            'nch|' +
            'nn|' +
            'p|' +
            'r|' +
            'rn|' +
            'rs|' +
            'rv|' +
            's|' +
            'sc|' +
            'sk|' +
            'sl|' +
            'squ|' +
            'ss|' +
            'st|' +
            't|' +
            'th|' +
            'v|' +
            'y' +
        ')' +
        'es$' +
    ')',
    'g'
);

var EXPRESSION_MONOSYLLABIC_TWO = new RegExp(
    '[aeiouy]' +
    '(' +
        'b|' +
        'c|' +
        'ch|' +
        'd|' +
        'dg|' +
        'f|' +
        'g|' +
        'gh|' +
        'gn|' +
        'k|' +
        'l|' +
        'll|' +
        'lv|' +
        'm|' +
        'mm|' +
        'n|' +
        'nc|' +
        'ng|' +
        'nn|' +
        'p|' +
        'r|' +
        'rc|' +
        'rn|' +
        'rs|' +
        'rv|' +
        's|' +
        'sc|' +
        'sk|' +
        'sl|' +
        'squ|' +
        'ss|' +
        'st|' +
        't|' +
        'th|' +
        'v|' +
        'y|' +
        'z' +
    ')' +
    'e$',
    'g'
);

/*
 * Four expression of occurrences which normally would be
 * counted as one syllable, but should be counted as two.
 */

var EXPRESSION_DOUBLE_SYLLABIC_ONE = new RegExp(
    '(' +
        '(' +
            '[^aeiouy]' +
        ')\\2l|' +
        '[^aeiouy]ie' +
        '(' +
            'r|' +
            'st|' +
            't' +
        ')|' +
        '[aeiouym]bl|' +
        'eo|' +
        'ism|' +
        'asm|' +
        'thm|' +
        'dnt|' +
        'uity|' +
        'dea|' +
        'gean|' +
        'oa|' +
        'ua|' +
        'eings?|' +
        '[aeiouy]sh?e[rsd]' +
    ')$',
    'g'
);

var EXPRESSION_DOUBLE_SYLLABIC_TWO = new RegExp(
    '[^gq]ua[^auieo]|' +
    '[aeiou]{3}|' +
    '^(' +
        'ia|' +
        'mc|' +
        'coa[dglx].' +
    ')',
    'g'
);

var EXPRESSION_DOUBLE_SYLLABIC_THREE = new RegExp(
    '[^aeiou]y[ae]|' +
    '[^l]lien|' +
    'riet|' +
    'dien|' +
    'iu|' +
    'io|' +
    'ii|' +
    'uen|' +
    'real|' +
    'iell|' +
    'eo[^aeiou]|' +
    '[aeiou]y[aeiou]',
    'g'
);

var EXPRESSION_DOUBLE_SYLLABIC_FOUR = /[^s]ia/;

/*
 * Expression to match single syllable pre- and suffixes.
 */

var EXPRESSION_SINGLE = new RegExp(
    '^' +
    '(' +
        'un|' +
        'fore|' +
        'ware|' +
        'none?|' +
        'out|' +
        'post|' +
        'sub|' +
        'pre|' +
        'pro|' +
        'dis|' +
        'side' +
    ')' +
    '|' +
    '(' +
        'ly|' +
        'less|' +
        'some|' +
        'ful|' +
        'ers?|' +
        'ness|' +
        'cians?|' +
        'ments?|' +
        'ettes?|' +
        'villes?|' +
        'ships?|' +
        'sides?|' +
        'ports?|' +
        'shires?|' +
        'tion(ed)?' +
    ')' +
    '$',
    'g'
);

/*
 * Expression to match double syllable pre- and suffixes.
 */

var EXPRESSION_DOUBLE = new RegExp(
    '^' +
    '(' +
        'above|' +
        'anti|' +
        'ante|' +
        'counter|' +
        'hyper|' +
        'afore|' +
        'agri|' +
        'infra|' +
        'intra|' +
        'inter|' +
        'over|' +
        'semi|' +
        'ultra|' +
        'under|' +
        'extra|' +
        'dia|' +
        'micro|' +
        'mega|' +
        'kilo|' +
        'pico|' +
        'nano|' +
        'macro' +
    ')' +
    '|' +
    '(' +
        'fully|' +
        'berry|' +
        'woman|' +
        'women' +
    ')' +
    '$',
    'g'
);

/*
 * Expression to match triple syllable suffixes.
 */

var EXPRESSION_TRIPLE = /(ology|ologist|onomy|onomist)$/g;

/*
 * Expression to remove non-alphabetic characters from
 * a given value.
 */

var EXPRESSION_NONALPHABETIC = /[^a-z]/g;

/**
 * Get syllables in a given value.
 *
 * @param {string} value
 * @return {number}
 */
function syllable(value) {
    var count = 0;
    var index;
    var length;
    var singular;
    var parts;
    var addOne;
    var subtractOne;

    value = String(value)
        .toLowerCase()
        .replace(EXPRESSION_NONALPHABETIC, '');

    if (!value.length) {
        return count;
    }

    /*
     * Return early when possible.
     */

    if (value.length < 3) {
        return 1;
    }

    /*
     * If `value` is a hard to count, it might be
     * in `MAP_PROBLEMATIC`.
     */

    if (has.call(MAP_PROBLEMATIC, value)) {
        return MAP_PROBLEMATIC[value];
    }

    /*
     * Additionally, the singular word might be
     * in `MAP_PROBLEMATIC`.
     */

    singular = pluralize(value, 1);

    if (has.call(MAP_PROBLEMATIC, singular)) {
        return MAP_PROBLEMATIC[singular];
    }

   /**
    * Define scoped counters, to be used
    * in `String#replace()` calls.
    *
    * The scoped counter removes the matched value
    * from the input.
    *
    * @param {number} addition
    * @return {function(): string}
    */
    function countFactory(addition) {
        return function () {
            count += addition;

            return '';
        };
    }

   /**
    * Define scoped counters, to be used
    * in `String#replace()` calls.
    *
    * The scoped counter does not remove the matched
    * value from the input.
    *
    * @param {number} addition
    * @return {function(): string}
    */
    function returnFactory(addition) {
        return function ($0) {
            count += addition;

            return $0;
        };
    }

    addOne = returnFactory(1);
    subtractOne = returnFactory(-1);

    /*
     * Count some prefixes and suffixes, and remove
     * their matched ranges.
     */

    value = value
        .replace(EXPRESSION_TRIPLE, countFactory(3))
        .replace(EXPRESSION_DOUBLE, countFactory(2))
        .replace(EXPRESSION_SINGLE, countFactory(1));

    /*
     * Count multiple consonants.
     */

    parts = value.split(/[^aeiouy]+/);
    index = -1;
    length = parts.length;

    while (++index < length) {
        if (parts[index] !== '') {
            count++;
        }
    }

    /*
     * Subtract one for occurrences which should be
     * counted as one (but are counted as two).
     */

    value
        .replace(EXPRESSION_MONOSYLLABIC_ONE, subtractOne)
        .replace(EXPRESSION_MONOSYLLABIC_TWO, subtractOne);

    /*
     * Add one for occurrences which should be counted
     * as two (but are counted as one).
     */

    value
        .replace(EXPRESSION_DOUBLE_SYLLABIC_ONE, addOne)
        .replace(EXPRESSION_DOUBLE_SYLLABIC_TWO, addOne)
        .replace(EXPRESSION_DOUBLE_SYLLABIC_THREE, addOne)
        .replace(EXPRESSION_DOUBLE_SYLLABIC_FOUR, addOne);

    /*
     * Make sure at least on is returned.
     */

    return count || 1;
}

/*
 * Expose `syllable`.
 */

module.exports = syllable;

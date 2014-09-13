'use strict';

var pluralize,
    has,
    MAP_PROBLEMATIC,
    EXPRESSION_SINGLE,
    EXPRESSION_DOUBLE,
    EXPRESSION_TRIPLE,
    EXPRESSION_NONALPHABETIC,
    EXPRESSION_MONOSYLLABIC_ONE,
    EXPRESSION_MONOSYLLABIC_TWO,
    EXPRESSION_DOUBLE_SYLLABIC_ONE,
    EXPRESSION_DOUBLE_SYLLABIC_TWO,
    EXPRESSION_DOUBLE_SYLLABIC_THREE,
    EXPRESSION_DOUBLE_SYLLABIC_FOUR;

/**
 * A (small) map of problematic values.
 */

MAP_PROBLEMATIC = require('./data/problematic.json');

/**
 * To singularize problematic values.
 */

pluralize = require('pluralize');

/**
 * Cache `Object#hasOwnProperty`, used instead of the `in` operator to not
 * fail on given values such as `constructor` or `prototype`.
 */

has = Object.prototype.hasOwnProperty;

/**
 * Two expressions of occurances which normally would be counted as two
 * syllables, but should be counted as one.
 */

EXPRESSION_MONOSYLLABIC_ONE = new RegExp(
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

EXPRESSION_MONOSYLLABIC_TWO = new RegExp(
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

/**
 * Four expression of occurances which normally would be counted as one
 * syllable, but should be counted as two.
 */

EXPRESSION_DOUBLE_SYLLABIC_ONE = new RegExp(
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

EXPRESSION_DOUBLE_SYLLABIC_TWO = new RegExp(
    '[^gq]ua[^auieo]|' +
    '[aeiou]{3}|' +
    '^(' +
        'ia|' +
        'mc|' +
        'coa[dglx].' +
    ')',
    'g'
);

EXPRESSION_DOUBLE_SYLLABIC_THREE = new RegExp(
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

EXPRESSION_DOUBLE_SYLLABIC_FOUR = /[^s]ia/;

/**
 * An expression to match single syllable pre- and suffixes.
 */

EXPRESSION_SINGLE = new RegExp(
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

/**
 * An expression to match double syllable pre- and suffixes.
 */

EXPRESSION_DOUBLE = new RegExp(
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

/**
 * An expression to match triple syllable suffixes.
 */

EXPRESSION_TRIPLE = /(ology|ologist|onomy|onomist)$/g;

/**
 * An expression to remove non-alphabetic characters from a given value.
 */

EXPRESSION_NONALPHABETIC = /[^a-z]/g;

/**
 * Get the syllables in a given value.
 *
 * @param {string} value
 * @return {string}
 */

function syllable(value) {
    var iterator,
        length,
        singular,
        count,
        parts,
        addOne,
        subtractOne;

    value = String(value).toLowerCase().replace(EXPRESSION_NONALPHABETIC, '');

    count = 0;

    if (!value.length) {
        return count;
    }

    /**
     * Return early when possible.
     */

    if (value.length < 3) {
        return 1;
    }

    /**
     * If the word is a hard to count, it might be in `MAP_PROBLEMATIC`.
     */

    if (has.call(MAP_PROBLEMATIC, value)) {
        return MAP_PROBLEMATIC[value];
    }

    /**
     * Additionally, the singular word might be in `MAP_PROBLEMATIC`.
     */

    singular = pluralize(value, 1);

    if (has.call(MAP_PROBLEMATIC, singular)) {
        return MAP_PROBLEMATIC[singular];
    }

    /**
     * Define scoped counters, to be used in `String#replace()` calls.
     */

    function countFactory(addition) {
        return function () {
            count += addition;
            return '';
        };
    }

    function returnFactory(addition) {
        return function ($0) {
            count += addition;
            return $0;
        };
    }

    addOne = returnFactory(1);
    subtractOne = returnFactory(-1);

    /**
     * Count some prefixes and suffixes, and remove their matched ranges.
     */

    value = value
        .replace(EXPRESSION_TRIPLE, countFactory(3))
        .replace(EXPRESSION_DOUBLE, countFactory(2))
        .replace(EXPRESSION_SINGLE, countFactory(1));

    /**
     * Count multiple consonants.
     */

    parts = value.split(/[^aeiouy]+/);
    iterator = -1;
    length = parts.length;

    while (++iterator < length) {
        if (parts[iterator] !== '') {
            count++;
        }
    }

    /**
     * Subtract one for occurances which should be counted as one (but are
     * counted as two).
     */

    value
        .replace(EXPRESSION_MONOSYLLABIC_ONE, subtractOne)
        .replace(EXPRESSION_MONOSYLLABIC_TWO, subtractOne);

    /**
     * Add one for occurances which should be counted as two (but are
     * counted as one).
     */

    value
        .replace(EXPRESSION_DOUBLE_SYLLABIC_ONE, addOne)
        .replace(EXPRESSION_DOUBLE_SYLLABIC_TWO, addOne)
        .replace(EXPRESSION_DOUBLE_SYLLABIC_THREE, addOne)
        .replace(EXPRESSION_DOUBLE_SYLLABIC_FOUR, addOne);

    /**
     * Make sure at least on is returned.
     */

    return count || 1;
}

/**
 * Export `syllable`.
 */

module.exports = syllable;

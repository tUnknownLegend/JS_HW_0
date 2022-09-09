'use strict';

/**
 * {roman number: arabic number}
 * @type {Object}
 */
const romanToArabicDic = {
    'I': 1,
    'V': 5,
    'X': 10,
    'L': 50,
    'C': 100,
    'D': 500,
    'M': 1000,
}

/**
 * {arabic number: roman number}
 * @type {Object}
 * const arabicToRomanDic = {
 *         1: 'I',
 *         5: 'V',
 *         10: 'X',
 *         50: 'L',
 *         100: 'C',
 *         500: 'D',
 *         1000: 'M',
 * }
 */
const arabicToRomanDic = Object.fromEntries(Object.entries(romanToArabicDic).map(dic => dic.reverse()));

/**
 * roman numbers in arabic numerics
 * @type {Array}
 * const romanNums = [1000, 500, 100, 50, 10, 5, 1];
 */
const romanNums = Object.keys(arabicToRomanDic).reverse();

/**
 * roman symbols repeated 4 times for usage in .replace()
 * @type {Array}
 */
const roman4Symbols = ['MMMM', 'DDDD', 'CCCC', 'LLLL', 'XXXX', 'VVVV', 'IIII'];

/**
 * converts arabic number to roman
 * @param {number} arabicN arabic number to convert
 * @returns {string} roman number
 */
const translateArabicToRoman = function (arabicN) {
    /**
     * resulting roman number
     * @type {string}
     */
    let romanN = '';

    for (let i = 0; arabicN !== 0; ++i)
        if (arabicN - romanNums[i] >= 0) {
            arabicN -= romanNums[i];
            romanN += arabicToRomanDic[romanNums[i]];
            --i;
        }
    ``
    roman4Symbols.forEach((currSymbol, i) => {
        if (i >= 2) {
            romanN = romanN.replace(roman4Symbols[i - 1][0] + currSymbol,
                currSymbol[0] + roman4Symbols[i - 2][0])
            romanN = romanN.replace(currSymbol, currSymbol[0] + roman4Symbols[i - 1][0])
        }
    });

    return romanN;
}

/**
 * converts roman number to arabic
 * @param {string} romanN roman number to convert
 * @returns {number} arabic number
 */
const translateRomanToArabic = function (romanN) {
    romanN = romanN.toUpperCase().split('');

    /**
     * resulting arabic number
     * @type {number}
     */
    let arabicN = 0;

    romanN.forEach((currNumber, i) => {
        if (romanToArabicDic[currNumber] >= romanToArabicDic[i === romanN.length - 1 ? currNumber : romanN[i + 1]])
            arabicN += romanToArabicDic[currNumber];
        else
            arabicN -= romanToArabicDic[currNumber];
    });

    return arabicN;
}

/**
 * arabic number validation
 * @param {string} inputSymbols symbols for check
 * @returns {boolean} whether +inputSymbols is integer
 */
const isArabic = (inputSymbols) => Number.isInteger(+inputSymbols);

/**
 * roman number validation
 * @param {string} inputSymbols symbols for check
 * @returns {boolean} whether inputSymbols is roman number
 */
const isRoman = (inputSymbols) => {
    if (typeof inputSymbols !== 'string')
        return false;

    /**
     * to exclude any non-roman numeric symbols
     * @type {RegExp}
     */
    const romanChars = /^[MDCLXVI]*$/;
    return romanChars.test(inputSymbols.toUpperCase());
}

/**
 * converts number to different numerics (roman <-> arabic)
 * @param {string} inputSymbols symbols to convert
 * @returns {string | number} converted roman | arabic number
 */
const roman = function (inputSymbols) {
    //const err = new FormatError("formatting error");

    if (isArabic(inputSymbols) && (+inputSymbols >= 1 && +inputSymbols <= 3999))
        return translateArabicToRoman(+inputSymbols);

    if (isRoman(inputSymbols))
        return translateRomanToArabic(inputSymbols);

    throw new TypeError('Error, wrong input format');
}

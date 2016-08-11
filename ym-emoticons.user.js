// ==UserScript==
// @name        Yahoo! Messenger emoticons for Facebook
// @description Yahoo! Messenger emoticons for Facebook
// @include     https://*.facebook.com/*
// @include     https://*.messenger.com/*
// @version     1.0
// @namespace   https://ym.codekiem.com
// @downloadURL https://raw.githubusercontent.com/redphx/yahoo-messenger-emoticons-for-facebook/master/ym-emoticons.user.js
// @author      redphx
// ==/UserScript==

(function($, exports, window, name) {
// based on https://github.com/kof/emoticons
if (!exports) {
  exports = {};

  if ($) {
    $[name] = exports;
  } else {
    window[name] = exports;
  }
}

var emoticons,
  codesMap = {},
  primaryCodesMap = {},
  regexp,
  metachars = /[[\]{}()*+?.\\|^$\-,&#\s]/g,
  entityMap;

entityMap = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
  '/': '&#x2F;'
};

function escape(string) {
  return String(string).replace(/[&<>"'\/]/g, function(s) {
    return entityMap[s];
  });
}

/**
 * Define emoticons set.
 *
 * @param {Object} data
 */
exports.define = function(data) {
  var name, i, codes, code,
      patterns = [];

  for (name in data) {
    codes = data[name].codes;
    for (i in codes) {
      code = codes[i];
      codesMap[code] = name;

      // Create escaped variants, because mostly you want to parse escaped
      // user text.
      codesMap[escape(code)] = name;
      if (i === 0) {
        primaryCodesMap[code] = name;
      }
    }
  }

  var codeKeys = [];
  var k;
  for (k in codesMap) {
    if (codesMap.hasOwnProperty(k)) {
      codeKeys.push(k);
    }
  }

  codeKeys.sort(function(a, b) {
    return b.length - a.length;
  });

  for (k in codeKeys) {
    patterns.push('(' + codeKeys[k].replace(metachars, "\\$&") + ')');
  }

  regexp = new RegExp(patterns.join('|'), 'g');
  emoticons = data;
};

/**
 * Replace emoticons in text.
 *
 * @param {String} text
 * @param {Function} [fn] optional template builder function.
 */
exports.replace = function(text, fn) {
  return text.replace(regexp, function(code) {
    var name = codesMap[code];
    return (fn || exports.tpl)(name, code);
  });
};

/**
 * Get primary emoticons as html string in order to display them later as overview.
 *
 * @param {Function} [fn] optional template builder function.
 * @return {String}
 */
exports.toString = function(fn) {
  var code,
      str = '',
      name;

  for (code in primaryCodesMap) {
    name = primaryCodesMap[code];
    str += (fn || exports.tpl)(name, code);
  }

  return str;
};

/**
 * Build html string for emoticons.
 *
 * @param {String} name
 * @param {String} code
 * @return {String}
 */
exports.tpl = function(name, code) {
  return '<img height="18" src="https://raw.githubusercontent.com/redphx/yahoo-messenger-emoticons-for-facebook/master/emoticons/' + name + '.gif"/>';
};

exports.define({
  "1": {"codes": [":)", ":-)"]},
  "2": {"codes": [":(", ":-("]},
  "3": {"codes": [";)", ";-)"]},
  "4": {"codes": [":D", ":-D", ":d", ":-d"]},
  "5": {"codes": [";;)"]},
  "6": {"codes": [">:D<", ">:d<"]},
  "7": {"codes": [":-/", ":-\\"]},
  "8": {"codes": [":x", ":-x", ":X", ":-X"]},
  "9": {"codes": [":\">"]},
  "10": {"codes": [":-P", ":P", ":-p", ":p"]},
  "11": {"codes": [":-*", ":*"]},
  "12": {"codes": ["=(("]},
  "13": {"codes": [":-O", ":O", ":-o", ":o"]},
  "14": {"codes": ["X-(", "x-(", "X(", "x("]},
  "15": {"codes": [":->", ":>"]},
  "16": {"codes": ["B-)", "b-)"]},
  "17": {"codes": [":-S", ":-s"]},
  "18": {"codes": ["#:-S", "#:-s"]},
  "19": {"codes": [">:)"]},
  "20": {"codes": [":(("]},
  "21": {"codes": [":))", ":-))"]},
  "22": {"codes": [":|", ":-|"]},
  "23": {"codes": ["/:)"]},
  "24": {"codes": ["=))"]},
  "25": {"codes": ["O:-)", "o:-)", "0:-)", "0:)"]},
  "26": {"codes": [":-B", ":-b"]},
  "27": {"codes": ["=;"]},
  "28": {"codes": ["I-)", "i-)", "|-)"]},
  "29": {"codes": ["8-|"]},
  "30": {"codes": ["L-)", "l-)"]},
  "31": {"codes": [":-&"]},
  "32": {"codes": [":-$"]},
  "33": {"codes": ["[-("]},
  "34": {"codes": [":o)", ":O)"]},
  "35": {"codes": ["8-}"]},
  "36": {"codes": ["<:-P", "<:-p"]},
  "37": {"codes": ["(:|"]},
  "38": {"codes": ["=P~", "=p~"]},
  "39": {"codes": [":-?"]},
  "40": {"codes": ["#-o", "#-O"]},
  "41": {"codes": ["=D>", "=d>"]},
  "42": {"codes": [":-SS", ":-Ss", ":-sS", ":-ss"]},
  "43": {"codes": ["@-)"]},
  "44": {"codes": [":^O", ":^o"]},
  "45": {"codes": [":-w", ":-W"]},
  "46": {"codes": [":-<"]},
  "47": {"codes": [">:P", ">:p"]},
  "48": {"codes": ["<):)"]},
  "49": {"codes": [":@)"]},
  "50": {"codes": ["3:-O", "3:-o"]},
  "51": {"codes": [":(|)"]},
  "52": {"codes": ["~:>"]},
  "53": {"codes": ["@};-"]},
  "54": {"codes": ["%%-"]},
  "55": {"codes": ["**=="]},
  "56": {"codes": ["(~~)"]},
  "57": {"codes": ["~o)", "~O)"]},
  "58": {"codes": ["*-:)"]},
  "59": {"codes": ["8-X", "8-x"]},
  "60": {"codes": ["=:)"]},
  "61": {"codes": [">-)"]},
  "62": {"codes": [":-L", ":-l"]},
  "63": {"codes": ["[-o<", "[-O<"]},
  "64": {"codes": ["$-)"]},
  "65": {"codes": [":-\""]},
  "66": {"codes": ["b-(", "B-("]},
  "67": {"codes": [":)>-"]},
  "68": {"codes": ["[-X", "[-x"]},
  "69": {"codes": ["\\:D/", "\\:d/"]},
  "70": {"codes": [">:/"]},
  "71": {"codes": [";))"]},
  "72": {"codes": ["o->", "O->"]},
  "73": {"codes": ["o=>", "O=>"]},
  "74": {"codes": ["o-+", "O-+"]},
  "75": {"codes": ["(%)"]},
  "76": {"codes": [":-@"]},
  "77": {"codes": ["^:)^"]},
  "78": {"codes": [":-j", ":-J"]},
  "79": {"codes": ["(*)"]},
  "100": {"codes": [":)]"]},
  "101": {"codes": [":-c"]},
  "102": {"codes": ["~x(", "~X("]},
  "103": {"codes": [":-h"]},
  "104": {"codes": [":-t", ":-T"]},
  "105": {"codes": ["8->"]},
  "106": {"codes": [":-??"]},
  "107": {"codes": ["%-("]},
  "108": {"codes": [":O3", ":o3"]},
  "109": {"codes": ["X_X"]},
  "110": {"codes": [":!!"]},
  "111": {"codes": ["\\m/"]},
  "112": {"codes": [":-q"]},
  "113": {"codes": [":-bd"]},
  "114": {"codes": ["^#(^"]},
  "115": {"codes": [":bz"]},

  "120": {"codes": ["~^o^~", "~^O^~"]},
  "121": {"codes": ["'@^@|||"]},
  "122": {"codes": ["[]---"]},
  "123": {"codes": ["^o^||3", "^O^||3"]},
  "124": {"codes": [":-(||>"]},
  "125": {"codes": ["'+_+"]},
  "126": {"codes": [":::^^:::"]},
  "127": {"codes": ["o|^_^|o", "O|^_^|O"]},
  "128": {"codes": [":puke!", ":PUKE!"]},
  "129": {"codes": ["o|\\~", "O|\\~"]},
  "130": {"codes": ["o|:-)", "O|:-)"]},
  "131": {"codes": ["[]==[]"]},
  "132": {"codes": [":-)/\\:-)"]},
  "133": {"codes": [":(game)", ":(GAME)"]},
  "134": {"codes": ["'@-@"]},
  "135": {"codes": [":->~~"]},
  "136": {"codes": ["?@_@?"]},
  "137": {"codes": [":(tv)", ":(TV)"]},
  "138": {"codes": ["&[]"]},
  "139": {"codes": ["%||:-{"]},
  "140": {"codes": ["%*-{"]},
  "141": {"codes": [":(fight)", ":(FIGHT)}"]},

  "pirate": {"codes": [":ar!", ":pirate:"]},
  "transformer": {"codes": ["[..]", ":trans:"]}
});

}(typeof jQuery != 'undefined' ? jQuery : null,
  typeof exports != 'undefined' ? exports : null,
  window,
  'emoticons'));

(function() {
  'use strict';

  var HOST_FACEBOOK = 'www.facebook.com';
  var HOST_MESSENGER = 'www.messenger.com';

  var target,
      observer;

  function facebookProcessNode(node) {
    var messageNodes = node.querySelectorAll('._5yl5 > span');
    if (messageNodes.length === 0) {
      return;
    }

    for (var i = 0; i < messageNodes.length; i++) {
      var messageNode = messageNodes[i];
      messageNode.innerHTML = emoticons.replace(messageNode.textContent);
    }
  }

  function messengerProcessNode(node) {
    var messageNodes = node.querySelectorAll('span._3oh-');
    if (messageNodes.length === 0) {
      return;
    }

    for (var i = 0; i < messageNodes.length; i++) {
      var messageNode = messageNodes[i];
      if (messageNode.textContent && messageNode.parentNode.nodeName !== 'H2') {
        if (messageNode.firstElementChild && messageNode.firstElementChild.nodeName === 'SPAN') {
          messageNode = messageNode.firstElementChild;
        }
        messageNode.innerHTML = emoticons.replace(messageNode.textContent);
      }
    }
  }

  if (window.location.hostname === HOST_FACEBOOK) {
    observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        for (var i = 0; i < mutation.addedNodes.length; i++) {
          var newNode = mutation.addedNodes[i];
          var classList = newNode.classList;
          if (!classList) {
            continue;
          }
          if (classList.contains('_4tdt') || classList.contains('_5wd4')) {
            facebookProcessNode(newNode);
          }
        }
      });
    });
    target = document.getElementById('pagelet_dock');
    observer.observe(target, { attributes: false, childList: true, characterData: false, subtree: true });
  } else if (window.location.hostname === HOST_MESSENGER) {
    observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        for (var i = 0; i < mutation.addedNodes.length; i++) {
          var newNode = mutation.addedNodes[i];
          var classList = newNode.classList;
          if (newNode.nodeName !== 'DIV') {
            continue;
          }
          messengerProcessNode(newNode);
        }
      });
    });
    target = document.getElementById('u_0_0');
    observer.observe(target, { attributes: false, childList: true, characterData: false, subtree: true });
  }

})();

(function(a){"object"==typeof exports&&"object"==typeof module?a(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],a):a(CodeMirror)})(function(a){a.registerHelper("lint","css",function(f,g){var c=[];if(!window.CSSLint)return window.console&&window.console.error("Error: window.CSSLint not defined, CodeMirror CSS linting cannot run."),c;for(var e=CSSLint.verify(f,g).messages,b,d=0;d<e.length;d++){b=e[d];var h=b.line-1,k=b.col;c.push({from:a.Pos(b.line-1,b.col-1),to:a.Pos(h,k),message:b.message,severity:b.type})}return c})});
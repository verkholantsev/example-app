(this["webpackJsonpexample-app"]=this["webpackJsonpexample-app"]||[]).push([[0],[,,,,,,function(n,r,e){n.exports=e(15)},,,,,function(n,r,e){},function(n,r,e){},function(n,r,e){},function(n,r,e){},function(n,r,e){"use strict";e.r(r);var t=e(0),o=e.n(t),l=e(3),c=e.n(l),a=(e(11),e(4)),u=e(1),i=e(5);e(12);function f(n){var r=n.row,e=n.col,l=n.color,c=n.onClick,a={top:50*r,left:50*e,backgroundColor:l},u=Object(t.useCallback)((function(){return c({row:r,col:e,color:l})}),[c,r,e,l]);return o.a.createElement("div",{className:"Cell",style:a,onClick:u})}e(13);function s(n){var r=n.cells.flatMap((function(r){return r.map((function(r){var e=r.row,t=r.col,l=r.color;return o.a.createElement(f,{key:e+"-"+t,row:e,col:t,color:l,onClick:n.onCellClick})}))}));return o.a.createElement("div",{className:"Field"},r)}e(14);var p=function(n){for(var r=[],e=0;e<n;e++)r.push(null);return r},m=function(){var n=Math.random();return n<.25?"red":n<.5?"green":n<.75?"blue":"yellow"},v=function(n){return n.map((function(n){return n.map((function(n){return Object(i.a)({},n)}))}))},h=function(n,r,e){return function(n,r){var e=r.row,t=r.col,o=n.length,l=n[0].length;return[{row:e-1,col:t},{row:e,col:t+1},{row:e+1,col:t},{row:e,col:t-1}].filter((function(n){var r=n.row,e=n.col;return 0<=r&&r<o&&0<=e&&e<l})).map((function(r){var e=r.row,t=r.col;return n[e][t]}))}(n,{row:r.row,col:r.col}).filter((function(n){return n.color===e}))},w=function(n){var r=n.length,e=n[0].length;return p(r).some((function(r,t){return p(e).some((function(r,e){var o=n[t][e];return null!==o.color&&h(n,{row:t,col:e},o.color).length>0}))}))},d=function(n){var r=n[0].length,e=v(n);return p(r).forEach((function(n,r){var t=function(n,r){var e=n.length;return p(e).map((function(e,t){return n[t][r]}))}(e,r),o=t.map((function(n){return n.color})).filter((function(n){return null!==n}));e=function(n,r,e){var t=n.length;return p(t).forEach((function(t,o){n[o][r].color=e[o]})),n}(e,r,[].concat(Object(u.a)(p(t.length-o.length)),Object(u.a)(o)))})),e},g=function(n,r){switch(r.type){case"CELL_CLICK":var e=function(n,r){var e=r.col,t=r.row,o=r.color;if(0===h(n,{col:e,row:t},o).length)return n;var l=v(n),c=[l[t][e]];for(l[t][e].color=null;c.length>0;){var a=c.pop(),i=h(l,a,o);i.forEach((function(n){var r=n.row,e=n.col;l[r][e].color=null})),c.unshift.apply(c,Object(u.a)(i))}return l}(n.cells,r.data),t=d(e);return{cells:t,isGameOver:!w(t)};default:return n}},C=function(n){var r=n.width,e=n.height;return{cells:p(e).map((function(n,e){return p(r).map((function(n,r){return{row:e,col:r,color:m()}}))}))}};var E=function(){var n=Object(t.useReducer)(g,{width:10,height:10},C),r=Object(a.a)(n,2),e=r[0],l=r[1],c=Object(t.useCallback)((function(n){return l({type:"CELL_CLICK",data:n})}),[]),u=e.isGameOver?o.a.createElement("div",{className:"App__game-over-label"},o.a.createElement("h2",null,"Game over!"),o.a.createElement("p",null,"Press \u2318-R or Ctrl-R to restart")):null;return o.a.createElement("div",null,o.a.createElement("div",{className:"App__field"},o.a.createElement(s,{cells:e.cells,onCellClick:c})),u)};c.a.render(o.a.createElement(E,null),document.getElementById("root"))}],[[6,1,2]]]);
//# sourceMappingURL=main.9003b35d.chunk.js.map
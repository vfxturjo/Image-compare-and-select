import{Y as b,u as l,aq as d}from"./l1OLxsb_.js";function p(s,n,t){if(s==null)return n(void 0),b;const u=l(()=>s.subscribe(n,t));return u.unsubscribe?()=>u.unsubscribe():u}const i=[];function h(s,n){return{subscribe:g(s,n).subscribe}}function g(s,n=b){let t=null;const u=new Set;function c(r){if(d(s,r)&&(s=r,t)){const o=!i.length;for(const e of u)e[1](),i.push(e,s);if(o){for(let e=0;e<i.length;e+=2)i[e][0](i[e+1]);i.length=0}}}function f(r){c(r(s))}function a(r,o=b){const e=[r,o];return u.add(e),u.size===1&&(t=n(c,f)||b),r(s),()=>{u.delete(e),u.size===0&&t&&(t(),t=null)}}return{set:c,update:f,subscribe:a}}function q(s){let n;return p(s,t=>n=t)(),n}export{q as g,h as r,p as s,g as w};

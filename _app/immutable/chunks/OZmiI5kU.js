var fn=Array.isArray,_n=Array.prototype.indexOf,zn=Array.from,Jn=Object.defineProperty,gt=Object.getOwnPropertyDescriptor,cn=Object.getOwnPropertyDescriptors,Qn=Object.prototype,te=Array.prototype,vn=Object.getPrototypeOf;function ne(t){return typeof t=="function"}const ee=()=>{};function re(t){return t()}function St(t){for(var n=0;n<t.length;n++)t[n]()}const y=2,Ot=4,$=8,pt=16,I=32,Y=64,X=128,A=256,z=512,v=1024,S=2048,b=4096,M=8192,H=16384,pn=32768,Dt=65536,hn=1<<17,dn=1<<19,Nt=1<<20,At=Symbol("$state"),ae=Symbol("legacy props"),se=Symbol("");function Ct(t){return t===this.v}function En(t,n){return t!=t?n==n:t!==n||t!==null&&typeof t=="object"||typeof t=="function"}function bt(t){return!En(t,this.v)}function yn(t){throw new Error("https://svelte.dev/e/effect_in_teardown")}function wn(){throw new Error("https://svelte.dev/e/effect_in_unowned_derived")}function mn(t){throw new Error("https://svelte.dev/e/effect_orphan")}function Tn(){throw new Error("https://svelte.dev/e/effect_update_depth_exceeded")}function le(){throw new Error("https://svelte.dev/e/hydration_failed")}function ue(t){throw new Error("https://svelte.dev/e/props_invalid_value")}function oe(){throw new Error("https://svelte.dev/e/state_descriptors_fixed")}function fe(){throw new Error("https://svelte.dev/e/state_prototype_fixed")}function gn(){throw new Error("https://svelte.dev/e/state_unsafe_local_read")}function An(){throw new Error("https://svelte.dev/e/state_unsafe_mutation")}let K=!1;function ie(){K=!0}const _e=1,ce=2,ve=4,pe=8,he=16,de=1,Ee=2,ye=4,we=8,me=16,Te=1,ge=2,Ae=4,xe=1,Ie=2,xn="[",In="[!",kn="]",Pt={},ke=Symbol();function qt(t){console.warn("https://svelte.dev/e/hydration_mismatch")}function ht(t){throw new Error("https://svelte.dev/e/lifecycle_outside_component")}let u=null;function xt(t){u=t}function Re(t){return Ft().get(t)}function Se(t,n){return Ft().set(t,n),n}function Oe(t,n=!1,e){u={p:u,c:null,e:null,m:!1,s:t,x:null,l:null},K&&!n&&(u.l={s:null,u:null,r1:[],r2:dt(!1)})}function De(t){const n=u;if(n!==null){t!==void 0&&(n.x=t);const l=n.e;if(l!==null){var e=f,r=o;n.e=null;try{for(var a=0;a<l.length;a++){var s=l[a];nt(s.effect),tt(s.reaction),$t(s.fn)}}finally{nt(e),tt(r)}}u=n.p,n.m=!0}return t||{}}function Ft(t){return u===null&&ht(),u.c??(u.c=new Map(Rn(u)||void 0))}function Rn(t){let n=t.p;for(;n!==null;){const e=n.c;if(e!==null)return e;n=n.p}return null}function dt(t,n){var e={f:0,v:t,reactions:null,equals:Ct,rv:0,wv:0};return e}function Ne(t){return Lt(dt(t))}function Sn(t,n=!1){var r;const e=dt(t);return n||(e.equals=bt),K&&u!==null&&u.l!==null&&((r=u.l).s??(r.s=[])).push(e),e}function Ce(t,n=!1){return Lt(Sn(t,n))}function Lt(t){return o!==null&&!T&&o.f&y&&(g===null?Hn([t]):g.push(t)),t}function Mt(t,n){return o!==null&&!T&&rt()&&o.f&(y|pt)&&(g===null||!g.includes(t))&&An(),ot(t,n)}function ot(t,n){return t.equals(n)||(t.v,t.v=n,t.wv=en(),Yt(t,S),rt()&&f!==null&&f.f&v&&!(f.f&(I|Y))&&(x===null?Un([t]):x.push(t))),n}function Yt(t,n){var e=t.reactions;if(e!==null)for(var r=rt(),a=e.length,s=0;s<a;s++){var l=e[s],i=l.f;i&S||!r&&l===f||(w(l,n),i&(v|A)&&(i&y?Yt(l,b):lt(l)))}}let C=!1;function be(t){C=t}let m;function j(t){if(t===null)throw qt(),Pt;return m=t}function Pe(){return j(P(m))}function qe(t){if(C){if(P(m)!==null)throw qt(),Pt;m=t}}function Fe(t=1){if(C){for(var n=t,e=m;n--;)e=P(e);m=e}}function Le(){for(var t=0,n=m;;){if(n.nodeType===8){var e=n.data;if(e===kn){if(t===0)return n;t-=1}else(e===xn||e===In)&&(t+=1)}var r=P(n);n.remove(),n=r}}var It,Ht,Ut;function Me(){if(It===void 0){It=window;var t=Element.prototype,n=Node.prototype;Ht=gt(n,"firstChild").get,Ut=gt(n,"nextSibling").get,t.__click=void 0,t.__className="",t.__attributes=null,t.__styles=null,t.__e=void 0,Text.prototype.__t=void 0}}function ft(t=""){return document.createTextNode(t)}function it(t){return Ht.call(t)}function P(t){return Ut.call(t)}function Ye(t,n){if(!C)return it(t);var e=it(m);if(e===null)e=m.appendChild(ft());else if(n&&e.nodeType!==3){var r=ft();return e==null||e.before(r),j(r),r}return j(e),e}function He(t,n){if(!C){var e=it(t);return e instanceof Comment&&e.data===""?P(e):e}return m}function Ue(t,n=1,e=!1){let r=C?m:t;for(var a;n--;)a=r,r=P(r);if(!C)return r;var s=r==null?void 0:r.nodeType;if(e&&s!==3){var l=ft();return r===null?a==null||a.after(l):r.before(l),j(l),l}return j(r),r}function je(t){t.textContent=""}function jt(t){var n=y|S,e=o!==null&&o.f&y?o:null;return f===null||e!==null&&e.f&A?n|=A:f.f|=Nt,{ctx:u,deps:null,effects:null,equals:Ct,f:n,fn:t,reactions:null,rv:0,v:null,wv:0,parent:e??f}}function Be(t){const n=jt(t);return n.equals=bt,n}function Et(t){var n=t.effects;if(n!==null){t.effects=null;for(var e=0;e<n.length;e+=1)R(n[e])}}function On(t){for(var n=t.parent;n!==null;){if(!(n.f&y))return n;n=n.parent}return null}function Bt(t){var n,e=f;nt(On(t));try{Et(t),n=an(t)}finally{nt(e)}return n}function Vt(t){var n=Bt(t),e=(k||t.f&A)&&t.deps!==null?b:v;w(t,e),t.equals(n)||(t.v=n,t.wv=en())}function Dn(t){Et(t),G(t,0),w(t,H),t.v=t.deps=t.ctx=t.reactions=null}function Gt(t){f===null&&o===null&&mn(),o!==null&&o.f&A&&f===null&&wn(),wt&&yn()}function Nn(t,n){var e=n.last;e===null?n.last=n.first=t:(e.next=t,t.prev=e,n.last=t)}function q(t,n,e,r=!0){var a=(t&Y)!==0,s=f,l={ctx:u,deps:null,nodes_start:null,nodes_end:null,f:t|S,first:null,fn:n,last:null,next:null,parent:a?null:s,prev:null,teardown:null,transitions:null,wv:0};if(e){var i=F;try{kt(!0),st(l),l.f|=pn}catch(O){throw R(l),O}finally{kt(i)}}else n!==null&&lt(l);var _=e&&l.deps===null&&l.first===null&&l.nodes_start===null&&l.teardown===null&&(l.f&(Nt|X))===0;if(!_&&!a&&r&&(s!==null&&Nn(l,s),o!==null&&o.f&y)){var E=o;(E.effects??(E.effects=[])).push(l)}return l}function Ve(){return o===null||T?!1:!k}function Ge(t){const n=q($,null,!1);return w(n,v),n.teardown=t,n}function Cn(t){Gt();var n=f!==null&&(f.f&I)!==0&&u!==null&&!u.m;if(n){var e=u;(e.e??(e.e=[])).push({fn:t,effect:f,reaction:o})}else{var r=$t(t);return r}}function $e(t){return Gt(),yt(t)}function Ke(t){const n=q(Y,t,!0);return()=>{R(n)}}function Ze(t){const n=q(Y,t,!0);return(e={})=>new Promise(r=>{e.outro?qn(n,()=>{R(n),r(void 0)}):(R(n),r(void 0))})}function $t(t){return q(Ot,t,!1)}function We(t,n){var e=u,r={effect:null,ran:!1};e.l.r1.push(r),r.effect=yt(()=>{t(),!r.ran&&(r.ran=!0,Mt(e.l.r2,!0),ut(n))})}function Xe(){var t=u;yt(()=>{if(mt(t.l.r2)){for(var n of t.l.r1){var e=n.effect;e.f&v&&w(e,b),U(e)&&st(e),n.ran=!1}t.l.r2.v=!1}})}function yt(t){return q($,t,!0)}function ze(t,n=[],e=jt){const r=n.map(e);return bn(()=>t(...r.map(mt)))}function bn(t,n=0){return q($|pt|n,t,!0)}function Je(t,n=!0){return q($|I,t,!0,n)}function Kt(t){var n=t.teardown;if(n!==null){const e=wt,r=o;Rt(!0),tt(null);try{n.call(null)}finally{Rt(e),tt(r)}}}function Zt(t,n=!1){var e=t.first;for(t.first=t.last=null;e!==null;){var r=e.next;R(e,n),e=r}}function Pn(t){for(var n=t.first;n!==null;){var e=n.next;n.f&I||R(n),n=e}}function R(t,n=!0){var e=!1;if((n||t.f&dn)&&t.nodes_start!==null){for(var r=t.nodes_start,a=t.nodes_end;r!==null;){var s=r===a?null:P(r);r.remove(),r=s}e=!0}Zt(t,n&&!e),G(t,0),w(t,H);var l=t.transitions;if(l!==null)for(const _ of l)_.stop();Kt(t);var i=t.parent;i!==null&&i.first!==null&&Wt(t),t.next=t.prev=t.teardown=t.ctx=t.deps=t.fn=t.nodes_start=t.nodes_end=null}function Wt(t){var n=t.parent,e=t.prev,r=t.next;e!==null&&(e.next=r),r!==null&&(r.prev=e),n!==null&&(n.first===t&&(n.first=r),n.last===t&&(n.last=e))}function qn(t,n){var e=[];Xt(t,e,!0),Fn(e,()=>{R(t),n&&n()})}function Fn(t,n){var e=t.length;if(e>0){var r=()=>--e||n();for(var a of t)a.out(r)}else n()}function Xt(t,n,e){if(!(t.f&M)){if(t.f^=M,t.transitions!==null)for(const l of t.transitions)(l.is_global||e)&&n.push(l);for(var r=t.first;r!==null;){var a=r.next,s=(r.f&Dt)!==0||(r.f&I)!==0;Xt(r,n,s?e:!1),r=a}}}function Qe(t){zt(t,!0)}function zt(t,n){if(t.f&M){t.f^=M,t.f&v||(t.f^=v),U(t)&&(w(t,S),lt(t));for(var e=t.first;e!==null;){var r=e.next,a=(e.f&Dt)!==0||(e.f&I)!==0;zt(e,a?n:!1),e=r}if(t.transitions!==null)for(const s of t.transitions)(s.is_global||n)&&s.in()}}const Ln=typeof requestIdleCallback>"u"?t=>setTimeout(t,1):requestIdleCallback;let J=!1,Q=!1,_t=[],ct=[];function Jt(){J=!1;const t=_t.slice();_t=[],St(t)}function Qt(){Q=!1;const t=ct.slice();ct=[],St(t)}function tr(t){J||(J=!0,queueMicrotask(Jt)),_t.push(t)}function nr(t){Q||(Q=!0,Ln(Qt)),ct.push(t)}function Mn(){J&&Jt(),Q&&Qt()}const tn=0,Yn=1;let Z=!1,W=tn,B=!1,V=null,F=!1,wt=!1;function kt(t){F=t}function Rt(t){wt=t}let N=[],L=0;let o=null,T=!1;function tt(t){o=t}let f=null;function nt(t){f=t}let g=null;function Hn(t){g=t}let p=null,d=0,x=null;function Un(t){x=t}let nn=1,et=0,k=!1,D=null;function en(){return++nn}function rt(){return!K||u!==null&&u.l===null}function U(t){var E;var n=t.f;if(n&S)return!0;if(n&b){var e=t.deps,r=(n&A)!==0;if(e!==null){var a,s,l=(n&z)!==0,i=r&&f!==null&&!k,_=e.length;if(l||i){for(a=0;a<_;a++)s=e[a],(l||!((E=s==null?void 0:s.reactions)!=null&&E.includes(t)))&&(s.reactions??(s.reactions=[])).push(t);l&&(t.f^=z)}for(a=0;a<_;a++)if(s=e[a],U(s)&&Vt(s),s.wv>t.wv)return!0}(!r||f!==null&&!k)&&w(t,v)}return!1}function jn(t,n){for(var e=n;e!==null;){if(e.f&X)try{e.fn(t);return}catch{e.f^=X}e=e.parent}throw Z=!1,t}function Bn(t){return(t.f&H)===0&&(t.parent===null||(t.parent.f&X)===0)}function at(t,n,e,r){if(Z){if(e===null&&(Z=!1),Bn(n))throw t;return}e!==null&&(Z=!0);{jn(t,n);return}}function rn(t,n,e=0){var r=t.reactions;if(r!==null)for(var a=0;a<r.length;a++){var s=r[a];s.f&y?rn(s,n,e+1):n===s&&(e===0?w(s,S):s.f&v&&w(s,b),lt(s))}}function an(t){var Tt;var n=p,e=d,r=x,a=o,s=k,l=g,i=u,_=T,E=t.f;p=null,d=0,x=null,o=E&(I|Y)?null:t,k=(E&A)!==0&&(!F||(a===null||_)&&t.parent!==null),g=null,xt(t.ctx),T=!1,et++;try{var O=(0,t.fn)(),c=t.deps;if(p!==null){var h;if(G(t,d),c!==null&&d>0)for(c.length=d+p.length,h=0;h<p.length;h++)c[d+h]=p[h];else t.deps=c=p;if(!k)for(h=d;h<c.length;h++)((Tt=c[h]).reactions??(Tt.reactions=[])).push(t)}else c!==null&&d<c.length&&(G(t,d),c.length=d);if(rt()&&x!==null&&!(t.f&(y|b|S)))for(h=0;h<x.length;h++)rn(x[h],t);return a!==null&&et++,O}finally{p=n,d=e,x=r,o=a,k=s,g=l,xt(i),T=_}}function Vn(t,n){let e=n.reactions;if(e!==null){var r=_n.call(e,t);if(r!==-1){var a=e.length-1;a===0?e=n.reactions=null:(e[r]=e[a],e.pop())}}e===null&&n.f&y&&(p===null||!p.includes(n))&&(w(n,b),n.f&(A|z)||(n.f^=z),Et(n),G(n,0))}function G(t,n){var e=t.deps;if(e!==null)for(var r=n;r<e.length;r++)Vn(t,e[r])}function st(t){var n=t.f;if(!(n&H)){w(t,v);var e=f,r=u;f=t;try{n&pt?Pn(t):Zt(t),Kt(t);var a=an(t);t.teardown=typeof a=="function"?a:null,t.wv=nn;var s=t.deps,l}catch(i){at(i,t,e,r||t.ctx)}finally{f=e}}}function sn(){if(L>1e3){L=0;try{Tn()}catch(t){if(V!==null)at(t,V,null);else throw t}}L++}function ln(t){var n=t.length;if(n!==0){sn();var e=F;F=!0;try{for(var r=0;r<n;r++){var a=t[r];a.f&v||(a.f^=v);var s=[];un(a,s),Gn(s)}}finally{F=e}}}function Gn(t){var n=t.length;if(n!==0)for(var e=0;e<n;e++){var r=t[e];if(!(r.f&(H|M)))try{U(r)&&(st(r),r.deps===null&&r.first===null&&r.nodes_start===null&&(r.teardown===null?Wt(r):r.fn=null))}catch(a){at(a,r,null,r.ctx)}}}function $n(){if(B=!1,L>1001)return;const t=N;N=[],ln(t),B||(L=0,V=null)}function lt(t){W===tn&&(B||(B=!0,queueMicrotask($n))),V=t;for(var n=t;n.parent!==null;){n=n.parent;var e=n.f;if(e&(Y|I)){if(!(e&v))return;n.f^=v}}N.push(n)}function un(t,n){var e=t.first,r=[];t:for(;e!==null;){var a=e.f,s=(a&I)!==0,l=s&&(a&v)!==0,i=e.next;if(!l&&!(a&M))if(a&$){if(s)e.f^=v;else try{U(e)&&st(e)}catch(c){at(c,e,null,e.ctx)}var _=e.first;if(_!==null){e=_;continue}}else a&Ot&&r.push(e);if(i===null){let c=e.parent;for(;c!==null;){if(t===c)break t;var E=c.next;if(E!==null){e=E;continue t}c=c.parent}}e=i}for(var O=0;O<r.length;O++)_=r[O],n.push(_),un(_,n)}function on(t){var n=W,e=N;try{sn();const a=[];W=Yn,N=a,B=!1,ln(e);var r=t==null?void 0:t();return Mn(),(N.length>0||a.length>0)&&on(),L=0,V=null,r}finally{W=n,N=e}}async function er(){await Promise.resolve(),on()}function mt(t){var n=t.f,e=(n&y)!==0;if(e&&n&H){var r=Bt(t);return Dn(t),r}if(D!==null&&D.add(t),o!==null&&!T){g!==null&&g.includes(t)&&gn();var a=o.deps;t.rv<et&&(t.rv=et,p===null&&a!==null&&a[d]===t?d++:p===null?p=[t]:p.push(t))}else if(e&&t.deps===null&&t.effects===null){var s=t,l=s.parent;l!==null&&(l.f&A||(s.f^=A))}return e&&(s=t,U(s)&&Vt(s)),t.v}function Kn(t){var n=D;D=new Set;var e=D,r;try{if(ut(t),n!==null)for(r of D)n.add(r)}finally{D=n}return e}function rr(t){var n=Kn(()=>ut(t));for(var e of n)if(e.f&hn)for(const r of e.deps||[])r.f&y||ot(r,r.v);else ot(e,e.v)}function ut(t){var n=T;try{return T=!0,t()}finally{T=n}}const Zn=-7169;function w(t,n){t.f=t.f&Zn|n}function ar(t,n=1){var e=mt(t),r=n===1?e++:e--;return Mt(t,e),r}function sr(t){if(!(typeof t!="object"||!t||t instanceof EventTarget)){if(At in t)vt(t);else if(!Array.isArray(t))for(let n in t){const e=t[n];typeof e=="object"&&e&&At in e&&vt(e)}}}function vt(t,n=new Set){if(typeof t=="object"&&t!==null&&!(t instanceof EventTarget)&&!n.has(t)){n.add(t),t instanceof Date&&t.getTime();for(let r in t)try{vt(t[r],n)}catch{}const e=vn(t);if(e!==Object.prototype&&e!==Array.prototype&&e!==Map.prototype&&e!==Set.prototype&&e!==Date.prototype){const r=cn(e);for(let a in r){const s=r[a].get;if(s)try{s.call(t)}catch{}}}}}function lr(t){u===null&&ht(),K&&u.l!==null?Xn(u).m.push(t):Cn(()=>{const n=ut(t);if(typeof n=="function")return n})}function Wn(t,n,{bubbles:e=!1,cancelable:r=!1}={}){return new CustomEvent(t,{detail:n,bubbles:e,cancelable:r})}function ur(){const t=u;return t===null&&ht(),(n,e,r)=>{var s;const a=(s=t.s.$$events)==null?void 0:s[n];if(a){const l=fn(a)?a.slice():[a],i=Wn(n,e,r);for(const _ of l)_.call(t.x,i);return!i.defaultPrevented}return!0}}function Xn(t){var n=t.l;return n.u??(n.u={a:[],b:[],m:[]})}export{Mt as $,f as A,_e as B,ot as C,ce as D,ve as E,Xt as F,je as G,In as H,M as I,Fn as J,R as K,it as L,Be as M,kn as N,o as O,pe as P,Sn as Q,dt as R,At as S,fn as T,he as U,P as V,Dt as W,ke as X,Qn as Y,te as Z,oe as _,De as a,gt as a0,fe as a1,vn as a2,ee as a3,Ge as a4,Jn as a5,ue as a6,hn as a7,ye as a8,bt as a9,le as aA,Ze as aB,It as aC,on as aD,er as aE,Ne as aF,tt as aG,xe as aH,Ie as aI,nr as aJ,se as aK,cn as aL,Ve as aM,Ke as aN,pt as aO,pn as aP,Te as aQ,ne as aR,ge as aS,Ae as aT,Re as aU,Se as aV,We as aW,Xe as aX,Ce as aY,ur as aZ,ar as aa,I as ab,Y as ac,nt as ad,de as ae,K as af,Ee as ag,we as ah,ae as ai,jt as aj,me as ak,D as al,He as am,rr as an,$e as ao,Cn as ap,St as aq,u as ar,re as as,sr as at,ie as au,En as av,Me as aw,xn as ax,Pt as ay,qt as az,yt as b,Ye as c,ft as d,$t as e,bn as f,j as g,C as h,rt as i,Pe as j,mt as k,Le as l,be as m,Fe as n,lr as o,Oe as p,tr as q,qe as r,Ue as s,ze as t,ut as u,m as v,Qe as w,Je as x,qn as y,zn as z};

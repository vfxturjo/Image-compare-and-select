import{f as j,w as F,d as L,g as S,a as i,t as b,c as O}from"../chunks/CIaEfkFi.js";import{p as C,o as E,ap as M,t as w,a as R,aC as A,am as H,k as c,s as N,c as T,r as f,n as q}from"../chunks/DgdR9xgm.js";import{i as $}from"../chunks/Cdk51kvK.js";import{e as B,i as I}from"../chunks/CnTvBv5j.js";import{A as e,g as K,c as W,e as z,h as Y,a as D,t as G,s as k,f as o,m as J,i as Q}from"../chunks/C4R73hpx.js";import{b as U}from"../chunks/C5ZFsV-U.js";import{b as X}from"../chunks/B_kIiIk3.js";function Z(_,y){j(window,["resize"],()=>F(()=>y(window[_])))}var tt=b("<img>"),at=b('<button></button> <span class="divider-vertical h-full"></span>',1),et=b("<p>Select V1 and V2 folders.</p>"),rt=b('<button class="w-full"><img></button>'),st=b('<span class="divider-vertical h-full"></span>'),ot=b("<!> <!>",1),nt=b('<div class="flex w-full flex-col gap-1 overflow-hidden p-1"><div class="[&amp;>*]:my-0 [&amp;>*]:py-0"><button class="btn btn-sm">TOP TOOLBAR</button> <button class="btn btn-sm">n</button> <button class="btn btn-sm">Things</button> <span class="divider-vertical"></span> <button class="btn btn-sm">1</button> <button class="btn btn-sm">2</button></div> <div class="flex shrink-0 gap-1 overflow-x-auto" id="thumbnail-scroll"></div> <div class="flex w-full grow gap-1 overflow-hidden"></div></div>');function vt(_,y){C(y,!0),e.bottomBar.show=!0;let g;E(async()=>{e.layout.bodyArea=e.layout.svelteInnerHeight-(e.layout.topBar+e.layout.bottomBar);let t=await K();t?(e.v1DirFileSysHandle=t.v1,e.v2DirFileSysHandle=t.v2):console.log("No handles found"),W(),e.currentPair=z()[0]}),M(()=>{var a;let t=document.querySelector('button[data-ScrollID="'+((a=e.currentPair)==null?void 0:a.baseName)+'"]');t&&(t.scrollIntoView({behavior:"instant"}),g.scrollLeft+=t.getBoundingClientRect().left-(window==null?void 0:window.innerWidth)/2.5)});var h=nt();S("keypress",A,t=>{Y(t.code)}),S("mousemove",A,function(...t){var a;(a=D.v.showNameInInfoBar?d=>{G(J,100)(d)}:null)==null||a.apply(this,t)});var v=N(T(h),2);B(v,21,z,I,(t,a)=>{var d=at(),r=H(d);r.__click=()=>{e.bottomBar.statusText="loading...",e.currentPair=c(a),setTimeout(()=>{e.bottomBar.statusText=""},1200)},B(r,20,()=>["v1","v2"],I,(P,m)=>{var p=O(),s=H(p);{var n=l=>{var u=tt();w(V=>{k(u,`inline border-b-4 ${V??""}`),o(u,"src",c(a)[m].url),o(u,"alt",c(a)[m].name),o(u,"style",`height: ${D.v.thumbnailSize??""}px; width: auto;`)},[()=>e.selections.get(c(a).baseName)===m?"border-warning-200":"border-warning-900"]),i(l,u)};$(s,l=>{c(a)[m]&&l(n)})}i(P,p)}),f(r),q(2),w(()=>{o(r,"data-infobar",c(a).baseName),o(r,"data-scrollid",c(a).baseName),k(r,`min-w-fit border ${(c(a)==e.currentPair?"brightness-125":"border-gray-600 brightness-75")??""}`)}),i(t,d)},t=>{var a=et();i(t,a)}),f(v),X(v,t=>g=t,()=>g);var x=N(v,2);B(x,20,()=>["v1","v2"],I,(t,a)=>{var d=ot(),r=H(d);{var P=s=>{var n=rt();n.__click=()=>{Q(e.currentPair.baseName,a)};var l=T(n);f(n),w(u=>{o(l,"data-infobar",`${a??""} - ${e.currentPair.baseName??""}`),k(l,`h-full w-full grow border-4 object-contain ${(a==="v1"?"object-right":"object-left")??""} ${u??""}`),o(l,"src",e.currentPair[a].url),o(l,"alt",e.currentPair[a].name)},[()=>e.selections.get(e.currentPair.baseName)===a?"border-yellow-300":"border-gray-400"]),i(s,n)};$(r,s=>{e.currentPair&&s(P)})}var m=N(r,2);{var p=s=>{var n=st();i(s,n)};$(m,s=>{a=="v1"&&s(p)})}i(t,d)}),f(x),f(h),w(()=>o(h,"style",`height: ${e.layout.bodyArea??""}px;`)),Z("innerHeight",t=>e.layout.svelteInnerHeight=t),S("wheel",v,t=>{t.preventDefault(),g.scrollLeft+=t.deltaY}),U(x,"clientHeight",t=>e.layout.largeViewImgHeight=t),i(_,h),R()}L(["click"]);export{vt as component};

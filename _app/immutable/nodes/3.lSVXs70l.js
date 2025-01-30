import{_ as tt}from"../chunks/C1FmrZbK.js";import{d as et,a as at,t as rt}from"../chunks/CIaEfkFi.js";import{p as ot,o as it,t as st,a as nt,s as r,c as e,r as a,n as U}from"../chunks/DgdR9xgm.js";import{s as u}from"../chunks/D6aqfxQy.js";import{A as t,p as m,a as v,r as ct,s as lt}from"../chunks/C4R73hpx.js";import{b as vt}from"../chunks/DGze1YxZ.js";import{p as dt}from"../chunks/C5XE4lVr.js";var pt=(O,f)=>m(f,!1,!0),ut=()=>m("convOut",!1,!0),mt=()=>{alert("TODO!")},ft=()=>{alert("TODO!")},_t=rt('<div class="flex w-full justify-center p-4"><div class="container m-4 space-y-4"><h2 class="h2">Image Converter</h2> <hr class="my-4 !border-t-2"> <div class="flex gap-4 align-middle"><h3 class="h3 flex-grow">Source</h3> <button class="variant-filled btn w-1/2"> </button> <p class="w-1/6 text-sm text-gray-500"><span> </span> <br> images found</p></div> <div class="flex gap-4 align-middle"><h3 class="h3 flex-grow">Output</h3> <button class="variant-filled btn w-1/2"> </button></div> <div class="flex gap-4 bg-slate-800 align-middle"><h3 class="h3 flex-grow">JPEG Quality</h3> <input type="range" class="w-1/2"> <span class="w-1/6 text-sm text-gray-500"> </span></div> <div class="flex gap-4 align-middle"><button class="variant-filled-primary btn w-1/2">Convert!</button></div> <div class="flex gap-4 align-middle"><button class="variant-filled-primary btn w-1/2">Copy!</button> <button class="variant-filled-primary btn w-1/2">Move!</button></div> <div id="target"></div></div></div>');function Dt(O,f){ot(f,!0);let T,n=dt(t.whichFolderHeic??"v1");it(async()=>{t.bottomBar.show=!0,t.bottomBar.showId=!1,t.bottomBar.statusText="waiting...",typeof window!=null&&(T=(await tt(async()=>{const{default:o}=await import("../chunks/D2fYZksU.js").then(i=>i.h);return{default:o}},[],import.meta.url)).default),m(t.whichFolderHeic,!0,!0),v.v.otherDirs.convOut!==""&&m("convOut",!0,!0)});async function I(){var E;const o=t.imagePairsHeic.length;t.converter.startTime=Date.now();let i=0,H=0;for(const p of t.imagePairsHeic){await fetch((E=p[n])==null?void 0:E.url).then(s=>s.blob()).then(s=>T({blob:s,toType:"image/jpeg",quality:t.converter.jpegQuality})).then(async s=>{var R;var M=URL.createObjectURL(s);const Q=(R=p[n])==null?void 0:R.name.replace(/\.[^/.]+$/,".jpg");await fetch(M).then(l=>l.blob()).then(async l=>{var A;const Z=new File([l],Q,{type:"image/jpeg"});t.converter.outputDirFileSysHandle||(t.converter.outputDirFileSysHandle=await window.showDirectoryPicker());const D=await((A=t.converter.outputDirFileSysHandle)==null?void 0:A.getFileHandle(Q,{create:!0})),c=await(D==null?void 0:D.createWritable());await(c==null?void 0:c.write(Z)),await(c==null?void 0:c.close()),URL.revokeObjectURL(M),i+=1}).catch(l=>{S(l)})}).catch(s=>{S(s)}),t.converter.progress=Math.round(i/o*100);const z=o-i,K=Date.now()-t.converter.startTime;let B=i/(K/1e3);const L=z/B*1e3,X=Math.floor(L/6e4),Y=Math.floor(L%6e4/1e3);t.bottomBar.statusText=`Progress: ${t.converter.progress}%... Converting ${i} of ${o} images... Skipped: ${H}; (Speed: ${B.toFixed(2)} images/sec, Estimated time: ${X}min ${Y}sec)`,i===o&&(t.bottomBar.statusText="Conversion completed!")}function S(p){console.log(p),H+=1}t.converter.progress=100,t.bottomBar.statusText="Conversion completed!"}var _=_t(),j=e(_),g=r(e(j),4),d=r(e(g),2);d.__click=[pt,n];var G=e(d,!0);a(d);var P=r(d,2),h=e(P),J=e(h,!0);a(h),U(3),a(P),a(g);var b=r(g,2),w=r(e(b),2);w.__click=[ut];var q=e(w,!0);a(w),a(b);var y=r(b,2),x=r(e(y),2);ct(x);var C=r(x,2),N=e(C,!0);a(C),a(y);var k=r(y,2),V=e(k);V.__click=I,a(k);var $=r(k,2),F=e($);F.__click=[mt];var W=r(F,2);W.__click=[ft],a($),U(2),a(j),a(_),st(()=>{u(G,v.v[n+"DirPath"]===""?"Choose a directory":v.v[n+"DirPath"]),lt(h,`font-bold ${(t[n+"Len"]<1?"text-error-500":"text-warning-500")??""}`),u(J,t.heicCount),u(q,v.v.otherDirs.convOut===""?"Choose a directory":v.v.otherDirs.convOut),u(N,t.converter.jpegQuality)}),vt(x,()=>t.converter.jpegQuality,o=>t.converter.jpegQuality=o),at(O,_),nt()}et(["click"]);export{Dt as component};

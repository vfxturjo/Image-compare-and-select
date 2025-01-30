import{d as X,a as d,t as f,c as Y}from"../chunks/DGtW1oar.js";import{i as Z}from"../chunks/C55CEalx.js";import{p as aa,o as ta,am as B,t as x,a as ea,s,c as e,r as t,n as E,an as ra}from"../chunks/DM9J7kX8.js";import{s as _}from"../chunks/Dop28IGA.js";import{i as k}from"../chunks/DvP6Q91b.js";import{e as sa,i as oa}from"../chunks/C72nglu4.js";import{b as ia,c as la,d as va,p as L,a as na,A as pa,r as ca,s as A}from"../chunks/CbrUgs3I.js";import{b as da}from"../chunks/DS7mM4Zu.js";import{b as _a,r as O}from"../chunks/BvFY9cI6.js";import{b as R,g as fa}from"../chunks/BmlWC2D2.js";var o=O(()=>na),i=O(()=>pa),ua=(y,$)=>L($),ma=f('<label class="label"><h3 class="h3"> </h3> <div class="flex gap-4"><input class="input w-1/2" type="text" placeholder="Custom name?"> <button class="variant-filled btn w-1/2"> </button> <p class="w-1/6 text-sm text-gray-500"><span> </span> <br> images found</p></div></label>'),ba=f(`<p class="text-center">but... <span class="h3 font-bold text-error-500"> </span> HEIC images found! <br> (HEIC images will be ignored for now, as they are not
					supported... yet) <br> (2 types of solutions: convert to jpg or use a library to read them) <br> so... effective overlaps: <span class="h3 font-bold text-success-500"> </span></p>`),ga=f('<p class="text-center"><span> </span> overlaps found!</p> <!>',1),ha=f('<p class="text-center opacity-50">Scanning directories...</p>'),xa=f('<p class="text-center opacity-50">Choose directories to start comparing images.</p>'),ya=()=>fa(`${R}/ImageConvert`),wa=f('<div class="flex grow-[1] basis-1 items-center justify-center"><button class="variant-filled-primary btn btn-lg">Convert them!</button></div>'),Sa=y=>va(y.target.value),Da=f('<div class="card flex w-full justify-between gap-4 p-4"><h2 class="h2">Settings</h2> <button class="variant-outline-warning btn hover:variant-filled-error">Reset All</button></div> <div class="card flex flex-col gap-8 p-4"></div> <div class="flex"><div class="card flex grow-[2] basis-32 flex-col gap-4 p-4"><!></div> <!> <div></div></div> <div><h3 class="h3 w-1/2">Default selection folder</h3> <select class="select w-1/2 overflow-hidden p-2" size="3"><option>None</option><option> </option><option> </option></select></div> <div class="card flex justify-center p-4"><a>Start Comparing</a></div>',1);function Ba(y,$){aa($,!1),i(i().bottomBar.show=!1),ta(()=>{o().v.v1DirPath!==""&&L("v1",!0),o().v.v2DirPath!==""&&L("v2",!0)}),Z();var q=Da(),F=B(q),G=s(e(F),2);G.__click=function(...r){var a;(a=ia)==null||a.apply(this,r)},t(F);var N=s(F,2);sa(N,4,()=>["v1","v2"],oa,(r,a)=>{var l=ma(),n=e(l),b=e(n,!0);t(n);var v=s(n,2),p=e(v);ca(p);var c=s(p,2);c.__click=[ua,a];var g=e(c,!0);t(c);var u=s(c,2),h=e(u),C=e(h,!0);t(h),E(3),t(u),t(v),t(l),x(()=>{_(b,a==="v1"?"First Folder":"Second Folder"),_(g,o().v[a+"DirPath"]===""?"Choose a directory":o().v[a+"DirPath"]),A(h,`font-bold ${(i()[a+"Len"]<1?"text-error-500":"text-warning-500")??""}`),_(C,i()[a+"Len"])}),da(p,()=>o().v[a+"DirName"],I=>o(o().v[a+"DirName"]=I)),d(r,l)}),t(N);var P=s(N,2),j=e(P),J=e(j);{var K=r=>{var a=ga(),l=B(a),n=e(l),b=e(n,!0);t(n),E(),t(l);var v=s(l,2);{var p=c=>{var g=ba(),u=s(e(g)),h=e(u,!0);t(u);var C=s(u,8),I=e(C,!0);t(C),t(g),x(()=>{_(h,i().heicCount),_(I,i().imagePairs.length)}),d(c,g)};k(v,c=>{i().heicCount>0&&c(p)})}x(()=>{A(n,`h3 font-bold ${(i().overlaps===0?"text-error-500":"text-success-500")??""}`),_(b,i().overlaps)}),d(r,a)},Q=r=>{var a=Y(),l=B(a);{var n=v=>{var p=ha();d(v,p)},b=v=>{var p=xa();d(v,p)};k(l,v=>{i().v1DirFileSysHandle&&i().v2DirFileSysHandle?v(n):v(b,!1)},!0)}d(r,a)};k(J,r=>{o().v.dirsOk?r(K):r(Q,!1)})}t(j);var T=s(j,2);{var U=r=>{var a=wa(),l=e(a);l.__click=[ya],t(a),d(r,a)};k(T,r=>{i().heicCount>0&&r(U)})}E(2),t(P);var w=s(P,2),S=s(e(w),2);x(()=>{o(),ra(()=>{})}),S.__change=[Sa];var H=e(S);H.value=((H.__value="")==null,"");var m=s(H);m.value=(m.__value="v1")==null?"":"v1";var V=e(m,!0);t(m);var D=s(m);D.value=(D.__value="v2")==null?"":"v2";var W=e(D,!0);t(D),t(S),t(w);var z=s(w,2),M=e(z);la(M,"href",`${R??""}/selector`),t(z),x(()=>{A(w,`card flex items-center gap-4 p-4 ${(i().overlaps<1?"opacity-50":"")??""}`),_(V,o().v.v1DirName),_(W,o().v.v2DirName),A(M,`variant-filled btn w-1/2 ${(i().overlaps<1?"disabled":"")??""} svelte-ouxqk7`)}),_a(S,()=>o().v.defaultSelection,r=>o(o().v.defaultSelection=r)),d(y,q),ea()}X(["click","change"]);export{Ba as component};

import{d,z as s,ae as f,af as m,ag as y}from"./runtime-dom.esm-bundler.CWrCQjqO.js";const S=d({props:{value:String,name:String,hydrate:{type:Boolean,default:!0}},setup({name:n,value:t,hydrate:a}){if(!t)return()=>null;let r=a?"astro-slot":"astro-static-slot";return()=>s(r,{name:n,innerHTML:t})}}),A=()=>{},h=n=>async(t,a,r,{client:i})=>{if(!n.hasAttribute("ssr"))return;const l=t.name?`${t.name} Host`:void 0,o={};for(const[e,p]of Object.entries(r))o[e]=()=>s(S,{value:p,name:e==="default"?void 0:e});const u=i!=="only",c=(u?f:m)({name:l,render(){let e=s(t,a,o);return b(t.setup)&&(e=s(y,null,e)),e}});await A(),c.mount(n,u),n.addEventListener("astro:unmount",()=>c.unmount(),{once:!0})};function b(n){const t=n?.constructor;return t&&t.name==="AsyncFunction"}export{h as default};
import{d,r as c,a as o,o as p,c as _,b as e,w as a,e as m,t as i}from"./index-Bcjkk3GI.js";const V={for:"email"},$={for:"password"},g=d({__name:"LoginForm",setup(f){const t=c(""),n=c("");return(l,s)=>{const w=o("PrimeInputText"),u=o("PrimeFloatLabel"),P=o("PrimePassword"),b=o("PrimeButton");return p(),_("form",null,[e(u,null,{default:a(()=>[e(w,{class:"w-full",id:"email",modelValue:t.value,"onUpdate:modelValue":s[0]||(s[0]=r=>t.value=r)},null,8,["modelValue"]),m("label",V,i(l.$t("labels.email")),1)]),_:1}),e(u,{class:"mt-3"},{default:a(()=>[e(P,{class:"w-full",inputClass:"w-full",modelValue:n.value,"onUpdate:modelValue":s[1]||(s[1]=r=>n.value=r),inputId:"password"},null,8,["modelValue"]),m("label",$,i(l.$t("labels.password")),1)]),_:1}),e(b,{class:"w-full mt-4",label:l.$t("actions.login")},null,8,["label"])])}}}),v={class:"flex h-full align-items-center justify-content-center mx-4 md:mx-none"},x={class:"font-semibold"},B=d({__name:"IndexView",setup(f){return(t,n)=>{const l=o("PrimeCard");return p(),_("div",v,[e(l,{class:"w-26rem"},{title:a(()=>[m("span",x,i(t.$t("app.features.login.login")),1)]),content:a(()=>[e(g,{class:"mt-4"})]),_:1})])}}});export{B as default};
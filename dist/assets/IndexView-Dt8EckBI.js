import{d as p,u as h,r as u,a as s,o as _,c as f,b as e,w as a,e as n,t as d,f as x,g as P}from"./index-XfqRP4FD.js";const C={for:"email"},V={for:"password"},$=p({__name:"LoginForm",setup(w){const r=h(),i=u("admin@example.com"),o=u("password");return(m,t)=>{const v=s("PrimeInputText"),c=s("PrimeFloatLabel"),g=s("PrimePassword"),b=s("PrimeButton");return _(),f("form",null,[e(c,null,{default:a(()=>[e(v,{class:"w-full",id:"email",modelValue:i.value,"onUpdate:modelValue":t[0]||(t[0]=l=>i.value=l)},null,8,["modelValue"]),n("label",C,d(m.$t("labels.email")),1)]),_:1}),e(c,{class:"mt-6"},{default:a(()=>[e(g,{class:"w-full",inputClass:"w-full",modelValue:o.value,"onUpdate:modelValue":t[1]||(t[1]=l=>o.value=l),inputId:"password"},null,8,["modelValue"]),n("label",V,d(m.$t("labels.password")),1)]),_:1}),e(b,{onClick:t[2]||(t[2]=l=>x(r).push({name:"products.index"})),class:"w-full mt-4",label:m.$t("actions.login")},null,8,["label"])])}}}),k={class:"h-full"},B=P('<div class="flex mt-8 mb-5"><svg xmlns="http://www.w3.org/2000/svg" class="w-1 mx-auto" viewBox="0 0 24 24"><g fill="none" stroke="#10b981" stroke-width="1.5"><path d="M2 16c0-2.828 0-4.243.879-5.121C3.757 10 5.172 10 8 10h8c2.828 0 4.243 0 5.121.879C22 11.757 22 13.172 22 16c0 2.828 0 4.243-.879 5.121C20.243 22 18.828 22 16 22H8c-2.828 0-4.243 0-5.121-.879C2 20.243 2 18.828 2 16Z"></path><path stroke-linecap="round" d="M6 10V8a6 6 0 0 1 11.811-1.5M12 14v4" opacity="0.5"></path></g></svg></div>',1),I={class:"flex align-items-center justify-content-center mx-4 md:mx-none"},y={class:"font-semibold"},L=p({__name:"IndexView",setup(w){return(r,i)=>{const o=s("PrimeCard");return _(),f("div",k,[B,n("div",I,[e(o,{class:"w-26rem"},{title:a(()=>[n("span",y,d(r.$t("app.features.login.login")),1)]),content:a(()=>[e($,{class:"mt-4"})]),_:1})])])}}});export{L as default};

(this.webpackJsonptabster=this.webpackJsonptabster||[]).push([[0],{40:function(e,t,n){},60:function(e,t,n){},65:function(e,t,n){},66:function(e,t,n){},81:function(e,t,n){},82:function(e,t,n){},83:function(e,t,n){},84:function(e,t,n){},85:function(e,t,n){},88:function(e,t,n){},89:function(e,t,n){},90:function(e,t,n){},91:function(e,t,n){},92:function(e,t,n){},93:function(e,t,n){},94:function(e,t,n){},95:function(e,t,n){"use strict";n.r(t);var a=n(1),c=n.n(a),s=n(32),r=n.n(s),i=(n(40),n(5)),l=n(2),o=n(3),u=n.n(o),j=n(0),b={isLoggedIn:!1,isEmailConfirmed:!1,email:null,username:null,emailToken:null},d=Object(a.createContext)(b);function O(e,t){switch(t.type){case"login":return{isLoggedIn:!0,isEmailConfirmed:t.email_confirmed,email:t.email,username:t.username,emailToken:t.email_confirmation_token};case"logout":return b;default:return e}}function h(e){var t=Object(a.useReducer)(O,b),n=Object(l.a)(t,2),c=n[0],s=n[1],r={user:c,dispatch:s},o=Object(a.useState)(!1),h=Object(l.a)(o,2),m=h[0],f=h[1];return Object(a.useEffect)((function(){m||c&&c.isLoggedIn||(f(!0),u.a.get("/api/user").then((function(e){var t=e.data;t&&s(Object(i.a)({type:"login"},t))})).catch((function(e){var t=e.response.data;console.log(t.message)})))}),[m,c]),Object(j.jsx)(d.Provider,Object(i.a)({value:r},e))}var m=n(6),f=n(4),p=n(12);function v(e){return e.replace(/\s/g,"+").replace(/\?/g,"%3F")}function x(e){return e.replace(/\+/g," ").replace(/(%3F)/g,"?")}var g=function(e,t){Object(a.useEffect)((function(){var n=function(n){e.current.contains(n.target)||t()};return document.addEventListener("mousedown",n),function(){document.removeEventListener("mousedown",n)}}),[e,t])};n(60);var N=function(e){var t=e.value,n=void 0===t?"":t,s=e.items,r=void 0===s?[]:s,o=e.icon,u=e.required,b=e.placeholder,d=e.onChange,O=e.onSelect,h=e.clearButton,m=void 0===h||h,f=e.clearButtonIcon,v=void 0===f?Object(j.jsx)(p.e,{}):f,x=e.renderItem,N=e.highlightOnTabKeyDown,y=void 0!==N&&N,S=e.valueChangeOnHighlight,w=void 0!==S&&S,C=Object(a.useState)(null),k=Object(l.a)(C,2),q=k[0],D=k[1],E=Object(a.useState)(r),_=Object(l.a)(E,2),T=_[0],I=_[1],L=Object(a.useState)(n),B=Object(l.a)(L,2),F=B[0],A=B[1],P=Object(a.useRef)(),R=o&&c.a.cloneElement(o,Object(i.a)(Object(i.a)({},o.props),{},{className:o.props.className?o.props.className+" icon":"icon"}));Object(a.useEffect)((function(){I(r)}),[r]);var K=function(){I([]),D(null)},M=function(e){e&&(U(e),O(e),K())},U=function(e){e&&w&&A(w(e))};return g(P,K),Object(j.jsxs)("div",{className:"combo-box",ref:P,onKeyDown:function(e){if(40===e.keyCode){if(e.preventDefault(),!T.length)return;var t=!q&&0!==q||q===T.length-1?0:q+1;D(t),U(T[t])}else if(38===e.keyCode){if(e.preventDefault(),!T.length)return;var n=q&&0!==q?q-1:T.length-1;D(n),U(T[n])}else if(13===e.keyCode)e.preventDefault(),M(T[q]);else if(9===e.keyCode)if(y)if(q||0===q)M(T[q]);else{e.preventDefault();var a=q||0;D(a),U(T[a])}else K();else 27===e.keyCode&&K()},children:[Object(j.jsxs)("div",{className:"combo-box-input-container",children:[R,Object(j.jsx)("input",{type:"text",value:F,required:u,placeholder:b,onChange:function(e){var t=e.target.value;A(t),D(null),d(t)}}),m&&Object(j.jsx)("button",{className:"combo-box-clear ".concat(""===F?"hidden":""),type:"reset",onClick:function(){A(""),K()},children:v})]}),T&&!!T.length&&Object(j.jsx)("ul",{className:"combo-box-items",children:T.map((function(e,t){var n=q===t;return Object(j.jsxs)("li",{onClick:function(){return M(e)},className:"combo-box-item".concat(n?" highlighted":""),children:[x&&x(e,t,n),!x&&e.label]},t)}))})]})},y=n(15);var S=function(e){var t=e.children,n=e.artist,a=e.title,c=e.edit,s=Object(y.a)(e,["children","artist","title","edit"]);return Object(j.jsx)(m.b,Object(i.a)(Object(i.a)({to:function(){var e="/tabs/"+v("".concat(n,"/").concat(a));return c&&(e+="/edit"),e}()},s),{},{children:t||a}))};n(65);var w=Object(f.i)((function(e){var t=e.history,n=Object(a.useState)([]),c=Object(l.a)(n,2),s=c[0],r=c[1];return Object(j.jsx)("div",{className:"search",children:Object(j.jsx)(N,{icon:Object(j.jsx)(p.d,{}),placeholder:"search tabs",items:s,renderItem:function(e,t,n){return Object(j.jsx)(S,{artist:e.artist,title:e.title,children:Object(j.jsxs)("div",{className:"search-result".concat(n?" selected":""),children:[e.title," - ",e.artist]})})},onChange:function(e){u.a.get("/api/tabs?q=".concat(e)).then((function(e){r(e.data)})).catch((function(e){var t=e.response.data;console.log(t.message)}))},onSelect:function(e){e&&t.push("/tabs/".concat(v(e.artist),"/").concat(v(e.title)))}})})}));n(66);var C=function(e){var t=e.button,n=e.children,c=Object(a.useState)(!1),s=Object(l.a)(c,2),r=s[0],i=s[1],o=Object(a.useRef)();return g(o,(function(){return i(!1)})),Object(j.jsxs)("span",{className:"drop-menu",onClick:function(e){e.target.onclick&&e.target.href&&i(!1)},ref:o,children:[Object(j.jsx)("span",{onClick:function(e){i(!r)},children:t()}),r&&Object(j.jsx)("div",{className:"menu",children:n})]})},k=n(34),q=n.n(k);n(81);function D(e){return Object(j.jsx)("div",{className:"text-input",children:Object(j.jsx)("input",Object(i.a)({type:"text"},e))})}var E=function(e){e.location;var t=Object(a.useContext)(d),n=t.user,c=t.dispatch,s=Object(f.g)().search,r=q.a.parse(s),o=r.email,b=r.token,O=Object(a.useState)(""),h=Object(l.a)(O,2),m=h[0],p=h[1],v=Object(a.useState)(""),x=Object(l.a)(v,2),g=x[0],N=x[1],y=Object(a.useState)(!1),S=Object(l.a)(y,2),w=S[0],C=S[1],k=Object(a.useState)(!1),E=Object(l.a)(k,2),_=E[0],T=E[1];return w?Object(j.jsxs)("div",{children:["Password successfully reset",_&&", you have been signed in","."]}):Object(j.jsxs)("form",{onSubmit:function(e){e.preventDefault(),m===g&&function(e){var t=e.email,n=e.token,a=e.password;return u.a.post("/api/user/reset_password",{email:t,token:n,password:a})}({email:o||n.email,token:b||n.emailToken,password:m}).then((function(e){var t=e.data;t&&(T(!n.isLoggedIn),c(Object(i.a)({type:"login"},t)),C(!0))})).catch((function(e){var t=e.response.data;t&&console.log(t.message)}))},children:[Object(j.jsx)("div",{className:"field",children:Object(j.jsx)(D,{type:"password",required:!0,value:m,onChange:function(e){return p(e.target.value)},placeholder:"password"})}),Object(j.jsx)("div",{className:"field",children:Object(j.jsx)(D,{type:"password",required:!0,value:g,onChange:function(e){return N(e.target.value)},placeholder:"confirmation"})}),Object(j.jsx)("div",{className:"field",children:Object(j.jsx)("input",{type:"submit",className:"btn-primary",value:"reset"})})]})};n(82);var _=Object(f.i)((function(e){var t=e.history,n=Object(a.useContext)(d),c=n.user,s=n.dispatch,r=Object(a.useState)(!1),i=Object(l.a)(r,2),o=i[0],b=i[1],O=Object(a.useRef)();return g(O,(function(){return b(!1)})),Object(j.jsx)("div",{className:"signed-in-menu",ref:O,children:Object(j.jsxs)(C,{button:function(){return Object(j.jsx)("span",{className:"menu-btn link-primary",children:Object(j.jsx)(p.a,{})})},children:[o&&Object(j.jsx)(E,{}),!o&&Object(j.jsxs)("div",{children:[Object(j.jsx)("div",{children:c.username}),Object(j.jsx)("div",{children:c.email}),Object(j.jsx)("div",{children:Object(j.jsx)("span",{className:"link-primary",onClick:function(){return b(!0)},children:"reset password"})}),Object(j.jsx)("div",{className:"menu-footer",children:Object(j.jsx)("span",{className:"link-primary",onClick:function(e){e.preventDefault(),u.a.delete("/api/sign_out").then((function(e){e.data&&(s({type:"logout"}),t.push("/"))})).catch((function(e){var t=e.response.data;console.log(t.message)}))},children:"sign out"})})]})]})})}));var T=function(){var e=Object(a.useState)(!1),t=Object(l.a)(e,2),n=t[0],c=t[1],s=Object(a.useState)(""),r=Object(l.a)(s,2),i=r[0],o=r[1];return n?Object(j.jsx)("form",{onSubmit:function(e){e.preventDefault(),function(e){return u.a.post("/api/user/new_confirmation_email",{email:e})}(i).then((function(e){e.data&&c(!1)})).catch((function(e){var t=e.response.data;t&&console.log(t.message)}))},children:Object(j.jsxs)("div",{className:"field",children:[Object(j.jsx)(D,{type:"text",name:"email",required:!0,placeholder:"email",value:i,onChange:function(e){return o(e.target.value)}}),Object(j.jsx)("span",{className:"field",children:Object(j.jsx)("input",{type:"submit",className:"btn-primary",value:"send"})})]})}):Object(j.jsxs)("div",{children:["click the link sent to your email",Object(j.jsx)("br",{}),"to confirm your email and account",Object(j.jsx)("br",{}),"or",Object(j.jsx)("span",{className:"link-primary",onClick:function(){return c(!0)},children:"send another one"})]})};var I=function(){var e=Object(a.useState)(!1),t=Object(l.a)(e,2),n=t[0],c=t[1],s=Object(a.useState)(""),r=Object(l.a)(s,2),i=r[0],o=r[1];return n?Object(j.jsxs)("span",{className:"field",children:[Object(j.jsx)(D,{type:"text",name:"email",required:!0,placeholder:"email",value:i,onChange:function(e){return o(e.target.value)}}),Object(j.jsx)("span",{className:"field",children:Object(j.jsx)("input",{type:"submit",className:"btn-primary",value:"send",onClick:function(e){e.preventDefault(),function(e){return u.a.post("/api/user/send_forgot_password",{email:e})}(i).then((function(e){e.data&&c(!1)})).catch((function(e){var t=e.response.data;t&&console.log(t.message)}))}})})]}):Object(j.jsx)("span",{className:"field",children:Object(j.jsx)("span",{className:"link-primary",onClick:function(){return c(!0)},children:"forgot password?"})})};var L=Object(f.i)((function(e){var t=e.history,n=Object(a.useContext)(d).dispatch,c=Object(a.useState)(!1),s=Object(l.a)(c,2),r=s[0],o=s[1];return r?Object(j.jsx)(T,{}):Object(j.jsxs)("form",{onSubmit:function(e){var a=e.target.elements;e.preventDefault(),function(e){var t=e.username,n=e.password;return u.a.post("/api/sign_in",{username:t,password:n})}({username:a.username.value,password:a.password.value}).then((function(e){var a=e.data;a&&(n(Object(i.a)({type:"login"},a)),t.push("/tabs"))})).catch((function(e){var t=e.response.data;t&&(console.log(t.message),"Unconfirmed email"===t.message&&o(!0))}))},children:[Object(j.jsx)("div",{className:"field",children:Object(j.jsx)(D,{type:"text",name:"username",required:!0,placeholder:"username or email"})}),Object(j.jsx)("div",{className:"field",children:Object(j.jsx)(D,{type:"password",name:"password",required:!0,placeholder:"password"})}),Object(j.jsx)("div",{className:"field",children:Object(j.jsx)("input",{type:"submit",className:"btn-primary",value:"sign in"})}),Object(j.jsx)(I,{})]})}));var B=function(e){e.history;var t=Object(a.useState)(!1),n=Object(l.a)(t,2),c=n[0],s=n[1];return c?Object(j.jsx)(T,{}):Object(j.jsxs)("form",{onSubmit:function(e){var t=e.target.elements;e.preventDefault(),function(e){var t=e.email,n=e.username,a=e.password;return u.a.post("/api/sign_up",{email:t,username:n,password:a})}({email:t.email.value,username:t.username.value,password:t.password.value}).then((function(e){e.data&&s(!0)})).catch((function(e){var t=e.response.data;console.log(t.message)}))},className:"centered",children:[Object(j.jsx)("div",{className:"field",children:Object(j.jsx)(D,{type:"text",name:"email",required:!0,placeholder:"email"})}),Object(j.jsx)("div",{className:"field",children:Object(j.jsx)(D,{type:"text",name:"username",required:!0,placeholder:"username"})}),Object(j.jsx)("div",{className:"field",children:Object(j.jsx)(D,{type:"password",name:"password",required:!0,placeholder:"password"})}),Object(j.jsx)("div",{className:"field",children:Object(j.jsx)("input",{type:"submit",className:"btn-primary",value:"sign up"})})]})};n(83);var F=function(){return Object(j.jsxs)("div",{className:"sign-in-up",children:[Object(j.jsx)(C,{button:function(){return Object(j.jsx)("span",{className:"link-primary",children:"sign in"})},children:Object(j.jsx)(L,{})}),Object(j.jsx)(C,{button:function(){return Object(j.jsx)("span",{className:"link-primary",children:"sign up"})},children:Object(j.jsx)(B,{})})]})};n(84);var A=function(){var e=Object(a.useContext)(d).user;return Object(j.jsxs)("header",{className:"header",children:[Object(j.jsx)("div",{className:"app-banner",children:Object(j.jsx)(m.b,{to:"/",children:"tabster"})}),Object(j.jsxs)("div",{className:"links",children:[Object(j.jsx)(w,{}),Object(j.jsx)("div",{className:"new-tab-container",children:Object(j.jsxs)(m.b,{to:"/tabs/new",children:[Object(j.jsx)(p.c,{className:"icon"})," new tab"]})})]}),Object(j.jsx)("div",{className:"gap"}),e&&e.isLoggedIn?Object(j.jsx)(_,{}):Object(j.jsx)(F,{})]})},P=function(e){var t=Object(a.useState)(e),n=Object(l.a)(t,2),c=n[0],s=n[1];return{value:c,setValue:s,reset:function(){return s("")},bind:{value:c,onChange:s}}};n(85);var R=function(e){var t=e.required,n=e.placeholder,c=e.readOnly,s=e.onChange,r=e.value,i=P(r),o=i.value,b=i.setValue,d=Object(a.useState)([]),O=Object(l.a)(d,2),h=O[0],m=O[1],f=function(e){b(e),s(e)};return Object(j.jsx)(N,{value:o?o.name:"",items:h,required:t,placeholder:n,readOnly:c,renderItem:function(e,t,n){return e.name},onChange:function(e){f({id:null,name:e}),u.a.get("/api/artists?q=".concat(e)).then((function(e){m(e.data)})).catch((function(e){var t=e.response.data;console.log(t.message)}))},onSelect:function(e){f({id:e.id,name:e.name})},highlightOnTabKeyDown:!0,valueChangeOnHighlight:function(e){return e.name}})},K=n(35);n(87),n(88),n(89);var M=function(e){var t=e.value,n=e.onChange,a=e.insertMode,c=function(e,t){return t.slice(0,e.line).map((function(e){return e.length+1})).reduce((function(e,t){return e+t}),e.ch)};return Object(j.jsx)(K.Controlled,{value:t,options:{mode:"null",theme:"tabster",lineNumbers:!1},onBeforeChange:function(e,s,r){var i=s.text,l=s.from,o=s.to,u=s.origin,j=t.split("\n"),b="+delete"===u,d=[c(l,j),c(o,j)],O=d[0],h=d[1],m=h-O>(b?1:0),f=i.join(""),p=""===f?"\n":f,v=b||!a;if(v){var x=t.substring(O,h).split("").every((function(e){return"-"===e}));v=!m&&x&&"-"!==p&&"\n"!==p&&"\n"!==t.charAt(h)}if(b){var g=t.charAt(h-1),N=!m&&-1===["-","\n"].indexOf(g);p=!a&&N?"-":""}var y=t.substring(0,O-(v&&b?1:0))+p+t.substring(h+(v&&!b?1:0));n(y)}})};n(90);var U=function(e){var t=e.onSave,n=Object(y.a)(e,["onSave"]),c=function(e){var t=Object(a.useState)(e),n=Object(l.a)(t,2),c=n[0],s=n[1];return{value:c,setValue:s,reset:function(){return s("")},bind:{value:c,onChange:function(e){s(e.target.value)}}}}(n.title||""),s=c.value,r=c.bind,o=P(n.artist||{id:null,name:""}),u=o.value,b=o.bind,d=P(n.tab||"e|-------------\nB|-------------\nG|-------------\nD|-------------\nA|-------------\nE|-------------\n"),O=d.value,h=d.bind,m=Object(a.useState)(!0),f=Object(l.a)(m,2),p=f[0],v=f[1];return Object(j.jsxs)("form",{onSubmit:function(e){return e.preventDefault(),t({title:s,artist:u,tab:O})},className:"tab-form",children:[Object(j.jsxs)("div",{className:"meta-input",children:[Object(j.jsx)("div",{className:"field",children:Object(j.jsx)(D,Object(i.a)({required:!0,placeholder:"tab song title"},r))}),Object(j.jsx)("div",{className:"field",children:Object(j.jsx)(R,Object(i.a)({required:!0,placeholder:"artist of song"},b))})]}),Object(j.jsx)("div",{className:"field",children:Object(j.jsxs)("button",{className:"btn-primary ".concat(p?"":"toggled"),onClick:function(e){e.preventDefault(),v(!p)},children:["overwriting ","".concat(p?"OFF":"ON")]})}),Object(j.jsx)("div",{className:"field tab",children:Object(j.jsx)(M,Object(i.a)(Object(i.a)({},h),{},{insertMode:p}))}),Object(j.jsx)("div",{className:"field",children:Object(j.jsx)("input",{className:"btn-primary",type:"submit",value:"save"})})]})};var V=function(e){var t=e.history,n=Object(a.useState)(!1),c=Object(l.a)(n,2),s=c[0],r=c[1],i=Object(a.useState)(null),o=Object(l.a)(i,2),b=o[0],d=o[1];return Object(j.jsxs)("div",{children:[b&&Object(j.jsx)("p",{children:b}),Object(j.jsx)(U,{onSave:function(e){var n=e.title,a=e.artist,c=e.tab;s||(r(!0),d(null),u.a.post("/api/tabs",{title:n,artist:a,tab:c}).then((function(e){var n=e.data;n&&t.push("/tabs/".concat(v(n.artist.name),"/").concat(v(n.title)))})).catch((function(e){var t=e.response.data;r(!1),t&&(console.log(t.message),d(t.message))})))}})]})};n(91);var H=function(e){var t=e.tabs,n=e.renderTabText,a=e.renderEmpty;return t?!t.length&&a?a():Object(j.jsx)("ul",{className:"tab-list",children:t.map((function(e,t){return Object(j.jsxs)("li",{className:"tab",children:[n&&Object(j.jsx)(S,{artist:e.artist,title:e.title,children:n(e)}),!n&&Object(j.jsx)(S,{artist:e.artist,title:e.title})]},t)}))}):Object(j.jsx)("p",{children:"loading..."})};var J=function(){var e=Object(f.h)(),t=Object(a.useState)(!1),n=Object(l.a)(t,2),c=n[0],s=n[1],r=Object(a.useState)(!1),i=Object(l.a)(r,2),o=i[0],b=i[1],d=Object(a.useState)(null),O=Object(l.a)(d,2),h=O[0],p=O[1],v=Object(a.useState)(null),g=Object(l.a)(v,2),N=g[0],y=g[1];return Object(a.useEffect)((function(){c||o||(s(!0),u.a.get("/api/tabs/".concat(e.artist)).then((function(e){p(e.data),b(!0),s(!1)})).catch((function(e){console.log(e),b(!0),s(!1),y(e.message)})))}),[c,o,e.artist]),Object(j.jsxs)("div",{children:[Object(j.jsx)("h3",{children:x(e.artist)}),N&&Object(j.jsx)("p",{children:N}),Object(j.jsx)(H,{tabs:h,renderEmpty:function(){return Object(j.jsxs)("p",{children:["No tabs found. Add a new tab ",Object(j.jsx)(m.b,{to:"/tabs/new",children:"here"})]})}})]})};n(92);var G=function(){var e=Object(a.useState)(!1),t=Object(l.a)(e,2),n=t[0],c=t[1],s=Object(a.useState)(!1),r=Object(l.a)(s,2),i=r[0],o=r[1],b=Object(a.useState)(null),d=Object(l.a)(b,2),O=d[0],h=d[1],m=Object(a.useState)([]),f=Object(l.a)(m,2),p=f[0],v=f[1];return Object(a.useEffect)((function(){n||i||(o(!0),u.a.get("/api/tabs?sort=newest").then((function(e){v(e.data),c(!0),o(!1)})).catch((function(e){console.log(e),c(!0),o(!1),h(e.message)})))}),[n,i]),n?O?Object(j.jsx)("h3",{children:O}):Object(j.jsxs)("div",{children:[Object(j.jsx)("h3",{children:"newest tabs"}),Object(j.jsx)(H,{tabs:p,renderTabText:function(e){return"".concat(e.artist," - ").concat(e.title)}})]}):Object(j.jsx)("h3",{children:"loading..."})};var z=function(e){var t=e.id,n=(e.user,e.title),c=e.artist,s=e.tab,r=(e.createdByUsername,e.onSave),i=Object(a.useState)(null),o=Object(l.a)(i,2),b=o[0],d=o[1],O=Object(a.useState)(!1),h=Object(l.a)(O,2),m=h[0],f=h[1];return Object(j.jsxs)("div",{children:[b&&Object(j.jsx)("p",{children:b}),Object(j.jsx)(U,{id:t,title:n,artist:c,tab:s,onSave:function(e){var n=e.title,a=e.artist,c=e.tab;m||(f(!0),d(null),u.a.patch("/api/tabs/".concat(t),{title:n,artist:a,tab:c}).then((function(e){r(e.data)})).catch((function(e){var t=e.response.data;f(!1),t&&(console.log(t.message),d(t.message))})))}})]})};var Q=function(e){var t=e.children,n=e.username;return"anonymous"===n?t||n:Object(j.jsx)(m.b,{to:"/users/".concat(v(n)),children:t||n})};n(93);var W=function(e){var t=e.history,n=Object(a.useContext)(d).user,c=Object(f.h)(),s=Object(a.useState)(!1),r=Object(l.a)(s,2),i=r[0],o=r[1],b=Object(a.useState)(!1),O=Object(l.a)(b,2),h=O[0],x=O[1],g=Object(a.useState)(null),N=Object(l.a)(g,2),y=N[0],w=N[1],C=Object(a.useState)(null),k=Object(l.a)(C,2),q=k[0],D=k[1],E=Object(a.useState)(null),_=Object(l.a)(E,2),T=_[0],I=_[1],L=Object(a.useState)(null),B=Object(l.a)(L,2),F=B[0],A=B[1],P=Object(a.useState)(null),R=Object(l.a)(P,2),K=R[0],M=R[1],U=Object(a.useState)(null),V=Object(l.a)(U,2),H=V[0],J=V[1],G=Object(a.useState)(!1),W=Object(l.a)(G,2),X=W[0],Y=W[1],Z=function(e,t,n){if(!e||!t||!n.artist||!n.title)return!1;function a(e,t){return v("".concat(e,"/").concat(t)).toLowerCase()}return a(e.name,t)===a(n.artist,n.title)};if(Object(a.useEffect)((function(){i||H||h&&Z(q,K,c)||i||H||h||(o(!0),u.a.get("/api/tabs/".concat(c.artist,"/").concat(c.title)).then((function(e){var t=e.data;w(t.id),D(t.artist),I(t.created_by_username),A(t.tab),M(t.title),x(!0),o(!1)})).catch((function(e){var t=e.response.data;console.log(t.message),J(t.message),x(!0),o(!1)})))}),[i,h,H,q,K,c]),!h)return Object(j.jsx)("h3",{children:"loading..."});if(H){var $=Object(j.jsx)("h3",{children:H});return"Tab not found"===H&&($=Object(j.jsxs)("p",{children:["No tab found. Add a new tab ",Object(j.jsx)(m.b,{to:"/tabs/new",children:"here"}),"."]})),$}return X?Object(j.jsx)(z,{id:y,user:n,artist:q,createdByUsername:T,title:K,tab:F,onSave:function(e){Y(!1),Z(e.artist,e.title,c)?(w(e.id),D(e.artist),I(e.created_by_username),A(e.tab),M(e.title)):(t.push("/tabs/".concat(v(e.artist.name),"/").concat(v(e.title))),x(!1))}}):Object(j.jsxs)("div",{children:[Object(j.jsxs)("div",{className:"tab-header",children:[Object(j.jsxs)("div",{children:[Object(j.jsxs)("div",{children:[Object(j.jsx)(S,{artist:q.name,title:K})," ","by"," ",Object(j.jsx)(m.b,{to:"/tabs/".concat(v(q.name)),children:q.name})," "]}),Object(j.jsxs)("div",{children:["created by ",Object(j.jsx)(Q,{username:T})]})]}),Object(j.jsx)("div",{className:"tab-actions",children:T===n.username&&Object(j.jsxs)("span",{className:"link-primary action",onClick:function(){return Y(!0)},children:[Object(j.jsx)(p.b,{})," edit"]})})]}),Object(j.jsx)("pre",{className:"tab",children:F})]})};var X=function(){var e=Object(f.h)().username,t=Object(a.useState)(!1),n=Object(l.a)(t,2),c=n[0],s=n[1],r=Object(a.useState)(!1),i=Object(l.a)(r,2),o=i[0],b=i[1],d=Object(a.useState)(null),O=Object(l.a)(d,2),h=O[0],m=O[1],p=Object(a.useState)(null),v=Object(l.a)(p,2),g=v[0],N=v[1];return Object(a.useEffect)((function(){c||o||(s(!0),u.a.get("/api/tabs?username=".concat(e)).then((function(e){m(e.data),b(!0),s(!1)})).catch((function(e){console.log(e),b(!0),s(!1),N(e.message)})))}),[c,o,e]),Object(j.jsxs)("div",{children:[Object(j.jsx)("h3",{children:x(e)}),g&&Object(j.jsx)("p",{children:g}),Object(j.jsx)(H,{tabs:h,renderTabText:function(e){return"".concat(e.artist," - ").concat(e.title)},renderEmpty:function(){return Object(j.jsx)("p",{children:"No tabs created by this user."})}})]})};n(94);var Y=function(){return Object(j.jsx)(h,{children:Object(j.jsx)(m.a,{children:Object(j.jsxs)("div",{className:"app",children:[Object(j.jsx)(A,{}),Object(j.jsx)("div",{className:"page",children:Object(j.jsxs)(f.d,{children:[Object(j.jsx)(f.a,{exact:!0,from:"/",to:"/tabs"}),Object(j.jsx)(f.b,{path:"/tabs",children:Object(j.jsxs)(f.d,{children:[Object(j.jsx)(f.b,{exact:!0,path:"/tabs",component:G}),Object(j.jsx)(f.b,{exact:!0,path:"/tabs/new",component:V}),Object(j.jsx)(f.b,{path:"/tabs/:artist",children:Object(j.jsxs)(f.d,{children:[Object(j.jsx)(f.b,{exact:!0,path:"/tabs/:artist",component:J}),Object(j.jsx)(f.b,{exact:!0,path:"/tabs/:artist/:title",component:W})]})})]})}),Object(j.jsx)(f.b,{path:"/user",children:Object(j.jsx)(f.b,{exact:!0,path:"/user/reset-password",component:E})}),Object(j.jsx)(f.b,{path:"/users",children:Object(j.jsx)(f.b,{exact:!0,path:"/users/:username",component:X})})]})})]})})})},Z=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,96)).then((function(t){var n=t.getCLS,a=t.getFID,c=t.getFCP,s=t.getLCP,r=t.getTTFB;n(e),a(e),c(e),s(e),r(e)}))};r.a.render(Object(j.jsx)(c.a.StrictMode,{children:Object(j.jsx)(Y,{})}),document.getElementById("root")),Z()}},[[95,1,2]]]);
//# sourceMappingURL=main.03474c0b.chunk.js.map
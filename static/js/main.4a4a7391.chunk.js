(this.webpackJsonpipod=this.webpackJsonpipod||[]).push([[0],{11:function(e,t,c){},12:function(e,t,c){},16:function(e,t,c){"use strict";c.r(t);var s=c(1),n=c.n(s),a=c(5),i=c.n(a),r=(c(11),c(2)),o=c(3),l=(c(12),c(6)),j=c(0),d=50,h=50,u=!1,b=[0,0],x=0,m=0;var v=function(e){return Object(j.jsx)("div",{className:"wheel",onMouseOut:function(e){u=!1,m=0,b=[0,0],h=50,x=0},onMouseUp:function(e){u=!1,m=0,b=[0,0],h=50,x=0},onMouseDown:function(e){u=!0},onMouseMove:Object(l.throttle)((function(t){t.target.matches(".js-wheel-inner")||u&&(function(e,t){var c=function(e){var t=e.offsetLeft+e.offsetWidth/2,c=e.offsetTop+e.offsetHeight/2;return[t,c]}(document.querySelector(".js-wheel-inner")),s=Object(o.a)(c,2),n=s[0],a=s[1],i=b,r=Object(o.a)(i,2),l=r[0],j=r[1];if(0===l||0===j)return void(b=[t,t]);var d=(h=function(e,t,c,s,n,a){var i=c-e,r=s-t,o=n-e,l=a-t,j=Math.max(.001,Math.sqrt(i*i+r*r)),d=Math.max(.001,Math.sqrt(o*o+l*l));return Math.asin(i/j*(l/d)-r/j*(o/d))}(n,a,l,j,e,t),h*(180/Math.PI));var h;0!==d&&(x=d,m+=d);b=[e,t]}(t.clientX,t.clientY),function(){var t=e.onTick;x<0&&m<=h?(t({direction:"anticlockwise"}),h=m-d):x>0&&m>=h&&(t({direction:"clockwise"}),h=m+d)}())}),100),children:Object(j.jsx)("div",{className:"js-wheel-inner wheel-inner"})})};var O=function(e){return Object(j.jsxs)("div",{className:"controls",children:[Object(j.jsx)("div",{className:"control",children:Object(j.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",className:"icon rewind",viewBox:"0 0 100 125",children:Object(j.jsxs)("g",{children:[Object(j.jsx)("polygon",{points:"90.25,30.239 73.322,40.451 56.025,50 73.322,59.557 90.242,69.761 89.864,50  "}),Object(j.jsx)("polygon",{points:"56.025,30.239 39.101,40.451 22.107,49.83 22.107,30.239 10.25,30.239 10.25,69.761 22.107,69.761 22.107,50.17    39.101,59.553 56.025,69.761 55.639,50  "})]})})}),Object(j.jsx)("div",{className:"control",children:"MENU"}),Object(j.jsx)("div",{className:"control",children:Object(j.jsxs)("svg",{className:"icon playpause",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 100 125",children:[Object(j.jsx)("polygon",{points:"4.948,21.713 53.945,50.002 4.948,78.286 "}),Object(j.jsx)("rect",{x:"53.945",y:"21.713",width:"15.478",height:"56.573"}),Object(j.jsx)("rect",{x:"80.77",y:"21.713",width:"15.48",height:"56.573"})]})}),Object(j.jsx)("div",{className:"control",children:Object(j.jsx)("svg",{className:"icon fast-forward",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 100 125",children:Object(j.jsxs)("g",{children:[Object(j.jsx)("polygon",{points:"10.25,69.761 27.178,59.549 44.475,50 27.178,40.443 10.258,30.239 10.636,50  "}),Object(j.jsx)("polygon",{points:"44.475,69.761 61.399,59.549 78.393,50.169 78.393,69.761 90.25,69.761 90.25,30.239 78.393,30.239 78.393,49.83    61.399,40.447 44.475,30.239 44.861,50  "})]})})})]})};var w=function(e){e.type;var t=e.header,c=e.statusIcon,s=e.menuItems,n=e.selectedIndex;return Object(j.jsx)("div",{className:"screen-container",children:Object(j.jsxs)("div",{className:"screen",children:[Object(j.jsxs)("div",{className:"screen-header",children:[Object(j.jsx)("div",{className:"header-icon",children:c}),Object(j.jsx)("div",{className:"title",children:t}),Object(j.jsx)("div",{className:"header-icon",children:Object(j.jsxs)("svg",{className:"icon battery",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",children:[Object(j.jsx)("path",{className:"primary",d:"M20 9h1a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8c0-1.1.9-2 2-2h14a2 2 0 0 1 2 2v1zM4 8v8h14V8H4z"}),Object(j.jsx)("rect",{width:"6",height:"4",x:"6",y:"10",className:"secondary"})]})})]}),Object(j.jsx)("div",{className:"screen-content",children:Object(j.jsx)("ul",{className:"screen-menu",children:s.map((function(e,t){var c=e.name,s=e.hasSubMenu;return Object(j.jsxs)("li",{className:"menu-item ".concat(t===n?"is-active":""),children:[Object(j.jsx)("span",{children:c}),s&&Object(j.jsx)("svg",{className:"icon cheveron-right",viewBox:"0 0 5.8859 9.8",xmlns:"http://www.w3.org/2000/svg",children:Object(j.jsx)("path",{className:"primary",d:"m0.2 8.2a1 1 0 0 0 1.4 1.4l4-4a1 1 0 0 0 0-1.4l-4-4a1 1 0 0 0-1.4 1.4l3.29 3.3-3.3 3.3z"})})]},c)}))})})]})})},g=c.p+"static/media/tick.cb29c599.m4a";var p=function(){var e=new Audio(g),t=Object(s.useState)({type:"menu",header:"iPod",statusIcon:null,selectedIndex:0,menuItems:[{name:"Playlists",hasSubMenu:!0},{name:"Browse",hasSubMenu:!0},{name:"Extras",hasSubMenu:!0},{name:"Settings",hasSubMenu:!0},{name:"Backlight",hasSubMenu:!1}]}),c=Object(o.a)(t,2),n=c[0],a=c[1];return Object(j.jsxs)("div",{className:"ipod",children:[Object(j.jsx)(w,Object(r.a)({},n)),Object(j.jsx)(O,{}),Object(j.jsx)(v,{onTick:function(t){var c=t.direction,s=n.selectedIndex,i=n.menuItems;"clockwise"===c&&s<i.length-1&&a(Object(r.a)(Object(r.a)({},n),{},{selectedIndex:s+1})),"anticlockwise"===c&&s>0&&a(Object(r.a)(Object(r.a)({},n),{},{selectedIndex:s-1})),e.play()}})]})},f=function(e){e&&e instanceof Function&&c.e(3).then(c.bind(null,17)).then((function(t){var c=t.getCLS,s=t.getFID,n=t.getFCP,a=t.getLCP,i=t.getTTFB;c(e),s(e),n(e),a(e),i(e)}))};i.a.render(Object(j.jsx)(n.a.StrictMode,{children:Object(j.jsx)(p,{})}),document.getElementById("root")),f()}},[[16,1,2]]]);
//# sourceMappingURL=main.4a4a7391.chunk.js.map
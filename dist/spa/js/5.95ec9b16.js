(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[5],{"8f12":function(t,e,a){"use strict";var n=a("a9cc"),o=a.n(n);o.a},a9c3:function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("q-layout",{attrs:{view:"hHh lpR fFf"}},[a("q-header",[a("q-toolbar",[a("q-btn",{staticClass:"gt-xs",attrs:{flat:"",dense:"",round:"",icon:"menu","aria-label":"Menu"},on:{click:function(e){t.leftDrawerOpen=!t.leftDrawerOpen}}}),a("q-toolbar-title",{staticClass:"absolute-center"},[t._v("\n        Awesome ToDo\n      ")]),t.loggedIn?a("q-btn",{staticClass:"absolute-right",attrs:{flat:"",icon:"account_circle",label:"Logout"},on:{click:t.authStore.logoutUser}}):a("q-btn",{staticClass:"absolute-right",attrs:{flat:"",icon:"account_circle",label:"Login",to:"/auth"}})],1)],1),a("q-footer",[a("q-tabs",t._l(t.navs,(function(t){return a("q-route-tab",{key:t.id,attrs:{label:t.title,icon:t.icon,to:t.link}})})),1)],1),a("q-drawer",{staticClass:"gt-xs",attrs:{"show-if-above":"",bordered:"","content-class":"bg-primary"},model:{value:t.leftDrawerOpen,callback:function(e){t.leftDrawerOpen=e},expression:"leftDrawerOpen"}},[a("q-list",{attrs:{dark:""}},[a("q-item-label",{staticClass:"text-grey-4",attrs:{header:""}},[t._v("\n        Navigation\n      ")]),t._l(t.navs,(function(e){return a("essential-link",t._b({key:e.title,staticClass:"text-grey-4"},"essential-link",e,!1))}))],2)],1),a("q-page-container",[a("router-view")],1)],1)},o=[],r=a("2fe1"),c=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("q-item",{attrs:{clickable:"",tag:"a",to:t.link,exact:""}},[t.icon?a("q-item-section",{attrs:{avatar:""}},[a("q-icon",{attrs:{name:t.icon}})],1):t._e(),a("q-item-section",[a("q-item-label",[t._v(t._s(t.title))]),a("q-item-label",{attrs:{caption:""}},[t._v("\n      "+t._s(t.caption)+"\n    ")])],1)],1)},l=[],i=a("60a3"),s=function(t,e,a,n){var o,r=arguments.length,c=r<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,a):n;if("object"===typeof Reflect&&"function"===typeof Reflect.decorate)c=Reflect.decorate(t,e,a,n);else for(var l=t.length-1;l>=0;l--)(o=t[l])&&(c=(r<3?o(c):r>3?o(e,a,c):o(e,a))||c);return r>3&&c&&Object.defineProperty(e,a,c),c};let u=class extends i["c"]{};s([Object(i["b"])({required:!0})],u.prototype,"title",void 0),s([Object(i["b"])(String)],u.prototype,"caption",void 0),s([Object(i["b"])({default:"#"})],u.prototype,"link",void 0),s([Object(i["b"])({default:""})],u.prototype,"icon",void 0),u=s([i["a"]],u);var b=u,f=b,p=a("2877"),d=a("eebe"),g=a.n(d),v=a("66e5"),h=a("4074"),q=a("0016"),m=a("0170"),w=Object(p["a"])(f,c,l,!1,null,null,null),O=w.exports;g()(w,"components",{QItem:v["a"],QItemSection:h["a"],QIcon:q["a"],QItemLabel:m["a"]});var y=a("2b0e"),k=a("a522"),Q=a("6fc5"),_=function(t,e,a,n){var o,r=arguments.length,c=r<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,a):n;if("object"===typeof Reflect&&"function"===typeof Reflect.decorate)c=Reflect.decorate(t,e,a,n);else for(var l=t.length-1;l>=0;l--)(o=t[l])&&(c=(r<3?o(c):r>3?o(e,a,c):o(e,a))||c);return r>3&&c&&Object.defineProperty(e,a,c),c};let j=class extends y["a"]{constructor(){super(...arguments),this.authStore=Object(Q["e"])(k["a"]),this.leftDrawerOpen=!1,this.navs=[{title:"Todo",caption:"Todo page",icon:"list",link:"/"},{title:"Settings",caption:"Set things",icon:"settings",link:"/settings"}]}get loggedIn(){return this.authStore.loggedIn}updated(){this.loggedIn||this.$router.replace("/auth").catch(t=>{})}};j=_([Object(r["b"])({components:{EssentialLink:O}})],j);var x=j,D=x,I=(a("8f12"),a("4d5a")),C=a("e359"),R=a("65c6"),T=a("9c40"),L=a("6ac5"),S=a("7ff0"),P=a("429b"),E=a("7867"),$=a("9404"),F=a("1c1c"),H=a("09e3"),J=Object(p["a"])(D,n,o,!1,null,"2702320e",null);e["default"]=J.exports;g()(J,"components",{QLayout:I["a"],QHeader:C["a"],QToolbar:R["a"],QBtn:T["a"],QToolbarTitle:L["a"],QFooter:S["a"],QTabs:P["a"],QRouteTab:E["a"],QDrawer:$["a"],QList:F["a"],QItemLabel:m["a"],QPageContainer:H["a"]})},a9cc:function(t,e,a){}}]);
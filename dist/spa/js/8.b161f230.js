(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[8],{"311b":function(e,t,i){"use strict";i.r(t);var s=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("q-page",{attrs:{padding:""}},[i("q-list",{staticClass:"q-mb-lg",attrs:{bordered:"",padding:""}},[i("q-item-label",{attrs:{header:""}},[e._v("Settings")]),i("q-item",{directives:[{name:"ripple",rawName:"v-ripple"}],attrs:{tag:"label"}},[i("q-item-section",[i("q-item-label",[e._v("Show 12 hour time format")])],1),i("q-item-section",{attrs:{side:""}},[i("q-toggle",{attrs:{color:"secondary"},model:{value:e.show12HourTimeFormat,callback:function(t){e.show12HourTimeFormat=t},expression:"show12HourTimeFormat"}})],1)],1),i("q-item",{directives:[{name:"ripple",rawName:"v-ripple"}],attrs:{tag:"label"}},[i("q-item-section",[i("q-item-label",[e._v("Show tasks in one list")])],1),i("q-item-section",{attrs:{side:""}},[i("q-toggle",{attrs:{color:"secondary"},model:{value:e.showTaskInOneList,callback:function(t){e.showTaskInOneList=t},expression:"showTaskInOneList"}})],1)],1)],1),i("q-list",[i("q-item-label",{attrs:{header:""}},[e._v("More")]),i("q-item",{directives:[{name:"ripple",rawName:"v-ripple"}],attrs:{to:"/settings/help",tag:"label"}},[i("q-item-section",[i("q-item-label",[e._v("Help")])],1),i("q-item-section",{attrs:{side:""}},[i("q-icon",{attrs:{name:"chevron_right"}})],1)],1),i("q-item",{directives:[{name:"ripple",rawName:"v-ripple"}],attrs:{tag:"label"},on:{click:e.visitOurWebsite}},[i("q-item-section",[i("q-item-label",[e._v("Visit our website")])],1),i("q-item-section",{attrs:{side:""}},[i("q-icon",{attrs:{name:"chevron_right"}})],1)],1),i("q-item",{directives:[{name:"ripple",rawName:"v-ripple"}],attrs:{tag:"label"},on:{click:e.emailUs}},[i("q-item-section",[i("q-item-label",[e._v("Email Us")])],1),i("q-item-section",{attrs:{side:""}},[i("q-icon",{attrs:{name:"chevron_right"}})],1)],1)],1)],1)},a=[],o=i("2b0e"),r=i("2fe1"),n=i("6fc5"),l=i("90d9"),c=i("fe09"),m=function(e,t,i,s){var a,o=arguments.length,r=o<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"===typeof Reflect&&"function"===typeof Reflect.decorate)r=Reflect.decorate(e,t,i,s);else for(var n=e.length-1;n>=0;n--)(a=e[n])&&(r=(o<3?a(r):o>3?a(t,i,r):a(t,i))||r);return o>3&&r&&Object.defineProperty(t,i,r),r};let p=class extends o["a"]{constructor(){super(...arguments),this.store=Object(n["e"])(l["a"])}visitOurWebsite(){Object(c["f"])("http://www.google.com")}emailUs(){window.location.href="mailto:hello@awesometodo.com?subject=AwesomeTodo Feedback"}get show12HourTimeFormat(){return this.store.settings.show12HourTimeFormat}set show12HourTimeFormat(e){this.store.set12HourTimeFormatAction(e)}get showTaskInOneList(){return this.store.settings.showTaskInOneList}set showTaskInOneList(e){this.store.setTaskInOneListAction(e)}};p=m([Object(r["b"])({})],p);var h=p,b=h,d=i("2877"),w=i("eebe"),u=i.n(w),q=i("9989"),g=i("1c1c"),v=i("0170"),f=i("66e5"),O=i("4074"),T=i("9564"),k=i("0016"),_=i("714f"),I=Object(d["a"])(b,s,a,!1,null,null,null);t["default"]=I.exports;u()(I,"components",{QPage:q["a"],QList:g["a"],QItemLabel:v["a"],QItem:f["a"],QItemSection:O["a"],QToggle:T["a"],QIcon:k["a"]}),u()(I,"directives",{Ripple:_["a"]})}}]);
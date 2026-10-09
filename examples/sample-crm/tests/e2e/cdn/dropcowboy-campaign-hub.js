/*! Drop Cowboy Building Blocks campaigns (@dropcowboy/embed-campaigns 0.0.0). Do not edit. */
"use strict";(()=>{var P1=Object.defineProperty;var k0=Object.getOwnPropertyDescriptor;var M=(l,c)=>()=>(l&&(c=l(l=0)),c);var y0=(l,c)=>{for(var a in c)P1(l,a,{get:c[a],enumerable:!0})};var h=(l,c,a,e)=>{for(var r=e>1?void 0:e?k0(c,a):c,s=l.length-1,i;s>=0;s--)(i=l[s])&&(r=(e?i(c,a,r):i(r))||r);return e&&r&&P1(c,a,r),r};function a2(l){return typeof window>"u"||!window.DropCowboy||!window.DropCowboy.confirmSpend?!0:typeof window.confirm!="function"?!1:window.confirm(l)===!0}var q2=M(()=>{"use strict"});var L2,u2,$2,_1,l2,U1,B,q1,G2,W2=M(()=>{"use strict";L2=globalThis,u2=L2.ShadowRoot&&(L2.ShadyCSS===void 0||L2.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,$2=Symbol(),_1=new WeakMap,l2=class{constructor(c,a,e){if(this._$cssResult$=!0,e!==$2)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=c,this.t=a}get styleSheet(){let c=this.o,a=this.t;if(u2&&c===void 0){let e=a!==void 0&&a.length===1;e&&(c=_1.get(a)),c===void 0&&((this.o=c=new CSSStyleSheet).replaceSync(this.cssText),e&&_1.set(a,c))}return c}toString(){return this.cssText}},U1=l=>new l2(typeof l=="string"?l:l+"",void 0,$2),B=(l,...c)=>{let a=l.length===1?l[0]:c.reduce((e,r,s)=>e+(i=>{if(i._$cssResult$===!0)return i.cssText;if(typeof i=="number")return i;throw Error("Value passed to 'css' function must be a 'css' function result: "+i+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+l[s+1],l[0]);return new l2(a,l,$2)},q1=(l,c)=>{if(u2)l.adoptedStyleSheets=c.map(a=>a instanceof CSSStyleSheet?a:a.styleSheet);else for(let a of c){let e=document.createElement("style"),r=L2.litNonce;r!==void 0&&e.setAttribute("nonce",r),e.textContent=a.cssText,l.appendChild(e)}},G2=u2?l=>l:l=>l instanceof CSSStyleSheet?(c=>{let a="";for(let e of c.cssRules)a+=e.cssText;return U1(a)})(l):l});var P0,B0,F0,E0,H0,R0,v2,$1,D0,_0,e2,r2,h2,G1,F,s2=M(()=>{"use strict";W2();W2();({is:P0,defineProperty:B0,getOwnPropertyDescriptor:F0,getOwnPropertyNames:E0,getOwnPropertySymbols:H0,getPrototypeOf:R0}=Object),v2=globalThis,$1=v2.trustedTypes,D0=$1?$1.emptyScript:"",_0=v2.reactiveElementPolyfillSupport,e2=(l,c)=>l,r2={toAttribute(l,c){switch(c){case Boolean:l=l?D0:null;break;case Object:case Array:l=l==null?l:JSON.stringify(l)}return l},fromAttribute(l,c){let a=l;switch(c){case Boolean:a=l!==null;break;case Number:a=l===null?null:Number(l);break;case Object:case Array:try{a=JSON.parse(l)}catch{a=null}}return a}},h2=(l,c)=>!P0(l,c),G1={attribute:!0,type:String,converter:r2,reflect:!1,useDefault:!1,hasChanged:h2};Symbol.metadata??=Symbol("metadata"),v2.litPropertyMetadata??=new WeakMap;F=class extends HTMLElement{static addInitializer(c){this._$Ei(),(this.l??=[]).push(c)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(c,a=G1){if(a.state&&(a.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(c)&&((a=Object.create(a)).wrapped=!0),this.elementProperties.set(c,a),!a.noAccessor){let e=Symbol(),r=this.getPropertyDescriptor(c,e,a);r!==void 0&&B0(this.prototype,c,r)}}static getPropertyDescriptor(c,a,e){let{get:r,set:s}=F0(this.prototype,c)??{get(){return this[a]},set(i){this[a]=i}};return{get:r,set(i){let f=r?.call(this);s?.call(this,i),this.requestUpdate(c,f,e)},configurable:!0,enumerable:!0}}static getPropertyOptions(c){return this.elementProperties.get(c)??G1}static _$Ei(){if(this.hasOwnProperty(e2("elementProperties")))return;let c=R0(this);c.finalize(),c.l!==void 0&&(this.l=[...c.l]),this.elementProperties=new Map(c.elementProperties)}static finalize(){if(this.hasOwnProperty(e2("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(e2("properties"))){let a=this.properties,e=[...E0(a),...H0(a)];for(let r of e)this.createProperty(r,a[r])}let c=this[Symbol.metadata];if(c!==null){let a=litPropertyMetadata.get(c);if(a!==void 0)for(let[e,r]of a)this.elementProperties.set(e,r)}this._$Eh=new Map;for(let[a,e]of this.elementProperties){let r=this._$Eu(a,e);r!==void 0&&this._$Eh.set(r,a)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(c){let a=[];if(Array.isArray(c)){let e=new Set(c.flat(1/0).reverse());for(let r of e)a.unshift(G2(r))}else c!==void 0&&a.push(G2(c));return a}static _$Eu(c,a){let e=a.attribute;return e===!1?void 0:typeof e=="string"?e:typeof c=="string"?c.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(c=>this.enableUpdating=c),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(c=>c(this))}addController(c){(this._$EO??=new Set).add(c),this.renderRoot!==void 0&&this.isConnected&&c.hostConnected?.()}removeController(c){this._$EO?.delete(c)}_$E_(){let c=new Map,a=this.constructor.elementProperties;for(let e of a.keys())this.hasOwnProperty(e)&&(c.set(e,this[e]),delete this[e]);c.size>0&&(this._$Ep=c)}createRenderRoot(){let c=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return q1(c,this.constructor.elementStyles),c}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(c=>c.hostConnected?.())}enableUpdating(c){}disconnectedCallback(){this._$EO?.forEach(c=>c.hostDisconnected?.())}attributeChangedCallback(c,a,e){this._$AK(c,e)}_$ET(c,a){let e=this.constructor.elementProperties.get(c),r=this.constructor._$Eu(c,e);if(r!==void 0&&e.reflect===!0){let s=(e.converter?.toAttribute!==void 0?e.converter:r2).toAttribute(a,e.type);this._$Em=c,s==null?this.removeAttribute(r):this.setAttribute(r,s),this._$Em=null}}_$AK(c,a){let e=this.constructor,r=e._$Eh.get(c);if(r!==void 0&&this._$Em!==r){let s=e.getPropertyOptions(r),i=typeof s.converter=="function"?{fromAttribute:s.converter}:s.converter?.fromAttribute!==void 0?s.converter:r2;this._$Em=r;let f=i.fromAttribute(a,s.type);this[r]=f??this._$Ej?.get(r)??f,this._$Em=null}}requestUpdate(c,a,e,r=!1,s){if(c!==void 0){let i=this.constructor;if(r===!1&&(s=this[c]),e??=i.getPropertyOptions(c),!((e.hasChanged??h2)(s,a)||e.useDefault&&e.reflect&&s===this._$Ej?.get(c)&&!this.hasAttribute(i._$Eu(c,e))))return;this.C(c,a,e)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(c,a,{useDefault:e,reflect:r,wrapped:s},i){e&&!(this._$Ej??=new Map).has(c)&&(this._$Ej.set(c,i??a??this[c]),s!==!0||i!==void 0)||(this._$AL.has(c)||(this.hasUpdated||e||(a=void 0),this._$AL.set(c,a)),r===!0&&this._$Em!==c&&(this._$Eq??=new Set).add(c))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(a){Promise.reject(a)}let c=this.scheduleUpdate();return c!=null&&await c,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[r,s]of this._$Ep)this[r]=s;this._$Ep=void 0}let e=this.constructor.elementProperties;if(e.size>0)for(let[r,s]of e){let{wrapped:i}=s,f=this[r];i!==!0||this._$AL.has(r)||f===void 0||this.C(r,void 0,s,f)}}let c=!1,a=this._$AL;try{c=this.shouldUpdate(a),c?(this.willUpdate(a),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(a)):this._$EM()}catch(e){throw c=!1,this._$EM(),e}c&&this._$AE(a)}willUpdate(c){}_$AE(c){this._$EO?.forEach(a=>a.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(c)),this.updated(c)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(c){return!0}update(c){this._$Eq&&=this._$Eq.forEach(a=>this._$ET(a,this[a])),this._$EM()}updated(c){}firstUpdated(c){}};F.elementStyles=[],F.shadowRootOptions={mode:"open"},F[e2("elementProperties")]=new Map,F[e2("finalized")]=new Map,_0?.({ReactiveElement:F}),(v2.reactiveElementVersions??=[]).push("2.1.2")});function Y1(l,c){if(!K2(l)||!l.hasOwnProperty("raw"))throw Error("invalid template strings array");return I1!==void 0?I1.createHTML(c):c}function G(l,c,a=l,e){if(c===H)return c;let r=e!==void 0?a._$Co?.[e]:a._$Cl,s=f2(c)?void 0:c._$litDirective$;return r?.constructor!==s&&(r?._$AO?.(!1),s===void 0?r=void 0:(r=new s(l),r._$AT(l,a,e)),e!==void 0?(a._$Co??=[])[e]=r:a._$Cl=r),r!==void 0&&(c=G(l,r._$AS(l,c.values),r,e)),c}var O2,W1,C2,I1,V2,E,j2,U0,$,o2,f2,K2,Q1,I2,i2,O1,V1,U,j1,K1,J1,X2,t,H6,R6,H,d,X1,q,Z1,n2,g2,K,W,x2,S2,N2,b2,c4,q0,a4,X=M(()=>{"use strict";O2=globalThis,W1=l=>l,C2=O2.trustedTypes,I1=C2?C2.createPolicy("lit-html",{createHTML:l=>l}):void 0,V2="$lit$",E=`lit$${Math.random().toFixed(9).slice(2)}$`,j2="?"+E,U0=`<${j2}>`,$=document,o2=()=>$.createComment(""),f2=l=>l===null||typeof l!="object"&&typeof l!="function",K2=Array.isArray,Q1=l=>K2(l)||typeof l?.[Symbol.iterator]=="function",I2=`[ 	
\f\r]`,i2=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,O1=/-->/g,V1=/>/g,U=RegExp(`>|${I2}(?:([^\\s"'>=/]+)(${I2}*=${I2}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),j1=/'/g,K1=/"/g,J1=/^(?:script|style|textarea|title)$/i,X2=l=>(c,...a)=>({_$litType$:l,strings:c,values:a}),t=X2(1),H6=X2(2),R6=X2(3),H=Symbol.for("lit-noChange"),d=Symbol.for("lit-nothing"),X1=new WeakMap,q=$.createTreeWalker($,129);Z1=(l,c)=>{let a=l.length-1,e=[],r,s=c===2?"<svg>":c===3?"<math>":"",i=i2;for(let f=0;f<a;f++){let o=l[f],p,v,n=-1,z=0;for(;z<o.length&&(i.lastIndex=z,v=i.exec(o),v!==null);)z=i.lastIndex,i===i2?v[1]==="!--"?i=O1:v[1]!==void 0?i=V1:v[2]!==void 0?(J1.test(v[2])&&(r=RegExp("</"+v[2],"g")),i=U):v[3]!==void 0&&(i=U):i===U?v[0]===">"?(i=r??i2,n=-1):v[1]===void 0?n=-2:(n=i.lastIndex-v[2].length,p=v[1],i=v[3]===void 0?U:v[3]==='"'?K1:j1):i===K1||i===j1?i=U:i===O1||i===V1?i=i2:(i=U,r=void 0);let m=i===U&&l[f+1].startsWith("/>")?" ":"";s+=i===i2?o+U0:n>=0?(e.push(p),o.slice(0,n)+V2+o.slice(n)+E+m):o+E+(n===-2?f:m)}return[Y1(l,s+(l[a]||"<?>")+(c===2?"</svg>":c===3?"</math>":"")),e]},n2=class l{constructor({strings:c,_$litType$:a},e){let r;this.parts=[];let s=0,i=0,f=c.length-1,o=this.parts,[p,v]=Z1(c,a);if(this.el=l.createElement(p,e),q.currentNode=this.el.content,a===2||a===3){let n=this.el.content.firstChild;n.replaceWith(...n.childNodes)}for(;(r=q.nextNode())!==null&&o.length<f;){if(r.nodeType===1){if(r.hasAttributes())for(let n of r.getAttributeNames())if(n.endsWith(V2)){let z=v[i++],m=r.getAttribute(n).split(E),L=/([.?@])?(.*)/.exec(z);o.push({type:1,index:s,name:L[2],strings:m,ctor:L[1]==="."?x2:L[1]==="?"?S2:L[1]==="@"?N2:W}),r.removeAttribute(n)}else n.startsWith(E)&&(o.push({type:6,index:s}),r.removeAttribute(n));if(J1.test(r.tagName)){let n=r.textContent.split(E),z=n.length-1;if(z>0){r.textContent=C2?C2.emptyScript:"";for(let m=0;m<z;m++)r.append(n[m],o2()),q.nextNode(),o.push({type:2,index:++s});r.append(n[z],o2())}}}else if(r.nodeType===8)if(r.data===j2)o.push({type:2,index:s});else{let n=-1;for(;(n=r.data.indexOf(E,n+1))!==-1;)o.push({type:7,index:s}),n+=E.length-1}s++}}static createElement(c,a){let e=$.createElement("template");return e.innerHTML=c,e}};g2=class{constructor(c,a){this._$AV=[],this._$AN=void 0,this._$AD=c,this._$AM=a}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(c){let{el:{content:a},parts:e}=this._$AD,r=(c?.creationScope??$).importNode(a,!0);q.currentNode=r;let s=q.nextNode(),i=0,f=0,o=e[0];for(;o!==void 0;){if(i===o.index){let p;o.type===2?p=new K(s,s.nextSibling,this,c):o.type===1?p=new o.ctor(s,o.name,o.strings,this,c):o.type===6&&(p=new b2(s,this,c)),this._$AV.push(p),o=e[++f]}i!==o?.index&&(s=q.nextNode(),i++)}return q.currentNode=$,r}p(c){let a=0;for(let e of this._$AV)e!==void 0&&(e.strings!==void 0?(e._$AI(c,e,a),a+=e.strings.length-2):e._$AI(c[a])),a++}},K=class l{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(c,a,e,r){this.type=2,this._$AH=d,this._$AN=void 0,this._$AA=c,this._$AB=a,this._$AM=e,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let c=this._$AA.parentNode,a=this._$AM;return a!==void 0&&c?.nodeType===11&&(c=a.parentNode),c}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(c,a=this){c=G(this,c,a),f2(c)?c===d||c==null||c===""?(this._$AH!==d&&this._$AR(),this._$AH=d):c!==this._$AH&&c!==H&&this._(c):c._$litType$!==void 0?this.$(c):c.nodeType!==void 0?this.T(c):Q1(c)?this.k(c):this._(c)}O(c){return this._$AA.parentNode.insertBefore(c,this._$AB)}T(c){this._$AH!==c&&(this._$AR(),this._$AH=this.O(c))}_(c){this._$AH!==d&&f2(this._$AH)?this._$AA.nextSibling.data=c:this.T($.createTextNode(c)),this._$AH=c}$(c){let{values:a,_$litType$:e}=c,r=typeof e=="number"?this._$AC(c):(e.el===void 0&&(e.el=n2.createElement(Y1(e.h,e.h[0]),this.options)),e);if(this._$AH?._$AD===r)this._$AH.p(a);else{let s=new g2(r,this),i=s.u(this.options);s.p(a),this.T(i),this._$AH=s}}_$AC(c){let a=X1.get(c.strings);return a===void 0&&X1.set(c.strings,a=new n2(c)),a}k(c){K2(this._$AH)||(this._$AH=[],this._$AR());let a=this._$AH,e,r=0;for(let s of c)r===a.length?a.push(e=new l(this.O(o2()),this.O(o2()),this,this.options)):e=a[r],e._$AI(s),r++;r<a.length&&(this._$AR(e&&e._$AB.nextSibling,r),a.length=r)}_$AR(c=this._$AA.nextSibling,a){for(this._$AP?.(!1,!0,a);c!==this._$AB;){let e=W1(c).nextSibling;W1(c).remove(),c=e}}setConnected(c){this._$AM===void 0&&(this._$Cv=c,this._$AP?.(c))}},W=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(c,a,e,r,s){this.type=1,this._$AH=d,this._$AN=void 0,this.element=c,this.name=a,this._$AM=r,this.options=s,e.length>2||e[0]!==""||e[1]!==""?(this._$AH=Array(e.length-1).fill(new String),this.strings=e):this._$AH=d}_$AI(c,a=this,e,r){let s=this.strings,i=!1;if(s===void 0)c=G(this,c,a,0),i=!f2(c)||c!==this._$AH&&c!==H,i&&(this._$AH=c);else{let f=c,o,p;for(c=s[0],o=0;o<s.length-1;o++)p=G(this,f[e+o],a,o),p===H&&(p=this._$AH[o]),i||=!f2(p)||p!==this._$AH[o],p===d?c=d:c!==d&&(c+=(p??"")+s[o+1]),this._$AH[o]=p}i&&!r&&this.j(c)}j(c){c===d?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,c??"")}},x2=class extends W{constructor(){super(...arguments),this.type=3}j(c){this.element[this.name]=c===d?void 0:c}},S2=class extends W{constructor(){super(...arguments),this.type=4}j(c){this.element.toggleAttribute(this.name,!!c&&c!==d)}},N2=class extends W{constructor(c,a,e,r,s){super(c,a,e,r,s),this.type=5}_$AI(c,a=this){if((c=G(this,c,a,0)??d)===H)return;let e=this._$AH,r=c===d&&e!==d||c.capture!==e.capture||c.once!==e.once||c.passive!==e.passive,s=c!==d&&(e===d||r);r&&this.element.removeEventListener(this.name,this,e),s&&this.element.addEventListener(this.name,this,c),this._$AH=c}handleEvent(c){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,c):this._$AH.handleEvent(c)}},b2=class{constructor(c,a,e){this.element=c,this.type=6,this._$AN=void 0,this._$AM=a,this.options=e}get _$AU(){return this._$AM._$AU}_$AI(c){G(this,c)}},c4={M:V2,P:E,A:j2,C:1,L:Z1,R:g2,D:Q1,V:G,I:K,H:W,N:S2,U:N2,B:x2,F:b2},q0=O2.litHtmlPolyfillSupport;q0?.(n2,K),(O2.litHtmlVersions??=[]).push("3.3.3");a4=(l,c,a)=>{let e=a?.renderBefore??c,r=e._$litPart$;if(r===void 0){let s=a?.renderBefore??null;e._$litPart$=r=new K(c.insertBefore(o2(),s),s,void 0,a??{})}return r._$AI(l),r}});var Q2,R,$0,l4=M(()=>{"use strict";s2();s2();X();X();Q2=globalThis,R=class extends F{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let c=super.createRenderRoot();return this.renderOptions.renderBefore??=c.firstChild,c}update(c){let a=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(c),this._$Do=a4(a,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return H}};R._$litElement$=!0,R.finalized=!0,Q2.litElementHydrateSupport?.({LitElement:R});$0=Q2.litElementPolyfillSupport;$0?.({LitElement:R});(Q2.litElementVersions??=[]).push("4.2.2")});var e4=M(()=>{"use strict";});var I=M(()=>{"use strict";s2();X();l4();e4()});var r4,Q,s4=M(()=>{"use strict";r4=(l,c)=>{customElements.get(l)||customElements.define(l,c)},Q=l=>(c,a)=>{a!==void 0?a.addInitializer(()=>{r4(l,c)}):r4(l,c)}});function g(l){return(c,a)=>typeof a=="object"?W0(l,c,a):((e,r,s)=>{let i=r.hasOwnProperty(s);return r.constructor.createProperty(s,e),i?Object.getOwnPropertyDescriptor(r,s):void 0})(l,c,a)}var G0,W0,J2=M(()=>{"use strict";s2();G0={attribute:!0,type:String,converter:r2,reflect:!1,hasChanged:h2},W0=(l=G0,c,a)=>{let{kind:e,metadata:r}=a,s=globalThis.litPropertyMetadata.get(r);if(s===void 0&&globalThis.litPropertyMetadata.set(r,s=new Map),e==="setter"&&((l=Object.create(l)).wrapped=!0),s.set(a.name,l),e==="accessor"){let{name:i}=a;return{set(f){let o=c.get.call(this);c.set.call(this,f),this.requestUpdate(i,o,l,!0,f)},init(f){return f!==void 0&&this.C(i,void 0,l,f),f}}}if(e==="setter"){let{name:i}=a;return function(f){let o=this[i];c.call(this,f),this.requestUpdate(i,o,l,!0,f)}}throw Error("Unsupported decorator location: "+e)}});function i4(l){return g({...l,state:!0,attribute:!1})}var o4=M(()=>{"use strict";J2();});var f4=M(()=>{"use strict";});var J=M(()=>{"use strict";});var n4=M(()=>{"use strict";J();});var t4=M(()=>{"use strict";J();});var m4=M(()=>{"use strict";J();});var z4=M(()=>{"use strict";J();});var p4=M(()=>{"use strict";J();});var k2=M(()=>{"use strict";s4();J2();o4();f4();n4();t4();m4();z4();p4()});var Y2,Z2=M(()=>{"use strict";I();Y2=B`
  :host {
    box-sizing: border-box;
    font-family: var(--dc-font-family);
    font-size: var(--dc-font-size);
    line-height: 1.45;
    color: var(--dc-text-color);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  button {
    font: inherit;
    color: inherit;
  }
  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 0.001ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.001ms !important;
    }
  }

  .dc-panel {
    display: flex;
    flex-direction: column;
    background: var(--dc-bg-color);
    border: 1px solid var(--dc-border-color);
    border-radius: var(--dc-radius);
    box-shadow: var(--dc-shadow);
    overflow: hidden;
  }
  .dc-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    padding: 10px 12px 10px 16px;
    min-height: 56px;
    background: var(--dc-bg-color);
    border-bottom: 1px solid var(--dc-border-color);
    flex-shrink: 0;
  }
  .dc-h-left {
    display: flex;
    align-items: center;
    gap: 10px;
    min-width: 0;
  }
  .dc-h-right {
    display: flex;
    align-items: center;
    gap: 2px;
  }
  .dc-title {
    font-weight: 700;
    font-size: 16px;
    line-height: 1.2;
  }
  .dc-subtitle {
    font-size: var(--dc-font-size-sm);
    color: var(--dc-text-muted);
  }

  .dc-avatar {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: var(--dc-primary-soft);
    color: var(--dc-primary-color);
    display: grid;
    place-items: center;
    font-weight: 600;
    font-size: 13px;
    position: relative;
    flex-shrink: 0;
  }
  .dc-avatar .dc-dot {
    position: absolute;
    right: -1px;
    bottom: -1px;
    width: 11px;
    height: 11px;
    border-radius: 50%;
    background: var(--dc-online);
    border: 2px solid var(--dc-bg-color);
  }

  .dc-btn {
    appearance: none;
    border: 0;
    cursor: pointer;
    font-weight: 600;
    border-radius: var(--dc-radius-sm);
    padding: 10px 16px;
    background: var(--dc-primary-color);
    color: var(--dc-primary-text);
    transition: background var(--dc-transition);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }
  .dc-btn:hover {
    background: var(--dc-primary-hover);
  }
  .dc-btn:focus-visible {
    outline: 2px solid var(--dc-primary-color);
    outline-offset: 2px;
  }
  .dc-btn.dc-secondary {
    background: transparent;
    color: var(--dc-text-color);
    border: 1px solid var(--dc-border-color);
  }
  .dc-btn.dc-secondary:hover {
    background: var(--dc-surface-color);
  }
  .dc-btn.dc-danger {
    background: var(--dc-danger);
    color: #fff;
  }
  .dc-btn.dc-online {
    background: var(--dc-online);
    color: #fff;
  }

  .dc-iconbtn {
    width: 36px;
    height: 36px;
    border-radius: var(--dc-radius-sm);
    border: 0;
    background: transparent;
    color: var(--dc-text-muted);
    cursor: pointer;
    display: grid;
    place-items: center;
    transition: background var(--dc-transition);
  }
  .dc-iconbtn:hover {
    background: var(--dc-surface-color);
    color: var(--dc-text-color);
  }
  .dc-iconbtn:focus-visible {
    outline: 2px solid var(--dc-primary-color);
    outline-offset: 1px;
  }

  .dc-pill {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    font-size: var(--dc-font-size-xs);
    font-weight: 600;
    padding: 3px 8px;
    border-radius: 999px;
    background: var(--dc-surface-2);
    color: var(--dc-text-muted);
    white-space: nowrap;
  }
  .dc-pill .dc-pdot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: currentColor;
  }
  .dc-pill.is-online {
    background: var(--dc-online-soft);
    color: var(--dc-online-text);
  }
  .dc-pill.is-danger {
    background: var(--dc-danger-soft);
    color: var(--dc-danger-text);
  }
  .dc-pill.is-warning {
    background: var(--dc-warning-soft);
    color: var(--dc-warning-text);
  }
  .dc-pill.is-info {
    background: var(--dc-info-soft);
    color: var(--dc-info-text);
  }

  .dc-muted {
    color: var(--dc-text-muted);
  }
  .dc-light {
    color: var(--dc-text-light);
  }
  .dc-sm {
    font-size: var(--dc-font-size-sm);
  }
  .dc-xs {
    font-size: var(--dc-font-size-xs);
  }
`});function d4(l,c){let a=Object.keys(c),e="";for(let r=0;r<a.length;r++)e+=a[r]+":"+c[a[r]]+";";return l+"{"+e+"}"}function c1(l){let c=l||(typeof document<"u"?document:null);if(!c||!c.head||typeof c.createElement!="function"||c.querySelector("style["+M4+"]"))return!1;let a=c.createElement("style");return a.setAttribute(M4,""),a.textContent=V0,c.head.insertBefore(a,c.head.firstChild),!0}var M4,I0,O0,V0,a1=M(()=>{"use strict";M4="data-dc-tokens",I0={"--dc-primary-color":"#2563eb","--dc-primary-hover":"#1d4ed8","--dc-primary-text":"#ffffff","--dc-primary-soft":"#eaf1fe","--dc-bg-color":"#ffffff","--dc-surface-color":"#f7f8fa","--dc-surface-2":"#eef0f4","--dc-border-color":"#ebedf0","--dc-text-color":"#1a1d21","--dc-text-muted":"#5c6370","--dc-text-light":"#646b78","--dc-agent-bubble-bg":"#f1f3f6","--dc-agent-bubble-text":"#1a1d21","--dc-visitor-bubble-bg":"var(--dc-primary-color)","--dc-visitor-bubble-text":"var(--dc-primary-text)","--dc-online":"#22c55e","--dc-online-soft":"#e7f8ed","--dc-online-text":"#15803d","--dc-danger":"#ef4444","--dc-danger-soft":"#fdecec","--dc-danger-text":"#b91c1c","--dc-warning":"#f59e0b","--dc-warning-soft":"#fef3e2","--dc-warning-text":"#b45309","--dc-info":"#0ea5e9","--dc-info-soft":"#e6f6fe","--dc-info-text":"#0369a1","--dc-shadow":"0 8px 24px rgba(15, 23, 42, 0.08)","--dc-shadow-sm":"0 1px 2px rgba(15, 23, 42, 0.06)","--dc-radius":"12px","--dc-radius-sm":"8px","--dc-radius-bubble":"12px","--dc-font-family":'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',"--dc-font-size":"14px","--dc-font-size-sm":"12px","--dc-font-size-xs":"11px","--dc-transition":"0.15s ease","--dc-ease-panel":"cubic-bezier(0.16, 1, 0.3, 1)"},O0={"--dc-primary-color":"#60a5fa","--dc-primary-hover":"#93c5fd","--dc-primary-text":"#0f172a","--dc-primary-soft":"#1e2a44","--dc-bg-color":"#0f1419","--dc-surface-color":"#1a1f26","--dc-surface-2":"#242b33","--dc-border-color":"#2e3640","--dc-text-color":"#f3f4f6","--dc-text-muted":"#aab2bd","--dc-text-light":"#959ca6","--dc-agent-bubble-bg":"#2e3138","--dc-agent-bubble-text":"#f3f4f6","--dc-online-soft":"#14321f","--dc-online-text":"#4ade80","--dc-danger-soft":"#3a1d1d","--dc-danger-text":"#fca5a5","--dc-warning-soft":"#3a2c12","--dc-warning-text":"#fcd34d","--dc-info-soft":"#12303d","--dc-info-text":"#7dd3fc"};V0=d4(":where(:root)",I0)+d4(':where([data-dc-theme="dark"])',O0)});var A,l1=M(()=>{"use strict";I();Z2();a1();A=class extends R{connectedCallback(){c1(this.ownerDocument),super.connectedCallback()}announce(c){let a=this.renderRoot?.querySelector("[data-dc-live]");a||(a=document.createElement("div"),a.setAttribute("data-dc-live",""),a.setAttribute("aria-live","polite"),a.setAttribute("role","status"),a.style.cssText="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;",this.renderRoot?.appendChild(a)),a.textContent="",requestAnimationFrame(()=>{a&&(a.textContent=c)})}};A.styles=Y2});var j0,O,L4=M(()=>{"use strict";I();k2();l1();j0={reconnecting:{tone:"warning",text:"Reconnecting\u2026 live updates will resume automatically.",spinner:!0},offline:{tone:"danger",text:"You're offline. We'll reconnect and sync as soon as your connection returns."},"other-tab":{tone:"info",text:"This session is active in another tab. Calls and the dialer run there.",action:"Use it here",event:"dc-resume-here"},"session-expiring":{tone:"warning",text:"Your secure session expires soon.",action:"Stay signed in",event:"dc-refresh-session"},"session-expired":{tone:"danger",text:"Your session expired for security. Sign in again to continue.",action:"Sign in",event:"dc-reauth"}},O=class extends A{constructor(){super(...arguments);this.kind="reconnecting"}render(){let a=j0[this.kind],e=a.tone==="danger"?"alert":"status";return t`
      <div class="banner ${a.tone}" role=${e}>
        ${a.spinner?t`<span class="spin"></span>`:t`<span class="dot"></span>`}
        <span class="txt">${a.text}</span>
        ${a.action?t`<button class="act" @click=${()=>this.emit(a.event??"dc-action")}>${a.action}</button>`:d}
      </div>
    `}emit(a){this.dispatchEvent(new CustomEvent(a,{bubbles:!0,composed:!0}))}};O.styles=[A.styles,B`
      :host {
        display: block;
        width: 480px;
        max-width: 100%;
      }
      .banner {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 11px 14px;
        border-radius: var(--dc-radius-sm);
        font-size: var(--dc-font-size-sm);
        font-weight: 600;
      }
      .warning {
        background: var(--dc-warning-soft);
        color: var(--dc-warning-text);
      }
      .danger {
        background: var(--dc-danger-soft);
        color: var(--dc-danger-text);
      }
      .info {
        background: var(--dc-info-soft);
        color: var(--dc-info-text);
      }
      .txt {
        flex: 1;
      }
      .dot {
        width: 9px;
        height: 9px;
        border-radius: 50%;
        background: currentColor;
        flex-shrink: 0;
      }
      .spin {
        width: 14px;
        height: 14px;
        border-radius: 50%;
        border: 2px solid currentColor;
        border-right-color: transparent;
        animation: spin 0.8s linear infinite;
        flex-shrink: 0;
      }
      @keyframes spin {
        to {
          transform: rotate(360deg);
        }
      }
      .act {
        border: 1px solid currentColor;
        background: transparent;
        color: inherit;
        font: inherit;
        font-weight: 700;
        padding: 5px 11px;
        border-radius: 999px;
        cursor: pointer;
        white-space: nowrap;
      }
      .act:hover {
        background: rgba(0, 0, 0, 0.06);
      }
    `],h([g({type:String})],O.prototype,"kind",2),O=h([Q("dc-system-banner")],O)});var u4,v4=M(()=>{"use strict";u4={prefix:"far",iconName:"circle",icon:[512,512,[128308,128309,128992,128993,128994,128995,128996,9679,9898,9899,11044,61708,61915],"f111","M464 256a208 208 0 1 0 -416 0 208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0 256 256 0 1 1 -512 0z"]}});var h4,C4,g4,x4,S4,N4,b4,w4,k4,y4,A4,T4,P4,B4,F4,E4,H4,R4,D4,_4,U4,q4,$4,G4,W4,I4,O4,V4,j4,K4,X4,Q4,J4,Y4,Z4,c3,a3,l3,e3,r3,s3,i3,o3,f3,n3,t3,m3,z3,p3,M3,d3,L3,u3,v3,h3,C3,g3,x3,S3,N3,b3,w3,k3,y3,A3,T3,P3,B3,F3,E3,H3,R3,D3,_3,U3,q3,$3,G3,W3=M(()=>{"use strict";h4={prefix:"fas",iconName:"minus",icon:[448,512,[8211,8722,10134,"subtract"],"f068","M0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32z"]},C4={prefix:"fas",iconName:"microphone-slash",icon:[576,512,[],"f131","M41-24.9c-9.4-9.4-24.6-9.4-33.9 0S-2.3-.3 7 9.1l528 528c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9L424.7 358.8C458.9 324.2 480 276.6 480 224l0-40c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 40c0 39.3-15.7 74.9-41.3 100.9L356.8 291C373.6 273.7 384 250 384 224l0-128c0-53-43-96-96-96s-96 43-96 96l0 30.2-151-151zm298.3 434l-41.4-41.4c-3.3 .2-6.5 .3-9.8 .3-79.5 0-144-64.5-144-144l0-10.2-43.6-43.6c-2.8 3.9-4.4 8.7-4.4 13.8l0 40c0 97.9 73.3 178.7 168 190.5l0 49.5-48 0c-13.3 0-24 10.7-24 24s10.7 24 24 24l144 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-48 0 0-49.5c9.3-1.2 18.4-3 27.3-5.4z"]},g4={prefix:"fas",iconName:"comment-sms",icon:[512,512,["sms"],"f7cd","M256 480c141.4 0 256-107.5 256-240S397.4 0 256 0 0 107.5 0 240c0 54.3 19.2 104.3 51.6 144.5L2.8 476.8c-4.8 9-3.3 20 3.6 27.5s17.8 9.8 27.1 5.8l118.4-50.7C183.7 472.6 218.9 480 256 480zM140.8 172.8l19.2 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-19.2 0c-5.3 0-9.6 4.3-9.6 9.6s4.3 9.6 9.6 9.6c23 0 41.6 18.6 41.6 41.6s-18.6 41.6-41.6 41.6l-25.6 0c-8.8 0-16-7.2-16-16s7.2-16 16-16l25.6 0c5.3 0 9.6-4.3 9.6-9.6s-4.3-9.6-9.6-9.6c-23 0-41.6-18.6-41.6-41.6s18.6-41.6 41.6-41.6zm188.8 41.6c0-23 18.6-41.6 41.6-41.6l19.2 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-19.2 0c-5.3 0-9.6 4.3-9.6 9.6s4.3 9.6 9.6 9.6c23 0 41.6 18.6 41.6 41.6s-18.6 41.6-41.6 41.6l-25.6 0c-8.8 0-16-7.2-16-16s7.2-16 16-16l25.6 0c5.3 0 9.6-4.3 9.6-9.6s-4.3-9.6-9.6-9.6c-23 0-41.6-18.6-41.6-41.6zm-98.3-33.8l24.7 41.1 24.7-41.1c3.7-6.2 11.1-9.1 18-7.2s11.7 8.2 11.7 15.4l0 102.4c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-44.6-8.7 14.5c-2.9 4.8-8.1 7.8-13.7 7.8s-10.8-3-13.7-7.8l-8.7-14.5 0 44.6c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-102.4c0-7.2 4.8-13.5 11.7-15.4s14.3 1 18 7.2z"]},x4={prefix:"fas",iconName:"envelope",icon:[512,512,[128386,9993,61443],"f0e0","M48 64c-26.5 0-48 21.5-48 48 0 15.1 7.1 29.3 19.2 38.4l208 156c17.1 12.8 40.5 12.8 57.6 0l208-156c12.1-9.1 19.2-23.3 19.2-38.4 0-26.5-21.5-48-48-48L48 64zM0 196L0 384c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-188-198.4 148.8c-34.1 25.6-81.1 25.6-115.2 0L0 196z"]},S4={prefix:"fas",iconName:"bell",icon:[448,512,[128276,61602],"f0f3","M224 0c-17.7 0-32 14.3-32 32l0 3.2C119 50 64 114.6 64 192l0 21.7c0 48.1-16.4 94.8-46.4 132.4L7.8 358.3C2.7 364.6 0 372.4 0 380.5 0 400.1 15.9 416 35.5 416l376.9 0c19.6 0 35.5-15.9 35.5-35.5 0-8.1-2.7-15.9-7.8-22.2l-9.8-12.2C400.4 308.5 384 261.8 384 213.7l0-21.7c0-77.4-55-142-128-156.8l0-3.2c0-17.7-14.3-32-32-32zM162 464c7.1 27.6 32.2 48 62 48s54.9-20.4 62-48l-124 0z"]},N4={prefix:"fas",iconName:"calendar-days",icon:[448,512,["calendar-alt"],"f073","M128 0c17.7 0 32 14.3 32 32l0 32 128 0 0-32c0-17.7 14.3-32 32-32s32 14.3 32 32l0 32 32 0c35.3 0 64 28.7 64 64l0 288c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64L0 128C0 92.7 28.7 64 64 64l32 0 0-32c0-17.7 14.3-32 32-32zM64 240l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm128 0l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0zM64 368l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0zm112 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16z"]},b4={prefix:"fas",iconName:"ellipsis",icon:[448,512,["ellipsis-h"],"f141","M0 256a56 56 0 1 1 112 0 56 56 0 1 1 -112 0zm168 0a56 56 0 1 1 112 0 56 56 0 1 1 -112 0zm224-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112z"]},w4={prefix:"fas",iconName:"magnifying-glass",icon:[512,512,[128269,"search"],"f002","M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376C296.3 401.1 253.9 416 208 416 93.1 416 0 322.9 0 208S93.1 0 208 0 416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"]},k4={prefix:"fas",iconName:"ban",icon:[512,512,[128683,"cancel"],"f05e","M367.2 412.5L99.5 144.8c-22.4 31.4-35.5 69.8-35.5 111.2 0 106 86 192 192 192 41.5 0 79.9-13.1 111.2-35.5zm45.3-45.3c22.4-31.4 35.5-69.8 35.5-111.2 0-106-86-192-192-192-41.5 0-79.9 13.1-111.2 35.5L412.5 367.2zM0 256a256 256 0 1 1 512 0 256 256 0 1 1 -512 0z"]},y4={prefix:"fas",iconName:"record-vinyl",icon:[512,512,[],"f8d9","M0 256a256 256 0 1 1 512 0 256 256 0 1 1 -512 0zm256-96a96 96 0 1 1 0 192 96 96 0 1 1 0-192zm0 240a144 144 0 1 0 0-288 144 144 0 1 0 0 288zm0-112a32 32 0 1 0 0-64 32 32 0 1 0 0 64z"]},A4={prefix:"fas",iconName:"palette",icon:[512,512,[127912],"f53f","M512 256c0 .9 0 1.8 0 2.7-.4 36.5-33.6 61.3-70.1 61.3L344 320c-26.5 0-48 21.5-48 48 0 3.4 .4 6.7 1 9.9 2.1 10.2 6.5 20 10.8 29.9 6.1 13.8 12.1 27.5 12.1 42 0 31.8-21.6 60.7-53.4 62-3.5 .1-7 .2-10.6 .2-141.4 0-256-114.6-256-256S114.6 0 256 0 512 114.6 512 256zM128 288a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm0-96a32 32 0 1 0 0-64 32 32 0 1 0 0 64zM288 96a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm96 96a32 32 0 1 0 0-64 32 32 0 1 0 0 64z"]},T4={prefix:"fas",iconName:"sitemap",icon:[512,512,[],"f0e8","M192 64c0-17.7 14.3-32 32-32l64 0c17.7 0 32 14.3 32 32l0 64c0 17.7-14.3 32-32 32l-8 0 0 64 120 0c39.8 0 72 32.2 72 72l0 56 8 0c17.7 0 32 14.3 32 32l0 64c0 17.7-14.3 32-32 32l-64 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l8 0 0-56c0-13.3-10.7-24-24-24l-120 0 0 80 8 0c17.7 0 32 14.3 32 32l0 64c0 17.7-14.3 32-32 32l-64 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l8 0 0-80-120 0c-13.3 0-24 10.7-24 24l0 56 8 0c17.7 0 32 14.3 32 32l0 64c0 17.7-14.3 32-32 32l-64 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l8 0 0-56c0-39.8 32.2-72 72-72l120 0 0-64-8 0c-17.7 0-32-14.3-32-32l0-64z"]},P4={prefix:"fas",iconName:"fax",icon:[512,512,[128224,128439],"f1ac","M160 64l0 80 64 0 0-80 146.7 0 45.3 45.3 0 34.7 64 0 0-34.7c0-17-6.7-33.3-18.7-45.3L416 18.7C404 6.7 387.7 0 370.7 0L224 0c-35.3 0-64 28.7-64 64zM32 128c-17.7 0-32 14.3-32 32L0 448c0 17.7 14.3 32 32 32l48 0c17.7 0 32-14.3 32-32l0-288c0-17.7-14.3-32-32-32l-48 0zm448 64l-320 0 0 256c0 17.7 14.3 32 32 32l288 0c17.7 0 32-14.3 32-32l0-224c0-17.7-14.3-32-32-32zM224 288a24 24 0 1 1 48 0 24 24 0 1 1 -48 0zm0 96a24 24 0 1 1 48 0 24 24 0 1 1 -48 0zM336 264a24 24 0 1 1 0 48 24 24 0 1 1 0-48zM312 384a24 24 0 1 1 48 0 24 24 0 1 1 -48 0zM424 264a24 24 0 1 1 0 48 24 24 0 1 1 0-48zM400 384a24 24 0 1 1 48 0 24 24 0 1 1 -48 0z"]},B4={prefix:"fas",iconName:"expand",icon:[448,512,[],"f065","M32 32C14.3 32 0 46.3 0 64l0 96c0 17.7 14.3 32 32 32s32-14.3 32-32l0-64 64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L32 32zM64 352c0-17.7-14.3-32-32-32S0 334.3 0 352l0 96c0 17.7 14.3 32 32 32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0 0-64zM320 32c-17.7 0-32 14.3-32 32s14.3 32 32 32l64 0 0 64c0 17.7 14.3 32 32 32s32-14.3 32-32l0-96c0-17.7-14.3-32-32-32l-96 0zM448 352c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 64-64 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l96 0c17.7 0 32-14.3 32-32l0-96z"]},F4={prefix:"fas",iconName:"table-columns",icon:[448,512,["columns"],"f0db","M0 96C0 60.7 28.7 32 64 32l320 0c35.3 0 64 28.7 64 64l0 320c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64L0 96zm64 64l0 256 128 0 0-256-128 0zm320 0l-128 0 0 256 128 0 0-256z"]},E4={prefix:"fas",iconName:"stop",icon:[448,512,[9209],"f04d","M64 32l320 0c35.3 0 64 28.7 64 64l0 320c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64L0 96C0 60.7 28.7 32 64 32z"]},H4={prefix:"fas",iconName:"clock",icon:[512,512,[128339,"clock-four"],"f017","M256 0a256 256 0 1 1 0 512 256 256 0 1 1 0-512zM232 120l0 136c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2 280 120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"]},R4={prefix:"fas",iconName:"rocket",icon:[512,512,[],"f135","M128 320L24.5 320c-24.9 0-40.2-27.1-27.4-48.5L50 183.3C58.7 168.8 74.3 160 91.2 160l95 0c76.1-128.9 189.6-135.4 265.5-124.3 12.8 1.9 22.8 11.9 24.6 24.6 11.1 75.9 4.6 189.4-124.3 265.5l0 95c0 16.9-8.8 32.5-23.3 41.2l-88.2 52.9c-21.3 12.8-48.5-2.6-48.5-27.4L192 384c0-35.3-28.7-64-64-64l-.1 0zM400 160a48 48 0 1 0 -96 0 48 48 0 1 0 96 0z"]},D4={prefix:"fas",iconName:"paper-plane",icon:[576,512,[61913],"f1d8","M536.4-26.3c9.8-3.5 20.6-1 28 6.3s9.8 18.2 6.3 28l-178 496.9c-5 13.9-18.1 23.1-32.8 23.1-14.2 0-27-8.6-32.3-21.7l-64.2-158c-4.5-11-2.5-23.6 5.2-32.6l94.5-112.4c5.1-6.1 4.7-15-.9-20.6s-14.6-6-20.6-.9L229.2 276.1c-9.1 7.6-21.6 9.6-32.6 5.2L38.1 216.8c-13.1-5.3-21.7-18.1-21.7-32.3 0-14.7 9.2-27.8 23.1-32.8l496.9-178z"]},_4={prefix:"fas",iconName:"fire",icon:[448,512,[128293],"f06d","M160.5-26.4c9.3-7.8 23-7.5 31.9 .9 12.3 11.6 23.3 24.4 33.9 37.4 13.5 16.5 29.7 38.3 45.3 64.2 5.2-6.8 10-12.8 14.2-17.9 1.1-1.3 2.2-2.7 3.3-4.1 7.9-9.8 17.7-22.1 30.8-22.1 13.4 0 22.8 11.9 30.8 22.1 1.3 1.7 2.6 3.3 3.9 4.8 10.3 12.4 24 30.3 37.7 52.4 27.2 43.9 55.6 106.4 55.6 176.6 0 123.7-100.3 224-224 224S0 411.7 0 288c0-91.1 41.1-170 80.5-225 19.9-27.7 39.7-49.9 54.6-65.1 8.2-8.4 16.5-16.7 25.5-24.2zM225.7 416c25.3 0 47.7-7 68.8-21 42.1-29.4 53.4-88.2 28.1-134.4-4.5-9-16-9.6-22.5-2l-25.2 29.3c-6.6 7.6-18.5 7.4-24.7-.5-17.3-22.1-49.1-62.4-65.3-83-5.4-6.9-15.2-8-21.5-1.9-18.3 17.8-51.5 56.8-51.5 104.3 0 68.6 50.6 109.2 113.7 109.2z"]},U4={prefix:"fas",iconName:"users",icon:[640,512,[],"f0c0","M320 16a104 104 0 1 1 0 208 104 104 0 1 1 0-208zM96 88a72 72 0 1 1 0 144 72 72 0 1 1 0-144zM0 416c0-70.7 57.3-128 128-128 12.8 0 25.2 1.9 36.9 5.4-32.9 36.8-52.9 85.4-52.9 138.6l0 16c0 11.4 2.4 22.2 6.7 32L32 480c-17.7 0-32-14.3-32-32l0-32zm521.3 64c4.3-9.8 6.7-20.6 6.7-32l0-16c0-53.2-20-101.8-52.9-138.6 11.7-3.5 24.1-5.4 36.9-5.4 70.7 0 128 57.3 128 128l0 32c0 17.7-14.3 32-32 32l-86.7 0zM472 160a72 72 0 1 1 144 0 72 72 0 1 1 -144 0zM160 432c0-88.4 71.6-160 160-160s160 71.6 160 160l0 16c0 17.7-14.3 32-32 32l-256 0c-17.7 0-32-14.3-32-32l0-16z"]},q4={prefix:"fas",iconName:"headset",icon:[448,512,[],"f590","M224 64c-79 0-144.7 57.3-157.7 132.7 9.3-3 19.3-4.7 29.7-4.7l16 0c26.5 0 48 21.5 48 48l0 96c0 26.5-21.5 48-48 48l-16 0c-53 0-96-43-96-96l0-64C0 100.3 100.3 0 224 0S448 100.3 448 224l0 168.1c0 66.3-53.8 120-120.1 120l-87.9-.1-32 0c-26.5 0-48-21.5-48-48s21.5-48 48-48l32 0c26.5 0 48 21.5 48 48l0 0 40 0c39.8 0 72-32.2 72-72l0-20.9c-14.1 8.2-30.5 12.8-48 12.8l-16 0c-26.5 0-48-21.5-48-48l0-96c0-26.5 21.5-48 48-48l16 0c10.4 0 20.3 1.6 29.7 4.7-13-75.3-78.6-132.7-157.7-132.7z"]},$4={prefix:"fas",iconName:"voicemail",icon:[640,512,[],"f897","M144 160a80 80 0 1 1 0 160 80 80 0 1 1 0-160zM263.8 320c15.3-22.9 24.2-50.4 24.2-80 0-79.5-64.5-144-144-144S0 160.5 0 240 64.5 384 144 384l352 0c79.5 0 144-64.5 144-144S575.5 96 496 96 352 160.5 352 240c0 29.6 8.9 57.1 24.2 80l-112.5 0zM496 160a80 80 0 1 1 0 160 80 80 0 1 1 0-160z"]},G4={prefix:"fas",iconName:"microphone",icon:[384,512,[],"f130","M192 0C139 0 96 43 96 96l0 128c0 53 43 96 96 96s96-43 96-96l0-128c0-53-43-96-96-96zM48 184c0-13.3-10.7-24-24-24S0 170.7 0 184l0 40c0 97.9 73.3 178.7 168 190.5l0 49.5-48 0c-13.3 0-24 10.7-24 24s10.7 24 24 24l144 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-48 0 0-49.5c94.7-11.8 168-92.6 168-190.5l0-40c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 40c0 79.5-64.5 144-144 144S48 303.5 48 224l0-40z"]},W4={prefix:"fas",iconName:"image",icon:[448,512,[],"f03e","M64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L64 32zm64 80a48 48 0 1 1 0 96 48 48 0 1 1 0-96zM272 224c8.4 0 16.1 4.4 20.5 11.5l88 144c4.5 7.4 4.7 16.7 .5 24.3S368.7 416 360 416L88 416c-8.9 0-17.2-5-21.3-12.9s-3.5-17.5 1.6-24.8l56-80c4.5-6.4 11.8-10.2 19.7-10.2s15.2 3.8 19.7 10.2l26.4 37.8 61.4-100.5c4.4-7.1 12.1-11.5 20.5-11.5z"]},I4={prefix:"fas",iconName:"folder",icon:[512,512,[128193,128447,61716,"folder-blank"],"f07b","M64 448l384 0c35.3 0 64-28.7 64-64l0-240c0-35.3-28.7-64-64-64L298.7 80c-6.9 0-13.7-2.2-19.2-6.4L241.1 44.8C230 36.5 216.5 32 202.7 32L64 32C28.7 32 0 60.7 0 96L0 384c0 35.3 28.7 64 64 64z"]},O4={prefix:"fas",iconName:"cloud",icon:[576,512,[9729],"f0c2","M0 336c0 79.5 64.5 144 144 144l304 0c70.7 0 128-57.3 128-128 0-51.6-30.5-96.1-74.5-116.3 6.7-13.1 10.5-28 10.5-43.7 0-53-43-96-96-96-17.7 0-34.2 4.8-48.4 13.1-24.1-45.8-72.2-77.1-127.6-77.1-79.5 0-144 64.5-144 144 0 8 .7 15.9 1.9 23.5-56.9 19.2-97.9 73.1-97.9 136.5z"]},V4={prefix:"fas",iconName:"link",icon:[576,512,[128279,"chain"],"f0c1","M419.5 96c-16.6 0-32.7 4.5-46.8 12.7-15.8-16-34.2-29.4-54.5-39.5 28.2-24 64.1-37.2 101.3-37.2 86.4 0 156.5 70 156.5 156.5 0 41.5-16.5 81.3-45.8 110.6l-71.1 71.1c-29.3 29.3-69.1 45.8-110.6 45.8-86.4 0-156.5-70-156.5-156.5 0-1.5 0-3 .1-4.5 .5-17.7 15.2-31.6 32.9-31.1s31.6 15.2 31.1 32.9c0 .9 0 1.8 0 2.6 0 51.1 41.4 92.5 92.5 92.5 24.5 0 48-9.7 65.4-27.1l71.1-71.1c17.3-17.3 27.1-40.9 27.1-65.4 0-51.1-41.4-92.5-92.5-92.5zM275.2 173.3c-1.9-.8-3.8-1.9-5.5-3.1-12.6-6.5-27-10.2-42.1-10.2-24.5 0-48 9.7-65.4 27.1L91.1 258.2c-17.3 17.3-27.1 40.9-27.1 65.4 0 51.1 41.4 92.5 92.5 92.5 16.5 0 32.6-4.4 46.7-12.6 15.8 16 34.2 29.4 54.6 39.5-28.2 23.9-64 37.2-101.3 37.2-86.4 0-156.5-70-156.5-156.5 0-41.5 16.5-81.3 45.8-110.6l71.1-71.1c29.3-29.3 69.1-45.8 110.6-45.8 86.6 0 156.5 70.6 156.5 156.9 0 1.3 0 2.6 0 3.9-.4 17.7-15.1 31.6-32.8 31.2s-31.6-15.1-31.2-32.8c0-.8 0-1.5 0-2.3 0-33.7-18-63.3-44.8-79.6z"]},j4={prefix:"fas",iconName:"chart-line",icon:[512,512,["line-chart"],"f201","M64 64c0-17.7-14.3-32-32-32S0 46.3 0 64L0 400c0 44.2 35.8 80 80 80l400 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L80 416c-8.8 0-16-7.2-16-16L64 64zm406.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L320 210.7 262.6 153.4c-12.5-12.5-32.8-12.5-45.3 0l-96 96c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l73.4-73.4 57.4 57.4c12.5 12.5 32.8 12.5 45.3 0l128-128z"]},K4={prefix:"fas",iconName:"gear",icon:[512,512,[9881,"cog"],"f013","M195.1 9.5C198.1-5.3 211.2-16 226.4-16l59.8 0c15.2 0 28.3 10.7 31.3 25.5L332 79.5c14.1 6 27.3 13.7 39.3 22.8l67.8-22.5c14.4-4.8 30.2 1.2 37.8 14.4l29.9 51.8c7.6 13.2 4.9 29.8-6.5 39.9L447 233.3c.9 7.4 1.3 15 1.3 22.7s-.5 15.3-1.3 22.7l53.4 47.5c11.4 10.1 14 26.8 6.5 39.9l-29.9 51.8c-7.6 13.1-23.4 19.2-37.8 14.4l-67.8-22.5c-12.1 9.1-25.3 16.7-39.3 22.8l-14.4 69.9c-3.1 14.9-16.2 25.5-31.3 25.5l-59.8 0c-15.2 0-28.3-10.7-31.3-25.5l-14.4-69.9c-14.1-6-27.2-13.7-39.3-22.8L73.5 432.3c-14.4 4.8-30.2-1.2-37.8-14.4L5.8 366.1c-7.6-13.2-4.9-29.8 6.5-39.9l53.4-47.5c-.9-7.4-1.3-15-1.3-22.7s.5-15.3 1.3-22.7L12.3 185.8c-11.4-10.1-14-26.8-6.5-39.9L35.7 94.1c7.6-13.2 23.4-19.2 37.8-14.4l67.8 22.5c12.1-9.1 25.3-16.7 39.3-22.8L195.1 9.5zM256.3 336a80 80 0 1 0 -.6-160 80 80 0 1 0 .6 160z"]},X4={prefix:"fas",iconName:"up-right-and-down-left-from-center",icon:[512,512,["expand-alt"],"f424","M344 0L488 0c13.3 0 24 10.7 24 24l0 144c0 9.7-5.8 18.5-14.8 22.2s-19.3 1.7-26.2-5.2l-39-39-87 87c-9.4 9.4-24.6 9.4-33.9 0l-32-32c-9.4-9.4-9.4-24.6 0-33.9l87-87-39-39c-6.9-6.9-8.9-17.2-5.2-26.2S334.3 0 344 0zM168 512L24 512c-13.3 0-24-10.7-24-24L0 344c0-9.7 5.8-18.5 14.8-22.2S34.1 320.2 41 327l39 39 87-87c9.4-9.4 24.6-9.4 33.9 0l32 32c9.4 9.4 9.4 24.6 0 33.9l-87 87 39 39c6.9 6.9 8.9 17.2 5.2 26.2S177.7 512 168 512z"]},Q4={prefix:"fas",iconName:"play",icon:[448,512,[9654],"f04b","M91.2 36.9c-12.4-6.8-27.4-6.5-39.6 .7S32 57.9 32 72l0 368c0 14.1 7.5 27.2 19.6 34.4s27.2 7.5 39.6 .7l336-184c12.8-7 20.8-20.5 20.8-35.1s-8-28.1-20.8-35.1l-336-184z"]},J4={prefix:"fas",iconName:"check",icon:[448,512,[10003,10004],"f00c","M434.8 70.1c14.3 10.4 17.5 30.4 7.1 44.7l-256 352c-5.5 7.6-14 12.3-23.4 13.1s-18.5-2.7-25.1-9.3l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l101.5 101.5 234-321.7c10.4-14.3 30.4-17.5 44.7-7.1z"]},Y4={prefix:"fas",iconName:"sliders",icon:[512,512,["sliders-h"],"f1de","M32 64C14.3 64 0 78.3 0 96s14.3 32 32 32l86.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48L480 128c17.7 0 32-14.3 32-32s-14.3-32-32-32L265.3 64C253 35.7 224.8 16 192 16s-61 19.7-73.3 48L32 64zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32l246.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48l54.7 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-54.7 0c-12.3-28.3-40.5-48-73.3-48s-61 19.7-73.3 48L32 224zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32l54.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48L480 448c17.7 0 32-14.3 32-32s-14.3-32-32-32l-246.7 0c-12.3-28.3-40.5-48-73.3-48s-61 19.7-73.3 48L32 384z"]},Z4={prefix:"fas",iconName:"user",icon:[448,512,[128100,62144,62470,"user-alt","user-large"],"f007","M224 248a120 120 0 1 0 0-240 120 120 0 1 0 0 240zm-29.7 56C95.8 304 16 383.8 16 482.3 16 498.7 29.3 512 45.7 512l356.6 0c16.4 0 29.7-13.3 29.7-29.7 0-98.5-79.8-178.3-178.3-178.3l-59.4 0z"]},c3={prefix:"fas",iconName:"arrow-right",icon:[512,512,[8594],"f061","M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l370.7 0-105.4 105.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"]},a3={prefix:"fas",iconName:"right-left",icon:[512,512,["exchange-alt"],"f362","M502.6 150.6l-96 96c-9.2 9.2-22.9 11.9-34.9 6.9S352 236.9 352 224l0-64-320 0c-17.7 0-32-14.3-32-32S14.3 96 32 96l320 0 0-64c0-12.9 7.8-24.6 19.8-29.6s25.7-2.2 34.9 6.9l96 96c12.5 12.5 12.5 32.8 0 45.3zm-397.3 352l-96-96c-12.5-12.5-12.5-32.8 0-45.3l96-96c9.2-9.2 22.9-11.9 34.9-6.9S160 275.1 160 288l0 64 320 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-320 0 0 64c0 12.9-7.8 24.6-19.8 29.6s-25.7 2.2-34.9-6.9z"]},l3={prefix:"fas",iconName:"xmark",icon:[384,512,[128473,10005,10006,10060,215,"close","multiply","remove","times"],"f00d","M55.1 73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L147.2 256 9.9 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192.5 301.3 329.9 438.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.8 256 375.1 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192.5 210.7 55.1 73.4z"]},e3={prefix:"fas",iconName:"comments",icon:[576,512,[128490,61670],"f086","M384 144c0 97.2-86 176-192 176-26.7 0-52.1-5-75.2-14L35.2 349.2c-9.3 4.9-20.7 3.2-28.2-4.2s-9.2-18.9-4.2-28.2l35.6-67.2C14.3 220.2 0 183.6 0 144 0 46.8 86-32 192-32S384 46.8 384 144zm0 368c-94.1 0-172.4-62.1-188.8-144 120-1.5 224.3-86.9 235.8-202.7 83.3 19.2 145 88.3 145 170.7 0 39.6-14.3 76.2-38.4 105.6l35.6 67.2c4.9 9.3 3.2 20.7-4.2 28.2s-18.9 9.2-28.2 4.2L459.2 498c-23.1 9-48.5 14-75.2 14z"]},r3={prefix:"fas",iconName:"mobile-screen",icon:[384,512,["mobile-android-alt"],"f3cf","M16 64C16 28.7 44.7 0 80 0L304 0c35.3 0 64 28.7 64 64l0 384c0 35.3-28.7 64-64 64L80 512c-35.3 0-64-28.7-64-64L16 64zM128 440c0 13.3 10.7 24 24 24l80 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-80 0c-13.3 0-24 10.7-24 24zM304 64l-224 0 0 304 224 0 0-304z"]},s3={prefix:"fas",iconName:"phone-volume",icon:[576,512,["volume-control-phone"],"f2a0","M344-32c128.1 0 232 103.9 232 232 0 13.3-10.7 24-24 24s-24-10.7-24-24c0-101.6-82.4-184-184-184-13.3 0-24-10.7-24-24s10.7-24 24-24zm8 192a32 32 0 1 1 0 64 32 32 0 1 1 0-64zM320 88c0-13.3 10.7-24 24-24 75.1 0 136 60.9 136 136 0 13.3-10.7 24-24 24s-24-10.7-24-24c0-48.6-39.4-88-88-88-13.3 0-24-10.7-24-24zM144.1 1.4c19.7-5.4 40.3 4.7 48.1 23.5l40.5 97.3c6.9 16.5 2.1 35.6-11.8 47l-44.1 36.1c32.5 71.6 89 130 159.3 164.9L374.7 323c11.3-13.9 30.4-18.6 47-11.8L519 351.8c18.8 7.8 28.9 28.4 23.5 48.1l-1.5 5.5C523.4 470.1 460.9 525.3 384.6 509.2 209.6 472.1 71.9 334.4 34.8 159.4 18.7 83.1 73.9 20.6 138.5 2.9l5.5-1.5z"]},i3={prefix:"fas",iconName:"phone",icon:[512,512,[128222,128379],"f095","M160.2 25C152.3 6.1 131.7-3.9 112.1 1.4l-5.5 1.5c-64.6 17.6-119.8 80.2-103.7 156.4 37.1 175 174.8 312.7 349.8 349.8 76.3 16.2 138.8-39.1 156.4-103.7l1.5-5.5c5.4-19.7-4.7-40.3-23.5-48.1l-97.3-40.5c-16.5-6.9-35.6-2.1-47 11.8l-38.6 47.2C233.9 335.4 177.3 277 144.8 205.3L189 169.3c13.9-11.3 18.6-30.4 11.8-47L160.2 25z"]},o3={prefix:"fas",iconName:"address-book",icon:[512,512,[62138,"contact-book"],"f2b9","M96 0C60.7 0 32 28.7 32 64l0 384c0 35.3 28.7 64 64 64l288 0c35.3 0 64-28.7 64-64l0-384c0-35.3-28.7-64-64-64L96 0zM208 288l64 0c44.2 0 80 35.8 80 80 0 8.8-7.2 16-16 16l-192 0c-8.8 0-16-7.2-16-16 0-44.2 35.8-80 80-80zm-24-96a56 56 0 1 1 112 0 56 56 0 1 1 -112 0zM512 80c0-8.8-7.2-16-16-16s-16 7.2-16 16l0 64c0 8.8 7.2 16 16 16s16-7.2 16-16l0-64zm0 128c0-8.8-7.2-16-16-16s-16 7.2-16 16l0 64c0 8.8 7.2 16 16 16s16-7.2 16-16l0-64zM496 320c-8.8 0-16 7.2-16 16l0 64c0 8.8 7.2 16 16 16s16-7.2 16-16l0-64c0-8.8-7.2-16-16-16z"]},f3={prefix:"fas",iconName:"chevron-down",icon:[448,512,[],"f078","M201.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 338.7 54.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"]},n3={prefix:"fas",iconName:"plug",icon:[448,512,[128268],"f1e6","M128-32c17.7 0 32 14.3 32 32l0 96 128 0 0-96c0-17.7 14.3-32 32-32s32 14.3 32 32l0 96 64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l0 64c0 95.1-69.2 174.1-160 189.3l0 66.7c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-66.7C101.2 398.1 32 319.1 32 224l0-64c-17.7 0-32-14.3-32-32S14.3 96 32 96l64 0 0-96c0-17.7 14.3-32 32-32z"]},t3={prefix:"fas",iconName:"comment-dots",icon:[512,512,[128172,62075,"commenting"],"f4ad","M256 480c141.4 0 256-107.5 256-240S397.4 0 256 0 0 107.5 0 240c0 54.3 19.2 104.3 51.6 144.5L2.8 476.8c-4.8 9-3.3 20 3.6 27.5s17.8 9.8 27.1 5.8l118.4-50.7C183.7 472.6 218.9 480 256 480zM128 208a32 32 0 1 1 0 64 32 32 0 1 1 0-64zm128 0a32 32 0 1 1 0 64 32 32 0 1 1 0-64zm96 32a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"]},m3={prefix:"fas",iconName:"inbox",icon:[512,512,[],"f01c","M91.8 32C59.9 32 32.9 55.4 28.4 86.9L.6 281.2c-.4 3-.6 6-.6 9.1L0 416c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-125.7c0-3-.2-6.1-.6-9.1L483.6 86.9C479.1 55.4 452.1 32 420.2 32L91.8 32zm0 64l328.5 0 27.4 192-59.9 0c-12.1 0-23.2 6.8-28.6 17.7l-14.3 28.6c-5.4 10.8-16.5 17.7-28.6 17.7l-120.4 0c-12.1 0-23.2-6.8-28.6-17.7l-14.3-28.6c-5.4-10.8-16.5-17.7-28.6-17.7L64.3 288 91.8 96z"]},z3={prefix:"fas",iconName:"bullhorn",icon:[512,512,[128226,128363],"f0a1","M461.2 18.9C472.7 24 480 35.4 480 48l0 416c0 12.6-7.3 24-18.8 29.1s-24.8 3.2-34.3-5.1l-46.6-40.7c-43.6-38.1-98.7-60.3-156.4-63l0 95.7c0 17.7-14.3 32-32 32l-32 0c-17.7 0-32-14.3-32-32l0-96C57.3 384 0 326.7 0 256S57.3 128 128 128l84.5 0c61.8-.2 121.4-22.7 167.9-63.3l46.6-40.7c9.4-8.3 22.9-10.2 34.3-5.1zM224 320l0 .2c70.3 2.7 137.8 28.5 192 73.4l0-275.3c-54.2 44.9-121.7 70.7-192 73.4L224 320z"]},p3={prefix:"fas",iconName:"wand-magic-sparkles",icon:[576,512,["magic-wand-sparkles"],"e2ca","M263.4-27L278.2 9.8 315 24.6c3 1.2 5 4.2 5 7.4s-2 6.2-5 7.4L278.2 54.2 263.4 91c-1.2 3-4.2 5-7.4 5s-6.2-2-7.4-5L233.8 54.2 197 39.4c-3-1.2-5-4.2-5-7.4s2-6.2 5-7.4L233.8 9.8 248.6-27c1.2-3 4.2-5 7.4-5s6.2 2 7.4 5zM110.7 41.7l21.5 50.1 50.1 21.5c5.9 2.5 9.7 8.3 9.7 14.7s-3.8 12.2-9.7 14.7l-50.1 21.5-21.5 50.1c-2.5 5.9-8.3 9.7-14.7 9.7s-12.2-3.8-14.7-9.7L59.8 164.2 9.7 142.7C3.8 140.2 0 134.4 0 128s3.8-12.2 9.7-14.7L59.8 91.8 81.3 41.7C83.8 35.8 89.6 32 96 32s12.2 3.8 14.7 9.7zM464 304c6.4 0 12.2 3.8 14.7 9.7l21.5 50.1 50.1 21.5c5.9 2.5 9.7 8.3 9.7 14.7s-3.8 12.2-9.7 14.7l-50.1 21.5-21.5 50.1c-2.5 5.9-8.3 9.7-14.7 9.7s-12.2-3.8-14.7-9.7l-21.5-50.1-50.1-21.5c-5.9-2.5-9.7-8.3-9.7-14.7s3.8-12.2 9.7-14.7l50.1-21.5 21.5-50.1c2.5-5.9 8.3-9.7 14.7-9.7zM460 0c11 0 21.6 4.4 29.5 12.2l42.3 42.3C539.6 62.4 544 73 544 84s-4.4 21.6-12.2 29.5l-88.2 88.2-101.3-101.3 88.2-88.2C438.4 4.4 449 0 460 0zM44.2 398.5L308.4 134.3 409.7 235.6 145.5 499.8C137.6 507.6 127 512 116 512s-21.6-4.4-29.5-12.2L44.2 457.5C36.4 449.6 32 439 32 428s4.4-21.6 12.2-29.5z"]},M3={prefix:"fas",iconName:"chart-column",icon:[512,512,[],"e0e3","M32 32c17.7 0 32 14.3 32 32l0 336c0 8.8 7.2 16 16 16l400 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L80 480c-44.2 0-80-35.8-80-80L0 64C0 46.3 14.3 32 32 32zM144 224c17.7 0 32 14.3 32 32l0 64c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32zm144-64l0 160c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-160c0-17.7 14.3-32 32-32s32 14.3 32 32zm80 32c17.7 0 32 14.3 32 32l0 96c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-96c0-17.7 14.3-32 32-32zM512 96l0 224c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-224c0-17.7 14.3-32 32-32s32 14.3 32 32z"]},d3={prefix:"fas",iconName:"star",icon:[576,512,[11088,61446],"f005","M309.5-18.9c-4.1-8-12.4-13.1-21.4-13.1s-17.3 5.1-21.4 13.1L193.1 125.3 33.2 150.7c-8.9 1.4-16.3 7.7-19.1 16.3s-.5 18 5.8 24.4l114.4 114.5-25.2 159.9c-1.4 8.9 2.3 17.9 9.6 23.2s16.9 6.1 25 2L288.1 417.6 432.4 491c8 4.1 17.7 3.3 25-2s11-14.2 9.6-23.2L441.7 305.9 556.1 191.4c6.4-6.4 8.6-15.8 5.8-24.4s-10.1-14.9-19.1-16.3L383 125.3 309.5-18.9z"]},L3={prefix:"fas",iconName:"triangle-exclamation",icon:[512,512,[9888,"exclamation-triangle","warning"],"f071","M256 0c14.7 0 28.2 8.1 35.2 21l216 400c6.7 12.4 6.4 27.4-.8 39.5S486.1 480 472 480L40 480c-14.1 0-27.2-7.4-34.4-19.5s-7.5-27.1-.8-39.5l216-400c7-12.9 20.5-21 35.2-21zm0 352a32 32 0 1 0 0 64 32 32 0 1 0 0-64zm0-192c-18.2 0-32.7 15.5-31.4 33.7l7.4 104c.9 12.5 11.4 22.3 23.9 22.3 12.6 0 23-9.7 23.9-22.3l7.4-104c1.3-18.2-13.1-33.7-31.4-33.7z"]},u3={prefix:"fas",iconName:"lock",icon:[384,512,[128274],"f023","M128 96l0 64 128 0 0-64c0-35.3-28.7-64-64-64s-64 28.7-64 64zM64 160l0-64C64 25.3 121.3-32 192-32S320 25.3 320 96l0 64c35.3 0 64 28.7 64 64l0 224c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 224c0-35.3 28.7-64 64-64z"]},v3={prefix:"fas",iconName:"window-restore",icon:[576,512,[],"f2d2","M512 96L160 96c0-35.3 28.7-64 64-64l288 0c35.3 0 64 28.7 64 64l0 192c0 35.3-28.7 64-64 64l-48 0 0-64 48 0 0-192zM0 224c0-35.3 28.7-64 64-64l288 0c35.3 0 64 28.7 64 64l0 192c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64L0 224zm64 40c0 13.3 10.7 24 24 24l240 0c13.3 0 24-10.7 24-24s-10.7-24-24-24L88 240c-13.3 0-24 10.7-24 24z"]},h3={prefix:"fas",iconName:"shield-halved",icon:[512,512,["shield-alt"],"f3ed","M256 0c4.6 0 9.2 1 13.4 2.9L457.8 82.8c22 9.3 38.4 31 38.3 57.2-.5 99.2-41.3 280.7-213.6 363.2-16.7 8-36.1 8-52.8 0-172.4-82.5-213.1-264-213.6-363.2-.1-26.2 16.3-47.9 38.3-57.2L242.7 2.9C246.9 1 251.4 0 256 0zm0 66.8l0 378.1c138-66.8 175.1-214.8 176-303.4l-176-74.6 0 0z"]},C3={prefix:"fas",iconName:"caret-up",icon:[320,512,[],"f0d8","M140.3 135.2c12.6-10.3 31.1-9.5 42.8 2.2l128 128c9.2 9.2 11.9 22.9 6.9 34.9S301.4 320 288.5 320l-256 0c-12.9 0-24.6-7.8-29.6-19.8S.7 274.5 9.9 265.4l128-128 2.4-2.2z"]},g3={prefix:"fas",iconName:"globe",icon:[512,512,[127760],"f0ac","M351.9 280l-190.9 0c2.9 64.5 17.2 123.9 37.5 167.4 11.4 24.5 23.7 41.8 35.1 52.4 11.2 10.5 18.9 12.2 22.9 12.2s11.7-1.7 22.9-12.2c11.4-10.6 23.7-28 35.1-52.4 20.3-43.5 34.6-102.9 37.5-167.4zM160.9 232l190.9 0C349 167.5 334.7 108.1 314.4 64.6 303 40.2 290.7 22.8 279.3 12.2 268.1 1.7 260.4 0 256.4 0s-11.7 1.7-22.9 12.2c-11.4 10.6-23.7 28-35.1 52.4-20.3 43.5-34.6 102.9-37.5 167.4zm-48 0C116.4 146.4 138.5 66.9 170.8 14.7 78.7 47.3 10.9 131.2 1.5 232l111.4 0zM1.5 280c9.4 100.8 77.2 184.7 169.3 217.3-32.3-52.2-54.4-131.7-57.9-217.3L1.5 280zm398.4 0c-3.5 85.6-25.6 165.1-57.9 217.3 92.1-32.7 159.9-116.5 169.3-217.3l-111.4 0zm111.4-48C501.9 131.2 434.1 47.3 342 14.7 374.3 66.9 396.4 146.4 399.9 232l111.4 0z"]},x3={prefix:"fas",iconName:"upload",icon:[448,512,[],"f093","M256 109.3L256 320c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-210.7-41.4 41.4c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l96-96c12.5-12.5 32.8-12.5 45.3 0l96 96c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 109.3zM224 400c44.2 0 80-35.8 80-80l80 0c35.3 0 64 28.7 64 64l0 32c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64l0-32c0-35.3 28.7-64 64-64l80 0c0 44.2 35.8 80 80 80zm144 24a24 24 0 1 0 0-48 24 24 0 1 0 0 48z"]},S3={prefix:"fas",iconName:"arrow-left",icon:[512,512,[8592],"f060","M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 288 480 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-370.7 0 105.4-105.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"]},N3={prefix:"fas",iconName:"check-double",icon:[384,512,[],"f560","M249.9 66.8c10.4-14.3 7.2-34.3-7.1-44.7s-34.3-7.2-44.7 7.1l-106 145.7-37.5-37.5c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l64 64c6.6 6.6 15.8 10 25.1 9.3s17.9-5.5 23.4-13.1l128-176zm128 136c10.4-14.3 7.2-34.3-7.1-44.7s-34.3-7.2-44.7 7.1l-170 233.7-69.5-69.5c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l96 96c6.6 6.6 15.8 10 25.1 9.3s17.9-5.5 23.4-13.1l192-264z"]},b3={prefix:"fas",iconName:"down-left-and-up-right-to-center",icon:[512,512,["compress-alt"],"f422","M439.5 7c9.4-9.4 24.6-9.4 33.9 0l32 32c9.4 9.4 9.4 24.6 0 33.9l-87 87 39 39c6.9 6.9 8.9 17.2 5.2 26.2S450.2 240 440.5 240l-144 0c-13.3 0-24-10.7-24-24l0-144c0-9.7 5.8-18.5 14.8-22.2s19.3-1.7 26.2 5.2l39 39 87-87zM72.5 272l144 0c13.3 0 24 10.7 24 24l0 144c0 9.7-5.8 18.5-14.8 22.2s-19.3 1.7-26.2-5.2l-39-39-87 87c-9.4 9.4-24.6 9.4-33.9 0l-32-32c-9.4-9.4-9.4-24.6 0-33.9l87-87-39-39c-6.9-6.9-8.9-17.2-5.2-26.2S62.8 272 72.5 272z"]},w3={prefix:"fas",iconName:"music",icon:[512,512,[127925],"f001","M468 7c7.6 6.1 12 15.3 12 25l0 304c0 44.2-43 80-96 80s-96-35.8-96-80 43-80 96-80c11.2 0 22 1.6 32 4.6l0-116.7-224 49.8 0 206.3c0 44.2-43 80-96 80s-96-35.8-96-80 43-80 96-80c11.2 0 22 1.6 32 4.6L128 96c0-15 10.4-28 25.1-31.2l288-64c9.5-2.1 19.4 .2 27 6.3z"]},k3={prefix:"fas",iconName:"robot",icon:[640,512,[129302],"f544","M352 0c0-17.7-14.3-32-32-32S288-17.7 288 0l0 64-96 0c-53 0-96 43-96 96l0 224c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-224c0-53-43-96-96-96l-96 0 0-64zM160 368c0-13.3 10.7-24 24-24l32 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-32 0c-13.3 0-24-10.7-24-24zm120 0c0-13.3 10.7-24 24-24l32 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-32 0c-13.3 0-24-10.7-24-24zm120 0c0-13.3 10.7-24 24-24l32 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-32 0c-13.3 0-24-10.7-24-24zM224 176a48 48 0 1 1 0 96 48 48 0 1 1 0-96zm144 48a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zM64 224c0-17.7-14.3-32-32-32S0 206.3 0 224l0 96c0 17.7 14.3 32 32 32s32-14.3 32-32l0-96zm544-32c-17.7 0-32 14.3-32 32l0 96c0 17.7 14.3 32 32 32s32-14.3 32-32l0-96c0-17.7-14.3-32-32-32z"]},y3={prefix:"fas",iconName:"plus",icon:[448,512,[10133,61543,"add"],"2b","M256 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 160-160 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l160 0 0 160c0 17.7 14.3 32 32 32s32-14.3 32-32l0-160 160 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-160 0 0-160z"]},A3={prefix:"fas",iconName:"caret-down",icon:[320,512,[],"f0d7","M140.3 376.8c12.6 10.2 31.1 9.5 42.8-2.2l128-128c9.2-9.2 11.9-22.9 6.9-34.9S301.4 192 288.5 192l-256 0c-12.9 0-24.6 7.8-29.6 19.8S.7 237.5 9.9 246.6l128 128 2.4 2.2z"]},T3={prefix:"fas",iconName:"tag",icon:[512,512,[127991],"f02b","M32.5 96l0 149.5c0 17 6.7 33.3 18.7 45.3l192 192c25 25 65.5 25 90.5 0L483.2 333.3c25-25 25-65.5 0-90.5l-192-192C279.2 38.7 263 32 246 32L96.5 32c-35.3 0-64 28.7-64 64zm112 16a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"]},P3={prefix:"fas",iconName:"phone-slash",icon:[576,512,[],"f3dd","M535-24.9c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9L41 537.1c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9L141.5 368.6C89.2 310.5 51.6 238.8 34.8 159.4 18.7 83.1 73.9 20.6 138.5 2.9l5.5-1.5c19.7-5.4 40.3 4.7 48.1 23.5l40.5 97.3c6.9 16.5 2.1 35.6-11.8 47l-44.1 36.1c12.9 28.5 29.6 54.8 49.5 78.5L535-24.9zm-150.4 534c-63-13.4-121.3-39.8-171.7-76.3L297.8 348c12.2 8.2 25 15.6 38.3 22.2L374.7 323c11.3-13.9 30.4-18.6 47-11.8L519 351.8c18.8 7.8 28.9 28.4 23.5 48.1l-1.5 5.5c-17.6 64.6-80.2 119.8-156.4 103.7z"]},B3={prefix:"fas",iconName:"briefcase",icon:[512,512,[128188],"f0b1","M200 48l112 0c4.4 0 8 3.6 8 8l0 40-128 0 0-40c0-4.4 3.6-8 8-8zm-56 8l0 40-80 0C28.7 96 0 124.7 0 160l0 96 512 0 0-96c0-35.3-28.7-64-64-64l-80 0 0-40c0-30.9-25.1-56-56-56L200 0c-30.9 0-56 25.1-56 56zM512 304l-192 0 0 16c0 17.7-14.3 32-32 32l-64 0c-17.7 0-32-14.3-32-32l0-16-192 0 0 112c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-112z"]},F3={prefix:"fas",iconName:"pause",icon:[384,512,[9208],"f04c","M48 32C21.5 32 0 53.5 0 80L0 432c0 26.5 21.5 48 48 48l64 0c26.5 0 48-21.5 48-48l0-352c0-26.5-21.5-48-48-48L48 32zm224 0c-26.5 0-48 21.5-48 48l0 352c0 26.5 21.5 48 48 48l64 0c26.5 0 48-21.5 48-48l0-352c0-26.5-21.5-48-48-48l-64 0z"]},E3={prefix:"fas",iconName:"desktop",icon:[512,512,[128421,61704,"desktop-alt"],"f390","M64 32C28.7 32 0 60.7 0 96L0 352c0 35.3 28.7 64 64 64l144 0-16 48-72 0c-13.3 0-24 10.7-24 24s10.7 24 24 24l272 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-72 0-16-48 144 0c35.3 0 64-28.7 64-64l0-256c0-35.3-28.7-64-64-64L64 32zM96 96l320 0c17.7 0 32 14.3 32 32l0 160c0 17.7-14.3 32-32 32L96 320c-17.7 0-32-14.3-32-32l0-160c0-17.7 14.3-32 32-32z"]},H3={prefix:"fas",iconName:"arrow-down",icon:[384,512,[8595],"f063","M169.4 502.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 402.7 224 32c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 370.7-105.4-105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"]},R3={prefix:"fas",iconName:"location-dot",icon:[384,512,["map-marker-alt"],"f3c5","M0 188.6C0 84.4 86 0 192 0S384 84.4 384 188.6c0 119.3-120.2 262.3-170.4 316.8-11.8 12.8-31.5 12.8-43.3 0-50.2-54.5-170.4-197.5-170.4-316.8zM192 256a64 64 0 1 0 0-128 64 64 0 1 0 0 128z"]},D3={prefix:"fas",iconName:"keyboard",icon:[576,512,[9e3],"f11c","M64 64C28.7 64 0 92.7 0 128L0 384c0 35.3 28.7 64 64 64l448 0c35.3 0 64-28.7 64-64l0-256c0-35.3-28.7-64-64-64L64 64zm16 64l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16zM64 240c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32zM176 128l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16zM160 240c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32zm16 80l224 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-224 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16zm80-176c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32zm16 80l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16zm80-80c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32zm16 80l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16zm80-80c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32zm16 80l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16z"]},_3={prefix:"fas",iconName:"hashtag",icon:[512,512,[62098],"23","M214.7 .7c17.3 3.7 28.3 20.7 24.6 38l-19.1 89.3 126.5 0 22-102.7C372.4 8 389.4-3 406.7 .7s28.3 20.7 24.6 38L412.2 128 480 128c17.7 0 32 14.3 32 32s-14.3 32-32 32l-81.6 0-27.4 128 67.8 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-81.6 0-22 102.7c-3.7 17.3-20.7 28.3-38 24.6s-28.3-20.7-24.6-38l19.1-89.3-126.5 0-22 102.7c-3.7 17.3-20.7 28.3-38 24.6s-28.3-20.7-24.6-38L99.8 384 32 384c-17.7 0-32-14.3-32-32s14.3-32 32-32l81.6 0 27.4-128-67.8 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l81.6 0 22-102.7C180.4 8 197.4-3 214.7 .7zM206.4 192l-27.4 128 126.5 0 27.4-128-126.5 0z"]},U3={prefix:"fas",iconName:"circle-dot",icon:[512,512,[128280,"dot-circle"],"f192","M256 512a256 256 0 1 0 0-512 256 256 0 1 0 0 512zm0-352a96 96 0 1 1 0 192 96 96 0 1 1 0-192z"]},q3={prefix:"fas",iconName:"arrows-rotate",icon:[512,512,[128472,"refresh","sync"],"f021","M65.9 228.5c13.3-93 93.4-164.5 190.1-164.5 53 0 101 21.5 135.8 56.2 .2 .2 .4 .4 .6 .6l7.6 7.2-47.9 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l128 0c17.7 0 32-14.3 32-32l0-128c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 53.4-11.3-10.7C390.5 28.6 326.5 0 256 0 127 0 20.3 95.4 2.6 219.5 .1 237 12.2 253.2 29.7 255.7s33.7-9.7 36.2-27.1zm443.5 64c2.5-17.5-9.7-33.7-27.1-36.2s-33.7 9.7-36.2 27.1c-13.3 93-93.4 164.5-190.1 164.5-53 0-101-21.5-135.8-56.2-.2-.2-.4-.4-.6-.6l-7.6-7.2 47.9 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L32 320c-8.5 0-16.7 3.4-22.7 9.5S-.1 343.7 0 352.3l1 127c.1 17.7 14.6 31.9 32.3 31.7S65.2 496.4 65 478.7l-.4-51.5 10.7 10.1c46.3 46.1 110.2 74.7 180.7 74.7 129 0 235.7-95.4 253.4-219.5z"]},$3={prefix:"fas",iconName:"list-ul",icon:[512,512,["list-dots"],"f0ca","M48 144a48 48 0 1 0 0-96 48 48 0 1 0 0 96zM192 64c-17.7 0-32 14.3-32 32s14.3 32 32 32l288 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L192 64zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32l288 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-288 0zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32l288 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-288 0zM48 464a48 48 0 1 0 0-96 48 48 0 1 0 0 96zM96 256a48 48 0 1 0 -96 0 48 48 0 1 0 96 0z"]},G3={prefix:"fas",iconName:"tablet-screen-button",icon:[448,512,["tablet-alt"],"f3fa","M0 64C0 28.7 28.7 0 64 0L384 0c35.3 0 64 28.7 64 64l0 384c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 64zM256 432a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zM384 64l-320 0 0 288 320 0 0-288z"]}});function V(l,c){let a=K0[l],[e,r,,,s]=a.icon,i=Array.isArray(s)?s.join(" "):s;return t`<svg
    viewBox="0 0 ${e} ${r}"
    style="width:1em;height:1em;vertical-align:-0.125em;overflow:visible"
    fill="currentColor"
    role=${c?.label?"img":"presentation"}
    aria-label=${c?.label??""}
    aria-hidden=${c?.label?"false":"true"}
  >
    <path d=${i}></path>
  </svg>`}var K0,I3=M(()=>{"use strict";I();v4();W3();K0={"address-book":o3,"arrow-down":H3,"arrow-left":S3,"arrow-right":c3,ban:k4,bell:S4,briefcase:B3,bullhorn:z3,calendar:N4,"caret-down":A3,"caret-up":C3,chart:M3,"chart-line":j4,check:J4,"check-double":N3,"chevron-down":f3,"circle-dot":U3,"circle-outline":u4,clock:H4,cloud:O4,comment:t3,comments:e3,desktop:E3,dialpad:D3,ellipsis:b4,envelope:x4,expand:B4,fax:P4,fire:_4,folder:I4,gear:K4,globe:g3,hashtag:_3,headset:q4,image:W4,inbox:m3,link:V4,list:$3,"location-dot":R3,lock:u3,microphone:G4,"microphone-slash":C4,minus:h4,mobile:r3,music:w3,palette:A4,pause:F3,phone:i3,"phone-slash":P3,"phone-volume":s3,play:Q4,plug:n3,plus:y3,record:y4,robot:k3,rocket:R4,search:w4,send:D4,shield:h3,sitemap:T4,sliders:Y4,sms:g4,sparkles:p3,star:d3,stop:E4,sync:q3,"table-columns":F4,tablet:G3,tag:T3,transfer:a3,upload:x3,user:Z4,users:U4,voicemail:$4,warning:L3,"window-compact":b3,"window-restore":v3,"window-wide":X4,xmark:l3}});function s1(l){let c=l||{},a=String(c.theme||c.mode||"LIGHT").toLowerCase(),e=a==="dark"?r1:e1,r={mode:a==="auto"?"auto":e.mode,primaryColor:c.primaryColor||c.primary||e.primaryColor,primaryHover:c.primaryHover||e.primaryHover,primaryText:c.primaryText||e.primaryText,radius:c.radius||e.radius,fontFamily:c.fontFamily||e.fontFamily};return a==="auto"&&(r.mode="auto"),r}function X0(l){return l==="dark"?"dark":l==="light"?"light":typeof window<"u"&&typeof window.matchMedia=="function"&&window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}function i1(l,c){let a=s1(l),e=c||(typeof document<"u"?document.documentElement:null);if(!e||!e.style)return a;e.setAttribute("data-dc-theme",X0(a.mode));let r=Object.keys(O3);for(let s=0;s<r.length;s++){let i=r[s],f=a[i];typeof f=="string"&&f.length>0&&e.style.setProperty(O3[i],f)}return a}var e1,r1,O3,o1=M(()=>{"use strict";e1={mode:"light",primaryColor:"#2563eb",primaryHover:"#1d4ed8",primaryText:"#ffffff",radius:"12px",fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'},r1={mode:"dark",primaryColor:"#60a5fa",primaryHover:"#93c5fd",primaryText:"#0f172a",radius:"12px",fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'},O3={primaryColor:"--dc-primary-color",primaryHover:"--dc-primary-hover",primaryText:"--dc-primary-text",radius:"--dc-radius",fontFamily:"--dc-font-family"}});var V3=M(()=>{"use strict";o1()});function t2(l){if(!l||typeof l!="string")return{};let c=l.split(".");if(c.length<2)return{};try{let a=c[1].replace(/-/g,"+").replace(/_/g,"/"),e=a+"===".slice((a.length+3)%4),r=typeof Buffer<"u"?Buffer.from(e,"base64").toString("utf8"):decodeURIComponent(atob(e).split("").map(function(i){return"%"+("00"+i.charCodeAt(0).toString(16)).slice(-2)}).join("")),s=JSON.parse(r);return s&&typeof s=="object"?s:{}}catch{return{}}}function K3(l){let c=t2(l).exp;return typeof c!="number"||!Number.isFinite(c)?null:c*1e3}function X3(l){if(l==null||l==="")return null;if(typeof l=="number"&&Number.isFinite(l))return l<1e12?l*1e3:l;let c=Date.parse(String(l));return Number.isNaN(c)?null:c}function t1(l){return!l||typeof l!="object"?!1:l.status===401||l.statusCode===401?!0:!!(l.response&&l.response.status===401)}function m1(l){return l?l.token||typeof l.getToken=="function"?!0:z1(l.tokenManager):!1}function z1(l){return!!(l&&typeof l.withAuthRetry=="function"&&typeof l.current=="function")}function p1(l,c){let a=l||{},e=z1(a.tokenManager),r=e?a.tokenManager:Q3({token:a.token,expires_at:a.expires_at,getToken:a.getToken,onExpired:a.onExpired}),s=typeof c=="function"?r.onTokenChange(c):null,i=!1;return{manager:r,owned:!e,release:function(){i||(i=!0,s&&s(),e||r.destroy())}}}async function M1(l){if(l.manager.current())return l.manager.current();try{return await l.manager.refresh()}catch(c){throw l.release(),c}}function Q0(l){return l||(typeof window<"u"&&window&&typeof window.addEventListener=="function"?window:null)}function J0(l,c){if(typeof CustomEvent=="function")return new CustomEvent(l,{bubbles:!0,composed:!0,detail:c});let a=new Event(l,{bubbles:!0,composed:!0});return a.detail=c,a}function f1(l,c){let a=setTimeout(l,Math.min(Math.max(0,c),2147483647));return a&&typeof a.unref=="function"&&a.unref(),a}function Q3(l){let c=l||{},a=typeof c.getToken=="function"?c.getToken:null,e=typeof c.onExpired=="function"?c.onExpired:null,r=typeof c.now=="function"?c.now:Date.now,s=Q0(c.target),i=[],f="",o=null,p=null,v=null,n=!1,z=!1,m=!1;function L(){p&&(clearTimeout(p),p=null)}function S(){let u=i.slice();for(let x=0;x<u.length;x++)try{u[x](f)}catch{}}function k(u,x){if(L(),n||z)return;n=!0;let C={reason:u,error:x||null,expires_at:o};s&&s.dispatchEvent(J0(j3,C)),e&&e(C)}function _(){if(L(),m=!1,z||!o)return;let u=o-r();if(!a){p=f1(function(){p=null,k("token_expired")},u);return}let x=Math.floor(u*.8);u-x<1e4&&(x=u-1e4),p=f1(y1,x)}function y1(){p=null,p2("scheduled").catch(function(){})}function D2(u,x){f=String(u),o=K3(f)||X3(x),n=!1,_(),S()}function w0(){if(m||!o)return!1;let u=o-1e4-r();return u<=0?!1:(m=!0,p=f1(y1,u),!0)}function p2(u){if(z)return Promise.reject(new Error("Token manager was closed"));if(v)return v;if(!a){let C=new Error("No getToken() was provided to refresh the session");return k(u==="unauthorized"?"unauthorized":"refresh_unavailable",C),Promise.reject(C)}let x=m;return v=Promise.resolve().then(function(){return a()}).then(function(C){let M2=typeof C=="string"?C:C&&typeof C.token=="string"?C.token:"";if(!M2)throw new Error("getToken() did not return a token");if(v=null,z)throw new Error("Token manager was closed");return D2(M2,C&&typeof C=="object"?C.expires_at:null),f}).catch(function(C){throw v=null,z||u==="scheduled"&&!x&&w0()||k("refresh_failed",C),C}),v}async function A1(u){try{await p2("unauthorized")}catch{throw u}}function T1(){p2("requested").catch(function(){})}return c.token&&D2(c.token,c.expires_at),s&&s.addEventListener(n1,T1),{current:function(){return f},expiresAt:function(){return o},hasRefresher:function(){return!!a},isExpired:function(){return n},isDestroyed:function(){return z},refresh:function(){return p2("manual")},setToken:function(u,x){if(z)throw new Error("Token manager was closed");if(!u)throw new Error("setToken(token) requires a site token");let C=typeof u=="object"?u.token:u,M2=typeof u=="object"?u.expires_at:x;if(!C)throw new Error("setToken(token) requires a site token");return D2(C,M2),f},withAuthRetry:async function(u){if(z)throw new Error("Token manager was closed");let x;try{x=await u(f)}catch(C){if(!t1(C))throw C;return await A1(C),u(f)}return t1(x)&&x.ok===!1?(await A1(x),u(f)):x},onTokenChange:function(u){return i.push(u),function(){let x=i.indexOf(u);x>=0&&i.splice(x,1)}},destroy:function(){z||(z=!0,L(),v=null,i.length=0,s&&s.removeEventListener(n1,T1))}}}var j3,n1,y2=M(()=>{"use strict";j3="dc-session-expired",n1="dc-refresh-session"});function y(l){if(typeof l=="string"){let c=l.trim();return c&&c!=="[object Object]"?c:""}return""}function a6(l){return!l||typeof l!="object"?{}:l.payload&&typeof l.payload=="object"?l.payload:l.body&&typeof l.body=="object"?l.body:l.response&&l.response.data&&typeof l.response.data=="object"?l.response.data:!(l instanceof Error)&&(l.detail!==void 0||l.title!==void 0||l.message!==void 0)?l:{}}function l6(l){let c=y(l);if(!c||c==="about:blank")return"";let a=c.split("/");return a[a.length-1]||""}function Y(l,c){let a=y(c)||"Something went wrong. Try again.";if(typeof l=="string")return{code:"request_failed",message:y(l)||a,reason:null,status:null};let e=a6(l),r=e.detail!==void 0?e.detail:l&&l.detail,s=Number(l&&(l.status||l.statusCode)||e.status)||null,i="",f=null,o="";return r&&typeof r=="object"?(i=y(r.code),f=y(r.reason)||null,o=y(e.message)||y(r.message)||y(e.title)):o=y(r)||y(e.message)||y(e.title),i||(i=y(e.code)||y(l&&l.code)||l6(e.type)),o||(o=y(l&&l.message)),i||(i=s&&Z0[s]||"request_failed"),i===Z3?o=c0(f):J3[i]&&(o=J3[i]),{code:i,message:o||a,reason:f,status:s}}function c0(l){let c="This contact needs recorded consent before you can text or call them.",a=l&&c6[l];return l==="opted_out"||l==="contact_dnc"?c+" "+a:a?c+" "+a+" "+Y3:c+" "+Y3}var Z3,Y0,Z0,c6,J3,Y3,d1=M(()=>{"use strict";Z3="consent_required",Y0="sms_registration_required",Z0={400:"invalid_request",401:"unauthorized",402:"payment_required",403:"forbidden",404:"not_found",409:"conflict",429:"rate_limited"},c6={no_granted_consent:"Drop Cowboy has no granted consent on file for this contact and number.",phone_mismatch:"This number is not one of the contact's numbers, so their recorded consent does not cover it.",opted_out:"This contact opted out (replied STOP), so they cannot be messaged until they opt back in.",contact_dnc:"This contact is on your Do Not Call list.",contact_not_found:"Drop Cowboy could not find that contact, so there is no recorded consent to use.",consent_record_invalid:"The consent recorded for this contact no longer covers this number or channel."},J3={[Y0]:"This number is not registered for texting yet. US carriers only deliver business texts from numbers on a registered brand and campaign (10DLC). Register them in Drop Cowboy, then try again."},Y3='Capture consent with the Consent block first, or ask a team admin to turn on "Use existing contact consent" in Building Blocks settings so consent already recorded in Drop Cowboy counts.'});function l0(l){let c=t2(l).scope,a=[],e=Array.isArray(c)?c:typeof c=="string"?c.split(/\s+/):[];for(let r=0;r<e.length;r++){let s=String(e[r]||"").trim();s&&a.indexOf(s)===-1&&a.push(s)}return a}function e0(l){let c=t2(l).sandbox===!0,a=l0(l),e=[];for(let r=0;r<a.length;r++){let s=a0[a[r]]||[];for(let i=0;i<s.length;i++)c&&s[i]==="numbers:write"||e.indexOf(s[i])===-1&&e.push(s[i])}return e}function A2(l,c){return e0(l).indexOf(c)!==-1}var a0,L1=M(()=>{"use strict";y2();a0={contacts:["contacts:read","contacts:write","lists:read","lists:write","webforms:read","consent:read","consent:write"],campaigns:["campaigns:read"],media:["media:read","media:write"],"phone:hub":["numbers:read","numbers:write"],voice:["voice:send"]}});var r0=M(()=>{"use strict"});var u1=M(()=>{"use strict";l1();L4();Z2();I3();V3();a1();y2();d1();L1();r0()});function i0(l){if(!l||typeof l!="string")return{};let c=l.split(".");if(c.length<2)return{};try{let a=c[1].replace(/-/g,"+").replace(/_/g,"/"),e=a+"===".slice((a.length+3)%4),r=typeof Buffer<"u"?Buffer.from(e,"base64").toString("utf8"):decodeURIComponent(atob(e).split("").map(function(s){return"%"+("00"+s.charCodeAt(0).toString(16)).slice(-2)}).join(""));return JSON.parse(r)}catch{return{}}}var s0,o0=M(()=>{"use strict";s0="https://app-api-v2.dropcowboy.com"});var f0,n0,T2,t0=M(()=>{"use strict";f0={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},n0=l=>(...c)=>({_$litDirective$:l,values:c}),T2=class{constructor(c){}get _$AU(){return this._$AM._$AU}_$AT(c,a,e){this._$Ct=c,this._$AM=a,this._$Ci=e}_$AS(c,a){return this.update(c,a)}update(c,a){return this.render(...a)}}});var e6,m0,z0,Z,D,r6,p0,M0,P2,d0=M(()=>{"use strict";X();({I:e6}=c4),m0=l=>l,z0=()=>document.createComment(""),Z=(l,c,a)=>{let e=l._$AA.parentNode,r=c===void 0?l._$AB:c._$AA;if(a===void 0){let s=e.insertBefore(z0(),r),i=e.insertBefore(z0(),r);a=new e6(s,i,l,l.options)}else{let s=a._$AB.nextSibling,i=a._$AM,f=i!==l;if(f){let o;a._$AQ?.(l),a._$AM=l,a._$AP!==void 0&&(o=l._$AU)!==i._$AU&&a._$AP(o)}if(s!==r||f){let o=a._$AA;for(;o!==s;){let p=m0(o).nextSibling;m0(e).insertBefore(o,r),o=p}}}return a},D=(l,c,a=l)=>(l._$AI(c,a),l),r6={},p0=(l,c=r6)=>l._$AH=c,M0=l=>l._$AH,P2=l=>{l._$AR(),l._$AA.remove()}});var L0,B2,u0=M(()=>{"use strict";X();t0();d0();L0=(l,c,a)=>{let e=new Map;for(let r=c;r<=a;r++)e.set(l[r],r);return e},B2=n0(class extends T2{constructor(l){if(super(l),l.type!==f0.CHILD)throw Error("repeat() can only be used in text expressions")}dt(l,c,a){let e;a===void 0?a=c:c!==void 0&&(e=c);let r=[],s=[],i=0;for(let f of l)r[i]=e?e(f,i):i,s[i]=a(f,i),i++;return{values:s,keys:r}}render(l,c,a){return this.dt(l,c,a).values}update(l,[c,a,e]){let r=M0(l),{values:s,keys:i}=this.dt(c,a,e);if(!Array.isArray(r))return this.ut=i,s;let f=this.ut??=[],o=[],p,v,n=0,z=r.length-1,m=0,L=s.length-1;for(;n<=z&&m<=L;)if(r[n]===null)n++;else if(r[z]===null)z--;else if(f[n]===i[m])o[m]=D(r[n],s[m]),n++,m++;else if(f[z]===i[L])o[L]=D(r[z],s[L]),z--,L--;else if(f[n]===i[L])o[L]=D(r[n],s[L]),Z(l,o[L+1],r[n]),n++,L--;else if(f[z]===i[m])o[m]=D(r[z],s[m]),Z(l,r[n],r[z]),z--,m++;else if(p===void 0&&(p=L0(i,m,L),v=L0(f,n,z)),p.has(f[n]))if(p.has(f[z])){let S=v.get(i[m]),k=S!==void 0?r[S]:null;if(k===null){let _=Z(l,r[n]);D(_,s[m]),o[m]=_}else o[m]=D(k,s[m]),Z(l,r[n],k),r[S]=null;m++}else P2(r[z]),z--;else P2(r[n]),n++;for(;m<=L;){let S=Z(l,o[L+1]);D(S,s[m]),o[m++]=S}for(;n<=z;){let S=r[n++];S!==null&&P2(S)}return this.ut=i,p0(l,o),H}})});var v0=M(()=>{"use strict";u0()});var C0={};y0(C0,{DcCampaignHub:()=>N});function h0(l){switch(l){case"live":return t`<span class="dc-pill is-online"><span class="dc-pdot"></span>Live</span>`;case"scheduled":return t`<span class="dc-pill is-info"><span class="dc-pdot"></span>Scheduled</span>`;case"paused":return t`<span class="dc-pill is-warning"><span class="dc-pdot"></span>Paused</span>`;case"draft":return t`<span class="dc-pill is-warning"><span class="dc-pdot"></span>Draft</span>`;default:return t`<span class="dc-pill"><span class="dc-pdot"></span>Done</span>`}}var F2,N,h1=M(()=>{"use strict";I();k2();v0();u1();E2();F2={rvm:{icon:"voicemail",color:"#7c3aed"},"voice-broadcast":{icon:"bullhorn",color:"#2563eb"},sms:{icon:"sms",color:"#16a34a"},email:{icon:"envelope",color:"#0891b2"},"ai-voice":{icon:"robot",color:"#db2777"},"power-dialer":{icon:"phone",color:"#ea580c"}};N=class extends A{constructor(){super(...arguments);this.readonly=!1;this.token="";this.tokenManager=null;this.campaigns=[];this.errorMessage="";this.selectedId="";this.filter="all";this.stats=[];this.feed=[];this.agents=[];this.createOpen=!1}get selected(){return this.campaigns.find(a=>a.id===this.selectedId)??this.campaigns[0]}get visible(){return this.filter==="all"?this.campaigns:this.filter==="running"?this.campaigns.filter(a=>a.status==="live"):this.filter==="scheduled"?this.campaigns.filter(a=>a.status==="scheduled"):this.campaigns.filter(a=>a.family===this.filter)}get controls(){let a=this.tokenManager?this.tokenManager.current()||"":this.token||null;return g0({token:a,readonly:this.readonly})}emit(a,e){this.dispatchEvent(new CustomEvent(a,{detail:e,bubbles:!0,composed:!0}))}create(a){this.createOpen=!1,this.emit("dc-campaign-create",{kind:a})}select(a){this.selectedId=a.id,this.dispatchEvent(new CustomEvent("dc-campaign-select",{detail:{id:a.id},bubbles:!0,composed:!0}))}setFilter(a){this.filter=a}renderList(){let a=this.selected,e=this.controls.canCreate;return t`
      <section class="list">
        <div class="lh">
          <h2>Campaigns</h2>
          ${e?t`<button
                class="dc-btn"
                style="padding:7px 12px"
                aria-haspopup="menu"
                aria-expanded=${this.createOpen?"true":"false"}
                @click=${()=>this.createOpen=!this.createOpen}
              >
                + New
              </button>`:d}
        </div>
        <div class="filters" role="tablist" aria-label="Campaign filter">
          ${["all","bulk","dialing","running","scheduled"].map(r=>t`<button
              class="f ${this.filter===r?"on":""}"
              role="tab"
              aria-selected=${this.filter===r}
              @click=${()=>this.setFilter(r)}
            >
              ${r==="all"?"All":r[0].toUpperCase()+r.slice(1)}
            </button>`)}
        </div>
        ${this.createOpen&&e?this.renderCreatePop():d}
        ${this.errorMessage&&this.visible.length?t`<div class="hub-err" role="alert">${this.errorMessage}</div>`:d}
        <div class="rows">
          ${this.visible.length?B2(this.visible,r=>r.id,r=>t`<button class="cmp ${a?.id===r.id?"sel":""}" @click=${()=>this.select(r)}>
                  <span class="tIcon" style="background:${F2[r.kind].color}">
                    ${V(F2[r.kind].icon)}
                  </span>
                  <div class="meta">
                    <div class="top"><span class="nm">${r.name}</span>${h0(r.status)}</div>
                    <div class="sub">${r.subtitle}</div>
                  </div>
                </button>`):t`<div class="empty">${this.errorMessage||"No campaigns match this filter."}</div>`}
        </div>
      </section>
    `}renderCreatePop(){return t`<div class="create-pop" role="menu" aria-label="New campaign type">
      <div class="ph">Bulk — fire from a list, no live agent</div>
      ${this.renderCreateItem("rvm","Ringless Voicemail","Drop a voicemail to the whole list")}
      ${this.renderCreateItem("voice-broadcast","Voice Broadcast","Play audio live with Press-1 transfer")}
      ${this.renderCreateItem("sms","SMS / MMS Broadcast","Text blast with merge variables")}
      ${this.renderCreateItem("ai-voice","AI Voice Broadcast","Conversational AI outbound")}
      <div class="ph">Dialing — launch agents into a session</div>
      ${this.renderCreateItem("power-dialer","Power Dialer session","Preview \xB7 Progressive \xB7 Predictive")}
    </div>`}renderCreateItem(a,e,r){return t`<div
      class="cc"
      role="menuitem"
      tabindex="0"
      @click=${()=>this.create(a)}
      @keydown=${s=>{(s.key==="Enter"||s.key===" ")&&(s.preventDefault(),this.create(a))}}
    >
      <span class="ci" style="background:${F2[a].color}">${V(F2[a].icon)}</span>
      <div><div class="nm">${e}</div><div class="ds">${r}</div></div>
    </div>`}renderSendControls(a){return this.controls.canSend?a.status==="live"?t`<button class="dc-iconbtn" title="Pause" aria-label="Pause ${a.name}" @click=${()=>this.emit("dc-campaign-pause",{id:a.id})}>
        ${V("pause")}
      </button>`:a.status==="paused"||a.status==="draft"?t`<button class="dc-iconbtn" title="Start" aria-label="Start ${a.name}" @click=${()=>this.emit("dc-campaign-start",{id:a.id})}>
        ${V("play")}
      </button>`:d:d}renderStats(){return t`<div class="stats">
      ${this.stats.map(a=>t`<div class="stat">
          <div class="v ${a.tone==="good"?"good":a.tone==="warn"?"warn":a.tone==="bad"?"bad":""}">
            ${a.value}
          </div>
          <div class="k">${a.label}</div>
        </div>`)}
    </div>`}renderBulkMonitor(a){return t`
      ${typeof a.progressPct=="number"?t`<div class="progress">
            <div class="pl">
              <span class="dc-muted">Delivery progress</span><strong>${a.progressPct}%</strong>
            </div>
            <div class="bar"><div class="fill" style="width:${a.progressPct}%"></div></div>
          </div>`:d}
      ${this.renderStats()}
      ${this.feed.length?t`<div class="card">
            <div class="ch">Live delivery feed<span class="sp"></span><span class="dc-light dc-xs">via Ably</span></div>
            ${B2(this.feed,e=>e.id,e=>t`<div class="frow">
                <span class="ic" style="background:#7c3aed">${V(e.icon)}</span>
                <div class="m"><div class="t">${e.title}</div><div class="s">${e.subtitle}</div></div>
                <span class="dc-light dc-xs">${e.when}</span>
              </div>`)}
          </div>`:d}
    `}renderDialingMonitor(){return t`
      ${this.renderStats()}
      ${this.agents.length?t`<div class="card">
            <div class="ch">
              Agents<span class="sp"></span>
            </div>
            ${B2(this.agents,a=>a.id,a=>t`<div class="frow">
                <span class="ava">${a.initials}</span>
                <div class="m"><div class="t">${a.name}</div><div class="s">${a.detail}</div></div>
                <span
                  class="agent-st ${a.state==="on-call"?"st-call":a.state==="wrap"?"st-wrap":"st-avail"}"
                >
                  ${a.state==="on-call"?"On call":a.state==="wrap"?"Wrap":"Available"}
                </span>
              </div>`)}
          </div>`:d}
    `}renderMonitor(){let a=this.selected;return a?t`
      <section class="mon">
        <div class="mh">
          <h2>${a.name} ${h0(a.status)}</h2>
          <span class="sp"></span>
          ${this.renderSendControls(a)}
        </div>
        <div class="mon-body">
          ${a.status==="draft"||a.status==="scheduled"?t`<div class="draft-note">
                ${a.status==="draft"?t`This campaign is still a draft — finish the wizard to pick an audience and audio, then launch.`:a.deliverAt?t`Scheduled — delivery starts <b>${v1(a.deliverAt,a.timezone)}</b>.
                        Stats will stream here once it goes live.`:t`Scheduled. Stats will stream here once it goes live.`}
              </div>`:a.family==="bulk"?this.renderBulkMonitor(a):this.renderDialingMonitor()}
        </div>
      </section>
    `:t`<div class="mon-body"><div class="draft-note">Select a campaign.</div></div>`}renderSetting(a,e){return t`<div class="kv"><span class="k">${a}</span><span>${e}</span></div>`}renderRail(a){if(!a)return d;let e=[];return a.callerId&&e.push(this.renderSetting("Caller ID",a.callerId)),a.dripRate&&e.push(this.renderSetting("Pace",`Drip \xB7 ${a.dripRate}/hr`)),a.deliverAt&&a.deliverAt>Date.now()&&e.push(this.renderSetting("Starts",v1(a.deliverAt,a.timezone))),typeof a.quietHours=="boolean"&&e.push(this.renderSetting("Quiet hours",a.quietHours?"On":"Off")),!a.listCount&&!e.length?d:t`
      <aside class="ctx" aria-label="Campaign settings">
        ${a.listCount?t`<h3>Audience</h3>${this.renderSetting("Lists",String(a.listCount))}`:d}
        ${e.length?t`<h3>Delivery</h3>${e}`:d}
      </aside>
    `}render(){let a=this.renderRail(this.selected);return t`
      <div class="app ${a===d?"no-rail":""}" role="region" aria-label="Campaign Hub">
        ${this.renderList()} ${this.renderMonitor()} ${a}
      </div>
    `}};N.styles=[A.styles,B`
      :host {
        display: block;
        width: 100%;
        height: 100%;
        min-height: 640px;
        container-type: inline-size;
      }
      .app {
        display: grid;
        grid-template-columns: minmax(240px, 332px) minmax(0, 1fr) minmax(200px, 286px);
        height: 100%;
        min-height: inherit;
        background: var(--dc-bg-color);
        overflow: hidden;
      }
      .app.no-rail {
        grid-template-columns: minmax(240px, 332px) minmax(0, 1fr);
      }
      @container (max-width: 960px) {
        .app,
        .app.no-rail {
          grid-template-columns: minmax(220px, 280px) minmax(0, 1fr);
          grid-template-rows: minmax(0, 1fr) auto;
        }
        .list {
          grid-row: 1 / -1;
        }
        .mon {
          min-height: 0;
        }
        .ctx {
          grid-column: 2;
          max-height: 240px;
          border-left: 0;
          border-top: 1px solid var(--dc-border-color);
        }
      }
      @container (max-width: 600px) {
        .app,
        .app.no-rail {
          grid-template-columns: minmax(0, 1fr);
          grid-template-rows: auto;
          overflow: auto;
        }
        .list {
          grid-row: auto;
          max-height: 280px;
          border-right: 0;
          border-bottom: 1px solid var(--dc-border-color);
        }
        .ctx {
          grid-column: auto;
          max-height: none;
        }
      }
      /* list */
      .list {
        border-right: 1px solid var(--dc-border-color);
        display: flex;
        flex-direction: column;
        min-width: 0;
        position: relative;
      }
      .lh {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 14px 16px;
        border-bottom: 1px solid var(--dc-border-color);
      }
      .lh h2 {
        font-size: 16px;
        margin: 0;
      }
      .filters {
        display: flex;
        gap: 6px;
        padding: 10px 14px;
        border-bottom: 1px solid var(--dc-border-color);
        flex-wrap: wrap;
      }
      .f {
        font-size: var(--dc-font-size-sm);
        font-weight: 600;
        padding: 5px 10px;
        border-radius: 999px;
        background: var(--dc-surface-color);
        color: var(--dc-text-muted);
        cursor: pointer;
        border: 0;
        font-family: inherit;
      }
      .f.on {
        background: var(--dc-primary-soft);
        color: var(--dc-primary-color);
      }
      .rows {
        overflow: auto;
        flex: 1;
      }
      .cmp {
        display: flex;
        gap: 11px;
        padding: 12px 14px;
        border: 0;
        border-bottom: 1px solid var(--dc-border-color);
        cursor: pointer;
        width: 100%;
        background: transparent;
        font: inherit;
        text-align: left;
        color: var(--dc-text-color);
      }
      .cmp:hover {
        background: var(--dc-surface-color);
      }
      .cmp.sel {
        background: var(--dc-primary-soft);
      }
      .tIcon {
        width: 34px;
        height: 34px;
        border-radius: 9px;
        display: grid;
        place-items: center;
        font-size: 15px;
        flex-shrink: 0;
        color: #fff;
      }
      .cmp .meta {
        min-width: 0;
        flex: 1;
      }
      .cmp .top {
        display: flex;
        justify-content: space-between;
        gap: 8px;
        align-items: center;
      }
      .cmp .nm {
        font-weight: 600;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .cmp .sub {
        font-size: var(--dc-font-size-sm);
        color: var(--dc-text-muted);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .empty {
        padding: 40px 20px;
        text-align: center;
        color: var(--dc-text-muted);
        font-size: var(--dc-font-size-sm);
      }
      .hub-err {
        padding: 8px 14px;
        color: var(--dc-danger-text);
        font-size: var(--dc-font-size-sm);
        border-bottom: 1px solid var(--dc-border-color);
      }
      /* create popover */
      .create-pop {
        position: absolute;
        top: 56px;
        right: 12px;
        z-index: 20;
        width: 300px;
        background: var(--dc-bg-color);
        border: 1px solid var(--dc-border-color);
        border-radius: var(--dc-radius);
        box-shadow: var(--dc-shadow);
        padding: 8px;
      }
      .create-pop .ph {
        font-size: var(--dc-font-size-xs);
        text-transform: uppercase;
        letter-spacing: 0.04em;
        color: var(--dc-text-light);
        padding: 8px 10px 4px;
      }
      .cc {
        display: flex;
        gap: 10px;
        align-items: flex-start;
        padding: 10px;
        border-radius: var(--dc-radius-sm);
        cursor: pointer;
      }
      .cc:hover {
        background: var(--dc-surface-color);
      }
      .cc .ci {
        width: 32px;
        height: 32px;
        border-radius: 8px;
        display: grid;
        place-items: center;
        color: #fff;
        flex-shrink: 0;
      }
      .cc .nm {
        font-weight: 600;
        font-size: var(--dc-font-size-sm);
      }
      .cc .ds {
        font-size: var(--dc-font-size-xs);
        color: var(--dc-text-muted);
      }
      /* monitor */
      .mon {
        display: flex;
        flex-direction: column;
        min-width: 0;
      }
      .mh {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 14px 20px;
        border-bottom: 1px solid var(--dc-border-color);
      }
      .mh h2 {
        font-size: 17px;
        margin: 0;
        display: flex;
        align-items: center;
        gap: 9px;
      }
      .sp {
        flex: 1;
      }
      .mon-body {
        flex: 1;
        overflow: auto;
        padding: 20px;
        background: var(--dc-surface-color);
      }
      .progress {
        background: var(--dc-bg-color);
        border: 1px solid var(--dc-border-color);
        border-radius: var(--dc-radius-sm);
        padding: 16px 18px;
        margin-bottom: 16px;
      }
      .progress .pl {
        display: flex;
        justify-content: space-between;
        font-size: var(--dc-font-size-sm);
        margin-bottom: 8px;
      }
      .bar {
        height: 10px;
        border-radius: 999px;
        background: var(--dc-surface-2);
        overflow: hidden;
      }
      .bar .fill {
        height: 100%;
        background: var(--dc-primary-color);
        border-radius: 999px;
        transition: width var(--dc-transition);
      }
      .stats {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
        gap: 12px;
        margin-bottom: 18px;
      }
      .stat {
        background: var(--dc-bg-color);
        border: 1px solid var(--dc-border-color);
        border-radius: var(--dc-radius-sm);
        padding: 14px 16px;
      }
      .stat .v {
        font-size: 24px;
        font-weight: 800;
        letter-spacing: -0.01em;
      }
      .stat .k {
        font-size: var(--dc-font-size-sm);
        color: var(--dc-text-muted);
        margin-top: 2px;
      }
      .stat .v.good {
        color: var(--dc-online-text);
      }
      .stat .v.warn {
        color: var(--dc-warning-text);
      }
      .stat .v.bad {
        color: var(--dc-danger-text);
      }
      .card {
        background: var(--dc-bg-color);
        border: 1px solid var(--dc-border-color);
        border-radius: var(--dc-radius-sm);
        padding: 8px 16px 12px;
        margin-bottom: 16px;
      }
      .ch {
        font-weight: 700;
        font-size: var(--dc-font-size-sm);
        padding: 10px 0 8px;
        border-bottom: 1px solid var(--dc-border-color);
        margin-bottom: 4px;
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .frow {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 9px 0;
        font-size: var(--dc-font-size-sm);
      }
      .frow + .frow {
        border-top: 1px solid var(--dc-border-color);
      }
      .frow .m {
        flex: 1;
        min-width: 0;
      }
      .frow .t {
        font-weight: 600;
      }
      .frow .s {
        font-size: var(--dc-font-size-xs);
        color: var(--dc-text-light);
      }
      .frow .ic {
        width: 26px;
        height: 26px;
        border-radius: 9px;
        display: grid;
        place-items: center;
        font-size: 12px;
        flex-shrink: 0;
        color: #fff;
      }
      .ava {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background: var(--dc-primary-soft);
        color: var(--dc-primary-color);
        display: grid;
        place-items: center;
        font-weight: 700;
        font-size: 11px;
        flex-shrink: 0;
      }
      .agent-st {
        font-size: var(--dc-font-size-xs);
        font-weight: 700;
        padding: 3px 8px;
        border-radius: 999px;
      }
      .st-call {
        background: var(--dc-info-soft);
        color: var(--dc-info-text);
      }
      .st-avail {
        background: var(--dc-online-soft);
        color: var(--dc-online-text);
      }
      .st-wrap {
        background: var(--dc-warning-soft);
        color: var(--dc-warning-text);
      }
      .draft-note {
        background: var(--dc-bg-color);
        border: 1px dashed var(--dc-border-color);
        border-radius: var(--dc-radius-sm);
        padding: 32px 20px;
        text-align: center;
        color: var(--dc-text-muted);
        font-size: var(--dc-font-size-sm);
      }
      /* context rail */
      .ctx {
        border-left: 1px solid var(--dc-border-color);
        background: var(--dc-surface-color);
        padding: 18px 16px;
        overflow: auto;
      }
      .ctx h3 {
        font-size: var(--dc-font-size-xs);
        text-transform: uppercase;
        letter-spacing: 0.04em;
        color: var(--dc-text-light);
        margin: 16px 0 7px;
      }
      .ctx h3:first-child {
        margin-top: 0;
      }
      .kv {
        display: flex;
        justify-content: space-between;
        gap: 8px;
        font-size: var(--dc-font-size-sm);
        padding: 6px 0;
        border-bottom: 1px solid var(--dc-border-color);
      }
      .kv .k {
        color: var(--dc-text-muted);
      }
    `],h([g({type:Boolean,reflect:!0})],N.prototype,"readonly",2),h([g({type:String})],N.prototype,"token",2),h([g({attribute:!1})],N.prototype,"tokenManager",2),h([g({attribute:!1})],N.prototype,"campaigns",2),h([g({type:String,attribute:"error-message"})],N.prototype,"errorMessage",2),h([g({type:String,attribute:"selected-id"})],N.prototype,"selectedId",2),h([g({type:String})],N.prototype,"filter",2),h([g({attribute:!1})],N.prototype,"stats",2),h([g({attribute:!1})],N.prototype,"feed",2),h([g({attribute:!1})],N.prototype,"agents",2),h([g({type:Boolean,attribute:"create-open"})],N.prototype,"createOpen",2),N=h([Q("dc-campaign-hub")],N)});function N0(l,c){let a=String(l||x1).replace(/\/$/,"");return c.charAt(0)==="/"?a+c:a+"/"+c}function s6(l,c){let a=N0(l,"/campaign/public/campaigns");if(!c)return a;let e=new URLSearchParams;c.status&&e.set("status",c.status),c.type&&e.set("type",c.type),c.search_term&&e.set("search_term",c.search_term),c.limit!=null&&e.set("limit",String(c.limit)),c.skip!=null&&e.set("skip",String(c.skip)),c.sort&&e.set("sort",c.sort),c.sort_by&&e.set("sort_by",c.sort_by),c.sort_order&&e.set("sort_order",c.sort_order);let r=e.toString();return r?a+"?"+r:a}function c2(l,c){return N0(l,"/campaign/public/campaigns/"+encodeURIComponent(c))}function i6(l,c){return c2(l,c)+"/start"}function o6(l,c){return c2(l,c)+"/pause"}function f6(l,c,a){let e=c2(l,c)+"/stats";if(!a)return e;let r=new URLSearchParams;a.bucket_type&&r.set("bucket_type",a.bucket_type),a.start_ts!=null&&r.set("start_ts",String(a.start_ts)),a.end_ts!=null&&r.set("end_ts",String(a.end_ts));let s=r.toString();return s?e+"?"+s:e}function b1(){return{get:function(l,c){return x0("GET",l,void 0,c)},post:function(l,c,a){return x0("POST",l,c,a)}}}function x0(l,c,a,e){let r={method:l,headers:e||{}};return a!==void 0&&(r.body=JSON.stringify(a)),fetch(c,r).then(function(s){return s.json().catch(function(){return{}}).then(function(i){if(!s.ok){let f=Y({status:s.status,payload:i},"Request failed ("+s.status+")"),o=new Error(f.message);throw o.status=s.status,o.code=f.code,o.payload=i,o}return i})})}function j(l){return!l||typeof l!="object"?l:l.data!==void 0?l.data:l}function z2(l){return{"Content-Type":"application/json",Authorization:"Bearer "+l}}function n6(l){typeof window>"u"||(window.DropCowboy=window.DropCowboy||{},window.DropCowboy.campaigns=l)}function t6(l){let c=String(l||"").toLowerCase();return c.indexOf("dial")!==-1||c==="predictive"||c==="progressive"||c==="preview"?"dialing":"bulk"}function m6(l){let c=String(l||"").toLowerCase();return c==="sms"||c==="mms"||c==="rcs"?"sms":c==="email"?"email":c.indexOf("voice_broadcast")!==-1||c==="voice"||c==="broadcast"?"voice-broadcast":c==="ai"||c.indexOf("ai_")===0?"ai-voice":c.indexOf("dial")!==-1?"power-dialer":"rvm"}function z6(l){let c=String(l||"").toLowerCase();return c==="active"||c==="live"||c==="running"?"live":c==="paused"||c==="insufficient_credit"?"paused":c==="complete"||c==="completed"||c==="done"?"completed":c==="scheduled"?"scheduled":"draft"}function H2(l){let c=l&&l.campaign||l||{},a=c.campaign_data||{},e=c.type||a.type||"rvm",r=a.status||c.status,s=Number(c.pending_count||a.pending_count||0),i=Number(c.success_count||a.success_count||0),f=Number(c.fail_count||a.fail_count||0),o=s+i+f,p=o>0?Math.round(i/o*100):void 0,v=a.name||c.name||"Campaign",n=Number(c.deliver_at),z=n>0&&n<Number.MAX_SAFE_INTEGER,m=z6(r);m==="draft"&&r==="not_started"&&z&&n>Date.now()&&(m="scheduled");let L={id:c.campaign_id||c.id,name:v,family:t6(e),kind:m6(e),status:m,subtitle:e.toUpperCase()+(p!=null?" \xB7 "+p+"% sent":""),progressPct:p,rawStatus:r||"draft"};Array.isArray(a.list_ids)&&a.list_ids.length&&(L.listCount=a.list_ids.length);let S=a.caller_id&&typeof a.caller_id=="object"?a.caller_id.phone_number:a.caller_id;S&&(L.callerId=p6(S));let k=a.drip||{},_=Number(k.rate);return(a.method==="drip"||c.delivery_type==="drip")&&_>0&&(L.dripRate=_),z&&(L.deliverAt=n),k.timezone&&(L.timezone=String(k.timezone)),typeof a.disable_tcpa_hours=="boolean"&&(L.quietHours=!a.disable_tcpa_hours),L}function p6(l){let c=String(l||"").replace(/\D/g,"");return c.length===11&&c.charAt(0)==="1"?"+1 ("+c.slice(1,4)+") "+c.slice(4,7)+"-"+c.slice(7):c.length===10?"+1 ("+c.slice(0,3)+") "+c.slice(3,6)+"-"+c.slice(6):String(l||"")}function v1(l,c){let a={weekday:"short",month:"short",day:"numeric",hour:"numeric",minute:"2-digit",timeZoneName:"short"};if(c)try{return new Intl.DateTimeFormat("en-US",Object.assign({timeZone:c},a)).format(l)}catch(e){if(!(e instanceof RangeError))throw e}return new Intl.DateTimeFormat("en-US",a).format(l)}function S0(l){if(!l||typeof l!="object")return[];if(Array.isArray(l)){let e=[];for(let r=0;r<l.length;r++){let s=l[r];if(s&&s.label!=null&&s.value!=null){let i={label:String(s.label),value:String(s.value)};s.tone&&(i.tone=s.tone),e.push(i)}}return e}let c=[],a=Object.keys(C1);for(let e=0;e<a.length;e++){let r=a[e],s=l[r];typeof s=="number"&&Number.isFinite(s)?c.push({label:C1[r],value:String(s)}):typeof s=="string"&&s!==""&&c.push({label:C1[r],value:s})}return c}function g0(l){let c=l||{};return c.readonly?{canCreate:!1,canSend:!1}:c.token==null?{canCreate:!0,canSend:!0}:{canCreate:A2(c.token,"campaigns:write"),canSend:A2(c.token,"campaigns:send")}}function M6(l){if(!l)return document.body;if(typeof l=="string"){let c=document.querySelector(l);if(!c)throw new Error("open() container not found");return c}return l}function w1(l,c){let a=String(c||g1).replace(/\/$/,""),e=l?String(l).charAt(0)==="#"?l:"#"+l:"#/campaigns",r=a+e;return typeof window<"u"&&typeof window.open=="function"&&window.open(r,"_blank","noopener"),r}function R2(l){return new S1(l||N1)}function T(){return m2||(m2=R2(N1)),m2}async function d6(l){return T().init(l)}function L6(l){T().setTheme(l)}function u6(l){return T().addErrorListener(l)}function v6(l){return T().setToken(l)}async function h6(l){return T().getStatus(l)}async function C6(l){return T().list(l)}async function g6(l){return T().start(l)}async function x6(l){return T().pause(l)}async function S6(l,c){return T().getStats(l,c)}async function N6(l){return T().open(l)}async function b6(){let l=m2;m2=null,l&&await l.close()}var N1,m2,g1,x1,C1,S1,E2=M(()=>{"use strict";o0();o1();q2();d1();L1();y2();N1={},m2=null,g1="https://dropcowboy.com/app",x1=s0;C1={sent:"Sent",delivered:"Delivered",failed:"Failed",pending:"Pending",read:"Read",billable:"Billable",non_billable:"Non-billable",opened:"Opened",clicked:"Clicked",bounced:"Bounced",complained:"Complained"};S1=class{constructor(c){this.http=c&&c.http||N1.http||b1(),this.token=null,this.session=null,this.apiBase=x1,this.portalBase=g1,this.teamId=null,this.theme={},this.errorListeners=[]}async init(c){if(!m1(c))throw new Error("init({ token }) requires a site token from POST /embed/token");this.apiBase=c.campaignApiBase||c.apiBase||x1,this.portalBase=c.portalBase||g1,this._releaseSession(),this.session=p1(c,a=>this._applyToken(a)),this._applyToken(await M1(this.session))}setToken(c){if(!this.session)throw new Error("Call init({ token }) before setToken");return this.session.manager.setToken(c)}getTokenManager(){return this.session?this.session.manager:null}_applyToken(c){this.token=c||null;let a=i0(c);this.teamId=a.team_id||null}_releaseSession(){this.session&&(this.session.release(),this.session=null)}_authed(c){if(!this.session||!this.token)throw new Error("init({ token }) is required for /campaign/public");return this.session.manager.withAuthRetry(a=>c(z2(a)))}setTheme(c){this.theme=Object.assign({},this.theme,c||{}),this.theme.primary&&!this.theme.primaryColor&&(this.theme.primaryColor=this.theme.primary),i1(this.theme)}getTheme(){return this.theme}credHeaders(){if(!this.token)throw new Error("init({ token }) is required for /campaign/public");return z2(this.token)}addErrorListener(c){return this.errorListeners.push(c),()=>{this.errorListeners=this.errorListeners.filter(function(a){return a!==c})}}async list(c){let a=await this._authed(i=>this.http.get(s6(this.apiBase,c),i)),e=j(a),r=Array.isArray(e)?e:e&&e.campaigns||[],s=[];for(let i=0;i<r.length;i++)s.push(H2(r[i]));return s}async getStatus(c){if(!c)throw new Error("getStatus(campaignId) requires a campaign id");let a=await this._authed(e=>this.http.get(c2(this.apiBase,c),e));return H2(j(a))}async start(c){if(!c)throw new Error("start(campaignId) requires a campaign id");let a=await this._authed(e=>this.http.post(i6(this.apiBase,c),{},e));return j(a)}async pause(c){if(!c)throw new Error("pause(campaignId) requires a campaign id");let a=await this._authed(e=>this.http.post(o6(this.apiBase,c),{},e));return j(a)}async getStats(c,a){if(!c)throw new Error("getStats(campaignId) requires a campaign id");let e=await this._authed(r=>this.http.get(f6(this.apiBase,c,a),r));return j(e)}async open(c){if(!this.token)throw new Error("Call init({ token }) before open()");(typeof customElements>"u"||!customElements.get("dc-campaign-hub"))&&await Promise.resolve().then(()=>(h1(),C0));let a=c||{},e=document.createElement("dc-campaign-hub");e.tokenManager=this.getTokenManager(),e.readonly=a.readonly===!0,M6(a.container).appendChild(e);let s=this;return e.addEventListener("dc-campaign-select",function(i){let f=i&&i.detail&&i.detail.id;f&&s.getStats(f).then(function(o){e.stats=S0(o)}).catch(function(){e.stats=[]})}),e.addEventListener("dc-campaign-start",function(i){s._hubAction(e,"start",i&&i.detail&&i.detail.id)}),e.addEventListener("dc-campaign-pause",function(i){s._hubAction(e,"pause",i&&i.detail&&i.detail.id)}),await this._loadHub(e),e}async _loadHub(c){let a=[];try{a=await this.list({limit:20}),c.errorMessage=""}catch(s){this._reportHubError(c,s,"Campaigns could not be loaded.")}c.campaigns=a;let r=c.selectedId&&a.some(function(s){return s.id===c.selectedId})?c.selectedId:a.length&&a[0].id?a[0].id:"";if(r){c.selectedId=r;try{let s=S0(await this.getStats(r));s.length&&(c.stats=s)}catch{c.stats=[]}}}async _hubAction(c,a,e){if(!(!e||!a2(a==="start"?"Start this campaign?":"Pause this campaign?"))){try{await(a==="start"?this.start(e):this.pause(e))}catch(s){this._reportHubError(c,s,a==="start"?"The campaign could not be started.":"The campaign could not be paused.");return}await this._loadHub(c)}}_reportHubError(c,a,e){let r=Y(a,e),s={code:r.code,message:r.message,reason:r.reason};c.errorMessage=r.message,c.dispatchEvent(new CustomEvent("dc-error",{detail:s,bubbles:!0,composed:!0}));for(let i=0;i<this.errorListeners.length;i++)this.errorListeners[i](s)}openInPortal(c){return w1(c||"#/campaigns",this.portalBase)}async close(){this._releaseSession(),this.token=null,this.errorListeners=[]}};n6({init:d6,setTheme:L6,addErrorListener:u6,list:C6,getStatus:h6,start:g6,pause:x6,getStats:S6,open:N6,setToken:v6,close:b6,createEmbedCampaigns:R2})});var _2="__dcBundle",E1=/^DropCowboy./,P=typeof window<"u"?window:globalThis,d2=A0();function A0(){let l={},c={},a=P.DropCowboy;if(a&&typeof a=="object"){let r=Object.keys(a);for(let s=0;s<r.length;s++)l[r[s]]=a[r[s]]}let e=Object.keys(P);for(let r=0;r<e.length;r++)E1.test(e[r])&&(c[e[r]]=P[e[r]]);return{namespaces:l,globals:c}}function U2(l,c){return Object.prototype.hasOwnProperty.call(l,c)}function B1(l,c,a,e){let r=Object.keys(l);for(let s=0;s<r.length;s++){let i=r[s];!e(i)||U2(a,i)||(U2(c,i)?l[i]!==c[i]&&(l[i]=c[i]):delete l[i])}}function F1(l,c,a){return l&&l[_2]===a?l:(U2(c,_2)||Object.defineProperty(c,_2,{value:a}),c)}function T0(){return!0}function H1(l){let c=l.namespaces||{},a=l.globals||{};(!P.DropCowboy||typeof P.DropCowboy!="object")&&(P.DropCowboy={});let e=P.DropCowboy;B1(e,d2.namespaces,c,T0),B1(P,d2.globals,a,function(f){return E1.test(f)});let r={},s=Object.keys(c);for(let f=0;f<s.length;f++){let o=s[f];e[o]=F1(d2.namespaces[o],c[o],l.bundle),r[o]=e[o]}let i=Object.keys(a);for(let f=0;f<i.length;f++){let o=i[f];P[o]=F1(d2.globals[o],a[o],l.bundle)}return r}function R1(l,c){if("tokenManager"in l){l.tokenManager!==c.manager&&(l.tokenManager=c.manager);return}l.token=c.token}function D1(l){let c=l.selector,a=l.apply,e=new WeakSet,r=null,s=null,i=null;function f(n){!r||!r.token||(n.token||n.tokenManager)&&!e.has(n)||(e.add(n),a(n,r))}function o(n){if(!n||n.nodeType!==1)return;n.matches(c)&&f(n);let z=n.querySelectorAll(c);for(let m=0;m<z.length;m++)f(z[m])}function p(){s&&(s.disconnect(),s=null),i&&(i(),i=null),r=null}function v(n,z){p(),!(typeof document>"u"||!n)&&(r={token:n.current(),manager:n,settings:z||{}},i=n.onTokenChange(function(m){r&&(r.token=m,o(document.documentElement))}),typeof MutationObserver=="function"&&(s=new MutationObserver(function(m){for(let L=0;L<m.length;L++){let S=m[L].addedNodes;for(let k=0;k<S.length;k++)o(S[k])}}),s.observe(document.documentElement,{childList:!0,subtree:!0})),o(document.documentElement))}return{start:v,stop:p}}q2();I();k2();u1();E2();function w6(l){switch(l){case"live":return t`<span class="dc-pill is-online"><span class="dc-pdot"></span>Live</span>`;case"scheduled":return t`<span class="dc-pill is-info"><span class="dc-pdot"></span>Scheduled</span>`;case"paused":return t`<span class="dc-pill is-warning"><span class="dc-pdot"></span>Paused</span>`;case"completed":return t`<span class="dc-pill"><span class="dc-pdot"></span>Done</span>`;default:return t`<span class="dc-pill is-warning"><span class="dc-pdot"></span>Draft</span>`}}var b=class extends A{constructor(){super(...arguments);this.campaignId="";this.token="";this.tokenManager=null;this.campaignApiBase="";this.name="";this.status="draft";this.subtitle="";this.loading=!1;this.errorMessage="";this.fetchGen=0;this.http=b1()}updated(a){(a.has("campaignId")||a.has("tokenManager")||a.has("token")&&!this.tokenManager)&&this.loadStatus()}async loadStatus(){if(!this.campaignId||!this.token&&!this.tokenManager)return;let a=++this.fetchGen;this.loading=!0,this.errorMessage="";let e=c2(this.campaignApiBase,this.campaignId);try{let r=this.tokenManager?await this.tokenManager.withAuthRetry(i=>this.http.get(e,z2(i))):await this.http.get(e,z2(this.token));if(a!==this.fetchGen)return;let s=H2(j(r));this.name=s.name,this.status=s.status,this.subtitle=s.subtitle,this.progressPct=s.progressPct}catch(r){if(a!==this.fetchGen)return;let s=Y(r,"Unable to load campaign status");this.errorMessage=s.message,this.dispatchEvent(new CustomEvent("dc-error",{detail:{code:s.code,message:s.message,reason:s.reason,campaign_id:this.campaignId},bubbles:!0,composed:!0}))}finally{a===this.fetchGen&&(this.loading=!1)}}openPortal(){w1("#/campaigns"),this.dispatchEvent(new CustomEvent("dc-open-portal",{bubbles:!0,composed:!0}))}render(){return t`
      <section class="dc-panel card" aria-label="Campaign status">
        ${this.loading?t`<div class="sub">Loading campaign…</div>`:t`
              <div class="top">
                <div class="nm">${this.name||"Campaign"}</div>
                ${w6(this.status)}
              </div>
              <div class="sub">${this.subtitle||"Status from GET /campaign/public/campaigns/:id"}</div>
              ${typeof this.progressPct=="number"?t`<div class="bar"><div class="fill" style="width:${this.progressPct}%"></div></div>`:d}
              ${this.errorMessage?t`<div class="err">${this.errorMessage}</div>`:d}
              <button class="dc-btn" style="margin-top:12px" @click=${()=>this.openPortal()}>
                Open in portal
              </button>
              <p class="honest">
                Campaign create/edit wizards are not embedded. Manage sends, audiences, and compliance in
                DropCowboy.
              </p>
            `}
      </section>
    `}};b.styles=[A.styles,B`
      :host {
        display: block;
        width: 360px;
        max-width: 100%;
      }
      .card {
        padding: 16px 18px;
      }
      .top {
        display: flex;
        align-items: flex-start;
        gap: 10px;
      }
      .nm {
        font-weight: 700;
        flex: 1;
        min-width: 0;
      }
      .sub {
        font-size: var(--dc-font-size-sm);
        color: var(--dc-text-muted);
        margin-top: 4px;
      }
      .bar {
        height: 8px;
        border-radius: 999px;
        background: var(--dc-surface-2);
        overflow: hidden;
        margin: 14px 0 12px;
      }
      .fill {
        height: 100%;
        background: var(--dc-primary-color);
        border-radius: 999px;
      }
      .err {
        font-size: var(--dc-font-size-sm);
        color: var(--dc-danger-text);
        margin-top: 8px;
      }
      .honest {
        font-size: var(--dc-font-size-xs);
        color: var(--dc-text-light);
        margin-top: 10px;
      }
    `],h([g({type:String,attribute:"campaign-id"})],b.prototype,"campaignId",2),h([g({type:String})],b.prototype,"token",2),h([g({attribute:!1})],b.prototype,"tokenManager",2),h([g({type:String,attribute:"campaign-api-base"})],b.prototype,"campaignApiBase",2),h([g({type:String})],b.prototype,"name",2),h([g({type:String})],b.prototype,"status",2),h([g({type:String})],b.prototype,"subtitle",2),h([g({type:Number,attribute:"progress-pct"})],b.prototype,"progressPct",2),h([g({type:Boolean})],b.prototype,"loading",2),h([g({type:String,attribute:"error-message"})],b.prototype,"errorMessage",2),h([i4()],b.prototype,"fetchGen",2),b=h([Q("dc-campaign-status")],b);h1();E2();var w=R2();function k6(){typeof customElements>"u"||customElements.get("dc-campaign-list")||customElements.define("dc-campaign-list",class extends HTMLElement{})}k6();var b0=D1({selector:"dc-campaign-status, dc-campaign-list",apply:function(l,c){if(l.localName==="dc-campaign-list"){l.querySelector("dc-campaign-hub")||w.open({container:l}).catch(function(){});return}l.campaignApiBase||(l.campaignApiBase=c.settings.apiBase),R1(l,c)}}),k1={init:function(l){return w.init(l).then(function(){b0.start(w.getTokenManager(),{apiBase:w.apiBase})})},setTheme:function(l){w.setTheme(l)},addErrorListener:function(l){return w.addErrorListener(l)},setToken:function(l){return w.setToken(l)},getTokenManager:function(){return w.getTokenManager()},list:function(l){return w.list(l)},getStatus:function(l){return w.getStatus(l)},start:function(l){return a2("Start this campaign?")?w.start(l):Promise.resolve(null)},pause:function(l){return a2("Pause this campaign?")?w.pause(l):Promise.resolve(null)},getStats:function(l,c){return w.getStats(l,c)},open:function(l){return w.open(l)},openInPortal:function(l){return w.openInPortal(l)},close:function(){return b0.stop(),w.close()},create:function(){return k1},_bootstrap:function(){},_loaded:!0};H1({bundle:"campaigns",namespaces:{campaigns:k1},globals:{DropCowboyCampaigns:k1}});})();
/*! Bundled license information:

@lit/reactive-element/css-tag.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/reactive-element.js:
lit-html/lit-html.js:
lit-element/lit-element.js:
@lit/reactive-element/decorators/property.js:
@lit/reactive-element/decorators/state.js:
@lit/reactive-element/decorators/event-options.js:
@lit/reactive-element/decorators/base.js:
@lit/reactive-element/decorators/query.js:
@lit/reactive-element/decorators/query-all.js:
@lit/reactive-element/decorators/query-async.js:
@lit/reactive-element/decorators/query-assigned-nodes.js:
lit-html/directive.js:
lit-html/directives/repeat.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/is-server.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-assigned-elements.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@fortawesome/free-regular-svg-icons/index.mjs:
@fortawesome/free-solid-svg-icons/index.mjs:
  (*!
   * Font Awesome Free 7.2.0 by @fontawesome - https://fontawesome.com
   * License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)
   * Copyright 2026 Fonticons, Inc.
   *)

lit-html/directive-helpers.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/

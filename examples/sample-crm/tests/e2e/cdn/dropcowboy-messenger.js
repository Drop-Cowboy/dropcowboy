/*! Drop Cowboy Building Blocks messenger (@dropcowboy/embed-messenger 0.1.0). Do not edit. */
"use strict";(()=>{var d3=Object.defineProperty;var u3=Object.getOwnPropertyDescriptor;var C=(l,c,a,e)=>{for(var s=e>1?void 0:e?u3(c,a):c,r=l.length-1,i;r>=0;r--)(i=l[r])&&(s=(e?i(c,a,s):i(s))||s);return e&&s&&d3(c,a,s),s};var u2="__dcBundle",X2=/^DropCowboy./,b=typeof window<"u"?window:globalThis,c2=v3();function v3(){let l={},c={},a=b.DropCowboy;if(a&&typeof a=="object"){let s=Object.keys(a);for(let r=0;r<s.length;r++)l[s[r]]=a[s[r]]}let e=Object.keys(b);for(let s=0;s<e.length;s++)X2.test(e[s])&&(c[e[s]]=b[e[s]]);return{namespaces:l,globals:c}}function v2(l,c){return Object.prototype.hasOwnProperty.call(l,c)}function j2(l,c,a,e){let s=Object.keys(l);for(let r=0;r<s.length;r++){let i=s[r];!e(i)||v2(a,i)||(v2(c,i)?l[i]!==c[i]&&(l[i]=c[i]):delete l[i])}}function K2(l,c,a){return l&&l[u2]===a?l:(v2(c,u2)||Object.defineProperty(c,u2,{value:a}),c)}function h3(){return!0}function Q2(l){let c=l.namespaces||{},a=l.globals||{};(!b.DropCowboy||typeof b.DropCowboy!="object")&&(b.DropCowboy={});let e=b.DropCowboy;j2(e,c2.namespaces,c,h3),j2(b,c2.globals,a,function(o){return X2.test(o)});let s={},r=Object.keys(c);for(let o=0;o<r.length;o++){let f=r[o];e[f]=K2(c2.namespaces[f],c[f],l.bundle),s[f]=e[f]}let i=Object.keys(a);for(let o=0;o<i.length;o++){let f=i[o];b[f]=K2(c2.globals[f],a[f],l.bundle)}return s}var a2=globalThis,l2=a2.ShadowRoot&&(a2.ShadyCSS===void 0||a2.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,h2=Symbol(),J2=new WeakMap,W=class{constructor(c,a,e){if(this._$cssResult$=!0,e!==h2)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=c,this.t=a}get styleSheet(){let c=this.o,a=this.t;if(l2&&c===void 0){let e=a!==void 0&&a.length===1;e&&(c=J2.get(a)),c===void 0&&((this.o=c=new CSSStyleSheet).replaceSync(this.cssText),e&&J2.set(a,c))}return c}toString(){return this.cssText}},Y2=l=>new W(typeof l=="string"?l:l+"",void 0,h2),B=(l,...c)=>{let a=l.length===1?l[0]:c.reduce((e,s,r)=>e+(i=>{if(i._$cssResult$===!0)return i.cssText;if(typeof i=="number")return i;throw Error("Value passed to 'css' function must be a 'css' function result: "+i+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+l[r+1],l[0]);return new W(a,l,h2)},Z2=(l,c)=>{if(l2)l.adoptedStyleSheets=c.map(a=>a instanceof CSSStyleSheet?a:a.styleSheet);else for(let a of c){let e=document.createElement("style"),s=a2.litNonce;s!==void 0&&e.setAttribute("nonce",s),e.textContent=a.cssText,l.appendChild(e)}},C2=l2?l=>l:l=>l instanceof CSSStyleSheet?(c=>{let a="";for(let e of c.cssRules)a+=e.cssText;return Y2(a)})(l):l;var{is:C3,defineProperty:g3,getOwnPropertyDescriptor:x3,getOwnPropertyNames:S3,getOwnPropertySymbols:N3,getPrototypeOf:b3}=Object,e2=globalThis,c1=e2.trustedTypes,w3=c1?c1.emptyScript:"",k3=e2.reactiveElementPolyfillSupport,I=(l,c)=>l,O={toAttribute(l,c){switch(c){case Boolean:l=l?w3:null;break;case Object:case Array:l=l==null?l:JSON.stringify(l)}return l},fromAttribute(l,c){let a=l;switch(c){case Boolean:a=l!==null;break;case Number:a=l===null?null:Number(l);break;case Object:case Array:try{a=JSON.parse(l)}catch{a=null}}return a}},s2=(l,c)=>!C3(l,c),a1={attribute:!0,type:String,converter:O,reflect:!1,useDefault:!1,hasChanged:s2};Symbol.metadata??=Symbol("metadata"),e2.litPropertyMetadata??=new WeakMap;var w=class extends HTMLElement{static addInitializer(c){this._$Ei(),(this.l??=[]).push(c)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(c,a=a1){if(a.state&&(a.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(c)&&((a=Object.create(a)).wrapped=!0),this.elementProperties.set(c,a),!a.noAccessor){let e=Symbol(),s=this.getPropertyDescriptor(c,e,a);s!==void 0&&g3(this.prototype,c,s)}}static getPropertyDescriptor(c,a,e){let{get:s,set:r}=x3(this.prototype,c)??{get(){return this[a]},set(i){this[a]=i}};return{get:s,set(i){let o=s?.call(this);r?.call(this,i),this.requestUpdate(c,o,e)},configurable:!0,enumerable:!0}}static getPropertyOptions(c){return this.elementProperties.get(c)??a1}static _$Ei(){if(this.hasOwnProperty(I("elementProperties")))return;let c=b3(this);c.finalize(),c.l!==void 0&&(this.l=[...c.l]),this.elementProperties=new Map(c.elementProperties)}static finalize(){if(this.hasOwnProperty(I("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(I("properties"))){let a=this.properties,e=[...S3(a),...N3(a)];for(let s of e)this.createProperty(s,a[s])}let c=this[Symbol.metadata];if(c!==null){let a=litPropertyMetadata.get(c);if(a!==void 0)for(let[e,s]of a)this.elementProperties.set(e,s)}this._$Eh=new Map;for(let[a,e]of this.elementProperties){let s=this._$Eu(a,e);s!==void 0&&this._$Eh.set(s,a)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(c){let a=[];if(Array.isArray(c)){let e=new Set(c.flat(1/0).reverse());for(let s of e)a.unshift(C2(s))}else c!==void 0&&a.push(C2(c));return a}static _$Eu(c,a){let e=a.attribute;return e===!1?void 0:typeof e=="string"?e:typeof c=="string"?c.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(c=>this.enableUpdating=c),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(c=>c(this))}addController(c){(this._$EO??=new Set).add(c),this.renderRoot!==void 0&&this.isConnected&&c.hostConnected?.()}removeController(c){this._$EO?.delete(c)}_$E_(){let c=new Map,a=this.constructor.elementProperties;for(let e of a.keys())this.hasOwnProperty(e)&&(c.set(e,this[e]),delete this[e]);c.size>0&&(this._$Ep=c)}createRenderRoot(){let c=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Z2(c,this.constructor.elementStyles),c}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(c=>c.hostConnected?.())}enableUpdating(c){}disconnectedCallback(){this._$EO?.forEach(c=>c.hostDisconnected?.())}attributeChangedCallback(c,a,e){this._$AK(c,e)}_$ET(c,a){let e=this.constructor.elementProperties.get(c),s=this.constructor._$Eu(c,e);if(s!==void 0&&e.reflect===!0){let r=(e.converter?.toAttribute!==void 0?e.converter:O).toAttribute(a,e.type);this._$Em=c,r==null?this.removeAttribute(s):this.setAttribute(s,r),this._$Em=null}}_$AK(c,a){let e=this.constructor,s=e._$Eh.get(c);if(s!==void 0&&this._$Em!==s){let r=e.getPropertyOptions(s),i=typeof r.converter=="function"?{fromAttribute:r.converter}:r.converter?.fromAttribute!==void 0?r.converter:O;this._$Em=s;let o=i.fromAttribute(a,r.type);this[s]=o??this._$Ej?.get(s)??o,this._$Em=null}}requestUpdate(c,a,e,s=!1,r){if(c!==void 0){let i=this.constructor;if(s===!1&&(r=this[c]),e??=i.getPropertyOptions(c),!((e.hasChanged??s2)(r,a)||e.useDefault&&e.reflect&&r===this._$Ej?.get(c)&&!this.hasAttribute(i._$Eu(c,e))))return;this.C(c,a,e)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(c,a,{useDefault:e,reflect:s,wrapped:r},i){e&&!(this._$Ej??=new Map).has(c)&&(this._$Ej.set(c,i??a??this[c]),r!==!0||i!==void 0)||(this._$AL.has(c)||(this.hasUpdated||e||(a=void 0),this._$AL.set(c,a)),s===!0&&this._$Em!==c&&(this._$Eq??=new Set).add(c))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(a){Promise.reject(a)}let c=this.scheduleUpdate();return c!=null&&await c,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[s,r]of this._$Ep)this[s]=r;this._$Ep=void 0}let e=this.constructor.elementProperties;if(e.size>0)for(let[s,r]of e){let{wrapped:i}=r,o=this[s];i!==!0||this._$AL.has(s)||o===void 0||this.C(s,void 0,r,o)}}let c=!1,a=this._$AL;try{c=this.shouldUpdate(a),c?(this.willUpdate(a),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(a)):this._$EM()}catch(e){throw c=!1,this._$EM(),e}c&&this._$AE(a)}willUpdate(c){}_$AE(c){this._$EO?.forEach(a=>a.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(c)),this.updated(c)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(c){return!0}update(c){this._$Eq&&=this._$Eq.forEach(a=>this._$ET(a,this[a])),this._$EM()}updated(c){}firstUpdated(c){}};w.elementStyles=[],w.shadowRootOptions={mode:"open"},w[I("elementProperties")]=new Map,w[I("finalized")]=new Map,k3?.({ReactiveElement:w}),(e2.reactiveElementVersions??=[]).push("2.1.2");var x2=globalThis,l1=l=>l,r2=x2.trustedTypes,e1=r2?r2.createPolicy("lit-html",{createHTML:l=>l}):void 0,S2="$lit$",k=`lit$${Math.random().toFixed(9).slice(2)}$`,N2="?"+k,y3=`<${N2}>`,E=document,j=()=>E.createComment(""),K=l=>l===null||typeof l!="object"&&typeof l!="function",b2=Array.isArray,n1=l=>b2(l)||typeof l?.[Symbol.iterator]=="function",g2=`[ 	
\f\r]`,V=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,s1=/-->/g,r1=/>/g,F=RegExp(`>|${g2}(?:([^\\s"'>=/]+)(${g2}*=${g2}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),i1=/'/g,f1=/"/g,t1=/^(?:script|style|textarea|title)$/i,w2=l=>(c,...a)=>({_$litType$:l,strings:c,values:a}),h=w2(1),Z3=w2(2),c0=w2(3),y=Symbol.for("lit-noChange"),d=Symbol.for("lit-nothing"),o1=new WeakMap,H=E.createTreeWalker(E,129);function z1(l,c){if(!b2(l)||!l.hasOwnProperty("raw"))throw Error("invalid template strings array");return e1!==void 0?e1.createHTML(c):c}var m1=(l,c)=>{let a=l.length-1,e=[],s,r=c===2?"<svg>":c===3?"<math>":"",i=V;for(let o=0;o<a;o++){let f=l[o],t,M,n=-1,z=0;for(;z<f.length&&(i.lastIndex=z,M=i.exec(f),M!==null);)z=i.lastIndex,i===V?M[1]==="!--"?i=s1:M[1]!==void 0?i=r1:M[2]!==void 0?(t1.test(M[2])&&(s=RegExp("</"+M[2],"g")),i=F):M[3]!==void 0&&(i=F):i===F?M[0]===">"?(i=s??V,n=-1):M[1]===void 0?n=-2:(n=i.lastIndex-M[2].length,t=M[1],i=M[3]===void 0?F:M[3]==='"'?f1:i1):i===f1||i===i1?i=F:i===s1||i===r1?i=V:(i=F,s=void 0);let m=i===F&&l[o+1].startsWith("/>")?" ":"";r+=i===V?f+y3:n>=0?(e.push(t),f.slice(0,n)+S2+f.slice(n)+k+m):f+k+(n===-2?o:m)}return[z1(l,r+(l[a]||"<?>")+(c===2?"</svg>":c===3?"</math>":"")),e]},X=class l{constructor({strings:c,_$litType$:a},e){let s;this.parts=[];let r=0,i=0,o=c.length-1,f=this.parts,[t,M]=m1(c,a);if(this.el=l.createElement(t,e),H.currentNode=this.el.content,a===2||a===3){let n=this.el.content.firstChild;n.replaceWith(...n.childNodes)}for(;(s=H.nextNode())!==null&&f.length<o;){if(s.nodeType===1){if(s.hasAttributes())for(let n of s.getAttributeNames())if(n.endsWith(S2)){let z=M[i++],m=s.getAttribute(n).split(k),v=/([.?@])?(.*)/.exec(z);f.push({type:1,index:r,name:v[2],strings:m,ctor:v[1]==="."?f2:v[1]==="?"?o2:v[1]==="@"?n2:D}),s.removeAttribute(n)}else n.startsWith(k)&&(f.push({type:6,index:r}),s.removeAttribute(n));if(t1.test(s.tagName)){let n=s.textContent.split(k),z=n.length-1;if(z>0){s.textContent=r2?r2.emptyScript:"";for(let m=0;m<z;m++)s.append(n[m],j()),H.nextNode(),f.push({type:2,index:++r});s.append(n[z],j())}}}else if(s.nodeType===8)if(s.data===N2)f.push({type:2,index:r});else{let n=-1;for(;(n=s.data.indexOf(k,n+1))!==-1;)f.push({type:7,index:r}),n+=k.length-1}r++}}static createElement(c,a){let e=E.createElement("template");return e.innerHTML=c,e}};function R(l,c,a=l,e){if(c===y)return c;let s=e!==void 0?a._$Co?.[e]:a._$Cl,r=K(c)?void 0:c._$litDirective$;return s?.constructor!==r&&(s?._$AO?.(!1),r===void 0?s=void 0:(s=new r(l),s._$AT(l,a,e)),e!==void 0?(a._$Co??=[])[e]=s:a._$Cl=s),s!==void 0&&(c=R(l,s._$AS(l,c.values),s,e)),c}var i2=class{constructor(c,a){this._$AV=[],this._$AN=void 0,this._$AD=c,this._$AM=a}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(c){let{el:{content:a},parts:e}=this._$AD,s=(c?.creationScope??E).importNode(a,!0);H.currentNode=s;let r=H.nextNode(),i=0,o=0,f=e[0];for(;f!==void 0;){if(i===f.index){let t;f.type===2?t=new _(r,r.nextSibling,this,c):f.type===1?t=new f.ctor(r,f.name,f.strings,this,c):f.type===6&&(t=new t2(r,this,c)),this._$AV.push(t),f=e[++o]}i!==f?.index&&(r=H.nextNode(),i++)}return H.currentNode=E,s}p(c){let a=0;for(let e of this._$AV)e!==void 0&&(e.strings!==void 0?(e._$AI(c,e,a),a+=e.strings.length-2):e._$AI(c[a])),a++}},_=class l{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(c,a,e,s){this.type=2,this._$AH=d,this._$AN=void 0,this._$AA=c,this._$AB=a,this._$AM=e,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let c=this._$AA.parentNode,a=this._$AM;return a!==void 0&&c?.nodeType===11&&(c=a.parentNode),c}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(c,a=this){c=R(this,c,a),K(c)?c===d||c==null||c===""?(this._$AH!==d&&this._$AR(),this._$AH=d):c!==this._$AH&&c!==y&&this._(c):c._$litType$!==void 0?this.$(c):c.nodeType!==void 0?this.T(c):n1(c)?this.k(c):this._(c)}O(c){return this._$AA.parentNode.insertBefore(c,this._$AB)}T(c){this._$AH!==c&&(this._$AR(),this._$AH=this.O(c))}_(c){this._$AH!==d&&K(this._$AH)?this._$AA.nextSibling.data=c:this.T(E.createTextNode(c)),this._$AH=c}$(c){let{values:a,_$litType$:e}=c,s=typeof e=="number"?this._$AC(c):(e.el===void 0&&(e.el=X.createElement(z1(e.h,e.h[0]),this.options)),e);if(this._$AH?._$AD===s)this._$AH.p(a);else{let r=new i2(s,this),i=r.u(this.options);r.p(a),this.T(i),this._$AH=r}}_$AC(c){let a=o1.get(c.strings);return a===void 0&&o1.set(c.strings,a=new X(c)),a}k(c){b2(this._$AH)||(this._$AH=[],this._$AR());let a=this._$AH,e,s=0;for(let r of c)s===a.length?a.push(e=new l(this.O(j()),this.O(j()),this,this.options)):e=a[s],e._$AI(r),s++;s<a.length&&(this._$AR(e&&e._$AB.nextSibling,s),a.length=s)}_$AR(c=this._$AA.nextSibling,a){for(this._$AP?.(!1,!0,a);c!==this._$AB;){let e=l1(c).nextSibling;l1(c).remove(),c=e}}setConnected(c){this._$AM===void 0&&(this._$Cv=c,this._$AP?.(c))}},D=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(c,a,e,s,r){this.type=1,this._$AH=d,this._$AN=void 0,this.element=c,this.name=a,this._$AM=s,this.options=r,e.length>2||e[0]!==""||e[1]!==""?(this._$AH=Array(e.length-1).fill(new String),this.strings=e):this._$AH=d}_$AI(c,a=this,e,s){let r=this.strings,i=!1;if(r===void 0)c=R(this,c,a,0),i=!K(c)||c!==this._$AH&&c!==y,i&&(this._$AH=c);else{let o=c,f,t;for(c=r[0],f=0;f<r.length-1;f++)t=R(this,o[e+f],a,f),t===y&&(t=this._$AH[f]),i||=!K(t)||t!==this._$AH[f],t===d?c=d:c!==d&&(c+=(t??"")+r[f+1]),this._$AH[f]=t}i&&!s&&this.j(c)}j(c){c===d?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,c??"")}},f2=class extends D{constructor(){super(...arguments),this.type=3}j(c){this.element[this.name]=c===d?void 0:c}},o2=class extends D{constructor(){super(...arguments),this.type=4}j(c){this.element.toggleAttribute(this.name,!!c&&c!==d)}},n2=class extends D{constructor(c,a,e,s,r){super(c,a,e,s,r),this.type=5}_$AI(c,a=this){if((c=R(this,c,a,0)??d)===y)return;let e=this._$AH,s=c===d&&e!==d||c.capture!==e.capture||c.once!==e.once||c.passive!==e.passive,r=c!==d&&(e===d||s);s&&this.element.removeEventListener(this.name,this,e),r&&this.element.addEventListener(this.name,this,c),this._$AH=c}handleEvent(c){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,c):this._$AH.handleEvent(c)}},t2=class{constructor(c,a,e){this.element=c,this.type=6,this._$AN=void 0,this._$AM=a,this.options=e}get _$AU(){return this._$AM._$AU}_$AI(c){R(this,c)}},p1={M:S2,P:k,A:N2,C:1,L:m1,R:i2,D:n1,V:R,I:_,H:D,N:o2,U:n2,B:f2,F:t2},A3=x2.litHtmlPolyfillSupport;A3?.(X,_),(x2.litHtmlVersions??=[]).push("3.3.3");var M1=(l,c,a)=>{let e=a?.renderBefore??c,s=e._$litPart$;if(s===void 0){let r=a?.renderBefore??null;e._$litPart$=s=new _(c.insertBefore(j(),r),r,void 0,a??{})}return s._$AI(l),s};var k2=globalThis,A=class extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let c=super.createRenderRoot();return this.renderOptions.renderBefore??=c.firstChild,c}update(c){let a=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(c),this._$Do=M1(a,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return y}};A._$litElement$=!0,A.finalized=!0,k2.litElementHydrateSupport?.({LitElement:A});var T3=k2.litElementPolyfillSupport;T3?.({LitElement:A});(k2.litElementVersions??=[]).push("4.2.2");var L1=(l,c)=>{customElements.get(l)||customElements.define(l,c)},z2=l=>(c,a)=>{a!==void 0?a.addInitializer(()=>{L1(l,c)}):L1(l,c)};var P3={attribute:!0,type:String,converter:O,reflect:!1,hasChanged:s2},B3=(l=P3,c,a)=>{let{kind:e,metadata:s}=a,r=globalThis.litPropertyMetadata.get(s);if(r===void 0&&globalThis.litPropertyMetadata.set(s,r=new Map),e==="setter"&&((l=Object.create(l)).wrapped=!0),r.set(a.name,l),e==="accessor"){let{name:i}=a;return{set(o){let f=c.get.call(this);c.set.call(this,o),this.requestUpdate(i,f,l,!0,o)},init(o){return o!==void 0&&this.C(i,void 0,l,o),o}}}if(e==="setter"){let{name:i}=a;return function(o){let f=this[i];c.call(this,o),this.requestUpdate(i,f,l,!0,o)}}throw Error("Unsupported decorator location: "+e)};function x(l){return(c,a)=>typeof a=="object"?B3(l,c,a):((e,s,r)=>{let i=s.hasOwnProperty(r);return s.constructor.createProperty(r,e),i?Object.getOwnPropertyDescriptor(s,r):void 0})(l,c,a)}function d1(l){return x({...l,state:!0,attribute:!1})}var U=(l,c,a)=>(a.configurable=!0,a.enumerable=!0,Reflect.decorate&&typeof c!="object"&&Object.defineProperty(l,c,a),a);function u1(l,c){return(a,e,s)=>{let r=i=>i.renderRoot?.querySelector(l)??null;if(c){let{get:i,set:o}=typeof e=="object"?a:s??(()=>{let f=Symbol();return{get(){return this[f]},set(t){this[f]=t}}})();return U(a,e,{get(){let f=i.call(this);return f===void 0&&(f=r(this),(f!==null||this.hasUpdated)&&o.call(this,f)),f}})}return U(a,e,{get(){return r(this)}})}}var v1={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},h1=l=>(...c)=>({_$litDirective$:l,values:c}),m2=class{constructor(c){}get _$AU(){return this._$AM._$AU}_$AT(c,a,e){this._$Ct=c,this._$AM=a,this._$Ci=e}_$AS(c,a){return this.update(c,a)}update(c,a){return this.render(...a)}};var{I:F3}=p1,C1=l=>l;var g1=()=>document.createComment(""),$=(l,c,a)=>{let e=l._$AA.parentNode,s=c===void 0?l._$AB:c._$AA;if(a===void 0){let r=e.insertBefore(g1(),s),i=e.insertBefore(g1(),s);a=new F3(r,i,l,l.options)}else{let r=a._$AB.nextSibling,i=a._$AM,o=i!==l;if(o){let f;a._$AQ?.(l),a._$AM=l,a._$AP!==void 0&&(f=l._$AU)!==i._$AU&&a._$AP(f)}if(r!==s||o){let f=a._$AA;for(;f!==r;){let t=C1(f).nextSibling;C1(e).insertBefore(f,s),f=t}}}return a},T=(l,c,a=l)=>(l._$AI(c,a),l),H3={},x1=(l,c=H3)=>l._$AH=c,S1=l=>l._$AH,p2=l=>{l._$AR(),l._$AA.remove()};var N1=(l,c,a)=>{let e=new Map;for(let s=c;s<=a;s++)e.set(l[s],s);return e},b1=h1(class extends m2{constructor(l){if(super(l),l.type!==v1.CHILD)throw Error("repeat() can only be used in text expressions")}dt(l,c,a){let e;a===void 0?a=c:c!==void 0&&(e=c);let s=[],r=[],i=0;for(let o of l)s[i]=e?e(o,i):i,r[i]=a(o,i),i++;return{values:r,keys:s}}render(l,c,a){return this.dt(l,c,a).values}update(l,[c,a,e]){let s=S1(l),{values:r,keys:i}=this.dt(c,a,e);if(!Array.isArray(s))return this.ut=i,r;let o=this.ut??=[],f=[],t,M,n=0,z=s.length-1,m=0,v=r.length-1;for(;n<=z&&m<=v;)if(s[n]===null)n++;else if(s[z]===null)z--;else if(o[n]===i[m])f[m]=T(s[n],r[m]),n++,m++;else if(o[z]===i[v])f[v]=T(s[z],r[v]),z--,v--;else if(o[n]===i[v])f[v]=T(s[n],r[v]),$(l,f[v+1],s[n]),n++,v--;else if(o[z]===i[m])f[m]=T(s[z],r[m]),$(l,s[n],s[z]),z--,m++;else if(t===void 0&&(t=N1(i,m,v),M=N1(o,n,z)),t.has(o[n]))if(t.has(o[z])){let S=M.get(i[m]),P=S!==void 0?s[S]:null;if(P===null){let J=$(l,s[n]);T(J,r[m]),f[m]=J}else f[m]=T(P,r[m]),$(l,s[n],P),s[S]=null;m++}else p2(s[z]),z--;else p2(s[n]),n++;for(;m<=v;){let S=$(l,f[v+1]);T(S,r[m]),f[m++]=S}for(;n<=z;){let S=s[n++];S!==null&&p2(S)}return this.ut=i,x1(l,f),y}});var y2=B`
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
`;var w1="data-dc-tokens",E3={"--dc-primary-color":"#2563eb","--dc-primary-hover":"#1d4ed8","--dc-primary-text":"#ffffff","--dc-primary-soft":"#eaf1fe","--dc-bg-color":"#ffffff","--dc-surface-color":"#f7f8fa","--dc-surface-2":"#eef0f4","--dc-border-color":"#ebedf0","--dc-text-color":"#1a1d21","--dc-text-muted":"#5c6370","--dc-text-light":"#646b78","--dc-agent-bubble-bg":"#f1f3f6","--dc-agent-bubble-text":"#1a1d21","--dc-visitor-bubble-bg":"var(--dc-primary-color)","--dc-visitor-bubble-text":"var(--dc-primary-text)","--dc-online":"#22c55e","--dc-online-soft":"#e7f8ed","--dc-online-text":"#15803d","--dc-danger":"#ef4444","--dc-danger-soft":"#fdecec","--dc-danger-text":"#b91c1c","--dc-warning":"#f59e0b","--dc-warning-soft":"#fef3e2","--dc-warning-text":"#b45309","--dc-info":"#0ea5e9","--dc-info-soft":"#e6f6fe","--dc-info-text":"#0369a1","--dc-shadow":"0 8px 24px rgba(15, 23, 42, 0.08)","--dc-shadow-sm":"0 1px 2px rgba(15, 23, 42, 0.06)","--dc-radius":"12px","--dc-radius-sm":"8px","--dc-radius-bubble":"12px","--dc-font-family":'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',"--dc-font-size":"14px","--dc-font-size-sm":"12px","--dc-font-size-xs":"11px","--dc-transition":"0.15s ease","--dc-ease-panel":"cubic-bezier(0.16, 1, 0.3, 1)"},R3={"--dc-primary-color":"#60a5fa","--dc-primary-hover":"#93c5fd","--dc-primary-text":"#0f172a","--dc-primary-soft":"#1e2a44","--dc-bg-color":"#0f1419","--dc-surface-color":"#1a1f26","--dc-surface-2":"#242b33","--dc-border-color":"#2e3640","--dc-text-color":"#f3f4f6","--dc-text-muted":"#aab2bd","--dc-text-light":"#959ca6","--dc-agent-bubble-bg":"#2e3138","--dc-agent-bubble-text":"#f3f4f6","--dc-online-soft":"#14321f","--dc-online-text":"#4ade80","--dc-danger-soft":"#3a1d1d","--dc-danger-text":"#fca5a5","--dc-warning-soft":"#3a2c12","--dc-warning-text":"#fcd34d","--dc-info-soft":"#12303d","--dc-info-text":"#7dd3fc"};function k1(l,c){let a=Object.keys(c),e="";for(let s=0;s<a.length;s++)e+=a[s]+":"+c[a[s]]+";";return l+"{"+e+"}"}var D3=k1(":where(:root)",E3)+k1(':where([data-dc-theme="dark"])',R3);function A2(l){let c=l||(typeof document<"u"?document:null);if(!c||!c.head||typeof c.createElement!="function"||c.querySelector("style["+w1+"]"))return!1;let a=c.createElement("style");return a.setAttribute(w1,""),a.textContent=D3,c.head.insertBefore(a,c.head.firstChild),!0}var N=class extends A{connectedCallback(){A2(this.ownerDocument),super.connectedCallback()}announce(c){let a=this.renderRoot?.querySelector("[data-dc-live]");a||(a=document.createElement("div"),a.setAttribute("data-dc-live",""),a.setAttribute("aria-live","polite"),a.setAttribute("role","status"),a.style.cssText="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;",this.renderRoot?.appendChild(a)),a.textContent="",requestAnimationFrame(()=>{a&&(a.textContent=c)})}};N.styles=y2;var U3={reconnecting:{tone:"warning",text:"Reconnecting\u2026 live updates will resume automatically.",spinner:!0},offline:{tone:"danger",text:"You're offline. We'll reconnect and sync as soon as your connection returns."},"other-tab":{tone:"info",text:"This session is active in another tab. Calls and the dialer run there.",action:"Use it here",event:"dc-resume-here"},"session-expiring":{tone:"warning",text:"Your secure session expires soon.",action:"Stay signed in",event:"dc-refresh-session"},"session-expired":{tone:"danger",text:"Your session expired for security. Sign in again to continue.",action:"Sign in",event:"dc-reauth"}},q=class extends N{constructor(){super(...arguments);this.kind="reconnecting"}render(){let a=U3[this.kind],e=a.tone==="danger"?"alert":"status";return h`
      <div class="banner ${a.tone}" role=${e}>
        ${a.spinner?h`<span class="spin"></span>`:h`<span class="dot"></span>`}
        <span class="txt">${a.text}</span>
        ${a.action?h`<button class="act" @click=${()=>this.emit(a.event??"dc-action")}>${a.action}</button>`:d}
      </div>
    `}emit(a){this.dispatchEvent(new CustomEvent(a,{bubbles:!0,composed:!0}))}};q.styles=[N.styles,B`
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
    `],C([x({type:String})],q.prototype,"kind",2),q=C([z2("dc-system-banner")],q);var y1={prefix:"far",iconName:"circle",icon:[512,512,[128308,128309,128992,128993,128994,128995,128996,9679,9898,9899,11044,61708,61915],"f111","M464 256a208 208 0 1 0 -416 0 208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0 256 256 0 1 1 -512 0z"]};var A1={prefix:"fas",iconName:"minus",icon:[448,512,[8211,8722,10134,"subtract"],"f068","M0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32z"]};var T1={prefix:"fas",iconName:"microphone-slash",icon:[576,512,[],"f131","M41-24.9c-9.4-9.4-24.6-9.4-33.9 0S-2.3-.3 7 9.1l528 528c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9L424.7 358.8C458.9 324.2 480 276.6 480 224l0-40c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 40c0 39.3-15.7 74.9-41.3 100.9L356.8 291C373.6 273.7 384 250 384 224l0-128c0-53-43-96-96-96s-96 43-96 96l0 30.2-151-151zm298.3 434l-41.4-41.4c-3.3 .2-6.5 .3-9.8 .3-79.5 0-144-64.5-144-144l0-10.2-43.6-43.6c-2.8 3.9-4.4 8.7-4.4 13.8l0 40c0 97.9 73.3 178.7 168 190.5l0 49.5-48 0c-13.3 0-24 10.7-24 24s10.7 24 24 24l144 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-48 0 0-49.5c9.3-1.2 18.4-3 27.3-5.4z"]};var P1={prefix:"fas",iconName:"comment-sms",icon:[512,512,["sms"],"f7cd","M256 480c141.4 0 256-107.5 256-240S397.4 0 256 0 0 107.5 0 240c0 54.3 19.2 104.3 51.6 144.5L2.8 476.8c-4.8 9-3.3 20 3.6 27.5s17.8 9.8 27.1 5.8l118.4-50.7C183.7 472.6 218.9 480 256 480zM140.8 172.8l19.2 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-19.2 0c-5.3 0-9.6 4.3-9.6 9.6s4.3 9.6 9.6 9.6c23 0 41.6 18.6 41.6 41.6s-18.6 41.6-41.6 41.6l-25.6 0c-8.8 0-16-7.2-16-16s7.2-16 16-16l25.6 0c5.3 0 9.6-4.3 9.6-9.6s-4.3-9.6-9.6-9.6c-23 0-41.6-18.6-41.6-41.6s18.6-41.6 41.6-41.6zm188.8 41.6c0-23 18.6-41.6 41.6-41.6l19.2 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-19.2 0c-5.3 0-9.6 4.3-9.6 9.6s4.3 9.6 9.6 9.6c23 0 41.6 18.6 41.6 41.6s-18.6 41.6-41.6 41.6l-25.6 0c-8.8 0-16-7.2-16-16s7.2-16 16-16l25.6 0c5.3 0 9.6-4.3 9.6-9.6s-4.3-9.6-9.6-9.6c-23 0-41.6-18.6-41.6-41.6zm-98.3-33.8l24.7 41.1 24.7-41.1c3.7-6.2 11.1-9.1 18-7.2s11.7 8.2 11.7 15.4l0 102.4c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-44.6-8.7 14.5c-2.9 4.8-8.1 7.8-13.7 7.8s-10.8-3-13.7-7.8l-8.7-14.5 0 44.6c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-102.4c0-7.2 4.8-13.5 11.7-15.4s14.3 1 18 7.2z"]};var B1={prefix:"fas",iconName:"envelope",icon:[512,512,[128386,9993,61443],"f0e0","M48 64c-26.5 0-48 21.5-48 48 0 15.1 7.1 29.3 19.2 38.4l208 156c17.1 12.8 40.5 12.8 57.6 0l208-156c12.1-9.1 19.2-23.3 19.2-38.4 0-26.5-21.5-48-48-48L48 64zM0 196L0 384c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-188-198.4 148.8c-34.1 25.6-81.1 25.6-115.2 0L0 196z"]};var F1={prefix:"fas",iconName:"bell",icon:[448,512,[128276,61602],"f0f3","M224 0c-17.7 0-32 14.3-32 32l0 3.2C119 50 64 114.6 64 192l0 21.7c0 48.1-16.4 94.8-46.4 132.4L7.8 358.3C2.7 364.6 0 372.4 0 380.5 0 400.1 15.9 416 35.5 416l376.9 0c19.6 0 35.5-15.9 35.5-35.5 0-8.1-2.7-15.9-7.8-22.2l-9.8-12.2C400.4 308.5 384 261.8 384 213.7l0-21.7c0-77.4-55-142-128-156.8l0-3.2c0-17.7-14.3-32-32-32zM162 464c7.1 27.6 32.2 48 62 48s54.9-20.4 62-48l-124 0z"]};var H1={prefix:"fas",iconName:"calendar-days",icon:[448,512,["calendar-alt"],"f073","M128 0c17.7 0 32 14.3 32 32l0 32 128 0 0-32c0-17.7 14.3-32 32-32s32 14.3 32 32l0 32 32 0c35.3 0 64 28.7 64 64l0 288c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64L0 128C0 92.7 28.7 64 64 64l32 0 0-32c0-17.7 14.3-32 32-32zM64 240l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm128 0l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0zM64 368l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0zm112 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16z"]};var E1={prefix:"fas",iconName:"ellipsis",icon:[448,512,["ellipsis-h"],"f141","M0 256a56 56 0 1 1 112 0 56 56 0 1 1 -112 0zm168 0a56 56 0 1 1 112 0 56 56 0 1 1 -112 0zm224-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112z"]};var R1={prefix:"fas",iconName:"magnifying-glass",icon:[512,512,[128269,"search"],"f002","M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376C296.3 401.1 253.9 416 208 416 93.1 416 0 322.9 0 208S93.1 0 208 0 416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"]};var D1={prefix:"fas",iconName:"ban",icon:[512,512,[128683,"cancel"],"f05e","M367.2 412.5L99.5 144.8c-22.4 31.4-35.5 69.8-35.5 111.2 0 106 86 192 192 192 41.5 0 79.9-13.1 111.2-35.5zm45.3-45.3c22.4-31.4 35.5-69.8 35.5-111.2 0-106-86-192-192-192-41.5 0-79.9 13.1-111.2 35.5L412.5 367.2zM0 256a256 256 0 1 1 512 0 256 256 0 1 1 -512 0z"]};var U1={prefix:"fas",iconName:"record-vinyl",icon:[512,512,[],"f8d9","M0 256a256 256 0 1 1 512 0 256 256 0 1 1 -512 0zm256-96a96 96 0 1 1 0 192 96 96 0 1 1 0-192zm0 240a144 144 0 1 0 0-288 144 144 0 1 0 0 288zm0-112a32 32 0 1 0 0-64 32 32 0 1 0 0 64z"]};var q1={prefix:"fas",iconName:"palette",icon:[512,512,[127912],"f53f","M512 256c0 .9 0 1.8 0 2.7-.4 36.5-33.6 61.3-70.1 61.3L344 320c-26.5 0-48 21.5-48 48 0 3.4 .4 6.7 1 9.9 2.1 10.2 6.5 20 10.8 29.9 6.1 13.8 12.1 27.5 12.1 42 0 31.8-21.6 60.7-53.4 62-3.5 .1-7 .2-10.6 .2-141.4 0-256-114.6-256-256S114.6 0 256 0 512 114.6 512 256zM128 288a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm0-96a32 32 0 1 0 0-64 32 32 0 1 0 0 64zM288 96a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm96 96a32 32 0 1 0 0-64 32 32 0 1 0 0 64z"]};var _1={prefix:"fas",iconName:"sitemap",icon:[512,512,[],"f0e8","M192 64c0-17.7 14.3-32 32-32l64 0c17.7 0 32 14.3 32 32l0 64c0 17.7-14.3 32-32 32l-8 0 0 64 120 0c39.8 0 72 32.2 72 72l0 56 8 0c17.7 0 32 14.3 32 32l0 64c0 17.7-14.3 32-32 32l-64 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l8 0 0-56c0-13.3-10.7-24-24-24l-120 0 0 80 8 0c17.7 0 32 14.3 32 32l0 64c0 17.7-14.3 32-32 32l-64 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l8 0 0-80-120 0c-13.3 0-24 10.7-24 24l0 56 8 0c17.7 0 32 14.3 32 32l0 64c0 17.7-14.3 32-32 32l-64 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l8 0 0-56c0-39.8 32.2-72 72-72l120 0 0-64-8 0c-17.7 0-32-14.3-32-32l0-64z"]};var $1={prefix:"fas",iconName:"fax",icon:[512,512,[128224,128439],"f1ac","M160 64l0 80 64 0 0-80 146.7 0 45.3 45.3 0 34.7 64 0 0-34.7c0-17-6.7-33.3-18.7-45.3L416 18.7C404 6.7 387.7 0 370.7 0L224 0c-35.3 0-64 28.7-64 64zM32 128c-17.7 0-32 14.3-32 32L0 448c0 17.7 14.3 32 32 32l48 0c17.7 0 32-14.3 32-32l0-288c0-17.7-14.3-32-32-32l-48 0zm448 64l-320 0 0 256c0 17.7 14.3 32 32 32l288 0c17.7 0 32-14.3 32-32l0-224c0-17.7-14.3-32-32-32zM224 288a24 24 0 1 1 48 0 24 24 0 1 1 -48 0zm0 96a24 24 0 1 1 48 0 24 24 0 1 1 -48 0zM336 264a24 24 0 1 1 0 48 24 24 0 1 1 0-48zM312 384a24 24 0 1 1 48 0 24 24 0 1 1 -48 0zM424 264a24 24 0 1 1 0 48 24 24 0 1 1 0-48zM400 384a24 24 0 1 1 48 0 24 24 0 1 1 -48 0z"]};var G1={prefix:"fas",iconName:"expand",icon:[448,512,[],"f065","M32 32C14.3 32 0 46.3 0 64l0 96c0 17.7 14.3 32 32 32s32-14.3 32-32l0-64 64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L32 32zM64 352c0-17.7-14.3-32-32-32S0 334.3 0 352l0 96c0 17.7 14.3 32 32 32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0 0-64zM320 32c-17.7 0-32 14.3-32 32s14.3 32 32 32l64 0 0 64c0 17.7 14.3 32 32 32s32-14.3 32-32l0-96c0-17.7-14.3-32-32-32l-96 0zM448 352c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 64-64 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l96 0c17.7 0 32-14.3 32-32l0-96z"]};var W1={prefix:"fas",iconName:"table-columns",icon:[448,512,["columns"],"f0db","M0 96C0 60.7 28.7 32 64 32l320 0c35.3 0 64 28.7 64 64l0 320c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64L0 96zm64 64l0 256 128 0 0-256-128 0zm320 0l-128 0 0 256 128 0 0-256z"]};var I1={prefix:"fas",iconName:"stop",icon:[448,512,[9209],"f04d","M64 32l320 0c35.3 0 64 28.7 64 64l0 320c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64L0 96C0 60.7 28.7 32 64 32z"]};var O1={prefix:"fas",iconName:"clock",icon:[512,512,[128339,"clock-four"],"f017","M256 0a256 256 0 1 1 0 512 256 256 0 1 1 0-512zM232 120l0 136c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2 280 120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"]};var V1={prefix:"fas",iconName:"rocket",icon:[512,512,[],"f135","M128 320L24.5 320c-24.9 0-40.2-27.1-27.4-48.5L50 183.3C58.7 168.8 74.3 160 91.2 160l95 0c76.1-128.9 189.6-135.4 265.5-124.3 12.8 1.9 22.8 11.9 24.6 24.6 11.1 75.9 4.6 189.4-124.3 265.5l0 95c0 16.9-8.8 32.5-23.3 41.2l-88.2 52.9c-21.3 12.8-48.5-2.6-48.5-27.4L192 384c0-35.3-28.7-64-64-64l-.1 0zM400 160a48 48 0 1 0 -96 0 48 48 0 1 0 96 0z"]};var j1={prefix:"fas",iconName:"paper-plane",icon:[576,512,[61913],"f1d8","M536.4-26.3c9.8-3.5 20.6-1 28 6.3s9.8 18.2 6.3 28l-178 496.9c-5 13.9-18.1 23.1-32.8 23.1-14.2 0-27-8.6-32.3-21.7l-64.2-158c-4.5-11-2.5-23.6 5.2-32.6l94.5-112.4c5.1-6.1 4.7-15-.9-20.6s-14.6-6-20.6-.9L229.2 276.1c-9.1 7.6-21.6 9.6-32.6 5.2L38.1 216.8c-13.1-5.3-21.7-18.1-21.7-32.3 0-14.7 9.2-27.8 23.1-32.8l496.9-178z"]};var K1={prefix:"fas",iconName:"fire",icon:[448,512,[128293],"f06d","M160.5-26.4c9.3-7.8 23-7.5 31.9 .9 12.3 11.6 23.3 24.4 33.9 37.4 13.5 16.5 29.7 38.3 45.3 64.2 5.2-6.8 10-12.8 14.2-17.9 1.1-1.3 2.2-2.7 3.3-4.1 7.9-9.8 17.7-22.1 30.8-22.1 13.4 0 22.8 11.9 30.8 22.1 1.3 1.7 2.6 3.3 3.9 4.8 10.3 12.4 24 30.3 37.7 52.4 27.2 43.9 55.6 106.4 55.6 176.6 0 123.7-100.3 224-224 224S0 411.7 0 288c0-91.1 41.1-170 80.5-225 19.9-27.7 39.7-49.9 54.6-65.1 8.2-8.4 16.5-16.7 25.5-24.2zM225.7 416c25.3 0 47.7-7 68.8-21 42.1-29.4 53.4-88.2 28.1-134.4-4.5-9-16-9.6-22.5-2l-25.2 29.3c-6.6 7.6-18.5 7.4-24.7-.5-17.3-22.1-49.1-62.4-65.3-83-5.4-6.9-15.2-8-21.5-1.9-18.3 17.8-51.5 56.8-51.5 104.3 0 68.6 50.6 109.2 113.7 109.2z"]};var X1={prefix:"fas",iconName:"users",icon:[640,512,[],"f0c0","M320 16a104 104 0 1 1 0 208 104 104 0 1 1 0-208zM96 88a72 72 0 1 1 0 144 72 72 0 1 1 0-144zM0 416c0-70.7 57.3-128 128-128 12.8 0 25.2 1.9 36.9 5.4-32.9 36.8-52.9 85.4-52.9 138.6l0 16c0 11.4 2.4 22.2 6.7 32L32 480c-17.7 0-32-14.3-32-32l0-32zm521.3 64c4.3-9.8 6.7-20.6 6.7-32l0-16c0-53.2-20-101.8-52.9-138.6 11.7-3.5 24.1-5.4 36.9-5.4 70.7 0 128 57.3 128 128l0 32c0 17.7-14.3 32-32 32l-86.7 0zM472 160a72 72 0 1 1 144 0 72 72 0 1 1 -144 0zM160 432c0-88.4 71.6-160 160-160s160 71.6 160 160l0 16c0 17.7-14.3 32-32 32l-256 0c-17.7 0-32-14.3-32-32l0-16z"]};var Q1={prefix:"fas",iconName:"headset",icon:[448,512,[],"f590","M224 64c-79 0-144.7 57.3-157.7 132.7 9.3-3 19.3-4.7 29.7-4.7l16 0c26.5 0 48 21.5 48 48l0 96c0 26.5-21.5 48-48 48l-16 0c-53 0-96-43-96-96l0-64C0 100.3 100.3 0 224 0S448 100.3 448 224l0 168.1c0 66.3-53.8 120-120.1 120l-87.9-.1-32 0c-26.5 0-48-21.5-48-48s21.5-48 48-48l32 0c26.5 0 48 21.5 48 48l0 0 40 0c39.8 0 72-32.2 72-72l0-20.9c-14.1 8.2-30.5 12.8-48 12.8l-16 0c-26.5 0-48-21.5-48-48l0-96c0-26.5 21.5-48 48-48l16 0c10.4 0 20.3 1.6 29.7 4.7-13-75.3-78.6-132.7-157.7-132.7z"]};var J1={prefix:"fas",iconName:"voicemail",icon:[640,512,[],"f897","M144 160a80 80 0 1 1 0 160 80 80 0 1 1 0-160zM263.8 320c15.3-22.9 24.2-50.4 24.2-80 0-79.5-64.5-144-144-144S0 160.5 0 240 64.5 384 144 384l352 0c79.5 0 144-64.5 144-144S575.5 96 496 96 352 160.5 352 240c0 29.6 8.9 57.1 24.2 80l-112.5 0zM496 160a80 80 0 1 1 0 160 80 80 0 1 1 0-160z"]};var Y1={prefix:"fas",iconName:"microphone",icon:[384,512,[],"f130","M192 0C139 0 96 43 96 96l0 128c0 53 43 96 96 96s96-43 96-96l0-128c0-53-43-96-96-96zM48 184c0-13.3-10.7-24-24-24S0 170.7 0 184l0 40c0 97.9 73.3 178.7 168 190.5l0 49.5-48 0c-13.3 0-24 10.7-24 24s10.7 24 24 24l144 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-48 0 0-49.5c94.7-11.8 168-92.6 168-190.5l0-40c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 40c0 79.5-64.5 144-144 144S48 303.5 48 224l0-40z"]};var Z1={prefix:"fas",iconName:"image",icon:[448,512,[],"f03e","M64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L64 32zm64 80a48 48 0 1 1 0 96 48 48 0 1 1 0-96zM272 224c8.4 0 16.1 4.4 20.5 11.5l88 144c4.5 7.4 4.7 16.7 .5 24.3S368.7 416 360 416L88 416c-8.9 0-17.2-5-21.3-12.9s-3.5-17.5 1.6-24.8l56-80c4.5-6.4 11.8-10.2 19.7-10.2s15.2 3.8 19.7 10.2l26.4 37.8 61.4-100.5c4.4-7.1 12.1-11.5 20.5-11.5z"]};var c4={prefix:"fas",iconName:"folder",icon:[512,512,[128193,128447,61716,"folder-blank"],"f07b","M64 448l384 0c35.3 0 64-28.7 64-64l0-240c0-35.3-28.7-64-64-64L298.7 80c-6.9 0-13.7-2.2-19.2-6.4L241.1 44.8C230 36.5 216.5 32 202.7 32L64 32C28.7 32 0 60.7 0 96L0 384c0 35.3 28.7 64 64 64z"]};var a4={prefix:"fas",iconName:"cloud",icon:[576,512,[9729],"f0c2","M0 336c0 79.5 64.5 144 144 144l304 0c70.7 0 128-57.3 128-128 0-51.6-30.5-96.1-74.5-116.3 6.7-13.1 10.5-28 10.5-43.7 0-53-43-96-96-96-17.7 0-34.2 4.8-48.4 13.1-24.1-45.8-72.2-77.1-127.6-77.1-79.5 0-144 64.5-144 144 0 8 .7 15.9 1.9 23.5-56.9 19.2-97.9 73.1-97.9 136.5z"]};var l4={prefix:"fas",iconName:"link",icon:[576,512,[128279,"chain"],"f0c1","M419.5 96c-16.6 0-32.7 4.5-46.8 12.7-15.8-16-34.2-29.4-54.5-39.5 28.2-24 64.1-37.2 101.3-37.2 86.4 0 156.5 70 156.5 156.5 0 41.5-16.5 81.3-45.8 110.6l-71.1 71.1c-29.3 29.3-69.1 45.8-110.6 45.8-86.4 0-156.5-70-156.5-156.5 0-1.5 0-3 .1-4.5 .5-17.7 15.2-31.6 32.9-31.1s31.6 15.2 31.1 32.9c0 .9 0 1.8 0 2.6 0 51.1 41.4 92.5 92.5 92.5 24.5 0 48-9.7 65.4-27.1l71.1-71.1c17.3-17.3 27.1-40.9 27.1-65.4 0-51.1-41.4-92.5-92.5-92.5zM275.2 173.3c-1.9-.8-3.8-1.9-5.5-3.1-12.6-6.5-27-10.2-42.1-10.2-24.5 0-48 9.7-65.4 27.1L91.1 258.2c-17.3 17.3-27.1 40.9-27.1 65.4 0 51.1 41.4 92.5 92.5 92.5 16.5 0 32.6-4.4 46.7-12.6 15.8 16 34.2 29.4 54.6 39.5-28.2 23.9-64 37.2-101.3 37.2-86.4 0-156.5-70-156.5-156.5 0-41.5 16.5-81.3 45.8-110.6l71.1-71.1c29.3-29.3 69.1-45.8 110.6-45.8 86.6 0 156.5 70.6 156.5 156.9 0 1.3 0 2.6 0 3.9-.4 17.7-15.1 31.6-32.8 31.2s-31.6-15.1-31.2-32.8c0-.8 0-1.5 0-2.3 0-33.7-18-63.3-44.8-79.6z"]};var e4={prefix:"fas",iconName:"chart-line",icon:[512,512,["line-chart"],"f201","M64 64c0-17.7-14.3-32-32-32S0 46.3 0 64L0 400c0 44.2 35.8 80 80 80l400 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L80 416c-8.8 0-16-7.2-16-16L64 64zm406.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L320 210.7 262.6 153.4c-12.5-12.5-32.8-12.5-45.3 0l-96 96c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l73.4-73.4 57.4 57.4c12.5 12.5 32.8 12.5 45.3 0l128-128z"]};var s4={prefix:"fas",iconName:"gear",icon:[512,512,[9881,"cog"],"f013","M195.1 9.5C198.1-5.3 211.2-16 226.4-16l59.8 0c15.2 0 28.3 10.7 31.3 25.5L332 79.5c14.1 6 27.3 13.7 39.3 22.8l67.8-22.5c14.4-4.8 30.2 1.2 37.8 14.4l29.9 51.8c7.6 13.2 4.9 29.8-6.5 39.9L447 233.3c.9 7.4 1.3 15 1.3 22.7s-.5 15.3-1.3 22.7l53.4 47.5c11.4 10.1 14 26.8 6.5 39.9l-29.9 51.8c-7.6 13.1-23.4 19.2-37.8 14.4l-67.8-22.5c-12.1 9.1-25.3 16.7-39.3 22.8l-14.4 69.9c-3.1 14.9-16.2 25.5-31.3 25.5l-59.8 0c-15.2 0-28.3-10.7-31.3-25.5l-14.4-69.9c-14.1-6-27.2-13.7-39.3-22.8L73.5 432.3c-14.4 4.8-30.2-1.2-37.8-14.4L5.8 366.1c-7.6-13.2-4.9-29.8 6.5-39.9l53.4-47.5c-.9-7.4-1.3-15-1.3-22.7s.5-15.3 1.3-22.7L12.3 185.8c-11.4-10.1-14-26.8-6.5-39.9L35.7 94.1c7.6-13.2 23.4-19.2 37.8-14.4l67.8 22.5c12.1-9.1 25.3-16.7 39.3-22.8L195.1 9.5zM256.3 336a80 80 0 1 0 -.6-160 80 80 0 1 0 .6 160z"]};var r4={prefix:"fas",iconName:"up-right-and-down-left-from-center",icon:[512,512,["expand-alt"],"f424","M344 0L488 0c13.3 0 24 10.7 24 24l0 144c0 9.7-5.8 18.5-14.8 22.2s-19.3 1.7-26.2-5.2l-39-39-87 87c-9.4 9.4-24.6 9.4-33.9 0l-32-32c-9.4-9.4-9.4-24.6 0-33.9l87-87-39-39c-6.9-6.9-8.9-17.2-5.2-26.2S334.3 0 344 0zM168 512L24 512c-13.3 0-24-10.7-24-24L0 344c0-9.7 5.8-18.5 14.8-22.2S34.1 320.2 41 327l39 39 87-87c9.4-9.4 24.6-9.4 33.9 0l32 32c9.4 9.4 9.4 24.6 0 33.9l-87 87 39 39c6.9 6.9 8.9 17.2 5.2 26.2S177.7 512 168 512z"]};var i4={prefix:"fas",iconName:"play",icon:[448,512,[9654],"f04b","M91.2 36.9c-12.4-6.8-27.4-6.5-39.6 .7S32 57.9 32 72l0 368c0 14.1 7.5 27.2 19.6 34.4s27.2 7.5 39.6 .7l336-184c12.8-7 20.8-20.5 20.8-35.1s-8-28.1-20.8-35.1l-336-184z"]};var f4={prefix:"fas",iconName:"check",icon:[448,512,[10003,10004],"f00c","M434.8 70.1c14.3 10.4 17.5 30.4 7.1 44.7l-256 352c-5.5 7.6-14 12.3-23.4 13.1s-18.5-2.7-25.1-9.3l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l101.5 101.5 234-321.7c10.4-14.3 30.4-17.5 44.7-7.1z"]};var o4={prefix:"fas",iconName:"sliders",icon:[512,512,["sliders-h"],"f1de","M32 64C14.3 64 0 78.3 0 96s14.3 32 32 32l86.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48L480 128c17.7 0 32-14.3 32-32s-14.3-32-32-32L265.3 64C253 35.7 224.8 16 192 16s-61 19.7-73.3 48L32 64zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32l246.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48l54.7 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-54.7 0c-12.3-28.3-40.5-48-73.3-48s-61 19.7-73.3 48L32 224zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32l54.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48L480 448c17.7 0 32-14.3 32-32s-14.3-32-32-32l-246.7 0c-12.3-28.3-40.5-48-73.3-48s-61 19.7-73.3 48L32 384z"]};var n4={prefix:"fas",iconName:"user",icon:[448,512,[128100,62144,62470,"user-alt","user-large"],"f007","M224 248a120 120 0 1 0 0-240 120 120 0 1 0 0 240zm-29.7 56C95.8 304 16 383.8 16 482.3 16 498.7 29.3 512 45.7 512l356.6 0c16.4 0 29.7-13.3 29.7-29.7 0-98.5-79.8-178.3-178.3-178.3l-59.4 0z"]};var t4={prefix:"fas",iconName:"arrow-right",icon:[512,512,[8594],"f061","M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l370.7 0-105.4 105.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"]};var z4={prefix:"fas",iconName:"right-left",icon:[512,512,["exchange-alt"],"f362","M502.6 150.6l-96 96c-9.2 9.2-22.9 11.9-34.9 6.9S352 236.9 352 224l0-64-320 0c-17.7 0-32-14.3-32-32S14.3 96 32 96l320 0 0-64c0-12.9 7.8-24.6 19.8-29.6s25.7-2.2 34.9 6.9l96 96c12.5 12.5 12.5 32.8 0 45.3zm-397.3 352l-96-96c-12.5-12.5-12.5-32.8 0-45.3l96-96c9.2-9.2 22.9-11.9 34.9-6.9S160 275.1 160 288l0 64 320 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-320 0 0 64c0 12.9-7.8 24.6-19.8 29.6s-25.7 2.2-34.9-6.9z"]};var m4={prefix:"fas",iconName:"xmark",icon:[384,512,[128473,10005,10006,10060,215,"close","multiply","remove","times"],"f00d","M55.1 73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L147.2 256 9.9 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192.5 301.3 329.9 438.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.8 256 375.1 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192.5 210.7 55.1 73.4z"]};var p4={prefix:"fas",iconName:"comments",icon:[576,512,[128490,61670],"f086","M384 144c0 97.2-86 176-192 176-26.7 0-52.1-5-75.2-14L35.2 349.2c-9.3 4.9-20.7 3.2-28.2-4.2s-9.2-18.9-4.2-28.2l35.6-67.2C14.3 220.2 0 183.6 0 144 0 46.8 86-32 192-32S384 46.8 384 144zm0 368c-94.1 0-172.4-62.1-188.8-144 120-1.5 224.3-86.9 235.8-202.7 83.3 19.2 145 88.3 145 170.7 0 39.6-14.3 76.2-38.4 105.6l35.6 67.2c4.9 9.3 3.2 20.7-4.2 28.2s-18.9 9.2-28.2 4.2L459.2 498c-23.1 9-48.5 14-75.2 14z"]};var M4={prefix:"fas",iconName:"mobile-screen",icon:[384,512,["mobile-android-alt"],"f3cf","M16 64C16 28.7 44.7 0 80 0L304 0c35.3 0 64 28.7 64 64l0 384c0 35.3-28.7 64-64 64L80 512c-35.3 0-64-28.7-64-64L16 64zM128 440c0 13.3 10.7 24 24 24l80 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-80 0c-13.3 0-24 10.7-24 24zM304 64l-224 0 0 304 224 0 0-304z"]};var L4={prefix:"fas",iconName:"phone-volume",icon:[576,512,["volume-control-phone"],"f2a0","M344-32c128.1 0 232 103.9 232 232 0 13.3-10.7 24-24 24s-24-10.7-24-24c0-101.6-82.4-184-184-184-13.3 0-24-10.7-24-24s10.7-24 24-24zm8 192a32 32 0 1 1 0 64 32 32 0 1 1 0-64zM320 88c0-13.3 10.7-24 24-24 75.1 0 136 60.9 136 136 0 13.3-10.7 24-24 24s-24-10.7-24-24c0-48.6-39.4-88-88-88-13.3 0-24-10.7-24-24zM144.1 1.4c19.7-5.4 40.3 4.7 48.1 23.5l40.5 97.3c6.9 16.5 2.1 35.6-11.8 47l-44.1 36.1c32.5 71.6 89 130 159.3 164.9L374.7 323c11.3-13.9 30.4-18.6 47-11.8L519 351.8c18.8 7.8 28.9 28.4 23.5 48.1l-1.5 5.5C523.4 470.1 460.9 525.3 384.6 509.2 209.6 472.1 71.9 334.4 34.8 159.4 18.7 83.1 73.9 20.6 138.5 2.9l5.5-1.5z"]};var d4={prefix:"fas",iconName:"phone",icon:[512,512,[128222,128379],"f095","M160.2 25C152.3 6.1 131.7-3.9 112.1 1.4l-5.5 1.5c-64.6 17.6-119.8 80.2-103.7 156.4 37.1 175 174.8 312.7 349.8 349.8 76.3 16.2 138.8-39.1 156.4-103.7l1.5-5.5c5.4-19.7-4.7-40.3-23.5-48.1l-97.3-40.5c-16.5-6.9-35.6-2.1-47 11.8l-38.6 47.2C233.9 335.4 177.3 277 144.8 205.3L189 169.3c13.9-11.3 18.6-30.4 11.8-47L160.2 25z"]};var u4={prefix:"fas",iconName:"address-book",icon:[512,512,[62138,"contact-book"],"f2b9","M96 0C60.7 0 32 28.7 32 64l0 384c0 35.3 28.7 64 64 64l288 0c35.3 0 64-28.7 64-64l0-384c0-35.3-28.7-64-64-64L96 0zM208 288l64 0c44.2 0 80 35.8 80 80 0 8.8-7.2 16-16 16l-192 0c-8.8 0-16-7.2-16-16 0-44.2 35.8-80 80-80zm-24-96a56 56 0 1 1 112 0 56 56 0 1 1 -112 0zM512 80c0-8.8-7.2-16-16-16s-16 7.2-16 16l0 64c0 8.8 7.2 16 16 16s16-7.2 16-16l0-64zm0 128c0-8.8-7.2-16-16-16s-16 7.2-16 16l0 64c0 8.8 7.2 16 16 16s16-7.2 16-16l0-64zM496 320c-8.8 0-16 7.2-16 16l0 64c0 8.8 7.2 16 16 16s16-7.2 16-16l0-64c0-8.8-7.2-16-16-16z"]};var v4={prefix:"fas",iconName:"chevron-down",icon:[448,512,[],"f078","M201.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 338.7 54.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"]};var h4={prefix:"fas",iconName:"plug",icon:[448,512,[128268],"f1e6","M128-32c17.7 0 32 14.3 32 32l0 96 128 0 0-96c0-17.7 14.3-32 32-32s32 14.3 32 32l0 96 64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l0 64c0 95.1-69.2 174.1-160 189.3l0 66.7c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-66.7C101.2 398.1 32 319.1 32 224l0-64c-17.7 0-32-14.3-32-32S14.3 96 32 96l64 0 0-96c0-17.7 14.3-32 32-32z"]};var C4={prefix:"fas",iconName:"comment-dots",icon:[512,512,[128172,62075,"commenting"],"f4ad","M256 480c141.4 0 256-107.5 256-240S397.4 0 256 0 0 107.5 0 240c0 54.3 19.2 104.3 51.6 144.5L2.8 476.8c-4.8 9-3.3 20 3.6 27.5s17.8 9.8 27.1 5.8l118.4-50.7C183.7 472.6 218.9 480 256 480zM128 208a32 32 0 1 1 0 64 32 32 0 1 1 0-64zm128 0a32 32 0 1 1 0 64 32 32 0 1 1 0-64zm96 32a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"]};var g4={prefix:"fas",iconName:"inbox",icon:[512,512,[],"f01c","M91.8 32C59.9 32 32.9 55.4 28.4 86.9L.6 281.2c-.4 3-.6 6-.6 9.1L0 416c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-125.7c0-3-.2-6.1-.6-9.1L483.6 86.9C479.1 55.4 452.1 32 420.2 32L91.8 32zm0 64l328.5 0 27.4 192-59.9 0c-12.1 0-23.2 6.8-28.6 17.7l-14.3 28.6c-5.4 10.8-16.5 17.7-28.6 17.7l-120.4 0c-12.1 0-23.2-6.8-28.6-17.7l-14.3-28.6c-5.4-10.8-16.5-17.7-28.6-17.7L64.3 288 91.8 96z"]};var x4={prefix:"fas",iconName:"bullhorn",icon:[512,512,[128226,128363],"f0a1","M461.2 18.9C472.7 24 480 35.4 480 48l0 416c0 12.6-7.3 24-18.8 29.1s-24.8 3.2-34.3-5.1l-46.6-40.7c-43.6-38.1-98.7-60.3-156.4-63l0 95.7c0 17.7-14.3 32-32 32l-32 0c-17.7 0-32-14.3-32-32l0-96C57.3 384 0 326.7 0 256S57.3 128 128 128l84.5 0c61.8-.2 121.4-22.7 167.9-63.3l46.6-40.7c9.4-8.3 22.9-10.2 34.3-5.1zM224 320l0 .2c70.3 2.7 137.8 28.5 192 73.4l0-275.3c-54.2 44.9-121.7 70.7-192 73.4L224 320z"]};var S4={prefix:"fas",iconName:"wand-magic-sparkles",icon:[576,512,["magic-wand-sparkles"],"e2ca","M263.4-27L278.2 9.8 315 24.6c3 1.2 5 4.2 5 7.4s-2 6.2-5 7.4L278.2 54.2 263.4 91c-1.2 3-4.2 5-7.4 5s-6.2-2-7.4-5L233.8 54.2 197 39.4c-3-1.2-5-4.2-5-7.4s2-6.2 5-7.4L233.8 9.8 248.6-27c1.2-3 4.2-5 7.4-5s6.2 2 7.4 5zM110.7 41.7l21.5 50.1 50.1 21.5c5.9 2.5 9.7 8.3 9.7 14.7s-3.8 12.2-9.7 14.7l-50.1 21.5-21.5 50.1c-2.5 5.9-8.3 9.7-14.7 9.7s-12.2-3.8-14.7-9.7L59.8 164.2 9.7 142.7C3.8 140.2 0 134.4 0 128s3.8-12.2 9.7-14.7L59.8 91.8 81.3 41.7C83.8 35.8 89.6 32 96 32s12.2 3.8 14.7 9.7zM464 304c6.4 0 12.2 3.8 14.7 9.7l21.5 50.1 50.1 21.5c5.9 2.5 9.7 8.3 9.7 14.7s-3.8 12.2-9.7 14.7l-50.1 21.5-21.5 50.1c-2.5 5.9-8.3 9.7-14.7 9.7s-12.2-3.8-14.7-9.7l-21.5-50.1-50.1-21.5c-5.9-2.5-9.7-8.3-9.7-14.7s3.8-12.2 9.7-14.7l50.1-21.5 21.5-50.1c2.5-5.9 8.3-9.7 14.7-9.7zM460 0c11 0 21.6 4.4 29.5 12.2l42.3 42.3C539.6 62.4 544 73 544 84s-4.4 21.6-12.2 29.5l-88.2 88.2-101.3-101.3 88.2-88.2C438.4 4.4 449 0 460 0zM44.2 398.5L308.4 134.3 409.7 235.6 145.5 499.8C137.6 507.6 127 512 116 512s-21.6-4.4-29.5-12.2L44.2 457.5C36.4 449.6 32 439 32 428s4.4-21.6 12.2-29.5z"]};var N4={prefix:"fas",iconName:"chart-column",icon:[512,512,[],"e0e3","M32 32c17.7 0 32 14.3 32 32l0 336c0 8.8 7.2 16 16 16l400 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L80 480c-44.2 0-80-35.8-80-80L0 64C0 46.3 14.3 32 32 32zM144 224c17.7 0 32 14.3 32 32l0 64c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32zm144-64l0 160c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-160c0-17.7 14.3-32 32-32s32 14.3 32 32zm80 32c17.7 0 32 14.3 32 32l0 96c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-96c0-17.7 14.3-32 32-32zM512 96l0 224c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-224c0-17.7 14.3-32 32-32s32 14.3 32 32z"]};var b4={prefix:"fas",iconName:"star",icon:[576,512,[11088,61446],"f005","M309.5-18.9c-4.1-8-12.4-13.1-21.4-13.1s-17.3 5.1-21.4 13.1L193.1 125.3 33.2 150.7c-8.9 1.4-16.3 7.7-19.1 16.3s-.5 18 5.8 24.4l114.4 114.5-25.2 159.9c-1.4 8.9 2.3 17.9 9.6 23.2s16.9 6.1 25 2L288.1 417.6 432.4 491c8 4.1 17.7 3.3 25-2s11-14.2 9.6-23.2L441.7 305.9 556.1 191.4c6.4-6.4 8.6-15.8 5.8-24.4s-10.1-14.9-19.1-16.3L383 125.3 309.5-18.9z"]};var w4={prefix:"fas",iconName:"triangle-exclamation",icon:[512,512,[9888,"exclamation-triangle","warning"],"f071","M256 0c14.7 0 28.2 8.1 35.2 21l216 400c6.7 12.4 6.4 27.4-.8 39.5S486.1 480 472 480L40 480c-14.1 0-27.2-7.4-34.4-19.5s-7.5-27.1-.8-39.5l216-400c7-12.9 20.5-21 35.2-21zm0 352a32 32 0 1 0 0 64 32 32 0 1 0 0-64zm0-192c-18.2 0-32.7 15.5-31.4 33.7l7.4 104c.9 12.5 11.4 22.3 23.9 22.3 12.6 0 23-9.7 23.9-22.3l7.4-104c1.3-18.2-13.1-33.7-31.4-33.7z"]};var k4={prefix:"fas",iconName:"lock",icon:[384,512,[128274],"f023","M128 96l0 64 128 0 0-64c0-35.3-28.7-64-64-64s-64 28.7-64 64zM64 160l0-64C64 25.3 121.3-32 192-32S320 25.3 320 96l0 64c35.3 0 64 28.7 64 64l0 224c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 224c0-35.3 28.7-64 64-64z"]};var y4={prefix:"fas",iconName:"window-restore",icon:[576,512,[],"f2d2","M512 96L160 96c0-35.3 28.7-64 64-64l288 0c35.3 0 64 28.7 64 64l0 192c0 35.3-28.7 64-64 64l-48 0 0-64 48 0 0-192zM0 224c0-35.3 28.7-64 64-64l288 0c35.3 0 64 28.7 64 64l0 192c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64L0 224zm64 40c0 13.3 10.7 24 24 24l240 0c13.3 0 24-10.7 24-24s-10.7-24-24-24L88 240c-13.3 0-24 10.7-24 24z"]};var A4={prefix:"fas",iconName:"shield-halved",icon:[512,512,["shield-alt"],"f3ed","M256 0c4.6 0 9.2 1 13.4 2.9L457.8 82.8c22 9.3 38.4 31 38.3 57.2-.5 99.2-41.3 280.7-213.6 363.2-16.7 8-36.1 8-52.8 0-172.4-82.5-213.1-264-213.6-363.2-.1-26.2 16.3-47.9 38.3-57.2L242.7 2.9C246.9 1 251.4 0 256 0zm0 66.8l0 378.1c138-66.8 175.1-214.8 176-303.4l-176-74.6 0 0z"]};var T4={prefix:"fas",iconName:"caret-up",icon:[320,512,[],"f0d8","M140.3 135.2c12.6-10.3 31.1-9.5 42.8 2.2l128 128c9.2 9.2 11.9 22.9 6.9 34.9S301.4 320 288.5 320l-256 0c-12.9 0-24.6-7.8-29.6-19.8S.7 274.5 9.9 265.4l128-128 2.4-2.2z"]};var P4={prefix:"fas",iconName:"globe",icon:[512,512,[127760],"f0ac","M351.9 280l-190.9 0c2.9 64.5 17.2 123.9 37.5 167.4 11.4 24.5 23.7 41.8 35.1 52.4 11.2 10.5 18.9 12.2 22.9 12.2s11.7-1.7 22.9-12.2c11.4-10.6 23.7-28 35.1-52.4 20.3-43.5 34.6-102.9 37.5-167.4zM160.9 232l190.9 0C349 167.5 334.7 108.1 314.4 64.6 303 40.2 290.7 22.8 279.3 12.2 268.1 1.7 260.4 0 256.4 0s-11.7 1.7-22.9 12.2c-11.4 10.6-23.7 28-35.1 52.4-20.3 43.5-34.6 102.9-37.5 167.4zm-48 0C116.4 146.4 138.5 66.9 170.8 14.7 78.7 47.3 10.9 131.2 1.5 232l111.4 0zM1.5 280c9.4 100.8 77.2 184.7 169.3 217.3-32.3-52.2-54.4-131.7-57.9-217.3L1.5 280zm398.4 0c-3.5 85.6-25.6 165.1-57.9 217.3 92.1-32.7 159.9-116.5 169.3-217.3l-111.4 0zm111.4-48C501.9 131.2 434.1 47.3 342 14.7 374.3 66.9 396.4 146.4 399.9 232l111.4 0z"]};var B4={prefix:"fas",iconName:"upload",icon:[448,512,[],"f093","M256 109.3L256 320c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-210.7-41.4 41.4c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l96-96c12.5-12.5 32.8-12.5 45.3 0l96 96c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 109.3zM224 400c44.2 0 80-35.8 80-80l80 0c35.3 0 64 28.7 64 64l0 32c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64l0-32c0-35.3 28.7-64 64-64l80 0c0 44.2 35.8 80 80 80zm144 24a24 24 0 1 0 0-48 24 24 0 1 0 0 48z"]};var F4={prefix:"fas",iconName:"arrow-left",icon:[512,512,[8592],"f060","M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 288 480 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-370.7 0 105.4-105.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"]};var H4={prefix:"fas",iconName:"check-double",icon:[384,512,[],"f560","M249.9 66.8c10.4-14.3 7.2-34.3-7.1-44.7s-34.3-7.2-44.7 7.1l-106 145.7-37.5-37.5c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l64 64c6.6 6.6 15.8 10 25.1 9.3s17.9-5.5 23.4-13.1l128-176zm128 136c10.4-14.3 7.2-34.3-7.1-44.7s-34.3-7.2-44.7 7.1l-170 233.7-69.5-69.5c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l96 96c6.6 6.6 15.8 10 25.1 9.3s17.9-5.5 23.4-13.1l192-264z"]};var E4={prefix:"fas",iconName:"down-left-and-up-right-to-center",icon:[512,512,["compress-alt"],"f422","M439.5 7c9.4-9.4 24.6-9.4 33.9 0l32 32c9.4 9.4 9.4 24.6 0 33.9l-87 87 39 39c6.9 6.9 8.9 17.2 5.2 26.2S450.2 240 440.5 240l-144 0c-13.3 0-24-10.7-24-24l0-144c0-9.7 5.8-18.5 14.8-22.2s19.3-1.7 26.2 5.2l39 39 87-87zM72.5 272l144 0c13.3 0 24 10.7 24 24l0 144c0 9.7-5.8 18.5-14.8 22.2s-19.3 1.7-26.2-5.2l-39-39-87 87c-9.4 9.4-24.6 9.4-33.9 0l-32-32c-9.4-9.4-9.4-24.6 0-33.9l87-87-39-39c-6.9-6.9-8.9-17.2-5.2-26.2S62.8 272 72.5 272z"]};var R4={prefix:"fas",iconName:"music",icon:[512,512,[127925],"f001","M468 7c7.6 6.1 12 15.3 12 25l0 304c0 44.2-43 80-96 80s-96-35.8-96-80 43-80 96-80c11.2 0 22 1.6 32 4.6l0-116.7-224 49.8 0 206.3c0 44.2-43 80-96 80s-96-35.8-96-80 43-80 96-80c11.2 0 22 1.6 32 4.6L128 96c0-15 10.4-28 25.1-31.2l288-64c9.5-2.1 19.4 .2 27 6.3z"]};var D4={prefix:"fas",iconName:"robot",icon:[640,512,[129302],"f544","M352 0c0-17.7-14.3-32-32-32S288-17.7 288 0l0 64-96 0c-53 0-96 43-96 96l0 224c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-224c0-53-43-96-96-96l-96 0 0-64zM160 368c0-13.3 10.7-24 24-24l32 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-32 0c-13.3 0-24-10.7-24-24zm120 0c0-13.3 10.7-24 24-24l32 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-32 0c-13.3 0-24-10.7-24-24zm120 0c0-13.3 10.7-24 24-24l32 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-32 0c-13.3 0-24-10.7-24-24zM224 176a48 48 0 1 1 0 96 48 48 0 1 1 0-96zm144 48a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zM64 224c0-17.7-14.3-32-32-32S0 206.3 0 224l0 96c0 17.7 14.3 32 32 32s32-14.3 32-32l0-96zm544-32c-17.7 0-32 14.3-32 32l0 96c0 17.7 14.3 32 32 32s32-14.3 32-32l0-96c0-17.7-14.3-32-32-32z"]},U4={prefix:"fas",iconName:"plus",icon:[448,512,[10133,61543,"add"],"2b","M256 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 160-160 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l160 0 0 160c0 17.7 14.3 32 32 32s32-14.3 32-32l0-160 160 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-160 0 0-160z"]};var q4={prefix:"fas",iconName:"caret-down",icon:[320,512,[],"f0d7","M140.3 376.8c12.6 10.2 31.1 9.5 42.8-2.2l128-128c9.2-9.2 11.9-22.9 6.9-34.9S301.4 192 288.5 192l-256 0c-12.9 0-24.6 7.8-29.6 19.8S.7 237.5 9.9 246.6l128 128 2.4 2.2z"]};var _4={prefix:"fas",iconName:"tag",icon:[512,512,[127991],"f02b","M32.5 96l0 149.5c0 17 6.7 33.3 18.7 45.3l192 192c25 25 65.5 25 90.5 0L483.2 333.3c25-25 25-65.5 0-90.5l-192-192C279.2 38.7 263 32 246 32L96.5 32c-35.3 0-64 28.7-64 64zm112 16a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"]};var $4={prefix:"fas",iconName:"phone-slash",icon:[576,512,[],"f3dd","M535-24.9c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9L41 537.1c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9L141.5 368.6C89.2 310.5 51.6 238.8 34.8 159.4 18.7 83.1 73.9 20.6 138.5 2.9l5.5-1.5c19.7-5.4 40.3 4.7 48.1 23.5l40.5 97.3c6.9 16.5 2.1 35.6-11.8 47l-44.1 36.1c12.9 28.5 29.6 54.8 49.5 78.5L535-24.9zm-150.4 534c-63-13.4-121.3-39.8-171.7-76.3L297.8 348c12.2 8.2 25 15.6 38.3 22.2L374.7 323c11.3-13.9 30.4-18.6 47-11.8L519 351.8c18.8 7.8 28.9 28.4 23.5 48.1l-1.5 5.5c-17.6 64.6-80.2 119.8-156.4 103.7z"]};var G4={prefix:"fas",iconName:"briefcase",icon:[512,512,[128188],"f0b1","M200 48l112 0c4.4 0 8 3.6 8 8l0 40-128 0 0-40c0-4.4 3.6-8 8-8zm-56 8l0 40-80 0C28.7 96 0 124.7 0 160l0 96 512 0 0-96c0-35.3-28.7-64-64-64l-80 0 0-40c0-30.9-25.1-56-56-56L200 0c-30.9 0-56 25.1-56 56zM512 304l-192 0 0 16c0 17.7-14.3 32-32 32l-64 0c-17.7 0-32-14.3-32-32l0-16-192 0 0 112c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-112z"]};var W4={prefix:"fas",iconName:"pause",icon:[384,512,[9208],"f04c","M48 32C21.5 32 0 53.5 0 80L0 432c0 26.5 21.5 48 48 48l64 0c26.5 0 48-21.5 48-48l0-352c0-26.5-21.5-48-48-48L48 32zm224 0c-26.5 0-48 21.5-48 48l0 352c0 26.5 21.5 48 48 48l64 0c26.5 0 48-21.5 48-48l0-352c0-26.5-21.5-48-48-48l-64 0z"]};var I4={prefix:"fas",iconName:"desktop",icon:[512,512,[128421,61704,"desktop-alt"],"f390","M64 32C28.7 32 0 60.7 0 96L0 352c0 35.3 28.7 64 64 64l144 0-16 48-72 0c-13.3 0-24 10.7-24 24s10.7 24 24 24l272 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-72 0-16-48 144 0c35.3 0 64-28.7 64-64l0-256c0-35.3-28.7-64-64-64L64 32zM96 96l320 0c17.7 0 32 14.3 32 32l0 160c0 17.7-14.3 32-32 32L96 320c-17.7 0-32-14.3-32-32l0-160c0-17.7 14.3-32 32-32z"]};var O4={prefix:"fas",iconName:"arrow-down",icon:[384,512,[8595],"f063","M169.4 502.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 402.7 224 32c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 370.7-105.4-105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"]},V4={prefix:"fas",iconName:"location-dot",icon:[384,512,["map-marker-alt"],"f3c5","M0 188.6C0 84.4 86 0 192 0S384 84.4 384 188.6c0 119.3-120.2 262.3-170.4 316.8-11.8 12.8-31.5 12.8-43.3 0-50.2-54.5-170.4-197.5-170.4-316.8zM192 256a64 64 0 1 0 0-128 64 64 0 1 0 0 128z"]};var j4={prefix:"fas",iconName:"keyboard",icon:[576,512,[9e3],"f11c","M64 64C28.7 64 0 92.7 0 128L0 384c0 35.3 28.7 64 64 64l448 0c35.3 0 64-28.7 64-64l0-256c0-35.3-28.7-64-64-64L64 64zm16 64l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16zM64 240c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32zM176 128l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16zM160 240c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32zm16 80l224 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-224 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16zm80-176c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32zm16 80l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16zm80-80c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32zm16 80l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16zm80-80c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32zm16 80l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16z"]};var K4={prefix:"fas",iconName:"hashtag",icon:[512,512,[62098],"23","M214.7 .7c17.3 3.7 28.3 20.7 24.6 38l-19.1 89.3 126.5 0 22-102.7C372.4 8 389.4-3 406.7 .7s28.3 20.7 24.6 38L412.2 128 480 128c17.7 0 32 14.3 32 32s-14.3 32-32 32l-81.6 0-27.4 128 67.8 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-81.6 0-22 102.7c-3.7 17.3-20.7 28.3-38 24.6s-28.3-20.7-24.6-38l19.1-89.3-126.5 0-22 102.7c-3.7 17.3-20.7 28.3-38 24.6s-28.3-20.7-24.6-38L99.8 384 32 384c-17.7 0-32-14.3-32-32s14.3-32 32-32l81.6 0 27.4-128-67.8 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l81.6 0 22-102.7C180.4 8 197.4-3 214.7 .7zM206.4 192l-27.4 128 126.5 0 27.4-128-126.5 0z"]};var X4={prefix:"fas",iconName:"circle-dot",icon:[512,512,[128280,"dot-circle"],"f192","M256 512a256 256 0 1 0 0-512 256 256 0 1 0 0 512zm0-352a96 96 0 1 1 0 192 96 96 0 1 1 0-192z"]};var Q4={prefix:"fas",iconName:"arrows-rotate",icon:[512,512,[128472,"refresh","sync"],"f021","M65.9 228.5c13.3-93 93.4-164.5 190.1-164.5 53 0 101 21.5 135.8 56.2 .2 .2 .4 .4 .6 .6l7.6 7.2-47.9 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l128 0c17.7 0 32-14.3 32-32l0-128c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 53.4-11.3-10.7C390.5 28.6 326.5 0 256 0 127 0 20.3 95.4 2.6 219.5 .1 237 12.2 253.2 29.7 255.7s33.7-9.7 36.2-27.1zm443.5 64c2.5-17.5-9.7-33.7-27.1-36.2s-33.7 9.7-36.2 27.1c-13.3 93-93.4 164.5-190.1 164.5-53 0-101-21.5-135.8-56.2-.2-.2-.4-.4-.6-.6l-7.6-7.2 47.9 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L32 320c-8.5 0-16.7 3.4-22.7 9.5S-.1 343.7 0 352.3l1 127c.1 17.7 14.6 31.9 32.3 31.7S65.2 496.4 65 478.7l-.4-51.5 10.7 10.1c46.3 46.1 110.2 74.7 180.7 74.7 129 0 235.7-95.4 253.4-219.5z"]};var J4={prefix:"fas",iconName:"list-ul",icon:[512,512,["list-dots"],"f0ca","M48 144a48 48 0 1 0 0-96 48 48 0 1 0 0 96zM192 64c-17.7 0-32 14.3-32 32s14.3 32 32 32l288 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L192 64zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32l288 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-288 0zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32l288 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-288 0zM48 464a48 48 0 1 0 0-96 48 48 0 1 0 0 96zM96 256a48 48 0 1 0 -96 0 48 48 0 1 0 96 0z"]};var Y4={prefix:"fas",iconName:"tablet-screen-button",icon:[448,512,["tablet-alt"],"f3fa","M0 64C0 28.7 28.7 0 64 0L384 0c35.3 0 64 28.7 64 64l0 384c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 64zM256 432a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zM384 64l-320 0 0 288 320 0 0-288z"]};var q3={"address-book":u4,"arrow-down":O4,"arrow-left":F4,"arrow-right":t4,ban:D1,bell:F1,briefcase:G4,bullhorn:x4,calendar:H1,"caret-down":q4,"caret-up":T4,chart:N4,"chart-line":e4,check:f4,"check-double":H4,"chevron-down":v4,"circle-dot":X4,"circle-outline":y1,clock:O1,cloud:a4,comment:C4,comments:p4,desktop:I4,dialpad:j4,ellipsis:E1,envelope:B1,expand:G1,fax:$1,fire:K1,folder:c4,gear:s4,globe:P4,hashtag:K4,headset:Q1,image:Z1,inbox:g4,link:l4,list:J4,"location-dot":V4,lock:k4,microphone:Y1,"microphone-slash":T1,minus:A1,mobile:M4,music:R4,palette:q1,pause:W4,phone:d4,"phone-slash":$4,"phone-volume":L4,play:i4,plug:h4,plus:U4,record:U1,robot:D4,rocket:V1,search:R1,send:j1,shield:A4,sitemap:_1,sliders:o4,sms:P1,sparkles:S4,star:b4,stop:I1,sync:Q4,"table-columns":W1,tablet:Y4,tag:_4,transfer:z4,upload:B4,user:n4,users:X1,voicemail:J1,warning:w4,"window-compact":E4,"window-restore":y4,"window-wide":r4,xmark:m4};function M2(l,c){let a=q3[l],[e,s,,,r]=a.icon,i=Array.isArray(r)?r.join(" "):r;return h`<svg
    viewBox="0 0 ${e} ${s}"
    style="width:1em;height:1em;vertical-align:-0.125em;overflow:visible"
    fill="currentColor"
    role=${c?.label?"img":"presentation"}
    aria-label=${c?.label??""}
    aria-hidden=${c?.label?"false":"true"}
  >
    <path d=${i}></path>
  </svg>`}var T2={mode:"light",primaryColor:"#2563eb",primaryHover:"#1d4ed8",primaryText:"#ffffff",radius:"12px",fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'},P2={mode:"dark",primaryColor:"#60a5fa",primaryHover:"#93c5fd",primaryText:"#0f172a",radius:"12px",fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'},Z4={primaryColor:"--dc-primary-color",primaryHover:"--dc-primary-hover",primaryText:"--dc-primary-text",radius:"--dc-radius",fontFamily:"--dc-font-family"};function B2(l){let c=l||{},a=String(c.theme||c.mode||"LIGHT").toLowerCase(),e=a==="dark"?P2:T2,s={mode:a==="auto"?"auto":e.mode,primaryColor:c.primaryColor||c.primary||e.primaryColor,primaryHover:c.primaryHover||e.primaryHover,primaryText:c.primaryText||e.primaryText,radius:c.radius||e.radius,fontFamily:c.fontFamily||e.fontFamily};return a==="auto"&&(s.mode="auto"),s}function _3(l){return l==="dark"?"dark":l==="light"?"light":typeof window<"u"&&typeof window.matchMedia=="function"&&window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}function F2(l,c){let a=B2(l),e=c||(typeof document<"u"?document.documentElement:null);if(!e||!e.style)return a;e.setAttribute("data-dc-theme",_3(a.mode));let s=Object.keys(Z4);for(let r=0;r<s.length;r++){let i=s[r],o=a[i];typeof o=="string"&&o.length>0&&e.style.setProperty(Z4[i],o)}return a}var c3="dc-session-expired",E2="dc-refresh-session";function D2(l){if(!l||typeof l!="string")return{};let c=l.split(".");if(c.length<2)return{};try{let a=c[1].replace(/-/g,"+").replace(/_/g,"/"),e=a+"===".slice((a.length+3)%4),s=typeof Buffer<"u"?Buffer.from(e,"base64").toString("utf8"):decodeURIComponent(atob(e).split("").map(function(i){return"%"+("00"+i.charCodeAt(0).toString(16)).slice(-2)}).join("")),r=JSON.parse(s);return r&&typeof r=="object"?r:{}}catch{return{}}}function a3(l){let c=D2(l).exp;return typeof c!="number"||!Number.isFinite(c)?null:c*1e3}function l3(l){if(l==null||l==="")return null;if(typeof l=="number"&&Number.isFinite(l))return l<1e12?l*1e3:l;let c=Date.parse(String(l));return Number.isNaN(c)?null:c}function R2(l){return!l||typeof l!="object"?!1:l.status===401||l.statusCode===401?!0:!!(l.response&&l.response.status===401)}function U2(l){return l?l.token||typeof l.getToken=="function"?!0:q2(l.tokenManager):!1}function q2(l){return!!(l&&typeof l.withAuthRetry=="function"&&typeof l.current=="function")}function _2(l,c){let a=l||{},e=q2(a.tokenManager),s=e?a.tokenManager:e3({token:a.token,expires_at:a.expires_at,getToken:a.getToken,onExpired:a.onExpired}),r=typeof c=="function"?s.onTokenChange(c):null,i=!1;return{manager:s,owned:!e,release:function(){i||(i=!0,r&&r(),e||s.destroy())}}}async function $2(l){if(l.manager.current())return l.manager.current();try{return await l.manager.refresh()}catch(c){throw l.release(),c}}function $3(l){return l||(typeof window<"u"&&window&&typeof window.addEventListener=="function"?window:null)}function G3(l,c){if(typeof CustomEvent=="function")return new CustomEvent(l,{bubbles:!0,composed:!0,detail:c});let a=new Event(l,{bubbles:!0,composed:!0});return a.detail=c,a}function H2(l,c){let a=setTimeout(l,Math.min(Math.max(0,c),2147483647));return a&&typeof a.unref=="function"&&a.unref(),a}function e3(l){let c=l||{},a=typeof c.getToken=="function"?c.getToken:null,e=typeof c.onExpired=="function"?c.onExpired:null,s=typeof c.now=="function"?c.now:Date.now,r=$3(c.target),i=[],o="",f=null,t=null,M=null,n=!1,z=!1,m=!1;function v(){t&&(clearTimeout(t),t=null)}function S(){let p=i.slice();for(let u=0;u<p.length;u++)try{p[u](o)}catch{}}function P(p,u){if(v(),n||z)return;n=!0;let L={reason:p,error:u||null,expires_at:f};r&&r.dispatchEvent(G3(c3,L)),e&&e(L)}function J(){if(v(),m=!1,z||!f)return;let p=f-s();if(!a){t=H2(function(){t=null,P("token_expired")},p);return}let u=Math.floor(p*.8);p-u<1e4&&(u=p-1e4),t=H2(I2,u)}function I2(){t=null,Y("scheduled").catch(function(){})}function d2(p,u){o=String(p),f=a3(o)||l3(u),n=!1,J(),S()}function L3(){if(m||!f)return!1;let p=f-1e4-s();return p<=0?!1:(m=!0,t=H2(I2,p),!0)}function Y(p){if(z)return Promise.reject(new Error("Token manager was closed"));if(M)return M;if(!a){let L=new Error("No getToken() was provided to refresh the session");return P(p==="unauthorized"?"unauthorized":"refresh_unavailable",L),Promise.reject(L)}let u=m;return M=Promise.resolve().then(function(){return a()}).then(function(L){let Z=typeof L=="string"?L:L&&typeof L.token=="string"?L.token:"";if(!Z)throw new Error("getToken() did not return a token");if(M=null,z)throw new Error("Token manager was closed");return d2(Z,L&&typeof L=="object"?L.expires_at:null),o}).catch(function(L){throw M=null,z||p==="scheduled"&&!u&&L3()||P("refresh_failed",L),L}),M}async function O2(p){try{await Y("unauthorized")}catch{throw p}}function V2(){Y("requested").catch(function(){})}return c.token&&d2(c.token,c.expires_at),r&&r.addEventListener(E2,V2),{current:function(){return o},expiresAt:function(){return f},hasRefresher:function(){return!!a},isExpired:function(){return n},isDestroyed:function(){return z},refresh:function(){return Y("manual")},setToken:function(p,u){if(z)throw new Error("Token manager was closed");if(!p)throw new Error("setToken(token) requires a site token");let L=typeof p=="object"?p.token:p,Z=typeof p=="object"?p.expires_at:u;if(!L)throw new Error("setToken(token) requires a site token");return d2(L,Z),o},withAuthRetry:async function(p){if(z)throw new Error("Token manager was closed");let u;try{u=await p(o)}catch(L){if(!R2(L))throw L;return await O2(L),p(o)}return R2(u)&&u.ok===!1?(await O2(u),p(o)):u},onTokenChange:function(p){return i.push(p),function(){let u=i.indexOf(p);u>=0&&i.splice(u,1)}},destroy:function(){z||(z=!0,v(),M=null,i.length=0,r&&r.removeEventListener(E2,V2))}}}var W3="sms_registration_required";var v6={[W3]:"This number is not registered for texting yet. US carriers only deliver business texts from numbers on a registered brand and campaign (10DLC). Register them in Drop Cowboy, then try again."};function I3(l){return new Date(l).toLocaleTimeString([],{hour:"numeric",minute:"2-digit"})}var s3={chat:"Chat",sms:"SMS",mms:"MMS",rcs:"RCS"},g=class extends N{constructor(){super(...arguments);this.channel="sms";this.typing=!1;this.inline=!1;this.branding=!0;this.contact={id:"",name:"",phone:""};this.messages=[];this.draft="";this.unsubscribers=[]}connectedCallback(){super.connectedCallback(),this.bindAdapter()}disconnectedCallback(){super.disconnectedCallback();for(let a of this.unsubscribers)a();this.unsubscribers.length=0}willUpdate(a){a.has("adapter")&&this.bindAdapter()}updated(){requestAnimationFrame(()=>{this.streamEl&&(this.streamEl.scrollTop=this.streamEl.scrollHeight)})}bindAdapter(){for(let a of this.unsubscribers)a();this.unsubscribers.length=0,this.adapter&&(this.unsubscribers.push(this.adapter.on("chat:message",a=>{let e=this.messages.findIndex(s=>s.id===a.id);if(e>=0){let s=this.messages.slice();s[e]=a,this.messages=s}else this.messages=[...this.messages,a]})),this.unsubscribers.push(this.adapter.on("chat:typing",({who:a,typing:e})=>{a==="agent"&&(this.typing=e)})))}emit(a,e){this.dispatchEvent(new CustomEvent(a,{detail:e,bubbles:!0,composed:!0}))}async send(){let a=this.draft.trim();if(!a)return;if(this.draft="",!this.adapter){this.messages=[...this.messages,{id:crypto.randomUUID(),author:"visitor",text:a,ts:Date.now(),status:"sent",channel:this.channel}],this.emit("dc-send",{text:a,channel:this.channel});return}let e=this.adapter.sendMessage(a,this.channel);this.emit("dc-send",{text:a,channel:this.channel});let s=!1;try{let r=await e;s=!!r&&r.status==="failed"}catch{s=!0}s&&!this.draft&&(this.draft=a)}render(){let a=this.contact.name||this.contact.phone;return h`
      <section class="panel dc-panel" role="region" aria-label=${a?`Messages with ${a}`:"Messages"}>
        <header class="dc-header head">
          <div class="dc-h-left">
            <div class="dc-avatar">${this.contact.initials??"#"}</div>
            <div>
              <div class="dc-title">${a||"Messages"}</div>
              ${this.contact.name&&this.contact.phone?h`<div class="dc-subtitle">${this.contact.phone}</div>`:d}
            </div>
          </div>
          <span class="dc-pill is-info channel-pill" aria-label="Channel ${s3[this.channel]}">
            ${s3[this.channel]}
          </span>
        </header>
        <div class="stream">
          <div class="day">Today</div>
          ${b1(this.messages,e=>e.id,e=>this.renderMessage(e))}
          ${this.typing?h`<div class="typing" aria-label="Typing"><i></i><i></i><i></i></div>`:d}
        </div>
        <div class="composer">
          <textarea
            class="field"
            rows="1"
            placeholder=${a?`Text ${a}\u2026`:"Type a message\u2026"}
            aria-label="Message"
            .value=${this.draft}
            @input=${e=>this.draft=e.target.value}
            @keydown=${e=>{e.key==="Enter"&&!e.shiftKey&&(e.preventDefault(),this.send())}}
          ></textarea>
          <button class="send" aria-label="Send" @click=${this.send}>${M2("send")}</button>
        </div>
        ${this.branding?h`<div class="branding">Powered by DropCowboy</div>`:d}
      </section>
    `}renderMessage(a){if(a.card)return h`
        <div class="card">
          <div class="cimg"></div>
          <div class="cbody">
            <div class="ctitle">${a.card.title}</div>
            ${a.card.description?h`<div class="cdesc">${a.card.description}</div>`:d}
          </div>
          <div class="cactions">
            ${a.card.actions.map(s=>h`<button
                class="caction"
                @click=${()=>this.emit("dc-card-action",{messageId:a.id,actionId:s.id})}
              >
                ${s.label}
              </button>`)}
          </div>
        </div>
      `;let e=a.author==="visitor"?"me":"agent";return h`
      <div class="msg ${e}">
        ${a.imageUrl?h`<span class="mms"><img src=${a.imageUrl} alt="Attachment" /></span>`:d}
        ${a.text}
        <span class="t">
          ${I3(a.ts)}${a.author==="visitor"&&a.status==="read"?h` ${M2("check-double")}`:d}
        </span>
      </div>
    `}};g.styles=[N.styles,B`
      :host {
        display: block;
        width: 384px;
        max-width: 100%;
      }
      .panel {
        width: 100%;
        height: 600px;
        max-height: calc(100vh - 48px);
      }
      :host([inline]) .panel {
        height: auto;
        max-height: none;
        box-shadow: var(--dc-shadow-sm);
      }
      .head {
        gap: 10px;
      }
      .channel-pill {
        font-weight: 700;
      }
      .stream {
        flex: 1;
        overflow-y: auto;
        padding: 16px 14px;
        display: flex;
        flex-direction: column;
        gap: 10px;
        background: var(--dc-bg-color);
      }
      :host([inline]) .stream {
        min-height: 280px;
      }
      .day {
        align-self: center;
        font-size: var(--dc-font-size-xs);
        color: var(--dc-text-light);
      }
      .msg {
        max-width: 80%;
        padding: 9px 13px;
        border-radius: var(--dc-radius-bubble);
        font-size: var(--dc-font-size);
      }
      .msg.agent {
        align-self: flex-start;
        background: var(--dc-agent-bubble-bg);
        color: var(--dc-agent-bubble-text);
        border-bottom-left-radius: 4px;
      }
      .msg.me {
        align-self: flex-end;
        background: var(--dc-primary-color);
        color: #fff;
        border-bottom-right-radius: 4px;
      }
      .msg .t {
        display: block;
        font-size: var(--dc-font-size-xs);
        color: var(--dc-text-light);
        margin-top: 4px;
      }
      .msg.me .t {
        color: rgba(255, 255, 255, 0.8);
      }
      .mms {
        display: block;
        border-radius: 12px;
        overflow: hidden;
        margin-bottom: 6px;
      }
      .mms img {
        display: block;
        width: 220px;
        max-width: 100%;
        height: auto;
      }
      .card {
        align-self: flex-start;
        width: 80%;
        border: 1px solid var(--dc-border-color);
        border-radius: var(--dc-radius-sm);
        overflow: hidden;
        background: var(--dc-bg-color);
        box-shadow: var(--dc-shadow-sm);
      }
      .card .cimg {
        height: 96px;
        background: linear-gradient(135deg, var(--dc-primary-soft), var(--dc-surface-2));
      }
      .card .cbody {
        padding: 12px 14px;
      }
      .card .ctitle {
        font-weight: 700;
      }
      .card .cdesc {
        font-size: var(--dc-font-size-sm);
        color: var(--dc-text-muted);
        margin-top: 2px;
      }
      .card .cactions {
        display: flex;
        flex-direction: column;
        gap: 6px;
        padding: 0 14px 12px;
      }
      .card .caction {
        border: 1px solid var(--dc-primary-color);
        color: var(--dc-primary-color);
        background: var(--dc-bg-color);
        border-radius: var(--dc-radius-sm);
        padding: 9px;
        font-weight: 600;
        font-size: var(--dc-font-size-sm);
        cursor: pointer;
      }
      .card .caction:hover {
        background: var(--dc-primary-soft);
      }
      .typing {
        align-self: flex-start;
        background: var(--dc-agent-bubble-bg);
        border-radius: var(--dc-radius-bubble);
        border-bottom-left-radius: 4px;
        padding: 12px 14px;
        display: inline-flex;
        gap: 4px;
      }
      .typing i {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: var(--dc-text-light);
        animation: bob 1.2s infinite;
      }
      .typing i:nth-child(2) {
        animation-delay: 0.15s;
      }
      .typing i:nth-child(3) {
        animation-delay: 0.3s;
      }
      @keyframes bob {
        0%,
        60%,
        100% {
          transform: translateY(0);
          opacity: 0.5;
        }
        30% {
          transform: translateY(-4px);
          opacity: 1;
        }
      }
      .composer {
        display: flex;
        align-items: flex-end;
        gap: 8px;
        padding: 10px 12px;
        background: var(--dc-surface-color);
        border-top: 1px solid var(--dc-border-color);
      }
      .field {
        flex: 1;
        background: var(--dc-bg-color);
        border: 1px solid var(--dc-border-color);
        border-radius: var(--dc-radius-sm);
        padding: 10px 12px;
        color: var(--dc-text-color);
        font: inherit;
        resize: none;
        min-height: 40px;
      }
      .field:focus-visible {
        outline: 2px solid var(--dc-primary-color);
        outline-offset: -1px;
      }
      .send {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border: 0;
        background: var(--dc-primary-color);
        color: #fff;
        cursor: pointer;
        display: grid;
        place-items: center;
        flex-shrink: 0;
      }
      .branding {
        text-align: center;
        font-size: var(--dc-font-size-xs);
        color: var(--dc-text-light);
        padding: 6px;
        background: var(--dc-surface-color);
      }
      @media (max-width: 480px) {
        :host {
          width: 100%;
        }
        .panel {
          height: 100dvh;
          max-height: none;
          border-radius: 0;
        }
      }
    `],C([x({type:String})],g.prototype,"channel",2),C([x({type:Boolean})],g.prototype,"typing",2),C([x({type:Boolean})],g.prototype,"inline",2),C([x({type:Boolean})],g.prototype,"branding",2),C([x({attribute:!1})],g.prototype,"contact",2),C([x({attribute:!1})],g.prototype,"messages",2),C([x({attribute:!1})],g.prototype,"adapter",2),C([d1()],g.prototype,"draft",2),C([u1(".stream")],g.prototype,"streamEl",2),g=C([z2("dc-messenger")],g);var L2="https://app-api-v2.dropcowboy.com";function r3(l){if(!l||typeof l!="string")return{};let c=l.split(".");if(c.length<2)return{};try{let a=c[1].replace(/-/g,"+").replace(/_/g,"/"),e=a+"===".slice((a.length+3)%4),s=typeof Buffer<"u"?Buffer.from(e,"base64").toString("utf8"):decodeURIComponent(atob(e).split("").map(function(r){return"%"+("00"+r.charCodeAt(0).toString(16)).slice(-2)}).join(""));return JSON.parse(s)}catch{return{}}}function i3(){return{post:function(l,c,a){return fetch(l,{method:"POST",headers:a,body:JSON.stringify(c)}).then(function(e){return e.json().catch(function(){return{}}).then(function(s){if(!e.ok){let r=new Error(s.message||"SIP mint failed");throw r.status=e.status,r.detail=s.detail,r}return s})})}}}var W2={},Q=null;function O3(l){let c=String(l||L2).replace(/\/$/,"");return c.endsWith("/phone")?c+"/embed/sms":c+"/phone/embed/sms"}function V3(l){return new G2(l||W2)}function G(){return Q||(Q=V3(W2)),Q}async function f3(l){return G().init(l)}function o3(l){G().setTheme(l)}async function n3(l,c){return G().sendMessage(l,c)}function t3(l){return G().addMessageListener(l)}function z3(l){return G().addErrorListener(l)}function m3(l){return G().setToken(l)}async function p3(){let l=Q;Q=null,l&&await l.close()}var G2=class{constructor(c){this.http=c&&c.http||W2.http||i3(),this.token=null,this.session=null,this.phoneApiBase=L2,this.teamId=null,this.theme={},this.listeners=[],this.errorListeners=[],this.defaultFrom=null,this.defaultVoiceIvrId=null,this.defaultConsentId=null}async init(c){if(!U2(c))throw new Error("init({ token }) requires a site token from POST /embed/token");this.phoneApiBase=c.phoneApiBase||L2,this.defaultFrom=c.from||null,this.defaultVoiceIvrId=c.voiceIvrId||null,this.defaultConsentId=c.consentId||null,this._releaseSession(),this.session=_2(c,a=>this._applyToken(a)),this._applyToken(await $2(this.session))}setToken(c){if(!this.session)throw new Error("Call init({ token }) before setToken");return this.session.manager.setToken(c)}getTokenManager(){return this.session?this.session.manager:null}_applyToken(c){this.token=c||null;let a=r3(c);this.teamId=a.team_id||null,this.sandbox=a.sandbox===!0}_releaseSession(){this.session&&(this.session.release(),this.session=null)}setTheme(c){this.theme=Object.assign({},this.theme,c||{}),F2(this.theme)}getTheme(){return this.theme}async sendMessage(c,a){if(this.sandbox)throw new Error("This preview cannot send a live text. Connect your carrier (BYOC) to use the messenger on your site.");if(!this.token)throw new Error("Call init({ token }) before sendMessage");let e=a&&(a.body||a.text);if(!c||!e)throw new Error("sendMessage(to, { body }) requires a destination and body");let s=a&&a.from||this.defaultFrom,r=a&&a.voiceIvrId||this.defaultVoiceIvrId,i={phone_number:c,sms_body:e};s&&(i.caller_id=s),r&&(i.voice_ivr_id=r),a&&a.contactId&&(i.contact_id=a.contactId);let o=a&&a.consentId||this.defaultConsentId;o&&(i.consent_id=o);let f=await this.session.manager.withAuthRetry(M=>this.http.post(O3(this.phoneApiBase),i,{Authorization:"Bearer "+M,"Content-Type":"application/json"})),t={to:c,body:e,sms_id:f&&(f.sms_id||f.id),status:f&&f.status||"queued",direction:"outbound"};return this._emit(t),f}addMessageListener(c){return this.listeners.push(c),()=>{this.listeners=this.listeners.filter(function(a){return a!==c})}}addErrorListener(c){return this.errorListeners.push(c),()=>{this.errorListeners=this.errorListeners.filter(function(a){return a!==c})}}async close(){this._releaseSession(),this.token=null,this.listeners=[],this.errorListeners=[]}_emit(c){for(let a=0;a<this.listeners.length;a++)this.listeners[a](c)}};var M3={init:f3,setTheme:o3,sendMessage:n3,addMessageListener:t3,addErrorListener:z3,setToken:m3,close:p3};Q2({bundle:"messenger",namespaces:{messenger:M3},globals:{DropCowboyMessenger:M3}});})();
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

lit-html/directive-helpers.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@fortawesome/free-regular-svg-icons/index.mjs:
@fortawesome/free-solid-svg-icons/index.mjs:
  (*!
   * Font Awesome Free 7.2.0 by @fontawesome - https://fontawesome.com
   * License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)
   * Copyright 2026 Fonticons, Inc.
   *)
*/

/*! Drop Cowboy Building Blocks shared-inbox (@dropcowboy/embed-shared-inbox 0.0.0). Do not edit. */
"use strict";(()=>{var H3=Object.defineProperty;var E3=Object.getOwnPropertyDescriptor;var C=(l,c,a,e)=>{for(var r=e>1?void 0:e?E3(c,a):c,s=l.length-1,i;s>=0;s--)(i=l[s])&&(r=(e?i(c,a,r):i(r))||r);return e&&r&&H3(c,a,r),r};var g2="__dcBundle",n1=/^DropCowboy./,k=typeof window<"u"?window:globalThis,i2=R3();function R3(){let l={},c={},a=k.DropCowboy;if(a&&typeof a=="object"){let r=Object.keys(a);for(let s=0;s<r.length;s++)l[r[s]]=a[r[s]]}let e=Object.keys(k);for(let r=0;r<e.length;r++)n1.test(e[r])&&(c[e[r]]=k[e[r]]);return{namespaces:l,globals:c}}function x2(l,c){return Object.prototype.hasOwnProperty.call(l,c)}function o1(l,c,a,e){let r=Object.keys(l);for(let s=0;s<r.length;s++){let i=r[s];!e(i)||x2(a,i)||(x2(c,i)?l[i]!==c[i]&&(l[i]=c[i]):delete l[i])}}function f1(l,c,a){return l&&l[g2]===a?l:(x2(c,g2)||Object.defineProperty(c,g2,{value:a}),c)}function D3(){return!0}function t1(l){let c=l.namespaces||{},a=l.globals||{};(!k.DropCowboy||typeof k.DropCowboy!="object")&&(k.DropCowboy={});let e=k.DropCowboy;o1(e,i2.namespaces,c,D3),o1(k,i2.globals,a,function(f){return n1.test(f)});let r={},s=Object.keys(c);for(let f=0;f<s.length;f++){let o=s[f];e[o]=f1(i2.namespaces[o],c[o],l.bundle),r[o]=e[o]}let i=Object.keys(a);for(let f=0;f<i.length;f++){let o=i[f];k[o]=f1(i2.globals[o],a[o],l.bundle)}return r}var o2=globalThis,f2=o2.ShadowRoot&&(o2.ShadyCSS===void 0||o2.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,S2=Symbol(),m1=new WeakMap,K=class{constructor(c,a,e){if(this._$cssResult$=!0,e!==S2)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=c,this.t=a}get styleSheet(){let c=this.o,a=this.t;if(f2&&c===void 0){let e=a!==void 0&&a.length===1;e&&(c=m1.get(a)),c===void 0&&((this.o=c=new CSSStyleSheet).replaceSync(this.cssText),e&&m1.set(a,c))}return c}toString(){return this.cssText}},z1=l=>new K(typeof l=="string"?l:l+"",void 0,S2),H=(l,...c)=>{let a=l.length===1?l[0]:c.reduce((e,r,s)=>e+(i=>{if(i._$cssResult$===!0)return i.cssText;if(typeof i=="number")return i;throw Error("Value passed to 'css' function must be a 'css' function result: "+i+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+l[s+1],l[0]);return new K(a,l,S2)},p1=(l,c)=>{if(f2)l.adoptedStyleSheets=c.map(a=>a instanceof CSSStyleSheet?a:a.styleSheet);else for(let a of c){let e=document.createElement("style"),r=o2.litNonce;r!==void 0&&e.setAttribute("nonce",r),e.textContent=a.cssText,l.appendChild(e)}},N2=f2?l=>l:l=>l instanceof CSSStyleSheet?(c=>{let a="";for(let e of c.cssRules)a+=e.cssText;return z1(a)})(l):l;var{is:_3,defineProperty:U3,getOwnPropertyDescriptor:q3,getOwnPropertyNames:$3,getOwnPropertySymbols:G3,getPrototypeOf:I3}=Object,n2=globalThis,M1=n2.trustedTypes,W3=M1?M1.emptyScript:"",O3=n2.reactiveElementPolyfillSupport,X=(l,c)=>l,Q={toAttribute(l,c){switch(c){case Boolean:l=l?W3:null;break;case Object:case Array:l=l==null?l:JSON.stringify(l)}return l},fromAttribute(l,c){let a=l;switch(c){case Boolean:a=l!==null;break;case Number:a=l===null?null:Number(l);break;case Object:case Array:try{a=JSON.parse(l)}catch{a=null}}return a}},t2=(l,c)=>!_3(l,c),d1={attribute:!0,type:String,converter:Q,reflect:!1,useDefault:!1,hasChanged:t2};Symbol.metadata??=Symbol("metadata"),n2.litPropertyMetadata??=new WeakMap;var w=class extends HTMLElement{static addInitializer(c){this._$Ei(),(this.l??=[]).push(c)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(c,a=d1){if(a.state&&(a.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(c)&&((a=Object.create(a)).wrapped=!0),this.elementProperties.set(c,a),!a.noAccessor){let e=Symbol(),r=this.getPropertyDescriptor(c,e,a);r!==void 0&&U3(this.prototype,c,r)}}static getPropertyDescriptor(c,a,e){let{get:r,set:s}=q3(this.prototype,c)??{get(){return this[a]},set(i){this[a]=i}};return{get:r,set(i){let f=r?.call(this);s?.call(this,i),this.requestUpdate(c,f,e)},configurable:!0,enumerable:!0}}static getPropertyOptions(c){return this.elementProperties.get(c)??d1}static _$Ei(){if(this.hasOwnProperty(X("elementProperties")))return;let c=I3(this);c.finalize(),c.l!==void 0&&(this.l=[...c.l]),this.elementProperties=new Map(c.elementProperties)}static finalize(){if(this.hasOwnProperty(X("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(X("properties"))){let a=this.properties,e=[...$3(a),...G3(a)];for(let r of e)this.createProperty(r,a[r])}let c=this[Symbol.metadata];if(c!==null){let a=litPropertyMetadata.get(c);if(a!==void 0)for(let[e,r]of a)this.elementProperties.set(e,r)}this._$Eh=new Map;for(let[a,e]of this.elementProperties){let r=this._$Eu(a,e);r!==void 0&&this._$Eh.set(r,a)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(c){let a=[];if(Array.isArray(c)){let e=new Set(c.flat(1/0).reverse());for(let r of e)a.unshift(N2(r))}else c!==void 0&&a.push(N2(c));return a}static _$Eu(c,a){let e=a.attribute;return e===!1?void 0:typeof e=="string"?e:typeof c=="string"?c.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(c=>this.enableUpdating=c),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(c=>c(this))}addController(c){(this._$EO??=new Set).add(c),this.renderRoot!==void 0&&this.isConnected&&c.hostConnected?.()}removeController(c){this._$EO?.delete(c)}_$E_(){let c=new Map,a=this.constructor.elementProperties;for(let e of a.keys())this.hasOwnProperty(e)&&(c.set(e,this[e]),delete this[e]);c.size>0&&(this._$Ep=c)}createRenderRoot(){let c=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return p1(c,this.constructor.elementStyles),c}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(c=>c.hostConnected?.())}enableUpdating(c){}disconnectedCallback(){this._$EO?.forEach(c=>c.hostDisconnected?.())}attributeChangedCallback(c,a,e){this._$AK(c,e)}_$ET(c,a){let e=this.constructor.elementProperties.get(c),r=this.constructor._$Eu(c,e);if(r!==void 0&&e.reflect===!0){let s=(e.converter?.toAttribute!==void 0?e.converter:Q).toAttribute(a,e.type);this._$Em=c,s==null?this.removeAttribute(r):this.setAttribute(r,s),this._$Em=null}}_$AK(c,a){let e=this.constructor,r=e._$Eh.get(c);if(r!==void 0&&this._$Em!==r){let s=e.getPropertyOptions(r),i=typeof s.converter=="function"?{fromAttribute:s.converter}:s.converter?.fromAttribute!==void 0?s.converter:Q;this._$Em=r;let f=i.fromAttribute(a,s.type);this[r]=f??this._$Ej?.get(r)??f,this._$Em=null}}requestUpdate(c,a,e,r=!1,s){if(c!==void 0){let i=this.constructor;if(r===!1&&(s=this[c]),e??=i.getPropertyOptions(c),!((e.hasChanged??t2)(s,a)||e.useDefault&&e.reflect&&s===this._$Ej?.get(c)&&!this.hasAttribute(i._$Eu(c,e))))return;this.C(c,a,e)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(c,a,{useDefault:e,reflect:r,wrapped:s},i){e&&!(this._$Ej??=new Map).has(c)&&(this._$Ej.set(c,i??a??this[c]),s!==!0||i!==void 0)||(this._$AL.has(c)||(this.hasUpdated||e||(a=void 0),this._$AL.set(c,a)),r===!0&&this._$Em!==c&&(this._$Eq??=new Set).add(c))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(a){Promise.reject(a)}let c=this.scheduleUpdate();return c!=null&&await c,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[r,s]of this._$Ep)this[r]=s;this._$Ep=void 0}let e=this.constructor.elementProperties;if(e.size>0)for(let[r,s]of e){let{wrapped:i}=s,f=this[r];i!==!0||this._$AL.has(r)||f===void 0||this.C(r,void 0,s,f)}}let c=!1,a=this._$AL;try{c=this.shouldUpdate(a),c?(this.willUpdate(a),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(a)):this._$EM()}catch(e){throw c=!1,this._$EM(),e}c&&this._$AE(a)}willUpdate(c){}_$AE(c){this._$EO?.forEach(a=>a.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(c)),this.updated(c)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(c){return!0}update(c){this._$Eq&&=this._$Eq.forEach(a=>this._$ET(a,this[a])),this._$EM()}updated(c){}firstUpdated(c){}};w.elementStyles=[],w.shadowRootOptions={mode:"open"},w[X("elementProperties")]=new Map,w[X("finalized")]=new Map,O3?.({ReactiveElement:w}),(n2.reactiveElementVersions??=[]).push("2.1.2");var k2=globalThis,L1=l=>l,m2=k2.trustedTypes,u1=m2?m2.createPolicy("lit-html",{createHTML:l=>l}):void 0,w2="$lit$",y=`lit$${Math.random().toFixed(9).slice(2)}$`,y2="?"+y,V3=`<${y2}>`,D=document,Y=()=>D.createComment(""),Z=l=>l===null||typeof l!="object"&&typeof l!="function",A2=Array.isArray,S1=l=>A2(l)||typeof l?.[Symbol.iterator]=="function",b2=`[ 	
\f\r]`,J=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,v1=/-->/g,h1=/>/g,E=RegExp(`>|${b2}(?:([^\\s"'>=/]+)(${b2}*=${b2}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),C1=/'/g,g1=/"/g,N1=/^(?:script|style|textarea|title)$/i,T2=l=>(c,...a)=>({_$litType$:l,strings:c,values:a}),M=T2(1),k0=T2(2),w0=T2(3),A=Symbol.for("lit-noChange"),d=Symbol.for("lit-nothing"),x1=new WeakMap,R=D.createTreeWalker(D,129);function b1(l,c){if(!A2(l)||!l.hasOwnProperty("raw"))throw Error("invalid template strings array");return u1!==void 0?u1.createHTML(c):c}var k1=(l,c)=>{let a=l.length-1,e=[],r,s=c===2?"<svg>":c===3?"<math>":"",i=J;for(let f=0;f<a;f++){let o=l[f],t,L,n=-1,m=0;for(;m<o.length&&(i.lastIndex=m,L=i.exec(o),L!==null);)m=i.lastIndex,i===J?L[1]==="!--"?i=v1:L[1]!==void 0?i=h1:L[2]!==void 0?(N1.test(L[2])&&(r=RegExp("</"+L[2],"g")),i=E):L[3]!==void 0&&(i=E):i===E?L[0]===">"?(i=r??J,n=-1):L[1]===void 0?n=-2:(n=i.lastIndex-L[2].length,t=L[1],i=L[3]===void 0?E:L[3]==='"'?g1:C1):i===g1||i===C1?i=E:i===v1||i===h1?i=J:(i=E,r=void 0);let z=i===E&&l[f+1].startsWith("/>")?" ":"";s+=i===J?o+V3:n>=0?(e.push(t),o.slice(0,n)+w2+o.slice(n)+y+z):o+y+(n===-2?f:z)}return[b1(l,s+(l[a]||"<?>")+(c===2?"</svg>":c===3?"</math>":"")),e]},c2=class l{constructor({strings:c,_$litType$:a},e){let r;this.parts=[];let s=0,i=0,f=c.length-1,o=this.parts,[t,L]=k1(c,a);if(this.el=l.createElement(t,e),R.currentNode=this.el.content,a===2||a===3){let n=this.el.content.firstChild;n.replaceWith(...n.childNodes)}for(;(r=R.nextNode())!==null&&o.length<f;){if(r.nodeType===1){if(r.hasAttributes())for(let n of r.getAttributeNames())if(n.endsWith(w2)){let m=L[i++],z=r.getAttribute(n).split(y),h=/([.?@])?(.*)/.exec(m);o.push({type:1,index:s,name:h[2],strings:z,ctor:h[1]==="."?p2:h[1]==="?"?M2:h[1]==="@"?d2:U}),r.removeAttribute(n)}else n.startsWith(y)&&(o.push({type:6,index:s}),r.removeAttribute(n));if(N1.test(r.tagName)){let n=r.textContent.split(y),m=n.length-1;if(m>0){r.textContent=m2?m2.emptyScript:"";for(let z=0;z<m;z++)r.append(n[z],Y()),R.nextNode(),o.push({type:2,index:++s});r.append(n[m],Y())}}}else if(r.nodeType===8)if(r.data===y2)o.push({type:2,index:s});else{let n=-1;for(;(n=r.data.indexOf(y,n+1))!==-1;)o.push({type:7,index:s}),n+=y.length-1}s++}}static createElement(c,a){let e=D.createElement("template");return e.innerHTML=c,e}};function _(l,c,a=l,e){if(c===A)return c;let r=e!==void 0?a._$Co?.[e]:a._$Cl,s=Z(c)?void 0:c._$litDirective$;return r?.constructor!==s&&(r?._$AO?.(!1),s===void 0?r=void 0:(r=new s(l),r._$AT(l,a,e)),e!==void 0?(a._$Co??=[])[e]=r:a._$Cl=r),r!==void 0&&(c=_(l,r._$AS(l,c.values),r,e)),c}var z2=class{constructor(c,a){this._$AV=[],this._$AN=void 0,this._$AD=c,this._$AM=a}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(c){let{el:{content:a},parts:e}=this._$AD,r=(c?.creationScope??D).importNode(a,!0);R.currentNode=r;let s=R.nextNode(),i=0,f=0,o=e[0];for(;o!==void 0;){if(i===o.index){let t;o.type===2?t=new G(s,s.nextSibling,this,c):o.type===1?t=new o.ctor(s,o.name,o.strings,this,c):o.type===6&&(t=new L2(s,this,c)),this._$AV.push(t),o=e[++f]}i!==o?.index&&(s=R.nextNode(),i++)}return R.currentNode=D,r}p(c){let a=0;for(let e of this._$AV)e!==void 0&&(e.strings!==void 0?(e._$AI(c,e,a),a+=e.strings.length-2):e._$AI(c[a])),a++}},G=class l{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(c,a,e,r){this.type=2,this._$AH=d,this._$AN=void 0,this._$AA=c,this._$AB=a,this._$AM=e,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let c=this._$AA.parentNode,a=this._$AM;return a!==void 0&&c?.nodeType===11&&(c=a.parentNode),c}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(c,a=this){c=_(this,c,a),Z(c)?c===d||c==null||c===""?(this._$AH!==d&&this._$AR(),this._$AH=d):c!==this._$AH&&c!==A&&this._(c):c._$litType$!==void 0?this.$(c):c.nodeType!==void 0?this.T(c):S1(c)?this.k(c):this._(c)}O(c){return this._$AA.parentNode.insertBefore(c,this._$AB)}T(c){this._$AH!==c&&(this._$AR(),this._$AH=this.O(c))}_(c){this._$AH!==d&&Z(this._$AH)?this._$AA.nextSibling.data=c:this.T(D.createTextNode(c)),this._$AH=c}$(c){let{values:a,_$litType$:e}=c,r=typeof e=="number"?this._$AC(c):(e.el===void 0&&(e.el=c2.createElement(b1(e.h,e.h[0]),this.options)),e);if(this._$AH?._$AD===r)this._$AH.p(a);else{let s=new z2(r,this),i=s.u(this.options);s.p(a),this.T(i),this._$AH=s}}_$AC(c){let a=x1.get(c.strings);return a===void 0&&x1.set(c.strings,a=new c2(c)),a}k(c){A2(this._$AH)||(this._$AH=[],this._$AR());let a=this._$AH,e,r=0;for(let s of c)r===a.length?a.push(e=new l(this.O(Y()),this.O(Y()),this,this.options)):e=a[r],e._$AI(s),r++;r<a.length&&(this._$AR(e&&e._$AB.nextSibling,r),a.length=r)}_$AR(c=this._$AA.nextSibling,a){for(this._$AP?.(!1,!0,a);c!==this._$AB;){let e=L1(c).nextSibling;L1(c).remove(),c=e}}setConnected(c){this._$AM===void 0&&(this._$Cv=c,this._$AP?.(c))}},U=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(c,a,e,r,s){this.type=1,this._$AH=d,this._$AN=void 0,this.element=c,this.name=a,this._$AM=r,this.options=s,e.length>2||e[0]!==""||e[1]!==""?(this._$AH=Array(e.length-1).fill(new String),this.strings=e):this._$AH=d}_$AI(c,a=this,e,r){let s=this.strings,i=!1;if(s===void 0)c=_(this,c,a,0),i=!Z(c)||c!==this._$AH&&c!==A,i&&(this._$AH=c);else{let f=c,o,t;for(c=s[0],o=0;o<s.length-1;o++)t=_(this,f[e+o],a,o),t===A&&(t=this._$AH[o]),i||=!Z(t)||t!==this._$AH[o],t===d?c=d:c!==d&&(c+=(t??"")+s[o+1]),this._$AH[o]=t}i&&!r&&this.j(c)}j(c){c===d?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,c??"")}},p2=class extends U{constructor(){super(...arguments),this.type=3}j(c){this.element[this.name]=c===d?void 0:c}},M2=class extends U{constructor(){super(...arguments),this.type=4}j(c){this.element.toggleAttribute(this.name,!!c&&c!==d)}},d2=class extends U{constructor(c,a,e,r,s){super(c,a,e,r,s),this.type=5}_$AI(c,a=this){if((c=_(this,c,a,0)??d)===A)return;let e=this._$AH,r=c===d&&e!==d||c.capture!==e.capture||c.once!==e.once||c.passive!==e.passive,s=c!==d&&(e===d||r);r&&this.element.removeEventListener(this.name,this,e),s&&this.element.addEventListener(this.name,this,c),this._$AH=c}handleEvent(c){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,c):this._$AH.handleEvent(c)}},L2=class{constructor(c,a,e){this.element=c,this.type=6,this._$AN=void 0,this._$AM=a,this.options=e}get _$AU(){return this._$AM._$AU}_$AI(c){_(this,c)}},w1={M:w2,P:y,A:y2,C:1,L:k1,R:z2,D:S1,V:_,I:G,H:U,N:M2,U:d2,B:p2,F:L2},j3=k2.litHtmlPolyfillSupport;j3?.(c2,G),(k2.litHtmlVersions??=[]).push("3.3.3");var y1=(l,c,a)=>{let e=a?.renderBefore??c,r=e._$litPart$;if(r===void 0){let s=a?.renderBefore??null;e._$litPart$=r=new G(c.insertBefore(Y(),s),s,void 0,a??{})}return r._$AI(l),r};var P2=globalThis,T=class extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let c=super.createRenderRoot();return this.renderOptions.renderBefore??=c.firstChild,c}update(c){let a=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(c),this._$Do=y1(a,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return A}};T._$litElement$=!0,T.finalized=!0,P2.litElementHydrateSupport?.({LitElement:T});var K3=P2.litElementPolyfillSupport;K3?.({LitElement:T});(P2.litElementVersions??=[]).push("4.2.2");var A1=(l,c)=>{customElements.get(l)||customElements.define(l,c)},u2=l=>(c,a)=>{a!==void 0?a.addInitializer(()=>{A1(l,c)}):A1(l,c)};var X3={attribute:!0,type:String,converter:Q,reflect:!1,hasChanged:t2},Q3=(l=X3,c,a)=>{let{kind:e,metadata:r}=a,s=globalThis.litPropertyMetadata.get(r);if(s===void 0&&globalThis.litPropertyMetadata.set(r,s=new Map),e==="setter"&&((l=Object.create(l)).wrapped=!0),s.set(a.name,l),e==="accessor"){let{name:i}=a;return{set(f){let o=c.get.call(this);c.set.call(this,f),this.requestUpdate(i,o,l,!0,f)},init(f){return f!==void 0&&this.C(i,void 0,l,f),f}}}if(e==="setter"){let{name:i}=a;return function(f){let o=this[i];c.call(this,f),this.requestUpdate(i,o,l,!0,f)}}throw Error("Unsupported decorator location: "+e)};function x(l){return(c,a)=>typeof a=="object"?Q3(l,c,a):((e,r,s)=>{let i=r.hasOwnProperty(s);return r.constructor.createProperty(s,e),i?Object.getOwnPropertyDescriptor(r,s):void 0})(l,c,a)}var q=(l,c,a)=>(a.configurable=!0,a.enumerable=!0,Reflect.decorate&&typeof c!="object"&&Object.defineProperty(l,c,a),a);function T1(l,c){return(a,e,r)=>{let s=i=>i.renderRoot?.querySelector(l)??null;if(c){let{get:i,set:f}=typeof e=="object"?a:r??(()=>{let o=Symbol();return{get(){return this[o]},set(t){this[o]=t}}})();return q(a,e,{get(){let o=i.call(this);return o===void 0&&(o=s(this),(o!==null||this.hasUpdated)&&f.call(this,o)),o}})}return q(a,e,{get(){return s(this)}})}}var P1={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},B1=l=>(...c)=>({_$litDirective$:l,values:c}),v2=class{constructor(c){}get _$AU(){return this._$AM._$AU}_$AT(c,a,e){this._$Ct=c,this._$AM=a,this._$Ci=e}_$AS(c,a){return this.update(c,a)}update(c,a){return this.render(...a)}};var{I:J3}=w1,F1=l=>l;var H1=()=>document.createComment(""),I=(l,c,a)=>{let e=l._$AA.parentNode,r=c===void 0?l._$AB:c._$AA;if(a===void 0){let s=e.insertBefore(H1(),r),i=e.insertBefore(H1(),r);a=new J3(s,i,l,l.options)}else{let s=a._$AB.nextSibling,i=a._$AM,f=i!==l;if(f){let o;a._$AQ?.(l),a._$AM=l,a._$AP!==void 0&&(o=l._$AU)!==i._$AU&&a._$AP(o)}if(s!==r||f){let o=a._$AA;for(;o!==s;){let t=F1(o).nextSibling;F1(e).insertBefore(o,r),o=t}}}return a},P=(l,c,a=l)=>(l._$AI(c,a),l),Y3={},E1=(l,c=Y3)=>l._$AH=c,R1=l=>l._$AH,h2=l=>{l._$AR(),l._$AA.remove()};var D1=(l,c,a)=>{let e=new Map;for(let r=c;r<=a;r++)e.set(l[r],r);return e},B2=B1(class extends v2{constructor(l){if(super(l),l.type!==P1.CHILD)throw Error("repeat() can only be used in text expressions")}dt(l,c,a){let e;a===void 0?a=c:c!==void 0&&(e=c);let r=[],s=[],i=0;for(let f of l)r[i]=e?e(f,i):i,s[i]=a(f,i),i++;return{values:s,keys:r}}render(l,c,a){return this.dt(l,c,a).values}update(l,[c,a,e]){let r=R1(l),{values:s,keys:i}=this.dt(c,a,e);if(!Array.isArray(r))return this.ut=i,s;let f=this.ut??=[],o=[],t,L,n=0,m=r.length-1,z=0,h=s.length-1;for(;n<=m&&z<=h;)if(r[n]===null)n++;else if(r[m]===null)m--;else if(f[n]===i[z])o[z]=P(r[n],s[z]),n++,z++;else if(f[m]===i[h])o[h]=P(r[m],s[h]),m--,h--;else if(f[n]===i[h])o[h]=P(r[n],s[h]),I(l,o[h+1],r[n]),n++,h--;else if(f[m]===i[z])o[z]=P(r[m],s[z]),I(l,r[n],r[m]),m--,z++;else if(t===void 0&&(t=D1(i,z,h),L=D1(f,n,m)),t.has(f[n]))if(t.has(f[m])){let N=L.get(i[z]),F=N!==void 0?r[N]:null;if(F===null){let e2=I(l,r[n]);P(e2,s[z]),o[z]=e2}else o[z]=P(F,s[z]),I(l,r[n],F),r[N]=null;z++}else h2(r[m]),m--;else h2(r[n]),n++;for(;z<=h;){let N=I(l,o[h+1]);P(N,s[z]),o[z++]=N}for(;n<=m;){let N=r[n++];N!==null&&h2(N)}return this.ut=i,E1(l,o),A}});var F2=H`
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
`;var _1="data-dc-tokens",Z3={"--dc-primary-color":"#2563eb","--dc-primary-hover":"#1d4ed8","--dc-primary-text":"#ffffff","--dc-primary-soft":"#eaf1fe","--dc-bg-color":"#ffffff","--dc-surface-color":"#f7f8fa","--dc-surface-2":"#eef0f4","--dc-border-color":"#ebedf0","--dc-text-color":"#1a1d21","--dc-text-muted":"#5c6370","--dc-text-light":"#646b78","--dc-agent-bubble-bg":"#f1f3f6","--dc-agent-bubble-text":"#1a1d21","--dc-visitor-bubble-bg":"var(--dc-primary-color)","--dc-visitor-bubble-text":"var(--dc-primary-text)","--dc-online":"#22c55e","--dc-online-soft":"#e7f8ed","--dc-online-text":"#15803d","--dc-danger":"#ef4444","--dc-danger-soft":"#fdecec","--dc-danger-text":"#b91c1c","--dc-warning":"#f59e0b","--dc-warning-soft":"#fef3e2","--dc-warning-text":"#b45309","--dc-info":"#0ea5e9","--dc-info-soft":"#e6f6fe","--dc-info-text":"#0369a1","--dc-shadow":"0 8px 24px rgba(15, 23, 42, 0.08)","--dc-shadow-sm":"0 1px 2px rgba(15, 23, 42, 0.06)","--dc-radius":"12px","--dc-radius-sm":"8px","--dc-radius-bubble":"12px","--dc-font-family":'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',"--dc-font-size":"14px","--dc-font-size-sm":"12px","--dc-font-size-xs":"11px","--dc-transition":"0.15s ease","--dc-ease-panel":"cubic-bezier(0.16, 1, 0.3, 1)"},c0={"--dc-primary-color":"#60a5fa","--dc-primary-hover":"#93c5fd","--dc-primary-text":"#0f172a","--dc-primary-soft":"#1e2a44","--dc-bg-color":"#0f1419","--dc-surface-color":"#1a1f26","--dc-surface-2":"#242b33","--dc-border-color":"#2e3640","--dc-text-color":"#f3f4f6","--dc-text-muted":"#aab2bd","--dc-text-light":"#959ca6","--dc-agent-bubble-bg":"#2e3138","--dc-agent-bubble-text":"#f3f4f6","--dc-online-soft":"#14321f","--dc-online-text":"#4ade80","--dc-danger-soft":"#3a1d1d","--dc-danger-text":"#fca5a5","--dc-warning-soft":"#3a2c12","--dc-warning-text":"#fcd34d","--dc-info-soft":"#12303d","--dc-info-text":"#7dd3fc"};function U1(l,c){let a=Object.keys(c),e="";for(let r=0;r<a.length;r++)e+=a[r]+":"+c[a[r]]+";";return l+"{"+e+"}"}var a0=U1(":where(:root)",Z3)+U1(':where([data-dc-theme="dark"])',c0);function H2(l){let c=l||(typeof document<"u"?document:null);if(!c||!c.head||typeof c.createElement!="function"||c.querySelector("style["+_1+"]"))return!1;let a=c.createElement("style");return a.setAttribute(_1,""),a.textContent=a0,c.head.insertBefore(a,c.head.firstChild),!0}var b=class extends T{connectedCallback(){H2(this.ownerDocument),super.connectedCallback()}announce(c){let a=this.renderRoot?.querySelector("[data-dc-live]");a||(a=document.createElement("div"),a.setAttribute("data-dc-live",""),a.setAttribute("aria-live","polite"),a.setAttribute("role","status"),a.style.cssText="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;",this.renderRoot?.appendChild(a)),a.textContent="",requestAnimationFrame(()=>{a&&(a.textContent=c)})}};b.styles=F2;var l0={reconnecting:{tone:"warning",text:"Reconnecting\u2026 live updates will resume automatically.",spinner:!0},offline:{tone:"danger",text:"You're offline. We'll reconnect and sync as soon as your connection returns."},"other-tab":{tone:"info",text:"This session is active in another tab. Calls and the dialer run there.",action:"Use it here",event:"dc-resume-here"},"session-expiring":{tone:"warning",text:"Your secure session expires soon.",action:"Stay signed in",event:"dc-refresh-session"},"session-expired":{tone:"danger",text:"Your session expired for security. Sign in again to continue.",action:"Sign in",event:"dc-reauth"}},$=class extends b{constructor(){super(...arguments);this.kind="reconnecting"}render(){let a=l0[this.kind],e=a.tone==="danger"?"alert":"status";return M`
      <div class="banner ${a.tone}" role=${e}>
        ${a.spinner?M`<span class="spin"></span>`:M`<span class="dot"></span>`}
        <span class="txt">${a.text}</span>
        ${a.action?M`<button class="act" @click=${()=>this.emit(a.event??"dc-action")}>${a.action}</button>`:d}
      </div>
    `}emit(a){this.dispatchEvent(new CustomEvent(a,{bubbles:!0,composed:!0}))}};$.styles=[b.styles,H`
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
    `],C([x({type:String})],$.prototype,"kind",2),$=C([u2("dc-system-banner")],$);var q1={prefix:"far",iconName:"circle",icon:[512,512,[128308,128309,128992,128993,128994,128995,128996,9679,9898,9899,11044,61708,61915],"f111","M464 256a208 208 0 1 0 -416 0 208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0 256 256 0 1 1 -512 0z"]};var $1={prefix:"fas",iconName:"minus",icon:[448,512,[8211,8722,10134,"subtract"],"f068","M0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32z"]};var G1={prefix:"fas",iconName:"microphone-slash",icon:[576,512,[],"f131","M41-24.9c-9.4-9.4-24.6-9.4-33.9 0S-2.3-.3 7 9.1l528 528c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9L424.7 358.8C458.9 324.2 480 276.6 480 224l0-40c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 40c0 39.3-15.7 74.9-41.3 100.9L356.8 291C373.6 273.7 384 250 384 224l0-128c0-53-43-96-96-96s-96 43-96 96l0 30.2-151-151zm298.3 434l-41.4-41.4c-3.3 .2-6.5 .3-9.8 .3-79.5 0-144-64.5-144-144l0-10.2-43.6-43.6c-2.8 3.9-4.4 8.7-4.4 13.8l0 40c0 97.9 73.3 178.7 168 190.5l0 49.5-48 0c-13.3 0-24 10.7-24 24s10.7 24 24 24l144 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-48 0 0-49.5c9.3-1.2 18.4-3 27.3-5.4z"]};var I1={prefix:"fas",iconName:"comment-sms",icon:[512,512,["sms"],"f7cd","M256 480c141.4 0 256-107.5 256-240S397.4 0 256 0 0 107.5 0 240c0 54.3 19.2 104.3 51.6 144.5L2.8 476.8c-4.8 9-3.3 20 3.6 27.5s17.8 9.8 27.1 5.8l118.4-50.7C183.7 472.6 218.9 480 256 480zM140.8 172.8l19.2 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-19.2 0c-5.3 0-9.6 4.3-9.6 9.6s4.3 9.6 9.6 9.6c23 0 41.6 18.6 41.6 41.6s-18.6 41.6-41.6 41.6l-25.6 0c-8.8 0-16-7.2-16-16s7.2-16 16-16l25.6 0c5.3 0 9.6-4.3 9.6-9.6s-4.3-9.6-9.6-9.6c-23 0-41.6-18.6-41.6-41.6s18.6-41.6 41.6-41.6zm188.8 41.6c0-23 18.6-41.6 41.6-41.6l19.2 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-19.2 0c-5.3 0-9.6 4.3-9.6 9.6s4.3 9.6 9.6 9.6c23 0 41.6 18.6 41.6 41.6s-18.6 41.6-41.6 41.6l-25.6 0c-8.8 0-16-7.2-16-16s7.2-16 16-16l25.6 0c5.3 0 9.6-4.3 9.6-9.6s-4.3-9.6-9.6-9.6c-23 0-41.6-18.6-41.6-41.6zm-98.3-33.8l24.7 41.1 24.7-41.1c3.7-6.2 11.1-9.1 18-7.2s11.7 8.2 11.7 15.4l0 102.4c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-44.6-8.7 14.5c-2.9 4.8-8.1 7.8-13.7 7.8s-10.8-3-13.7-7.8l-8.7-14.5 0 44.6c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-102.4c0-7.2 4.8-13.5 11.7-15.4s14.3 1 18 7.2z"]};var W1={prefix:"fas",iconName:"envelope",icon:[512,512,[128386,9993,61443],"f0e0","M48 64c-26.5 0-48 21.5-48 48 0 15.1 7.1 29.3 19.2 38.4l208 156c17.1 12.8 40.5 12.8 57.6 0l208-156c12.1-9.1 19.2-23.3 19.2-38.4 0-26.5-21.5-48-48-48L48 64zM0 196L0 384c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-188-198.4 148.8c-34.1 25.6-81.1 25.6-115.2 0L0 196z"]};var O1={prefix:"fas",iconName:"bell",icon:[448,512,[128276,61602],"f0f3","M224 0c-17.7 0-32 14.3-32 32l0 3.2C119 50 64 114.6 64 192l0 21.7c0 48.1-16.4 94.8-46.4 132.4L7.8 358.3C2.7 364.6 0 372.4 0 380.5 0 400.1 15.9 416 35.5 416l376.9 0c19.6 0 35.5-15.9 35.5-35.5 0-8.1-2.7-15.9-7.8-22.2l-9.8-12.2C400.4 308.5 384 261.8 384 213.7l0-21.7c0-77.4-55-142-128-156.8l0-3.2c0-17.7-14.3-32-32-32zM162 464c7.1 27.6 32.2 48 62 48s54.9-20.4 62-48l-124 0z"]};var V1={prefix:"fas",iconName:"calendar-days",icon:[448,512,["calendar-alt"],"f073","M128 0c17.7 0 32 14.3 32 32l0 32 128 0 0-32c0-17.7 14.3-32 32-32s32 14.3 32 32l0 32 32 0c35.3 0 64 28.7 64 64l0 288c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64L0 128C0 92.7 28.7 64 64 64l32 0 0-32c0-17.7 14.3-32 32-32zM64 240l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm128 0l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0zM64 368l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0zm112 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16z"]};var j1={prefix:"fas",iconName:"ellipsis",icon:[448,512,["ellipsis-h"],"f141","M0 256a56 56 0 1 1 112 0 56 56 0 1 1 -112 0zm168 0a56 56 0 1 1 112 0 56 56 0 1 1 -112 0zm224-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112z"]};var K1={prefix:"fas",iconName:"magnifying-glass",icon:[512,512,[128269,"search"],"f002","M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376C296.3 401.1 253.9 416 208 416 93.1 416 0 322.9 0 208S93.1 0 208 0 416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"]};var X1={prefix:"fas",iconName:"ban",icon:[512,512,[128683,"cancel"],"f05e","M367.2 412.5L99.5 144.8c-22.4 31.4-35.5 69.8-35.5 111.2 0 106 86 192 192 192 41.5 0 79.9-13.1 111.2-35.5zm45.3-45.3c22.4-31.4 35.5-69.8 35.5-111.2 0-106-86-192-192-192-41.5 0-79.9 13.1-111.2 35.5L412.5 367.2zM0 256a256 256 0 1 1 512 0 256 256 0 1 1 -512 0z"]};var Q1={prefix:"fas",iconName:"record-vinyl",icon:[512,512,[],"f8d9","M0 256a256 256 0 1 1 512 0 256 256 0 1 1 -512 0zm256-96a96 96 0 1 1 0 192 96 96 0 1 1 0-192zm0 240a144 144 0 1 0 0-288 144 144 0 1 0 0 288zm0-112a32 32 0 1 0 0-64 32 32 0 1 0 0 64z"]};var J1={prefix:"fas",iconName:"palette",icon:[512,512,[127912],"f53f","M512 256c0 .9 0 1.8 0 2.7-.4 36.5-33.6 61.3-70.1 61.3L344 320c-26.5 0-48 21.5-48 48 0 3.4 .4 6.7 1 9.9 2.1 10.2 6.5 20 10.8 29.9 6.1 13.8 12.1 27.5 12.1 42 0 31.8-21.6 60.7-53.4 62-3.5 .1-7 .2-10.6 .2-141.4 0-256-114.6-256-256S114.6 0 256 0 512 114.6 512 256zM128 288a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm0-96a32 32 0 1 0 0-64 32 32 0 1 0 0 64zM288 96a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm96 96a32 32 0 1 0 0-64 32 32 0 1 0 0 64z"]};var Y1={prefix:"fas",iconName:"sitemap",icon:[512,512,[],"f0e8","M192 64c0-17.7 14.3-32 32-32l64 0c17.7 0 32 14.3 32 32l0 64c0 17.7-14.3 32-32 32l-8 0 0 64 120 0c39.8 0 72 32.2 72 72l0 56 8 0c17.7 0 32 14.3 32 32l0 64c0 17.7-14.3 32-32 32l-64 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l8 0 0-56c0-13.3-10.7-24-24-24l-120 0 0 80 8 0c17.7 0 32 14.3 32 32l0 64c0 17.7-14.3 32-32 32l-64 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l8 0 0-80-120 0c-13.3 0-24 10.7-24 24l0 56 8 0c17.7 0 32 14.3 32 32l0 64c0 17.7-14.3 32-32 32l-64 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l8 0 0-56c0-39.8 32.2-72 72-72l120 0 0-64-8 0c-17.7 0-32-14.3-32-32l0-64z"]};var Z1={prefix:"fas",iconName:"fax",icon:[512,512,[128224,128439],"f1ac","M160 64l0 80 64 0 0-80 146.7 0 45.3 45.3 0 34.7 64 0 0-34.7c0-17-6.7-33.3-18.7-45.3L416 18.7C404 6.7 387.7 0 370.7 0L224 0c-35.3 0-64 28.7-64 64zM32 128c-17.7 0-32 14.3-32 32L0 448c0 17.7 14.3 32 32 32l48 0c17.7 0 32-14.3 32-32l0-288c0-17.7-14.3-32-32-32l-48 0zm448 64l-320 0 0 256c0 17.7 14.3 32 32 32l288 0c17.7 0 32-14.3 32-32l0-224c0-17.7-14.3-32-32-32zM224 288a24 24 0 1 1 48 0 24 24 0 1 1 -48 0zm0 96a24 24 0 1 1 48 0 24 24 0 1 1 -48 0zM336 264a24 24 0 1 1 0 48 24 24 0 1 1 0-48zM312 384a24 24 0 1 1 48 0 24 24 0 1 1 -48 0zM424 264a24 24 0 1 1 0 48 24 24 0 1 1 0-48zM400 384a24 24 0 1 1 48 0 24 24 0 1 1 -48 0z"]};var c4={prefix:"fas",iconName:"expand",icon:[448,512,[],"f065","M32 32C14.3 32 0 46.3 0 64l0 96c0 17.7 14.3 32 32 32s32-14.3 32-32l0-64 64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L32 32zM64 352c0-17.7-14.3-32-32-32S0 334.3 0 352l0 96c0 17.7 14.3 32 32 32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0 0-64zM320 32c-17.7 0-32 14.3-32 32s14.3 32 32 32l64 0 0 64c0 17.7 14.3 32 32 32s32-14.3 32-32l0-96c0-17.7-14.3-32-32-32l-96 0zM448 352c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 64-64 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l96 0c17.7 0 32-14.3 32-32l0-96z"]};var a4={prefix:"fas",iconName:"table-columns",icon:[448,512,["columns"],"f0db","M0 96C0 60.7 28.7 32 64 32l320 0c35.3 0 64 28.7 64 64l0 320c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64L0 96zm64 64l0 256 128 0 0-256-128 0zm320 0l-128 0 0 256 128 0 0-256z"]};var l4={prefix:"fas",iconName:"stop",icon:[448,512,[9209],"f04d","M64 32l320 0c35.3 0 64 28.7 64 64l0 320c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64L0 96C0 60.7 28.7 32 64 32z"]};var e4={prefix:"fas",iconName:"clock",icon:[512,512,[128339,"clock-four"],"f017","M256 0a256 256 0 1 1 0 512 256 256 0 1 1 0-512zM232 120l0 136c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2 280 120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"]};var r4={prefix:"fas",iconName:"rocket",icon:[512,512,[],"f135","M128 320L24.5 320c-24.9 0-40.2-27.1-27.4-48.5L50 183.3C58.7 168.8 74.3 160 91.2 160l95 0c76.1-128.9 189.6-135.4 265.5-124.3 12.8 1.9 22.8 11.9 24.6 24.6 11.1 75.9 4.6 189.4-124.3 265.5l0 95c0 16.9-8.8 32.5-23.3 41.2l-88.2 52.9c-21.3 12.8-48.5-2.6-48.5-27.4L192 384c0-35.3-28.7-64-64-64l-.1 0zM400 160a48 48 0 1 0 -96 0 48 48 0 1 0 96 0z"]};var s4={prefix:"fas",iconName:"paper-plane",icon:[576,512,[61913],"f1d8","M536.4-26.3c9.8-3.5 20.6-1 28 6.3s9.8 18.2 6.3 28l-178 496.9c-5 13.9-18.1 23.1-32.8 23.1-14.2 0-27-8.6-32.3-21.7l-64.2-158c-4.5-11-2.5-23.6 5.2-32.6l94.5-112.4c5.1-6.1 4.7-15-.9-20.6s-14.6-6-20.6-.9L229.2 276.1c-9.1 7.6-21.6 9.6-32.6 5.2L38.1 216.8c-13.1-5.3-21.7-18.1-21.7-32.3 0-14.7 9.2-27.8 23.1-32.8l496.9-178z"]};var i4={prefix:"fas",iconName:"fire",icon:[448,512,[128293],"f06d","M160.5-26.4c9.3-7.8 23-7.5 31.9 .9 12.3 11.6 23.3 24.4 33.9 37.4 13.5 16.5 29.7 38.3 45.3 64.2 5.2-6.8 10-12.8 14.2-17.9 1.1-1.3 2.2-2.7 3.3-4.1 7.9-9.8 17.7-22.1 30.8-22.1 13.4 0 22.8 11.9 30.8 22.1 1.3 1.7 2.6 3.3 3.9 4.8 10.3 12.4 24 30.3 37.7 52.4 27.2 43.9 55.6 106.4 55.6 176.6 0 123.7-100.3 224-224 224S0 411.7 0 288c0-91.1 41.1-170 80.5-225 19.9-27.7 39.7-49.9 54.6-65.1 8.2-8.4 16.5-16.7 25.5-24.2zM225.7 416c25.3 0 47.7-7 68.8-21 42.1-29.4 53.4-88.2 28.1-134.4-4.5-9-16-9.6-22.5-2l-25.2 29.3c-6.6 7.6-18.5 7.4-24.7-.5-17.3-22.1-49.1-62.4-65.3-83-5.4-6.9-15.2-8-21.5-1.9-18.3 17.8-51.5 56.8-51.5 104.3 0 68.6 50.6 109.2 113.7 109.2z"]};var o4={prefix:"fas",iconName:"users",icon:[640,512,[],"f0c0","M320 16a104 104 0 1 1 0 208 104 104 0 1 1 0-208zM96 88a72 72 0 1 1 0 144 72 72 0 1 1 0-144zM0 416c0-70.7 57.3-128 128-128 12.8 0 25.2 1.9 36.9 5.4-32.9 36.8-52.9 85.4-52.9 138.6l0 16c0 11.4 2.4 22.2 6.7 32L32 480c-17.7 0-32-14.3-32-32l0-32zm521.3 64c4.3-9.8 6.7-20.6 6.7-32l0-16c0-53.2-20-101.8-52.9-138.6 11.7-3.5 24.1-5.4 36.9-5.4 70.7 0 128 57.3 128 128l0 32c0 17.7-14.3 32-32 32l-86.7 0zM472 160a72 72 0 1 1 144 0 72 72 0 1 1 -144 0zM160 432c0-88.4 71.6-160 160-160s160 71.6 160 160l0 16c0 17.7-14.3 32-32 32l-256 0c-17.7 0-32-14.3-32-32l0-16z"]};var f4={prefix:"fas",iconName:"headset",icon:[448,512,[],"f590","M224 64c-79 0-144.7 57.3-157.7 132.7 9.3-3 19.3-4.7 29.7-4.7l16 0c26.5 0 48 21.5 48 48l0 96c0 26.5-21.5 48-48 48l-16 0c-53 0-96-43-96-96l0-64C0 100.3 100.3 0 224 0S448 100.3 448 224l0 168.1c0 66.3-53.8 120-120.1 120l-87.9-.1-32 0c-26.5 0-48-21.5-48-48s21.5-48 48-48l32 0c26.5 0 48 21.5 48 48l0 0 40 0c39.8 0 72-32.2 72-72l0-20.9c-14.1 8.2-30.5 12.8-48 12.8l-16 0c-26.5 0-48-21.5-48-48l0-96c0-26.5 21.5-48 48-48l16 0c10.4 0 20.3 1.6 29.7 4.7-13-75.3-78.6-132.7-157.7-132.7z"]};var n4={prefix:"fas",iconName:"voicemail",icon:[640,512,[],"f897","M144 160a80 80 0 1 1 0 160 80 80 0 1 1 0-160zM263.8 320c15.3-22.9 24.2-50.4 24.2-80 0-79.5-64.5-144-144-144S0 160.5 0 240 64.5 384 144 384l352 0c79.5 0 144-64.5 144-144S575.5 96 496 96 352 160.5 352 240c0 29.6 8.9 57.1 24.2 80l-112.5 0zM496 160a80 80 0 1 1 0 160 80 80 0 1 1 0-160z"]};var t4={prefix:"fas",iconName:"microphone",icon:[384,512,[],"f130","M192 0C139 0 96 43 96 96l0 128c0 53 43 96 96 96s96-43 96-96l0-128c0-53-43-96-96-96zM48 184c0-13.3-10.7-24-24-24S0 170.7 0 184l0 40c0 97.9 73.3 178.7 168 190.5l0 49.5-48 0c-13.3 0-24 10.7-24 24s10.7 24 24 24l144 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-48 0 0-49.5c94.7-11.8 168-92.6 168-190.5l0-40c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 40c0 79.5-64.5 144-144 144S48 303.5 48 224l0-40z"]};var m4={prefix:"fas",iconName:"image",icon:[448,512,[],"f03e","M64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L64 32zm64 80a48 48 0 1 1 0 96 48 48 0 1 1 0-96zM272 224c8.4 0 16.1 4.4 20.5 11.5l88 144c4.5 7.4 4.7 16.7 .5 24.3S368.7 416 360 416L88 416c-8.9 0-17.2-5-21.3-12.9s-3.5-17.5 1.6-24.8l56-80c4.5-6.4 11.8-10.2 19.7-10.2s15.2 3.8 19.7 10.2l26.4 37.8 61.4-100.5c4.4-7.1 12.1-11.5 20.5-11.5z"]};var z4={prefix:"fas",iconName:"folder",icon:[512,512,[128193,128447,61716,"folder-blank"],"f07b","M64 448l384 0c35.3 0 64-28.7 64-64l0-240c0-35.3-28.7-64-64-64L298.7 80c-6.9 0-13.7-2.2-19.2-6.4L241.1 44.8C230 36.5 216.5 32 202.7 32L64 32C28.7 32 0 60.7 0 96L0 384c0 35.3 28.7 64 64 64z"]};var p4={prefix:"fas",iconName:"cloud",icon:[576,512,[9729],"f0c2","M0 336c0 79.5 64.5 144 144 144l304 0c70.7 0 128-57.3 128-128 0-51.6-30.5-96.1-74.5-116.3 6.7-13.1 10.5-28 10.5-43.7 0-53-43-96-96-96-17.7 0-34.2 4.8-48.4 13.1-24.1-45.8-72.2-77.1-127.6-77.1-79.5 0-144 64.5-144 144 0 8 .7 15.9 1.9 23.5-56.9 19.2-97.9 73.1-97.9 136.5z"]};var M4={prefix:"fas",iconName:"link",icon:[576,512,[128279,"chain"],"f0c1","M419.5 96c-16.6 0-32.7 4.5-46.8 12.7-15.8-16-34.2-29.4-54.5-39.5 28.2-24 64.1-37.2 101.3-37.2 86.4 0 156.5 70 156.5 156.5 0 41.5-16.5 81.3-45.8 110.6l-71.1 71.1c-29.3 29.3-69.1 45.8-110.6 45.8-86.4 0-156.5-70-156.5-156.5 0-1.5 0-3 .1-4.5 .5-17.7 15.2-31.6 32.9-31.1s31.6 15.2 31.1 32.9c0 .9 0 1.8 0 2.6 0 51.1 41.4 92.5 92.5 92.5 24.5 0 48-9.7 65.4-27.1l71.1-71.1c17.3-17.3 27.1-40.9 27.1-65.4 0-51.1-41.4-92.5-92.5-92.5zM275.2 173.3c-1.9-.8-3.8-1.9-5.5-3.1-12.6-6.5-27-10.2-42.1-10.2-24.5 0-48 9.7-65.4 27.1L91.1 258.2c-17.3 17.3-27.1 40.9-27.1 65.4 0 51.1 41.4 92.5 92.5 92.5 16.5 0 32.6-4.4 46.7-12.6 15.8 16 34.2 29.4 54.6 39.5-28.2 23.9-64 37.2-101.3 37.2-86.4 0-156.5-70-156.5-156.5 0-41.5 16.5-81.3 45.8-110.6l71.1-71.1c29.3-29.3 69.1-45.8 110.6-45.8 86.6 0 156.5 70.6 156.5 156.9 0 1.3 0 2.6 0 3.9-.4 17.7-15.1 31.6-32.8 31.2s-31.6-15.1-31.2-32.8c0-.8 0-1.5 0-2.3 0-33.7-18-63.3-44.8-79.6z"]};var d4={prefix:"fas",iconName:"chart-line",icon:[512,512,["line-chart"],"f201","M64 64c0-17.7-14.3-32-32-32S0 46.3 0 64L0 400c0 44.2 35.8 80 80 80l400 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L80 416c-8.8 0-16-7.2-16-16L64 64zm406.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L320 210.7 262.6 153.4c-12.5-12.5-32.8-12.5-45.3 0l-96 96c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l73.4-73.4 57.4 57.4c12.5 12.5 32.8 12.5 45.3 0l128-128z"]};var L4={prefix:"fas",iconName:"gear",icon:[512,512,[9881,"cog"],"f013","M195.1 9.5C198.1-5.3 211.2-16 226.4-16l59.8 0c15.2 0 28.3 10.7 31.3 25.5L332 79.5c14.1 6 27.3 13.7 39.3 22.8l67.8-22.5c14.4-4.8 30.2 1.2 37.8 14.4l29.9 51.8c7.6 13.2 4.9 29.8-6.5 39.9L447 233.3c.9 7.4 1.3 15 1.3 22.7s-.5 15.3-1.3 22.7l53.4 47.5c11.4 10.1 14 26.8 6.5 39.9l-29.9 51.8c-7.6 13.1-23.4 19.2-37.8 14.4l-67.8-22.5c-12.1 9.1-25.3 16.7-39.3 22.8l-14.4 69.9c-3.1 14.9-16.2 25.5-31.3 25.5l-59.8 0c-15.2 0-28.3-10.7-31.3-25.5l-14.4-69.9c-14.1-6-27.2-13.7-39.3-22.8L73.5 432.3c-14.4 4.8-30.2-1.2-37.8-14.4L5.8 366.1c-7.6-13.2-4.9-29.8 6.5-39.9l53.4-47.5c-.9-7.4-1.3-15-1.3-22.7s.5-15.3 1.3-22.7L12.3 185.8c-11.4-10.1-14-26.8-6.5-39.9L35.7 94.1c7.6-13.2 23.4-19.2 37.8-14.4l67.8 22.5c12.1-9.1 25.3-16.7 39.3-22.8L195.1 9.5zM256.3 336a80 80 0 1 0 -.6-160 80 80 0 1 0 .6 160z"]};var u4={prefix:"fas",iconName:"up-right-and-down-left-from-center",icon:[512,512,["expand-alt"],"f424","M344 0L488 0c13.3 0 24 10.7 24 24l0 144c0 9.7-5.8 18.5-14.8 22.2s-19.3 1.7-26.2-5.2l-39-39-87 87c-9.4 9.4-24.6 9.4-33.9 0l-32-32c-9.4-9.4-9.4-24.6 0-33.9l87-87-39-39c-6.9-6.9-8.9-17.2-5.2-26.2S334.3 0 344 0zM168 512L24 512c-13.3 0-24-10.7-24-24L0 344c0-9.7 5.8-18.5 14.8-22.2S34.1 320.2 41 327l39 39 87-87c9.4-9.4 24.6-9.4 33.9 0l32 32c9.4 9.4 9.4 24.6 0 33.9l-87 87 39 39c6.9 6.9 8.9 17.2 5.2 26.2S177.7 512 168 512z"]};var v4={prefix:"fas",iconName:"play",icon:[448,512,[9654],"f04b","M91.2 36.9c-12.4-6.8-27.4-6.5-39.6 .7S32 57.9 32 72l0 368c0 14.1 7.5 27.2 19.6 34.4s27.2 7.5 39.6 .7l336-184c12.8-7 20.8-20.5 20.8-35.1s-8-28.1-20.8-35.1l-336-184z"]};var h4={prefix:"fas",iconName:"check",icon:[448,512,[10003,10004],"f00c","M434.8 70.1c14.3 10.4 17.5 30.4 7.1 44.7l-256 352c-5.5 7.6-14 12.3-23.4 13.1s-18.5-2.7-25.1-9.3l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l101.5 101.5 234-321.7c10.4-14.3 30.4-17.5 44.7-7.1z"]};var C4={prefix:"fas",iconName:"sliders",icon:[512,512,["sliders-h"],"f1de","M32 64C14.3 64 0 78.3 0 96s14.3 32 32 32l86.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48L480 128c17.7 0 32-14.3 32-32s-14.3-32-32-32L265.3 64C253 35.7 224.8 16 192 16s-61 19.7-73.3 48L32 64zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32l246.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48l54.7 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-54.7 0c-12.3-28.3-40.5-48-73.3-48s-61 19.7-73.3 48L32 224zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32l54.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48L480 448c17.7 0 32-14.3 32-32s-14.3-32-32-32l-246.7 0c-12.3-28.3-40.5-48-73.3-48s-61 19.7-73.3 48L32 384z"]};var g4={prefix:"fas",iconName:"user",icon:[448,512,[128100,62144,62470,"user-alt","user-large"],"f007","M224 248a120 120 0 1 0 0-240 120 120 0 1 0 0 240zm-29.7 56C95.8 304 16 383.8 16 482.3 16 498.7 29.3 512 45.7 512l356.6 0c16.4 0 29.7-13.3 29.7-29.7 0-98.5-79.8-178.3-178.3-178.3l-59.4 0z"]};var x4={prefix:"fas",iconName:"arrow-right",icon:[512,512,[8594],"f061","M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l370.7 0-105.4 105.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"]};var S4={prefix:"fas",iconName:"right-left",icon:[512,512,["exchange-alt"],"f362","M502.6 150.6l-96 96c-9.2 9.2-22.9 11.9-34.9 6.9S352 236.9 352 224l0-64-320 0c-17.7 0-32-14.3-32-32S14.3 96 32 96l320 0 0-64c0-12.9 7.8-24.6 19.8-29.6s25.7-2.2 34.9 6.9l96 96c12.5 12.5 12.5 32.8 0 45.3zm-397.3 352l-96-96c-12.5-12.5-12.5-32.8 0-45.3l96-96c9.2-9.2 22.9-11.9 34.9-6.9S160 275.1 160 288l0 64 320 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-320 0 0 64c0 12.9-7.8 24.6-19.8 29.6s-25.7 2.2-34.9-6.9z"]};var N4={prefix:"fas",iconName:"xmark",icon:[384,512,[128473,10005,10006,10060,215,"close","multiply","remove","times"],"f00d","M55.1 73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L147.2 256 9.9 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192.5 301.3 329.9 438.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.8 256 375.1 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192.5 210.7 55.1 73.4z"]};var b4={prefix:"fas",iconName:"comments",icon:[576,512,[128490,61670],"f086","M384 144c0 97.2-86 176-192 176-26.7 0-52.1-5-75.2-14L35.2 349.2c-9.3 4.9-20.7 3.2-28.2-4.2s-9.2-18.9-4.2-28.2l35.6-67.2C14.3 220.2 0 183.6 0 144 0 46.8 86-32 192-32S384 46.8 384 144zm0 368c-94.1 0-172.4-62.1-188.8-144 120-1.5 224.3-86.9 235.8-202.7 83.3 19.2 145 88.3 145 170.7 0 39.6-14.3 76.2-38.4 105.6l35.6 67.2c4.9 9.3 3.2 20.7-4.2 28.2s-18.9 9.2-28.2 4.2L459.2 498c-23.1 9-48.5 14-75.2 14z"]};var k4={prefix:"fas",iconName:"mobile-screen",icon:[384,512,["mobile-android-alt"],"f3cf","M16 64C16 28.7 44.7 0 80 0L304 0c35.3 0 64 28.7 64 64l0 384c0 35.3-28.7 64-64 64L80 512c-35.3 0-64-28.7-64-64L16 64zM128 440c0 13.3 10.7 24 24 24l80 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-80 0c-13.3 0-24 10.7-24 24zM304 64l-224 0 0 304 224 0 0-304z"]};var w4={prefix:"fas",iconName:"phone-volume",icon:[576,512,["volume-control-phone"],"f2a0","M344-32c128.1 0 232 103.9 232 232 0 13.3-10.7 24-24 24s-24-10.7-24-24c0-101.6-82.4-184-184-184-13.3 0-24-10.7-24-24s10.7-24 24-24zm8 192a32 32 0 1 1 0 64 32 32 0 1 1 0-64zM320 88c0-13.3 10.7-24 24-24 75.1 0 136 60.9 136 136 0 13.3-10.7 24-24 24s-24-10.7-24-24c0-48.6-39.4-88-88-88-13.3 0-24-10.7-24-24zM144.1 1.4c19.7-5.4 40.3 4.7 48.1 23.5l40.5 97.3c6.9 16.5 2.1 35.6-11.8 47l-44.1 36.1c32.5 71.6 89 130 159.3 164.9L374.7 323c11.3-13.9 30.4-18.6 47-11.8L519 351.8c18.8 7.8 28.9 28.4 23.5 48.1l-1.5 5.5C523.4 470.1 460.9 525.3 384.6 509.2 209.6 472.1 71.9 334.4 34.8 159.4 18.7 83.1 73.9 20.6 138.5 2.9l5.5-1.5z"]};var y4={prefix:"fas",iconName:"phone",icon:[512,512,[128222,128379],"f095","M160.2 25C152.3 6.1 131.7-3.9 112.1 1.4l-5.5 1.5c-64.6 17.6-119.8 80.2-103.7 156.4 37.1 175 174.8 312.7 349.8 349.8 76.3 16.2 138.8-39.1 156.4-103.7l1.5-5.5c5.4-19.7-4.7-40.3-23.5-48.1l-97.3-40.5c-16.5-6.9-35.6-2.1-47 11.8l-38.6 47.2C233.9 335.4 177.3 277 144.8 205.3L189 169.3c13.9-11.3 18.6-30.4 11.8-47L160.2 25z"]};var A4={prefix:"fas",iconName:"address-book",icon:[512,512,[62138,"contact-book"],"f2b9","M96 0C60.7 0 32 28.7 32 64l0 384c0 35.3 28.7 64 64 64l288 0c35.3 0 64-28.7 64-64l0-384c0-35.3-28.7-64-64-64L96 0zM208 288l64 0c44.2 0 80 35.8 80 80 0 8.8-7.2 16-16 16l-192 0c-8.8 0-16-7.2-16-16 0-44.2 35.8-80 80-80zm-24-96a56 56 0 1 1 112 0 56 56 0 1 1 -112 0zM512 80c0-8.8-7.2-16-16-16s-16 7.2-16 16l0 64c0 8.8 7.2 16 16 16s16-7.2 16-16l0-64zm0 128c0-8.8-7.2-16-16-16s-16 7.2-16 16l0 64c0 8.8 7.2 16 16 16s16-7.2 16-16l0-64zM496 320c-8.8 0-16 7.2-16 16l0 64c0 8.8 7.2 16 16 16s16-7.2 16-16l0-64c0-8.8-7.2-16-16-16z"]};var T4={prefix:"fas",iconName:"chevron-down",icon:[448,512,[],"f078","M201.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 338.7 54.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"]};var P4={prefix:"fas",iconName:"plug",icon:[448,512,[128268],"f1e6","M128-32c17.7 0 32 14.3 32 32l0 96 128 0 0-96c0-17.7 14.3-32 32-32s32 14.3 32 32l0 96 64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l0 64c0 95.1-69.2 174.1-160 189.3l0 66.7c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-66.7C101.2 398.1 32 319.1 32 224l0-64c-17.7 0-32-14.3-32-32S14.3 96 32 96l64 0 0-96c0-17.7 14.3-32 32-32z"]};var B4={prefix:"fas",iconName:"comment-dots",icon:[512,512,[128172,62075,"commenting"],"f4ad","M256 480c141.4 0 256-107.5 256-240S397.4 0 256 0 0 107.5 0 240c0 54.3 19.2 104.3 51.6 144.5L2.8 476.8c-4.8 9-3.3 20 3.6 27.5s17.8 9.8 27.1 5.8l118.4-50.7C183.7 472.6 218.9 480 256 480zM128 208a32 32 0 1 1 0 64 32 32 0 1 1 0-64zm128 0a32 32 0 1 1 0 64 32 32 0 1 1 0-64zm96 32a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"]};var F4={prefix:"fas",iconName:"inbox",icon:[512,512,[],"f01c","M91.8 32C59.9 32 32.9 55.4 28.4 86.9L.6 281.2c-.4 3-.6 6-.6 9.1L0 416c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-125.7c0-3-.2-6.1-.6-9.1L483.6 86.9C479.1 55.4 452.1 32 420.2 32L91.8 32zm0 64l328.5 0 27.4 192-59.9 0c-12.1 0-23.2 6.8-28.6 17.7l-14.3 28.6c-5.4 10.8-16.5 17.7-28.6 17.7l-120.4 0c-12.1 0-23.2-6.8-28.6-17.7l-14.3-28.6c-5.4-10.8-16.5-17.7-28.6-17.7L64.3 288 91.8 96z"]};var H4={prefix:"fas",iconName:"bullhorn",icon:[512,512,[128226,128363],"f0a1","M461.2 18.9C472.7 24 480 35.4 480 48l0 416c0 12.6-7.3 24-18.8 29.1s-24.8 3.2-34.3-5.1l-46.6-40.7c-43.6-38.1-98.7-60.3-156.4-63l0 95.7c0 17.7-14.3 32-32 32l-32 0c-17.7 0-32-14.3-32-32l0-96C57.3 384 0 326.7 0 256S57.3 128 128 128l84.5 0c61.8-.2 121.4-22.7 167.9-63.3l46.6-40.7c9.4-8.3 22.9-10.2 34.3-5.1zM224 320l0 .2c70.3 2.7 137.8 28.5 192 73.4l0-275.3c-54.2 44.9-121.7 70.7-192 73.4L224 320z"]};var E4={prefix:"fas",iconName:"wand-magic-sparkles",icon:[576,512,["magic-wand-sparkles"],"e2ca","M263.4-27L278.2 9.8 315 24.6c3 1.2 5 4.2 5 7.4s-2 6.2-5 7.4L278.2 54.2 263.4 91c-1.2 3-4.2 5-7.4 5s-6.2-2-7.4-5L233.8 54.2 197 39.4c-3-1.2-5-4.2-5-7.4s2-6.2 5-7.4L233.8 9.8 248.6-27c1.2-3 4.2-5 7.4-5s6.2 2 7.4 5zM110.7 41.7l21.5 50.1 50.1 21.5c5.9 2.5 9.7 8.3 9.7 14.7s-3.8 12.2-9.7 14.7l-50.1 21.5-21.5 50.1c-2.5 5.9-8.3 9.7-14.7 9.7s-12.2-3.8-14.7-9.7L59.8 164.2 9.7 142.7C3.8 140.2 0 134.4 0 128s3.8-12.2 9.7-14.7L59.8 91.8 81.3 41.7C83.8 35.8 89.6 32 96 32s12.2 3.8 14.7 9.7zM464 304c6.4 0 12.2 3.8 14.7 9.7l21.5 50.1 50.1 21.5c5.9 2.5 9.7 8.3 9.7 14.7s-3.8 12.2-9.7 14.7l-50.1 21.5-21.5 50.1c-2.5 5.9-8.3 9.7-14.7 9.7s-12.2-3.8-14.7-9.7l-21.5-50.1-50.1-21.5c-5.9-2.5-9.7-8.3-9.7-14.7s3.8-12.2 9.7-14.7l50.1-21.5 21.5-50.1c2.5-5.9 8.3-9.7 14.7-9.7zM460 0c11 0 21.6 4.4 29.5 12.2l42.3 42.3C539.6 62.4 544 73 544 84s-4.4 21.6-12.2 29.5l-88.2 88.2-101.3-101.3 88.2-88.2C438.4 4.4 449 0 460 0zM44.2 398.5L308.4 134.3 409.7 235.6 145.5 499.8C137.6 507.6 127 512 116 512s-21.6-4.4-29.5-12.2L44.2 457.5C36.4 449.6 32 439 32 428s4.4-21.6 12.2-29.5z"]};var R4={prefix:"fas",iconName:"chart-column",icon:[512,512,[],"e0e3","M32 32c17.7 0 32 14.3 32 32l0 336c0 8.8 7.2 16 16 16l400 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L80 480c-44.2 0-80-35.8-80-80L0 64C0 46.3 14.3 32 32 32zM144 224c17.7 0 32 14.3 32 32l0 64c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32zm144-64l0 160c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-160c0-17.7 14.3-32 32-32s32 14.3 32 32zm80 32c17.7 0 32 14.3 32 32l0 96c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-96c0-17.7 14.3-32 32-32zM512 96l0 224c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-224c0-17.7 14.3-32 32-32s32 14.3 32 32z"]};var D4={prefix:"fas",iconName:"star",icon:[576,512,[11088,61446],"f005","M309.5-18.9c-4.1-8-12.4-13.1-21.4-13.1s-17.3 5.1-21.4 13.1L193.1 125.3 33.2 150.7c-8.9 1.4-16.3 7.7-19.1 16.3s-.5 18 5.8 24.4l114.4 114.5-25.2 159.9c-1.4 8.9 2.3 17.9 9.6 23.2s16.9 6.1 25 2L288.1 417.6 432.4 491c8 4.1 17.7 3.3 25-2s11-14.2 9.6-23.2L441.7 305.9 556.1 191.4c6.4-6.4 8.6-15.8 5.8-24.4s-10.1-14.9-19.1-16.3L383 125.3 309.5-18.9z"]};var _4={prefix:"fas",iconName:"triangle-exclamation",icon:[512,512,[9888,"exclamation-triangle","warning"],"f071","M256 0c14.7 0 28.2 8.1 35.2 21l216 400c6.7 12.4 6.4 27.4-.8 39.5S486.1 480 472 480L40 480c-14.1 0-27.2-7.4-34.4-19.5s-7.5-27.1-.8-39.5l216-400c7-12.9 20.5-21 35.2-21zm0 352a32 32 0 1 0 0 64 32 32 0 1 0 0-64zm0-192c-18.2 0-32.7 15.5-31.4 33.7l7.4 104c.9 12.5 11.4 22.3 23.9 22.3 12.6 0 23-9.7 23.9-22.3l7.4-104c1.3-18.2-13.1-33.7-31.4-33.7z"]};var U4={prefix:"fas",iconName:"lock",icon:[384,512,[128274],"f023","M128 96l0 64 128 0 0-64c0-35.3-28.7-64-64-64s-64 28.7-64 64zM64 160l0-64C64 25.3 121.3-32 192-32S320 25.3 320 96l0 64c35.3 0 64 28.7 64 64l0 224c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 224c0-35.3 28.7-64 64-64z"]};var q4={prefix:"fas",iconName:"window-restore",icon:[576,512,[],"f2d2","M512 96L160 96c0-35.3 28.7-64 64-64l288 0c35.3 0 64 28.7 64 64l0 192c0 35.3-28.7 64-64 64l-48 0 0-64 48 0 0-192zM0 224c0-35.3 28.7-64 64-64l288 0c35.3 0 64 28.7 64 64l0 192c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64L0 224zm64 40c0 13.3 10.7 24 24 24l240 0c13.3 0 24-10.7 24-24s-10.7-24-24-24L88 240c-13.3 0-24 10.7-24 24z"]};var $4={prefix:"fas",iconName:"shield-halved",icon:[512,512,["shield-alt"],"f3ed","M256 0c4.6 0 9.2 1 13.4 2.9L457.8 82.8c22 9.3 38.4 31 38.3 57.2-.5 99.2-41.3 280.7-213.6 363.2-16.7 8-36.1 8-52.8 0-172.4-82.5-213.1-264-213.6-363.2-.1-26.2 16.3-47.9 38.3-57.2L242.7 2.9C246.9 1 251.4 0 256 0zm0 66.8l0 378.1c138-66.8 175.1-214.8 176-303.4l-176-74.6 0 0z"]};var G4={prefix:"fas",iconName:"caret-up",icon:[320,512,[],"f0d8","M140.3 135.2c12.6-10.3 31.1-9.5 42.8 2.2l128 128c9.2 9.2 11.9 22.9 6.9 34.9S301.4 320 288.5 320l-256 0c-12.9 0-24.6-7.8-29.6-19.8S.7 274.5 9.9 265.4l128-128 2.4-2.2z"]};var I4={prefix:"fas",iconName:"globe",icon:[512,512,[127760],"f0ac","M351.9 280l-190.9 0c2.9 64.5 17.2 123.9 37.5 167.4 11.4 24.5 23.7 41.8 35.1 52.4 11.2 10.5 18.9 12.2 22.9 12.2s11.7-1.7 22.9-12.2c11.4-10.6 23.7-28 35.1-52.4 20.3-43.5 34.6-102.9 37.5-167.4zM160.9 232l190.9 0C349 167.5 334.7 108.1 314.4 64.6 303 40.2 290.7 22.8 279.3 12.2 268.1 1.7 260.4 0 256.4 0s-11.7 1.7-22.9 12.2c-11.4 10.6-23.7 28-35.1 52.4-20.3 43.5-34.6 102.9-37.5 167.4zm-48 0C116.4 146.4 138.5 66.9 170.8 14.7 78.7 47.3 10.9 131.2 1.5 232l111.4 0zM1.5 280c9.4 100.8 77.2 184.7 169.3 217.3-32.3-52.2-54.4-131.7-57.9-217.3L1.5 280zm398.4 0c-3.5 85.6-25.6 165.1-57.9 217.3 92.1-32.7 159.9-116.5 169.3-217.3l-111.4 0zm111.4-48C501.9 131.2 434.1 47.3 342 14.7 374.3 66.9 396.4 146.4 399.9 232l111.4 0z"]};var W4={prefix:"fas",iconName:"upload",icon:[448,512,[],"f093","M256 109.3L256 320c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-210.7-41.4 41.4c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l96-96c12.5-12.5 32.8-12.5 45.3 0l96 96c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 109.3zM224 400c44.2 0 80-35.8 80-80l80 0c35.3 0 64 28.7 64 64l0 32c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64l0-32c0-35.3 28.7-64 64-64l80 0c0 44.2 35.8 80 80 80zm144 24a24 24 0 1 0 0-48 24 24 0 1 0 0 48z"]};var O4={prefix:"fas",iconName:"arrow-left",icon:[512,512,[8592],"f060","M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 288 480 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-370.7 0 105.4-105.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"]};var V4={prefix:"fas",iconName:"check-double",icon:[384,512,[],"f560","M249.9 66.8c10.4-14.3 7.2-34.3-7.1-44.7s-34.3-7.2-44.7 7.1l-106 145.7-37.5-37.5c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l64 64c6.6 6.6 15.8 10 25.1 9.3s17.9-5.5 23.4-13.1l128-176zm128 136c10.4-14.3 7.2-34.3-7.1-44.7s-34.3-7.2-44.7 7.1l-170 233.7-69.5-69.5c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l96 96c6.6 6.6 15.8 10 25.1 9.3s17.9-5.5 23.4-13.1l192-264z"]};var j4={prefix:"fas",iconName:"down-left-and-up-right-to-center",icon:[512,512,["compress-alt"],"f422","M439.5 7c9.4-9.4 24.6-9.4 33.9 0l32 32c9.4 9.4 9.4 24.6 0 33.9l-87 87 39 39c6.9 6.9 8.9 17.2 5.2 26.2S450.2 240 440.5 240l-144 0c-13.3 0-24-10.7-24-24l0-144c0-9.7 5.8-18.5 14.8-22.2s19.3-1.7 26.2 5.2l39 39 87-87zM72.5 272l144 0c13.3 0 24 10.7 24 24l0 144c0 9.7-5.8 18.5-14.8 22.2s-19.3 1.7-26.2-5.2l-39-39-87 87c-9.4 9.4-24.6 9.4-33.9 0l-32-32c-9.4-9.4-9.4-24.6 0-33.9l87-87-39-39c-6.9-6.9-8.9-17.2-5.2-26.2S62.8 272 72.5 272z"]};var K4={prefix:"fas",iconName:"music",icon:[512,512,[127925],"f001","M468 7c7.6 6.1 12 15.3 12 25l0 304c0 44.2-43 80-96 80s-96-35.8-96-80 43-80 96-80c11.2 0 22 1.6 32 4.6l0-116.7-224 49.8 0 206.3c0 44.2-43 80-96 80s-96-35.8-96-80 43-80 96-80c11.2 0 22 1.6 32 4.6L128 96c0-15 10.4-28 25.1-31.2l288-64c9.5-2.1 19.4 .2 27 6.3z"]};var X4={prefix:"fas",iconName:"robot",icon:[640,512,[129302],"f544","M352 0c0-17.7-14.3-32-32-32S288-17.7 288 0l0 64-96 0c-53 0-96 43-96 96l0 224c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-224c0-53-43-96-96-96l-96 0 0-64zM160 368c0-13.3 10.7-24 24-24l32 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-32 0c-13.3 0-24-10.7-24-24zm120 0c0-13.3 10.7-24 24-24l32 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-32 0c-13.3 0-24-10.7-24-24zm120 0c0-13.3 10.7-24 24-24l32 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-32 0c-13.3 0-24-10.7-24-24zM224 176a48 48 0 1 1 0 96 48 48 0 1 1 0-96zm144 48a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zM64 224c0-17.7-14.3-32-32-32S0 206.3 0 224l0 96c0 17.7 14.3 32 32 32s32-14.3 32-32l0-96zm544-32c-17.7 0-32 14.3-32 32l0 96c0 17.7 14.3 32 32 32s32-14.3 32-32l0-96c0-17.7-14.3-32-32-32z"]},Q4={prefix:"fas",iconName:"plus",icon:[448,512,[10133,61543,"add"],"2b","M256 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 160-160 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l160 0 0 160c0 17.7 14.3 32 32 32s32-14.3 32-32l0-160 160 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-160 0 0-160z"]};var J4={prefix:"fas",iconName:"caret-down",icon:[320,512,[],"f0d7","M140.3 376.8c12.6 10.2 31.1 9.5 42.8-2.2l128-128c9.2-9.2 11.9-22.9 6.9-34.9S301.4 192 288.5 192l-256 0c-12.9 0-24.6 7.8-29.6 19.8S.7 237.5 9.9 246.6l128 128 2.4 2.2z"]};var Y4={prefix:"fas",iconName:"tag",icon:[512,512,[127991],"f02b","M32.5 96l0 149.5c0 17 6.7 33.3 18.7 45.3l192 192c25 25 65.5 25 90.5 0L483.2 333.3c25-25 25-65.5 0-90.5l-192-192C279.2 38.7 263 32 246 32L96.5 32c-35.3 0-64 28.7-64 64zm112 16a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"]};var Z4={prefix:"fas",iconName:"phone-slash",icon:[576,512,[],"f3dd","M535-24.9c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9L41 537.1c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9L141.5 368.6C89.2 310.5 51.6 238.8 34.8 159.4 18.7 83.1 73.9 20.6 138.5 2.9l5.5-1.5c19.7-5.4 40.3 4.7 48.1 23.5l40.5 97.3c6.9 16.5 2.1 35.6-11.8 47l-44.1 36.1c12.9 28.5 29.6 54.8 49.5 78.5L535-24.9zm-150.4 534c-63-13.4-121.3-39.8-171.7-76.3L297.8 348c12.2 8.2 25 15.6 38.3 22.2L374.7 323c11.3-13.9 30.4-18.6 47-11.8L519 351.8c18.8 7.8 28.9 28.4 23.5 48.1l-1.5 5.5c-17.6 64.6-80.2 119.8-156.4 103.7z"]};var c3={prefix:"fas",iconName:"briefcase",icon:[512,512,[128188],"f0b1","M200 48l112 0c4.4 0 8 3.6 8 8l0 40-128 0 0-40c0-4.4 3.6-8 8-8zm-56 8l0 40-80 0C28.7 96 0 124.7 0 160l0 96 512 0 0-96c0-35.3-28.7-64-64-64l-80 0 0-40c0-30.9-25.1-56-56-56L200 0c-30.9 0-56 25.1-56 56zM512 304l-192 0 0 16c0 17.7-14.3 32-32 32l-64 0c-17.7 0-32-14.3-32-32l0-16-192 0 0 112c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-112z"]};var a3={prefix:"fas",iconName:"pause",icon:[384,512,[9208],"f04c","M48 32C21.5 32 0 53.5 0 80L0 432c0 26.5 21.5 48 48 48l64 0c26.5 0 48-21.5 48-48l0-352c0-26.5-21.5-48-48-48L48 32zm224 0c-26.5 0-48 21.5-48 48l0 352c0 26.5 21.5 48 48 48l64 0c26.5 0 48-21.5 48-48l0-352c0-26.5-21.5-48-48-48l-64 0z"]};var l3={prefix:"fas",iconName:"desktop",icon:[512,512,[128421,61704,"desktop-alt"],"f390","M64 32C28.7 32 0 60.7 0 96L0 352c0 35.3 28.7 64 64 64l144 0-16 48-72 0c-13.3 0-24 10.7-24 24s10.7 24 24 24l272 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-72 0-16-48 144 0c35.3 0 64-28.7 64-64l0-256c0-35.3-28.7-64-64-64L64 32zM96 96l320 0c17.7 0 32 14.3 32 32l0 160c0 17.7-14.3 32-32 32L96 320c-17.7 0-32-14.3-32-32l0-160c0-17.7 14.3-32 32-32z"]};var e3={prefix:"fas",iconName:"arrow-down",icon:[384,512,[8595],"f063","M169.4 502.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 402.7 224 32c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 370.7-105.4-105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"]},r3={prefix:"fas",iconName:"location-dot",icon:[384,512,["map-marker-alt"],"f3c5","M0 188.6C0 84.4 86 0 192 0S384 84.4 384 188.6c0 119.3-120.2 262.3-170.4 316.8-11.8 12.8-31.5 12.8-43.3 0-50.2-54.5-170.4-197.5-170.4-316.8zM192 256a64 64 0 1 0 0-128 64 64 0 1 0 0 128z"]};var s3={prefix:"fas",iconName:"keyboard",icon:[576,512,[9e3],"f11c","M64 64C28.7 64 0 92.7 0 128L0 384c0 35.3 28.7 64 64 64l448 0c35.3 0 64-28.7 64-64l0-256c0-35.3-28.7-64-64-64L64 64zm16 64l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16zM64 240c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32zM176 128l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16zM160 240c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32zm16 80l224 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-224 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16zm80-176c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32zm16 80l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16zm80-80c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32zm16 80l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16zm80-80c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32zm16 80l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16z"]};var i3={prefix:"fas",iconName:"hashtag",icon:[512,512,[62098],"23","M214.7 .7c17.3 3.7 28.3 20.7 24.6 38l-19.1 89.3 126.5 0 22-102.7C372.4 8 389.4-3 406.7 .7s28.3 20.7 24.6 38L412.2 128 480 128c17.7 0 32 14.3 32 32s-14.3 32-32 32l-81.6 0-27.4 128 67.8 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-81.6 0-22 102.7c-3.7 17.3-20.7 28.3-38 24.6s-28.3-20.7-24.6-38l19.1-89.3-126.5 0-22 102.7c-3.7 17.3-20.7 28.3-38 24.6s-28.3-20.7-24.6-38L99.8 384 32 384c-17.7 0-32-14.3-32-32s14.3-32 32-32l81.6 0 27.4-128-67.8 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l81.6 0 22-102.7C180.4 8 197.4-3 214.7 .7zM206.4 192l-27.4 128 126.5 0 27.4-128-126.5 0z"]};var o3={prefix:"fas",iconName:"circle-dot",icon:[512,512,[128280,"dot-circle"],"f192","M256 512a256 256 0 1 0 0-512 256 256 0 1 0 0 512zm0-352a96 96 0 1 1 0 192 96 96 0 1 1 0-192z"]};var f3={prefix:"fas",iconName:"arrows-rotate",icon:[512,512,[128472,"refresh","sync"],"f021","M65.9 228.5c13.3-93 93.4-164.5 190.1-164.5 53 0 101 21.5 135.8 56.2 .2 .2 .4 .4 .6 .6l7.6 7.2-47.9 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l128 0c17.7 0 32-14.3 32-32l0-128c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 53.4-11.3-10.7C390.5 28.6 326.5 0 256 0 127 0 20.3 95.4 2.6 219.5 .1 237 12.2 253.2 29.7 255.7s33.7-9.7 36.2-27.1zm443.5 64c2.5-17.5-9.7-33.7-27.1-36.2s-33.7 9.7-36.2 27.1c-13.3 93-93.4 164.5-190.1 164.5-53 0-101-21.5-135.8-56.2-.2-.2-.4-.4-.6-.6l-7.6-7.2 47.9 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L32 320c-8.5 0-16.7 3.4-22.7 9.5S-.1 343.7 0 352.3l1 127c.1 17.7 14.6 31.9 32.3 31.7S65.2 496.4 65 478.7l-.4-51.5 10.7 10.1c46.3 46.1 110.2 74.7 180.7 74.7 129 0 235.7-95.4 253.4-219.5z"]};var n3={prefix:"fas",iconName:"list-ul",icon:[512,512,["list-dots"],"f0ca","M48 144a48 48 0 1 0 0-96 48 48 0 1 0 0 96zM192 64c-17.7 0-32 14.3-32 32s14.3 32 32 32l288 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L192 64zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32l288 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-288 0zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32l288 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-288 0zM48 464a48 48 0 1 0 0-96 48 48 0 1 0 0 96zM96 256a48 48 0 1 0 -96 0 48 48 0 1 0 96 0z"]};var t3={prefix:"fas",iconName:"tablet-screen-button",icon:[448,512,["tablet-alt"],"f3fa","M0 64C0 28.7 28.7 0 64 0L384 0c35.3 0 64 28.7 64 64l0 384c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 64zM256 432a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zM384 64l-320 0 0 288 320 0 0-288z"]};var e0={"address-book":A4,"arrow-down":e3,"arrow-left":O4,"arrow-right":x4,ban:X1,bell:O1,briefcase:c3,bullhorn:H4,calendar:V1,"caret-down":J4,"caret-up":G4,chart:R4,"chart-line":d4,check:h4,"check-double":V4,"chevron-down":T4,"circle-dot":o3,"circle-outline":q1,clock:e4,cloud:p4,comment:B4,comments:b4,desktop:l3,dialpad:s3,ellipsis:j1,envelope:W1,expand:c4,fax:Z1,fire:i4,folder:z4,gear:L4,globe:I4,hashtag:i3,headset:f4,image:m4,inbox:F4,link:M4,list:n3,"location-dot":r3,lock:U4,microphone:t4,"microphone-slash":G1,minus:$1,mobile:k4,music:K4,palette:J1,pause:a3,phone:y4,"phone-slash":Z4,"phone-volume":w4,play:v4,plug:P4,plus:Q4,record:Q1,robot:X4,rocket:r4,search:K1,send:s4,shield:$4,sitemap:Y1,sliders:C4,sms:I1,sparkles:E4,star:D4,stop:l4,sync:f3,"table-columns":a4,tablet:t3,tag:Y4,transfer:S4,upload:W4,user:g4,users:o4,voicemail:n4,warning:_4,"window-compact":j4,"window-restore":q4,"window-wide":u4,xmark:N4};function W(l,c){let a=e0[l],[e,r,,,s]=a.icon,i=Array.isArray(s)?s.join(" "):s;return M`<svg
    viewBox="0 0 ${e} ${r}"
    style="width:1em;height:1em;vertical-align:-0.125em;overflow:visible"
    fill="currentColor"
    role=${c?.label?"img":"presentation"}
    aria-label=${c?.label??""}
    aria-hidden=${c?.label?"false":"true"}
  >
    <path d=${i}></path>
  </svg>`}var E2={mode:"light",primaryColor:"#2563eb",primaryHover:"#1d4ed8",primaryText:"#ffffff",radius:"12px",fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'},R2={mode:"dark",primaryColor:"#60a5fa",primaryHover:"#93c5fd",primaryText:"#0f172a",radius:"12px",fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'},m3={primaryColor:"--dc-primary-color",primaryHover:"--dc-primary-hover",primaryText:"--dc-primary-text",radius:"--dc-radius",fontFamily:"--dc-font-family"};function D2(l){let c=l||{},a=String(c.theme||c.mode||"LIGHT").toLowerCase(),e=a==="dark"?R2:E2,r={mode:a==="auto"?"auto":e.mode,primaryColor:c.primaryColor||c.primary||e.primaryColor,primaryHover:c.primaryHover||e.primaryHover,primaryText:c.primaryText||e.primaryText,radius:c.radius||e.radius,fontFamily:c.fontFamily||e.fontFamily};return a==="auto"&&(r.mode="auto"),r}function r0(l){return l==="dark"?"dark":l==="light"?"light":typeof window<"u"&&typeof window.matchMedia=="function"&&window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}function _2(l,c){let a=D2(l),e=c||(typeof document<"u"?document.documentElement:null);if(!e||!e.style)return a;e.setAttribute("data-dc-theme",r0(a.mode));let r=Object.keys(m3);for(let s=0;s<r.length;s++){let i=r[s],f=a[i];typeof f=="string"&&f.length>0&&e.style.setProperty(m3[i],f)}return a}var z3="dc-session-expired",q2="dc-refresh-session";function G2(l){if(!l||typeof l!="string")return{};let c=l.split(".");if(c.length<2)return{};try{let a=c[1].replace(/-/g,"+").replace(/_/g,"/"),e=a+"===".slice((a.length+3)%4),r=typeof Buffer<"u"?Buffer.from(e,"base64").toString("utf8"):decodeURIComponent(atob(e).split("").map(function(i){return"%"+("00"+i.charCodeAt(0).toString(16)).slice(-2)}).join("")),s=JSON.parse(r);return s&&typeof s=="object"?s:{}}catch{return{}}}function p3(l){let c=G2(l).exp;return typeof c!="number"||!Number.isFinite(c)?null:c*1e3}function M3(l){if(l==null||l==="")return null;if(typeof l=="number"&&Number.isFinite(l))return l<1e12?l*1e3:l;let c=Date.parse(String(l));return Number.isNaN(c)?null:c}function $2(l){return!l||typeof l!="object"?!1:l.status===401||l.statusCode===401?!0:!!(l.response&&l.response.status===401)}function I2(l){return l?l.token||typeof l.getToken=="function"?!0:W2(l.tokenManager):!1}function W2(l){return!!(l&&typeof l.withAuthRetry=="function"&&typeof l.current=="function")}function O2(l,c){let a=l||{},e=W2(a.tokenManager),r=e?a.tokenManager:d3({token:a.token,expires_at:a.expires_at,getToken:a.getToken,onExpired:a.onExpired}),s=typeof c=="function"?r.onTokenChange(c):null,i=!1;return{manager:r,owned:!e,release:function(){i||(i=!0,s&&s(),e||r.destroy())}}}async function V2(l){if(l.manager.current())return l.manager.current();try{return await l.manager.refresh()}catch(c){throw l.release(),c}}function s0(l){return l||(typeof window<"u"&&window&&typeof window.addEventListener=="function"?window:null)}function i0(l,c){if(typeof CustomEvent=="function")return new CustomEvent(l,{bubbles:!0,composed:!0,detail:c});let a=new Event(l,{bubbles:!0,composed:!0});return a.detail=c,a}function U2(l,c){let a=setTimeout(l,Math.min(Math.max(0,c),2147483647));return a&&typeof a.unref=="function"&&a.unref(),a}function d3(l){let c=l||{},a=typeof c.getToken=="function"?c.getToken:null,e=typeof c.onExpired=="function"?c.onExpired:null,r=typeof c.now=="function"?c.now:Date.now,s=s0(c.target),i=[],f="",o=null,t=null,L=null,n=!1,m=!1,z=!1;function h(){t&&(clearTimeout(t),t=null)}function N(){let p=i.slice();for(let v=0;v<p.length;v++)try{p[v](f)}catch{}}function F(p,v){if(h(),n||m)return;n=!0;let u={reason:p,error:v||null,expires_at:o};s&&s.dispatchEvent(i0(z3,u)),e&&e(u)}function e2(){if(h(),z=!1,m||!o)return;let p=o-r();if(!a){t=U2(function(){t=null,F("token_expired")},p);return}let v=Math.floor(p*.8);p-v<1e4&&(v=p-1e4),t=U2(r1,v)}function r1(){t=null,r2("scheduled").catch(function(){})}function C2(p,v){f=String(p),o=p3(f)||M3(v),n=!1,e2(),N()}function F3(){if(z||!o)return!1;let p=o-1e4-r();return p<=0?!1:(z=!0,t=U2(r1,p),!0)}function r2(p){if(m)return Promise.reject(new Error("Token manager was closed"));if(L)return L;if(!a){let u=new Error("No getToken() was provided to refresh the session");return F(p==="unauthorized"?"unauthorized":"refresh_unavailable",u),Promise.reject(u)}let v=z;return L=Promise.resolve().then(function(){return a()}).then(function(u){let s2=typeof u=="string"?u:u&&typeof u.token=="string"?u.token:"";if(!s2)throw new Error("getToken() did not return a token");if(L=null,m)throw new Error("Token manager was closed");return C2(s2,u&&typeof u=="object"?u.expires_at:null),f}).catch(function(u){throw L=null,m||p==="scheduled"&&!v&&F3()||F("refresh_failed",u),u}),L}async function s1(p){try{await r2("unauthorized")}catch{throw p}}function i1(){r2("requested").catch(function(){})}return c.token&&C2(c.token,c.expires_at),s&&s.addEventListener(q2,i1),{current:function(){return f},expiresAt:function(){return o},hasRefresher:function(){return!!a},isExpired:function(){return n},isDestroyed:function(){return m},refresh:function(){return r2("manual")},setToken:function(p,v){if(m)throw new Error("Token manager was closed");if(!p)throw new Error("setToken(token) requires a site token");let u=typeof p=="object"?p.token:p,s2=typeof p=="object"?p.expires_at:v;if(!u)throw new Error("setToken(token) requires a site token");return C2(u,s2),f},withAuthRetry:async function(p){if(m)throw new Error("Token manager was closed");let v;try{v=await p(f)}catch(u){if(!$2(u))throw u;return await s1(u),p(f)}return $2(v)&&v.ok===!1?(await s1(v),p(f)):v},onTokenChange:function(p){return i.push(p),function(){let v=i.indexOf(p);v>=0&&i.splice(v,1)}},destroy:function(){m||(m=!0,h(),L=null,i.length=0,s&&s.removeEventListener(q2,i1))}}}var j2="consent_required",v3="consent_invalid",o0="sms_registration_required",f0={400:"invalid_request",401:"unauthorized",402:"payment_required",403:"forbidden",404:"not_found",409:"conflict",429:"rate_limited"},n0={no_granted_consent:"Drop Cowboy has no granted consent on file for this contact and number.",phone_mismatch:"This number is not one of the contact's numbers, so their recorded consent does not cover it.",opted_out:"This contact opted out (replied STOP), so they cannot be messaged until they opt back in.",contact_dnc:"This contact is on your Do Not Call list.",contact_not_found:"Drop Cowboy could not find that contact, so there is no recorded consent to use.",consent_record_invalid:"The consent recorded for this contact no longer covers this number or channel."},L3={[o0]:"This number is not registered for texting yet. US carriers only deliver business texts from numbers on a registered brand and campaign (10DLC). Register them in Drop Cowboy, then try again."},u3='Capture consent with the Consent block first, or ask a team admin to turn on "Use existing contact consent" in Building Blocks settings so consent already recorded in Drop Cowboy counts.';function S(l){if(typeof l=="string"){let c=l.trim();return c&&c!=="[object Object]"?c:""}return""}function t0(l){return!l||typeof l!="object"?{}:l.payload&&typeof l.payload=="object"?l.payload:l.body&&typeof l.body=="object"?l.body:l.response&&l.response.data&&typeof l.response.data=="object"?l.response.data:!(l instanceof Error)&&(l.detail!==void 0||l.title!==void 0||l.message!==void 0)?l:{}}function m0(l){let c=S(l);if(!c||c==="about:blank")return"";let a=c.split("/");return a[a.length-1]||""}function O(l,c){let a=S(c)||"Something went wrong. Try again.";if(typeof l=="string")return{code:"request_failed",message:S(l)||a,reason:null,status:null};let e=t0(l),r=e.detail!==void 0?e.detail:l&&l.detail,s=Number(l&&(l.status||l.statusCode)||e.status)||null,i="",f=null,o="";return r&&typeof r=="object"?(i=S(r.code),f=S(r.reason)||null,o=S(e.message)||S(r.message)||S(e.title)):o=S(r)||S(e.message)||S(e.title),i||(i=S(e.code)||S(l&&l.code)||m0(e.type)),o||(o=S(l&&l.message)),i||(i=s&&f0[s]||"request_failed"),i===j2?o=h3(f):L3[i]&&(o=L3[i]),{code:i,message:o||a,reason:f,status:s}}function K2(l){return!!l&&(l.code===j2||l.code===v3)}function h3(l){let c="This contact needs recorded consent before you can text or call them.",a=l&&n0[l];return l==="opted_out"||l==="contact_dnc"?c+" "+a:a?c+" "+a+" "+u3:c+" "+u3}var B="https://app-api-v2.dropcowboy.com";function V(l){if(!l||typeof l!="string")return{};let c=l.split(".");if(c.length<2)return{};try{let a=c[1].replace(/-/g,"+").replace(/_/g,"/"),e=a+"===".slice((a.length+3)%4),r=typeof Buffer<"u"?Buffer.from(e,"base64").toString("utf8"):decodeURIComponent(atob(e).split("").map(function(s){return"%"+("00"+s.charCodeAt(0).toString(16)).slice(-2)}).join(""));return JSON.parse(r)}catch{return{}}}var J2={},a2=null,X2="https://dropcowboy.com/app";function Y2(l,c){let a=String(l||B).replace(/\/$/,""),e=a.endsWith("/phone")?a:a+"/phone",r=new URLSearchParams;return r.set("origin_type","embed"),c&&c.embed_site_id&&r.set("embed_site_id",c.embed_site_id),e+"/embed/inbox?"+r.toString()}function Z2(l){let c=String(l||B).replace(/\/$/,"");return c.endsWith("/phone")?c+"/embed/sms":c+"/phone/embed/sms"}function c1(){return{get:function(l,c){return C3("GET",l,void 0,c)},post:function(l,c,a){return C3("POST",l,c,a)}}}function C3(l,c,a,e){let r={method:l,headers:e||{}};return a!==void 0&&(r.body=JSON.stringify(a)),fetch(c,r).then(function(s){return s.json().catch(function(){return{}}).then(function(i){if(!s.ok){let f=O({payload:i,status:s.status},"Request failed"),o=new Error(f.message);throw o.code=f.code,o.status=s.status,o.payload=i,o}return i})})}function z0(l){return!l||typeof l!="object"?l:l.data!==void 0?l.data:l}function a1(l){let c=z0(l);return Array.isArray(c)?c:!c||typeof c!="object"?[]:Array.isArray(c.tasks)?c.tasks:Array.isArray(c.conversations)?c.conversations:Array.isArray(c.records)?c.records:[]}function p0(l){let c=String(l||"").trim().split(/\s+/),a="";for(let e=0;e<c.length&&a.length<2;e++)c[e]&&(a+=c[e].charAt(0));return a.toUpperCase()||"?"}function M0(l){if(l==null||l==="")return"";let c=typeof l=="number"?l:Date.parse(l);if(!c||Number.isNaN(c))return String(l);try{return new Date(c).toLocaleTimeString([],{hour:"numeric",minute:"2-digit"})}catch{return""}}function d0(l){let c=String(l||"").toLowerCase();return c==="sms"||c==="mms"||c==="rcs"?"sms":c==="chat"?"chat":c==="email"?"email":c==="rvm"||c==="voicemail"||c==="ringless"?"rvm":c==="call"||c==="inbound_call"||c==="outbound_call"||c==="missed_call"||c==="fax"?"call":"sms"}var L0={sms:"SMS",chat:"Chat",email:"Email",rvm:"Voicemail",call:"Call"};function l2(l){let c=String(l||"").toLowerCase();return L0[c]||c.toUpperCase()}function g3(l){let c=l||{},a=c.preview_info||{},e=a.task_contact||c.contact_name||c.contact&&(c.contact.name||c.contact.first_name)||"Unknown",r=c.main_phone||c.phone_number||c.contact&&(c.contact.phone||c.contact.main_phone)||"",s=a.task_content||a.task_subject||c.preview||c.last_message||"",i=c.task_id||c.id||c.conversation_id,f=c.caller_id||c.from||c.assigned_number||a.caller_id||a.from||void 0,o=c.voice_ivr_id||a.voice_ivr_id||void 0;return{conversation:{id:i,contact:{id:c.contact_id||"",name:e,phone:r,initials:p0(e),company:c.contact&&c.contact.company||""},channel:d0(c.task_type||c.channel),preview:s,when:M0(a.task_date||c.updated_at||c.created_at),unread:c.unread===!0,assignee:c.assigned_to_name||void 0},reply:{phone:r,contact_id:c.contact_id||void 0,consent_id:c.consent_id||a.consent_id||c.tcpa_consent_id||void 0,caller_id:f,voice_ivr_id:o}}}function l1(l){let c=[],a={},e=l||[];for(let r=0;r<e.length;r++){let s=g3(e[r]);s.conversation.id&&(c.push(s.conversation),a[s.conversation.id]=s.reply)}return{conversations:c,replyContext:a}}function x3(l){let c=g3(l),a=c.conversation.preview;return a?[{id:c.conversation.id+"-preview",author:"visitor",text:a,ts:Date.now(),authorName:c.conversation.contact.name,channel:c.conversation.channel==="sms"?"sms":"chat"}]:[]}function e1(l,c){let a=String(c||X2).replace(/\/$/,""),e=l?String(l).charAt(0)==="#"?l:"#"+l:"#/inbox",r=a+e;return typeof window<"u"&&typeof window.open=="function"&&window.open(r,"_blank","noopener"),r}function u0(l){return new Q2(l||J2)}function j(){return a2||(a2=u0(J2)),a2}async function S3(l){return j().init(l)}function N3(l){j().setTheme(l)}async function b3(l){return j().openInbox(l)}function k3(l){return j().addTaskListener(l)}function w3(l){return j().addErrorListener(l)}function y3(l){return j().setToken(l)}async function A3(){let l=a2;a2=null,l&&await l.close()}var Q2=class{constructor(c){this.http=c&&c.http||J2.http||c1(),this.token=null,this.session=null,this.el=null,this.phoneApiBase=B,this.portalBase=X2,this.teamId=null,this.embedSiteId=null,this.theme={},this.listeners=[],this.errorListeners=[],this.conversations=[],this.replyContext={},this.defaultFrom=null,this.defaultVoiceIvrId=null}async init(c){if(!I2(c))throw new Error("init({ token }) requires a site token from POST /embed/token");this.phoneApiBase=c.phoneApiBase||B,this.portalBase=c.portalBase||X2,this.defaultFrom=c.from||c.callerId||c.number||null,this.defaultVoiceIvrId=c.voiceIvrId||c.voice_ivr_id||null,this._releaseSession(),this.session=O2(c,a=>this._applyToken(a)),this._applyToken(await V2(this.session))}setToken(c){if(!this.session)throw new Error("Call init({ token }) before setToken");return this.session.manager.setToken(c)}getTokenManager(){return this.session?this.session.manager:null}_applyToken(c){this.token=c||null;let a=V(c);this.teamId=a.team_id||null,this.embedSiteId=a.embed_site_id||a.site_id||null,this.el&&c&&this.el.token!==c&&(this.el.token=c)}_releaseSession(){this.session&&(this.session.release(),this.session=null)}_authed(c){return this.session.manager.withAuthRetry(a=>c({Authorization:"Bearer "+a,"Content-Type":"application/json"}))}setTheme(c){this.theme=Object.assign({},this.theme,c||{}),_2(this.theme)}getTheme(){return this.theme}bearerHeaders(){return{Authorization:"Bearer "+this.token,"Content-Type":"application/json"}}async fetchInbox(){if(!this.token)throw new Error("Call init({ token }) before openInbox");let c=Y2(this.phoneApiBase,{embed_site_id:this.embedSiteId}),a=await this._authed(r=>this.http.get(c,r)),e=l1(a1(a));return this.conversations=e.conversations,this.replyContext=e.replyContext,this.conversations}async openInbox(c){if(!this.token)throw new Error("Call init({ token }) before openInbox");let a=c&&c.container;if(!a){let r=await this.fetchInbox();return this._emit({type:"inbox-opened",conversations:r}),r}let e=null;if(typeof document<"u"){let r=typeof a=="string"?document.querySelector(a):a;r&&(e=r,(!r.tagName||String(r.tagName).toLowerCase()!=="dc-shared-inbox")&&(e=r.querySelector&&r.querySelector("dc-shared-inbox"),!e&&r.appendChild&&(e=document.createElement("dc-shared-inbox"),r.appendChild(e))),e&&(e.phoneApiBase=this.phoneApiBase,this.defaultFrom&&!e.from&&!e.number&&!e.callerId&&(e.from=this.defaultFrom),this.defaultVoiceIvrId&&!e.voiceIvrId&&(e.voiceIvrId=this.defaultVoiceIvrId),e.token=this.token,this.el=e))}return this._emit({type:"inbox-opening"}),e}async sendReply(c,a){if(!this.token)throw new Error("Call init({ token }) before sendReply");let e=this.replyContext[c]||{};if(!e.phone||!a)throw new Error("sendReply requires a conversation with a phone number and a body");let r=e.caller_id||this.defaultFrom,s=e.voice_ivr_id||this.defaultVoiceIvrId;if(!r&&!s)throw new Error("sendReply requires a business caller_id (from/number) or voiceIvrId");let i={phone_number:e.phone,sms_body:a};r&&(i.caller_id=r),s&&(i.voice_ivr_id=s),e.contact_id&&(i.contact_id=e.contact_id),e.consent_id&&(i.consent_id=e.consent_id);let f=await this._authed(o=>this.http.post(Z2(this.phoneApiBase),i,o));return this._emit({type:"reply-sent",conversationId:c,body:a,sms_id:f&&(f.sms_id||f.data&&f.data.sms_id)}),f}addTaskListener(c){return this.listeners.push(c),()=>{this.listeners=this.listeners.filter(function(a){return a!==c})}}addErrorListener(c){return this.errorListeners.push(c),()=>{this.errorListeners=this.errorListeners.filter(function(a){return a!==c})}}openInPortal(c){return e1(c||"#/inbox",this.portalBase)}async close(){this._releaseSession(),this.token=null,this.el=null,this.listeners=[],this.errorListeners=[],this.conversations=[],this.replyContext={}}_emit(c){for(let a=0;a<this.listeners.length;a++)this.listeners[a](c)}};function v0(l){if(!l)return"";let c=V(l),a=c.team_id||"",e=c.embed_site_id||c.site_id||"";return!a&&!e?"token:"+l:a+"|"+e}function T3(){let l="";return{shouldLoad:function(c){let a=v0(c);return!a||a===l?!1:(l=a,!0)},reset:function(){l=""}}}function P3(l,c){let a=l||[];if(c){for(let e=0;e<a.length;e++)if(a[e].id===c)return c}return a.length?a[0].id:""}var B3={sms:{content:"S",bg:"#16a34a"},chat:{content:"C",bg:"var(--dc-primary-color)"},call:{content:W("phone"),bg:"#7c3aed"},email:{content:"@",bg:"#ea580c"},rvm:{content:"V",bg:"#7c3aed"}},g=class extends b{constructor(){super(...arguments);this.conversations=[];this.thread=[];this.selectedId="";this.filter="all";this.connection="connected";this.loading=!1;this.composerMode="reply";this.token="";this.from="";this.number="";this.callerId="";this.voiceIvrId="";this.phoneApiBase="";this.errorMessage="";this.tokenManager=null;this.consentMessage="";this.http=c1();this.replyContext={};this.fetchGen=0;this.reloadGate=T3();this.offTokenChange=null}get selected(){return this.conversations.find(a=>a.id===this.selectedId)??this.conversations[0]}get unreadCount(){let a=0;for(let e of this.conversations)e.unread&&a++;return a}filtered(){let a=this.conversations;switch(this.filter){case"unassigned":return a.filter(e=>!e.assignee);case"mine":return a.filter(e=>e.assignee==="You");case"sms":return a.filter(e=>e.channel==="sms");case"chat":return a.filter(e=>e.channel==="chat");default:return a}}connectedCallback(){super.connectedCallback(),this.tokenManager&&!this.offTokenChange&&this.watchTokenManager()}disconnectedCallback(){super.disconnectedCallback(),this.unwatchTokenManager()}updated(a){a.has("tokenManager")&&(this.unwatchTokenManager(),this.reloadGate.reset(),this.tokenManager&&this.watchTokenManager()),(a.has("token")||a.has("tokenManager"))&&this.maybeLoad()}watchTokenManager(){let a=this.tokenManager;a&&(this.offTokenChange=a.onTokenChange(()=>this.maybeLoad()))}unwatchTokenManager(){this.offTokenChange&&this.offTokenChange(),this.offTokenChange=null}currentToken(){return this.tokenManager?this.tokenManager.current():this.token}maybeLoad(){this.reloadGate.shouldLoad(this.currentToken())&&this.loadInbox()}authed(a){let e=r=>({Authorization:"Bearer "+r,"Content-Type":"application/json"});return this.tokenManager?this.tokenManager.withAuthRetry(r=>a(e(r))):a(e(this.token))}threadFor(a){return a?x3({preview_info:{task_content:a.preview},task_id:a.id,task_type:a.channel}):[]}reportError(a){K2(a)?this.consentMessage=a.message:this.errorMessage=a.message,this.dispatchEvent(new CustomEvent("dc-error",{detail:{code:a.code,message:a.message,reason:a.reason},bubbles:!0,composed:!0}))}async loadInbox(){let a=++this.fetchGen;this.loading=!0,this.errorMessage="";try{let e=V(this.currentToken()),r=e.embed_site_id||e.site_id,s=await this.authed(f=>this.http.get(Y2(this.phoneApiBase||B,{embed_site_id:r}),f));if(a!==this.fetchGen)return;let i=l1(a1(s));this.conversations=i.conversations,this.replyContext=i.replyContext,this.selectedId=P3(this.conversations,this.selectedId),this.thread=this.threadFor(this.conversations.find(f=>f.id===this.selectedId))}catch(e){if(a!==this.fetchGen)return;this.reloadGate.reset(),this.reportError(O(e,"Unable to load the inbox."))}finally{a===this.fetchGen&&(this.loading=!1)}}select(a){a!==this.selectedId&&(this.consentMessage=""),this.selectedId=a;let e=this.conversations.find(s=>s.id===a);this.thread=this.threadFor(e);let r=this.replyContext[a]||{};this.dispatchEvent(new CustomEvent("dc-select-conversation",{detail:{id:a,contact_id:r.contact_id||e?.contact.id||null,phone:r.phone||e?.contact.phone||null,name:e?.contact.name||null},bubbles:!0,composed:!0}))}async sendComposer(){let a=(this.composerField?.value||"").trim(),e=this.selected;if(this.dispatchEvent(new CustomEvent("dc-send",{detail:{text:a,id:e?.id,note:this.composerMode==="note"},bubbles:!0,composed:!0})),this.composerMode==="note"||!a||!e||!this.currentToken())return;let r=this.replyContext[e.id]||{phone:e.contact.phone,contact_id:e.contact.id},s=r.caller_id||this.callerId||this.from||this.number,i=r.voice_ivr_id||this.voiceIvrId;if(!s&&!i){this.reportError({code:"caller_id_required",message:"Set the business number to reply from (the from or number attribute, or init({ from })).",reason:null,status:null});return}this.errorMessage="",this.consentMessage="";let f={phone_number:r.phone||e.contact.phone,sms_body:a};s&&(f.caller_id=s),i&&(f.voice_ivr_id=i),r.contact_id&&(f.contact_id=r.contact_id),r.consent_id&&(f.consent_id=r.consent_id);try{let o=await this.authed(t=>this.http.post(Z2(this.phoneApiBase||B),f,t));this.composerField&&(this.composerField.value=""),this.dispatchEvent(new CustomEvent("dc-message-sent",{detail:{to:f.phone_number,contact_id:f.contact_id||null,conversation_id:e.id,sms_id:o&&(o.sms_id||o.id)||null},bubbles:!0,composed:!0}))}catch(o){this.reportError(O(o,"Unable to send the reply."))}}render(){return M`
      <div class="app">
        ${this.errorMessage?M`<div class="errbanner" style="grid-column:1/-1">${this.errorMessage}</div>`:d}
        <nav class="nav" aria-label="Sections">
          <div class="n on" title="Inbox">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-6l-2 3h-4l-2-3H2"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></svg>
            ${this.unreadCount?M`<span class="b"></span>`:d}
          </div>
          <div class="n" title="Contacts">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
          </div>
          <div class="n" title="Calls">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
          </div>
          <div class="n" title="Settings">${W("gear")}</div>
        </nav>
        ${this.renderList()} ${this.renderThread()} ${this.renderContext()}
      </div>
    `}renderList(){let a=["all","unassigned","mine","sms","chat"];return M`
      <section class="list" aria-label="Conversations">
        <div class="lh">
          <h2>Inbox</h2>
          ${this.unreadCount?M`<span class="dc-pill is-danger">${this.unreadCount} unread</span>`:d}
        </div>
        <div class="filters">
          ${a.map(e=>M`<button class="f ${this.filter===e?"on":""}" @click=${()=>this.filter=e}>
              ${e==="all"?"All":e==="unassigned"?"Unassigned":e==="mine"?"Mine":l2(e)}
            </button>`)}
        </div>
        <div class="convs">
          ${this.loading?this.renderListSkeleton():B2(this.filtered(),e=>e.id,e=>this.renderConv(e))}
        </div>
      </section>
    `}renderConv(a){let e=B3[a.channel]||B3.sms,r=(this.selected?.id??"")===a.id;return M`
      <button class="conv ${r?"sel":""}" @click=${()=>this.select(a.id)}>
        <span class="dc-avatar">${a.contact.initials??a.contact.name.slice(0,2)}</span>
        <span class="meta">
          <span class="top"><span class="nm">${a.contact.name}</span><span class="tm">${a.when}</span></span>
          <span class="pv">
            <span class="chan" style="background:${e.bg}">${e.content}</span>
            <span class=${a.typing?"typing":""}>${a.typing?"Typing\u2026":a.preview}</span>
          </span>
        </span>
        ${a.unread?M`<span class="unread"></span>`:d}
      </button>
    `}renderThread(){let a=this.selected;return this.loading?M`<section class="thread"><div class="loadingpane">Loading conversation…</div></section>`:a?M`
      <section class="thread" aria-label="Conversation with ${a.contact.name}">
        <div class="th">
          <span class="dc-avatar">${a.contact.initials??a.contact.name.slice(0,2)}<span class="dc-dot"></span></span>
          <div>
            <div style="font-weight:700">${a.contact.name}</div>
            <div class="dc-muted dc-sm">${l2(a.channel)} · ${a.contact.phone}</div>
          </div>
          <div class="sp"></div>
          <button class="dc-btn dc-secondary" @click=${()=>this.emit("dc-assign")}>Assign</button>
          <button class="dc-btn dc-secondary" @click=${()=>e1("#/inbox")}>Open portal</button>
        </div>
        ${this.renderBanner()}
        ${this.consentMessage?M`<div class="consentbanner" role="alert"><strong>Consent required</strong>${this.consentMessage}</div>`:d}
        <div class="timeline" role="log">
          ${B2(this.thread,e=>e.id,e=>this.renderMessage(e))}
        </div>
        ${this.renderComposer(a)}
      </section>
    `:M`<section class="thread">
        <div class="empty">
          <div>
            <div style="font-size:30px;margin-bottom:6px">${W("check")}</div>
            <strong style="color:var(--dc-text-color)">Inbox zero</strong>
            <p class="dc-sm">No open conversations. New messages land here in real time.</p>
          </div>
        </div>
      </section>`}renderBanner(){return this.connection==="reconnecting"?M`<div class="banner reconnecting" role="status"><span class="dot"></span>Reconnecting… messages will sync automatically</div>`:this.connection==="down"?M`<div class="banner down" role="alert"><span class="dot"></span>You're offline — replies are paused until the connection returns</div>`:M`${d}`}renderMessage(a){if(a.author==="system")return M`<div class="sysrow">${a.text}</div>`;let e=a.author==="agent";return M`
      <div class="tev ${e?"out":""}">
        ${e?d:M`<span class="dc-avatar" style="width:28px;height:28px;font-size:11px">${(a.authorName??"?").slice(0,2)}</span>`}
        <div>
          <div class="label">${a.authorName??(e?"You":"")} ${a.channel?`\xB7 ${l2(a.channel)}`:""}</div>
          <div class="bub">${a.text}</div>
        </div>
      </div>
    `}renderComposer(a){let e=this.composerMode==="note",r=this.connection==="down";return M`
      <div class="composer">
        <div class="ctabs">
          <button class="ctab ${e?"":"on"}" @click=${()=>this.composerMode="reply"}>Reply</button>
          <button class="ctab note ${e?"on":""}" @click=${()=>this.composerMode="note"}>
            ${W("lock")} Note
          </button>
        </div>
        <div class="cbox ${e?"note":""}">
          <textarea
            class="field"
            ?disabled=${r}
            placeholder=${e?"Add an internal note (only your team sees this)\u2026":`Reply via ${l2(a.channel)}\u2026`}
          ></textarea>
          <button class="dc-btn" ?disabled=${r} @click=${()=>this.sendComposer()}>${e?"Save":"Send"}</button>
        </div>
      </div>
    `}renderContext(){let a=this.selected;return a?M`
      <aside class="ctx" aria-label="Contact details">
        <div class="who">
          <div class="dc-avatar big">${a.contact.initials??a.contact.name.slice(0,2)}</div>
          <div style="font-weight:700">${a.contact.name}</div>
          <div class="dc-muted dc-sm">${a.contact.company??""}</div>
        </div>
        <h4>Details</h4>
        <div class="kv"><span class="k">Stage</span><span>${a.contact.stage||"\u2014"}</span></div>
        <div class="kv"><span class="k">Owner</span><span>${a.assignee||a.contact.owner||"Unassigned"}</span></div>
        <div class="kv"><span class="k">Phone</span><span>${a.contact.phone}</span></div>
      </aside>
    `:M`<aside class="ctx"></aside>`}renderListSkeleton(){return M`
      ${[0,1,2,3].map(()=>M`<div class="conv" style="cursor:default">
          <span class="dc-avatar" style="background:var(--dc-surface-2)"></span>
          <span class="meta" style="display:flex;flex-direction:column;gap:7px">
            <span class="skel" style="width:60%"></span>
            <span class="skel" style="width:85%"></span>
          </span>
        </div>`)}
    `}emit(a){this.dispatchEvent(new CustomEvent(a,{bubbles:!0,composed:!0}))}};g.styles=[b.styles,H`
      :host {
        display: block;
        width: 100%;
        height: 600px;
        container-type: inline-size;
      }
      .app {
        display: grid;
        grid-template-columns: 76px 320px 1fr 280px;
        height: 100%;
        background: var(--dc-bg-color);
        border: 1px solid var(--dc-border-color);
        border-radius: var(--dc-radius);
        overflow: hidden;
      }
      /* nav rail */
      .nav {
        background: var(--dc-surface-color);
        border-right: 1px solid var(--dc-border-color);
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 14px 0;
        gap: 8px;
      }
      .nav .n {
        width: 44px;
        height: 44px;
        border-radius: var(--dc-radius-sm);
        display: grid;
        place-items: center;
        color: var(--dc-text-muted);
        cursor: pointer;
        position: relative;
      }
      .nav .n.on {
        background: var(--dc-primary-soft);
        color: var(--dc-primary-color);
      }
      .nav .n .b {
        position: absolute;
        top: 6px;
        right: 6px;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: var(--dc-danger);
      }
      /* list */
      .list {
        border-right: 1px solid var(--dc-border-color);
        display: flex;
        flex-direction: column;
        min-width: 0;
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
      }
      .f.on {
        background: var(--dc-primary-soft);
        color: var(--dc-primary-color);
      }
      .convs {
        overflow-y: auto;
        flex: 1;
      }
      .conv {
        display: flex;
        gap: 11px;
        padding: 12px 14px;
        border-bottom: 1px solid var(--dc-border-color);
        cursor: pointer;
        background: none;
        border-left: 0;
        border-right: 0;
        border-top: 0;
        width: 100%;
        text-align: left;
      }
      .conv:hover {
        background: var(--dc-surface-color);
      }
      .conv.sel {
        background: var(--dc-primary-soft);
      }
      .conv .meta {
        min-width: 0;
        flex: 1;
      }
      .conv .top {
        display: flex;
        justify-content: space-between;
        gap: 8px;
      }
      .conv .nm {
        font-weight: 600;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .conv .tm {
        font-size: var(--dc-font-size-xs);
        color: var(--dc-text-light);
        flex-shrink: 0;
      }
      .conv .pv {
        font-size: var(--dc-font-size-sm);
        color: var(--dc-text-muted);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        display: flex;
        align-items: center;
        gap: 6px;
      }
      .chan {
        width: 16px;
        height: 16px;
        border-radius: 4px;
        display: inline-grid;
        place-items: center;
        font-size: 9px;
        color: #fff;
        flex-shrink: 0;
      }
      .unread {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: var(--dc-primary-color);
        align-self: center;
        flex-shrink: 0;
      }
      .typing {
        color: var(--dc-online-text);
        font-style: italic;
      }
      /* thread */
      .thread {
        display: flex;
        flex-direction: column;
        min-width: 0;
      }
      .th {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px 18px;
        border-bottom: 1px solid var(--dc-border-color);
      }
      .th .sp {
        flex: 1;
      }
      .banner {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 8px 16px;
        font-size: var(--dc-font-size-sm);
        font-weight: 600;
      }
      .banner.reconnecting {
        background: var(--dc-warning-soft);
        color: var(--dc-warning-text);
      }
      .banner.down {
        background: var(--dc-danger-soft);
        color: var(--dc-danger-text);
      }
      .banner .dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: currentColor;
      }
      .banner.reconnecting .dot {
        animation: blink 1s ease-in-out infinite;
      }
      @keyframes blink {
        50% {
          opacity: 0.25;
        }
      }
      .timeline {
        flex: 1;
        overflow-y: auto;
        padding: 18px;
        display: flex;
        flex-direction: column;
        gap: 12px;
        background: var(--dc-surface-color);
      }
      .tev {
        display: flex;
        gap: 10px;
        max-width: 78%;
      }
      .tev.out {
        align-self: flex-end;
        flex-direction: row-reverse;
      }
      .tev .bub {
        padding: 9px 13px;
        border-radius: var(--dc-radius-bubble);
        background: var(--dc-bg-color);
        border: 1px solid var(--dc-border-color);
      }
      .tev.out .bub {
        background: var(--dc-primary-color);
        color: #fff;
        border: 0;
      }
      .tev .label {
        font-size: var(--dc-font-size-xs);
        color: var(--dc-text-light);
        margin-bottom: 3px;
      }
      .sysrow {
        align-self: center;
        font-size: var(--dc-font-size-xs);
        color: var(--dc-text-light);
        background: var(--dc-warning-soft);
        color: var(--dc-warning-text);
        padding: 5px 11px;
        border-radius: 999px;
      }
      .composer {
        padding: 12px 16px;
        border-top: 1px solid var(--dc-border-color);
      }
      .ctabs {
        display: flex;
        gap: 6px;
        margin-bottom: 8px;
      }
      .ctab {
        font-size: var(--dc-font-size-sm);
        font-weight: 600;
        padding: 5px 11px;
        border-radius: 8px;
        color: var(--dc-text-muted);
        cursor: pointer;
        border: 0;
        background: none;
      }
      .ctab.on {
        background: var(--dc-surface-color);
        color: var(--dc-text-color);
      }
      .ctab.note.on {
        background: var(--dc-warning-soft);
        color: var(--dc-warning-text);
      }
      .cbox {
        display: flex;
        gap: 8px;
      }
      .field {
        flex: 1;
        border: 1px solid var(--dc-border-color);
        border-radius: var(--dc-radius-sm);
        padding: 10px 12px;
        font: inherit;
        min-height: 44px;
        resize: none;
        background: var(--dc-bg-color);
        color: var(--dc-text-color);
      }
      .cbox.note .field {
        background: var(--dc-warning-soft);
        border-color: var(--dc-warning);
      }
      /* context */
      .ctx {
        border-left: 1px solid var(--dc-border-color);
        background: var(--dc-surface-color);
        padding: 18px 16px;
        overflow-y: auto;
      }
      .ctx .who {
        text-align: center;
      }
      .ctx .big {
        width: 52px;
        height: 52px;
        font-size: 17px;
        margin: 0 auto 8px;
      }
      .ctx h4 {
        font-size: var(--dc-font-size-xs);
        text-transform: uppercase;
        letter-spacing: 0.04em;
        color: var(--dc-text-light);
        margin: 16px 0 7px;
      }
      .ctx .kv {
        display: flex;
        justify-content: space-between;
        font-size: var(--dc-font-size-sm);
        padding: 6px 0;
        border-bottom: 1px solid var(--dc-border-color);
      }
      .ctx .kv .k {
        color: var(--dc-text-muted);
      }
      /* states */
      .empty,
      .loadingpane {
        flex: 1;
        display: grid;
        place-items: center;
        padding: 30px;
        text-align: center;
        color: var(--dc-text-light);
        background: var(--dc-surface-color);
      }
      .errbanner {
        padding: 8px 16px;
        font-size: var(--dc-font-size-sm);
        background: var(--dc-danger-soft);
        color: var(--dc-danger-text);
      }
      .consentbanner {
        padding: 10px 16px;
        font-size: var(--dc-font-size-sm);
        background: var(--dc-warning-soft);
        color: var(--dc-warning-text);
        border-bottom: 1px solid var(--dc-border-color);
      }
      .consentbanner strong {
        display: block;
        margin-bottom: 2px;
      }
      @container (max-width: 900px) {
        .app {
          grid-template-columns: minmax(220px, 40%) 1fr;
        }
        .nav,
        .ctx {
          display: none;
        }
      }
      @container (max-width: 560px) {
        .app {
          grid-template-columns: 1fr;
        }
        .thread {
          display: none;
        }
      }
      .skel {
        height: 12px;
        border-radius: 4px;
        background: var(--dc-surface-2);
        animation: pulse 1.2s ease-in-out infinite;
      }
      @keyframes pulse {
        50% {
          opacity: 0.5;
        }
      }
    `],C([x({attribute:!1})],g.prototype,"conversations",2),C([x({attribute:!1})],g.prototype,"thread",2),C([x({type:String})],g.prototype,"selectedId",2),C([x({type:String})],g.prototype,"filter",2),C([x({type:String})],g.prototype,"connection",2),C([x({type:Boolean})],g.prototype,"loading",2),C([x({type:String,attribute:"composer-mode"})],g.prototype,"composerMode",2),C([x({type:String})],g.prototype,"token",2),C([x({type:String})],g.prototype,"from",2),C([x({type:String})],g.prototype,"number",2),C([x({attribute:"caller-id"})],g.prototype,"callerId",2),C([x({attribute:"voice-ivr-id"})],g.prototype,"voiceIvrId",2),C([x({type:String,attribute:"phone-api-base"})],g.prototype,"phoneApiBase",2),C([x({type:String,attribute:"error-message"})],g.prototype,"errorMessage",2),C([x({attribute:!1})],g.prototype,"tokenManager",2),C([x({type:String,attribute:"consent-message"})],g.prototype,"consentMessage",2),C([T1("textarea.field")],g.prototype,"composerField",2),g=C([u2("dc-shared-inbox")],g);var h0={init:S3,setTheme:N3,addErrorListener:w3,addTaskListener:k3,openInbox:b3,setToken:y3,close:A3};t1({bundle:"shared-inbox",namespaces:{inbox:h0}});})();
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

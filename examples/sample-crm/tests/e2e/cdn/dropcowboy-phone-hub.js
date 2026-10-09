/*! Drop Cowboy Building Blocks phone-hub (@dropcowboy/embed-phone-hub 0.0.0). Do not edit. */
"use strict";(()=>{var O3=Object.defineProperty;var V3=Object.getOwnPropertyDescriptor;var u=(l,c,a,e)=>{for(var r=e>1?void 0:e?V3(c,a):c,s=l.length-1,i;s>=0;s--)(i=l[s])&&(r=(e?i(c,a,r):i(r))||r);return e&&r&&O3(c,a,r),r};var H2="__dcBundle",g1=/^DropCowboy./,B=typeof window<"u"?window:globalThis,d2=j3();function j3(){let l={},c={},a=B.DropCowboy;if(a&&typeof a=="object"){let r=Object.keys(a);for(let s=0;s<r.length;s++)l[r[s]]=a[r[s]]}let e=Object.keys(B);for(let r=0;r<e.length;r++)g1.test(e[r])&&(c[e[r]]=B[e[r]]);return{namespaces:l,globals:c}}function F2(l,c){return Object.prototype.hasOwnProperty.call(l,c)}function v1(l,c,a,e){let r=Object.keys(l);for(let s=0;s<r.length;s++){let i=r[s];!e(i)||F2(a,i)||(F2(c,i)?l[i]!==c[i]&&(l[i]=c[i]):delete l[i])}}function C1(l,c,a){return l&&l[H2]===a?l:(F2(c,H2)||Object.defineProperty(c,H2,{value:a}),c)}function K3(){return!0}function x1(l){let c=l.namespaces||{},a=l.globals||{};(!B.DropCowboy||typeof B.DropCowboy!="object")&&(B.DropCowboy={});let e=B.DropCowboy;v1(e,d2.namespaces,c,K3),v1(B,d2.globals,a,function(n){return g1.test(n)});let r={},s=Object.keys(c);for(let n=0;n<s.length;n++){let o=s[n];e[o]=C1(d2.namespaces[o],c[o],l.bundle),r[o]=e[o]}let i=Object.keys(a);for(let n=0;n<i.length;n++){let o=i[n];B[o]=C1(d2.globals[o],a[o],l.bundle)}return r}function S1(l,c){if("tokenManager"in l){l.tokenManager!==c.manager&&(l.tokenManager=c.manager);return}l.token=c.token}function b1(l){let c=l.selector,a=l.apply,e=new WeakSet,r=null,s=null,i=null;function n(f){!r||!r.token||(f.token||f.tokenManager)&&!e.has(f)||(e.add(f),a(f,r))}function o(f){if(!f||f.nodeType!==1)return;f.matches(c)&&n(f);let z=f.querySelectorAll(c);for(let p=0;p<z.length;p++)n(z[p])}function m(){s&&(s.disconnect(),s=null),i&&(i(),i=null),r=null}function d(f,z){m(),!(typeof document>"u"||!f)&&(r={token:f.current(),manager:f,settings:z||{}},i=f.onTokenChange(function(p){r&&(r.token=p,o(document.documentElement))}),typeof MutationObserver=="function"&&(s=new MutationObserver(function(p){for(let C=0;C<p.length;C++){let h=p[C].addedNodes;for(let N=0;N<h.length;N++)o(h[N])}}),s.observe(document.documentElement,{childList:!0,subtree:!0})),o(document.documentElement))}return{start:d,stop:m}}function M2(l){return typeof window>"u"||!window.DropCowboy||!window.DropCowboy.confirmSpend?!0:typeof window.confirm!="function"?!1:window.confirm(l)===!0}var u2=globalThis,L2=u2.ShadowRoot&&(u2.ShadyCSS===void 0||u2.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,E2=Symbol(),N1=new WeakMap,Z=class{constructor(c,a,e){if(this._$cssResult$=!0,e!==E2)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=c,this.t=a}get styleSheet(){let c=this.o,a=this.t;if(L2&&c===void 0){let e=a!==void 0&&a.length===1;e&&(c=N1.get(a)),c===void 0&&((this.o=c=new CSSStyleSheet).replaceSync(this.cssText),e&&N1.set(a,c))}return c}toString(){return this.cssText}},w1=l=>new Z(typeof l=="string"?l:l+"",void 0,E2),P=(l,...c)=>{let a=l.length===1?l[0]:c.reduce((e,r,s)=>e+(i=>{if(i._$cssResult$===!0)return i.cssText;if(typeof i=="number")return i;throw Error("Value passed to 'css' function must be a 'css' function result: "+i+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+l[s+1],l[0]);return new Z(a,l,E2)},k1=(l,c)=>{if(L2)l.adoptedStyleSheets=c.map(a=>a instanceof CSSStyleSheet?a:a.styleSheet);else for(let a of c){let e=document.createElement("style"),r=u2.litNonce;r!==void 0&&e.setAttribute("nonce",r),e.textContent=a.cssText,l.appendChild(e)}},R2=L2?l=>l:l=>l instanceof CSSStyleSheet?(c=>{let a="";for(let e of c.cssRules)a+=e.cssText;return w1(a)})(l):l;var{is:X3,defineProperty:Q3,getOwnPropertyDescriptor:J3,getOwnPropertyNames:Y3,getOwnPropertySymbols:Z3,getPrototypeOf:c0}=Object,h2=globalThis,y1=h2.trustedTypes,a0=y1?y1.emptyScript:"",l0=h2.reactiveElementPolyfillSupport,c2=(l,c)=>l,a2={toAttribute(l,c){switch(c){case Boolean:l=l?a0:null;break;case Object:case Array:l=l==null?l:JSON.stringify(l)}return l},fromAttribute(l,c){let a=l;switch(c){case Boolean:a=l!==null;break;case Number:a=l===null?null:Number(l);break;case Object:case Array:try{a=JSON.parse(l)}catch{a=null}}return a}},v2=(l,c)=>!X3(l,c),A1={attribute:!0,type:String,converter:a2,reflect:!1,useDefault:!1,hasChanged:v2};Symbol.metadata??=Symbol("metadata"),h2.litPropertyMetadata??=new WeakMap;var H=class extends HTMLElement{static addInitializer(c){this._$Ei(),(this.l??=[]).push(c)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(c,a=A1){if(a.state&&(a.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(c)&&((a=Object.create(a)).wrapped=!0),this.elementProperties.set(c,a),!a.noAccessor){let e=Symbol(),r=this.getPropertyDescriptor(c,e,a);r!==void 0&&Q3(this.prototype,c,r)}}static getPropertyDescriptor(c,a,e){let{get:r,set:s}=J3(this.prototype,c)??{get(){return this[a]},set(i){this[a]=i}};return{get:r,set(i){let n=r?.call(this);s?.call(this,i),this.requestUpdate(c,n,e)},configurable:!0,enumerable:!0}}static getPropertyOptions(c){return this.elementProperties.get(c)??A1}static _$Ei(){if(this.hasOwnProperty(c2("elementProperties")))return;let c=c0(this);c.finalize(),c.l!==void 0&&(this.l=[...c.l]),this.elementProperties=new Map(c.elementProperties)}static finalize(){if(this.hasOwnProperty(c2("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(c2("properties"))){let a=this.properties,e=[...Y3(a),...Z3(a)];for(let r of e)this.createProperty(r,a[r])}let c=this[Symbol.metadata];if(c!==null){let a=litPropertyMetadata.get(c);if(a!==void 0)for(let[e,r]of a)this.elementProperties.set(e,r)}this._$Eh=new Map;for(let[a,e]of this.elementProperties){let r=this._$Eu(a,e);r!==void 0&&this._$Eh.set(r,a)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(c){let a=[];if(Array.isArray(c)){let e=new Set(c.flat(1/0).reverse());for(let r of e)a.unshift(R2(r))}else c!==void 0&&a.push(R2(c));return a}static _$Eu(c,a){let e=a.attribute;return e===!1?void 0:typeof e=="string"?e:typeof c=="string"?c.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(c=>this.enableUpdating=c),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(c=>c(this))}addController(c){(this._$EO??=new Set).add(c),this.renderRoot!==void 0&&this.isConnected&&c.hostConnected?.()}removeController(c){this._$EO?.delete(c)}_$E_(){let c=new Map,a=this.constructor.elementProperties;for(let e of a.keys())this.hasOwnProperty(e)&&(c.set(e,this[e]),delete this[e]);c.size>0&&(this._$Ep=c)}createRenderRoot(){let c=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return k1(c,this.constructor.elementStyles),c}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(c=>c.hostConnected?.())}enableUpdating(c){}disconnectedCallback(){this._$EO?.forEach(c=>c.hostDisconnected?.())}attributeChangedCallback(c,a,e){this._$AK(c,e)}_$ET(c,a){let e=this.constructor.elementProperties.get(c),r=this.constructor._$Eu(c,e);if(r!==void 0&&e.reflect===!0){let s=(e.converter?.toAttribute!==void 0?e.converter:a2).toAttribute(a,e.type);this._$Em=c,s==null?this.removeAttribute(r):this.setAttribute(r,s),this._$Em=null}}_$AK(c,a){let e=this.constructor,r=e._$Eh.get(c);if(r!==void 0&&this._$Em!==r){let s=e.getPropertyOptions(r),i=typeof s.converter=="function"?{fromAttribute:s.converter}:s.converter?.fromAttribute!==void 0?s.converter:a2;this._$Em=r;let n=i.fromAttribute(a,s.type);this[r]=n??this._$Ej?.get(r)??n,this._$Em=null}}requestUpdate(c,a,e,r=!1,s){if(c!==void 0){let i=this.constructor;if(r===!1&&(s=this[c]),e??=i.getPropertyOptions(c),!((e.hasChanged??v2)(s,a)||e.useDefault&&e.reflect&&s===this._$Ej?.get(c)&&!this.hasAttribute(i._$Eu(c,e))))return;this.C(c,a,e)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(c,a,{useDefault:e,reflect:r,wrapped:s},i){e&&!(this._$Ej??=new Map).has(c)&&(this._$Ej.set(c,i??a??this[c]),s!==!0||i!==void 0)||(this._$AL.has(c)||(this.hasUpdated||e||(a=void 0),this._$AL.set(c,a)),r===!0&&this._$Em!==c&&(this._$Eq??=new Set).add(c))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(a){Promise.reject(a)}let c=this.scheduleUpdate();return c!=null&&await c,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[r,s]of this._$Ep)this[r]=s;this._$Ep=void 0}let e=this.constructor.elementProperties;if(e.size>0)for(let[r,s]of e){let{wrapped:i}=s,n=this[r];i!==!0||this._$AL.has(r)||n===void 0||this.C(r,void 0,s,n)}}let c=!1,a=this._$AL;try{c=this.shouldUpdate(a),c?(this.willUpdate(a),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(a)):this._$EM()}catch(e){throw c=!1,this._$EM(),e}c&&this._$AE(a)}willUpdate(c){}_$AE(c){this._$EO?.forEach(a=>a.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(c)),this.updated(c)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(c){return!0}update(c){this._$Eq&&=this._$Eq.forEach(a=>this._$ET(a,this[a])),this._$EM()}updated(c){}firstUpdated(c){}};H.elementStyles=[],H.shadowRootOptions={mode:"open"},H[c2("elementProperties")]=new Map,H[c2("finalized")]=new Map,l0?.({ReactiveElement:H}),(h2.reactiveElementVersions??=[]).push("2.1.2");var _2=globalThis,T1=l=>l,C2=_2.trustedTypes,B1=C2?C2.createPolicy("lit-html",{createHTML:l=>l}):void 0,U2="$lit$",F=`lit$${Math.random().toFixed(9).slice(2)}$`,q2="?"+F,e0=`<${q2}>`,O=document,e2=()=>O.createComment(""),r2=l=>l===null||typeof l!="object"&&typeof l!="function",$2=Array.isArray,D1=l=>$2(l)||typeof l?.[Symbol.iterator]=="function",D2=`[ 	
\f\r]`,l2=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,P1=/-->/g,H1=/>/g,I=RegExp(`>|${D2}(?:([^\\s"'>=/]+)(${D2}*=${D2}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),F1=/'/g,E1=/"/g,_1=/^(?:script|style|textarea|title)$/i,G2=l=>(c,...a)=>({_$litType$:l,strings:c,values:a}),t=G2(1),j0=G2(2),K0=G2(3),E=Symbol.for("lit-noChange"),M=Symbol.for("lit-nothing"),R1=new WeakMap,W=O.createTreeWalker(O,129);function U1(l,c){if(!$2(l)||!l.hasOwnProperty("raw"))throw Error("invalid template strings array");return B1!==void 0?B1.createHTML(c):c}var q1=(l,c)=>{let a=l.length-1,e=[],r,s=c===2?"<svg>":c===3?"<math>":"",i=l2;for(let n=0;n<a;n++){let o=l[n],m,d,f=-1,z=0;for(;z<o.length&&(i.lastIndex=z,d=i.exec(o),d!==null);)z=i.lastIndex,i===l2?d[1]==="!--"?i=P1:d[1]!==void 0?i=H1:d[2]!==void 0?(_1.test(d[2])&&(r=RegExp("</"+d[2],"g")),i=I):d[3]!==void 0&&(i=I):i===I?d[0]===">"?(i=r??l2,f=-1):d[1]===void 0?f=-2:(f=i.lastIndex-d[2].length,m=d[1],i=d[3]===void 0?I:d[3]==='"'?E1:F1):i===E1||i===F1?i=I:i===P1||i===H1?i=l2:(i=I,r=void 0);let p=i===I&&l[n+1].startsWith("/>")?" ":"";s+=i===l2?o+e0:f>=0?(e.push(m),o.slice(0,f)+U2+o.slice(f)+F+p):o+F+(f===-2?n:p)}return[U1(l,s+(l[a]||"<?>")+(c===2?"</svg>":c===3?"</math>":"")),e]},s2=class l{constructor({strings:c,_$litType$:a},e){let r;this.parts=[];let s=0,i=0,n=c.length-1,o=this.parts,[m,d]=q1(c,a);if(this.el=l.createElement(m,e),W.currentNode=this.el.content,a===2||a===3){let f=this.el.content.firstChild;f.replaceWith(...f.childNodes)}for(;(r=W.nextNode())!==null&&o.length<n;){if(r.nodeType===1){if(r.hasAttributes())for(let f of r.getAttributeNames())if(f.endsWith(U2)){let z=d[i++],p=r.getAttribute(f).split(F),C=/([.?@])?(.*)/.exec(z);o.push({type:1,index:s,name:C[2],strings:p,ctor:C[1]==="."?x2:C[1]==="?"?S2:C[1]==="@"?b2:j}),r.removeAttribute(f)}else f.startsWith(F)&&(o.push({type:6,index:s}),r.removeAttribute(f));if(_1.test(r.tagName)){let f=r.textContent.split(F),z=f.length-1;if(z>0){r.textContent=C2?C2.emptyScript:"";for(let p=0;p<z;p++)r.append(f[p],e2()),W.nextNode(),o.push({type:2,index:++s});r.append(f[z],e2())}}}else if(r.nodeType===8)if(r.data===q2)o.push({type:2,index:s});else{let f=-1;for(;(f=r.data.indexOf(F,f+1))!==-1;)o.push({type:7,index:s}),f+=F.length-1}s++}}static createElement(c,a){let e=O.createElement("template");return e.innerHTML=c,e}};function V(l,c,a=l,e){if(c===E)return c;let r=e!==void 0?a._$Co?.[e]:a._$Cl,s=r2(c)?void 0:c._$litDirective$;return r?.constructor!==s&&(r?._$AO?.(!1),s===void 0?r=void 0:(r=new s(l),r._$AT(l,a,e)),e!==void 0?(a._$Co??=[])[e]=r:a._$Cl=r),r!==void 0&&(c=V(l,r._$AS(l,c.values),r,e)),c}var g2=class{constructor(c,a){this._$AV=[],this._$AN=void 0,this._$AD=c,this._$AM=a}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(c){let{el:{content:a},parts:e}=this._$AD,r=(c?.creationScope??O).importNode(a,!0);W.currentNode=r;let s=W.nextNode(),i=0,n=0,o=e[0];for(;o!==void 0;){if(i===o.index){let m;o.type===2?m=new X(s,s.nextSibling,this,c):o.type===1?m=new o.ctor(s,o.name,o.strings,this,c):o.type===6&&(m=new N2(s,this,c)),this._$AV.push(m),o=e[++n]}i!==o?.index&&(s=W.nextNode(),i++)}return W.currentNode=O,r}p(c){let a=0;for(let e of this._$AV)e!==void 0&&(e.strings!==void 0?(e._$AI(c,e,a),a+=e.strings.length-2):e._$AI(c[a])),a++}},X=class l{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(c,a,e,r){this.type=2,this._$AH=M,this._$AN=void 0,this._$AA=c,this._$AB=a,this._$AM=e,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let c=this._$AA.parentNode,a=this._$AM;return a!==void 0&&c?.nodeType===11&&(c=a.parentNode),c}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(c,a=this){c=V(this,c,a),r2(c)?c===M||c==null||c===""?(this._$AH!==M&&this._$AR(),this._$AH=M):c!==this._$AH&&c!==E&&this._(c):c._$litType$!==void 0?this.$(c):c.nodeType!==void 0?this.T(c):D1(c)?this.k(c):this._(c)}O(c){return this._$AA.parentNode.insertBefore(c,this._$AB)}T(c){this._$AH!==c&&(this._$AR(),this._$AH=this.O(c))}_(c){this._$AH!==M&&r2(this._$AH)?this._$AA.nextSibling.data=c:this.T(O.createTextNode(c)),this._$AH=c}$(c){let{values:a,_$litType$:e}=c,r=typeof e=="number"?this._$AC(c):(e.el===void 0&&(e.el=s2.createElement(U1(e.h,e.h[0]),this.options)),e);if(this._$AH?._$AD===r)this._$AH.p(a);else{let s=new g2(r,this),i=s.u(this.options);s.p(a),this.T(i),this._$AH=s}}_$AC(c){let a=R1.get(c.strings);return a===void 0&&R1.set(c.strings,a=new s2(c)),a}k(c){$2(this._$AH)||(this._$AH=[],this._$AR());let a=this._$AH,e,r=0;for(let s of c)r===a.length?a.push(e=new l(this.O(e2()),this.O(e2()),this,this.options)):e=a[r],e._$AI(s),r++;r<a.length&&(this._$AR(e&&e._$AB.nextSibling,r),a.length=r)}_$AR(c=this._$AA.nextSibling,a){for(this._$AP?.(!1,!0,a);c!==this._$AB;){let e=T1(c).nextSibling;T1(c).remove(),c=e}}setConnected(c){this._$AM===void 0&&(this._$Cv=c,this._$AP?.(c))}},j=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(c,a,e,r,s){this.type=1,this._$AH=M,this._$AN=void 0,this.element=c,this.name=a,this._$AM=r,this.options=s,e.length>2||e[0]!==""||e[1]!==""?(this._$AH=Array(e.length-1).fill(new String),this.strings=e):this._$AH=M}_$AI(c,a=this,e,r){let s=this.strings,i=!1;if(s===void 0)c=V(this,c,a,0),i=!r2(c)||c!==this._$AH&&c!==E,i&&(this._$AH=c);else{let n=c,o,m;for(c=s[0],o=0;o<s.length-1;o++)m=V(this,n[e+o],a,o),m===E&&(m=this._$AH[o]),i||=!r2(m)||m!==this._$AH[o],m===M?c=M:c!==M&&(c+=(m??"")+s[o+1]),this._$AH[o]=m}i&&!r&&this.j(c)}j(c){c===M?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,c??"")}},x2=class extends j{constructor(){super(...arguments),this.type=3}j(c){this.element[this.name]=c===M?void 0:c}},S2=class extends j{constructor(){super(...arguments),this.type=4}j(c){this.element.toggleAttribute(this.name,!!c&&c!==M)}},b2=class extends j{constructor(c,a,e,r,s){super(c,a,e,r,s),this.type=5}_$AI(c,a=this){if((c=V(this,c,a,0)??M)===E)return;let e=this._$AH,r=c===M&&e!==M||c.capture!==e.capture||c.once!==e.once||c.passive!==e.passive,s=c!==M&&(e===M||r);r&&this.element.removeEventListener(this.name,this,e),s&&this.element.addEventListener(this.name,this,c),this._$AH=c}handleEvent(c){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,c):this._$AH.handleEvent(c)}},N2=class{constructor(c,a,e){this.element=c,this.type=6,this._$AN=void 0,this._$AM=a,this.options=e}get _$AU(){return this._$AM._$AU}_$AI(c){V(this,c)}},$1={M:U2,P:F,A:q2,C:1,L:q1,R:g2,D:D1,V,I:X,H:j,N:S2,U:b2,B:x2,F:N2},r0=_2.litHtmlPolyfillSupport;r0?.(s2,X),(_2.litHtmlVersions??=[]).push("3.3.3");var G1=(l,c,a)=>{let e=a?.renderBefore??c,r=e._$litPart$;if(r===void 0){let s=a?.renderBefore??null;e._$litPart$=r=new X(c.insertBefore(e2(),s),s,void 0,a??{})}return r._$AI(l),r};var I2=globalThis,D=class extends H{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let c=super.createRenderRoot();return this.renderOptions.renderBefore??=c.firstChild,c}update(c){let a=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(c),this._$Do=G1(a,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return E}};D._$litElement$=!0,D.finalized=!0,I2.litElementHydrateSupport?.({LitElement:D});var s0=I2.litElementPolyfillSupport;s0?.({LitElement:D});(I2.litElementVersions??=[]).push("4.2.2");var I1=(l,c)=>{customElements.get(l)||customElements.define(l,c)},Q=l=>(c,a)=>{a!==void 0?a.addInitializer(()=>{I1(l,c)}):I1(l,c)};var i0={attribute:!0,type:String,converter:a2,reflect:!1,hasChanged:v2},o0=(l=i0,c,a)=>{let{kind:e,metadata:r}=a,s=globalThis.litPropertyMetadata.get(r);if(s===void 0&&globalThis.litPropertyMetadata.set(r,s=new Map),e==="setter"&&((l=Object.create(l)).wrapped=!0),s.set(a.name,l),e==="accessor"){let{name:i}=a;return{set(n){let o=c.get.call(this);c.set.call(this,n),this.requestUpdate(i,o,l,!0,n)},init(n){return n!==void 0&&this.C(i,void 0,l,n),n}}}if(e==="setter"){let{name:i}=a;return function(n){let o=this[i];c.call(this,n),this.requestUpdate(i,o,l,!0,n)}}throw Error("Unsupported decorator location: "+e)};function v(l){return(c,a)=>typeof a=="object"?o0(l,c,a):((e,r,s)=>{let i=r.hasOwnProperty(s);return r.constructor.createProperty(s,e),i?Object.getOwnPropertyDescriptor(r,s):void 0})(l,c,a)}function W1(l){return v({...l,state:!0,attribute:!1})}var O1={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},V1=l=>(...c)=>({_$litDirective$:l,values:c}),k2=class{constructor(c){}get _$AU(){return this._$AM._$AU}_$AT(c,a,e){this._$Ct=c,this._$AM=a,this._$Ci=e}_$AS(c,a){return this.update(c,a)}update(c,a){return this.render(...a)}};var{I:n0}=$1,j1=l=>l;var K1=()=>document.createComment(""),J=(l,c,a)=>{let e=l._$AA.parentNode,r=c===void 0?l._$AB:c._$AA;if(a===void 0){let s=e.insertBefore(K1(),r),i=e.insertBefore(K1(),r);a=new n0(s,i,l,l.options)}else{let s=a._$AB.nextSibling,i=a._$AM,n=i!==l;if(n){let o;a._$AQ?.(l),a._$AM=l,a._$AP!==void 0&&(o=l._$AU)!==i._$AU&&a._$AP(o)}if(s!==r||n){let o=a._$AA;for(;o!==s;){let m=j1(o).nextSibling;j1(e).insertBefore(o,r),o=m}}}return a},_=(l,c,a=l)=>(l._$AI(c,a),l),f0={},X1=(l,c=f0)=>l._$AH=c,Q1=l=>l._$AH,y2=l=>{l._$AR(),l._$AA.remove()};var J1=(l,c,a)=>{let e=new Map;for(let r=c;r<=a;r++)e.set(l[r],r);return e},A2=V1(class extends k2{constructor(l){if(super(l),l.type!==O1.CHILD)throw Error("repeat() can only be used in text expressions")}dt(l,c,a){let e;a===void 0?a=c:c!==void 0&&(e=c);let r=[],s=[],i=0;for(let n of l)r[i]=e?e(n,i):i,s[i]=a(n,i),i++;return{values:s,keys:r}}render(l,c,a){return this.dt(l,c,a).values}update(l,[c,a,e]){let r=Q1(l),{values:s,keys:i}=this.dt(c,a,e);if(!Array.isArray(r))return this.ut=i,s;let n=this.ut??=[],o=[],m,d,f=0,z=r.length-1,p=0,C=s.length-1;for(;f<=z&&p<=C;)if(r[f]===null)f++;else if(r[z]===null)z--;else if(n[f]===i[p])o[p]=_(r[f],s[p]),f++,p++;else if(n[z]===i[C])o[C]=_(r[z],s[C]),z--,C--;else if(n[f]===i[C])o[C]=_(r[f],s[C]),J(l,o[C+1],r[f]),f++,C--;else if(n[z]===i[p])o[p]=_(r[z],s[p]),J(l,r[f],r[z]),z--,p++;else if(m===void 0&&(m=J1(i,p,C),d=J1(n,f,z)),m.has(n[f]))if(m.has(n[z])){let h=d.get(i[p]),N=h!==void 0?r[h]:null;if(N===null){let m2=J(l,r[f]);_(m2,s[p]),o[p]=m2}else o[p]=_(N,s[p]),J(l,r[f],N),r[h]=null;p++}else y2(r[z]),z--;else y2(r[f]),f++;for(;p<=C;){let h=J(l,o[C+1]);_(h,s[p]),o[p++]=h}for(;f<=z;){let h=r[f++];h!==null&&y2(h)}return this.ut=i,X1(l,o),E}});var W2=P`
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
`;var Y1="data-dc-tokens",t0={"--dc-primary-color":"#2563eb","--dc-primary-hover":"#1d4ed8","--dc-primary-text":"#ffffff","--dc-primary-soft":"#eaf1fe","--dc-bg-color":"#ffffff","--dc-surface-color":"#f7f8fa","--dc-surface-2":"#eef0f4","--dc-border-color":"#ebedf0","--dc-text-color":"#1a1d21","--dc-text-muted":"#5c6370","--dc-text-light":"#646b78","--dc-agent-bubble-bg":"#f1f3f6","--dc-agent-bubble-text":"#1a1d21","--dc-visitor-bubble-bg":"var(--dc-primary-color)","--dc-visitor-bubble-text":"var(--dc-primary-text)","--dc-online":"#22c55e","--dc-online-soft":"#e7f8ed","--dc-online-text":"#15803d","--dc-danger":"#ef4444","--dc-danger-soft":"#fdecec","--dc-danger-text":"#b91c1c","--dc-warning":"#f59e0b","--dc-warning-soft":"#fef3e2","--dc-warning-text":"#b45309","--dc-info":"#0ea5e9","--dc-info-soft":"#e6f6fe","--dc-info-text":"#0369a1","--dc-shadow":"0 8px 24px rgba(15, 23, 42, 0.08)","--dc-shadow-sm":"0 1px 2px rgba(15, 23, 42, 0.06)","--dc-radius":"12px","--dc-radius-sm":"8px","--dc-radius-bubble":"12px","--dc-font-family":'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',"--dc-font-size":"14px","--dc-font-size-sm":"12px","--dc-font-size-xs":"11px","--dc-transition":"0.15s ease","--dc-ease-panel":"cubic-bezier(0.16, 1, 0.3, 1)"},m0={"--dc-primary-color":"#60a5fa","--dc-primary-hover":"#93c5fd","--dc-primary-text":"#0f172a","--dc-primary-soft":"#1e2a44","--dc-bg-color":"#0f1419","--dc-surface-color":"#1a1f26","--dc-surface-2":"#242b33","--dc-border-color":"#2e3640","--dc-text-color":"#f3f4f6","--dc-text-muted":"#aab2bd","--dc-text-light":"#959ca6","--dc-agent-bubble-bg":"#2e3138","--dc-agent-bubble-text":"#f3f4f6","--dc-online-soft":"#14321f","--dc-online-text":"#4ade80","--dc-danger-soft":"#3a1d1d","--dc-danger-text":"#fca5a5","--dc-warning-soft":"#3a2c12","--dc-warning-text":"#fcd34d","--dc-info-soft":"#12303d","--dc-info-text":"#7dd3fc"};function Z1(l,c){let a=Object.keys(c),e="";for(let r=0;r<a.length;r++)e+=a[r]+":"+c[a[r]]+";";return l+"{"+e+"}"}var z0=Z1(":where(:root)",t0)+Z1(':where([data-dc-theme="dark"])',m0);function O2(l){let c=l||(typeof document<"u"?document:null);if(!c||!c.head||typeof c.createElement!="function"||c.querySelector("style["+Y1+"]"))return!1;let a=c.createElement("style");return a.setAttribute(Y1,""),a.textContent=z0,c.head.insertBefore(a,c.head.firstChild),!0}var y=class extends D{connectedCallback(){O2(this.ownerDocument),super.connectedCallback()}announce(c){let a=this.renderRoot?.querySelector("[data-dc-live]");a||(a=document.createElement("div"),a.setAttribute("data-dc-live",""),a.setAttribute("aria-live","polite"),a.setAttribute("role","status"),a.style.cssText="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;",this.renderRoot?.appendChild(a)),a.textContent="",requestAnimationFrame(()=>{a&&(a.textContent=c)})}};y.styles=W2;var p0={reconnecting:{tone:"warning",text:"Reconnecting\u2026 live updates will resume automatically.",spinner:!0},offline:{tone:"danger",text:"You're offline. We'll reconnect and sync as soon as your connection returns."},"other-tab":{tone:"info",text:"This session is active in another tab. Calls and the dialer run there.",action:"Use it here",event:"dc-resume-here"},"session-expiring":{tone:"warning",text:"Your secure session expires soon.",action:"Stay signed in",event:"dc-refresh-session"},"session-expired":{tone:"danger",text:"Your session expired for security. Sign in again to continue.",action:"Sign in",event:"dc-reauth"}},U=class extends y{constructor(){super(...arguments);this.kind="reconnecting"}render(){let a=p0[this.kind],e=a.tone==="danger"?"alert":"status";return t`
      <div class="banner ${a.tone}" role=${e}>
        ${a.spinner?t`<span class="spin"></span>`:t`<span class="dot"></span>`}
        <span class="txt">${a.text}</span>
        ${a.action?t`<button class="act" @click=${()=>this.emit(a.event??"dc-action")}>${a.action}</button>`:M}
      </div>
    `}emit(a){this.dispatchEvent(new CustomEvent(a,{bubbles:!0,composed:!0}))}};U.styles=[y.styles,P`
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
    `],u([v({type:String})],U.prototype,"kind",2),U=u([Q("dc-system-banner")],U);var c4={prefix:"far",iconName:"circle",icon:[512,512,[128308,128309,128992,128993,128994,128995,128996,9679,9898,9899,11044,61708,61915],"f111","M464 256a208 208 0 1 0 -416 0 208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0 256 256 0 1 1 -512 0z"]};var a4={prefix:"fas",iconName:"minus",icon:[448,512,[8211,8722,10134,"subtract"],"f068","M0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32z"]};var l4={prefix:"fas",iconName:"microphone-slash",icon:[576,512,[],"f131","M41-24.9c-9.4-9.4-24.6-9.4-33.9 0S-2.3-.3 7 9.1l528 528c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9L424.7 358.8C458.9 324.2 480 276.6 480 224l0-40c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 40c0 39.3-15.7 74.9-41.3 100.9L356.8 291C373.6 273.7 384 250 384 224l0-128c0-53-43-96-96-96s-96 43-96 96l0 30.2-151-151zm298.3 434l-41.4-41.4c-3.3 .2-6.5 .3-9.8 .3-79.5 0-144-64.5-144-144l0-10.2-43.6-43.6c-2.8 3.9-4.4 8.7-4.4 13.8l0 40c0 97.9 73.3 178.7 168 190.5l0 49.5-48 0c-13.3 0-24 10.7-24 24s10.7 24 24 24l144 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-48 0 0-49.5c9.3-1.2 18.4-3 27.3-5.4z"]};var e4={prefix:"fas",iconName:"comment-sms",icon:[512,512,["sms"],"f7cd","M256 480c141.4 0 256-107.5 256-240S397.4 0 256 0 0 107.5 0 240c0 54.3 19.2 104.3 51.6 144.5L2.8 476.8c-4.8 9-3.3 20 3.6 27.5s17.8 9.8 27.1 5.8l118.4-50.7C183.7 472.6 218.9 480 256 480zM140.8 172.8l19.2 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-19.2 0c-5.3 0-9.6 4.3-9.6 9.6s4.3 9.6 9.6 9.6c23 0 41.6 18.6 41.6 41.6s-18.6 41.6-41.6 41.6l-25.6 0c-8.8 0-16-7.2-16-16s7.2-16 16-16l25.6 0c5.3 0 9.6-4.3 9.6-9.6s-4.3-9.6-9.6-9.6c-23 0-41.6-18.6-41.6-41.6s18.6-41.6 41.6-41.6zm188.8 41.6c0-23 18.6-41.6 41.6-41.6l19.2 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-19.2 0c-5.3 0-9.6 4.3-9.6 9.6s4.3 9.6 9.6 9.6c23 0 41.6 18.6 41.6 41.6s-18.6 41.6-41.6 41.6l-25.6 0c-8.8 0-16-7.2-16-16s7.2-16 16-16l25.6 0c5.3 0 9.6-4.3 9.6-9.6s-4.3-9.6-9.6-9.6c-23 0-41.6-18.6-41.6-41.6zm-98.3-33.8l24.7 41.1 24.7-41.1c3.7-6.2 11.1-9.1 18-7.2s11.7 8.2 11.7 15.4l0 102.4c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-44.6-8.7 14.5c-2.9 4.8-8.1 7.8-13.7 7.8s-10.8-3-13.7-7.8l-8.7-14.5 0 44.6c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-102.4c0-7.2 4.8-13.5 11.7-15.4s14.3 1 18 7.2z"]};var r4={prefix:"fas",iconName:"envelope",icon:[512,512,[128386,9993,61443],"f0e0","M48 64c-26.5 0-48 21.5-48 48 0 15.1 7.1 29.3 19.2 38.4l208 156c17.1 12.8 40.5 12.8 57.6 0l208-156c12.1-9.1 19.2-23.3 19.2-38.4 0-26.5-21.5-48-48-48L48 64zM0 196L0 384c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-188-198.4 148.8c-34.1 25.6-81.1 25.6-115.2 0L0 196z"]};var s4={prefix:"fas",iconName:"bell",icon:[448,512,[128276,61602],"f0f3","M224 0c-17.7 0-32 14.3-32 32l0 3.2C119 50 64 114.6 64 192l0 21.7c0 48.1-16.4 94.8-46.4 132.4L7.8 358.3C2.7 364.6 0 372.4 0 380.5 0 400.1 15.9 416 35.5 416l376.9 0c19.6 0 35.5-15.9 35.5-35.5 0-8.1-2.7-15.9-7.8-22.2l-9.8-12.2C400.4 308.5 384 261.8 384 213.7l0-21.7c0-77.4-55-142-128-156.8l0-3.2c0-17.7-14.3-32-32-32zM162 464c7.1 27.6 32.2 48 62 48s54.9-20.4 62-48l-124 0z"]};var i4={prefix:"fas",iconName:"calendar-days",icon:[448,512,["calendar-alt"],"f073","M128 0c17.7 0 32 14.3 32 32l0 32 128 0 0-32c0-17.7 14.3-32 32-32s32 14.3 32 32l0 32 32 0c35.3 0 64 28.7 64 64l0 288c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64L0 128C0 92.7 28.7 64 64 64l32 0 0-32c0-17.7 14.3-32 32-32zM64 240l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm128 0l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0zM64 368l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0zm112 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16z"]};var o4={prefix:"fas",iconName:"ellipsis",icon:[448,512,["ellipsis-h"],"f141","M0 256a56 56 0 1 1 112 0 56 56 0 1 1 -112 0zm168 0a56 56 0 1 1 112 0 56 56 0 1 1 -112 0zm224-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112z"]};var n4={prefix:"fas",iconName:"magnifying-glass",icon:[512,512,[128269,"search"],"f002","M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376C296.3 401.1 253.9 416 208 416 93.1 416 0 322.9 0 208S93.1 0 208 0 416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"]};var f4={prefix:"fas",iconName:"ban",icon:[512,512,[128683,"cancel"],"f05e","M367.2 412.5L99.5 144.8c-22.4 31.4-35.5 69.8-35.5 111.2 0 106 86 192 192 192 41.5 0 79.9-13.1 111.2-35.5zm45.3-45.3c22.4-31.4 35.5-69.8 35.5-111.2 0-106-86-192-192-192-41.5 0-79.9 13.1-111.2 35.5L412.5 367.2zM0 256a256 256 0 1 1 512 0 256 256 0 1 1 -512 0z"]};var t4={prefix:"fas",iconName:"record-vinyl",icon:[512,512,[],"f8d9","M0 256a256 256 0 1 1 512 0 256 256 0 1 1 -512 0zm256-96a96 96 0 1 1 0 192 96 96 0 1 1 0-192zm0 240a144 144 0 1 0 0-288 144 144 0 1 0 0 288zm0-112a32 32 0 1 0 0-64 32 32 0 1 0 0 64z"]};var m4={prefix:"fas",iconName:"palette",icon:[512,512,[127912],"f53f","M512 256c0 .9 0 1.8 0 2.7-.4 36.5-33.6 61.3-70.1 61.3L344 320c-26.5 0-48 21.5-48 48 0 3.4 .4 6.7 1 9.9 2.1 10.2 6.5 20 10.8 29.9 6.1 13.8 12.1 27.5 12.1 42 0 31.8-21.6 60.7-53.4 62-3.5 .1-7 .2-10.6 .2-141.4 0-256-114.6-256-256S114.6 0 256 0 512 114.6 512 256zM128 288a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm0-96a32 32 0 1 0 0-64 32 32 0 1 0 0 64zM288 96a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm96 96a32 32 0 1 0 0-64 32 32 0 1 0 0 64z"]};var z4={prefix:"fas",iconName:"sitemap",icon:[512,512,[],"f0e8","M192 64c0-17.7 14.3-32 32-32l64 0c17.7 0 32 14.3 32 32l0 64c0 17.7-14.3 32-32 32l-8 0 0 64 120 0c39.8 0 72 32.2 72 72l0 56 8 0c17.7 0 32 14.3 32 32l0 64c0 17.7-14.3 32-32 32l-64 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l8 0 0-56c0-13.3-10.7-24-24-24l-120 0 0 80 8 0c17.7 0 32 14.3 32 32l0 64c0 17.7-14.3 32-32 32l-64 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l8 0 0-80-120 0c-13.3 0-24 10.7-24 24l0 56 8 0c17.7 0 32 14.3 32 32l0 64c0 17.7-14.3 32-32 32l-64 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l8 0 0-56c0-39.8 32.2-72 72-72l120 0 0-64-8 0c-17.7 0-32-14.3-32-32l0-64z"]};var p4={prefix:"fas",iconName:"fax",icon:[512,512,[128224,128439],"f1ac","M160 64l0 80 64 0 0-80 146.7 0 45.3 45.3 0 34.7 64 0 0-34.7c0-17-6.7-33.3-18.7-45.3L416 18.7C404 6.7 387.7 0 370.7 0L224 0c-35.3 0-64 28.7-64 64zM32 128c-17.7 0-32 14.3-32 32L0 448c0 17.7 14.3 32 32 32l48 0c17.7 0 32-14.3 32-32l0-288c0-17.7-14.3-32-32-32l-48 0zm448 64l-320 0 0 256c0 17.7 14.3 32 32 32l288 0c17.7 0 32-14.3 32-32l0-224c0-17.7-14.3-32-32-32zM224 288a24 24 0 1 1 48 0 24 24 0 1 1 -48 0zm0 96a24 24 0 1 1 48 0 24 24 0 1 1 -48 0zM336 264a24 24 0 1 1 0 48 24 24 0 1 1 0-48zM312 384a24 24 0 1 1 48 0 24 24 0 1 1 -48 0zM424 264a24 24 0 1 1 0 48 24 24 0 1 1 0-48zM400 384a24 24 0 1 1 48 0 24 24 0 1 1 -48 0z"]};var d4={prefix:"fas",iconName:"expand",icon:[448,512,[],"f065","M32 32C14.3 32 0 46.3 0 64l0 96c0 17.7 14.3 32 32 32s32-14.3 32-32l0-64 64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L32 32zM64 352c0-17.7-14.3-32-32-32S0 334.3 0 352l0 96c0 17.7 14.3 32 32 32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0 0-64zM320 32c-17.7 0-32 14.3-32 32s14.3 32 32 32l64 0 0 64c0 17.7 14.3 32 32 32s32-14.3 32-32l0-96c0-17.7-14.3-32-32-32l-96 0zM448 352c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 64-64 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l96 0c17.7 0 32-14.3 32-32l0-96z"]};var M4={prefix:"fas",iconName:"table-columns",icon:[448,512,["columns"],"f0db","M0 96C0 60.7 28.7 32 64 32l320 0c35.3 0 64 28.7 64 64l0 320c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64L0 96zm64 64l0 256 128 0 0-256-128 0zm320 0l-128 0 0 256 128 0 0-256z"]};var u4={prefix:"fas",iconName:"stop",icon:[448,512,[9209],"f04d","M64 32l320 0c35.3 0 64 28.7 64 64l0 320c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64L0 96C0 60.7 28.7 32 64 32z"]};var L4={prefix:"fas",iconName:"clock",icon:[512,512,[128339,"clock-four"],"f017","M256 0a256 256 0 1 1 0 512 256 256 0 1 1 0-512zM232 120l0 136c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2 280 120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"]};var h4={prefix:"fas",iconName:"rocket",icon:[512,512,[],"f135","M128 320L24.5 320c-24.9 0-40.2-27.1-27.4-48.5L50 183.3C58.7 168.8 74.3 160 91.2 160l95 0c76.1-128.9 189.6-135.4 265.5-124.3 12.8 1.9 22.8 11.9 24.6 24.6 11.1 75.9 4.6 189.4-124.3 265.5l0 95c0 16.9-8.8 32.5-23.3 41.2l-88.2 52.9c-21.3 12.8-48.5-2.6-48.5-27.4L192 384c0-35.3-28.7-64-64-64l-.1 0zM400 160a48 48 0 1 0 -96 0 48 48 0 1 0 96 0z"]};var v4={prefix:"fas",iconName:"paper-plane",icon:[576,512,[61913],"f1d8","M536.4-26.3c9.8-3.5 20.6-1 28 6.3s9.8 18.2 6.3 28l-178 496.9c-5 13.9-18.1 23.1-32.8 23.1-14.2 0-27-8.6-32.3-21.7l-64.2-158c-4.5-11-2.5-23.6 5.2-32.6l94.5-112.4c5.1-6.1 4.7-15-.9-20.6s-14.6-6-20.6-.9L229.2 276.1c-9.1 7.6-21.6 9.6-32.6 5.2L38.1 216.8c-13.1-5.3-21.7-18.1-21.7-32.3 0-14.7 9.2-27.8 23.1-32.8l496.9-178z"]};var C4={prefix:"fas",iconName:"fire",icon:[448,512,[128293],"f06d","M160.5-26.4c9.3-7.8 23-7.5 31.9 .9 12.3 11.6 23.3 24.4 33.9 37.4 13.5 16.5 29.7 38.3 45.3 64.2 5.2-6.8 10-12.8 14.2-17.9 1.1-1.3 2.2-2.7 3.3-4.1 7.9-9.8 17.7-22.1 30.8-22.1 13.4 0 22.8 11.9 30.8 22.1 1.3 1.7 2.6 3.3 3.9 4.8 10.3 12.4 24 30.3 37.7 52.4 27.2 43.9 55.6 106.4 55.6 176.6 0 123.7-100.3 224-224 224S0 411.7 0 288c0-91.1 41.1-170 80.5-225 19.9-27.7 39.7-49.9 54.6-65.1 8.2-8.4 16.5-16.7 25.5-24.2zM225.7 416c25.3 0 47.7-7 68.8-21 42.1-29.4 53.4-88.2 28.1-134.4-4.5-9-16-9.6-22.5-2l-25.2 29.3c-6.6 7.6-18.5 7.4-24.7-.5-17.3-22.1-49.1-62.4-65.3-83-5.4-6.9-15.2-8-21.5-1.9-18.3 17.8-51.5 56.8-51.5 104.3 0 68.6 50.6 109.2 113.7 109.2z"]};var g4={prefix:"fas",iconName:"users",icon:[640,512,[],"f0c0","M320 16a104 104 0 1 1 0 208 104 104 0 1 1 0-208zM96 88a72 72 0 1 1 0 144 72 72 0 1 1 0-144zM0 416c0-70.7 57.3-128 128-128 12.8 0 25.2 1.9 36.9 5.4-32.9 36.8-52.9 85.4-52.9 138.6l0 16c0 11.4 2.4 22.2 6.7 32L32 480c-17.7 0-32-14.3-32-32l0-32zm521.3 64c4.3-9.8 6.7-20.6 6.7-32l0-16c0-53.2-20-101.8-52.9-138.6 11.7-3.5 24.1-5.4 36.9-5.4 70.7 0 128 57.3 128 128l0 32c0 17.7-14.3 32-32 32l-86.7 0zM472 160a72 72 0 1 1 144 0 72 72 0 1 1 -144 0zM160 432c0-88.4 71.6-160 160-160s160 71.6 160 160l0 16c0 17.7-14.3 32-32 32l-256 0c-17.7 0-32-14.3-32-32l0-16z"]};var x4={prefix:"fas",iconName:"headset",icon:[448,512,[],"f590","M224 64c-79 0-144.7 57.3-157.7 132.7 9.3-3 19.3-4.7 29.7-4.7l16 0c26.5 0 48 21.5 48 48l0 96c0 26.5-21.5 48-48 48l-16 0c-53 0-96-43-96-96l0-64C0 100.3 100.3 0 224 0S448 100.3 448 224l0 168.1c0 66.3-53.8 120-120.1 120l-87.9-.1-32 0c-26.5 0-48-21.5-48-48s21.5-48 48-48l32 0c26.5 0 48 21.5 48 48l0 0 40 0c39.8 0 72-32.2 72-72l0-20.9c-14.1 8.2-30.5 12.8-48 12.8l-16 0c-26.5 0-48-21.5-48-48l0-96c0-26.5 21.5-48 48-48l16 0c10.4 0 20.3 1.6 29.7 4.7-13-75.3-78.6-132.7-157.7-132.7z"]};var S4={prefix:"fas",iconName:"voicemail",icon:[640,512,[],"f897","M144 160a80 80 0 1 1 0 160 80 80 0 1 1 0-160zM263.8 320c15.3-22.9 24.2-50.4 24.2-80 0-79.5-64.5-144-144-144S0 160.5 0 240 64.5 384 144 384l352 0c79.5 0 144-64.5 144-144S575.5 96 496 96 352 160.5 352 240c0 29.6 8.9 57.1 24.2 80l-112.5 0zM496 160a80 80 0 1 1 0 160 80 80 0 1 1 0-160z"]};var b4={prefix:"fas",iconName:"microphone",icon:[384,512,[],"f130","M192 0C139 0 96 43 96 96l0 128c0 53 43 96 96 96s96-43 96-96l0-128c0-53-43-96-96-96zM48 184c0-13.3-10.7-24-24-24S0 170.7 0 184l0 40c0 97.9 73.3 178.7 168 190.5l0 49.5-48 0c-13.3 0-24 10.7-24 24s10.7 24 24 24l144 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-48 0 0-49.5c94.7-11.8 168-92.6 168-190.5l0-40c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 40c0 79.5-64.5 144-144 144S48 303.5 48 224l0-40z"]};var N4={prefix:"fas",iconName:"image",icon:[448,512,[],"f03e","M64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L64 32zm64 80a48 48 0 1 1 0 96 48 48 0 1 1 0-96zM272 224c8.4 0 16.1 4.4 20.5 11.5l88 144c4.5 7.4 4.7 16.7 .5 24.3S368.7 416 360 416L88 416c-8.9 0-17.2-5-21.3-12.9s-3.5-17.5 1.6-24.8l56-80c4.5-6.4 11.8-10.2 19.7-10.2s15.2 3.8 19.7 10.2l26.4 37.8 61.4-100.5c4.4-7.1 12.1-11.5 20.5-11.5z"]};var w4={prefix:"fas",iconName:"folder",icon:[512,512,[128193,128447,61716,"folder-blank"],"f07b","M64 448l384 0c35.3 0 64-28.7 64-64l0-240c0-35.3-28.7-64-64-64L298.7 80c-6.9 0-13.7-2.2-19.2-6.4L241.1 44.8C230 36.5 216.5 32 202.7 32L64 32C28.7 32 0 60.7 0 96L0 384c0 35.3 28.7 64 64 64z"]};var k4={prefix:"fas",iconName:"cloud",icon:[576,512,[9729],"f0c2","M0 336c0 79.5 64.5 144 144 144l304 0c70.7 0 128-57.3 128-128 0-51.6-30.5-96.1-74.5-116.3 6.7-13.1 10.5-28 10.5-43.7 0-53-43-96-96-96-17.7 0-34.2 4.8-48.4 13.1-24.1-45.8-72.2-77.1-127.6-77.1-79.5 0-144 64.5-144 144 0 8 .7 15.9 1.9 23.5-56.9 19.2-97.9 73.1-97.9 136.5z"]};var y4={prefix:"fas",iconName:"link",icon:[576,512,[128279,"chain"],"f0c1","M419.5 96c-16.6 0-32.7 4.5-46.8 12.7-15.8-16-34.2-29.4-54.5-39.5 28.2-24 64.1-37.2 101.3-37.2 86.4 0 156.5 70 156.5 156.5 0 41.5-16.5 81.3-45.8 110.6l-71.1 71.1c-29.3 29.3-69.1 45.8-110.6 45.8-86.4 0-156.5-70-156.5-156.5 0-1.5 0-3 .1-4.5 .5-17.7 15.2-31.6 32.9-31.1s31.6 15.2 31.1 32.9c0 .9 0 1.8 0 2.6 0 51.1 41.4 92.5 92.5 92.5 24.5 0 48-9.7 65.4-27.1l71.1-71.1c17.3-17.3 27.1-40.9 27.1-65.4 0-51.1-41.4-92.5-92.5-92.5zM275.2 173.3c-1.9-.8-3.8-1.9-5.5-3.1-12.6-6.5-27-10.2-42.1-10.2-24.5 0-48 9.7-65.4 27.1L91.1 258.2c-17.3 17.3-27.1 40.9-27.1 65.4 0 51.1 41.4 92.5 92.5 92.5 16.5 0 32.6-4.4 46.7-12.6 15.8 16 34.2 29.4 54.6 39.5-28.2 23.9-64 37.2-101.3 37.2-86.4 0-156.5-70-156.5-156.5 0-41.5 16.5-81.3 45.8-110.6l71.1-71.1c29.3-29.3 69.1-45.8 110.6-45.8 86.6 0 156.5 70.6 156.5 156.9 0 1.3 0 2.6 0 3.9-.4 17.7-15.1 31.6-32.8 31.2s-31.6-15.1-31.2-32.8c0-.8 0-1.5 0-2.3 0-33.7-18-63.3-44.8-79.6z"]};var A4={prefix:"fas",iconName:"chart-line",icon:[512,512,["line-chart"],"f201","M64 64c0-17.7-14.3-32-32-32S0 46.3 0 64L0 400c0 44.2 35.8 80 80 80l400 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L80 416c-8.8 0-16-7.2-16-16L64 64zm406.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L320 210.7 262.6 153.4c-12.5-12.5-32.8-12.5-45.3 0l-96 96c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l73.4-73.4 57.4 57.4c12.5 12.5 32.8 12.5 45.3 0l128-128z"]};var T4={prefix:"fas",iconName:"gear",icon:[512,512,[9881,"cog"],"f013","M195.1 9.5C198.1-5.3 211.2-16 226.4-16l59.8 0c15.2 0 28.3 10.7 31.3 25.5L332 79.5c14.1 6 27.3 13.7 39.3 22.8l67.8-22.5c14.4-4.8 30.2 1.2 37.8 14.4l29.9 51.8c7.6 13.2 4.9 29.8-6.5 39.9L447 233.3c.9 7.4 1.3 15 1.3 22.7s-.5 15.3-1.3 22.7l53.4 47.5c11.4 10.1 14 26.8 6.5 39.9l-29.9 51.8c-7.6 13.1-23.4 19.2-37.8 14.4l-67.8-22.5c-12.1 9.1-25.3 16.7-39.3 22.8l-14.4 69.9c-3.1 14.9-16.2 25.5-31.3 25.5l-59.8 0c-15.2 0-28.3-10.7-31.3-25.5l-14.4-69.9c-14.1-6-27.2-13.7-39.3-22.8L73.5 432.3c-14.4 4.8-30.2-1.2-37.8-14.4L5.8 366.1c-7.6-13.2-4.9-29.8 6.5-39.9l53.4-47.5c-.9-7.4-1.3-15-1.3-22.7s.5-15.3 1.3-22.7L12.3 185.8c-11.4-10.1-14-26.8-6.5-39.9L35.7 94.1c7.6-13.2 23.4-19.2 37.8-14.4l67.8 22.5c12.1-9.1 25.3-16.7 39.3-22.8L195.1 9.5zM256.3 336a80 80 0 1 0 -.6-160 80 80 0 1 0 .6 160z"]};var B4={prefix:"fas",iconName:"up-right-and-down-left-from-center",icon:[512,512,["expand-alt"],"f424","M344 0L488 0c13.3 0 24 10.7 24 24l0 144c0 9.7-5.8 18.5-14.8 22.2s-19.3 1.7-26.2-5.2l-39-39-87 87c-9.4 9.4-24.6 9.4-33.9 0l-32-32c-9.4-9.4-9.4-24.6 0-33.9l87-87-39-39c-6.9-6.9-8.9-17.2-5.2-26.2S334.3 0 344 0zM168 512L24 512c-13.3 0-24-10.7-24-24L0 344c0-9.7 5.8-18.5 14.8-22.2S34.1 320.2 41 327l39 39 87-87c9.4-9.4 24.6-9.4 33.9 0l32 32c9.4 9.4 9.4 24.6 0 33.9l-87 87 39 39c6.9 6.9 8.9 17.2 5.2 26.2S177.7 512 168 512z"]};var P4={prefix:"fas",iconName:"play",icon:[448,512,[9654],"f04b","M91.2 36.9c-12.4-6.8-27.4-6.5-39.6 .7S32 57.9 32 72l0 368c0 14.1 7.5 27.2 19.6 34.4s27.2 7.5 39.6 .7l336-184c12.8-7 20.8-20.5 20.8-35.1s-8-28.1-20.8-35.1l-336-184z"]};var H4={prefix:"fas",iconName:"check",icon:[448,512,[10003,10004],"f00c","M434.8 70.1c14.3 10.4 17.5 30.4 7.1 44.7l-256 352c-5.5 7.6-14 12.3-23.4 13.1s-18.5-2.7-25.1-9.3l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l101.5 101.5 234-321.7c10.4-14.3 30.4-17.5 44.7-7.1z"]};var F4={prefix:"fas",iconName:"sliders",icon:[512,512,["sliders-h"],"f1de","M32 64C14.3 64 0 78.3 0 96s14.3 32 32 32l86.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48L480 128c17.7 0 32-14.3 32-32s-14.3-32-32-32L265.3 64C253 35.7 224.8 16 192 16s-61 19.7-73.3 48L32 64zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32l246.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48l54.7 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-54.7 0c-12.3-28.3-40.5-48-73.3-48s-61 19.7-73.3 48L32 224zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32l54.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48L480 448c17.7 0 32-14.3 32-32s-14.3-32-32-32l-246.7 0c-12.3-28.3-40.5-48-73.3-48s-61 19.7-73.3 48L32 384z"]};var E4={prefix:"fas",iconName:"user",icon:[448,512,[128100,62144,62470,"user-alt","user-large"],"f007","M224 248a120 120 0 1 0 0-240 120 120 0 1 0 0 240zm-29.7 56C95.8 304 16 383.8 16 482.3 16 498.7 29.3 512 45.7 512l356.6 0c16.4 0 29.7-13.3 29.7-29.7 0-98.5-79.8-178.3-178.3-178.3l-59.4 0z"]};var R4={prefix:"fas",iconName:"arrow-right",icon:[512,512,[8594],"f061","M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l370.7 0-105.4 105.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"]};var D4={prefix:"fas",iconName:"right-left",icon:[512,512,["exchange-alt"],"f362","M502.6 150.6l-96 96c-9.2 9.2-22.9 11.9-34.9 6.9S352 236.9 352 224l0-64-320 0c-17.7 0-32-14.3-32-32S14.3 96 32 96l320 0 0-64c0-12.9 7.8-24.6 19.8-29.6s25.7-2.2 34.9 6.9l96 96c12.5 12.5 12.5 32.8 0 45.3zm-397.3 352l-96-96c-12.5-12.5-12.5-32.8 0-45.3l96-96c9.2-9.2 22.9-11.9 34.9-6.9S160 275.1 160 288l0 64 320 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-320 0 0 64c0 12.9-7.8 24.6-19.8 29.6s-25.7 2.2-34.9-6.9z"]};var _4={prefix:"fas",iconName:"xmark",icon:[384,512,[128473,10005,10006,10060,215,"close","multiply","remove","times"],"f00d","M55.1 73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L147.2 256 9.9 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192.5 301.3 329.9 438.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.8 256 375.1 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192.5 210.7 55.1 73.4z"]};var U4={prefix:"fas",iconName:"comments",icon:[576,512,[128490,61670],"f086","M384 144c0 97.2-86 176-192 176-26.7 0-52.1-5-75.2-14L35.2 349.2c-9.3 4.9-20.7 3.2-28.2-4.2s-9.2-18.9-4.2-28.2l35.6-67.2C14.3 220.2 0 183.6 0 144 0 46.8 86-32 192-32S384 46.8 384 144zm0 368c-94.1 0-172.4-62.1-188.8-144 120-1.5 224.3-86.9 235.8-202.7 83.3 19.2 145 88.3 145 170.7 0 39.6-14.3 76.2-38.4 105.6l35.6 67.2c4.9 9.3 3.2 20.7-4.2 28.2s-18.9 9.2-28.2 4.2L459.2 498c-23.1 9-48.5 14-75.2 14z"]};var q4={prefix:"fas",iconName:"mobile-screen",icon:[384,512,["mobile-android-alt"],"f3cf","M16 64C16 28.7 44.7 0 80 0L304 0c35.3 0 64 28.7 64 64l0 384c0 35.3-28.7 64-64 64L80 512c-35.3 0-64-28.7-64-64L16 64zM128 440c0 13.3 10.7 24 24 24l80 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-80 0c-13.3 0-24 10.7-24 24zM304 64l-224 0 0 304 224 0 0-304z"]};var $4={prefix:"fas",iconName:"phone-volume",icon:[576,512,["volume-control-phone"],"f2a0","M344-32c128.1 0 232 103.9 232 232 0 13.3-10.7 24-24 24s-24-10.7-24-24c0-101.6-82.4-184-184-184-13.3 0-24-10.7-24-24s10.7-24 24-24zm8 192a32 32 0 1 1 0 64 32 32 0 1 1 0-64zM320 88c0-13.3 10.7-24 24-24 75.1 0 136 60.9 136 136 0 13.3-10.7 24-24 24s-24-10.7-24-24c0-48.6-39.4-88-88-88-13.3 0-24-10.7-24-24zM144.1 1.4c19.7-5.4 40.3 4.7 48.1 23.5l40.5 97.3c6.9 16.5 2.1 35.6-11.8 47l-44.1 36.1c32.5 71.6 89 130 159.3 164.9L374.7 323c11.3-13.9 30.4-18.6 47-11.8L519 351.8c18.8 7.8 28.9 28.4 23.5 48.1l-1.5 5.5C523.4 470.1 460.9 525.3 384.6 509.2 209.6 472.1 71.9 334.4 34.8 159.4 18.7 83.1 73.9 20.6 138.5 2.9l5.5-1.5z"]};var G4={prefix:"fas",iconName:"phone",icon:[512,512,[128222,128379],"f095","M160.2 25C152.3 6.1 131.7-3.9 112.1 1.4l-5.5 1.5c-64.6 17.6-119.8 80.2-103.7 156.4 37.1 175 174.8 312.7 349.8 349.8 76.3 16.2 138.8-39.1 156.4-103.7l1.5-5.5c5.4-19.7-4.7-40.3-23.5-48.1l-97.3-40.5c-16.5-6.9-35.6-2.1-47 11.8l-38.6 47.2C233.9 335.4 177.3 277 144.8 205.3L189 169.3c13.9-11.3 18.6-30.4 11.8-47L160.2 25z"]};var I4={prefix:"fas",iconName:"address-book",icon:[512,512,[62138,"contact-book"],"f2b9","M96 0C60.7 0 32 28.7 32 64l0 384c0 35.3 28.7 64 64 64l288 0c35.3 0 64-28.7 64-64l0-384c0-35.3-28.7-64-64-64L96 0zM208 288l64 0c44.2 0 80 35.8 80 80 0 8.8-7.2 16-16 16l-192 0c-8.8 0-16-7.2-16-16 0-44.2 35.8-80 80-80zm-24-96a56 56 0 1 1 112 0 56 56 0 1 1 -112 0zM512 80c0-8.8-7.2-16-16-16s-16 7.2-16 16l0 64c0 8.8 7.2 16 16 16s16-7.2 16-16l0-64zm0 128c0-8.8-7.2-16-16-16s-16 7.2-16 16l0 64c0 8.8 7.2 16 16 16s16-7.2 16-16l0-64zM496 320c-8.8 0-16 7.2-16 16l0 64c0 8.8 7.2 16 16 16s16-7.2 16-16l0-64c0-8.8-7.2-16-16-16z"]};var W4={prefix:"fas",iconName:"chevron-down",icon:[448,512,[],"f078","M201.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 338.7 54.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"]};var O4={prefix:"fas",iconName:"plug",icon:[448,512,[128268],"f1e6","M128-32c17.7 0 32 14.3 32 32l0 96 128 0 0-96c0-17.7 14.3-32 32-32s32 14.3 32 32l0 96 64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l0 64c0 95.1-69.2 174.1-160 189.3l0 66.7c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-66.7C101.2 398.1 32 319.1 32 224l0-64c-17.7 0-32-14.3-32-32S14.3 96 32 96l64 0 0-96c0-17.7 14.3-32 32-32z"]};var V4={prefix:"fas",iconName:"comment-dots",icon:[512,512,[128172,62075,"commenting"],"f4ad","M256 480c141.4 0 256-107.5 256-240S397.4 0 256 0 0 107.5 0 240c0 54.3 19.2 104.3 51.6 144.5L2.8 476.8c-4.8 9-3.3 20 3.6 27.5s17.8 9.8 27.1 5.8l118.4-50.7C183.7 472.6 218.9 480 256 480zM128 208a32 32 0 1 1 0 64 32 32 0 1 1 0-64zm128 0a32 32 0 1 1 0 64 32 32 0 1 1 0-64zm96 32a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"]};var j4={prefix:"fas",iconName:"inbox",icon:[512,512,[],"f01c","M91.8 32C59.9 32 32.9 55.4 28.4 86.9L.6 281.2c-.4 3-.6 6-.6 9.1L0 416c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-125.7c0-3-.2-6.1-.6-9.1L483.6 86.9C479.1 55.4 452.1 32 420.2 32L91.8 32zm0 64l328.5 0 27.4 192-59.9 0c-12.1 0-23.2 6.8-28.6 17.7l-14.3 28.6c-5.4 10.8-16.5 17.7-28.6 17.7l-120.4 0c-12.1 0-23.2-6.8-28.6-17.7l-14.3-28.6c-5.4-10.8-16.5-17.7-28.6-17.7L64.3 288 91.8 96z"]};var K4={prefix:"fas",iconName:"bullhorn",icon:[512,512,[128226,128363],"f0a1","M461.2 18.9C472.7 24 480 35.4 480 48l0 416c0 12.6-7.3 24-18.8 29.1s-24.8 3.2-34.3-5.1l-46.6-40.7c-43.6-38.1-98.7-60.3-156.4-63l0 95.7c0 17.7-14.3 32-32 32l-32 0c-17.7 0-32-14.3-32-32l0-96C57.3 384 0 326.7 0 256S57.3 128 128 128l84.5 0c61.8-.2 121.4-22.7 167.9-63.3l46.6-40.7c9.4-8.3 22.9-10.2 34.3-5.1zM224 320l0 .2c70.3 2.7 137.8 28.5 192 73.4l0-275.3c-54.2 44.9-121.7 70.7-192 73.4L224 320z"]};var X4={prefix:"fas",iconName:"wand-magic-sparkles",icon:[576,512,["magic-wand-sparkles"],"e2ca","M263.4-27L278.2 9.8 315 24.6c3 1.2 5 4.2 5 7.4s-2 6.2-5 7.4L278.2 54.2 263.4 91c-1.2 3-4.2 5-7.4 5s-6.2-2-7.4-5L233.8 54.2 197 39.4c-3-1.2-5-4.2-5-7.4s2-6.2 5-7.4L233.8 9.8 248.6-27c1.2-3 4.2-5 7.4-5s6.2 2 7.4 5zM110.7 41.7l21.5 50.1 50.1 21.5c5.9 2.5 9.7 8.3 9.7 14.7s-3.8 12.2-9.7 14.7l-50.1 21.5-21.5 50.1c-2.5 5.9-8.3 9.7-14.7 9.7s-12.2-3.8-14.7-9.7L59.8 164.2 9.7 142.7C3.8 140.2 0 134.4 0 128s3.8-12.2 9.7-14.7L59.8 91.8 81.3 41.7C83.8 35.8 89.6 32 96 32s12.2 3.8 14.7 9.7zM464 304c6.4 0 12.2 3.8 14.7 9.7l21.5 50.1 50.1 21.5c5.9 2.5 9.7 8.3 9.7 14.7s-3.8 12.2-9.7 14.7l-50.1 21.5-21.5 50.1c-2.5 5.9-8.3 9.7-14.7 9.7s-12.2-3.8-14.7-9.7l-21.5-50.1-50.1-21.5c-5.9-2.5-9.7-8.3-9.7-14.7s3.8-12.2 9.7-14.7l50.1-21.5 21.5-50.1c2.5-5.9 8.3-9.7 14.7-9.7zM460 0c11 0 21.6 4.4 29.5 12.2l42.3 42.3C539.6 62.4 544 73 544 84s-4.4 21.6-12.2 29.5l-88.2 88.2-101.3-101.3 88.2-88.2C438.4 4.4 449 0 460 0zM44.2 398.5L308.4 134.3 409.7 235.6 145.5 499.8C137.6 507.6 127 512 116 512s-21.6-4.4-29.5-12.2L44.2 457.5C36.4 449.6 32 439 32 428s4.4-21.6 12.2-29.5z"]};var Q4={prefix:"fas",iconName:"chart-column",icon:[512,512,[],"e0e3","M32 32c17.7 0 32 14.3 32 32l0 336c0 8.8 7.2 16 16 16l400 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L80 480c-44.2 0-80-35.8-80-80L0 64C0 46.3 14.3 32 32 32zM144 224c17.7 0 32 14.3 32 32l0 64c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32zm144-64l0 160c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-160c0-17.7 14.3-32 32-32s32 14.3 32 32zm80 32c17.7 0 32 14.3 32 32l0 96c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-96c0-17.7 14.3-32 32-32zM512 96l0 224c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-224c0-17.7 14.3-32 32-32s32 14.3 32 32z"]};var J4={prefix:"fas",iconName:"star",icon:[576,512,[11088,61446],"f005","M309.5-18.9c-4.1-8-12.4-13.1-21.4-13.1s-17.3 5.1-21.4 13.1L193.1 125.3 33.2 150.7c-8.9 1.4-16.3 7.7-19.1 16.3s-.5 18 5.8 24.4l114.4 114.5-25.2 159.9c-1.4 8.9 2.3 17.9 9.6 23.2s16.9 6.1 25 2L288.1 417.6 432.4 491c8 4.1 17.7 3.3 25-2s11-14.2 9.6-23.2L441.7 305.9 556.1 191.4c6.4-6.4 8.6-15.8 5.8-24.4s-10.1-14.9-19.1-16.3L383 125.3 309.5-18.9z"]};var Y4={prefix:"fas",iconName:"triangle-exclamation",icon:[512,512,[9888,"exclamation-triangle","warning"],"f071","M256 0c14.7 0 28.2 8.1 35.2 21l216 400c6.7 12.4 6.4 27.4-.8 39.5S486.1 480 472 480L40 480c-14.1 0-27.2-7.4-34.4-19.5s-7.5-27.1-.8-39.5l216-400c7-12.9 20.5-21 35.2-21zm0 352a32 32 0 1 0 0 64 32 32 0 1 0 0-64zm0-192c-18.2 0-32.7 15.5-31.4 33.7l7.4 104c.9 12.5 11.4 22.3 23.9 22.3 12.6 0 23-9.7 23.9-22.3l7.4-104c1.3-18.2-13.1-33.7-31.4-33.7z"]};var Z4={prefix:"fas",iconName:"lock",icon:[384,512,[128274],"f023","M128 96l0 64 128 0 0-64c0-35.3-28.7-64-64-64s-64 28.7-64 64zM64 160l0-64C64 25.3 121.3-32 192-32S320 25.3 320 96l0 64c35.3 0 64 28.7 64 64l0 224c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 224c0-35.3 28.7-64 64-64z"]};var c3={prefix:"fas",iconName:"window-restore",icon:[576,512,[],"f2d2","M512 96L160 96c0-35.3 28.7-64 64-64l288 0c35.3 0 64 28.7 64 64l0 192c0 35.3-28.7 64-64 64l-48 0 0-64 48 0 0-192zM0 224c0-35.3 28.7-64 64-64l288 0c35.3 0 64 28.7 64 64l0 192c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64L0 224zm64 40c0 13.3 10.7 24 24 24l240 0c13.3 0 24-10.7 24-24s-10.7-24-24-24L88 240c-13.3 0-24 10.7-24 24z"]};var a3={prefix:"fas",iconName:"shield-halved",icon:[512,512,["shield-alt"],"f3ed","M256 0c4.6 0 9.2 1 13.4 2.9L457.8 82.8c22 9.3 38.4 31 38.3 57.2-.5 99.2-41.3 280.7-213.6 363.2-16.7 8-36.1 8-52.8 0-172.4-82.5-213.1-264-213.6-363.2-.1-26.2 16.3-47.9 38.3-57.2L242.7 2.9C246.9 1 251.4 0 256 0zm0 66.8l0 378.1c138-66.8 175.1-214.8 176-303.4l-176-74.6 0 0z"]};var l3={prefix:"fas",iconName:"caret-up",icon:[320,512,[],"f0d8","M140.3 135.2c12.6-10.3 31.1-9.5 42.8 2.2l128 128c9.2 9.2 11.9 22.9 6.9 34.9S301.4 320 288.5 320l-256 0c-12.9 0-24.6-7.8-29.6-19.8S.7 274.5 9.9 265.4l128-128 2.4-2.2z"]};var e3={prefix:"fas",iconName:"globe",icon:[512,512,[127760],"f0ac","M351.9 280l-190.9 0c2.9 64.5 17.2 123.9 37.5 167.4 11.4 24.5 23.7 41.8 35.1 52.4 11.2 10.5 18.9 12.2 22.9 12.2s11.7-1.7 22.9-12.2c11.4-10.6 23.7-28 35.1-52.4 20.3-43.5 34.6-102.9 37.5-167.4zM160.9 232l190.9 0C349 167.5 334.7 108.1 314.4 64.6 303 40.2 290.7 22.8 279.3 12.2 268.1 1.7 260.4 0 256.4 0s-11.7 1.7-22.9 12.2c-11.4 10.6-23.7 28-35.1 52.4-20.3 43.5-34.6 102.9-37.5 167.4zm-48 0C116.4 146.4 138.5 66.9 170.8 14.7 78.7 47.3 10.9 131.2 1.5 232l111.4 0zM1.5 280c9.4 100.8 77.2 184.7 169.3 217.3-32.3-52.2-54.4-131.7-57.9-217.3L1.5 280zm398.4 0c-3.5 85.6-25.6 165.1-57.9 217.3 92.1-32.7 159.9-116.5 169.3-217.3l-111.4 0zm111.4-48C501.9 131.2 434.1 47.3 342 14.7 374.3 66.9 396.4 146.4 399.9 232l111.4 0z"]};var r3={prefix:"fas",iconName:"upload",icon:[448,512,[],"f093","M256 109.3L256 320c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-210.7-41.4 41.4c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l96-96c12.5-12.5 32.8-12.5 45.3 0l96 96c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 109.3zM224 400c44.2 0 80-35.8 80-80l80 0c35.3 0 64 28.7 64 64l0 32c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64l0-32c0-35.3 28.7-64 64-64l80 0c0 44.2 35.8 80 80 80zm144 24a24 24 0 1 0 0-48 24 24 0 1 0 0 48z"]};var s3={prefix:"fas",iconName:"arrow-left",icon:[512,512,[8592],"f060","M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 288 480 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-370.7 0 105.4-105.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"]};var i3={prefix:"fas",iconName:"check-double",icon:[384,512,[],"f560","M249.9 66.8c10.4-14.3 7.2-34.3-7.1-44.7s-34.3-7.2-44.7 7.1l-106 145.7-37.5-37.5c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l64 64c6.6 6.6 15.8 10 25.1 9.3s17.9-5.5 23.4-13.1l128-176zm128 136c10.4-14.3 7.2-34.3-7.1-44.7s-34.3-7.2-44.7 7.1l-170 233.7-69.5-69.5c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l96 96c6.6 6.6 15.8 10 25.1 9.3s17.9-5.5 23.4-13.1l192-264z"]};var o3={prefix:"fas",iconName:"down-left-and-up-right-to-center",icon:[512,512,["compress-alt"],"f422","M439.5 7c9.4-9.4 24.6-9.4 33.9 0l32 32c9.4 9.4 9.4 24.6 0 33.9l-87 87 39 39c6.9 6.9 8.9 17.2 5.2 26.2S450.2 240 440.5 240l-144 0c-13.3 0-24-10.7-24-24l0-144c0-9.7 5.8-18.5 14.8-22.2s19.3-1.7 26.2 5.2l39 39 87-87zM72.5 272l144 0c13.3 0 24 10.7 24 24l0 144c0 9.7-5.8 18.5-14.8 22.2s-19.3 1.7-26.2-5.2l-39-39-87 87c-9.4 9.4-24.6 9.4-33.9 0l-32-32c-9.4-9.4-9.4-24.6 0-33.9l87-87-39-39c-6.9-6.9-8.9-17.2-5.2-26.2S62.8 272 72.5 272z"]};var n3={prefix:"fas",iconName:"music",icon:[512,512,[127925],"f001","M468 7c7.6 6.1 12 15.3 12 25l0 304c0 44.2-43 80-96 80s-96-35.8-96-80 43-80 96-80c11.2 0 22 1.6 32 4.6l0-116.7-224 49.8 0 206.3c0 44.2-43 80-96 80s-96-35.8-96-80 43-80 96-80c11.2 0 22 1.6 32 4.6L128 96c0-15 10.4-28 25.1-31.2l288-64c9.5-2.1 19.4 .2 27 6.3z"]};var f3={prefix:"fas",iconName:"robot",icon:[640,512,[129302],"f544","M352 0c0-17.7-14.3-32-32-32S288-17.7 288 0l0 64-96 0c-53 0-96 43-96 96l0 224c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-224c0-53-43-96-96-96l-96 0 0-64zM160 368c0-13.3 10.7-24 24-24l32 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-32 0c-13.3 0-24-10.7-24-24zm120 0c0-13.3 10.7-24 24-24l32 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-32 0c-13.3 0-24-10.7-24-24zm120 0c0-13.3 10.7-24 24-24l32 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-32 0c-13.3 0-24-10.7-24-24zM224 176a48 48 0 1 1 0 96 48 48 0 1 1 0-96zm144 48a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zM64 224c0-17.7-14.3-32-32-32S0 206.3 0 224l0 96c0 17.7 14.3 32 32 32s32-14.3 32-32l0-96zm544-32c-17.7 0-32 14.3-32 32l0 96c0 17.7 14.3 32 32 32s32-14.3 32-32l0-96c0-17.7-14.3-32-32-32z"]},t3={prefix:"fas",iconName:"plus",icon:[448,512,[10133,61543,"add"],"2b","M256 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 160-160 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l160 0 0 160c0 17.7 14.3 32 32 32s32-14.3 32-32l0-160 160 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-160 0 0-160z"]};var m3={prefix:"fas",iconName:"caret-down",icon:[320,512,[],"f0d7","M140.3 376.8c12.6 10.2 31.1 9.5 42.8-2.2l128-128c9.2-9.2 11.9-22.9 6.9-34.9S301.4 192 288.5 192l-256 0c-12.9 0-24.6 7.8-29.6 19.8S.7 237.5 9.9 246.6l128 128 2.4 2.2z"]};var z3={prefix:"fas",iconName:"tag",icon:[512,512,[127991],"f02b","M32.5 96l0 149.5c0 17 6.7 33.3 18.7 45.3l192 192c25 25 65.5 25 90.5 0L483.2 333.3c25-25 25-65.5 0-90.5l-192-192C279.2 38.7 263 32 246 32L96.5 32c-35.3 0-64 28.7-64 64zm112 16a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"]};var p3={prefix:"fas",iconName:"phone-slash",icon:[576,512,[],"f3dd","M535-24.9c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9L41 537.1c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9L141.5 368.6C89.2 310.5 51.6 238.8 34.8 159.4 18.7 83.1 73.9 20.6 138.5 2.9l5.5-1.5c19.7-5.4 40.3 4.7 48.1 23.5l40.5 97.3c6.9 16.5 2.1 35.6-11.8 47l-44.1 36.1c12.9 28.5 29.6 54.8 49.5 78.5L535-24.9zm-150.4 534c-63-13.4-121.3-39.8-171.7-76.3L297.8 348c12.2 8.2 25 15.6 38.3 22.2L374.7 323c11.3-13.9 30.4-18.6 47-11.8L519 351.8c18.8 7.8 28.9 28.4 23.5 48.1l-1.5 5.5c-17.6 64.6-80.2 119.8-156.4 103.7z"]};var d3={prefix:"fas",iconName:"briefcase",icon:[512,512,[128188],"f0b1","M200 48l112 0c4.4 0 8 3.6 8 8l0 40-128 0 0-40c0-4.4 3.6-8 8-8zm-56 8l0 40-80 0C28.7 96 0 124.7 0 160l0 96 512 0 0-96c0-35.3-28.7-64-64-64l-80 0 0-40c0-30.9-25.1-56-56-56L200 0c-30.9 0-56 25.1-56 56zM512 304l-192 0 0 16c0 17.7-14.3 32-32 32l-64 0c-17.7 0-32-14.3-32-32l0-16-192 0 0 112c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-112z"]};var M3={prefix:"fas",iconName:"pause",icon:[384,512,[9208],"f04c","M48 32C21.5 32 0 53.5 0 80L0 432c0 26.5 21.5 48 48 48l64 0c26.5 0 48-21.5 48-48l0-352c0-26.5-21.5-48-48-48L48 32zm224 0c-26.5 0-48 21.5-48 48l0 352c0 26.5 21.5 48 48 48l64 0c26.5 0 48-21.5 48-48l0-352c0-26.5-21.5-48-48-48l-64 0z"]};var u3={prefix:"fas",iconName:"desktop",icon:[512,512,[128421,61704,"desktop-alt"],"f390","M64 32C28.7 32 0 60.7 0 96L0 352c0 35.3 28.7 64 64 64l144 0-16 48-72 0c-13.3 0-24 10.7-24 24s10.7 24 24 24l272 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-72 0-16-48 144 0c35.3 0 64-28.7 64-64l0-256c0-35.3-28.7-64-64-64L64 32zM96 96l320 0c17.7 0 32 14.3 32 32l0 160c0 17.7-14.3 32-32 32L96 320c-17.7 0-32-14.3-32-32l0-160c0-17.7 14.3-32 32-32z"]};var L3={prefix:"fas",iconName:"arrow-down",icon:[384,512,[8595],"f063","M169.4 502.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 402.7 224 32c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 370.7-105.4-105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"]},h3={prefix:"fas",iconName:"location-dot",icon:[384,512,["map-marker-alt"],"f3c5","M0 188.6C0 84.4 86 0 192 0S384 84.4 384 188.6c0 119.3-120.2 262.3-170.4 316.8-11.8 12.8-31.5 12.8-43.3 0-50.2-54.5-170.4-197.5-170.4-316.8zM192 256a64 64 0 1 0 0-128 64 64 0 1 0 0 128z"]};var v3={prefix:"fas",iconName:"keyboard",icon:[576,512,[9e3],"f11c","M64 64C28.7 64 0 92.7 0 128L0 384c0 35.3 28.7 64 64 64l448 0c35.3 0 64-28.7 64-64l0-256c0-35.3-28.7-64-64-64L64 64zm16 64l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16zM64 240c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32zM176 128l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16zM160 240c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32zm16 80l224 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-224 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16zm80-176c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32zm16 80l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16zm80-80c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32zm16 80l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16zm80-80c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32zm16 80l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16z"]};var C3={prefix:"fas",iconName:"hashtag",icon:[512,512,[62098],"23","M214.7 .7c17.3 3.7 28.3 20.7 24.6 38l-19.1 89.3 126.5 0 22-102.7C372.4 8 389.4-3 406.7 .7s28.3 20.7 24.6 38L412.2 128 480 128c17.7 0 32 14.3 32 32s-14.3 32-32 32l-81.6 0-27.4 128 67.8 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-81.6 0-22 102.7c-3.7 17.3-20.7 28.3-38 24.6s-28.3-20.7-24.6-38l19.1-89.3-126.5 0-22 102.7c-3.7 17.3-20.7 28.3-38 24.6s-28.3-20.7-24.6-38L99.8 384 32 384c-17.7 0-32-14.3-32-32s14.3-32 32-32l81.6 0 27.4-128-67.8 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l81.6 0 22-102.7C180.4 8 197.4-3 214.7 .7zM206.4 192l-27.4 128 126.5 0 27.4-128-126.5 0z"]};var g3={prefix:"fas",iconName:"circle-dot",icon:[512,512,[128280,"dot-circle"],"f192","M256 512a256 256 0 1 0 0-512 256 256 0 1 0 0 512zm0-352a96 96 0 1 1 0 192 96 96 0 1 1 0-192z"]};var x3={prefix:"fas",iconName:"arrows-rotate",icon:[512,512,[128472,"refresh","sync"],"f021","M65.9 228.5c13.3-93 93.4-164.5 190.1-164.5 53 0 101 21.5 135.8 56.2 .2 .2 .4 .4 .6 .6l7.6 7.2-47.9 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l128 0c17.7 0 32-14.3 32-32l0-128c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 53.4-11.3-10.7C390.5 28.6 326.5 0 256 0 127 0 20.3 95.4 2.6 219.5 .1 237 12.2 253.2 29.7 255.7s33.7-9.7 36.2-27.1zm443.5 64c2.5-17.5-9.7-33.7-27.1-36.2s-33.7 9.7-36.2 27.1c-13.3 93-93.4 164.5-190.1 164.5-53 0-101-21.5-135.8-56.2-.2-.2-.4-.4-.6-.6l-7.6-7.2 47.9 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L32 320c-8.5 0-16.7 3.4-22.7 9.5S-.1 343.7 0 352.3l1 127c.1 17.7 14.6 31.9 32.3 31.7S65.2 496.4 65 478.7l-.4-51.5 10.7 10.1c46.3 46.1 110.2 74.7 180.7 74.7 129 0 235.7-95.4 253.4-219.5z"]};var S3={prefix:"fas",iconName:"list-ul",icon:[512,512,["list-dots"],"f0ca","M48 144a48 48 0 1 0 0-96 48 48 0 1 0 0 96zM192 64c-17.7 0-32 14.3-32 32s14.3 32 32 32l288 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L192 64zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32l288 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-288 0zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32l288 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-288 0zM48 464a48 48 0 1 0 0-96 48 48 0 1 0 0 96zM96 256a48 48 0 1 0 -96 0 48 48 0 1 0 96 0z"]};var b3={prefix:"fas",iconName:"tablet-screen-button",icon:[448,512,["tablet-alt"],"f3fa","M0 64C0 28.7 28.7 0 64 0L384 0c35.3 0 64 28.7 64 64l0 384c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 64zM256 432a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zM384 64l-320 0 0 288 320 0 0-288z"]};var d0={"address-book":I4,"arrow-down":L3,"arrow-left":s3,"arrow-right":R4,ban:f4,bell:s4,briefcase:d3,bullhorn:K4,calendar:i4,"caret-down":m3,"caret-up":l3,chart:Q4,"chart-line":A4,check:H4,"check-double":i3,"chevron-down":W4,"circle-dot":g3,"circle-outline":c4,clock:L4,cloud:k4,comment:V4,comments:U4,desktop:u3,dialpad:v3,ellipsis:o4,envelope:r4,expand:d4,fax:p4,fire:C4,folder:w4,gear:T4,globe:e3,hashtag:C3,headset:x4,image:N4,inbox:j4,link:y4,list:S3,"location-dot":h3,lock:Z4,microphone:b4,"microphone-slash":l4,minus:a4,mobile:q4,music:n3,palette:m4,pause:M3,phone:G4,"phone-slash":p3,"phone-volume":$4,play:P4,plug:O4,plus:t3,record:t4,robot:f3,rocket:h4,search:n4,send:v4,shield:a3,sitemap:z4,sliders:F4,sms:e4,sparkles:X4,star:J4,stop:u4,sync:x3,"table-columns":M4,tablet:b3,tag:z3,transfer:D4,upload:r3,user:E4,users:g4,voicemail:S4,warning:Y4,"window-compact":o3,"window-restore":c3,"window-wide":B4,xmark:_4};function A(l,c){let a=d0[l],[e,r,,,s]=a.icon,i=Array.isArray(s)?s.join(" "):s;return t`<svg
    viewBox="0 0 ${e} ${r}"
    style="width:1em;height:1em;vertical-align:-0.125em;overflow:visible"
    fill="currentColor"
    role=${c?.label?"img":"presentation"}
    aria-label=${c?.label??""}
    aria-hidden=${c?.label?"false":"true"}
  >
    <path d=${i}></path>
  </svg>`}var V2={mode:"light",primaryColor:"#2563eb",primaryHover:"#1d4ed8",primaryText:"#ffffff",radius:"12px",fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'},j2={mode:"dark",primaryColor:"#60a5fa",primaryHover:"#93c5fd",primaryText:"#0f172a",radius:"12px",fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'},N3={primaryColor:"--dc-primary-color",primaryHover:"--dc-primary-hover",primaryText:"--dc-primary-text",radius:"--dc-radius",fontFamily:"--dc-font-family"};function K2(l){let c=l||{},a=String(c.theme||c.mode||"LIGHT").toLowerCase(),e=a==="dark"?j2:V2,r={mode:a==="auto"?"auto":e.mode,primaryColor:c.primaryColor||c.primary||e.primaryColor,primaryHover:c.primaryHover||e.primaryHover,primaryText:c.primaryText||e.primaryText,radius:c.radius||e.radius,fontFamily:c.fontFamily||e.fontFamily};return a==="auto"&&(r.mode="auto"),r}function M0(l){return l==="dark"?"dark":l==="light"?"light":typeof window<"u"&&typeof window.matchMedia=="function"&&window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}function X2(l,c){let a=K2(l),e=c||(typeof document<"u"?document.documentElement:null);if(!e||!e.style)return a;e.setAttribute("data-dc-theme",M0(a.mode));let r=Object.keys(N3);for(let s=0;s<r.length;s++){let i=r[s],n=a[i];typeof n=="string"&&n.length>0&&e.style.setProperty(N3[i],n)}return a}var w3="dc-session-expired",J2="dc-refresh-session";function Z2(l){if(!l||typeof l!="string")return{};let c=l.split(".");if(c.length<2)return{};try{let a=c[1].replace(/-/g,"+").replace(/_/g,"/"),e=a+"===".slice((a.length+3)%4),r=typeof Buffer<"u"?Buffer.from(e,"base64").toString("utf8"):decodeURIComponent(atob(e).split("").map(function(i){return"%"+("00"+i.charCodeAt(0).toString(16)).slice(-2)}).join("")),s=JSON.parse(r);return s&&typeof s=="object"?s:{}}catch{return{}}}function k3(l){let c=Z2(l).exp;return typeof c!="number"||!Number.isFinite(c)?null:c*1e3}function y3(l){if(l==null||l==="")return null;if(typeof l=="number"&&Number.isFinite(l))return l<1e12?l*1e3:l;let c=Date.parse(String(l));return Number.isNaN(c)?null:c}function Y2(l){return!l||typeof l!="object"?!1:l.status===401||l.statusCode===401?!0:!!(l.response&&l.response.status===401)}function c1(l){return l?l.token||typeof l.getToken=="function"?!0:a1(l.tokenManager):!1}function a1(l){return!!(l&&typeof l.withAuthRetry=="function"&&typeof l.current=="function")}function l1(l,c){let a=l||{},e=a1(a.tokenManager),r=e?a.tokenManager:A3({token:a.token,expires_at:a.expires_at,getToken:a.getToken,onExpired:a.onExpired}),s=typeof c=="function"?r.onTokenChange(c):null,i=!1;return{manager:r,owned:!e,release:function(){i||(i=!0,s&&s(),e||r.destroy())}}}async function e1(l){if(l.manager.current())return l.manager.current();try{return await l.manager.refresh()}catch(c){throw l.release(),c}}function u0(l){return l||(typeof window<"u"&&window&&typeof window.addEventListener=="function"?window:null)}function L0(l,c){if(typeof CustomEvent=="function")return new CustomEvent(l,{bubbles:!0,composed:!0,detail:c});let a=new Event(l,{bubbles:!0,composed:!0});return a.detail=c,a}function Q2(l,c){let a=setTimeout(l,Math.min(Math.max(0,c),2147483647));return a&&typeof a.unref=="function"&&a.unref(),a}function A3(l){let c=l||{},a=typeof c.getToken=="function"?c.getToken:null,e=typeof c.onExpired=="function"?c.onExpired:null,r=typeof c.now=="function"?c.now:Date.now,s=u0(c.target),i=[],n="",o=null,m=null,d=null,f=!1,z=!1,p=!1;function C(){m&&(clearTimeout(m),m=null)}function h(){let L=i.slice();for(let S=0;S<L.length;S++)try{L[S](n)}catch{}}function N(L,S){if(C(),f||z)return;f=!0;let g={reason:L,error:S||null,expires_at:o};s&&s.dispatchEvent(L0(w3,g)),e&&e(g)}function m2(){if(C(),p=!1,z||!o)return;let L=o-r();if(!a){m=Q2(function(){m=null,N("token_expired")},L);return}let S=Math.floor(L*.8);L-S<1e4&&(S=L-1e4),m=Q2(u1,S)}function u1(){m=null,z2("scheduled").catch(function(){})}function P2(L,S){n=String(L),o=k3(n)||y3(S),f=!1,m2(),h()}function W3(){if(p||!o)return!1;let L=o-1e4-r();return L<=0?!1:(p=!0,m=Q2(u1,L),!0)}function z2(L){if(z)return Promise.reject(new Error("Token manager was closed"));if(d)return d;if(!a){let g=new Error("No getToken() was provided to refresh the session");return N(L==="unauthorized"?"unauthorized":"refresh_unavailable",g),Promise.reject(g)}let S=p;return d=Promise.resolve().then(function(){return a()}).then(function(g){let p2=typeof g=="string"?g:g&&typeof g.token=="string"?g.token:"";if(!p2)throw new Error("getToken() did not return a token");if(d=null,z)throw new Error("Token manager was closed");return P2(p2,g&&typeof g=="object"?g.expires_at:null),n}).catch(function(g){throw d=null,z||L==="scheduled"&&!S&&W3()||N("refresh_failed",g),g}),d}async function L1(L){try{await z2("unauthorized")}catch{throw L}}function h1(){z2("requested").catch(function(){})}return c.token&&P2(c.token,c.expires_at),s&&s.addEventListener(J2,h1),{current:function(){return n},expiresAt:function(){return o},hasRefresher:function(){return!!a},isExpired:function(){return f},isDestroyed:function(){return z},refresh:function(){return z2("manual")},setToken:function(L,S){if(z)throw new Error("Token manager was closed");if(!L)throw new Error("setToken(token) requires a site token");let g=typeof L=="object"?L.token:L,p2=typeof L=="object"?L.expires_at:S;if(!g)throw new Error("setToken(token) requires a site token");return P2(g,p2),n},withAuthRetry:async function(L){if(z)throw new Error("Token manager was closed");let S;try{S=await L(n)}catch(g){if(!Y2(g))throw g;return await L1(g),L(n)}return Y2(S)&&S.ok===!1?(await L1(S),L(n)):S},onTokenChange:function(L){return i.push(L),function(){let S=i.indexOf(L);S>=0&&i.splice(S,1)}},destroy:function(){z||(z=!0,C(),d=null,i.length=0,s&&s.removeEventListener(J2,h1))}}}var P3="consent_required";var h0="sms_registration_required",v0={400:"invalid_request",401:"unauthorized",402:"payment_required",403:"forbidden",404:"not_found",409:"conflict",429:"rate_limited"},C0={no_granted_consent:"Drop Cowboy has no granted consent on file for this contact and number.",phone_mismatch:"This number is not one of the contact's numbers, so their recorded consent does not cover it.",opted_out:"This contact opted out (replied STOP), so they cannot be messaged until they opt back in.",contact_dnc:"This contact is on your Do Not Call list.",contact_not_found:"Drop Cowboy could not find that contact, so there is no recorded consent to use.",consent_record_invalid:"The consent recorded for this contact no longer covers this number or channel."},T3={[h0]:"This number is not registered for texting yet. US carriers only deliver business texts from numbers on a registered brand and campaign (10DLC). Register them in Drop Cowboy, then try again."},B3='Capture consent with the Consent block first, or ask a team admin to turn on "Use existing contact consent" in Building Blocks settings so consent already recorded in Drop Cowboy counts.';function k(l){if(typeof l=="string"){let c=l.trim();return c&&c!=="[object Object]"?c:""}return""}function g0(l){return!l||typeof l!="object"?{}:l.payload&&typeof l.payload=="object"?l.payload:l.body&&typeof l.body=="object"?l.body:l.response&&l.response.data&&typeof l.response.data=="object"?l.response.data:!(l instanceof Error)&&(l.detail!==void 0||l.title!==void 0||l.message!==void 0)?l:{}}function x0(l){let c=k(l);if(!c||c==="about:blank")return"";let a=c.split("/");return a[a.length-1]||""}function q(l,c){let a=k(c)||"Something went wrong. Try again.";if(typeof l=="string")return{code:"request_failed",message:k(l)||a,reason:null,status:null};let e=g0(l),r=e.detail!==void 0?e.detail:l&&l.detail,s=Number(l&&(l.status||l.statusCode)||e.status)||null,i="",n=null,o="";return r&&typeof r=="object"?(i=k(r.code),n=k(r.reason)||null,o=k(e.message)||k(r.message)||k(e.title)):o=k(r)||k(e.message)||k(e.title),i||(i=k(e.code)||k(l&&l.code)||x0(e.type)),o||(o=k(l&&l.message)),i||(i=s&&v0[s]||"request_failed"),i===P3?o=H3(n):T3[i]&&(o=T3[i]),{code:i,message:o||a,reason:n,status:s}}function H3(l){let c="This contact needs recorded consent before you can text or call them.",a=l&&C0[l];return l==="opted_out"||l==="contact_dnc"?c+" "+a:a?c+" "+a+" "+B3:c+" "+B3}var T="https://app-api-v2.dropcowboy.com";function F3(l){if(!l||typeof l!="string")return{};let c=l.split(".");if(c.length<2)return{};try{let a=c[1].replace(/-/g,"+").replace(/_/g,"/"),e=a+"===".slice((a.length+3)%4),r=typeof Buffer<"u"?Buffer.from(e,"base64").toString("utf8"):decodeURIComponent(atob(e).split("").map(function(s){return"%"+("00"+s.charCodeAt(0).toString(16)).slice(-2)}).join(""));return JSON.parse(r)}catch{return{}}}var n1={},i2=null,r1="https://dropcowboy.com/app";function K(l,c){let a=String(l||T).replace(/\/$/,"");return(a.endsWith("/phone")?a:a+"/phone")+c}function f1(l){return K(l,"/public/numbers/available")}function t1(l){return K(l,"/public/numbers/rent")}function _3(l){return K(l,"/public/numbers")}function U3(l){return K(l,"/public/ivrs")}function n2(l,c){return K(l,"/public/numbers/"+encodeURIComponent(c||""))}function s1(l){return K(l,"/public/lines")}function o2(l,c){return K(l,"/public/lines/"+encodeURIComponent(c||""))}function S0(l,c){return o2(l,c)+"/assign"}function b0(l,c){return o2(l,c)+"/default"}function f2(){return{get:function(l,c){return T2("GET",l,void 0,c)},post:function(l,c,a){return T2("POST",l,c,a)},put:function(l,c,a){return T2("PUT",l,c,a)},del:function(l,c){return T2("DELETE",l,void 0,c)}}}function T2(l,c,a,e){let r={method:l,headers:e||{}};return a!==void 0&&(r.body=JSON.stringify(a)),fetch(c,r).then(function(s){return s.json().catch(function(){return{}}).then(function(i){if(!s.ok){let n=q({status:s.status,payload:i},"Request failed ("+s.status+")"),o=new Error(n.message);throw o.status=s.status,o.code=n.code,o.payload=i,o}return i})})}function R(l){return!l||typeof l!="object"?l:l.data!==void 0?l.data:l}function $(l,c){let a=R(l);return Array.isArray(a)?a:!a||typeof a!="object"?[]:c&&Array.isArray(a[c])?a[c]:Array.isArray(a.numbers)?a.numbers:Array.isArray(a.ivrs)?a.ivrs:Array.isArray(a.lines)?a.lines:[]}function N0(l){let c=l||{},a={};return c.voice_ivr_id!==void 0&&(a.voice_ivr_id=c.voice_ivr_id),c.name!==void 0&&(a.name=c.name),c.features!==void 0&&(a.features=c.features),c.sms_enabled!==void 0&&(a.sms_enabled=c.sms_enabled),c.brand_id!==void 0&&(a.brand_id=c.brand_id),c.dni!==void 0&&(a.dni=c.dni),a}function E3(l){let c=l||{},a={},e=["name","type","rules","after_hour_rules","default","availability","sms_rules","campaign_id","brand_id","rcs_enabled","rcs_sender_name","fax"];for(let r=0;r<e.length;r++){let s=e[r];c[s]!==void 0&&(a[s]=c[s])}return a}function i1(l){let c=l&&l.phone_numbers_count!=null?l.phone_numbers_count:(l&&l.phone_numbers||[]).length;return{id:l&&(l.ivr_id||l.line_id||l.id)||"",name:l&&l.name||"Phone line",default:!!(l&&l.default),availability:l&&l.availability,phone_numbers_count:c}}function G(l){return{"Content-Type":"application/json",Authorization:"Bearer "+l}}function w0(l){typeof window>"u"||(window.DropCowboy=window.DropCowboy||{},window.DropCowboy.phoneHub=l)}function q3(l){let c=String(l||"").replace(/\D/g,"");return c.length===11&&c.charAt(0)==="1"?"+1 ("+c.slice(1,4)+") "+c.slice(4,7)+"-"+c.slice(7):c.length===10?"+1 ("+c.slice(0,3)+") "+c.slice(3,6)+"-"+c.slice(6):String(l||"")}function m1(l,c){let a=l&&(l.phone_number||l.number)||"",e=[],r=String(c||"voice,sms").split(",");for(let n=0;n<r.length;n++){let o=r[n].trim();(o==="voice"||o==="sms"||o==="mms"||o==="fax")&&e.push(o)}let s=l&&l.area_code||"",i=/^(800|888|877|866|855|844|833)$/.test(s);return{id:a,number:a,display:q3(a),locality:l&&(l.city||l.location_label)||"",region:l&&l.iso_state||"",type:i?"tollfree":"local",capabilities:e.length?e:["voice","sms"],priceCents:typeof(l&&l.price_cents)=="number"?l.price_cents:0}}function k0(l){let c=l&&(l.phone_number||l.number)||"",a=[];return(!l||l.sms_enabled!==!1)&&a.push("sms"),a.unshift("voice"),{id:c,display:q3(c),subtitle:l&&l.name||a.join(", ")+" \xB7 BYOC",status:l&&l.status||"",number:c,voice_ivr_id:l&&l.voice_ivr_id}}function R3(l){if(l==null||l==="")return"";let c=Number(l);if(Number.isNaN(c))return String(l);let a=Math.floor(c),e=Math.round((c-a)*60),r=(a+11)%12+1,s=a>=24||a<12?"a":"p",i=e===0?"":":"+String(e).padStart(2,"0");return a===0&&e===0||a===24?"12a":r+i+s}var y0=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];function D3(l){let c=l&&l.days||l||{},a=[];for(let e=0;e<7;e++){let r=c[e]||c[String(e)]||{},s=r.open!==!1;a.push({label:y0[e],hours:s?R3(r.start)+"\u2013"+R3(r.end):"Closed",open:s})}return a}function z1(l){return l?l+" number"+(l===1?"":"s"):"No numbers"}function p1(l){return{id:l.id,title:l.name,subtitle:z1(l.phone_numbers_count)}}function A0(l){let c=l||[],a=[];for(let e=0;e<c.length;e++){let r=c[e]||{},s=r.phone_numbers_count!=null?r.phone_numbers_count:(r.phone_numbers||[]).length;a.push({id:r.ivr_id||r.id,title:r.name||"Phone line",subtitle:z1(s),availability:r.availability})}return a}async function d1(l){let c=l.http,a=l.phoneApiBase,e=l.authed,r=await e(h=>c.get(_3(a),h)),s=$(r,"numbers"),i=[];for(let h=0;h<s.length;h++)i.push(k0(s[h]));let n=await e(h=>c.get(U3(a),h)),o=$(n,"ivrs"),m=A0(o),d=o.length?D3(o[0].availability):[],f=await e(h=>c.get(s1(a),h)),z=$(f,"lines"),p=[],C={};for(let h=0;h<m.length;h++)C[m[h].id]=!0;for(let h=0;h<z.length;h++){let N=i1(z[h]);p.push(N),C[N.id]||(C[N.id]=!0,m.push({id:N.id,title:N.name,subtitle:z1(N.phone_numbers_count),availability:N.availability}))}return!d.length&&z.length&&(d=D3(z[0].availability)),{inventory:i,routes:m,lines:p,hours:d}}function t2(l,c){let a=String(c||r1).replace(/\/$/,""),e=l?String(l).charAt(0)==="#"?l:"#"+l:"#/phone-hub",r=a+e;return typeof window<"u"&&typeof window.open=="function"&&window.open(r,"_blank","noopener"),r}function B2(l){return new o1(l||n1)}function Y(){return i2||(i2=B2(n1)),i2}async function T0(l){return Y().init(l)}function B0(l){Y().setTheme(l)}function P0(l){return Y().addErrorListener(l)}function H0(l){return Y().setToken(l)}async function F0(l){return Y().openHub(l)}async function E0(l){return Y().openNumberPicker(l)}async function R0(){let l=i2;i2=null,l&&await l.close()}var o1=class{constructor(c){this.http=c&&c.http||n1.http||f2(),this.token=null,this.session=null,this.mounted=[],this.phoneApiBase=T,this.portalBase=r1,this.teamId=null,this.theme={},this.listeners=[],this.errorListeners=[],this.inventory=[],this.routes=[],this.hours=[],this.lines=[],this.complianceNote="E911, CNAM, and 10DLC brand writes are not available on public embed APIs. Open Trust Center or Phone Hub in the portal."}async init(c){if(!c1(c))throw new Error("init({ token }) requires a site token from POST /embed/token");this.phoneApiBase=c.phoneApiBase||T,this.portalBase=c.portalBase||r1,this._releaseSession(),this.session=l1(c,a=>this._applyToken(a)),this._applyToken(await e1(this.session))}setToken(c){if(!this.session)throw new Error("Call init({ token }) before setToken");return this.session.manager.setToken(c)}getTokenManager(){return this.session?this.session.manager:null}_applyToken(c){this.token=c||null;let a=F3(c);this.teamId=a.team_id||null,this.sandbox=a.sandbox===!0;for(let e=0;e<this.mounted.length;e++){let r=this.mounted[e];c&&!r.tokenManager&&r.token!==c&&(r.token=c)}}_track(c){this.mounted.indexOf(c)>=0||(this.mounted.push(c),c.addEventListener&&c.addEventListener("dc-error",a=>this._emitError(a.detail)))}_emitError(c){for(let a=0;a<this.errorListeners.length;a++)this.errorListeners[a](c)}_bindElement(c){let a=this.getTokenManager();a?c.tokenManager=a:c.token=this.token,this._track(c)}_releaseSession(){this.session&&(this.session.release(),this.session=null)}_authed(c){if(!this.session||!this.token)throw new Error("init({ token }) is required for number search, rent, and hub reads");return this.session.manager.withAuthRetry(a=>c(G(a)))}setTheme(c){this.theme=Object.assign({},this.theme,c||{}),this.theme.primary&&!this.theme.primaryColor&&(this.theme.primaryColor=this.theme.primary),X2(this.theme)}getTheme(){return this.theme}credHeaders(){if(!this.token)throw new Error("init({ token }) is required for number search, rent, and hub reads");return G(this.token)}async searchNumbers(c){let a=c&&(c.areaCode||c.pattern)||"",e=c&&c.capabilities||["voice","sms"],r=Array.isArray(e)?e.join(","):String(e),s={country_iso:c&&c.countryIso||"US",pattern:String(a).replace(/\D/g,""),services:r,limit:c&&c.limit||10},i=await this._authed(d=>this.http.post(f1(this.phoneApiBase),s,d)),n=R(i),o=Array.isArray(n)?n:n&&n.numbers||[],m=[];for(let d=0;d<o.length;d++)m.push(m1(o[d],r));return m}async rentNumber(c,a){if(this.sandbox)throw new Error("This preview cannot buy a number. Connect your carrier (BYOC) to rent on your site.");let e=typeof c=="string"?c:c&&(c.number||c.id),r=a&&a.services||"voice,sms",s=a&&(a.lineId||a.line_id||a.voice_ivr_id),i={number:e,services:r};s&&(i.voice_ivr_id=s);let n=await this._authed(m=>this.http.post(t1(this.phoneApiBase),i,m)),o=R(n);return s&&await this.updateNumber(e,{voice_ivr_id:s}),this._emit({type:"number-purchased",number:e,result:o,lineId:s||null}),o}async updateNumber(c,a){let e=typeof c=="string"?c:c&&(c.number||c.id),r=await this._authed(s=>this.http.put(n2(this.phoneApiBase,e),N0(a),s));return R(r)}async assignNumberToLine(c,a){return this.updateNumber(c,{voice_ivr_id:a})}async listNumbers(){let c=await this._authed(a=>this.http.get(_3(this.phoneApiBase),a));return $(c,"numbers")}async listIvrs(){let c=await this._authed(a=>this.http.get(U3(this.phoneApiBase),a));return $(c,"ivrs")}async listLines(){let c=await this._authed(r=>this.http.get(s1(this.phoneApiBase),r)),a=$(c,"lines"),e=[];for(let r=0;r<a.length;r++)e.push(i1(a[r]));return this.lines=e,e}async getLine(c){let a=await this._authed(e=>this.http.get(o2(this.phoneApiBase,c),e));return i1(R(a))}async createLine(c){let a=await this._authed(e=>this.http.post(s1(this.phoneApiBase),E3(c),e));return R(a)}async updateLine(c,a){let e=await this._authed(r=>this.http.post(o2(this.phoneApiBase,c),E3(a),r));return R(e)}async deleteLine(c){return await this._authed(a=>this.http.del(o2(this.phoneApiBase,c),a)),{deleted:!0}}async assignLineNumber(c,a){let e=typeof a=="string"?a:a&&(a.number||a.id),r=await this._authed(s=>this.http.post(S0(this.phoneApiBase,c),{number:e},s));return R(r)}async setDefaultLine(c,a){let e={};a&&a.type&&(e.type=a.type);let r=await this._authed(s=>this.http.post(b0(this.phoneApiBase,c),e,s));return R(r)}async loadHub(){let c=await d1({http:this.http,phoneApiBase:this.phoneApiBase,authed:a=>this._authed(a)});return this._keepSummary(c)}_keepSummary(c){return this.inventory=c.inventory,this.routes=c.routes,this.lines=c.lines,this.hours=c.hours,{inventory:this.inventory,routes:this.routes,lines:this.lines,hours:this.hours,e911Public:!1,cnamPublic:!1,tcrBrandPublic:!1,complianceNote:this.complianceNote}}_resolveHubElement(c){if(!c||typeof document>"u")return null;let a=typeof c=="string"?document.querySelector(c):c;if(!a)return null;if(a.tagName&&String(a.tagName).toLowerCase()==="dc-phone-hub")return a;let e=a.querySelector&&a.querySelector("dc-phone-hub");return!e&&a.appendChild&&(e=document.createElement("dc-phone-hub"),a.appendChild(e)),e||null}async openHub(c){let a=this._resolveHubElement(c&&c.container);if(a&&typeof a.whenLoaded=="function"){if(!this.session||!this.token)throw new Error("init({ token }) is required for number search, rent, and hub reads");return a.phoneApiBase||(a.phoneApiBase=this.phoneApiBase),this._bindElement(a),this._keepSummary(await a.whenLoaded())}let e=await this.loadHub();if(a){a.inventory=e.inventory,a.routes=e.routes,a.hours=e.hours;let r=[];for(let s=0;s<e.lines.length;s++)r.push(p1(e.lines[s]));a.lines=r,a.loading=!1,this._bindElement(a)}return e}async openNumberPicker(c){let a=await this.searchNumbers(c||{});this._emit({type:"numbers-available",numbers:a});let e=c&&c.container,r=c&&(c.lineId||c.line_id||c.voice_ivr_id);if(e&&typeof document<"u"){let s=typeof e=="string"?document.querySelector(e):e;if(s){let i=s;(!s.tagName||String(s.tagName).toLowerCase()!=="dc-number-picker")&&(i=s.querySelector&&s.querySelector("dc-number-picker"),!i&&s.appendChild&&(i=document.createElement("dc-number-picker"),s.appendChild(i))),i&&(this._bindElement(i),i.numbers=a,i.status=a.length?"results":"empty",r&&(i.lineId=r),c&&c.areaCode&&(i.areaCode=c.areaCode))}}return a}addNumberPurchasedListener(c){return this.listeners.push(c),()=>{this.listeners=this.listeners.filter(function(a){return a!==c})}}addErrorListener(c){return this.errorListeners.push(c),()=>{this.errorListeners=this.errorListeners.filter(function(a){return a!==c})}}openInPortal(c){return t2(c||"#/phone-hub",this.portalBase)}async close(){this._releaseSession(),this.token=null,this.mounted=[],this.listeners=[],this.errorListeners=[],this.inventory=[],this.routes=[],this.hours=[],this.lines=[]}_emit(c){for(let a=0;a<this.listeners.length;a++)this.listeners[a](c)}};w0({init:T0,setTheme:B0,addErrorListener:P0,openHub:F0,openNumberPicker:E0,setToken:H0,close:R0,createEmbedPhoneHub:B2});var D0={incoming:{icon:"phone",tone:"blue"},hours:{icon:"clock",tone:"amber"},ivr:{icon:"sitemap",tone:"blue"},"ring-group":{icon:"users",tone:"blue"},connected:{icon:"check",tone:"green"},voicemail:{icon:"voicemail",tone:"grey"},forward:{icon:"transfer",tone:"grey"}},b=class extends y{constructor(){super(...arguments);this.section="routing";this.hubNumber="";this.flow=[];this.hours=[];this.inventory=[];this.routes=[];this.lines=[];this.selectedNodeId="";this.loading=!1;this.dirty=!1;this.connection="connected";this.token="";this.tokenManager=null;this.phoneApiBase="";this.errorMessage="";this.http=f2();this.fetchGen=0;this.loadedAuth=null;this.hubLoad=null}get selectedNode(){return this.section!=="routing"?null:this.flow.find(a=>a.id===this.selectedNodeId)??this.flow.find(a=>a.kind==="ivr")??null}emit(a,e){this.dispatchEvent(new CustomEvent(a,{detail:e,bubbles:!0,composed:!0}))}selectSection(a){this.section=a,this.emit("dc-section",{section:a})}selectNode(a){this.selectedNodeId=a.id,this.emit("dc-node-select",{nodeId:a.id})}portal(a){t2(a),this.emit("dc-open-portal",{hash:a})}updated(a){(a.has("tokenManager")||a.has("token"))&&this.startLoad()}whenLoaded(){return this.startLoad()??Promise.resolve(null)}startLoad(){let a=this.tokenManager||this.token||null;if(!a)return null;if(this.hubLoad&&a===this.loadedAuth)return this.hubLoad;this.loadedAuth=a;let e=this.loadHub();return this.hubLoad=e,e.catch(()=>{this.hubLoad===e&&(this.hubLoad=null)}),e}hasAuth(){return!!this.tokenManager||!!this.token}authed(a){return this.tokenManager?this.tokenManager.withAuthRetry(e=>a(G(e))):a(G(this.token))}fail(a,e){let r=q(a,e);this.errorMessage=r.message,this.emit("dc-error",{code:r.code,message:r.message,reason:r.reason})}async assignNumber(a,e){let r=this.http.put;if(!(!this.hasAuth()||!a||!r)){this.errorMessage="";try{await this.authed(i=>r(n2(this.phoneApiBase||T,a),{voice_ivr_id:e},i));let s=[];for(let i=0;i<this.inventory.length;i++){let n=this.inventory[i];n.number===a||n.id===a?s.push({id:n.id,display:n.display,subtitle:n.subtitle,status:n.status,number:n.number,voice_ivr_id:e}):s.push(n)}this.inventory=s}catch(s){this.fail(s,"Unable to assign number")}}}async loadHub(){let a=++this.fetchGen;this.loading=!0,this.errorMessage="";try{let e=await d1({http:this.http,phoneApiBase:this.phoneApiBase||T,authed:s=>this.authed(s)});if(a!==this.fetchGen)return e;this.inventory=e.inventory,this.routes=e.routes;let r=[];for(let s=0;s<e.lines.length;s++)r.push(p1(e.lines[s]));return this.lines=r,e.hours.length&&(this.hours=e.hours),e.inventory[0]&&(this.hubNumber=e.inventory[0].display),e}catch(e){throw a===this.fetchGen&&this.fail(e,"Unable to load phone hub"),e}finally{a===this.fetchGen&&(this.loading=!1)}}render(){let a=this.section==="routing"&&!this.loading&&this.flow.length>0;return t`
      <div class="hub dc-panel ${a?"":"no-inspector"}" role="region" aria-label="Phone Hub">
        ${this.renderRail()}
        <div class="main">
          ${this.renderTopbar()}
          ${this.errorMessage?t`<div class="dc-muted dc-sm" style="padding:10px 22px;color:var(--dc-danger-text)">${this.errorMessage}</div>`:M}
          ${this.connection!=="connected"?t`<dc-system-banner
                style="width:auto;margin:10px 22px 0"
                kind=${this.connection==="reconnecting"?"reconnecting":"offline"}
              ></dc-system-banner>`:M}
          <div class="canvas">${this.loading?this.renderLoading():this.renderSection()}</div>
          ${this.section==="routing"&&!this.loading?this.renderSaveBar():M}
        </div>
        ${a?this.renderInspector():M}
      </div>
    `}renderRail(){let a=(e,r,s,i)=>t`
      <button
        class="nav-item ${this.section===e?"active":""}"
        aria-current=${this.section===e?"page":M}
        @click=${()=>this.selectSection(e)}
      >
        <span class="gl">${A(r)}</span>${s}
        ${i?t`<span class="dc-pill">${i}</span>`:M}
      </button>
    `;return t`
      <aside class="rail" aria-label="Phone Hub sections">
        <h2>Phone Hub</h2>
        ${a("numbers","phone","Numbers",this.inventory.length?String(this.inventory.length):void 0)}
        ${a("routing","sitemap","Call routing")}
        ${a("hours","clock","Business hours")}
        ${a("voicemail","voicemail","Voicemail & greetings")}
        ${a("trunks","transfer","BYOC trunks")}
      </aside>
    `}renderTopbar(){let a={numbers:"Your numbers",routing:this.hubNumber?`Routing for ${this.hubNumber}`:"Call routing",hours:"Business hours",voicemail:"Voicemail & greetings",trunks:"BYOC trunks"};return t`
      <div class="topbar">
        <h2>${a[this.section]}</h2>
        ${this.section==="routing"?t`
              <span class="dc-pill is-info">Edit IVR in portal</span>
              <div class="spacer"></div>
              <button class="dc-btn dc-secondary" @click=${()=>this.portal("#/phone-hub")}>
                Open Phone Hub
              </button>
            `:M}
      </div>
    `}renderLoading(){return t`
      <div class="flow" aria-busy="true" aria-label="Loading routing flow">
        <div class="sk" style="width:100%;max-width:460px;height:62px"></div>
        <div class="connector"></div>
        <div class="sk" style="width:100%;max-width:460px;height:62px"></div>
        <div class="connector"></div>
        <div class="sk" style="width:100%;max-width:460px;height:148px"></div>
      </div>
    `}renderSection(){switch(this.section){case"routing":return this.renderFlow();case"hours":return this.renderHoursPanel();case"voicemail":return this.renderVoicemailPanel();case"trunks":return this.renderTrunksPanel();case"numbers":return this.renderNumbersPanel()}}renderFlow(){if(this.routes.length)return t`
        <div class="section-panel">
          <h3>Call routes</h3>
          ${this.routes.map(e=>t`<div class="vrow">
              <div class="grow">
                <div class="vt">${e.title}</div>
                <div class="vs">${e.subtitle}</div>
              </div>
            </div>`)}
          <div class="field-group">
            <button class="dc-btn" @click=${()=>this.portal("#/phone-hub")}>Edit IVR in portal</button>
          </div>
        </div>
      `;if(!this.flow.length)return t`
        <div class="section-panel">
          <h3>Call routes</h3>
          <p class="dc-muted dc-sm">No call routes yet.</p>
          <div class="field-group">
            <button class="dc-btn" @click=${()=>this.portal("#/phone-hub")}>Set up routing in portal</button>
          </div>
        </div>
      `;let a=this.selectedNode?.id;return t`
      <div class="flow">
        ${this.flow.map((e,r)=>{let s=D0[e.kind];return t`
            ${r>0?t`<div class="connector"></div>`:M}
            <button
              class="node ${e.id===a?"sel":""}"
              aria-pressed=${e.id===a}
              @click=${()=>this.selectNode(e)}
            >
              <div class="nh">
                <div class="ni ${s.tone}">${A(s.icon)}</div>
                <div>
                  <div class="nt">${e.title}</div>
                  <div class="ns">${e.subtitle}</div>
                </div>
              </div>
              ${e.options?.length?t`<div class="menu-opts">
                    ${A2(e.options,i=>i.digit,i=>t`<div class="opt">
                        <span class="num">${i.digit}</span> ${i.label}
                        <span class="arrow">→ ${i.destination}</span>
                      </div>`)}
                  </div>`:M}
            </button>
          `})}
        <div class="connector"></div>
        <button class="add-step" @click=${()=>this.portal("#/phone-hub")}>Edit routing in portal</button>
      </div>
    `}renderSaveBar(){return t`
      <div class="save-bar">
        <span class="hint">IVR and hours editors stay in the DropCowboy portal.</span>
        <button class="dc-btn" @click=${()=>this.portal("#/phone-hub")}>Edit in portal</button>
      </div>
    `}renderInspector(){let a=this.selectedNode;return a?t`
      <aside class="inspector" aria-label="Step settings">
        <div class="num-big">${a.kind==="ivr"?"IVR menu":a.title}</div>
        <div class="dc-muted dc-sm">Selected step</div>
        ${a.subtitle?t`<p class="dc-sm">${a.subtitle}</p>`:M}
        ${this.hours.length?t`<div class="field-group">
              <h3>Business hours</h3>
              <div class="hours-list">${this.renderHoursRows()}</div>
            </div>`:M}
        <p class="dc-muted dc-sm">Greeting, input timeout and timezone are edited in the portal.</p>
      </aside>
    `:t`<aside class="inspector" aria-label="Step settings">
        <div class="dc-muted dc-sm">Select a step to edit it.</div>
      </aside>`}renderHoursRows(){return t`
      ${this.hours.map(a=>t`<div class="h ${a.open?"":"off"}">
          <span>${a.label}</span>
          <span class="hr">
            ${a.hours}
            <span
              class="toggle ${a.open?"":"off"}"
              role="switch"
              aria-checked=${a.open}
              aria-label="${a.label} ${a.open?"open":"closed"} (read-only)"
            ></span>
          </span>
        </div>`)}
    `}renderHoursPanel(){return t`
      <div class="section-panel">
        <h3>Weekly schedule</h3>
        <div class="hours-list">${this.renderHoursRows()}</div>
        <p class="dc-muted dc-sm" style="margin-top:12px">
          Hours are read-only here. Change the schedule in the portal Phone Hub.
        </p>
        <div class="field-group">
          <button class="dc-btn" @click=${()=>this.portal("#/phone-hub")}>Edit hours in portal</button>
        </div>
      </div>
    `}renderVoicemailPanel(){return t`
      <div class="section-panel">
        <h3>Voicemail &amp; greetings</h3>
        <p class="dc-muted dc-sm">
          Greeting editors are not embedded. Open Phone Hub in the portal to record or upload voicemail audio.
        </p>
        <div class="field-group">
          <button class="dc-btn" @click=${()=>this.portal("#/phone-hub")}>Edit greetings in portal</button>
        </div>
      </div>
    `}renderTrunksPanel(){return t`
      <div class="section-panel">
        <h3>BYOC trunks &amp; 10DLC</h3>
        <p class="dc-muted dc-sm">
          There is no public TCR brand GET. Brand registration and trunk setup stay in Trust Center / portal.
          Phone Hub does not write 10DLC brands.
        </p>
        <div class="field-group">
          <button class="dc-btn" @click=${()=>this.portal("#/trust-center")}>Open Trust Center</button>
        </div>
      </div>
    `}renderNumbersPanel(){return t`
      <div class="section-panel">
        <h3>Inventory</h3>
        ${this.inventory.length?this.inventory.map(a=>t`<div class="vrow">
                <div class="grow">
                  <div class="vt">${a.display}</div>
                  <div class="vs">${a.subtitle}</div>
                </div>
                ${this.hasAuth()&&(this.routes.length||this.lines.length)?t`<select
                      class="input"
                      aria-label="Assign ${a.display} to a line"
                      @change=${e=>{let r=e.target.value;r&&a.number&&this.assignNumber(a.number,r)}}
                    >
                      <option value="">Assign to line</option>
                      ${(this.lines.length?this.lines:this.routes).map(e=>t`<option value=${e.id} ?selected=${a.voice_ivr_id===e.id}>${e.title}</option>`)}
                    </select>`:M}
                ${a.status?t`<span class="dc-pill is-online"><span class="dc-pdot"></span>${a.status}</span>`:M}
              </div>`):t`<p class="dc-muted dc-sm">No numbers on this team yet. Search BYOC inventory with the number picker.</p>`}
        <p class="dc-muted dc-sm" style="margin-top:12px">
          DropCowboy retail inventory is off for Building Blocks. Rent is BYOC-only. E911 and CNAM have no public
          embed routes — finish those in the portal after purchase.
        </p>
        <div class="field-group">
          <button class="dc-btn" @click=${()=>this.emit("dc-number-add")}>+ Get a number</button>
          <button class="dc-btn dc-secondary" @click=${()=>this.portal("#/phone-hub")}>Open portal</button>
        </div>
      </div>
    `}};b.styles=[y.styles,P`
      :host {
        display: block;
        width: 1060px;
        max-width: 100%;
        height: 640px;
      }
      .hub {
        width: 100%;
        height: 100%;
        display: grid;
        grid-template-columns: 200px 1fr 264px;
        overflow: hidden;
      }
      .hub.no-inspector {
        grid-template-columns: 200px 1fr;
      }

      /* rail */
      .rail {
        border-right: 1px solid var(--dc-border-color);
        padding: 16px 12px;
        background: var(--dc-surface-color);
        overflow-y: auto;
      }
      .rail h2 {
        font-size: 15px;
        margin: 4px 6px 14px;
      }
      .nav-item {
        display: flex;
        align-items: center;
        gap: 10px;
        width: 100%;
        border: 0;
        text-align: left;
        font: inherit;
        padding: 9px 10px;
        border-radius: var(--dc-radius-sm);
        color: var(--dc-text-muted);
        font-weight: 500;
        cursor: pointer;
        margin-bottom: 2px;
        background: transparent;
      }
      .nav-item:hover {
        background: var(--dc-surface-2);
      }
      .nav-item.active {
        background: var(--dc-primary-soft);
        color: var(--dc-primary-color);
        font-weight: 600;
      }
      .nav-item .gl {
        width: 18px;
        text-align: center;
      }
      .nav-item .dc-pill {
        margin-left: auto;
      }

      /* content */
      .main {
        display: flex;
        flex-direction: column;
        min-width: 0;
      }
      .topbar {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 14px 22px;
        border-bottom: 1px solid var(--dc-border-color);
        flex-wrap: wrap;
      }
      .topbar h2 {
        font-size: 17px;
        margin: 0;
      }
      .topbar .spacer {
        flex: 1;
      }
      .canvas {
        flex: 1;
        overflow: auto;
        padding: 28px;
        background:
          radial-gradient(circle at 1px 1px, var(--dc-surface-2) 1px, transparent 0) 0 0 / 24px
            24px,
          var(--dc-bg-color);
      }
      .flow {
        display: flex;
        flex-direction: column;
        align-items: center;
        max-width: 560px;
        margin: 0 auto;
      }
      .node {
        width: 100%;
        max-width: 460px;
        background: var(--dc-bg-color);
        border: 1px solid var(--dc-border-color);
        border-radius: var(--dc-radius-sm);
        box-shadow: var(--dc-shadow-sm);
        padding: 14px 16px;
        cursor: pointer;
        text-align: left;
        font: inherit;
        color: inherit;
        transition: border-color var(--dc-transition), box-shadow var(--dc-transition);
      }
      .node.sel {
        border-color: var(--dc-primary-color);
        box-shadow: 0 0 0 3px var(--dc-primary-soft);
      }
      .node .nh {
        display: flex;
        align-items: center;
        gap: 10px;
      }
      .node .ni {
        width: 30px;
        height: 30px;
        border-radius: 8px;
        display: grid;
        place-items: center;
        flex-shrink: 0;
      }
      .node .nt {
        font-weight: 600;
      }
      .node .ns {
        font-size: var(--dc-font-size-sm);
        color: var(--dc-text-muted);
      }
      .ni.blue {
        background: var(--dc-primary-soft);
        color: var(--dc-primary-color);
      }
      .ni.amber {
        background: var(--dc-warning-soft);
        color: var(--dc-warning);
      }
      .ni.green {
        background: var(--dc-online-soft);
        color: var(--dc-online-text);
      }
      .ni.grey {
        background: var(--dc-surface-2);
        color: var(--dc-text-muted);
      }
      .connector {
        width: 2px;
        height: 26px;
        background: var(--dc-border-color);
      }
      .menu-opts {
        margin-top: 10px;
        display: flex;
        flex-direction: column;
        gap: 6px;
      }
      .opt {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 8px 10px;
        background: var(--dc-surface-color);
        border-radius: 8px;
        font-size: var(--dc-font-size-sm);
      }
      .opt .num {
        width: 22px;
        height: 22px;
        border-radius: 6px;
        background: var(--dc-bg-color);
        border: 1px solid var(--dc-border-color);
        display: grid;
        place-items: center;
        font-weight: 700;
        flex-shrink: 0;
      }
      .opt .arrow {
        margin-left: auto;
        color: var(--dc-text-light);
        text-align: right;
      }
      .add-step {
        width: 100%;
        max-width: 460px;
        border: 1px dashed var(--dc-border-color);
        color: var(--dc-text-muted);
        background: transparent;
        border-radius: var(--dc-radius-sm);
        padding: 10px 16px;
        cursor: pointer;
        font-weight: 600;
        font: inherit;
      }
      .add-step:hover {
        border-color: var(--dc-primary-color);
        color: var(--dc-primary-color);
      }
      .save-bar {
        padding: 12px 22px;
        border-top: 1px solid var(--dc-border-color);
        display: flex;
        gap: 10px;
        justify-content: flex-end;
        align-items: center;
      }
      .save-bar .hint {
        margin-right: auto;
        font-size: var(--dc-font-size-sm);
        color: var(--dc-text-muted);
      }

      /* inspector */
      .inspector {
        border-left: 1px solid var(--dc-border-color);
        padding: 18px 16px;
        background: var(--dc-surface-color);
        overflow-y: auto;
      }
      .inspector .num-big {
        font-size: 18px;
        font-weight: 700;
      }
      .field-group {
        margin-top: 16px;
      }
      .field-group label,
      .field-group h3 {
        display: block;
        margin-top: 0;
        font-size: var(--dc-font-size-xs);
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.04em;
        color: var(--dc-text-light);
        margin-bottom: 6px;
      }
      .input {
        width: 100%;
        background: var(--dc-bg-color);
        border: 1px solid var(--dc-border-color);
        border-radius: var(--dc-radius-sm);
        padding: 9px 11px;
        font: inherit;
        color: var(--dc-text-color);
      }
      .hours-list {
        display: flex;
        flex-direction: column;
        gap: 6px;
      }
      .hours-list .h {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 10px;
        font-size: var(--dc-font-size-sm);
        padding: 7px 10px;
        background: var(--dc-bg-color);
        border: 1px solid var(--dc-border-color);
        border-radius: 8px;
      }
      .hours-list .h.off {
        color: var(--dc-text-light);
      }
      .hours-list .h .hr {
        display: inline-flex;
        align-items: center;
        gap: 8px;
      }
      .toggle {
        width: 34px;
        height: 20px;
        border-radius: 999px;
        background: var(--dc-primary-color);
        position: relative;
        border: 0;
        cursor: default;
        flex-shrink: 0;
      }
      .toggle.off {
        background: var(--dc-surface-2);
      }
      .toggle::after {
        content: '';
        position: absolute;
        top: 2px;
        right: 2px;
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background: #fff;
      }
      .toggle.off::after {
        right: auto;
        left: 2px;
      }

      /* section panels (hours / voicemail / trunks / numbers) */
      .section-panel {
        max-width: 520px;
        margin: 0 auto;
        background: var(--dc-bg-color);
        border: 1px solid var(--dc-border-color);
        border-radius: var(--dc-radius-sm);
        box-shadow: var(--dc-shadow-sm);
        padding: 18px;
      }
      .section-panel h3 {
        margin: 0 0 12px;
        font-size: 15px;
      }
      .vrow {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 11px 4px;
        border-bottom: 1px solid var(--dc-border-color);
      }
      .vrow:last-child {
        border-bottom: 0;
      }
      .vrow .grow {
        flex: 1;
        min-width: 0;
      }
      .vrow .vt {
        font-weight: 600;
      }
      .vrow .vs {
        font-size: var(--dc-font-size-sm);
        color: var(--dc-text-muted);
      }

      /* loading skeleton */
      .sk {
        background: var(--dc-surface-2);
        border-radius: 8px;
        animation: shimmer 1.4s ease-in-out infinite;
      }
      @keyframes shimmer {
        0%,
        100% {
          opacity: 0.55;
        }
        50% {
          opacity: 1;
        }
      }

      @media (max-width: 900px) {
        .hub,
        .hub.no-inspector {
          grid-template-columns: 1fr;
        }
        .rail,
        .inspector {
          display: none;
        }
        :host {
          height: auto;
        }
      }
    `],u([v({type:String})],b.prototype,"section",2),u([v({type:String,attribute:"hub-number"})],b.prototype,"hubNumber",2),u([v({attribute:!1})],b.prototype,"flow",2),u([v({attribute:!1})],b.prototype,"hours",2),u([v({attribute:!1})],b.prototype,"inventory",2),u([v({attribute:!1})],b.prototype,"routes",2),u([v({attribute:!1})],b.prototype,"lines",2),u([v({type:String,attribute:"selected-node-id"})],b.prototype,"selectedNodeId",2),u([v({type:Boolean})],b.prototype,"loading",2),u([v({type:Boolean})],b.prototype,"dirty",2),u([v({type:String})],b.prototype,"connection",2),u([v({type:String})],b.prototype,"token",2),u([v({attribute:!1})],b.prototype,"tokenManager",2),u([v({type:String,attribute:"phone-api-base"})],b.prototype,"phoneApiBase",2),u([v({type:String,attribute:"error-message"})],b.prototype,"errorMessage",2),b=u([Q("dc-phone-hub")],b);var $3={voice:"phone",sms:"sms",mms:"image",fax:"fax"};function G3(l){return l>0?`$${(l/100).toFixed(2)}/mo`:"Carrier rate"}function _0(l){let c=[l.locality,l.region].filter(Boolean).join(", "),a=l.type==="tollfree"?"Toll-free":"Local";return c?`${c} \xB7 ${a}`:a}var w=class extends y{constructor(){super(...arguments);this.areaCode="";this.capabilities="voice,sms";this.status="idle";this.numbers=[];this.selectedId="";this.token="";this.tokenManager=null;this.phoneApiBase="";this.lineId="";this.voiceIvrId="";this.errorMessage="";this.query="";this.http=f2()}get capList(){return this.capabilities.split(",").map(a=>a.trim()).filter(a=>["voice","sms","mms","fax"].includes(a))}emit(a,e){this.dispatchEvent(new CustomEvent(a,{detail:e,bubbles:!0,composed:!0}))}hasAuth(){return!!this.tokenManager||!!this.token}authed(a){return this.tokenManager?this.tokenManager.withAuthRetry(e=>a(G(e))):a(G(this.token))}fail(a,e){let r=q(a,e);this.errorMessage=r.message,this.emit("dc-error",{code:r.code,message:r.message,reason:r.reason})}async search(){let a=this.query||this.areaCode;if(this.emit("dc-search",{areaCode:a,capabilities:this.capList}),!this.hasAuth()){this.errorMessage="A site token is required to search numbers. Call DropCowboy.phoneHub.init({ token }) first.";return}this.status="searching",this.errorMessage="";let e={country_iso:"US",pattern:String(a).replace(/\D/g,""),services:this.capabilities,limit:10};try{let r=await this.authed(n=>this.http.post(f1(this.phoneApiBase||T),e,n)),s=$(r,"numbers"),i=[];for(let n=0;n<s.length;n++)i.push(m1(s[n],this.capabilities));this.numbers=i,this.status=i.length?"results":"empty"}catch(r){this.fail(r,"Number search failed"),this.status="empty"}}async buy(a){let e=a.priceCents>0?" It costs "+G3(a.priceCents)+".":" Your carrier bills for it.";if(!M2("Get "+(a.display||a.number)+" on your account?"+e))return;if(this.selectedId=a.id,this.emit("dc-provision",{number:a}),!this.hasAuth()){this.errorMessage="A site token is required to get a number. Call DropCowboy.phoneHub.init({ token }) first.";return}this.status="purchasing",this.errorMessage="";let r=this.phoneApiBase||T,s=this.lineId||this.voiceIvrId,i={number:a.number,services:this.capabilities};s&&(i.voice_ivr_id=s);try{await this.authed(o=>this.http.post(t1(r),i,o))}catch(o){this.fail(o,"Number rent failed"),this.status="results";return}let n=s?await this.assignToLine(r,a.number,s):!1;this.status="purchased",this.emit("dc-number-purchased",{number:a,lineId:n?s:null})}async assignToLine(a,e,r){let s=this.http.put;if(!s)return!1;try{return await this.authed(i=>s(n2(a,e),{voice_ivr_id:r},i)),!0}catch(i){let n=q(i,"Line assignment failed");return this.errorMessage="The number is on your account but could not be assigned to the line: "+n.message,this.emit("dc-error",{code:n.code,message:this.errorMessage,reason:n.reason}),!1}}portal(a){t2(a),this.emit("dc-open-portal",{hash:a})}render(){return t`
      <section class="panel dc-panel" role="region" aria-label="Get a phone number">
        <header class="dc-header">
          <div class="dc-h-left">
            <div>
              <div class="dc-title">Get a number</div>
              <div class="dc-subtitle">Local &amp; toll-free · instantly provisioned</div>
            </div>
          </div>
        </header>
        ${this.status==="purchased"||this.status==="purchasing"?this.renderDone():t`
              <div class="search">
                <input
                  type="text"
                  inputmode="numeric"
                  placeholder="Area code or city — e.g. 415"
                  aria-label="Area code or city"
                  .value=${this.query||this.areaCode}
                  @input=${a=>this.query=a.target.value}
                  @keydown=${a=>{a.key==="Enter"&&this.search()}}
                />
                <button class="dc-btn" @click=${()=>this.search()}>Search</button>
              </div>
              ${this.errorMessage?t`<div class="err" role="alert">${this.errorMessage}</div>`:M}
              <div class="caps" role="group" aria-label="Required capabilities">
                ${["voice","sms","mms","fax"].map(a=>t`<span class="cap ${this.capList.includes(a)?"on":""}">
                    ${A($3[a])} ${a.toUpperCase()}
                  </span>`)}
              </div>
              ${this.renderBody()}
            `}
      </section>
    `}renderBody(){return this.status==="searching"?t`
        <div class="list skeleton" aria-busy="true" aria-label="Searching for numbers">
          ${[0,1,2].map(()=>t`<div class="row">
              <div class="grow">
                <div class="sk" style="width:150px;height:14px"></div>
                <div class="sk" style="width:110px;height:10px;margin-top:7px"></div>
              </div>
              <div class="sk" style="width:64px;height:30px"></div>
            </div>`)}
        </div>
      `:this.status==="empty"?t`
        <div class="state">
          <div class="big">${A("search")}</div>
          No numbers match that search.<br />Try a nearby area code or drop a capability filter.
        </div>
      `:this.status==="results"&&this.numbers.length?t`
        <div class="list">
          ${A2(this.numbers,a=>a.id,a=>t`
              <div class="row">
                <div class="grow">
                  <div class="num">${a.display}</div>
                  <div class="meta">
                    ${_0(a)}
                  </div>
                </div>
                <div class="glyphs" aria-label="Capabilities: ${a.capabilities.join(", ")}">
                  ${a.capabilities.map(e=>t`<span title=${e}>${A($3[e])}</span>`)}
                </div>
                <span class="price">${G3(a.priceCents)}</span>
                <button class="dc-btn buy" aria-label="Get it: ${a.display||a.number}" @click=${()=>this.buy(a)}>
                  Get it
                </button>
              </div>
            `)}
        </div>
      `:t`
      <div class="state">
        <div class="big">${A("phone")}</div>
        Search by area code or city to see available numbers.
      </div>
    `}renderDone(){let a=this.numbers.find(r=>r.id===this.selectedId)??this.numbers[0],e=this.status==="purchasing";return t`
      <div class="done" aria-live="polite">
        ${e?t`
              <div class="check" style="background:var(--dc-primary-soft);color:var(--dc-primary-color)">
                <span class="spin" style="margin:0"></span>
              </div>
              <div class="num">${a?.display??""}</div>
              <div class="meta">Provisioning your number…</div>
            `:t`
              <div class="check">${A("check")}</div>
              <div class="num">${a?.display??""}</div>
              <div class="meta">Live on BYOC. E911 and CNAM have no public embed APIs — finish those in the portal.</div>
              ${this.errorMessage?t`<div class="err" role="alert">${this.errorMessage}</div>`:M}
              <button class="dc-btn" @click=${()=>this.portal("#/phone-hub")}>
                Set up routing &amp; E911
              </button>
              <button class="dc-btn dc-secondary" style="margin-top:8px" @click=${()=>this.portal("#/trust-center")}>
                Open Trust Center
              </button>
            `}
      </div>
    `}};w.styles=[y.styles,P`
      :host {
        display: block;
        width: 420px;
        max-width: 100%;
      }
      .panel {
        width: 100%;
      }
      .search {
        display: flex;
        gap: 8px;
        padding: 14px;
        border-bottom: 1px solid var(--dc-border-color);
        background: var(--dc-surface-color);
      }
      .search input {
        flex: 1;
        min-width: 0;
        font: inherit;
        padding: 9px 11px;
        border: 1px solid var(--dc-border-color);
        border-radius: var(--dc-radius-sm);
        background: var(--dc-bg-color);
        color: var(--dc-text-color);
      }
      .search input:focus-visible {
        outline: 2px solid var(--dc-primary-color);
        outline-offset: -1px;
      }
      .caps {
        display: flex;
        gap: 6px;
        padding: 10px 14px 0;
        flex-wrap: wrap;
      }
      .cap {
        font-size: var(--dc-font-size-xs);
        font-weight: 600;
        border: 1px solid var(--dc-border-color);
        border-radius: 999px;
        padding: 4px 10px;
        color: var(--dc-text-muted);
        background: var(--dc-bg-color);
      }
      .cap.on {
        border-color: var(--dc-primary-color);
        color: var(--dc-primary-color);
        background: var(--dc-primary-soft);
      }
      .list {
        display: flex;
        flex-direction: column;
      }
      .row {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 13px 14px;
        border-bottom: 1px solid var(--dc-border-color);
      }
      .row:last-child {
        border-bottom: 0;
      }
      .row .num {
        font-weight: 700;
        font-variant-numeric: tabular-nums;
      }
      .row .meta {
        font-size: var(--dc-font-size-sm);
        color: var(--dc-text-muted);
      }
      .row .grow {
        flex: 1;
        min-width: 0;
      }
      .row .glyphs {
        display: flex;
        gap: 4px;
        font-size: var(--dc-font-size-sm);
      }
      .row .price {
        font-size: var(--dc-font-size-sm);
        color: var(--dc-text-muted);
        font-variant-numeric: tabular-nums;
      }
      .buy {
        flex-shrink: 0;
      }
      .skeleton .row {
        pointer-events: none;
      }
      .sk {
        background: var(--dc-surface-2);
        border-radius: 6px;
        animation: shimmer 1.4s ease-in-out infinite;
      }
      @keyframes shimmer {
        0%,
        100% {
          opacity: 0.55;
        }
        50% {
          opacity: 1;
        }
      }
      .state {
        padding: 32px 20px;
        text-align: center;
        color: var(--dc-text-muted);
        font-size: var(--dc-font-size-sm);
      }
      .state .big {
        font-size: 28px;
        margin-bottom: 8px;
      }
      .done {
        padding: 28px 20px;
        text-align: center;
      }
      .done .check {
        width: 52px;
        height: 52px;
        margin: 0 auto 12px;
        border-radius: 50%;
        background: var(--dc-online-soft);
        color: var(--dc-online-text);
        display: grid;
        place-items: center;
        font-size: 24px;
      }
      .done .num {
        font-size: 18px;
        font-weight: 700;
      }
      .done .meta {
        color: var(--dc-text-muted);
        font-size: var(--dc-font-size-sm);
        margin-top: 4px;
      }
      .done .dc-btn {
        margin-top: 16px;
      }
      .err {
        padding: 10px 14px;
        color: var(--dc-danger-text);
        font-size: var(--dc-font-size-sm);
      }
      .spin {
        width: 14px;
        height: 14px;
        border-radius: 50%;
        border: 2px solid currentColor;
        border-right-color: transparent;
        animation: spin 0.8s linear infinite;
        display: inline-block;
        vertical-align: -2px;
        margin-right: 6px;
      }
      @keyframes spin {
        to {
          transform: rotate(360deg);
        }
      }
      @media (max-width: 480px) {
        :host {
          width: 100%;
        }
      }
    `],u([v({type:String,attribute:"area-code"})],w.prototype,"areaCode",2),u([v({type:String})],w.prototype,"capabilities",2),u([v({type:String})],w.prototype,"status",2),u([v({attribute:!1})],w.prototype,"numbers",2),u([v({type:String,attribute:"selected-id"})],w.prototype,"selectedId",2),u([v({type:String})],w.prototype,"token",2),u([v({attribute:!1})],w.prototype,"tokenManager",2),u([v({type:String,attribute:"phone-api-base"})],w.prototype,"phoneApiBase",2),u([v({type:String,attribute:"line-id"})],w.prototype,"lineId",2),u([v({type:String,attribute:"voice-ivr-id"})],w.prototype,"voiceIvrId",2),u([v({type:String,attribute:"error-message"})],w.prototype,"errorMessage",2),u([W1()],w.prototype,"query",2),w=u([Q("dc-number-picker")],w);var x=B2(),I3=b1({selector:"dc-phone-hub, dc-number-picker",apply:function(l,c){l.phoneApiBase||(l.phoneApiBase=c.settings.phoneApiBase),S1(l,c)}});function U0(l){return typeof l=="string"?l:l&&(l.display||l.number||l.id)||"this number"}var M1={init:function(l){return x.init(l).then(function(){I3.start(x.getTokenManager(),{phoneApiBase:x.phoneApiBase})})},setTheme:function(l){x.setTheme(l)},addErrorListener:function(l){return x.addErrorListener(l)},addNumberPurchasedListener:function(l){return x.addNumberPurchasedListener(l)},setToken:function(l){return x.setToken(l)},getTokenManager:function(){return x.getTokenManager()},searchNumbers:function(l){return x.searchNumbers(l)},rentNumber:function(l,c){return!x.sandbox&&!M2("Get "+U0(l)+" on your account?")?Promise.resolve(null):x.rentNumber(l,c)},updateNumber:function(l,c){return x.updateNumber(l,c)},assignNumberToLine:function(l,c){return x.assignNumberToLine(l,c)},listNumbers:function(){return x.listNumbers()},listIvrs:function(){return x.listIvrs()},listLines:function(){return x.listLines()},getLine:function(l){return x.getLine(l)},createLine:function(l){return x.createLine(l)},updateLine:function(l,c){return x.updateLine(l,c)},deleteLine:function(l){return x.deleteLine(l)},assignLineNumber:function(l,c){return x.assignLineNumber(l,c)},setDefaultLine:function(l,c){return x.setDefaultLine(l,c)},loadHub:function(){return x.loadHub()},openHub:function(l){return x.openHub(l)},openNumberPicker:function(l){return x.openNumberPicker(l)},openInPortal:function(l){return x.openInPortal(l)},close:function(){return I3.stop(),x.close()},create:function(){return M1},_bootstrap:function(){},_loaded:!0};x1({bundle:"phone-hub",namespaces:{phoneHub:M1},globals:{DropCowboyPhoneHub:M1}});})();
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

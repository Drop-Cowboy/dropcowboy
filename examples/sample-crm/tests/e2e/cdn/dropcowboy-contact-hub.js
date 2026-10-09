/*! Drop Cowboy Building Blocks contacts (@dropcowboy/embed-contacts 0.0.0). Do not edit. */
"use strict";(()=>{var I1=Object.defineProperty;var U0=Object.getOwnPropertyDescriptor;var h=(l,c)=>()=>(l&&(c=l(l=0)),c);var q0=(l,c)=>{for(var a in c)I1(l,a,{get:c[a],enumerable:!0})};var M=(l,c,a,e)=>{for(var s=e>1?void 0:e?U0(c,a):c,r=l.length-1,i;r>=0;r--)(i=l[r])&&(s=(e?i(c,a,s):i(s))||s);return e&&s&&I1(c,a,s),s};var k2,y2,Q2,Q1,m2,J1,B,Y1,J2,Y2=h(()=>{"use strict";k2=globalThis,y2=k2.ShadowRoot&&(k2.ShadyCSS===void 0||k2.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Q2=Symbol(),Q1=new WeakMap,m2=class{constructor(c,a,e){if(this._$cssResult$=!0,e!==Q2)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=c,this.t=a}get styleSheet(){let c=this.o,a=this.t;if(y2&&c===void 0){let e=a!==void 0&&a.length===1;e&&(c=Q1.get(a)),c===void 0&&((this.o=c=new CSSStyleSheet).replaceSync(this.cssText),e&&Q1.set(a,c))}return c}toString(){return this.cssText}},J1=l=>new m2(typeof l=="string"?l:l+"",void 0,Q2),B=(l,...c)=>{let a=l.length===1?l[0]:c.reduce((e,s,r)=>e+(i=>{if(i._$cssResult$===!0)return i.cssText;if(typeof i=="number")return i;throw Error("Value passed to 'css' function must be a 'css' function result: "+i+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+l[r+1],l[0]);return new m2(a,l,Q2)},Y1=(l,c)=>{if(y2)l.adoptedStyleSheets=c.map(a=>a instanceof CSSStyleSheet?a:a.styleSheet);else for(let a of c){let e=document.createElement("style"),s=k2.litNonce;s!==void 0&&e.setAttribute("nonce",s),e.textContent=a.cssText,l.appendChild(e)}},J2=y2?l=>l:l=>l instanceof CSSStyleSheet?(c=>{let a="";for(let e of c.cssRules)a+=e.cssText;return J1(a)})(l):l});var I0,W0,O0,V0,j0,K0,A2,Z1,X0,Q0,z2,p2,T2,c4,G,d2=h(()=>{"use strict";Y2();Y2();({is:I0,defineProperty:W0,getOwnPropertyDescriptor:O0,getOwnPropertyNames:V0,getOwnPropertySymbols:j0,getPrototypeOf:K0}=Object),A2=globalThis,Z1=A2.trustedTypes,X0=Z1?Z1.emptyScript:"",Q0=A2.reactiveElementPolyfillSupport,z2=(l,c)=>l,p2={toAttribute(l,c){switch(c){case Boolean:l=l?X0:null;break;case Object:case Array:l=l==null?l:JSON.stringify(l)}return l},fromAttribute(l,c){let a=l;switch(c){case Boolean:a=l!==null;break;case Number:a=l===null?null:Number(l);break;case Object:case Array:try{a=JSON.parse(l)}catch{a=null}}return a}},T2=(l,c)=>!I0(l,c),c4={attribute:!0,type:String,converter:p2,reflect:!1,useDefault:!1,hasChanged:T2};Symbol.metadata??=Symbol("metadata"),A2.litPropertyMetadata??=new WeakMap;G=class extends HTMLElement{static addInitializer(c){this._$Ei(),(this.l??=[]).push(c)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(c,a=c4){if(a.state&&(a.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(c)&&((a=Object.create(a)).wrapped=!0),this.elementProperties.set(c,a),!a.noAccessor){let e=Symbol(),s=this.getPropertyDescriptor(c,e,a);s!==void 0&&W0(this.prototype,c,s)}}static getPropertyDescriptor(c,a,e){let{get:s,set:r}=O0(this.prototype,c)??{get(){return this[a]},set(i){this[a]=i}};return{get:s,set(i){let n=s?.call(this);r?.call(this,i),this.requestUpdate(c,n,e)},configurable:!0,enumerable:!0}}static getPropertyOptions(c){return this.elementProperties.get(c)??c4}static _$Ei(){if(this.hasOwnProperty(z2("elementProperties")))return;let c=K0(this);c.finalize(),c.l!==void 0&&(this.l=[...c.l]),this.elementProperties=new Map(c.elementProperties)}static finalize(){if(this.hasOwnProperty(z2("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(z2("properties"))){let a=this.properties,e=[...V0(a),...j0(a)];for(let s of e)this.createProperty(s,a[s])}let c=this[Symbol.metadata];if(c!==null){let a=litPropertyMetadata.get(c);if(a!==void 0)for(let[e,s]of a)this.elementProperties.set(e,s)}this._$Eh=new Map;for(let[a,e]of this.elementProperties){let s=this._$Eu(a,e);s!==void 0&&this._$Eh.set(s,a)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(c){let a=[];if(Array.isArray(c)){let e=new Set(c.flat(1/0).reverse());for(let s of e)a.unshift(J2(s))}else c!==void 0&&a.push(J2(c));return a}static _$Eu(c,a){let e=a.attribute;return e===!1?void 0:typeof e=="string"?e:typeof c=="string"?c.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(c=>this.enableUpdating=c),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(c=>c(this))}addController(c){(this._$EO??=new Set).add(c),this.renderRoot!==void 0&&this.isConnected&&c.hostConnected?.()}removeController(c){this._$EO?.delete(c)}_$E_(){let c=new Map,a=this.constructor.elementProperties;for(let e of a.keys())this.hasOwnProperty(e)&&(c.set(e,this[e]),delete this[e]);c.size>0&&(this._$Ep=c)}createRenderRoot(){let c=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Y1(c,this.constructor.elementStyles),c}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(c=>c.hostConnected?.())}enableUpdating(c){}disconnectedCallback(){this._$EO?.forEach(c=>c.hostDisconnected?.())}attributeChangedCallback(c,a,e){this._$AK(c,e)}_$ET(c,a){let e=this.constructor.elementProperties.get(c),s=this.constructor._$Eu(c,e);if(s!==void 0&&e.reflect===!0){let r=(e.converter?.toAttribute!==void 0?e.converter:p2).toAttribute(a,e.type);this._$Em=c,r==null?this.removeAttribute(s):this.setAttribute(s,r),this._$Em=null}}_$AK(c,a){let e=this.constructor,s=e._$Eh.get(c);if(s!==void 0&&this._$Em!==s){let r=e.getPropertyOptions(s),i=typeof r.converter=="function"?{fromAttribute:r.converter}:r.converter?.fromAttribute!==void 0?r.converter:p2;this._$Em=s;let n=i.fromAttribute(a,r.type);this[s]=n??this._$Ej?.get(s)??n,this._$Em=null}}requestUpdate(c,a,e,s=!1,r){if(c!==void 0){let i=this.constructor;if(s===!1&&(r=this[c]),e??=i.getPropertyOptions(c),!((e.hasChanged??T2)(r,a)||e.useDefault&&e.reflect&&r===this._$Ej?.get(c)&&!this.hasAttribute(i._$Eu(c,e))))return;this.C(c,a,e)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(c,a,{useDefault:e,reflect:s,wrapped:r},i){e&&!(this._$Ej??=new Map).has(c)&&(this._$Ej.set(c,i??a??this[c]),r!==!0||i!==void 0)||(this._$AL.has(c)||(this.hasUpdated||e||(a=void 0),this._$AL.set(c,a)),s===!0&&this._$Em!==c&&(this._$Eq??=new Set).add(c))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(a){Promise.reject(a)}let c=this.scheduleUpdate();return c!=null&&await c,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[s,r]of this._$Ep)this[s]=r;this._$Ep=void 0}let e=this.constructor.elementProperties;if(e.size>0)for(let[s,r]of e){let{wrapped:i}=r,n=this[s];i!==!0||this._$AL.has(s)||n===void 0||this.C(s,void 0,r,n)}}let c=!1,a=this._$AL;try{c=this.shouldUpdate(a),c?(this.willUpdate(a),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(a)):this._$EM()}catch(e){throw c=!1,this._$EM(),e}c&&this._$AE(a)}willUpdate(c){}_$AE(c){this._$EO?.forEach(a=>a.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(c)),this.updated(c)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(c){return!0}update(c){this._$Eq&&=this._$Eq.forEach(a=>this._$ET(a,this[a])),this._$EM()}updated(c){}firstUpdated(c){}};G.elementStyles=[],G.shadowRootOptions={mode:"open"},G[z2("elementProperties")]=new Map,G[z2("finalized")]=new Map,Q0?.({ReactiveElement:G}),(A2.reactiveElementVersions??=[]).push("2.1.2")});function t4(l,c){if(!e1(l)||!l.hasOwnProperty("raw"))throw Error("invalid template strings array");return l4!==void 0?l4.createHTML(c):c}function Y(l,c,a=l,e){if(c===W)return c;let s=e!==void 0?a._$Co?.[e]:a._$Cl,r=u2(c)?void 0:c._$litDirective$;return s?.constructor!==r&&(s?._$AO?.(!1),r===void 0?s=void 0:(s=new r(l),s._$AT(l,a,e)),e!==void 0?(a._$Co??=[])[e]=s:a._$Cl=s),s!==void 0&&(c=Y(l,s._$AS(l,c.values),s,e)),c}var c1,a4,P2,l4,a1,I,l1,J0,J,L2,u2,e1,n4,Z2,M2,e4,s4,X,r4,i4,f4,s1,m,l8,e8,W,u,o4,Q,m4,h2,B2,e2,Z,E2,F2,H2,R2,z4,Y0,p4,s2=h(()=>{"use strict";c1=globalThis,a4=l=>l,P2=c1.trustedTypes,l4=P2?P2.createPolicy("lit-html",{createHTML:l=>l}):void 0,a1="$lit$",I=`lit$${Math.random().toFixed(9).slice(2)}$`,l1="?"+I,J0=`<${l1}>`,J=document,L2=()=>J.createComment(""),u2=l=>l===null||typeof l!="object"&&typeof l!="function",e1=Array.isArray,n4=l=>e1(l)||typeof l?.[Symbol.iterator]=="function",Z2=`[ 	
\f\r]`,M2=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,e4=/-->/g,s4=/>/g,X=RegExp(`>|${Z2}(?:([^\\s"'>=/]+)(${Z2}*=${Z2}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),r4=/'/g,i4=/"/g,f4=/^(?:script|style|textarea|title)$/i,s1=l=>(c,...a)=>({_$litType$:l,strings:c,values:a}),m=s1(1),l8=s1(2),e8=s1(3),W=Symbol.for("lit-noChange"),u=Symbol.for("lit-nothing"),o4=new WeakMap,Q=J.createTreeWalker(J,129);m4=(l,c)=>{let a=l.length-1,e=[],s,r=c===2?"<svg>":c===3?"<math>":"",i=M2;for(let n=0;n<a;n++){let o=l[n],t,z,f=-1,p=0;for(;p<o.length&&(i.lastIndex=p,z=i.exec(o),z!==null);)p=i.lastIndex,i===M2?z[1]==="!--"?i=e4:z[1]!==void 0?i=s4:z[2]!==void 0?(f4.test(z[2])&&(s=RegExp("</"+z[2],"g")),i=X):z[3]!==void 0&&(i=X):i===X?z[0]===">"?(i=s??M2,f=-1):z[1]===void 0?f=-2:(f=i.lastIndex-z[2].length,t=z[1],i=z[3]===void 0?X:z[3]==='"'?i4:r4):i===i4||i===r4?i=X:i===e4||i===s4?i=M2:(i=X,s=void 0);let d=i===X&&l[n+1].startsWith("/>")?" ":"";r+=i===M2?o+J0:f>=0?(e.push(t),o.slice(0,f)+a1+o.slice(f)+I+d):o+I+(f===-2?n:d)}return[t4(l,r+(l[a]||"<?>")+(c===2?"</svg>":c===3?"</math>":"")),e]},h2=class l{constructor({strings:c,_$litType$:a},e){let s;this.parts=[];let r=0,i=0,n=c.length-1,o=this.parts,[t,z]=m4(c,a);if(this.el=l.createElement(t,e),Q.currentNode=this.el.content,a===2||a===3){let f=this.el.content.firstChild;f.replaceWith(...f.childNodes)}for(;(s=Q.nextNode())!==null&&o.length<n;){if(s.nodeType===1){if(s.hasAttributes())for(let f of s.getAttributeNames())if(f.endsWith(a1)){let p=z[i++],d=s.getAttribute(f).split(I),g=/([.?@])?(.*)/.exec(p);o.push({type:1,index:r,name:g[2],strings:d,ctor:g[1]==="."?E2:g[1]==="?"?F2:g[1]==="@"?H2:Z}),s.removeAttribute(f)}else f.startsWith(I)&&(o.push({type:6,index:r}),s.removeAttribute(f));if(f4.test(s.tagName)){let f=s.textContent.split(I),p=f.length-1;if(p>0){s.textContent=P2?P2.emptyScript:"";for(let d=0;d<p;d++)s.append(f[d],L2()),Q.nextNode(),o.push({type:2,index:++r});s.append(f[p],L2())}}}else if(s.nodeType===8)if(s.data===l1)o.push({type:2,index:r});else{let f=-1;for(;(f=s.data.indexOf(I,f+1))!==-1;)o.push({type:7,index:r}),f+=I.length-1}r++}}static createElement(c,a){let e=J.createElement("template");return e.innerHTML=c,e}};B2=class{constructor(c,a){this._$AV=[],this._$AN=void 0,this._$AD=c,this._$AM=a}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(c){let{el:{content:a},parts:e}=this._$AD,s=(c?.creationScope??J).importNode(a,!0);Q.currentNode=s;let r=Q.nextNode(),i=0,n=0,o=e[0];for(;o!==void 0;){if(i===o.index){let t;o.type===2?t=new e2(r,r.nextSibling,this,c):o.type===1?t=new o.ctor(r,o.name,o.strings,this,c):o.type===6&&(t=new R2(r,this,c)),this._$AV.push(t),o=e[++n]}i!==o?.index&&(r=Q.nextNode(),i++)}return Q.currentNode=J,s}p(c){let a=0;for(let e of this._$AV)e!==void 0&&(e.strings!==void 0?(e._$AI(c,e,a),a+=e.strings.length-2):e._$AI(c[a])),a++}},e2=class l{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(c,a,e,s){this.type=2,this._$AH=u,this._$AN=void 0,this._$AA=c,this._$AB=a,this._$AM=e,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let c=this._$AA.parentNode,a=this._$AM;return a!==void 0&&c?.nodeType===11&&(c=a.parentNode),c}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(c,a=this){c=Y(this,c,a),u2(c)?c===u||c==null||c===""?(this._$AH!==u&&this._$AR(),this._$AH=u):c!==this._$AH&&c!==W&&this._(c):c._$litType$!==void 0?this.$(c):c.nodeType!==void 0?this.T(c):n4(c)?this.k(c):this._(c)}O(c){return this._$AA.parentNode.insertBefore(c,this._$AB)}T(c){this._$AH!==c&&(this._$AR(),this._$AH=this.O(c))}_(c){this._$AH!==u&&u2(this._$AH)?this._$AA.nextSibling.data=c:this.T(J.createTextNode(c)),this._$AH=c}$(c){let{values:a,_$litType$:e}=c,s=typeof e=="number"?this._$AC(c):(e.el===void 0&&(e.el=h2.createElement(t4(e.h,e.h[0]),this.options)),e);if(this._$AH?._$AD===s)this._$AH.p(a);else{let r=new B2(s,this),i=r.u(this.options);r.p(a),this.T(i),this._$AH=r}}_$AC(c){let a=o4.get(c.strings);return a===void 0&&o4.set(c.strings,a=new h2(c)),a}k(c){e1(this._$AH)||(this._$AH=[],this._$AR());let a=this._$AH,e,s=0;for(let r of c)s===a.length?a.push(e=new l(this.O(L2()),this.O(L2()),this,this.options)):e=a[s],e._$AI(r),s++;s<a.length&&(this._$AR(e&&e._$AB.nextSibling,s),a.length=s)}_$AR(c=this._$AA.nextSibling,a){for(this._$AP?.(!1,!0,a);c!==this._$AB;){let e=a4(c).nextSibling;a4(c).remove(),c=e}}setConnected(c){this._$AM===void 0&&(this._$Cv=c,this._$AP?.(c))}},Z=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(c,a,e,s,r){this.type=1,this._$AH=u,this._$AN=void 0,this.element=c,this.name=a,this._$AM=s,this.options=r,e.length>2||e[0]!==""||e[1]!==""?(this._$AH=Array(e.length-1).fill(new String),this.strings=e):this._$AH=u}_$AI(c,a=this,e,s){let r=this.strings,i=!1;if(r===void 0)c=Y(this,c,a,0),i=!u2(c)||c!==this._$AH&&c!==W,i&&(this._$AH=c);else{let n=c,o,t;for(c=r[0],o=0;o<r.length-1;o++)t=Y(this,n[e+o],a,o),t===W&&(t=this._$AH[o]),i||=!u2(t)||t!==this._$AH[o],t===u?c=u:c!==u&&(c+=(t??"")+r[o+1]),this._$AH[o]=t}i&&!s&&this.j(c)}j(c){c===u?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,c??"")}},E2=class extends Z{constructor(){super(...arguments),this.type=3}j(c){this.element[this.name]=c===u?void 0:c}},F2=class extends Z{constructor(){super(...arguments),this.type=4}j(c){this.element.toggleAttribute(this.name,!!c&&c!==u)}},H2=class extends Z{constructor(c,a,e,s,r){super(c,a,e,s,r),this.type=5}_$AI(c,a=this){if((c=Y(this,c,a,0)??u)===W)return;let e=this._$AH,s=c===u&&e!==u||c.capture!==e.capture||c.once!==e.once||c.passive!==e.passive,r=c!==u&&(e===u||s);s&&this.element.removeEventListener(this.name,this,e),r&&this.element.addEventListener(this.name,this,c),this._$AH=c}handleEvent(c){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,c):this._$AH.handleEvent(c)}},R2=class{constructor(c,a,e){this.element=c,this.type=6,this._$AN=void 0,this._$AM=a,this.options=e}get _$AU(){return this._$AM._$AU}_$AI(c){Y(this,c)}},z4={M:a1,P:I,A:l1,C:1,L:m4,R:B2,D:n4,V:Y,I:e2,H:Z,N:F2,U:H2,B:E2,F:R2},Y0=c1.litHtmlPolyfillSupport;Y0?.(h2,e2),(c1.litHtmlVersions??=[]).push("3.3.3");p4=(l,c,a)=>{let e=a?.renderBefore??c,s=e._$litPart$;if(s===void 0){let r=a?.renderBefore??null;e._$litPart$=s=new e2(c.insertBefore(L2(),r),r,void 0,a??{})}return s._$AI(l),s}});var r1,j,Z0,d4=h(()=>{"use strict";d2();d2();s2();s2();r1=globalThis,j=class extends G{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let c=super.createRenderRoot();return this.renderOptions.renderBefore??=c.firstChild,c}update(c){let a=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(c),this._$Do=p4(a,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return W}};j._$litElement$=!0,j.finalized=!0,r1.litElementHydrateSupport?.({LitElement:j});Z0=r1.litElementPolyfillSupport;Z0?.({LitElement:j});(r1.litElementVersions??=[]).push("4.2.2")});var M4=h(()=>{"use strict";});var O=h(()=>{"use strict";d2();s2();d4();M4()});var L4,U,u4=h(()=>{"use strict";L4=(l,c)=>{customElements.get(l)||customElements.define(l,c)},U=l=>(c,a)=>{a!==void 0?a.addInitializer(()=>{L4(l,c)}):L4(l,c)}});function L(l){return(c,a)=>typeof a=="object"?a6(l,c,a):((e,s,r)=>{let i=s.hasOwnProperty(r);return s.constructor.createProperty(r,e),i?Object.getOwnPropertyDescriptor(s,r):void 0})(l,c,a)}var c6,a6,i1=h(()=>{"use strict";d2();c6={attribute:!0,type:String,converter:p2,reflect:!1,hasChanged:T2},a6=(l=c6,c,a)=>{let{kind:e,metadata:s}=a,r=globalThis.litPropertyMetadata.get(s);if(r===void 0&&globalThis.litPropertyMetadata.set(s,r=new Map),e==="setter"&&((l=Object.create(l)).wrapped=!0),r.set(a.name,l),e==="accessor"){let{name:i}=a;return{set(n){let o=c.get.call(this);c.set.call(this,n),this.requestUpdate(i,o,l,!0,n)},init(n){return n!==void 0&&this.C(i,void 0,l,n),n}}}if(e==="setter"){let{name:i}=a;return function(n){let o=this[i];c.call(this,n),this.requestUpdate(i,o,l,!0,n)}}throw Error("Unsupported decorator location: "+e)}});function h4(l){return L({...l,state:!0,attribute:!1})}var v4=h(()=>{"use strict";i1();});var C4=h(()=>{"use strict";});var r2=h(()=>{"use strict";});var g4=h(()=>{"use strict";r2();});var x4=h(()=>{"use strict";r2();});var S4=h(()=>{"use strict";r2();});var N4=h(()=>{"use strict";r2();});var b4=h(()=>{"use strict";r2();});var i2=h(()=>{"use strict";u4();i1();v4();C4();g4();x4();S4();N4();b4()});var o1,n1=h(()=>{"use strict";O();o1=B`
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
`});function k4(l,c){let a=Object.keys(c),e="";for(let s=0;s<a.length;s++)e+=a[s]+":"+c[a[s]]+";";return l+"{"+e+"}"}function f1(l){let c=l||(typeof document<"u"?document:null);if(!c||!c.head||typeof c.createElement!="function"||c.querySelector("style["+w4+"]"))return!1;let a=c.createElement("style");return a.setAttribute(w4,""),a.textContent=s6,c.head.insertBefore(a,c.head.firstChild),!0}var w4,l6,e6,s6,t1=h(()=>{"use strict";w4="data-dc-tokens",l6={"--dc-primary-color":"#2563eb","--dc-primary-hover":"#1d4ed8","--dc-primary-text":"#ffffff","--dc-primary-soft":"#eaf1fe","--dc-bg-color":"#ffffff","--dc-surface-color":"#f7f8fa","--dc-surface-2":"#eef0f4","--dc-border-color":"#ebedf0","--dc-text-color":"#1a1d21","--dc-text-muted":"#5c6370","--dc-text-light":"#646b78","--dc-agent-bubble-bg":"#f1f3f6","--dc-agent-bubble-text":"#1a1d21","--dc-visitor-bubble-bg":"var(--dc-primary-color)","--dc-visitor-bubble-text":"var(--dc-primary-text)","--dc-online":"#22c55e","--dc-online-soft":"#e7f8ed","--dc-online-text":"#15803d","--dc-danger":"#ef4444","--dc-danger-soft":"#fdecec","--dc-danger-text":"#b91c1c","--dc-warning":"#f59e0b","--dc-warning-soft":"#fef3e2","--dc-warning-text":"#b45309","--dc-info":"#0ea5e9","--dc-info-soft":"#e6f6fe","--dc-info-text":"#0369a1","--dc-shadow":"0 8px 24px rgba(15, 23, 42, 0.08)","--dc-shadow-sm":"0 1px 2px rgba(15, 23, 42, 0.06)","--dc-radius":"12px","--dc-radius-sm":"8px","--dc-radius-bubble":"12px","--dc-font-family":'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',"--dc-font-size":"14px","--dc-font-size-sm":"12px","--dc-font-size-xs":"11px","--dc-transition":"0.15s ease","--dc-ease-panel":"cubic-bezier(0.16, 1, 0.3, 1)"},e6={"--dc-primary-color":"#60a5fa","--dc-primary-hover":"#93c5fd","--dc-primary-text":"#0f172a","--dc-primary-soft":"#1e2a44","--dc-bg-color":"#0f1419","--dc-surface-color":"#1a1f26","--dc-surface-2":"#242b33","--dc-border-color":"#2e3640","--dc-text-color":"#f3f4f6","--dc-text-muted":"#aab2bd","--dc-text-light":"#959ca6","--dc-agent-bubble-bg":"#2e3138","--dc-agent-bubble-text":"#f3f4f6","--dc-online-soft":"#14321f","--dc-online-text":"#4ade80","--dc-danger-soft":"#3a1d1d","--dc-danger-text":"#fca5a5","--dc-warning-soft":"#3a2c12","--dc-warning-text":"#fcd34d","--dc-info-soft":"#12303d","--dc-info-text":"#7dd3fc"};s6=k4(":where(:root)",l6)+k4(':where([data-dc-theme="dark"])',e6)});var b,m1=h(()=>{"use strict";O();n1();t1();b=class extends j{connectedCallback(){f1(this.ownerDocument),super.connectedCallback()}announce(c){let a=this.renderRoot?.querySelector("[data-dc-live]");a||(a=document.createElement("div"),a.setAttribute("data-dc-live",""),a.setAttribute("aria-live","polite"),a.setAttribute("role","status"),a.style.cssText="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;",this.renderRoot?.appendChild(a)),a.textContent="",requestAnimationFrame(()=>{a&&(a.textContent=c)})}};b.styles=o1});var r6,c2,y4=h(()=>{"use strict";O();i2();m1();r6={reconnecting:{tone:"warning",text:"Reconnecting\u2026 live updates will resume automatically.",spinner:!0},offline:{tone:"danger",text:"You're offline. We'll reconnect and sync as soon as your connection returns."},"other-tab":{tone:"info",text:"This session is active in another tab. Calls and the dialer run there.",action:"Use it here",event:"dc-resume-here"},"session-expiring":{tone:"warning",text:"Your secure session expires soon.",action:"Stay signed in",event:"dc-refresh-session"},"session-expired":{tone:"danger",text:"Your session expired for security. Sign in again to continue.",action:"Sign in",event:"dc-reauth"}},c2=class extends b{constructor(){super(...arguments);this.kind="reconnecting"}render(){let a=r6[this.kind],e=a.tone==="danger"?"alert":"status";return m`
      <div class="banner ${a.tone}" role=${e}>
        ${a.spinner?m`<span class="spin"></span>`:m`<span class="dot"></span>`}
        <span class="txt">${a.text}</span>
        ${a.action?m`<button class="act" @click=${()=>this.emit(a.event??"dc-action")}>${a.action}</button>`:u}
      </div>
    `}emit(a){this.dispatchEvent(new CustomEvent(a,{bubbles:!0,composed:!0}))}};c2.styles=[b.styles,B`
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
    `],M([L({type:String})],c2.prototype,"kind",2),c2=M([U("dc-system-banner")],c2)});var A4,T4=h(()=>{"use strict";A4={prefix:"far",iconName:"circle",icon:[512,512,[128308,128309,128992,128993,128994,128995,128996,9679,9898,9899,11044,61708,61915],"f111","M464 256a208 208 0 1 0 -416 0 208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0 256 256 0 1 1 -512 0z"]}});var P4,B4,E4,F4,H4,R4,D4,_4,U4,q4,$4,G4,I4,W4,O4,V4,j4,K4,X4,Q4,J4,Y4,Z4,c3,a3,l3,e3,s3,r3,i3,o3,n3,f3,t3,m3,z3,p3,d3,M3,L3,u3,h3,v3,C3,g3,x3,S3,N3,b3,w3,k3,y3,A3,T3,P3,B3,E3,F3,H3,R3,D3,_3,U3,q3,$3,G3,I3,W3,O3,V3,j3,K3,X3,Q3,J3,Y3,Z3,c0,a0=h(()=>{"use strict";P4={prefix:"fas",iconName:"minus",icon:[448,512,[8211,8722,10134,"subtract"],"f068","M0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32z"]},B4={prefix:"fas",iconName:"microphone-slash",icon:[576,512,[],"f131","M41-24.9c-9.4-9.4-24.6-9.4-33.9 0S-2.3-.3 7 9.1l528 528c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9L424.7 358.8C458.9 324.2 480 276.6 480 224l0-40c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 40c0 39.3-15.7 74.9-41.3 100.9L356.8 291C373.6 273.7 384 250 384 224l0-128c0-53-43-96-96-96s-96 43-96 96l0 30.2-151-151zm298.3 434l-41.4-41.4c-3.3 .2-6.5 .3-9.8 .3-79.5 0-144-64.5-144-144l0-10.2-43.6-43.6c-2.8 3.9-4.4 8.7-4.4 13.8l0 40c0 97.9 73.3 178.7 168 190.5l0 49.5-48 0c-13.3 0-24 10.7-24 24s10.7 24 24 24l144 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-48 0 0-49.5c9.3-1.2 18.4-3 27.3-5.4z"]},E4={prefix:"fas",iconName:"comment-sms",icon:[512,512,["sms"],"f7cd","M256 480c141.4 0 256-107.5 256-240S397.4 0 256 0 0 107.5 0 240c0 54.3 19.2 104.3 51.6 144.5L2.8 476.8c-4.8 9-3.3 20 3.6 27.5s17.8 9.8 27.1 5.8l118.4-50.7C183.7 472.6 218.9 480 256 480zM140.8 172.8l19.2 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-19.2 0c-5.3 0-9.6 4.3-9.6 9.6s4.3 9.6 9.6 9.6c23 0 41.6 18.6 41.6 41.6s-18.6 41.6-41.6 41.6l-25.6 0c-8.8 0-16-7.2-16-16s7.2-16 16-16l25.6 0c5.3 0 9.6-4.3 9.6-9.6s-4.3-9.6-9.6-9.6c-23 0-41.6-18.6-41.6-41.6s18.6-41.6 41.6-41.6zm188.8 41.6c0-23 18.6-41.6 41.6-41.6l19.2 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-19.2 0c-5.3 0-9.6 4.3-9.6 9.6s4.3 9.6 9.6 9.6c23 0 41.6 18.6 41.6 41.6s-18.6 41.6-41.6 41.6l-25.6 0c-8.8 0-16-7.2-16-16s7.2-16 16-16l25.6 0c5.3 0 9.6-4.3 9.6-9.6s-4.3-9.6-9.6-9.6c-23 0-41.6-18.6-41.6-41.6zm-98.3-33.8l24.7 41.1 24.7-41.1c3.7-6.2 11.1-9.1 18-7.2s11.7 8.2 11.7 15.4l0 102.4c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-44.6-8.7 14.5c-2.9 4.8-8.1 7.8-13.7 7.8s-10.8-3-13.7-7.8l-8.7-14.5 0 44.6c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-102.4c0-7.2 4.8-13.5 11.7-15.4s14.3 1 18 7.2z"]},F4={prefix:"fas",iconName:"envelope",icon:[512,512,[128386,9993,61443],"f0e0","M48 64c-26.5 0-48 21.5-48 48 0 15.1 7.1 29.3 19.2 38.4l208 156c17.1 12.8 40.5 12.8 57.6 0l208-156c12.1-9.1 19.2-23.3 19.2-38.4 0-26.5-21.5-48-48-48L48 64zM0 196L0 384c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-188-198.4 148.8c-34.1 25.6-81.1 25.6-115.2 0L0 196z"]},H4={prefix:"fas",iconName:"bell",icon:[448,512,[128276,61602],"f0f3","M224 0c-17.7 0-32 14.3-32 32l0 3.2C119 50 64 114.6 64 192l0 21.7c0 48.1-16.4 94.8-46.4 132.4L7.8 358.3C2.7 364.6 0 372.4 0 380.5 0 400.1 15.9 416 35.5 416l376.9 0c19.6 0 35.5-15.9 35.5-35.5 0-8.1-2.7-15.9-7.8-22.2l-9.8-12.2C400.4 308.5 384 261.8 384 213.7l0-21.7c0-77.4-55-142-128-156.8l0-3.2c0-17.7-14.3-32-32-32zM162 464c7.1 27.6 32.2 48 62 48s54.9-20.4 62-48l-124 0z"]},R4={prefix:"fas",iconName:"calendar-days",icon:[448,512,["calendar-alt"],"f073","M128 0c17.7 0 32 14.3 32 32l0 32 128 0 0-32c0-17.7 14.3-32 32-32s32 14.3 32 32l0 32 32 0c35.3 0 64 28.7 64 64l0 288c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64L0 128C0 92.7 28.7 64 64 64l32 0 0-32c0-17.7 14.3-32 32-32zM64 240l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm128 0l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0zM64 368l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0zm112 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16z"]},D4={prefix:"fas",iconName:"ellipsis",icon:[448,512,["ellipsis-h"],"f141","M0 256a56 56 0 1 1 112 0 56 56 0 1 1 -112 0zm168 0a56 56 0 1 1 112 0 56 56 0 1 1 -112 0zm224-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112z"]},_4={prefix:"fas",iconName:"magnifying-glass",icon:[512,512,[128269,"search"],"f002","M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376C296.3 401.1 253.9 416 208 416 93.1 416 0 322.9 0 208S93.1 0 208 0 416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"]},U4={prefix:"fas",iconName:"ban",icon:[512,512,[128683,"cancel"],"f05e","M367.2 412.5L99.5 144.8c-22.4 31.4-35.5 69.8-35.5 111.2 0 106 86 192 192 192 41.5 0 79.9-13.1 111.2-35.5zm45.3-45.3c22.4-31.4 35.5-69.8 35.5-111.2 0-106-86-192-192-192-41.5 0-79.9 13.1-111.2 35.5L412.5 367.2zM0 256a256 256 0 1 1 512 0 256 256 0 1 1 -512 0z"]},q4={prefix:"fas",iconName:"record-vinyl",icon:[512,512,[],"f8d9","M0 256a256 256 0 1 1 512 0 256 256 0 1 1 -512 0zm256-96a96 96 0 1 1 0 192 96 96 0 1 1 0-192zm0 240a144 144 0 1 0 0-288 144 144 0 1 0 0 288zm0-112a32 32 0 1 0 0-64 32 32 0 1 0 0 64z"]},$4={prefix:"fas",iconName:"palette",icon:[512,512,[127912],"f53f","M512 256c0 .9 0 1.8 0 2.7-.4 36.5-33.6 61.3-70.1 61.3L344 320c-26.5 0-48 21.5-48 48 0 3.4 .4 6.7 1 9.9 2.1 10.2 6.5 20 10.8 29.9 6.1 13.8 12.1 27.5 12.1 42 0 31.8-21.6 60.7-53.4 62-3.5 .1-7 .2-10.6 .2-141.4 0-256-114.6-256-256S114.6 0 256 0 512 114.6 512 256zM128 288a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm0-96a32 32 0 1 0 0-64 32 32 0 1 0 0 64zM288 96a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm96 96a32 32 0 1 0 0-64 32 32 0 1 0 0 64z"]},G4={prefix:"fas",iconName:"sitemap",icon:[512,512,[],"f0e8","M192 64c0-17.7 14.3-32 32-32l64 0c17.7 0 32 14.3 32 32l0 64c0 17.7-14.3 32-32 32l-8 0 0 64 120 0c39.8 0 72 32.2 72 72l0 56 8 0c17.7 0 32 14.3 32 32l0 64c0 17.7-14.3 32-32 32l-64 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l8 0 0-56c0-13.3-10.7-24-24-24l-120 0 0 80 8 0c17.7 0 32 14.3 32 32l0 64c0 17.7-14.3 32-32 32l-64 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l8 0 0-80-120 0c-13.3 0-24 10.7-24 24l0 56 8 0c17.7 0 32 14.3 32 32l0 64c0 17.7-14.3 32-32 32l-64 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l8 0 0-56c0-39.8 32.2-72 72-72l120 0 0-64-8 0c-17.7 0-32-14.3-32-32l0-64z"]},I4={prefix:"fas",iconName:"fax",icon:[512,512,[128224,128439],"f1ac","M160 64l0 80 64 0 0-80 146.7 0 45.3 45.3 0 34.7 64 0 0-34.7c0-17-6.7-33.3-18.7-45.3L416 18.7C404 6.7 387.7 0 370.7 0L224 0c-35.3 0-64 28.7-64 64zM32 128c-17.7 0-32 14.3-32 32L0 448c0 17.7 14.3 32 32 32l48 0c17.7 0 32-14.3 32-32l0-288c0-17.7-14.3-32-32-32l-48 0zm448 64l-320 0 0 256c0 17.7 14.3 32 32 32l288 0c17.7 0 32-14.3 32-32l0-224c0-17.7-14.3-32-32-32zM224 288a24 24 0 1 1 48 0 24 24 0 1 1 -48 0zm0 96a24 24 0 1 1 48 0 24 24 0 1 1 -48 0zM336 264a24 24 0 1 1 0 48 24 24 0 1 1 0-48zM312 384a24 24 0 1 1 48 0 24 24 0 1 1 -48 0zM424 264a24 24 0 1 1 0 48 24 24 0 1 1 0-48zM400 384a24 24 0 1 1 48 0 24 24 0 1 1 -48 0z"]},W4={prefix:"fas",iconName:"expand",icon:[448,512,[],"f065","M32 32C14.3 32 0 46.3 0 64l0 96c0 17.7 14.3 32 32 32s32-14.3 32-32l0-64 64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L32 32zM64 352c0-17.7-14.3-32-32-32S0 334.3 0 352l0 96c0 17.7 14.3 32 32 32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0 0-64zM320 32c-17.7 0-32 14.3-32 32s14.3 32 32 32l64 0 0 64c0 17.7 14.3 32 32 32s32-14.3 32-32l0-96c0-17.7-14.3-32-32-32l-96 0zM448 352c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 64-64 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l96 0c17.7 0 32-14.3 32-32l0-96z"]},O4={prefix:"fas",iconName:"table-columns",icon:[448,512,["columns"],"f0db","M0 96C0 60.7 28.7 32 64 32l320 0c35.3 0 64 28.7 64 64l0 320c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64L0 96zm64 64l0 256 128 0 0-256-128 0zm320 0l-128 0 0 256 128 0 0-256z"]},V4={prefix:"fas",iconName:"stop",icon:[448,512,[9209],"f04d","M64 32l320 0c35.3 0 64 28.7 64 64l0 320c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64L0 96C0 60.7 28.7 32 64 32z"]},j4={prefix:"fas",iconName:"clock",icon:[512,512,[128339,"clock-four"],"f017","M256 0a256 256 0 1 1 0 512 256 256 0 1 1 0-512zM232 120l0 136c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2 280 120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"]},K4={prefix:"fas",iconName:"rocket",icon:[512,512,[],"f135","M128 320L24.5 320c-24.9 0-40.2-27.1-27.4-48.5L50 183.3C58.7 168.8 74.3 160 91.2 160l95 0c76.1-128.9 189.6-135.4 265.5-124.3 12.8 1.9 22.8 11.9 24.6 24.6 11.1 75.9 4.6 189.4-124.3 265.5l0 95c0 16.9-8.8 32.5-23.3 41.2l-88.2 52.9c-21.3 12.8-48.5-2.6-48.5-27.4L192 384c0-35.3-28.7-64-64-64l-.1 0zM400 160a48 48 0 1 0 -96 0 48 48 0 1 0 96 0z"]},X4={prefix:"fas",iconName:"paper-plane",icon:[576,512,[61913],"f1d8","M536.4-26.3c9.8-3.5 20.6-1 28 6.3s9.8 18.2 6.3 28l-178 496.9c-5 13.9-18.1 23.1-32.8 23.1-14.2 0-27-8.6-32.3-21.7l-64.2-158c-4.5-11-2.5-23.6 5.2-32.6l94.5-112.4c5.1-6.1 4.7-15-.9-20.6s-14.6-6-20.6-.9L229.2 276.1c-9.1 7.6-21.6 9.6-32.6 5.2L38.1 216.8c-13.1-5.3-21.7-18.1-21.7-32.3 0-14.7 9.2-27.8 23.1-32.8l496.9-178z"]},Q4={prefix:"fas",iconName:"fire",icon:[448,512,[128293],"f06d","M160.5-26.4c9.3-7.8 23-7.5 31.9 .9 12.3 11.6 23.3 24.4 33.9 37.4 13.5 16.5 29.7 38.3 45.3 64.2 5.2-6.8 10-12.8 14.2-17.9 1.1-1.3 2.2-2.7 3.3-4.1 7.9-9.8 17.7-22.1 30.8-22.1 13.4 0 22.8 11.9 30.8 22.1 1.3 1.7 2.6 3.3 3.9 4.8 10.3 12.4 24 30.3 37.7 52.4 27.2 43.9 55.6 106.4 55.6 176.6 0 123.7-100.3 224-224 224S0 411.7 0 288c0-91.1 41.1-170 80.5-225 19.9-27.7 39.7-49.9 54.6-65.1 8.2-8.4 16.5-16.7 25.5-24.2zM225.7 416c25.3 0 47.7-7 68.8-21 42.1-29.4 53.4-88.2 28.1-134.4-4.5-9-16-9.6-22.5-2l-25.2 29.3c-6.6 7.6-18.5 7.4-24.7-.5-17.3-22.1-49.1-62.4-65.3-83-5.4-6.9-15.2-8-21.5-1.9-18.3 17.8-51.5 56.8-51.5 104.3 0 68.6 50.6 109.2 113.7 109.2z"]},J4={prefix:"fas",iconName:"users",icon:[640,512,[],"f0c0","M320 16a104 104 0 1 1 0 208 104 104 0 1 1 0-208zM96 88a72 72 0 1 1 0 144 72 72 0 1 1 0-144zM0 416c0-70.7 57.3-128 128-128 12.8 0 25.2 1.9 36.9 5.4-32.9 36.8-52.9 85.4-52.9 138.6l0 16c0 11.4 2.4 22.2 6.7 32L32 480c-17.7 0-32-14.3-32-32l0-32zm521.3 64c4.3-9.8 6.7-20.6 6.7-32l0-16c0-53.2-20-101.8-52.9-138.6 11.7-3.5 24.1-5.4 36.9-5.4 70.7 0 128 57.3 128 128l0 32c0 17.7-14.3 32-32 32l-86.7 0zM472 160a72 72 0 1 1 144 0 72 72 0 1 1 -144 0zM160 432c0-88.4 71.6-160 160-160s160 71.6 160 160l0 16c0 17.7-14.3 32-32 32l-256 0c-17.7 0-32-14.3-32-32l0-16z"]},Y4={prefix:"fas",iconName:"headset",icon:[448,512,[],"f590","M224 64c-79 0-144.7 57.3-157.7 132.7 9.3-3 19.3-4.7 29.7-4.7l16 0c26.5 0 48 21.5 48 48l0 96c0 26.5-21.5 48-48 48l-16 0c-53 0-96-43-96-96l0-64C0 100.3 100.3 0 224 0S448 100.3 448 224l0 168.1c0 66.3-53.8 120-120.1 120l-87.9-.1-32 0c-26.5 0-48-21.5-48-48s21.5-48 48-48l32 0c26.5 0 48 21.5 48 48l0 0 40 0c39.8 0 72-32.2 72-72l0-20.9c-14.1 8.2-30.5 12.8-48 12.8l-16 0c-26.5 0-48-21.5-48-48l0-96c0-26.5 21.5-48 48-48l16 0c10.4 0 20.3 1.6 29.7 4.7-13-75.3-78.6-132.7-157.7-132.7z"]},Z4={prefix:"fas",iconName:"voicemail",icon:[640,512,[],"f897","M144 160a80 80 0 1 1 0 160 80 80 0 1 1 0-160zM263.8 320c15.3-22.9 24.2-50.4 24.2-80 0-79.5-64.5-144-144-144S0 160.5 0 240 64.5 384 144 384l352 0c79.5 0 144-64.5 144-144S575.5 96 496 96 352 160.5 352 240c0 29.6 8.9 57.1 24.2 80l-112.5 0zM496 160a80 80 0 1 1 0 160 80 80 0 1 1 0-160z"]},c3={prefix:"fas",iconName:"microphone",icon:[384,512,[],"f130","M192 0C139 0 96 43 96 96l0 128c0 53 43 96 96 96s96-43 96-96l0-128c0-53-43-96-96-96zM48 184c0-13.3-10.7-24-24-24S0 170.7 0 184l0 40c0 97.9 73.3 178.7 168 190.5l0 49.5-48 0c-13.3 0-24 10.7-24 24s10.7 24 24 24l144 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-48 0 0-49.5c94.7-11.8 168-92.6 168-190.5l0-40c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 40c0 79.5-64.5 144-144 144S48 303.5 48 224l0-40z"]},a3={prefix:"fas",iconName:"image",icon:[448,512,[],"f03e","M64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L64 32zm64 80a48 48 0 1 1 0 96 48 48 0 1 1 0-96zM272 224c8.4 0 16.1 4.4 20.5 11.5l88 144c4.5 7.4 4.7 16.7 .5 24.3S368.7 416 360 416L88 416c-8.9 0-17.2-5-21.3-12.9s-3.5-17.5 1.6-24.8l56-80c4.5-6.4 11.8-10.2 19.7-10.2s15.2 3.8 19.7 10.2l26.4 37.8 61.4-100.5c4.4-7.1 12.1-11.5 20.5-11.5z"]},l3={prefix:"fas",iconName:"folder",icon:[512,512,[128193,128447,61716,"folder-blank"],"f07b","M64 448l384 0c35.3 0 64-28.7 64-64l0-240c0-35.3-28.7-64-64-64L298.7 80c-6.9 0-13.7-2.2-19.2-6.4L241.1 44.8C230 36.5 216.5 32 202.7 32L64 32C28.7 32 0 60.7 0 96L0 384c0 35.3 28.7 64 64 64z"]},e3={prefix:"fas",iconName:"cloud",icon:[576,512,[9729],"f0c2","M0 336c0 79.5 64.5 144 144 144l304 0c70.7 0 128-57.3 128-128 0-51.6-30.5-96.1-74.5-116.3 6.7-13.1 10.5-28 10.5-43.7 0-53-43-96-96-96-17.7 0-34.2 4.8-48.4 13.1-24.1-45.8-72.2-77.1-127.6-77.1-79.5 0-144 64.5-144 144 0 8 .7 15.9 1.9 23.5-56.9 19.2-97.9 73.1-97.9 136.5z"]},s3={prefix:"fas",iconName:"link",icon:[576,512,[128279,"chain"],"f0c1","M419.5 96c-16.6 0-32.7 4.5-46.8 12.7-15.8-16-34.2-29.4-54.5-39.5 28.2-24 64.1-37.2 101.3-37.2 86.4 0 156.5 70 156.5 156.5 0 41.5-16.5 81.3-45.8 110.6l-71.1 71.1c-29.3 29.3-69.1 45.8-110.6 45.8-86.4 0-156.5-70-156.5-156.5 0-1.5 0-3 .1-4.5 .5-17.7 15.2-31.6 32.9-31.1s31.6 15.2 31.1 32.9c0 .9 0 1.8 0 2.6 0 51.1 41.4 92.5 92.5 92.5 24.5 0 48-9.7 65.4-27.1l71.1-71.1c17.3-17.3 27.1-40.9 27.1-65.4 0-51.1-41.4-92.5-92.5-92.5zM275.2 173.3c-1.9-.8-3.8-1.9-5.5-3.1-12.6-6.5-27-10.2-42.1-10.2-24.5 0-48 9.7-65.4 27.1L91.1 258.2c-17.3 17.3-27.1 40.9-27.1 65.4 0 51.1 41.4 92.5 92.5 92.5 16.5 0 32.6-4.4 46.7-12.6 15.8 16 34.2 29.4 54.6 39.5-28.2 23.9-64 37.2-101.3 37.2-86.4 0-156.5-70-156.5-156.5 0-41.5 16.5-81.3 45.8-110.6l71.1-71.1c29.3-29.3 69.1-45.8 110.6-45.8 86.6 0 156.5 70.6 156.5 156.9 0 1.3 0 2.6 0 3.9-.4 17.7-15.1 31.6-32.8 31.2s-31.6-15.1-31.2-32.8c0-.8 0-1.5 0-2.3 0-33.7-18-63.3-44.8-79.6z"]},r3={prefix:"fas",iconName:"chart-line",icon:[512,512,["line-chart"],"f201","M64 64c0-17.7-14.3-32-32-32S0 46.3 0 64L0 400c0 44.2 35.8 80 80 80l400 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L80 416c-8.8 0-16-7.2-16-16L64 64zm406.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L320 210.7 262.6 153.4c-12.5-12.5-32.8-12.5-45.3 0l-96 96c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l73.4-73.4 57.4 57.4c12.5 12.5 32.8 12.5 45.3 0l128-128z"]},i3={prefix:"fas",iconName:"gear",icon:[512,512,[9881,"cog"],"f013","M195.1 9.5C198.1-5.3 211.2-16 226.4-16l59.8 0c15.2 0 28.3 10.7 31.3 25.5L332 79.5c14.1 6 27.3 13.7 39.3 22.8l67.8-22.5c14.4-4.8 30.2 1.2 37.8 14.4l29.9 51.8c7.6 13.2 4.9 29.8-6.5 39.9L447 233.3c.9 7.4 1.3 15 1.3 22.7s-.5 15.3-1.3 22.7l53.4 47.5c11.4 10.1 14 26.8 6.5 39.9l-29.9 51.8c-7.6 13.1-23.4 19.2-37.8 14.4l-67.8-22.5c-12.1 9.1-25.3 16.7-39.3 22.8l-14.4 69.9c-3.1 14.9-16.2 25.5-31.3 25.5l-59.8 0c-15.2 0-28.3-10.7-31.3-25.5l-14.4-69.9c-14.1-6-27.2-13.7-39.3-22.8L73.5 432.3c-14.4 4.8-30.2-1.2-37.8-14.4L5.8 366.1c-7.6-13.2-4.9-29.8 6.5-39.9l53.4-47.5c-.9-7.4-1.3-15-1.3-22.7s.5-15.3 1.3-22.7L12.3 185.8c-11.4-10.1-14-26.8-6.5-39.9L35.7 94.1c7.6-13.2 23.4-19.2 37.8-14.4l67.8 22.5c12.1-9.1 25.3-16.7 39.3-22.8L195.1 9.5zM256.3 336a80 80 0 1 0 -.6-160 80 80 0 1 0 .6 160z"]},o3={prefix:"fas",iconName:"up-right-and-down-left-from-center",icon:[512,512,["expand-alt"],"f424","M344 0L488 0c13.3 0 24 10.7 24 24l0 144c0 9.7-5.8 18.5-14.8 22.2s-19.3 1.7-26.2-5.2l-39-39-87 87c-9.4 9.4-24.6 9.4-33.9 0l-32-32c-9.4-9.4-9.4-24.6 0-33.9l87-87-39-39c-6.9-6.9-8.9-17.2-5.2-26.2S334.3 0 344 0zM168 512L24 512c-13.3 0-24-10.7-24-24L0 344c0-9.7 5.8-18.5 14.8-22.2S34.1 320.2 41 327l39 39 87-87c9.4-9.4 24.6-9.4 33.9 0l32 32c9.4 9.4 9.4 24.6 0 33.9l-87 87 39 39c6.9 6.9 8.9 17.2 5.2 26.2S177.7 512 168 512z"]},n3={prefix:"fas",iconName:"play",icon:[448,512,[9654],"f04b","M91.2 36.9c-12.4-6.8-27.4-6.5-39.6 .7S32 57.9 32 72l0 368c0 14.1 7.5 27.2 19.6 34.4s27.2 7.5 39.6 .7l336-184c12.8-7 20.8-20.5 20.8-35.1s-8-28.1-20.8-35.1l-336-184z"]},f3={prefix:"fas",iconName:"check",icon:[448,512,[10003,10004],"f00c","M434.8 70.1c14.3 10.4 17.5 30.4 7.1 44.7l-256 352c-5.5 7.6-14 12.3-23.4 13.1s-18.5-2.7-25.1-9.3l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l101.5 101.5 234-321.7c10.4-14.3 30.4-17.5 44.7-7.1z"]},t3={prefix:"fas",iconName:"sliders",icon:[512,512,["sliders-h"],"f1de","M32 64C14.3 64 0 78.3 0 96s14.3 32 32 32l86.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48L480 128c17.7 0 32-14.3 32-32s-14.3-32-32-32L265.3 64C253 35.7 224.8 16 192 16s-61 19.7-73.3 48L32 64zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32l246.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48l54.7 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-54.7 0c-12.3-28.3-40.5-48-73.3-48s-61 19.7-73.3 48L32 224zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32l54.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48L480 448c17.7 0 32-14.3 32-32s-14.3-32-32-32l-246.7 0c-12.3-28.3-40.5-48-73.3-48s-61 19.7-73.3 48L32 384z"]},m3={prefix:"fas",iconName:"user",icon:[448,512,[128100,62144,62470,"user-alt","user-large"],"f007","M224 248a120 120 0 1 0 0-240 120 120 0 1 0 0 240zm-29.7 56C95.8 304 16 383.8 16 482.3 16 498.7 29.3 512 45.7 512l356.6 0c16.4 0 29.7-13.3 29.7-29.7 0-98.5-79.8-178.3-178.3-178.3l-59.4 0z"]},z3={prefix:"fas",iconName:"arrow-right",icon:[512,512,[8594],"f061","M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l370.7 0-105.4 105.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"]},p3={prefix:"fas",iconName:"right-left",icon:[512,512,["exchange-alt"],"f362","M502.6 150.6l-96 96c-9.2 9.2-22.9 11.9-34.9 6.9S352 236.9 352 224l0-64-320 0c-17.7 0-32-14.3-32-32S14.3 96 32 96l320 0 0-64c0-12.9 7.8-24.6 19.8-29.6s25.7-2.2 34.9 6.9l96 96c12.5 12.5 12.5 32.8 0 45.3zm-397.3 352l-96-96c-12.5-12.5-12.5-32.8 0-45.3l96-96c9.2-9.2 22.9-11.9 34.9-6.9S160 275.1 160 288l0 64 320 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-320 0 0 64c0 12.9-7.8 24.6-19.8 29.6s-25.7 2.2-34.9-6.9z"]},d3={prefix:"fas",iconName:"xmark",icon:[384,512,[128473,10005,10006,10060,215,"close","multiply","remove","times"],"f00d","M55.1 73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L147.2 256 9.9 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192.5 301.3 329.9 438.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.8 256 375.1 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192.5 210.7 55.1 73.4z"]},M3={prefix:"fas",iconName:"comments",icon:[576,512,[128490,61670],"f086","M384 144c0 97.2-86 176-192 176-26.7 0-52.1-5-75.2-14L35.2 349.2c-9.3 4.9-20.7 3.2-28.2-4.2s-9.2-18.9-4.2-28.2l35.6-67.2C14.3 220.2 0 183.6 0 144 0 46.8 86-32 192-32S384 46.8 384 144zm0 368c-94.1 0-172.4-62.1-188.8-144 120-1.5 224.3-86.9 235.8-202.7 83.3 19.2 145 88.3 145 170.7 0 39.6-14.3 76.2-38.4 105.6l35.6 67.2c4.9 9.3 3.2 20.7-4.2 28.2s-18.9 9.2-28.2 4.2L459.2 498c-23.1 9-48.5 14-75.2 14z"]},L3={prefix:"fas",iconName:"mobile-screen",icon:[384,512,["mobile-android-alt"],"f3cf","M16 64C16 28.7 44.7 0 80 0L304 0c35.3 0 64 28.7 64 64l0 384c0 35.3-28.7 64-64 64L80 512c-35.3 0-64-28.7-64-64L16 64zM128 440c0 13.3 10.7 24 24 24l80 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-80 0c-13.3 0-24 10.7-24 24zM304 64l-224 0 0 304 224 0 0-304z"]},u3={prefix:"fas",iconName:"phone-volume",icon:[576,512,["volume-control-phone"],"f2a0","M344-32c128.1 0 232 103.9 232 232 0 13.3-10.7 24-24 24s-24-10.7-24-24c0-101.6-82.4-184-184-184-13.3 0-24-10.7-24-24s10.7-24 24-24zm8 192a32 32 0 1 1 0 64 32 32 0 1 1 0-64zM320 88c0-13.3 10.7-24 24-24 75.1 0 136 60.9 136 136 0 13.3-10.7 24-24 24s-24-10.7-24-24c0-48.6-39.4-88-88-88-13.3 0-24-10.7-24-24zM144.1 1.4c19.7-5.4 40.3 4.7 48.1 23.5l40.5 97.3c6.9 16.5 2.1 35.6-11.8 47l-44.1 36.1c32.5 71.6 89 130 159.3 164.9L374.7 323c11.3-13.9 30.4-18.6 47-11.8L519 351.8c18.8 7.8 28.9 28.4 23.5 48.1l-1.5 5.5C523.4 470.1 460.9 525.3 384.6 509.2 209.6 472.1 71.9 334.4 34.8 159.4 18.7 83.1 73.9 20.6 138.5 2.9l5.5-1.5z"]},h3={prefix:"fas",iconName:"phone",icon:[512,512,[128222,128379],"f095","M160.2 25C152.3 6.1 131.7-3.9 112.1 1.4l-5.5 1.5c-64.6 17.6-119.8 80.2-103.7 156.4 37.1 175 174.8 312.7 349.8 349.8 76.3 16.2 138.8-39.1 156.4-103.7l1.5-5.5c5.4-19.7-4.7-40.3-23.5-48.1l-97.3-40.5c-16.5-6.9-35.6-2.1-47 11.8l-38.6 47.2C233.9 335.4 177.3 277 144.8 205.3L189 169.3c13.9-11.3 18.6-30.4 11.8-47L160.2 25z"]},v3={prefix:"fas",iconName:"address-book",icon:[512,512,[62138,"contact-book"],"f2b9","M96 0C60.7 0 32 28.7 32 64l0 384c0 35.3 28.7 64 64 64l288 0c35.3 0 64-28.7 64-64l0-384c0-35.3-28.7-64-64-64L96 0zM208 288l64 0c44.2 0 80 35.8 80 80 0 8.8-7.2 16-16 16l-192 0c-8.8 0-16-7.2-16-16 0-44.2 35.8-80 80-80zm-24-96a56 56 0 1 1 112 0 56 56 0 1 1 -112 0zM512 80c0-8.8-7.2-16-16-16s-16 7.2-16 16l0 64c0 8.8 7.2 16 16 16s16-7.2 16-16l0-64zm0 128c0-8.8-7.2-16-16-16s-16 7.2-16 16l0 64c0 8.8 7.2 16 16 16s16-7.2 16-16l0-64zM496 320c-8.8 0-16 7.2-16 16l0 64c0 8.8 7.2 16 16 16s16-7.2 16-16l0-64c0-8.8-7.2-16-16-16z"]},C3={prefix:"fas",iconName:"chevron-down",icon:[448,512,[],"f078","M201.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 338.7 54.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"]},g3={prefix:"fas",iconName:"plug",icon:[448,512,[128268],"f1e6","M128-32c17.7 0 32 14.3 32 32l0 96 128 0 0-96c0-17.7 14.3-32 32-32s32 14.3 32 32l0 96 64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l0 64c0 95.1-69.2 174.1-160 189.3l0 66.7c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-66.7C101.2 398.1 32 319.1 32 224l0-64c-17.7 0-32-14.3-32-32S14.3 96 32 96l64 0 0-96c0-17.7 14.3-32 32-32z"]},x3={prefix:"fas",iconName:"comment-dots",icon:[512,512,[128172,62075,"commenting"],"f4ad","M256 480c141.4 0 256-107.5 256-240S397.4 0 256 0 0 107.5 0 240c0 54.3 19.2 104.3 51.6 144.5L2.8 476.8c-4.8 9-3.3 20 3.6 27.5s17.8 9.8 27.1 5.8l118.4-50.7C183.7 472.6 218.9 480 256 480zM128 208a32 32 0 1 1 0 64 32 32 0 1 1 0-64zm128 0a32 32 0 1 1 0 64 32 32 0 1 1 0-64zm96 32a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"]},S3={prefix:"fas",iconName:"inbox",icon:[512,512,[],"f01c","M91.8 32C59.9 32 32.9 55.4 28.4 86.9L.6 281.2c-.4 3-.6 6-.6 9.1L0 416c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-125.7c0-3-.2-6.1-.6-9.1L483.6 86.9C479.1 55.4 452.1 32 420.2 32L91.8 32zm0 64l328.5 0 27.4 192-59.9 0c-12.1 0-23.2 6.8-28.6 17.7l-14.3 28.6c-5.4 10.8-16.5 17.7-28.6 17.7l-120.4 0c-12.1 0-23.2-6.8-28.6-17.7l-14.3-28.6c-5.4-10.8-16.5-17.7-28.6-17.7L64.3 288 91.8 96z"]},N3={prefix:"fas",iconName:"bullhorn",icon:[512,512,[128226,128363],"f0a1","M461.2 18.9C472.7 24 480 35.4 480 48l0 416c0 12.6-7.3 24-18.8 29.1s-24.8 3.2-34.3-5.1l-46.6-40.7c-43.6-38.1-98.7-60.3-156.4-63l0 95.7c0 17.7-14.3 32-32 32l-32 0c-17.7 0-32-14.3-32-32l0-96C57.3 384 0 326.7 0 256S57.3 128 128 128l84.5 0c61.8-.2 121.4-22.7 167.9-63.3l46.6-40.7c9.4-8.3 22.9-10.2 34.3-5.1zM224 320l0 .2c70.3 2.7 137.8 28.5 192 73.4l0-275.3c-54.2 44.9-121.7 70.7-192 73.4L224 320z"]},b3={prefix:"fas",iconName:"wand-magic-sparkles",icon:[576,512,["magic-wand-sparkles"],"e2ca","M263.4-27L278.2 9.8 315 24.6c3 1.2 5 4.2 5 7.4s-2 6.2-5 7.4L278.2 54.2 263.4 91c-1.2 3-4.2 5-7.4 5s-6.2-2-7.4-5L233.8 54.2 197 39.4c-3-1.2-5-4.2-5-7.4s2-6.2 5-7.4L233.8 9.8 248.6-27c1.2-3 4.2-5 7.4-5s6.2 2 7.4 5zM110.7 41.7l21.5 50.1 50.1 21.5c5.9 2.5 9.7 8.3 9.7 14.7s-3.8 12.2-9.7 14.7l-50.1 21.5-21.5 50.1c-2.5 5.9-8.3 9.7-14.7 9.7s-12.2-3.8-14.7-9.7L59.8 164.2 9.7 142.7C3.8 140.2 0 134.4 0 128s3.8-12.2 9.7-14.7L59.8 91.8 81.3 41.7C83.8 35.8 89.6 32 96 32s12.2 3.8 14.7 9.7zM464 304c6.4 0 12.2 3.8 14.7 9.7l21.5 50.1 50.1 21.5c5.9 2.5 9.7 8.3 9.7 14.7s-3.8 12.2-9.7 14.7l-50.1 21.5-21.5 50.1c-2.5 5.9-8.3 9.7-14.7 9.7s-12.2-3.8-14.7-9.7l-21.5-50.1-50.1-21.5c-5.9-2.5-9.7-8.3-9.7-14.7s3.8-12.2 9.7-14.7l50.1-21.5 21.5-50.1c2.5-5.9 8.3-9.7 14.7-9.7zM460 0c11 0 21.6 4.4 29.5 12.2l42.3 42.3C539.6 62.4 544 73 544 84s-4.4 21.6-12.2 29.5l-88.2 88.2-101.3-101.3 88.2-88.2C438.4 4.4 449 0 460 0zM44.2 398.5L308.4 134.3 409.7 235.6 145.5 499.8C137.6 507.6 127 512 116 512s-21.6-4.4-29.5-12.2L44.2 457.5C36.4 449.6 32 439 32 428s4.4-21.6 12.2-29.5z"]},w3={prefix:"fas",iconName:"chart-column",icon:[512,512,[],"e0e3","M32 32c17.7 0 32 14.3 32 32l0 336c0 8.8 7.2 16 16 16l400 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L80 480c-44.2 0-80-35.8-80-80L0 64C0 46.3 14.3 32 32 32zM144 224c17.7 0 32 14.3 32 32l0 64c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32zm144-64l0 160c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-160c0-17.7 14.3-32 32-32s32 14.3 32 32zm80 32c17.7 0 32 14.3 32 32l0 96c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-96c0-17.7 14.3-32 32-32zM512 96l0 224c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-224c0-17.7 14.3-32 32-32s32 14.3 32 32z"]},k3={prefix:"fas",iconName:"star",icon:[576,512,[11088,61446],"f005","M309.5-18.9c-4.1-8-12.4-13.1-21.4-13.1s-17.3 5.1-21.4 13.1L193.1 125.3 33.2 150.7c-8.9 1.4-16.3 7.7-19.1 16.3s-.5 18 5.8 24.4l114.4 114.5-25.2 159.9c-1.4 8.9 2.3 17.9 9.6 23.2s16.9 6.1 25 2L288.1 417.6 432.4 491c8 4.1 17.7 3.3 25-2s11-14.2 9.6-23.2L441.7 305.9 556.1 191.4c6.4-6.4 8.6-15.8 5.8-24.4s-10.1-14.9-19.1-16.3L383 125.3 309.5-18.9z"]},y3={prefix:"fas",iconName:"triangle-exclamation",icon:[512,512,[9888,"exclamation-triangle","warning"],"f071","M256 0c14.7 0 28.2 8.1 35.2 21l216 400c6.7 12.4 6.4 27.4-.8 39.5S486.1 480 472 480L40 480c-14.1 0-27.2-7.4-34.4-19.5s-7.5-27.1-.8-39.5l216-400c7-12.9 20.5-21 35.2-21zm0 352a32 32 0 1 0 0 64 32 32 0 1 0 0-64zm0-192c-18.2 0-32.7 15.5-31.4 33.7l7.4 104c.9 12.5 11.4 22.3 23.9 22.3 12.6 0 23-9.7 23.9-22.3l7.4-104c1.3-18.2-13.1-33.7-31.4-33.7z"]},A3={prefix:"fas",iconName:"lock",icon:[384,512,[128274],"f023","M128 96l0 64 128 0 0-64c0-35.3-28.7-64-64-64s-64 28.7-64 64zM64 160l0-64C64 25.3 121.3-32 192-32S320 25.3 320 96l0 64c35.3 0 64 28.7 64 64l0 224c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 224c0-35.3 28.7-64 64-64z"]},T3={prefix:"fas",iconName:"window-restore",icon:[576,512,[],"f2d2","M512 96L160 96c0-35.3 28.7-64 64-64l288 0c35.3 0 64 28.7 64 64l0 192c0 35.3-28.7 64-64 64l-48 0 0-64 48 0 0-192zM0 224c0-35.3 28.7-64 64-64l288 0c35.3 0 64 28.7 64 64l0 192c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64L0 224zm64 40c0 13.3 10.7 24 24 24l240 0c13.3 0 24-10.7 24-24s-10.7-24-24-24L88 240c-13.3 0-24 10.7-24 24z"]},P3={prefix:"fas",iconName:"shield-halved",icon:[512,512,["shield-alt"],"f3ed","M256 0c4.6 0 9.2 1 13.4 2.9L457.8 82.8c22 9.3 38.4 31 38.3 57.2-.5 99.2-41.3 280.7-213.6 363.2-16.7 8-36.1 8-52.8 0-172.4-82.5-213.1-264-213.6-363.2-.1-26.2 16.3-47.9 38.3-57.2L242.7 2.9C246.9 1 251.4 0 256 0zm0 66.8l0 378.1c138-66.8 175.1-214.8 176-303.4l-176-74.6 0 0z"]},B3={prefix:"fas",iconName:"caret-up",icon:[320,512,[],"f0d8","M140.3 135.2c12.6-10.3 31.1-9.5 42.8 2.2l128 128c9.2 9.2 11.9 22.9 6.9 34.9S301.4 320 288.5 320l-256 0c-12.9 0-24.6-7.8-29.6-19.8S.7 274.5 9.9 265.4l128-128 2.4-2.2z"]},E3={prefix:"fas",iconName:"globe",icon:[512,512,[127760],"f0ac","M351.9 280l-190.9 0c2.9 64.5 17.2 123.9 37.5 167.4 11.4 24.5 23.7 41.8 35.1 52.4 11.2 10.5 18.9 12.2 22.9 12.2s11.7-1.7 22.9-12.2c11.4-10.6 23.7-28 35.1-52.4 20.3-43.5 34.6-102.9 37.5-167.4zM160.9 232l190.9 0C349 167.5 334.7 108.1 314.4 64.6 303 40.2 290.7 22.8 279.3 12.2 268.1 1.7 260.4 0 256.4 0s-11.7 1.7-22.9 12.2c-11.4 10.6-23.7 28-35.1 52.4-20.3 43.5-34.6 102.9-37.5 167.4zm-48 0C116.4 146.4 138.5 66.9 170.8 14.7 78.7 47.3 10.9 131.2 1.5 232l111.4 0zM1.5 280c9.4 100.8 77.2 184.7 169.3 217.3-32.3-52.2-54.4-131.7-57.9-217.3L1.5 280zm398.4 0c-3.5 85.6-25.6 165.1-57.9 217.3 92.1-32.7 159.9-116.5 169.3-217.3l-111.4 0zm111.4-48C501.9 131.2 434.1 47.3 342 14.7 374.3 66.9 396.4 146.4 399.9 232l111.4 0z"]},F3={prefix:"fas",iconName:"upload",icon:[448,512,[],"f093","M256 109.3L256 320c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-210.7-41.4 41.4c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l96-96c12.5-12.5 32.8-12.5 45.3 0l96 96c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 109.3zM224 400c44.2 0 80-35.8 80-80l80 0c35.3 0 64 28.7 64 64l0 32c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64l0-32c0-35.3 28.7-64 64-64l80 0c0 44.2 35.8 80 80 80zm144 24a24 24 0 1 0 0-48 24 24 0 1 0 0 48z"]},H3={prefix:"fas",iconName:"arrow-left",icon:[512,512,[8592],"f060","M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 288 480 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-370.7 0 105.4-105.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"]},R3={prefix:"fas",iconName:"check-double",icon:[384,512,[],"f560","M249.9 66.8c10.4-14.3 7.2-34.3-7.1-44.7s-34.3-7.2-44.7 7.1l-106 145.7-37.5-37.5c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l64 64c6.6 6.6 15.8 10 25.1 9.3s17.9-5.5 23.4-13.1l128-176zm128 136c10.4-14.3 7.2-34.3-7.1-44.7s-34.3-7.2-44.7 7.1l-170 233.7-69.5-69.5c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l96 96c6.6 6.6 15.8 10 25.1 9.3s17.9-5.5 23.4-13.1l192-264z"]},D3={prefix:"fas",iconName:"down-left-and-up-right-to-center",icon:[512,512,["compress-alt"],"f422","M439.5 7c9.4-9.4 24.6-9.4 33.9 0l32 32c9.4 9.4 9.4 24.6 0 33.9l-87 87 39 39c6.9 6.9 8.9 17.2 5.2 26.2S450.2 240 440.5 240l-144 0c-13.3 0-24-10.7-24-24l0-144c0-9.7 5.8-18.5 14.8-22.2s19.3-1.7 26.2 5.2l39 39 87-87zM72.5 272l144 0c13.3 0 24 10.7 24 24l0 144c0 9.7-5.8 18.5-14.8 22.2s-19.3 1.7-26.2-5.2l-39-39-87 87c-9.4 9.4-24.6 9.4-33.9 0l-32-32c-9.4-9.4-9.4-24.6 0-33.9l87-87-39-39c-6.9-6.9-8.9-17.2-5.2-26.2S62.8 272 72.5 272z"]},_3={prefix:"fas",iconName:"music",icon:[512,512,[127925],"f001","M468 7c7.6 6.1 12 15.3 12 25l0 304c0 44.2-43 80-96 80s-96-35.8-96-80 43-80 96-80c11.2 0 22 1.6 32 4.6l0-116.7-224 49.8 0 206.3c0 44.2-43 80-96 80s-96-35.8-96-80 43-80 96-80c11.2 0 22 1.6 32 4.6L128 96c0-15 10.4-28 25.1-31.2l288-64c9.5-2.1 19.4 .2 27 6.3z"]},U3={prefix:"fas",iconName:"robot",icon:[640,512,[129302],"f544","M352 0c0-17.7-14.3-32-32-32S288-17.7 288 0l0 64-96 0c-53 0-96 43-96 96l0 224c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-224c0-53-43-96-96-96l-96 0 0-64zM160 368c0-13.3 10.7-24 24-24l32 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-32 0c-13.3 0-24-10.7-24-24zm120 0c0-13.3 10.7-24 24-24l32 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-32 0c-13.3 0-24-10.7-24-24zm120 0c0-13.3 10.7-24 24-24l32 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-32 0c-13.3 0-24-10.7-24-24zM224 176a48 48 0 1 1 0 96 48 48 0 1 1 0-96zm144 48a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zM64 224c0-17.7-14.3-32-32-32S0 206.3 0 224l0 96c0 17.7 14.3 32 32 32s32-14.3 32-32l0-96zm544-32c-17.7 0-32 14.3-32 32l0 96c0 17.7 14.3 32 32 32s32-14.3 32-32l0-96c0-17.7-14.3-32-32-32z"]},q3={prefix:"fas",iconName:"plus",icon:[448,512,[10133,61543,"add"],"2b","M256 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 160-160 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l160 0 0 160c0 17.7 14.3 32 32 32s32-14.3 32-32l0-160 160 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-160 0 0-160z"]},$3={prefix:"fas",iconName:"caret-down",icon:[320,512,[],"f0d7","M140.3 376.8c12.6 10.2 31.1 9.5 42.8-2.2l128-128c9.2-9.2 11.9-22.9 6.9-34.9S301.4 192 288.5 192l-256 0c-12.9 0-24.6 7.8-29.6 19.8S.7 237.5 9.9 246.6l128 128 2.4 2.2z"]},G3={prefix:"fas",iconName:"tag",icon:[512,512,[127991],"f02b","M32.5 96l0 149.5c0 17 6.7 33.3 18.7 45.3l192 192c25 25 65.5 25 90.5 0L483.2 333.3c25-25 25-65.5 0-90.5l-192-192C279.2 38.7 263 32 246 32L96.5 32c-35.3 0-64 28.7-64 64zm112 16a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"]},I3={prefix:"fas",iconName:"phone-slash",icon:[576,512,[],"f3dd","M535-24.9c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9L41 537.1c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9L141.5 368.6C89.2 310.5 51.6 238.8 34.8 159.4 18.7 83.1 73.9 20.6 138.5 2.9l5.5-1.5c19.7-5.4 40.3 4.7 48.1 23.5l40.5 97.3c6.9 16.5 2.1 35.6-11.8 47l-44.1 36.1c12.9 28.5 29.6 54.8 49.5 78.5L535-24.9zm-150.4 534c-63-13.4-121.3-39.8-171.7-76.3L297.8 348c12.2 8.2 25 15.6 38.3 22.2L374.7 323c11.3-13.9 30.4-18.6 47-11.8L519 351.8c18.8 7.8 28.9 28.4 23.5 48.1l-1.5 5.5c-17.6 64.6-80.2 119.8-156.4 103.7z"]},W3={prefix:"fas",iconName:"briefcase",icon:[512,512,[128188],"f0b1","M200 48l112 0c4.4 0 8 3.6 8 8l0 40-128 0 0-40c0-4.4 3.6-8 8-8zm-56 8l0 40-80 0C28.7 96 0 124.7 0 160l0 96 512 0 0-96c0-35.3-28.7-64-64-64l-80 0 0-40c0-30.9-25.1-56-56-56L200 0c-30.9 0-56 25.1-56 56zM512 304l-192 0 0 16c0 17.7-14.3 32-32 32l-64 0c-17.7 0-32-14.3-32-32l0-16-192 0 0 112c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-112z"]},O3={prefix:"fas",iconName:"pause",icon:[384,512,[9208],"f04c","M48 32C21.5 32 0 53.5 0 80L0 432c0 26.5 21.5 48 48 48l64 0c26.5 0 48-21.5 48-48l0-352c0-26.5-21.5-48-48-48L48 32zm224 0c-26.5 0-48 21.5-48 48l0 352c0 26.5 21.5 48 48 48l64 0c26.5 0 48-21.5 48-48l0-352c0-26.5-21.5-48-48-48l-64 0z"]},V3={prefix:"fas",iconName:"desktop",icon:[512,512,[128421,61704,"desktop-alt"],"f390","M64 32C28.7 32 0 60.7 0 96L0 352c0 35.3 28.7 64 64 64l144 0-16 48-72 0c-13.3 0-24 10.7-24 24s10.7 24 24 24l272 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-72 0-16-48 144 0c35.3 0 64-28.7 64-64l0-256c0-35.3-28.7-64-64-64L64 32zM96 96l320 0c17.7 0 32 14.3 32 32l0 160c0 17.7-14.3 32-32 32L96 320c-17.7 0-32-14.3-32-32l0-160c0-17.7 14.3-32 32-32z"]},j3={prefix:"fas",iconName:"arrow-down",icon:[384,512,[8595],"f063","M169.4 502.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 402.7 224 32c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 370.7-105.4-105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"]},K3={prefix:"fas",iconName:"location-dot",icon:[384,512,["map-marker-alt"],"f3c5","M0 188.6C0 84.4 86 0 192 0S384 84.4 384 188.6c0 119.3-120.2 262.3-170.4 316.8-11.8 12.8-31.5 12.8-43.3 0-50.2-54.5-170.4-197.5-170.4-316.8zM192 256a64 64 0 1 0 0-128 64 64 0 1 0 0 128z"]},X3={prefix:"fas",iconName:"keyboard",icon:[576,512,[9e3],"f11c","M64 64C28.7 64 0 92.7 0 128L0 384c0 35.3 28.7 64 64 64l448 0c35.3 0 64-28.7 64-64l0-256c0-35.3-28.7-64-64-64L64 64zm16 64l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16zM64 240c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32zM176 128l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16zM160 240c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32zm16 80l224 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-224 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16zm80-176c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32zm16 80l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16zm80-80c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32zm16 80l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16zm80-80c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32zm16 80l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16z"]},Q3={prefix:"fas",iconName:"hashtag",icon:[512,512,[62098],"23","M214.7 .7c17.3 3.7 28.3 20.7 24.6 38l-19.1 89.3 126.5 0 22-102.7C372.4 8 389.4-3 406.7 .7s28.3 20.7 24.6 38L412.2 128 480 128c17.7 0 32 14.3 32 32s-14.3 32-32 32l-81.6 0-27.4 128 67.8 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-81.6 0-22 102.7c-3.7 17.3-20.7 28.3-38 24.6s-28.3-20.7-24.6-38l19.1-89.3-126.5 0-22 102.7c-3.7 17.3-20.7 28.3-38 24.6s-28.3-20.7-24.6-38L99.8 384 32 384c-17.7 0-32-14.3-32-32s14.3-32 32-32l81.6 0 27.4-128-67.8 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l81.6 0 22-102.7C180.4 8 197.4-3 214.7 .7zM206.4 192l-27.4 128 126.5 0 27.4-128-126.5 0z"]},J3={prefix:"fas",iconName:"circle-dot",icon:[512,512,[128280,"dot-circle"],"f192","M256 512a256 256 0 1 0 0-512 256 256 0 1 0 0 512zm0-352a96 96 0 1 1 0 192 96 96 0 1 1 0-192z"]},Y3={prefix:"fas",iconName:"arrows-rotate",icon:[512,512,[128472,"refresh","sync"],"f021","M65.9 228.5c13.3-93 93.4-164.5 190.1-164.5 53 0 101 21.5 135.8 56.2 .2 .2 .4 .4 .6 .6l7.6 7.2-47.9 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l128 0c17.7 0 32-14.3 32-32l0-128c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 53.4-11.3-10.7C390.5 28.6 326.5 0 256 0 127 0 20.3 95.4 2.6 219.5 .1 237 12.2 253.2 29.7 255.7s33.7-9.7 36.2-27.1zm443.5 64c2.5-17.5-9.7-33.7-27.1-36.2s-33.7 9.7-36.2 27.1c-13.3 93-93.4 164.5-190.1 164.5-53 0-101-21.5-135.8-56.2-.2-.2-.4-.4-.6-.6l-7.6-7.2 47.9 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L32 320c-8.5 0-16.7 3.4-22.7 9.5S-.1 343.7 0 352.3l1 127c.1 17.7 14.6 31.9 32.3 31.7S65.2 496.4 65 478.7l-.4-51.5 10.7 10.1c46.3 46.1 110.2 74.7 180.7 74.7 129 0 235.7-95.4 253.4-219.5z"]},Z3={prefix:"fas",iconName:"list-ul",icon:[512,512,["list-dots"],"f0ca","M48 144a48 48 0 1 0 0-96 48 48 0 1 0 0 96zM192 64c-17.7 0-32 14.3-32 32s14.3 32 32 32l288 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L192 64zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32l288 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-288 0zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32l288 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-288 0zM48 464a48 48 0 1 0 0-96 48 48 0 1 0 0 96zM96 256a48 48 0 1 0 -96 0 48 48 0 1 0 96 0z"]},c0={prefix:"fas",iconName:"tablet-screen-button",icon:[448,512,["tablet-alt"],"f3fa","M0 64C0 28.7 28.7 0 64 0L384 0c35.3 0 64 28.7 64 64l0 384c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 64zM256 432a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zM384 64l-320 0 0 288 320 0 0-288z"]}});function T(l,c){let a=i6[l],[e,s,,,r]=a.icon,i=Array.isArray(r)?r.join(" "):r;return m`<svg
    viewBox="0 0 ${e} ${s}"
    style="width:1em;height:1em;vertical-align:-0.125em;overflow:visible"
    fill="currentColor"
    role=${c?.label?"img":"presentation"}
    aria-label=${c?.label??""}
    aria-hidden=${c?.label?"false":"true"}
  >
    <path d=${i}></path>
  </svg>`}var i6,l0=h(()=>{"use strict";O();T4();a0();i6={"address-book":v3,"arrow-down":j3,"arrow-left":H3,"arrow-right":z3,ban:U4,bell:H4,briefcase:W3,bullhorn:N3,calendar:R4,"caret-down":$3,"caret-up":B3,chart:w3,"chart-line":r3,check:f3,"check-double":R3,"chevron-down":C3,"circle-dot":J3,"circle-outline":A4,clock:j4,cloud:e3,comment:x3,comments:M3,desktop:V3,dialpad:X3,ellipsis:D4,envelope:F4,expand:W4,fax:I4,fire:Q4,folder:l3,gear:i3,globe:E3,hashtag:Q3,headset:Y4,image:a3,inbox:S3,link:s3,list:Z3,"location-dot":K3,lock:A3,microphone:c3,"microphone-slash":B4,minus:P4,mobile:L3,music:_3,palette:$4,pause:O3,phone:h3,"phone-slash":I3,"phone-volume":u3,play:n3,plug:g3,plus:q3,record:q4,robot:U3,rocket:K4,search:_4,send:X4,shield:P3,sitemap:G4,sliders:t3,sms:E4,sparkles:b3,star:k3,stop:V4,sync:Y3,"table-columns":O4,tablet:c0,tag:G3,transfer:p3,upload:F3,user:m3,users:J4,voicemail:Z4,warning:y3,"window-compact":D3,"window-restore":T3,"window-wide":o3,xmark:d3}});function d1(l){let c=l||{},a=String(c.theme||c.mode||"LIGHT").toLowerCase(),e=a==="dark"?p1:z1,s={mode:a==="auto"?"auto":e.mode,primaryColor:c.primaryColor||c.primary||e.primaryColor,primaryHover:c.primaryHover||e.primaryHover,primaryText:c.primaryText||e.primaryText,radius:c.radius||e.radius,fontFamily:c.fontFamily||e.fontFamily};return a==="auto"&&(s.mode="auto"),s}function o6(l){return l==="dark"?"dark":l==="light"?"light":typeof window<"u"&&typeof window.matchMedia=="function"&&window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}function M1(l,c){let a=d1(l),e=c||(typeof document<"u"?document.documentElement:null);if(!e||!e.style)return a;e.setAttribute("data-dc-theme",o6(a.mode));let s=Object.keys(e0);for(let r=0;r<s.length;r++){let i=s[r],n=a[i];typeof n=="string"&&n.length>0&&e.style.setProperty(e0[i],n)}return a}var z1,p1,e0,L1=h(()=>{"use strict";z1={mode:"light",primaryColor:"#2563eb",primaryHover:"#1d4ed8",primaryText:"#ffffff",radius:"12px",fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'},p1={mode:"dark",primaryColor:"#60a5fa",primaryHover:"#93c5fd",primaryText:"#0f172a",radius:"12px",fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'},e0={primaryColor:"--dc-primary-color",primaryHover:"--dc-primary-hover",primaryText:"--dc-primary-text",radius:"--dc-radius",fontFamily:"--dc-font-family"}});var s0=h(()=>{"use strict";L1()});function v2(l){if(!l||typeof l!="string")return{};let c=l.split(".");if(c.length<2)return{};try{let a=c[1].replace(/-/g,"+").replace(/_/g,"/"),e=a+"===".slice((a.length+3)%4),s=typeof Buffer<"u"?Buffer.from(e,"base64").toString("utf8"):decodeURIComponent(atob(e).split("").map(function(i){return"%"+("00"+i.charCodeAt(0).toString(16)).slice(-2)}).join("")),r=JSON.parse(s);return r&&typeof r=="object"?r:{}}catch{return{}}}function i0(l){let c=v2(l).exp;return typeof c!="number"||!Number.isFinite(c)?null:c*1e3}function o0(l){if(l==null||l==="")return null;if(typeof l=="number"&&Number.isFinite(l))return l<1e12?l*1e3:l;let c=Date.parse(String(l));return Number.isNaN(c)?null:c}function v1(l){return!l||typeof l!="object"?!1:l.status===401||l.statusCode===401?!0:!!(l.response&&l.response.status===401)}function C1(l){return l?l.token||typeof l.getToken=="function"?!0:g1(l.tokenManager):!1}function g1(l){return!!(l&&typeof l.withAuthRetry=="function"&&typeof l.current=="function")}function x1(l,c){let a=l||{},e=g1(a.tokenManager),s=e?a.tokenManager:n0({token:a.token,expires_at:a.expires_at,getToken:a.getToken,onExpired:a.onExpired}),r=typeof c=="function"?s.onTokenChange(c):null,i=!1;return{manager:s,owned:!e,release:function(){i||(i=!0,r&&r(),e||s.destroy())}}}async function S1(l){if(l.manager.current())return l.manager.current();try{return await l.manager.refresh()}catch(c){throw l.release(),c}}function n6(l){return l||(typeof window<"u"&&window&&typeof window.addEventListener=="function"?window:null)}function f6(l,c){if(typeof CustomEvent=="function")return new CustomEvent(l,{bubbles:!0,composed:!0,detail:c});let a=new Event(l,{bubbles:!0,composed:!0});return a.detail=c,a}function u1(l,c){let a=setTimeout(l,Math.min(Math.max(0,c),2147483647));return a&&typeof a.unref=="function"&&a.unref(),a}function n0(l){let c=l||{},a=typeof c.getToken=="function"?c.getToken:null,e=typeof c.onExpired=="function"?c.onExpired:null,s=typeof c.now=="function"?c.now:Date.now,r=n6(c.target),i=[],n="",o=null,t=null,z=null,f=!1,p=!1,d=!1;function g(){t&&(clearTimeout(t),t=null)}function A(){let v=i.slice();for(let x=0;x<v.length;x++)try{v[x](n)}catch{}}function _(v,x){if(g(),f||p)return;f=!0;let C={reason:v,error:x||null,expires_at:o};r&&r.dispatchEvent(f6(r0,C)),e&&e(C)}function S2(){if(g(),d=!1,p||!o)return;let v=o-s();if(!a){t=u1(function(){t=null,_("token_expired")},v);return}let x=Math.floor(v*.8);v-x<1e4&&(x=v-1e4),t=u1(q1,x)}function q1(){t=null,N2("scheduled").catch(function(){})}function j2(v,x){n=String(v),o=i0(n)||o0(x),f=!1,S2(),A()}function _0(){if(d||!o)return!1;let v=o-1e4-s();return v<=0?!1:(d=!0,t=u1(q1,v),!0)}function N2(v){if(p)return Promise.reject(new Error("Token manager was closed"));if(z)return z;if(!a){let C=new Error("No getToken() was provided to refresh the session");return _(v==="unauthorized"?"unauthorized":"refresh_unavailable",C),Promise.reject(C)}let x=d;return z=Promise.resolve().then(function(){return a()}).then(function(C){let b2=typeof C=="string"?C:C&&typeof C.token=="string"?C.token:"";if(!b2)throw new Error("getToken() did not return a token");if(z=null,p)throw new Error("Token manager was closed");return j2(b2,C&&typeof C=="object"?C.expires_at:null),n}).catch(function(C){throw z=null,p||v==="scheduled"&&!x&&_0()||_("refresh_failed",C),C}),z}async function $1(v){try{await N2("unauthorized")}catch{throw v}}function G1(){N2("requested").catch(function(){})}return c.token&&j2(c.token,c.expires_at),r&&r.addEventListener(h1,G1),{current:function(){return n},expiresAt:function(){return o},hasRefresher:function(){return!!a},isExpired:function(){return f},isDestroyed:function(){return p},refresh:function(){return N2("manual")},setToken:function(v,x){if(p)throw new Error("Token manager was closed");if(!v)throw new Error("setToken(token) requires a site token");let C=typeof v=="object"?v.token:v,b2=typeof v=="object"?v.expires_at:x;if(!C)throw new Error("setToken(token) requires a site token");return j2(C,b2),n},withAuthRetry:async function(v){if(p)throw new Error("Token manager was closed");let x;try{x=await v(n)}catch(C){if(!v1(C))throw C;return await $1(C),v(n)}return v1(x)&&x.ok===!1?(await $1(x),v(n)):x},onTokenChange:function(v){return i.push(v),function(){let x=i.indexOf(v);x>=0&&i.splice(x,1)}},destroy:function(){p||(p=!0,g(),z=null,i.length=0,r&&r.removeEventListener(h1,G1))}}}var r0,h1,_2=h(()=>{"use strict";r0="dc-session-expired",h1="dc-refresh-session"});function P(l){if(typeof l=="string"){let c=l.trim();return c&&c!=="[object Object]"?c:""}return""}function p6(l){return!l||typeof l!="object"?{}:l.payload&&typeof l.payload=="object"?l.payload:l.body&&typeof l.body=="object"?l.body:l.response&&l.response.data&&typeof l.response.data=="object"?l.response.data:!(l instanceof Error)&&(l.detail!==void 0||l.title!==void 0||l.message!==void 0)?l:{}}function d6(l){let c=P(l);if(!c||c==="about:blank")return"";let a=c.split("/");return a[a.length-1]||""}function q(l,c){let a=P(c)||"Something went wrong. Try again.";if(typeof l=="string")return{code:"request_failed",message:P(l)||a,reason:null,status:null};let e=p6(l),s=e.detail!==void 0?e.detail:l&&l.detail,r=Number(l&&(l.status||l.statusCode)||e.status)||null,i="",n=null,o="";return s&&typeof s=="object"?(i=P(s.code),n=P(s.reason)||null,o=P(e.message)||P(s.message)||P(e.title)):o=P(s)||P(e.message)||P(e.title),i||(i=P(e.code)||P(l&&l.code)||d6(e.type)),o||(o=P(l&&l.message)),i||(i=r&&m6[r]||"request_failed"),i===m0?o=z0(n):f0[i]&&(o=f0[i]),{code:i,message:o||a,reason:n,status:r}}function z0(l){let c="This contact needs recorded consent before you can text or call them.",a=l&&z6[l];return l==="opted_out"||l==="contact_dnc"?c+" "+a:a?c+" "+a+" "+t0:c+" "+t0}var m0,t6,m6,z6,f0,t0,N1=h(()=>{"use strict";m0="consent_required",t6="sms_registration_required",m6={400:"invalid_request",401:"unauthorized",402:"payment_required",403:"forbidden",404:"not_found",409:"conflict",429:"rate_limited"},z6={no_granted_consent:"Drop Cowboy has no granted consent on file for this contact and number.",phone_mismatch:"This number is not one of the contact's numbers, so their recorded consent does not cover it.",opted_out:"This contact opted out (replied STOP), so they cannot be messaged until they opt back in.",contact_dnc:"This contact is on your Do Not Call list.",contact_not_found:"Drop Cowboy could not find that contact, so there is no recorded consent to use.",consent_record_invalid:"The consent recorded for this contact no longer covers this number or channel."},f0={[t6]:"This number is not registered for texting yet. US carriers only deliver business texts from numbers on a registered brand and campaign (10DLC). Register them in Drop Cowboy, then try again."},t0='Capture consent with the Consent block first, or ask a team admin to turn on "Use existing contact consent" in Building Blocks settings so consent already recorded in Drop Cowboy counts.'});function d0(l){let c=v2(l).scope,a=[],e=Array.isArray(c)?c:typeof c=="string"?c.split(/\s+/):[];for(let s=0;s<e.length;s++){let r=String(e[s]||"").trim();r&&a.indexOf(r)===-1&&a.push(r)}return a}function M0(l){let c=v2(l).sandbox===!0,a=d0(l),e=[];for(let s=0;s<a.length;s++){let r=p0[a[s]]||[];for(let i=0;i<r.length;i++)c&&r[i]==="numbers:write"||e.indexOf(r[i])===-1&&e.push(r[i])}return e}function b1(l,c){return M0(l).indexOf(c)!==-1}var p0,L0=h(()=>{"use strict";_2();p0={contacts:["contacts:read","contacts:write","lists:read","lists:write","webforms:read","consent:read","consent:write"],campaigns:["campaigns:read"],media:["media:read","media:write"],"phone:hub":["numbers:read","numbers:write"],voice:["voice:send"]}});var u0=h(()=>{"use strict"});var o2=h(()=>{"use strict";m1();y4();n1();l0();s0();t1();_2();N1();L0();u0()});var h0,v0,U2,C0=h(()=>{"use strict";h0={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},v0=l=>(...c)=>({_$litDirective$:l,values:c}),U2=class{constructor(c){}get _$AU(){return this._$AM._$AU}_$AT(c,a,e){this._$Ct=c,this._$AM=a,this._$Ci=e}_$AS(c,a){return this.update(c,a)}update(c,a){return this.render(...a)}}});var M6,g0,x0,n2,K,L6,S0,N0,q2,b0=h(()=>{"use strict";s2();({I:M6}=z4),g0=l=>l,x0=()=>document.createComment(""),n2=(l,c,a)=>{let e=l._$AA.parentNode,s=c===void 0?l._$AB:c._$AA;if(a===void 0){let r=e.insertBefore(x0(),s),i=e.insertBefore(x0(),s);a=new M6(r,i,l,l.options)}else{let r=a._$AB.nextSibling,i=a._$AM,n=i!==l;if(n){let o;a._$AQ?.(l),a._$AM=l,a._$AP!==void 0&&(o=l._$AU)!==i._$AU&&a._$AP(o)}if(r!==s||n){let o=a._$AA;for(;o!==r;){let t=g0(o).nextSibling;g0(e).insertBefore(o,s),o=t}}}return a},K=(l,c,a=l)=>(l._$AI(c,a),l),L6={},S0=(l,c=L6)=>l._$AH=c,N0=l=>l._$AH,q2=l=>{l._$AR(),l._$AA.remove()}});var w0,a2,k0=h(()=>{"use strict";s2();C0();b0();w0=(l,c,a)=>{let e=new Map;for(let s=c;s<=a;s++)e.set(l[s],s);return e},a2=v0(class extends U2{constructor(l){if(super(l),l.type!==h0.CHILD)throw Error("repeat() can only be used in text expressions")}dt(l,c,a){let e;a===void 0?a=c:c!==void 0&&(e=c);let s=[],r=[],i=0;for(let n of l)s[i]=e?e(n,i):i,r[i]=a(n,i),i++;return{values:r,keys:s}}render(l,c,a){return this.dt(l,c,a).values}update(l,[c,a,e]){let s=N0(l),{values:r,keys:i}=this.dt(c,a,e);if(!Array.isArray(s))return this.ut=i,r;let n=this.ut??=[],o=[],t,z,f=0,p=s.length-1,d=0,g=r.length-1;for(;f<=p&&d<=g;)if(s[f]===null)f++;else if(s[p]===null)p--;else if(n[f]===i[d])o[d]=K(s[f],r[d]),f++,d++;else if(n[p]===i[g])o[g]=K(s[p],r[g]),p--,g--;else if(n[f]===i[g])o[g]=K(s[f],r[g]),n2(l,o[g+1],s[f]),f++,g--;else if(n[p]===i[d])o[d]=K(s[p],r[d]),n2(l,s[f],s[p]),p--,d++;else if(t===void 0&&(t=w0(i,d,g),z=w0(n,f,p)),t.has(n[f]))if(t.has(n[p])){let A=z.get(i[d]),_=A!==void 0?s[A]:null;if(_===null){let S2=n2(l,s[f]);K(S2,r[d]),o[d]=S2}else o[d]=K(_,r[d]),n2(l,s[f],_),s[A]=null;d++}else q2(s[p]),p--;else q2(s[f]),f++;for(;d<=g;){let A=n2(l,o[g+1]);K(A,r[d]),o[d++]=A}for(;f<=p;){let A=s[f++];A!==null&&q2(A)}return this.ut=i,S0(l,o),W}})});var $2=h(()=>{"use strict";k0()});function T0(l){if(!l||typeof l!="string")return{};let c=l.split(".");if(c.length<2)return{};try{let a=c[1].replace(/-/g,"+").replace(/_/g,"/"),e=a+"===".slice((a.length+3)%4),s=typeof Buffer<"u"?Buffer.from(e,"base64").toString("utf8"):decodeURIComponent(atob(e).split("").map(function(r){return"%"+("00"+r.charCodeAt(0).toString(16)).slice(-2)}).join(""));return JSON.parse(s)}catch{return{}}}var A0,P0=h(()=>{"use strict";A0="https://app-api-v2.dropcowboy.com"});var B0={};q0(B0,{DcContactHub:()=>E});var E,w1=h(()=>{"use strict";O();i2();$2();o2();t2();E=class extends b{constructor(){super(...arguments);this.contacts=[];this.selectedId="";this.token="";this.apiBase="";this.loading=!1;this.errorMessage="";this.http=V();this.fetchGen=0}connectedCallback(){super.connectedCallback(),this.maybeLoadContacts()}updated(a){(a.has("token")||a.has("apiBase"))&&this.maybeLoadContacts()}maybeLoadContacts(){this.contacts.length>0||!this.token||this.loadContacts()}async loadContacts(){if(!this.token)return;let a=++this.fetchGen;this.loading=!0,this.errorMessage="";let e=this.apiBase||F;try{let s=await this.http.get(I2(e),k(this.token));if(a!==this.fetchGen)return;let r=S(s),i=Array.isArray(r)?r:r&&r.contacts||[],n=[];for(let o=0;o<i.length;o++)n.push(f2(i[o]));this.contacts=n,!this.selectedId&&n.length&&(this.selectedId=n[0].id)}catch(s){if(a!==this.fetchGen)return;let r=s instanceof Error?s.message:"";this.errorMessage=r&&r!=="missing parameters"?r:"Contacts could not be loaded."}finally{a===this.fetchGen&&(this.loading=!1)}}selectContact(a){this.selectedId=a}selected(){if(this.selectedId){for(let a=0;a<this.contacts.length;a++)if(this.contacts[a].id===this.selectedId)return this.contacts[a]}}consentPill(a){return a?m`<span class="dc-pill is-online" style="padding:2px 8px"><span class="dc-pdot"></span>Opted in</span>`:m`<span class="dc-pill is-danger" style="padding:2px 8px">Not opted in</span>`}renderNav(){return m`
      <nav class="nav" aria-label="Sections">
        <div class="n" title="Dialer">${T("phone")}</div>
        <div class="n" title="Messages">${T("sms")}</div>
        <div class="n" title="Inbox">${T("inbox")}</div>
        <div class="n on" title="Contacts">${T("user")}</div>
        <div class="n" title="Campaigns">${T("bullhorn")}</div>
        <div class="n" title="Pipeline">${T("chart")}</div>
        <span class="sp"></span>
        <div class="n" title="Settings">${T("gear")}</div>
      </nav>
    `}render(){return m`
      <section class="app" aria-label="Contact hub">
        ${this.renderNav()}
        ${this.renderList()}
        ${this.renderDetail()}
        ${this.renderContext()}
      </section>
    `}renderList(){return this.errorMessage&&!this.contacts.length&&!this.loading?m`<div class="list"><div class="err">${this.errorMessage}</div></div>`:this.loading&&!this.contacts.length?m`<div class="list"><div class="empty">Loading contacts…</div></div>`:this.contacts.length?m`
      <div class="list">
        <div class="lh"><h2>Contacts</h2></div>
        <div class="rows">
          ${a2(this.contacts,a=>a.id,a=>m`
              <div
                class="ct ${a.id===this.selectedId?"sel":""}"
                role="button"
                tabindex="0"
                @click=${()=>this.selectContact(a.id)}
                @keydown=${e=>{(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),this.selectContact(a.id))}}
              >
                <span class="dc-avatar">${a.initials??a.name.slice(0,2)}</span>
                <div class="meta">
                  <div class="nm">${a.name}</div>
                  <div class="sub">${a.phone||a.email||a.company||""}</div>
                </div>
                ${a.consentSms===!0||a.consentVoice===!0?m`<span class="consent-dot" title="Opted in"></span>`:u}
              </div>
            `)}
        </div>
      </div>
    `:m`<div class="list">
        <div class="lh"><h2>Contacts</h2></div>
        <div class="empty">No contacts yet.</div>
      </div>`}renderDetail(){let a=this.selected();return a?m`
      <div class="detail">
        <div class="dh">
          <span class="dc-avatar" style="width:48px;height:48px;font-size:16px"
            >${a.initials??a.name.slice(0,2)}</span
          >
          <div class="who">
            <div class="nm">${a.name}</div>
            ${a.company?m`<div class="sub">${a.company}</div>`:u}
          </div>
        </div>
        <div class="detail-body">
          <div class="card">
            <div class="ch">Details</div>
            <div class="fields">
              ${a.phone?m`<div class="kv"><span class="k">Phone</span><span>${a.phone}</span></div>`:u}
              ${a.email?m`<div class="kv"><span class="k">Email</span><span>${a.email}</span></div>`:u}
              ${a.consentSms!=null?m`<div class="kv"><span class="k">SMS consent</span>${this.consentPill(a.consentSms===!0)}</div>`:u}
              ${a.consentVoice!=null?m`<div class="kv"><span class="k">Voice consent</span>${this.consentPill(a.consentVoice===!0)}</div>`:u}
            </div>
          </div>
        </div>
      </div>
    `:m`<div class="detail"><div class="pick">Select a contact</div></div>`}renderContext(){let a=this.selected();if(!a)return m`<aside class="ctx"></aside>`;let e=a.consentSms!=null||a.consentVoice!=null;return m`
      <aside class="ctx">
        ${e?m`
              <h4>Consent</h4>
              ${a.consentSms!=null?m`<div class="kv"><span class="k">SMS</span>${this.consentPill(a.consentSms===!0)}</div>`:u}
              ${a.consentVoice!=null?m`<div class="kv"><span class="k">Voice</span>${this.consentPill(a.consentVoice===!0)}</div>`:u}
            `:u}
        ${a.stage?m`
              <h4>Pipeline</h4>
              <div class="kv"><span class="k">Stage</span><span>${a.stage}</span></div>
            `:u}
        ${a.owner?m`
              <h4>Owner</h4>
              <div class="kv"><span class="k">Assigned</span><span>${a.owner}</span></div>
            `:u}
      </aside>
    `}};E.styles=[b.styles,B`
      :host {
        display: block;
        width: 100%;
        max-width: 100%;
        height: 100%;
        min-height: 640px;
      }
      .app {
        display: grid;
        grid-template-columns: 76px minmax(240px, 332px) minmax(0, 1fr) minmax(200px, 286px);
        height: 100%;
        background: var(--dc-bg-color);
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
      }
      .nav .n.on {
        background: var(--dc-primary-soft);
        color: var(--dc-primary-color);
      }
      .nav .sp {
        flex: 1;
      }
      .list {
        border-right: 1px solid var(--dc-border-color);
        display: flex;
        flex-direction: column;
        min-width: 0;
        background: var(--dc-bg-color);
      }
      .lh {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 14px 16px 10px;
      }
      .lh h2 {
        font-size: 16px;
        margin: 0;
      }
      .rows {
        overflow: auto;
        flex: 1;
      }
      .ct {
        display: flex;
        gap: 11px;
        padding: 12px 14px;
        border-bottom: 1px solid var(--dc-border-color);
        cursor: pointer;
        align-items: center;
      }
      .ct:hover {
        background: var(--dc-surface-color);
      }
      .ct.sel {
        background: var(--dc-primary-soft);
      }
      .ct .meta {
        min-width: 0;
        flex: 1;
      }
      .ct .nm {
        font-weight: 600;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .ct .sub {
        font-size: var(--dc-font-size-sm);
        color: var(--dc-text-muted);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .consent-dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: var(--dc-online);
        flex-shrink: 0;
      }
      .detail {
        display: flex;
        flex-direction: column;
        min-width: 0;
      }
      .dh {
        display: flex;
        align-items: center;
        gap: 14px;
        padding: 18px 22px;
        border-bottom: 1px solid var(--dc-border-color);
      }
      .dh .who {
        min-width: 0;
      }
      .dh .who .nm {
        font-size: 19px;
        font-weight: 700;
      }
      .dh .who .sub {
        color: var(--dc-text-muted);
        font-size: var(--dc-font-size-sm);
      }
      .detail-body {
        flex: 1;
        overflow: auto;
        padding: 20px 22px;
        background: var(--dc-surface-color);
      }
      .card {
        background: var(--dc-bg-color);
        border: 1px solid var(--dc-border-color);
        border-radius: var(--dc-radius-sm);
        padding: 6px 16px 12px;
        margin-bottom: 16px;
      }
      .card .ch {
        font-weight: 700;
        font-size: var(--dc-font-size-sm);
        padding: 10px 0 8px;
        border-bottom: 1px solid var(--dc-border-color);
        margin-bottom: 6px;
      }
      .fields {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 0 24px;
      }
      .kv {
        display: flex;
        justify-content: space-between;
        gap: 8px;
        font-size: var(--dc-font-size-sm);
        padding: 8px 0;
        border-bottom: 1px solid var(--dc-border-color);
      }
      .kv .k {
        color: var(--dc-text-muted);
      }
      .ctx {
        border-left: 1px solid var(--dc-border-color);
        background: var(--dc-surface-color);
        padding: 18px 16px;
        overflow: auto;
      }
      .ctx h4 {
        font-size: var(--dc-font-size-xs);
        text-transform: uppercase;
        letter-spacing: 0.04em;
        color: var(--dc-text-light);
        margin: 18px 0 8px;
      }
      .ctx h4:first-child {
        margin-top: 0;
      }
      .ctx .kv {
        padding: 6px 0;
      }
      .empty,
      .err,
      .pick {
        padding: 18px 16px;
        color: var(--dc-text-muted);
        font-size: var(--dc-font-size-sm);
      }
      .err {
        color: var(--dc-danger-text);
      }
      @media (max-width: 900px) {
        .app {
          grid-template-columns: 76px minmax(200px, 280px) 1fr;
        }
        .ctx {
          display: none;
        }
      }
      @media (max-width: 640px) {
        .app {
          grid-template-columns: 1fr;
        }
        .nav {
          display: none;
        }
        .fields {
          grid-template-columns: 1fr;
        }
      }
    `],M([L({attribute:!1})],E.prototype,"contacts",2),M([L({type:String,attribute:"selected-id"})],E.prototype,"selectedId",2),M([L({type:String})],E.prototype,"token",2),M([L({type:String,attribute:"api-base"})],E.prototype,"apiBase",2),M([L({type:Boolean})],E.prototype,"loading",2),M([L({type:String,attribute:"error-message"})],E.prototype,"errorMessage",2),E=M([U("dc-contact-hub")],E)});function H(l,c){let a=String(l||F).replace(/\/$/,"");return c.charAt(0)==="/"?a+c:a+"/"+c}function W2(l,c){return H(l,"/contact/public/contacts/"+encodeURIComponent(c))}function g2(l,c){return H(l,"/contact/public/contacts/"+encodeURIComponent(c)+"/timeline")}function O2(l){return H(l,"/boards/public/boards")}function P1(l,c){return H(l,"/boards/public/pipelines/"+encodeURIComponent(c)+"/snapshot")}function B1(l,c){return H(l,"/contact/public/lists/"+encodeURIComponent(c)+"/contacts")}function I2(l){return H(l,"/contact/public/contacts")}function R0(l,c,a){let e=c||{},s=[];for(let r=0;r<a.length;r++){let i=e[a[r]];i!=null&&i!==""&&s.push(encodeURIComponent(a[r])+"="+encodeURIComponent(String(i)))}return s.length?l+"?"+s.join("&"):l}function C6(l,c){return R0(I2(l),c,h6)}function g6(l,c){return R0(H(l,"/contact/public/contacts/search"),c,v6)}function x6(l,c){return H(l,"/contact/public/contacts/"+encodeURIComponent(c)+"/owner")}function S6(l,c){return H(l,"/contact/public/contacts/"+encodeURIComponent(c)+"/disposition")}function N6(l,c){return H(l,"/contact/public/contacts/"+encodeURIComponent(c)+"/lists")}function E1(l,c){return H(l,"/contact/public/contacts/"+encodeURIComponent(c)+"/lists/move")}function b6(l,c){return H(l,"/boards/public/boards/"+encodeURIComponent(c)+"/lists")}function V(){return{get:function(l,c){return k1("GET",l,void 0,c)},post:function(l,c,a){return k1("POST",l,c,a)},put:function(l,c,a){return k1("PUT",l,c,a)}}}function k1(l,c,a,e){let s={method:l,headers:e||{}};return a!==void 0&&(s.body=JSON.stringify(a)),fetch(c,s).then(function(r){return r.json().catch(function(){return{}}).then(function(i){if(!r.ok){let n=q({status:r.status,payload:i},"Request failed ("+r.status+")"),o=new Error(n.message);throw o.status=r.status,o.code=n.code,o.payload=i,o}return i})})}function S(l){return!l||typeof l!="object"?l:l.data!==void 0?l.data:l}function k(l){return{"Content-Type":"application/json",Authorization:"Bearer "+l}}function w6(l){typeof window>"u"||(window.DropCowboy=window.DropCowboy||{},window.DropCowboy.contacts=l)}function k6(l){let c=l||{};if(c.fields||c.field_map||c.values||c.field_values){let r={fields:c.fields||c.field_map,values:c.values||c.field_values};return c.add_list_ids&&(r.add_list_ids=c.add_list_ids),c.add_tag_ids&&(r.add_tag_ids=c.add_tag_ids),c.owner&&(r.owner=c.owner),c.conflict_mode&&(r.conflict_mode=c.conflict_mode),r}let a=[],e=[];for(let r=0;r<E0.length;r++){let i=E0[r];c[i]!=null&&c[i]!==""&&(a.push({type:i}),e.push(c[i]))}c.phone&&!c.main_phone&&(a.push({type:"main_phone"}),e.push(c.phone));let s={fields:a,values:[e]};return c.add_list_ids&&(s.add_list_ids=c.add_list_ids),c.add_tag_ids&&(s.add_tag_ids=c.add_tag_ids),c.owner&&(s.owner=c.owner),s}function l2(l,c){if(!l)return"";if(l[c]!=null&&l[c]!=="")return l[c];let a=l.field_data||[];for(let e=0;e<a.length;e++)if(a[e]&&a[e].type===c)return a[e].value;return""}function y6(l){let c=String(l||"").trim().split(/\s+/),a="";for(let e=0;e<c.length&&a.length<2;e++)c[e]&&(a+=c[e].charAt(0));return a.toUpperCase()||"?"}function A6(l){let c=String(l||"").replace(/\D/g,""),a=c.length===11&&c.charAt(0)==="1"?c.slice(1):c;return a.length===10?"("+a.slice(0,3)+") "+a.slice(3,6)+"-"+a.slice(6):String(l||"")}function F0(l){return typeof l=="boolean"?l:void 0}function f2(l){let a=(l&&l.contact?l.contact:l)||{},e=a.first_name||l2(a,"first_name")||"",s=a.last_name||l2(a,"last_name")||"",r=a.main_phone||l2(a,"main_phone")||"";if(!r&&Array.isArray(a.phone_numbers)&&a.phone_numbers.length){let z=a.phone_numbers[0];r=typeof z=="string"?z:z&&z.phone_number||""}let i=String(a.email||l2(a,"email")||""),n=[e,s].filter(Boolean).join(" ")||a.name||"",o=n,t=y6(n);return!n&&i?(o=i,t=i.charAt(0).toUpperCase()):!n&&r?(o=A6(r),t="#"):n||(o="Unknown"),{id:a.contact_id||a.id,name:o,phone:String(r||""),email:i,company:a.company||l2(a,"company")||"",stage:a.stage||l2(a,"stage")||"",owner:a.owner||"",initials:t,consentSms:F0(a.has_sms_consent),consentVoice:F0(a.has_tcpa_consent),source:a.first_touch&&a.first_touch.source||""}}function T6(l){let c=String(l||"").toLowerCase();return c==="sms"||c.indexOf("sms")!==-1?"sms":c==="call"||c.indexOf("call")!==-1?"call":c.indexOf("rvm")!==-1||c.indexOf("voicemail")!==-1?"rvm":c.indexOf("email")!==-1?"email":c.indexOf("chat")!==-1?"chat":c.indexOf("consent")!==-1?"consent":c.indexOf("web_form")!==-1||c==="form"?"form":c==="note"||c.indexOf("note")!==-1?"note":"system"}function P6(l){if(l==null||l==="")return"";let c=typeof l=="number"?l:Date.parse(l);if(!c||Number.isNaN(c))return String(l);try{return new Date(c).toLocaleString()}catch{return""}}function B6(l){let c=l||{};return{id:c.timeline_id||c.id||String(c.created_at||""),kind:T6(c.type||c.timeline_type),text:c.text||c.body||c.note||c.preview||c.type||"Activity",when:P6(c.created_at),actor:c.actor||c.user_name||""}}function x2(l){let c=S(l),a=Array.isArray(c)?c:c&&c.entries||[],e=[];for(let s=0;s<a.length;s++)e.push(B6(a[s]));return e}function F1(l){let c=S(l);return!!c&&typeof c=="object"&&Number(c.skipped)>0}function H1(){let l=new Error("This contact could not be moved to that stage because it belongs to a different brand than the stage list.");return l.code=E6,l}function R1(l,c,a,e){if(!Array.isArray(l)||!c||a===e)return null;let s=null,r=!1;for(let n=0;n<l.length;n++){let o=l[n];if(o.id===e&&(r=!0),o.id===a)for(let t=0;t<o.deals.length;t++)o.deals[t].id===c&&(s=o.deals[t])}if(!s||!r)return null;let i=[];for(let n=0;n<l.length;n++){let o=l[n];if(o.id===a){let t=[];for(let z=0;z<o.deals.length;z++)o.deals[z].id!==c&&t.push(o.deals[z]);i.push({id:o.id,label:o.label,tone:o.tone,deals:t})}else o.id===e?i.push({id:o.id,label:o.label,tone:o.tone,deals:[s].concat(o.deals)}):i.push(o)}return i}function F6(l){if(!l)return"";let c=typeof l=="number"?l:Date.parse(l);if(!c||Number.isNaN(c))return"";let a=Date.now()-c,e=Math.max(0,Math.round(a/6e4));if(e<60)return e+"m";let s=Math.round(e/60);return s<48?s+"h":Math.round(s/24)+"d"}function H6(l,c){let a=f2(l),e=Number(l2(l,"deal_value")||0);return{id:a.id,contact:a,value:e>1e3?Math.round(e/100):e,channel:c||"sms",age:F6(l&&(l.modified_at||l.created_at))}}function D1(l,c){let a=l&&l.stages||[],e=[];for(let s=0;s<a.length;s++){let r=a[s]||{},i=r.list_id,n=c&&c[i]||[],o=[];for(let t=0;t<n.length;t++)o.push(H6(n[t]));e.push({id:i,label:r.name||r.label||"Stage "+(s+1),tone:H0[s%H0.length],deals:o})}return e}function _1(l,c){let a=String(c||y1).replace(/\/$/,""),e=l?String(l).charAt(0)==="#"?l:"#"+l:"#/contacts",s=a+e;return typeof window<"u"&&typeof window.open=="function"&&window.open(s,"_blank","noopener"),s}function V2(l){return new A1(l||T1)}function R(){return C2||(C2=V2(T1)),C2}async function R6(l){return R().init(l)}function D6(l){R().setTheme(l)}function _6(l){return R().addErrorListener(l)}function U6(l){return R().setToken(l)}async function q6(l){return R().openContact(l)}async function $6(l){return R().openBoard(l)}async function G6(l){return R().listContacts(l)}async function I6(l){return R().searchContacts(l)}async function W6(l){return R().openHub(l)}async function O6(l){return R().createContact(l)}async function V6(l,c){return R().updateContact(l,c)}async function j6(l,c,a){return R().moveCard(l,c,a)}async function K6(){let l=C2;C2=null,l&&await l.close()}var T1,C2,y1,F,h6,v6,E0,E6,H0,A1,t2=h(()=>{"use strict";P0();L1();N1();_2();T1={},C2=null,y1="https://dropcowboy.com/app",F=A0;h6=["limit","offset","search_term","list_id","disposition","owner","brand_id","sort_by","sort_order"],v6=["phone","email","limit","offset","brand_id"];E0=["first_name","last_name","main_phone","email","company","stage"];E6="move_skipped";H0=["info","warning","online","neutral","danger"];A1=class{constructor(c){this.http=c&&c.http||T1.http||V(),this.token=null,this.session=null,this.el=null,this.apiBase=F,this.portalBase=y1,this.teamId=null,this.theme={},this.errorListeners=[]}async init(c){if(!C1(c))throw new Error("init({ token }) requires a site token from POST /embed/token");this.apiBase=c.contactApiBase||c.apiBase||F,this.portalBase=c.portalBase||y1,this._releaseSession(),this.session=x1(c,a=>this._applyToken(a)),this._applyToken(await S1(this.session))}setToken(c){if(!this.session)throw new Error("Call init({ token }) before setToken");return this.session.manager.setToken(c)}getTokenManager(){return this.session?this.session.manager:null}_applyToken(c){this.token=c||null;let a=T0(c);this.teamId=a.team_id||null,this.el&&c&&this.el.token!==c&&(this.el.token=c)}_releaseSession(){this.session&&(this.session.release(),this.session=null)}_authed(c){if(!this.session||!this.token)throw new Error("init({ token }) is required for /contact/public and /boards/public");return this.session.manager.withAuthRetry(a=>c(k(a)))}setTheme(c){this.theme=Object.assign({},this.theme,c||{}),this.theme.primary&&!this.theme.primaryColor&&(this.theme.primaryColor=this.theme.primary),M1(this.theme)}getTheme(){return this.theme}credHeaders(){if(!this.token)throw new Error("init({ token }) is required for /contact/public and /boards/public");return k(this.token)}addErrorListener(c){return this.errorListeners.push(c),()=>{this.errorListeners=this.errorListeners.filter(function(a){return a!==c})}}async openContact(c){if(!c)throw new Error("openContact(contactId) requires a contact id");let a=await this._authed(i=>this.http.get(W2(this.apiBase,c),i)),e=S(a),s=f2(e),r=[];try{r=x2(await this._authed(i=>this.http.get(g2(this.apiBase,c),i)))}catch{r=[]}return{contact:s,timeline:r}}async listContacts(c){let a=await this._authed(e=>this.http.get(C6(this.apiBase,c),e));return S(a)}async searchContacts(c){let a=c||{};if(!a.phone&&!a.email)throw new Error("searchContacts({ phone, email }) needs a phone or an email");let e=await this._authed(s=>this.http.get(g6(this.apiBase,a),s));return S(e)}async openHub(c){if(!this.token)throw new Error("Call init({ token }) before openHub()");(typeof customElements>"u"||!customElements.get("dc-contact-hub"))&&await Promise.resolve().then(()=>(w1(),B0));let a=c||{},e=this._resolveContainer(a.container),s=e;return(!e.tagName||String(e.tagName).toLowerCase()!=="dc-contact-hub")&&(s=e.querySelector&&e.querySelector("dc-contact-hub"),!s&&e.appendChild&&(s=document.createElement("dc-contact-hub"),e.appendChild(s))),s&&(s.token=this.token,s.apiBase=this.apiBase,this.el=s),s}_resolveContainer(c){if(typeof document>"u")throw new Error("openHub() requires a browser document");if(!c)return document.body;if(typeof c=="string"){let a=document.querySelector(c);if(!a)throw new Error("openHub() container not found");return a}return c}async openBoard(c){let a=c,e="Pipeline";if(!a){let o=await this._authed(f=>this.http.get(O2(this.apiBase),f)),t=S(o),z=Array.isArray(t)?t:t&&t.boards||[];if(!z.length)return{boardName:e,lanes:[]};a=z[0].board_id||z[0].id,e=z[0].name||e}let s=await this._authed(o=>this.http.get(P1(this.apiBase,a),o)),r=S(s)||{};r.name&&(e=r.name);let i={},n=r.stages||[];for(let o=0;o<n.length;o++){let t=n[o]&&n[o].list_id;if(!t)continue;let z=await this._authed(p=>this.http.get(B1(this.apiBase,t),p)),f=S(z);i[t]=f&&f.contacts||(Array.isArray(f)?f:[])}return{boardId:a,boardName:e,lanes:D1(r,i)}}async createContact(c){let a=await this._authed(e=>this.http.post(I2(this.apiBase),k6(c),e));return S(a)}async updateContact(c,a){if(!c)throw new Error("updateContact(contactId, contact) requires a contact id");let e={contact:a&&a.contact?a.contact:a||{}},s=await this._authed(r=>this.http.put(W2(this.apiBase,c),e,r));return S(s)}async setOwner(c,a){if(!c)throw new Error("setOwner(contactId, ownerId) requires a contact id");let e=await this._authed(s=>this.http.put(x6(this.apiBase,c),{owner_id:a},s));return S(e)}async setDisposition(c,a){if(!c)throw new Error("setDisposition(contactId, disposition) requires a contact id");let e=await this._authed(s=>this.http.put(S6(this.apiBase,c),{disposition:a},s));return S(e)}async addToList(c,a){if(!c)throw new Error("addToList(contactId, listIds) requires a contact id");let e=Array.isArray(a)?a:[a],s=await this._authed(r=>this.http.post(N6(this.apiBase,c),{list_ids:e},r));return S(s)}async moveCard(c,a,e){if(!c||!a||!e)throw new Error("moveCard(contactId, fromListId, toListId) requires contact and list ids");let s=await this._authed(r=>this.http.post(E1(this.apiBase,c),{from_list_id:a,to_list_id:e},r));if(F1(s))throw H1();return S(s)}async createBoard(c){let a=c||{},e={name:a.name,lists:a.lists};a.brand_id&&(e.brand_id=a.brand_id),a.shared_across_brands!=null&&(e.shared_across_brands=a.shared_across_brands);let s=await this._authed(r=>this.http.post(O2(this.apiBase),e,r));return S(s)}async addBoardList(c,a){if(!c)throw new Error("addBoardList(boardId, list) requires a board id");let e=await this._authed(s=>this.http.post(b6(this.apiBase,c),{list:a},s));return S(e)}openInPortal(c){return _1(c||"#/contacts",this.portalBase)}async close(){this._releaseSession(),this.token=null,this.el=null,this.errorListeners=[]}};w6({init:R6,setTheme:D6,addErrorListener:_6,openContact:q6,openBoard:$6,openHub:W6,listContacts:G6,searchContacts:I6,createContact:O6,updateContact:V6,moveCard:j6,setToken:U6,close:K6,createEmbedContacts:V2})});var K2="__dcBundle",V1=/^DropCowboy./,$=typeof window<"u"?window:globalThis,w2=$0();function $0(){let l={},c={},a=$.DropCowboy;if(a&&typeof a=="object"){let s=Object.keys(a);for(let r=0;r<s.length;r++)l[s[r]]=a[s[r]]}let e=Object.keys($);for(let s=0;s<e.length;s++)V1.test(e[s])&&(c[e[s]]=$[e[s]]);return{namespaces:l,globals:c}}function X2(l,c){return Object.prototype.hasOwnProperty.call(l,c)}function W1(l,c,a,e){let s=Object.keys(l);for(let r=0;r<s.length;r++){let i=s[r];!e(i)||X2(a,i)||(X2(c,i)?l[i]!==c[i]&&(l[i]=c[i]):delete l[i])}}function O1(l,c,a){return l&&l[K2]===a?l:(X2(c,K2)||Object.defineProperty(c,K2,{value:a}),c)}function G0(){return!0}function j1(l){let c=l.namespaces||{},a=l.globals||{};(!$.DropCowboy||typeof $.DropCowboy!="object")&&($.DropCowboy={});let e=$.DropCowboy;W1(e,w2.namespaces,c,G0),W1($,w2.globals,a,function(n){return V1.test(n)});let s={},r=Object.keys(c);for(let n=0;n<r.length;n++){let o=r[n];e[o]=O1(w2.namespaces[o],c[o],l.bundle),s[o]=e[o]}let i=Object.keys(a);for(let n=0;n<i.length;n++){let o=i[n];$[o]=O1(w2.globals[o],a[o],l.bundle)}return s}function K1(l,c){if("tokenManager"in l){l.tokenManager!==c.manager&&(l.tokenManager=c.manager);return}l.token=c.token}function X1(l){let c=l.selector,a=l.apply,e=new WeakSet,s=null,r=null,i=null;function n(f){!s||!s.token||(f.token||f.tokenManager)&&!e.has(f)||(e.add(f),a(f,s))}function o(f){if(!f||f.nodeType!==1)return;f.matches(c)&&n(f);let p=f.querySelectorAll(c);for(let d=0;d<p.length;d++)n(p[d])}function t(){r&&(r.disconnect(),r=null),i&&(i(),i=null),s=null}function z(f,p){t(),!(typeof document>"u"||!f)&&(s={token:f.current(),manager:f,settings:p||{}},i=f.onTokenChange(function(d){s&&(s.token=d,o(document.documentElement))}),typeof MutationObserver=="function"&&(r=new MutationObserver(function(d){for(let g=0;g<d.length;g++){let A=d[g].addedNodes;for(let _=0;_<A.length;_++)o(A[_])}}),r.observe(document.documentElement,{childList:!0,subtree:!0})),o(document.documentElement))}return{start:z,stop:t}}O();i2();o2();O();i2();$2();o2();o2();var y0={sms:{content:"S",bg:"#16a34a"},mms:{content:"M",bg:"#16a34a"},chat:{content:"C",bg:"var(--dc-primary-color)"},call:{content:T("phone"),bg:"#7c3aed"},rvm:{content:"V",bg:"#7c3aed"},email:{content:"@",bg:"#ea580c"},form:{content:"F",bg:"#0ea5e9"},consent:{content:T("check"),bg:"#22c55e"},note:{content:T("lock"),bg:"var(--dc-warning)"},system:{content:T("circle-dot"),bg:"var(--dc-text-light)"}};function u6(l){return y0[l]??y0.system}var G2={glyph:u6};t2();var D=class extends b{constructor(){super(...arguments);this.events=[];this.loading=!1;this.contactId="";this.token="";this.tokenManager=null;this.apiBase="";this.errorMessage="";this.http=V();this.fetchGen=0}updated(a){(a.has("contactId")||a.has("tokenManager")||a.has("token")&&!this.tokenManager)&&this.reload()}async reload(){if(!this.contactId||!this.token&&!this.tokenManager)return;let a=this.contactId,e=g2(this.apiBase||F,a),s=++this.fetchGen;this.loading=!0,this.errorMessage="";try{let r=this.tokenManager?await this.tokenManager.withAuthRetry(i=>this.http.get(e,k(i))):await this.http.get(e,k(this.token));s===this.fetchGen&&(this.events=x2(r))}catch(r){if(s!==this.fetchGen)return;let i=q(r,"Activity could not be loaded.");this.events=[],this.errorMessage=i.message,this.dispatchEvent(new CustomEvent("dc-error",{detail:{code:i.code,message:i.message,reason:i.reason,contact_id:a},bubbles:!0,composed:!0}))}finally{s===this.fetchGen&&(this.loading=!1)}}render(){return m`
      <section class="wrap dc-panel" aria-label="Activity timeline" aria-busy=${this.loading?"true":"false"}>
        <div class="head">Activity<span class="sp"></span><span class="dc-light dc-xs">all channels</span></div>
        ${this.loading?this.renderSkeleton():this.renderEvents()}
      </section>
    `}renderEvents(){return this.errorMessage?m`<div class="note err" role="alert">${this.errorMessage}</div>`:this.events.length?m`
      ${a2(this.events,a=>a.id,a=>{let e=G2.glyph(a.kind);return m`<div class="ev">
            <span class="dot" style="background:${e.bg}">${e.content}</span>
            <div class="tx">${a.text}<div class="tt">${a.when}${a.actor?` \xB7 ${a.actor}`:""}</div></div>
          </div>`})}
    `:m`<div class="note">No activity yet.</div>`}renderSkeleton(){return m`
      ${[0,1,2].map(a=>m`<div class="ev">
          <span class="dot" style="background:var(--dc-surface-2)"></span>
          <div class="tx" style="display:flex;flex-direction:column;gap:6px">
            <span class="skel" style="width:${70-a*8}%"></span>
            <span class="skel" style="width:30%"></span>
          </div>
        </div>`)}
    `}};D.styles=[b.styles,B`
      :host {
        display: block;
        width: 460px;
        max-width: 100%;
      }
      .wrap {
        padding: 6px 16px 12px;
      }
      .head {
        font-weight: 700;
        font-size: var(--dc-font-size-sm);
        padding: 10px 0 8px;
        border-bottom: 1px solid var(--dc-border-color);
        margin-bottom: 4px;
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .head .sp {
        flex: 1;
      }
      .ev {
        display: flex;
        gap: 11px;
        padding: 10px 0;
      }
      .ev + .ev {
        border-top: 1px solid var(--dc-border-color);
      }
      .dot {
        width: 26px;
        height: 26px;
        border-radius: 7px;
        display: grid;
        place-items: center;
        font-size: 11px;
        color: #fff;
        flex-shrink: 0;
      }
      .tx {
        font-size: var(--dc-font-size-sm);
        flex: 1;
      }
      .tt {
        color: var(--dc-text-light);
        font-size: var(--dc-font-size-xs);
        margin-top: 1px;
      }
      .note {
        padding: 12px 0;
        color: var(--dc-text-muted);
        font-size: var(--dc-font-size-sm);
      }
      .note.err {
        color: var(--dc-danger-text);
      }
      .skel {
        height: 12px;
        border-radius: 4px;
        background: var(--dc-surface-2);
        animation: pulse 1.2s ease-in-out infinite;
      }
      @keyframes pulse {
        0%,
        100% {
          opacity: 1;
        }
        50% {
          opacity: 0.5;
        }
      }
    `],M([L({attribute:!1})],D.prototype,"events",2),M([L({type:Boolean})],D.prototype,"loading",2),M([L({type:String,attribute:"contact-id"})],D.prototype,"contactId",2),M([L({type:String})],D.prototype,"token",2),M([L({attribute:!1})],D.prototype,"tokenManager",2),M([L({type:String,attribute:"api-base"})],D.prototype,"apiBase",2),M([L({type:String,attribute:"error-message"})],D.prototype,"errorMessage",2),D=M([U("dc-contact-timeline")],D);t2();var w=class extends b{constructor(){super(...arguments);this.timeline=[];this.loading=!1;this.source="";this.campaigns=!1;this.contactId="";this.token="";this.tokenManager=null;this.apiBase="";this.errorMessage="";this.http=V();this.fetchGen=0}updated(a){(a.has("contactId")||a.has("tokenManager")||a.has("token")&&!this.tokenManager)&&this.loadContact()}authedGet(a){return this.tokenManager?this.tokenManager.withAuthRetry(e=>this.http.get(a,k(e))):this.http.get(a,k(this.token))}async loadContact(){if(!this.contactId)return;if(!this.token&&!this.tokenManager){this.errorMessage="token is required to load GET /contact/public/contacts/:id (init({ token }))";return}let a=++this.fetchGen;this.loading=!0,this.errorMessage="";let e=this.apiBase||F;try{let s=await this.authedGet(W2(e,this.contactId));if(a!==this.fetchGen)return;let r=f2(S(s));this.contact=r,this.consentSms=r.consentSms,this.consentVoice=r.consentVoice,this.source=r.source||"";try{let i=await this.authedGet(g2(e,this.contactId));if(a!==this.fetchGen)return;this.timeline=x2(i)}catch{this.timeline=[]}}catch(s){if(a!==this.fetchGen)return;this.errorMessage=q(s,"Unable to load contact").message}finally{a===this.fetchGen&&(this.loading=!1)}}act(a){let e=this.contact,s=e?{contact_id:e.id||this.contactId||null,phone:e.phone||null,name:e.name}:void 0;this.dispatchEvent(new CustomEvent(a,{detail:s,bubbles:!0,composed:!0}))}render(){if(this.errorMessage&&!this.contact&&!this.loading)return m`<section class="dc-panel" aria-label="Contact error">
        <div class="err">${this.errorMessage}</div>
      </section>`;if(this.loading||!this.contact)return this.renderLoading();let a=this.contact;return m`
      <section class="dc-panel" aria-label="Contact ${a.name}">
        <div class="head">
          <span class="dc-avatar big">${a.initials??a.name.slice(0,2)}</span>
          <div class="who">
            <div class="nm">${a.name}</div>
            <div class="sub">${a.company??a.phone}</div>
          </div>
          <div class="acts">
            <button class="dc-iconbtn" title="Call" aria-label="Call ${a.name}" @click=${()=>this.act("dc-call")}>
              <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            </button>
            <button class="dc-iconbtn" title="Text" aria-label="Text ${a.name}" @click=${()=>this.act("dc-text")}>
              <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            </button>
            ${this.campaigns?m`<button class="dc-btn dc-secondary" aria-label="Add ${a.name} to a campaign" @click=${()=>this.act("dc-add-campaign")}>
                  <span class="label">Add to campaign</span>
                </button>`:u}
          </div>
        </div>
        <div class="body">
          <div class="sub-card">
            <div class="ch">Details</div>
            <div class="fields">
              <div class="kv"><span class="k">Phone</span><span>${a.phone}</span></div>
              <div class="kv"><span class="k">Stage</span><span>${a.stage||"\u2014"}</span></div>
              <div class="kv"><span class="k">Owner</span><span>${a.owner||"Unassigned"}</span></div>
              ${this.source?m`<div class="kv"><span class="k">Source</span><span>${this.source}</span></div>`:u}
              <div class="kv"><span class="k">SMS consent</span>${this.consentPill(this.consentSms)}</div>
              <div class="kv"><span class="k">Voice consent</span>${this.consentPill(this.consentVoice)}</div>
            </div>
          </div>
          <dc-contact-timeline .events=${this.timeline}></dc-contact-timeline>
        </div>
      </section>
    `}consentPill(a){return a===void 0?m`<span class="dc-pill" style="padding:2px 8px">Not recorded</span>`:a?m`<span class="dc-pill is-online" style="padding:2px 8px"><span class="dc-pdot"></span>Opted in</span>`:m`<span class="dc-pill is-danger" style="padding:2px 8px">Not opted in</span>`}renderLoading(){return m`
      <section class="dc-panel" aria-label="Loading contact" aria-busy="true">
        <div class="head">
          <span class="dc-avatar big" style="background:var(--dc-surface-2);color:transparent">··</span>
          <div class="who" style="display:flex;flex-direction:column;gap:8px">
            <span class="skel" style="width:160px"></span>
            <span class="skel" style="width:110px"></span>
          </div>
        </div>
        <div class="body">
          <div class="sub-card">
            <div class="ch">Details</div>
            <div class="fields">
              ${[0,1,2,3].map(()=>m`<div class="kv"><span class="skel" style="width:70px"></span><span class="skel" style="width:90px"></span></div>`)}
            </div>
          </div>
          <dc-contact-timeline loading></dc-contact-timeline>
        </div>
      </section>
      ${u}
    `}};w.styles=[b.styles,B`
      :host {
        display: block;
        width: 520px;
        max-width: 100%;
      }
      .head {
        display: flex;
        align-items: center;
        gap: 14px;
        padding: 16px 18px;
        border-bottom: 1px solid var(--dc-border-color);
      }
      .big {
        width: 48px;
        height: 48px;
        font-size: 16px;
      }
      .who {
        min-width: 0;
        flex: 1;
      }
      .who .nm {
        font-size: 18px;
        font-weight: 700;
      }
      .who .sub {
        color: var(--dc-text-muted);
        font-size: var(--dc-font-size-sm);
      }
      .acts {
        display: flex;
        gap: 6px;
      }
      .body {
        padding: 16px 18px;
        background: var(--dc-surface-color);
        display: flex;
        flex-direction: column;
        gap: 14px;
      }
      .sub-card {
        background: var(--dc-bg-color);
        border: 1px solid var(--dc-border-color);
        border-radius: var(--dc-radius-sm);
        padding: 4px 16px 12px;
      }
      .sub-card .ch {
        font-weight: 700;
        font-size: var(--dc-font-size-sm);
        padding: 10px 0 8px;
        border-bottom: 1px solid var(--dc-border-color);
        margin-bottom: 6px;
      }
      .fields {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 0 24px;
      }
      .kv {
        display: flex;
        justify-content: space-between;
        gap: 8px;
        font-size: var(--dc-font-size-sm);
        padding: 8px 0;
        border-bottom: 1px solid var(--dc-border-color);
      }
      .kv .k {
        color: var(--dc-text-muted);
      }
      dc-contact-timeline {
        width: 100%;
        display: block;
      }
      .skel {
        height: 13px;
        border-radius: 4px;
        background: var(--dc-surface-2);
        animation: pulse 1.2s ease-in-out infinite;
      }
      @keyframes pulse {
        0%,
        100% {
          opacity: 1;
        }
        50% {
          opacity: 0.5;
        }
      }
      .err {
        padding: 16px 18px;
        color: var(--dc-danger-text);
        font-size: var(--dc-font-size-sm);
      }
      @media (max-width: 480px) {
        .fields {
          grid-template-columns: 1fr;
        }
        .acts .label {
          display: none;
        }
      }
    `],M([L({attribute:!1})],w.prototype,"contact",2),M([L({attribute:!1})],w.prototype,"timeline",2),M([L({type:Boolean})],w.prototype,"loading",2),M([L({type:Boolean})],w.prototype,"consentSms",2),M([L({type:Boolean})],w.prototype,"consentVoice",2),M([L({type:String})],w.prototype,"source",2),M([L({type:Boolean,reflect:!0})],w.prototype,"campaigns",2),M([L({type:String,attribute:"contact-id"})],w.prototype,"contactId",2),M([L({type:String})],w.prototype,"token",2),M([L({attribute:!1})],w.prototype,"tokenManager",2),M([L({type:String,attribute:"api-base"})],w.prototype,"apiBase",2),M([L({type:String,attribute:"error-message"})],w.prototype,"errorMessage",2),w=M([U("dc-contact-card")],w);O();i2();$2();o2();t2();var X6={neutral:"var(--dc-text-light)",info:"var(--dc-info)",warning:"var(--dc-warning)",online:"var(--dc-online)",danger:"var(--dc-danger)"},y=class extends b{constructor(){super(...arguments);this.lanes=[];this.boardName="";this.draggingId="";this.boardId="";this.token="";this.tokenManager=null;this.apiBase="";this.loading=!1;this.errorMessage="";this.http=V();this.fetchGen=0;this.loadedBoardId="";this.dragFromLaneId="";this.dropLaneId=""}updated(a){(a.has("boardId")&&this.boardId!==this.loadedBoardId||a.has("tokenManager")||a.has("token")&&!this.tokenManager)&&this.loadBoard()}authedGet(a){return this.tokenManager?this.tokenManager.withAuthRetry(e=>this.http.get(a,k(e))):this.http.get(a,k(this.token))}async loadBoard(){if(!this.token&&!this.tokenManager)return;let a=++this.fetchGen;this.loading=!0,this.errorMessage="";let e=this.apiBase||F;try{let s=this.boardId,r=this.boardName;if(!s){let z=await this.authedGet(O2(e)),f=S(z),p=Array.isArray(f)?f:f.boards||[];if(!p.length){a===this.fetchGen&&(this.lanes=[],this.loading=!1);return}s=p[0].board_id||p[0].id||"",r=p[0].name||r}let i=await this.authedGet(P1(e,s)),n=S(i)||{};n.name&&(r=n.name);let o={},t=n.stages||[];for(let z=0;z<t.length;z++){let f=t[z]&&t[z].list_id;if(!f)continue;let p=await this.authedGet(B1(e,f)),d=S(p);o[f]=d&&!Array.isArray(d)&&d.contacts||(Array.isArray(d)?d:[])}if(a!==this.fetchGen)return;this.loadedBoardId=s,this.boardId=s,this.boardName=r,this.lanes=D1(n,o)}catch(s){if(a!==this.fetchGen)return;this.errorMessage=q(s,"Unable to load pipeline").message}finally{a===this.fetchGen&&(this.loading=!1)}}canMove(){let a=this.tokenManager?this.tokenManager.current():this.token;return!!a&&b1(a,"lists:write")}openContact(a){let e={contact_id:a.contact.id,contactId:a.contact.id};this.dispatchEvent(new CustomEvent("dc-open-contact",{detail:e,bubbles:!0,composed:!0}))}onMoveSelect(a,e,s){let r=a.target,i=r.value;if(r.value="",!i)return;let n=this.moveCard(e.id,s.id,i);this.updateComplete.then(()=>this.focusMoveControl(e.id)),n.then(()=>this.updateComplete).then(()=>this.focusMoveControl(e.id))}focusMoveControl(a){if(!this.shadowRoot)return;let e=this.shadowRoot.querySelectorAll("[data-deal-id]");for(let s=0;s<e.length;s++)if(e[s].dataset.dealId===a){let r=e[s].querySelector(".move")||e[s].querySelector(".nm");r&&r.focus();return}}onDragStart(a,e,s){this.draggingId=e.id,this.dragFromLaneId=s.id,a.dataTransfer&&(a.dataTransfer.effectAllowed="move",a.dataTransfer.setData("text/plain",e.id))}onDragEnd(){this.draggingId="",this.dragFromLaneId="",this.dropLaneId=""}onDragOver(a,e){!this.draggingId||e.id===this.dragFromLaneId||(a.preventDefault(),a.dataTransfer&&(a.dataTransfer.dropEffect="move"),this.dropLaneId=e.id)}onDragLeave(a){this.dropLaneId===a.id&&(this.dropLaneId="")}onDrop(a,e){a.preventDefault();let s=this.draggingId,r=this.dragFromLaneId;this.onDragEnd(),this.moveCard(s,r,e.id)}async moveCard(a,e,s){let r=R1(this.lanes,a,e,s);if(!r||!this.canMove())return!1;this.lanes=r,this.errorMessage="";let i=E1(this.apiBase||F,a),n={from_list_id:e,to_list_id:s};try{let o=this.tokenManager?await this.tokenManager.withAuthRetry(z=>this.http.post(i,n,k(z))):await this.http.post(i,n,k(this.token));if(F1(o))throw H1();let t={contact_id:a,from_list_id:e,to_list_id:s};return this.dispatchEvent(new CustomEvent("dc-card-moved",{detail:t,bubbles:!0,composed:!0})),!0}catch(o){let t=R1(this.lanes,a,s,e);t&&(this.lanes=t);let z=q(o,"The contact could not be moved.");return this.errorMessage=z.message,this.dispatchEvent(new CustomEvent("dc-error",{detail:{code:z.code,message:z.message,reason:z.reason,contact_id:a,from_list_id:e,to_list_id:s},bubbles:!0,composed:!0})),!1}}money(a){return a>=1e3?`$${Math.round(a/1e3)}k`:`$${a}`}laneSum(a){let e=0;for(let s of a.deals)e+=s.value;return e}totals(){let a=0,e=0;for(let s of this.lanes)a+=s.deals.length,e+=this.laneSum(s);return{open:a,value:e}}render(){let a=this.totals();return m`
      <div class="app">
        <div class="topbar">
          <h2>${this.boardName||"Pipeline"}</h2>
          ${this.loading?u:m`<span class="dc-pill is-info">${a.open} open · ${this.money(a.value)}</span>`}
          <span class="sp"></span>
          <button class="dc-btn" @click=${()=>_1("#/contacts")}>Open in portal</button>
        </div>
        ${this.errorMessage?m`<div class="err">${this.errorMessage}</div>`:u}
        ${this.loading?m`<div class="loadingpane" aria-busy="true">Loading pipeline…</div>`:m`<div class="board" role="list">
              ${a2(this.lanes,e=>e.id,e=>this.renderLane(e))}
            </div>`}
      </div>
    `}renderMoveControl(a,e,s){return m`<select
      class="move"
      aria-label="Move ${a.contact.name} to another stage"
      @click=${r=>r.stopPropagation()}
      @change=${r=>this.onMoveSelect(r,a,e)}
    >
      <option value="">Move to stage…</option>
      ${s.map(r=>m`<option value=${r.id}>${r.label}</option>`)}
    </select>`}renderLane(a){let e=this.canMove(),s=this.lanes.filter(r=>r.id!==a.id);return m`
      <div
        class="lane ${this.dropLaneId===a.id?"drop-target":""}"
        role="listitem"
        aria-label="${a.label} lane"
        @dragover=${r=>this.onDragOver(r,a)}
        @dragleave=${()=>this.onDragLeave(a)}
        @drop=${r=>this.onDrop(r,a)}
      >
        <div class="lane-h">
          <span class="dot" style="background:${X6[a.tone]}"></span>${a.label}
          <span class="ct">${a.deals.length}</span>
          <span class="sum">${this.money(this.laneSum(a))}</span>
        </div>
        <div class="lane-body">
          ${a.deals.length?a2(a.deals,r=>r.id,r=>{let i=G2.glyph(r.channel),n=r.contact.company?`Open ${r.contact.name}, ${r.contact.company}`:`Open ${r.contact.name}`;return m`<div
                  class="card ${this.draggingId===r.id?"dragging":""}"
                  data-deal-id=${r.id}
                  draggable=${e?"true":"false"}
                  @click=${()=>this.openContact(r)}
                  @dragstart=${o=>this.onDragStart(o,r,a)}
                  @dragend=${()=>this.onDragEnd()}
                >
                  <button type="button" class="nm" aria-label=${n}>${r.contact.name}</button>
                  <div class="co">${r.contact.company??""}</div>
                  <div class="foot">
                    <span class="mini" style="background:${i.bg}">${i.content}</span>
                    <span class="dc-light dc-xs">${r.age}</span>
                    <span class="val">${this.money(r.value)}</span>
                  </div>
                  ${e&&s.length?this.renderMoveControl(r,a,s):u}
                </div>`}):m`<div class="empty">${e?"Drop contacts here":"No contacts in this stage"}</div>`}
        </div>
      </div>
    `}};y.styles=[b.styles,B`
      :host {
        display: block;
        width: 100%;
        height: 520px;
      }
      .app {
        display: flex;
        flex-direction: column;
        height: 100%;
        background: var(--dc-bg-color);
        border: 1px solid var(--dc-border-color);
        border-radius: var(--dc-radius);
        overflow: hidden;
      }
      .topbar {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px 16px;
        border-bottom: 1px solid var(--dc-border-color);
      }
      .topbar h2 {
        font-size: 16px;
      }
      .topbar .sp {
        flex: 1;
      }
      .board {
        flex: 1;
        display: grid;
        grid-auto-flow: column;
        grid-auto-columns: minmax(180px, 1fr);
        overflow-x: auto;
      }
      .lane {
        border-right: 1px solid var(--dc-border-color);
        display: flex;
        flex-direction: column;
        min-width: 0;
        background: var(--dc-surface-color);
      }
      .lane:last-child {
        border-right: 0;
      }
      .lane-h {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 12px 14px;
        font-weight: 700;
        font-size: var(--dc-font-size-sm);
      }
      .lane-h .dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
      }
      .lane-h .ct {
        font-weight: 600;
        color: var(--dc-text-light);
      }
      .lane-h .sum {
        margin-left: auto;
        font-weight: 700;
        font-size: var(--dc-font-size-xs);
        color: var(--dc-text-muted);
      }
      .lane-body {
        overflow-y: auto;
        padding: 4px 10px 14px;
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
      .card {
        background: var(--dc-bg-color);
        border: 1px solid var(--dc-border-color);
        border-radius: var(--dc-radius-sm);
        padding: 12px;
        box-shadow: var(--dc-shadow-sm);
        cursor: pointer;
        transition: box-shadow var(--dc-transition);
      }
      .card[draggable='true'] {
        cursor: grab;
      }
      .card:hover {
        border-color: var(--dc-primary-color);
      }
      .card .nm {
        display: block;
        width: 100%;
        padding: 0;
        border: 0;
        background: none;
        color: inherit;
        font: inherit;
        font-weight: 600;
        text-align: left;
        cursor: pointer;
      }
      .card .nm:focus-visible,
      .card .move:focus-visible {
        outline: 2px solid var(--dc-primary-color);
        outline-offset: 2px;
      }
      .card .move {
        display: block;
        width: 100%;
        margin-top: 9px;
        padding: 4px 6px;
        border: 1px solid var(--dc-border-color);
        border-radius: var(--dc-radius-sm);
        background: var(--dc-bg-color);
        color: var(--dc-text-color);
        font: inherit;
        font-size: var(--dc-font-size-sm);
        cursor: pointer;
      }
      .lane.drop-target .lane-body {
        background: var(--dc-surface-2);
      }
      .card.dragging {
        opacity: 0.5;
        cursor: grabbing;
        border-style: dashed;
        border-color: var(--dc-primary-color);
      }
      .card .co {
        font-size: var(--dc-font-size-sm);
        color: var(--dc-text-muted);
      }
      .card .foot {
        display: flex;
        align-items: center;
        gap: 6px;
        margin-top: 9px;
      }
      .card .val {
        margin-left: auto;
        font-weight: 700;
        font-size: var(--dc-font-size-sm);
      }
      .mini {
        width: 22px;
        height: 22px;
        border-radius: 6px;
        display: grid;
        place-items: center;
        font-size: 10px;
        color: #fff;
      }
      .empty {
        padding: 18px 8px;
        text-align: center;
        color: var(--dc-text-light);
        font-size: var(--dc-font-size-sm);
        border: 1px dashed var(--dc-border-color);
        border-radius: var(--dc-radius-sm);
      }
      .err {
        padding: 12px 16px;
        color: var(--dc-danger-text);
        font-size: var(--dc-font-size-sm);
      }
      .loadingpane {
        padding: 48px 16px;
        text-align: center;
        color: var(--dc-text-muted);
      }
    `],M([L({attribute:!1})],y.prototype,"lanes",2),M([L({type:String})],y.prototype,"boardName",2),M([L({type:String})],y.prototype,"draggingId",2),M([L({type:String,attribute:"board-id"})],y.prototype,"boardId",2),M([L({type:String})],y.prototype,"token",2),M([L({attribute:!1})],y.prototype,"tokenManager",2),M([L({type:String,attribute:"api-base"})],y.prototype,"apiBase",2),M([L({type:Boolean})],y.prototype,"loading",2),M([L({type:String,attribute:"error-message"})],y.prototype,"errorMessage",2),M([h4()],y.prototype,"dropLaneId",2),y=M([U("dc-pipeline-board")],y);w1();t2();var N=V2(),D0=X1({selector:"dc-contact-card, dc-contact-timeline, dc-pipeline-board, dc-contact-hub",apply:function(l,c){l.apiBase||(l.apiBase=c.settings.apiBase),K1(l,c)}}),U1={init:function(l){return N.init(l).then(function(){D0.start(N.getTokenManager(),{apiBase:N.apiBase})})},setTheme:function(l){N.setTheme(l)},addErrorListener:function(l){return N.addErrorListener(l)},setToken:function(l){return N.setToken(l)},getTokenManager:function(){return N.getTokenManager()},openContact:function(l){return N.openContact(l)},openBoard:function(l){return N.openBoard(l)},openHub:function(l){return N.openHub(l)},listContacts:function(l){return N.listContacts(l)},searchContacts:function(l){return N.searchContacts(l)},createContact:function(l){return N.createContact(l)},updateContact:function(l,c){return N.updateContact(l,c)},setOwner:function(l,c){return N.setOwner(l,c)},setDisposition:function(l,c){return N.setDisposition(l,c)},addToList:function(l,c){return N.addToList(l,c)},moveCard:function(l,c,a){return N.moveCard(l,c,a)},createBoard:function(l){return N.createBoard(l)},addBoardList:function(l,c){return N.addBoardList(l,c)},openInPortal:function(l){return N.openInPortal(l)},close:function(){return D0.stop(),N.close()},create:function(){return U1},_bootstrap:function(){},_loaded:!0};j1({bundle:"contacts",namespaces:{contacts:U1},globals:{DropCowboyContacts:U1}});})();
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

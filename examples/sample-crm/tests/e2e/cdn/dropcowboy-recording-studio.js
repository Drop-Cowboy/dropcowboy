/*! Drop Cowboy Building Blocks recording-studio (@dropcowboy/embed-recording-studio 0.0.0). Do not edit. */
"use strict";(()=>{var c1=Object.defineProperty;var U3=Object.getOwnPropertyDescriptor;var t=(e,c)=>()=>(e&&(c=e(e=0)),c);var _3=(e,c)=>{for(var a in c)c1(e,a,{get:c[a],enumerable:!0})};var u=(e,c,a,l)=>{for(var r=l>1?void 0:l?U3(c,a):c,s=e.length-1,i;s>=0;s--)(i=e[s])&&(r=(l?i(c,a,r):i(r))||r);return l&&r&&c1(c,a,r),r};var a2,l2,C2,s1,I,i1,B,o1,g2,x2=t(()=>{"use strict";a2=globalThis,l2=a2.ShadowRoot&&(a2.ShadyCSS===void 0||a2.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,C2=Symbol(),s1=new WeakMap,I=class{constructor(c,a,l){if(this._$cssResult$=!0,l!==C2)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=c,this.t=a}get styleSheet(){let c=this.o,a=this.t;if(l2&&c===void 0){let l=a!==void 0&&a.length===1;l&&(c=s1.get(a)),c===void 0&&((this.o=c=new CSSStyleSheet).replaceSync(this.cssText),l&&s1.set(a,c))}return c}toString(){return this.cssText}},i1=e=>new I(typeof e=="string"?e:e+"",void 0,C2),B=(e,...c)=>{let a=e.length===1?e[0]:c.reduce((l,r,s)=>l+(i=>{if(i._$cssResult$===!0)return i.cssText;if(typeof i=="number")return i;throw Error("Value passed to 'css' function must be a 'css' function result: "+i+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+e[s+1],e[0]);return new I(a,e,C2)},o1=(e,c)=>{if(l2)e.adoptedStyleSheets=c.map(a=>a instanceof CSSStyleSheet?a:a.styleSheet);else for(let a of c){let l=document.createElement("style"),r=a2.litNonce;r!==void 0&&l.setAttribute("nonce",r),l.textContent=a.cssText,e.appendChild(l)}},g2=l2?e=>e:e=>e instanceof CSSStyleSheet?(c=>{let a="";for(let l of c.cssRules)a+=l.cssText;return i1(a)})(e):e});var G3,W3,I3,O3,V3,j3,e2,f1,K3,X3,O,V,r2,n1,b,j=t(()=>{"use strict";x2();x2();({is:G3,defineProperty:W3,getOwnPropertyDescriptor:I3,getOwnPropertyNames:O3,getOwnPropertySymbols:V3,getPrototypeOf:j3}=Object),e2=globalThis,f1=e2.trustedTypes,K3=f1?f1.emptyScript:"",X3=e2.reactiveElementPolyfillSupport,O=(e,c)=>e,V={toAttribute(e,c){switch(c){case Boolean:e=e?K3:null;break;case Object:case Array:e=e==null?e:JSON.stringify(e)}return e},fromAttribute(e,c){let a=e;switch(c){case Boolean:a=e!==null;break;case Number:a=e===null?null:Number(e);break;case Object:case Array:try{a=JSON.parse(e)}catch{a=null}}return a}},r2=(e,c)=>!G3(e,c),n1={attribute:!0,type:String,converter:V,reflect:!1,useDefault:!1,hasChanged:r2};Symbol.metadata??=Symbol("metadata"),e2.litPropertyMetadata??=new WeakMap;b=class extends HTMLElement{static addInitializer(c){this._$Ei(),(this.l??=[]).push(c)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(c,a=n1){if(a.state&&(a.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(c)&&((a=Object.create(a)).wrapped=!0),this.elementProperties.set(c,a),!a.noAccessor){let l=Symbol(),r=this.getPropertyDescriptor(c,l,a);r!==void 0&&W3(this.prototype,c,r)}}static getPropertyDescriptor(c,a,l){let{get:r,set:s}=I3(this.prototype,c)??{get(){return this[a]},set(i){this[a]=i}};return{get:r,set(i){let f=r?.call(this);s?.call(this,i),this.requestUpdate(c,f,l)},configurable:!0,enumerable:!0}}static getPropertyOptions(c){return this.elementProperties.get(c)??n1}static _$Ei(){if(this.hasOwnProperty(O("elementProperties")))return;let c=j3(this);c.finalize(),c.l!==void 0&&(this.l=[...c.l]),this.elementProperties=new Map(c.elementProperties)}static finalize(){if(this.hasOwnProperty(O("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(O("properties"))){let a=this.properties,l=[...O3(a),...V3(a)];for(let r of l)this.createProperty(r,a[r])}let c=this[Symbol.metadata];if(c!==null){let a=litPropertyMetadata.get(c);if(a!==void 0)for(let[l,r]of a)this.elementProperties.set(l,r)}this._$Eh=new Map;for(let[a,l]of this.elementProperties){let r=this._$Eu(a,l);r!==void 0&&this._$Eh.set(r,a)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(c){let a=[];if(Array.isArray(c)){let l=new Set(c.flat(1/0).reverse());for(let r of l)a.unshift(g2(r))}else c!==void 0&&a.push(g2(c));return a}static _$Eu(c,a){let l=a.attribute;return l===!1?void 0:typeof l=="string"?l:typeof c=="string"?c.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(c=>this.enableUpdating=c),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(c=>c(this))}addController(c){(this._$EO??=new Set).add(c),this.renderRoot!==void 0&&this.isConnected&&c.hostConnected?.()}removeController(c){this._$EO?.delete(c)}_$E_(){let c=new Map,a=this.constructor.elementProperties;for(let l of a.keys())this.hasOwnProperty(l)&&(c.set(l,this[l]),delete this[l]);c.size>0&&(this._$Ep=c)}createRenderRoot(){let c=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return o1(c,this.constructor.elementStyles),c}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(c=>c.hostConnected?.())}enableUpdating(c){}disconnectedCallback(){this._$EO?.forEach(c=>c.hostDisconnected?.())}attributeChangedCallback(c,a,l){this._$AK(c,l)}_$ET(c,a){let l=this.constructor.elementProperties.get(c),r=this.constructor._$Eu(c,l);if(r!==void 0&&l.reflect===!0){let s=(l.converter?.toAttribute!==void 0?l.converter:V).toAttribute(a,l.type);this._$Em=c,s==null?this.removeAttribute(r):this.setAttribute(r,s),this._$Em=null}}_$AK(c,a){let l=this.constructor,r=l._$Eh.get(c);if(r!==void 0&&this._$Em!==r){let s=l.getPropertyOptions(r),i=typeof s.converter=="function"?{fromAttribute:s.converter}:s.converter?.fromAttribute!==void 0?s.converter:V;this._$Em=r;let f=i.fromAttribute(a,s.type);this[r]=f??this._$Ej?.get(r)??f,this._$Em=null}}requestUpdate(c,a,l,r=!1,s){if(c!==void 0){let i=this.constructor;if(r===!1&&(s=this[c]),l??=i.getPropertyOptions(c),!((l.hasChanged??r2)(s,a)||l.useDefault&&l.reflect&&s===this._$Ej?.get(c)&&!this.hasAttribute(i._$Eu(c,l))))return;this.C(c,a,l)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(c,a,{useDefault:l,reflect:r,wrapped:s},i){l&&!(this._$Ej??=new Map).has(c)&&(this._$Ej.set(c,i??a??this[c]),s!==!0||i!==void 0)||(this._$AL.has(c)||(this.hasUpdated||l||(a=void 0),this._$AL.set(c,a)),r===!0&&this._$Em!==c&&(this._$Eq??=new Set).add(c))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(a){Promise.reject(a)}let c=this.scheduleUpdate();return c!=null&&await c,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[r,s]of this._$Ep)this[r]=s;this._$Ep=void 0}let l=this.constructor.elementProperties;if(l.size>0)for(let[r,s]of l){let{wrapped:i}=s,f=this[r];i!==!0||this._$AL.has(r)||f===void 0||this.C(r,void 0,s,f)}}let c=!1,a=this._$AL;try{c=this.shouldUpdate(a),c?(this.willUpdate(a),this._$EO?.forEach(l=>l.hostUpdate?.()),this.update(a)):this._$EM()}catch(l){throw c=!1,this._$EM(),l}c&&this._$AE(a)}willUpdate(c){}_$AE(c){this._$EO?.forEach(a=>a.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(c)),this.updated(c)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(c){return!0}update(c){this._$Eq&&=this._$Eq.forEach(a=>this._$ET(a,this[a])),this._$EM()}updated(c){}firstUpdated(c){}};b.elementStyles=[],b.shadowRootOptions={mode:"open"},b[O("elementProperties")]=new Map,b[O("finalized")]=new Map,X3?.({ReactiveElement:b}),(e2.reactiveElementVersions??=[]).push("2.1.2")});function h1(e,c){if(!k2(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return m1!==void 0?m1.createHTML(c):c}function E(e,c,a=e,l){if(c===k)return c;let r=l!==void 0?a._$Co?.[l]:a._$Cl,s=Q(c)?void 0:c._$litDirective$;return r?.constructor!==s&&(r?._$AO?.(!1),s===void 0?r=void 0:(r=new s(e),r._$AT(e,a,l)),l!==void 0?(a._$Co??=[])[l]=r:a._$Cl=r),r!==void 0&&(c=E(e,r._$AS(e,c.values),r,l)),c}var N2,t1,s2,m1,b2,w,w2,Q3,H,X,Q,k2,u1,S2,K,z1,p1,P,M1,d1,v1,y2,z,w0,k0,k,d,L1,F,C1,J,i2,_,R,o2,f2,n2,t2,g1,J3,x1,q=t(()=>{"use strict";N2=globalThis,t1=e=>e,s2=N2.trustedTypes,m1=s2?s2.createPolicy("lit-html",{createHTML:e=>e}):void 0,b2="$lit$",w=`lit$${Math.random().toFixed(9).slice(2)}$`,w2="?"+w,Q3=`<${w2}>`,H=document,X=()=>H.createComment(""),Q=e=>e===null||typeof e!="object"&&typeof e!="function",k2=Array.isArray,u1=e=>k2(e)||typeof e?.[Symbol.iterator]=="function",S2=`[ 	
\f\r]`,K=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,z1=/-->/g,p1=/>/g,P=RegExp(`>|${S2}(?:([^\\s"'>=/]+)(${S2}*=${S2}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),M1=/'/g,d1=/"/g,v1=/^(?:script|style|textarea|title)$/i,y2=e=>(c,...a)=>({_$litType$:e,strings:c,values:a}),z=y2(1),w0=y2(2),k0=y2(3),k=Symbol.for("lit-noChange"),d=Symbol.for("lit-nothing"),L1=new WeakMap,F=H.createTreeWalker(H,129);C1=(e,c)=>{let a=e.length-1,l=[],r,s=c===2?"<svg>":c===3?"<math>":"",i=K;for(let f=0;f<a;f++){let o=e[f],p,v,n=-1,M=0;for(;M<o.length&&(i.lastIndex=M,v=i.exec(o),v!==null);)M=i.lastIndex,i===K?v[1]==="!--"?i=z1:v[1]!==void 0?i=p1:v[2]!==void 0?(v1.test(v[2])&&(r=RegExp("</"+v[2],"g")),i=P):v[3]!==void 0&&(i=P):i===P?v[0]===">"?(i=r??K,n=-1):v[1]===void 0?n=-2:(n=i.lastIndex-v[2].length,p=v[1],i=v[3]===void 0?P:v[3]==='"'?d1:M1):i===d1||i===M1?i=P:i===z1||i===p1?i=K:(i=P,r=void 0);let m=i===P&&e[f+1].startsWith("/>")?" ":"";s+=i===K?o+Q3:n>=0?(l.push(p),o.slice(0,n)+b2+o.slice(n)+w+m):o+w+(n===-2?f:m)}return[h1(e,s+(e[a]||"<?>")+(c===2?"</svg>":c===3?"</math>":"")),l]},J=class e{constructor({strings:c,_$litType$:a},l){let r;this.parts=[];let s=0,i=0,f=c.length-1,o=this.parts,[p,v]=C1(c,a);if(this.el=e.createElement(p,l),F.currentNode=this.el.content,a===2||a===3){let n=this.el.content.firstChild;n.replaceWith(...n.childNodes)}for(;(r=F.nextNode())!==null&&o.length<f;){if(r.nodeType===1){if(r.hasAttributes())for(let n of r.getAttributeNames())if(n.endsWith(b2)){let M=v[i++],m=r.getAttribute(n).split(w),C=/([.?@])?(.*)/.exec(M);o.push({type:1,index:s,name:C[2],strings:m,ctor:C[1]==="."?o2:C[1]==="?"?f2:C[1]==="@"?n2:R}),r.removeAttribute(n)}else n.startsWith(w)&&(o.push({type:6,index:s}),r.removeAttribute(n));if(v1.test(r.tagName)){let n=r.textContent.split(w),M=n.length-1;if(M>0){r.textContent=s2?s2.emptyScript:"";for(let m=0;m<M;m++)r.append(n[m],X()),F.nextNode(),o.push({type:2,index:++s});r.append(n[M],X())}}}else if(r.nodeType===8)if(r.data===w2)o.push({type:2,index:s});else{let n=-1;for(;(n=r.data.indexOf(w,n+1))!==-1;)o.push({type:7,index:s}),n+=w.length-1}s++}}static createElement(c,a){let l=H.createElement("template");return l.innerHTML=c,l}};i2=class{constructor(c,a){this._$AV=[],this._$AN=void 0,this._$AD=c,this._$AM=a}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(c){let{el:{content:a},parts:l}=this._$AD,r=(c?.creationScope??H).importNode(a,!0);F.currentNode=r;let s=F.nextNode(),i=0,f=0,o=l[0];for(;o!==void 0;){if(i===o.index){let p;o.type===2?p=new _(s,s.nextSibling,this,c):o.type===1?p=new o.ctor(s,o.name,o.strings,this,c):o.type===6&&(p=new t2(s,this,c)),this._$AV.push(p),o=l[++f]}i!==o?.index&&(s=F.nextNode(),i++)}return F.currentNode=H,r}p(c){let a=0;for(let l of this._$AV)l!==void 0&&(l.strings!==void 0?(l._$AI(c,l,a),a+=l.strings.length-2):l._$AI(c[a])),a++}},_=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(c,a,l,r){this.type=2,this._$AH=d,this._$AN=void 0,this._$AA=c,this._$AB=a,this._$AM=l,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let c=this._$AA.parentNode,a=this._$AM;return a!==void 0&&c?.nodeType===11&&(c=a.parentNode),c}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(c,a=this){c=E(this,c,a),Q(c)?c===d||c==null||c===""?(this._$AH!==d&&this._$AR(),this._$AH=d):c!==this._$AH&&c!==k&&this._(c):c._$litType$!==void 0?this.$(c):c.nodeType!==void 0?this.T(c):u1(c)?this.k(c):this._(c)}O(c){return this._$AA.parentNode.insertBefore(c,this._$AB)}T(c){this._$AH!==c&&(this._$AR(),this._$AH=this.O(c))}_(c){this._$AH!==d&&Q(this._$AH)?this._$AA.nextSibling.data=c:this.T(H.createTextNode(c)),this._$AH=c}$(c){let{values:a,_$litType$:l}=c,r=typeof l=="number"?this._$AC(c):(l.el===void 0&&(l.el=J.createElement(h1(l.h,l.h[0]),this.options)),l);if(this._$AH?._$AD===r)this._$AH.p(a);else{let s=new i2(r,this),i=s.u(this.options);s.p(a),this.T(i),this._$AH=s}}_$AC(c){let a=L1.get(c.strings);return a===void 0&&L1.set(c.strings,a=new J(c)),a}k(c){k2(this._$AH)||(this._$AH=[],this._$AR());let a=this._$AH,l,r=0;for(let s of c)r===a.length?a.push(l=new e(this.O(X()),this.O(X()),this,this.options)):l=a[r],l._$AI(s),r++;r<a.length&&(this._$AR(l&&l._$AB.nextSibling,r),a.length=r)}_$AR(c=this._$AA.nextSibling,a){for(this._$AP?.(!1,!0,a);c!==this._$AB;){let l=t1(c).nextSibling;t1(c).remove(),c=l}}setConnected(c){this._$AM===void 0&&(this._$Cv=c,this._$AP?.(c))}},R=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(c,a,l,r,s){this.type=1,this._$AH=d,this._$AN=void 0,this.element=c,this.name=a,this._$AM=r,this.options=s,l.length>2||l[0]!==""||l[1]!==""?(this._$AH=Array(l.length-1).fill(new String),this.strings=l):this._$AH=d}_$AI(c,a=this,l,r){let s=this.strings,i=!1;if(s===void 0)c=E(this,c,a,0),i=!Q(c)||c!==this._$AH&&c!==k,i&&(this._$AH=c);else{let f=c,o,p;for(c=s[0],o=0;o<s.length-1;o++)p=E(this,f[l+o],a,o),p===k&&(p=this._$AH[o]),i||=!Q(p)||p!==this._$AH[o],p===d?c=d:c!==d&&(c+=(p??"")+s[o+1]),this._$AH[o]=p}i&&!r&&this.j(c)}j(c){c===d?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,c??"")}},o2=class extends R{constructor(){super(...arguments),this.type=3}j(c){this.element[this.name]=c===d?void 0:c}},f2=class extends R{constructor(){super(...arguments),this.type=4}j(c){this.element.toggleAttribute(this.name,!!c&&c!==d)}},n2=class extends R{constructor(c,a,l,r,s){super(c,a,l,r,s),this.type=5}_$AI(c,a=this){if((c=E(this,c,a,0)??d)===k)return;let l=this._$AH,r=c===d&&l!==d||c.capture!==l.capture||c.once!==l.once||c.passive!==l.passive,s=c!==d&&(l===d||r);r&&this.element.removeEventListener(this.name,this,l),s&&this.element.addEventListener(this.name,this,c),this._$AH=c}handleEvent(c){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,c):this._$AH.handleEvent(c)}},t2=class{constructor(c,a,l){this.element=c,this.type=6,this._$AN=void 0,this._$AM=a,this.options=l}get _$AU(){return this._$AM._$AU}_$AI(c){E(this,c)}},g1={M:b2,P:w,A:w2,C:1,L:C1,R:i2,D:u1,V:E,I:_,H:R,N:f2,U:n2,B:o2,F:t2},J3=N2.litHtmlPolyfillSupport;J3?.(J,_),(N2.litHtmlVersions??=[]).push("3.3.3");x1=(e,c,a)=>{let l=a?.renderBefore??c,r=l._$litPart$;if(r===void 0){let s=a?.renderBefore??null;l._$litPart$=r=new _(c.insertBefore(X(),s),s,void 0,a??{})}return r._$AI(e),r}});var A2,y,Y3,S1=t(()=>{"use strict";j();j();q();q();A2=globalThis,y=class extends b{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let c=super.createRenderRoot();return this.renderOptions.renderBefore??=c.firstChild,c}update(c){let a=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(c),this._$Do=x1(a,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return k}};y._$litElement$=!0,y.finalized=!0,A2.litElementHydrateSupport?.({LitElement:y});Y3=A2.litElementPolyfillSupport;Y3?.({LitElement:y});(A2.litElementVersions??=[]).push("4.2.2")});var N1=t(()=>{"use strict";});var $=t(()=>{"use strict";j();q();S1();N1()});var b1,m2,w1=t(()=>{"use strict";b1=(e,c)=>{customElements.get(e)||customElements.define(e,c)},m2=e=>(c,a)=>{a!==void 0?a.addInitializer(()=>{b1(e,c)}):b1(e,c)}});function g(e){return(c,a)=>typeof a=="object"?c0(e,c,a):((l,r,s)=>{let i=r.hasOwnProperty(s);return r.constructor.createProperty(s,l),i?Object.getOwnPropertyDescriptor(r,s):void 0})(e,c,a)}var Z3,c0,T2=t(()=>{"use strict";j();Z3={attribute:!0,type:String,converter:V,reflect:!1,hasChanged:r2},c0=(e=Z3,c,a)=>{let{kind:l,metadata:r}=a,s=globalThis.litPropertyMetadata.get(r);if(s===void 0&&globalThis.litPropertyMetadata.set(r,s=new Map),l==="setter"&&((e=Object.create(e)).wrapped=!0),s.set(a.name,e),l==="accessor"){let{name:i}=a;return{set(f){let o=c.get.call(this);c.set.call(this,f),this.requestUpdate(i,o,e,!0,f)},init(f){return f!==void 0&&this.C(i,void 0,e,f),f}}}if(l==="setter"){let{name:i}=a;return function(f){let o=this[i];c.call(this,f),this.requestUpdate(i,o,e,!0,f)}}throw Error("Unsupported decorator location: "+l)}});function A(e){return g({...e,state:!0,attribute:!1})}var k1=t(()=>{"use strict";T2();});var y1=t(()=>{"use strict";});var G=t(()=>{"use strict";});var A1=t(()=>{"use strict";G();});var T1=t(()=>{"use strict";G();});var B1=t(()=>{"use strict";G();});var P1=t(()=>{"use strict";G();});var F1=t(()=>{"use strict";G();});var B2=t(()=>{"use strict";w1();T2();k1();y1();A1();T1();B1();P1();F1()});var H1,E1,p2,R1=t(()=>{"use strict";H1={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},E1=e=>(...c)=>({_$litDirective$:e,values:c}),p2=class{constructor(c){}get _$AU(){return this._$AM._$AU}_$AT(c,a,l){this._$Ct=c,this._$AM=a,this._$Ci=l}_$AS(c,a){return this.update(c,a)}update(c,a){return this.render(...a)}}});var a0,D1,U1,W,T,l0,_1,q1,M2,$1=t(()=>{"use strict";q();({I:a0}=g1),D1=e=>e,U1=()=>document.createComment(""),W=(e,c,a)=>{let l=e._$AA.parentNode,r=c===void 0?e._$AB:c._$AA;if(a===void 0){let s=l.insertBefore(U1(),r),i=l.insertBefore(U1(),r);a=new a0(s,i,e,e.options)}else{let s=a._$AB.nextSibling,i=a._$AM,f=i!==e;if(f){let o;a._$AQ?.(e),a._$AM=e,a._$AP!==void 0&&(o=e._$AU)!==i._$AU&&a._$AP(o)}if(s!==r||f){let o=a._$AA;for(;o!==s;){let p=D1(o).nextSibling;D1(l).insertBefore(o,r),o=p}}}return a},T=(e,c,a=e)=>(e._$AI(c,a),e),l0={},_1=(e,c=l0)=>e._$AH=c,q1=e=>e._$AH,M2=e=>{e._$AR(),e._$AA.remove()}});var G1,W1,I1=t(()=>{"use strict";q();R1();$1();G1=(e,c,a)=>{let l=new Map;for(let r=c;r<=a;r++)l.set(e[r],r);return l},W1=E1(class extends p2{constructor(e){if(super(e),e.type!==H1.CHILD)throw Error("repeat() can only be used in text expressions")}dt(e,c,a){let l;a===void 0?a=c:c!==void 0&&(l=c);let r=[],s=[],i=0;for(let f of e)r[i]=l?l(f,i):i,s[i]=a(f,i),i++;return{values:s,keys:r}}render(e,c,a){return this.dt(e,c,a).values}update(e,[c,a,l]){let r=q1(e),{values:s,keys:i}=this.dt(c,a,l);if(!Array.isArray(r))return this.ut=i,s;let f=this.ut??=[],o=[],p,v,n=0,M=r.length-1,m=0,C=s.length-1;for(;n<=M&&m<=C;)if(r[n]===null)n++;else if(r[M]===null)M--;else if(f[n]===i[m])o[m]=T(r[n],s[m]),n++,m++;else if(f[M]===i[C])o[C]=T(r[M],s[C]),M--,C--;else if(f[n]===i[C])o[C]=T(r[n],s[C]),W(e,o[C+1],r[n]),n++,C--;else if(f[M]===i[m])o[m]=T(r[M],s[m]),W(e,r[n],r[M]),M--,m++;else if(p===void 0&&(p=G1(i,m,C),v=G1(f,n,M)),p.has(f[n]))if(p.has(f[M])){let S=v.get(i[m]),u2=S!==void 0?r[S]:null;if(u2===null){let Z2=W(e,r[n]);T(Z2,s[m]),o[m]=Z2}else o[m]=T(u2,s[m]),W(e,r[n],u2),r[S]=null;m++}else M2(r[M]),M--;else M2(r[n]),n++;for(;m<=C;){let S=W(e,o[C+1]);T(S,s[m]),o[m++]=S}for(;n<=M;){let S=r[n++];S!==null&&M2(S)}return this.ut=i,_1(e,o),k}})});var O1=t(()=>{"use strict";I1()});var P2,F2=t(()=>{"use strict";$();P2=B`
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
`});function j1(e,c){let a=Object.keys(c),l="";for(let r=0;r<a.length;r++)l+=a[r]+":"+c[a[r]]+";";return e+"{"+l+"}"}function H2(e){let c=e||(typeof document<"u"?document:null);if(!c||!c.head||typeof c.createElement!="function"||c.querySelector("style["+V1+"]"))return!1;let a=c.createElement("style");return a.setAttribute(V1,""),a.textContent=s0,c.head.insertBefore(a,c.head.firstChild),!0}var V1,e0,r0,s0,E2=t(()=>{"use strict";V1="data-dc-tokens",e0={"--dc-primary-color":"#2563eb","--dc-primary-hover":"#1d4ed8","--dc-primary-text":"#ffffff","--dc-primary-soft":"#eaf1fe","--dc-bg-color":"#ffffff","--dc-surface-color":"#f7f8fa","--dc-surface-2":"#eef0f4","--dc-border-color":"#ebedf0","--dc-text-color":"#1a1d21","--dc-text-muted":"#5c6370","--dc-text-light":"#646b78","--dc-agent-bubble-bg":"#f1f3f6","--dc-agent-bubble-text":"#1a1d21","--dc-visitor-bubble-bg":"var(--dc-primary-color)","--dc-visitor-bubble-text":"var(--dc-primary-text)","--dc-online":"#22c55e","--dc-online-soft":"#e7f8ed","--dc-online-text":"#15803d","--dc-danger":"#ef4444","--dc-danger-soft":"#fdecec","--dc-danger-text":"#b91c1c","--dc-warning":"#f59e0b","--dc-warning-soft":"#fef3e2","--dc-warning-text":"#b45309","--dc-info":"#0ea5e9","--dc-info-soft":"#e6f6fe","--dc-info-text":"#0369a1","--dc-shadow":"0 8px 24px rgba(15, 23, 42, 0.08)","--dc-shadow-sm":"0 1px 2px rgba(15, 23, 42, 0.06)","--dc-radius":"12px","--dc-radius-sm":"8px","--dc-radius-bubble":"12px","--dc-font-family":'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',"--dc-font-size":"14px","--dc-font-size-sm":"12px","--dc-font-size-xs":"11px","--dc-transition":"0.15s ease","--dc-ease-panel":"cubic-bezier(0.16, 1, 0.3, 1)"},r0={"--dc-primary-color":"#60a5fa","--dc-primary-hover":"#93c5fd","--dc-primary-text":"#0f172a","--dc-primary-soft":"#1e2a44","--dc-bg-color":"#0f1419","--dc-surface-color":"#1a1f26","--dc-surface-2":"#242b33","--dc-border-color":"#2e3640","--dc-text-color":"#f3f4f6","--dc-text-muted":"#aab2bd","--dc-text-light":"#959ca6","--dc-agent-bubble-bg":"#2e3138","--dc-agent-bubble-text":"#f3f4f6","--dc-online-soft":"#14321f","--dc-online-text":"#4ade80","--dc-danger-soft":"#3a1d1d","--dc-danger-text":"#fca5a5","--dc-warning-soft":"#3a2c12","--dc-warning-text":"#fcd34d","--dc-info-soft":"#12303d","--dc-info-text":"#7dd3fc"};s0=j1(":where(:root)",e0)+j1(':where([data-dc-theme="dark"])',r0)});var x,R2=t(()=>{"use strict";$();F2();E2();x=class extends y{connectedCallback(){H2(this.ownerDocument),super.connectedCallback()}announce(c){let a=this.renderRoot?.querySelector("[data-dc-live]");a||(a=document.createElement("div"),a.setAttribute("data-dc-live",""),a.setAttribute("aria-live","polite"),a.setAttribute("role","status"),a.style.cssText="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;",this.renderRoot?.appendChild(a)),a.textContent="",requestAnimationFrame(()=>{a&&(a.textContent=c)})}};x.styles=P2});var i0,D,K1=t(()=>{"use strict";$();B2();R2();i0={reconnecting:{tone:"warning",text:"Reconnecting\u2026 live updates will resume automatically.",spinner:!0},offline:{tone:"danger",text:"You're offline. We'll reconnect and sync as soon as your connection returns."},"other-tab":{tone:"info",text:"This session is active in another tab. Calls and the dialer run there.",action:"Use it here",event:"dc-resume-here"},"session-expiring":{tone:"warning",text:"Your secure session expires soon.",action:"Stay signed in",event:"dc-refresh-session"},"session-expired":{tone:"danger",text:"Your session expired for security. Sign in again to continue.",action:"Sign in",event:"dc-reauth"}},D=class extends x{constructor(){super(...arguments);this.kind="reconnecting"}render(){let a=i0[this.kind],l=a.tone==="danger"?"alert":"status";return z`
      <div class="banner ${a.tone}" role=${l}>
        ${a.spinner?z`<span class="spin"></span>`:z`<span class="dot"></span>`}
        <span class="txt">${a.text}</span>
        ${a.action?z`<button class="act" @click=${()=>this.emit(a.event??"dc-action")}>${a.action}</button>`:d}
      </div>
    `}emit(a){this.dispatchEvent(new CustomEvent(a,{bubbles:!0,composed:!0}))}};D.styles=[x.styles,B`
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
    `],u([g({type:String})],D.prototype,"kind",2),D=u([m2("dc-system-banner")],D)});var X1,Q1=t(()=>{"use strict";X1={prefix:"far",iconName:"circle",icon:[512,512,[128308,128309,128992,128993,128994,128995,128996,9679,9898,9899,11044,61708,61915],"f111","M464 256a208 208 0 1 0 -416 0 208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0 256 256 0 1 1 -512 0z"]}});var J1,Y1,Z1,c4,a4,l4,e4,r4,s4,i4,o4,f4,n4,t4,m4,z4,p4,M4,d4,L4,u4,v4,h4,C4,g4,x4,S4,N4,b4,w4,k4,y4,A4,T4,B4,P4,F4,H4,E4,R4,D4,U4,_4,q4,$4,G4,W4,I4,O4,V4,j4,K4,X4,Q4,J4,Y4,Z4,c3,a3,l3,e3,r3,s3,i3,o3,f3,n3,t3,m3,z3,p3,M3,d3,L3,u3,v3,h3,C3,g3=t(()=>{"use strict";J1={prefix:"fas",iconName:"minus",icon:[448,512,[8211,8722,10134,"subtract"],"f068","M0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32z"]},Y1={prefix:"fas",iconName:"microphone-slash",icon:[576,512,[],"f131","M41-24.9c-9.4-9.4-24.6-9.4-33.9 0S-2.3-.3 7 9.1l528 528c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9L424.7 358.8C458.9 324.2 480 276.6 480 224l0-40c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 40c0 39.3-15.7 74.9-41.3 100.9L356.8 291C373.6 273.7 384 250 384 224l0-128c0-53-43-96-96-96s-96 43-96 96l0 30.2-151-151zm298.3 434l-41.4-41.4c-3.3 .2-6.5 .3-9.8 .3-79.5 0-144-64.5-144-144l0-10.2-43.6-43.6c-2.8 3.9-4.4 8.7-4.4 13.8l0 40c0 97.9 73.3 178.7 168 190.5l0 49.5-48 0c-13.3 0-24 10.7-24 24s10.7 24 24 24l144 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-48 0 0-49.5c9.3-1.2 18.4-3 27.3-5.4z"]},Z1={prefix:"fas",iconName:"comment-sms",icon:[512,512,["sms"],"f7cd","M256 480c141.4 0 256-107.5 256-240S397.4 0 256 0 0 107.5 0 240c0 54.3 19.2 104.3 51.6 144.5L2.8 476.8c-4.8 9-3.3 20 3.6 27.5s17.8 9.8 27.1 5.8l118.4-50.7C183.7 472.6 218.9 480 256 480zM140.8 172.8l19.2 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-19.2 0c-5.3 0-9.6 4.3-9.6 9.6s4.3 9.6 9.6 9.6c23 0 41.6 18.6 41.6 41.6s-18.6 41.6-41.6 41.6l-25.6 0c-8.8 0-16-7.2-16-16s7.2-16 16-16l25.6 0c5.3 0 9.6-4.3 9.6-9.6s-4.3-9.6-9.6-9.6c-23 0-41.6-18.6-41.6-41.6s18.6-41.6 41.6-41.6zm188.8 41.6c0-23 18.6-41.6 41.6-41.6l19.2 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-19.2 0c-5.3 0-9.6 4.3-9.6 9.6s4.3 9.6 9.6 9.6c23 0 41.6 18.6 41.6 41.6s-18.6 41.6-41.6 41.6l-25.6 0c-8.8 0-16-7.2-16-16s7.2-16 16-16l25.6 0c5.3 0 9.6-4.3 9.6-9.6s-4.3-9.6-9.6-9.6c-23 0-41.6-18.6-41.6-41.6zm-98.3-33.8l24.7 41.1 24.7-41.1c3.7-6.2 11.1-9.1 18-7.2s11.7 8.2 11.7 15.4l0 102.4c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-44.6-8.7 14.5c-2.9 4.8-8.1 7.8-13.7 7.8s-10.8-3-13.7-7.8l-8.7-14.5 0 44.6c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-102.4c0-7.2 4.8-13.5 11.7-15.4s14.3 1 18 7.2z"]},c4={prefix:"fas",iconName:"envelope",icon:[512,512,[128386,9993,61443],"f0e0","M48 64c-26.5 0-48 21.5-48 48 0 15.1 7.1 29.3 19.2 38.4l208 156c17.1 12.8 40.5 12.8 57.6 0l208-156c12.1-9.1 19.2-23.3 19.2-38.4 0-26.5-21.5-48-48-48L48 64zM0 196L0 384c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-188-198.4 148.8c-34.1 25.6-81.1 25.6-115.2 0L0 196z"]},a4={prefix:"fas",iconName:"bell",icon:[448,512,[128276,61602],"f0f3","M224 0c-17.7 0-32 14.3-32 32l0 3.2C119 50 64 114.6 64 192l0 21.7c0 48.1-16.4 94.8-46.4 132.4L7.8 358.3C2.7 364.6 0 372.4 0 380.5 0 400.1 15.9 416 35.5 416l376.9 0c19.6 0 35.5-15.9 35.5-35.5 0-8.1-2.7-15.9-7.8-22.2l-9.8-12.2C400.4 308.5 384 261.8 384 213.7l0-21.7c0-77.4-55-142-128-156.8l0-3.2c0-17.7-14.3-32-32-32zM162 464c7.1 27.6 32.2 48 62 48s54.9-20.4 62-48l-124 0z"]},l4={prefix:"fas",iconName:"calendar-days",icon:[448,512,["calendar-alt"],"f073","M128 0c17.7 0 32 14.3 32 32l0 32 128 0 0-32c0-17.7 14.3-32 32-32s32 14.3 32 32l0 32 32 0c35.3 0 64 28.7 64 64l0 288c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64L0 128C0 92.7 28.7 64 64 64l32 0 0-32c0-17.7 14.3-32 32-32zM64 240l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm128 0l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0zM64 368l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0zm112 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16z"]},e4={prefix:"fas",iconName:"ellipsis",icon:[448,512,["ellipsis-h"],"f141","M0 256a56 56 0 1 1 112 0 56 56 0 1 1 -112 0zm168 0a56 56 0 1 1 112 0 56 56 0 1 1 -112 0zm224-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112z"]},r4={prefix:"fas",iconName:"magnifying-glass",icon:[512,512,[128269,"search"],"f002","M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376C296.3 401.1 253.9 416 208 416 93.1 416 0 322.9 0 208S93.1 0 208 0 416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"]},s4={prefix:"fas",iconName:"ban",icon:[512,512,[128683,"cancel"],"f05e","M367.2 412.5L99.5 144.8c-22.4 31.4-35.5 69.8-35.5 111.2 0 106 86 192 192 192 41.5 0 79.9-13.1 111.2-35.5zm45.3-45.3c22.4-31.4 35.5-69.8 35.5-111.2 0-106-86-192-192-192-41.5 0-79.9 13.1-111.2 35.5L412.5 367.2zM0 256a256 256 0 1 1 512 0 256 256 0 1 1 -512 0z"]},i4={prefix:"fas",iconName:"record-vinyl",icon:[512,512,[],"f8d9","M0 256a256 256 0 1 1 512 0 256 256 0 1 1 -512 0zm256-96a96 96 0 1 1 0 192 96 96 0 1 1 0-192zm0 240a144 144 0 1 0 0-288 144 144 0 1 0 0 288zm0-112a32 32 0 1 0 0-64 32 32 0 1 0 0 64z"]},o4={prefix:"fas",iconName:"palette",icon:[512,512,[127912],"f53f","M512 256c0 .9 0 1.8 0 2.7-.4 36.5-33.6 61.3-70.1 61.3L344 320c-26.5 0-48 21.5-48 48 0 3.4 .4 6.7 1 9.9 2.1 10.2 6.5 20 10.8 29.9 6.1 13.8 12.1 27.5 12.1 42 0 31.8-21.6 60.7-53.4 62-3.5 .1-7 .2-10.6 .2-141.4 0-256-114.6-256-256S114.6 0 256 0 512 114.6 512 256zM128 288a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm0-96a32 32 0 1 0 0-64 32 32 0 1 0 0 64zM288 96a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm96 96a32 32 0 1 0 0-64 32 32 0 1 0 0 64z"]},f4={prefix:"fas",iconName:"sitemap",icon:[512,512,[],"f0e8","M192 64c0-17.7 14.3-32 32-32l64 0c17.7 0 32 14.3 32 32l0 64c0 17.7-14.3 32-32 32l-8 0 0 64 120 0c39.8 0 72 32.2 72 72l0 56 8 0c17.7 0 32 14.3 32 32l0 64c0 17.7-14.3 32-32 32l-64 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l8 0 0-56c0-13.3-10.7-24-24-24l-120 0 0 80 8 0c17.7 0 32 14.3 32 32l0 64c0 17.7-14.3 32-32 32l-64 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l8 0 0-80-120 0c-13.3 0-24 10.7-24 24l0 56 8 0c17.7 0 32 14.3 32 32l0 64c0 17.7-14.3 32-32 32l-64 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l8 0 0-56c0-39.8 32.2-72 72-72l120 0 0-64-8 0c-17.7 0-32-14.3-32-32l0-64z"]},n4={prefix:"fas",iconName:"fax",icon:[512,512,[128224,128439],"f1ac","M160 64l0 80 64 0 0-80 146.7 0 45.3 45.3 0 34.7 64 0 0-34.7c0-17-6.7-33.3-18.7-45.3L416 18.7C404 6.7 387.7 0 370.7 0L224 0c-35.3 0-64 28.7-64 64zM32 128c-17.7 0-32 14.3-32 32L0 448c0 17.7 14.3 32 32 32l48 0c17.7 0 32-14.3 32-32l0-288c0-17.7-14.3-32-32-32l-48 0zm448 64l-320 0 0 256c0 17.7 14.3 32 32 32l288 0c17.7 0 32-14.3 32-32l0-224c0-17.7-14.3-32-32-32zM224 288a24 24 0 1 1 48 0 24 24 0 1 1 -48 0zm0 96a24 24 0 1 1 48 0 24 24 0 1 1 -48 0zM336 264a24 24 0 1 1 0 48 24 24 0 1 1 0-48zM312 384a24 24 0 1 1 48 0 24 24 0 1 1 -48 0zM424 264a24 24 0 1 1 0 48 24 24 0 1 1 0-48zM400 384a24 24 0 1 1 48 0 24 24 0 1 1 -48 0z"]},t4={prefix:"fas",iconName:"expand",icon:[448,512,[],"f065","M32 32C14.3 32 0 46.3 0 64l0 96c0 17.7 14.3 32 32 32s32-14.3 32-32l0-64 64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L32 32zM64 352c0-17.7-14.3-32-32-32S0 334.3 0 352l0 96c0 17.7 14.3 32 32 32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0 0-64zM320 32c-17.7 0-32 14.3-32 32s14.3 32 32 32l64 0 0 64c0 17.7 14.3 32 32 32s32-14.3 32-32l0-96c0-17.7-14.3-32-32-32l-96 0zM448 352c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 64-64 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l96 0c17.7 0 32-14.3 32-32l0-96z"]},m4={prefix:"fas",iconName:"table-columns",icon:[448,512,["columns"],"f0db","M0 96C0 60.7 28.7 32 64 32l320 0c35.3 0 64 28.7 64 64l0 320c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64L0 96zm64 64l0 256 128 0 0-256-128 0zm320 0l-128 0 0 256 128 0 0-256z"]},z4={prefix:"fas",iconName:"stop",icon:[448,512,[9209],"f04d","M64 32l320 0c35.3 0 64 28.7 64 64l0 320c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64L0 96C0 60.7 28.7 32 64 32z"]},p4={prefix:"fas",iconName:"clock",icon:[512,512,[128339,"clock-four"],"f017","M256 0a256 256 0 1 1 0 512 256 256 0 1 1 0-512zM232 120l0 136c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2 280 120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"]},M4={prefix:"fas",iconName:"rocket",icon:[512,512,[],"f135","M128 320L24.5 320c-24.9 0-40.2-27.1-27.4-48.5L50 183.3C58.7 168.8 74.3 160 91.2 160l95 0c76.1-128.9 189.6-135.4 265.5-124.3 12.8 1.9 22.8 11.9 24.6 24.6 11.1 75.9 4.6 189.4-124.3 265.5l0 95c0 16.9-8.8 32.5-23.3 41.2l-88.2 52.9c-21.3 12.8-48.5-2.6-48.5-27.4L192 384c0-35.3-28.7-64-64-64l-.1 0zM400 160a48 48 0 1 0 -96 0 48 48 0 1 0 96 0z"]},d4={prefix:"fas",iconName:"paper-plane",icon:[576,512,[61913],"f1d8","M536.4-26.3c9.8-3.5 20.6-1 28 6.3s9.8 18.2 6.3 28l-178 496.9c-5 13.9-18.1 23.1-32.8 23.1-14.2 0-27-8.6-32.3-21.7l-64.2-158c-4.5-11-2.5-23.6 5.2-32.6l94.5-112.4c5.1-6.1 4.7-15-.9-20.6s-14.6-6-20.6-.9L229.2 276.1c-9.1 7.6-21.6 9.6-32.6 5.2L38.1 216.8c-13.1-5.3-21.7-18.1-21.7-32.3 0-14.7 9.2-27.8 23.1-32.8l496.9-178z"]},L4={prefix:"fas",iconName:"fire",icon:[448,512,[128293],"f06d","M160.5-26.4c9.3-7.8 23-7.5 31.9 .9 12.3 11.6 23.3 24.4 33.9 37.4 13.5 16.5 29.7 38.3 45.3 64.2 5.2-6.8 10-12.8 14.2-17.9 1.1-1.3 2.2-2.7 3.3-4.1 7.9-9.8 17.7-22.1 30.8-22.1 13.4 0 22.8 11.9 30.8 22.1 1.3 1.7 2.6 3.3 3.9 4.8 10.3 12.4 24 30.3 37.7 52.4 27.2 43.9 55.6 106.4 55.6 176.6 0 123.7-100.3 224-224 224S0 411.7 0 288c0-91.1 41.1-170 80.5-225 19.9-27.7 39.7-49.9 54.6-65.1 8.2-8.4 16.5-16.7 25.5-24.2zM225.7 416c25.3 0 47.7-7 68.8-21 42.1-29.4 53.4-88.2 28.1-134.4-4.5-9-16-9.6-22.5-2l-25.2 29.3c-6.6 7.6-18.5 7.4-24.7-.5-17.3-22.1-49.1-62.4-65.3-83-5.4-6.9-15.2-8-21.5-1.9-18.3 17.8-51.5 56.8-51.5 104.3 0 68.6 50.6 109.2 113.7 109.2z"]},u4={prefix:"fas",iconName:"users",icon:[640,512,[],"f0c0","M320 16a104 104 0 1 1 0 208 104 104 0 1 1 0-208zM96 88a72 72 0 1 1 0 144 72 72 0 1 1 0-144zM0 416c0-70.7 57.3-128 128-128 12.8 0 25.2 1.9 36.9 5.4-32.9 36.8-52.9 85.4-52.9 138.6l0 16c0 11.4 2.4 22.2 6.7 32L32 480c-17.7 0-32-14.3-32-32l0-32zm521.3 64c4.3-9.8 6.7-20.6 6.7-32l0-16c0-53.2-20-101.8-52.9-138.6 11.7-3.5 24.1-5.4 36.9-5.4 70.7 0 128 57.3 128 128l0 32c0 17.7-14.3 32-32 32l-86.7 0zM472 160a72 72 0 1 1 144 0 72 72 0 1 1 -144 0zM160 432c0-88.4 71.6-160 160-160s160 71.6 160 160l0 16c0 17.7-14.3 32-32 32l-256 0c-17.7 0-32-14.3-32-32l0-16z"]},v4={prefix:"fas",iconName:"headset",icon:[448,512,[],"f590","M224 64c-79 0-144.7 57.3-157.7 132.7 9.3-3 19.3-4.7 29.7-4.7l16 0c26.5 0 48 21.5 48 48l0 96c0 26.5-21.5 48-48 48l-16 0c-53 0-96-43-96-96l0-64C0 100.3 100.3 0 224 0S448 100.3 448 224l0 168.1c0 66.3-53.8 120-120.1 120l-87.9-.1-32 0c-26.5 0-48-21.5-48-48s21.5-48 48-48l32 0c26.5 0 48 21.5 48 48l0 0 40 0c39.8 0 72-32.2 72-72l0-20.9c-14.1 8.2-30.5 12.8-48 12.8l-16 0c-26.5 0-48-21.5-48-48l0-96c0-26.5 21.5-48 48-48l16 0c10.4 0 20.3 1.6 29.7 4.7-13-75.3-78.6-132.7-157.7-132.7z"]},h4={prefix:"fas",iconName:"voicemail",icon:[640,512,[],"f897","M144 160a80 80 0 1 1 0 160 80 80 0 1 1 0-160zM263.8 320c15.3-22.9 24.2-50.4 24.2-80 0-79.5-64.5-144-144-144S0 160.5 0 240 64.5 384 144 384l352 0c79.5 0 144-64.5 144-144S575.5 96 496 96 352 160.5 352 240c0 29.6 8.9 57.1 24.2 80l-112.5 0zM496 160a80 80 0 1 1 0 160 80 80 0 1 1 0-160z"]},C4={prefix:"fas",iconName:"microphone",icon:[384,512,[],"f130","M192 0C139 0 96 43 96 96l0 128c0 53 43 96 96 96s96-43 96-96l0-128c0-53-43-96-96-96zM48 184c0-13.3-10.7-24-24-24S0 170.7 0 184l0 40c0 97.9 73.3 178.7 168 190.5l0 49.5-48 0c-13.3 0-24 10.7-24 24s10.7 24 24 24l144 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-48 0 0-49.5c94.7-11.8 168-92.6 168-190.5l0-40c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 40c0 79.5-64.5 144-144 144S48 303.5 48 224l0-40z"]},g4={prefix:"fas",iconName:"image",icon:[448,512,[],"f03e","M64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L64 32zm64 80a48 48 0 1 1 0 96 48 48 0 1 1 0-96zM272 224c8.4 0 16.1 4.4 20.5 11.5l88 144c4.5 7.4 4.7 16.7 .5 24.3S368.7 416 360 416L88 416c-8.9 0-17.2-5-21.3-12.9s-3.5-17.5 1.6-24.8l56-80c4.5-6.4 11.8-10.2 19.7-10.2s15.2 3.8 19.7 10.2l26.4 37.8 61.4-100.5c4.4-7.1 12.1-11.5 20.5-11.5z"]},x4={prefix:"fas",iconName:"folder",icon:[512,512,[128193,128447,61716,"folder-blank"],"f07b","M64 448l384 0c35.3 0 64-28.7 64-64l0-240c0-35.3-28.7-64-64-64L298.7 80c-6.9 0-13.7-2.2-19.2-6.4L241.1 44.8C230 36.5 216.5 32 202.7 32L64 32C28.7 32 0 60.7 0 96L0 384c0 35.3 28.7 64 64 64z"]},S4={prefix:"fas",iconName:"cloud",icon:[576,512,[9729],"f0c2","M0 336c0 79.5 64.5 144 144 144l304 0c70.7 0 128-57.3 128-128 0-51.6-30.5-96.1-74.5-116.3 6.7-13.1 10.5-28 10.5-43.7 0-53-43-96-96-96-17.7 0-34.2 4.8-48.4 13.1-24.1-45.8-72.2-77.1-127.6-77.1-79.5 0-144 64.5-144 144 0 8 .7 15.9 1.9 23.5-56.9 19.2-97.9 73.1-97.9 136.5z"]},N4={prefix:"fas",iconName:"link",icon:[576,512,[128279,"chain"],"f0c1","M419.5 96c-16.6 0-32.7 4.5-46.8 12.7-15.8-16-34.2-29.4-54.5-39.5 28.2-24 64.1-37.2 101.3-37.2 86.4 0 156.5 70 156.5 156.5 0 41.5-16.5 81.3-45.8 110.6l-71.1 71.1c-29.3 29.3-69.1 45.8-110.6 45.8-86.4 0-156.5-70-156.5-156.5 0-1.5 0-3 .1-4.5 .5-17.7 15.2-31.6 32.9-31.1s31.6 15.2 31.1 32.9c0 .9 0 1.8 0 2.6 0 51.1 41.4 92.5 92.5 92.5 24.5 0 48-9.7 65.4-27.1l71.1-71.1c17.3-17.3 27.1-40.9 27.1-65.4 0-51.1-41.4-92.5-92.5-92.5zM275.2 173.3c-1.9-.8-3.8-1.9-5.5-3.1-12.6-6.5-27-10.2-42.1-10.2-24.5 0-48 9.7-65.4 27.1L91.1 258.2c-17.3 17.3-27.1 40.9-27.1 65.4 0 51.1 41.4 92.5 92.5 92.5 16.5 0 32.6-4.4 46.7-12.6 15.8 16 34.2 29.4 54.6 39.5-28.2 23.9-64 37.2-101.3 37.2-86.4 0-156.5-70-156.5-156.5 0-41.5 16.5-81.3 45.8-110.6l71.1-71.1c29.3-29.3 69.1-45.8 110.6-45.8 86.6 0 156.5 70.6 156.5 156.9 0 1.3 0 2.6 0 3.9-.4 17.7-15.1 31.6-32.8 31.2s-31.6-15.1-31.2-32.8c0-.8 0-1.5 0-2.3 0-33.7-18-63.3-44.8-79.6z"]},b4={prefix:"fas",iconName:"chart-line",icon:[512,512,["line-chart"],"f201","M64 64c0-17.7-14.3-32-32-32S0 46.3 0 64L0 400c0 44.2 35.8 80 80 80l400 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L80 416c-8.8 0-16-7.2-16-16L64 64zm406.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L320 210.7 262.6 153.4c-12.5-12.5-32.8-12.5-45.3 0l-96 96c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l73.4-73.4 57.4 57.4c12.5 12.5 32.8 12.5 45.3 0l128-128z"]},w4={prefix:"fas",iconName:"gear",icon:[512,512,[9881,"cog"],"f013","M195.1 9.5C198.1-5.3 211.2-16 226.4-16l59.8 0c15.2 0 28.3 10.7 31.3 25.5L332 79.5c14.1 6 27.3 13.7 39.3 22.8l67.8-22.5c14.4-4.8 30.2 1.2 37.8 14.4l29.9 51.8c7.6 13.2 4.9 29.8-6.5 39.9L447 233.3c.9 7.4 1.3 15 1.3 22.7s-.5 15.3-1.3 22.7l53.4 47.5c11.4 10.1 14 26.8 6.5 39.9l-29.9 51.8c-7.6 13.1-23.4 19.2-37.8 14.4l-67.8-22.5c-12.1 9.1-25.3 16.7-39.3 22.8l-14.4 69.9c-3.1 14.9-16.2 25.5-31.3 25.5l-59.8 0c-15.2 0-28.3-10.7-31.3-25.5l-14.4-69.9c-14.1-6-27.2-13.7-39.3-22.8L73.5 432.3c-14.4 4.8-30.2-1.2-37.8-14.4L5.8 366.1c-7.6-13.2-4.9-29.8 6.5-39.9l53.4-47.5c-.9-7.4-1.3-15-1.3-22.7s.5-15.3 1.3-22.7L12.3 185.8c-11.4-10.1-14-26.8-6.5-39.9L35.7 94.1c7.6-13.2 23.4-19.2 37.8-14.4l67.8 22.5c12.1-9.1 25.3-16.7 39.3-22.8L195.1 9.5zM256.3 336a80 80 0 1 0 -.6-160 80 80 0 1 0 .6 160z"]},k4={prefix:"fas",iconName:"up-right-and-down-left-from-center",icon:[512,512,["expand-alt"],"f424","M344 0L488 0c13.3 0 24 10.7 24 24l0 144c0 9.7-5.8 18.5-14.8 22.2s-19.3 1.7-26.2-5.2l-39-39-87 87c-9.4 9.4-24.6 9.4-33.9 0l-32-32c-9.4-9.4-9.4-24.6 0-33.9l87-87-39-39c-6.9-6.9-8.9-17.2-5.2-26.2S334.3 0 344 0zM168 512L24 512c-13.3 0-24-10.7-24-24L0 344c0-9.7 5.8-18.5 14.8-22.2S34.1 320.2 41 327l39 39 87-87c9.4-9.4 24.6-9.4 33.9 0l32 32c9.4 9.4 9.4 24.6 0 33.9l-87 87 39 39c6.9 6.9 8.9 17.2 5.2 26.2S177.7 512 168 512z"]},y4={prefix:"fas",iconName:"play",icon:[448,512,[9654],"f04b","M91.2 36.9c-12.4-6.8-27.4-6.5-39.6 .7S32 57.9 32 72l0 368c0 14.1 7.5 27.2 19.6 34.4s27.2 7.5 39.6 .7l336-184c12.8-7 20.8-20.5 20.8-35.1s-8-28.1-20.8-35.1l-336-184z"]},A4={prefix:"fas",iconName:"check",icon:[448,512,[10003,10004],"f00c","M434.8 70.1c14.3 10.4 17.5 30.4 7.1 44.7l-256 352c-5.5 7.6-14 12.3-23.4 13.1s-18.5-2.7-25.1-9.3l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l101.5 101.5 234-321.7c10.4-14.3 30.4-17.5 44.7-7.1z"]},T4={prefix:"fas",iconName:"sliders",icon:[512,512,["sliders-h"],"f1de","M32 64C14.3 64 0 78.3 0 96s14.3 32 32 32l86.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48L480 128c17.7 0 32-14.3 32-32s-14.3-32-32-32L265.3 64C253 35.7 224.8 16 192 16s-61 19.7-73.3 48L32 64zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32l246.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48l54.7 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-54.7 0c-12.3-28.3-40.5-48-73.3-48s-61 19.7-73.3 48L32 224zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32l54.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48L480 448c17.7 0 32-14.3 32-32s-14.3-32-32-32l-246.7 0c-12.3-28.3-40.5-48-73.3-48s-61 19.7-73.3 48L32 384z"]},B4={prefix:"fas",iconName:"user",icon:[448,512,[128100,62144,62470,"user-alt","user-large"],"f007","M224 248a120 120 0 1 0 0-240 120 120 0 1 0 0 240zm-29.7 56C95.8 304 16 383.8 16 482.3 16 498.7 29.3 512 45.7 512l356.6 0c16.4 0 29.7-13.3 29.7-29.7 0-98.5-79.8-178.3-178.3-178.3l-59.4 0z"]},P4={prefix:"fas",iconName:"arrow-right",icon:[512,512,[8594],"f061","M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l370.7 0-105.4 105.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"]},F4={prefix:"fas",iconName:"right-left",icon:[512,512,["exchange-alt"],"f362","M502.6 150.6l-96 96c-9.2 9.2-22.9 11.9-34.9 6.9S352 236.9 352 224l0-64-320 0c-17.7 0-32-14.3-32-32S14.3 96 32 96l320 0 0-64c0-12.9 7.8-24.6 19.8-29.6s25.7-2.2 34.9 6.9l96 96c12.5 12.5 12.5 32.8 0 45.3zm-397.3 352l-96-96c-12.5-12.5-12.5-32.8 0-45.3l96-96c9.2-9.2 22.9-11.9 34.9-6.9S160 275.1 160 288l0 64 320 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-320 0 0 64c0 12.9-7.8 24.6-19.8 29.6s-25.7 2.2-34.9-6.9z"]},H4={prefix:"fas",iconName:"xmark",icon:[384,512,[128473,10005,10006,10060,215,"close","multiply","remove","times"],"f00d","M55.1 73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L147.2 256 9.9 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192.5 301.3 329.9 438.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.8 256 375.1 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192.5 210.7 55.1 73.4z"]},E4={prefix:"fas",iconName:"comments",icon:[576,512,[128490,61670],"f086","M384 144c0 97.2-86 176-192 176-26.7 0-52.1-5-75.2-14L35.2 349.2c-9.3 4.9-20.7 3.2-28.2-4.2s-9.2-18.9-4.2-28.2l35.6-67.2C14.3 220.2 0 183.6 0 144 0 46.8 86-32 192-32S384 46.8 384 144zm0 368c-94.1 0-172.4-62.1-188.8-144 120-1.5 224.3-86.9 235.8-202.7 83.3 19.2 145 88.3 145 170.7 0 39.6-14.3 76.2-38.4 105.6l35.6 67.2c4.9 9.3 3.2 20.7-4.2 28.2s-18.9 9.2-28.2 4.2L459.2 498c-23.1 9-48.5 14-75.2 14z"]},R4={prefix:"fas",iconName:"mobile-screen",icon:[384,512,["mobile-android-alt"],"f3cf","M16 64C16 28.7 44.7 0 80 0L304 0c35.3 0 64 28.7 64 64l0 384c0 35.3-28.7 64-64 64L80 512c-35.3 0-64-28.7-64-64L16 64zM128 440c0 13.3 10.7 24 24 24l80 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-80 0c-13.3 0-24 10.7-24 24zM304 64l-224 0 0 304 224 0 0-304z"]},D4={prefix:"fas",iconName:"phone-volume",icon:[576,512,["volume-control-phone"],"f2a0","M344-32c128.1 0 232 103.9 232 232 0 13.3-10.7 24-24 24s-24-10.7-24-24c0-101.6-82.4-184-184-184-13.3 0-24-10.7-24-24s10.7-24 24-24zm8 192a32 32 0 1 1 0 64 32 32 0 1 1 0-64zM320 88c0-13.3 10.7-24 24-24 75.1 0 136 60.9 136 136 0 13.3-10.7 24-24 24s-24-10.7-24-24c0-48.6-39.4-88-88-88-13.3 0-24-10.7-24-24zM144.1 1.4c19.7-5.4 40.3 4.7 48.1 23.5l40.5 97.3c6.9 16.5 2.1 35.6-11.8 47l-44.1 36.1c32.5 71.6 89 130 159.3 164.9L374.7 323c11.3-13.9 30.4-18.6 47-11.8L519 351.8c18.8 7.8 28.9 28.4 23.5 48.1l-1.5 5.5C523.4 470.1 460.9 525.3 384.6 509.2 209.6 472.1 71.9 334.4 34.8 159.4 18.7 83.1 73.9 20.6 138.5 2.9l5.5-1.5z"]},U4={prefix:"fas",iconName:"phone",icon:[512,512,[128222,128379],"f095","M160.2 25C152.3 6.1 131.7-3.9 112.1 1.4l-5.5 1.5c-64.6 17.6-119.8 80.2-103.7 156.4 37.1 175 174.8 312.7 349.8 349.8 76.3 16.2 138.8-39.1 156.4-103.7l1.5-5.5c5.4-19.7-4.7-40.3-23.5-48.1l-97.3-40.5c-16.5-6.9-35.6-2.1-47 11.8l-38.6 47.2C233.9 335.4 177.3 277 144.8 205.3L189 169.3c13.9-11.3 18.6-30.4 11.8-47L160.2 25z"]},_4={prefix:"fas",iconName:"address-book",icon:[512,512,[62138,"contact-book"],"f2b9","M96 0C60.7 0 32 28.7 32 64l0 384c0 35.3 28.7 64 64 64l288 0c35.3 0 64-28.7 64-64l0-384c0-35.3-28.7-64-64-64L96 0zM208 288l64 0c44.2 0 80 35.8 80 80 0 8.8-7.2 16-16 16l-192 0c-8.8 0-16-7.2-16-16 0-44.2 35.8-80 80-80zm-24-96a56 56 0 1 1 112 0 56 56 0 1 1 -112 0zM512 80c0-8.8-7.2-16-16-16s-16 7.2-16 16l0 64c0 8.8 7.2 16 16 16s16-7.2 16-16l0-64zm0 128c0-8.8-7.2-16-16-16s-16 7.2-16 16l0 64c0 8.8 7.2 16 16 16s16-7.2 16-16l0-64zM496 320c-8.8 0-16 7.2-16 16l0 64c0 8.8 7.2 16 16 16s16-7.2 16-16l0-64c0-8.8-7.2-16-16-16z"]},q4={prefix:"fas",iconName:"chevron-down",icon:[448,512,[],"f078","M201.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 338.7 54.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"]},$4={prefix:"fas",iconName:"plug",icon:[448,512,[128268],"f1e6","M128-32c17.7 0 32 14.3 32 32l0 96 128 0 0-96c0-17.7 14.3-32 32-32s32 14.3 32 32l0 96 64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l0 64c0 95.1-69.2 174.1-160 189.3l0 66.7c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-66.7C101.2 398.1 32 319.1 32 224l0-64c-17.7 0-32-14.3-32-32S14.3 96 32 96l64 0 0-96c0-17.7 14.3-32 32-32z"]},G4={prefix:"fas",iconName:"comment-dots",icon:[512,512,[128172,62075,"commenting"],"f4ad","M256 480c141.4 0 256-107.5 256-240S397.4 0 256 0 0 107.5 0 240c0 54.3 19.2 104.3 51.6 144.5L2.8 476.8c-4.8 9-3.3 20 3.6 27.5s17.8 9.8 27.1 5.8l118.4-50.7C183.7 472.6 218.9 480 256 480zM128 208a32 32 0 1 1 0 64 32 32 0 1 1 0-64zm128 0a32 32 0 1 1 0 64 32 32 0 1 1 0-64zm96 32a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"]},W4={prefix:"fas",iconName:"inbox",icon:[512,512,[],"f01c","M91.8 32C59.9 32 32.9 55.4 28.4 86.9L.6 281.2c-.4 3-.6 6-.6 9.1L0 416c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-125.7c0-3-.2-6.1-.6-9.1L483.6 86.9C479.1 55.4 452.1 32 420.2 32L91.8 32zm0 64l328.5 0 27.4 192-59.9 0c-12.1 0-23.2 6.8-28.6 17.7l-14.3 28.6c-5.4 10.8-16.5 17.7-28.6 17.7l-120.4 0c-12.1 0-23.2-6.8-28.6-17.7l-14.3-28.6c-5.4-10.8-16.5-17.7-28.6-17.7L64.3 288 91.8 96z"]},I4={prefix:"fas",iconName:"bullhorn",icon:[512,512,[128226,128363],"f0a1","M461.2 18.9C472.7 24 480 35.4 480 48l0 416c0 12.6-7.3 24-18.8 29.1s-24.8 3.2-34.3-5.1l-46.6-40.7c-43.6-38.1-98.7-60.3-156.4-63l0 95.7c0 17.7-14.3 32-32 32l-32 0c-17.7 0-32-14.3-32-32l0-96C57.3 384 0 326.7 0 256S57.3 128 128 128l84.5 0c61.8-.2 121.4-22.7 167.9-63.3l46.6-40.7c9.4-8.3 22.9-10.2 34.3-5.1zM224 320l0 .2c70.3 2.7 137.8 28.5 192 73.4l0-275.3c-54.2 44.9-121.7 70.7-192 73.4L224 320z"]},O4={prefix:"fas",iconName:"wand-magic-sparkles",icon:[576,512,["magic-wand-sparkles"],"e2ca","M263.4-27L278.2 9.8 315 24.6c3 1.2 5 4.2 5 7.4s-2 6.2-5 7.4L278.2 54.2 263.4 91c-1.2 3-4.2 5-7.4 5s-6.2-2-7.4-5L233.8 54.2 197 39.4c-3-1.2-5-4.2-5-7.4s2-6.2 5-7.4L233.8 9.8 248.6-27c1.2-3 4.2-5 7.4-5s6.2 2 7.4 5zM110.7 41.7l21.5 50.1 50.1 21.5c5.9 2.5 9.7 8.3 9.7 14.7s-3.8 12.2-9.7 14.7l-50.1 21.5-21.5 50.1c-2.5 5.9-8.3 9.7-14.7 9.7s-12.2-3.8-14.7-9.7L59.8 164.2 9.7 142.7C3.8 140.2 0 134.4 0 128s3.8-12.2 9.7-14.7L59.8 91.8 81.3 41.7C83.8 35.8 89.6 32 96 32s12.2 3.8 14.7 9.7zM464 304c6.4 0 12.2 3.8 14.7 9.7l21.5 50.1 50.1 21.5c5.9 2.5 9.7 8.3 9.7 14.7s-3.8 12.2-9.7 14.7l-50.1 21.5-21.5 50.1c-2.5 5.9-8.3 9.7-14.7 9.7s-12.2-3.8-14.7-9.7l-21.5-50.1-50.1-21.5c-5.9-2.5-9.7-8.3-9.7-14.7s3.8-12.2 9.7-14.7l50.1-21.5 21.5-50.1c2.5-5.9 8.3-9.7 14.7-9.7zM460 0c11 0 21.6 4.4 29.5 12.2l42.3 42.3C539.6 62.4 544 73 544 84s-4.4 21.6-12.2 29.5l-88.2 88.2-101.3-101.3 88.2-88.2C438.4 4.4 449 0 460 0zM44.2 398.5L308.4 134.3 409.7 235.6 145.5 499.8C137.6 507.6 127 512 116 512s-21.6-4.4-29.5-12.2L44.2 457.5C36.4 449.6 32 439 32 428s4.4-21.6 12.2-29.5z"]},V4={prefix:"fas",iconName:"chart-column",icon:[512,512,[],"e0e3","M32 32c17.7 0 32 14.3 32 32l0 336c0 8.8 7.2 16 16 16l400 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L80 480c-44.2 0-80-35.8-80-80L0 64C0 46.3 14.3 32 32 32zM144 224c17.7 0 32 14.3 32 32l0 64c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32zm144-64l0 160c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-160c0-17.7 14.3-32 32-32s32 14.3 32 32zm80 32c17.7 0 32 14.3 32 32l0 96c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-96c0-17.7 14.3-32 32-32zM512 96l0 224c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-224c0-17.7 14.3-32 32-32s32 14.3 32 32z"]},j4={prefix:"fas",iconName:"star",icon:[576,512,[11088,61446],"f005","M309.5-18.9c-4.1-8-12.4-13.1-21.4-13.1s-17.3 5.1-21.4 13.1L193.1 125.3 33.2 150.7c-8.9 1.4-16.3 7.7-19.1 16.3s-.5 18 5.8 24.4l114.4 114.5-25.2 159.9c-1.4 8.9 2.3 17.9 9.6 23.2s16.9 6.1 25 2L288.1 417.6 432.4 491c8 4.1 17.7 3.3 25-2s11-14.2 9.6-23.2L441.7 305.9 556.1 191.4c6.4-6.4 8.6-15.8 5.8-24.4s-10.1-14.9-19.1-16.3L383 125.3 309.5-18.9z"]},K4={prefix:"fas",iconName:"triangle-exclamation",icon:[512,512,[9888,"exclamation-triangle","warning"],"f071","M256 0c14.7 0 28.2 8.1 35.2 21l216 400c6.7 12.4 6.4 27.4-.8 39.5S486.1 480 472 480L40 480c-14.1 0-27.2-7.4-34.4-19.5s-7.5-27.1-.8-39.5l216-400c7-12.9 20.5-21 35.2-21zm0 352a32 32 0 1 0 0 64 32 32 0 1 0 0-64zm0-192c-18.2 0-32.7 15.5-31.4 33.7l7.4 104c.9 12.5 11.4 22.3 23.9 22.3 12.6 0 23-9.7 23.9-22.3l7.4-104c1.3-18.2-13.1-33.7-31.4-33.7z"]},X4={prefix:"fas",iconName:"lock",icon:[384,512,[128274],"f023","M128 96l0 64 128 0 0-64c0-35.3-28.7-64-64-64s-64 28.7-64 64zM64 160l0-64C64 25.3 121.3-32 192-32S320 25.3 320 96l0 64c35.3 0 64 28.7 64 64l0 224c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 224c0-35.3 28.7-64 64-64z"]},Q4={prefix:"fas",iconName:"window-restore",icon:[576,512,[],"f2d2","M512 96L160 96c0-35.3 28.7-64 64-64l288 0c35.3 0 64 28.7 64 64l0 192c0 35.3-28.7 64-64 64l-48 0 0-64 48 0 0-192zM0 224c0-35.3 28.7-64 64-64l288 0c35.3 0 64 28.7 64 64l0 192c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64L0 224zm64 40c0 13.3 10.7 24 24 24l240 0c13.3 0 24-10.7 24-24s-10.7-24-24-24L88 240c-13.3 0-24 10.7-24 24z"]},J4={prefix:"fas",iconName:"shield-halved",icon:[512,512,["shield-alt"],"f3ed","M256 0c4.6 0 9.2 1 13.4 2.9L457.8 82.8c22 9.3 38.4 31 38.3 57.2-.5 99.2-41.3 280.7-213.6 363.2-16.7 8-36.1 8-52.8 0-172.4-82.5-213.1-264-213.6-363.2-.1-26.2 16.3-47.9 38.3-57.2L242.7 2.9C246.9 1 251.4 0 256 0zm0 66.8l0 378.1c138-66.8 175.1-214.8 176-303.4l-176-74.6 0 0z"]},Y4={prefix:"fas",iconName:"caret-up",icon:[320,512,[],"f0d8","M140.3 135.2c12.6-10.3 31.1-9.5 42.8 2.2l128 128c9.2 9.2 11.9 22.9 6.9 34.9S301.4 320 288.5 320l-256 0c-12.9 0-24.6-7.8-29.6-19.8S.7 274.5 9.9 265.4l128-128 2.4-2.2z"]},Z4={prefix:"fas",iconName:"globe",icon:[512,512,[127760],"f0ac","M351.9 280l-190.9 0c2.9 64.5 17.2 123.9 37.5 167.4 11.4 24.5 23.7 41.8 35.1 52.4 11.2 10.5 18.9 12.2 22.9 12.2s11.7-1.7 22.9-12.2c11.4-10.6 23.7-28 35.1-52.4 20.3-43.5 34.6-102.9 37.5-167.4zM160.9 232l190.9 0C349 167.5 334.7 108.1 314.4 64.6 303 40.2 290.7 22.8 279.3 12.2 268.1 1.7 260.4 0 256.4 0s-11.7 1.7-22.9 12.2c-11.4 10.6-23.7 28-35.1 52.4-20.3 43.5-34.6 102.9-37.5 167.4zm-48 0C116.4 146.4 138.5 66.9 170.8 14.7 78.7 47.3 10.9 131.2 1.5 232l111.4 0zM1.5 280c9.4 100.8 77.2 184.7 169.3 217.3-32.3-52.2-54.4-131.7-57.9-217.3L1.5 280zm398.4 0c-3.5 85.6-25.6 165.1-57.9 217.3 92.1-32.7 159.9-116.5 169.3-217.3l-111.4 0zm111.4-48C501.9 131.2 434.1 47.3 342 14.7 374.3 66.9 396.4 146.4 399.9 232l111.4 0z"]},c3={prefix:"fas",iconName:"upload",icon:[448,512,[],"f093","M256 109.3L256 320c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-210.7-41.4 41.4c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l96-96c12.5-12.5 32.8-12.5 45.3 0l96 96c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 109.3zM224 400c44.2 0 80-35.8 80-80l80 0c35.3 0 64 28.7 64 64l0 32c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64l0-32c0-35.3 28.7-64 64-64l80 0c0 44.2 35.8 80 80 80zm144 24a24 24 0 1 0 0-48 24 24 0 1 0 0 48z"]},a3={prefix:"fas",iconName:"arrow-left",icon:[512,512,[8592],"f060","M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 288 480 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-370.7 0 105.4-105.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"]},l3={prefix:"fas",iconName:"check-double",icon:[384,512,[],"f560","M249.9 66.8c10.4-14.3 7.2-34.3-7.1-44.7s-34.3-7.2-44.7 7.1l-106 145.7-37.5-37.5c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l64 64c6.6 6.6 15.8 10 25.1 9.3s17.9-5.5 23.4-13.1l128-176zm128 136c10.4-14.3 7.2-34.3-7.1-44.7s-34.3-7.2-44.7 7.1l-170 233.7-69.5-69.5c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l96 96c6.6 6.6 15.8 10 25.1 9.3s17.9-5.5 23.4-13.1l192-264z"]},e3={prefix:"fas",iconName:"down-left-and-up-right-to-center",icon:[512,512,["compress-alt"],"f422","M439.5 7c9.4-9.4 24.6-9.4 33.9 0l32 32c9.4 9.4 9.4 24.6 0 33.9l-87 87 39 39c6.9 6.9 8.9 17.2 5.2 26.2S450.2 240 440.5 240l-144 0c-13.3 0-24-10.7-24-24l0-144c0-9.7 5.8-18.5 14.8-22.2s19.3-1.7 26.2 5.2l39 39 87-87zM72.5 272l144 0c13.3 0 24 10.7 24 24l0 144c0 9.7-5.8 18.5-14.8 22.2s-19.3 1.7-26.2-5.2l-39-39-87 87c-9.4 9.4-24.6 9.4-33.9 0l-32-32c-9.4-9.4-9.4-24.6 0-33.9l87-87-39-39c-6.9-6.9-8.9-17.2-5.2-26.2S62.8 272 72.5 272z"]},r3={prefix:"fas",iconName:"music",icon:[512,512,[127925],"f001","M468 7c7.6 6.1 12 15.3 12 25l0 304c0 44.2-43 80-96 80s-96-35.8-96-80 43-80 96-80c11.2 0 22 1.6 32 4.6l0-116.7-224 49.8 0 206.3c0 44.2-43 80-96 80s-96-35.8-96-80 43-80 96-80c11.2 0 22 1.6 32 4.6L128 96c0-15 10.4-28 25.1-31.2l288-64c9.5-2.1 19.4 .2 27 6.3z"]},s3={prefix:"fas",iconName:"robot",icon:[640,512,[129302],"f544","M352 0c0-17.7-14.3-32-32-32S288-17.7 288 0l0 64-96 0c-53 0-96 43-96 96l0 224c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-224c0-53-43-96-96-96l-96 0 0-64zM160 368c0-13.3 10.7-24 24-24l32 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-32 0c-13.3 0-24-10.7-24-24zm120 0c0-13.3 10.7-24 24-24l32 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-32 0c-13.3 0-24-10.7-24-24zm120 0c0-13.3 10.7-24 24-24l32 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-32 0c-13.3 0-24-10.7-24-24zM224 176a48 48 0 1 1 0 96 48 48 0 1 1 0-96zm144 48a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zM64 224c0-17.7-14.3-32-32-32S0 206.3 0 224l0 96c0 17.7 14.3 32 32 32s32-14.3 32-32l0-96zm544-32c-17.7 0-32 14.3-32 32l0 96c0 17.7 14.3 32 32 32s32-14.3 32-32l0-96c0-17.7-14.3-32-32-32z"]},i3={prefix:"fas",iconName:"plus",icon:[448,512,[10133,61543,"add"],"2b","M256 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 160-160 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l160 0 0 160c0 17.7 14.3 32 32 32s32-14.3 32-32l0-160 160 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-160 0 0-160z"]},o3={prefix:"fas",iconName:"caret-down",icon:[320,512,[],"f0d7","M140.3 376.8c12.6 10.2 31.1 9.5 42.8-2.2l128-128c9.2-9.2 11.9-22.9 6.9-34.9S301.4 192 288.5 192l-256 0c-12.9 0-24.6 7.8-29.6 19.8S.7 237.5 9.9 246.6l128 128 2.4 2.2z"]},f3={prefix:"fas",iconName:"tag",icon:[512,512,[127991],"f02b","M32.5 96l0 149.5c0 17 6.7 33.3 18.7 45.3l192 192c25 25 65.5 25 90.5 0L483.2 333.3c25-25 25-65.5 0-90.5l-192-192C279.2 38.7 263 32 246 32L96.5 32c-35.3 0-64 28.7-64 64zm112 16a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"]},n3={prefix:"fas",iconName:"phone-slash",icon:[576,512,[],"f3dd","M535-24.9c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9L41 537.1c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9L141.5 368.6C89.2 310.5 51.6 238.8 34.8 159.4 18.7 83.1 73.9 20.6 138.5 2.9l5.5-1.5c19.7-5.4 40.3 4.7 48.1 23.5l40.5 97.3c6.9 16.5 2.1 35.6-11.8 47l-44.1 36.1c12.9 28.5 29.6 54.8 49.5 78.5L535-24.9zm-150.4 534c-63-13.4-121.3-39.8-171.7-76.3L297.8 348c12.2 8.2 25 15.6 38.3 22.2L374.7 323c11.3-13.9 30.4-18.6 47-11.8L519 351.8c18.8 7.8 28.9 28.4 23.5 48.1l-1.5 5.5c-17.6 64.6-80.2 119.8-156.4 103.7z"]},t3={prefix:"fas",iconName:"briefcase",icon:[512,512,[128188],"f0b1","M200 48l112 0c4.4 0 8 3.6 8 8l0 40-128 0 0-40c0-4.4 3.6-8 8-8zm-56 8l0 40-80 0C28.7 96 0 124.7 0 160l0 96 512 0 0-96c0-35.3-28.7-64-64-64l-80 0 0-40c0-30.9-25.1-56-56-56L200 0c-30.9 0-56 25.1-56 56zM512 304l-192 0 0 16c0 17.7-14.3 32-32 32l-64 0c-17.7 0-32-14.3-32-32l0-16-192 0 0 112c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-112z"]},m3={prefix:"fas",iconName:"pause",icon:[384,512,[9208],"f04c","M48 32C21.5 32 0 53.5 0 80L0 432c0 26.5 21.5 48 48 48l64 0c26.5 0 48-21.5 48-48l0-352c0-26.5-21.5-48-48-48L48 32zm224 0c-26.5 0-48 21.5-48 48l0 352c0 26.5 21.5 48 48 48l64 0c26.5 0 48-21.5 48-48l0-352c0-26.5-21.5-48-48-48l-64 0z"]},z3={prefix:"fas",iconName:"desktop",icon:[512,512,[128421,61704,"desktop-alt"],"f390","M64 32C28.7 32 0 60.7 0 96L0 352c0 35.3 28.7 64 64 64l144 0-16 48-72 0c-13.3 0-24 10.7-24 24s10.7 24 24 24l272 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-72 0-16-48 144 0c35.3 0 64-28.7 64-64l0-256c0-35.3-28.7-64-64-64L64 32zM96 96l320 0c17.7 0 32 14.3 32 32l0 160c0 17.7-14.3 32-32 32L96 320c-17.7 0-32-14.3-32-32l0-160c0-17.7 14.3-32 32-32z"]},p3={prefix:"fas",iconName:"arrow-down",icon:[384,512,[8595],"f063","M169.4 502.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 402.7 224 32c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 370.7-105.4-105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"]},M3={prefix:"fas",iconName:"location-dot",icon:[384,512,["map-marker-alt"],"f3c5","M0 188.6C0 84.4 86 0 192 0S384 84.4 384 188.6c0 119.3-120.2 262.3-170.4 316.8-11.8 12.8-31.5 12.8-43.3 0-50.2-54.5-170.4-197.5-170.4-316.8zM192 256a64 64 0 1 0 0-128 64 64 0 1 0 0 128z"]},d3={prefix:"fas",iconName:"keyboard",icon:[576,512,[9e3],"f11c","M64 64C28.7 64 0 92.7 0 128L0 384c0 35.3 28.7 64 64 64l448 0c35.3 0 64-28.7 64-64l0-256c0-35.3-28.7-64-64-64L64 64zm16 64l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16zM64 240c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32zM176 128l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16zM160 240c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32zm16 80l224 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-224 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16zm80-176c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32zm16 80l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16zm80-80c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32zm16 80l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16zm80-80c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32zm16 80l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16z"]},L3={prefix:"fas",iconName:"hashtag",icon:[512,512,[62098],"23","M214.7 .7c17.3 3.7 28.3 20.7 24.6 38l-19.1 89.3 126.5 0 22-102.7C372.4 8 389.4-3 406.7 .7s28.3 20.7 24.6 38L412.2 128 480 128c17.7 0 32 14.3 32 32s-14.3 32-32 32l-81.6 0-27.4 128 67.8 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-81.6 0-22 102.7c-3.7 17.3-20.7 28.3-38 24.6s-28.3-20.7-24.6-38l19.1-89.3-126.5 0-22 102.7c-3.7 17.3-20.7 28.3-38 24.6s-28.3-20.7-24.6-38L99.8 384 32 384c-17.7 0-32-14.3-32-32s14.3-32 32-32l81.6 0 27.4-128-67.8 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l81.6 0 22-102.7C180.4 8 197.4-3 214.7 .7zM206.4 192l-27.4 128 126.5 0 27.4-128-126.5 0z"]},u3={prefix:"fas",iconName:"circle-dot",icon:[512,512,[128280,"dot-circle"],"f192","M256 512a256 256 0 1 0 0-512 256 256 0 1 0 0 512zm0-352a96 96 0 1 1 0 192 96 96 0 1 1 0-192z"]},v3={prefix:"fas",iconName:"arrows-rotate",icon:[512,512,[128472,"refresh","sync"],"f021","M65.9 228.5c13.3-93 93.4-164.5 190.1-164.5 53 0 101 21.5 135.8 56.2 .2 .2 .4 .4 .6 .6l7.6 7.2-47.9 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l128 0c17.7 0 32-14.3 32-32l0-128c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 53.4-11.3-10.7C390.5 28.6 326.5 0 256 0 127 0 20.3 95.4 2.6 219.5 .1 237 12.2 253.2 29.7 255.7s33.7-9.7 36.2-27.1zm443.5 64c2.5-17.5-9.7-33.7-27.1-36.2s-33.7 9.7-36.2 27.1c-13.3 93-93.4 164.5-190.1 164.5-53 0-101-21.5-135.8-56.2-.2-.2-.4-.4-.6-.6l-7.6-7.2 47.9 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L32 320c-8.5 0-16.7 3.4-22.7 9.5S-.1 343.7 0 352.3l1 127c.1 17.7 14.6 31.9 32.3 31.7S65.2 496.4 65 478.7l-.4-51.5 10.7 10.1c46.3 46.1 110.2 74.7 180.7 74.7 129 0 235.7-95.4 253.4-219.5z"]},h3={prefix:"fas",iconName:"list-ul",icon:[512,512,["list-dots"],"f0ca","M48 144a48 48 0 1 0 0-96 48 48 0 1 0 0 96zM192 64c-17.7 0-32 14.3-32 32s14.3 32 32 32l288 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L192 64zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32l288 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-288 0zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32l288 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-288 0zM48 464a48 48 0 1 0 0-96 48 48 0 1 0 0 96zM96 256a48 48 0 1 0 -96 0 48 48 0 1 0 96 0z"]},C3={prefix:"fas",iconName:"tablet-screen-button",icon:[448,512,["tablet-alt"],"f3fa","M0 64C0 28.7 28.7 0 64 0L384 0c35.3 0 64 28.7 64 64l0 384c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 64zM256 432a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zM384 64l-320 0 0 288 320 0 0-288z"]}});function h(e,c){let a=o0[e],[l,r,,,s]=a.icon,i=Array.isArray(s)?s.join(" "):s;return z`<svg
    viewBox="0 0 ${l} ${r}"
    style="width:1em;height:1em;vertical-align:-0.125em;overflow:visible"
    fill="currentColor"
    role=${c?.label?"img":"presentation"}
    aria-label=${c?.label??""}
    aria-hidden=${c?.label?"false":"true"}
  >
    <path d=${i}></path>
  </svg>`}var o0,x3=t(()=>{"use strict";$();Q1();g3();o0={"address-book":_4,"arrow-down":p3,"arrow-left":a3,"arrow-right":P4,ban:s4,bell:a4,briefcase:t3,bullhorn:I4,calendar:l4,"caret-down":o3,"caret-up":Y4,chart:V4,"chart-line":b4,check:A4,"check-double":l3,"chevron-down":q4,"circle-dot":u3,"circle-outline":X1,clock:p4,cloud:S4,comment:G4,comments:E4,desktop:z3,dialpad:d3,ellipsis:e4,envelope:c4,expand:t4,fax:n4,fire:L4,folder:x4,gear:w4,globe:Z4,hashtag:L3,headset:v4,image:g4,inbox:W4,link:N4,list:h3,"location-dot":M3,lock:X4,microphone:C4,"microphone-slash":Y1,minus:J1,mobile:R4,music:r3,palette:o4,pause:m3,phone:U4,"phone-slash":n3,"phone-volume":D4,play:y4,plug:$4,plus:i3,record:i4,robot:s3,rocket:M4,search:r4,send:d4,shield:J4,sitemap:f4,sliders:T4,sms:Z1,sparkles:O4,star:j4,stop:z4,sync:v3,"table-columns":m4,tablet:C3,tag:f3,transfer:F4,upload:c3,user:B4,users:u4,voicemail:h4,warning:K4,"window-compact":e3,"window-restore":Q4,"window-wide":k4,xmark:H4}});function _2(e){let c=e||{},a=String(c.theme||c.mode||"LIGHT").toLowerCase(),l=a==="dark"?U2:D2,r={mode:a==="auto"?"auto":l.mode,primaryColor:c.primaryColor||c.primary||l.primaryColor,primaryHover:c.primaryHover||l.primaryHover,primaryText:c.primaryText||l.primaryText,radius:c.radius||l.radius,fontFamily:c.fontFamily||l.fontFamily};return a==="auto"&&(r.mode="auto"),r}function f0(e){return e==="dark"?"dark":e==="light"?"light":typeof window<"u"&&typeof window.matchMedia=="function"&&window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}function q2(e,c){let a=_2(e),l=c||(typeof document<"u"?document.documentElement:null);if(!l||!l.style)return a;l.setAttribute("data-dc-theme",f0(a.mode));let r=Object.keys(S3);for(let s=0;s<r.length;s++){let i=r[s],f=a[i];typeof f=="string"&&f.length>0&&l.style.setProperty(S3[i],f)}return a}var D2,U2,S3,$2=t(()=>{"use strict";D2={mode:"light",primaryColor:"#2563eb",primaryHover:"#1d4ed8",primaryText:"#ffffff",radius:"12px",fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'},U2={mode:"dark",primaryColor:"#60a5fa",primaryHover:"#93c5fd",primaryText:"#0f172a",radius:"12px",fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'},S3={primaryColor:"--dc-primary-color",primaryHover:"--dc-primary-hover",primaryText:"--dc-primary-text",radius:"--dc-radius",fontFamily:"--dc-font-family"}});var N3=t(()=>{"use strict";$2()});var G2=t(()=>{"use strict"});var n0,O6,b3=t(()=>{"use strict";n0="sms_registration_required",O6={[n0]:"This number is not registered for texting yet. US carriers only deliver business texts from numbers on a registered brand and campaign (10DLC). Register them in Drop Cowboy, then try again."}});var w3=t(()=>{"use strict";G2()});var k3=t(()=>{"use strict"});var y3=t(()=>{"use strict";R2();K1();F2();x3();N3();E2();G2();b3();w3();k3()});function W2(e,c){let a=String(e||U).replace(/\/$/,""),l=a.endsWith("/media")?a+"/public/media":a+"/media/public/media";return c?l+c:l}function m0(e){return!e||typeof e!="object"?e:e.data!==void 0&&e.meta!==void 0?e.data:e}function A3(e,c){let a={Authorization:"Bearer "+e};if(c){let l=Object.keys(c);for(let r=0;r<l.length;r++)a[l[r]]=c[l[r]]}return a}function T3(e){return e.json().catch(function(){return{}}).then(function(c){if(!e.ok){let a=new Error(c&&c.detail||c&&c.message||"Media request failed");throw a.status=e.status,a.payload=c,a}return m0(c)})}function z0(e){let c=e&&e.fetch?e.fetch:typeof fetch=="function"?fetch.bind(globalThis):null;if(!c)throw new Error("fetch is required");return{get:function(a,l){return c(a,{method:"GET",headers:A3(l)}).then(T3)},post:function(a,l,r){return c(a,{method:"POST",headers:A3(r,{"Content-Type":"application/json"}),body:JSON.stringify(l||{})}).then(T3)},putBlob:function(a,l,r){return c(a,{method:"PUT",headers:{"Content-Type":r||l.type||"audio/wav"},body:l}).then(function(s){if(!s.ok){let i=new Error("Signed upload PUT failed");throw i.status=s.status,i}return!0})}}}function p0(e){return e?Array.isArray(e)?e:Array.isArray(e.medias)?e.medias:Array.isArray(e.items)?e.items:Array.isArray(e.data)?e.data:[]:[]}function M0(e){let c=e.created_at?Number(e.created_at):0,a=c?new Date(c).toLocaleDateString():"",l=e.type==="tts"?"tts":"uploaded";return{id:e.media_id||e.id,name:e.name||"Untitled",sources:[l],detail:a,mimic:!1,cloneStatus:"none"}}function Y(e){let c=e&&e.token,a=e&&e.mediaApiBase||U,l=z0(e&&e.http);if(!c)throw new Error("Media client requires init({ token }) from POST /embed/token");return{list:function(){return l.get(W2(a),c).then(function(r){let s=p0(r),i=[];for(let f=0;f<s.length;f++)i.push(M0(s[f]));return i})},uploadWav:function(r,s){return l.post(W2(a),{name:r||"Recording",type:"recording",signed_upload:!0},c).then(function(i){let f=i.media_id||i.id,o=i.upload&&i.upload.wav;if(!f||!o||!o.url)throw new Error("Signed upload policy missing wav URL");return l.putBlob(o.url,s,o.content_type||"audio/wav").then(function(){return l.post(W2(a,"/"+f+"/complete"),{},c)}).then(function(){return f})})}}}var U,I2=t(()=>{"use strict";U="https://app-api-v2.dropcowboy.com"});function d2(e,c,a){for(let l=0;l<a.length;l++)e.setUint8(c+l,a.charCodeAt(l))}function d0(e,c,a){for(let l=0;l<a.length;l++,c+=2){let r=Math.max(-1,Math.min(1,a[l]));e.setInt16(c,r<0?r*32768:r*32767,!0)}}function L0(e,c){let a=new ArrayBuffer(44+e.length*2),l=new DataView(a);return d2(l,0,"RIFF"),l.setUint32(4,36+e.length*2,!0),d2(l,8,"WAVE"),d2(l,12,"fmt "),l.setUint32(16,16,!0),l.setUint16(20,1,!0),l.setUint16(22,1,!0),l.setUint32(24,c,!0),l.setUint32(28,c*2,!0),l.setUint16(32,2,!0),l.setUint16(34,16,!0),d2(l,36,"data"),l.setUint32(40,e.length*2,!0),d0(l,44,e),l}function u0(e,c){return new Blob([L0(e,c)],{type:"audio/wav"})}function O2(e){if(!e)return Promise.reject(new Error("No audio blob"));if(String(e.type||"").indexOf("wav")!==-1)return Promise.resolve(e);let a=typeof window<"u"&&(window.AudioContext||window.webkitAudioContext)||typeof globalThis<"u"&&globalThis.AudioContext;if(!a)return Promise.resolve(e);let l=new a;return e.arrayBuffer().then(function(r){return l.decodeAudioData(r.slice(0))}).then(function(r){let s=r.getChannelData(0),i=u0(s,r.sampleRate);return l.close().then(function(){return i}).catch(function(){return i})})}function B3(e){if(typeof MediaRecorder>"u")throw new Error("MediaRecorder is not available");let c=[],a=new MediaRecorder(e);return a.ondataavailable=function(l){l.data&&l.data.size&&c.push(l.data)},a.start(),{recorder:a,stop:function(){return new Promise(function(l,r){if(a.onerror=function(s){r(s.error||new Error("MediaRecorder failed"))},a.onstop=function(){let s=new Blob(c,{type:a.mimeType||"audio/webm"});O2(s).then(l).catch(r)},a.state==="recording"){a.stop();return}r(new Error("Not recording"))})}}}var P3=t(()=>{"use strict"});var E3={};_3(E3,{DcRecordingStudio:()=>L});function H3(e,c){let a=[];for(let l=0;l<e;l++){let r=5+Math.round(Math.abs(Math.sin(l*.6)+Math.cos(l*.27))*.5*c);a.push(Math.max(4,r))}return a}var F3,L,V2=t(()=>{"use strict";$();B2();O1();y3();I2();P3();F3={recorded:{label:"Recorded",cls:"rec"},"dial-in":{label:"Dial-in",cls:"dial"},uploaded:{label:"Uploaded",cls:"up"},tts:{label:"TTS",cls:"tts"}};L=class extends x{constructor(){super(...arguments);this.recordings=[];this.mode="add";this.captureSource="record";this.playingId="";this.cloneId="";this.token="";this.mediaApiBase=U;this.recordingName="New recording";this.recElapsed="0:00";this.recLive=!1;this.recBusy=!1;this.recError="";this.pendingWav=null;this.cloneConsent=!1;this._media=null;this._stream=null;this._session=null;this._tick=null;this._startedAt=0}connectedCallback(){super.connectedCallback(),this.refreshLibrary()}disconnectedCallback(){this._stopTimer(),this._releaseMic(),super.disconnectedCallback()}async refreshLibrary(){if(this.token)try{this._media=Y({token:this.token,mediaApiBase:this.mediaApiBase,http:this.http}),this.recordings=await this._media.list(),this.recError=""}catch(a){this.recError=a instanceof Error?a.message:"Failed to load recordings"}}_client(){if(!this._media){if(!this.token)throw new Error("Call init({ token }) before using the recording studio");this._media=Y({token:this.token,mediaApiBase:this.mediaApiBase,http:this.http})}return this._media}setSource(a){this.captureSource=a,this.pendingWav=null,this.recError="",a!=="record"&&this._stopLive(!1)}_stopTimer(){this._tick!==null&&(window.clearInterval(this._tick),this._tick=null)}_releaseMic(){if(this._stream){let a=this._stream.getTracks();for(let l=0;l<a.length;l++)a[l].stop();this._stream=null}}_formatElapsed(a){let l=Math.max(0,Math.floor(a/1e3)),r=Math.floor(l/60),s=l%60;return r+":"+String(s).padStart(2,"0")}async _startLive(){this.recError="",this.pendingWav=null;try{this._stream=await navigator.mediaDevices.getUserMedia({audio:!0}),this._session=B3(this._stream),this.recLive=!0,this._startedAt=Date.now(),this.recElapsed="0:00",this._stopTimer(),this._tick=window.setInterval(()=>{this.recElapsed=this._formatElapsed(Date.now()-this._startedAt)},250)}catch(a){this._releaseMic(),this.recError=a instanceof Error?a.message:"Microphone permission denied"}}async _stopLive(a){this._stopTimer();let l=this._session;this._session=null,this.recLive=!1;try{a&&l&&(this.pendingWav=await l.stop())}catch(r){this.recError=r instanceof Error?r.message:"Recording failed"}this._releaseMic()}async _onFile(a){let l=a.target,r=l.files&&l.files[0];if(r){this.recError="";try{this.pendingWav=await O2(r),(!this.recordingName||this.recordingName==="New recording")&&(this.recordingName=r.name.replace(/\.[^.]+$/,""))}catch(s){this.recError=s instanceof Error?s.message:"Could not read audio file"}}}async _save(){if(!this.recBusy){if(this.captureSource==="dial-in"||this.captureSource==="tts"){this.recError="Dial-in and TTS capture run in the portal Recordings hub.";return}if(this.recLive&&await this._stopLive(!0),!this.pendingWav){this.recError="Record or upload audio before saving.";return}this.recBusy=!0,this.recError="";try{let a=await this._client().uploadWav(this.recordingName,this.pendingWav);this.pendingWav=null,await this.refreshLibrary(),this.dispatchEvent(new CustomEvent("dc-created",{detail:{media_id:a,name:this.recordingName},bubbles:!0,composed:!0}))}catch(a){this.recError=a instanceof Error?a.message:"Upload failed"}this.recBusy=!1}}startClone(a){this.mode="clone",this.cloneId=a.id,this.cloneConsent=!1,this.dispatchEvent(new CustomEvent("dc-clone-start",{detail:{id:a.id},bubbles:!0,composed:!0}))}cancelClone(){this.mode="add",this.cloneId="",this.cloneConsent=!1}renderWave(a,l,r){let s=a.charCodeAt(0)%5;return z`${H3(l+s,r).map(i=>z`<i style="height:${i}px"></i>`)}`}renderRow(a){let l=a.id===this.playingId;return z`<div class="card-row ${l?"playing":""}">
      <button class="play" aria-label=${l?"Pause":"Play"}>
        ${l?h("pause"):h("play")}
      </button>
      <div class="wave" aria-hidden="true">${this.renderWave(a.id,46,l?26:18)}</div>
      <div class="meta">
        <div class="nm">
          ${a.name}
          ${a.sources.map(r=>z`<span class="src ${F3[r].cls}">${F3[r].label}</span>`)}
          ${a.mimic?z`<span class="src mimic">Mimic AI</span>`:d}
        </div>
        <div class="sub">${a.detail}</div>
      </div>
      <div class="rowacts">
        ${a.mimic?z`<span class="dc-pill is-online"><span class="dc-pdot"></span>Mimic AI</span>`:z`<button class="clone-btn" @click=${()=>this.startClone(a)}>
              ${h("sparkles")} Clone voice
            </button>`}
        <span class="menu">${h("ellipsis")}</span>
      </div>
    </div>`}renderCapture(){switch(this.captureSource){case"record":return z`
          <div
            class="recbox"
            role="button"
            tabindex="0"
            aria-label=${this.recLive?"Stop recording":"Record now"}
            @click=${()=>this.recLive?this._stopLive(!0):this._startLive()}
            @keydown=${a=>{(a.key==="Enter"||a.key===" ")&&(a.preventDefault(),this.recLive?this._stopLive(!0):this._startLive())}}
          >
            <span class="recdot"></span>
            <div class="level" aria-hidden="true">
              ${H3(30,22).map(a=>z`<i style="height:${a}px"></i>`)}
            </div>
            <span class="rectime">${this.recLive?this.recElapsed:this.pendingWav?"Ready":"0:00"}</span>
          </div>
          <div class="quality">
            <span class="qtag"><span class="ok">✓</span> Mic level good</span>
            <span class="qtag"><span class="ok">✓</span> Low background noise</span>
          </div>
        `;case"dial-in":return z`<div class="dialbox">
          Call your dial-in number, enter your PIN, then record after the beep. We'll grab it automatically.
        </div>`;case"upload":return z`<label class="recbox drop">
          ${h("upload")} Drop an .mp3 / .wav, or click to browse
          <input type="file" accept="audio/mpeg,audio/wav,audio/webm,audio/*" hidden @change=${a=>this._onFile(a)} />
        </label>`;case"tts":return z`<div class="grp" style="margin:0">
          <textarea class="input">Hi {{first_name}}, it's Maria — sorry I missed you. Call me back at {{callback}}.</textarea>
          <div class="vars">
            <span class="var">{{first_name}}</span><span class="var">{{company}}</span>
            <span class="var">{{callback}}</span>
          </div>
        </div>`}}renderAddMode(){let a=[{key:"record",icon:"microphone",label:"Record now"},{key:"dial-in",icon:"phone",label:"Dial-in by phone"},{key:"upload",icon:"upload",label:"Upload .mp3 / .wav"},{key:"tts",icon:"dialpad",label:"Text-to-speech"}];return z`
      <div class="pl">Add a recording</div>
      <div class="panel">
        <div class="grp">
          <label>Recording name</label>
          <input
            class="input"
            .value=${this.recordingName}
            @input=${l=>{this.recordingName=l.target.value}}
          />
        </div>
        <div class="grp">
          <label>How do you want to capture it?</label>
          <div class="sources" role="radiogroup" aria-label="Capture source">
            ${a.map(l=>z`<button
                class="sbtn ${this.captureSource===l.key?"on":""}"
                role="radio"
                aria-checked=${this.captureSource===l.key}
                @click=${()=>this.setSource(l.key)}
              >
                <span class="ic">${h(l.icon)}</span>${l.label}
              </button>`)}
          </div>
        </div>
        ${this.renderCapture()}
        ${this.recError?z`<p class="hint" role="alert">${this.recError}</p>`:d}
      </div>
      <button class="dc-btn wide" ?disabled=${this.recBusy} @click=${()=>this._save()}>
        ${this.recBusy?"Uploading\u2026":"Save recording"}
      </button>
      <div class="tips">
        <b>Optional:</b> turn any recording into a reusable <b>Mimic AI® cloned voice</b> with the
        <b>✨ Clone voice</b> action on a row — the recording becomes the voice sample.
      </div>
    `}renderCloneMode(){let l=this.recordings.find(r=>r.id===this.cloneId)?.name??"Recording";return z`
      <div class="pl">
        <button class="back" @click=${this.cancelClone}>${h("arrow-left")} Back</button>
        · Clone a voice
      </div>
      <div class="panel">
        <h3>${h("sparkles")} Clone from recording <span class="dc-pill is-info">Mimic AI®</span></h3>
        <div class="hint">
          We'll use this recording as the voice sample. Best results: 30–60s of natural speech.
        </div>
        <div class="samplechip">
          <button class="play" aria-label="Play sample">${h("play")}</button>
          <div class="wave" aria-hidden="true">${this.renderWave(this.cloneId||"x",36,18)}</div>
          <div class="meta" style="min-width:auto">
            <div class="nm" style="font-size:13px">${l}</div>
          </div>
        </div>
        <div class="quality" style="margin:0 0 12px">
          <span class="qtag"><span class="ok">${h("check")}</span> Length 0:30–0:60</span>
          <span class="qtag"><span class="ok">${h("check")}</span> Low background noise</span>
          <span class="qtag"><span class="ok">${h("check")}</span> Single speaker</span>
        </div>
        <div class="grp">
          <label>Cloned voice name</label>
          <input class="input" value="${l} — voice" readonly />
        </div>
        <label class="consent">
          <input
            type="checkbox"
            .checked=${this.cloneConsent}
            @change=${r=>this.cloneConsent=r.target.checked}
          />
          <span>I confirm I own or am authorized to clone this voice, and consent to Mimic AI® processing.</span>
        </label>
        <button class="dc-btn wide" ?disabled=${!this.cloneConsent}>Create cloned voice</button>
      </div>
      <div class="panel">
        <h3>${h("sparkles")} Generate from text</h3>
        <div class="hint">Once cloned, preview new lines in this voice with merge variables.</div>
        <div class="grp" style="margin:0">
          <textarea class="input" readonly>
Hi {{first_name}}, it's Maria — give me a call back at {{callback}} and I'll take care of you.</textarea
          >
          <div class="vars">
            <span class="var">{{first_name}}</span><span class="var">{{company}}</span>
            <span class="var">{{callback}}</span>
          </div>
        </div>
        <button class="dc-btn dc-secondary wide gen">${h("play")} Generate preview</button>
      </div>
    `}render(){let a=this.recordings.filter(l=>l.mimic).length;return z`
      <div class="app" role="region" aria-label="Recording Studio">
        <div class="topbar">
          <h1>Recording Studio</h1>
          <span class="dc-pill is-info"><span class="dc-pdot"></span>Mimic AI®</span>
          <span class="sp"></span>
          <input class="search" placeholder="Search recordings…" />
          <div class="seg">
            <button type="button" class="on">All</button>
            <button type="button">${h("folder")} Recordings</button>
            <button type="button">${h("microphone")} Cloned voices</button>
          </div>
        </div>
        <div class="main">
          <div class="lib">
            ${this.recordings.length?z`
                  <div class="sech">
                    <h2>Your recordings</h2>
                    <span class="sp"></span>
                    <span class="dc-light dc-sm">
                      ${this.recordings.length} recordings · ${a} have a cloned voice
                    </span>
                  </div>
                  ${W1(this.recordings,l=>l.id,l=>this.renderRow(l))}
                `:z`<div class="empty">
                  <div class="big">${h("microphone")}</div>
                  <p><b>No recordings yet</b></p>
                  <p>Record, dial in, upload or generate your first message with the panel on the right.</p>
                </div>`}
          </div>
          <aside class="studio">
            ${this.mode==="clone"?this.renderCloneMode():this.renderAddMode()}
          </aside>
        </div>
      </div>
    `}};L.styles=[x.styles,B`
      :host {
        display: block;
        width: 100%;
        min-width: 1080px;
        height: 100%;
        min-height: 640px;
      }
      .app {
        display: flex;
        flex-direction: column;
        height: 100%;
        min-height: 640px;
        background: var(--dc-bg-color);
        overflow: hidden;
      }
      .topbar {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 14px 22px;
        border-bottom: 1px solid var(--dc-border-color);
        flex-shrink: 0;
      }
      .topbar h1 {
        font-size: 17px;
        margin: 0;
        white-space: nowrap;
      }
      .sp {
        flex: 1;
      }
      .search {
        border: 1px solid var(--dc-border-color);
        border-radius: var(--dc-radius-sm);
        padding: 8px 12px;
        font: inherit;
        width: 190px;
        flex: none;
        background: var(--dc-surface-color);
        color: var(--dc-text-color);
      }
      .seg {
        display: inline-flex;
        border: 1px solid var(--dc-border-color);
        border-radius: var(--dc-radius-sm);
        overflow: hidden;
        flex: none;
      }
      .seg button {
        appearance: none;
        border: 0;
        background: var(--dc-bg-color);
        padding: 8px 14px;
        font: inherit;
        font-size: var(--dc-font-size-sm);
        cursor: pointer;
        color: var(--dc-text-muted);
        display: inline-flex;
        gap: 6px;
        align-items: center;
      }
      .seg button.on {
        background: var(--dc-primary-soft);
        color: var(--dc-primary-color);
        font-weight: 600;
      }
      .main {
        flex: 1;
        display: grid;
        grid-template-columns: minmax(640px, 1fr) 380px;
        overflow: hidden;
        min-height: 0;
      }
      .lib {
        overflow: auto;
        padding: 20px 24px;
      }
      .sech {
        display: flex;
        align-items: center;
        gap: 8px;
        margin: 4px 0 12px;
      }
      .sech h2 {
        font-size: 14px;
        margin: 0;
        white-space: nowrap;
      }
      .card-row {
        display: flex;
        align-items: center;
        gap: 14px;
        padding: 12px 14px;
        border: 1px solid var(--dc-border-color);
        border-radius: var(--dc-radius-sm);
        margin-bottom: 10px;
        background: var(--dc-bg-color);
      }
      .card-row:hover {
        background: var(--dc-surface-color);
      }
      .play {
        width: 38px;
        height: 38px;
        border-radius: 50%;
        background: var(--dc-primary-soft);
        color: var(--dc-primary-color);
        display: grid;
        place-items: center;
        flex-shrink: 0;
        font-size: 13px;
        cursor: pointer;
        border: 0;
      }
      .wave {
        flex: 1;
        display: flex;
        align-items: center;
        gap: 2px;
        height: 30px;
        min-width: 0;
      }
      .wave i {
        display: block;
        width: 3px;
        flex: none;
        border-radius: 2px;
        background: var(--dc-border-color);
      }
      .card-row.playing .wave i {
        background: var(--dc-primary-color);
      }
      .meta {
        min-width: 170px;
      }
      .meta .nm {
        font-weight: 600;
        display: flex;
        align-items: center;
        gap: 6px;
      }
      .meta .sub {
        font-size: var(--dc-font-size-xs);
        color: var(--dc-text-light);
      }
      .src {
        font-size: 9px;
        font-weight: 700;
        letter-spacing: 0.03em;
        padding: 2px 7px;
        border-radius: 999px;
        text-transform: uppercase;
      }
      .src.mimic {
        background: var(--dc-primary-soft);
        color: var(--dc-primary-color);
      }
      .src.rec {
        background: var(--dc-online-soft);
        color: var(--dc-online-text);
      }
      .src.up {
        background: var(--dc-surface-2);
        color: var(--dc-text-muted);
      }
      .src.tts {
        background: var(--dc-info-soft);
        color: var(--dc-info-text);
      }
      .src.dial {
        background: #fef3c7;
        color: #92400e;
      }
      .rowacts {
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .clone-btn {
        font-size: var(--dc-font-size-xs);
        font-weight: 700;
        padding: 6px 10px;
        border-radius: 999px;
        background: var(--dc-primary-soft);
        color: var(--dc-primary-color);
        cursor: pointer;
        border: 0;
        white-space: nowrap;
        font-family: inherit;
      }
      .clone-btn:hover {
        background: var(--dc-primary-color);
        color: #fff;
      }
      .menu {
        width: 30px;
        height: 30px;
        border-radius: var(--dc-radius-sm);
        display: grid;
        place-items: center;
        color: var(--dc-text-light);
        cursor: pointer;
      }
      .menu:hover {
        background: var(--dc-surface-2);
      }
      .empty {
        padding: 56px 24px;
        text-align: center;
        color: var(--dc-text-muted);
        font-size: var(--dc-font-size-sm);
      }
      .empty .big {
        font-size: 30px;
        margin-bottom: 8px;
      }
      /* studio panel */
      .studio {
        border-left: 1px solid var(--dc-border-color);
        background: var(--dc-surface-color);
        overflow: auto;
        padding: 20px;
      }
      .pl {
        font-size: var(--dc-font-size-xs);
        text-transform: uppercase;
        letter-spacing: 0.04em;
        color: var(--dc-text-light);
        margin-bottom: 12px;
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .pl .back {
        cursor: pointer;
        color: var(--dc-primary-color);
        font-weight: 700;
        background: none;
        border: 0;
        font: inherit;
        font-size: inherit;
        padding: 0;
      }
      .panel {
        background: var(--dc-bg-color);
        border: 1px solid var(--dc-border-color);
        border-radius: var(--dc-radius-sm);
        padding: 16px;
        margin-bottom: 14px;
      }
      .panel h3 {
        font-size: 14px;
        margin: 0;
        display: flex;
        align-items: center;
        gap: 7px;
      }
      .hint {
        font-size: var(--dc-font-size-xs);
        color: var(--dc-text-muted);
        margin: 4px 0 12px;
      }
      .sources {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 8px;
        margin-bottom: 12px;
      }
      .sbtn {
        appearance: none;
        border: 1px solid var(--dc-border-color);
        border-radius: var(--dc-radius-sm);
        background: var(--dc-bg-color);
        padding: 12px 8px;
        text-align: center;
        cursor: pointer;
        font: inherit;
        font-size: var(--dc-font-size-sm);
        color: var(--dc-text-muted);
      }
      .sbtn .ic {
        font-size: 18px;
        display: block;
        margin-bottom: 4px;
      }
      .sbtn.on {
        border-color: var(--dc-primary-color);
        background: var(--dc-primary-soft);
        color: var(--dc-primary-color);
        font-weight: 600;
      }
      .grp {
        margin-bottom: 12px;
      }
      .grp label {
        display: block;
        font-size: var(--dc-font-size-sm);
        font-weight: 600;
        margin-bottom: 5px;
      }
      .input {
        width: 100%;
        border: 1px solid var(--dc-border-color);
        border-radius: var(--dc-radius-sm);
        padding: 9px 11px;
        font: inherit;
        font-size: var(--dc-font-size-sm);
        background: var(--dc-bg-color);
        color: var(--dc-text-color);
        box-sizing: border-box;
      }
      textarea.input {
        min-height: 72px;
        resize: vertical;
      }
      .vars {
        display: flex;
        gap: 5px;
        margin-top: 7px;
        flex-wrap: wrap;
      }
      .var {
        font-size: var(--dc-font-size-xs);
        font-weight: 600;
        padding: 3px 8px;
        border-radius: 999px;
        background: var(--dc-primary-soft);
        color: var(--dc-primary-color);
        cursor: pointer;
      }
      .recbox {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px 14px;
        border: 1px dashed var(--dc-primary-color);
        border-radius: var(--dc-radius-sm);
        background: var(--dc-primary-soft);
        cursor: pointer;
      }
      .recbox.drop {
        border-style: solid;
        justify-content: center;
        color: var(--dc-text-muted);
        background: var(--dc-bg-color);
        cursor: pointer;
      }
      .recdot {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background: var(--dc-danger);
        flex-shrink: 0;
        box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.5);
        animation: pulse 1.4s infinite;
      }
      @keyframes pulse {
        70% {
          box-shadow: 0 0 0 8px rgba(239, 68, 68, 0);
        }
        100% {
          box-shadow: 0 0 0 0 rgba(239, 68, 68, 0);
        }
      }
      @media (prefers-reduced-motion: reduce) {
        .recdot {
          animation: none;
        }
      }
      .level {
        flex: 1;
        display: flex;
        align-items: center;
        gap: 2px;
        height: 26px;
        overflow: hidden;
      }
      .level i {
        display: block;
        width: 3px;
        border-radius: 2px;
        background: var(--dc-primary-color);
        flex-shrink: 0;
      }
      .rectime {
        font-variant-numeric: tabular-nums;
        font-weight: 700;
        font-size: 13px;
        color: var(--dc-primary-color);
      }
      .dialbox {
        font-size: var(--dc-font-size-sm);
      }
      .dialbox .big {
        font-weight: 700;
        font-size: 15px;
      }
      .quality {
        display: flex;
        gap: 8px;
        margin-top: 10px;
        flex-wrap: wrap;
      }
      .qtag {
        font-size: var(--dc-font-size-xs);
        color: var(--dc-text-muted);
        display: flex;
        align-items: center;
        gap: 5px;
      }
      .qtag .ok {
        color: var(--dc-online);
      }
      .samplechip {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 10px 12px;
        border: 1px solid var(--dc-border-color);
        border-radius: var(--dc-radius-sm);
        background: var(--dc-surface-color);
        margin-bottom: 12px;
      }
      .samplechip .play {
        width: 30px;
        height: 30px;
        font-size: 11px;
      }
      .samplechip .wave {
        height: 24px;
      }
      .consent {
        display: flex;
        gap: 9px;
        align-items: flex-start;
        font-size: var(--dc-font-size-sm);
        padding: 10px 12px;
        background: var(--dc-surface-color);
        border-radius: var(--dc-radius-sm);
        margin-bottom: 12px;
      }
      .consent input {
        margin-top: 3px;
      }
      .tips {
        background: var(--dc-info-soft);
        border-radius: var(--dc-radius-sm);
        padding: 11px 13px;
        font-size: var(--dc-font-size-xs);
        color: #0369a1;
        margin-top: 14px;
      }
      .tips b {
        color: #075985;
      }
      .wide {
        width: 100%;
      }
      .gen {
        margin-top: 10px;
      }
    `],u([g({attribute:!1})],L.prototype,"recordings",2),u([g({type:String})],L.prototype,"mode",2),u([g({type:String,attribute:"capture-source"})],L.prototype,"captureSource",2),u([g({type:String,attribute:"playing-id"})],L.prototype,"playingId",2),u([g({type:String,attribute:"clone-id"})],L.prototype,"cloneId",2),u([g({attribute:!1})],L.prototype,"token",2),u([g({type:String,attribute:"media-api-base"})],L.prototype,"mediaApiBase",2),u([g({attribute:!1})],L.prototype,"http",2),u([A()],L.prototype,"recordingName",2),u([A()],L.prototype,"recElapsed",2),u([A()],L.prototype,"recLive",2),u([A()],L.prototype,"recBusy",2),u([A()],L.prototype,"recError",2),u([A()],L.prototype,"pendingWav",2),u([A()],L.prototype,"cloneConsent",2),L=u([m2("dc-recording-studio")],L)});var v2="__dcBundle",e1=/^DropCowboy./,N=typeof window<"u"?window:globalThis,c2=q3();function q3(){let e={},c={},a=N.DropCowboy;if(a&&typeof a=="object"){let r=Object.keys(a);for(let s=0;s<r.length;s++)e[r[s]]=a[r[s]]}let l=Object.keys(N);for(let r=0;r<l.length;r++)e1.test(l[r])&&(c[l[r]]=N[l[r]]);return{namespaces:e,globals:c}}function h2(e,c){return Object.prototype.hasOwnProperty.call(e,c)}function a1(e,c,a,l){let r=Object.keys(e);for(let s=0;s<r.length;s++){let i=r[s];!l(i)||h2(a,i)||(h2(c,i)?e[i]!==c[i]&&(e[i]=c[i]):delete e[i])}}function l1(e,c,a){return e&&e[v2]===a?e:(h2(c,v2)||Object.defineProperty(c,v2,{value:a}),c)}function $3(){return!0}function r1(e){let c=e.namespaces||{},a=e.globals||{};(!N.DropCowboy||typeof N.DropCowboy!="object")&&(N.DropCowboy={});let l=N.DropCowboy;a1(l,c2.namespaces,c,$3),a1(N,c2.globals,a,function(f){return e1.test(f)});let r={},s=Object.keys(c);for(let f=0;f<s.length;f++){let o=s[f];l[o]=l1(c2.namespaces[o],c[o],e.bundle),r[o]=l[o]}let i=Object.keys(a);for(let f=0;f<i.length;f++){let o=i[f];N[o]=l1(c2.globals[o],a[o],e.bundle)}return r}V2();I2();$2();var R3={},Z=null;function D3(e){return new j2(e||R3)}function L2(){return Z||(Z=D3(R3)),Z}async function K2(e){return L2().init(e)}function X2(e){L2().setTheme(e)}function Q2(e){return L2().addErrorListener(e)}async function J2(e){return L2().open(e)}async function Y2(){let e=Z;Z=null,e&&await e.close()}function v0(e){typeof window>"u"||(window.DropCowboy=window.DropCowboy||{},window.DropCowboy.studio=e)}var j2=class{constructor(c){this.http=c&&c.http,this.token=null,this.mediaApiBase=U,this.theme={},this.container=null,this.host=null,this.client=null,this.errorListeners=[]}async init(c){if(!c||!c.token)throw new Error("init({ token }) requires a site token from POST /embed/token");this.token=c.token,this.mediaApiBase=c.mediaApiBase||U,this.container=c.container||null,this.client=Y({token:this.token,mediaApiBase:this.mediaApiBase,http:this.http})}setTheme(c){this.theme=Object.assign({},this.theme,c||{}),this.theme.primary&&!this.theme.primaryColor&&(this.theme.primaryColor=this.theme.primary),q2(this.theme),this._paintTheme(this.host)}getTheme(){return this.theme}addErrorListener(c){return this.errorListeners.push(c),()=>{this.errorListeners=this.errorListeners.filter(function(a){return a!==c})}}async open(c){if(!this.client)throw new Error("Call init({ token }) before open()");(typeof customElements>"u"||!customElements.get("dc-recording-studio"))&&await Promise.resolve().then(()=>(V2(),E3));let a=this._resolveContainer(c&&c.container);this.host&&this.host.parentNode&&this.host.parentNode.removeChild(this.host);let l=document.createElement("dc-recording-studio");return l.token=this.token,l.mediaApiBase=this.mediaApiBase,this.http&&(l.http=this.http),this._paintTheme(l),a.appendChild(l),this.host=l,typeof l.refreshLibrary=="function"&&await l.refreshLibrary(),l}async close(){this.host&&this.host.parentNode&&this.host.parentNode.removeChild(this.host),this.host=null,this.token=null,this.client=null,this.errorListeners=[]}_resolveContainer(c){let a=c||this.container;if(!a)return document.body;if(typeof a=="string"){let l=document.querySelector(a);if(!l)throw new Error("open() container not found");return l}return a}_paintTheme(c){if(!c||!c.style)return;let a=this.theme.primaryColor||this.theme.primary;a&&c.style.setProperty("--dc-primary-color",a),this.theme.primaryText&&c.style.setProperty("--dc-primary-text",this.theme.primaryText),this.theme.radius&&c.style.setProperty("--dc-radius",this.theme.radius),this.theme.fontFamily&&c.style.setProperty("--dc-font-family",this.theme.fontFamily)}};v0({init:K2,setTheme:X2,addErrorListener:Q2,open:J2,close:Y2,createEmbedRecordingStudio:D3});var h0={init:K2,setTheme:X2,addErrorListener:Q2,open:J2,close:Y2};r1({bundle:"recording-studio",namespaces:{studio:h0}});})();
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

/*! Drop Cowboy Building Blocks dock (@dropcowboy/embed-dock 0.0.0). Do not edit. */
"use strict";(()=>{var fi=Object.create;var t0=Object.defineProperty;var Na=Object.getOwnPropertyDescriptor;var ui=Object.getOwnPropertyNames;var di=Object.getPrototypeOf,pi=Object.prototype.hasOwnProperty;var F=(r,s)=>()=>(r&&(s=r(r=0)),s);var Z=(r,s)=>()=>(s||r((s={exports:{}}).exports,s),s.exports),I6=(r,s)=>{for(var e in s)t0(r,e,{get:s[e],enumerable:!0})},hi=(r,s,e,l)=>{if(s&&typeof s=="object"||typeof s=="function")for(let n of ui(s))!pi.call(r,n)&&n!==e&&t0(r,n,{get:()=>s[n],enumerable:!(l=Na(s,n))||l.enumerable});return r};var mi=(r,s,e)=>(e=r!=null?fi(di(r)):{},hi(s||!r||!r.__esModule?t0(e,"default",{value:r,enumerable:!0}):e,r));var C=(r,s,e,l)=>{for(var n=l>1?void 0:l?Na(s,e):s,a=r.length-1,o;a>=0;a--)(o=r[a])&&(n=(l?o(s,e,n):o(n))||n);return l&&n&&t0(s,e,n),n};var i0,n0,$6,Da,t3,$a,r2,Ua,U6,F6=F(()=>{"use strict";i0=globalThis,n0=i0.ShadowRoot&&(i0.ShadyCSS===void 0||i0.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,$6=Symbol(),Da=new WeakMap,t3=class{constructor(s,e,l){if(this._$cssResult$=!0,l!==$6)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=s,this.t=e}get styleSheet(){let s=this.o,e=this.t;if(n0&&s===void 0){let l=e!==void 0&&e.length===1;l&&(s=Da.get(e)),s===void 0&&((this.o=s=new CSSStyleSheet).replaceSync(this.cssText),l&&Da.set(e,s))}return s}toString(){return this.cssText}},$a=r=>new t3(typeof r=="string"?r:r+"",void 0,$6),r2=(r,...s)=>{let e=r.length===1?r[0]:s.reduce((l,n,a)=>l+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(n)+r[a+1],r[0]);return new t3(e,r,$6)},Ua=(r,s)=>{if(n0)r.adoptedStyleSheets=s.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of s){let l=document.createElement("style"),n=i0.litNonce;n!==void 0&&l.setAttribute("nonce",n),l.textContent=e.cssText,r.appendChild(l)}},U6=n0?r=>r:r=>r instanceof CSSStyleSheet?(s=>{let e="";for(let l of s.cssRules)e+=l.cssText;return $a(e)})(r):r});var zi,Mi,_i,Ci,Li,xi,o0,Fa,bi,Si,r3,i3,f0,Ha,D1,n3=F(()=>{"use strict";F6();F6();({is:zi,defineProperty:Mi,getOwnPropertyDescriptor:_i,getOwnPropertyNames:Ci,getOwnPropertySymbols:Li,getPrototypeOf:xi}=Object),o0=globalThis,Fa=o0.trustedTypes,bi=Fa?Fa.emptyScript:"",Si=o0.reactiveElementPolyfillSupport,r3=(r,s)=>r,i3={toAttribute(r,s){switch(s){case Boolean:r=r?bi:null;break;case Object:case Array:r=r==null?r:JSON.stringify(r)}return r},fromAttribute(r,s){let e=r;switch(s){case Boolean:e=r!==null;break;case Number:e=r===null?null:Number(r);break;case Object:case Array:try{e=JSON.parse(r)}catch{e=null}}return e}},f0=(r,s)=>!zi(r,s),Ha={attribute:!0,type:String,converter:i3,reflect:!1,useDefault:!1,hasChanged:f0};Symbol.metadata??=Symbol("metadata"),o0.litPropertyMetadata??=new WeakMap;D1=class extends HTMLElement{static addInitializer(s){this._$Ei(),(this.l??=[]).push(s)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(s,e=Ha){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(s)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(s,e),!e.noAccessor){let l=Symbol(),n=this.getPropertyDescriptor(s,l,e);n!==void 0&&Mi(this.prototype,s,n)}}static getPropertyDescriptor(s,e,l){let{get:n,set:a}=_i(this.prototype,s)??{get(){return this[e]},set(o){this[e]=o}};return{get:n,set(o){let h=n?.call(this);a?.call(this,o),this.requestUpdate(s,h,l)},configurable:!0,enumerable:!0}}static getPropertyOptions(s){return this.elementProperties.get(s)??Ha}static _$Ei(){if(this.hasOwnProperty(r3("elementProperties")))return;let s=xi(this);s.finalize(),s.l!==void 0&&(this.l=[...s.l]),this.elementProperties=new Map(s.elementProperties)}static finalize(){if(this.hasOwnProperty(r3("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(r3("properties"))){let e=this.properties,l=[...Ci(e),...Li(e)];for(let n of l)this.createProperty(n,e[n])}let s=this[Symbol.metadata];if(s!==null){let e=litPropertyMetadata.get(s);if(e!==void 0)for(let[l,n]of e)this.elementProperties.set(l,n)}this._$Eh=new Map;for(let[e,l]of this.elementProperties){let n=this._$Eu(e,l);n!==void 0&&this._$Eh.set(n,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(s){let e=[];if(Array.isArray(s)){let l=new Set(s.flat(1/0).reverse());for(let n of l)e.unshift(U6(n))}else s!==void 0&&e.push(U6(s));return e}static _$Eu(s,e){let l=e.attribute;return l===!1?void 0:typeof l=="string"?l:typeof s=="string"?s.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(s=>this.enableUpdating=s),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(s=>s(this))}addController(s){(this._$EO??=new Set).add(s),this.renderRoot!==void 0&&this.isConnected&&s.hostConnected?.()}removeController(s){this._$EO?.delete(s)}_$E_(){let s=new Map,e=this.constructor.elementProperties;for(let l of e.keys())this.hasOwnProperty(l)&&(s.set(l,this[l]),delete this[l]);s.size>0&&(this._$Ep=s)}createRenderRoot(){let s=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Ua(s,this.constructor.elementStyles),s}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(s=>s.hostConnected?.())}enableUpdating(s){}disconnectedCallback(){this._$EO?.forEach(s=>s.hostDisconnected?.())}attributeChangedCallback(s,e,l){this._$AK(s,l)}_$ET(s,e){let l=this.constructor.elementProperties.get(s),n=this.constructor._$Eu(s,l);if(n!==void 0&&l.reflect===!0){let a=(l.converter?.toAttribute!==void 0?l.converter:i3).toAttribute(e,l.type);this._$Em=s,a==null?this.removeAttribute(n):this.setAttribute(n,a),this._$Em=null}}_$AK(s,e){let l=this.constructor,n=l._$Eh.get(s);if(n!==void 0&&this._$Em!==n){let a=l.getPropertyOptions(n),o=typeof a.converter=="function"?{fromAttribute:a.converter}:a.converter?.fromAttribute!==void 0?a.converter:i3;this._$Em=n;let h=o.fromAttribute(e,a.type);this[n]=h??this._$Ej?.get(n)??h,this._$Em=null}}requestUpdate(s,e,l,n=!1,a){if(s!==void 0){let o=this.constructor;if(n===!1&&(a=this[s]),l??=o.getPropertyOptions(s),!((l.hasChanged??f0)(a,e)||l.useDefault&&l.reflect&&a===this._$Ej?.get(s)&&!this.hasAttribute(o._$Eu(s,l))))return;this.C(s,e,l)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(s,e,{useDefault:l,reflect:n,wrapped:a},o){l&&!(this._$Ej??=new Map).has(s)&&(this._$Ej.set(s,o??e??this[s]),a!==!0||o!==void 0)||(this._$AL.has(s)||(this.hasUpdated||l||(e=void 0),this._$AL.set(s,e)),n===!0&&this._$Em!==s&&(this._$Eq??=new Set).add(s))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let s=this.scheduleUpdate();return s!=null&&await s,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[n,a]of this._$Ep)this[n]=a;this._$Ep=void 0}let l=this.constructor.elementProperties;if(l.size>0)for(let[n,a]of l){let{wrapped:o}=a,h=this[n];o!==!0||this._$AL.has(n)||h===void 0||this.C(n,void 0,a,h)}}let s=!1,e=this._$AL;try{s=this.shouldUpdate(e),s?(this.willUpdate(e),this._$EO?.forEach(l=>l.hostUpdate?.()),this.update(e)):this._$EM()}catch(l){throw s=!1,this._$EM(),l}s&&this._$AE(e)}willUpdate(s){}_$AE(s){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(s)),this.updated(s)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(s){return!0}update(s){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(s){}firstUpdated(s){}};D1.elementStyles=[],D1.shadowRootOptions={mode:"open"},D1[r3("elementProperties")]=new Map,D1[r3("finalized")]=new Map,Si?.({ReactiveElement:D1}),(o0.reactiveElementVersions??=[]).push("2.1.2")});function Xa(r,s){if(!G6(r)||!r.hasOwnProperty("raw"))throw Error("invalid template strings array");return Ba!==void 0?Ba.createHTML(s):s}function o4(r,s,e=r,l){if(s===U1)return s;let n=l!==void 0?e._$Co?.[l]:e._$Cl,a=u3(s)?void 0:s._$litDirective$;return n?.constructor!==a&&(n?._$AO?.(!1),a===void 0?n=void 0:(n=new a(r),n._$AT(r,e,l)),l!==void 0?(e._$Co??=[])[l]=n:e._$Cl=n),n!==void 0&&(s=o4(r,n._$AS(r,s.values),n,l)),s}var O6,Oa,u0,Ba,B6,$1,q6,wi,n4,f3,u3,G6,Ka,H6,o3,qa,Ga,r4,Wa,Va,Ya,W6,z,Y2,jf,U1,D,ja,i4,Ja,d3,d0,N4,f4,p0,h0,m0,g0,Qa,yi,Za,A4=F(()=>{"use strict";O6=globalThis,Oa=r=>r,u0=O6.trustedTypes,Ba=u0?u0.createPolicy("lit-html",{createHTML:r=>r}):void 0,B6="$lit$",$1=`lit$${Math.random().toFixed(9).slice(2)}$`,q6="?"+$1,wi=`<${q6}>`,n4=document,f3=()=>n4.createComment(""),u3=r=>r===null||typeof r!="object"&&typeof r!="function",G6=Array.isArray,Ka=r=>G6(r)||typeof r?.[Symbol.iterator]=="function",H6=`[ 	
\f\r]`,o3=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,qa=/-->/g,Ga=/>/g,r4=RegExp(`>|${H6}(?:([^\\s"'>=/]+)(${H6}*=${H6}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Wa=/'/g,Va=/"/g,Ya=/^(?:script|style|textarea|title)$/i,W6=r=>(s,...e)=>({_$litType$:r,strings:s,values:e}),z=W6(1),Y2=W6(2),jf=W6(3),U1=Symbol.for("lit-noChange"),D=Symbol.for("lit-nothing"),ja=new WeakMap,i4=n4.createTreeWalker(n4,129);Ja=(r,s)=>{let e=r.length-1,l=[],n,a=s===2?"<svg>":s===3?"<math>":"",o=o3;for(let h=0;h<e;h++){let m=r[h],v,_,u=-1,k=0;for(;k<m.length&&(o.lastIndex=k,_=o.exec(m),_!==null);)k=o.lastIndex,o===o3?_[1]==="!--"?o=qa:_[1]!==void 0?o=Ga:_[2]!==void 0?(Ya.test(_[2])&&(n=RegExp("</"+_[2],"g")),o=r4):_[3]!==void 0&&(o=r4):o===r4?_[0]===">"?(o=n??o3,u=-1):_[1]===void 0?u=-2:(u=o.lastIndex-_[2].length,v=_[1],o=_[3]===void 0?r4:_[3]==='"'?Va:Wa):o===Va||o===Wa?o=r4:o===qa||o===Ga?o=o3:(o=r4,n=void 0);let b=o===r4&&r[h+1].startsWith("/>")?" ":"";a+=o===o3?m+wi:u>=0?(l.push(v),m.slice(0,u)+B6+m.slice(u)+$1+b):m+$1+(u===-2?h:b)}return[Xa(r,a+(r[e]||"<?>")+(s===2?"</svg>":s===3?"</math>":"")),l]},d3=class r{constructor({strings:s,_$litType$:e},l){let n;this.parts=[];let a=0,o=0,h=s.length-1,m=this.parts,[v,_]=Ja(s,e);if(this.el=r.createElement(v,l),i4.currentNode=this.el.content,e===2||e===3){let u=this.el.content.firstChild;u.replaceWith(...u.childNodes)}for(;(n=i4.nextNode())!==null&&m.length<h;){if(n.nodeType===1){if(n.hasAttributes())for(let u of n.getAttributeNames())if(u.endsWith(B6)){let k=_[o++],b=n.getAttribute(u).split($1),S=/([.?@])?(.*)/.exec(k);m.push({type:1,index:a,name:S[2],strings:b,ctor:S[1]==="."?p0:S[1]==="?"?h0:S[1]==="@"?m0:f4}),n.removeAttribute(u)}else u.startsWith($1)&&(m.push({type:6,index:a}),n.removeAttribute(u));if(Ya.test(n.tagName)){let u=n.textContent.split($1),k=u.length-1;if(k>0){n.textContent=u0?u0.emptyScript:"";for(let b=0;b<k;b++)n.append(u[b],f3()),i4.nextNode(),m.push({type:2,index:++a});n.append(u[k],f3())}}}else if(n.nodeType===8)if(n.data===q6)m.push({type:2,index:a});else{let u=-1;for(;(u=n.data.indexOf($1,u+1))!==-1;)m.push({type:7,index:a}),u+=$1.length-1}a++}}static createElement(s,e){let l=n4.createElement("template");return l.innerHTML=s,l}};d0=class{constructor(s,e){this._$AV=[],this._$AN=void 0,this._$AD=s,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(s){let{el:{content:e},parts:l}=this._$AD,n=(s?.creationScope??n4).importNode(e,!0);i4.currentNode=n;let a=i4.nextNode(),o=0,h=0,m=l[0];for(;m!==void 0;){if(o===m.index){let v;m.type===2?v=new N4(a,a.nextSibling,this,s):m.type===1?v=new m.ctor(a,m.name,m.strings,this,s):m.type===6&&(v=new g0(a,this,s)),this._$AV.push(v),m=l[++h]}o!==m?.index&&(a=i4.nextNode(),o++)}return i4.currentNode=n4,n}p(s){let e=0;for(let l of this._$AV)l!==void 0&&(l.strings!==void 0?(l._$AI(s,l,e),e+=l.strings.length-2):l._$AI(s[e])),e++}},N4=class r{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(s,e,l,n){this.type=2,this._$AH=D,this._$AN=void 0,this._$AA=s,this._$AB=e,this._$AM=l,this.options=n,this._$Cv=n?.isConnected??!0}get parentNode(){let s=this._$AA.parentNode,e=this._$AM;return e!==void 0&&s?.nodeType===11&&(s=e.parentNode),s}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(s,e=this){s=o4(this,s,e),u3(s)?s===D||s==null||s===""?(this._$AH!==D&&this._$AR(),this._$AH=D):s!==this._$AH&&s!==U1&&this._(s):s._$litType$!==void 0?this.$(s):s.nodeType!==void 0?this.T(s):Ka(s)?this.k(s):this._(s)}O(s){return this._$AA.parentNode.insertBefore(s,this._$AB)}T(s){this._$AH!==s&&(this._$AR(),this._$AH=this.O(s))}_(s){this._$AH!==D&&u3(this._$AH)?this._$AA.nextSibling.data=s:this.T(n4.createTextNode(s)),this._$AH=s}$(s){let{values:e,_$litType$:l}=s,n=typeof l=="number"?this._$AC(s):(l.el===void 0&&(l.el=d3.createElement(Xa(l.h,l.h[0]),this.options)),l);if(this._$AH?._$AD===n)this._$AH.p(e);else{let a=new d0(n,this),o=a.u(this.options);a.p(e),this.T(o),this._$AH=a}}_$AC(s){let e=ja.get(s.strings);return e===void 0&&ja.set(s.strings,e=new d3(s)),e}k(s){G6(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,l,n=0;for(let a of s)n===e.length?e.push(l=new r(this.O(f3()),this.O(f3()),this,this.options)):l=e[n],l._$AI(a),n++;n<e.length&&(this._$AR(l&&l._$AB.nextSibling,n),e.length=n)}_$AR(s=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);s!==this._$AB;){let l=Oa(s).nextSibling;Oa(s).remove(),s=l}}setConnected(s){this._$AM===void 0&&(this._$Cv=s,this._$AP?.(s))}},f4=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(s,e,l,n,a){this.type=1,this._$AH=D,this._$AN=void 0,this.element=s,this.name=e,this._$AM=n,this.options=a,l.length>2||l[0]!==""||l[1]!==""?(this._$AH=Array(l.length-1).fill(new String),this.strings=l):this._$AH=D}_$AI(s,e=this,l,n){let a=this.strings,o=!1;if(a===void 0)s=o4(this,s,e,0),o=!u3(s)||s!==this._$AH&&s!==U1,o&&(this._$AH=s);else{let h=s,m,v;for(s=a[0],m=0;m<a.length-1;m++)v=o4(this,h[l+m],e,m),v===U1&&(v=this._$AH[m]),o||=!u3(v)||v!==this._$AH[m],v===D?s=D:s!==D&&(s+=(v??"")+a[m+1]),this._$AH[m]=v}o&&!n&&this.j(s)}j(s){s===D?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,s??"")}},p0=class extends f4{constructor(){super(...arguments),this.type=3}j(s){this.element[this.name]=s===D?void 0:s}},h0=class extends f4{constructor(){super(...arguments),this.type=4}j(s){this.element.toggleAttribute(this.name,!!s&&s!==D)}},m0=class extends f4{constructor(s,e,l,n,a){super(s,e,l,n,a),this.type=5}_$AI(s,e=this){if((s=o4(this,s,e,0)??D)===U1)return;let l=this._$AH,n=s===D&&l!==D||s.capture!==l.capture||s.once!==l.once||s.passive!==l.passive,a=s!==D&&(l===D||n);n&&this.element.removeEventListener(this.name,this,l),a&&this.element.addEventListener(this.name,this,s),this._$AH=s}handleEvent(s){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,s):this._$AH.handleEvent(s)}},g0=class{constructor(s,e,l){this.element=s,this.type=6,this._$AN=void 0,this._$AM=e,this.options=l}get _$AU(){return this._$AM._$AU}_$AI(s){o4(this,s)}},Qa={M:B6,P:$1,A:q6,C:1,L:Ja,R:d0,D:Ka,V:o4,I:N4,H:f4,N:h0,U:m0,B:p0,F:g0},yi=O6.litHtmlPolyfillSupport;yi?.(d3,N4),(O6.litHtmlVersions??=[]).push("3.3.3");Za=(r,s,e)=>{let l=e?.renderBefore??s,n=l._$litPart$;if(n===void 0){let a=e?.renderBefore??null;l._$litPart$=n=new N4(s.insertBefore(f3(),a),a,void 0,e??{})}return n._$AI(r),n}});var V6,j1,Ti,es=F(()=>{"use strict";n3();n3();A4();A4();V6=globalThis,j1=class extends D1{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let s=super.createRenderRoot();return this.renderOptions.renderBefore??=s.firstChild,s}update(s){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(s),this._$Do=Za(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return U1}};j1._$litElement$=!0,j1.finalized=!0,V6.litElementHydrateSupport?.({LitElement:j1});Ti=V6.litElementPolyfillSupport;Ti?.({LitElement:j1});(V6.litElementVersions??=[]).push("4.2.2")});var as=F(()=>{"use strict";});var P2=F(()=>{"use strict";n3();A4();es();as()});var ss,p2,cs=F(()=>{"use strict";ss=(r,s)=>{customElements.get(r)||customElements.define(r,s)},p2=r=>(s,e)=>{e!==void 0?e.addInitializer(()=>{ss(r,s)}):ss(r,s)}});function w(r){return(s,e)=>typeof e=="object"?Ai(r,s,e):((l,n,a)=>{let o=n.hasOwnProperty(a);return n.constructor.createProperty(a,l),o?Object.getOwnPropertyDescriptor(n,a):void 0})(r,s,e)}var Ni,Ai,j6=F(()=>{"use strict";n3();Ni={attribute:!0,type:String,converter:i3,reflect:!1,hasChanged:f0},Ai=(r=Ni,s,e)=>{let{kind:l,metadata:n}=e,a=globalThis.litPropertyMetadata.get(n);if(a===void 0&&globalThis.litPropertyMetadata.set(n,a=new Map),l==="setter"&&((r=Object.create(r)).wrapped=!0),a.set(e.name,r),l==="accessor"){let{name:o}=e;return{set(h){let m=s.get.call(this);s.set.call(this,h),this.requestUpdate(o,m,r,!0,h)},init(h){return h!==void 0&&this.C(o,void 0,r,h),h}}}if(l==="setter"){let{name:o}=e;return function(h){let m=this[o];s.call(this,h),this.requestUpdate(o,m,r,!0,h)}}throw Error("Unsupported decorator location: "+l)}});function M2(r){return w({...r,state:!0,attribute:!1})}var ls=F(()=>{"use strict";j6();});var ts=F(()=>{"use strict";});var u4,E4=F(()=>{"use strict";u4=(r,s,e)=>(e.configurable=!0,e.enumerable=!0,Reflect.decorate&&typeof s!="object"&&Object.defineProperty(r,s,e),e)});function v0(r,s){return(e,l,n)=>{let a=o=>o.renderRoot?.querySelector(r)??null;if(s){let{get:o,set:h}=typeof l=="object"?e:n??(()=>{let m=Symbol();return{get(){return this[m]},set(v){this[m]=v}}})();return u4(e,l,{get(){let m=o.call(this);return m===void 0&&(m=a(this),(m!==null||this.hasUpdated)&&h.call(this,m)),m}})}return u4(e,l,{get(){return a(this)}})}}var rs=F(()=>{"use strict";E4();});var is=F(()=>{"use strict";E4();});var ns=F(()=>{"use strict";E4();});var os=F(()=>{"use strict";E4();});var fs=F(()=>{"use strict";E4();});var X2=F(()=>{"use strict";cs();j6();ls();ts();rs();is();ns();os();fs()});var K6,Y6=F(()=>{"use strict";P2();K6=r2`
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
`});function ds(r,s){let e=Object.keys(s),l="";for(let n=0;n<e.length;n++)l+=e[n]+":"+s[e[n]]+";";return r+"{"+l+"}"}function X6(r){let s=r||(typeof document<"u"?document:null);if(!s||!s.head||typeof s.createElement!="function"||s.querySelector("style["+us+"]"))return!1;let e=s.createElement("style");return e.setAttribute(us,""),e.textContent=Ri,s.head.insertBefore(e,s.head.firstChild),!0}var us,Ei,ki,Ri,J6=F(()=>{"use strict";us="data-dc-tokens",Ei={"--dc-primary-color":"#2563eb","--dc-primary-hover":"#1d4ed8","--dc-primary-text":"#ffffff","--dc-primary-soft":"#eaf1fe","--dc-bg-color":"#ffffff","--dc-surface-color":"#f7f8fa","--dc-surface-2":"#eef0f4","--dc-border-color":"#ebedf0","--dc-text-color":"#1a1d21","--dc-text-muted":"#5c6370","--dc-text-light":"#646b78","--dc-agent-bubble-bg":"#f1f3f6","--dc-agent-bubble-text":"#1a1d21","--dc-visitor-bubble-bg":"var(--dc-primary-color)","--dc-visitor-bubble-text":"var(--dc-primary-text)","--dc-online":"#22c55e","--dc-online-soft":"#e7f8ed","--dc-online-text":"#15803d","--dc-danger":"#ef4444","--dc-danger-soft":"#fdecec","--dc-danger-text":"#b91c1c","--dc-warning":"#f59e0b","--dc-warning-soft":"#fef3e2","--dc-warning-text":"#b45309","--dc-info":"#0ea5e9","--dc-info-soft":"#e6f6fe","--dc-info-text":"#0369a1","--dc-shadow":"0 8px 24px rgba(15, 23, 42, 0.08)","--dc-shadow-sm":"0 1px 2px rgba(15, 23, 42, 0.06)","--dc-radius":"12px","--dc-radius-sm":"8px","--dc-radius-bubble":"12px","--dc-font-family":'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',"--dc-font-size":"14px","--dc-font-size-sm":"12px","--dc-font-size-xs":"11px","--dc-transition":"0.15s ease","--dc-ease-panel":"cubic-bezier(0.16, 1, 0.3, 1)"},ki={"--dc-primary-color":"#60a5fa","--dc-primary-hover":"#93c5fd","--dc-primary-text":"#0f172a","--dc-primary-soft":"#1e2a44","--dc-bg-color":"#0f1419","--dc-surface-color":"#1a1f26","--dc-surface-2":"#242b33","--dc-border-color":"#2e3640","--dc-text-color":"#f3f4f6","--dc-text-muted":"#aab2bd","--dc-text-light":"#959ca6","--dc-agent-bubble-bg":"#2e3138","--dc-agent-bubble-text":"#f3f4f6","--dc-online-soft":"#14321f","--dc-online-text":"#4ade80","--dc-danger-soft":"#3a1d1d","--dc-danger-text":"#fca5a5","--dc-warning-soft":"#3a2c12","--dc-warning-text":"#fcd34d","--dc-info-soft":"#12303d","--dc-info-text":"#7dd3fc"};Ri=ds(":where(:root)",Ei)+ds(':where([data-dc-theme="dark"])',ki)});var X,Q6=F(()=>{"use strict";P2();Y6();J6();X=class extends j1{connectedCallback(){X6(this.ownerDocument),super.connectedCallback()}announce(s){let e=this.renderRoot?.querySelector("[data-dc-live]");e||(e=document.createElement("div"),e.setAttribute("data-dc-live",""),e.setAttribute("aria-live","polite"),e.setAttribute("role","status"),e.style.cssText="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;",this.renderRoot?.appendChild(e)),e.textContent="",requestAnimationFrame(()=>{e&&(e.textContent=s)})}};X.styles=K6});var Ii,d4,ps=F(()=>{"use strict";P2();X2();Q6();Ii={reconnecting:{tone:"warning",text:"Reconnecting\u2026 live updates will resume automatically.",spinner:!0},offline:{tone:"danger",text:"You're offline. We'll reconnect and sync as soon as your connection returns."},"other-tab":{tone:"info",text:"This session is active in another tab. Calls and the dialer run there.",action:"Use it here",event:"dc-resume-here"},"session-expiring":{tone:"warning",text:"Your secure session expires soon.",action:"Stay signed in",event:"dc-refresh-session"},"session-expired":{tone:"danger",text:"Your session expired for security. Sign in again to continue.",action:"Sign in",event:"dc-reauth"}},d4=class extends X{constructor(){super(...arguments);this.kind="reconnecting"}render(){let e=Ii[this.kind],l=e.tone==="danger"?"alert":"status";return z`
      <div class="banner ${e.tone}" role=${l}>
        ${e.spinner?z`<span class="spin"></span>`:z`<span class="dot"></span>`}
        <span class="txt">${e.text}</span>
        ${e.action?z`<button class="act" @click=${()=>this.emit(e.event??"dc-action")}>${e.action}</button>`:D}
      </div>
    `}emit(e){this.dispatchEvent(new CustomEvent(e,{bubbles:!0,composed:!0}))}};d4.styles=[X.styles,r2`
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
    `],C([w({type:String})],d4.prototype,"kind",2),d4=C([p2("dc-system-banner")],d4)});var hs,ms=F(()=>{"use strict";hs={prefix:"far",iconName:"circle",icon:[512,512,[128308,128309,128992,128993,128994,128995,128996,9679,9898,9899,11044,61708,61915],"f111","M464 256a208 208 0 1 0 -416 0 208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0 256 256 0 1 1 -512 0z"]}});var gs,vs,zs,Ms,_s,Cs,Ls,xs,bs,Ss,ws,ys,Ts,Ns,As,Es,ks,Rs,Is,Ps,Ds,$s,Us,Fs,Hs,Os,Bs,qs,Gs,Ws,Vs,js,Ks,Ys,Xs,Js,Qs,Zs,ec,ac,sc,cc,lc,tc,rc,ic,nc,oc,fc,uc,dc,pc,hc,mc,gc,vc,zc,Mc,_c,Cc,Lc,xc,bc,Sc,wc,yc,Tc,Nc,Ac,Ec,kc,Rc,Ic,Pc,Dc,$c,Uc,Fc,Hc=F(()=>{"use strict";gs={prefix:"fas",iconName:"minus",icon:[448,512,[8211,8722,10134,"subtract"],"f068","M0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32z"]},vs={prefix:"fas",iconName:"microphone-slash",icon:[576,512,[],"f131","M41-24.9c-9.4-9.4-24.6-9.4-33.9 0S-2.3-.3 7 9.1l528 528c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9L424.7 358.8C458.9 324.2 480 276.6 480 224l0-40c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 40c0 39.3-15.7 74.9-41.3 100.9L356.8 291C373.6 273.7 384 250 384 224l0-128c0-53-43-96-96-96s-96 43-96 96l0 30.2-151-151zm298.3 434l-41.4-41.4c-3.3 .2-6.5 .3-9.8 .3-79.5 0-144-64.5-144-144l0-10.2-43.6-43.6c-2.8 3.9-4.4 8.7-4.4 13.8l0 40c0 97.9 73.3 178.7 168 190.5l0 49.5-48 0c-13.3 0-24 10.7-24 24s10.7 24 24 24l144 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-48 0 0-49.5c9.3-1.2 18.4-3 27.3-5.4z"]},zs={prefix:"fas",iconName:"comment-sms",icon:[512,512,["sms"],"f7cd","M256 480c141.4 0 256-107.5 256-240S397.4 0 256 0 0 107.5 0 240c0 54.3 19.2 104.3 51.6 144.5L2.8 476.8c-4.8 9-3.3 20 3.6 27.5s17.8 9.8 27.1 5.8l118.4-50.7C183.7 472.6 218.9 480 256 480zM140.8 172.8l19.2 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-19.2 0c-5.3 0-9.6 4.3-9.6 9.6s4.3 9.6 9.6 9.6c23 0 41.6 18.6 41.6 41.6s-18.6 41.6-41.6 41.6l-25.6 0c-8.8 0-16-7.2-16-16s7.2-16 16-16l25.6 0c5.3 0 9.6-4.3 9.6-9.6s-4.3-9.6-9.6-9.6c-23 0-41.6-18.6-41.6-41.6s18.6-41.6 41.6-41.6zm188.8 41.6c0-23 18.6-41.6 41.6-41.6l19.2 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-19.2 0c-5.3 0-9.6 4.3-9.6 9.6s4.3 9.6 9.6 9.6c23 0 41.6 18.6 41.6 41.6s-18.6 41.6-41.6 41.6l-25.6 0c-8.8 0-16-7.2-16-16s7.2-16 16-16l25.6 0c5.3 0 9.6-4.3 9.6-9.6s-4.3-9.6-9.6-9.6c-23 0-41.6-18.6-41.6-41.6zm-98.3-33.8l24.7 41.1 24.7-41.1c3.7-6.2 11.1-9.1 18-7.2s11.7 8.2 11.7 15.4l0 102.4c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-44.6-8.7 14.5c-2.9 4.8-8.1 7.8-13.7 7.8s-10.8-3-13.7-7.8l-8.7-14.5 0 44.6c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-102.4c0-7.2 4.8-13.5 11.7-15.4s14.3 1 18 7.2z"]},Ms={prefix:"fas",iconName:"envelope",icon:[512,512,[128386,9993,61443],"f0e0","M48 64c-26.5 0-48 21.5-48 48 0 15.1 7.1 29.3 19.2 38.4l208 156c17.1 12.8 40.5 12.8 57.6 0l208-156c12.1-9.1 19.2-23.3 19.2-38.4 0-26.5-21.5-48-48-48L48 64zM0 196L0 384c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-188-198.4 148.8c-34.1 25.6-81.1 25.6-115.2 0L0 196z"]},_s={prefix:"fas",iconName:"bell",icon:[448,512,[128276,61602],"f0f3","M224 0c-17.7 0-32 14.3-32 32l0 3.2C119 50 64 114.6 64 192l0 21.7c0 48.1-16.4 94.8-46.4 132.4L7.8 358.3C2.7 364.6 0 372.4 0 380.5 0 400.1 15.9 416 35.5 416l376.9 0c19.6 0 35.5-15.9 35.5-35.5 0-8.1-2.7-15.9-7.8-22.2l-9.8-12.2C400.4 308.5 384 261.8 384 213.7l0-21.7c0-77.4-55-142-128-156.8l0-3.2c0-17.7-14.3-32-32-32zM162 464c7.1 27.6 32.2 48 62 48s54.9-20.4 62-48l-124 0z"]},Cs={prefix:"fas",iconName:"calendar-days",icon:[448,512,["calendar-alt"],"f073","M128 0c17.7 0 32 14.3 32 32l0 32 128 0 0-32c0-17.7 14.3-32 32-32s32 14.3 32 32l0 32 32 0c35.3 0 64 28.7 64 64l0 288c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64L0 128C0 92.7 28.7 64 64 64l32 0 0-32c0-17.7 14.3-32 32-32zM64 240l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm128 0l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0zM64 368l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0zm112 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16z"]},Ls={prefix:"fas",iconName:"ellipsis",icon:[448,512,["ellipsis-h"],"f141","M0 256a56 56 0 1 1 112 0 56 56 0 1 1 -112 0zm168 0a56 56 0 1 1 112 0 56 56 0 1 1 -112 0zm224-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112z"]},xs={prefix:"fas",iconName:"magnifying-glass",icon:[512,512,[128269,"search"],"f002","M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376C296.3 401.1 253.9 416 208 416 93.1 416 0 322.9 0 208S93.1 0 208 0 416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"]},bs={prefix:"fas",iconName:"ban",icon:[512,512,[128683,"cancel"],"f05e","M367.2 412.5L99.5 144.8c-22.4 31.4-35.5 69.8-35.5 111.2 0 106 86 192 192 192 41.5 0 79.9-13.1 111.2-35.5zm45.3-45.3c22.4-31.4 35.5-69.8 35.5-111.2 0-106-86-192-192-192-41.5 0-79.9 13.1-111.2 35.5L412.5 367.2zM0 256a256 256 0 1 1 512 0 256 256 0 1 1 -512 0z"]},Ss={prefix:"fas",iconName:"record-vinyl",icon:[512,512,[],"f8d9","M0 256a256 256 0 1 1 512 0 256 256 0 1 1 -512 0zm256-96a96 96 0 1 1 0 192 96 96 0 1 1 0-192zm0 240a144 144 0 1 0 0-288 144 144 0 1 0 0 288zm0-112a32 32 0 1 0 0-64 32 32 0 1 0 0 64z"]},ws={prefix:"fas",iconName:"palette",icon:[512,512,[127912],"f53f","M512 256c0 .9 0 1.8 0 2.7-.4 36.5-33.6 61.3-70.1 61.3L344 320c-26.5 0-48 21.5-48 48 0 3.4 .4 6.7 1 9.9 2.1 10.2 6.5 20 10.8 29.9 6.1 13.8 12.1 27.5 12.1 42 0 31.8-21.6 60.7-53.4 62-3.5 .1-7 .2-10.6 .2-141.4 0-256-114.6-256-256S114.6 0 256 0 512 114.6 512 256zM128 288a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm0-96a32 32 0 1 0 0-64 32 32 0 1 0 0 64zM288 96a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm96 96a32 32 0 1 0 0-64 32 32 0 1 0 0 64z"]},ys={prefix:"fas",iconName:"sitemap",icon:[512,512,[],"f0e8","M192 64c0-17.7 14.3-32 32-32l64 0c17.7 0 32 14.3 32 32l0 64c0 17.7-14.3 32-32 32l-8 0 0 64 120 0c39.8 0 72 32.2 72 72l0 56 8 0c17.7 0 32 14.3 32 32l0 64c0 17.7-14.3 32-32 32l-64 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l8 0 0-56c0-13.3-10.7-24-24-24l-120 0 0 80 8 0c17.7 0 32 14.3 32 32l0 64c0 17.7-14.3 32-32 32l-64 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l8 0 0-80-120 0c-13.3 0-24 10.7-24 24l0 56 8 0c17.7 0 32 14.3 32 32l0 64c0 17.7-14.3 32-32 32l-64 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l8 0 0-56c0-39.8 32.2-72 72-72l120 0 0-64-8 0c-17.7 0-32-14.3-32-32l0-64z"]},Ts={prefix:"fas",iconName:"fax",icon:[512,512,[128224,128439],"f1ac","M160 64l0 80 64 0 0-80 146.7 0 45.3 45.3 0 34.7 64 0 0-34.7c0-17-6.7-33.3-18.7-45.3L416 18.7C404 6.7 387.7 0 370.7 0L224 0c-35.3 0-64 28.7-64 64zM32 128c-17.7 0-32 14.3-32 32L0 448c0 17.7 14.3 32 32 32l48 0c17.7 0 32-14.3 32-32l0-288c0-17.7-14.3-32-32-32l-48 0zm448 64l-320 0 0 256c0 17.7 14.3 32 32 32l288 0c17.7 0 32-14.3 32-32l0-224c0-17.7-14.3-32-32-32zM224 288a24 24 0 1 1 48 0 24 24 0 1 1 -48 0zm0 96a24 24 0 1 1 48 0 24 24 0 1 1 -48 0zM336 264a24 24 0 1 1 0 48 24 24 0 1 1 0-48zM312 384a24 24 0 1 1 48 0 24 24 0 1 1 -48 0zM424 264a24 24 0 1 1 0 48 24 24 0 1 1 0-48zM400 384a24 24 0 1 1 48 0 24 24 0 1 1 -48 0z"]},Ns={prefix:"fas",iconName:"expand",icon:[448,512,[],"f065","M32 32C14.3 32 0 46.3 0 64l0 96c0 17.7 14.3 32 32 32s32-14.3 32-32l0-64 64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L32 32zM64 352c0-17.7-14.3-32-32-32S0 334.3 0 352l0 96c0 17.7 14.3 32 32 32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0 0-64zM320 32c-17.7 0-32 14.3-32 32s14.3 32 32 32l64 0 0 64c0 17.7 14.3 32 32 32s32-14.3 32-32l0-96c0-17.7-14.3-32-32-32l-96 0zM448 352c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 64-64 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l96 0c17.7 0 32-14.3 32-32l0-96z"]},As={prefix:"fas",iconName:"table-columns",icon:[448,512,["columns"],"f0db","M0 96C0 60.7 28.7 32 64 32l320 0c35.3 0 64 28.7 64 64l0 320c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64L0 96zm64 64l0 256 128 0 0-256-128 0zm320 0l-128 0 0 256 128 0 0-256z"]},Es={prefix:"fas",iconName:"stop",icon:[448,512,[9209],"f04d","M64 32l320 0c35.3 0 64 28.7 64 64l0 320c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64L0 96C0 60.7 28.7 32 64 32z"]},ks={prefix:"fas",iconName:"clock",icon:[512,512,[128339,"clock-four"],"f017","M256 0a256 256 0 1 1 0 512 256 256 0 1 1 0-512zM232 120l0 136c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2 280 120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"]},Rs={prefix:"fas",iconName:"rocket",icon:[512,512,[],"f135","M128 320L24.5 320c-24.9 0-40.2-27.1-27.4-48.5L50 183.3C58.7 168.8 74.3 160 91.2 160l95 0c76.1-128.9 189.6-135.4 265.5-124.3 12.8 1.9 22.8 11.9 24.6 24.6 11.1 75.9 4.6 189.4-124.3 265.5l0 95c0 16.9-8.8 32.5-23.3 41.2l-88.2 52.9c-21.3 12.8-48.5-2.6-48.5-27.4L192 384c0-35.3-28.7-64-64-64l-.1 0zM400 160a48 48 0 1 0 -96 0 48 48 0 1 0 96 0z"]},Is={prefix:"fas",iconName:"paper-plane",icon:[576,512,[61913],"f1d8","M536.4-26.3c9.8-3.5 20.6-1 28 6.3s9.8 18.2 6.3 28l-178 496.9c-5 13.9-18.1 23.1-32.8 23.1-14.2 0-27-8.6-32.3-21.7l-64.2-158c-4.5-11-2.5-23.6 5.2-32.6l94.5-112.4c5.1-6.1 4.7-15-.9-20.6s-14.6-6-20.6-.9L229.2 276.1c-9.1 7.6-21.6 9.6-32.6 5.2L38.1 216.8c-13.1-5.3-21.7-18.1-21.7-32.3 0-14.7 9.2-27.8 23.1-32.8l496.9-178z"]},Ps={prefix:"fas",iconName:"fire",icon:[448,512,[128293],"f06d","M160.5-26.4c9.3-7.8 23-7.5 31.9 .9 12.3 11.6 23.3 24.4 33.9 37.4 13.5 16.5 29.7 38.3 45.3 64.2 5.2-6.8 10-12.8 14.2-17.9 1.1-1.3 2.2-2.7 3.3-4.1 7.9-9.8 17.7-22.1 30.8-22.1 13.4 0 22.8 11.9 30.8 22.1 1.3 1.7 2.6 3.3 3.9 4.8 10.3 12.4 24 30.3 37.7 52.4 27.2 43.9 55.6 106.4 55.6 176.6 0 123.7-100.3 224-224 224S0 411.7 0 288c0-91.1 41.1-170 80.5-225 19.9-27.7 39.7-49.9 54.6-65.1 8.2-8.4 16.5-16.7 25.5-24.2zM225.7 416c25.3 0 47.7-7 68.8-21 42.1-29.4 53.4-88.2 28.1-134.4-4.5-9-16-9.6-22.5-2l-25.2 29.3c-6.6 7.6-18.5 7.4-24.7-.5-17.3-22.1-49.1-62.4-65.3-83-5.4-6.9-15.2-8-21.5-1.9-18.3 17.8-51.5 56.8-51.5 104.3 0 68.6 50.6 109.2 113.7 109.2z"]},Ds={prefix:"fas",iconName:"users",icon:[640,512,[],"f0c0","M320 16a104 104 0 1 1 0 208 104 104 0 1 1 0-208zM96 88a72 72 0 1 1 0 144 72 72 0 1 1 0-144zM0 416c0-70.7 57.3-128 128-128 12.8 0 25.2 1.9 36.9 5.4-32.9 36.8-52.9 85.4-52.9 138.6l0 16c0 11.4 2.4 22.2 6.7 32L32 480c-17.7 0-32-14.3-32-32l0-32zm521.3 64c4.3-9.8 6.7-20.6 6.7-32l0-16c0-53.2-20-101.8-52.9-138.6 11.7-3.5 24.1-5.4 36.9-5.4 70.7 0 128 57.3 128 128l0 32c0 17.7-14.3 32-32 32l-86.7 0zM472 160a72 72 0 1 1 144 0 72 72 0 1 1 -144 0zM160 432c0-88.4 71.6-160 160-160s160 71.6 160 160l0 16c0 17.7-14.3 32-32 32l-256 0c-17.7 0-32-14.3-32-32l0-16z"]},$s={prefix:"fas",iconName:"headset",icon:[448,512,[],"f590","M224 64c-79 0-144.7 57.3-157.7 132.7 9.3-3 19.3-4.7 29.7-4.7l16 0c26.5 0 48 21.5 48 48l0 96c0 26.5-21.5 48-48 48l-16 0c-53 0-96-43-96-96l0-64C0 100.3 100.3 0 224 0S448 100.3 448 224l0 168.1c0 66.3-53.8 120-120.1 120l-87.9-.1-32 0c-26.5 0-48-21.5-48-48s21.5-48 48-48l32 0c26.5 0 48 21.5 48 48l0 0 40 0c39.8 0 72-32.2 72-72l0-20.9c-14.1 8.2-30.5 12.8-48 12.8l-16 0c-26.5 0-48-21.5-48-48l0-96c0-26.5 21.5-48 48-48l16 0c10.4 0 20.3 1.6 29.7 4.7-13-75.3-78.6-132.7-157.7-132.7z"]},Us={prefix:"fas",iconName:"voicemail",icon:[640,512,[],"f897","M144 160a80 80 0 1 1 0 160 80 80 0 1 1 0-160zM263.8 320c15.3-22.9 24.2-50.4 24.2-80 0-79.5-64.5-144-144-144S0 160.5 0 240 64.5 384 144 384l352 0c79.5 0 144-64.5 144-144S575.5 96 496 96 352 160.5 352 240c0 29.6 8.9 57.1 24.2 80l-112.5 0zM496 160a80 80 0 1 1 0 160 80 80 0 1 1 0-160z"]},Fs={prefix:"fas",iconName:"microphone",icon:[384,512,[],"f130","M192 0C139 0 96 43 96 96l0 128c0 53 43 96 96 96s96-43 96-96l0-128c0-53-43-96-96-96zM48 184c0-13.3-10.7-24-24-24S0 170.7 0 184l0 40c0 97.9 73.3 178.7 168 190.5l0 49.5-48 0c-13.3 0-24 10.7-24 24s10.7 24 24 24l144 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-48 0 0-49.5c94.7-11.8 168-92.6 168-190.5l0-40c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 40c0 79.5-64.5 144-144 144S48 303.5 48 224l0-40z"]},Hs={prefix:"fas",iconName:"image",icon:[448,512,[],"f03e","M64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L64 32zm64 80a48 48 0 1 1 0 96 48 48 0 1 1 0-96zM272 224c8.4 0 16.1 4.4 20.5 11.5l88 144c4.5 7.4 4.7 16.7 .5 24.3S368.7 416 360 416L88 416c-8.9 0-17.2-5-21.3-12.9s-3.5-17.5 1.6-24.8l56-80c4.5-6.4 11.8-10.2 19.7-10.2s15.2 3.8 19.7 10.2l26.4 37.8 61.4-100.5c4.4-7.1 12.1-11.5 20.5-11.5z"]},Os={prefix:"fas",iconName:"folder",icon:[512,512,[128193,128447,61716,"folder-blank"],"f07b","M64 448l384 0c35.3 0 64-28.7 64-64l0-240c0-35.3-28.7-64-64-64L298.7 80c-6.9 0-13.7-2.2-19.2-6.4L241.1 44.8C230 36.5 216.5 32 202.7 32L64 32C28.7 32 0 60.7 0 96L0 384c0 35.3 28.7 64 64 64z"]},Bs={prefix:"fas",iconName:"cloud",icon:[576,512,[9729],"f0c2","M0 336c0 79.5 64.5 144 144 144l304 0c70.7 0 128-57.3 128-128 0-51.6-30.5-96.1-74.5-116.3 6.7-13.1 10.5-28 10.5-43.7 0-53-43-96-96-96-17.7 0-34.2 4.8-48.4 13.1-24.1-45.8-72.2-77.1-127.6-77.1-79.5 0-144 64.5-144 144 0 8 .7 15.9 1.9 23.5-56.9 19.2-97.9 73.1-97.9 136.5z"]},qs={prefix:"fas",iconName:"link",icon:[576,512,[128279,"chain"],"f0c1","M419.5 96c-16.6 0-32.7 4.5-46.8 12.7-15.8-16-34.2-29.4-54.5-39.5 28.2-24 64.1-37.2 101.3-37.2 86.4 0 156.5 70 156.5 156.5 0 41.5-16.5 81.3-45.8 110.6l-71.1 71.1c-29.3 29.3-69.1 45.8-110.6 45.8-86.4 0-156.5-70-156.5-156.5 0-1.5 0-3 .1-4.5 .5-17.7 15.2-31.6 32.9-31.1s31.6 15.2 31.1 32.9c0 .9 0 1.8 0 2.6 0 51.1 41.4 92.5 92.5 92.5 24.5 0 48-9.7 65.4-27.1l71.1-71.1c17.3-17.3 27.1-40.9 27.1-65.4 0-51.1-41.4-92.5-92.5-92.5zM275.2 173.3c-1.9-.8-3.8-1.9-5.5-3.1-12.6-6.5-27-10.2-42.1-10.2-24.5 0-48 9.7-65.4 27.1L91.1 258.2c-17.3 17.3-27.1 40.9-27.1 65.4 0 51.1 41.4 92.5 92.5 92.5 16.5 0 32.6-4.4 46.7-12.6 15.8 16 34.2 29.4 54.6 39.5-28.2 23.9-64 37.2-101.3 37.2-86.4 0-156.5-70-156.5-156.5 0-41.5 16.5-81.3 45.8-110.6l71.1-71.1c29.3-29.3 69.1-45.8 110.6-45.8 86.6 0 156.5 70.6 156.5 156.9 0 1.3 0 2.6 0 3.9-.4 17.7-15.1 31.6-32.8 31.2s-31.6-15.1-31.2-32.8c0-.8 0-1.5 0-2.3 0-33.7-18-63.3-44.8-79.6z"]},Gs={prefix:"fas",iconName:"chart-line",icon:[512,512,["line-chart"],"f201","M64 64c0-17.7-14.3-32-32-32S0 46.3 0 64L0 400c0 44.2 35.8 80 80 80l400 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L80 416c-8.8 0-16-7.2-16-16L64 64zm406.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L320 210.7 262.6 153.4c-12.5-12.5-32.8-12.5-45.3 0l-96 96c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l73.4-73.4 57.4 57.4c12.5 12.5 32.8 12.5 45.3 0l128-128z"]},Ws={prefix:"fas",iconName:"gear",icon:[512,512,[9881,"cog"],"f013","M195.1 9.5C198.1-5.3 211.2-16 226.4-16l59.8 0c15.2 0 28.3 10.7 31.3 25.5L332 79.5c14.1 6 27.3 13.7 39.3 22.8l67.8-22.5c14.4-4.8 30.2 1.2 37.8 14.4l29.9 51.8c7.6 13.2 4.9 29.8-6.5 39.9L447 233.3c.9 7.4 1.3 15 1.3 22.7s-.5 15.3-1.3 22.7l53.4 47.5c11.4 10.1 14 26.8 6.5 39.9l-29.9 51.8c-7.6 13.1-23.4 19.2-37.8 14.4l-67.8-22.5c-12.1 9.1-25.3 16.7-39.3 22.8l-14.4 69.9c-3.1 14.9-16.2 25.5-31.3 25.5l-59.8 0c-15.2 0-28.3-10.7-31.3-25.5l-14.4-69.9c-14.1-6-27.2-13.7-39.3-22.8L73.5 432.3c-14.4 4.8-30.2-1.2-37.8-14.4L5.8 366.1c-7.6-13.2-4.9-29.8 6.5-39.9l53.4-47.5c-.9-7.4-1.3-15-1.3-22.7s.5-15.3 1.3-22.7L12.3 185.8c-11.4-10.1-14-26.8-6.5-39.9L35.7 94.1c7.6-13.2 23.4-19.2 37.8-14.4l67.8 22.5c12.1-9.1 25.3-16.7 39.3-22.8L195.1 9.5zM256.3 336a80 80 0 1 0 -.6-160 80 80 0 1 0 .6 160z"]},Vs={prefix:"fas",iconName:"up-right-and-down-left-from-center",icon:[512,512,["expand-alt"],"f424","M344 0L488 0c13.3 0 24 10.7 24 24l0 144c0 9.7-5.8 18.5-14.8 22.2s-19.3 1.7-26.2-5.2l-39-39-87 87c-9.4 9.4-24.6 9.4-33.9 0l-32-32c-9.4-9.4-9.4-24.6 0-33.9l87-87-39-39c-6.9-6.9-8.9-17.2-5.2-26.2S334.3 0 344 0zM168 512L24 512c-13.3 0-24-10.7-24-24L0 344c0-9.7 5.8-18.5 14.8-22.2S34.1 320.2 41 327l39 39 87-87c9.4-9.4 24.6-9.4 33.9 0l32 32c9.4 9.4 9.4 24.6 0 33.9l-87 87 39 39c6.9 6.9 8.9 17.2 5.2 26.2S177.7 512 168 512z"]},js={prefix:"fas",iconName:"play",icon:[448,512,[9654],"f04b","M91.2 36.9c-12.4-6.8-27.4-6.5-39.6 .7S32 57.9 32 72l0 368c0 14.1 7.5 27.2 19.6 34.4s27.2 7.5 39.6 .7l336-184c12.8-7 20.8-20.5 20.8-35.1s-8-28.1-20.8-35.1l-336-184z"]},Ks={prefix:"fas",iconName:"check",icon:[448,512,[10003,10004],"f00c","M434.8 70.1c14.3 10.4 17.5 30.4 7.1 44.7l-256 352c-5.5 7.6-14 12.3-23.4 13.1s-18.5-2.7-25.1-9.3l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l101.5 101.5 234-321.7c10.4-14.3 30.4-17.5 44.7-7.1z"]},Ys={prefix:"fas",iconName:"sliders",icon:[512,512,["sliders-h"],"f1de","M32 64C14.3 64 0 78.3 0 96s14.3 32 32 32l86.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48L480 128c17.7 0 32-14.3 32-32s-14.3-32-32-32L265.3 64C253 35.7 224.8 16 192 16s-61 19.7-73.3 48L32 64zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32l246.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48l54.7 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-54.7 0c-12.3-28.3-40.5-48-73.3-48s-61 19.7-73.3 48L32 224zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32l54.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48L480 448c17.7 0 32-14.3 32-32s-14.3-32-32-32l-246.7 0c-12.3-28.3-40.5-48-73.3-48s-61 19.7-73.3 48L32 384z"]},Xs={prefix:"fas",iconName:"user",icon:[448,512,[128100,62144,62470,"user-alt","user-large"],"f007","M224 248a120 120 0 1 0 0-240 120 120 0 1 0 0 240zm-29.7 56C95.8 304 16 383.8 16 482.3 16 498.7 29.3 512 45.7 512l356.6 0c16.4 0 29.7-13.3 29.7-29.7 0-98.5-79.8-178.3-178.3-178.3l-59.4 0z"]},Js={prefix:"fas",iconName:"arrow-right",icon:[512,512,[8594],"f061","M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l370.7 0-105.4 105.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"]},Qs={prefix:"fas",iconName:"right-left",icon:[512,512,["exchange-alt"],"f362","M502.6 150.6l-96 96c-9.2 9.2-22.9 11.9-34.9 6.9S352 236.9 352 224l0-64-320 0c-17.7 0-32-14.3-32-32S14.3 96 32 96l320 0 0-64c0-12.9 7.8-24.6 19.8-29.6s25.7-2.2 34.9 6.9l96 96c12.5 12.5 12.5 32.8 0 45.3zm-397.3 352l-96-96c-12.5-12.5-12.5-32.8 0-45.3l96-96c9.2-9.2 22.9-11.9 34.9-6.9S160 275.1 160 288l0 64 320 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-320 0 0 64c0 12.9-7.8 24.6-19.8 29.6s-25.7 2.2-34.9-6.9z"]},Zs={prefix:"fas",iconName:"xmark",icon:[384,512,[128473,10005,10006,10060,215,"close","multiply","remove","times"],"f00d","M55.1 73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L147.2 256 9.9 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192.5 301.3 329.9 438.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.8 256 375.1 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192.5 210.7 55.1 73.4z"]},ec={prefix:"fas",iconName:"comments",icon:[576,512,[128490,61670],"f086","M384 144c0 97.2-86 176-192 176-26.7 0-52.1-5-75.2-14L35.2 349.2c-9.3 4.9-20.7 3.2-28.2-4.2s-9.2-18.9-4.2-28.2l35.6-67.2C14.3 220.2 0 183.6 0 144 0 46.8 86-32 192-32S384 46.8 384 144zm0 368c-94.1 0-172.4-62.1-188.8-144 120-1.5 224.3-86.9 235.8-202.7 83.3 19.2 145 88.3 145 170.7 0 39.6-14.3 76.2-38.4 105.6l35.6 67.2c4.9 9.3 3.2 20.7-4.2 28.2s-18.9 9.2-28.2 4.2L459.2 498c-23.1 9-48.5 14-75.2 14z"]},ac={prefix:"fas",iconName:"mobile-screen",icon:[384,512,["mobile-android-alt"],"f3cf","M16 64C16 28.7 44.7 0 80 0L304 0c35.3 0 64 28.7 64 64l0 384c0 35.3-28.7 64-64 64L80 512c-35.3 0-64-28.7-64-64L16 64zM128 440c0 13.3 10.7 24 24 24l80 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-80 0c-13.3 0-24 10.7-24 24zM304 64l-224 0 0 304 224 0 0-304z"]},sc={prefix:"fas",iconName:"phone-volume",icon:[576,512,["volume-control-phone"],"f2a0","M344-32c128.1 0 232 103.9 232 232 0 13.3-10.7 24-24 24s-24-10.7-24-24c0-101.6-82.4-184-184-184-13.3 0-24-10.7-24-24s10.7-24 24-24zm8 192a32 32 0 1 1 0 64 32 32 0 1 1 0-64zM320 88c0-13.3 10.7-24 24-24 75.1 0 136 60.9 136 136 0 13.3-10.7 24-24 24s-24-10.7-24-24c0-48.6-39.4-88-88-88-13.3 0-24-10.7-24-24zM144.1 1.4c19.7-5.4 40.3 4.7 48.1 23.5l40.5 97.3c6.9 16.5 2.1 35.6-11.8 47l-44.1 36.1c32.5 71.6 89 130 159.3 164.9L374.7 323c11.3-13.9 30.4-18.6 47-11.8L519 351.8c18.8 7.8 28.9 28.4 23.5 48.1l-1.5 5.5C523.4 470.1 460.9 525.3 384.6 509.2 209.6 472.1 71.9 334.4 34.8 159.4 18.7 83.1 73.9 20.6 138.5 2.9l5.5-1.5z"]},cc={prefix:"fas",iconName:"phone",icon:[512,512,[128222,128379],"f095","M160.2 25C152.3 6.1 131.7-3.9 112.1 1.4l-5.5 1.5c-64.6 17.6-119.8 80.2-103.7 156.4 37.1 175 174.8 312.7 349.8 349.8 76.3 16.2 138.8-39.1 156.4-103.7l1.5-5.5c5.4-19.7-4.7-40.3-23.5-48.1l-97.3-40.5c-16.5-6.9-35.6-2.1-47 11.8l-38.6 47.2C233.9 335.4 177.3 277 144.8 205.3L189 169.3c13.9-11.3 18.6-30.4 11.8-47L160.2 25z"]},lc={prefix:"fas",iconName:"address-book",icon:[512,512,[62138,"contact-book"],"f2b9","M96 0C60.7 0 32 28.7 32 64l0 384c0 35.3 28.7 64 64 64l288 0c35.3 0 64-28.7 64-64l0-384c0-35.3-28.7-64-64-64L96 0zM208 288l64 0c44.2 0 80 35.8 80 80 0 8.8-7.2 16-16 16l-192 0c-8.8 0-16-7.2-16-16 0-44.2 35.8-80 80-80zm-24-96a56 56 0 1 1 112 0 56 56 0 1 1 -112 0zM512 80c0-8.8-7.2-16-16-16s-16 7.2-16 16l0 64c0 8.8 7.2 16 16 16s16-7.2 16-16l0-64zm0 128c0-8.8-7.2-16-16-16s-16 7.2-16 16l0 64c0 8.8 7.2 16 16 16s16-7.2 16-16l0-64zM496 320c-8.8 0-16 7.2-16 16l0 64c0 8.8 7.2 16 16 16s16-7.2 16-16l0-64c0-8.8-7.2-16-16-16z"]},tc={prefix:"fas",iconName:"chevron-down",icon:[448,512,[],"f078","M201.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 338.7 54.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"]},rc={prefix:"fas",iconName:"plug",icon:[448,512,[128268],"f1e6","M128-32c17.7 0 32 14.3 32 32l0 96 128 0 0-96c0-17.7 14.3-32 32-32s32 14.3 32 32l0 96 64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l0 64c0 95.1-69.2 174.1-160 189.3l0 66.7c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-66.7C101.2 398.1 32 319.1 32 224l0-64c-17.7 0-32-14.3-32-32S14.3 96 32 96l64 0 0-96c0-17.7 14.3-32 32-32z"]},ic={prefix:"fas",iconName:"comment-dots",icon:[512,512,[128172,62075,"commenting"],"f4ad","M256 480c141.4 0 256-107.5 256-240S397.4 0 256 0 0 107.5 0 240c0 54.3 19.2 104.3 51.6 144.5L2.8 476.8c-4.8 9-3.3 20 3.6 27.5s17.8 9.8 27.1 5.8l118.4-50.7C183.7 472.6 218.9 480 256 480zM128 208a32 32 0 1 1 0 64 32 32 0 1 1 0-64zm128 0a32 32 0 1 1 0 64 32 32 0 1 1 0-64zm96 32a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"]},nc={prefix:"fas",iconName:"inbox",icon:[512,512,[],"f01c","M91.8 32C59.9 32 32.9 55.4 28.4 86.9L.6 281.2c-.4 3-.6 6-.6 9.1L0 416c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-125.7c0-3-.2-6.1-.6-9.1L483.6 86.9C479.1 55.4 452.1 32 420.2 32L91.8 32zm0 64l328.5 0 27.4 192-59.9 0c-12.1 0-23.2 6.8-28.6 17.7l-14.3 28.6c-5.4 10.8-16.5 17.7-28.6 17.7l-120.4 0c-12.1 0-23.2-6.8-28.6-17.7l-14.3-28.6c-5.4-10.8-16.5-17.7-28.6-17.7L64.3 288 91.8 96z"]},oc={prefix:"fas",iconName:"bullhorn",icon:[512,512,[128226,128363],"f0a1","M461.2 18.9C472.7 24 480 35.4 480 48l0 416c0 12.6-7.3 24-18.8 29.1s-24.8 3.2-34.3-5.1l-46.6-40.7c-43.6-38.1-98.7-60.3-156.4-63l0 95.7c0 17.7-14.3 32-32 32l-32 0c-17.7 0-32-14.3-32-32l0-96C57.3 384 0 326.7 0 256S57.3 128 128 128l84.5 0c61.8-.2 121.4-22.7 167.9-63.3l46.6-40.7c9.4-8.3 22.9-10.2 34.3-5.1zM224 320l0 .2c70.3 2.7 137.8 28.5 192 73.4l0-275.3c-54.2 44.9-121.7 70.7-192 73.4L224 320z"]},fc={prefix:"fas",iconName:"wand-magic-sparkles",icon:[576,512,["magic-wand-sparkles"],"e2ca","M263.4-27L278.2 9.8 315 24.6c3 1.2 5 4.2 5 7.4s-2 6.2-5 7.4L278.2 54.2 263.4 91c-1.2 3-4.2 5-7.4 5s-6.2-2-7.4-5L233.8 54.2 197 39.4c-3-1.2-5-4.2-5-7.4s2-6.2 5-7.4L233.8 9.8 248.6-27c1.2-3 4.2-5 7.4-5s6.2 2 7.4 5zM110.7 41.7l21.5 50.1 50.1 21.5c5.9 2.5 9.7 8.3 9.7 14.7s-3.8 12.2-9.7 14.7l-50.1 21.5-21.5 50.1c-2.5 5.9-8.3 9.7-14.7 9.7s-12.2-3.8-14.7-9.7L59.8 164.2 9.7 142.7C3.8 140.2 0 134.4 0 128s3.8-12.2 9.7-14.7L59.8 91.8 81.3 41.7C83.8 35.8 89.6 32 96 32s12.2 3.8 14.7 9.7zM464 304c6.4 0 12.2 3.8 14.7 9.7l21.5 50.1 50.1 21.5c5.9 2.5 9.7 8.3 9.7 14.7s-3.8 12.2-9.7 14.7l-50.1 21.5-21.5 50.1c-2.5 5.9-8.3 9.7-14.7 9.7s-12.2-3.8-14.7-9.7l-21.5-50.1-50.1-21.5c-5.9-2.5-9.7-8.3-9.7-14.7s3.8-12.2 9.7-14.7l50.1-21.5 21.5-50.1c2.5-5.9 8.3-9.7 14.7-9.7zM460 0c11 0 21.6 4.4 29.5 12.2l42.3 42.3C539.6 62.4 544 73 544 84s-4.4 21.6-12.2 29.5l-88.2 88.2-101.3-101.3 88.2-88.2C438.4 4.4 449 0 460 0zM44.2 398.5L308.4 134.3 409.7 235.6 145.5 499.8C137.6 507.6 127 512 116 512s-21.6-4.4-29.5-12.2L44.2 457.5C36.4 449.6 32 439 32 428s4.4-21.6 12.2-29.5z"]},uc={prefix:"fas",iconName:"chart-column",icon:[512,512,[],"e0e3","M32 32c17.7 0 32 14.3 32 32l0 336c0 8.8 7.2 16 16 16l400 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L80 480c-44.2 0-80-35.8-80-80L0 64C0 46.3 14.3 32 32 32zM144 224c17.7 0 32 14.3 32 32l0 64c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32zm144-64l0 160c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-160c0-17.7 14.3-32 32-32s32 14.3 32 32zm80 32c17.7 0 32 14.3 32 32l0 96c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-96c0-17.7 14.3-32 32-32zM512 96l0 224c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-224c0-17.7 14.3-32 32-32s32 14.3 32 32z"]},dc={prefix:"fas",iconName:"star",icon:[576,512,[11088,61446],"f005","M309.5-18.9c-4.1-8-12.4-13.1-21.4-13.1s-17.3 5.1-21.4 13.1L193.1 125.3 33.2 150.7c-8.9 1.4-16.3 7.7-19.1 16.3s-.5 18 5.8 24.4l114.4 114.5-25.2 159.9c-1.4 8.9 2.3 17.9 9.6 23.2s16.9 6.1 25 2L288.1 417.6 432.4 491c8 4.1 17.7 3.3 25-2s11-14.2 9.6-23.2L441.7 305.9 556.1 191.4c6.4-6.4 8.6-15.8 5.8-24.4s-10.1-14.9-19.1-16.3L383 125.3 309.5-18.9z"]},pc={prefix:"fas",iconName:"triangle-exclamation",icon:[512,512,[9888,"exclamation-triangle","warning"],"f071","M256 0c14.7 0 28.2 8.1 35.2 21l216 400c6.7 12.4 6.4 27.4-.8 39.5S486.1 480 472 480L40 480c-14.1 0-27.2-7.4-34.4-19.5s-7.5-27.1-.8-39.5l216-400c7-12.9 20.5-21 35.2-21zm0 352a32 32 0 1 0 0 64 32 32 0 1 0 0-64zm0-192c-18.2 0-32.7 15.5-31.4 33.7l7.4 104c.9 12.5 11.4 22.3 23.9 22.3 12.6 0 23-9.7 23.9-22.3l7.4-104c1.3-18.2-13.1-33.7-31.4-33.7z"]},hc={prefix:"fas",iconName:"lock",icon:[384,512,[128274],"f023","M128 96l0 64 128 0 0-64c0-35.3-28.7-64-64-64s-64 28.7-64 64zM64 160l0-64C64 25.3 121.3-32 192-32S320 25.3 320 96l0 64c35.3 0 64 28.7 64 64l0 224c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 224c0-35.3 28.7-64 64-64z"]},mc={prefix:"fas",iconName:"window-restore",icon:[576,512,[],"f2d2","M512 96L160 96c0-35.3 28.7-64 64-64l288 0c35.3 0 64 28.7 64 64l0 192c0 35.3-28.7 64-64 64l-48 0 0-64 48 0 0-192zM0 224c0-35.3 28.7-64 64-64l288 0c35.3 0 64 28.7 64 64l0 192c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64L0 224zm64 40c0 13.3 10.7 24 24 24l240 0c13.3 0 24-10.7 24-24s-10.7-24-24-24L88 240c-13.3 0-24 10.7-24 24z"]},gc={prefix:"fas",iconName:"shield-halved",icon:[512,512,["shield-alt"],"f3ed","M256 0c4.6 0 9.2 1 13.4 2.9L457.8 82.8c22 9.3 38.4 31 38.3 57.2-.5 99.2-41.3 280.7-213.6 363.2-16.7 8-36.1 8-52.8 0-172.4-82.5-213.1-264-213.6-363.2-.1-26.2 16.3-47.9 38.3-57.2L242.7 2.9C246.9 1 251.4 0 256 0zm0 66.8l0 378.1c138-66.8 175.1-214.8 176-303.4l-176-74.6 0 0z"]},vc={prefix:"fas",iconName:"caret-up",icon:[320,512,[],"f0d8","M140.3 135.2c12.6-10.3 31.1-9.5 42.8 2.2l128 128c9.2 9.2 11.9 22.9 6.9 34.9S301.4 320 288.5 320l-256 0c-12.9 0-24.6-7.8-29.6-19.8S.7 274.5 9.9 265.4l128-128 2.4-2.2z"]},zc={prefix:"fas",iconName:"globe",icon:[512,512,[127760],"f0ac","M351.9 280l-190.9 0c2.9 64.5 17.2 123.9 37.5 167.4 11.4 24.5 23.7 41.8 35.1 52.4 11.2 10.5 18.9 12.2 22.9 12.2s11.7-1.7 22.9-12.2c11.4-10.6 23.7-28 35.1-52.4 20.3-43.5 34.6-102.9 37.5-167.4zM160.9 232l190.9 0C349 167.5 334.7 108.1 314.4 64.6 303 40.2 290.7 22.8 279.3 12.2 268.1 1.7 260.4 0 256.4 0s-11.7 1.7-22.9 12.2c-11.4 10.6-23.7 28-35.1 52.4-20.3 43.5-34.6 102.9-37.5 167.4zm-48 0C116.4 146.4 138.5 66.9 170.8 14.7 78.7 47.3 10.9 131.2 1.5 232l111.4 0zM1.5 280c9.4 100.8 77.2 184.7 169.3 217.3-32.3-52.2-54.4-131.7-57.9-217.3L1.5 280zm398.4 0c-3.5 85.6-25.6 165.1-57.9 217.3 92.1-32.7 159.9-116.5 169.3-217.3l-111.4 0zm111.4-48C501.9 131.2 434.1 47.3 342 14.7 374.3 66.9 396.4 146.4 399.9 232l111.4 0z"]},Mc={prefix:"fas",iconName:"upload",icon:[448,512,[],"f093","M256 109.3L256 320c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-210.7-41.4 41.4c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l96-96c12.5-12.5 32.8-12.5 45.3 0l96 96c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 109.3zM224 400c44.2 0 80-35.8 80-80l80 0c35.3 0 64 28.7 64 64l0 32c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64l0-32c0-35.3 28.7-64 64-64l80 0c0 44.2 35.8 80 80 80zm144 24a24 24 0 1 0 0-48 24 24 0 1 0 0 48z"]},_c={prefix:"fas",iconName:"arrow-left",icon:[512,512,[8592],"f060","M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 288 480 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-370.7 0 105.4-105.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"]},Cc={prefix:"fas",iconName:"check-double",icon:[384,512,[],"f560","M249.9 66.8c10.4-14.3 7.2-34.3-7.1-44.7s-34.3-7.2-44.7 7.1l-106 145.7-37.5-37.5c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l64 64c6.6 6.6 15.8 10 25.1 9.3s17.9-5.5 23.4-13.1l128-176zm128 136c10.4-14.3 7.2-34.3-7.1-44.7s-34.3-7.2-44.7 7.1l-170 233.7-69.5-69.5c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l96 96c6.6 6.6 15.8 10 25.1 9.3s17.9-5.5 23.4-13.1l192-264z"]},Lc={prefix:"fas",iconName:"down-left-and-up-right-to-center",icon:[512,512,["compress-alt"],"f422","M439.5 7c9.4-9.4 24.6-9.4 33.9 0l32 32c9.4 9.4 9.4 24.6 0 33.9l-87 87 39 39c6.9 6.9 8.9 17.2 5.2 26.2S450.2 240 440.5 240l-144 0c-13.3 0-24-10.7-24-24l0-144c0-9.7 5.8-18.5 14.8-22.2s19.3-1.7 26.2 5.2l39 39 87-87zM72.5 272l144 0c13.3 0 24 10.7 24 24l0 144c0 9.7-5.8 18.5-14.8 22.2s-19.3 1.7-26.2-5.2l-39-39-87 87c-9.4 9.4-24.6 9.4-33.9 0l-32-32c-9.4-9.4-9.4-24.6 0-33.9l87-87-39-39c-6.9-6.9-8.9-17.2-5.2-26.2S62.8 272 72.5 272z"]},xc={prefix:"fas",iconName:"music",icon:[512,512,[127925],"f001","M468 7c7.6 6.1 12 15.3 12 25l0 304c0 44.2-43 80-96 80s-96-35.8-96-80 43-80 96-80c11.2 0 22 1.6 32 4.6l0-116.7-224 49.8 0 206.3c0 44.2-43 80-96 80s-96-35.8-96-80 43-80 96-80c11.2 0 22 1.6 32 4.6L128 96c0-15 10.4-28 25.1-31.2l288-64c9.5-2.1 19.4 .2 27 6.3z"]},bc={prefix:"fas",iconName:"robot",icon:[640,512,[129302],"f544","M352 0c0-17.7-14.3-32-32-32S288-17.7 288 0l0 64-96 0c-53 0-96 43-96 96l0 224c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-224c0-53-43-96-96-96l-96 0 0-64zM160 368c0-13.3 10.7-24 24-24l32 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-32 0c-13.3 0-24-10.7-24-24zm120 0c0-13.3 10.7-24 24-24l32 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-32 0c-13.3 0-24-10.7-24-24zm120 0c0-13.3 10.7-24 24-24l32 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-32 0c-13.3 0-24-10.7-24-24zM224 176a48 48 0 1 1 0 96 48 48 0 1 1 0-96zm144 48a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zM64 224c0-17.7-14.3-32-32-32S0 206.3 0 224l0 96c0 17.7 14.3 32 32 32s32-14.3 32-32l0-96zm544-32c-17.7 0-32 14.3-32 32l0 96c0 17.7 14.3 32 32 32s32-14.3 32-32l0-96c0-17.7-14.3-32-32-32z"]},Sc={prefix:"fas",iconName:"plus",icon:[448,512,[10133,61543,"add"],"2b","M256 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 160-160 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l160 0 0 160c0 17.7 14.3 32 32 32s32-14.3 32-32l0-160 160 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-160 0 0-160z"]},wc={prefix:"fas",iconName:"caret-down",icon:[320,512,[],"f0d7","M140.3 376.8c12.6 10.2 31.1 9.5 42.8-2.2l128-128c9.2-9.2 11.9-22.9 6.9-34.9S301.4 192 288.5 192l-256 0c-12.9 0-24.6 7.8-29.6 19.8S.7 237.5 9.9 246.6l128 128 2.4 2.2z"]},yc={prefix:"fas",iconName:"tag",icon:[512,512,[127991],"f02b","M32.5 96l0 149.5c0 17 6.7 33.3 18.7 45.3l192 192c25 25 65.5 25 90.5 0L483.2 333.3c25-25 25-65.5 0-90.5l-192-192C279.2 38.7 263 32 246 32L96.5 32c-35.3 0-64 28.7-64 64zm112 16a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"]},Tc={prefix:"fas",iconName:"phone-slash",icon:[576,512,[],"f3dd","M535-24.9c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9L41 537.1c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9L141.5 368.6C89.2 310.5 51.6 238.8 34.8 159.4 18.7 83.1 73.9 20.6 138.5 2.9l5.5-1.5c19.7-5.4 40.3 4.7 48.1 23.5l40.5 97.3c6.9 16.5 2.1 35.6-11.8 47l-44.1 36.1c12.9 28.5 29.6 54.8 49.5 78.5L535-24.9zm-150.4 534c-63-13.4-121.3-39.8-171.7-76.3L297.8 348c12.2 8.2 25 15.6 38.3 22.2L374.7 323c11.3-13.9 30.4-18.6 47-11.8L519 351.8c18.8 7.8 28.9 28.4 23.5 48.1l-1.5 5.5c-17.6 64.6-80.2 119.8-156.4 103.7z"]},Nc={prefix:"fas",iconName:"briefcase",icon:[512,512,[128188],"f0b1","M200 48l112 0c4.4 0 8 3.6 8 8l0 40-128 0 0-40c0-4.4 3.6-8 8-8zm-56 8l0 40-80 0C28.7 96 0 124.7 0 160l0 96 512 0 0-96c0-35.3-28.7-64-64-64l-80 0 0-40c0-30.9-25.1-56-56-56L200 0c-30.9 0-56 25.1-56 56zM512 304l-192 0 0 16c0 17.7-14.3 32-32 32l-64 0c-17.7 0-32-14.3-32-32l0-16-192 0 0 112c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-112z"]},Ac={prefix:"fas",iconName:"pause",icon:[384,512,[9208],"f04c","M48 32C21.5 32 0 53.5 0 80L0 432c0 26.5 21.5 48 48 48l64 0c26.5 0 48-21.5 48-48l0-352c0-26.5-21.5-48-48-48L48 32zm224 0c-26.5 0-48 21.5-48 48l0 352c0 26.5 21.5 48 48 48l64 0c26.5 0 48-21.5 48-48l0-352c0-26.5-21.5-48-48-48l-64 0z"]},Ec={prefix:"fas",iconName:"desktop",icon:[512,512,[128421,61704,"desktop-alt"],"f390","M64 32C28.7 32 0 60.7 0 96L0 352c0 35.3 28.7 64 64 64l144 0-16 48-72 0c-13.3 0-24 10.7-24 24s10.7 24 24 24l272 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-72 0-16-48 144 0c35.3 0 64-28.7 64-64l0-256c0-35.3-28.7-64-64-64L64 32zM96 96l320 0c17.7 0 32 14.3 32 32l0 160c0 17.7-14.3 32-32 32L96 320c-17.7 0-32-14.3-32-32l0-160c0-17.7 14.3-32 32-32z"]},kc={prefix:"fas",iconName:"arrow-down",icon:[384,512,[8595],"f063","M169.4 502.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 402.7 224 32c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 370.7-105.4-105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"]},Rc={prefix:"fas",iconName:"location-dot",icon:[384,512,["map-marker-alt"],"f3c5","M0 188.6C0 84.4 86 0 192 0S384 84.4 384 188.6c0 119.3-120.2 262.3-170.4 316.8-11.8 12.8-31.5 12.8-43.3 0-50.2-54.5-170.4-197.5-170.4-316.8zM192 256a64 64 0 1 0 0-128 64 64 0 1 0 0 128z"]},Ic={prefix:"fas",iconName:"keyboard",icon:[576,512,[9e3],"f11c","M64 64C28.7 64 0 92.7 0 128L0 384c0 35.3 28.7 64 64 64l448 0c35.3 0 64-28.7 64-64l0-256c0-35.3-28.7-64-64-64L64 64zm16 64l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16zM64 240c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32zM176 128l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16zM160 240c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32zm16 80l224 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-224 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16zm80-176c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32zm16 80l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16zm80-80c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32zm16 80l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16zm80-80c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32zm16 80l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16z"]},Pc={prefix:"fas",iconName:"hashtag",icon:[512,512,[62098],"23","M214.7 .7c17.3 3.7 28.3 20.7 24.6 38l-19.1 89.3 126.5 0 22-102.7C372.4 8 389.4-3 406.7 .7s28.3 20.7 24.6 38L412.2 128 480 128c17.7 0 32 14.3 32 32s-14.3 32-32 32l-81.6 0-27.4 128 67.8 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-81.6 0-22 102.7c-3.7 17.3-20.7 28.3-38 24.6s-28.3-20.7-24.6-38l19.1-89.3-126.5 0-22 102.7c-3.7 17.3-20.7 28.3-38 24.6s-28.3-20.7-24.6-38L99.8 384 32 384c-17.7 0-32-14.3-32-32s14.3-32 32-32l81.6 0 27.4-128-67.8 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l81.6 0 22-102.7C180.4 8 197.4-3 214.7 .7zM206.4 192l-27.4 128 126.5 0 27.4-128-126.5 0z"]},Dc={prefix:"fas",iconName:"circle-dot",icon:[512,512,[128280,"dot-circle"],"f192","M256 512a256 256 0 1 0 0-512 256 256 0 1 0 0 512zm0-352a96 96 0 1 1 0 192 96 96 0 1 1 0-192z"]},$c={prefix:"fas",iconName:"arrows-rotate",icon:[512,512,[128472,"refresh","sync"],"f021","M65.9 228.5c13.3-93 93.4-164.5 190.1-164.5 53 0 101 21.5 135.8 56.2 .2 .2 .4 .4 .6 .6l7.6 7.2-47.9 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l128 0c17.7 0 32-14.3 32-32l0-128c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 53.4-11.3-10.7C390.5 28.6 326.5 0 256 0 127 0 20.3 95.4 2.6 219.5 .1 237 12.2 253.2 29.7 255.7s33.7-9.7 36.2-27.1zm443.5 64c2.5-17.5-9.7-33.7-27.1-36.2s-33.7 9.7-36.2 27.1c-13.3 93-93.4 164.5-190.1 164.5-53 0-101-21.5-135.8-56.2-.2-.2-.4-.4-.6-.6l-7.6-7.2 47.9 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L32 320c-8.5 0-16.7 3.4-22.7 9.5S-.1 343.7 0 352.3l1 127c.1 17.7 14.6 31.9 32.3 31.7S65.2 496.4 65 478.7l-.4-51.5 10.7 10.1c46.3 46.1 110.2 74.7 180.7 74.7 129 0 235.7-95.4 253.4-219.5z"]},Uc={prefix:"fas",iconName:"list-ul",icon:[512,512,["list-dots"],"f0ca","M48 144a48 48 0 1 0 0-96 48 48 0 1 0 0 96zM192 64c-17.7 0-32 14.3-32 32s14.3 32 32 32l288 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L192 64zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32l288 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-288 0zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32l288 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-288 0zM48 464a48 48 0 1 0 0-96 48 48 0 1 0 0 96zM96 256a48 48 0 1 0 -96 0 48 48 0 1 0 96 0z"]},Fc={prefix:"fas",iconName:"tablet-screen-button",icon:[448,512,["tablet-alt"],"f3fa","M0 64C0 28.7 28.7 0 64 0L384 0c35.3 0 64 28.7 64 64l0 384c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 64zM256 432a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zM384 64l-320 0 0 288 320 0 0-288z"]}});function J(r,s){let e=Pi[r],[l,n,,,a]=e.icon,o=Array.isArray(a)?a.join(" "):a;return z`<svg
    viewBox="0 0 ${l} ${n}"
    style="width:1em;height:1em;vertical-align:-0.125em;overflow:visible"
    fill="currentColor"
    role=${s?.label?"img":"presentation"}
    aria-label=${s?.label??""}
    aria-hidden=${s?.label?"false":"true"}
  >
    <path d=${o}></path>
  </svg>`}var Pi,Oc=F(()=>{"use strict";P2();ms();Hc();Pi={"address-book":lc,"arrow-down":kc,"arrow-left":_c,"arrow-right":Js,ban:bs,bell:_s,briefcase:Nc,bullhorn:oc,calendar:Cs,"caret-down":wc,"caret-up":vc,chart:uc,"chart-line":Gs,check:Ks,"check-double":Cc,"chevron-down":tc,"circle-dot":Dc,"circle-outline":hs,clock:ks,cloud:Bs,comment:ic,comments:ec,desktop:Ec,dialpad:Ic,ellipsis:Ls,envelope:Ms,expand:Ns,fax:Ts,fire:Ps,folder:Os,gear:Ws,globe:zc,hashtag:Pc,headset:$s,image:Hs,inbox:nc,link:qs,list:Uc,"location-dot":Rc,lock:hc,microphone:Fs,"microphone-slash":vs,minus:gs,mobile:ac,music:xc,palette:ws,pause:Ac,phone:cc,"phone-slash":Tc,"phone-volume":sc,play:js,plug:rc,plus:Sc,record:Ss,robot:bc,rocket:Rs,search:xs,send:Is,shield:gc,sitemap:ys,sliders:Ys,sms:zs,sparkles:fc,star:dc,stop:Es,sync:$c,"table-columns":As,tablet:Fc,tag:yc,transfer:Qs,upload:Mc,user:Xs,users:Ds,voicemail:Us,warning:pc,"window-compact":Lc,"window-restore":mc,"window-wide":Vs,xmark:Zs}});function ae(r){let s=r||{},e=String(s.theme||s.mode||"LIGHT").toLowerCase(),l=e==="dark"?ee:Z6,n={mode:e==="auto"?"auto":l.mode,primaryColor:s.primaryColor||s.primary||l.primaryColor,primaryHover:s.primaryHover||l.primaryHover,primaryText:s.primaryText||l.primaryText,radius:s.radius||l.radius,fontFamily:s.fontFamily||l.fontFamily};return e==="auto"&&(n.mode="auto"),n}function Di(r){return r==="dark"?"dark":r==="light"?"light":typeof window<"u"&&typeof window.matchMedia=="function"&&window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}function o1(r,s){let e=ae(r),l=s||(typeof document<"u"?document.documentElement:null);if(!l||!l.style)return e;l.setAttribute("data-dc-theme",Di(e.mode));let n=Object.keys(Bc);for(let a=0;a<n.length;a++){let o=n[a],h=e[o];typeof h=="string"&&h.length>0&&l.style.setProperty(Bc[o],h)}return e}var Z6,ee,Bc,K1=F(()=>{"use strict";Z6={mode:"light",primaryColor:"#2563eb",primaryHover:"#1d4ed8",primaryText:"#ffffff",radius:"12px",fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'},ee={mode:"dark",primaryColor:"#60a5fa",primaryHover:"#93c5fd",primaryText:"#0f172a",radius:"12px",fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'},Bc={primaryColor:"--dc-primary-color",primaryHover:"--dc-primary-hover",primaryText:"--dc-primary-text",radius:"--dc-radius",fontFamily:"--dc-font-family"}});var qc=F(()=>{"use strict";K1()});function h3(r){if(!r||typeof r!="string")return{};let s=r.split(".");if(s.length<2)return{};try{let e=s[1].replace(/-/g,"+").replace(/_/g,"/"),l=e+"===".slice((e.length+3)%4),n=typeof Buffer<"u"?Buffer.from(l,"base64").toString("utf8"):decodeURIComponent(atob(l).split("").map(function(o){return"%"+("00"+o.charCodeAt(0).toString(16)).slice(-2)}).join("")),a=JSON.parse(n);return a&&typeof a=="object"?a:{}}catch{return{}}}function Gc(r){let s=h3(r).exp;return typeof s!="number"||!Number.isFinite(s)?null:s*1e3}function Wc(r){if(r==null||r==="")return null;if(typeof r=="number"&&Number.isFinite(r))return r<1e12?r*1e3:r;let s=Date.parse(String(r));return Number.isNaN(s)?null:s}function le(r){return!r||typeof r!="object"?!1:r.status===401||r.statusCode===401?!0:!!(r.response&&r.response.status===401)}function s1(r){return r?r.token||typeof r.getToken=="function"?!0:te(r.tokenManager):!1}function te(r){return!!(r&&typeof r.withAuthRetry=="function"&&typeof r.current=="function")}function c1(r,s){let e=r||{},l=te(e.tokenManager),n=l?e.tokenManager:Vc({token:e.token,expires_at:e.expires_at,getToken:e.getToken,onExpired:e.onExpired}),a=typeof s=="function"?n.onTokenChange(s):null,o=!1;return{manager:n,owned:!l,release:function(){o||(o=!0,a&&a(),l||n.destroy())}}}async function l1(r){if(r.manager.current())return r.manager.current();try{return await r.manager.refresh()}catch(s){throw r.release(),s}}function $i(r){return r||(typeof window<"u"&&window&&typeof window.addEventListener=="function"?window:null)}function Ui(r,s){if(typeof CustomEvent=="function")return new CustomEvent(r,{bubbles:!0,composed:!0,detail:s});let e=new Event(r,{bubbles:!0,composed:!0});return e.detail=s,e}function se(r,s){let e=setTimeout(r,Math.min(Math.max(0,s),2147483647));return e&&typeof e.unref=="function"&&e.unref(),e}function Vc(r){let s=r||{},e=typeof s.getToken=="function"?s.getToken:null,l=typeof s.onExpired=="function"?s.onExpired:null,n=typeof s.now=="function"?s.now:Date.now,a=$i(s.target),o=[],h="",m=null,v=null,_=null,u=!1,k=!1,b=!1;function S(){v&&(clearTimeout(v),v=null)}function y(){let Y=o.slice();for(let G=0;G<Y.length;G++)try{Y[G](h)}catch{}}function H(Y,G){if(S(),u||k)return;u=!0;let V={reason:Y,error:G||null,expires_at:m};a&&a.dispatchEvent(Ui(p3,V)),l&&l(V)}function u2(){if(S(),b=!1,k||!m)return;let Y=m-n();if(!e){v=se(function(){v=null,H("token_expired")},Y);return}let G=Math.floor(Y*.8);Y-G<1e4&&(G=Y-1e4),v=se(g2,G)}function g2(){v=null,R("scheduled").catch(function(){})}function v2(Y,G){h=String(Y),m=Gc(h)||Wc(G),u=!1,u2(),y()}function I(){if(b||!m)return!1;let Y=m-1e4-n();return Y<=0?!1:(b=!0,v=se(g2,Y),!0)}function R(Y){if(k)return Promise.reject(new Error("Token manager was closed"));if(_)return _;if(!e){let V=new Error("No getToken() was provided to refresh the session");return H(Y==="unauthorized"?"unauthorized":"refresh_unavailable",V),Promise.reject(V)}let G=b;return _=Promise.resolve().then(function(){return e()}).then(function(V){let l2=typeof V=="string"?V:V&&typeof V.token=="string"?V.token:"";if(!l2)throw new Error("getToken() did not return a token");if(_=null,k)throw new Error("Token manager was closed");return v2(l2,V&&typeof V=="object"?V.expires_at:null),h}).catch(function(V){throw _=null,k||Y==="scheduled"&&!G&&I()||H("refresh_failed",V),V}),_}async function P(Y){try{await R("unauthorized")}catch{throw Y}}function A(){R("requested").catch(function(){})}return s.token&&v2(s.token,s.expires_at),a&&a.addEventListener(ce,A),{current:function(){return h},expiresAt:function(){return m},hasRefresher:function(){return!!e},isExpired:function(){return u},isDestroyed:function(){return k},refresh:function(){return R("manual")},setToken:function(Y,G){if(k)throw new Error("Token manager was closed");if(!Y)throw new Error("setToken(token) requires a site token");let V=typeof Y=="object"?Y.token:Y,l2=typeof Y=="object"?Y.expires_at:G;if(!V)throw new Error("setToken(token) requires a site token");return v2(V,l2),h},withAuthRetry:async function(Y){if(k)throw new Error("Token manager was closed");let G;try{G=await Y(h)}catch(V){if(!le(V))throw V;return await P(V),Y(h)}return le(G)&&G.ok===!1?(await P(G),Y(h)):G},onTokenChange:function(Y){return o.push(Y),function(){let G=o.indexOf(Y);G>=0&&o.splice(G,1)}},destroy:function(){k||(k=!0,S(),_=null,o.length=0,a&&a.removeEventListener(ce,A))}}}var p3,ce,F1=F(()=>{"use strict";p3="dc-session-expired",ce="dc-refresh-session"});function J2(r){if(typeof r=="string"){let s=r.trim();return s&&s!=="[object Object]"?s:""}return""}function Bi(r){return!r||typeof r!="object"?{}:r.payload&&typeof r.payload=="object"?r.payload:r.body&&typeof r.body=="object"?r.body:r.response&&r.response.data&&typeof r.response.data=="object"?r.response.data:!(r instanceof Error)&&(r.detail!==void 0||r.title!==void 0||r.message!==void 0)?r:{}}function qi(r){let s=J2(r);if(!s||s==="about:blank")return"";let e=s.split("/");return e[e.length-1]||""}function _2(r,s){let e=J2(s)||"Something went wrong. Try again.";if(typeof r=="string")return{code:"request_failed",message:J2(r)||e,reason:null,status:null};let l=Bi(r),n=l.detail!==void 0?l.detail:r&&r.detail,a=Number(r&&(r.status||r.statusCode)||l.status)||null,o="",h=null,m="";return n&&typeof n=="object"?(o=J2(n.code),h=J2(n.reason)||null,m=J2(l.message)||J2(n.message)||J2(l.title)):m=J2(n)||J2(l.message)||J2(l.title),o||(o=J2(l.code)||J2(r&&r.code)||qi(l.type)),m||(m=J2(r&&r.message)),o||(o=a&&Hi[a]||"request_failed"),o===re?m=Xc(h):jc[o]&&(m=jc[o]),{code:o,message:m||e,reason:h,status:a}}function m3(r){return!!r&&(r.code===re||r.code===Yc)}function Xc(r){let s="This contact needs recorded consent before you can text or call them.",e=r&&Oi[r];return r==="opted_out"||r==="contact_dnc"?s+" "+e:e?s+" "+e+" "+Kc:s+" "+Kc}var re,Yc,Fi,Hi,Oi,jc,Kc,p4=F(()=>{"use strict";re="consent_required",Yc="consent_invalid",Fi="sms_registration_required",Hi={400:"invalid_request",401:"unauthorized",402:"payment_required",403:"forbidden",404:"not_found",409:"conflict",429:"rate_limited"},Oi={no_granted_consent:"Drop Cowboy has no granted consent on file for this contact and number.",phone_mismatch:"This number is not one of the contact's numbers, so their recorded consent does not cover it.",opted_out:"This contact opted out (replied STOP), so they cannot be messaged until they opt back in.",contact_dnc:"This contact is on your Do Not Call list.",contact_not_found:"Drop Cowboy could not find that contact, so there is no recorded consent to use.",consent_record_invalid:"The consent recorded for this contact no longer covers this number or channel."},jc={[Fi]:"This number is not registered for texting yet. US carriers only deliver business texts from numbers on a registered brand and campaign (10DLC). Register them in Drop Cowboy, then try again."},Kc='Capture consent with the Consent block first, or ask a team admin to turn on "Use existing contact consent" in Building Blocks settings so consent already recorded in Drop Cowboy counts.'});function Qc(r){let s=h3(r).scope,e=[],l=Array.isArray(s)?s:typeof s=="string"?s.split(/\s+/):[];for(let n=0;n<l.length;n++){let a=String(l[n]||"").trim();a&&e.indexOf(a)===-1&&e.push(a)}return e}function Zc(r){let s=h3(r).sandbox===!0,e=Qc(r),l=[];for(let n=0;n<e.length;n++){let a=Jc[e[n]]||[];for(let o=0;o<a.length;o++)s&&a[o]==="numbers:write"||l.indexOf(a[o])===-1&&l.push(a[o])}return l}function k4(r,s){return Zc(r).indexOf(s)!==-1}var Jc,ie=F(()=>{"use strict";F1();Jc={contacts:["contacts:read","contacts:write","lists:read","lists:write","webforms:read","consent:read","consent:write"],campaigns:["campaigns:read"],media:["media:read","media:write"],"phone:hub":["numbers:read","numbers:write"],voice:["voice:send"]}});var el=F(()=>{"use strict"});var Q2=F(()=>{"use strict";Q6();ps();Y6();Oc();qc();J6();F1();p4();ie();el()});var al,sl,z0,cl=F(()=>{"use strict";al={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},sl=r=>(...s)=>({_$litDirective$:r,values:s}),z0=class{constructor(s){}get _$AU(){return this._$AM._$AU}_$AT(s,e,l){this._$Ct=s,this._$AM=e,this._$Ci=l}_$AS(s,e){return this.update(s,e)}update(s,e){return this.render(...e)}}});var Gi,ll,tl,R4,Y1,Wi,rl,il,M0,nl=F(()=>{"use strict";A4();({I:Gi}=Qa),ll=r=>r,tl=()=>document.createComment(""),R4=(r,s,e)=>{let l=r._$AA.parentNode,n=s===void 0?r._$AB:s._$AA;if(e===void 0){let a=l.insertBefore(tl(),n),o=l.insertBefore(tl(),n);e=new Gi(a,o,r,r.options)}else{let a=e._$AB.nextSibling,o=e._$AM,h=o!==r;if(h){let m;e._$AQ?.(r),e._$AM=r,e._$AP!==void 0&&(m=r._$AU)!==o._$AU&&e._$AP(m)}if(a!==n||h){let m=e._$AA;for(;m!==a;){let v=ll(m).nextSibling;ll(l).insertBefore(m,n),m=v}}}return e},Y1=(r,s,e=r)=>(r._$AI(s,e),r),Wi={},rl=(r,s=Wi)=>r._$AH=s,il=r=>r._$AH,M0=r=>{r._$AR(),r._$AA.remove()}});var ol,E2,fl=F(()=>{"use strict";A4();cl();nl();ol=(r,s,e)=>{let l=new Map;for(let n=s;n<=e;n++)l.set(r[n],n);return l},E2=sl(class extends z0{constructor(r){if(super(r),r.type!==al.CHILD)throw Error("repeat() can only be used in text expressions")}dt(r,s,e){let l;e===void 0?e=s:s!==void 0&&(l=s);let n=[],a=[],o=0;for(let h of r)n[o]=l?l(h,o):o,a[o]=e(h,o),o++;return{values:a,keys:n}}render(r,s,e){return this.dt(r,s,e).values}update(r,[s,e,l]){let n=il(r),{values:a,keys:o}=this.dt(s,e,l);if(!Array.isArray(n))return this.ut=o,a;let h=this.ut??=[],m=[],v,_,u=0,k=n.length-1,b=0,S=a.length-1;for(;u<=k&&b<=S;)if(n[u]===null)u++;else if(n[k]===null)k--;else if(h[u]===o[b])m[b]=Y1(n[u],a[b]),u++,b++;else if(h[k]===o[S])m[S]=Y1(n[k],a[S]),k--,S--;else if(h[u]===o[S])m[S]=Y1(n[u],a[S]),R4(r,m[S+1],n[u]),u++,S--;else if(h[k]===o[b])m[b]=Y1(n[k],a[b]),R4(r,n[u],n[k]),k--,b++;else if(v===void 0&&(v=ol(o,b,S),_=ol(h,u,k)),v.has(h[u]))if(v.has(h[k])){let y=_.get(o[b]),H=y!==void 0?n[y]:null;if(H===null){let u2=R4(r,n[u]);Y1(u2,a[b]),m[b]=u2}else m[b]=Y1(H,a[b]),R4(r,n[u],H),n[y]=null;b++}else M0(n[k]),k--;else M0(n[u]),u++;for(;b<=S;){let y=R4(r,m[S+1]);Y1(y,a[b]),m[b++]=y}for(;u<=k;){let y=n[u++];y!==null&&M0(y)}return this.ut=o,rl(r,m),U1}})});var X1=F(()=>{"use strict";fl()});var f1,S2,_0=F(()=>{"use strict";P2();f1=r=>Y2`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="20" height="20" aria-hidden="true">${r}</svg>`,S2={phone:f1(Y2`<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/>`),mic:f1(Y2`<path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/>`),micOff:f1(Y2`<line x1="1" y1="1" x2="23" y2="23"/><path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6"/><path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23"/><line x1="12" y1="19" x2="12" y2="23"/>`),pause:f1(Y2`<rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>`),play:f1(Y2`<polygon points="5 3 19 12 5 21 5 3"/>`),transfer:f1(Y2`<polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/>`),record:f1(Y2`<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3" fill="currentColor"/>`),grid:f1(Y2`<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>`),expand:f1(Y2`<polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/>`),x:f1(Y2`<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>`),plus:f1(Y2`<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>`),delete:f1(Y2`<path d="M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z"/><line x1="18" y1="9" x2="12" y2="15"/><line x1="12" y1="9" x2="18" y2="15"/>`)}});function I4(r){let s=r.replace(/[^\d]/g,"").match(/^1?(\d{3})(\d{3})(\d{4})$/);return s?`+1 (${s[1]}) ${s[2]}-${s[3]}`:r}function ul(r){let s=Math.max(0,Math.floor(r/1e3)),e=String(Math.floor(s/60)).padStart(2,"0"),l=String(s%60).padStart(2,"0");return`${e}:${l}`}var Vi,V2,dl=F(()=>{"use strict";P2();X2();X1();Q2();_0();Vi=[{d:"1",sub:""},{d:"2",sub:"ABC"},{d:"3",sub:"DEF"},{d:"4",sub:"GHI"},{d:"5",sub:"JKL"},{d:"6",sub:"MNO"},{d:"7",sub:"PQRS"},{d:"8",sub:"TUV"},{d:"9",sub:"WXYZ"},{d:"*",sub:""},{d:"0",sub:"+"},{d:"#",sub:""}];V2=class extends X{constructor(){super(...arguments);this.line=null;this.lines=[];this.activeLineId="";this.dispositions=[];this.connection="connected";this.dialValue="";this.keypadOpen=!1;this.now=Date.now();this.unsubscribers=[]}connectedCallback(){super.connectedCallback(),this.bindAdapter()}disconnectedCallback(){super.disconnectedCallback(),this.stopTimer();for(let e of this.unsubscribers)e();this.unsubscribers.length=0}willUpdate(e){e.has("adapter")&&this.bindAdapter()}updated(){let e=this.activeLine;e?.status==="connected"&&e.connectedAt?this.startTimer():this.stopTimer()}bindAdapter(){for(let l of this.unsubscribers)l();if(this.unsubscribers.length=0,!this.adapter)return;let e=l=>{this.line=l,this.requestUpdate()};this.unsubscribers.push(this.adapter.on("call:updated",e)),this.unsubscribers.push(this.adapter.on("call:answered",e)),this.unsubscribers.push(this.adapter.on("call:ended",({line:l})=>{this.line=l,this.requestUpdate()})),this.unsubscribers.push(this.adapter.on("connection:state",l=>{this.connection=l}))}startTimer(){this.timer||(this.timer=setInterval(()=>{this.now=Date.now()},1e3))}stopTimer(){this.timer&&(clearInterval(this.timer),this.timer=void 0)}get activeLine(){return this.lines.length>0?this.lines.find(e=>e.id===this.activeLineId)??this.lines[0]:this.line}emit(e,l){this.dispatchEvent(new CustomEvent(e,{detail:l,bubbles:!0,composed:!0}))}onKey(e){let l=this.activeLine;if(l&&l.status!=="idle"&&l.status!=="ended"){this.adapter?.sendDtmf(l.id,e),this.emit("dc-dtmf",{lineId:l.id,digit:e});return}this.dialValue+=e}startCall(){this.dialValue&&(this.adapter?.callPhone(this.dialValue),this.emit("dc-call-start",{number:this.dialValue}),this.dialValue="")}hangup(){let e=this.activeLine;e&&(this.adapter?.hangup(e.id),this.emit("dc-hangup",{lineId:e.id}))}toggleMute(){let e=this.activeLine;e&&(this.adapter?.setMute(e.id,!e.muted),this.emit("dc-mute",{lineId:e.id,muted:!e.muted}))}toggleHold(){let e=this.activeLine;if(!e)return;let l=!(e.onHold||e.status==="hold");this.adapter?.setHold(e.id,l),this.emit("dc-hold",{lineId:e.id,hold:l})}pickDisposition(e){this.emit("dc-disposition",{disposition:e})}render(){let e=this.activeLine,l=e?.status??"idle";return z`
      <section
        class="panel dc-panel"
        role="region"
        aria-label="Softphone"
        aria-busy=${l==="dialing"||l==="ringing"}
      >
        ${this.lines.length>1?this.renderTabs():D}
        ${this.connection!=="connected"?this.renderConnectionBanner():D}
        ${l==="idle"||!e?this.renderIdle():l==="ended"?this.renderEnded(e):this.renderInCall(e)}
      </section>
    `}renderTabs(){let e=this.activeLine?.id;return z`
      <div class="tabs" role="tablist" aria-label="Call lines">
        ${E2(this.lines,l=>l.id,l=>z`
            <button
              class="tab ${l.id===e?"active":""} ${l.status==="hold"?"held":""}"
              role="tab"
              aria-selected=${l.id===e}
              @click=${()=>{this.activeLineId=l.id,this.emit("dc-switch-line",{lineId:l.id})}}
            >
              <span class="ld"></span>${l.contact?.name??I4(l.number)}
            </button>
          `)}
        <button
          class="tab tab-add dc-iconbtn"
          aria-label="Add line"
          @click=${()=>this.emit("dc-add-line")}
        >
          ${S2.plus}
        </button>
      </div>
    `}renderConnectionBanner(){let e=this.connection==="reconnecting";return z`
      <div class="banner ${e?"reconnecting":"down"}" role="status">
        ${e?z`<span class="spin"></span>Reconnecting…`:z`Connection lost — retrying`}
      </div>
    `}renderIdle(){return z`
      <div class="dial-display">
        ${this.dialValue?I4(this.dialValue):z`<span class="ph">Enter a number</span>`}
      </div>
      ${this.renderKeypad()}
      <button
        class="barbtn call"
        ?disabled=${!this.dialValue}
        style=${this.dialValue?"":"opacity:.5;cursor:default"}
        @click=${this.startCall}
      >
        ${S2.phone} Call
      </button>
    `}renderInCall(e){let l=e.onHold||e.status==="hold",n=e.status==="dialing"?"Dialing\u2026":e.status==="ringing"?e.direction==="inbound"?"Incoming\u2026":"Ringing\u2026":l?"On hold":`${this.elapsed(e)} \xB7 Connected`,a=l?"hold":e.status,o=e.status==="connected"&&!l;return z`
      <div class="callhead">
        <div class="name">${e.contact?.name??I4(e.number)}</div>
        <div class="num">${I4(e.number)}</div>
        <div class="status ${a}" aria-live="polite">
          <span class="pdot"></span>${n}
        </div>
      </div>
      ${this.keypadOpen&&o?this.renderKeypad():D}
      ${e.status==="connected"?z`
            <div class="actions">
              <button
                class="act"
                aria-pressed=${e.muted?"true":"false"}
                @click=${this.toggleMute}
              >
                <span class="circle">${e.muted?S2.micOff:S2.mic}</span>${e.muted?"Unmute":"Mute"}
              </button>
              <button
                class="act"
                aria-pressed=${l?"true":"false"}
                @click=${this.toggleHold}
              >
                <span class="circle">${l?S2.play:S2.pause}</span>${l?"Resume":"Hold"}
              </button>
              <button class="act" @click=${()=>this.emit("dc-transfer",{lineId:e.id})}>
                <span class="circle">${S2.transfer}</span>Transfer
              </button>
              <button
                class="act"
                aria-pressed=${e.recording?"true":"false"}
                @click=${()=>this.emit("dc-record",{lineId:e.id})}
              >
                <span class="circle">${S2.record}</span>Record
              </button>
              <button
                class="act"
                aria-pressed=${this.keypadOpen?"true":"false"}
                @click=${()=>{this.keypadOpen=!this.keypadOpen}}
              >
                <span class="circle">${S2.grid}</span>Keypad
              </button>
            </div>
          `:D}
      <button class="barbtn end" @click=${this.hangup}>${S2.phone} End call</button>
      <div class="foot">
        <span class="dc-pill ${o?"is-online":"is-warning"}">
          <span class="dc-pdot"></span>WebRTC · ${e.rttMs??38}ms
        </span>
        ${e.fromNumber?z`<span class="from">From: ${I4(e.fromNumber)}</span>`:D}
      </div>
    `}renderEnded(e){let l=e.connectedAt?ul((e.endedAt??Date.now())-e.connectedAt):"0:00";return z`
      <div class="ended">
        <div class="name">${e.contact?.name??I4(e.number)}</div>
        <div class="dur">Call ended · ${l}</div>
      </div>
      ${this.dispositions.length?z`
            <div class="disp-label">Log a disposition</div>
            <div class="disp-grid">
              ${E2(this.dispositions,n=>n.id,n=>z`
                  <button class="disp" @click=${()=>this.pickDisposition(n)}>
                    <span class="tdot tone-${n.tone??"neutral"}"></span>${n.label}
                  </button>
                `)}
            </div>
          `:D}
      <button class="barbtn call" style="background:var(--dc-primary-color)" @click=${()=>this.emit("dc-done")}>
        Done
      </button>
    `}renderKeypad(){return z`
      <div class="keypad" role="group" aria-label="Keypad">
        ${Vi.map(e=>z`
            <button class="key" aria-label=${e.d} @click=${()=>this.onKey(e.d)}>
              <b>${e.d}</b><span>${e.sub||""}</span>
            </button>
          `)}
      </div>
    `}elapsed(e){return this.now,e.connectedAt?ul(Date.now()-e.connectedAt):"00:00"}};V2.styles=[X.styles,r2`
      :host {
        display: block;
        width: 320px;
        max-width: 100%;
      }
      .panel {
        width: 100%;
      }
      .tabs {
        display: flex;
        gap: 2px;
        padding: 6px 6px 0;
        background: var(--dc-surface-color);
        border-bottom: 1px solid var(--dc-border-color);
      }
      .tab {
        flex: 1;
        min-width: 0;
        border: 0;
        background: transparent;
        cursor: pointer;
        padding: 8px 10px;
        border-radius: var(--dc-radius-sm) var(--dc-radius-sm) 0 0;
        font-size: var(--dc-font-size-sm);
        color: var(--dc-text-muted);
        display: flex;
        align-items: center;
        gap: 6px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .tab.active {
        background: var(--dc-bg-color);
        color: var(--dc-text-color);
        font-weight: 600;
      }
      .tab .ld {
        width: 7px;
        height: 7px;
        border-radius: 50%;
        flex-shrink: 0;
        background: var(--dc-online);
      }
      .tab.held .ld {
        background: var(--dc-warning);
      }
      .tab-add {
        flex: 0 0 auto;
        width: 34px;
      }
      .banner {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 8px 14px;
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
      .banner .spin {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        border: 2px solid currentColor;
        border-right-color: transparent;
        animation: spin 0.8s linear infinite;
      }
      @keyframes spin {
        to {
          transform: rotate(360deg);
        }
      }
      .callhead {
        padding: 18px 16px 8px;
        text-align: center;
        background: var(--dc-bg-color);
      }
      .name {
        font-size: 19px;
        font-weight: 700;
      }
      .num {
        color: var(--dc-text-muted);
        font-size: var(--dc-font-size-sm);
        margin-top: 2px;
      }
      .status {
        display: inline-flex;
        align-items: center;
        gap: 7px;
        margin-top: 10px;
        font-variant-numeric: tabular-nums;
        font-weight: 700;
      }
      .status.connected {
        color: var(--dc-online-text);
      }
      .status.ringing,
      .status.dialing {
        color: var(--dc-warning-text);
      }
      .status.hold {
        color: var(--dc-warning-text);
      }
      .pdot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: currentColor;
        animation: pulse 1.6s infinite;
      }
      @keyframes pulse {
        0% {
          box-shadow: 0 0 0 0 color-mix(in srgb, currentColor 50%, transparent);
        }
        70% {
          box-shadow: 0 0 0 7px transparent;
        }
        100% {
          box-shadow: 0 0 0 0 transparent;
        }
      }
      .dial-display {
        padding: 10px 16px 4px;
        text-align: center;
        background: var(--dc-bg-color);
        min-height: 44px;
        font-size: 22px;
        font-weight: 600;
        letter-spacing: 0.02em;
        color: var(--dc-text-color);
      }
      .dial-display .ph {
        color: var(--dc-text-light);
        font-weight: 400;
      }
      .keypad {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 10px;
        padding: 12px 26px 10px;
        background: var(--dc-bg-color);
      }
      .key {
        aspect-ratio: 1;
        border-radius: 50%;
        border: 0;
        background: var(--dc-surface-color);
        cursor: pointer;
        display: grid;
        place-items: center;
        line-height: 1;
        transition: background var(--dc-transition);
      }
      .key:hover {
        background: var(--dc-surface-2);
      }
      .key b {
        font-size: 20px;
        font-weight: 600;
      }
      .key span {
        font-size: 9px;
        letter-spacing: 0.14em;
        color: var(--dc-text-light);
        min-height: 11px;
      }
      .actions {
        display: flex;
        justify-content: space-around;
        padding: 6px 18px 12px;
        background: var(--dc-bg-color);
      }
      .act {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 5px;
        font-size: var(--dc-font-size-xs);
        color: var(--dc-text-muted);
        cursor: pointer;
        border: 0;
        background: transparent;
      }
      .act .circle {
        width: 46px;
        height: 46px;
        border-radius: 50%;
        background: var(--dc-surface-color);
        display: grid;
        place-items: center;
        color: var(--dc-text-color);
        transition: background var(--dc-transition);
      }
      .act[aria-pressed='true'] .circle {
        background: var(--dc-primary-soft);
        color: var(--dc-primary-color);
      }
      .act:hover .circle {
        background: var(--dc-surface-2);
      }
      .barbtn {
        margin: 0 18px 16px;
        height: 54px;
        border-radius: 27px;
        border: 0;
        color: #fff;
        font-weight: 700;
        font-size: 15px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        transition: filter var(--dc-transition);
      }
      .barbtn:hover {
        filter: brightness(0.95);
      }
      .barbtn.call {
        background: var(--dc-online);
      }
      .barbtn.end {
        background: var(--dc-danger);
      }
      .barbtn.end svg {
        transform: rotate(135deg);
      }
      .resume {
        background: var(--dc-online);
      }
      .foot {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 10px 14px;
        background: var(--dc-surface-color);
        border-top: 1px solid var(--dc-border-color);
        font-size: var(--dc-font-size-sm);
        color: var(--dc-text-muted);
      }
      .foot .from {
        margin-left: auto;
      }
      /* Ended → disposition */
      .ended {
        padding: 22px 16px 8px;
        text-align: center;
        background: var(--dc-bg-color);
      }
      .ended .dur {
        color: var(--dc-text-muted);
        font-size: var(--dc-font-size-sm);
        margin-top: 4px;
      }
      .disp-label {
        font-size: var(--dc-font-size-xs);
        text-transform: uppercase;
        letter-spacing: 0.04em;
        color: var(--dc-text-light);
        padding: 8px 16px 0;
        background: var(--dc-bg-color);
      }
      .disp-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 8px;
        padding: 8px 16px 12px;
        background: var(--dc-bg-color);
      }
      .disp {
        border: 1px solid var(--dc-border-color);
        background: var(--dc-bg-color);
        border-radius: var(--dc-radius-sm);
        padding: 10px;
        cursor: pointer;
        font-weight: 600;
        font-size: var(--dc-font-size-sm);
        display: flex;
        align-items: center;
        gap: 8px;
        transition: background var(--dc-transition);
      }
      .disp:hover {
        background: var(--dc-surface-color);
      }
      .disp .tdot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        flex-shrink: 0;
      }
      .tone-online {
        background: var(--dc-online);
      }
      .tone-danger {
        background: var(--dc-danger);
      }
      .tone-warning {
        background: var(--dc-warning);
      }
      .tone-info {
        background: var(--dc-info);
      }
      .tone-neutral {
        background: var(--dc-text-light);
      }

      @media (max-width: 480px) {
        :host {
          width: 100%;
        }
      }
    `],C([w({attribute:!1})],V2.prototype,"line",2),C([w({attribute:!1})],V2.prototype,"lines",2),C([w({type:String,attribute:"active-line-id"})],V2.prototype,"activeLineId",2),C([w({attribute:!1})],V2.prototype,"dispositions",2),C([w({type:String})],V2.prototype,"connection",2),C([w({attribute:!1})],V2.prototype,"adapter",2),C([M2()],V2.prototype,"dialValue",2),C([M2()],V2.prototype,"keypadOpen",2),C([M2()],V2.prototype,"now",2),V2=C([p2("dc-softphone")],V2)});function ne(r){let s=r.replace(/[^\d]/g,"").match(/^1?(\d{3})(\d{3})(\d{4})$/);return s?`+1 (${s[1]}) ${s[2]}-${s[3]}`:r}var J1,pl=F(()=>{"use strict";P2();X2();Q2();_0();J1=class extends X{constructor(){super(...arguments);this.line=null;this.variant="modal"}emit(e){this.dispatchEvent(new CustomEvent(e,{detail:{lineId:this.line?.id},bubbles:!0,composed:!0}))}render(){let e=this.line;return e?this.variant==="toast"?this.renderToast(e):this.renderModal(e):z`${D}`}renderModal(e){let l=e.contact;return z`
      <section class="pop dc-panel" role="alertdialog" aria-label="Incoming call">
        <div class="head">
          <div class="ring">${S2.phone}</div>
          <div>
            <div class="title">Incoming call</div>
            <span class="dc-pill is-warning"
              ><span class="dc-pdot"></span>Ringing · BYOC trunk</span
            >
          </div>
        </div>
        <div class="body">
          <div class="who">${l?.name??ne(e.number)}</div>
          <div class="dc-muted dc-sm">
            ${ne(e.number)}${l?.location?z` · ${l.location}`:D}
          </div>
        </div>
        ${l?z`<div class="crm">
              <div><div class="k">Stage</div>${l.stage||"\u2014"}</div>
              <div><div class="k">Last touch</div>${l.lastTouch??"\u2014"}</div>
              <div><div class="k">Owner</div>${l.owner||"\u2014"}</div>
            </div>`:D}
        <div class="actions">
          <button class="dc-btn dc-secondary" @click=${()=>this.emit("dc-decline")}>Decline</button>
          <button class="dc-btn dc-online" @click=${()=>this.emit("dc-accept")}>Accept</button>
        </div>
      </section>
    `}renderToast(e){let l=e.contact;return z`
      <section class="pop dc-panel" role="alert" aria-label="Incoming call while busy">
        <div class="toast">
          <div class="dc-avatar">${l?.initials??"#"}<span class="dc-dot"></span></div>
          <div class="who">
            ${l?.name??ne(e.number)}
            <span class="sub">Incoming · you're on a call</span>
          </div>
          <button class="dc-iconbtn dismiss" aria-label="Dismiss" @click=${()=>this.emit("dc-decline")}>
            ${S2.x}
          </button>
          <button class="answer" aria-label="Answer" @click=${()=>this.emit("dc-accept")}>
            ${S2.phone}
          </button>
        </div>
      </section>
    `}};J1.styles=[X.styles,r2`
      :host {
        display: block;
        width: 320px;
        max-width: 100%;
      }
      .pop {
        width: 100%;
      }
      .head {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 16px;
      }
      .ring {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        background: var(--dc-warning-soft);
        color: var(--dc-warning);
        display: grid;
        place-items: center;
        flex-shrink: 0;
        animation: ring 1.4s infinite;
      }
      @keyframes ring {
        0% {
          box-shadow: 0 0 0 0 color-mix(in srgb, var(--dc-warning) 45%, transparent);
        }
        70% {
          box-shadow: 0 0 0 10px transparent;
        }
        100% {
          box-shadow: 0 0 0 0 transparent;
        }
      }
      .head .title {
        font-weight: 700;
      }
      .body {
        padding: 0 16px 8px;
      }
      .who {
        font-size: 18px;
        font-weight: 700;
      }
      .crm {
        display: flex;
        gap: 16px;
        padding: 10px 16px;
        margin: 0 16px 12px;
        background: var(--dc-surface-color);
        border-radius: var(--dc-radius-sm);
      }
      .crm .k {
        color: var(--dc-text-light);
        font-size: var(--dc-font-size-xs);
      }
      .crm div {
        font-size: var(--dc-font-size-sm);
      }
      .actions {
        display: flex;
        gap: 10px;
        padding: 0 16px 16px;
      }
      .actions .dc-btn {
        flex: 1;
      }
      /* toast variant */
      :host([variant='toast']) {
        width: 300px;
      }
      .toast {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px 14px;
      }
      .toast .who {
        font-size: var(--dc-font-size);
        flex: 1;
        min-width: 0;
      }
      .toast .who .sub {
        font-weight: 400;
        font-size: var(--dc-font-size-sm);
        color: var(--dc-text-muted);
      }
      .toast .answer {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border: 0;
        background: var(--dc-online);
        color: #fff;
        cursor: pointer;
        display: grid;
        place-items: center;
      }
      .toast .dismiss {
        background: var(--dc-surface-color);
      }
      @media (max-width: 480px) {
        :host,
        :host([variant='toast']) {
          width: 100%;
        }
      }
    `],C([w({attribute:!1})],J1.prototype,"line",2),C([w({type:String,reflect:!0})],J1.prototype,"variant",2),J1=C([p2("dc-screen-pop")],J1)});function ji(r){let s=Math.max(0,Math.floor(r/1e3));return`${String(Math.floor(s/60)).padStart(2,"0")}:${String(s%60).padStart(2,"0")}`}var Q1,hl=F(()=>{"use strict";P2();X2();Q2();_0();Q1=class extends X{constructor(){super(...arguments);this.line=null;this.now=Date.now()}updated(e){e.has("line")&&(this.line?.status==="connected"&&this.line.connectedAt?this.start():this.stop())}disconnectedCallback(){super.disconnectedCallback(),this.stop()}start(){this.timer||(this.timer=setInterval(()=>this.now=Date.now(),1e3))}stop(){this.timer&&(clearInterval(this.timer),this.timer=void 0)}emit(e){this.dispatchEvent(new CustomEvent(e,{detail:{lineId:this.line?.id},bubbles:!0,composed:!0}))}render(){let e=this.line;if(!e)return z`${D}`;this.now;let l=e.onHold||e.status==="hold",n=e.connectedAt?ji(Date.now()-e.connectedAt):"00:00";return z`
      <section class="mini dc-panel" aria-label="Call in progress">
        <div class="row">
          <div class="dc-avatar">${e.contact?.initials??"#"}<span class="dc-dot"></span></div>
          <div class="who">
            <b>${e.contact?.name??e.number}</b>
            <span class="dc-pill ${l?"is-warning":"is-online"}">
              <span class="dc-pdot"></span>${l?"On hold":n}
            </span>
          </div>
        </div>
        <div class="controls">
          <button class="dc-iconbtn" aria-label=${e.muted?"Unmute":"Mute"} @click=${()=>this.emit("dc-mute")}>
            ${e.muted?S2.micOff:S2.mic}
          </button>
          <button class="dc-iconbtn" aria-label="Keypad" @click=${()=>this.emit("dc-keypad")}>
            ${S2.grid}
          </button>
          <button class="dc-iconbtn" aria-label="Expand" @click=${()=>this.emit("dc-expand")}>
            ${S2.expand}
          </button>
          <button class="dc-iconbtn end" aria-label="End call" @click=${()=>this.emit("dc-hangup")}>
            ${S2.x}
          </button>
        </div>
      </section>
    `}};Q1.styles=[X.styles,r2`
      :host {
        display: block;
        width: 232px;
        max-width: 100%;
      }
      .mini {
        width: 100%;
        padding: 12px 14px;
      }
      .row {
        display: flex;
        align-items: center;
        gap: 10px;
      }
      .who {
        flex: 1;
        min-width: 0;
      }
      .who b {
        display: block;
        font-size: var(--dc-font-size);
        font-weight: 700;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .controls {
        display: flex;
        gap: 6px;
        margin-top: 10px;
      }
      .controls .dc-iconbtn {
        background: var(--dc-surface-color);
      }
      .end {
        margin-left: auto;
        background: var(--dc-danger);
        color: #fff;
      }
      .end:hover {
        background: var(--dc-danger);
        filter: brightness(0.95);
      }
    `],C([w({attribute:!1})],Q1.prototype,"line",2),C([M2()],Q1.prototype,"now",2),Q1=C([p2("dc-mini-dialer")],Q1)});var C0,ml=F(()=>{"use strict";C0=class{constructor(){this.phase="idle",this.activeNumber=null,this.activeContact=null,this.connectedAt=null,this.endedAt=null,this.endedListeners=new Set}snapshot(){return{phase:this.phase,activeNumber:this.activeNumber,activeContact:this.activeContact,connectedAt:this.connectedAt,endedAt:this.endedAt}}addCallEndedListener(s){return this.endedListeners.add(s),()=>this.endedListeners.delete(s)}beginConnect(){if(this.phase!=="idle"&&this.phase!=="ended")throw new Error("Dialer is busy");this.phase="connecting",this.activeNumber=null,this.activeContact=null,this.connectedAt=null,this.endedAt=null}markReady(){this.phase==="connecting"&&(this.phase="idle")}beginCall(s,e){if(this.phase!=="idle"&&this.phase!=="ended")throw new Error("Dialer is busy");this.phase="dialing",this.activeNumber=s,this.activeContact=e||null,this.connectedAt=null,this.endedAt=null}markRinging(){this.phase==="dialing"&&(this.phase="ringing")}markConnected(s){let e=typeof s=="number"?s:Date.now();(this.phase==="dialing"||this.phase==="ringing")&&(this.phase="connected",this.connectedAt=e)}endCall(s){if(this.phase==="idle"||this.phase==="ended"||!this.activeNumber)return;let e=s&&s.now||Date.now(),l=this.connectedAt||e,n=Math.max(0,e-l),a={number:this.activeNumber,contact:this.activeContact||void 0,disposition:s&&s.disposition,durationMs:n};this.phase="ended",this.endedAt=e;for(let o of this.endedListeners)o(a)}reset(){this.phase="idle",this.activeNumber=null,this.activeContact=null,this.connectedAt=null,this.endedAt=null}}});function oe(r,s){let e=r&&r.username,l=r&&r.realm;if(!e||!l)throw new Error("SIP subscriber username and realm are required");let n={encoded:{call_type:"dial_in",team_id:s.team_id,user_id:s.user_id||null,initial_action:s.initial_action||L0.DIAL_ADHOC,initial_data:{play_welcome:s.play_welcome||!1,eavesdrop_cid:s.eavesdrop_cid||null,intercept_cid:s.intercept_cid||null,race_group:s.race_group||null,list_id:s.list_id||null,ivr_id:s.ivr_id||null,line_count:s.line_count||null,call_id:s.call_id||null,contact_id:s.contact_id||null,phone_number:s.contact_tn||null,caller_id:s.caller_id||null,agent_test:s.agent_test||!1,debug:s.debug||!1,timezone:s.timezone||null,e911_location_id:s.e911_location_id||null,e911_latitude:s.e911_latitude||null,e911_longitude:s.e911_longitude||null}}};s.external_user_id&&(n.encoded.external_user_id=String(s.external_user_id));let a=["x-client-data:"+Ki(JSON.stringify(n))],o=s.intercept_cid||s.eavesdrop_cid;return o&&a.push("X-Colocate-CID:"+o),{uri:r.aor_uri||"sip:"+e+"@"+l,displayName:s.caller_id||null,extraHeaders:a,enableAudio:s.enable_audio!==!1,enableVideo:s.enable_video||!1,pcConfig:{iceServers:[{urls:x0}]}}}function Ki(r){if(typeof Buffer<"u")return Buffer.from(r,"utf8").toString("base64");let s=new TextEncoder().encode(r),e="";for(let l=0;l<s.length;l++)e+=String.fromCharCode(s[l]);return btoa(e)}var L0,x0,b0=F(()=>{"use strict";L0={DIAL_ADHOC:"dial_adhoc"},x0=["stun:stun.cloudflare.com:3478","stun:stun.l.google.com:19302"]});function fe(r){let s=String(r||L2).replace(/\/$/,"");return s.endsWith("/phone")?s+"/embed/auth":s+"/phone/embed/auth"}function ue(r){let s={webrtc:!0,sip_register:!0,device_class:r&&r.deviceClass||"computer",lifespan_ms:r&&r.lifespanMs||9e5};return r&&r.fingerprint&&(s.fingerprint=r.fingerprint),r&&r.voipPlatform&&(s.voip_platform=r.voipPlatform),s}function B2(r){if(!r||typeof r!="string")return{};let s=r.split(".");if(s.length<2)return{};try{let e=s[1].replace(/-/g,"+").replace(/_/g,"/"),l=e+"===".slice((e.length+3)%4),n=typeof Buffer<"u"?Buffer.from(l,"base64").toString("utf8"):decodeURIComponent(atob(l).split("").map(function(a){return"%"+("00"+a.charCodeAt(0).toString(16)).slice(-2)}).join(""));return JSON.parse(n)}catch{return{}}}function vl(r){let s=r||(typeof localStorage<"u"?localStorage:null);if(!s)return"embed-web";let e=s.getItem(gl);return e||(e=typeof crypto<"u"&&typeof crypto.randomUUID=="function"?crypto.randomUUID():"embed-"+Date.now()+"-"+Math.random().toString(16).slice(2),s.setItem(gl,e),e)}function S0(){return{post:function(r,s,e){return fetch(r,{method:"POST",headers:e,body:JSON.stringify(s)}).then(function(l){return l.json().catch(function(){return{}}).then(function(n){if(!l.ok){let a=new Error(n.message||"SIP mint failed");throw a.status=l.status,a.detail=n.detail,a}return n})})}}}var L2,gl,z1=F(()=>{"use strict";L2="https://app-api-v2.dropcowboy.com",gl="dc_embed_sip_fp"});var de=Z((ep,Yi)=>{Yi.exports={name:"jssip",title:"JsSIP",description:"The Javascript SIP library",version:"3.13.8",homepage:"https://jssip.net",contributors:["Jos\xE9 Luis Mill\xE1n <jmillan@aliax.net> (https://github.com/jmillan)","I\xF1aki Baz Castillo <ibc@aliax.net> (https://inakibaz.me)"],types:"lib/JsSIP.d.ts",main:"lib/JsSIP.js",keywords:["sip","websocket","webrtc","node","browser","library"],license:"MIT",repository:{type:"git",url:"https://github.com/versatica/JsSIP.git"},bugs:{url:"https://github.com/versatica/JsSIP/issues"},files:["LICENSE","README.md","npm-scripts.mjs","lib"],scripts:{lint:"node npm-scripts.mjs lint","lint:fix":"node npm-scripts.mjs lint:fix",test:"node npm-scripts.mjs test",coverage:"node npm-scripts.mjs coverage",build:"node npm-scripts.mjs build","typescript:build":"node npm-scripts.mjs typescript:build",release:"node npm-scripts.mjs release",docs:"node npm-scripts.mjs docs","docs:watch":"node npm-scripts.mjs docs:watch","docs:check":"node npm-scripts.mjs docs:check"},dependencies:{debug:"^4.3.1",events:"^3.3.0","sdp-transform":"^2.14.1"},devDependencies:{"@eslint/eslintrc":"^3.3.3","@eslint/js":"^9.39.2","@types/debug":"^4.1.12","@types/events":"^3.0.3","@types/jest":"^30.0.0","@types/node":"^25.0.10",cpx:"^1.5.0",esbuild:"^0.27.2",eslint:"^9.39.1","eslint-config-prettier":"^10.1.8","eslint-plugin-jest":"^29.12.1","eslint-plugin-prettier":"^5.5.5",globals:"^17.0.0",jest:"^30.2.0","open-cli":"^8.0.0",pegjs:"^0.7.0",prettier:"^3.8.1","ts-jest":"^29.4.6",typedoc:"^0.28.16",typescript:"^5.9.3","typescript-eslint":"^8.53.1"}}});var x2=Z((ap,Ml)=>{"use strict";var zl=de();Ml.exports={USER_AGENT:`${zl.title} ${zl.version}`,SIP:"sip",SIPS:"sips",causes:{CONNECTION_ERROR:"Connection Error",REQUEST_TIMEOUT:"Request Timeout",SIP_FAILURE_CODE:"SIP Failure Code",INTERNAL_ERROR:"Internal Error",BUSY:"Busy",REJECTED:"Rejected",REDIRECTED:"Redirected",UNAVAILABLE:"Unavailable",NOT_FOUND:"Not Found",ADDRESS_INCOMPLETE:"Address Incomplete",INCOMPATIBLE_SDP:"Incompatible SDP",MISSING_SDP:"Missing SDP",AUTHENTICATION_ERROR:"Authentication Error",BYE:"Terminated",WEBRTC_ERROR:"WebRTC Error",CANCELED:"Canceled",NO_ANSWER:"No Answer",EXPIRES:"Expires",NO_ACK:"No ACK",DIALOG_ERROR:"Dialog Error",USER_DENIED_MEDIA_ACCESS:"User Denied Media Access",BAD_MEDIA_DESCRIPTION:"Bad Media Description",RTP_TIMEOUT:"RTP Timeout"},SIP_ERROR_CAUSES:{REDIRECTED:[300,301,302,305,380],BUSY:[486,600],REJECTED:[403,603],NOT_FOUND:[404,604],UNAVAILABLE:[480,410,408,430],ADDRESS_INCOMPLETE:[484,424],INCOMPATIBLE_SDP:[488,606],AUTHENTICATION_ERROR:[401,407]},ACK:"ACK",BYE:"BYE",CANCEL:"CANCEL",INFO:"INFO",INVITE:"INVITE",MESSAGE:"MESSAGE",NOTIFY:"NOTIFY",OPTIONS:"OPTIONS",REGISTER:"REGISTER",REFER:"REFER",UPDATE:"UPDATE",SUBSCRIBE:"SUBSCRIBE",DTMF_TRANSPORT:{INFO:"INFO",RFC2833:"RFC2833"},REASON_PHRASE:{100:"Trying",180:"Ringing",181:"Call Is Being Forwarded",182:"Queued",183:"Session Progress",199:"Early Dialog Terminated",200:"OK",202:"Accepted",204:"No Notification",300:"Multiple Choices",301:"Moved Permanently",302:"Moved Temporarily",305:"Use Proxy",380:"Alternative Service",400:"Bad Request",401:"Unauthorized",402:"Payment Required",403:"Forbidden",404:"Not Found",405:"Method Not Allowed",406:"Not Acceptable",407:"Proxy Authentication Required",408:"Request Timeout",410:"Gone",412:"Conditional Request Failed",413:"Request Entity Too Large",414:"Request-URI Too Long",415:"Unsupported Media Type",416:"Unsupported URI Scheme",417:"Unknown Resource-Priority",420:"Bad Extension",421:"Extension Required",422:"Session Interval Too Small",423:"Interval Too Brief",424:"Bad Location Information",428:"Use Identity Header",429:"Provide Referrer Identity",430:"Flow Failed",433:"Anonymity Disallowed",436:"Bad Identity-Info",437:"Unsupported Certificate",438:"Invalid Identity Header",439:"First Hop Lacks Outbound Support",440:"Max-Breadth Exceeded",469:"Bad Info Package",470:"Consent Needed",478:"Unresolvable Destination",480:"Temporarily Unavailable",481:"Call/Transaction Does Not Exist",482:"Loop Detected",483:"Too Many Hops",484:"Address Incomplete",485:"Ambiguous",486:"Busy Here",487:"Request Terminated",488:"Not Acceptable Here",489:"Bad Event",491:"Request Pending",493:"Undecipherable",494:"Security Agreement Required",500:"JsSIP Internal Error",501:"Not Implemented",502:"Bad Gateway",503:"Service Unavailable",504:"Server Time-out",505:"Version Not Supported",513:"Message Too Large",580:"Precondition Failure",600:"Busy Everywhere",603:"Decline",604:"Does Not Exist Anywhere",606:"Not Acceptable"},ALLOWED_METHODS:"INVITE,ACK,CANCEL,BYE,UPDATE,MESSAGE,OPTIONS,REFER,INFO,NOTIFY,SUBSCRIBE",ACCEPTED_BODY_TYPES:"application/sdp, application/dtmf-relay",MAX_FORWARDS:69,SESSION_EXPIRES:90,MIN_SESSION_EXPIRES:60,CONNECTION_RECOVERY_MAX_INTERVAL:30,CONNECTION_RECOVERY_MIN_INTERVAL:2}});var M1=Z((sp,_l)=>{"use strict";var pe=class extends Error{constructor(s,e){super(),this.code=1,this.name="CONFIGURATION_ERROR",this.parameter=s,this.value=e,this.message=this.value?`Invalid value ${JSON.stringify(this.value)} for parameter "${this.parameter}"`:`Missing parameter: ${this.parameter}`}},he=class extends Error{constructor(s){super(),this.code=2,this.name="INVALID_STATE_ERROR",this.status=s,this.message=`Invalid status: ${s}`}},me=class extends Error{constructor(s){super(),this.code=3,this.name="NOT_SUPPORTED_ERROR",this.message=s}},ge=class extends Error{constructor(s){super(),this.code=4,this.name="NOT_READY_ERROR",this.message=s}};_l.exports={ConfigurationError:pe,InvalidStateError:he,NotSupportedError:me,NotReadyError:ge}});var w0=Z((cp,Ll)=>{"use strict";var Xi=H1(),Ji=u1();Ll.exports=class Cl{static parse(s){if(s=Ji.parse(s,"Name_Addr_Header"),s!==-1)return s}constructor(s,e,l){if(!s||!(s instanceof Xi))throw new TypeError('missing or invalid "uri" parameter');this._uri=s,this._parameters={},this.display_name=e;for(let n in l)Object.prototype.hasOwnProperty.call(l,n)&&this.setParam(n,l[n])}get uri(){return this._uri}get display_name(){return this._display_name}set display_name(s){this._display_name=s===0?"0":s}setParam(s,e){s&&(this._parameters[s.toLowerCase()]=typeof e>"u"||e===null?null:e.toString())}getParam(s){if(s)return this._parameters[s.toLowerCase()]}hasParam(s){if(s)return this._parameters.hasOwnProperty(s.toLowerCase())&&!0||!1}deleteParam(s){if(s=s.toLowerCase(),this._parameters.hasOwnProperty(s)){let e=this._parameters[s];return delete this._parameters[s],e}}clearParams(){this._parameters={}}clone(){return new Cl(this._uri.clone(),this._display_name,JSON.parse(JSON.stringify(this._parameters)))}_quote(s){return s.replace(/\\/g,"\\\\").replace(/"/g,'\\"')}toString(){let s=this._display_name?`"${this._quote(this._display_name)}" `:"";s+=`<${this._uri.toString()}>`;for(let e in this._parameters)Object.prototype.hasOwnProperty.call(this._parameters,e)&&(s+=`;${e}`,this._parameters[e]!==null&&(s+=`=${this._parameters[e]}`));return s}}});var u1=Z((lp,xl)=>{"use strict";xl.exports=(function(){function r(e){return'"'+e.replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\x08/g,"\\b").replace(/\t/g,"\\t").replace(/\n/g,"\\n").replace(/\f/g,"\\f").replace(/\r/g,"\\r").replace(/[\x00-\x07\x0B\x0E-\x1F\x80-\uFFFF]/g,escape)+'"'}var s={parse:function(e,l){var n={CRLF:k,DIGIT:b,ALPHA:S,HEXDIG:y,WSP:H,OCTET:u2,DQUOTE:g2,SP:v2,HTAB:I,alphanum:R,reserved:P,unreserved:A,mark:Y,escaped:G,LWS:V,SWS:l2,HCOLON:e4,TEXT_UTF8_TRIM:a4,TEXT_UTF8char:n1,UTF8_NONASCII:v1,UTF8_CONT:b1,LHEX:w4,token:W,token_nodot:k1,separators:y4,word:S1,STAR:s4,SLASH:R1,EQUAL:i2,LPAREN:Q,RPAREN:j,RAQUOT:a2,LAQUOT:t2,COMMA:e2,SEMI:K,COLON:z2,LDQUOT:V1,RDQUOT:e1,comment:i6,ctext:n6,quoted_string:O3,quoted_string_clean:j4,qdtext:K4,quoted_pair:c4,SIP_URI_noparams:Y4,SIP_URI:B3,uri_scheme:o6,uri_scheme_sips:O8,uri_scheme_sip:B8,userinfo:q3,user:q8,user_unreserved:f6,password:G8,hostport:G3,host:X4,hostname:u6,domainlabel:d6,toplabel:W8,IPv6reference:p6,IPv6address:h6,h16:O,ls32:a1,IPv4address:J4,dec_octet:Q4,port:V8,uri_parameters:j8,uri_parameter:m6,transport_param:K8,user_param:Y8,method_param:X8,ttl_param:J8,maddr_param:Q8,lr_param:Z8,other_param:e5,pname:a5,pvalue:s5,paramchar:Z4,param_unreserved:c5,headers:l5,header:W3,hname:t5,hvalue:r5,hnv_unreserved:e3,Request_Response:wr,Request_Line:i5,Request_URI:n5,absoluteURI:g6,hier_part:o5,net_path:f5,abs_path:V3,opaque_part:u5,uric:a3,uric_no_slash:d5,path_segments:p5,segment:j3,param:v6,pchar:s3,scheme:h5,authority:m5,srvr:g5,reg_name:v5,query:z5,SIP_Version:z6,INVITEm:M5,ACKm:_5,OPTIONSm:C5,BYEm:L5,CANCELm:x5,REGISTERm:b5,SUBSCRIBEm:S5,NOTIFYm:w5,REFERm:y5,Method:K3,Status_Line:T5,Status_Code:N5,extension_code:A5,Reason_Phrase:E5,Allow_Events:yr,Call_ID:Tr,Contact:Nr,contact_param:Y3,name_addr:l4,display_name:X3,contact_params:M6,c_p_q:k5,c_p_expires:R5,delta_seconds:t4,qvalue:I5,generic_param:y2,gen_value:P5,Content_Disposition:Ar,disp_type:D5,disp_param:_6,handling_param:$5,Content_Encoding:Er,Content_Length:kr,Content_Type:Rr,media_type:U5,m_type:F5,discrete_type:H5,composite_type:O5,extension_token:J3,x_token:B5,m_subtype:q5,m_parameter:C6,m_value:G5,CSeq:Ir,CSeq_value:W5,Expires:Pr,Event:Dr,event_type:c3,From:$r,from_param:L6,tag_param:x6,Max_Forwards:Ur,Min_Expires:Fr,Name_Addr_Header:Hr,Proxy_Authenticate:Or,challenge:b6,other_challenge:V5,auth_param:l3,digest_cln:Q3,realm:j5,realm_value:K5,domain:Y5,URI:Z3,nonce:X5,nonce_value:J5,opaque:Q5,stale:Z5,algorithm:ea,qop_options:aa,qop_value:e0,Proxy_Require:Br,Record_Route:qr,rec_route:a0,Reason:Gr,reason_param:S6,reason_cause:sa,Require:Wr,Route:Vr,route_param:s0,Subscription_State:jr,substate_value:ca,subexp_params:w6,event_reason_value:la,Subject:Kr,Supported:Yr,To:Xr,to_param:y6,Via:Jr,via_param:c0,via_params:T6,via_ttl:ta,via_maddr:ra,via_received:ia,via_branch:na,response_port:oa,rport:fa,sent_protocol:ua,protocol_name:da,transport:pa,sent_by:ha,via_host:ma,via_port:ga,ttl:N6,WWW_Authenticate:Qr,Session_Expires:Zr,s_e_expires:va,s_e_params:A6,s_e_refresher:za,extension_header:ei,header_value:Ma,message_body:ai,uuid_URI:si,uuid:_a,hex4:I1,hex8:Ca,hex12:La,Refer_To:ci,Replaces:li,call_id:xa,replaces_param:E6,to_tag:ba,from_tag:Sa,early_flag:wa};if(l!==void 0){if(n[l]===void 0)throw new Error("Invalid rule name: "+r(l)+".")}else l="CRLF";var a=0,o=0,h=0,m=[];function v(c,t,i){for(var f=c,d=i-c.length,p=0;p<d;p++)f=t+f;return f}function _(c){var t=c.charCodeAt(0),i,f;return t<=255?(i="x",f=2):(i="u",f=4),"\\"+i+v(t.toString(16).toUpperCase(),"0",f)}function u(c){a<h||(a>h&&(h=a,m=[]),m.push(c))}function k(){var c;return e.substr(a,2)===`\r
`?(c=`\r
`,a+=2):(c=null,o===0&&u('"\\r\\n"')),c}function b(){var c;return/^[0-9]/.test(e.charAt(a))?(c=e.charAt(a),a++):(c=null,o===0&&u("[0-9]")),c}function S(){var c;return/^[a-zA-Z]/.test(e.charAt(a))?(c=e.charAt(a),a++):(c=null,o===0&&u("[a-zA-Z]")),c}function y(){var c;return/^[0-9a-fA-F]/.test(e.charAt(a))?(c=e.charAt(a),a++):(c=null,o===0&&u("[0-9a-fA-F]")),c}function H(){var c;return c=v2(),c===null&&(c=I()),c}function u2(){var c;return/^[\0-\xFF]/.test(e.charAt(a))?(c=e.charAt(a),a++):(c=null,o===0&&u("[\\0-\\xFF]")),c}function g2(){var c;return/^["]/.test(e.charAt(a))?(c=e.charAt(a),a++):(c=null,o===0&&u('["]')),c}function v2(){var c;return e.charCodeAt(a)===32?(c=" ",a++):(c=null,o===0&&u('" "')),c}function I(){var c;return e.charCodeAt(a)===9?(c="	",a++):(c=null,o===0&&u('"\\t"')),c}function R(){var c;return/^[a-zA-Z0-9]/.test(e.charAt(a))?(c=e.charAt(a),a++):(c=null,o===0&&u("[a-zA-Z0-9]")),c}function P(){var c;return e.charCodeAt(a)===59?(c=";",a++):(c=null,o===0&&u('";"')),c===null&&(e.charCodeAt(a)===47?(c="/",a++):(c=null,o===0&&u('"/"')),c===null&&(e.charCodeAt(a)===63?(c="?",a++):(c=null,o===0&&u('"?"')),c===null&&(e.charCodeAt(a)===58?(c=":",a++):(c=null,o===0&&u('":"')),c===null&&(e.charCodeAt(a)===64?(c="@",a++):(c=null,o===0&&u('"@"')),c===null&&(e.charCodeAt(a)===38?(c="&",a++):(c=null,o===0&&u('"&"')),c===null&&(e.charCodeAt(a)===61?(c="=",a++):(c=null,o===0&&u('"="')),c===null&&(e.charCodeAt(a)===43?(c="+",a++):(c=null,o===0&&u('"+"')),c===null&&(e.charCodeAt(a)===36?(c="$",a++):(c=null,o===0&&u('"$"')),c===null&&(e.charCodeAt(a)===44?(c=",",a++):(c=null,o===0&&u('","'))))))))))),c}function A(){var c;return c=R(),c===null&&(c=Y()),c}function Y(){var c;return e.charCodeAt(a)===45?(c="-",a++):(c=null,o===0&&u('"-"')),c===null&&(e.charCodeAt(a)===95?(c="_",a++):(c=null,o===0&&u('"_"')),c===null&&(e.charCodeAt(a)===46?(c=".",a++):(c=null,o===0&&u('"."')),c===null&&(e.charCodeAt(a)===33?(c="!",a++):(c=null,o===0&&u('"!"')),c===null&&(e.charCodeAt(a)===126?(c="~",a++):(c=null,o===0&&u('"~"')),c===null&&(e.charCodeAt(a)===42?(c="*",a++):(c=null,o===0&&u('"*"')),c===null&&(e.charCodeAt(a)===39?(c="'",a++):(c=null,o===0&&u(`"'"`)),c===null&&(e.charCodeAt(a)===40?(c="(",a++):(c=null,o===0&&u('"("')),c===null&&(e.charCodeAt(a)===41?(c=")",a++):(c=null,o===0&&u('")"')))))))))),c}function G(){var c,t,i,f,d;return f=a,d=a,e.charCodeAt(a)===37?(c="%",a++):(c=null,o===0&&u('"%"')),c!==null?(t=y(),t!==null?(i=y(),i!==null?c=[c,t,i]:(c=null,a=d)):(c=null,a=d)):(c=null,a=d),c!==null&&(c=(function(p,g){return g.join("")})(f,c)),c===null&&(a=f),c}function V(){var c,t,i,f,d,p;for(f=a,d=a,p=a,c=[],t=H();t!==null;)c.push(t),t=H();if(c!==null?(t=k(),t!==null?c=[c,t]:(c=null,a=p)):(c=null,a=p),c=c!==null?c:"",c!==null){if(i=H(),i!==null)for(t=[];i!==null;)t.push(i),i=H();else t=null;t!==null?c=[c,t]:(c=null,a=d)}else c=null,a=d;return c!==null&&(c=(function(g){return" "})(f)),c===null&&(a=f),c}function l2(){var c;return c=V(),c=c!==null?c:"",c}function e4(){var c,t,i,f,d;for(f=a,d=a,c=[],t=v2(),t===null&&(t=I());t!==null;)c.push(t),t=v2(),t===null&&(t=I());return c!==null?(e.charCodeAt(a)===58?(t=":",a++):(t=null,o===0&&u('":"')),t!==null?(i=l2(),i!==null?c=[c,t,i]:(c=null,a=d)):(c=null,a=d)):(c=null,a=d),c!==null&&(c=(function(p){return":"})(f)),c===null&&(a=f),c}function a4(){var c,t,i,f,d,p,g;if(d=a,p=a,t=n1(),t!==null)for(c=[];t!==null;)c.push(t),t=n1();else c=null;if(c!==null){for(t=[],g=a,i=[],f=V();f!==null;)i.push(f),f=V();for(i!==null?(f=n1(),f!==null?i=[i,f]:(i=null,a=g)):(i=null,a=g);i!==null;){for(t.push(i),g=a,i=[],f=V();f!==null;)i.push(f),f=V();i!==null?(f=n1(),f!==null?i=[i,f]:(i=null,a=g)):(i=null,a=g)}t!==null?c=[c,t]:(c=null,a=p)}else c=null,a=p;return c!==null&&(c=(function(L){return e.substring(a,L)})(d)),c===null&&(a=d),c}function n1(){var c;return/^[!-~]/.test(e.charAt(a))?(c=e.charAt(a),a++):(c=null,o===0&&u("[!-~]")),c===null&&(c=v1()),c}function v1(){var c;return/^[\x80-\uFFFF]/.test(e.charAt(a))?(c=e.charAt(a),a++):(c=null,o===0&&u("[\\x80-\\uFFFF]")),c}function b1(){var c;return/^[\x80-\xBF]/.test(e.charAt(a))?(c=e.charAt(a),a++):(c=null,o===0&&u("[\\x80-\\xBF]")),c}function w4(){var c;return c=b(),c===null&&(/^[a-f]/.test(e.charAt(a))?(c=e.charAt(a),a++):(c=null,o===0&&u("[a-f]"))),c}function W(){var c,t,i;if(i=a,t=R(),t===null&&(e.charCodeAt(a)===45?(t="-",a++):(t=null,o===0&&u('"-"')),t===null&&(e.charCodeAt(a)===46?(t=".",a++):(t=null,o===0&&u('"."')),t===null&&(e.charCodeAt(a)===33?(t="!",a++):(t=null,o===0&&u('"!"')),t===null&&(e.charCodeAt(a)===37?(t="%",a++):(t=null,o===0&&u('"%"')),t===null&&(e.charCodeAt(a)===42?(t="*",a++):(t=null,o===0&&u('"*"')),t===null&&(e.charCodeAt(a)===95?(t="_",a++):(t=null,o===0&&u('"_"')),t===null&&(e.charCodeAt(a)===43?(t="+",a++):(t=null,o===0&&u('"+"')),t===null&&(e.charCodeAt(a)===96?(t="`",a++):(t=null,o===0&&u('"`"')),t===null&&(e.charCodeAt(a)===39?(t="'",a++):(t=null,o===0&&u(`"'"`)),t===null&&(e.charCodeAt(a)===126?(t="~",a++):(t=null,o===0&&u('"~"')))))))))))),t!==null)for(c=[];t!==null;)c.push(t),t=R(),t===null&&(e.charCodeAt(a)===45?(t="-",a++):(t=null,o===0&&u('"-"')),t===null&&(e.charCodeAt(a)===46?(t=".",a++):(t=null,o===0&&u('"."')),t===null&&(e.charCodeAt(a)===33?(t="!",a++):(t=null,o===0&&u('"!"')),t===null&&(e.charCodeAt(a)===37?(t="%",a++):(t=null,o===0&&u('"%"')),t===null&&(e.charCodeAt(a)===42?(t="*",a++):(t=null,o===0&&u('"*"')),t===null&&(e.charCodeAt(a)===95?(t="_",a++):(t=null,o===0&&u('"_"')),t===null&&(e.charCodeAt(a)===43?(t="+",a++):(t=null,o===0&&u('"+"')),t===null&&(e.charCodeAt(a)===96?(t="`",a++):(t=null,o===0&&u('"`"')),t===null&&(e.charCodeAt(a)===39?(t="'",a++):(t=null,o===0&&u(`"'"`)),t===null&&(e.charCodeAt(a)===126?(t="~",a++):(t=null,o===0&&u('"~"'))))))))))));else c=null;return c!==null&&(c=(function(f){return e.substring(a,f)})(i)),c===null&&(a=i),c}function k1(){var c,t,i;if(i=a,t=R(),t===null&&(e.charCodeAt(a)===45?(t="-",a++):(t=null,o===0&&u('"-"')),t===null&&(e.charCodeAt(a)===33?(t="!",a++):(t=null,o===0&&u('"!"')),t===null&&(e.charCodeAt(a)===37?(t="%",a++):(t=null,o===0&&u('"%"')),t===null&&(e.charCodeAt(a)===42?(t="*",a++):(t=null,o===0&&u('"*"')),t===null&&(e.charCodeAt(a)===95?(t="_",a++):(t=null,o===0&&u('"_"')),t===null&&(e.charCodeAt(a)===43?(t="+",a++):(t=null,o===0&&u('"+"')),t===null&&(e.charCodeAt(a)===96?(t="`",a++):(t=null,o===0&&u('"`"')),t===null&&(e.charCodeAt(a)===39?(t="'",a++):(t=null,o===0&&u(`"'"`)),t===null&&(e.charCodeAt(a)===126?(t="~",a++):(t=null,o===0&&u('"~"'))))))))))),t!==null)for(c=[];t!==null;)c.push(t),t=R(),t===null&&(e.charCodeAt(a)===45?(t="-",a++):(t=null,o===0&&u('"-"')),t===null&&(e.charCodeAt(a)===33?(t="!",a++):(t=null,o===0&&u('"!"')),t===null&&(e.charCodeAt(a)===37?(t="%",a++):(t=null,o===0&&u('"%"')),t===null&&(e.charCodeAt(a)===42?(t="*",a++):(t=null,o===0&&u('"*"')),t===null&&(e.charCodeAt(a)===95?(t="_",a++):(t=null,o===0&&u('"_"')),t===null&&(e.charCodeAt(a)===43?(t="+",a++):(t=null,o===0&&u('"+"')),t===null&&(e.charCodeAt(a)===96?(t="`",a++):(t=null,o===0&&u('"`"')),t===null&&(e.charCodeAt(a)===39?(t="'",a++):(t=null,o===0&&u(`"'"`)),t===null&&(e.charCodeAt(a)===126?(t="~",a++):(t=null,o===0&&u('"~"')))))))))));else c=null;return c!==null&&(c=(function(f){return e.substring(a,f)})(i)),c===null&&(a=i),c}function y4(){var c;return e.charCodeAt(a)===40?(c="(",a++):(c=null,o===0&&u('"("')),c===null&&(e.charCodeAt(a)===41?(c=")",a++):(c=null,o===0&&u('")"')),c===null&&(e.charCodeAt(a)===60?(c="<",a++):(c=null,o===0&&u('"<"')),c===null&&(e.charCodeAt(a)===62?(c=">",a++):(c=null,o===0&&u('">"')),c===null&&(e.charCodeAt(a)===64?(c="@",a++):(c=null,o===0&&u('"@"')),c===null&&(e.charCodeAt(a)===44?(c=",",a++):(c=null,o===0&&u('","')),c===null&&(e.charCodeAt(a)===59?(c=";",a++):(c=null,o===0&&u('";"')),c===null&&(e.charCodeAt(a)===58?(c=":",a++):(c=null,o===0&&u('":"')),c===null&&(e.charCodeAt(a)===92?(c="\\",a++):(c=null,o===0&&u('"\\\\"')),c===null&&(c=g2(),c===null&&(e.charCodeAt(a)===47?(c="/",a++):(c=null,o===0&&u('"/"')),c===null&&(e.charCodeAt(a)===91?(c="[",a++):(c=null,o===0&&u('"["')),c===null&&(e.charCodeAt(a)===93?(c="]",a++):(c=null,o===0&&u('"]"')),c===null&&(e.charCodeAt(a)===63?(c="?",a++):(c=null,o===0&&u('"?"')),c===null&&(e.charCodeAt(a)===61?(c="=",a++):(c=null,o===0&&u('"="')),c===null&&(e.charCodeAt(a)===123?(c="{",a++):(c=null,o===0&&u('"{"')),c===null&&(e.charCodeAt(a)===125?(c="}",a++):(c=null,o===0&&u('"}"')),c===null&&(c=v2(),c===null&&(c=I())))))))))))))))))),c}function S1(){var c,t,i;if(i=a,t=R(),t===null&&(e.charCodeAt(a)===45?(t="-",a++):(t=null,o===0&&u('"-"')),t===null&&(e.charCodeAt(a)===46?(t=".",a++):(t=null,o===0&&u('"."')),t===null&&(e.charCodeAt(a)===33?(t="!",a++):(t=null,o===0&&u('"!"')),t===null&&(e.charCodeAt(a)===37?(t="%",a++):(t=null,o===0&&u('"%"')),t===null&&(e.charCodeAt(a)===42?(t="*",a++):(t=null,o===0&&u('"*"')),t===null&&(e.charCodeAt(a)===95?(t="_",a++):(t=null,o===0&&u('"_"')),t===null&&(e.charCodeAt(a)===43?(t="+",a++):(t=null,o===0&&u('"+"')),t===null&&(e.charCodeAt(a)===96?(t="`",a++):(t=null,o===0&&u('"`"')),t===null&&(e.charCodeAt(a)===39?(t="'",a++):(t=null,o===0&&u(`"'"`)),t===null&&(e.charCodeAt(a)===126?(t="~",a++):(t=null,o===0&&u('"~"')),t===null&&(e.charCodeAt(a)===40?(t="(",a++):(t=null,o===0&&u('"("')),t===null&&(e.charCodeAt(a)===41?(t=")",a++):(t=null,o===0&&u('")"')),t===null&&(e.charCodeAt(a)===60?(t="<",a++):(t=null,o===0&&u('"<"')),t===null&&(e.charCodeAt(a)===62?(t=">",a++):(t=null,o===0&&u('">"')),t===null&&(e.charCodeAt(a)===58?(t=":",a++):(t=null,o===0&&u('":"')),t===null&&(e.charCodeAt(a)===92?(t="\\",a++):(t=null,o===0&&u('"\\\\"')),t===null&&(t=g2(),t===null&&(e.charCodeAt(a)===47?(t="/",a++):(t=null,o===0&&u('"/"')),t===null&&(e.charCodeAt(a)===91?(t="[",a++):(t=null,o===0&&u('"["')),t===null&&(e.charCodeAt(a)===93?(t="]",a++):(t=null,o===0&&u('"]"')),t===null&&(e.charCodeAt(a)===63?(t="?",a++):(t=null,o===0&&u('"?"')),t===null&&(e.charCodeAt(a)===123?(t="{",a++):(t=null,o===0&&u('"{"')),t===null&&(e.charCodeAt(a)===125?(t="}",a++):(t=null,o===0&&u('"}"'))))))))))))))))))))))))),t!==null)for(c=[];t!==null;)c.push(t),t=R(),t===null&&(e.charCodeAt(a)===45?(t="-",a++):(t=null,o===0&&u('"-"')),t===null&&(e.charCodeAt(a)===46?(t=".",a++):(t=null,o===0&&u('"."')),t===null&&(e.charCodeAt(a)===33?(t="!",a++):(t=null,o===0&&u('"!"')),t===null&&(e.charCodeAt(a)===37?(t="%",a++):(t=null,o===0&&u('"%"')),t===null&&(e.charCodeAt(a)===42?(t="*",a++):(t=null,o===0&&u('"*"')),t===null&&(e.charCodeAt(a)===95?(t="_",a++):(t=null,o===0&&u('"_"')),t===null&&(e.charCodeAt(a)===43?(t="+",a++):(t=null,o===0&&u('"+"')),t===null&&(e.charCodeAt(a)===96?(t="`",a++):(t=null,o===0&&u('"`"')),t===null&&(e.charCodeAt(a)===39?(t="'",a++):(t=null,o===0&&u(`"'"`)),t===null&&(e.charCodeAt(a)===126?(t="~",a++):(t=null,o===0&&u('"~"')),t===null&&(e.charCodeAt(a)===40?(t="(",a++):(t=null,o===0&&u('"("')),t===null&&(e.charCodeAt(a)===41?(t=")",a++):(t=null,o===0&&u('")"')),t===null&&(e.charCodeAt(a)===60?(t="<",a++):(t=null,o===0&&u('"<"')),t===null&&(e.charCodeAt(a)===62?(t=">",a++):(t=null,o===0&&u('">"')),t===null&&(e.charCodeAt(a)===58?(t=":",a++):(t=null,o===0&&u('":"')),t===null&&(e.charCodeAt(a)===92?(t="\\",a++):(t=null,o===0&&u('"\\\\"')),t===null&&(t=g2(),t===null&&(e.charCodeAt(a)===47?(t="/",a++):(t=null,o===0&&u('"/"')),t===null&&(e.charCodeAt(a)===91?(t="[",a++):(t=null,o===0&&u('"["')),t===null&&(e.charCodeAt(a)===93?(t="]",a++):(t=null,o===0&&u('"]"')),t===null&&(e.charCodeAt(a)===63?(t="?",a++):(t=null,o===0&&u('"?"')),t===null&&(e.charCodeAt(a)===123?(t="{",a++):(t=null,o===0&&u('"{"')),t===null&&(e.charCodeAt(a)===125?(t="}",a++):(t=null,o===0&&u('"}"')))))))))))))))))))))))));else c=null;return c!==null&&(c=(function(f){return e.substring(a,f)})(i)),c===null&&(a=i),c}function s4(){var c,t,i,f,d;return f=a,d=a,c=l2(),c!==null?(e.charCodeAt(a)===42?(t="*",a++):(t=null,o===0&&u('"*"')),t!==null?(i=l2(),i!==null?c=[c,t,i]:(c=null,a=d)):(c=null,a=d)):(c=null,a=d),c!==null&&(c=(function(p){return"*"})(f)),c===null&&(a=f),c}function R1(){var c,t,i,f,d;return f=a,d=a,c=l2(),c!==null?(e.charCodeAt(a)===47?(t="/",a++):(t=null,o===0&&u('"/"')),t!==null?(i=l2(),i!==null?c=[c,t,i]:(c=null,a=d)):(c=null,a=d)):(c=null,a=d),c!==null&&(c=(function(p){return"/"})(f)),c===null&&(a=f),c}function i2(){var c,t,i,f,d;return f=a,d=a,c=l2(),c!==null?(e.charCodeAt(a)===61?(t="=",a++):(t=null,o===0&&u('"="')),t!==null?(i=l2(),i!==null?c=[c,t,i]:(c=null,a=d)):(c=null,a=d)):(c=null,a=d),c!==null&&(c=(function(p){return"="})(f)),c===null&&(a=f),c}function Q(){var c,t,i,f,d;return f=a,d=a,c=l2(),c!==null?(e.charCodeAt(a)===40?(t="(",a++):(t=null,o===0&&u('"("')),t!==null?(i=l2(),i!==null?c=[c,t,i]:(c=null,a=d)):(c=null,a=d)):(c=null,a=d),c!==null&&(c=(function(p){return"("})(f)),c===null&&(a=f),c}function j(){var c,t,i,f,d;return f=a,d=a,c=l2(),c!==null?(e.charCodeAt(a)===41?(t=")",a++):(t=null,o===0&&u('")"')),t!==null?(i=l2(),i!==null?c=[c,t,i]:(c=null,a=d)):(c=null,a=d)):(c=null,a=d),c!==null&&(c=(function(p){return")"})(f)),c===null&&(a=f),c}function a2(){var c,t,i,f;return i=a,f=a,e.charCodeAt(a)===62?(c=">",a++):(c=null,o===0&&u('">"')),c!==null?(t=l2(),t!==null?c=[c,t]:(c=null,a=f)):(c=null,a=f),c!==null&&(c=(function(d){return">"})(i)),c===null&&(a=i),c}function t2(){var c,t,i,f;return i=a,f=a,c=l2(),c!==null?(e.charCodeAt(a)===60?(t="<",a++):(t=null,o===0&&u('"<"')),t!==null?c=[c,t]:(c=null,a=f)):(c=null,a=f),c!==null&&(c=(function(d){return"<"})(i)),c===null&&(a=i),c}function e2(){var c,t,i,f,d;return f=a,d=a,c=l2(),c!==null?(e.charCodeAt(a)===44?(t=",",a++):(t=null,o===0&&u('","')),t!==null?(i=l2(),i!==null?c=[c,t,i]:(c=null,a=d)):(c=null,a=d)):(c=null,a=d),c!==null&&(c=(function(p){return","})(f)),c===null&&(a=f),c}function K(){var c,t,i,f,d;return f=a,d=a,c=l2(),c!==null?(e.charCodeAt(a)===59?(t=";",a++):(t=null,o===0&&u('";"')),t!==null?(i=l2(),i!==null?c=[c,t,i]:(c=null,a=d)):(c=null,a=d)):(c=null,a=d),c!==null&&(c=(function(p){return";"})(f)),c===null&&(a=f),c}function z2(){var c,t,i,f,d;return f=a,d=a,c=l2(),c!==null?(e.charCodeAt(a)===58?(t=":",a++):(t=null,o===0&&u('":"')),t!==null?(i=l2(),i!==null?c=[c,t,i]:(c=null,a=d)):(c=null,a=d)):(c=null,a=d),c!==null&&(c=(function(p){return":"})(f)),c===null&&(a=f),c}function V1(){var c,t,i,f;return i=a,f=a,c=l2(),c!==null?(t=g2(),t!==null?c=[c,t]:(c=null,a=f)):(c=null,a=f),c!==null&&(c=(function(d){return'"'})(i)),c===null&&(a=i),c}function e1(){var c,t,i,f;return i=a,f=a,c=g2(),c!==null?(t=l2(),t!==null?c=[c,t]:(c=null,a=f)):(c=null,a=f),c!==null&&(c=(function(d){return'"'})(i)),c===null&&(a=i),c}function i6(){var c,t,i,f;if(f=a,c=Q(),c!==null){for(t=[],i=n6(),i===null&&(i=c4(),i===null&&(i=i6()));i!==null;)t.push(i),i=n6(),i===null&&(i=c4(),i===null&&(i=i6()));t!==null?(i=j(),i!==null?c=[c,t,i]:(c=null,a=f)):(c=null,a=f)}else c=null,a=f;return c}function n6(){var c;return/^[!-']/.test(e.charAt(a))?(c=e.charAt(a),a++):(c=null,o===0&&u("[!-']")),c===null&&(/^[*-[]/.test(e.charAt(a))?(c=e.charAt(a),a++):(c=null,o===0&&u("[*-[]")),c===null&&(/^[\]-~]/.test(e.charAt(a))?(c=e.charAt(a),a++):(c=null,o===0&&u("[\\]-~]")),c===null&&(c=v1(),c===null&&(c=V())))),c}function O3(){var c,t,i,f,d,p;if(d=a,p=a,c=l2(),c!==null)if(t=g2(),t!==null){for(i=[],f=K4(),f===null&&(f=c4());f!==null;)i.push(f),f=K4(),f===null&&(f=c4());i!==null?(f=g2(),f!==null?c=[c,t,i,f]:(c=null,a=p)):(c=null,a=p)}else c=null,a=p;else c=null,a=p;return c!==null&&(c=(function(g){return e.substring(a,g)})(d)),c===null&&(a=d),c}function j4(){var c,t,i,f,d,p;if(d=a,p=a,c=l2(),c!==null)if(t=g2(),t!==null){for(i=[],f=K4(),f===null&&(f=c4());f!==null;)i.push(f),f=K4(),f===null&&(f=c4());i!==null?(f=g2(),f!==null?c=[c,t,i,f]:(c=null,a=p)):(c=null,a=p)}else c=null,a=p;else c=null,a=p;return c!==null&&(c=(function(g){var L=e.substring(a,g).trim();return L.substring(1,L.length-1).replace(/\\([\x00-\x09\x0b-\x0c\x0e-\x7f])/g,"$1")})(d)),c===null&&(a=d),c}function K4(){var c;return c=V(),c===null&&(e.charCodeAt(a)===33?(c="!",a++):(c=null,o===0&&u('"!"')),c===null&&(/^[#-[]/.test(e.charAt(a))?(c=e.charAt(a),a++):(c=null,o===0&&u("[#-[]")),c===null&&(/^[\]-~]/.test(e.charAt(a))?(c=e.charAt(a),a++):(c=null,o===0&&u("[\\]-~]")),c===null&&(c=v1())))),c}function c4(){var c,t,i;return i=a,e.charCodeAt(a)===92?(c="\\",a++):(c=null,o===0&&u('"\\\\"')),c!==null?(/^[\0-\t]/.test(e.charAt(a))?(t=e.charAt(a),a++):(t=null,o===0&&u("[\\0-\\t]")),t===null&&(/^[\x0B-\f]/.test(e.charAt(a))?(t=e.charAt(a),a++):(t=null,o===0&&u("[\\x0B-\\f]")),t===null&&(/^[\x0E-]/.test(e.charAt(a))?(t=e.charAt(a),a++):(t=null,o===0&&u("[\\x0E-\x7F]")))),t!==null?c=[c,t]:(c=null,a=i)):(c=null,a=i),c}function Y4(){var c,t,i,f,d,p;return d=a,p=a,c=o6(),c!==null?(e.charCodeAt(a)===58?(t=":",a++):(t=null,o===0&&u('":"')),t!==null?(i=q3(),i=i!==null?i:"",i!==null?(f=G3(),f!==null?c=[c,t,i,f]:(c=null,a=p)):(c=null,a=p)):(c=null,a=p)):(c=null,a=p),c!==null&&(c=(function(g){try{M.uri=new ya(M.scheme,M.user,M.host,M.port),delete M.scheme,delete M.user,delete M.host,delete M.host_type,delete M.port}catch{M=-1}})(d)),c===null&&(a=d),c}function B3(){var c,t,i,f,d,p,g,L;return g=a,L=a,c=o6(),c!==null?(e.charCodeAt(a)===58?(t=":",a++):(t=null,o===0&&u('":"')),t!==null?(i=q3(),i=i!==null?i:"",i!==null?(f=G3(),f!==null?(d=j8(),d!==null?(p=l5(),p=p!==null?p:"",p!==null?c=[c,t,i,f,d,p]:(c=null,a=L)):(c=null,a=L)):(c=null,a=L)):(c=null,a=L)):(c=null,a=L)):(c=null,a=L),c!==null&&(c=(function(N){var q;try{M.uri=new ya(M.scheme,M.user,M.host,M.port,M.uri_params,M.uri_headers),delete M.scheme,delete M.user,delete M.host,delete M.host_type,delete M.port,delete M.uri_params,l==="SIP_URI"&&(M=M.uri)}catch{M=-1}})(g)),c===null&&(a=g),c}function o6(){var c;return c=O8(),c===null&&(c=B8()),c}function O8(){var c,t;return t=a,e.substr(a,4).toLowerCase()==="sips"?(c=e.substr(a,4),a+=4):(c=null,o===0&&u('"sips"')),c!==null&&(c=(function(i,f){M.scheme=f.toLowerCase()})(t,c)),c===null&&(a=t),c}function B8(){var c,t;return t=a,e.substr(a,3).toLowerCase()==="sip"?(c=e.substr(a,3),a+=3):(c=null,o===0&&u('"sip"')),c!==null&&(c=(function(i,f){M.scheme=f.toLowerCase()})(t,c)),c===null&&(a=t),c}function q3(){var c,t,i,f,d,p;return f=a,d=a,c=q8(),c!==null?(p=a,e.charCodeAt(a)===58?(t=":",a++):(t=null,o===0&&u('":"')),t!==null?(i=G8(),i!==null?t=[t,i]:(t=null,a=p)):(t=null,a=p),t=t!==null?t:"",t!==null?(e.charCodeAt(a)===64?(i="@",a++):(i=null,o===0&&u('"@"')),i!==null?c=[c,t,i]:(c=null,a=d)):(c=null,a=d)):(c=null,a=d),c!==null&&(c=(function(g){M.user=decodeURIComponent(e.substring(a-1,g))})(f)),c===null&&(a=f),c}function q8(){var c,t;if(t=A(),t===null&&(t=G(),t===null&&(t=f6())),t!==null)for(c=[];t!==null;)c.push(t),t=A(),t===null&&(t=G(),t===null&&(t=f6()));else c=null;return c}function f6(){var c;return e.charCodeAt(a)===38?(c="&",a++):(c=null,o===0&&u('"&"')),c===null&&(e.charCodeAt(a)===61?(c="=",a++):(c=null,o===0&&u('"="')),c===null&&(e.charCodeAt(a)===43?(c="+",a++):(c=null,o===0&&u('"+"')),c===null&&(e.charCodeAt(a)===36?(c="$",a++):(c=null,o===0&&u('"$"')),c===null&&(e.charCodeAt(a)===44?(c=",",a++):(c=null,o===0&&u('","')),c===null&&(e.charCodeAt(a)===59?(c=";",a++):(c=null,o===0&&u('";"')),c===null&&(e.charCodeAt(a)===63?(c="?",a++):(c=null,o===0&&u('"?"')),c===null&&(e.charCodeAt(a)===47?(c="/",a++):(c=null,o===0&&u('"/"'))))))))),c}function G8(){var c,t,i;for(i=a,c=[],t=A(),t===null&&(t=G(),t===null&&(e.charCodeAt(a)===38?(t="&",a++):(t=null,o===0&&u('"&"')),t===null&&(e.charCodeAt(a)===61?(t="=",a++):(t=null,o===0&&u('"="')),t===null&&(e.charCodeAt(a)===43?(t="+",a++):(t=null,o===0&&u('"+"')),t===null&&(e.charCodeAt(a)===36?(t="$",a++):(t=null,o===0&&u('"$"')),t===null&&(e.charCodeAt(a)===44?(t=",",a++):(t=null,o===0&&u('","'))))))));t!==null;)c.push(t),t=A(),t===null&&(t=G(),t===null&&(e.charCodeAt(a)===38?(t="&",a++):(t=null,o===0&&u('"&"')),t===null&&(e.charCodeAt(a)===61?(t="=",a++):(t=null,o===0&&u('"="')),t===null&&(e.charCodeAt(a)===43?(t="+",a++):(t=null,o===0&&u('"+"')),t===null&&(e.charCodeAt(a)===36?(t="$",a++):(t=null,o===0&&u('"$"')),t===null&&(e.charCodeAt(a)===44?(t=",",a++):(t=null,o===0&&u('","'))))))));return c!==null&&(c=(function(f){M.password=e.substring(a,f)})(i)),c===null&&(a=i),c}function G3(){var c,t,i,f,d;return f=a,c=X4(),c!==null?(d=a,e.charCodeAt(a)===58?(t=":",a++):(t=null,o===0&&u('":"')),t!==null?(i=V8(),i!==null?t=[t,i]:(t=null,a=d)):(t=null,a=d),t=t!==null?t:"",t!==null?c=[c,t]:(c=null,a=f)):(c=null,a=f),c}function X4(){var c,t;return t=a,c=u6(),c===null&&(c=J4(),c===null&&(c=p6())),c!==null&&(c=(function(i){return M.host=e.substring(a,i).toLowerCase(),M.host})(t)),c===null&&(a=t),c}function u6(){var c,t,i,f,d,p;for(f=a,d=a,c=[],p=a,t=d6(),t!==null?(e.charCodeAt(a)===46?(i=".",a++):(i=null,o===0&&u('"."')),i!==null?t=[t,i]:(t=null,a=p)):(t=null,a=p);t!==null;)c.push(t),p=a,t=d6(),t!==null?(e.charCodeAt(a)===46?(i=".",a++):(i=null,o===0&&u('"."')),i!==null?t=[t,i]:(t=null,a=p)):(t=null,a=p);return c!==null?(t=W8(),t!==null?(e.charCodeAt(a)===46?(i=".",a++):(i=null,o===0&&u('"."')),i=i!==null?i:"",i!==null?c=[c,t,i]:(c=null,a=d)):(c=null,a=d)):(c=null,a=d),c!==null&&(c=(function(g){return M.host_type="domain",e.substring(a,g)})(f)),c===null&&(a=f),c}function d6(){var c,t,i,f;if(f=a,c=R(),c!==null){for(t=[],i=R(),i===null&&(e.charCodeAt(a)===45?(i="-",a++):(i=null,o===0&&u('"-"')),i===null&&(e.charCodeAt(a)===95?(i="_",a++):(i=null,o===0&&u('"_"'))));i!==null;)t.push(i),i=R(),i===null&&(e.charCodeAt(a)===45?(i="-",a++):(i=null,o===0&&u('"-"')),i===null&&(e.charCodeAt(a)===95?(i="_",a++):(i=null,o===0&&u('"_"'))));t!==null?c=[c,t]:(c=null,a=f)}else c=null,a=f;return c}function W8(){var c,t,i,f;if(f=a,c=S(),c!==null){for(t=[],i=R(),i===null&&(e.charCodeAt(a)===45?(i="-",a++):(i=null,o===0&&u('"-"')),i===null&&(e.charCodeAt(a)===95?(i="_",a++):(i=null,o===0&&u('"_"'))));i!==null;)t.push(i),i=R(),i===null&&(e.charCodeAt(a)===45?(i="-",a++):(i=null,o===0&&u('"-"')),i===null&&(e.charCodeAt(a)===95?(i="_",a++):(i=null,o===0&&u('"_"'))));t!==null?c=[c,t]:(c=null,a=f)}else c=null,a=f;return c}function p6(){var c,t,i,f,d;return f=a,d=a,e.charCodeAt(a)===91?(c="[",a++):(c=null,o===0&&u('"["')),c!==null?(t=h6(),t!==null?(e.charCodeAt(a)===93?(i="]",a++):(i=null,o===0&&u('"]"')),i!==null?c=[c,t,i]:(c=null,a=d)):(c=null,a=d)):(c=null,a=d),c!==null&&(c=(function(p){return M.host_type="IPv6",e.substring(a,p)})(f)),c===null&&(a=f),c}function h6(){var c,t,i,f,d,p,g,L,N,q,d2,w1,l0,R6,x,B;return R6=a,x=a,c=O(),c!==null?(e.charCodeAt(a)===58?(t=":",a++):(t=null,o===0&&u('":"')),t!==null?(i=O(),i!==null?(e.charCodeAt(a)===58?(f=":",a++):(f=null,o===0&&u('":"')),f!==null?(d=O(),d!==null?(e.charCodeAt(a)===58?(p=":",a++):(p=null,o===0&&u('":"')),p!==null?(g=O(),g!==null?(e.charCodeAt(a)===58?(L=":",a++):(L=null,o===0&&u('":"')),L!==null?(N=O(),N!==null?(e.charCodeAt(a)===58?(q=":",a++):(q=null,o===0&&u('":"')),q!==null?(d2=O(),d2!==null?(e.charCodeAt(a)===58?(w1=":",a++):(w1=null,o===0&&u('":"')),w1!==null?(l0=a1(),l0!==null?c=[c,t,i,f,d,p,g,L,N,q,d2,w1,l0]:(c=null,a=x)):(c=null,a=x)):(c=null,a=x)):(c=null,a=x)):(c=null,a=x)):(c=null,a=x)):(c=null,a=x)):(c=null,a=x)):(c=null,a=x)):(c=null,a=x)):(c=null,a=x)):(c=null,a=x)):(c=null,a=x),c===null&&(x=a,e.substr(a,2)==="::"?(c="::",a+=2):(c=null,o===0&&u('"::"')),c!==null?(t=O(),t!==null?(e.charCodeAt(a)===58?(i=":",a++):(i=null,o===0&&u('":"')),i!==null?(f=O(),f!==null?(e.charCodeAt(a)===58?(d=":",a++):(d=null,o===0&&u('":"')),d!==null?(p=O(),p!==null?(e.charCodeAt(a)===58?(g=":",a++):(g=null,o===0&&u('":"')),g!==null?(L=O(),L!==null?(e.charCodeAt(a)===58?(N=":",a++):(N=null,o===0&&u('":"')),N!==null?(q=O(),q!==null?(e.charCodeAt(a)===58?(d2=":",a++):(d2=null,o===0&&u('":"')),d2!==null?(w1=a1(),w1!==null?c=[c,t,i,f,d,p,g,L,N,q,d2,w1]:(c=null,a=x)):(c=null,a=x)):(c=null,a=x)):(c=null,a=x)):(c=null,a=x)):(c=null,a=x)):(c=null,a=x)):(c=null,a=x)):(c=null,a=x)):(c=null,a=x)):(c=null,a=x)):(c=null,a=x),c===null&&(x=a,e.substr(a,2)==="::"?(c="::",a+=2):(c=null,o===0&&u('"::"')),c!==null?(t=O(),t!==null?(e.charCodeAt(a)===58?(i=":",a++):(i=null,o===0&&u('":"')),i!==null?(f=O(),f!==null?(e.charCodeAt(a)===58?(d=":",a++):(d=null,o===0&&u('":"')),d!==null?(p=O(),p!==null?(e.charCodeAt(a)===58?(g=":",a++):(g=null,o===0&&u('":"')),g!==null?(L=O(),L!==null?(e.charCodeAt(a)===58?(N=":",a++):(N=null,o===0&&u('":"')),N!==null?(q=a1(),q!==null?c=[c,t,i,f,d,p,g,L,N,q]:(c=null,a=x)):(c=null,a=x)):(c=null,a=x)):(c=null,a=x)):(c=null,a=x)):(c=null,a=x)):(c=null,a=x)):(c=null,a=x)):(c=null,a=x)):(c=null,a=x),c===null&&(x=a,e.substr(a,2)==="::"?(c="::",a+=2):(c=null,o===0&&u('"::"')),c!==null?(t=O(),t!==null?(e.charCodeAt(a)===58?(i=":",a++):(i=null,o===0&&u('":"')),i!==null?(f=O(),f!==null?(e.charCodeAt(a)===58?(d=":",a++):(d=null,o===0&&u('":"')),d!==null?(p=O(),p!==null?(e.charCodeAt(a)===58?(g=":",a++):(g=null,o===0&&u('":"')),g!==null?(L=a1(),L!==null?c=[c,t,i,f,d,p,g,L]:(c=null,a=x)):(c=null,a=x)):(c=null,a=x)):(c=null,a=x)):(c=null,a=x)):(c=null,a=x)):(c=null,a=x)):(c=null,a=x),c===null&&(x=a,e.substr(a,2)==="::"?(c="::",a+=2):(c=null,o===0&&u('"::"')),c!==null?(t=O(),t!==null?(e.charCodeAt(a)===58?(i=":",a++):(i=null,o===0&&u('":"')),i!==null?(f=O(),f!==null?(e.charCodeAt(a)===58?(d=":",a++):(d=null,o===0&&u('":"')),d!==null?(p=a1(),p!==null?c=[c,t,i,f,d,p]:(c=null,a=x)):(c=null,a=x)):(c=null,a=x)):(c=null,a=x)):(c=null,a=x)):(c=null,a=x),c===null&&(x=a,e.substr(a,2)==="::"?(c="::",a+=2):(c=null,o===0&&u('"::"')),c!==null?(t=O(),t!==null?(e.charCodeAt(a)===58?(i=":",a++):(i=null,o===0&&u('":"')),i!==null?(f=a1(),f!==null?c=[c,t,i,f]:(c=null,a=x)):(c=null,a=x)):(c=null,a=x)):(c=null,a=x),c===null&&(x=a,e.substr(a,2)==="::"?(c="::",a+=2):(c=null,o===0&&u('"::"')),c!==null?(t=a1(),t!==null?c=[c,t]:(c=null,a=x)):(c=null,a=x),c===null&&(x=a,e.substr(a,2)==="::"?(c="::",a+=2):(c=null,o===0&&u('"::"')),c!==null?(t=O(),t!==null?c=[c,t]:(c=null,a=x)):(c=null,a=x),c===null&&(x=a,c=O(),c!==null?(e.substr(a,2)==="::"?(t="::",a+=2):(t=null,o===0&&u('"::"')),t!==null?(i=O(),i!==null?(e.charCodeAt(a)===58?(f=":",a++):(f=null,o===0&&u('":"')),f!==null?(d=O(),d!==null?(e.charCodeAt(a)===58?(p=":",a++):(p=null,o===0&&u('":"')),p!==null?(g=O(),g!==null?(e.charCodeAt(a)===58?(L=":",a++):(L=null,o===0&&u('":"')),L!==null?(N=O(),N!==null?(e.charCodeAt(a)===58?(q=":",a++):(q=null,o===0&&u('":"')),q!==null?(d2=a1(),d2!==null?c=[c,t,i,f,d,p,g,L,N,q,d2]:(c=null,a=x)):(c=null,a=x)):(c=null,a=x)):(c=null,a=x)):(c=null,a=x)):(c=null,a=x)):(c=null,a=x)):(c=null,a=x)):(c=null,a=x)):(c=null,a=x)):(c=null,a=x),c===null&&(x=a,c=O(),c!==null?(B=a,e.charCodeAt(a)===58?(t=":",a++):(t=null,o===0&&u('":"')),t!==null?(i=O(),i!==null?t=[t,i]:(t=null,a=B)):(t=null,a=B),t=t!==null?t:"",t!==null?(e.substr(a,2)==="::"?(i="::",a+=2):(i=null,o===0&&u('"::"')),i!==null?(f=O(),f!==null?(e.charCodeAt(a)===58?(d=":",a++):(d=null,o===0&&u('":"')),d!==null?(p=O(),p!==null?(e.charCodeAt(a)===58?(g=":",a++):(g=null,o===0&&u('":"')),g!==null?(L=O(),L!==null?(e.charCodeAt(a)===58?(N=":",a++):(N=null,o===0&&u('":"')),N!==null?(q=a1(),q!==null?c=[c,t,i,f,d,p,g,L,N,q]:(c=null,a=x)):(c=null,a=x)):(c=null,a=x)):(c=null,a=x)):(c=null,a=x)):(c=null,a=x)):(c=null,a=x)):(c=null,a=x)):(c=null,a=x)):(c=null,a=x),c===null&&(x=a,c=O(),c!==null?(B=a,e.charCodeAt(a)===58?(t=":",a++):(t=null,o===0&&u('":"')),t!==null?(i=O(),i!==null?t=[t,i]:(t=null,a=B)):(t=null,a=B),t=t!==null?t:"",t!==null?(B=a,e.charCodeAt(a)===58?(i=":",a++):(i=null,o===0&&u('":"')),i!==null?(f=O(),f!==null?i=[i,f]:(i=null,a=B)):(i=null,a=B),i=i!==null?i:"",i!==null?(e.substr(a,2)==="::"?(f="::",a+=2):(f=null,o===0&&u('"::"')),f!==null?(d=O(),d!==null?(e.charCodeAt(a)===58?(p=":",a++):(p=null,o===0&&u('":"')),p!==null?(g=O(),g!==null?(e.charCodeAt(a)===58?(L=":",a++):(L=null,o===0&&u('":"')),L!==null?(N=a1(),N!==null?c=[c,t,i,f,d,p,g,L,N]:(c=null,a=x)):(c=null,a=x)):(c=null,a=x)):(c=null,a=x)):(c=null,a=x)):(c=null,a=x)):(c=null,a=x)):(c=null,a=x)):(c=null,a=x),c===null&&(x=a,c=O(),c!==null?(B=a,e.charCodeAt(a)===58?(t=":",a++):(t=null,o===0&&u('":"')),t!==null?(i=O(),i!==null?t=[t,i]:(t=null,a=B)):(t=null,a=B),t=t!==null?t:"",t!==null?(B=a,e.charCodeAt(a)===58?(i=":",a++):(i=null,o===0&&u('":"')),i!==null?(f=O(),f!==null?i=[i,f]:(i=null,a=B)):(i=null,a=B),i=i!==null?i:"",i!==null?(B=a,e.charCodeAt(a)===58?(f=":",a++):(f=null,o===0&&u('":"')),f!==null?(d=O(),d!==null?f=[f,d]:(f=null,a=B)):(f=null,a=B),f=f!==null?f:"",f!==null?(e.substr(a,2)==="::"?(d="::",a+=2):(d=null,o===0&&u('"::"')),d!==null?(p=O(),p!==null?(e.charCodeAt(a)===58?(g=":",a++):(g=null,o===0&&u('":"')),g!==null?(L=a1(),L!==null?c=[c,t,i,f,d,p,g,L]:(c=null,a=x)):(c=null,a=x)):(c=null,a=x)):(c=null,a=x)):(c=null,a=x)):(c=null,a=x)):(c=null,a=x)):(c=null,a=x),c===null&&(x=a,c=O(),c!==null?(B=a,e.charCodeAt(a)===58?(t=":",a++):(t=null,o===0&&u('":"')),t!==null?(i=O(),i!==null?t=[t,i]:(t=null,a=B)):(t=null,a=B),t=t!==null?t:"",t!==null?(B=a,e.charCodeAt(a)===58?(i=":",a++):(i=null,o===0&&u('":"')),i!==null?(f=O(),f!==null?i=[i,f]:(i=null,a=B)):(i=null,a=B),i=i!==null?i:"",i!==null?(B=a,e.charCodeAt(a)===58?(f=":",a++):(f=null,o===0&&u('":"')),f!==null?(d=O(),d!==null?f=[f,d]:(f=null,a=B)):(f=null,a=B),f=f!==null?f:"",f!==null?(B=a,e.charCodeAt(a)===58?(d=":",a++):(d=null,o===0&&u('":"')),d!==null?(p=O(),p!==null?d=[d,p]:(d=null,a=B)):(d=null,a=B),d=d!==null?d:"",d!==null?(e.substr(a,2)==="::"?(p="::",a+=2):(p=null,o===0&&u('"::"')),p!==null?(g=a1(),g!==null?c=[c,t,i,f,d,p,g]:(c=null,a=x)):(c=null,a=x)):(c=null,a=x)):(c=null,a=x)):(c=null,a=x)):(c=null,a=x)):(c=null,a=x),c===null&&(x=a,c=O(),c!==null?(B=a,e.charCodeAt(a)===58?(t=":",a++):(t=null,o===0&&u('":"')),t!==null?(i=O(),i!==null?t=[t,i]:(t=null,a=B)):(t=null,a=B),t=t!==null?t:"",t!==null?(B=a,e.charCodeAt(a)===58?(i=":",a++):(i=null,o===0&&u('":"')),i!==null?(f=O(),f!==null?i=[i,f]:(i=null,a=B)):(i=null,a=B),i=i!==null?i:"",i!==null?(B=a,e.charCodeAt(a)===58?(f=":",a++):(f=null,o===0&&u('":"')),f!==null?(d=O(),d!==null?f=[f,d]:(f=null,a=B)):(f=null,a=B),f=f!==null?f:"",f!==null?(B=a,e.charCodeAt(a)===58?(d=":",a++):(d=null,o===0&&u('":"')),d!==null?(p=O(),p!==null?d=[d,p]:(d=null,a=B)):(d=null,a=B),d=d!==null?d:"",d!==null?(B=a,e.charCodeAt(a)===58?(p=":",a++):(p=null,o===0&&u('":"')),p!==null?(g=O(),g!==null?p=[p,g]:(p=null,a=B)):(p=null,a=B),p=p!==null?p:"",p!==null?(e.substr(a,2)==="::"?(g="::",a+=2):(g=null,o===0&&u('"::"')),g!==null?(L=O(),L!==null?c=[c,t,i,f,d,p,g,L]:(c=null,a=x)):(c=null,a=x)):(c=null,a=x)):(c=null,a=x)):(c=null,a=x)):(c=null,a=x)):(c=null,a=x)):(c=null,a=x),c===null&&(x=a,c=O(),c!==null?(B=a,e.charCodeAt(a)===58?(t=":",a++):(t=null,o===0&&u('":"')),t!==null?(i=O(),i!==null?t=[t,i]:(t=null,a=B)):(t=null,a=B),t=t!==null?t:"",t!==null?(B=a,e.charCodeAt(a)===58?(i=":",a++):(i=null,o===0&&u('":"')),i!==null?(f=O(),f!==null?i=[i,f]:(i=null,a=B)):(i=null,a=B),i=i!==null?i:"",i!==null?(B=a,e.charCodeAt(a)===58?(f=":",a++):(f=null,o===0&&u('":"')),f!==null?(d=O(),d!==null?f=[f,d]:(f=null,a=B)):(f=null,a=B),f=f!==null?f:"",f!==null?(B=a,e.charCodeAt(a)===58?(d=":",a++):(d=null,o===0&&u('":"')),d!==null?(p=O(),p!==null?d=[d,p]:(d=null,a=B)):(d=null,a=B),d=d!==null?d:"",d!==null?(B=a,e.charCodeAt(a)===58?(p=":",a++):(p=null,o===0&&u('":"')),p!==null?(g=O(),g!==null?p=[p,g]:(p=null,a=B)):(p=null,a=B),p=p!==null?p:"",p!==null?(B=a,e.charCodeAt(a)===58?(g=":",a++):(g=null,o===0&&u('":"')),g!==null?(L=O(),L!==null?g=[g,L]:(g=null,a=B)):(g=null,a=B),g=g!==null?g:"",g!==null?(e.substr(a,2)==="::"?(L="::",a+=2):(L=null,o===0&&u('"::"')),L!==null?c=[c,t,i,f,d,p,g,L]:(c=null,a=x)):(c=null,a=x)):(c=null,a=x)):(c=null,a=x)):(c=null,a=x)):(c=null,a=x)):(c=null,a=x)):(c=null,a=x))))))))))))))),c!==null&&(c=(function(oi){return M.host_type="IPv6",e.substring(a,oi)})(R6)),c===null&&(a=R6),c}function O(){var c,t,i,f,d;return d=a,c=y(),c!==null?(t=y(),t=t!==null?t:"",t!==null?(i=y(),i=i!==null?i:"",i!==null?(f=y(),f=f!==null?f:"",f!==null?c=[c,t,i,f]:(c=null,a=d)):(c=null,a=d)):(c=null,a=d)):(c=null,a=d),c}function a1(){var c,t,i,f;return f=a,c=O(),c!==null?(e.charCodeAt(a)===58?(t=":",a++):(t=null,o===0&&u('":"')),t!==null?(i=O(),i!==null?c=[c,t,i]:(c=null,a=f)):(c=null,a=f)):(c=null,a=f),c===null&&(c=J4()),c}function J4(){var c,t,i,f,d,p,g,L,N;return L=a,N=a,c=Q4(),c!==null?(e.charCodeAt(a)===46?(t=".",a++):(t=null,o===0&&u('"."')),t!==null?(i=Q4(),i!==null?(e.charCodeAt(a)===46?(f=".",a++):(f=null,o===0&&u('"."')),f!==null?(d=Q4(),d!==null?(e.charCodeAt(a)===46?(p=".",a++):(p=null,o===0&&u('"."')),p!==null?(g=Q4(),g!==null?c=[c,t,i,f,d,p,g]:(c=null,a=N)):(c=null,a=N)):(c=null,a=N)):(c=null,a=N)):(c=null,a=N)):(c=null,a=N)):(c=null,a=N),c!==null&&(c=(function(q){return M.host_type="IPv4",e.substring(a,q)})(L)),c===null&&(a=L),c}function Q4(){var c,t,i,f;return f=a,e.substr(a,2)==="25"?(c="25",a+=2):(c=null,o===0&&u('"25"')),c!==null?(/^[0-5]/.test(e.charAt(a))?(t=e.charAt(a),a++):(t=null,o===0&&u("[0-5]")),t!==null?c=[c,t]:(c=null,a=f)):(c=null,a=f),c===null&&(f=a,e.charCodeAt(a)===50?(c="2",a++):(c=null,o===0&&u('"2"')),c!==null?(/^[0-4]/.test(e.charAt(a))?(t=e.charAt(a),a++):(t=null,o===0&&u("[0-4]")),t!==null?(i=b(),i!==null?c=[c,t,i]:(c=null,a=f)):(c=null,a=f)):(c=null,a=f),c===null&&(f=a,e.charCodeAt(a)===49?(c="1",a++):(c=null,o===0&&u('"1"')),c!==null?(t=b(),t!==null?(i=b(),i!==null?c=[c,t,i]:(c=null,a=f)):(c=null,a=f)):(c=null,a=f),c===null&&(f=a,/^[1-9]/.test(e.charAt(a))?(c=e.charAt(a),a++):(c=null,o===0&&u("[1-9]")),c!==null?(t=b(),t!==null?c=[c,t]:(c=null,a=f)):(c=null,a=f),c===null&&(c=b())))),c}function V8(){var c,t,i,f,d,p,g;return p=a,g=a,c=b(),c=c!==null?c:"",c!==null?(t=b(),t=t!==null?t:"",t!==null?(i=b(),i=i!==null?i:"",i!==null?(f=b(),f=f!==null?f:"",f!==null?(d=b(),d=d!==null?d:"",d!==null?c=[c,t,i,f,d]:(c=null,a=g)):(c=null,a=g)):(c=null,a=g)):(c=null,a=g)):(c=null,a=g),c!==null&&(c=(function(L,N){return N=parseInt(N.join("")),M.port=N,N})(p,c)),c===null&&(a=p),c}function j8(){var c,t,i,f;for(c=[],f=a,e.charCodeAt(a)===59?(t=";",a++):(t=null,o===0&&u('";"')),t!==null?(i=m6(),i!==null?t=[t,i]:(t=null,a=f)):(t=null,a=f);t!==null;)c.push(t),f=a,e.charCodeAt(a)===59?(t=";",a++):(t=null,o===0&&u('";"')),t!==null?(i=m6(),i!==null?t=[t,i]:(t=null,a=f)):(t=null,a=f);return c}function m6(){var c;return c=K8(),c===null&&(c=Y8(),c===null&&(c=X8(),c===null&&(c=J8(),c===null&&(c=Q8(),c===null&&(c=Z8(),c===null&&(c=e5())))))),c}function K8(){var c,t,i,f;return i=a,f=a,e.substr(a,10).toLowerCase()==="transport="?(c=e.substr(a,10),a+=10):(c=null,o===0&&u('"transport="')),c!==null?(e.substr(a,3).toLowerCase()==="udp"?(t=e.substr(a,3),a+=3):(t=null,o===0&&u('"udp"')),t===null&&(e.substr(a,3).toLowerCase()==="tcp"?(t=e.substr(a,3),a+=3):(t=null,o===0&&u('"tcp"')),t===null&&(e.substr(a,4).toLowerCase()==="sctp"?(t=e.substr(a,4),a+=4):(t=null,o===0&&u('"sctp"')),t===null&&(e.substr(a,3).toLowerCase()==="tls"?(t=e.substr(a,3),a+=3):(t=null,o===0&&u('"tls"')),t===null&&(t=W())))),t!==null?c=[c,t]:(c=null,a=f)):(c=null,a=f),c!==null&&(c=(function(d,p){M.uri_params||(M.uri_params={}),M.uri_params.transport=p.toLowerCase()})(i,c[1])),c===null&&(a=i),c}function Y8(){var c,t,i,f;return i=a,f=a,e.substr(a,5).toLowerCase()==="user="?(c=e.substr(a,5),a+=5):(c=null,o===0&&u('"user="')),c!==null?(e.substr(a,5).toLowerCase()==="phone"?(t=e.substr(a,5),a+=5):(t=null,o===0&&u('"phone"')),t===null&&(e.substr(a,2).toLowerCase()==="ip"?(t=e.substr(a,2),a+=2):(t=null,o===0&&u('"ip"')),t===null&&(t=W())),t!==null?c=[c,t]:(c=null,a=f)):(c=null,a=f),c!==null&&(c=(function(d,p){M.uri_params||(M.uri_params={}),M.uri_params.user=p.toLowerCase()})(i,c[1])),c===null&&(a=i),c}function X8(){var c,t,i,f;return i=a,f=a,e.substr(a,7).toLowerCase()==="method="?(c=e.substr(a,7),a+=7):(c=null,o===0&&u('"method="')),c!==null?(t=K3(),t!==null?c=[c,t]:(c=null,a=f)):(c=null,a=f),c!==null&&(c=(function(d,p){M.uri_params||(M.uri_params={}),M.uri_params.method=p})(i,c[1])),c===null&&(a=i),c}function J8(){var c,t,i,f;return i=a,f=a,e.substr(a,4).toLowerCase()==="ttl="?(c=e.substr(a,4),a+=4):(c=null,o===0&&u('"ttl="')),c!==null?(t=N6(),t!==null?c=[c,t]:(c=null,a=f)):(c=null,a=f),c!==null&&(c=(function(d,p){M.params||(M.params={}),M.params.ttl=p})(i,c[1])),c===null&&(a=i),c}function Q8(){var c,t,i,f;return i=a,f=a,e.substr(a,6).toLowerCase()==="maddr="?(c=e.substr(a,6),a+=6):(c=null,o===0&&u('"maddr="')),c!==null?(t=X4(),t!==null?c=[c,t]:(c=null,a=f)):(c=null,a=f),c!==null&&(c=(function(d,p){M.uri_params||(M.uri_params={}),M.uri_params.maddr=p})(i,c[1])),c===null&&(a=i),c}function Z8(){var c,t,i,f,d,p;return f=a,d=a,e.substr(a,2).toLowerCase()==="lr"?(c=e.substr(a,2),a+=2):(c=null,o===0&&u('"lr"')),c!==null?(p=a,e.charCodeAt(a)===61?(t="=",a++):(t=null,o===0&&u('"="')),t!==null?(i=W(),i!==null?t=[t,i]:(t=null,a=p)):(t=null,a=p),t=t!==null?t:"",t!==null?c=[c,t]:(c=null,a=d)):(c=null,a=d),c!==null&&(c=(function(g){M.uri_params||(M.uri_params={}),M.uri_params.lr=void 0})(f)),c===null&&(a=f),c}function e5(){var c,t,i,f,d,p;return f=a,d=a,c=a5(),c!==null?(p=a,e.charCodeAt(a)===61?(t="=",a++):(t=null,o===0&&u('"="')),t!==null?(i=s5(),i!==null?t=[t,i]:(t=null,a=p)):(t=null,a=p),t=t!==null?t:"",t!==null?c=[c,t]:(c=null,a=d)):(c=null,a=d),c!==null&&(c=(function(g,L,N){M.uri_params||(M.uri_params={}),typeof N>"u"?N=void 0:N=N[1],M.uri_params[L.toLowerCase()]=N})(f,c[0],c[1])),c===null&&(a=f),c}function a5(){var c,t,i;if(i=a,t=Z4(),t!==null)for(c=[];t!==null;)c.push(t),t=Z4();else c=null;return c!==null&&(c=(function(f,d){return d.join("")})(i,c)),c===null&&(a=i),c}function s5(){var c,t,i;if(i=a,t=Z4(),t!==null)for(c=[];t!==null;)c.push(t),t=Z4();else c=null;return c!==null&&(c=(function(f,d){return d.join("")})(i,c)),c===null&&(a=i),c}function Z4(){var c;return c=c5(),c===null&&(c=A(),c===null&&(c=G())),c}function c5(){var c;return e.charCodeAt(a)===91?(c="[",a++):(c=null,o===0&&u('"["')),c===null&&(e.charCodeAt(a)===93?(c="]",a++):(c=null,o===0&&u('"]"')),c===null&&(e.charCodeAt(a)===47?(c="/",a++):(c=null,o===0&&u('"/"')),c===null&&(e.charCodeAt(a)===58?(c=":",a++):(c=null,o===0&&u('":"')),c===null&&(e.charCodeAt(a)===38?(c="&",a++):(c=null,o===0&&u('"&"')),c===null&&(e.charCodeAt(a)===43?(c="+",a++):(c=null,o===0&&u('"+"')),c===null&&(e.charCodeAt(a)===36?(c="$",a++):(c=null,o===0&&u('"$"')))))))),c}function l5(){var c,t,i,f,d,p,g;if(p=a,e.charCodeAt(a)===63?(c="?",a++):(c=null,o===0&&u('"?"')),c!==null)if(t=W3(),t!==null){for(i=[],g=a,e.charCodeAt(a)===38?(f="&",a++):(f=null,o===0&&u('"&"')),f!==null?(d=W3(),d!==null?f=[f,d]:(f=null,a=g)):(f=null,a=g);f!==null;)i.push(f),g=a,e.charCodeAt(a)===38?(f="&",a++):(f=null,o===0&&u('"&"')),f!==null?(d=W3(),d!==null?f=[f,d]:(f=null,a=g)):(f=null,a=g);i!==null?c=[c,t,i]:(c=null,a=p)}else c=null,a=p;else c=null,a=p;return c}function W3(){var c,t,i,f,d;return f=a,d=a,c=t5(),c!==null?(e.charCodeAt(a)===61?(t="=",a++):(t=null,o===0&&u('"="')),t!==null?(i=r5(),i!==null?c=[c,t,i]:(c=null,a=d)):(c=null,a=d)):(c=null,a=d),c!==null&&(c=(function(p,g,L){g=g.join("").toLowerCase(),L=L.join(""),M.uri_headers||(M.uri_headers={}),M.uri_headers[g]?M.uri_headers[g].push(L):M.uri_headers[g]=[L]})(f,c[0],c[2])),c===null&&(a=f),c}function t5(){var c,t;if(t=e3(),t===null&&(t=A(),t===null&&(t=G())),t!==null)for(c=[];t!==null;)c.push(t),t=e3(),t===null&&(t=A(),t===null&&(t=G()));else c=null;return c}function r5(){var c,t;for(c=[],t=e3(),t===null&&(t=A(),t===null&&(t=G()));t!==null;)c.push(t),t=e3(),t===null&&(t=A(),t===null&&(t=G()));return c}function e3(){var c;return e.charCodeAt(a)===91?(c="[",a++):(c=null,o===0&&u('"["')),c===null&&(e.charCodeAt(a)===93?(c="]",a++):(c=null,o===0&&u('"]"')),c===null&&(e.charCodeAt(a)===47?(c="/",a++):(c=null,o===0&&u('"/"')),c===null&&(e.charCodeAt(a)===63?(c="?",a++):(c=null,o===0&&u('"?"')),c===null&&(e.charCodeAt(a)===58?(c=":",a++):(c=null,o===0&&u('":"')),c===null&&(e.charCodeAt(a)===43?(c="+",a++):(c=null,o===0&&u('"+"')),c===null&&(e.charCodeAt(a)===36?(c="$",a++):(c=null,o===0&&u('"$"')))))))),c}function wr(){var c;return c=T5(),c===null&&(c=i5()),c}function i5(){var c,t,i,f,d,p;return p=a,c=K3(),c!==null?(t=v2(),t!==null?(i=n5(),i!==null?(f=v2(),f!==null?(d=z6(),d!==null?c=[c,t,i,f,d]:(c=null,a=p)):(c=null,a=p)):(c=null,a=p)):(c=null,a=p)):(c=null,a=p),c}function n5(){var c;return c=B3(),c===null&&(c=g6()),c}function g6(){var c,t,i,f;return f=a,c=h5(),c!==null?(e.charCodeAt(a)===58?(t=":",a++):(t=null,o===0&&u('":"')),t!==null?(i=o5(),i===null&&(i=u5()),i!==null?c=[c,t,i]:(c=null,a=f)):(c=null,a=f)):(c=null,a=f),c}function o5(){var c,t,i,f,d;return f=a,c=f5(),c===null&&(c=V3()),c!==null?(d=a,e.charCodeAt(a)===63?(t="?",a++):(t=null,o===0&&u('"?"')),t!==null?(i=z5(),i!==null?t=[t,i]:(t=null,a=d)):(t=null,a=d),t=t!==null?t:"",t!==null?c=[c,t]:(c=null,a=f)):(c=null,a=f),c}function f5(){var c,t,i,f;return f=a,e.substr(a,2)==="//"?(c="//",a+=2):(c=null,o===0&&u('"//"')),c!==null?(t=m5(),t!==null?(i=V3(),i=i!==null?i:"",i!==null?c=[c,t,i]:(c=null,a=f)):(c=null,a=f)):(c=null,a=f),c}function V3(){var c,t,i;return i=a,e.charCodeAt(a)===47?(c="/",a++):(c=null,o===0&&u('"/"')),c!==null?(t=p5(),t!==null?c=[c,t]:(c=null,a=i)):(c=null,a=i),c}function u5(){var c,t,i,f;if(f=a,c=d5(),c!==null){for(t=[],i=a3();i!==null;)t.push(i),i=a3();t!==null?c=[c,t]:(c=null,a=f)}else c=null,a=f;return c}function a3(){var c;return c=P(),c===null&&(c=A(),c===null&&(c=G())),c}function d5(){var c;return c=A(),c===null&&(c=G(),c===null&&(e.charCodeAt(a)===59?(c=";",a++):(c=null,o===0&&u('";"')),c===null&&(e.charCodeAt(a)===63?(c="?",a++):(c=null,o===0&&u('"?"')),c===null&&(e.charCodeAt(a)===58?(c=":",a++):(c=null,o===0&&u('":"')),c===null&&(e.charCodeAt(a)===64?(c="@",a++):(c=null,o===0&&u('"@"')),c===null&&(e.charCodeAt(a)===38?(c="&",a++):(c=null,o===0&&u('"&"')),c===null&&(e.charCodeAt(a)===61?(c="=",a++):(c=null,o===0&&u('"="')),c===null&&(e.charCodeAt(a)===43?(c="+",a++):(c=null,o===0&&u('"+"')),c===null&&(e.charCodeAt(a)===36?(c="$",a++):(c=null,o===0&&u('"$"')),c===null&&(e.charCodeAt(a)===44?(c=",",a++):(c=null,o===0&&u('","')))))))))))),c}function p5(){var c,t,i,f,d,p;if(d=a,c=j3(),c!==null){for(t=[],p=a,e.charCodeAt(a)===47?(i="/",a++):(i=null,o===0&&u('"/"')),i!==null?(f=j3(),f!==null?i=[i,f]:(i=null,a=p)):(i=null,a=p);i!==null;)t.push(i),p=a,e.charCodeAt(a)===47?(i="/",a++):(i=null,o===0&&u('"/"')),i!==null?(f=j3(),f!==null?i=[i,f]:(i=null,a=p)):(i=null,a=p);t!==null?c=[c,t]:(c=null,a=d)}else c=null,a=d;return c}function j3(){var c,t,i,f,d,p;for(d=a,c=[],t=s3();t!==null;)c.push(t),t=s3();if(c!==null){for(t=[],p=a,e.charCodeAt(a)===59?(i=";",a++):(i=null,o===0&&u('";"')),i!==null?(f=v6(),f!==null?i=[i,f]:(i=null,a=p)):(i=null,a=p);i!==null;)t.push(i),p=a,e.charCodeAt(a)===59?(i=";",a++):(i=null,o===0&&u('";"')),i!==null?(f=v6(),f!==null?i=[i,f]:(i=null,a=p)):(i=null,a=p);t!==null?c=[c,t]:(c=null,a=d)}else c=null,a=d;return c}function v6(){var c,t;for(c=[],t=s3();t!==null;)c.push(t),t=s3();return c}function s3(){var c;return c=A(),c===null&&(c=G(),c===null&&(e.charCodeAt(a)===58?(c=":",a++):(c=null,o===0&&u('":"')),c===null&&(e.charCodeAt(a)===64?(c="@",a++):(c=null,o===0&&u('"@"')),c===null&&(e.charCodeAt(a)===38?(c="&",a++):(c=null,o===0&&u('"&"')),c===null&&(e.charCodeAt(a)===61?(c="=",a++):(c=null,o===0&&u('"="')),c===null&&(e.charCodeAt(a)===43?(c="+",a++):(c=null,o===0&&u('"+"')),c===null&&(e.charCodeAt(a)===36?(c="$",a++):(c=null,o===0&&u('"$"')),c===null&&(e.charCodeAt(a)===44?(c=",",a++):(c=null,o===0&&u('","')))))))))),c}function h5(){var c,t,i,f,d;if(f=a,d=a,c=S(),c!==null){for(t=[],i=S(),i===null&&(i=b(),i===null&&(e.charCodeAt(a)===43?(i="+",a++):(i=null,o===0&&u('"+"')),i===null&&(e.charCodeAt(a)===45?(i="-",a++):(i=null,o===0&&u('"-"')),i===null&&(e.charCodeAt(a)===46?(i=".",a++):(i=null,o===0&&u('"."'))))));i!==null;)t.push(i),i=S(),i===null&&(i=b(),i===null&&(e.charCodeAt(a)===43?(i="+",a++):(i=null,o===0&&u('"+"')),i===null&&(e.charCodeAt(a)===45?(i="-",a++):(i=null,o===0&&u('"-"')),i===null&&(e.charCodeAt(a)===46?(i=".",a++):(i=null,o===0&&u('"."'))))));t!==null?c=[c,t]:(c=null,a=d)}else c=null,a=d;return c!==null&&(c=(function(p){M.scheme=e.substring(a,p)})(f)),c===null&&(a=f),c}function m5(){var c;return c=g5(),c===null&&(c=v5()),c}function g5(){var c,t,i,f;return i=a,f=a,c=q3(),c!==null?(e.charCodeAt(a)===64?(t="@",a++):(t=null,o===0&&u('"@"')),t!==null?c=[c,t]:(c=null,a=f)):(c=null,a=f),c=c!==null?c:"",c!==null?(t=G3(),t!==null?c=[c,t]:(c=null,a=i)):(c=null,a=i),c=c!==null?c:"",c}function v5(){var c,t;if(t=A(),t===null&&(t=G(),t===null&&(e.charCodeAt(a)===36?(t="$",a++):(t=null,o===0&&u('"$"')),t===null&&(e.charCodeAt(a)===44?(t=",",a++):(t=null,o===0&&u('","')),t===null&&(e.charCodeAt(a)===59?(t=";",a++):(t=null,o===0&&u('";"')),t===null&&(e.charCodeAt(a)===58?(t=":",a++):(t=null,o===0&&u('":"')),t===null&&(e.charCodeAt(a)===64?(t="@",a++):(t=null,o===0&&u('"@"')),t===null&&(e.charCodeAt(a)===38?(t="&",a++):(t=null,o===0&&u('"&"')),t===null&&(e.charCodeAt(a)===61?(t="=",a++):(t=null,o===0&&u('"="')),t===null&&(e.charCodeAt(a)===43?(t="+",a++):(t=null,o===0&&u('"+"'))))))))))),t!==null)for(c=[];t!==null;)c.push(t),t=A(),t===null&&(t=G(),t===null&&(e.charCodeAt(a)===36?(t="$",a++):(t=null,o===0&&u('"$"')),t===null&&(e.charCodeAt(a)===44?(t=",",a++):(t=null,o===0&&u('","')),t===null&&(e.charCodeAt(a)===59?(t=";",a++):(t=null,o===0&&u('";"')),t===null&&(e.charCodeAt(a)===58?(t=":",a++):(t=null,o===0&&u('":"')),t===null&&(e.charCodeAt(a)===64?(t="@",a++):(t=null,o===0&&u('"@"')),t===null&&(e.charCodeAt(a)===38?(t="&",a++):(t=null,o===0&&u('"&"')),t===null&&(e.charCodeAt(a)===61?(t="=",a++):(t=null,o===0&&u('"="')),t===null&&(e.charCodeAt(a)===43?(t="+",a++):(t=null,o===0&&u('"+"')))))))))));else c=null;return c}function z5(){var c,t;for(c=[],t=a3();t!==null;)c.push(t),t=a3();return c}function z6(){var c,t,i,f,d,p,g,L;if(g=a,L=a,e.substr(a,3).toLowerCase()==="sip"?(c=e.substr(a,3),a+=3):(c=null,o===0&&u('"SIP"')),c!==null)if(e.charCodeAt(a)===47?(t="/",a++):(t=null,o===0&&u('"/"')),t!==null){if(f=b(),f!==null)for(i=[];f!==null;)i.push(f),f=b();else i=null;if(i!==null)if(e.charCodeAt(a)===46?(f=".",a++):(f=null,o===0&&u('"."')),f!==null){if(p=b(),p!==null)for(d=[];p!==null;)d.push(p),p=b();else d=null;d!==null?c=[c,t,i,f,d]:(c=null,a=L)}else c=null,a=L;else c=null,a=L}else c=null,a=L;else c=null,a=L;return c!==null&&(c=(function(N){M.sip_version=e.substring(a,N)})(g)),c===null&&(a=g),c}function M5(){var c;return e.substr(a,6)==="INVITE"?(c="INVITE",a+=6):(c=null,o===0&&u('"INVITE"')),c}function _5(){var c;return e.substr(a,3)==="ACK"?(c="ACK",a+=3):(c=null,o===0&&u('"ACK"')),c}function C5(){var c;return e.substr(a,7)==="OPTIONS"?(c="OPTIONS",a+=7):(c=null,o===0&&u('"OPTIONS"')),c}function L5(){var c;return e.substr(a,3)==="BYE"?(c="BYE",a+=3):(c=null,o===0&&u('"BYE"')),c}function x5(){var c;return e.substr(a,6)==="CANCEL"?(c="CANCEL",a+=6):(c=null,o===0&&u('"CANCEL"')),c}function b5(){var c;return e.substr(a,8)==="REGISTER"?(c="REGISTER",a+=8):(c=null,o===0&&u('"REGISTER"')),c}function S5(){var c;return e.substr(a,9)==="SUBSCRIBE"?(c="SUBSCRIBE",a+=9):(c=null,o===0&&u('"SUBSCRIBE"')),c}function w5(){var c;return e.substr(a,6)==="NOTIFY"?(c="NOTIFY",a+=6):(c=null,o===0&&u('"NOTIFY"')),c}function y5(){var c;return e.substr(a,5)==="REFER"?(c="REFER",a+=5):(c=null,o===0&&u('"REFER"')),c}function K3(){var c,t;return t=a,c=M5(),c===null&&(c=_5(),c===null&&(c=C5(),c===null&&(c=L5(),c===null&&(c=x5(),c===null&&(c=b5(),c===null&&(c=S5(),c===null&&(c=w5(),c===null&&(c=y5(),c===null&&(c=W()))))))))),c!==null&&(c=(function(i){return M.method=e.substring(a,i),M.method})(t)),c===null&&(a=t),c}function T5(){var c,t,i,f,d,p;return p=a,c=z6(),c!==null?(t=v2(),t!==null?(i=N5(),i!==null?(f=v2(),f!==null?(d=E5(),d!==null?c=[c,t,i,f,d]:(c=null,a=p)):(c=null,a=p)):(c=null,a=p)):(c=null,a=p)):(c=null,a=p),c}function N5(){var c,t;return t=a,c=A5(),c!==null&&(c=(function(i,f){M.status_code=parseInt(f.join(""))})(t,c)),c===null&&(a=t),c}function A5(){var c,t,i,f;return f=a,c=b(),c!==null?(t=b(),t!==null?(i=b(),i!==null?c=[c,t,i]:(c=null,a=f)):(c=null,a=f)):(c=null,a=f),c}function E5(){var c,t,i;for(i=a,c=[],t=P(),t===null&&(t=A(),t===null&&(t=G(),t===null&&(t=v1(),t===null&&(t=b1(),t===null&&(t=v2(),t===null&&(t=I()))))));t!==null;)c.push(t),t=P(),t===null&&(t=A(),t===null&&(t=G(),t===null&&(t=v1(),t===null&&(t=b1(),t===null&&(t=v2(),t===null&&(t=I()))))));return c!==null&&(c=(function(f){M.reason_phrase=e.substring(a,f)})(i)),c===null&&(a=i),c}function yr(){var c,t,i,f,d,p;if(d=a,c=c3(),c!==null){for(t=[],p=a,i=e2(),i!==null?(f=c3(),f!==null?i=[i,f]:(i=null,a=p)):(i=null,a=p);i!==null;)t.push(i),p=a,i=e2(),i!==null?(f=c3(),f!==null?i=[i,f]:(i=null,a=p)):(i=null,a=p);t!==null?c=[c,t]:(c=null,a=d)}else c=null,a=d;return c}function Tr(){var c,t,i,f,d,p;return f=a,d=a,c=S1(),c!==null?(p=a,e.charCodeAt(a)===64?(t="@",a++):(t=null,o===0&&u('"@"')),t!==null?(i=S1(),i!==null?t=[t,i]:(t=null,a=p)):(t=null,a=p),t=t!==null?t:"",t!==null?c=[c,t]:(c=null,a=d)):(c=null,a=d),c!==null&&(c=(function(g){M=e.substring(a,g)})(f)),c===null&&(a=f),c}function Nr(){var c,t,i,f,d,p,g;if(d=a,c=s4(),c===null)if(p=a,c=Y3(),c!==null){for(t=[],g=a,i=e2(),i!==null?(f=Y3(),f!==null?i=[i,f]:(i=null,a=g)):(i=null,a=g);i!==null;)t.push(i),g=a,i=e2(),i!==null?(f=Y3(),f!==null?i=[i,f]:(i=null,a=g)):(i=null,a=g);t!==null?c=[c,t]:(c=null,a=p)}else c=null,a=p;return c!==null&&(c=(function(L){var N,q;for(q=M.multi_header.length,N=0;N<q;N++)if(M.multi_header[N].parsed===null){M=null;break}M!==null?M=M.multi_header:M=-1})(d)),c===null&&(a=d),c}function Y3(){var c,t,i,f,d,p,g;if(d=a,p=a,c=Y4(),c===null&&(c=l4()),c!==null){for(t=[],g=a,i=K(),i!==null?(f=M6(),f!==null?i=[i,f]:(i=null,a=g)):(i=null,a=g);i!==null;)t.push(i),g=a,i=K(),i!==null?(f=M6(),f!==null?i=[i,f]:(i=null,a=g)):(i=null,a=g);t!==null?c=[c,t]:(c=null,a=p)}else c=null,a=p;return c!==null&&(c=(function(L){var N;M.multi_header||(M.multi_header=[]);try{N=new T4(M.uri,M.display_name,M.params),delete M.uri,delete M.display_name,delete M.params}catch{N=null}M.multi_header.push({possition:a,offset:L,parsed:N})})(d)),c===null&&(a=d),c}function l4(){var c,t,i,f,d;return d=a,c=X3(),c=c!==null?c:"",c!==null?(t=t2(),t!==null?(i=B3(),i!==null?(f=a2(),f!==null?c=[c,t,i,f]:(c=null,a=d)):(c=null,a=d)):(c=null,a=d)):(c=null,a=d),c}function X3(){var c,t,i,f,d,p,g;if(d=a,p=a,c=W(),c!==null){for(t=[],g=a,i=V(),i!==null?(f=W(),f!==null?i=[i,f]:(i=null,a=g)):(i=null,a=g);i!==null;)t.push(i),g=a,i=V(),i!==null?(f=W(),f!==null?i=[i,f]:(i=null,a=g)):(i=null,a=g);t!==null?c=[c,t]:(c=null,a=p)}else c=null,a=p;return c===null&&(c=j4()),c!==null&&(c=(function(L,N){typeof N=="string"?M.display_name=N:M.display_name=N[1].reduce(function(q,d2){return q+d2[0]+d2[1]},N[0])})(d,c)),c===null&&(a=d),c}function M6(){var c;return c=k5(),c===null&&(c=R5(),c===null&&(c=y2())),c}function k5(){var c,t,i,f,d;return f=a,d=a,e.substr(a,1).toLowerCase()==="q"?(c=e.substr(a,1),a++):(c=null,o===0&&u('"q"')),c!==null?(t=i2(),t!==null?(i=I5(),i!==null?c=[c,t,i]:(c=null,a=d)):(c=null,a=d)):(c=null,a=d),c!==null&&(c=(function(p,g){M.params||(M.params={}),M.params.q=g})(f,c[2])),c===null&&(a=f),c}function R5(){var c,t,i,f,d;return f=a,d=a,e.substr(a,7).toLowerCase()==="expires"?(c=e.substr(a,7),a+=7):(c=null,o===0&&u('"expires"')),c!==null?(t=i2(),t!==null?(i=t4(),i!==null?c=[c,t,i]:(c=null,a=d)):(c=null,a=d)):(c=null,a=d),c!==null&&(c=(function(p,g){M.params||(M.params={}),M.params.expires=g})(f,c[2])),c===null&&(a=f),c}function t4(){var c,t,i;if(i=a,t=b(),t!==null)for(c=[];t!==null;)c.push(t),t=b();else c=null;return c!==null&&(c=(function(f,d){return parseInt(d.join(""))})(i,c)),c===null&&(a=i),c}function I5(){var c,t,i,f,d,p,g,L;return p=a,g=a,e.charCodeAt(a)===48?(c="0",a++):(c=null,o===0&&u('"0"')),c!==null?(L=a,e.charCodeAt(a)===46?(t=".",a++):(t=null,o===0&&u('"."')),t!==null?(i=b(),i=i!==null?i:"",i!==null?(f=b(),f=f!==null?f:"",f!==null?(d=b(),d=d!==null?d:"",d!==null?t=[t,i,f,d]:(t=null,a=L)):(t=null,a=L)):(t=null,a=L)):(t=null,a=L),t=t!==null?t:"",t!==null?c=[c,t]:(c=null,a=g)):(c=null,a=g),c!==null&&(c=(function(N){return parseFloat(e.substring(a,N))})(p)),c===null&&(a=p),c}function y2(){var c,t,i,f,d,p;return f=a,d=a,c=W(),c!==null?(p=a,t=i2(),t!==null?(i=P5(),i!==null?t=[t,i]:(t=null,a=p)):(t=null,a=p),t=t!==null?t:"",t!==null?c=[c,t]:(c=null,a=d)):(c=null,a=d),c!==null&&(c=(function(g,L,N){M.params||(M.params={}),typeof N>"u"?N=void 0:N=N[1],M.params[L.toLowerCase()]=N})(f,c[0],c[1])),c===null&&(a=f),c}function P5(){var c;return c=W(),c===null&&(c=X4(),c===null&&(c=O3())),c}function Ar(){var c,t,i,f,d,p;if(d=a,c=D5(),c!==null){for(t=[],p=a,i=K(),i!==null?(f=_6(),f!==null?i=[i,f]:(i=null,a=p)):(i=null,a=p);i!==null;)t.push(i),p=a,i=K(),i!==null?(f=_6(),f!==null?i=[i,f]:(i=null,a=p)):(i=null,a=p);t!==null?c=[c,t]:(c=null,a=d)}else c=null,a=d;return c}function D5(){var c;return e.substr(a,6).toLowerCase()==="render"?(c=e.substr(a,6),a+=6):(c=null,o===0&&u('"render"')),c===null&&(e.substr(a,7).toLowerCase()==="session"?(c=e.substr(a,7),a+=7):(c=null,o===0&&u('"session"')),c===null&&(e.substr(a,4).toLowerCase()==="icon"?(c=e.substr(a,4),a+=4):(c=null,o===0&&u('"icon"')),c===null&&(e.substr(a,5).toLowerCase()==="alert"?(c=e.substr(a,5),a+=5):(c=null,o===0&&u('"alert"')),c===null&&(c=W())))),c}function _6(){var c;return c=$5(),c===null&&(c=y2()),c}function $5(){var c,t,i,f;return f=a,e.substr(a,8).toLowerCase()==="handling"?(c=e.substr(a,8),a+=8):(c=null,o===0&&u('"handling"')),c!==null?(t=i2(),t!==null?(e.substr(a,8).toLowerCase()==="optional"?(i=e.substr(a,8),a+=8):(i=null,o===0&&u('"optional"')),i===null&&(e.substr(a,8).toLowerCase()==="required"?(i=e.substr(a,8),a+=8):(i=null,o===0&&u('"required"')),i===null&&(i=W())),i!==null?c=[c,t,i]:(c=null,a=f)):(c=null,a=f)):(c=null,a=f),c}function Er(){var c,t,i,f,d,p;if(d=a,c=W(),c!==null){for(t=[],p=a,i=e2(),i!==null?(f=W(),f!==null?i=[i,f]:(i=null,a=p)):(i=null,a=p);i!==null;)t.push(i),p=a,i=e2(),i!==null?(f=W(),f!==null?i=[i,f]:(i=null,a=p)):(i=null,a=p);t!==null?c=[c,t]:(c=null,a=d)}else c=null,a=d;return c}function kr(){var c,t,i;if(i=a,t=b(),t!==null)for(c=[];t!==null;)c.push(t),t=b();else c=null;return c!==null&&(c=(function(f,d){M=parseInt(d.join(""))})(i,c)),c===null&&(a=i),c}function Rr(){var c,t;return t=a,c=U5(),c!==null&&(c=(function(i){M=e.substring(a,i)})(t)),c===null&&(a=t),c}function U5(){var c,t,i,f,d,p,g,L;if(g=a,c=F5(),c!==null)if(t=R1(),t!==null)if(i=q5(),i!==null){for(f=[],L=a,d=K(),d!==null?(p=C6(),p!==null?d=[d,p]:(d=null,a=L)):(d=null,a=L);d!==null;)f.push(d),L=a,d=K(),d!==null?(p=C6(),p!==null?d=[d,p]:(d=null,a=L)):(d=null,a=L);f!==null?c=[c,t,i,f]:(c=null,a=g)}else c=null,a=g;else c=null,a=g;else c=null,a=g;return c}function F5(){var c;return c=H5(),c===null&&(c=O5()),c}function H5(){var c;return e.substr(a,4).toLowerCase()==="text"?(c=e.substr(a,4),a+=4):(c=null,o===0&&u('"text"')),c===null&&(e.substr(a,5).toLowerCase()==="image"?(c=e.substr(a,5),a+=5):(c=null,o===0&&u('"image"')),c===null&&(e.substr(a,5).toLowerCase()==="audio"?(c=e.substr(a,5),a+=5):(c=null,o===0&&u('"audio"')),c===null&&(e.substr(a,5).toLowerCase()==="video"?(c=e.substr(a,5),a+=5):(c=null,o===0&&u('"video"')),c===null&&(e.substr(a,11).toLowerCase()==="application"?(c=e.substr(a,11),a+=11):(c=null,o===0&&u('"application"')),c===null&&(c=J3()))))),c}function O5(){var c;return e.substr(a,7).toLowerCase()==="message"?(c=e.substr(a,7),a+=7):(c=null,o===0&&u('"message"')),c===null&&(e.substr(a,9).toLowerCase()==="multipart"?(c=e.substr(a,9),a+=9):(c=null,o===0&&u('"multipart"')),c===null&&(c=J3())),c}function J3(){var c;return c=W(),c===null&&(c=B5()),c}function B5(){var c,t,i;return i=a,e.substr(a,2).toLowerCase()==="x-"?(c=e.substr(a,2),a+=2):(c=null,o===0&&u('"x-"')),c!==null?(t=W(),t!==null?c=[c,t]:(c=null,a=i)):(c=null,a=i),c}function q5(){var c;return c=J3(),c===null&&(c=W()),c}function C6(){var c,t,i,f;return f=a,c=W(),c!==null?(t=i2(),t!==null?(i=G5(),i!==null?c=[c,t,i]:(c=null,a=f)):(c=null,a=f)):(c=null,a=f),c}function G5(){var c;return c=W(),c===null&&(c=O3()),c}function Ir(){var c,t,i,f;return f=a,c=W5(),c!==null?(t=V(),t!==null?(i=K3(),i!==null?c=[c,t,i]:(c=null,a=f)):(c=null,a=f)):(c=null,a=f),c}function W5(){var c,t,i;if(i=a,t=b(),t!==null)for(c=[];t!==null;)c.push(t),t=b();else c=null;return c!==null&&(c=(function(f,d){M.value=parseInt(d.join(""))})(i,c)),c===null&&(a=i),c}function Pr(){var c,t;return t=a,c=t4(),c!==null&&(c=(function(i,f){M=f})(t,c)),c===null&&(a=t),c}function Dr(){var c,t,i,f,d,p,g;if(d=a,p=a,c=c3(),c!==null){for(t=[],g=a,i=K(),i!==null?(f=y2(),f!==null?i=[i,f]:(i=null,a=g)):(i=null,a=g);i!==null;)t.push(i),g=a,i=K(),i!==null?(f=y2(),f!==null?i=[i,f]:(i=null,a=g)):(i=null,a=g);t!==null?c=[c,t]:(c=null,a=p)}else c=null,a=p;return c!==null&&(c=(function(L,N){M.event=N.join("").toLowerCase()})(d,c[0])),c===null&&(a=d),c}function c3(){var c,t,i,f,d,p;if(d=a,c=k1(),c!==null){for(t=[],p=a,e.charCodeAt(a)===46?(i=".",a++):(i=null,o===0&&u('"."')),i!==null?(f=k1(),f!==null?i=[i,f]:(i=null,a=p)):(i=null,a=p);i!==null;)t.push(i),p=a,e.charCodeAt(a)===46?(i=".",a++):(i=null,o===0&&u('"."')),i!==null?(f=k1(),f!==null?i=[i,f]:(i=null,a=p)):(i=null,a=p);t!==null?c=[c,t]:(c=null,a=d)}else c=null,a=d;return c}function $r(){var c,t,i,f,d,p,g;if(d=a,p=a,c=Y4(),c===null&&(c=l4()),c!==null){for(t=[],g=a,i=K(),i!==null?(f=L6(),f!==null?i=[i,f]:(i=null,a=g)):(i=null,a=g);i!==null;)t.push(i),g=a,i=K(),i!==null?(f=L6(),f!==null?i=[i,f]:(i=null,a=g)):(i=null,a=g);t!==null?c=[c,t]:(c=null,a=p)}else c=null,a=p;return c!==null&&(c=(function(L){var N=M.tag;try{M=new T4(M.uri,M.display_name,M.params),N&&M.setParam("tag",N)}catch{M=-1}})(d)),c===null&&(a=d),c}function L6(){var c;return c=x6(),c===null&&(c=y2()),c}function x6(){var c,t,i,f,d;return f=a,d=a,e.substr(a,3).toLowerCase()==="tag"?(c=e.substr(a,3),a+=3):(c=null,o===0&&u('"tag"')),c!==null?(t=i2(),t!==null?(i=W(),i!==null?c=[c,t,i]:(c=null,a=d)):(c=null,a=d)):(c=null,a=d),c!==null&&(c=(function(p,g){M.tag=g})(f,c[2])),c===null&&(a=f),c}function Ur(){var c,t,i;if(i=a,t=b(),t!==null)for(c=[];t!==null;)c.push(t),t=b();else c=null;return c!==null&&(c=(function(f,d){M=parseInt(d.join(""))})(i,c)),c===null&&(a=i),c}function Fr(){var c,t;return t=a,c=t4(),c!==null&&(c=(function(i,f){M=f})(t,c)),c===null&&(a=t),c}function Hr(){var c,t,i,f,d,p,g,L,N,q;for(L=a,N=a,c=[],t=X3();t!==null;)c.push(t),t=X3();if(c!==null)if(t=t2(),t!==null)if(i=B3(),i!==null)if(f=a2(),f!==null){for(d=[],q=a,p=K(),p!==null?(g=y2(),g!==null?p=[p,g]:(p=null,a=q)):(p=null,a=q);p!==null;)d.push(p),q=a,p=K(),p!==null?(g=y2(),g!==null?p=[p,g]:(p=null,a=q)):(p=null,a=q);d!==null?c=[c,t,i,f,d]:(c=null,a=N)}else c=null,a=N;else c=null,a=N;else c=null,a=N;else c=null,a=N;return c!==null&&(c=(function(d2){try{M=new T4(M.uri,M.display_name,M.params)}catch{M=-1}})(L)),c===null&&(a=L),c}function Or(){var c;return c=b6(),c}function b6(){var c,t,i,f,d,p,g,L;if(g=a,e.substr(a,6).toLowerCase()==="digest"?(c=e.substr(a,6),a+=6):(c=null,o===0&&u('"Digest"')),c!==null)if(t=V(),t!==null)if(i=Q3(),i!==null){for(f=[],L=a,d=e2(),d!==null?(p=Q3(),p!==null?d=[d,p]:(d=null,a=L)):(d=null,a=L);d!==null;)f.push(d),L=a,d=e2(),d!==null?(p=Q3(),p!==null?d=[d,p]:(d=null,a=L)):(d=null,a=L);f!==null?c=[c,t,i,f]:(c=null,a=g)}else c=null,a=g;else c=null,a=g;else c=null,a=g;return c===null&&(c=V5()),c}function V5(){var c,t,i,f,d,p,g,L;if(g=a,c=W(),c!==null)if(t=V(),t!==null)if(i=l3(),i!==null){for(f=[],L=a,d=e2(),d!==null?(p=l3(),p!==null?d=[d,p]:(d=null,a=L)):(d=null,a=L);d!==null;)f.push(d),L=a,d=e2(),d!==null?(p=l3(),p!==null?d=[d,p]:(d=null,a=L)):(d=null,a=L);f!==null?c=[c,t,i,f]:(c=null,a=g)}else c=null,a=g;else c=null,a=g;else c=null,a=g;return c}function l3(){var c,t,i,f;return f=a,c=W(),c!==null?(t=i2(),t!==null?(i=W(),i===null&&(i=O3()),i!==null?c=[c,t,i]:(c=null,a=f)):(c=null,a=f)):(c=null,a=f),c}function Q3(){var c;return c=j5(),c===null&&(c=Y5(),c===null&&(c=X5(),c===null&&(c=Q5(),c===null&&(c=Z5(),c===null&&(c=ea(),c===null&&(c=aa(),c===null&&(c=l3()))))))),c}function j5(){var c,t,i,f;return f=a,e.substr(a,5).toLowerCase()==="realm"?(c=e.substr(a,5),a+=5):(c=null,o===0&&u('"realm"')),c!==null?(t=i2(),t!==null?(i=K5(),i!==null?c=[c,t,i]:(c=null,a=f)):(c=null,a=f)):(c=null,a=f),c}function K5(){var c,t;return t=a,c=j4(),c!==null&&(c=(function(i,f){M.realm=f})(t,c)),c===null&&(a=t),c}function Y5(){var c,t,i,f,d,p,g,L,N;if(L=a,e.substr(a,6).toLowerCase()==="domain"?(c=e.substr(a,6),a+=6):(c=null,o===0&&u('"domain"')),c!==null)if(t=i2(),t!==null)if(i=V1(),i!==null)if(f=Z3(),f!==null){if(d=[],N=a,g=v2(),g!==null)for(p=[];g!==null;)p.push(g),g=v2();else p=null;for(p!==null?(g=Z3(),g!==null?p=[p,g]:(p=null,a=N)):(p=null,a=N);p!==null;){if(d.push(p),N=a,g=v2(),g!==null)for(p=[];g!==null;)p.push(g),g=v2();else p=null;p!==null?(g=Z3(),g!==null?p=[p,g]:(p=null,a=N)):(p=null,a=N)}d!==null?(p=e1(),p!==null?c=[c,t,i,f,d,p]:(c=null,a=L)):(c=null,a=L)}else c=null,a=L;else c=null,a=L;else c=null,a=L;else c=null,a=L;return c}function Z3(){var c;return c=g6(),c===null&&(c=V3()),c}function X5(){var c,t,i,f;return f=a,e.substr(a,5).toLowerCase()==="nonce"?(c=e.substr(a,5),a+=5):(c=null,o===0&&u('"nonce"')),c!==null?(t=i2(),t!==null?(i=J5(),i!==null?c=[c,t,i]:(c=null,a=f)):(c=null,a=f)):(c=null,a=f),c}function J5(){var c,t;return t=a,c=j4(),c!==null&&(c=(function(i,f){M.nonce=f})(t,c)),c===null&&(a=t),c}function Q5(){var c,t,i,f,d;return f=a,d=a,e.substr(a,6).toLowerCase()==="opaque"?(c=e.substr(a,6),a+=6):(c=null,o===0&&u('"opaque"')),c!==null?(t=i2(),t!==null?(i=j4(),i!==null?c=[c,t,i]:(c=null,a=d)):(c=null,a=d)):(c=null,a=d),c!==null&&(c=(function(p,g){M.opaque=g})(f,c[2])),c===null&&(a=f),c}function Z5(){var c,t,i,f,d;return f=a,e.substr(a,5).toLowerCase()==="stale"?(c=e.substr(a,5),a+=5):(c=null,o===0&&u('"stale"')),c!==null?(t=i2(),t!==null?(d=a,e.substr(a,4).toLowerCase()==="true"?(i=e.substr(a,4),a+=4):(i=null,o===0&&u('"true"')),i!==null&&(i=(function(p){M.stale=!0})(d)),i===null&&(a=d),i===null&&(d=a,e.substr(a,5).toLowerCase()==="false"?(i=e.substr(a,5),a+=5):(i=null,o===0&&u('"false"')),i!==null&&(i=(function(p){M.stale=!1})(d)),i===null&&(a=d)),i!==null?c=[c,t,i]:(c=null,a=f)):(c=null,a=f)):(c=null,a=f),c}function ea(){var c,t,i,f,d;return f=a,d=a,e.substr(a,9).toLowerCase()==="algorithm"?(c=e.substr(a,9),a+=9):(c=null,o===0&&u('"algorithm"')),c!==null?(t=i2(),t!==null?(e.substr(a,3).toLowerCase()==="md5"?(i=e.substr(a,3),a+=3):(i=null,o===0&&u('"MD5"')),i===null&&(e.substr(a,8).toLowerCase()==="md5-sess"?(i=e.substr(a,8),a+=8):(i=null,o===0&&u('"MD5-sess"')),i===null&&(i=W())),i!==null?c=[c,t,i]:(c=null,a=d)):(c=null,a=d)):(c=null,a=d),c!==null&&(c=(function(p,g){M.algorithm=g.toUpperCase()})(f,c[2])),c===null&&(a=f),c}function aa(){var c,t,i,f,d,p,g,L,N,q;if(L=a,e.substr(a,3).toLowerCase()==="qop"?(c=e.substr(a,3),a+=3):(c=null,o===0&&u('"qop"')),c!==null)if(t=i2(),t!==null)if(i=V1(),i!==null){if(N=a,f=e0(),f!==null){for(d=[],q=a,e.charCodeAt(a)===44?(p=",",a++):(p=null,o===0&&u('","')),p!==null?(g=e0(),g!==null?p=[p,g]:(p=null,a=q)):(p=null,a=q);p!==null;)d.push(p),q=a,e.charCodeAt(a)===44?(p=",",a++):(p=null,o===0&&u('","')),p!==null?(g=e0(),g!==null?p=[p,g]:(p=null,a=q)):(p=null,a=q);d!==null?f=[f,d]:(f=null,a=N)}else f=null,a=N;f!==null?(d=e1(),d!==null?c=[c,t,i,f,d]:(c=null,a=L)):(c=null,a=L)}else c=null,a=L;else c=null,a=L;else c=null,a=L;return c}function e0(){var c,t;return t=a,e.substr(a,8).toLowerCase()==="auth-int"?(c=e.substr(a,8),a+=8):(c=null,o===0&&u('"auth-int"')),c===null&&(e.substr(a,4).toLowerCase()==="auth"?(c=e.substr(a,4),a+=4):(c=null,o===0&&u('"auth"')),c===null&&(c=W())),c!==null&&(c=(function(i,f){M.qop||(M.qop=[]),M.qop.push(f.toLowerCase())})(t,c)),c===null&&(a=t),c}function Br(){var c,t,i,f,d,p;if(d=a,c=W(),c!==null){for(t=[],p=a,i=e2(),i!==null?(f=W(),f!==null?i=[i,f]:(i=null,a=p)):(i=null,a=p);i!==null;)t.push(i),p=a,i=e2(),i!==null?(f=W(),f!==null?i=[i,f]:(i=null,a=p)):(i=null,a=p);t!==null?c=[c,t]:(c=null,a=d)}else c=null,a=d;return c}function qr(){var c,t,i,f,d,p,g;if(d=a,p=a,c=a0(),c!==null){for(t=[],g=a,i=e2(),i!==null?(f=a0(),f!==null?i=[i,f]:(i=null,a=g)):(i=null,a=g);i!==null;)t.push(i),g=a,i=e2(),i!==null?(f=a0(),f!==null?i=[i,f]:(i=null,a=g)):(i=null,a=g);t!==null?c=[c,t]:(c=null,a=p)}else c=null,a=p;return c!==null&&(c=(function(L){var N,q;for(q=M.multi_header.length,N=0;N<q;N++)if(M.multi_header[N].parsed===null){M=null;break}M!==null?M=M.multi_header:M=-1})(d)),c===null&&(a=d),c}function a0(){var c,t,i,f,d,p,g;if(d=a,p=a,c=l4(),c!==null){for(t=[],g=a,i=K(),i!==null?(f=y2(),f!==null?i=[i,f]:(i=null,a=g)):(i=null,a=g);i!==null;)t.push(i),g=a,i=K(),i!==null?(f=y2(),f!==null?i=[i,f]:(i=null,a=g)):(i=null,a=g);t!==null?c=[c,t]:(c=null,a=p)}else c=null,a=p;return c!==null&&(c=(function(L){var N;M.multi_header||(M.multi_header=[]);try{N=new T4(M.uri,M.display_name,M.params),delete M.uri,delete M.display_name,delete M.params}catch{N=null}M.multi_header.push({possition:a,offset:L,parsed:N})})(d)),c===null&&(a=d),c}function Gr(){var c,t,i,f,d,p,g;if(d=a,p=a,e.substr(a,3).toLowerCase()==="sip"?(c=e.substr(a,3),a+=3):(c=null,o===0&&u('"SIP"')),c===null&&(c=W()),c!==null){for(t=[],g=a,i=K(),i!==null?(f=S6(),f!==null?i=[i,f]:(i=null,a=g)):(i=null,a=g);i!==null;)t.push(i),g=a,i=K(),i!==null?(f=S6(),f!==null?i=[i,f]:(i=null,a=g)):(i=null,a=g);t!==null?c=[c,t]:(c=null,a=p)}else c=null,a=p;return c!==null&&(c=(function(L,N){if(M.protocol=N.toLowerCase(),M.params||(M.params={}),M.params.text&&M.params.text[0]==='"'){var q=M.params.text;M.text=q.substring(1,q.length-1),delete M.params.text}})(d,c[0])),c===null&&(a=d),c}function S6(){var c;return c=sa(),c===null&&(c=y2()),c}function sa(){var c,t,i,f,d,p;if(d=a,p=a,e.substr(a,5).toLowerCase()==="cause"?(c=e.substr(a,5),a+=5):(c=null,o===0&&u('"cause"')),c!==null)if(t=i2(),t!==null){if(f=b(),f!==null)for(i=[];f!==null;)i.push(f),f=b();else i=null;i!==null?c=[c,t,i]:(c=null,a=p)}else c=null,a=p;else c=null,a=p;return c!==null&&(c=(function(g,L){M.cause=parseInt(L.join(""))})(d,c[2])),c===null&&(a=d),c}function Wr(){var c,t,i,f,d,p;if(d=a,c=W(),c!==null){for(t=[],p=a,i=e2(),i!==null?(f=W(),f!==null?i=[i,f]:(i=null,a=p)):(i=null,a=p);i!==null;)t.push(i),p=a,i=e2(),i!==null?(f=W(),f!==null?i=[i,f]:(i=null,a=p)):(i=null,a=p);t!==null?c=[c,t]:(c=null,a=d)}else c=null,a=d;return c}function Vr(){var c,t,i,f,d,p;if(d=a,c=s0(),c!==null){for(t=[],p=a,i=e2(),i!==null?(f=s0(),f!==null?i=[i,f]:(i=null,a=p)):(i=null,a=p);i!==null;)t.push(i),p=a,i=e2(),i!==null?(f=s0(),f!==null?i=[i,f]:(i=null,a=p)):(i=null,a=p);t!==null?c=[c,t]:(c=null,a=d)}else c=null,a=d;return c}function s0(){var c,t,i,f,d,p;if(d=a,c=l4(),c!==null){for(t=[],p=a,i=K(),i!==null?(f=y2(),f!==null?i=[i,f]:(i=null,a=p)):(i=null,a=p);i!==null;)t.push(i),p=a,i=K(),i!==null?(f=y2(),f!==null?i=[i,f]:(i=null,a=p)):(i=null,a=p);t!==null?c=[c,t]:(c=null,a=d)}else c=null,a=d;return c}function jr(){var c,t,i,f,d,p;if(d=a,c=ca(),c!==null){for(t=[],p=a,i=K(),i!==null?(f=w6(),f!==null?i=[i,f]:(i=null,a=p)):(i=null,a=p);i!==null;)t.push(i),p=a,i=K(),i!==null?(f=w6(),f!==null?i=[i,f]:(i=null,a=p)):(i=null,a=p);t!==null?c=[c,t]:(c=null,a=d)}else c=null,a=d;return c}function ca(){var c,t;return t=a,e.substr(a,6).toLowerCase()==="active"?(c=e.substr(a,6),a+=6):(c=null,o===0&&u('"active"')),c===null&&(e.substr(a,7).toLowerCase()==="pending"?(c=e.substr(a,7),a+=7):(c=null,o===0&&u('"pending"')),c===null&&(e.substr(a,10).toLowerCase()==="terminated"?(c=e.substr(a,10),a+=10):(c=null,o===0&&u('"terminated"')),c===null&&(c=W()))),c!==null&&(c=(function(i){M.state=e.substring(a,i)})(t)),c===null&&(a=t),c}function w6(){var c,t,i,f,d;return f=a,d=a,e.substr(a,6).toLowerCase()==="reason"?(c=e.substr(a,6),a+=6):(c=null,o===0&&u('"reason"')),c!==null?(t=i2(),t!==null?(i=la(),i!==null?c=[c,t,i]:(c=null,a=d)):(c=null,a=d)):(c=null,a=d),c!==null&&(c=(function(p,g){typeof g<"u"&&(M.reason=g)})(f,c[2])),c===null&&(a=f),c===null&&(f=a,d=a,e.substr(a,7).toLowerCase()==="expires"?(c=e.substr(a,7),a+=7):(c=null,o===0&&u('"expires"')),c!==null?(t=i2(),t!==null?(i=t4(),i!==null?c=[c,t,i]:(c=null,a=d)):(c=null,a=d)):(c=null,a=d),c!==null&&(c=(function(p,g){typeof g<"u"&&(M.expires=g)})(f,c[2])),c===null&&(a=f),c===null&&(f=a,d=a,e.substr(a,11).toLowerCase()==="retry_after"?(c=e.substr(a,11),a+=11):(c=null,o===0&&u('"retry_after"')),c!==null?(t=i2(),t!==null?(i=t4(),i!==null?c=[c,t,i]:(c=null,a=d)):(c=null,a=d)):(c=null,a=d),c!==null&&(c=(function(p,g){typeof g<"u"&&(M.retry_after=g)})(f,c[2])),c===null&&(a=f),c===null&&(c=y2()))),c}function la(){var c;return e.substr(a,11).toLowerCase()==="deactivated"?(c=e.substr(a,11),a+=11):(c=null,o===0&&u('"deactivated"')),c===null&&(e.substr(a,9).toLowerCase()==="probation"?(c=e.substr(a,9),a+=9):(c=null,o===0&&u('"probation"')),c===null&&(e.substr(a,8).toLowerCase()==="rejected"?(c=e.substr(a,8),a+=8):(c=null,o===0&&u('"rejected"')),c===null&&(e.substr(a,7).toLowerCase()==="timeout"?(c=e.substr(a,7),a+=7):(c=null,o===0&&u('"timeout"')),c===null&&(e.substr(a,6).toLowerCase()==="giveup"?(c=e.substr(a,6),a+=6):(c=null,o===0&&u('"giveup"')),c===null&&(e.substr(a,10).toLowerCase()==="noresource"?(c=e.substr(a,10),a+=10):(c=null,o===0&&u('"noresource"')),c===null&&(e.substr(a,9).toLowerCase()==="invariant"?(c=e.substr(a,9),a+=9):(c=null,o===0&&u('"invariant"')),c===null&&(c=W()))))))),c}function Kr(){var c;return c=a4(),c=c!==null?c:"",c}function Yr(){var c,t,i,f,d,p;if(d=a,c=W(),c!==null){for(t=[],p=a,i=e2(),i!==null?(f=W(),f!==null?i=[i,f]:(i=null,a=p)):(i=null,a=p);i!==null;)t.push(i),p=a,i=e2(),i!==null?(f=W(),f!==null?i=[i,f]:(i=null,a=p)):(i=null,a=p);t!==null?c=[c,t]:(c=null,a=d)}else c=null,a=d;return c=c!==null?c:"",c}function Xr(){var c,t,i,f,d,p,g;if(d=a,p=a,c=Y4(),c===null&&(c=l4()),c!==null){for(t=[],g=a,i=K(),i!==null?(f=y6(),f!==null?i=[i,f]:(i=null,a=g)):(i=null,a=g);i!==null;)t.push(i),g=a,i=K(),i!==null?(f=y6(),f!==null?i=[i,f]:(i=null,a=g)):(i=null,a=g);t!==null?c=[c,t]:(c=null,a=p)}else c=null,a=p;return c!==null&&(c=(function(L){var N=M.tag;try{M=new T4(M.uri,M.display_name,M.params),N&&M.setParam("tag",N)}catch{M=-1}})(d)),c===null&&(a=d),c}function y6(){var c;return c=x6(),c===null&&(c=y2()),c}function Jr(){var c,t,i,f,d,p;if(d=a,c=c0(),c!==null){for(t=[],p=a,i=e2(),i!==null?(f=c0(),f!==null?i=[i,f]:(i=null,a=p)):(i=null,a=p);i!==null;)t.push(i),p=a,i=e2(),i!==null?(f=c0(),f!==null?i=[i,f]:(i=null,a=p)):(i=null,a=p);t!==null?c=[c,t]:(c=null,a=d)}else c=null,a=d;return c}function c0(){var c,t,i,f,d,p,g,L;if(g=a,c=ua(),c!==null)if(t=V(),t!==null)if(i=ha(),i!==null){for(f=[],L=a,d=K(),d!==null?(p=T6(),p!==null?d=[d,p]:(d=null,a=L)):(d=null,a=L);d!==null;)f.push(d),L=a,d=K(),d!==null?(p=T6(),p!==null?d=[d,p]:(d=null,a=L)):(d=null,a=L);f!==null?c=[c,t,i,f]:(c=null,a=g)}else c=null,a=g;else c=null,a=g;else c=null,a=g;return c}function T6(){var c;return c=ta(),c===null&&(c=ra(),c===null&&(c=ia(),c===null&&(c=na(),c===null&&(c=oa(),c===null&&(c=y2()))))),c}function ta(){var c,t,i,f,d;return f=a,d=a,e.substr(a,3).toLowerCase()==="ttl"?(c=e.substr(a,3),a+=3):(c=null,o===0&&u('"ttl"')),c!==null?(t=i2(),t!==null?(i=N6(),i!==null?c=[c,t,i]:(c=null,a=d)):(c=null,a=d)):(c=null,a=d),c!==null&&(c=(function(p,g){M.ttl=g})(f,c[2])),c===null&&(a=f),c}function ra(){var c,t,i,f,d;return f=a,d=a,e.substr(a,5).toLowerCase()==="maddr"?(c=e.substr(a,5),a+=5):(c=null,o===0&&u('"maddr"')),c!==null?(t=i2(),t!==null?(i=X4(),i!==null?c=[c,t,i]:(c=null,a=d)):(c=null,a=d)):(c=null,a=d),c!==null&&(c=(function(p,g){M.maddr=g})(f,c[2])),c===null&&(a=f),c}function ia(){var c,t,i,f,d;return f=a,d=a,e.substr(a,8).toLowerCase()==="received"?(c=e.substr(a,8),a+=8):(c=null,o===0&&u('"received"')),c!==null?(t=i2(),t!==null?(i=J4(),i===null&&(i=h6()),i!==null?c=[c,t,i]:(c=null,a=d)):(c=null,a=d)):(c=null,a=d),c!==null&&(c=(function(p,g){M.received=g})(f,c[2])),c===null&&(a=f),c}function na(){var c,t,i,f,d;return f=a,d=a,e.substr(a,6).toLowerCase()==="branch"?(c=e.substr(a,6),a+=6):(c=null,o===0&&u('"branch"')),c!==null?(t=i2(),t!==null?(i=W(),i!==null?c=[c,t,i]:(c=null,a=d)):(c=null,a=d)):(c=null,a=d),c!==null&&(c=(function(p,g){M.branch=g})(f,c[2])),c===null&&(a=f),c}function oa(){var c,t,i,f,d;return f=a,e.substr(a,5).toLowerCase()==="rport"?(c=e.substr(a,5),a+=5):(c=null,o===0&&u('"rport"')),c!==null?(d=a,t=i2(),t!==null?(i=fa(),i!==null?t=[t,i]:(t=null,a=d)):(t=null,a=d),t=t!==null?t:"",t!==null?c=[c,t]:(c=null,a=f)):(c=null,a=f),c}function fa(){var c,t,i,f,d,p,g;return p=a,g=a,c=b(),c=c!==null?c:"",c!==null?(t=b(),t=t!==null?t:"",t!==null?(i=b(),i=i!==null?i:"",i!==null?(f=b(),f=f!==null?f:"",f!==null?(d=b(),d=d!==null?d:"",d!==null?c=[c,t,i,f,d]:(c=null,a=g)):(c=null,a=g)):(c=null,a=g)):(c=null,a=g)):(c=null,a=g),c!==null&&(c=(function(L,N){M.rport=parseInt(N.join(""))})(p,c)),c===null&&(a=p),c}function ua(){var c,t,i,f,d,p;return p=a,c=da(),c!==null?(t=R1(),t!==null?(i=W(),i!==null?(f=R1(),f!==null?(d=pa(),d!==null?c=[c,t,i,f,d]:(c=null,a=p)):(c=null,a=p)):(c=null,a=p)):(c=null,a=p)):(c=null,a=p),c}function da(){var c,t;return t=a,e.substr(a,3).toLowerCase()==="sip"?(c=e.substr(a,3),a+=3):(c=null,o===0&&u('"SIP"')),c===null&&(c=W()),c!==null&&(c=(function(i,f){M.protocol=f})(t,c)),c===null&&(a=t),c}function pa(){var c,t;return t=a,e.substr(a,3).toLowerCase()==="udp"?(c=e.substr(a,3),a+=3):(c=null,o===0&&u('"UDP"')),c===null&&(e.substr(a,3).toLowerCase()==="tcp"?(c=e.substr(a,3),a+=3):(c=null,o===0&&u('"TCP"')),c===null&&(e.substr(a,3).toLowerCase()==="tls"?(c=e.substr(a,3),a+=3):(c=null,o===0&&u('"TLS"')),c===null&&(e.substr(a,4).toLowerCase()==="sctp"?(c=e.substr(a,4),a+=4):(c=null,o===0&&u('"SCTP"')),c===null&&(c=W())))),c!==null&&(c=(function(i,f){M.transport=f})(t,c)),c===null&&(a=t),c}function ha(){var c,t,i,f,d;return f=a,c=ma(),c!==null?(d=a,t=z2(),t!==null?(i=ga(),i!==null?t=[t,i]:(t=null,a=d)):(t=null,a=d),t=t!==null?t:"",t!==null?c=[c,t]:(c=null,a=f)):(c=null,a=f),c}function ma(){var c,t;return t=a,c=J4(),c===null&&(c=p6(),c===null&&(c=u6())),c!==null&&(c=(function(i){M.host=e.substring(a,i)})(t)),c===null&&(a=t),c}function ga(){var c,t,i,f,d,p,g;return p=a,g=a,c=b(),c=c!==null?c:"",c!==null?(t=b(),t=t!==null?t:"",t!==null?(i=b(),i=i!==null?i:"",i!==null?(f=b(),f=f!==null?f:"",f!==null?(d=b(),d=d!==null?d:"",d!==null?c=[c,t,i,f,d]:(c=null,a=g)):(c=null,a=g)):(c=null,a=g)):(c=null,a=g)):(c=null,a=g),c!==null&&(c=(function(L,N){M.port=parseInt(N.join(""))})(p,c)),c===null&&(a=p),c}function N6(){var c,t,i,f,d;return f=a,d=a,c=b(),c!==null?(t=b(),t=t!==null?t:"",t!==null?(i=b(),i=i!==null?i:"",i!==null?c=[c,t,i]:(c=null,a=d)):(c=null,a=d)):(c=null,a=d),c!==null&&(c=(function(p,g){return parseInt(g.join(""))})(f,c)),c===null&&(a=f),c}function Qr(){var c;return c=b6(),c}function Zr(){var c,t,i,f,d,p;if(d=a,c=va(),c!==null){for(t=[],p=a,i=K(),i!==null?(f=A6(),f!==null?i=[i,f]:(i=null,a=p)):(i=null,a=p);i!==null;)t.push(i),p=a,i=K(),i!==null?(f=A6(),f!==null?i=[i,f]:(i=null,a=p)):(i=null,a=p);t!==null?c=[c,t]:(c=null,a=d)}else c=null,a=d;return c}function va(){var c,t;return t=a,c=t4(),c!==null&&(c=(function(i,f){M.expires=f})(t,c)),c===null&&(a=t),c}function A6(){var c;return c=za(),c===null&&(c=y2()),c}function za(){var c,t,i,f,d;return f=a,d=a,e.substr(a,9).toLowerCase()==="refresher"?(c=e.substr(a,9),a+=9):(c=null,o===0&&u('"refresher"')),c!==null?(t=i2(),t!==null?(e.substr(a,3).toLowerCase()==="uac"?(i=e.substr(a,3),a+=3):(i=null,o===0&&u('"uac"')),i===null&&(e.substr(a,3).toLowerCase()==="uas"?(i=e.substr(a,3),a+=3):(i=null,o===0&&u('"uas"'))),i!==null?c=[c,t,i]:(c=null,a=d)):(c=null,a=d)):(c=null,a=d),c!==null&&(c=(function(p,g){M.refresher=g.toLowerCase()})(f,c[2])),c===null&&(a=f),c}function ei(){var c,t,i,f;return f=a,c=W(),c!==null?(t=e4(),t!==null?(i=Ma(),i!==null?c=[c,t,i]:(c=null,a=f)):(c=null,a=f)):(c=null,a=f),c}function Ma(){var c,t;for(c=[],t=n1(),t===null&&(t=b1(),t===null&&(t=V()));t!==null;)c.push(t),t=n1(),t===null&&(t=b1(),t===null&&(t=V()));return c}function ai(){var c,t;for(c=[],t=u2();t!==null;)c.push(t),t=u2();return c}function si(){var c,t,i;return i=a,e.substr(a,5)==="uuid:"?(c="uuid:",a+=5):(c=null,o===0&&u('"uuid:"')),c!==null?(t=_a(),t!==null?c=[c,t]:(c=null,a=i)):(c=null,a=i),c}function _a(){var c,t,i,f,d,p,g,L,N,q,d2;return q=a,d2=a,c=Ca(),c!==null?(e.charCodeAt(a)===45?(t="-",a++):(t=null,o===0&&u('"-"')),t!==null?(i=I1(),i!==null?(e.charCodeAt(a)===45?(f="-",a++):(f=null,o===0&&u('"-"')),f!==null?(d=I1(),d!==null?(e.charCodeAt(a)===45?(p="-",a++):(p=null,o===0&&u('"-"')),p!==null?(g=I1(),g!==null?(e.charCodeAt(a)===45?(L="-",a++):(L=null,o===0&&u('"-"')),L!==null?(N=La(),N!==null?c=[c,t,i,f,d,p,g,L,N]:(c=null,a=d2)):(c=null,a=d2)):(c=null,a=d2)):(c=null,a=d2)):(c=null,a=d2)):(c=null,a=d2)):(c=null,a=d2)):(c=null,a=d2)):(c=null,a=d2),c!==null&&(c=(function(w1,l0){M=e.substring(a+5,w1)})(q,c[0])),c===null&&(a=q),c}function I1(){var c,t,i,f,d;return d=a,c=y(),c!==null?(t=y(),t!==null?(i=y(),i!==null?(f=y(),f!==null?c=[c,t,i,f]:(c=null,a=d)):(c=null,a=d)):(c=null,a=d)):(c=null,a=d),c}function Ca(){var c,t,i;return i=a,c=I1(),c!==null?(t=I1(),t!==null?c=[c,t]:(c=null,a=i)):(c=null,a=i),c}function La(){var c,t,i,f;return f=a,c=I1(),c!==null?(t=I1(),t!==null?(i=I1(),i!==null?c=[c,t,i]:(c=null,a=f)):(c=null,a=f)):(c=null,a=f),c}function ci(){var c,t,i,f,d,p,g;if(d=a,p=a,c=Y4(),c===null&&(c=l4()),c!==null){for(t=[],g=a,i=K(),i!==null?(f=y2(),f!==null?i=[i,f]:(i=null,a=g)):(i=null,a=g);i!==null;)t.push(i),g=a,i=K(),i!==null?(f=y2(),f!==null?i=[i,f]:(i=null,a=g)):(i=null,a=g);t!==null?c=[c,t]:(c=null,a=p)}else c=null,a=p;return c!==null&&(c=(function(L){try{M=new T4(M.uri,M.display_name,M.params)}catch{M=-1}})(d)),c===null&&(a=d),c}function li(){var c,t,i,f,d,p;if(d=a,c=xa(),c!==null){for(t=[],p=a,i=K(),i!==null?(f=E6(),f!==null?i=[i,f]:(i=null,a=p)):(i=null,a=p);i!==null;)t.push(i),p=a,i=K(),i!==null?(f=E6(),f!==null?i=[i,f]:(i=null,a=p)):(i=null,a=p);t!==null?c=[c,t]:(c=null,a=d)}else c=null,a=d;return c}function xa(){var c,t,i,f,d,p;return f=a,d=a,c=S1(),c!==null?(p=a,e.charCodeAt(a)===64?(t="@",a++):(t=null,o===0&&u('"@"')),t!==null?(i=S1(),i!==null?t=[t,i]:(t=null,a=p)):(t=null,a=p),t=t!==null?t:"",t!==null?c=[c,t]:(c=null,a=d)):(c=null,a=d),c!==null&&(c=(function(g){M.call_id=e.substring(a,g)})(f)),c===null&&(a=f),c}function E6(){var c;return c=ba(),c===null&&(c=Sa(),c===null&&(c=wa(),c===null&&(c=y2()))),c}function ba(){var c,t,i,f,d;return f=a,d=a,e.substr(a,6)==="to-tag"?(c="to-tag",a+=6):(c=null,o===0&&u('"to-tag"')),c!==null?(t=i2(),t!==null?(i=W(),i!==null?c=[c,t,i]:(c=null,a=d)):(c=null,a=d)):(c=null,a=d),c!==null&&(c=(function(p,g){M.to_tag=g})(f,c[2])),c===null&&(a=f),c}function Sa(){var c,t,i,f,d;return f=a,d=a,e.substr(a,8)==="from-tag"?(c="from-tag",a+=8):(c=null,o===0&&u('"from-tag"')),c!==null?(t=i2(),t!==null?(i=W(),i!==null?c=[c,t,i]:(c=null,a=d)):(c=null,a=d)):(c=null,a=d),c!==null&&(c=(function(p,g){M.from_tag=g})(f,c[2])),c===null&&(a=f),c}function wa(){var c,t;return t=a,e.substr(a,10)==="early-only"?(c="early-only",a+=10):(c=null,o===0&&u('"early-only"')),c!==null&&(c=(function(i){M.early_only=!0})(t)),c===null&&(a=t),c}function ti(c){c.sort();for(var t=null,i=[],f=0;f<c.length;f++)c[f]!==t&&(i.push(c[f]),t=c[f]);return i}function ri(){for(var c=1,t=1,i=!1,f=0;f<Math.max(a,h);f++){var d=e.charAt(f);d===`
`?(i||c++,t=1,i=!1):d==="\r"||d==="\u2028"||d==="\u2029"?(c++,t=1,i=!0):(t++,i=!1)}return{line:c,column:t}}var ya=H1(),T4=w0(),M={},ii=n[l]();if(ii===null||a!==e.length){var k6=Math.max(a,h),ni=k6<e.length?e.charAt(k6):null,Ta=ri();return new this.SyntaxError(ti(m),ni,k6,Ta.line,Ta.column),-1}return M},toSource:function(){return this._source}};return s.SyntaxError=function(e,l,n,a,o){function h(m,v){var _,u;switch(m.length){case 0:_="end of input";break;case 1:_=m[0];break;default:_=m.slice(0,m.length-1).join(", ")+" or "+m[m.length-1]}return u=v?r(v):"end of input","Expected "+_+" but "+u+" found."}this.name="SyntaxError",this.expected=e,this.found=l,this.message=h(e,l),this.offset=n,this.line=a,this.column=o},s.SyntaxError.prototype=Error.prototype,s})()});var H1=Z((tp,Sl)=>{"use strict";var Qi=x2(),P4=k2(),Zi=u1();Sl.exports=class bl{static parse(s){if(s=Zi.parse(s,"SIP_URI"),s!==-1)return s}constructor(s,e,l,n,a={},o={}){if(!l)throw new TypeError('missing or invalid "host" parameter');this._parameters={},this._headers={},this._scheme=s||Qi.SIP,this._user=e,this._host=l,this._port=n;for(let h in a)Object.prototype.hasOwnProperty.call(a,h)&&this.setParam(h,a[h]);for(let h in o)Object.prototype.hasOwnProperty.call(o,h)&&this.setHeader(h,o[h])}get scheme(){return this._scheme}set scheme(s){this._scheme=s.toLowerCase()}get user(){return this._user}set user(s){this._user=s}get host(){return this._host}set host(s){this._host=s.toLowerCase()}get port(){return this._port}set port(s){this._port=s===0?s:parseInt(s,10)||null}setParam(s,e){s&&(this._parameters[s.toLowerCase()]=typeof e>"u"||e===null?null:e.toString())}getParam(s){if(s)return this._parameters[s.toLowerCase()]}hasParam(s){if(s)return this._parameters.hasOwnProperty(s.toLowerCase())&&!0||!1}deleteParam(s){if(s=s.toLowerCase(),this._parameters.hasOwnProperty(s)){let e=this._parameters[s];return delete this._parameters[s],e}}clearParams(){this._parameters={}}setHeader(s,e){this._headers[P4.headerize(s)]=Array.isArray(e)?e:[e]}getHeader(s){if(s)return this._headers[P4.headerize(s)]}hasHeader(s){if(s)return this._headers.hasOwnProperty(P4.headerize(s))&&!0||!1}deleteHeader(s){if(s=P4.headerize(s),this._headers.hasOwnProperty(s)){let e=this._headers[s];return delete this._headers[s],e}}clearHeaders(){this._headers={}}clone(){return new bl(this._scheme,this._user,this._host,this._port,JSON.parse(JSON.stringify(this._parameters)),JSON.parse(JSON.stringify(this._headers)))}toString(){let s=[],e=`${this._scheme}:`;this._user&&(e+=`${P4.escapeUser(this._user)}@`),e+=this._host,(this._port||this._port===0)&&(e+=`:${this._port}`);for(let l in this._parameters)Object.prototype.hasOwnProperty.call(this._parameters,l)&&(e+=`;${l}`,this._parameters[l]!==null&&(e+=`=${this._parameters[l]}`));for(let l in this._headers)if(Object.prototype.hasOwnProperty.call(this._headers,l))for(let n of this._headers[l])s.push(`${l}=${n}`);return s.length>0&&(e+=`?${s.join("&")}`),e}toAor(s){let e=`${this._scheme}:`;return this._user&&(e+=`${P4.escapeUser(this._user)}@`),e+=this._host,s&&(this._port||this._port===0)&&(e+=`:${this._port}`),e}}});var k2=Z(T2=>{"use strict";var g3=x2(),wl=H1(),en=u1();T2.str_utf8_length=r=>unescape(encodeURIComponent(r)).length;var an=T2.isFunction=r=>r!==void 0?Object.prototype.toString.call(r)==="[object Function]":!1;T2.isString=r=>r!==void 0?Object.prototype.toString.call(r)==="[object String]":!1;T2.isDecimal=r=>!isNaN(r)&&parseFloat(r)===parseInt(r,10);T2.isEmpty=r=>r===null||r===""||r===void 0||Array.isArray(r)&&r.length===0||typeof r=="number"&&isNaN(r);T2.hasMethods=function(r,...s){for(let e of s)if(an(r[e]))return!1;return!0};var sn=T2.createRandomToken=(r,s=32)=>{let e,l,n="";for(e=0;e<r;e++)l=Math.random()*s|0,n+=l.toString(s);return n};T2.newTag=()=>sn(10);T2.newUUID=()=>"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,s=>{let e=Math.random()*16|0;return(s==="x"?e:e&3|8).toString(16)});T2.hostType=r=>{if(r){if(r=en.parse(r,"host"),r!==-1)return r.host_type}else return};var cn=T2.escapeUser=r=>encodeURIComponent(decodeURIComponent(r)).replace(/%3A/gi,":").replace(/%2B/gi,"+").replace(/%3F/gi,"?").replace(/%2F/gi,"/");T2.normalizeTarget=(r,s)=>{if(r){if(r instanceof wl)return r;if(typeof r=="string"){let e=r.split("@"),l,n;switch(e.length){case 1:{if(!s)return;l=r,n=s;break}case 2:{l=e[0],n=e[1];break}default:l=e.slice(0,e.length-1).join("@"),n=e[e.length-1]}l=l.replace(/^(sips?|tel):/i,""),/^[-.()]*\+?[0-9\-.()]+$/.test(l)&&(l=l.replace(/[-.()]/g,"")),r=`${g3.SIP}:${cn(l)}@${n}`;let a;return(a=wl.parse(r))?a:void 0}else return}else return};T2.headerize=r=>{let s={"Call-Id":"Call-ID",Cseq:"CSeq","Www-Authenticate":"WWW-Authenticate"},e=r.toLowerCase().replace(/_/g,"-").split("-"),l="",n=e.length,a;for(a=0;a<n;a++)a!==0&&(l+="-"),l+=e[a].charAt(0).toUpperCase()+e[a].substring(1);return s[l]&&(l=s[l]),l};T2.sipErrorCause=r=>{for(let s in g3.SIP_ERROR_CAUSES)if(g3.SIP_ERROR_CAUSES[s].indexOf(r)!==-1)return g3.causes[s];return g3.causes.SIP_FAILURE_CODE};T2.getRandomTestNetIP=()=>{function r(s,e){return Math.floor(Math.random()*(e-s+1)+s)}return`192.0.2.${r(1,254)}`};T2.calculateMD5=r=>{function s(Q,j){return Q<<j|Q>>>32-j}function e(Q,j){let a2=Q&2147483648,t2=j&2147483648,e2=Q&1073741824,K=j&1073741824,z2=(Q&1073741823)+(j&1073741823);return e2&K?z2^2147483648^a2^t2:e2|K?z2&1073741824?z2^3221225472^a2^t2:z2^1073741824^a2^t2:z2^a2^t2}function l(Q,j,a2){return Q&j|~Q&a2}function n(Q,j,a2){return Q&a2|j&~a2}function a(Q,j,a2){return Q^j^a2}function o(Q,j,a2){return j^(Q|~a2)}function h(Q,j,a2,t2,e2,K,z2){return Q=e(Q,e(e(l(j,a2,t2),e2),z2)),e(s(Q,K),j)}function m(Q,j,a2,t2,e2,K,z2){return Q=e(Q,e(e(n(j,a2,t2),e2),z2)),e(s(Q,K),j)}function v(Q,j,a2,t2,e2,K,z2){return Q=e(Q,e(e(a(j,a2,t2),e2),z2)),e(s(Q,K),j)}function _(Q,j,a2,t2,e2,K,z2){return Q=e(Q,e(e(o(j,a2,t2),e2),z2)),e(s(Q,K),j)}function u(Q){let j,a2=Q.length,t2=a2+8,K=((t2-t2%64)/64+1)*16,z2=new Array(K-1),V1=0,e1=0;for(;e1<a2;)j=(e1-e1%4)/4,V1=e1%4*8,z2[j]=z2[j]|Q.charCodeAt(e1)<<V1,e1++;return j=(e1-e1%4)/4,V1=e1%4*8,z2[j]=z2[j]|128<<V1,z2[K-2]=a2<<3,z2[K-1]=a2>>>29,z2}function k(Q){let j="",a2="",t2,e2;for(e2=0;e2<=3;e2++)t2=Q>>>e2*8&255,a2=`0${t2.toString(16)}`,j=j+a2.substr(a2.length-2,2);return j}function b(Q){let j="";for(let a2=0;a2<Q.length;a2++){let t2=Q.charCodeAt(a2);t2<128?j+=String.fromCharCode(t2):t2>127&&t2<2048?(j+=String.fromCharCode(t2>>6|192),j+=String.fromCharCode(t2&63|128)):(j+=String.fromCharCode(t2>>12|224),j+=String.fromCharCode(t2>>6&63|128),j+=String.fromCharCode(t2&63|128))}return j}let S=[],y,H,u2,g2,v2,I,R,P,A,Y=7,G=12,V=17,l2=22,e4=5,a4=9,n1=14,v1=20,b1=4,w4=11,W=16,k1=23,y4=6,S1=10,s4=15,R1=21;for(r=b(r),S=u(r),I=1732584193,R=4023233417,P=2562383102,A=271733878,y=0;y<S.length;y+=16)H=I,u2=R,g2=P,v2=A,I=h(I,R,P,A,S[y+0],Y,3614090360),A=h(A,I,R,P,S[y+1],G,3905402710),P=h(P,A,I,R,S[y+2],V,606105819),R=h(R,P,A,I,S[y+3],l2,3250441966),I=h(I,R,P,A,S[y+4],Y,4118548399),A=h(A,I,R,P,S[y+5],G,1200080426),P=h(P,A,I,R,S[y+6],V,2821735955),R=h(R,P,A,I,S[y+7],l2,4249261313),I=h(I,R,P,A,S[y+8],Y,1770035416),A=h(A,I,R,P,S[y+9],G,2336552879),P=h(P,A,I,R,S[y+10],V,4294925233),R=h(R,P,A,I,S[y+11],l2,2304563134),I=h(I,R,P,A,S[y+12],Y,1804603682),A=h(A,I,R,P,S[y+13],G,4254626195),P=h(P,A,I,R,S[y+14],V,2792965006),R=h(R,P,A,I,S[y+15],l2,1236535329),I=m(I,R,P,A,S[y+1],e4,4129170786),A=m(A,I,R,P,S[y+6],a4,3225465664),P=m(P,A,I,R,S[y+11],n1,643717713),R=m(R,P,A,I,S[y+0],v1,3921069994),I=m(I,R,P,A,S[y+5],e4,3593408605),A=m(A,I,R,P,S[y+10],a4,38016083),P=m(P,A,I,R,S[y+15],n1,3634488961),R=m(R,P,A,I,S[y+4],v1,3889429448),I=m(I,R,P,A,S[y+9],e4,568446438),A=m(A,I,R,P,S[y+14],a4,3275163606),P=m(P,A,I,R,S[y+3],n1,4107603335),R=m(R,P,A,I,S[y+8],v1,1163531501),I=m(I,R,P,A,S[y+13],e4,2850285829),A=m(A,I,R,P,S[y+2],a4,4243563512),P=m(P,A,I,R,S[y+7],n1,1735328473),R=m(R,P,A,I,S[y+12],v1,2368359562),I=v(I,R,P,A,S[y+5],b1,4294588738),A=v(A,I,R,P,S[y+8],w4,2272392833),P=v(P,A,I,R,S[y+11],W,1839030562),R=v(R,P,A,I,S[y+14],k1,4259657740),I=v(I,R,P,A,S[y+1],b1,2763975236),A=v(A,I,R,P,S[y+4],w4,1272893353),P=v(P,A,I,R,S[y+7],W,4139469664),R=v(R,P,A,I,S[y+10],k1,3200236656),I=v(I,R,P,A,S[y+13],b1,681279174),A=v(A,I,R,P,S[y+0],w4,3936430074),P=v(P,A,I,R,S[y+3],W,3572445317),R=v(R,P,A,I,S[y+6],k1,76029189),I=v(I,R,P,A,S[y+9],b1,3654602809),A=v(A,I,R,P,S[y+12],w4,3873151461),P=v(P,A,I,R,S[y+15],W,530742520),R=v(R,P,A,I,S[y+2],k1,3299628645),I=_(I,R,P,A,S[y+0],y4,4096336452),A=_(A,I,R,P,S[y+7],S1,1126891415),P=_(P,A,I,R,S[y+14],s4,2878612391),R=_(R,P,A,I,S[y+5],R1,4237533241),I=_(I,R,P,A,S[y+12],y4,1700485571),A=_(A,I,R,P,S[y+3],S1,2399980690),P=_(P,A,I,R,S[y+10],s4,4293915773),R=_(R,P,A,I,S[y+1],R1,2240044497),I=_(I,R,P,A,S[y+8],y4,1873313359),A=_(A,I,R,P,S[y+15],S1,4264355552),P=_(P,A,I,R,S[y+6],s4,2734768916),R=_(R,P,A,I,S[y+13],R1,1309151649),I=_(I,R,P,A,S[y+4],y4,4149444226),A=_(A,I,R,P,S[y+11],S1,3174756917),P=_(P,A,I,R,S[y+2],s4,718787259),R=_(R,P,A,I,S[y+9],R1,3951481745),I=e(I,H),R=e(R,u2),P=e(P,g2),A=e(A,v2);return(k(I)+k(R)+k(P)+k(A)).toLowerCase()};T2.closeMediaStream=r=>{if(r)try{let s;if(r.getTracks){s=r.getTracks();for(let e of s)e.stop()}else{s=r.getAudioTracks();for(let e of s)e.stop();s=r.getVideoTracks();for(let e of s)e.stop()}}catch{(typeof r.stop=="function"||typeof r.stop=="object")&&r.stop()}};T2.cloneArray=r=>r&&r.slice()||[];T2.cloneObject=(r,s={})=>r&&Object.assign({},r)||s});var _1=Z((ip,ve)=>{"use strict";var D4=typeof Reflect=="object"?Reflect:null,yl=D4&&typeof D4.apply=="function"?D4.apply:function(s,e,l){return Function.prototype.apply.call(s,e,l)},y0;D4&&typeof D4.ownKeys=="function"?y0=D4.ownKeys:Object.getOwnPropertySymbols?y0=function(s){return Object.getOwnPropertyNames(s).concat(Object.getOwnPropertySymbols(s))}:y0=function(s){return Object.getOwnPropertyNames(s)};function ln(r){console&&console.warn&&console.warn(r)}var Nl=Number.isNaN||function(s){return s!==s};function n2(){n2.init.call(this)}ve.exports=n2;ve.exports.once=on;n2.EventEmitter=n2;n2.prototype._events=void 0;n2.prototype._eventsCount=0;n2.prototype._maxListeners=void 0;var Tl=10;function T0(r){if(typeof r!="function")throw new TypeError('The "listener" argument must be of type Function. Received type '+typeof r)}Object.defineProperty(n2,"defaultMaxListeners",{enumerable:!0,get:function(){return Tl},set:function(r){if(typeof r!="number"||r<0||Nl(r))throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received '+r+".");Tl=r}});n2.init=function(){(this._events===void 0||this._events===Object.getPrototypeOf(this)._events)&&(this._events=Object.create(null),this._eventsCount=0),this._maxListeners=this._maxListeners||void 0};n2.prototype.setMaxListeners=function(s){if(typeof s!="number"||s<0||Nl(s))throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received '+s+".");return this._maxListeners=s,this};function Al(r){return r._maxListeners===void 0?n2.defaultMaxListeners:r._maxListeners}n2.prototype.getMaxListeners=function(){return Al(this)};n2.prototype.emit=function(s){for(var e=[],l=1;l<arguments.length;l++)e.push(arguments[l]);var n=s==="error",a=this._events;if(a!==void 0)n=n&&a.error===void 0;else if(!n)return!1;if(n){var o;if(e.length>0&&(o=e[0]),o instanceof Error)throw o;var h=new Error("Unhandled error."+(o?" ("+o.message+")":""));throw h.context=o,h}var m=a[s];if(m===void 0)return!1;if(typeof m=="function")yl(m,this,e);else for(var v=m.length,_=Pl(m,v),l=0;l<v;++l)yl(_[l],this,e);return!0};function El(r,s,e,l){var n,a,o;if(T0(e),a=r._events,a===void 0?(a=r._events=Object.create(null),r._eventsCount=0):(a.newListener!==void 0&&(r.emit("newListener",s,e.listener?e.listener:e),a=r._events),o=a[s]),o===void 0)o=a[s]=e,++r._eventsCount;else if(typeof o=="function"?o=a[s]=l?[e,o]:[o,e]:l?o.unshift(e):o.push(e),n=Al(r),n>0&&o.length>n&&!o.warned){o.warned=!0;var h=new Error("Possible EventEmitter memory leak detected. "+o.length+" "+String(s)+" listeners added. Use emitter.setMaxListeners() to increase limit");h.name="MaxListenersExceededWarning",h.emitter=r,h.type=s,h.count=o.length,ln(h)}return r}n2.prototype.addListener=function(s,e){return El(this,s,e,!1)};n2.prototype.on=n2.prototype.addListener;n2.prototype.prependListener=function(s,e){return El(this,s,e,!0)};function tn(){if(!this.fired)return this.target.removeListener(this.type,this.wrapFn),this.fired=!0,arguments.length===0?this.listener.call(this.target):this.listener.apply(this.target,arguments)}function kl(r,s,e){var l={fired:!1,wrapFn:void 0,target:r,type:s,listener:e},n=tn.bind(l);return n.listener=e,l.wrapFn=n,n}n2.prototype.once=function(s,e){return T0(e),this.on(s,kl(this,s,e)),this};n2.prototype.prependOnceListener=function(s,e){return T0(e),this.prependListener(s,kl(this,s,e)),this};n2.prototype.removeListener=function(s,e){var l,n,a,o,h;if(T0(e),n=this._events,n===void 0)return this;if(l=n[s],l===void 0)return this;if(l===e||l.listener===e)--this._eventsCount===0?this._events=Object.create(null):(delete n[s],n.removeListener&&this.emit("removeListener",s,l.listener||e));else if(typeof l!="function"){for(a=-1,o=l.length-1;o>=0;o--)if(l[o]===e||l[o].listener===e){h=l[o].listener,a=o;break}if(a<0)return this;a===0?l.shift():rn(l,a),l.length===1&&(n[s]=l[0]),n.removeListener!==void 0&&this.emit("removeListener",s,h||e)}return this};n2.prototype.off=n2.prototype.removeListener;n2.prototype.removeAllListeners=function(s){var e,l,n;if(l=this._events,l===void 0)return this;if(l.removeListener===void 0)return arguments.length===0?(this._events=Object.create(null),this._eventsCount=0):l[s]!==void 0&&(--this._eventsCount===0?this._events=Object.create(null):delete l[s]),this;if(arguments.length===0){var a=Object.keys(l),o;for(n=0;n<a.length;++n)o=a[n],o!=="removeListener"&&this.removeAllListeners(o);return this.removeAllListeners("removeListener"),this._events=Object.create(null),this._eventsCount=0,this}if(e=l[s],typeof e=="function")this.removeListener(s,e);else if(e!==void 0)for(n=e.length-1;n>=0;n--)this.removeListener(s,e[n]);return this};function Rl(r,s,e){var l=r._events;if(l===void 0)return[];var n=l[s];return n===void 0?[]:typeof n=="function"?e?[n.listener||n]:[n]:e?nn(n):Pl(n,n.length)}n2.prototype.listeners=function(s){return Rl(this,s,!0)};n2.prototype.rawListeners=function(s){return Rl(this,s,!1)};n2.listenerCount=function(r,s){return typeof r.listenerCount=="function"?r.listenerCount(s):Il.call(r,s)};n2.prototype.listenerCount=Il;function Il(r){var s=this._events;if(s!==void 0){var e=s[r];if(typeof e=="function")return 1;if(e!==void 0)return e.length}return 0}n2.prototype.eventNames=function(){return this._eventsCount>0?y0(this._events):[]};function Pl(r,s){for(var e=new Array(s),l=0;l<s;++l)e[l]=r[l];return e}function rn(r,s){for(;s+1<r.length;s++)r[s]=r[s+1];r.pop()}function nn(r){for(var s=new Array(r.length),e=0;e<s.length;++e)s[e]=r[e].listener||r[e];return s}function on(r,s){return new Promise(function(e,l){function n(o){r.removeListener(s,a),l(o)}function a(){typeof r.removeListener=="function"&&r.removeListener("error",n),e([].slice.call(arguments))}Dl(r,s,a,{once:!0}),s!=="error"&&fn(r,n,{once:!0})})}function fn(r,s,e){typeof r.on=="function"&&Dl(r,"error",s,e)}function Dl(r,s,e,l){if(typeof r.on=="function")l.once?r.once(s,e):r.on(s,e);else if(typeof r.addEventListener=="function")r.addEventListener(s,function n(a){l.once&&r.removeEventListener(s,n),e(a)});else throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type '+typeof r)}});var Ul=Z((np,$l)=>{"use strict";var $4=1e3,U4=$4*60,F4=U4*60,h4=F4*24,un=h4*7,dn=h4*365.25;$l.exports=function(r,s){s=s||{};var e=typeof r;if(e==="string"&&r.length>0)return pn(r);if(e==="number"&&isFinite(r))return s.long?mn(r):hn(r);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(r))};function pn(r){if(r=String(r),!(r.length>100)){var s=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(r);if(s){var e=parseFloat(s[1]),l=(s[2]||"ms").toLowerCase();switch(l){case"years":case"year":case"yrs":case"yr":case"y":return e*dn;case"weeks":case"week":case"w":return e*un;case"days":case"day":case"d":return e*h4;case"hours":case"hour":case"hrs":case"hr":case"h":return e*F4;case"minutes":case"minute":case"mins":case"min":case"m":return e*U4;case"seconds":case"second":case"secs":case"sec":case"s":return e*$4;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return e;default:return}}}}function hn(r){var s=Math.abs(r);return s>=h4?Math.round(r/h4)+"d":s>=F4?Math.round(r/F4)+"h":s>=U4?Math.round(r/U4)+"m":s>=$4?Math.round(r/$4)+"s":r+"ms"}function mn(r){var s=Math.abs(r);return s>=h4?N0(r,s,h4,"day"):s>=F4?N0(r,s,F4,"hour"):s>=U4?N0(r,s,U4,"minute"):s>=$4?N0(r,s,$4,"second"):r+" ms"}function N0(r,s,e,l){var n=s>=e*1.5;return Math.round(r/e)+" "+l+(n?"s":"")}});var Hl=Z((op,Fl)=>{"use strict";function gn(r){e.debug=e,e.default=e,e.coerce=m,e.disable=o,e.enable=n,e.enabled=h,e.humanize=Ul(),e.destroy=v,Object.keys(r).forEach(_=>{e[_]=r[_]}),e.names=[],e.skips=[],e.formatters={};function s(_){let u=0;for(let k=0;k<_.length;k++)u=(u<<5)-u+_.charCodeAt(k),u|=0;return e.colors[Math.abs(u)%e.colors.length]}e.selectColor=s;function e(_){let u,k=null,b,S;function y(...H){if(!y.enabled)return;let u2=y,g2=Number(new Date),v2=g2-(u||g2);u2.diff=v2,u2.prev=u,u2.curr=g2,u=g2,H[0]=e.coerce(H[0]),typeof H[0]!="string"&&H.unshift("%O");let I=0;H[0]=H[0].replace(/%([a-zA-Z%])/g,(P,A)=>{if(P==="%%")return"%";I++;let Y=e.formatters[A];if(typeof Y=="function"){let G=H[I];P=Y.call(u2,G),H.splice(I,1),I--}return P}),e.formatArgs.call(u2,H),(u2.log||e.log).apply(u2,H)}return y.namespace=_,y.useColors=e.useColors(),y.color=e.selectColor(_),y.extend=l,y.destroy=e.destroy,Object.defineProperty(y,"enabled",{enumerable:!0,configurable:!1,get:()=>k!==null?k:(b!==e.namespaces&&(b=e.namespaces,S=e.enabled(_)),S),set:H=>{k=H}}),typeof e.init=="function"&&e.init(y),y}function l(_,u){let k=e(this.namespace+(typeof u>"u"?":":u)+_);return k.log=this.log,k}function n(_){e.save(_),e.namespaces=_,e.names=[],e.skips=[];let u=(typeof _=="string"?_:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let k of u)k[0]==="-"?e.skips.push(k.slice(1)):e.names.push(k)}function a(_,u){let k=0,b=0,S=-1,y=0;for(;k<_.length;)if(b<u.length&&(u[b]===_[k]||u[b]==="*"))u[b]==="*"?(S=b,y=k,b++):(k++,b++);else if(S!==-1)b=S+1,y++,k=y;else return!1;for(;b<u.length&&u[b]==="*";)b++;return b===u.length}function o(){let _=[...e.names,...e.skips.map(u=>"-"+u)].join(",");return e.enable(""),_}function h(_){for(let u of e.skips)if(a(_,u))return!1;for(let u of e.names)if(a(_,u))return!0;return!1}function m(_){return _ instanceof Error?_.stack||_.message:_}function v(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return e.enable(e.load()),e}Fl.exports=gn});var E0=Z((Z2,A0)=>{"use strict";Z2.formatArgs=zn;Z2.save=Mn;Z2.load=_n;Z2.useColors=vn;Z2.storage=Cn();Z2.destroy=(()=>{let r=!1;return()=>{r||(r=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();Z2.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function vn(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let r;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(r=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(r[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function zn(r){if(r[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+r[0]+(this.useColors?"%c ":" ")+"+"+A0.exports.humanize(this.diff),!this.useColors)return;let s="color: "+this.color;r.splice(1,0,s,"color: inherit");let e=0,l=0;r[0].replace(/%[a-zA-Z%]/g,n=>{n!=="%%"&&(e++,n==="%c"&&(l=e))}),r.splice(l,0,s)}Z2.log=console.debug||console.log||(()=>{});function Mn(r){try{r?Z2.storage.setItem("debug",r):Z2.storage.removeItem("debug")}catch{}}function _n(){let r;try{r=Z2.storage.getItem("debug")||Z2.storage.getItem("DEBUG")}catch{}return!r&&typeof process<"u"&&"env"in process&&(r=process.env.DEBUG),r}function Cn(){try{return localStorage}catch{}}A0.exports=Hl()(Z2);var{formatters:Ln}=A0.exports;Ln.j=function(r){try{return JSON.stringify(r)}catch(s){return"[UnexpectedJSONParseError]: "+s.message}}});var w2=Z((up,Ol)=>{"use strict";var H4=E0(),O4="JsSIP";Ol.exports=class{constructor(s){s?(this._debug=H4.default(`${O4}:${s}`),this._warn=H4.default(`${O4}:WARN:${s}`),this._error=H4.default(`${O4}:ERROR:${s}`)):(this._debug=H4.default(O4),this._warn=H4.default(`${O4}:WARN`),this._error=H4.default(`${O4}:ERROR`)),this._debug.log=console.info.bind(console),this._warn.log=console.warn.bind(console),this._error.log=console.error.bind(console)}get debug(){return this._debug}get warn(){return this._warn}get error(){return this._error}}});var k0=Z((dp,ql)=>{"use strict";var Bl=ql.exports={v:[{name:"version",reg:/^(\d*)$/}],o:[{name:"origin",reg:/^(\S*) (\d*) (\d*) (\S*) IP(\d) (\S*)/,names:["username","sessionId","sessionVersion","netType","ipVer","address"],format:"%s %s %d %s IP%d %s"}],s:[{name:"name"}],i:[{name:"description"}],u:[{name:"uri"}],e:[{name:"email"}],p:[{name:"phone"}],z:[{name:"timezones"}],r:[{name:"repeats"}],t:[{name:"timing",reg:/^(\d*) (\d*)/,names:["start","stop"],format:"%d %d"}],c:[{name:"connection",reg:/^IN IP(\d) (\S*)/,names:["version","ip"],format:"IN IP%d %s"}],b:[{push:"bandwidth",reg:/^(TIAS|AS|CT|RR|RS):(\d*)/,names:["type","limit"],format:"%s:%s"}],m:[{reg:/^(\w*) (\d*) ([\w/]*)(?: (.*))?/,names:["type","port","protocol","payloads"],format:"%s %d %s %s"}],a:[{push:"rtp",reg:/^rtpmap:(\d*) ([\w\-.]*)(?:\s*\/(\d*)(?:\s*\/(\S*))?)?/,names:["payload","codec","rate","encoding"],format:function(r){return r.encoding?"rtpmap:%d %s/%s/%s":r.rate?"rtpmap:%d %s/%s":"rtpmap:%d %s"}},{push:"fmtp",reg:/^fmtp:(\d*) ([\S| ]*)/,names:["payload","config"],format:"fmtp:%d %s"},{name:"control",reg:/^control:(.*)/,format:"control:%s"},{name:"rtcp",reg:/^rtcp:(\d*)(?: (\S*) IP(\d) (\S*))?/,names:["port","netType","ipVer","address"],format:function(r){return r.address!=null?"rtcp:%d %s IP%d %s":"rtcp:%d"}},{push:"rtcpFbTrrInt",reg:/^rtcp-fb:(\*|\d*) trr-int (\d*)/,names:["payload","value"],format:"rtcp-fb:%s trr-int %d"},{push:"rtcpFb",reg:/^rtcp-fb:(\*|\d*) ([\w-_]*)(?: ([\w-_]*))?/,names:["payload","type","subtype"],format:function(r){return r.subtype!=null?"rtcp-fb:%s %s %s":"rtcp-fb:%s %s"}},{push:"ext",reg:/^extmap:(\d+)(?:\/(\w+))?(?: (urn:ietf:params:rtp-hdrext:encrypt))? (\S*)(?: (\S*))?/,names:["value","direction","encrypt-uri","uri","config"],format:function(r){return"extmap:%d"+(r.direction?"/%s":"%v")+(r["encrypt-uri"]?" %s":"%v")+" %s"+(r.config?" %s":"")}},{name:"extmapAllowMixed",reg:/^(extmap-allow-mixed)/},{push:"crypto",reg:/^crypto:(\d*) ([\w_]*) (\S*)(?: (\S*))?/,names:["id","suite","config","sessionConfig"],format:function(r){return r.sessionConfig!=null?"crypto:%d %s %s %s":"crypto:%d %s %s"}},{name:"setup",reg:/^setup:(\w*)/,format:"setup:%s"},{name:"connectionType",reg:/^connection:(new|existing)/,format:"connection:%s"},{name:"mid",reg:/^mid:([^\s]*)/,format:"mid:%s"},{name:"msid",reg:/^msid:(.*)/,format:"msid:%s"},{name:"ptime",reg:/^ptime:(\d*(?:\.\d*)*)/,format:"ptime:%d"},{name:"maxptime",reg:/^maxptime:(\d*(?:\.\d*)*)/,format:"maxptime:%d"},{name:"direction",reg:/^(sendrecv|recvonly|sendonly|inactive)/},{name:"icelite",reg:/^(ice-lite)/},{name:"iceUfrag",reg:/^ice-ufrag:(\S*)/,format:"ice-ufrag:%s"},{name:"icePwd",reg:/^ice-pwd:(\S*)/,format:"ice-pwd:%s"},{name:"fingerprint",reg:/^fingerprint:(\S*) (\S*)/,names:["type","hash"],format:"fingerprint:%s %s"},{push:"candidates",reg:/^candidate:(\S*) (\d*) (\S*) (\d*) (\S*) (\d*) typ (\S*)(?: raddr (\S*) rport (\d*))?(?: tcptype (\S*))?(?: generation (\d*))?(?: network-id (\d*))?(?: network-cost (\d*))?/,names:["foundation","component","transport","priority","ip","port","type","raddr","rport","tcptype","generation","network-id","network-cost"],format:function(r){var s="candidate:%s %d %s %d %s %d typ %s";return s+=r.raddr!=null?" raddr %s rport %d":"%v%v",s+=r.tcptype!=null?" tcptype %s":"%v",r.generation!=null&&(s+=" generation %d"),s+=r["network-id"]!=null?" network-id %d":"%v",s+=r["network-cost"]!=null?" network-cost %d":"%v",s}},{name:"endOfCandidates",reg:/^(end-of-candidates)/},{name:"remoteCandidates",reg:/^remote-candidates:(.*)/,format:"remote-candidates:%s"},{name:"iceOptions",reg:/^ice-options:(\S*)/,format:"ice-options:%s"},{push:"ssrcs",reg:/^ssrc:(\d*) ([\w_-]*)(?::(.*))?/,names:["id","attribute","value"],format:function(r){var s="ssrc:%d";return r.attribute!=null&&(s+=" %s",r.value!=null&&(s+=":%s")),s}},{push:"ssrcGroups",reg:/^ssrc-group:([\x21\x23\x24\x25\x26\x27\x2A\x2B\x2D\x2E\w]*) (.*)/,names:["semantics","ssrcs"],format:"ssrc-group:%s %s"},{name:"msidSemantic",reg:/^msid-semantic:\s?(\w*) (\S*)/,names:["semantic","token"],format:"msid-semantic: %s %s"},{push:"groups",reg:/^group:(\w*) (.*)/,names:["type","mids"],format:"group:%s %s"},{name:"rtcpMux",reg:/^(rtcp-mux)/},{name:"rtcpRsize",reg:/^(rtcp-rsize)/},{name:"sctpmap",reg:/^sctpmap:([\w_/]*) (\S*)(?: (\S*))?/,names:["sctpmapNumber","app","maxMessageSize"],format:function(r){return r.maxMessageSize!=null?"sctpmap:%s %s %s":"sctpmap:%s %s"}},{name:"xGoogleFlag",reg:/^x-google-flag:([^\s]*)/,format:"x-google-flag:%s"},{push:"rids",reg:/^rid:([\d\w]+) (\w+)(?: ([\S| ]*))?/,names:["id","direction","params"],format:function(r){return r.params?"rid:%s %s %s":"rid:%s %s"}},{push:"imageattrs",reg:new RegExp("^imageattr:(\\d+|\\*)[\\s\\t]+(send|recv)[\\s\\t]+(\\*|\\[\\S+\\](?:[\\s\\t]+\\[\\S+\\])*)(?:[\\s\\t]+(recv|send)[\\s\\t]+(\\*|\\[\\S+\\](?:[\\s\\t]+\\[\\S+\\])*))?"),names:["pt","dir1","attrs1","dir2","attrs2"],format:function(r){return"imageattr:%s %s %s"+(r.dir2?" %s %s":"")}},{name:"simulcast",reg:new RegExp("^simulcast:(send|recv) ([a-zA-Z0-9\\-_~;,]+)(?:\\s?(send|recv) ([a-zA-Z0-9\\-_~;,]+))?$"),names:["dir1","list1","dir2","list2"],format:function(r){return"simulcast:%s %s"+(r.dir2?" %s %s":"")}},{name:"simulcast_03",reg:/^simulcast:[\s\t]+([\S+\s\t]+)$/,names:["value"],format:"simulcast: %s"},{name:"framerate",reg:/^framerate:(\d+(?:$|\.\d+))/,format:"framerate:%s"},{name:"sourceFilter",reg:/^source-filter: *(excl|incl) (\S*) (IP4|IP6|\*) (\S*) (.*)/,names:["filterMode","netType","addressTypes","destAddress","srcList"],format:"source-filter: %s %s %s %s %s"},{name:"bundleOnly",reg:/^(bundle-only)/},{name:"label",reg:/^label:(.+)/,format:"label:%s"},{name:"sctpPort",reg:/^sctp-port:(\d+)$/,format:"sctp-port:%s"},{name:"maxMessageSize",reg:/^max-message-size:(\d+)$/,format:"max-message-size:%s"},{push:"tsRefClocks",reg:/^ts-refclk:([^\s=]*)(?:=(\S*))?/,names:["clksrc","clksrcExt"],format:function(r){return"ts-refclk:%s"+(r.clksrcExt!=null?"=%s":"")}},{name:"mediaClk",reg:/^mediaclk:(?:id=(\S*))? *([^\s=]*)(?:=(\S*))?(?: *rate=(\d+)\/(\d+))?/,names:["id","mediaClockName","mediaClockValue","rateNumerator","rateDenominator"],format:function(r){var s="mediaclk:";return s+=r.id!=null?"id=%s %s":"%v%s",s+=r.mediaClockValue!=null?"=%s":"",s+=r.rateNumerator!=null?" rate=%s":"",s+=r.rateDenominator!=null?"/%s":"",s}},{name:"keywords",reg:/^keywds:(.+)$/,format:"keywds:%s"},{name:"content",reg:/^content:(.+)/,format:"content:%s"},{name:"bfcpFloorCtrl",reg:/^floorctrl:(c-only|s-only|c-s)/,format:"floorctrl:%s"},{name:"bfcpConfId",reg:/^confid:(\d+)/,format:"confid:%s"},{name:"bfcpUserId",reg:/^userid:(\d+)/,format:"userid:%s"},{name:"bfcpFloorId",reg:/^floorid:(.+) (?:m-stream|mstrm):(.+)/,names:["id","mStream"],format:"floorid:%s mstrm:%s"},{push:"invalid",names:["value"]}]};Object.keys(Bl).forEach(function(r){var s=Bl[r];s.forEach(function(e){e.reg||(e.reg=/(.*)/),e.format||(e.format="%s")})})});var Vl=Z(O1=>{"use strict";var B4=function(r){return String(Number(r))===r?Number(r):r},xn=function(r,s,e,l){if(l&&!e)s[l]=B4(r[1]);else for(var n=0;n<e.length;n+=1)r[n+1]!=null&&(s[e[n]]=B4(r[n+1]))},bn=function(r,s,e){var l=r.name&&r.names;r.push&&!s[r.push]?s[r.push]=[]:l&&!s[r.name]&&(s[r.name]={});var n=r.push?{}:l?s[r.name]:s;xn(e.match(r.reg),n,r.names,r.name),r.push&&s[r.push].push(n)},Gl=k0(),Sn=RegExp.prototype.test.bind(/^([a-z])=(.*)/);O1.parse=function(r){var s={},e=[],l=s;return r.split(/(\r\n|\r|\n)/).filter(Sn).forEach(function(n){var a=n[0],o=n.slice(2);a==="m"&&(e.push({rtp:[],fmtp:[]}),l=e[e.length-1]);for(var h=0;h<(Gl[a]||[]).length;h+=1){var m=Gl[a][h];if(m.reg.test(o))return bn(m,l,o)}}),s.media=e,s};var Wl=function(r,s){var e=s.split(/=(.+)/,2);return e.length===2?r[e[0]]=B4(e[1]):e.length===1&&s.length>1&&(r[e[0]]=void 0),r};O1.parseParams=function(r){return r.split(/;\s?/).reduce(Wl,{})};O1.parseFmtpConfig=O1.parseParams;O1.parsePayloads=function(r){return r.toString().split(" ").map(Number)};O1.parseRemoteCandidates=function(r){for(var s=[],e=r.split(" ").map(B4),l=0;l<e.length;l+=3)s.push({component:e[l],ip:e[l+1],port:e[l+2]});return s};O1.parseImageAttributes=function(r){return r.split(" ").map(function(s){return s.substring(1,s.length-1).split(",").reduce(Wl,{})})};O1.parseSimulcastStreamList=function(r){return r.split(";").map(function(s){return s.split(",").map(function(e){var l,n=!1;return e[0]!=="~"?l=B4(e):(l=B4(e.substring(1,e.length)),n=!0),{scid:l,paused:n}})})}});var Kl=Z((hp,jl)=>{"use strict";var ze=k0(),wn=/%[sdv%]/g,yn=function(r){var s=1,e=arguments,l=e.length;return r.replace(wn,function(n){if(s>=l)return n;var a=e[s];switch(s+=1,n){case"%%":return"%";case"%s":return String(a);case"%d":return Number(a);case"%v":return""}})},v3=function(r,s,e){var l=s.format instanceof Function?s.format(s.push?e:e[s.name]):s.format,n=[r+"="+l];if(s.names)for(var a=0;a<s.names.length;a+=1){var o=s.names[a];s.name?n.push(e[s.name][o]):n.push(e[s.names[a]])}else n.push(e[s.name]);return yn.apply(null,n)},Tn=["v","o","s","i","u","e","p","c","b","t","r","z","a"],Nn=["i","c","b","a"];jl.exports=function(r,s){s=s||{},r.version==null&&(r.version=0),r.name==null&&(r.name=" "),r.media.forEach(function(a){a.payloads==null&&(a.payloads="")});var e=s.outerOrder||Tn,l=s.innerOrder||Nn,n=[];return e.forEach(function(a){ze[a].forEach(function(o){o.name in r&&r[o.name]!=null?n.push(v3(a,o,r)):o.push in r&&r[o.push]!=null&&r[o.push].forEach(function(h){n.push(v3(a,o,h))})})}),r.media.forEach(function(a){n.push(v3("m",ze.m[0],a)),l.forEach(function(o){ze[o].forEach(function(h){h.name in a&&a[h.name]!=null?n.push(v3(o,h,a)):h.push in a&&a[h.push]!=null&&a[h.push].forEach(function(m){n.push(v3(o,h,m))})})})}),n.join(`\r
`)+`\r
`}});var Me=Z(y1=>{"use strict";var m4=Vl(),An=Kl(),En=k0();y1.grammar=En;y1.write=An;y1.parse=m4.parse;y1.parseParams=m4.parseParams;y1.parseFmtpConfig=m4.parseFmtpConfig;y1.parsePayloads=m4.parsePayloads;y1.parseRemoteCandidates=m4.parseRemoteCandidates;y1.parseImageAttributes=m4.parseImageAttributes;y1.parseSimulcastStreamList=m4.parseSimulcastStreamList});var C1=Z((gp,Jl)=>{"use strict";var Xl=Me(),kn=w2(),F2=x2(),N2=k2(),Yl=w0(),Rn=u1(),_e=new kn("SIPMessage"),R0=class r{constructor(s,e,l,n,a,o){if(!s||!e||!l)return null;n=n||{},this.ua=l,this.headers={},this.method=s,this.ruri=e,this.body=o,this.extraHeaders=N2.cloneArray(a),this.ua.configuration.extra_headers&&(this.extraHeaders=this.extraHeaders.concat(this.ua.configuration.extra_headers)),n.route_set?this.setHeader("route",n.route_set):l.configuration.use_preloaded_route&&this.setHeader("route",`<${l.transport.sip_uri};lr>`),this.setHeader("via",""),this.setHeader("max-forwards",F2.MAX_FORWARDS);let h=n.to_uri||e,m=n.to_tag?{tag:n.to_tag}:null,v=typeof n.to_display_name<"u"?n.to_display_name:null;this.to=new Yl(h,v,m),this.setHeader("to",this.to.toString());let _=n.from_uri||l.configuration.uri,u={tag:n.from_tag||N2.newTag()},k;typeof n.from_display_name<"u"?k=n.from_display_name:l.configuration.display_name?k=l.configuration.display_name:k=null,this.from=new Yl(_,k,u),this.setHeader("from",this.from.toString());let b=n.call_id||l.configuration.jssip_id+N2.createRandomToken(15);this.call_id=b,this.setHeader("call-id",b);let S=n.cseq||Math.floor(Math.random()*1e4);this.cseq=S,this.setHeader("cseq",`${S} ${s}`)}setHeader(s,e){let l=new RegExp(`^\\s*${s}\\s*:`,"i");for(let n=0;n<this.extraHeaders.length;n++)l.test(this.extraHeaders[n])&&this.extraHeaders.splice(n,1);this.headers[N2.headerize(s)]=Array.isArray(e)?e:[e]}getHeader(s){let e=this.headers[N2.headerize(s)];if(e){if(e[0])return e[0]}else{let l=new RegExp(`^\\s*${s}\\s*:`,"i");for(let n of this.extraHeaders)if(l.test(n))return n.substring(n.indexOf(":")+1).trim()}}getHeaders(s){let e=this.headers[N2.headerize(s)],l=[];if(e){for(let n of e)l.push(n);return l}else{let n=new RegExp(`^\\s*${s}\\s*:`,"i");for(let a of this.extraHeaders)n.test(a)&&l.push(a.substring(a.indexOf(":")+1).trim());return l}}hasHeader(s){if(this.headers[N2.headerize(s)])return!0;{let e=new RegExp(`^\\s*${s}\\s*:`,"i");for(let l of this.extraHeaders)if(e.test(l))return!0}return!1}parseSDP(s){return!s&&this.sdp?this.sdp:(this.sdp=Xl.parse(this.body||""),this.sdp)}toString(){let s=`${this.method} ${this.ruri} SIP/2.0\r
`;for(let n in this.headers)if(Object.prototype.hasOwnProperty.call(this.headers,n))for(let a of this.headers[n])s+=`${n}: ${a}\r
`;for(let n of this.extraHeaders)s+=`${n.trim()}\r
`;let e=[];switch(this.method){case F2.REGISTER:{e.push("path","gruu");break}case F2.INVITE:{this.ua.configuration.session_timers&&e.push("timer"),(this.ua.contact.pub_gruu||this.ua.contact.temp_gruu)&&e.push("gruu"),e.push("ice","replaces");break}case F2.UPDATE:{this.ua.configuration.session_timers&&e.push("timer"),e.push("ice");break}}e.push("outbound");let l=this.ua.configuration.user_agent||F2.USER_AGENT;if(s+=`Allow: ${F2.ALLOWED_METHODS}\r
`,s+=`Supported: ${e}\r
`,s+=`User-Agent: ${l}\r
`,this.body){let n=N2.str_utf8_length(this.body);s+=`Content-Length: ${n}\r
\r
`,s+=this.body}else s+=`Content-Length: 0\r
\r
`;return s}clone(){let s=new r(this.method,this.ruri,this.ua);return Object.keys(this.headers).forEach(function(e){s.headers[e]=this.headers[e].slice()},this),s.body=this.body,s.extraHeaders=N2.cloneArray(this.extraHeaders),s.to=this.to,s.from=this.from,s.call_id=this.call_id,s.cseq=this.cseq,s}},Ce=class r extends R0{constructor(s,e,l,n,a){super(F2.INVITE,s,e,l,n,a),this.transaction=null}cancel(s){this.transaction.cancel(s)}clone(){let s=new r(this.ruri,this.ua);return Object.keys(this.headers).forEach(function(e){s.headers[e]=this.headers[e].slice()},this),s.body=this.body,s.extraHeaders=N2.cloneArray(this.extraHeaders),s.to=this.to,s.from=this.from,s.call_id=this.call_id,s.cseq=this.cseq,s.transaction=this.transaction,s}},I0=class{constructor(){this.data=null,this.headers=null,this.method=null,this.via=null,this.via_branch=null,this.call_id=null,this.cseq=null,this.from=null,this.from_tag=null,this.to=null,this.to_tag=null,this.body=null,this.sdp=null}addHeader(s,e){let l={raw:e};s=N2.headerize(s),this.headers[s]?this.headers[s].push(l):this.headers[s]=[l]}getHeader(s){let e=this.headers[N2.headerize(s)];if(e){if(e[0])return e[0].raw}else return}getHeaders(s){let e=this.headers[N2.headerize(s)],l=[];if(!e)return[];for(let n of e)l.push(n.raw);return l}hasHeader(s){return!!this.headers[N2.headerize(s)]}parseHeader(s,e=0){if(s=N2.headerize(s),this.headers[s]){if(e>=this.headers[s].length){_e.debug(`not so many "${s}" headers present`);return}}else{_e.debug(`header "${s}" not present`);return}let l=this.headers[s][e],n=l.raw;if(l.parsed)return l.parsed;let a=Rn.parse(n,s.replace(/-/g,"_"));if(a===-1){this.headers[s].splice(e,1),_e.debug(`error parsing "${s}" header field with value "${n}"`);return}else return l.parsed=a,a}s(s,e){return this.parseHeader(s,e)}setHeader(s,e){let l={raw:e};this.headers[N2.headerize(s)]=[l]}parseSDP(s){return!s&&this.sdp?this.sdp:(this.sdp=Xl.parse(this.body||""),this.sdp)}toString(){return this.data}},Le=class extends I0{constructor(s){super(),this.ua=s,this.headers={},this.ruri=null,this.transport=null,this.server_transaction=null}reply(s,e,l,n,a,o){let h=[],m=this.getHeader("To");if(s=s||null,e=e||null,!s||s<100||s>699)throw new TypeError(`Invalid status_code: ${s}`);if(e&&typeof e!="string"&&!(e instanceof String))throw new TypeError(`Invalid reason_phrase: ${e}`);e=e||F2.REASON_PHRASE[s]||"",l=N2.cloneArray(l),this.ua.configuration.extra_headers&&(l=l.concat(this.ua.configuration.extra_headers));let v=`SIP/2.0 ${s} ${e}\r
`;if(this.method===F2.INVITE&&s>100&&s<=200){let u=this.getHeaders("record-route");for(let k of u)v+=`Record-Route: ${k}\r
`}let _=this.getHeaders("via");for(let u of _)v+=`Via: ${u}\r
`;!this.to_tag&&s>100?m+=`;tag=${N2.newTag()}`:this.to_tag&&!this.s("to").hasParam("tag")&&(m+=`;tag=${this.to_tag}`),v+=`To: ${m}\r
`,v+=`From: ${this.getHeader("From")}\r
`,v+=`Call-ID: ${this.call_id}\r
`,v+=`CSeq: ${this.cseq} ${this.method}\r
`;for(let u of l)v+=`${u.trim()}\r
`;switch(this.method){case F2.INVITE:{this.ua.configuration.session_timers&&h.push("timer"),(this.ua.contact.pub_gruu||this.ua.contact.temp_gruu)&&h.push("gruu"),h.push("ice","replaces");break}case F2.UPDATE:this.ua.configuration.session_timers&&h.push("timer"),n&&h.push("ice"),h.push("replaces")}if(h.push("outbound"),this.method===F2.OPTIONS?(v+=`Allow: ${F2.ALLOWED_METHODS}\r
`,v+=`Accept: ${F2.ACCEPTED_BODY_TYPES}\r
`):s===405?v+=`Allow: ${F2.ALLOWED_METHODS}\r
`:s===415&&(v+=`Accept: ${F2.ACCEPTED_BODY_TYPES}\r
`),v+=`Supported: ${h}\r
`,n){let u=N2.str_utf8_length(n);v+=`Content-Type: application/sdp\r
`,v+=`Content-Length: ${u}\r
\r
`,v+=n}else v+=`Content-Length: 0\r
\r
`;this.server_transaction.receiveResponse(s,v,a,o)}reply_sl(s=null,e=null){let l=this.getHeaders("via");if(!s||s<100||s>699)throw new TypeError(`Invalid status_code: ${s}`);if(e&&typeof e!="string"&&!(e instanceof String))throw new TypeError(`Invalid reason_phrase: ${e}`);e=e||F2.REASON_PHRASE[s]||"";let n=`SIP/2.0 ${s} ${e}\r
`;for(let o of l)n+=`Via: ${o}\r
`;let a=this.getHeader("To");if(!this.to_tag&&s>100?a+=`;tag=${N2.newTag()}`:this.to_tag&&!this.s("to").hasParam("tag")&&(a+=`;tag=${this.to_tag}`),n+=`To: ${a}\r
`,n+=`From: ${this.getHeader("From")}\r
`,n+=`Call-ID: ${this.call_id}\r
`,n+=`CSeq: ${this.cseq} ${this.method}\r
`,this.ua.configuration.extra_headers)for(let o of this.ua.configuration.extra_headers)n+=`${o.trim()}\r
`;n+=`Content-Length: 0\r
\r
`,this.transport.send(n)}},xe=class extends I0{constructor(){super(),this.headers={},this.status_code=null,this.reason_phrase=null}};Jl.exports={OutgoingRequest:R0,InitialOutgoingInviteRequest:Ce,IncomingRequest:Le,IncomingResponse:xe}});var Zl=Z((zp,Ql)=>{"use strict";var In=w2(),B1=k2(),L1=new In("DigestAuthentication");Ql.exports=class{constructor(s){this._credentials=s,this._cnonce=null,this._nc=0,this._ncHex="00000000",this._algorithm=null,this._realm=null,this._nonce=null,this._opaque=null,this._stale=null,this._qop=null,this._method=null,this._uri=null,this._ha1=null,this._response=null}get(s){switch(s){case"realm":return this._realm;case"ha1":return this._ha1;default:{L1.warn('get() | cannot get "%s" parameter',s);return}}}authenticate({method:s,ruri:e,body:l},n,a=null){if(this._algorithm=n.algorithm,this._realm=n.realm,this._nonce=n.nonce,this._opaque=n.opaque,this._stale=n.stale,this._algorithm){if(this._algorithm!=="MD5")return L1.warn('authenticate() | challenge with Digest algorithm different than "MD5", authentication aborted'),!1}else this._algorithm="MD5";if(!this._nonce)return L1.warn("authenticate() | challenge without Digest nonce, authentication aborted"),!1;if(!this._realm)return L1.warn("authenticate() | challenge without Digest realm, authentication aborted"),!1;if(!this._credentials.password){if(!this._credentials.ha1)return L1.warn("authenticate() | no plain SIP password nor ha1 provided, authentication aborted"),!1;if(this._credentials.realm!==this._realm)return L1.warn('authenticate() | no plain SIP password, and stored `realm` does not match the given `realm`, cannot authenticate [stored:"%s", given:"%s"]',this._credentials.realm,this._realm),!1}if(n.qop)if(n.qop.indexOf("auth-int")>-1)this._qop="auth-int";else if(n.qop.indexOf("auth")>-1)this._qop="auth";else return L1.warn('authenticate() | challenge without Digest qop different than "auth" or "auth-int", authentication aborted'),!1;else this._qop=null;this._method=s,this._uri=e,this._cnonce=a||B1.createRandomToken(12),this._nc+=1;let o=Number(this._nc).toString(16);this._ncHex="00000000".substr(0,8-o.length)+o,this._nc===4294967296&&(this._nc=1,this._ncHex="00000001"),this._credentials.password?this._ha1=B1.calculateMD5(`${this._credentials.username}:${this._realm}:${this._credentials.password}`):this._ha1=this._credentials.ha1;let h,m;return this._qop==="auth"?(h=`${this._method}:${this._uri}`,m=B1.calculateMD5(h),L1.debug('authenticate() | using qop=auth [a2:"%s"]',h),this._response=B1.calculateMD5(`${this._ha1}:${this._nonce}:${this._ncHex}:${this._cnonce}:auth:${m}`)):this._qop==="auth-int"?(h=`${this._method}:${this._uri}:${B1.calculateMD5(l||"")}`,m=B1.calculateMD5(h),L1.debug('authenticate() | using qop=auth-int [a2:"%s"]',h),this._response=B1.calculateMD5(`${this._ha1}:${this._nonce}:${this._ncHex}:${this._cnonce}:auth-int:${m}`)):this._qop===null&&(h=`${this._method}:${this._uri}`,m=B1.calculateMD5(h),L1.debug('authenticate() | using qop=null [a2:"%s"]',h),this._response=B1.calculateMD5(`${this._ha1}:${this._nonce}:${m}`)),L1.debug("authenticate() | response generated"),!0}toString(){let s=[];if(!this._response)throw new Error("response field does not exist, cannot generate Authorization header");return s.push(`algorithm=${this._algorithm}`),s.push(`username="${this._credentials.username}"`),s.push(`realm="${this._realm}"`),s.push(`nonce="${this._nonce}"`),s.push(`uri="${this._uri}"`),s.push(`response="${this._response}"`),this._opaque&&s.push(`opaque="${this._opaque}"`),this._qop&&(s.push(`qop=${this._qop}`),s.push(`cnonce="${this._cnonce}"`),s.push(`nc=${this._ncHex}`)),`Digest ${s.join(", ")}`}}});var be=Z((Mp,e7)=>{"use strict";e7.exports={T1:500,T2:4e3,T4:5e3,TIMER_B:64*500,TIMER_D:0*500,TIMER_F:64*500,TIMER_H:64*500,TIMER_I:0*500,TIMER_J:0*500,TIMER_K:0*5e3,TIMER_L:64*500,TIMER_M:64*500,PROVISIONAL_RESPONSE_INTERVAL:6e4}});var q4=Z((_p,l7)=>{"use strict";var M3=_1().EventEmitter,_3=w2(),z3=x2(),a7=C1(),T1=be(),s7=new _3("NonInviteClientTransaction"),P0=new _3("InviteClientTransaction"),Pn=new _3("AckClientTransaction"),c7=new _3("NonInviteServerTransaction"),D0=new _3("InviteServerTransaction"),U={STATUS_TRYING:1,STATUS_PROCEEDING:2,STATUS_CALLING:3,STATUS_ACCEPTED:4,STATUS_COMPLETED:5,STATUS_TERMINATED:6,STATUS_CONFIRMED:7,NON_INVITE_CLIENT:"nict",NON_INVITE_SERVER:"nist",INVITE_CLIENT:"ict",INVITE_SERVER:"ist"},Se=class extends M3{constructor(s,e,l,n){super(),this.type=U.NON_INVITE_CLIENT,this.id=`z9hG4bK${Math.floor(Math.random()*1e7)}`,this.ua=s,this.transport=e,this.request=l,this.eventHandlers=n;let a=`SIP/2.0/${e.via_transport}`;a+=` ${s.configuration.via_host};branch=${this.id}`,this.request.setHeader("via",a),this.ua.newTransaction(this)}get C(){return U}stateChanged(s){this.state=s,this.emit("stateChanged")}send(){this.stateChanged(U.STATUS_TRYING),this.F=setTimeout(()=>{this.timer_F()},T1.TIMER_F),this.transport.send(this.request)||this.onTransportError()}onTransportError(){s7.debug(`transport error occurred, deleting transaction ${this.id}`),clearTimeout(this.F),clearTimeout(this.K),this.stateChanged(U.STATUS_TERMINATED),this.ua.destroyTransaction(this),this.eventHandlers.onTransportError()}timer_F(){s7.debug(`Timer F expired for transaction ${this.id}`),this.stateChanged(U.STATUS_TERMINATED),this.ua.destroyTransaction(this),this.eventHandlers.onRequestTimeout()}timer_K(){this.stateChanged(U.STATUS_TERMINATED),this.ua.destroyTransaction(this)}receiveResponse(s){let e=s.status_code;if(e<200)switch(this.state){case U.STATUS_TRYING:case U.STATUS_PROCEEDING:{this.stateChanged(U.STATUS_PROCEEDING),this.eventHandlers.onReceiveResponse(s);break}}else switch(this.state){case U.STATUS_TRYING:case U.STATUS_PROCEEDING:{this.stateChanged(U.STATUS_COMPLETED),clearTimeout(this.F),e===408?this.eventHandlers.onRequestTimeout():this.eventHandlers.onReceiveResponse(s),this.K=setTimeout(()=>{this.timer_K()},T1.TIMER_K);break}case U.STATUS_COMPLETED:break}}},we=class extends M3{constructor(s,e,l,n){super(),this.type=U.INVITE_CLIENT,this.id=`z9hG4bK${Math.floor(Math.random()*1e7)}`,this.ua=s,this.transport=e,this.request=l,this.eventHandlers=n,l.transaction=this;let a=`SIP/2.0/${e.via_transport}`;a+=` ${s.configuration.via_host};branch=${this.id}`,this.request.setHeader("via",a),this.ua.newTransaction(this)}get C(){return U}stateChanged(s){this.state=s,this.emit("stateChanged")}send(){this.stateChanged(U.STATUS_CALLING),this.B=setTimeout(()=>{this.timer_B()},T1.TIMER_B),this.transport.send(this.request)||this.onTransportError()}onTransportError(){clearTimeout(this.B),clearTimeout(this.D),clearTimeout(this.M),this.state!==U.STATUS_ACCEPTED&&(P0.debug(`transport error occurred, deleting transaction ${this.id}`),this.eventHandlers.onTransportError()),this.stateChanged(U.STATUS_TERMINATED),this.ua.destroyTransaction(this)}timer_M(){P0.debug(`Timer M expired for transaction ${this.id}`),this.state===U.STATUS_ACCEPTED&&(clearTimeout(this.B),this.stateChanged(U.STATUS_TERMINATED),this.ua.destroyTransaction(this))}timer_B(){P0.debug(`Timer B expired for transaction ${this.id}`),this.state===U.STATUS_CALLING&&(this.stateChanged(U.STATUS_TERMINATED),this.ua.destroyTransaction(this),this.eventHandlers.onRequestTimeout())}timer_D(){P0.debug(`Timer D expired for transaction ${this.id}`),clearTimeout(this.B),this.stateChanged(U.STATUS_TERMINATED),this.ua.destroyTransaction(this)}sendACK(s){let e=new a7.OutgoingRequest(z3.ACK,this.request.ruri,this.ua,{route_set:this.request.getHeaders("route"),call_id:this.request.getHeader("call-id"),cseq:this.request.cseq});e.setHeader("from",this.request.getHeader("from")),e.setHeader("via",this.request.getHeader("via")),e.setHeader("to",s.getHeader("to")),this.D=setTimeout(()=>{this.timer_D()},T1.TIMER_D),this.transport.send(e)}cancel(s){if(this.state!==U.STATUS_PROCEEDING)return;let e=new a7.OutgoingRequest(z3.CANCEL,this.request.ruri,this.ua,{route_set:this.request.getHeaders("route"),call_id:this.request.getHeader("call-id"),cseq:this.request.cseq});e.setHeader("from",this.request.getHeader("from")),e.setHeader("via",this.request.getHeader("via")),e.setHeader("to",this.request.getHeader("to")),s&&e.setHeader("reason",s),this.transport.send(e)}receiveResponse(s){let e=s.status_code;if(e>=100&&e<=199)switch(this.state){case U.STATUS_CALLING:{this.stateChanged(U.STATUS_PROCEEDING),this.eventHandlers.onReceiveResponse(s);break}case U.STATUS_PROCEEDING:{this.eventHandlers.onReceiveResponse(s);break}}else if(e>=200&&e<=299)switch(this.state){case U.STATUS_CALLING:case U.STATUS_PROCEEDING:{this.stateChanged(U.STATUS_ACCEPTED),this.M=setTimeout(()=>{this.timer_M()},T1.TIMER_M),this.eventHandlers.onReceiveResponse(s);break}case U.STATUS_ACCEPTED:{this.eventHandlers.onReceiveResponse(s);break}}else if(e>=300&&e<=699)switch(this.state){case U.STATUS_CALLING:case U.STATUS_PROCEEDING:{this.stateChanged(U.STATUS_COMPLETED),this.sendACK(s),this.eventHandlers.onReceiveResponse(s);break}case U.STATUS_COMPLETED:{this.sendACK(s);break}}}},ye=class extends M3{constructor(s,e,l,n){super(),this.id=`z9hG4bK${Math.floor(Math.random()*1e7)}`,this.transport=e,this.request=l,this.eventHandlers=n;let a=`SIP/2.0/${e.via_transport}`;a+=` ${s.configuration.via_host};branch=${this.id}`,this.request.setHeader("via",a)}get C(){return U}send(){this.transport.send(this.request)||this.onTransportError()}onTransportError(){Pn.debug(`transport error occurred for transaction ${this.id}`),this.eventHandlers.onTransportError()}},Te=class extends M3{constructor(s,e,l){super(),this.type=U.NON_INVITE_SERVER,this.id=l.via_branch,this.ua=s,this.transport=e,this.request=l,this.last_response="",l.server_transaction=this,this.state=U.STATUS_TRYING,s.newTransaction(this)}get C(){return U}stateChanged(s){this.state=s,this.emit("stateChanged")}timer_J(){c7.debug(`Timer J expired for transaction ${this.id}`),this.stateChanged(U.STATUS_TERMINATED),this.ua.destroyTransaction(this)}onTransportError(){this.transportError||(this.transportError=!0,c7.debug(`transport error occurred, deleting transaction ${this.id}`),clearTimeout(this.J),this.stateChanged(U.STATUS_TERMINATED),this.ua.destroyTransaction(this))}receiveResponse(s,e,l,n){if(s===100)switch(this.state){case U.STATUS_TRYING:{this.stateChanged(U.STATUS_PROCEEDING),this.transport.send(e)||this.onTransportError();break}case U.STATUS_PROCEEDING:{this.last_response=e,this.transport.send(e)?l&&l():(this.onTransportError(),n&&n());break}}else if(s>=200&&s<=699)switch(this.state){case U.STATUS_TRYING:case U.STATUS_PROCEEDING:{this.stateChanged(U.STATUS_COMPLETED),this.last_response=e,this.J=setTimeout(()=>{this.timer_J()},T1.TIMER_J),this.transport.send(e)?l&&l():(this.onTransportError(),n&&n());break}case U.STATUS_COMPLETED:break}}},Ne=class extends M3{constructor(s,e,l){super(),this.type=U.INVITE_SERVER,this.id=l.via_branch,this.ua=s,this.transport=e,this.request=l,this.last_response="",l.server_transaction=this,this.state=U.STATUS_PROCEEDING,s.newTransaction(this),this.resendProvisionalTimer=null,l.reply(100)}get C(){return U}stateChanged(s){this.state=s,this.emit("stateChanged")}timer_H(){D0.debug(`Timer H expired for transaction ${this.id}`),this.state===U.STATUS_COMPLETED&&D0.debug("ACK not received, dialog will be terminated"),this.stateChanged(U.STATUS_TERMINATED),this.ua.destroyTransaction(this)}timer_I(){this.stateChanged(U.STATUS_TERMINATED),this.ua.destroyTransaction(this)}timer_L(){D0.debug(`Timer L expired for transaction ${this.id}`),this.state===U.STATUS_ACCEPTED&&(this.stateChanged(U.STATUS_TERMINATED),this.ua.destroyTransaction(this))}onTransportError(){this.transportError||(this.transportError=!0,D0.debug(`transport error occurred, deleting transaction ${this.id}`),this.resendProvisionalTimer!==null&&(clearInterval(this.resendProvisionalTimer),this.resendProvisionalTimer=null),clearTimeout(this.L),clearTimeout(this.H),clearTimeout(this.I),this.stateChanged(U.STATUS_TERMINATED),this.ua.destroyTransaction(this))}resend_provisional(){this.transport.send(this.last_response)||this.onTransportError()}receiveResponse(s,e,l,n){if(s>=100&&s<=199&&this.state===U.STATUS_PROCEEDING&&(this.transport.send(e)||this.onTransportError(),this.last_response=e),s>100&&s<=199&&this.state===U.STATUS_PROCEEDING)this.resendProvisionalTimer===null&&(this.resendProvisionalTimer=setInterval(()=>{this.resend_provisional()},T1.PROVISIONAL_RESPONSE_INTERVAL));else if(s>=200&&s<=299)switch(this.state){case U.STATUS_PROCEEDING:this.stateChanged(U.STATUS_ACCEPTED),this.last_response=e,this.L=setTimeout(()=>{this.timer_L()},T1.TIMER_L),this.resendProvisionalTimer!==null&&(clearInterval(this.resendProvisionalTimer),this.resendProvisionalTimer=null);case U.STATUS_ACCEPTED:{this.transport.send(e)?l&&l():(this.onTransportError(),n&&n());break}}else s>=300&&s<=699&&this.state===U.STATUS_PROCEEDING&&(this.resendProvisionalTimer!==null&&(clearInterval(this.resendProvisionalTimer),this.resendProvisionalTimer=null),this.transport.send(e)?(this.stateChanged(U.STATUS_COMPLETED),this.H=setTimeout(()=>{this.timer_H()},T1.TIMER_H),l&&l()):(this.onTransportError(),n&&n()))}};function Dn({_transactions:r},s){let e;switch(s.method){case z3.INVITE:{if(e=r.ist[s.via_branch],e){switch(e.state){case U.STATUS_PROCEEDING:{e.transport.send(e.last_response);break}case U.STATUS_ACCEPTED:break}return!0}break}case z3.ACK:{if(e=r.ist[s.via_branch],e){if(e.state===U.STATUS_ACCEPTED)return!1;if(e.state===U.STATUS_COMPLETED)return e.state=U.STATUS_CONFIRMED,e.I=setTimeout(()=>{e.timer_I()},T1.TIMER_I),!0}else return!1;break}case z3.CANCEL:return e=r.ist[s.via_branch],e?(s.reply_sl(200),e.state!==U.STATUS_PROCEEDING):(s.reply_sl(481),!0);default:{if(e=r.nist[s.via_branch],e){switch(e.state){case U.STATUS_TRYING:break;case U.STATUS_PROCEEDING:case U.STATUS_COMPLETED:{e.transport.send(e.last_response);break}}return!0}break}}}l7.exports={C:U,NonInviteClientTransaction:Se,InviteClientTransaction:we,AckClientTransaction:ye,NonInviteServerTransaction:Te,InviteServerTransaction:Ne,checkTransaction:Dn}});var g4=Z((Lp,r7)=>{"use strict";var $n=w2(),t7=x2(),Un=Zl(),Ae=q4(),Fn=new $n("RequestSender"),Ee={onRequestTimeout:()=>{},onTransportError:()=>{},onReceiveResponse:()=>{},onAuthenticated:()=>{}};r7.exports=class{constructor(s,e,l){this._ua=s,this._eventHandlers=l,this._method=e.method,this._request=e,this._auth=null,this._challenged=!1,this._staled=!1;for(let n in Ee)Object.prototype.hasOwnProperty.call(Ee,n)&&(this._eventHandlers[n]||(this._eventHandlers[n]=Ee[n]));s.status===s.C.STATUS_USER_CLOSED&&(this._method!==t7.BYE||this._method!==t7.ACK)&&this._eventHandlers.onTransportError()}send(){let s={onRequestTimeout:()=>{this._eventHandlers.onRequestTimeout()},onTransportError:()=>{this._eventHandlers.onTransportError()},onReceiveResponse:e=>{this._receiveResponse(e)}};switch(this._method){case"INVITE":{this.clientTransaction=new Ae.InviteClientTransaction(this._ua,this._ua.transport,this._request,s);break}case"ACK":{this.clientTransaction=new Ae.AckClientTransaction(this._ua,this._ua.transport,this._request,s);break}default:this.clientTransaction=new Ae.NonInviteClientTransaction(this._ua,this._ua.transport,this._request,s)}this._ua._configuration.authorization_jwt&&this._request.setHeader("Authorization",this._ua._configuration.authorization_jwt),this.clientTransaction.send()}_receiveResponse(s){let e,l,n=s.status_code;if((n===401||n===407)&&(this._ua.configuration.password!==null||this._ua.configuration.ha1!==null)){if(s.status_code===401?(e=s.parseHeader("www-authenticate"),l="authorization"):(e=s.parseHeader("proxy-authenticate"),l="proxy-authorization"),!e){Fn.debug(`${s.status_code} with wrong or missing challenge, cannot authenticate`),this._eventHandlers.onReceiveResponse(s);return}if(!this._challenged||!this._staled&&e.stale===!0){if(this._auth||(this._auth=new Un({username:this._ua.configuration.authorization_user,password:this._ua.configuration.password,realm:this._ua.configuration.realm,ha1:this._ua.configuration.ha1})),!this._auth.authenticate(this._request,e)){this._eventHandlers.onReceiveResponse(s);return}this._challenged=!0,this._ua.set("realm",this._auth.get("realm")),this._ua.set("ha1",this._auth.get("ha1")),e.stale&&(this._staled=!0),this._request=this._request.clone(),this._request.cseq+=1,this._request.setHeader("cseq",`${this._request.cseq} ${this._method}`),this._request.setHeader(l,this._auth.toString()),this._eventHandlers.onAuthenticated(this._request),this.send()}else this._eventHandlers.onReceiveResponse(s)}else this._eventHandlers.onReceiveResponse(s)}}});var f7=Z((bp,o7)=>{"use strict";var Hn=w2(),G4=k2(),v4=x2(),i7=C1(),n7=g4(),C3=new Hn("Registrator"),$0=10;o7.exports=class{constructor(s,e){this._reg_id=1,this._ua=s,this._transport=e,this._registrar=s.configuration.registrar_server,this._expires=s.configuration.register_expires,this._call_id=G4.createRandomToken(22),this._cseq=0,this._to_uri=s.configuration.uri,this._registrationTimer=null,this._registering=!1,this._registered=!1,this._contact=this._ua.contact.toString(),this._contact+=";+sip.ice",this._extraHeaders=[],this._extraContactParams="",this._sipInstance=`"<urn:uuid:${this._ua.configuration.instance_id}>"`,this._contact+=`;reg-id=${this._reg_id}`,this._contact+=`;+sip.instance=${this._sipInstance}`}get registered(){return this._registered}setExtraHeaders(s){Array.isArray(s)||(s=[]),this._extraHeaders=s.slice()}setExtraContactParams(s){s instanceof Object||(s={}),this._extraContactParams="";for(let e in s)if(Object.prototype.hasOwnProperty.call(s,e)){let l=s[e];this._extraContactParams+=`;${e}`,l&&(this._extraContactParams+=`=${l}`)}}register(){if(this._registering){C3.debug("Register request in progress...");return}let s=G4.cloneArray(this._extraHeaders),e;this._expires?(e=`${this._contact};expires=${this._expires}${this._extraContactParams}`,s.push(`Expires: ${this._expires}`)):e=`${this._contact}${this._extraContactParams}`,s.push(`Contact: ${e}`);let l=G4.newTag();this._ua.configuration.register_from_tag_trail&&(typeof this._ua.configuration.register_from_tag_trail=="function"?l+=this._ua.configuration.register_from_tag_trail():l+=this._ua.configuration.register_from_tag_trail);let n=new i7.OutgoingRequest(v4.REGISTER,this._registrar,this._ua,{to_uri:this._to_uri,call_id:this._call_id,cseq:this._cseq+=1,from_tag:l},s),a=new n7(this._ua,n,{onRequestTimeout:()=>{this._registrationFailure(null,v4.causes.REQUEST_TIMEOUT)},onTransportError:()=>{this._registrationFailure(null,v4.causes.CONNECTION_ERROR)},onAuthenticated:()=>{this._cseq+=1},onReceiveResponse:o=>{if(o.cseq===this._cseq)switch(this._registrationTimer!==null&&(clearTimeout(this._registrationTimer),this._registrationTimer=null),!0){case/^1[0-9]{2}$/.test(o.status_code):break;case/^2[0-9]{2}$/.test(o.status_code):{if(this._registering=!1,!o.hasHeader("Contact")){C3.debug("no Contact header in response to REGISTER, response ignored");break}let h=o.headers.Contact.reduce((u,k)=>u.concat(k.parsed),[]),m=h.find(u=>this._sipInstance===u.getParam("+sip.instance")&&this._reg_id===parseInt(u.getParam("reg-id")));if(m||(m=h.find(u=>u.uri.user===this._ua.contact.uri.user)),!m){C3.debug("no Contact header pointing to us, response ignored");break}let v=m.getParam("expires");!v&&o.hasHeader("expires")&&(v=o.getHeader("expires")),v||(v=this._expires),v=Number(v),v<$0&&(v=$0);let _=v>64?v*1e3/2+Math.floor((v/2-32)*1e3*Math.random()):v*1e3-5e3;this._registrationTimer=setTimeout(()=>{this._registrationTimer=null,this._ua.listeners("registrationExpiring").length===0?this.register():this._ua.emit("registrationExpiring")},_),m.hasParam("temp-gruu")&&(this._ua.contact.temp_gruu=m.getParam("temp-gruu").replace(/"/g,"")),m.hasParam("pub-gruu")&&(this._ua.contact.pub_gruu=m.getParam("pub-gruu").replace(/"/g,"")),this._registered||(this._registered=!0,this._ua.registered({response:o}));break}case/^423$/.test(o.status_code):{o.hasHeader("min-expires")?(this._expires=Number(o.getHeader("min-expires")),this._expires<$0&&(this._expires=$0),this._registering=!1,this.register()):(C3.debug("423 response received for REGISTER without Min-Expires"),this._registrationFailure(o,v4.causes.SIP_FAILURE_CODE));break}default:{let h=G4.sipErrorCause(o.status_code);this._registrationFailure(o,h)}}}});this._registering=!0,a.send()}unregister(s={}){if(!this._registered){C3.debug("already unregistered");return}this._registered=!1,this._registrationTimer!==null&&(clearTimeout(this._registrationTimer),this._registrationTimer=null);let e=G4.cloneArray(this._extraHeaders);s.all?e.push(`Contact: *${this._extraContactParams}`):e.push(`Contact: ${this._contact};expires=0${this._extraContactParams}`),e.push("Expires: 0");let l=new i7.OutgoingRequest(v4.REGISTER,this._registrar,this._ua,{to_uri:this._to_uri,call_id:this._call_id,cseq:this._cseq+=1},e);new n7(this._ua,l,{onRequestTimeout:()=>{this._unregistered(null,v4.causes.REQUEST_TIMEOUT)},onTransportError:()=>{this._unregistered(null,v4.causes.CONNECTION_ERROR)},onAuthenticated:()=>{this._cseq+=1},onReceiveResponse:a=>{switch(!0){case/^1[0-9]{2}$/.test(a.status_code):break;case/^2[0-9]{2}$/.test(a.status_code):{this._unregistered(a);break}default:{let o=G4.sipErrorCause(a.status_code);this._unregistered(a,o)}}}}).send()}close(){this._registered&&this.unregister()}onTransportClosed(){this._registering=!1,this._registrationTimer!==null&&(clearTimeout(this._registrationTimer),this._registrationTimer=null),this._registered&&(this._registered=!1,this._ua.unregistered({}))}_registrationFailure(s,e){this._registering=!1,this._ua.registrationFailed({response:s||null,cause:e}),this._registered&&(this._registered=!1,this._ua.unregistered({response:s||null,cause:e}))}_unregistered(s,e){this._registering=!1,this._registered=!1,this._ua.unregistered({response:s||null,cause:e||null})}}});var d7=Z((wp,u7)=>{"use strict";var ke=x2(),U0=q4(),On=g4(),Re={onRequestTimeout:()=>{},onTransportError:()=>{},onSuccessResponse:()=>{},onErrorResponse:()=>{},onAuthenticated:()=>{},onDialogError:()=>{}};u7.exports=class{constructor(s,e,l){this._dialog=s,this._ua=s._ua,this._request=e,this._eventHandlers=l,this._reattempt=!1,this._reattemptTimer=null;for(let n in Re)Object.prototype.hasOwnProperty.call(Re,n)&&(this._eventHandlers[n]||(this._eventHandlers[n]=Re[n]))}get request(){return this._request}send(){let s=new On(this._ua,this._request,{onRequestTimeout:()=>{this._eventHandlers.onRequestTimeout()},onTransportError:()=>{this._eventHandlers.onTransportError()},onAuthenticated:e=>{this._eventHandlers.onAuthenticated(e)},onReceiveResponse:e=>{this._receiveResponse(e)}});if(s.send(),(this._request.method===ke.INVITE||this._request.method===ke.UPDATE&&this._request.body)&&s.clientTransaction.state!==U0.C.STATUS_TERMINATED){this._dialog.uac_pending_reply=!0;let e=()=>{(s.clientTransaction.state===U0.C.STATUS_ACCEPTED||s.clientTransaction.state===U0.C.STATUS_COMPLETED||s.clientTransaction.state===U0.C.STATUS_TERMINATED)&&(s.clientTransaction.removeListener("stateChanged",e),this._dialog.uac_pending_reply=!1)};s.clientTransaction.on("stateChanged",e)}}_receiveResponse(s){s.status_code===408||s.status_code===481?this._eventHandlers.onDialogError(s):s.method===ke.INVITE&&s.status_code===491?this._reattempt?this._eventHandlers.onErrorResponse(s):(this._request.cseq=this._dialog.local_seqnum+=1,this._reattemptTimer=setTimeout(()=>{this._dialog.isTerminated()||(this._reattempt=!0,this.send())},1e3)):s.status_code>=200&&s.status_code<300?this._eventHandlers.onSuccessResponse(s):s.status_code>=300&&this._eventHandlers.onErrorResponse(s)}}});var F0=Z((Tp,h7)=>{"use strict";var Bn=w2(),p7=C1(),N1=x2(),L3=q4(),qn=d7(),Ie=k2(),Pe=new Bn("Dialog"),Z1={STATUS_EARLY:1,STATUS_CONFIRMED:2,STATUS_TERMINATED:3};h7.exports=class{static get C(){return Z1}constructor(s,e,l,n=Z1.STATUS_CONFIRMED){if(this._owner=s,this._ua=s._ua,this._uac_pending_reply=!1,this._uas_pending_reply=!1,!e.hasHeader("contact"))return{error:"unable to create a Dialog without Contact header field"};e instanceof p7.IncomingResponse&&(n=e.status_code<200?Z1.STATUS_EARLY:Z1.STATUS_CONFIRMED);let a=e.parseHeader("contact");l==="UAS"?(this._id={call_id:e.call_id,local_tag:e.to_tag,remote_tag:e.from_tag,toString(){return this.call_id+this.local_tag+this.remote_tag}},this._state=n,this._remote_seqnum=e.cseq,this._local_uri=e.parseHeader("to").uri,this._remote_uri=e.parseHeader("from").uri,this._remote_target=a.uri,this._route_set=e.getHeaders("record-route"),this._incoming_ack_seqnum=e.cseq,this._outgoing_ack_seqnum=null):l==="UAC"&&(this._id={call_id:e.call_id,local_tag:e.from_tag,remote_tag:e.to_tag,toString(){return this.call_id+this.local_tag+this.remote_tag}},this._state=n,this._local_seqnum=e.cseq,this._local_uri=e.parseHeader("from").uri,this._remote_uri=e.parseHeader("to").uri,this._remote_target=a.uri,this._route_set=e.getHeaders("record-route").reverse(),this._incoming_ack_seqnum=null,this._outgoing_ack_seqnum=this._local_seqnum),this._ua.newDialog(this),Pe.debug(`new ${l} dialog created with status ${this._state===Z1.STATUS_EARLY?"EARLY":"CONFIRMED"}`)}get id(){return this._id}get local_seqnum(){return this._local_seqnum}set local_seqnum(s){this._local_seqnum=s}get owner(){return this._owner}get uac_pending_reply(){return this._uac_pending_reply}set uac_pending_reply(s){this._uac_pending_reply=s}get uas_pending_reply(){return this._uas_pending_reply}isTerminated(){return this._status===Z1.STATUS_TERMINATED}update(s,e){this._state=Z1.STATUS_CONFIRMED,Pe.debug(`dialog ${this._id.toString()}  changed to CONFIRMED state`),e==="UAC"&&(this._route_set=s.getHeaders("record-route").reverse())}terminate(){Pe.debug(`dialog ${this._id.toString()} deleted`),this._ua.destroyDialog(this),this._state=Z1.STATUS_TERMINATED}sendRequest(s,e={}){let l=Ie.cloneArray(e.extraHeaders),n=Ie.cloneObject(e.eventHandlers),a=e.body||null,o=this._createRequest(s,l,a),h=n.onAuthenticated||(()=>{});return n.onAuthenticated=v=>{this._local_seqnum+=1,o.method===N1.INVITE&&(this._outgoing_ack_seqnum=this._local_seqnum),h(v)},new qn(this,o,n).send(),o}receiveRequest(s){this._checkInDialogRequest(s)&&(s.method===N1.ACK&&this._incoming_ack_seqnum!==null?this._incoming_ack_seqnum=null:s.method===N1.INVITE&&(this._incoming_ack_seqnum=s.cseq),this._owner.receiveRequest(s))}_createRequest(s,e,l){e=Ie.cloneArray(e),this._local_seqnum||(this._local_seqnum=Math.floor(Math.random()*1e4));let n=s===N1.CANCEL||s===N1.ACK?this._outgoing_ack_seqnum:this._local_seqnum+=1;return s===N1.INVITE&&(this._outgoing_ack_seqnum=n),new p7.OutgoingRequest(s,this._remote_target,this._ua,{cseq:n,call_id:this._id.call_id,from_uri:this._local_uri,from_tag:this._id.local_tag,to_uri:this._remote_uri,to_tag:this._id.remote_tag,route_set:this._route_set},e,l)}_checkInDialogRequest(s){if(!this._remote_seqnum)this._remote_seqnum=s.cseq;else if(s.cseq<this._remote_seqnum)if(s.method===N1.ACK){if(this._incoming_ack_seqnum===null||s.cseq!==this._incoming_ack_seqnum)return!1}else return s.reply(500),!1;else s.cseq>this._remote_seqnum&&(this._remote_seqnum=s.cseq);if(s.method===N1.INVITE||s.method===N1.UPDATE&&s.body){if(this._uac_pending_reply===!0)s.reply(491);else if(this._uas_pending_reply===!0){let e=(Math.random()*10|0)+1;return s.reply(500,null,[`Retry-After:${e}`]),!1}else{this._uas_pending_reply=!0;let e=()=>{(s.server_transaction.state===L3.C.STATUS_ACCEPTED||s.server_transaction.state===L3.C.STATUS_COMPLETED||s.server_transaction.state===L3.C.STATUS_TERMINATED)&&(s.server_transaction.removeListener("stateChanged",e),this._uas_pending_reply=!1)};s.server_transaction.on("stateChanged",e)}s.hasHeader("contact")&&s.server_transaction.on("stateChanged",()=>{s.server_transaction.state===L3.C.STATUS_ACCEPTED&&(this._remote_target=s.parseHeader("contact").uri)})}else s.method===N1.NOTIFY&&s.hasHeader("contact")&&s.server_transaction.on("stateChanged",()=>{s.server_transaction.state===L3.C.STATUS_COMPLETED&&(this._remote_target=s.parseHeader("contact").uri)});return!0}}});var v7=Z((Ap,De)=>{"use strict";var Gn=_1().EventEmitter,Wn=w2(),Vn=x2(),jn=M1(),m7=k2(),Kn=new Wn("RTCSession:DTMF"),g7={MIN_DURATION:70,MAX_DURATION:6e3,DEFAULT_DURATION:100,MIN_INTER_TONE_GAP:50,DEFAULT_INTER_TONE_GAP:500};De.exports=class extends Gn{constructor(s){super(),this._session=s,this._direction=null,this._tone=null,this._duration=null,this._request=null}get tone(){return this._tone}get duration(){return this._duration}send(s,e={}){if(s===void 0)throw new TypeError("Not enough arguments");if(this._direction="outgoing",this._session.status!==this._session.C.STATUS_CONFIRMED&&this._session.status!==this._session.C.STATUS_WAITING_FOR_ACK&&this._session.status!==this._session.C.STATUS_1XX_RECEIVED)throw new jn.InvalidStateError(this._session.status);let l=m7.cloneArray(e.extraHeaders);if(this.eventHandlers=m7.cloneObject(e.eventHandlers),typeof s=="string")s=s.toUpperCase();else if(typeof s=="number")s=s.toString();else throw new TypeError(`Invalid tone: ${s}`);if(s.match(/^[0-9A-DR#*]$/))this._tone=s;else throw new TypeError(`Invalid tone: ${s}`);this._duration=e.duration,l.push("Content-Type: application/dtmf-relay");let n=`Signal=${this._tone}\r
`;n+=`Duration=${this._duration}`,this._session.newDTMF({originator:"local",dtmf:this,request:this._request}),this._session.sendRequest(Vn.INFO,{extraHeaders:l,eventHandlers:{onSuccessResponse:a=>{this.emit("succeeded",{originator:"remote",response:a})},onErrorResponse:a=>{this.eventHandlers.onFailed&&this.eventHandlers.onFailed(),this.emit("failed",{originator:"remote",response:a})},onRequestTimeout:()=>{this._session.onRequestTimeout()},onTransportError:()=>{this._session.onTransportError()},onDialogError:()=>{this._session.onDialogError()}},body:n})}init_incoming(s){let e=/^(Signal\s*?=\s*?)([0-9A-D#*]{1})(\s)?.*/,l=/^(Duration\s?=\s?)([0-9]{1,4})(\s)?.*/;if(this._direction="incoming",this._request=s,s.reply(200),s.body){let n=s.body.split(`
`);n.length>=1&&e.test(n[0])&&(this._tone=n[0].replace(e,"$2")),n.length>=2&&l.test(n[1])&&(this._duration=parseInt(n[1].replace(l,"$2"),10))}this._duration||(this._duration=g7.DEFAULT_DURATION),this._tone?this._session.newDTMF({originator:"remote",dtmf:this,request:s}):Kn.debug("invalid INFO DTMF received, discarded")}};De.exports.C=g7});var M7=Z((kp,z7)=>{"use strict";var Yn=_1().EventEmitter,Xn=x2(),Jn=M1(),Qn=k2();z7.exports=class extends Yn{constructor(s){super(),this._session=s,this._direction=null,this._contentType=null,this._body=null}get contentType(){return this._contentType}get body(){return this._body}send(s,e,l={}){if(this._direction="outgoing",s===void 0)throw new TypeError("Not enough arguments");if(this._session.status!==this._session.C.STATUS_CONFIRMED&&this._session.status!==this._session.C.STATUS_WAITING_FOR_ACK)throw new Jn.InvalidStateError(this._session.status);this._contentType=s,this._body=e;let n=Qn.cloneArray(l.extraHeaders);n.push(`Content-Type: ${s}`),this._session.newInfo({originator:"local",info:this,request:this.request}),this._session.sendRequest(Xn.INFO,{extraHeaders:n,eventHandlers:{onSuccessResponse:a=>{this.emit("succeeded",{originator:"remote",response:a})},onErrorResponse:a=>{this.emit("failed",{originator:"remote",response:a})},onTransportError:()=>{this._session.onTransportError()},onRequestTimeout:()=>{this._session.onRequestTimeout()},onDialogError:()=>{this._session.onDialogError()}},body:e})}init_incoming(s){this._direction="incoming",this.request=s,s.reply(200),this._contentType=s.hasHeader("Content-Type")?s.getHeader("Content-Type").toLowerCase():void 0,this._body=s.body,this._session.newInfo({originator:"remote",info:this,request:s})}}});var L7=Z((Ip,C7)=>{"use strict";var Zn=w2(),_7=x2(),e9=new Zn("RTCSession:ReferNotifier"),$e={event_type:"refer",body_type:"message/sipfrag;version=2.0",expires:300};C7.exports=class{constructor(s,e,l){this._session=s,this._id=e,this._expires=l||$e.expires,this._active=!0,this.notify(100)}notify(s,e){if(e9.debug("notify()"),this._active===!1)return;e=e||_7.REASON_PHRASE[s]||"";let l;s>=200?l="terminated;reason=noresource":l=`active;expires=${this._expires}`,this._session.sendRequest(_7.NOTIFY,{extraHeaders:[`Event: ${$e.event_type};id=${this._id}`,`Subscription-State: ${l}`,`Content-Type: ${$e.body_type}`],body:`SIP/2.0 ${s} ${e}`,eventHandlers:{onErrorResponse(){this._active=!1}}})}}});var S7=Z((Dp,b7)=>{"use strict";var a9=_1().EventEmitter,s9=w2(),x3=x2(),c9=u1(),x7=k2(),z4=new s9("RTCSession:ReferSubscriber");b7.exports=class extends a9{constructor(s){super(),this._id=null,this._session=s}get id(){return this._id}sendRefer(s,e={}){z4.debug("sendRefer()");let l=x7.cloneArray(e.extraHeaders),n=x7.cloneObject(e.eventHandlers);for(let m in n)Object.prototype.hasOwnProperty.call(n,m)&&this.on(m,n[m]);let a=null;e.replaces&&(a=e.replaces._request.call_id,a+=`;to-tag=${e.replaces._to_tag}`,a+=`;from-tag=${e.replaces._from_tag}`,a=encodeURIComponent(a));let o=`Refer-To: <${s}${a?`?Replaces=${a}`:""}>`;if(l.push(o),!l.some(m=>m.toLowerCase().startsWith("referred-by:"))){let m=`Referred-By: <${this._session._ua._configuration.uri._scheme}:${this._session._ua._configuration.uri._user}@${this._session._ua._configuration.uri._host}>`;l.push(m)}l.push(`Contact: ${this._session.contact}`);let h=this._session.sendRequest(x3.REFER,{extraHeaders:l,eventHandlers:{onSuccessResponse:m=>{this._requestSucceeded(m)},onErrorResponse:m=>{this._requestFailed(m,x3.causes.REJECTED)},onTransportError:()=>{this._requestFailed(null,x3.causes.CONNECTION_ERROR)},onRequestTimeout:()=>{this._requestFailed(null,x3.causes.REQUEST_TIMEOUT)},onDialogError:()=>{this._requestFailed(null,x3.causes.DIALOG_ERROR)},onAuthenticated:m=>{this._id=m.cseq,this.emit("authenticated")}}});this._id=h.cseq}receiveNotify(s){if(z4.debug("receiveNotify()"),!s.body)return;let e=c9.parse(s.body.trim().split(`\r
`,1)[0],"Status_Line");if(e===-1){z4.debug(`receiveNotify() | error parsing NOTIFY body: "${s.body}"`);return}switch(!0){case/^100$/.test(e.status_code):{this.emit("trying",{request:s,status_line:e});break}case/^1[0-9]{2}$/.test(e.status_code):{this.emit("progress",{request:s,status_line:e});break}case/^2[0-9]{2}$/.test(e.status_code):{this.emit("accepted",{request:s,status_line:e});break}default:{this.emit("failed",{request:s,status_line:e});break}}}_requestSucceeded(s){z4.debug("REFER succeeded"),z4.debug('emit "requestSucceeded"'),this.emit("requestSucceeded",{response:s})}_requestFailed(s,e){z4.debug("REFER failed"),z4.debug('emit "requestFailed"'),this.emit("requestFailed",{response:s||null,cause:e})}}});var Fe=Z(($p,A7)=>{"use strict";var l9=_1().EventEmitter,w7=Me(),t9=w2(),$=x2(),M4=M1(),y7=q4(),C2=k2(),b3=be(),r9=C1(),H0=F0(),i9=g4(),t1=v7(),T7=M7(),n9=L7(),o9=S7(),N7=H1(),T=new t9("RTCSession"),E={STATUS_NULL:0,STATUS_INVITE_SENT:1,STATUS_1XX_RECEIVED:2,STATUS_INVITE_RECEIVED:3,STATUS_WAITING_FOR_ANSWER:4,STATUS_ANSWERED:5,STATUS_WAITING_FOR_ACK:6,STATUS_CANCELED:7,STATUS_TERMINATED:8,STATUS_CONFIRMED:9},O0=["audio","video"];A7.exports=class Ue extends l9{static get C(){return E}constructor(s){T.debug("new"),super(),this._id=null,this._ua=s,this._status=E.STATUS_NULL,this._dialog=null,this._earlyDialogs={},this._contact=null,this._from_tag=null,this._to_tag=null,this._connection=null,this._connectionPromiseQueue=Promise.resolve(),this._request=null,this._is_canceled=!1,this._cancel_reason="",this._is_confirmed=!1,this._late_sdp=!1,this._rtcOfferConstraints=null,this._rtcAnswerConstraints=null,this._localMediaStream=null,this._localMediaStreamLocallyGenerated=!1,this._rtcReady=!0,this._iceReady=!1,this._timers={ackTimer:null,expiresTimer:null,invite2xxTimer:null,userNoAnswerTimer:null},this._direction=null,this._local_identity=null,this._remote_identity=null,this._start_time=null,this._end_time=null,this._tones=null,this._audioMuted=!1,this._videoMuted=!1,this._localHold=!1,this._remoteHold=!1,this._sessionTimers={enabled:this._ua.configuration.session_timers,refreshMethod:this._ua.configuration.session_timers_refresh_method,defaultExpires:$.SESSION_EXPIRES,currentExpires:null,running:!1,refresher:!1,timer:null},this._referSubscribers={},this._data={}}get C(){return E}get causes(){return $.causes}get id(){return this._id}get connection(){return this._connection}get contact(){return this._contact}get direction(){return this._direction}get local_identity(){return this._local_identity}get remote_identity(){return this._remote_identity}get start_time(){return this._start_time}get end_time(){return this._end_time}get data(){return this._data}set data(s){this._data=s}get status(){return this._status}isInProgress(){switch(this._status){case E.STATUS_NULL:case E.STATUS_INVITE_SENT:case E.STATUS_1XX_RECEIVED:case E.STATUS_INVITE_RECEIVED:case E.STATUS_WAITING_FOR_ANSWER:return!0;default:return!1}}isEstablished(){switch(this._status){case E.STATUS_ANSWERED:case E.STATUS_WAITING_FOR_ACK:case E.STATUS_CONFIRMED:return!0;default:return!1}}isEnded(){switch(this._status){case E.STATUS_CANCELED:case E.STATUS_TERMINATED:return!0;default:return!1}}isMuted(){return{audio:this._audioMuted,video:this._videoMuted}}isOnHold(){return{local:this._localHold,remote:this._remoteHold}}connect(s,e={},l){T.debug("connect()");let n=s,a=C2.cloneObject(e.eventHandlers),o=C2.cloneArray(e.extraHeaders),h=C2.cloneObject(e.mediaConstraints,{audio:!0,video:!0}),m=e.mediaStream||null,v=C2.cloneObject(e.pcConfig,{iceServers:[]}),_=e.rtcConstraints||null,u=e.rtcOfferConstraints||null;if(this._rtcOfferConstraints=u,this._rtcAnswerConstraints=e.rtcAnswerConstraints||null,this._data=e.data||this._data,s===void 0)throw new TypeError("Not enough arguments");if(this._status!==E.STATUS_NULL)throw new M4.InvalidStateError(this._status);if(!window.RTCPeerConnection)throw new M4.NotSupportedError("WebRTC not supported");if(s=this._ua.normalizeTarget(s),!s)throw new TypeError(`Invalid target: ${n}`);this._sessionTimers.enabled&&C2.isDecimal(e.sessionTimersExpires)&&(e.sessionTimersExpires>=$.MIN_SESSION_EXPIRES?this._sessionTimers.defaultExpires=e.sessionTimersExpires:this._sessionTimers.defaultExpires=$.SESSION_EXPIRES);for(let S in a)Object.prototype.hasOwnProperty.call(a,S)&&this.on(S,a[S]);this._from_tag=C2.newTag();let k=e.anonymous||!1,b={from_tag:this._from_tag};this._contact=this._ua.contact.toString({anonymous:k,outbound:!0}),k?(b.from_display_name="Anonymous",b.from_uri=new N7("sip","anonymous","anonymous.invalid"),o.push(`P-Preferred-Identity: ${this._ua.configuration.uri.toString()}`),o.push("Privacy: id")):e.fromUserName&&(b.from_uri=new N7("sip",e.fromUserName,this._ua.configuration.uri.host),o.push(`P-Preferred-Identity: ${this._ua.configuration.uri.toString()}`)),e.fromDisplayName&&(b.from_display_name=e.fromDisplayName),o.push(`Contact: ${this._contact}`),o.push("Content-Type: application/sdp"),this._sessionTimers.enabled&&o.push(`Session-Expires: ${this._sessionTimers.defaultExpires}${this._ua.configuration.session_timers_force_refresher?";refresher=uac":""}`),this._request=new r9.InitialOutgoingInviteRequest(s,this._ua,b,o),this._id=this._request.call_id+this._from_tag,this._createRTCConnection(v,_),this._direction="outgoing",this._local_identity=this._request.from,this._remote_identity=this._request.to,l&&l(this),this._newRTCSession("local",this._request),this._sendInitialRequest(h,u,m)}init_incoming(s,e){T.debug("init_incoming()");let l,n=s.hasHeader("Content-Type")?s.getHeader("Content-Type").toLowerCase():void 0;if(s.body&&n!=="application/sdp"){s.reply(415);return}if(this._status=E.STATUS_INVITE_RECEIVED,this._from_tag=s.from_tag,this._id=s.call_id+this._from_tag,this._request=s,this._contact=this._ua.contact.toString(),s.hasHeader("expires")&&(l=s.getHeader("expires")*1e3),s.to_tag=C2.newTag(),!this._createDialog(s,"UAS",!0)){s.reply(500,"Missing Contact header field");return}s.body?this._late_sdp=!1:this._late_sdp=!0,this._status=E.STATUS_WAITING_FOR_ANSWER,this._timers.userNoAnswerTimer=setTimeout(()=>{s.reply(408),this._failed("local",null,$.causes.NO_ANSWER)},this._ua.configuration.no_answer_timeout),l&&(this._timers.expiresTimer=setTimeout(()=>{this._status===E.STATUS_WAITING_FOR_ANSWER&&(s.reply(487),this._failed("system",null,$.causes.EXPIRES))},l)),this._direction="incoming",this._local_identity=s.to,this._remote_identity=s.from,e&&e(this),this._newRTCSession("remote",s),this._status!==E.STATUS_TERMINATED&&(s.reply(180,null,[`Contact: ${this._contact}`]),this._progress("local",null))}answer(s={}){T.debug("answer()");let e=this._request,l=C2.cloneArray(s.extraHeaders),n=C2.cloneObject(s.mediaConstraints),a=s.mediaStream||null,o=C2.cloneObject(s.pcConfig,{iceServers:[]}),h=s.rtcConstraints||null,m=s.rtcAnswerConstraints||null,v=C2.cloneObject(s.rtcOfferConstraints),_,u=!1,k=!1,b=!1,S=!1;if(this._rtcAnswerConstraints=m,this._rtcOfferConstraints=s.rtcOfferConstraints||null,this._data=s.data||this._data,this._direction!=="incoming")throw new M4.NotSupportedError('"answer" not supported for outgoing RTCSession');if(this._status!==E.STATUS_WAITING_FOR_ANSWER)throw new M4.InvalidStateError(this._status);if(this._sessionTimers.enabled&&C2.isDecimal(s.sessionTimersExpires)&&(s.sessionTimersExpires>=$.MIN_SESSION_EXPIRES?this._sessionTimers.defaultExpires=s.sessionTimersExpires:this._sessionTimers.defaultExpires=$.SESSION_EXPIRES),this._status=E.STATUS_ANSWERED,!this._createDialog(e,"UAS")){e.reply(500,"Error creating dialog");return}clearTimeout(this._timers.userNoAnswerTimer),l.unshift(`Contact: ${this._contact}`);let y=e.parseSDP();Array.isArray(y.media)||(y.media=[y.media]);for(let H of y.media)H.type==="audio"&&(u=!0,(!H.direction||H.direction==="sendrecv")&&(b=!0)),H.type==="video"&&(k=!0,(!H.direction||H.direction==="sendrecv")&&(S=!0));if(a&&n.audio===!1){_=a.getAudioTracks();for(let H of _)a.removeTrack(H)}if(a&&n.video===!1){_=a.getVideoTracks();for(let H of _)a.removeTrack(H)}!a&&n.audio===void 0&&(n.audio=b),!a&&n.video===void 0&&(n.video=S),!a&&!u&&!v.offerToReceiveAudio&&(n.audio=!1),!a&&!k&&!v.offerToReceiveVideo&&(n.video=!1),this._createRTCConnection(o,h),Promise.resolve().then(()=>{if(a)return a;if(n.audio||n.video)return this._localMediaStreamLocallyGenerated=!0,navigator.mediaDevices.getUserMedia(n).catch(H=>{throw this._status===E.STATUS_TERMINATED?new Error("terminated"):(e.reply(480),this._failed("local",null,$.causes.USER_DENIED_MEDIA_ACCESS),T.warn('emit "getusermediafailed" [error:%o]',H),this.emit("getusermediafailed",H),new Error("getUserMedia() failed"))})}).then(H=>{if(this._status===E.STATUS_TERMINATED)throw new Error("terminated");this._localMediaStream=H,H&&H.getTracks().forEach(u2=>{this._connection.addTrack(u2,H)})}).then(()=>{if(this._late_sdp)return;let H={originator:"remote",type:"offer",sdp:e.body};T.debug('emit "sdp"'),this.emit("sdp",H);let u2=new RTCSessionDescription({type:"offer",sdp:H.sdp});return this._connectionPromiseQueue=this._connectionPromiseQueue.then(()=>this._connection.setRemoteDescription(u2)).catch(g2=>{throw e.reply(488),this._failed("system",null,$.causes.WEBRTC_ERROR),T.warn('emit "peerconnection:setremotedescriptionfailed" [error:%o]',g2),this.emit("peerconnection:setremotedescriptionfailed",g2),new Error("peerconnection.setRemoteDescription() failed")}),this._connectionPromiseQueue}).then(()=>{if(this._status===E.STATUS_TERMINATED)throw new Error("terminated");return this._connecting(e),this._late_sdp?this._createLocalDescription("offer",this._rtcOfferConstraints).catch(()=>{throw e.reply(500),new Error("_createLocalDescription() failed")}):this._createLocalDescription("answer",m).catch(()=>{throw e.reply(500),new Error("_createLocalDescription() failed")})}).then(H=>{if(this._status===E.STATUS_TERMINATED)throw new Error("terminated");this._handleSessionTimersInIncomingRequest(e,l),e.reply(200,null,l,H,()=>{this._status=E.STATUS_WAITING_FOR_ACK,this._setInvite2xxTimer(e,H),this._setACKTimer(),this._accepted("local")},()=>{this._failed("system",null,$.causes.CONNECTION_ERROR)})}).catch(H=>{this._status!==E.STATUS_TERMINATED&&(T.warn(`answer() failed: ${H.message}`),this._failed("system",H.message,$.causes.INTERNAL_ERROR))})}terminate(s={}){T.debug("terminate()");let e=s.cause||$.causes.BYE,l=C2.cloneArray(s.extraHeaders),n=s.body,a,o=s.status_code,h=s.reason_phrase;if(this._status===E.STATUS_TERMINATED)throw new M4.InvalidStateError(this._status);switch(this._status){case E.STATUS_NULL:case E.STATUS_INVITE_SENT:case E.STATUS_1XX_RECEIVED:{if(T.debug("canceling session"),o&&(o<200||o>=700))throw new TypeError(`Invalid status_code: ${o}`);o&&(h=h||$.REASON_PHRASE[o]||"",a=`SIP ;cause=${o} ;text="${h}"`),this._status===E.STATUS_NULL||this._status===E.STATUS_INVITE_SENT?(this._is_canceled=!0,this._cancel_reason=a):this._status===E.STATUS_1XX_RECEIVED&&this._request.cancel(a),this._status=E.STATUS_CANCELED,this._failed("local",null,$.causes.CANCELED);break}case E.STATUS_WAITING_FOR_ANSWER:case E.STATUS_ANSWERED:{if(T.debug("rejecting session"),o=o||480,o<300||o>=700)throw new TypeError(`Invalid status_code: ${o}`);this._request.reply(o,h,l,n),this._failed("local",null,$.causes.REJECTED);break}case E.STATUS_WAITING_FOR_ACK:case E.STATUS_CONFIRMED:{if(T.debug("terminating session"),h=s.reason_phrase||$.REASON_PHRASE[o]||"",o&&(o<200||o>=700))throw new TypeError(`Invalid status_code: ${o}`);if(o&&l.push(`Reason: SIP ;cause=${o}; text="${h}"`),this._status===E.STATUS_WAITING_FOR_ACK&&this._direction==="incoming"&&this._request.server_transaction.state!==y7.C.STATUS_TERMINATED){let m=this._dialog;this.receiveRequest=({method:v})=>{v===$.ACK&&(this.sendRequest($.BYE,{extraHeaders:l,body:n}),m.terminate())},this._request.server_transaction.on("stateChanged",()=>{this._request.server_transaction.state===y7.C.STATUS_TERMINATED&&(this.sendRequest($.BYE,{extraHeaders:l,body:n}),m.terminate())}),this._ended("local",null,e),this._dialog=m,this._ua.newDialog(m)}else this.sendRequest($.BYE,{extraHeaders:l,body:n}),this._ended("local",null,e)}}}sendDTMF(s,e={}){T.debug("sendDTMF() | tones: %s",s);let l=e.duration||null,n=e.interToneGap||null,a=e.transportType||$.DTMF_TRANSPORT.INFO;if(s===void 0)throw new TypeError("Not enough arguments");if(this._status!==E.STATUS_CONFIRMED&&this._status!==E.STATUS_WAITING_FOR_ACK&&this._status!==E.STATUS_1XX_RECEIVED)throw new M4.InvalidStateError(this._status);if(a!==$.DTMF_TRANSPORT.INFO&&a!==$.DTMF_TRANSPORT.RFC2833)throw new TypeError(`invalid transportType: ${a}`);if(typeof s=="number"&&(s=s.toString()),!s||typeof s!="string"||!s.match(/^[0-9A-DR#*,]+$/i))throw new TypeError(`Invalid tones: ${s}`);if(l&&!C2.isDecimal(l))throw new TypeError(`Invalid tone duration: ${l}`);if(l?l<t1.C.MIN_DURATION?(T.debug(`"duration" value is lower than the minimum allowed, setting it to ${t1.C.MIN_DURATION} milliseconds`),l=t1.C.MIN_DURATION):l>t1.C.MAX_DURATION?(T.debug(`"duration" value is greater than the maximum allowed, setting it to ${t1.C.MAX_DURATION} milliseconds`),l=t1.C.MAX_DURATION):l=Math.abs(l):l=t1.C.DEFAULT_DURATION,e.duration=l,n&&!C2.isDecimal(n))throw new TypeError(`Invalid interToneGap: ${n}`);if(n?n<t1.C.MIN_INTER_TONE_GAP?(T.debug(`"interToneGap" value is lower than the minimum allowed, setting it to ${t1.C.MIN_INTER_TONE_GAP} milliseconds`),n=t1.C.MIN_INTER_TONE_GAP):n=Math.abs(n):n=t1.C.DEFAULT_INTER_TONE_GAP,a===$.DTMF_TRANSPORT.RFC2833){let h=this._getDTMFRTPSender();h&&(s=h.toneBuffer+s,h.insertDTMF(s,l,n));return}if(this._tones){this._tones+=s;return}this._tones=s,o.call(this);function o(){let h;if(this._status===E.STATUS_TERMINATED||!this._tones){this._tones=null;return}let m=this._tones[0];if(this._tones=this._tones.substring(1),m===",")h=2e3;else{let v=new t1(this);e.eventHandlers={onFailed:()=>{this._tones=null}},v.send(m,e),h=l+n}setTimeout(o.bind(this),h)}}sendInfo(s,e,l={}){if(T.debug("sendInfo()"),this._status!==E.STATUS_CONFIRMED&&this._status!==E.STATUS_WAITING_FOR_ACK&&this._status!==E.STATUS_1XX_RECEIVED)throw new M4.InvalidStateError(this._status);new T7(this).send(s,e,l)}mute(s={audio:!0,video:!1}){T.debug("mute()");let e=!1,l=!1;this._audioMuted===!1&&s.audio&&(e=!0,this._audioMuted=!0,this._toggleMuteAudio(!0)),this._videoMuted===!1&&s.video&&(l=!0,this._videoMuted=!0,this._toggleMuteVideo(!0)),(e===!0||l===!0)&&this._onmute({audio:e,video:l})}unmute(s={audio:!0,video:!0}){T.debug("unmute()");let e=!1,l=!1;this._audioMuted===!0&&s.audio&&(e=!0,this._audioMuted=!1,this._localHold===!1&&this._toggleMuteAudio(!1)),this._videoMuted===!0&&s.video&&(l=!0,this._videoMuted=!1,this._localHold===!1&&this._toggleMuteVideo(!1)),(e===!0||l===!0)&&this._onunmute({audio:e,video:l})}hold(s={},e){if(T.debug("hold()"),this._status!==E.STATUS_WAITING_FOR_ACK&&this._status!==E.STATUS_CONFIRMED||this._localHold===!0||!this.isReadyToReOffer())return!1;this._localHold=!0,this._onhold("local");let l={succeeded:()=>{e&&e()},failed:()=>{this.terminate({cause:$.causes.WEBRTC_ERROR,status_code:500,reason_phrase:"Hold Failed"})}};return s.useUpdate?this._sendUpdate({sdpOffer:!0,eventHandlers:l,extraHeaders:s.extraHeaders}):this._sendReinvite({eventHandlers:l,extraHeaders:s.extraHeaders}),!0}unhold(s={},e){if(T.debug("unhold()"),this._status!==E.STATUS_WAITING_FOR_ACK&&this._status!==E.STATUS_CONFIRMED||this._localHold===!1||!this.isReadyToReOffer())return!1;this._localHold=!1,this._onunhold("local");let l={succeeded:()=>{e&&e()},failed:()=>{this.terminate({cause:$.causes.WEBRTC_ERROR,status_code:500,reason_phrase:"Unhold Failed"})}};return s.useUpdate?this._sendUpdate({sdpOffer:!0,eventHandlers:l,extraHeaders:s.extraHeaders}):this._sendReinvite({eventHandlers:l,extraHeaders:s.extraHeaders}),!0}renegotiate(s={},e){T.debug("renegotiate()");let l=s.rtcOfferConstraints||null;if(this._status!==E.STATUS_WAITING_FOR_ACK&&this._status!==E.STATUS_CONFIRMED||!this.isReadyToReOffer())return!1;let n={succeeded:()=>{e&&e()},failed:()=>{this.terminate({cause:$.causes.WEBRTC_ERROR,status_code:500,reason_phrase:"Media Renegotiation Failed"})}};return this._setLocalMediaStatus(),s.useUpdate?this._sendUpdate({sdpOffer:!0,eventHandlers:n,rtcOfferConstraints:l,extraHeaders:s.extraHeaders}):this._sendReinvite({eventHandlers:n,rtcOfferConstraints:l,extraHeaders:s.extraHeaders}),!0}refer(s,e){T.debug("refer()");let l=s;if(this._status!==E.STATUS_WAITING_FOR_ACK&&this._status!==E.STATUS_CONFIRMED)return!1;if(s=this._ua.normalizeTarget(s),!s)throw new TypeError(`Invalid target: ${l}`);let n=new o9(this);n.sendRefer(s,e);let a=n.id;return this._referSubscribers[a]=n,n.on("requestFailed",()=>{delete this._referSubscribers[a]}),n.on("accepted",()=>{delete this._referSubscribers[a]}),n.on("failed",()=>{delete this._referSubscribers[a]}),n.on("authenticated",()=>{delete this._referSubscribers[a],a=n.id,this._referSubscribers[a]=n}),n}sendRequest(s,e){if(T.debug("sendRequest()"),this._dialog)return this._dialog.sendRequest(s,e);{let l=Object.values(this._earlyDialogs);if(l.length>0)return l[0].sendRequest(s,e);T.warn("sendRequest() | no valid early dialog found");return}}receiveRequest(s){if(T.debug("receiveRequest()"),s.method===$.CANCEL)(this._status===E.STATUS_WAITING_FOR_ANSWER||this._status===E.STATUS_ANSWERED)&&(this._status=E.STATUS_CANCELED,this._request.reply(487),this._failed("remote",s,$.causes.CANCELED));else switch(s.method){case $.ACK:{if(this._status!==E.STATUS_WAITING_FOR_ACK)return;if(this._status=E.STATUS_CONFIRMED,clearTimeout(this._timers.ackTimer),clearTimeout(this._timers.invite2xxTimer),this._late_sdp){if(!s.body){this.terminate({cause:$.causes.MISSING_SDP,status_code:400});break}let e={originator:"remote",type:"answer",sdp:s.body};T.debug('emit "sdp"'),this.emit("sdp",e);let l=new RTCSessionDescription({type:"answer",sdp:e.sdp});this._connectionPromiseQueue=this._connectionPromiseQueue.then(()=>this._connection.setRemoteDescription(l)).then(()=>{this._is_confirmed||this._confirmed("remote",s)}).catch(n=>{this.terminate({cause:$.causes.BAD_MEDIA_DESCRIPTION,status_code:488}),T.warn('emit "peerconnection:setremotedescriptionfailed" [error:%o]',n),this.emit("peerconnection:setremotedescriptionfailed",n)})}else this._is_confirmed||this._confirmed("remote",s);break}case $.BYE:{this._status===E.STATUS_CONFIRMED||this._status===E.STATUS_WAITING_FOR_ACK?(s.reply(200),this._ended("remote",s,$.causes.BYE)):this._status===E.STATUS_INVITE_RECEIVED||this._status===E.STATUS_WAITING_FOR_ANSWER?(s.reply(200),this._request.reply(487,"BYE Received"),this._ended("remote",s,$.causes.BYE)):s.reply(403,"Wrong Status");break}case $.INVITE:{this._status===E.STATUS_CONFIRMED?s.hasHeader("replaces")?this._receiveReplaces(s):this._receiveReinvite(s):s.reply(403,"Wrong Status");break}case $.INFO:{if(this._status===E.STATUS_1XX_RECEIVED||this._status===E.STATUS_WAITING_FOR_ANSWER||this._status===E.STATUS_ANSWERED||this._status===E.STATUS_WAITING_FOR_ACK||this._status===E.STATUS_CONFIRMED){let e=s.hasHeader("Content-Type")?s.getHeader("Content-Type").toLowerCase():void 0;e&&e.match(/^application\/dtmf-relay/i)?new t1(this).init_incoming(s):e!==void 0?new T7(this).init_incoming(s):s.reply(415)}else s.reply(403,"Wrong Status");break}case $.UPDATE:{this._status===E.STATUS_CONFIRMED?this._receiveUpdate(s):s.reply(403,"Wrong Status");break}case $.REFER:{this._status===E.STATUS_CONFIRMED?this._receiveRefer(s):s.reply(403,"Wrong Status");break}case $.NOTIFY:{this._status===E.STATUS_CONFIRMED?this._receiveNotify(s):s.reply(403,"Wrong Status");break}default:s.reply(501)}}onTransportError(){T.warn("onTransportError()"),this._status!==E.STATUS_TERMINATED&&this.terminate({status_code:500,reason_phrase:$.causes.CONNECTION_ERROR,cause:$.causes.CONNECTION_ERROR})}onRequestTimeout(){T.warn("onRequestTimeout()"),this._status!==E.STATUS_TERMINATED&&this.terminate({status_code:408,reason_phrase:$.causes.REQUEST_TIMEOUT,cause:$.causes.REQUEST_TIMEOUT})}onDialogError(){T.warn("onDialogError()"),this._status!==E.STATUS_TERMINATED&&this.terminate({status_code:500,reason_phrase:$.causes.DIALOG_ERROR,cause:$.causes.DIALOG_ERROR})}newDTMF(s){T.debug("newDTMF()"),this.emit("newDTMF",s)}newInfo(s){T.debug("newInfo()"),this.emit("newInfo",s)}isReadyToReOffer(){return this._rtcReady?this._dialog?this._dialog.uac_pending_reply===!0||this._dialog.uas_pending_reply===!0?(T.debug("isReadyToReOffer() | there is another INVITE/UPDATE transaction in progress"),!1):!0:(T.debug("isReadyToReOffer() | session not established yet"),!1):(T.debug("isReadyToReOffer() | internal WebRTC status not ready"),!1)}_close(){if(T.debug("close()"),this._localMediaStream&&this._localMediaStreamLocallyGenerated&&(T.debug("close() | closing local MediaStream"),C2.closeMediaStream(this._localMediaStream)),this._status!==E.STATUS_TERMINATED){if(this._status=E.STATUS_TERMINATED,this._connection)try{this._connection.close()}catch(s){T.warn("close() | error closing the RTCPeerConnection: %o",s)}for(let s in this._timers)Object.prototype.hasOwnProperty.call(this._timers,s)&&clearTimeout(this._timers[s]);clearTimeout(this._sessionTimers.timer),this._dialog&&(this._dialog.terminate(),delete this._dialog);for(let s in this._earlyDialogs)Object.prototype.hasOwnProperty.call(this._earlyDialogs,s)&&(this._earlyDialogs[s].terminate(),delete this._earlyDialogs[s]);for(let s in this._referSubscribers)Object.prototype.hasOwnProperty.call(this._referSubscribers,s)&&delete this._referSubscribers[s];this._ua.destroyRTCSession(this)}}_setInvite2xxTimer(s,e){let l=b3.T1;function n(){this._status===E.STATUS_WAITING_FOR_ACK&&(s.reply(200,null,[`Contact: ${this._contact}`],e),l<b3.T2&&(l=l*2,l>b3.T2&&(l=b3.T2)),this._timers.invite2xxTimer=setTimeout(n.bind(this),l))}this._timers.invite2xxTimer=setTimeout(n.bind(this),l)}_setACKTimer(){this._timers.ackTimer=setTimeout(()=>{this._status===E.STATUS_WAITING_FOR_ACK&&(T.debug("no ACK received, terminating the session"),clearTimeout(this._timers.invite2xxTimer),this.sendRequest($.BYE),this._ended("remote",null,$.causes.NO_ACK))},b3.TIMER_H)}_createRTCConnection(s,e){this._connection=new RTCPeerConnection(s,e),this._connection.addEventListener("iceconnectionstatechange",()=>{this._connection.iceConnectionState==="failed"&&this.terminate({cause:$.causes.RTP_TIMEOUT,status_code:408,reason_phrase:$.causes.RTP_TIMEOUT})}),T.debug('emit "peerconnection"'),this.emit("peerconnection",{peerconnection:this._connection})}_createLocalDescription(s,e){if(T.debug("createLocalDescription()"),s!=="offer"&&s!=="answer")throw new Error(`createLocalDescription() | invalid type "${s}"`);let l=this._connection;return this._rtcReady=!1,Promise.resolve().then(()=>s==="offer"?l.createOffer(e).catch(n=>(T.warn('emit "peerconnection:createofferfailed" [error:%o]',n),this.emit("peerconnection:createofferfailed",n),Promise.reject(n))):l.createAnswer(e).catch(n=>(T.warn('emit "peerconnection:createanswerfailed" [error:%o]',n),this.emit("peerconnection:createanswerfailed",n),Promise.reject(n)))).then(n=>l.setLocalDescription(n).catch(a=>(this._rtcReady=!0,T.warn('emit "peerconnection:setlocaldescriptionfailed" [error:%o]',a),this.emit("peerconnection:setlocaldescriptionfailed",a),Promise.reject(a)))).then(()=>{let n=e&&e.iceRestart;if(l.iceGatheringState==="complete"&&!n||l.iceGatheringState==="gathering"&&this._iceReady){this._rtcReady=!0;let a={originator:"local",type:s,sdp:l.localDescription.sdp};return T.debug('emit "sdp"'),this.emit("sdp",a),Promise.resolve(a.sdp)}return new Promise(a=>{let o=!1,h,m;this._iceReady=!1;let v=()=>{if(o)return;l.removeEventListener("icecandidate",h),l.removeEventListener("icegatheringstatechange",m),o=!0,this._rtcReady=!0,this._iceReady=!0;let _={originator:"local",type:s,sdp:l.localDescription.sdp};T.debug('emit "sdp"'),this.emit("sdp",_),a(_.sdp)};l.addEventListener("icecandidate",h=_=>{let u=_.candidate;u?this.emit("icecandidate",{candidate:u,ready:v}):v()}),l.addEventListener("icegatheringstatechange",m=()=>{l.iceGatheringState==="complete"&&v()})})})}_createDialog(s,e,l){let n=e==="UAS"?s.to_tag:s.from_tag,a=e==="UAS"?s.from_tag:s.to_tag,o=s.call_id+n+a,h=this._earlyDialogs[o];if(l)return h?!0:(h=new H0(this,s,e,H0.C.STATUS_EARLY),h.error?(T.debug(h.error),this._failed("remote",s,$.causes.INTERNAL_ERROR),!1):(this._earlyDialogs[o]=h,!0));{if(this._from_tag=s.from_tag,this._to_tag=s.to_tag,h)return h.update(s,e),this._dialog=h,delete this._earlyDialogs[o],!0;let m=new H0(this,s,e);return m.error?(T.debug(m.error),this._failed("remote",s,$.causes.INTERNAL_ERROR),!1):(this._dialog=m,!0)}}_receiveReinvite(s){T.debug("receiveReinvite()");let e=s.hasHeader("Content-Type")?s.getHeader("Content-Type").toLowerCase():void 0,l={request:s,callback:void 0,reject:a.bind(this)},n=!1;function a(h={}){n=!0;let m=h.status_code||403,v=h.reason_phrase||"",_=C2.cloneArray(h.extraHeaders);if(this._status!==E.STATUS_CONFIRMED)return!1;if(m<300||m>=700)throw new TypeError(`Invalid status_code: ${m}`);s.reply(m,v,_)}if(this.emit("reinvite",l),n)return;if(this._late_sdp=!1,!s.body){this._late_sdp=!0,this._remoteHold&&(this._remoteHold=!1,this._onunhold("remote")),this._connectionPromiseQueue=this._connectionPromiseQueue.then(()=>this._createLocalDescription("offer",this._rtcOfferConstraints)).then(h=>{o.call(this,h)}).catch(()=>{s.reply(500)});return}if(e!=="application/sdp"){T.debug("invalid Content-Type"),s.reply(415);return}this._processInDialogSdpOffer(s).then(h=>{this._status!==E.STATUS_TERMINATED&&o.call(this,h)}).catch(h=>{T.warn(h)});function o(h){let m=[`Contact: ${this._contact}`];this._handleSessionTimersInIncomingRequest(s,m),this._late_sdp&&(h=this._mangleOffer(h)),s.reply(200,null,m,h,()=>{this._status=E.STATUS_WAITING_FOR_ACK,this._setInvite2xxTimer(s,h),this._setACKTimer()}),typeof l.callback=="function"&&l.callback()}}_receiveUpdate(s){T.debug("receiveUpdate()");let e=s.hasHeader("Content-Type")?s.getHeader("Content-Type").toLowerCase():void 0,l={request:s,callback:void 0,reject:a.bind(this)},n=!1;function a(h={}){n=!0;let m=h.status_code||403,v=h.reason_phrase||"",_=C2.cloneArray(h.extraHeaders);if(this._status!==E.STATUS_CONFIRMED)return!1;if(m<300||m>=700)throw new TypeError(`Invalid status_code: ${m}`);s.reply(m,v,_)}if(this.emit("update",l),n)return;if(!s.body){o.call(this,null);return}if(e!=="application/sdp"){T.debug("invalid Content-Type"),s.reply(415);return}this._processInDialogSdpOffer(s).then(h=>{this._status!==E.STATUS_TERMINATED&&o.call(this,h)}).catch(h=>{T.warn(h)});function o(h){let m=[`Contact: ${this._contact}`];this._handleSessionTimersInIncomingRequest(s,m),s.reply(200,null,m,h),typeof l.callback=="function"&&l.callback()}}_processInDialogSdpOffer(s){T.debug("_processInDialogSdpOffer()");let e=s.parseSDP(),l=!1;for(let o of e.media){if(O0.indexOf(o.type)===-1)continue;let h=o.direction||e.direction||"sendrecv";if(h==="sendonly"||h==="inactive")l=!0;else{l=!1;break}}let n={originator:"remote",type:"offer",sdp:s.body};T.debug('emit "sdp"'),this.emit("sdp",n);let a=new RTCSessionDescription({type:"offer",sdp:n.sdp});return this._connectionPromiseQueue=this._connectionPromiseQueue.then(()=>{if(this._status===E.STATUS_TERMINATED)throw new Error("terminated");return this._connection.setRemoteDescription(a).catch(o=>{throw s.reply(488),T.warn('emit "peerconnection:setremotedescriptionfailed" [error:%o]',o),this.emit("peerconnection:setremotedescriptionfailed",o),o})}).then(()=>{if(this._status===E.STATUS_TERMINATED)throw new Error("terminated");this._remoteHold===!0&&l===!1?(this._remoteHold=!1,this._onunhold("remote")):this._remoteHold===!1&&l===!0&&(this._remoteHold=!0,this._onhold("remote"))}).then(()=>{if(this._status===E.STATUS_TERMINATED)throw new Error("terminated");return this._createLocalDescription("answer",this._rtcAnswerConstraints).catch(o=>{throw s.reply(500),T.warn('emit "peerconnection:createtelocaldescriptionfailed" [error:%o]',o),o})}).catch(o=>{T.warn("_processInDialogSdpOffer() failed [error: %o]",o)}),this._connectionPromiseQueue}_receiveRefer(s){if(T.debug("receiveRefer()"),!s.refer_to){T.debug("no Refer-To header field present in REFER"),s.reply(400);return}if(s.refer_to.uri.scheme!==$.SIP){T.debug("Refer-To header field points to a non-SIP URI scheme"),s.reply(416);return}s.reply(202);let e=new n9(this,s.cseq);T.debug('emit "refer"'),this.emit("refer",{request:s,accept:(a,o)=>{l.call(this,a,o)},reject:()=>{n.call(this)}});function l(a,o={}){if(a=typeof a=="function"?a:null,this._status!==E.STATUS_WAITING_FOR_ACK&&this._status!==E.STATUS_CONFIRMED)return!1;let h=new Ue(this._ua);if(h.on("progress",({response:v})=>{e.notify(v.status_code,v.reason_phrase)}),h.on("accepted",({response:v})=>{e.notify(v.status_code,v.reason_phrase)}),h.on("_failed",({message:v,cause:_})=>{v?e.notify(v.status_code,v.reason_phrase):e.notify(487,_)}),s.refer_to.uri.hasHeader("replaces")){let v=decodeURIComponent(s.refer_to.uri.getHeader("replaces"));o.extraHeaders=C2.cloneArray(o.extraHeaders),o.extraHeaders.push(`Replaces: ${v}`)}let m=s.refer_to.uri.clone();m.clearHeaders(),h.connect(m,o,a)}function n(){e.notify(603)}}_receiveNotify(s){switch(T.debug("receiveNotify()"),s.event||s.reply(400),s.event.event){case"refer":{let e,l;if(s.event.params&&s.event.params.id)e=s.event.params.id,l=this._referSubscribers[e];else if(Object.keys(this._referSubscribers).length===1)l=this._referSubscribers[Object.keys(this._referSubscribers)[0]];else{s.reply(400,"Missing event id parameter");return}if(!l){s.reply(481,"Subscription does not exist");return}l.receiveNotify(s),s.reply(200);break}default:s.reply(489)}}_receiveReplaces(s){T.debug("receiveReplaces()");function e(n){if(this._status!==E.STATUS_WAITING_FOR_ACK&&this._status!==E.STATUS_CONFIRMED)return!1;let a=new Ue(this._ua);a.on("confirmed",()=>{this.terminate()}),a.init_incoming(s,n)}function l(){T.debug("Replaced INVITE rejected by the user"),s.reply(486)}this.emit("replaces",{request:s,accept:n=>{e.call(this,n)},reject:()=>{l.call(this)}})}_sendInitialRequest(s,e,l){let n=new i9(this._ua,this._request,{onRequestTimeout:()=>{this.onRequestTimeout()},onTransportError:()=>{this.onTransportError()},onAuthenticated:a=>{this._request=a},onReceiveResponse:a=>{this._receiveInviteResponse(a)}});Promise.resolve().then(()=>{if(l)return l;if(s.audio||s.video)return this._localMediaStreamLocallyGenerated=!0,navigator.mediaDevices.getUserMedia(s).catch(a=>{throw this._status===E.STATUS_TERMINATED?new Error("terminated"):(this._failed("local",null,$.causes.USER_DENIED_MEDIA_ACCESS),T.warn('emit "getusermediafailed" [error:%o]',a),this.emit("getusermediafailed",a),a)})}).then(a=>{if(this._status===E.STATUS_TERMINATED)throw new Error("terminated");return this._localMediaStream=a,a&&a.getTracks().forEach(o=>{this._connection.addTrack(o,a)}),this._connecting(this._request),this._createLocalDescription("offer",e).catch(o=>{throw this._failed("local",null,$.causes.WEBRTC_ERROR),o})}).then(a=>{if(this._is_canceled||this._status===E.STATUS_TERMINATED)throw new Error("terminated");this._request.body=a,this._status=E.STATUS_INVITE_SENT,T.debug('emit "sending" [request:%o]',this._request),this.emit("sending",{request:this._request}),n.send()}).catch(a=>{this._status!==E.STATUS_TERMINATED&&T.warn(a)})}_getDTMFRTPSender(){let s=this._connection.getSenders().find(e=>e.track&&e.track.kind==="audio");if(!(s&&s.dtmf)){T.warn("sendDTMF() | no local audio track to send DTMF with");return}return s.dtmf}_receiveInviteResponse(s){if(T.debug("receiveInviteResponse()"),this._dialog&&s.status_code>=200&&s.status_code<=299)if(this._dialog.id.call_id===s.call_id&&this._dialog.id.local_tag===s.from_tag&&this._dialog.id.remote_tag===s.to_tag){this.sendRequest($.ACK);return}else{let e=new H0(this,s,"UAC");if(e.error!==void 0){T.debug(e.error);return}this.sendRequest($.ACK),this.sendRequest($.BYE);return}if(this._is_canceled){s.status_code>=100&&s.status_code<200?this._request.cancel(this._cancel_reason):s.status_code>=200&&s.status_code<299&&this._acceptAndTerminate(s);return}if(!(this._status!==E.STATUS_INVITE_SENT&&this._status!==E.STATUS_1XX_RECEIVED))switch(!0){case/^100$/.test(s.status_code):{this._status=E.STATUS_1XX_RECEIVED;break}case/^1[0-9]{2}$/.test(s.status_code):{if(!s.to_tag){T.debug("1xx response received without to tag");break}if(s.hasHeader("contact")&&!this._createDialog(s,"UAC",!0))break;if(this._status=E.STATUS_1XX_RECEIVED,!s.body){this._progress("remote",s);break}let e={originator:"remote",type:"answer",sdp:s.body};T.debug('emit "sdp"'),this.emit("sdp",e);let l=new RTCSessionDescription({type:"answer",sdp:e.sdp});this._connectionPromiseQueue=this._connectionPromiseQueue.then(()=>this._connection.setRemoteDescription(l)).then(()=>this._progress("remote",s)).catch(n=>{T.warn('emit "peerconnection:setremotedescriptionfailed" [error:%o]',n),this.emit("peerconnection:setremotedescriptionfailed",n)});break}case/^2[0-9]{2}$/.test(s.status_code):{if(this._status=E.STATUS_CONFIRMED,!s.body){this._acceptAndTerminate(s,400,$.causes.MISSING_SDP),this._failed("remote",s,$.causes.BAD_MEDIA_DESCRIPTION);break}if(!this._createDialog(s,"UAC"))break;let e={originator:"remote",type:"answer",sdp:s.body};T.debug('emit "sdp"'),this.emit("sdp",e);let l=new RTCSessionDescription({type:"answer",sdp:e.sdp});this._connectionPromiseQueue=this._connectionPromiseQueue.then(()=>{if(this._connection.signalingState==="stable")return this._connection.createOffer(this._rtcOfferConstraints).then(n=>this._connection.setLocalDescription(n)).catch(n=>{this._acceptAndTerminate(s,500,n.toString()),this._failed("local",s,$.causes.WEBRTC_ERROR)})}).then(()=>{this._connection.setRemoteDescription(l).then(()=>{this._handleSessionTimersInIncomingResponse(s),this._accepted("remote",s),this.sendRequest($.ACK),this._confirmed("local",null)}).catch(n=>{this._acceptAndTerminate(s,488,"Not Acceptable Here"),this._failed("remote",s,$.causes.BAD_MEDIA_DESCRIPTION),T.warn('emit "peerconnection:setremotedescriptionfailed" [error:%o]',n),this.emit("peerconnection:setremotedescriptionfailed",n)})});break}default:{let e=C2.sipErrorCause(s.status_code);this._failed("remote",s,e)}}}_sendReinvite(s={}){T.debug("sendReinvite()");let e=C2.cloneArray(s.extraHeaders),l=C2.cloneObject(s.eventHandlers),n=s.rtcOfferConstraints||this._rtcOfferConstraints||null,a=!1;e.push(`Contact: ${this._contact}`),e.push("Content-Type: application/sdp"),this._sessionTimers.running&&e.push(`Session-Expires: ${this._sessionTimers.currentExpires};refresher=${this._sessionTimers.refresher?"uac":"uas"}`),this._connectionPromiseQueue=this._connectionPromiseQueue.then(()=>this._createLocalDescription("offer",n)).then(m=>{m=this._mangleOffer(m);let v={originator:"local",type:"offer",sdp:m};T.debug('emit "sdp"'),this.emit("sdp",v),this.sendRequest($.INVITE,{extraHeaders:e,body:m,eventHandlers:{onSuccessResponse:_=>{o.call(this,_),a=!0},onErrorResponse:_=>{h.call(this,_)},onTransportError:()=>{this.onTransportError()},onRequestTimeout:()=>{this.onRequestTimeout()},onDialogError:()=>{this.onDialogError()}}})}).catch(()=>{h()});function o(m){if(this._status===E.STATUS_TERMINATED||(this.sendRequest($.ACK),a))return;if(this._handleSessionTimersInIncomingResponse(m),m.body){if(!m.hasHeader("Content-Type")||m.getHeader("Content-Type").toLowerCase()!=="application/sdp"){h.call(this);return}}else{h.call(this);return}let v={originator:"remote",type:"answer",sdp:m.body};T.debug('emit "sdp"'),this.emit("sdp",v);let _=new RTCSessionDescription({type:"answer",sdp:v.sdp});this._connectionPromiseQueue=this._connectionPromiseQueue.then(()=>this._connection.setRemoteDescription(_)).then(()=>{l.succeeded&&l.succeeded(m)}).catch(u=>{h.call(this),T.warn('emit "peerconnection:setremotedescriptionfailed" [error:%o]',u),this.emit("peerconnection:setremotedescriptionfailed",u)})}function h(m){l.failed&&l.failed(m)}}_sendUpdate(s={}){T.debug("sendUpdate()");let e=C2.cloneArray(s.extraHeaders),l=C2.cloneObject(s.eventHandlers),n=s.rtcOfferConstraints||this._rtcOfferConstraints||null,a=s.sdpOffer||!1,o=!1;e.push(`Contact: ${this._contact}`),this._sessionTimers.running&&e.push(`Session-Expires: ${this._sessionTimers.currentExpires};refresher=${this._sessionTimers.refresher?"uac":"uas"}`),a?(e.push("Content-Type: application/sdp"),this._connectionPromiseQueue=this._connectionPromiseQueue.then(()=>this._createLocalDescription("offer",n)).then(v=>{v=this._mangleOffer(v);let _={originator:"local",type:"offer",sdp:v};T.debug('emit "sdp"'),this.emit("sdp",_),this.sendRequest($.UPDATE,{extraHeaders:e,body:v,eventHandlers:{onSuccessResponse:u=>{h.call(this,u),o=!0},onErrorResponse:u=>{m.call(this,u)},onTransportError:()=>{this.onTransportError()},onRequestTimeout:()=>{this.onRequestTimeout()},onDialogError:()=>{this.onDialogError()}}})}).catch(()=>{m.call(this)})):this.sendRequest($.UPDATE,{extraHeaders:e,eventHandlers:{onSuccessResponse:v=>{h.call(this,v)},onErrorResponse:v=>{m.call(this,v)},onTransportError:()=>{this.onTransportError()},onRequestTimeout:()=>{this.onRequestTimeout()},onDialogError:()=>{this.onDialogError()}}});function h(v){if(this._status!==E.STATUS_TERMINATED&&!o)if(this._handleSessionTimersInIncomingResponse(v),a){if(v.body){if(!v.hasHeader("Content-Type")||v.getHeader("Content-Type").toLowerCase()!=="application/sdp"){m.call(this);return}}else{m.call(this);return}let _={originator:"remote",type:"answer",sdp:v.body};T.debug('emit "sdp"'),this.emit("sdp",_);let u=new RTCSessionDescription({type:"answer",sdp:_.sdp});this._connectionPromiseQueue=this._connectionPromiseQueue.then(()=>this._connection.setRemoteDescription(u)).then(()=>{l.succeeded&&l.succeeded(v)}).catch(k=>{m.call(this),T.warn('emit "peerconnection:setremotedescriptionfailed" [error:%o]',k),this.emit("peerconnection:setremotedescriptionfailed",k)})}else l.succeeded&&l.succeeded(v)}function m(v){l.failed&&l.failed(v)}}_acceptAndTerminate(s,e,l){T.debug("acceptAndTerminate()");let n=[];e&&(l=l||$.REASON_PHRASE[e]||"",n.push(`Reason: SIP ;cause=${e}; text="${l}"`)),(this._dialog||this._createDialog(s,"UAC"))&&(this.sendRequest($.ACK),this.sendRequest($.BYE,{extraHeaders:n})),this._status=E.STATUS_TERMINATED}_mangleOffer(s){if(!this._localHold&&!this._remoteHold)return s;if(s=w7.parse(s),this._localHold&&!this._remoteHold){T.debug("mangleOffer() | me on hold, mangling offer");for(let e of s.media)O0.indexOf(e.type)!==-1&&(e.direction?e.direction==="sendrecv"?e.direction="sendonly":e.direction==="recvonly"&&(e.direction="inactive"):e.direction="sendonly")}else if(this._localHold&&this._remoteHold){T.debug("mangleOffer() | both on hold, mangling offer");for(let e of s.media)O0.indexOf(e.type)!==-1&&(e.direction="inactive")}else if(this._remoteHold){T.debug("mangleOffer() | remote on hold, mangling offer");for(let e of s.media)O0.indexOf(e.type)!==-1&&(e.direction?e.direction==="sendrecv"?e.direction="recvonly":e.direction==="recvonly"&&(e.direction="inactive"):e.direction="recvonly")}return w7.write(s)}_setLocalMediaStatus(){let s=!0,e=!0;(this._localHold||this._remoteHold)&&(s=!1,e=!1),this._audioMuted&&(s=!1),this._videoMuted&&(e=!1),this._toggleMuteAudio(!s),this._toggleMuteVideo(!e)}_handleSessionTimersInIncomingRequest(s,e){if(!this._sessionTimers.enabled)return;let l;s.session_expires&&s.session_expires>=$.MIN_SESSION_EXPIRES?(this._sessionTimers.currentExpires=s.session_expires,l=s.session_expires_refresher||"uas"):(this._sessionTimers.currentExpires=this._sessionTimers.defaultExpires,l="uas"),e.push(`Session-Expires: ${this._sessionTimers.currentExpires};refresher=${l}`),this._sessionTimers.refresher=l==="uas",this._runSessionTimer()}_handleSessionTimersInIncomingResponse(s){if(!this._sessionTimers.enabled)return;let e;s.session_expires&&s.session_expires>=$.MIN_SESSION_EXPIRES?(this._sessionTimers.currentExpires=s.session_expires,e=s.session_expires_refresher||"uac"):(this._sessionTimers.currentExpires=this._sessionTimers.defaultExpires,e="uac"),this._sessionTimers.refresher=e==="uac",this._runSessionTimer()}_runSessionTimer(){let s=this._sessionTimers.currentExpires;this._sessionTimers.running=!0,clearTimeout(this._sessionTimers.timer),this._sessionTimers.refresher?this._sessionTimers.timer=setTimeout(()=>{this._status!==E.STATUS_TERMINATED&&this.isReadyToReOffer()&&(T.debug("runSessionTimer() | sending session refresh request"),this._sessionTimers.refreshMethod===$.UPDATE?this._sendUpdate():this._sendReinvite())},s*500):this._sessionTimers.timer=setTimeout(()=>{this._status!==E.STATUS_TERMINATED&&(T.warn("runSessionTimer() | timer expired, terminating the session"),this.terminate({cause:$.causes.REQUEST_TIMEOUT,status_code:408,reason_phrase:"Session Timer Expired"}))},s*1100)}_toggleMuteAudio(s){let e=this._connection.getSenders().filter(l=>l.track&&l.track.kind==="audio");for(let l of e)l.track.enabled=!s}_toggleMuteVideo(s){let e=this._connection.getSenders().filter(l=>l.track&&l.track.kind==="video");for(let l of e)l.track.enabled=!s}_newRTCSession(s,e){T.debug("newRTCSession()"),this._ua.newRTCSession(this,{originator:s,session:this,request:e})}_connecting(s){T.debug("session connecting"),T.debug('emit "connecting"'),this.emit("connecting",{request:s})}_progress(s,e){T.debug("session progress"),T.debug('emit "progress"'),this.emit("progress",{originator:s,response:e||null})}_accepted(s,e){T.debug("session accepted"),this._start_time=new Date,T.debug('emit "accepted"'),this.emit("accepted",{originator:s,response:e||null})}_confirmed(s,e){T.debug("session confirmed"),this._is_confirmed=!0,T.debug('emit "confirmed"'),this.emit("confirmed",{originator:s,ack:e||null})}_ended(s,e,l){T.debug("session ended"),this._end_time=new Date,this._close(),T.debug('emit "ended"'),this.emit("ended",{originator:s,message:e||null,cause:l})}_failed(s,e,l){T.debug("session failed"),T.debug('emit "_failed"'),this.emit("_failed",{originator:s,message:e||null,cause:l}),this._close(),T.debug('emit "failed"'),this.emit("failed",{originator:s,message:e||null,cause:l})}_onhold(s){T.debug("session onhold"),this._setLocalMediaStatus(),T.debug('emit "hold"'),this.emit("hold",{originator:s})}_onunhold(s){T.debug("session onunhold"),this._setLocalMediaStatus(),T.debug('emit "unhold"'),this.emit("unhold",{originator:s})}_onmute({audio:s,video:e}){T.debug("session onmute"),this._setLocalMediaStatus(),T.debug('emit "muted"'),this.emit("muted",{audio:s,video:e})}_onunmute({audio:s,video:e}){T.debug("session onunmute"),this._setLocalMediaStatus(),T.debug('emit "unmuted"'),this.emit("unmuted",{audio:s,video:e})}}});var k7=Z((Fp,E7)=>{"use strict";var f9=_1().EventEmitter,u9=M1(),d9=w2(),He=x2(),q1=k2(),p9=u1(),h9=C1(),m9=g4(),g9=F0(),R2=new d9("Subscriber"),c2={SUBSCRIBE_RESPONSE_TIMEOUT:0,SUBSCRIBE_TRANSPORT_ERROR:1,SUBSCRIBE_NON_OK_RESPONSE:2,SUBSCRIBE_WRONG_OK_RESPONSE:3,SUBSCRIBE_AUTHENTICATION_FAILED:4,UNSUBSCRIBE_TIMEOUT:5,FINAL_NOTIFY_RECEIVED:6,WRONG_NOTIFY_RECEIVED:7,STATE_PENDING:0,STATE_ACTIVE:1,STATE_TERMINATED:2,STATE_INIT:3,STATE_WAITING_NOTIFY:4,DEFAULT_EXPIRES_SEC:900};E7.exports=class extends f9{static get C(){return c2}constructor(s,e,l,n,{expires:a,contentType:o,allowEvents:h,params:m,extraHeaders:v}){if(R2.debug("new"),super(),!e)throw new TypeError("Not enough arguments: Missing target");if(!l)throw new TypeError("Not enough arguments: Missing eventName");if(!n)throw new TypeError("Not enough arguments: Missing accept");let _=p9.parse(l,"Event");if(_===-1)throw new TypeError("Missing Event header field");this._ua=s,this._target=e,(!q1.isDecimal(a)||a<=0)&&(a=c2.DEFAULT_EXPIRES_SEC),this._expires=a,this._content_type=o,this._params=q1.cloneObject(m),this._params.from_uri||(this._params.from_uri=this._ua.configuration.uri),this._params.from_tag=q1.newTag(),this._params.to_tag=null,this._params.call_id=q1.createRandomToken(20),this._params.cseq===void 0&&(this._params.cseq=Math.floor(Math.random()*1e4+1)),this._state=c2.STATE_INIT,this._dialog=null,this._expires_timer=null,this._expires_timestamp=null,this._terminated=!1,this._event_name=_.event,this._event_id=_.params&&_.params.id;let u=this._event_name;if(this._event_id&&(u+=`;id=${this._event_id}`),this._headers=q1.cloneArray(v),this._headers=this._headers.concat([`Event: ${u}`,`Expires: ${this._expires}`,`Accept: ${n}`]),!this._headers.find(k=>k.startsWith("Contact"))){let k=`Contact: ${this._ua._contact.toString()}`;this._headers.push(k)}h&&this._headers.push(`Allow-Events: ${h}`),this._queue=[],this._data={}}get C(){return c2}get state(){return this._state}get id(){return this._dialog?this._dialog.id:null}get data(){return this._data}set data(s){this._data=s}onRequestTimeout(){this._terminateDialog(c2.SUBSCRIBE_RESPONSE_TIMEOUT)}onTransportError(){this._terminateDialog(c2.SUBSCRIBE_TRANSPORT_ERROR)}receiveRequest(s){if(s.method!==He.NOTIFY){R2.warn("received non-NOTIFY request"),s.reply(405);return}let e=s.parseHeader("Event");if(!e){R2.warn("missing Event header"),s.reply(400),this._terminateDialog(c2.WRONG_NOTIFY_RECEIVED);return}let l=e.event,n=e.params&&e.params.id;if(l!==this._event_name||n!==this._event_id){R2.warn("Event header does not match the one in SUBSCRIBE request"),s.reply(489),this._terminateDialog(c2.WRONG_NOTIFY_RECEIVED);return}let a=s.parseHeader("subscription-state");if(!a){R2.warn("missing Subscription-State header"),s.reply(400),this._terminateDialog(c2.WRONG_NOTIFY_RECEIVED);return}let o=this._parseSubscriptionState(a.state);if(o===void 0){R2.warn(`Invalid Subscription-State header value: ${a.state}`),s.reply(400),this._terminateDialog(c2.WRONG_NOTIFY_RECEIVED);return}s.reply(200);let h=this._state;if(h!==c2.STATE_TERMINATED&&o!==c2.STATE_TERMINATED&&(this._state=o,a.expires!==void 0)){let _=a.expires,u=new Date().getTime()+_*1e3;this._expires_timestamp-u>2e3&&(R2.debug("update sending re-SUBSCRIBE time"),this._scheduleSubscribe(_))}h!==c2.STATE_PENDING&&o===c2.STATE_PENDING?(R2.debug('emit "pending"'),this.emit("pending")):h!==c2.STATE_ACTIVE&&o===c2.STATE_ACTIVE&&(R2.debug('emit "active"'),this.emit("active"));let m=s.body,v=o===c2.STATE_TERMINATED;if(m){let _=s.getHeader("content-type");R2.debug('emit "notify"'),this.emit("notify",v,s,m,_)}if(v){let _=a.reason,u;a.params&&a.params["retry-after"]!==void 0&&(u=parseInt(a.params["retry-after"])),this._terminateDialog(c2.FINAL_NOTIFY_RECEIVED,_,u)}}subscribe(s=null){R2.debug("subscribe()"),this._state===c2.STATE_INIT?this._sendInitialSubscribe(s,this._headers):this._sendSubsequentSubscribe(s,this._headers)}terminate(s=null){if(R2.debug("terminate()"),this._state===c2.STATE_INIT)throw new u9.InvalidStateError(this._state);if(this._terminated)return;this._terminated=!0;let e=this._headers.map(l=>l.startsWith("Expires")?"Expires: 0":l);this._sendSubsequentSubscribe(s,e)}_terminateDialog(s,e=void 0,l=void 0){this._state!==c2.STATE_TERMINATED&&(this._state=c2.STATE_TERMINATED,clearTimeout(this._expires_timer),this._dialog&&(this._dialog.terminate(),this._dialog=null),R2.debug(`emit "terminated" code=${s}`),this.emit("terminated",s,e,l))}_sendInitialSubscribe(s,e){if(s){if(!this._content_type)throw new TypeError("content_type is undefined");e=q1.cloneArray(e),e.push(`Content-Type: ${this._content_type}`)}this._state=c2.STATE_WAITING_NOTIFY;let l=new h9.OutgoingRequest(He.SUBSCRIBE,this._ua.normalizeTarget(this._target),this._ua,this._params,e,s);new m9(this._ua,l,{onRequestTimeout:()=>{this.onRequestTimeout()},onTransportError:()=>{this.onTransportError()},onReceiveResponse:a=>{this._receiveSubscribeResponse(a)}}).send()}_sendSubsequentSubscribe(s,e){if(this._state!==c2.STATE_TERMINATED){if(!this._dialog){R2.debug("enqueue subscribe"),this._queue.push({body:s,headers:q1.cloneArray(e)});return}if(s){if(!this._content_type)throw new TypeError("content_type is undefined");e=q1.cloneArray(e),e.push(`Content-Type: ${this._content_type}`)}this._dialog.sendRequest(He.SUBSCRIBE,{body:s,extraHeaders:e,eventHandlers:{onRequestTimeout:()=>{this.onRequestTimeout()},onTransportError:()=>{this.onTransportError()},onSuccessResponse:l=>{this._receiveSubscribeResponse(l)},onErrorResponse:l=>{this._receiveSubscribeResponse(l)},onDialogError:l=>{this._receiveSubscribeResponse(l)}}})}}_receiveSubscribeResponse(s){if(this._state!==c2.STATE_TERMINATED)if(s.status_code>=200&&s.status_code<300){if(this._dialog===null){let n=new g9(this,s,"UAC");if(n.error){R2.warn(n.error),this._terminateDialog(c2.SUBSCRIBE_WRONG_OK_RESPONSE);return}this._dialog=n,R2.debug('emit "accepted"'),this.emit("accepted");for(let a of this._queue)R2.debug("dequeue subscribe"),this._sendSubsequentSubscribe(a.body,a.headers)}let e=s.getHeader("expires"),l=parseInt(e);(!q1.isDecimal(l)||l<=0)&&(R2.warn(`response without Expires header, setting a default value of ${c2.DEFAULT_EXPIRES_SEC}`),l=c2.DEFAULT_EXPIRES_SEC),l>0&&this._scheduleSubscribe(l)}else s.status_code===401||s.status_code===407?this._terminateDialog(c2.SUBSCRIBE_AUTHENTICATION_FAILED):s.status_code>=300&&this._terminateDialog(c2.SUBSCRIBE_NON_OK_RESPONSE)}_scheduleSubscribe(s){let e=s>=140?s*1e3/2+Math.floor((s/2-70)*1e3*Math.random()):s*1e3-5e3;this._expires_timestamp=new Date().getTime()+s*1e3,R2.debug(`next SUBSCRIBE will be sent in ${Math.floor(e/1e3)} sec`),clearTimeout(this._expires_timer),this._expires_timer=setTimeout(()=>{this._expires_timer=null,this._sendSubsequentSubscribe(null,this._headers)},e)}_parseSubscriptionState(s){switch(s){case"pending":return c2.STATE_PENDING;case"active":return c2.STATE_ACTIVE;case"terminated":return c2.STATE_TERMINATED;case"init":return c2.STATE_INIT;case"notify_wait":return c2.STATE_WAITING_NOTIFY;default:return}}}});var I7=Z((Hp,R7)=>{"use strict";var v9=_1().EventEmitter,Oe=M1(),z9=w2(),Be=x2(),B0=k2(),M9=F0(),d1=new z9("Notifier"),h2={NOTIFY_RESPONSE_TIMEOUT:0,NOTIFY_TRANSPORT_ERROR:1,NOTIFY_NON_OK_RESPONSE:2,NOTIFY_AUTHENTICATION_FAILED:3,FINAL_NOTIFY_SENT:4,UNSUBSCRIBE_RECEIVED:5,SUBSCRIPTION_EXPIRED:6,STATE_PENDING:0,STATE_ACTIVE:1,STATE_TERMINATED:2,DEFAULT_EXPIRES_SEC:900};R7.exports=class qe extends v9{static get C(){return h2}static init_incoming(s,e){try{qe.checkSubscribe(s)}catch(l){d1.warn("Notifier.init_incoming: invalid request. Error: ",l.message),s.reply(405);return}e()}static checkSubscribe(s){if(!s)throw new TypeError("Not enough arguments. Missing subscribe request");if(s.method!==Be.SUBSCRIBE)throw new TypeError("Invalid method for Subscribe request");if(!s.hasHeader("contact"))throw new TypeError("Missing Contact header in subscribe request");if(!s.hasHeader("event"))throw new TypeError("Missing Event header in subscribe request");let e=s.getHeader("expires");if(e){let l=parseInt(e);if(!B0.isDecimal(l)||l<0)throw new TypeError("Invalid Expires header field in subscribe request")}}constructor(s,e,l,{extraHeaders:n,allowEvents:a,pending:o,defaultExpires:h}){if(d1.debug("new"),super(),!l)throw new TypeError("Not enough arguments. Missing contentType");qe.checkSubscribe(e);let m=e.getHeader("event");this._ua=s,this._initial_subscribe=e,this._expires_timestamp=null,this._expires_timer=null,this._defaultExpires=h||h2.DEFAULT_EXPIRES_SEC,this._state=o?h2.STATE_PENDING:h2.STATE_ACTIVE,this._content_type=l,this._headers=B0.cloneArray(n),this._headers.push(`Event: ${m}`),this._contact=this._headers.find(v=>v.startsWith("Contact")),this._contact||(this._contact=`Contact: ${this._ua._contact.toString()}`,this._headers.push(this._contact)),a&&this._headers.push(`Allow-Events: ${a}`),this._target=e.from.uri.user,e.to_tag=B0.newTag(),this._data={}}get C(){return h2}get state(){return this._state}get id(){return this._dialog?this._dialog.id:null}get data(){return this._data}set data(s){this._data=s}receiveRequest(s){if(s.method!==Be.SUBSCRIBE){s.reply(405);return}this._setExpires(s),this._dialog||(this._dialog=new M9(this,s,"UAS")),s.reply(200,null,[`Expires: ${this._expires}`,`${this._contact}`]);let e=s.body,l=s.getHeader("content-type"),n=this._expires===0;n||this._setExpiresTimer(),d1.debug('emit "subscribe"'),this.emit("subscribe",n,s,e,l),n&&this._terminateDialog(h2.UNSUBSCRIBE_RECEIVED)}start(){if(d1.debug("start()"),this._state===h2.STATE_TERMINATED)throw new Oe.InvalidStateError(this._state);this.receiveRequest(this._initial_subscribe)}setActiveState(){if(d1.debug("setActiveState()"),this._state===h2.STATE_TERMINATED)throw new Oe.InvalidStateError(this._state);this._state===h2.STATE_PENDING&&(this._state=h2.STATE_ACTIVE)}notify(s=null){if(d1.debug("notify()"),this._state===h2.STATE_TERMINATED)throw new Oe.InvalidStateError(this._state);let e=Math.floor((this._expires_timestamp-new Date().getTime())/1e3);e<=0?(this._expires_timer||d1.error("expires timer is not set"),clearTimeout(this._expires_timer),this.terminate(s,"timeout")):this._sendNotify([`;expires=${e}`],s)}terminate(s=null,e=null,l=null){if(d1.debug("terminate()"),this._state===h2.STATE_TERMINATED)return;let n=[];e&&n.push(`;reason=${e}`),l!==null&&n.push(`;retry-after=${l}`),this._sendNotify(n,s,null,"terminated"),this._terminateDialog(e==="timeout"?h2.SUBSCRIPTION_EXPIRED:h2.FINAL_NOTIFY_SENT)}_terminateDialog(s){this._state!==h2.STATE_TERMINATED&&(this._state=h2.STATE_TERMINATED,clearTimeout(this._expires_timer),this._dialog&&(this._dialog.terminate(),this._dialog=null),d1.debug(`emit "terminated" code=${s}`),this.emit("terminated",s))}_setExpires(s){s.hasHeader("expires")?this._expires=parseInt(s.getHeader("expires")):(this._expires=this._defaultExpires,d1.debug(`missing Expires header field, default value set: ${this._expires}`))}_sendNotify(s,e=null,l=null,n=null){if(this._state===h2.STATE_TERMINATED){d1.warn("final notify already sent");return}let a=`Subscription-State: ${n||this._parseState()}`;for(let h of s)a+=h;let o=B0.cloneArray(this._headers);o.push(a),l&&(o=o.concat(l)),e&&o.push(`Content-Type: ${this._content_type}`),this._dialog.sendRequest(Be.NOTIFY,{body:e,extraHeaders:o,eventHandlers:{onRequestTimeout:()=>{this._terminateDialog(h2.NOTIFY_RESPONSE_TIMEOUT)},onTransportError:()=>{this._terminateDialog(h2.NOTIFY_TRANSPORT_ERROR)},onErrorResponse:h=>{h.status_code===401||h.status_code===407?this._terminateDialog(h2.NOTIFY_AUTHENTICATION_FAILED):this._terminateDialog(h2.NOTIFY_NON_OK_RESPONSE)},onDialogError:()=>{this._terminateDialog(h2.NOTIFY_NON_OK_RESPONSE)}}})}_setExpiresTimer(){this._expires_timestamp=new Date().getTime()+this._expires*1e3,clearTimeout(this._expires_timer),this._expires_timer=setTimeout(()=>{this._state!==h2.STATE_TERMINATED&&(d1.debug('emit "expired"'),this.emit("expired"),this.terminate(null,"timeout"))},this._expires*1e3)}_parseState(){switch(this._state){case h2.STATE_PENDING:return"pending";case h2.STATE_ACTIVE:return"active";case h2.STATE_TERMINATED:return"terminated";default:throw new TypeError("wrong state value")}}}});var $7=Z((Bp,D7)=>{"use strict";var _9=_1().EventEmitter,C9=w2(),Ge=x2(),L9=C1(),S3=k2(),x9=g4(),P7=M1(),b9=H1(),q0=new C9("Message");D7.exports=class extends _9{constructor(s){super(),this._ua=s,this._request=null,this._closed=!1,this._direction=null,this._local_identity=null,this._remote_identity=null,this._is_replied=!1,this._data={}}get direction(){return this._direction}get local_identity(){return this._local_identity}get remote_identity(){return this._remote_identity}send(s,e,l={}){let n=s;if(s===void 0||e===void 0)throw new TypeError("Not enough arguments");if(s=this._ua.normalizeTarget(s),!s)throw new TypeError(`Invalid target: ${n}`);let a=S3.cloneArray(l.extraHeaders),o=S3.cloneObject(l.eventHandlers),h=l.contentType||"text/plain",m={};l.fromUserName&&(m.from_uri=new b9("sip",l.fromUserName,this._ua.configuration.uri.host),a.push(`P-Preferred-Identity: ${this._ua.configuration.uri.toString()}`)),l.fromDisplayName&&(m.from_display_name=l.fromDisplayName);for(let _ in o)Object.prototype.hasOwnProperty.call(o,_)&&this.on(_,o[_]);a.push(`Content-Type: ${h}`),this._request=new L9.OutgoingRequest(Ge.MESSAGE,s,this._ua,m,a),e&&(this._request.body=e);let v=new x9(this._ua,this._request,{onRequestTimeout:()=>{this._onRequestTimeout()},onTransportError:()=>{this._onTransportError()},onReceiveResponse:_=>{this._receiveResponse(_)}});this._newMessage("local",this._request),v.send()}init_incoming(s){this._request=s,this._newMessage("remote",s),this._is_replied||(this._is_replied=!0,s.reply(200)),this._close()}accept(s={}){let e=S3.cloneArray(s.extraHeaders),l=s.body;if(this._direction!=="incoming")throw new P7.NotSupportedError('"accept" not supported for outgoing Message');if(this._is_replied)throw new Error("incoming Message already replied");this._is_replied=!0,this._request.reply(200,null,e,l)}reject(s={}){let e=s.status_code||480,l=s.reason_phrase,n=S3.cloneArray(s.extraHeaders),a=s.body;if(this._direction!=="incoming")throw new P7.NotSupportedError('"reject" not supported for outgoing Message');if(this._is_replied)throw new Error("incoming Message already replied");if(e<300||e>=700)throw new TypeError(`Invalid status_code: ${e}`);this._is_replied=!0,this._request.reply(e,l,n,a)}_receiveResponse(s){if(!this._closed)switch(!0){case/^1[0-9]{2}$/.test(s.status_code):break;case/^2[0-9]{2}$/.test(s.status_code):{this._succeeded("remote",s);break}default:{let e=S3.sipErrorCause(s.status_code);this._failed("remote",s,e);break}}}_onRequestTimeout(){this._closed||this._failed("system",null,Ge.causes.REQUEST_TIMEOUT)}_onTransportError(){this._closed||this._failed("system",null,Ge.causes.CONNECTION_ERROR)}_close(){this._closed=!0,this._ua.destroyMessage(this)}_newMessage(s,e){s==="remote"?(this._direction="incoming",this._local_identity=e.to,this._remote_identity=e.from):s==="local"&&(this._direction="outgoing",this._local_identity=e.from,this._remote_identity=e.to),this._ua.newMessage(this,{originator:s,message:this,request:e})}_failed(s,e,l){q0.debug("MESSAGE failed"),this._close(),q0.debug('emit "failed"'),this.emit("failed",{originator:s,response:e||null,cause:l})}_succeeded(s,e){q0.debug("MESSAGE succeeded"),this._close(),q0.debug('emit "succeeded"'),this.emit("succeeded",{originator:s,response:e})}}});var H7=Z((Gp,F7)=>{"use strict";var S9=_1().EventEmitter,w9=w2(),We=x2(),y9=C1(),w3=k2(),T9=g4(),U7=M1(),G0=new w9("Options");F7.exports=class extends S9{constructor(s){super(),this._ua=s,this._request=null,this._closed=!1,this._direction=null,this._local_identity=null,this._remote_identity=null,this._is_replied=!1,this._data={}}get direction(){return this._direction}get local_identity(){return this._local_identity}get remote_identity(){return this._remote_identity}send(s,e,l={}){let n=s;if(s===void 0)throw new TypeError("A target is required for OPTIONS");if(s=this._ua.normalizeTarget(s),!s)throw new TypeError(`Invalid target: ${n}`);let a=w3.cloneArray(l.extraHeaders),o=w3.cloneObject(l.eventHandlers),h=l.contentType||"application/sdp";for(let v in o)Object.prototype.hasOwnProperty.call(o,v)&&this.on(v,o[v]);a.push(`Content-Type: ${h}`),this._request=new y9.OutgoingRequest(We.OPTIONS,s,this._ua,null,a),e&&(this._request.body=e);let m=new T9(this._ua,this._request,{onRequestTimeout:()=>{this._onRequestTimeout()},onTransportError:()=>{this._onTransportError()},onReceiveResponse:v=>{this._receiveResponse(v)}});this._newOptions("local",this._request),m.send()}init_incoming(s){this._request=s,this._newOptions("remote",s),this._is_replied||(this._is_replied=!0,s.reply(200)),this._close()}accept(s={}){let e=w3.cloneArray(s.extraHeaders),l=s.body;if(this._direction!=="incoming")throw new U7.NotSupportedError('"accept" not supported for outgoing Options');if(this._is_replied)throw new Error("incoming Options already replied");this._is_replied=!0,this._request.reply(200,null,e,l)}reject(s={}){let e=s.status_code||480,l=s.reason_phrase,n=w3.cloneArray(s.extraHeaders),a=s.body;if(this._direction!=="incoming")throw new U7.NotSupportedError('"reject" not supported for outgoing Options');if(this._is_replied)throw new Error("incoming Options already replied");if(e<300||e>=700)throw new TypeError(`Invalid status_code: ${e}`);this._is_replied=!0,this._request.reply(e,l,n,a)}_receiveResponse(s){if(!this._closed)switch(!0){case/^1[0-9]{2}$/.test(s.status_code):break;case/^2[0-9]{2}$/.test(s.status_code):{this._succeeded("remote",s);break}default:{let e=w3.sipErrorCause(s.status_code);this._failed("remote",s,e);break}}}_onRequestTimeout(){this._closed||this._failed("system",null,We.causes.REQUEST_TIMEOUT)}_onTransportError(){this._closed||this._failed("system",null,We.causes.CONNECTION_ERROR)}_close(){this._closed=!0,this._ua.destroyMessage(this)}_newOptions(s,e){s==="remote"?(this._direction="incoming",this._local_identity=e.to,this._remote_identity=e.from):s==="local"&&(this._direction="outgoing",this._local_identity=e.from,this._remote_identity=e.to),this._ua.newOptions(this,{originator:s,message:this,request:e})}_failed(s,e,l){G0.debug("OPTIONS failed"),this._close(),G0.debug('emit "failed"'),this.emit("failed",{originator:s,response:e||null,cause:l})}_succeeded(s,e){G0.debug("OPTIONS succeeded"),this._close(),G0.debug('emit "succeeded"'),this.emit("succeeded",{originator:s,response:e})}}});var je=Z(O7=>{"use strict";var N9=w2(),Ve=k2(),A9=u1(),y3=new N9("Socket");O7.isSocket=r=>{if(Array.isArray(r))return!1;if(typeof r>"u")return y3.warn("undefined JsSIP.Socket instance"),!1;try{if(!Ve.isString(r.url))throw y3.warn("missing or invalid JsSIP.Socket url property"),new Error("Missing or invalid JsSIP.Socket url property");if(!Ve.isString(r.via_transport))throw y3.warn("missing or invalid JsSIP.Socket via_transport property"),new Error("Missing or invalid JsSIP.Socket via_transport property");if(A9.parse(r.sip_uri,"SIP_URI")===-1)throw y3.warn("missing or invalid JsSIP.Socket sip_uri property"),new Error("missing or invalid JsSIP.Socket sip_uri property")}catch{return!1}try{["connect","disconnect","send"].forEach(s=>{if(!Ve.isFunction(r[s]))throw y3.warn(`missing or invalid JsSIP.Socket method: ${s}`),new Error(`Missing or invalid JsSIP.Socket method: ${s}`)})}catch{return!1}return!0}});var G7=Z((jp,q7)=>{"use strict";var E9=w2(),k9=je(),B7=x2(),q2=new E9("Transport"),p1={STATUS_CONNECTED:0,STATUS_CONNECTING:1,STATUS_DISCONNECTED:2,SOCKET_STATUS_READY:0,SOCKET_STATUS_ERROR:1,recovery_options:{min_interval:B7.CONNECTION_RECOVERY_MIN_INTERVAL,max_interval:B7.CONNECTION_RECOVERY_MAX_INTERVAL}};q7.exports=class{constructor(s,e=p1.recovery_options){q2.debug("new()"),this.status=p1.STATUS_DISCONNECTED,this.socket=null,this.sockets=[],this.recovery_options=e,this.recover_attempts=0,this.recovery_timer=null,this.close_requested=!1;try{this.textDecoder=new TextDecoder("utf8")}catch(l){q2.warn(`cannot use TextDecoder: ${l}`)}if(typeof s>"u")throw new TypeError("Invalid argument. undefined 'sockets' argument");s instanceof Array||(s=[s]),s.forEach(function(l){if(!k9.isSocket(l.socket))throw new TypeError("Invalid argument. invalid 'JsSIP.Socket' instance");if(l.weight&&!Number(l.weight))throw new TypeError("Invalid argument. 'weight' attribute is not a number");this.sockets.push({socket:l.socket,weight:l.weight||0,status:p1.SOCKET_STATUS_READY})},this),this._getSocket()}get via_transport(){return this.socket.via_transport}get url(){return this.socket.url}get sip_uri(){return this.socket.sip_uri}connect(){if(q2.debug("connect()"),this.isConnected()){q2.debug("Transport is already connected");return}else if(this.isConnecting()){q2.debug("Transport is connecting");return}this.close_requested=!1,this.status=p1.STATUS_CONNECTING,this.onconnecting({socket:this.socket,attempts:this.recover_attempts}),this.close_requested||(this.socket.onconnect=this._onConnect.bind(this),this.socket.ondisconnect=this._onDisconnect.bind(this),this.socket.ondata=this._onData.bind(this),this.socket.connect())}disconnect(){q2.debug("close()"),this.close_requested=!0,this.recover_attempts=0,this.status=p1.STATUS_DISCONNECTED,this.recovery_timer!==null&&(clearTimeout(this.recovery_timer),this.recovery_timer=null),this.socket.onconnect=()=>{},this.socket.ondisconnect=()=>{},this.socket.ondata=()=>{},this.socket.disconnect(),this.ondisconnect({socket:this.socket,error:!1})}send(s){if(q2.debug("send()"),!this.isConnected())return q2.warn("unable to send message, transport is not connected"),!1;let e=s.toString();return q2.debug(`sending message:

${e}
`),this.socket.send(e)}isConnected(){return this.status===p1.STATUS_CONNECTED}isConnecting(){return this.status===p1.STATUS_CONNECTING}_reconnect(){this.recover_attempts+=1;let s=Math.floor(Math.random()*Math.pow(2,this.recover_attempts)+1);s<this.recovery_options.min_interval?s=this.recovery_options.min_interval:s>this.recovery_options.max_interval&&(s=this.recovery_options.max_interval),q2.debug(`reconnection attempt: ${this.recover_attempts}. next connection attempt in ${s} seconds`),this.recovery_timer=setTimeout(()=>{!this.close_requested&&!(this.isConnected()||this.isConnecting())&&(this._getSocket(),this.connect())},s*1e3)}_getSocket(){let s=[];if(this.sockets.forEach(l=>{l.status!==p1.SOCKET_STATUS_ERROR&&(s.length===0?s.push(l):l.weight>s[0].weight?s=[l]:l.weight===s[0].weight&&s.push(l))}),s.length===0){this.sockets.forEach(l=>{l.status=p1.SOCKET_STATUS_READY}),this._getSocket();return}let e=Math.floor(Math.random()*s.length);this.socket=s[e].socket}_onConnect(){this.recover_attempts=0,this.status=p1.STATUS_CONNECTED,this.recovery_timer!==null&&(clearTimeout(this.recovery_timer),this.recovery_timer=null),this.onconnect({socket:this})}_onDisconnect(s,e,l){this.status=p1.STATUS_DISCONNECTED,this.ondisconnect({socket:this.socket,error:s,code:e,reason:l}),!this.close_requested&&(this.sockets.forEach(function(n){this.socket===n.socket&&(n.status=p1.SOCKET_STATUS_ERROR)},this),this._reconnect(s))}_onData(s){if(s===`\r
\r
`){q2.debug("received message with double-CRLF Keep Alive request");try{this.socket.send(`\r
`)}catch(e){q2.warn(`error sending Keep Alive response: ${e}`)}return}if(s===`\r
`){q2.debug("received message with CRLF Keep Alive response");return}else if(typeof s!="string"){try{this.textDecoder?s=this.textDecoder.decode(s):s=String.fromCharCode.apply(null,new Uint8Array(s))}catch(e){q2.debug(`received binary message failed to be converted into string: ${e}`);return}q2.debug(`received binary message:

${s}
`)}else q2.debug(`received text message:

${s}
`);this.ondata({transport:this,message:s})}}});var V7=Z(W7=>{"use strict";var R9=w2(),Ke=u1(),Ye=C1(),W0=new R9("Parser");W7.parseMessage=(r,s)=>{let e,l,n=r.indexOf(`\r
`);if(n===-1){W0.warn("parseMessage() | no CRLF found, not a SIP message");return}let a=r.substring(0,n),o=Ke.parse(a,"Request_Response");if(o===-1){W0.warn(`parseMessage() | error parsing first line of SIP message: "${a}"`);return}else o.status_code?(e=new Ye.IncomingResponse,e.status_code=o.status_code,e.reason_phrase=o.reason_phrase):(e=new Ye.IncomingRequest(s),e.method=o.method,e.ruri=o.uri);e.data=r;let h=n+2;for(;;){if(n=I9(r,h),n===-2){l=h+2;break}else if(n===-1){W0.warn("parseMessage() | malformed message");return}if(o=P9(e,r,h,n),o!==!0){W0.warn("parseMessage() |",o.error);return}h=n+2}if(e.hasHeader("content-length")){let m=e.getHeader("content-length");e.body=r.substr(l,m)}else e.body=r.substring(l);return e};function I9(r,s){let e=s,l=0,n=0;if(r.substring(e,e+2).match(/(^\r\n)/))return-2;for(;l===0;){if(n=r.indexOf(`\r
`,e),n===-1)return n;!r.substring(n+2,n+4).match(/(^\r\n)/)&&r.charAt(n+2).match(/(^\s+)/)?e=n+2:l=n}return l}function P9(r,s,e,l){let n,a=s.indexOf(":",e),o=s.substring(e,a).trim(),h=s.substring(a+1,l).trim();switch(o.toLowerCase()){case"via":case"v":{r.addHeader("via",h),r.getHeaders("via").length===1?(n=r.parseHeader("Via"),n&&(r.via=n,r.via_branch=n.branch)):n=0;break}case"from":case"f":{r.setHeader("from",h),n=r.parseHeader("from"),n&&(r.from=n,r.from_tag=n.getParam("tag"));break}case"to":case"t":{r.setHeader("to",h),n=r.parseHeader("to"),n&&(r.to=n,r.to_tag=n.getParam("tag"));break}case"record-route":{if(n=Ke.parse(h,"Record_Route"),n===-1)n=void 0;else for(let m of n)r.addHeader("record-route",h.substring(m.possition,m.offset)),r.headers["Record-Route"][r.getHeaders("record-route").length-1].parsed=m.parsed;break}case"call-id":case"i":{r.setHeader("call-id",h),n=r.parseHeader("call-id"),n&&(r.call_id=h);break}case"contact":case"m":{if(n=Ke.parse(h,"Contact"),n===-1)n=void 0;else for(let m of n)r.addHeader("contact",h.substring(m.possition,m.offset)),r.headers.Contact[r.getHeaders("contact").length-1].parsed=m.parsed;break}case"content-length":case"l":{r.setHeader("content-length",h),n=r.parseHeader("content-length");break}case"content-type":case"c":{r.setHeader("content-type",h),n=r.parseHeader("content-type");break}case"cseq":{r.setHeader("cseq",h),n=r.parseHeader("cseq"),n&&(r.cseq=n.value),r instanceof Ye.IncomingResponse&&(r.method=n.method);break}case"max-forwards":{r.setHeader("max-forwards",h),n=r.parseHeader("max-forwards");break}case"www-authenticate":{r.setHeader("www-authenticate",h),n=r.parseHeader("www-authenticate");break}case"proxy-authenticate":{r.setHeader("proxy-authenticate",h),n=r.parseHeader("proxy-authenticate");break}case"session-expires":case"x":{r.setHeader("session-expires",h),n=r.parseHeader("session-expires"),n&&(r.session_expires=n.expires,r.session_expires_refresher=n.refresher);break}case"refer-to":case"r":{r.setHeader("refer-to",h),n=r.parseHeader("refer-to"),n&&(r.refer_to=n);break}case"replaces":{r.setHeader("replaces",h),n=r.parseHeader("replaces"),n&&(r.replaces=n);break}case"event":case"o":{r.setHeader("event",h),n=r.parseHeader("event"),n&&(r.event=n);break}default:r.addHeader(o,h),n=0}return n===void 0?{error:`error parsing header "${o}"`}:!0}});var J7=Z((Yp,X7)=>{"use strict";var D9=w2(),K7=x2(),j7=C1(),Xe=k2(),Je=new D9("sanityCheck"),$9=[V9],U9=[H9,O9,B9,q9],F9=[G9,W9],m2,A1,Y7;X7.exports=(r,s,e)=>{m2=r,A1=s,Y7=e;for(let l of $9)if(l()===!1)return!1;if(m2 instanceof j7.IncomingRequest){for(let l of U9)if(l()===!1)return!1}else if(m2 instanceof j7.IncomingResponse){for(let l of F9)if(l()===!1)return!1}return!0};function H9(){if(m2.s("to").uri.scheme!=="sip")return T3(416),!1}function O9(){if(!m2.to_tag&&m2.call_id.substr(0,5)===A1.configuration.jssip_id)return T3(482),!1}function B9(){let r=Xe.str_utf8_length(m2.body),s=m2.getHeader("content-length");if(r<s)return T3(400),!1}function q9(){let r=m2.from_tag,s=m2.call_id,e=m2.cseq,l;if(!m2.to_tag)if(m2.method===K7.INVITE){if(A1._transactions.ist[m2.via_branch])return!1;for(let n in A1._transactions.ist)if(Object.prototype.hasOwnProperty.call(A1._transactions.ist,n)&&(l=A1._transactions.ist[n],l.request.from_tag===r&&l.request.call_id===s&&l.request.cseq===e))return T3(482),!1}else{if(A1._transactions.nist[m2.via_branch])return!1;for(let n in A1._transactions.nist)if(Object.prototype.hasOwnProperty.call(A1._transactions.nist,n)&&(l=A1._transactions.nist[n],l.request.from_tag===r&&l.request.call_id===s&&l.request.cseq===e))return T3(482),!1}}function G9(){if(m2.getHeaders("via").length>1)return Je.debug("more than one Via header field present in the response, dropping the response"),!1}function W9(){let r=Xe.str_utf8_length(m2.body),s=m2.getHeader("content-length");if(r<s)return Je.debug("message body length is lower than the value in Content-Length header field, dropping the response"),!1}function V9(){let r=["from","to","call_id","cseq","via"];for(let s of r)if(!m2.hasHeader(s))return Je.debug(`missing mandatory header field : ${s}, dropping the response`),!1}function T3(r){let s=m2.getHeaders("via"),e,l=`SIP/2.0 ${r} ${K7.REASON_PHRASE[r]}\r
`;for(let n of s)l+=`Via: ${n}\r
`;e=m2.getHeader("To"),m2.to_tag||(e+=`;tag=${Xe.newTag()}`),l+=`To: ${e}\r
`,l+=`From: ${m2.getHeader("From")}\r
`,l+=`Call-ID: ${m2.call_id}\r
`,l+=`CSeq: ${m2.cseq} ${m2.method}\r
`,l+=`\r
`,Y7.send(l)}});var Z7=Z(a8=>{"use strict";var W4=k2(),_4=x2(),Qe=u1(),Q7=H1(),Ze=je(),e8=M1();a8.settings={authorization_user:null,password:null,realm:null,ha1:null,authorization_jwt:null,display_name:null,uri:null,contact_uri:null,instance_id:null,use_preloaded_route:!1,session_timers:!0,session_timers_refresh_method:_4.UPDATE,session_timers_force_refresher:!1,no_answer_timeout:60,register:!0,register_expires:600,register_from_tag_trail:"",registrar_server:null,sockets:null,connection_recovery_max_interval:_4.CONNECTION_RECOVERY_MAX_INTERVAL,connection_recovery_min_interval:_4.CONNECTION_RECOVERY_MIN_INTERVAL,extra_headers:null,via_host:`${W4.createRandomToken(12)}.invalid`};var V0={mandatory:{sockets(r){let s=[];if(Ze.isSocket(r))s.push({socket:r});else if(Array.isArray(r)&&r.length)for(let e of r)Object.prototype.hasOwnProperty.call(e,"socket")&&Ze.isSocket(e.socket)?s.push(e):Ze.isSocket(e)&&s.push({socket:e});else return;return s},uri(r){/^sip:/i.test(r)||(r=`${_4.SIP}:${r}`);let s=Q7.parse(r);if(s)return s.user?s:void 0}},optional:{authorization_user(r){if(Qe.parse(`"${r}"`,"quoted_string")!==-1)return r},authorization_jwt(r){if(typeof r=="string")return r},user_agent(r){if(typeof r=="string")return r},connection_recovery_max_interval(r){if(W4.isDecimal(r)){let s=Number(r);if(s>0)return s}},connection_recovery_min_interval(r){if(W4.isDecimal(r)){let s=Number(r);if(s>0)return s}},contact_uri(r){if(typeof r=="string"){let s=Qe.parse(r,"SIP_URI");if(s!==-1)return s}},display_name(r){return r},instance_id(r){if(/^uuid:/i.test(r)&&(r=r.substr(5)),Qe.parse(r,"uuid")!==-1)return r},no_answer_timeout(r){if(W4.isDecimal(r)){let s=Number(r);if(s>0)return s}},session_timers(r){if(typeof r=="boolean")return r},session_timers_refresh_method(r){if(typeof r=="string"&&(r=r.toUpperCase(),r===_4.INVITE||r===_4.UPDATE))return r},session_timers_force_refresher(r){if(typeof r=="boolean")return r},password(r){return String(r)},realm(r){return String(r)},ha1(r){return String(r)},register(r){if(typeof r=="boolean")return r},register_expires(r){if(W4.isDecimal(r)){let s=Number(r);if(s>=0)return s}},register_from_tag_trail(r){return typeof r=="function"?r:String(r)},registrar_server(r){/^sip:/i.test(r)||(r=`${_4.SIP}:${r}`);let s=Q7.parse(r);if(s)return s.user?void 0:s},use_preloaded_route(r){if(typeof r=="boolean")return r},extra_headers(r){let s=[];if(Array.isArray(r)&&r.length)for(let e of r)typeof e=="string"&&s.push(e);else return;return s}}};a8.load=(r,s)=>{for(let e in V0.mandatory)if(s.hasOwnProperty(e)){let l=s[e],n=V0.mandatory[e](l);if(n!==void 0)r[e]=n;else throw new e8.ConfigurationError(e,l)}else throw new e8.ConfigurationError(e);for(let e in V0.optional)if(s.hasOwnProperty(e)){let l=s[e];if(W4.isEmpty(l))continue;let n=V0.optional[e](l);if(n!==void 0)r[e]=n;else throw new e8.ConfigurationError(e,l)}}});var tt=Z((Qp,lt)=>{"use strict";var j9=_1().EventEmitter,K9=w2(),I2=x2(),Y9=f7(),et=Fe(),X9=k7(),at=I7(),st=$7(),ct=H7(),s8=q4(),J9=G7(),j0=k2(),Q9=M1(),Z9=H1(),eo=V7(),c8=C1(),ao=J7(),l8=Z7(),o2=new K9("UA"),H2={STATUS_INIT:0,STATUS_READY:1,STATUS_USER_CLOSED:2,STATUS_NOT_READY:3,CONFIGURATION_ERROR:1,NETWORK_ERROR:2};lt.exports=class extends j9{static get C(){return H2}constructor(s){if(!s)throw new TypeError("Not enough arguments");let e=["password","ha1","authorization_jwt"];o2.debug("new() [configuration:%o]",Object.entries(s).filter(([l])=>!e.includes(l))),super(),this._cache={credentials:{}},this._configuration=Object.assign({},l8.settings),this._dynConfiguration={},this._dialogs={},this._applicants={},this._sessions={},this._transport=null,this._contact=null,this._status=H2.STATUS_INIT,this._error=null,this._transactions={nist:{},nict:{},ist:{},ict:{}},this._data={},this._closeTimer=null;try{this._loadConfig(s)}catch(l){throw this._status=H2.STATUS_NOT_READY,this._error=H2.CONFIGURATION_ERROR,l}this._registrator=new Y9(this)}get C(){return H2}get status(){return this._status}get contact(){return this._contact}get configuration(){return this._configuration}get transport(){return this._transport}start(){o2.debug("start()"),this._status===H2.STATUS_INIT?this._transport.connect():this._status===H2.STATUS_USER_CLOSED?(o2.debug("restarting UA"),this._closeTimer!==null&&(clearTimeout(this._closeTimer),this._closeTimer=null,this._transport.disconnect()),this._status=H2.STATUS_INIT,this._transport.connect()):this._status===H2.STATUS_READY?o2.debug("UA is in READY status, not restarted"):o2.debug("ERROR: connection is down, Auto-Recovery system is trying to reconnect"),this._dynConfiguration.register=this._configuration.register}register(){o2.debug("register()"),this._dynConfiguration.register=!0,this._registrator.register()}unregister(s){o2.debug("unregister()"),this._dynConfiguration.register=!1,this._registrator.unregister(s)}registrator(){return this._registrator}isRegistered(){return this._registrator.registered}isConnected(){return this._transport.isConnected()}call(s,e){o2.debug("call()");let l=new et(this);return l.connect(s,e),l}sendMessage(s,e,l){o2.debug("sendMessage()");let n=new st(this);return n.send(s,e,l),n}subscribe(s,e,l,n){return o2.debug("subscribe()"),new X9(this,s,e,l,n)}notify(s,e,l){return o2.debug("notify()"),new at(this,s,e,l)}sendOptions(s,e,l){o2.debug("sendOptions()");let n=new ct(this);return n.send(s,e,l),n}terminateSessions(s){o2.debug("terminateSessions()");for(let e in this._sessions)this._sessions[e].isEnded()||this._sessions[e].terminate(s)}stop(){if(o2.debug("stop()"),this._dynConfiguration={},this._status===H2.STATUS_USER_CLOSED){o2.debug("UA already closed");return}this._registrator.close();let s=Object.keys(this._sessions).length;for(let l in this._sessions)if(Object.prototype.hasOwnProperty.call(this._sessions,l)){o2.debug(`closing session ${l}`);try{this._sessions[l].terminate()}catch{}}for(let l in this._applicants)if(Object.prototype.hasOwnProperty.call(this._applicants,l))try{this._applicants[l].close()}catch{}this._status=H2.STATUS_USER_CLOSED,Object.keys(this._transactions.nict).length+Object.keys(this._transactions.nist).length+Object.keys(this._transactions.ict).length+Object.keys(this._transactions.ist).length===0&&s===0?this._transport.disconnect():this._closeTimer=setTimeout(()=>{this._closeTimer=null,this._transport.disconnect()},2e3)}normalizeTarget(s){return j0.normalizeTarget(s,this._configuration.hostport_params)}get(s){switch(s){case"authorization_user":return this._configuration.authorization_user;case"realm":return this._configuration.realm;case"ha1":return this._configuration.ha1;case"authorization_jwt":return this._configuration.authorization_jwt;default:{o2.warn('get() | cannot get "%s" parameter in runtime',s);return}}}set(s,e){switch(s){case"authorization_user":{this._configuration.authorization_user=String(e);break}case"password":{this._configuration.password=String(e);break}case"realm":{this._configuration.realm=String(e);break}case"ha1":{this._configuration.ha1=String(e),this._configuration.password=null;break}case"authorization_jwt":{this._configuration.authorization_jwt=String(e);break}case"display_name":{this._configuration.display_name=e;break}case"extra_headers":{this._configuration.extra_headers=e;break}default:return o2.warn('set() | cannot set "%s" parameter in runtime',s),!1}return!0}newTransaction(s){this._transactions[s.type][s.id]=s,this.emit("newTransaction",{transaction:s})}destroyTransaction(s){delete this._transactions[s.type][s.id],this.emit("transactionDestroyed",{transaction:s})}newDialog(s){this._dialogs[s.id]=s}destroyDialog(s){delete this._dialogs[s.id]}newMessage(s,e){this._applicants[s]=s,this.emit("newMessage",e)}newOptions(s,e){this._applicants[s]=s,this.emit("newOptions",e)}destroyMessage(s){delete this._applicants[s]}newRTCSession(s,e){this._sessions[s.id]=s,this.emit("newRTCSession",e)}destroyRTCSession(s){delete this._sessions[s.id]}registered(s){this.emit("registered",s)}unregistered(s){this.emit("unregistered",s)}registrationFailed(s){this.emit("registrationFailed",s)}receiveRequest(s){let e=s.method;if(s.ruri.user!==this._configuration.uri.user&&s.ruri.user!==this._contact.uri.user){o2.debug("Request-URI does not point to us"),s.method!==I2.ACK&&s.reply_sl(404);return}if(s.ruri.scheme===I2.SIPS){s.reply_sl(416);return}if(s8.checkTransaction(this,s))return;if(e===I2.INVITE?new s8.InviteServerTransaction(this,this._transport,s):e!==I2.ACK&&e!==I2.CANCEL&&new s8.NonInviteServerTransaction(this,this._transport,s),e===I2.OPTIONS){if(this.listeners("newOptions").length===0){s.reply(200);return}new ct(this).init_incoming(s)}else if(e===I2.MESSAGE){if(this.listeners("newMessage").length===0){s.reply(405);return}new st(this).init_incoming(s)}else if(e===I2.SUBSCRIBE){if(this.listeners("newSubscribe").length===0){s.reply(405);return}}else if(e===I2.INVITE&&!s.to_tag&&this.listeners("newRTCSession").length===0){s.reply(405);return}let l,n;if(s.to_tag)l=this._findDialog(s.call_id,s.from_tag,s.to_tag),l?l.receiveRequest(s):e===I2.NOTIFY?(n=this._findSession(s),n?n.receiveRequest(s):(o2.debug("received NOTIFY request for a non existent subscription"),s.reply(481,"Subscription does not exist"))):e!==I2.ACK&&s.reply(481);else switch(e){case I2.INVITE:{if(window.RTCPeerConnection)if(s.hasHeader("replaces")){let a=s.replaces;l=this._findDialog(a.call_id,a.from_tag,a.to_tag),l?(n=l.owner,n.isEnded()?s.reply(603):n.receiveRequest(s)):s.reply(481)}else n=new et(this),n.init_incoming(s);else o2.warn("INVITE received but WebRTC is not supported"),s.reply(488);break}case I2.BYE:{s.reply(481);break}case I2.CANCEL:{n=this._findSession(s),n?n.receiveRequest(s):o2.debug("received CANCEL request for a non existent session");break}case I2.ACK:break;case I2.NOTIFY:{this.emit("sipEvent",{event:s.event,request:s}),s.reply(200);break}case I2.SUBSCRIBE:{at.init_incoming(s,()=>{this.emit("newSubscribe",{event:s.event,request:s})});break}default:{s.reply(405);break}}}_findSession({call_id:s,from_tag:e,to_tag:l}){let n=s+e,a=this._sessions[n],o=s+l,h=this._sessions[o];return a||h||null}_findDialog(s,e,l){let n=s+e+l,a=this._dialogs[n];return a||(n=s+l+e,a=this._dialogs[n],a||null)}_loadConfig(s){l8.load(this._configuration,s),this._configuration.display_name===0&&(this._configuration.display_name="0"),this._configuration.instance_id||(this._configuration.instance_id=j0.newUUID()),this._configuration.jssip_id=j0.createRandomToken(5);let e=this._configuration.uri.clone();e.user=null,this._configuration.hostport_params=e.toString().replace(/^sip:/i,"");try{this._transport=new J9(this._configuration.sockets,{max_interval:this._configuration.connection_recovery_max_interval,min_interval:this._configuration.connection_recovery_min_interval}),this._transport.onconnecting=so.bind(this),this._transport.onconnect=co.bind(this),this._transport.ondisconnect=lo.bind(this),this._transport.ondata=to.bind(this)}catch(n){throw o2.warn(n),new Q9.ConfigurationError("sockets",this._configuration.sockets)}if(delete this._configuration.sockets,this._configuration.authorization_user||(this._configuration.authorization_user=this._configuration.uri.user),!this._configuration.registrar_server){let n=this._configuration.uri.clone();n.user=null,n.clearParams(),n.clearHeaders(),this._configuration.registrar_server=n}this._configuration.no_answer_timeout*=1e3,this._configuration.contact_uri?this._configuration.via_host=this._configuration.contact_uri.host:this._configuration.contact_uri=new Z9("sip",j0.createRandomToken(8),this._configuration.via_host,null,{transport:"ws"}),this._contact={pub_gruu:null,temp_gruu:null,uri:this._configuration.contact_uri,toString(n={}){let a=n.anonymous||null,o=n.outbound||null,h="<";return a?h+=this.temp_gruu||"sip:anonymous@anonymous.invalid;transport=ws":h+=this.pub_gruu||this.uri.toString(),o&&(a?!this.temp_gruu:!this.pub_gruu)&&(h+=";ob"),h+=">",h}};let l=["authorization_user","password","realm","ha1","authorization_jwt","display_name","register","extra_headers"];for(let n in this._configuration)Object.prototype.hasOwnProperty.call(this._configuration,n)&&(l.indexOf(n)!==-1?Object.defineProperty(this._configuration,n,{writable:!0,configurable:!1}):Object.defineProperty(this._configuration,n,{writable:!1,configurable:!1}));o2.debug("configuration parameters after validation:");for(let n in this._configuration)if(Object.prototype.hasOwnProperty.call(l8.settings,n))switch(n){case"uri":case"registrar_server":{o2.debug(`- ${n}: ${this._configuration[n]}`);break}case"password":case"ha1":case"authorization_jwt":{o2.debug(`- ${n}: NOT SHOWN`);break}default:o2.debug(`- ${n}: ${JSON.stringify(this._configuration[n])}`)}}};function so(r){this.emit("connecting",r)}function co(r){this._status!==H2.STATUS_USER_CLOSED&&(this._status=H2.STATUS_READY,this._error=null,this.emit("connected",r),this._dynConfiguration.register&&this._registrator.register())}function lo(r){let s=["nict","ict","nist","ist"];for(let e of s)for(let l in this._transactions[e])Object.prototype.hasOwnProperty.call(this._transactions[e],l)&&this._transactions[e][l].onTransportError();this.emit("disconnected",r),this._registrator.onTransportClosed(),this._status!==H2.STATUS_USER_CLOSED&&(this._status=H2.STATUS_NOT_READY,this._error=H2.NETWORK_ERROR)}function to(r){let s=r.transport,e=r.message;if(e=eo.parseMessage(e,this),!!e&&!(this._status===H2.STATUS_USER_CLOSED&&e instanceof c8.IncomingRequest)&&ao(e,this,s)){if(e instanceof c8.IncomingRequest)e.transport=s,this.receiveRequest(e);else if(e instanceof c8.IncomingResponse){let l;switch(e.method){case I2.INVITE:{l=this._transactions.ict[e.via_branch],l&&l.receiveResponse(e);break}case I2.ACK:break;default:{l=this._transactions.nict[e.via_branch],l&&l.receiveResponse(e);break}}}}}});var it=Z((eh,rt)=>{"use strict";var ro=w2(),io=u1(),j2=new ro("WebSocketInterface");rt.exports=class{constructor(s){j2.debug('new() [url:"%s"]',s),this._url=s,this._sip_uri=null,this._via_transport=null,this._ws=null;let e=io.parse(s,"absoluteURI");if(e===-1)throw j2.warn(`invalid WebSocket URI: ${s}`),new TypeError(`Invalid argument: ${s}`);if(e.scheme!=="wss"&&e.scheme!=="ws")throw j2.warn(`invalid WebSocket URI scheme: ${e.scheme}`),new TypeError(`Invalid argument: ${s}`);this._sip_uri=`sip:${e.host}${e.port?`:${e.port}`:""};transport=ws`,this._via_transport=e.scheme.toUpperCase()}get via_transport(){return this._via_transport}set via_transport(s){this._via_transport=s.toUpperCase()}get sip_uri(){return this._sip_uri}get url(){return this._url}connect(){if(j2.debug("connect()"),this.isConnected()){j2.debug(`WebSocket ${this._url} is already connected`);return}else if(this.isConnecting()){j2.debug(`WebSocket ${this._url} is connecting`);return}this._ws&&this.disconnect(),j2.debug(`connecting to WebSocket ${this._url}`);try{this._ws=new WebSocket(this._url,"sip"),this._ws.binaryType="arraybuffer",this._ws.onopen=this._onOpen.bind(this),this._ws.onclose=this._onClose.bind(this),this._ws.onmessage=this._onMessage.bind(this),this._ws.onerror=this._onError.bind(this)}catch(s){this._onError(s)}}disconnect(){j2.debug("disconnect()"),this._ws&&(this._ws.onopen=()=>{},this._ws.onclose=()=>{},this._ws.onmessage=()=>{},this._ws.onerror=()=>{},this._ws.close(),this._ws=null)}send(s){return j2.debug("send()"),this.isConnected()?(this._ws.send(s),!0):(j2.warn("unable to send message, WebSocket is not open"),!1)}isConnected(){return this._ws&&this._ws.readyState===this._ws.OPEN}isConnecting(){return this._ws&&this._ws.readyState===this._ws.CONNECTING}_onOpen(){j2.debug(`WebSocket ${this._url} connected`),this.onconnect()}_onClose({wasClean:s,code:e,reason:l}){j2.debug(`WebSocket ${this._url} closed`),s===!1&&j2.debug("WebSocket abrupt disconnection"),this.ondisconnect(!s,e,l)}_onMessage({data:s}){j2.debug("received WebSocket message"),this.ondata(s)}_onError(s){j2.warn(`WebSocket ${this._url} error: `,s)}}});var ot=Z((ah,nt)=>{"use strict";var t8=de(),no=x2(),oo=M1(),fo=k2(),uo=tt(),po=H1(),ho=w0(),mo=u1(),go=it(),vo=E0()("JsSIP"),zo=Fe();vo("version %s",t8.version);nt.exports={C:no,Exceptions:oo,Utils:fo,UA:uo,URI:po,NameAddrHeader:ho,WebSocketInterface:go,Grammar:mo,RTCSession:zo,debug:E0(),get name(){return t8.title},get version(){return t8.version}}});function ut(r){return r&&r.default&&r.default.UA?r.default:r}var Mo,ft,_o,N3,r8=F(()=>{"use strict";b0();Mo="DropCowboy Web",ft=15e3,_o={audio:!0,video:!1};N3=class{constructor(s){this._loadJsSip=s&&s.loadJsSip||function(){return Promise.resolve().then(()=>mi(ot(),1))},this._ua=null,this._session=null,this._audio=null,this._ringing=new Set,this._connected=new Set,this._ended=new Set}async connect(s){if(!s||!s.ws_uri||!s.username||!s.password)throw new Error("SIP mint did not return WSS credentials");if(typeof WebSocket>"u")throw new Error("This runtime has no WebSocket");await this.disconnect();let e=ut(await this._loadJsSip()),l=s.aor_uri||"sip:"+s.username+"@"+s.realm,n=new e.UA({sockets:[new e.WebSocketInterface(s.ws_uri)],uri:l,authorization_user:s.username,password:s.password,realm:s.realm,register:!0,register_expires:120,user_agent:Mo});this._ua=n,await this._awaitRegistered(n,function(){n.start()})}async call(s){if(!this._ua)throw new Error("Dialer is not registered");if(this._session)throw new Error("Dialer is busy");let e=this._ua.call(s.uri,{extraHeaders:s.extraHeaders,mediaConstraints:s.enableVideo?{audio:!0,video:!0}:_o,pcConfig:s.pcConfig||{iceServers:[{urls:x0}]}});this._session=e,this._bindMedia(e),e.on("progress",()=>this._emit(this._ringing)),e.on("accepted",()=>this._emit(this._connected)),e.on("confirmed",()=>this._emit(this._connected)),e.on("ended",l=>{this._clearSession(e),this._emit(this._ended,this._disposition(l,"answered"))}),e.on("failed",l=>{this._clearSession(e),this._emit(this._ended,this._disposition(l,"failed"))})}async hangup(){if(this._session)try{this._session.terminate()}catch{this._clearSession(this._session)}}setMuted(s){return this._session?(s?this._session.mute({audio:!0}):this._session.unmute({audio:!0}),!0):!1}setHeld(s){return this._session?s?this._session.hold()!==!1:this._session.unhold()!==!1:!1}sendDtmf(s){return!this._session||!s?!1:(this._session.sendDTMF(String(s)),!0)}async disconnect(){if(this._session=null,this._audio&&(this._audio.srcObject=null),this._ua){try{this._ua.stop()}catch{}this._ua=null}}onRinging(s){return this._listen(this._ringing,s)}onConnected(s){return this._listen(this._connected,s)}onEnded(s){return this._listen(this._ended,s)}_awaitRegistered(s,e){return new Promise((l,n)=>{let a=null,o=s,h=u=>{if(a&&(clearTimeout(a),a=null),typeof o.removeListener=="function"&&(o.removeListener("registered",m),o.removeListener("registrationFailed",v),o.removeListener("disconnected",_)),u){n(u);return}l()},m=()=>h(null),v=u=>{h(new Error("WEB_REGISTER_FAILED: "+(u&&u.cause||"unknown")))},_=u=>{h(new Error("WEB_REGISTER_SOCKET_CLOSED: "+(u&&u.reason||"socket closed")))};s.on("registered",m),s.on("registrationFailed",v),s.on("disconnected",_),a=setTimeout(()=>{h(new Error("WEB_REGISTER_TIMEOUT: no 200 to REGISTER within "+ft+"ms"))},ft);try{e()}catch(u){h(u instanceof Error?u:new Error(String(u)))}})}_bindMedia(s){s.on("peerconnection",e=>{e.peerconnection.addEventListener("track",l=>{let n=this._remoteAudio();n&&l.streams&&l.streams[0]&&(n.srcObject=l.streams[0])})})}_remoteAudio(){return typeof document>"u"?null:(this._audio||(this._audio=document.createElement("audio"),this._audio.autoplay=!0,this._audio.setAttribute("playsinline",""),document.body.appendChild(this._audio)),this._audio)}_clearSession(s){this._session===s&&(this._session=null)}_disposition(s,e){return s&&s.cause?String(s.cause):e}_listen(s,e){return s.add(e),()=>s.delete(e)}_emit(s,e){for(let l of s)l(e)}}});var Lo,dt,A3,i8=F(()=>{"use strict";ml();b0();z1();r8();K1();F1();Lo=6e4,dt={},A3=class{constructor(s){this.machine=new C0,this.http=s&&s.http||dt.http||S0(),this.sip=s&&s.sip||dt.sip||new N3,this.token=null,this.session=null,this.phoneApiBase=L2,this.teamId=null,this.externalUserId=null,this.credentials=null,this.credentialsExpireAt=null,this.now=s&&s.now||Date.now,this.theme={},this.errorListeners=[],this.sipBound=!1}async init(s){if(!s1(s))throw new Error("init({ token }) requires a site token from POST /embed/token");if(this.phoneApiBase=s.phoneApiBase||L2,this._releaseSession(),this.session=c1(s,e=>this._applyToken(e)),this._applyToken(await l1(this.session)),this.machine.beginConnect(),this.sandbox){this.machine.markReady();return}this._bindSip(),await this._connectSip(),this.machine.markReady()}setToken(s){if(!this.session)throw new Error("Call init({ token }) before setToken");return this.session.manager.setToken(s)}getTokenManager(){return this.session?this.session.manager:null}_applyToken(s){this.token=s||null;let e=B2(s);this.teamId=e.team_id||null,this.externalUserId=e.sub||null,this.sandbox=e.sandbox===!0}_releaseSession(){this.session&&(this.session.release(),this.session=null)}setTheme(s){this.theme=Object.assign({},this.theme,s||{}),o1(this.theme)}getTheme(){return this.theme}async callPhone(s,e){if(this.sandbox)throw new Error("This preview cannot place a live call. Connect your carrier (BYOC) to use the dialer on your site.");if(!this.token||!this.credentials)throw new Error("Call init({ token }) before callPhone");await this._ensureFreshSip();let l=e&&e.contact?e.contact:void 0;this.machine.beginCall(s,l);let n=oe(this.credentials,{team_id:this.teamId,external_user_id:this.externalUserId,initial_action:L0.DIAL_ADHOC,contact_id:l&&l.id,contact_tn:s,enable_audio:!0});await this.sip.call(n)}addCallEndedListener(s){return this.machine.addCallEndedListener(e=>{s({number:e.number,contact:e.contact,disposition:e.disposition,durationMs:e.durationMs,duration_ms:e.durationMs})})}addErrorListener(s){return this.errorListeners.push(s),()=>{this.errorListeners=this.errorListeners.filter(function(e){return e!==s})}}async close(){this.machine.endCall({disposition:"cancelled"}),this.machine.reset(),this._releaseSession(),this.token=null,this.credentials=null,this.credentialsExpireAt=null,this.errorListeners=[],await this.sip.hangup(),await this.sip.disconnect()}snapshot(){return this.machine.snapshot()}_bindSip(){this.sipBound||(this.sipBound=!0,this.sip.onRinging(()=>this.machine.markRinging()),this.sip.onConnected(()=>this.machine.markConnected()),this.sip.onEnded(s=>this.machine.endCall({disposition:s})))}async _connectSip(){let s=this.now();this.credentials=await this._mintSip(),this.credentialsExpireAt=s+9e5,await this.sip.connect(this.credentials)}async _ensureFreshSip(){!this.credentialsExpireAt||this.now()<this.credentialsExpireAt-Lo||await this._connectSip()}async _mintSip(){let s=fe(this.phoneApiBase),e=ue({fingerprint:vl(),deviceClass:"computer"});return this.session.manager.withAuthRetry(l=>this.http.post(s,e,{Authorization:"Bearer "+l,"Content-Type":"application/json"}))}}});var pt=F(()=>{"use strict";dl();pl();hl();i8();b0();z1();r8()});function xo(r){return new Date(r).toLocaleTimeString([],{hour:"numeric",minute:"2-digit"})}var ht,K2,mt=F(()=>{"use strict";P2();X2();X1();Q2();ht={chat:"Chat",sms:"SMS",mms:"MMS",rcs:"RCS"},K2=class extends X{constructor(){super(...arguments);this.channel="sms";this.typing=!1;this.inline=!1;this.branding=!0;this.contact={id:"",name:"",phone:""};this.messages=[];this.draft="";this.unsubscribers=[]}connectedCallback(){super.connectedCallback(),this.bindAdapter()}disconnectedCallback(){super.disconnectedCallback();for(let e of this.unsubscribers)e();this.unsubscribers.length=0}willUpdate(e){e.has("adapter")&&this.bindAdapter()}updated(){requestAnimationFrame(()=>{this.streamEl&&(this.streamEl.scrollTop=this.streamEl.scrollHeight)})}bindAdapter(){for(let e of this.unsubscribers)e();this.unsubscribers.length=0,this.adapter&&(this.unsubscribers.push(this.adapter.on("chat:message",e=>{let l=this.messages.findIndex(n=>n.id===e.id);if(l>=0){let n=this.messages.slice();n[l]=e,this.messages=n}else this.messages=[...this.messages,e]})),this.unsubscribers.push(this.adapter.on("chat:typing",({who:e,typing:l})=>{e==="agent"&&(this.typing=l)})))}emit(e,l){this.dispatchEvent(new CustomEvent(e,{detail:l,bubbles:!0,composed:!0}))}async send(){let e=this.draft.trim();if(!e)return;if(this.draft="",!this.adapter){this.messages=[...this.messages,{id:crypto.randomUUID(),author:"visitor",text:e,ts:Date.now(),status:"sent",channel:this.channel}],this.emit("dc-send",{text:e,channel:this.channel});return}let l=this.adapter.sendMessage(e,this.channel);this.emit("dc-send",{text:e,channel:this.channel});let n=!1;try{let a=await l;n=!!a&&a.status==="failed"}catch{n=!0}n&&!this.draft&&(this.draft=e)}render(){let e=this.contact.name||this.contact.phone;return z`
      <section class="panel dc-panel" role="region" aria-label=${e?`Messages with ${e}`:"Messages"}>
        <header class="dc-header head">
          <div class="dc-h-left">
            <div class="dc-avatar">${this.contact.initials??"#"}</div>
            <div>
              <div class="dc-title">${e||"Messages"}</div>
              ${this.contact.name&&this.contact.phone?z`<div class="dc-subtitle">${this.contact.phone}</div>`:D}
            </div>
          </div>
          <span class="dc-pill is-info channel-pill" aria-label="Channel ${ht[this.channel]}">
            ${ht[this.channel]}
          </span>
        </header>
        <div class="stream">
          <div class="day">Today</div>
          ${E2(this.messages,l=>l.id,l=>this.renderMessage(l))}
          ${this.typing?z`<div class="typing" aria-label="Typing"><i></i><i></i><i></i></div>`:D}
        </div>
        <div class="composer">
          <textarea
            class="field"
            rows="1"
            placeholder=${e?`Text ${e}\u2026`:"Type a message\u2026"}
            aria-label="Message"
            .value=${this.draft}
            @input=${l=>this.draft=l.target.value}
            @keydown=${l=>{l.key==="Enter"&&!l.shiftKey&&(l.preventDefault(),this.send())}}
          ></textarea>
          <button class="send" aria-label="Send" @click=${this.send}>${J("send")}</button>
        </div>
        ${this.branding?z`<div class="branding">Powered by DropCowboy</div>`:D}
      </section>
    `}renderMessage(e){if(e.card)return z`
        <div class="card">
          <div class="cimg"></div>
          <div class="cbody">
            <div class="ctitle">${e.card.title}</div>
            ${e.card.description?z`<div class="cdesc">${e.card.description}</div>`:D}
          </div>
          <div class="cactions">
            ${e.card.actions.map(n=>z`<button
                class="caction"
                @click=${()=>this.emit("dc-card-action",{messageId:e.id,actionId:n.id})}
              >
                ${n.label}
              </button>`)}
          </div>
        </div>
      `;let l=e.author==="visitor"?"me":"agent";return z`
      <div class="msg ${l}">
        ${e.imageUrl?z`<span class="mms"><img src=${e.imageUrl} alt="Attachment" /></span>`:D}
        ${e.text}
        <span class="t">
          ${xo(e.ts)}${e.author==="visitor"&&e.status==="read"?z` ${J("check-double")}`:D}
        </span>
      </div>
    `}};K2.styles=[X.styles,r2`
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
    `],C([w({type:String})],K2.prototype,"channel",2),C([w({type:Boolean})],K2.prototype,"typing",2),C([w({type:Boolean})],K2.prototype,"inline",2),C([w({type:Boolean})],K2.prototype,"branding",2),C([w({attribute:!1})],K2.prototype,"contact",2),C([w({attribute:!1})],K2.prototype,"messages",2),C([w({attribute:!1})],K2.prototype,"adapter",2),C([M2()],K2.prototype,"draft",2),C([v0(".stream")],K2.prototype,"streamEl",2),K2=C([p2("dc-messenger")],K2)});function gt(r){let s=String(r||L2).replace(/\/$/,"");return s.endsWith("/phone")?s+"/embed/sms":s+"/phone/embed/sms"}var bo,E3,n8=F(()=>{"use strict";z1();K1();F1();bo={};E3=class{constructor(s){this.http=s&&s.http||bo.http||S0(),this.token=null,this.session=null,this.phoneApiBase=L2,this.teamId=null,this.theme={},this.listeners=[],this.errorListeners=[],this.defaultFrom=null,this.defaultVoiceIvrId=null,this.defaultConsentId=null}async init(s){if(!s1(s))throw new Error("init({ token }) requires a site token from POST /embed/token");this.phoneApiBase=s.phoneApiBase||L2,this.defaultFrom=s.from||null,this.defaultVoiceIvrId=s.voiceIvrId||null,this.defaultConsentId=s.consentId||null,this._releaseSession(),this.session=c1(s,e=>this._applyToken(e)),this._applyToken(await l1(this.session))}setToken(s){if(!this.session)throw new Error("Call init({ token }) before setToken");return this.session.manager.setToken(s)}getTokenManager(){return this.session?this.session.manager:null}_applyToken(s){this.token=s||null;let e=B2(s);this.teamId=e.team_id||null,this.sandbox=e.sandbox===!0}_releaseSession(){this.session&&(this.session.release(),this.session=null)}setTheme(s){this.theme=Object.assign({},this.theme,s||{}),o1(this.theme)}getTheme(){return this.theme}async sendMessage(s,e){if(this.sandbox)throw new Error("This preview cannot send a live text. Connect your carrier (BYOC) to use the messenger on your site.");if(!this.token)throw new Error("Call init({ token }) before sendMessage");let l=e&&(e.body||e.text);if(!s||!l)throw new Error("sendMessage(to, { body }) requires a destination and body");let n=e&&e.from||this.defaultFrom,a=e&&e.voiceIvrId||this.defaultVoiceIvrId,o={phone_number:s,sms_body:l};n&&(o.caller_id=n),a&&(o.voice_ivr_id=a),e&&e.contactId&&(o.contact_id=e.contactId);let h=e&&e.consentId||this.defaultConsentId;h&&(o.consent_id=h);let m=await this.session.manager.withAuthRetry(_=>this.http.post(gt(this.phoneApiBase),o,{Authorization:"Bearer "+_,"Content-Type":"application/json"})),v={to:s,body:l,sms_id:m&&(m.sms_id||m.id),status:m&&m.status||"queued",direction:"outbound"};return this._emit(v),m}addMessageListener(s){return this.listeners.push(s),()=>{this.listeners=this.listeners.filter(function(e){return e!==s})}}addErrorListener(s){return this.errorListeners.push(s),()=>{this.errorListeners=this.errorListeners.filter(function(e){return e!==s})}}async close(){this._releaseSession(),this.token=null,this.listeners=[],this.errorListeners=[]}_emit(s){for(let e=0;e<this.listeners.length;e++)this.listeners[e](s)}}});var vt=F(()=>{"use strict";mt();n8()});function o8(r,s){let e=String(r||L2).replace(/\/$/,""),l=e.endsWith("/phone")?e:e+"/phone",n=new URLSearchParams;return n.set("origin_type","embed"),s&&s.embed_site_id&&n.set("embed_site_id",s.embed_site_id),l+"/embed/inbox?"+n.toString()}function f8(r){let s=String(r||L2).replace(/\/$/,"");return s.endsWith("/phone")?s+"/embed/sms":s+"/phone/embed/sms"}function Mt(){return{get:function(r,s){return zt("GET",r,void 0,s)},post:function(r,s,e){return zt("POST",r,s,e)}}}function zt(r,s,e,l){let n={method:r,headers:l||{}};return e!==void 0&&(n.body=JSON.stringify(e)),fetch(s,n).then(function(a){return a.json().catch(function(){return{}}).then(function(o){if(!a.ok){let h=_2({payload:o,status:a.status},"Request failed"),m=new Error(h.message);throw m.code=h.code,m.status=a.status,m.payload=o,m}return o})})}function wo(r){return!r||typeof r!="object"?r:r.data!==void 0?r.data:r}function _t(r){let s=wo(r);return Array.isArray(s)?s:!s||typeof s!="object"?[]:Array.isArray(s.tasks)?s.tasks:Array.isArray(s.conversations)?s.conversations:Array.isArray(s.records)?s.records:[]}function yo(r){let s=String(r||"").trim().split(/\s+/),e="";for(let l=0;l<s.length&&e.length<2;l++)s[l]&&(e+=s[l].charAt(0));return e.toUpperCase()||"?"}function To(r){if(r==null||r==="")return"";let s=typeof r=="number"?r:Date.parse(r);if(!s||Number.isNaN(s))return String(r);try{return new Date(s).toLocaleTimeString([],{hour:"numeric",minute:"2-digit"})}catch{return""}}function No(r){let s=String(r||"").toLowerCase();return s==="sms"||s==="mms"||s==="rcs"?"sms":s==="chat"?"chat":s==="email"?"email":s==="rvm"||s==="voicemail"||s==="ringless"?"rvm":s==="call"||s==="inbound_call"||s==="outbound_call"||s==="missed_call"||s==="fax"?"call":"sms"}function k3(r){let s=String(r||"").toLowerCase();return Ao[s]||s.toUpperCase()}function u8(r){let s=r||{},e=s.preview_info||{},l=e.task_contact||s.contact_name||s.contact&&(s.contact.name||s.contact.first_name)||"Unknown",n=s.main_phone||s.phone_number||s.contact&&(s.contact.phone||s.contact.main_phone)||"",a=e.task_content||e.task_subject||s.preview||s.last_message||"",o=s.task_id||s.id||s.conversation_id,h=s.caller_id||s.from||s.assigned_number||e.caller_id||e.from||void 0,m=s.voice_ivr_id||e.voice_ivr_id||void 0;return{conversation:{id:o,contact:{id:s.contact_id||"",name:l,phone:n,initials:yo(l),company:s.contact&&s.contact.company||""},channel:No(s.task_type||s.channel),preview:a,when:To(e.task_date||s.updated_at||s.created_at),unread:s.unread===!0,assignee:s.assigned_to_name||void 0},reply:{phone:n,contact_id:s.contact_id||void 0,consent_id:s.consent_id||e.consent_id||s.tcpa_consent_id||void 0,caller_id:h,voice_ivr_id:m}}}function d8(r){let s=[],e={},l=r||[];for(let n=0;n<l.length;n++){let a=u8(l[n]);a.conversation.id&&(s.push(a.conversation),e[a.conversation.id]=a.reply)}return{conversations:s,replyContext:e}}function Ct(r){let s=u8(r),e=s.conversation.preview;return e?[{id:s.conversation.id+"-preview",author:"visitor",text:e,ts:Date.now(),authorName:s.conversation.contact.name,channel:s.conversation.channel==="sms"?"sms":"chat"}]:[]}function p8(r,s){let e=String(s||So).replace(/\/$/,""),l=r?String(r).charAt(0)==="#"?r:"#"+r:"#/inbox",n=e+l;return typeof window<"u"&&typeof window.open=="function"&&window.open(n,"_blank","noopener"),n}var So,Ao,h8=F(()=>{"use strict";z1();K1();p4();F1();So="https://dropcowboy.com/app";Ao={sms:"SMS",chat:"Chat",email:"Email",rvm:"Voicemail",call:"Call"}});function Eo(r){if(!r)return"";let s=B2(r),e=s.team_id||"",l=s.embed_site_id||s.site_id||"";return!e&&!l?"token:"+r:e+"|"+l}function Lt(){let r="";return{shouldLoad:function(s){let e=Eo(s);return!e||e===r?!1:(r=e,!0)},reset:function(){r=""}}}function xt(r,s){let e=r||[];if(s){for(let l=0;l<e.length;l++)if(e[l].id===s)return s}return e.length?e[0].id:""}var bt=F(()=>{"use strict";z1()});var St,b2,wt=F(()=>{"use strict";P2();X2();X1();Q2();h8();bt();z1();St={sms:{content:"S",bg:"#16a34a"},chat:{content:"C",bg:"var(--dc-primary-color)"},call:{content:J("phone"),bg:"#7c3aed"},email:{content:"@",bg:"#ea580c"},rvm:{content:"V",bg:"#7c3aed"}},b2=class extends X{constructor(){super(...arguments);this.conversations=[];this.thread=[];this.selectedId="";this.filter="all";this.connection="connected";this.loading=!1;this.composerMode="reply";this.token="";this.from="";this.number="";this.callerId="";this.voiceIvrId="";this.phoneApiBase="";this.errorMessage="";this.tokenManager=null;this.consentMessage="";this.http=Mt();this.replyContext={};this.fetchGen=0;this.reloadGate=Lt();this.offTokenChange=null}get selected(){return this.conversations.find(e=>e.id===this.selectedId)??this.conversations[0]}get unreadCount(){let e=0;for(let l of this.conversations)l.unread&&e++;return e}filtered(){let e=this.conversations;switch(this.filter){case"unassigned":return e.filter(l=>!l.assignee);case"mine":return e.filter(l=>l.assignee==="You");case"sms":return e.filter(l=>l.channel==="sms");case"chat":return e.filter(l=>l.channel==="chat");default:return e}}connectedCallback(){super.connectedCallback(),this.tokenManager&&!this.offTokenChange&&this.watchTokenManager()}disconnectedCallback(){super.disconnectedCallback(),this.unwatchTokenManager()}updated(e){e.has("tokenManager")&&(this.unwatchTokenManager(),this.reloadGate.reset(),this.tokenManager&&this.watchTokenManager()),(e.has("token")||e.has("tokenManager"))&&this.maybeLoad()}watchTokenManager(){let e=this.tokenManager;e&&(this.offTokenChange=e.onTokenChange(()=>this.maybeLoad()))}unwatchTokenManager(){this.offTokenChange&&this.offTokenChange(),this.offTokenChange=null}currentToken(){return this.tokenManager?this.tokenManager.current():this.token}maybeLoad(){this.reloadGate.shouldLoad(this.currentToken())&&this.loadInbox()}authed(e){let l=n=>({Authorization:"Bearer "+n,"Content-Type":"application/json"});return this.tokenManager?this.tokenManager.withAuthRetry(n=>e(l(n))):e(l(this.token))}threadFor(e){return e?Ct({preview_info:{task_content:e.preview},task_id:e.id,task_type:e.channel}):[]}reportError(e){m3(e)?this.consentMessage=e.message:this.errorMessage=e.message,this.dispatchEvent(new CustomEvent("dc-error",{detail:{code:e.code,message:e.message,reason:e.reason},bubbles:!0,composed:!0}))}async loadInbox(){let e=++this.fetchGen;this.loading=!0,this.errorMessage="";try{let l=B2(this.currentToken()),n=l.embed_site_id||l.site_id,a=await this.authed(h=>this.http.get(o8(this.phoneApiBase||L2,{embed_site_id:n}),h));if(e!==this.fetchGen)return;let o=d8(_t(a));this.conversations=o.conversations,this.replyContext=o.replyContext,this.selectedId=xt(this.conversations,this.selectedId),this.thread=this.threadFor(this.conversations.find(h=>h.id===this.selectedId))}catch(l){if(e!==this.fetchGen)return;this.reloadGate.reset(),this.reportError(_2(l,"Unable to load the inbox."))}finally{e===this.fetchGen&&(this.loading=!1)}}select(e){e!==this.selectedId&&(this.consentMessage=""),this.selectedId=e;let l=this.conversations.find(a=>a.id===e);this.thread=this.threadFor(l);let n=this.replyContext[e]||{};this.dispatchEvent(new CustomEvent("dc-select-conversation",{detail:{id:e,contact_id:n.contact_id||l?.contact.id||null,phone:n.phone||l?.contact.phone||null,name:l?.contact.name||null},bubbles:!0,composed:!0}))}async sendComposer(){let e=(this.composerField?.value||"").trim(),l=this.selected;if(this.dispatchEvent(new CustomEvent("dc-send",{detail:{text:e,id:l?.id,note:this.composerMode==="note"},bubbles:!0,composed:!0})),this.composerMode==="note"||!e||!l||!this.currentToken())return;let n=this.replyContext[l.id]||{phone:l.contact.phone,contact_id:l.contact.id},a=n.caller_id||this.callerId||this.from||this.number,o=n.voice_ivr_id||this.voiceIvrId;if(!a&&!o){this.reportError({code:"caller_id_required",message:"Set the business number to reply from (the from or number attribute, or init({ from })).",reason:null,status:null});return}this.errorMessage="",this.consentMessage="";let h={phone_number:n.phone||l.contact.phone,sms_body:e};a&&(h.caller_id=a),o&&(h.voice_ivr_id=o),n.contact_id&&(h.contact_id=n.contact_id),n.consent_id&&(h.consent_id=n.consent_id);try{let m=await this.authed(v=>this.http.post(f8(this.phoneApiBase||L2),h,v));this.composerField&&(this.composerField.value=""),this.dispatchEvent(new CustomEvent("dc-message-sent",{detail:{to:h.phone_number,contact_id:h.contact_id||null,conversation_id:l.id,sms_id:m&&(m.sms_id||m.id)||null},bubbles:!0,composed:!0}))}catch(m){this.reportError(_2(m,"Unable to send the reply."))}}render(){return z`
      <div class="app">
        ${this.errorMessage?z`<div class="errbanner" style="grid-column:1/-1">${this.errorMessage}</div>`:D}
        <nav class="nav" aria-label="Sections">
          <div class="n on" title="Inbox">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-6l-2 3h-4l-2-3H2"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></svg>
            ${this.unreadCount?z`<span class="b"></span>`:D}
          </div>
          <div class="n" title="Contacts">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
          </div>
          <div class="n" title="Calls">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
          </div>
          <div class="n" title="Settings">${J("gear")}</div>
        </nav>
        ${this.renderList()} ${this.renderThread()} ${this.renderContext()}
      </div>
    `}renderList(){let e=["all","unassigned","mine","sms","chat"];return z`
      <section class="list" aria-label="Conversations">
        <div class="lh">
          <h2>Inbox</h2>
          ${this.unreadCount?z`<span class="dc-pill is-danger">${this.unreadCount} unread</span>`:D}
        </div>
        <div class="filters">
          ${e.map(l=>z`<button class="f ${this.filter===l?"on":""}" @click=${()=>this.filter=l}>
              ${l==="all"?"All":l==="unassigned"?"Unassigned":l==="mine"?"Mine":k3(l)}
            </button>`)}
        </div>
        <div class="convs">
          ${this.loading?this.renderListSkeleton():E2(this.filtered(),l=>l.id,l=>this.renderConv(l))}
        </div>
      </section>
    `}renderConv(e){let l=St[e.channel]||St.sms,n=(this.selected?.id??"")===e.id;return z`
      <button class="conv ${n?"sel":""}" @click=${()=>this.select(e.id)}>
        <span class="dc-avatar">${e.contact.initials??e.contact.name.slice(0,2)}</span>
        <span class="meta">
          <span class="top"><span class="nm">${e.contact.name}</span><span class="tm">${e.when}</span></span>
          <span class="pv">
            <span class="chan" style="background:${l.bg}">${l.content}</span>
            <span class=${e.typing?"typing":""}>${e.typing?"Typing\u2026":e.preview}</span>
          </span>
        </span>
        ${e.unread?z`<span class="unread"></span>`:D}
      </button>
    `}renderThread(){let e=this.selected;return this.loading?z`<section class="thread"><div class="loadingpane">Loading conversation…</div></section>`:e?z`
      <section class="thread" aria-label="Conversation with ${e.contact.name}">
        <div class="th">
          <span class="dc-avatar">${e.contact.initials??e.contact.name.slice(0,2)}<span class="dc-dot"></span></span>
          <div>
            <div style="font-weight:700">${e.contact.name}</div>
            <div class="dc-muted dc-sm">${k3(e.channel)} · ${e.contact.phone}</div>
          </div>
          <div class="sp"></div>
          <button class="dc-btn dc-secondary" @click=${()=>this.emit("dc-assign")}>Assign</button>
          <button class="dc-btn dc-secondary" @click=${()=>p8("#/inbox")}>Open portal</button>
        </div>
        ${this.renderBanner()}
        ${this.consentMessage?z`<div class="consentbanner" role="alert"><strong>Consent required</strong>${this.consentMessage}</div>`:D}
        <div class="timeline" role="log">
          ${E2(this.thread,l=>l.id,l=>this.renderMessage(l))}
        </div>
        ${this.renderComposer(e)}
      </section>
    `:z`<section class="thread">
        <div class="empty">
          <div>
            <div style="font-size:30px;margin-bottom:6px">${J("check")}</div>
            <strong style="color:var(--dc-text-color)">Inbox zero</strong>
            <p class="dc-sm">No open conversations. New messages land here in real time.</p>
          </div>
        </div>
      </section>`}renderBanner(){return this.connection==="reconnecting"?z`<div class="banner reconnecting" role="status"><span class="dot"></span>Reconnecting… messages will sync automatically</div>`:this.connection==="down"?z`<div class="banner down" role="alert"><span class="dot"></span>You're offline — replies are paused until the connection returns</div>`:z`${D}`}renderMessage(e){if(e.author==="system")return z`<div class="sysrow">${e.text}</div>`;let l=e.author==="agent";return z`
      <div class="tev ${l?"out":""}">
        ${l?D:z`<span class="dc-avatar" style="width:28px;height:28px;font-size:11px">${(e.authorName??"?").slice(0,2)}</span>`}
        <div>
          <div class="label">${e.authorName??(l?"You":"")} ${e.channel?`\xB7 ${k3(e.channel)}`:""}</div>
          <div class="bub">${e.text}</div>
        </div>
      </div>
    `}renderComposer(e){let l=this.composerMode==="note",n=this.connection==="down";return z`
      <div class="composer">
        <div class="ctabs">
          <button class="ctab ${l?"":"on"}" @click=${()=>this.composerMode="reply"}>Reply</button>
          <button class="ctab note ${l?"on":""}" @click=${()=>this.composerMode="note"}>
            ${J("lock")} Note
          </button>
        </div>
        <div class="cbox ${l?"note":""}">
          <textarea
            class="field"
            ?disabled=${n}
            placeholder=${l?"Add an internal note (only your team sees this)\u2026":`Reply via ${k3(e.channel)}\u2026`}
          ></textarea>
          <button class="dc-btn" ?disabled=${n} @click=${()=>this.sendComposer()}>${l?"Save":"Send"}</button>
        </div>
      </div>
    `}renderContext(){let e=this.selected;return e?z`
      <aside class="ctx" aria-label="Contact details">
        <div class="who">
          <div class="dc-avatar big">${e.contact.initials??e.contact.name.slice(0,2)}</div>
          <div style="font-weight:700">${e.contact.name}</div>
          <div class="dc-muted dc-sm">${e.contact.company??""}</div>
        </div>
        <h4>Details</h4>
        <div class="kv"><span class="k">Stage</span><span>${e.contact.stage||"\u2014"}</span></div>
        <div class="kv"><span class="k">Owner</span><span>${e.assignee||e.contact.owner||"Unassigned"}</span></div>
        <div class="kv"><span class="k">Phone</span><span>${e.contact.phone}</span></div>
      </aside>
    `:z`<aside class="ctx"></aside>`}renderListSkeleton(){return z`
      ${[0,1,2,3].map(()=>z`<div class="conv" style="cursor:default">
          <span class="dc-avatar" style="background:var(--dc-surface-2)"></span>
          <span class="meta" style="display:flex;flex-direction:column;gap:7px">
            <span class="skel" style="width:60%"></span>
            <span class="skel" style="width:85%"></span>
          </span>
        </div>`)}
    `}emit(e){this.dispatchEvent(new CustomEvent(e,{bubbles:!0,composed:!0}))}};b2.styles=[X.styles,r2`
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
    `],C([w({attribute:!1})],b2.prototype,"conversations",2),C([w({attribute:!1})],b2.prototype,"thread",2),C([w({type:String})],b2.prototype,"selectedId",2),C([w({type:String})],b2.prototype,"filter",2),C([w({type:String})],b2.prototype,"connection",2),C([w({type:Boolean})],b2.prototype,"loading",2),C([w({type:String,attribute:"composer-mode"})],b2.prototype,"composerMode",2),C([w({type:String})],b2.prototype,"token",2),C([w({type:String})],b2.prototype,"from",2),C([w({type:String})],b2.prototype,"number",2),C([w({attribute:"caller-id"})],b2.prototype,"callerId",2),C([w({attribute:"voice-ivr-id"})],b2.prototype,"voiceIvrId",2),C([w({type:String,attribute:"phone-api-base"})],b2.prototype,"phoneApiBase",2),C([w({type:String,attribute:"error-message"})],b2.prototype,"errorMessage",2),C([w({attribute:!1})],b2.prototype,"tokenManager",2),C([w({type:String,attribute:"consent-message"})],b2.prototype,"consentMessage",2),C([v0("textarea.field")],b2.prototype,"composerField",2),b2=C([p2("dc-shared-inbox")],b2)});var yt=F(()=>{"use strict";wt();h8()});function ko(r){return Tt[r]??Tt.system}var Tt,K0,m8=F(()=>{"use strict";Q2();Tt={sms:{content:"S",bg:"#16a34a"},mms:{content:"M",bg:"#16a34a"},chat:{content:"C",bg:"var(--dc-primary-color)"},call:{content:J("phone"),bg:"#7c3aed"},rvm:{content:"V",bg:"#7c3aed"},email:{content:"@",bg:"#ea580c"},form:{content:"F",bg:"#0ea5e9"},consent:{content:J("check"),bg:"#22c55e"},note:{content:J("lock"),bg:"var(--dc-warning)"},system:{content:J("circle-dot"),bg:"var(--dc-text-light)"}};K0={glyph:ko}});var Nt={};I6(Nt,{DcContactHub:()=>r1});var r1,g8=F(()=>{"use strict";P2();X2();X1();Q2();C4();r1=class extends X{constructor(){super(...arguments);this.contacts=[];this.selectedId="";this.token="";this.apiBase="";this.loading=!1;this.errorMessage="";this.http=x1();this.fetchGen=0}connectedCallback(){super.connectedCallback(),this.maybeLoadContacts()}updated(e){(e.has("token")||e.has("apiBase"))&&this.maybeLoadContacts()}maybeLoadContacts(){this.contacts.length>0||!this.token||this.loadContacts()}async loadContacts(){if(!this.token)return;let e=++this.fetchGen;this.loading=!0,this.errorMessage="";let l=this.apiBase||h1;try{let n=await this.http.get(R3(l),D2(this.token));if(e!==this.fetchGen)return;let a=f2(n),o=Array.isArray(a)?a:a&&a.contacts||[],h=[];for(let m=0;m<o.length;m++)h.push(G1(o[m]));this.contacts=h,!this.selectedId&&h.length&&(this.selectedId=h[0].id)}catch(n){if(e!==this.fetchGen)return;let a=n instanceof Error?n.message:"";this.errorMessage=a&&a!=="missing parameters"?a:"Contacts could not be loaded."}finally{e===this.fetchGen&&(this.loading=!1)}}selectContact(e){this.selectedId=e}selected(){if(this.selectedId){for(let e=0;e<this.contacts.length;e++)if(this.contacts[e].id===this.selectedId)return this.contacts[e]}}consentPill(e){return e?z`<span class="dc-pill is-online" style="padding:2px 8px"><span class="dc-pdot"></span>Opted in</span>`:z`<span class="dc-pill is-danger" style="padding:2px 8px">Not opted in</span>`}renderNav(){return z`
      <nav class="nav" aria-label="Sections">
        <div class="n" title="Dialer">${J("phone")}</div>
        <div class="n" title="Messages">${J("sms")}</div>
        <div class="n" title="Inbox">${J("inbox")}</div>
        <div class="n on" title="Contacts">${J("user")}</div>
        <div class="n" title="Campaigns">${J("bullhorn")}</div>
        <div class="n" title="Pipeline">${J("chart")}</div>
        <span class="sp"></span>
        <div class="n" title="Settings">${J("gear")}</div>
      </nav>
    `}render(){return z`
      <section class="app" aria-label="Contact hub">
        ${this.renderNav()}
        ${this.renderList()}
        ${this.renderDetail()}
        ${this.renderContext()}
      </section>
    `}renderList(){return this.errorMessage&&!this.contacts.length&&!this.loading?z`<div class="list"><div class="err">${this.errorMessage}</div></div>`:this.loading&&!this.contacts.length?z`<div class="list"><div class="empty">Loading contacts…</div></div>`:this.contacts.length?z`
      <div class="list">
        <div class="lh"><h2>Contacts</h2></div>
        <div class="rows">
          ${E2(this.contacts,e=>e.id,e=>z`
              <div
                class="ct ${e.id===this.selectedId?"sel":""}"
                role="button"
                tabindex="0"
                @click=${()=>this.selectContact(e.id)}
                @keydown=${l=>{(l.key==="Enter"||l.key===" ")&&(l.preventDefault(),this.selectContact(e.id))}}
              >
                <span class="dc-avatar">${e.initials??e.name.slice(0,2)}</span>
                <div class="meta">
                  <div class="nm">${e.name}</div>
                  <div class="sub">${e.phone||e.email||e.company||""}</div>
                </div>
                ${e.consentSms===!0||e.consentVoice===!0?z`<span class="consent-dot" title="Opted in"></span>`:D}
              </div>
            `)}
        </div>
      </div>
    `:z`<div class="list">
        <div class="lh"><h2>Contacts</h2></div>
        <div class="empty">No contacts yet.</div>
      </div>`}renderDetail(){let e=this.selected();return e?z`
      <div class="detail">
        <div class="dh">
          <span class="dc-avatar" style="width:48px;height:48px;font-size:16px"
            >${e.initials??e.name.slice(0,2)}</span
          >
          <div class="who">
            <div class="nm">${e.name}</div>
            ${e.company?z`<div class="sub">${e.company}</div>`:D}
          </div>
        </div>
        <div class="detail-body">
          <div class="card">
            <div class="ch">Details</div>
            <div class="fields">
              ${e.phone?z`<div class="kv"><span class="k">Phone</span><span>${e.phone}</span></div>`:D}
              ${e.email?z`<div class="kv"><span class="k">Email</span><span>${e.email}</span></div>`:D}
              ${e.consentSms!=null?z`<div class="kv"><span class="k">SMS consent</span>${this.consentPill(e.consentSms===!0)}</div>`:D}
              ${e.consentVoice!=null?z`<div class="kv"><span class="k">Voice consent</span>${this.consentPill(e.consentVoice===!0)}</div>`:D}
            </div>
          </div>
        </div>
      </div>
    `:z`<div class="detail"><div class="pick">Select a contact</div></div>`}renderContext(){let e=this.selected();if(!e)return z`<aside class="ctx"></aside>`;let l=e.consentSms!=null||e.consentVoice!=null;return z`
      <aside class="ctx">
        ${l?z`
              <h4>Consent</h4>
              ${e.consentSms!=null?z`<div class="kv"><span class="k">SMS</span>${this.consentPill(e.consentSms===!0)}</div>`:D}
              ${e.consentVoice!=null?z`<div class="kv"><span class="k">Voice</span>${this.consentPill(e.consentVoice===!0)}</div>`:D}
            `:D}
        ${e.stage?z`
              <h4>Pipeline</h4>
              <div class="kv"><span class="k">Stage</span><span>${e.stage}</span></div>
            `:D}
        ${e.owner?z`
              <h4>Owner</h4>
              <div class="kv"><span class="k">Assigned</span><span>${e.owner}</span></div>
            `:D}
      </aside>
    `}};r1.styles=[X.styles,r2`
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
    `],C([w({attribute:!1})],r1.prototype,"contacts",2),C([w({type:String,attribute:"selected-id"})],r1.prototype,"selectedId",2),C([w({type:String})],r1.prototype,"token",2),C([w({type:String,attribute:"api-base"})],r1.prototype,"apiBase",2),C([w({type:Boolean})],r1.prototype,"loading",2),C([w({type:String,attribute:"error-message"})],r1.prototype,"errorMessage",2),r1=C([p2("dc-contact-hub")],r1)});function m1(r,s){let e=String(r||h1).replace(/\/$/,"");return s.charAt(0)==="/"?e+s:e+"/"+s}function x4(r,s){return m1(r,"/contact/public/contacts/"+encodeURIComponent(s))}function P3(r,s){return m1(r,"/contact/public/contacts/"+encodeURIComponent(s)+"/timeline")}function Y0(r){return m1(r,"/boards/public/boards")}function J0(r,s){return m1(r,"/boards/public/pipelines/"+encodeURIComponent(s)+"/snapshot")}function _8(r,s){return m1(r,"/contact/public/lists/"+encodeURIComponent(s)+"/contacts")}function R3(r){return m1(r,"/contact/public/contacts")}function Rt(r,s,e){let l=s||{},n=[];for(let a=0;a<e.length;a++){let o=l[e[a]];o!=null&&o!==""&&n.push(encodeURIComponent(e[a])+"="+encodeURIComponent(String(o)))}return n.length?r+"?"+n.join("&"):r}function Po(r,s){return Rt(R3(r),s,Ro)}function Do(r,s){return Rt(m1(r,"/contact/public/contacts/search"),s,Io)}function $o(r,s){return m1(r,"/contact/public/contacts/"+encodeURIComponent(s)+"/owner")}function Uo(r,s){return m1(r,"/contact/public/contacts/"+encodeURIComponent(s)+"/disposition")}function Fo(r,s){return m1(r,"/contact/public/contacts/"+encodeURIComponent(s)+"/lists")}function Q0(r,s){return m1(r,"/contact/public/contacts/"+encodeURIComponent(s)+"/lists/move")}function It(r,s){return m1(r,"/boards/public/boards/"+encodeURIComponent(s)+"/lists")}function x1(){return{get:function(r,s){return v8("GET",r,void 0,s)},post:function(r,s,e){return v8("POST",r,s,e)},put:function(r,s,e){return v8("PUT",r,s,e)}}}function v8(r,s,e,l){let n={method:r,headers:l||{}};return e!==void 0&&(n.body=JSON.stringify(e)),fetch(s,n).then(function(a){return a.json().catch(function(){return{}}).then(function(o){if(!a.ok){let h=_2({status:a.status,payload:o},"Request failed ("+a.status+")"),m=new Error(h.message);throw m.status=a.status,m.code=h.code,m.payload=o,m}return o})})}function f2(r){return!r||typeof r!="object"?r:r.data!==void 0?r.data:r}function D2(r){return{"Content-Type":"application/json",Authorization:"Bearer "+r}}function Ho(r){typeof window>"u"||(window.DropCowboy=window.DropCowboy||{},window.DropCowboy.contacts=r)}function Oo(r){let s=r||{};if(s.fields||s.field_map||s.values||s.field_values){let a={fields:s.fields||s.field_map,values:s.values||s.field_values};return s.add_list_ids&&(a.add_list_ids=s.add_list_ids),s.add_tag_ids&&(a.add_tag_ids=s.add_tag_ids),s.owner&&(a.owner=s.owner),s.conflict_mode&&(a.conflict_mode=s.conflict_mode),a}let e=[],l=[];for(let a=0;a<At.length;a++){let o=At[a];s[o]!=null&&s[o]!==""&&(e.push({type:o}),l.push(s[o]))}s.phone&&!s.main_phone&&(e.push({type:"main_phone"}),l.push(s.phone));let n={fields:e,values:[l]};return s.add_list_ids&&(n.add_list_ids=s.add_list_ids),s.add_tag_ids&&(n.add_tag_ids=s.add_tag_ids),s.owner&&(n.owner=s.owner),n}function L4(r,s){if(!r)return"";if(r[s]!=null&&r[s]!=="")return r[s];let e=r.field_data||[];for(let l=0;l<e.length;l++)if(e[l]&&e[l].type===s)return e[l].value;return""}function Bo(r){let s=String(r||"").trim().split(/\s+/),e="";for(let l=0;l<s.length&&e.length<2;l++)s[l]&&(e+=s[l].charAt(0));return e.toUpperCase()||"?"}function qo(r){let s=String(r||"").replace(/\D/g,""),e=s.length===11&&s.charAt(0)==="1"?s.slice(1):s;return e.length===10?"("+e.slice(0,3)+") "+e.slice(3,6)+"-"+e.slice(6):String(r||"")}function Et(r){return typeof r=="boolean"?r:void 0}function G1(r){let e=(r&&r.contact?r.contact:r)||{},l=e.first_name||L4(e,"first_name")||"",n=e.last_name||L4(e,"last_name")||"",a=e.main_phone||L4(e,"main_phone")||"";if(!a&&Array.isArray(e.phone_numbers)&&e.phone_numbers.length){let _=e.phone_numbers[0];a=typeof _=="string"?_:_&&_.phone_number||""}let o=String(e.email||L4(e,"email")||""),h=[l,n].filter(Boolean).join(" ")||e.name||"",m=h,v=Bo(h);return!h&&o?(m=o,v=o.charAt(0).toUpperCase()):!h&&a?(m=qo(a),v="#"):h||(m="Unknown"),{id:e.contact_id||e.id,name:m,phone:String(a||""),email:o,company:e.company||L4(e,"company")||"",stage:e.stage||L4(e,"stage")||"",owner:e.owner||"",initials:v,consentSms:Et(e.has_sms_consent),consentVoice:Et(e.has_tcpa_consent),source:e.first_touch&&e.first_touch.source||""}}function Go(r){let s=String(r||"").toLowerCase();return s==="sms"||s.indexOf("sms")!==-1?"sms":s==="call"||s.indexOf("call")!==-1?"call":s.indexOf("rvm")!==-1||s.indexOf("voicemail")!==-1?"rvm":s.indexOf("email")!==-1?"email":s.indexOf("chat")!==-1?"chat":s.indexOf("consent")!==-1?"consent":s.indexOf("web_form")!==-1||s==="form"?"form":s==="note"||s.indexOf("note")!==-1?"note":"system"}function Wo(r){if(r==null||r==="")return"";let s=typeof r=="number"?r:Date.parse(r);if(!s||Number.isNaN(s))return String(r);try{return new Date(s).toLocaleString()}catch{return""}}function Vo(r){let s=r||{};return{id:s.timeline_id||s.id||String(s.created_at||""),kind:Go(s.type||s.timeline_type),text:s.text||s.body||s.note||s.preview||s.type||"Activity",when:Wo(s.created_at),actor:s.actor||s.user_name||""}}function D3(r){let s=f2(r),e=Array.isArray(s)?s:s&&s.entries||[],l=[];for(let n=0;n<e.length;n++)l.push(Vo(e[n]));return l}function C8(r){let s=f2(r);return!!s&&typeof s=="object"&&Number(s.skipped)>0}function L8(){let r=new Error("This contact could not be moved to that stage because it belongs to a different brand than the stage list.");return r.code=jo,r}function x8(r,s,e,l){if(!Array.isArray(r)||!s||e===l)return null;let n=null,a=!1;for(let h=0;h<r.length;h++){let m=r[h];if(m.id===l&&(a=!0),m.id===e)for(let v=0;v<m.deals.length;v++)m.deals[v].id===s&&(n=m.deals[v])}if(!n||!a)return null;let o=[];for(let h=0;h<r.length;h++){let m=r[h];if(m.id===e){let v=[];for(let _=0;_<m.deals.length;_++)m.deals[_].id!==s&&v.push(m.deals[_]);o.push({id:m.id,label:m.label,tone:m.tone,deals:v})}else m.id===l?o.push({id:m.id,label:m.label,tone:m.tone,deals:[n].concat(m.deals)}):o.push(m)}return o}function Ko(r){if(!r)return"";let s=typeof r=="number"?r:Date.parse(r);if(!s||Number.isNaN(s))return"";let e=Date.now()-s,l=Math.max(0,Math.round(e/6e4));if(l<60)return l+"m";let n=Math.round(l/60);return n<48?n+"h":Math.round(n/24)+"d"}function Yo(r,s){let e=G1(r),l=Number(L4(r,"deal_value")||0);return{id:e.id,contact:e,value:l>1e3?Math.round(l/100):l,channel:s||"sms",age:Ko(r&&(r.modified_at||r.created_at))}}function Z0(r,s){let e=r&&r.stages||[],l=[];for(let n=0;n<e.length;n++){let a=e[n]||{},o=a.list_id,h=s&&s[o]||[],m=[];for(let v=0;v<h.length;v++)m.push(Yo(h[v]));l.push({id:o,label:a.name||a.label||"Stage "+(n+1),tone:kt[n%kt.length],deals:m})}return l}function e6(r,s){let e=String(s||z8).replace(/\/$/,""),l=r?String(r).charAt(0)==="#"?r:"#"+r:"#/contacts",n=e+l;return typeof window<"u"&&typeof window.open=="function"&&window.open(n,"_blank","noopener"),n}function b8(r){return new X0(r||M8)}function g1(){return I3||(I3=b8(M8)),I3}async function Pt(r){return g1().init(r)}function Dt(r){g1().setTheme(r)}function $t(r){return g1().addErrorListener(r)}function Xo(r){return g1().setToken(r)}async function Ut(r){return g1().openContact(r)}async function Ft(r){return g1().openBoard(r)}async function Jo(r){return g1().listContacts(r)}async function Qo(r){return g1().searchContacts(r)}async function Ht(r){return g1().openHub(r)}async function Ot(r){return g1().createContact(r)}async function Bt(r,s){return g1().updateContact(r,s)}async function qt(r,s,e){return g1().moveCard(r,s,e)}async function Gt(){let r=I3;I3=null,r&&await r.close()}var M8,I3,z8,h1,Ro,Io,At,jo,kt,X0,C4=F(()=>{"use strict";z1();K1();p4();F1();M8={},I3=null,z8="https://dropcowboy.com/app",h1=L2;Ro=["limit","offset","search_term","list_id","disposition","owner","brand_id","sort_by","sort_order"],Io=["phone","email","limit","offset","brand_id"];At=["first_name","last_name","main_phone","email","company","stage"];jo="move_skipped";kt=["info","warning","online","neutral","danger"];X0=class{constructor(s){this.http=s&&s.http||M8.http||x1(),this.token=null,this.session=null,this.el=null,this.apiBase=h1,this.portalBase=z8,this.teamId=null,this.theme={},this.errorListeners=[]}async init(s){if(!s1(s))throw new Error("init({ token }) requires a site token from POST /embed/token");this.apiBase=s.contactApiBase||s.apiBase||h1,this.portalBase=s.portalBase||z8,this._releaseSession(),this.session=c1(s,e=>this._applyToken(e)),this._applyToken(await l1(this.session))}setToken(s){if(!this.session)throw new Error("Call init({ token }) before setToken");return this.session.manager.setToken(s)}getTokenManager(){return this.session?this.session.manager:null}_applyToken(s){this.token=s||null;let e=B2(s);this.teamId=e.team_id||null,this.el&&s&&this.el.token!==s&&(this.el.token=s)}_releaseSession(){this.session&&(this.session.release(),this.session=null)}_authed(s){if(!this.session||!this.token)throw new Error("init({ token }) is required for /contact/public and /boards/public");return this.session.manager.withAuthRetry(e=>s(D2(e)))}setTheme(s){this.theme=Object.assign({},this.theme,s||{}),this.theme.primary&&!this.theme.primaryColor&&(this.theme.primaryColor=this.theme.primary),o1(this.theme)}getTheme(){return this.theme}credHeaders(){if(!this.token)throw new Error("init({ token }) is required for /contact/public and /boards/public");return D2(this.token)}addErrorListener(s){return this.errorListeners.push(s),()=>{this.errorListeners=this.errorListeners.filter(function(e){return e!==s})}}async openContact(s){if(!s)throw new Error("openContact(contactId) requires a contact id");let e=await this._authed(o=>this.http.get(x4(this.apiBase,s),o)),l=f2(e),n=G1(l),a=[];try{a=D3(await this._authed(o=>this.http.get(P3(this.apiBase,s),o)))}catch{a=[]}return{contact:n,timeline:a}}async listContacts(s){let e=await this._authed(l=>this.http.get(Po(this.apiBase,s),l));return f2(e)}async searchContacts(s){let e=s||{};if(!e.phone&&!e.email)throw new Error("searchContacts({ phone, email }) needs a phone or an email");let l=await this._authed(n=>this.http.get(Do(this.apiBase,e),n));return f2(l)}async openHub(s){if(!this.token)throw new Error("Call init({ token }) before openHub()");(typeof customElements>"u"||!customElements.get("dc-contact-hub"))&&await Promise.resolve().then(()=>(g8(),Nt));let e=s||{},l=this._resolveContainer(e.container),n=l;return(!l.tagName||String(l.tagName).toLowerCase()!=="dc-contact-hub")&&(n=l.querySelector&&l.querySelector("dc-contact-hub"),!n&&l.appendChild&&(n=document.createElement("dc-contact-hub"),l.appendChild(n))),n&&(n.token=this.token,n.apiBase=this.apiBase,this.el=n),n}_resolveContainer(s){if(typeof document>"u")throw new Error("openHub() requires a browser document");if(!s)return document.body;if(typeof s=="string"){let e=document.querySelector(s);if(!e)throw new Error("openHub() container not found");return e}return s}async openBoard(s){let e=s,l="Pipeline";if(!e){let m=await this._authed(u=>this.http.get(Y0(this.apiBase),u)),v=f2(m),_=Array.isArray(v)?v:v&&v.boards||[];if(!_.length)return{boardName:l,lanes:[]};e=_[0].board_id||_[0].id,l=_[0].name||l}let n=await this._authed(m=>this.http.get(J0(this.apiBase,e),m)),a=f2(n)||{};a.name&&(l=a.name);let o={},h=a.stages||[];for(let m=0;m<h.length;m++){let v=h[m]&&h[m].list_id;if(!v)continue;let _=await this._authed(k=>this.http.get(_8(this.apiBase,v),k)),u=f2(_);o[v]=u&&u.contacts||(Array.isArray(u)?u:[])}return{boardId:e,boardName:l,lanes:Z0(a,o)}}async createContact(s){let e=await this._authed(l=>this.http.post(R3(this.apiBase),Oo(s),l));return f2(e)}async updateContact(s,e){if(!s)throw new Error("updateContact(contactId, contact) requires a contact id");let l={contact:e&&e.contact?e.contact:e||{}},n=await this._authed(a=>this.http.put(x4(this.apiBase,s),l,a));return f2(n)}async setOwner(s,e){if(!s)throw new Error("setOwner(contactId, ownerId) requires a contact id");let l=await this._authed(n=>this.http.put($o(this.apiBase,s),{owner_id:e},n));return f2(l)}async setDisposition(s,e){if(!s)throw new Error("setDisposition(contactId, disposition) requires a contact id");let l=await this._authed(n=>this.http.put(Uo(this.apiBase,s),{disposition:e},n));return f2(l)}async addToList(s,e){if(!s)throw new Error("addToList(contactId, listIds) requires a contact id");let l=Array.isArray(e)?e:[e],n=await this._authed(a=>this.http.post(Fo(this.apiBase,s),{list_ids:l},a));return f2(n)}async moveCard(s,e,l){if(!s||!e||!l)throw new Error("moveCard(contactId, fromListId, toListId) requires contact and list ids");let n=await this._authed(a=>this.http.post(Q0(this.apiBase,s),{from_list_id:e,to_list_id:l},a));if(C8(n))throw L8();return f2(n)}async createBoard(s){let e=s||{},l={name:e.name,lists:e.lists};e.brand_id&&(l.brand_id=e.brand_id),e.shared_across_brands!=null&&(l.shared_across_brands=e.shared_across_brands);let n=await this._authed(a=>this.http.post(Y0(this.apiBase),l,a));return f2(n)}async addBoardList(s,e){if(!s)throw new Error("addBoardList(boardId, list) requires a board id");let l=await this._authed(n=>this.http.post(It(this.apiBase,s),{list:e},n));return f2(l)}openInPortal(s){return e6(s||"#/contacts",this.portalBase)}async close(){this._releaseSession(),this.token=null,this.el=null,this.errorListeners=[]}};Ho({init:Pt,setTheme:Dt,addErrorListener:$t,openContact:Ut,openBoard:Ft,openHub:Ht,listContacts:Jo,searchContacts:Qo,createContact:Ot,updateContact:Bt,moveCard:qt,setToken:Xo,close:Gt,createEmbedContacts:b8})});var i1,S8=F(()=>{"use strict";P2();X2();X1();Q2();m8();C4();i1=class extends X{constructor(){super(...arguments);this.events=[];this.loading=!1;this.contactId="";this.token="";this.tokenManager=null;this.apiBase="";this.errorMessage="";this.http=x1();this.fetchGen=0}updated(e){(e.has("contactId")||e.has("tokenManager")||e.has("token")&&!this.tokenManager)&&this.reload()}async reload(){if(!this.contactId||!this.token&&!this.tokenManager)return;let e=this.contactId,l=P3(this.apiBase||h1,e),n=++this.fetchGen;this.loading=!0,this.errorMessage="";try{let a=this.tokenManager?await this.tokenManager.withAuthRetry(o=>this.http.get(l,D2(o))):await this.http.get(l,D2(this.token));n===this.fetchGen&&(this.events=D3(a))}catch(a){if(n!==this.fetchGen)return;let o=_2(a,"Activity could not be loaded.");this.events=[],this.errorMessage=o.message,this.dispatchEvent(new CustomEvent("dc-error",{detail:{code:o.code,message:o.message,reason:o.reason,contact_id:e},bubbles:!0,composed:!0}))}finally{n===this.fetchGen&&(this.loading=!1)}}render(){return z`
      <section class="wrap dc-panel" aria-label="Activity timeline" aria-busy=${this.loading?"true":"false"}>
        <div class="head">Activity<span class="sp"></span><span class="dc-light dc-xs">all channels</span></div>
        ${this.loading?this.renderSkeleton():this.renderEvents()}
      </section>
    `}renderEvents(){return this.errorMessage?z`<div class="note err" role="alert">${this.errorMessage}</div>`:this.events.length?z`
      ${E2(this.events,e=>e.id,e=>{let l=K0.glyph(e.kind);return z`<div class="ev">
            <span class="dot" style="background:${l.bg}">${l.content}</span>
            <div class="tx">${e.text}<div class="tt">${e.when}${e.actor?` \xB7 ${e.actor}`:""}</div></div>
          </div>`})}
    `:z`<div class="note">No activity yet.</div>`}renderSkeleton(){return z`
      ${[0,1,2].map(e=>z`<div class="ev">
          <span class="dot" style="background:var(--dc-surface-2)"></span>
          <div class="tx" style="display:flex;flex-direction:column;gap:6px">
            <span class="skel" style="width:${70-e*8}%"></span>
            <span class="skel" style="width:30%"></span>
          </div>
        </div>`)}
    `}};i1.styles=[X.styles,r2`
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
    `],C([w({attribute:!1})],i1.prototype,"events",2),C([w({type:Boolean})],i1.prototype,"loading",2),C([w({type:String,attribute:"contact-id"})],i1.prototype,"contactId",2),C([w({type:String})],i1.prototype,"token",2),C([w({attribute:!1})],i1.prototype,"tokenManager",2),C([w({type:String,attribute:"api-base"})],i1.prototype,"apiBase",2),C([w({type:String,attribute:"error-message"})],i1.prototype,"errorMessage",2),i1=C([p2("dc-contact-timeline")],i1)});var $2,Wt=F(()=>{"use strict";P2();X2();Q2();S8();C4();$2=class extends X{constructor(){super(...arguments);this.timeline=[];this.loading=!1;this.source="";this.campaigns=!1;this.contactId="";this.token="";this.tokenManager=null;this.apiBase="";this.errorMessage="";this.http=x1();this.fetchGen=0}updated(e){(e.has("contactId")||e.has("tokenManager")||e.has("token")&&!this.tokenManager)&&this.loadContact()}authedGet(e){return this.tokenManager?this.tokenManager.withAuthRetry(l=>this.http.get(e,D2(l))):this.http.get(e,D2(this.token))}async loadContact(){if(!this.contactId)return;if(!this.token&&!this.tokenManager){this.errorMessage="token is required to load GET /contact/public/contacts/:id (init({ token }))";return}let e=++this.fetchGen;this.loading=!0,this.errorMessage="";let l=this.apiBase||h1;try{let n=await this.authedGet(x4(l,this.contactId));if(e!==this.fetchGen)return;let a=G1(f2(n));this.contact=a,this.consentSms=a.consentSms,this.consentVoice=a.consentVoice,this.source=a.source||"";try{let o=await this.authedGet(P3(l,this.contactId));if(e!==this.fetchGen)return;this.timeline=D3(o)}catch{this.timeline=[]}}catch(n){if(e!==this.fetchGen)return;this.errorMessage=_2(n,"Unable to load contact").message}finally{e===this.fetchGen&&(this.loading=!1)}}act(e){let l=this.contact,n=l?{contact_id:l.id||this.contactId||null,phone:l.phone||null,name:l.name}:void 0;this.dispatchEvent(new CustomEvent(e,{detail:n,bubbles:!0,composed:!0}))}render(){if(this.errorMessage&&!this.contact&&!this.loading)return z`<section class="dc-panel" aria-label="Contact error">
        <div class="err">${this.errorMessage}</div>
      </section>`;if(this.loading||!this.contact)return this.renderLoading();let e=this.contact;return z`
      <section class="dc-panel" aria-label="Contact ${e.name}">
        <div class="head">
          <span class="dc-avatar big">${e.initials??e.name.slice(0,2)}</span>
          <div class="who">
            <div class="nm">${e.name}</div>
            <div class="sub">${e.company??e.phone}</div>
          </div>
          <div class="acts">
            <button class="dc-iconbtn" title="Call" aria-label="Call ${e.name}" @click=${()=>this.act("dc-call")}>
              <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            </button>
            <button class="dc-iconbtn" title="Text" aria-label="Text ${e.name}" @click=${()=>this.act("dc-text")}>
              <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            </button>
            ${this.campaigns?z`<button class="dc-btn dc-secondary" aria-label="Add ${e.name} to a campaign" @click=${()=>this.act("dc-add-campaign")}>
                  <span class="label">Add to campaign</span>
                </button>`:D}
          </div>
        </div>
        <div class="body">
          <div class="sub-card">
            <div class="ch">Details</div>
            <div class="fields">
              <div class="kv"><span class="k">Phone</span><span>${e.phone}</span></div>
              <div class="kv"><span class="k">Stage</span><span>${e.stage||"\u2014"}</span></div>
              <div class="kv"><span class="k">Owner</span><span>${e.owner||"Unassigned"}</span></div>
              ${this.source?z`<div class="kv"><span class="k">Source</span><span>${this.source}</span></div>`:D}
              <div class="kv"><span class="k">SMS consent</span>${this.consentPill(this.consentSms)}</div>
              <div class="kv"><span class="k">Voice consent</span>${this.consentPill(this.consentVoice)}</div>
            </div>
          </div>
          <dc-contact-timeline .events=${this.timeline}></dc-contact-timeline>
        </div>
      </section>
    `}consentPill(e){return e===void 0?z`<span class="dc-pill" style="padding:2px 8px">Not recorded</span>`:e?z`<span class="dc-pill is-online" style="padding:2px 8px"><span class="dc-pdot"></span>Opted in</span>`:z`<span class="dc-pill is-danger" style="padding:2px 8px">Not opted in</span>`}renderLoading(){return z`
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
              ${[0,1,2,3].map(()=>z`<div class="kv"><span class="skel" style="width:70px"></span><span class="skel" style="width:90px"></span></div>`)}
            </div>
          </div>
          <dc-contact-timeline loading></dc-contact-timeline>
        </div>
      </section>
      ${D}
    `}};$2.styles=[X.styles,r2`
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
    `],C([w({attribute:!1})],$2.prototype,"contact",2),C([w({attribute:!1})],$2.prototype,"timeline",2),C([w({type:Boolean})],$2.prototype,"loading",2),C([w({type:Boolean})],$2.prototype,"consentSms",2),C([w({type:Boolean})],$2.prototype,"consentVoice",2),C([w({type:String})],$2.prototype,"source",2),C([w({type:Boolean,reflect:!0})],$2.prototype,"campaigns",2),C([w({type:String,attribute:"contact-id"})],$2.prototype,"contactId",2),C([w({type:String})],$2.prototype,"token",2),C([w({attribute:!1})],$2.prototype,"tokenManager",2),C([w({type:String,attribute:"api-base"})],$2.prototype,"apiBase",2),C([w({type:String,attribute:"error-message"})],$2.prototype,"errorMessage",2),$2=C([p2("dc-contact-card")],$2)});var Zo,G2,Vt=F(()=>{"use strict";P2();X2();X1();Q2();m8();C4();Zo={neutral:"var(--dc-text-light)",info:"var(--dc-info)",warning:"var(--dc-warning)",online:"var(--dc-online)",danger:"var(--dc-danger)"},G2=class extends X{constructor(){super(...arguments);this.lanes=[];this.boardName="";this.draggingId="";this.boardId="";this.token="";this.tokenManager=null;this.apiBase="";this.loading=!1;this.errorMessage="";this.http=x1();this.fetchGen=0;this.loadedBoardId="";this.dragFromLaneId="";this.dropLaneId=""}updated(e){(e.has("boardId")&&this.boardId!==this.loadedBoardId||e.has("tokenManager")||e.has("token")&&!this.tokenManager)&&this.loadBoard()}authedGet(e){return this.tokenManager?this.tokenManager.withAuthRetry(l=>this.http.get(e,D2(l))):this.http.get(e,D2(this.token))}async loadBoard(){if(!this.token&&!this.tokenManager)return;let e=++this.fetchGen;this.loading=!0,this.errorMessage="";let l=this.apiBase||h1;try{let n=this.boardId,a=this.boardName;if(!n){let _=await this.authedGet(Y0(l)),u=f2(_),k=Array.isArray(u)?u:u.boards||[];if(!k.length){e===this.fetchGen&&(this.lanes=[],this.loading=!1);return}n=k[0].board_id||k[0].id||"",a=k[0].name||a}let o=await this.authedGet(J0(l,n)),h=f2(o)||{};h.name&&(a=h.name);let m={},v=h.stages||[];for(let _=0;_<v.length;_++){let u=v[_]&&v[_].list_id;if(!u)continue;let k=await this.authedGet(_8(l,u)),b=f2(k);m[u]=b&&!Array.isArray(b)&&b.contacts||(Array.isArray(b)?b:[])}if(e!==this.fetchGen)return;this.loadedBoardId=n,this.boardId=n,this.boardName=a,this.lanes=Z0(h,m)}catch(n){if(e!==this.fetchGen)return;this.errorMessage=_2(n,"Unable to load pipeline").message}finally{e===this.fetchGen&&(this.loading=!1)}}canMove(){let e=this.tokenManager?this.tokenManager.current():this.token;return!!e&&k4(e,"lists:write")}openContact(e){let l={contact_id:e.contact.id,contactId:e.contact.id};this.dispatchEvent(new CustomEvent("dc-open-contact",{detail:l,bubbles:!0,composed:!0}))}onMoveSelect(e,l,n){let a=e.target,o=a.value;if(a.value="",!o)return;let h=this.moveCard(l.id,n.id,o);this.updateComplete.then(()=>this.focusMoveControl(l.id)),h.then(()=>this.updateComplete).then(()=>this.focusMoveControl(l.id))}focusMoveControl(e){if(!this.shadowRoot)return;let l=this.shadowRoot.querySelectorAll("[data-deal-id]");for(let n=0;n<l.length;n++)if(l[n].dataset.dealId===e){let a=l[n].querySelector(".move")||l[n].querySelector(".nm");a&&a.focus();return}}onDragStart(e,l,n){this.draggingId=l.id,this.dragFromLaneId=n.id,e.dataTransfer&&(e.dataTransfer.effectAllowed="move",e.dataTransfer.setData("text/plain",l.id))}onDragEnd(){this.draggingId="",this.dragFromLaneId="",this.dropLaneId=""}onDragOver(e,l){!this.draggingId||l.id===this.dragFromLaneId||(e.preventDefault(),e.dataTransfer&&(e.dataTransfer.dropEffect="move"),this.dropLaneId=l.id)}onDragLeave(e){this.dropLaneId===e.id&&(this.dropLaneId="")}onDrop(e,l){e.preventDefault();let n=this.draggingId,a=this.dragFromLaneId;this.onDragEnd(),this.moveCard(n,a,l.id)}async moveCard(e,l,n){let a=x8(this.lanes,e,l,n);if(!a||!this.canMove())return!1;this.lanes=a,this.errorMessage="";let o=Q0(this.apiBase||h1,e),h={from_list_id:l,to_list_id:n};try{let m=this.tokenManager?await this.tokenManager.withAuthRetry(_=>this.http.post(o,h,D2(_))):await this.http.post(o,h,D2(this.token));if(C8(m))throw L8();let v={contact_id:e,from_list_id:l,to_list_id:n};return this.dispatchEvent(new CustomEvent("dc-card-moved",{detail:v,bubbles:!0,composed:!0})),!0}catch(m){let v=x8(this.lanes,e,n,l);v&&(this.lanes=v);let _=_2(m,"The contact could not be moved.");return this.errorMessage=_.message,this.dispatchEvent(new CustomEvent("dc-error",{detail:{code:_.code,message:_.message,reason:_.reason,contact_id:e,from_list_id:l,to_list_id:n},bubbles:!0,composed:!0})),!1}}money(e){return e>=1e3?`$${Math.round(e/1e3)}k`:`$${e}`}laneSum(e){let l=0;for(let n of e.deals)l+=n.value;return l}totals(){let e=0,l=0;for(let n of this.lanes)e+=n.deals.length,l+=this.laneSum(n);return{open:e,value:l}}render(){let e=this.totals();return z`
      <div class="app">
        <div class="topbar">
          <h2>${this.boardName||"Pipeline"}</h2>
          ${this.loading?D:z`<span class="dc-pill is-info">${e.open} open · ${this.money(e.value)}</span>`}
          <span class="sp"></span>
          <button class="dc-btn" @click=${()=>e6("#/contacts")}>Open in portal</button>
        </div>
        ${this.errorMessage?z`<div class="err">${this.errorMessage}</div>`:D}
        ${this.loading?z`<div class="loadingpane" aria-busy="true">Loading pipeline…</div>`:z`<div class="board" role="list">
              ${E2(this.lanes,l=>l.id,l=>this.renderLane(l))}
            </div>`}
      </div>
    `}renderMoveControl(e,l,n){return z`<select
      class="move"
      aria-label="Move ${e.contact.name} to another stage"
      @click=${a=>a.stopPropagation()}
      @change=${a=>this.onMoveSelect(a,e,l)}
    >
      <option value="">Move to stage…</option>
      ${n.map(a=>z`<option value=${a.id}>${a.label}</option>`)}
    </select>`}renderLane(e){let l=this.canMove(),n=this.lanes.filter(a=>a.id!==e.id);return z`
      <div
        class="lane ${this.dropLaneId===e.id?"drop-target":""}"
        role="listitem"
        aria-label="${e.label} lane"
        @dragover=${a=>this.onDragOver(a,e)}
        @dragleave=${()=>this.onDragLeave(e)}
        @drop=${a=>this.onDrop(a,e)}
      >
        <div class="lane-h">
          <span class="dot" style="background:${Zo[e.tone]}"></span>${e.label}
          <span class="ct">${e.deals.length}</span>
          <span class="sum">${this.money(this.laneSum(e))}</span>
        </div>
        <div class="lane-body">
          ${e.deals.length?E2(e.deals,a=>a.id,a=>{let o=K0.glyph(a.channel),h=a.contact.company?`Open ${a.contact.name}, ${a.contact.company}`:`Open ${a.contact.name}`;return z`<div
                  class="card ${this.draggingId===a.id?"dragging":""}"
                  data-deal-id=${a.id}
                  draggable=${l?"true":"false"}
                  @click=${()=>this.openContact(a)}
                  @dragstart=${m=>this.onDragStart(m,a,e)}
                  @dragend=${()=>this.onDragEnd()}
                >
                  <button type="button" class="nm" aria-label=${h}>${a.contact.name}</button>
                  <div class="co">${a.contact.company??""}</div>
                  <div class="foot">
                    <span class="mini" style="background:${o.bg}">${o.content}</span>
                    <span class="dc-light dc-xs">${a.age}</span>
                    <span class="val">${this.money(a.value)}</span>
                  </div>
                  ${l&&n.length?this.renderMoveControl(a,e,n):D}
                </div>`}):z`<div class="empty">${l?"Drop contacts here":"No contacts in this stage"}</div>`}
        </div>
      </div>
    `}};G2.styles=[X.styles,r2`
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
    `],C([w({attribute:!1})],G2.prototype,"lanes",2),C([w({type:String})],G2.prototype,"boardName",2),C([w({type:String})],G2.prototype,"draggingId",2),C([w({type:String,attribute:"board-id"})],G2.prototype,"boardId",2),C([w({type:String})],G2.prototype,"token",2),C([w({attribute:!1})],G2.prototype,"tokenManager",2),C([w({type:String,attribute:"api-base"})],G2.prototype,"apiBase",2),C([w({type:Boolean})],G2.prototype,"loading",2),C([w({type:String,attribute:"error-message"})],G2.prototype,"errorMessage",2),C([M2()],G2.prototype,"dropLaneId",2),G2=C([p2("dc-pipeline-board")],G2)});var jt=F(()=>{"use strict";Wt();S8();Vt();g8();C4()});function Kt(r){return typeof window>"u"||!window.DropCowboy||!window.DropCowboy.confirmSpend?!0:typeof window.confirm!="function"?!1:window.confirm(r)===!0}var Yt=F(()=>{"use strict"});function Jt(r,s){let e=String(r||T8).replace(/\/$/,"");return s.charAt(0)==="/"?e+s:e+"/"+s}function Qt(r,s){let e=Jt(r,"/campaign/public/campaigns");if(!s)return e;let l=new URLSearchParams;s.status&&l.set("status",s.status),s.type&&l.set("type",s.type),s.search_term&&l.set("search_term",s.search_term),s.limit!=null&&l.set("limit",String(s.limit)),s.skip!=null&&l.set("skip",String(s.skip)),s.sort&&l.set("sort",s.sort),s.sort_by&&l.set("sort_by",s.sort_by),s.sort_order&&l.set("sort_order",s.sort_order);let n=l.toString();return n?e+"?"+n:e}function S4(r,s){return Jt(r,"/campaign/public/campaigns/"+encodeURIComponent(s))}function Zt(r,s){return S4(r,s)+"/start"}function er(r,s){return S4(r,s)+"/pause"}function ar(r,s,e){let l=S4(r,s)+"/stats";if(!e)return l;let n=new URLSearchParams;e.bucket_type&&n.set("bucket_type",e.bucket_type),e.start_ts!=null&&n.set("start_ts",String(e.start_ts)),e.end_ts!=null&&n.set("end_ts",String(e.end_ts));let a=n.toString();return a?l+"?"+a:l}function E8(){return{get:function(r,s){return Xt("GET",r,void 0,s)},post:function(r,s,e){return Xt("POST",r,s,e)}}}function Xt(r,s,e,l){let n={method:r,headers:l||{}};return e!==void 0&&(n.body=JSON.stringify(e)),fetch(s,n).then(function(a){return a.json().catch(function(){return{}}).then(function(o){if(!a.ok){let h=_2({status:a.status,payload:o},"Request failed ("+a.status+")"),m=new Error(h.message);throw m.status=a.status,m.code=h.code,m.payload=o,m}return o})})}function b4(r){return!r||typeof r!="object"?r:r.data!==void 0?r.data:r}function U3(r){return{"Content-Type":"application/json",Authorization:"Bearer "+r}}function ef(r){typeof window>"u"||(window.DropCowboy=window.DropCowboy||{},window.DropCowboy.campaigns=r)}function af(r){let s=String(r||"").toLowerCase();return s.indexOf("dial")!==-1||s==="predictive"||s==="progressive"||s==="preview"?"dialing":"bulk"}function sf(r){let s=String(r||"").toLowerCase();return s==="sms"||s==="mms"||s==="rcs"?"sms":s==="email"?"email":s.indexOf("voice_broadcast")!==-1||s==="voice"||s==="broadcast"?"voice-broadcast":s==="ai"||s.indexOf("ai_")===0?"ai-voice":s.indexOf("dial")!==-1?"power-dialer":"rvm"}function cf(r){let s=String(r||"").toLowerCase();return s==="active"||s==="live"||s==="running"?"live":s==="paused"||s==="insufficient_credit"?"paused":s==="complete"||s==="completed"||s==="done"?"completed":s==="scheduled"?"scheduled":"draft"}function F3(r){let s=r&&r.campaign||r||{},e=s.campaign_data||{},l=s.type||e.type||"rvm",n=e.status||s.status,a=Number(s.pending_count||e.pending_count||0),o=Number(s.success_count||e.success_count||0),h=Number(s.fail_count||e.fail_count||0),m=a+o+h,v=m>0?Math.round(o/m*100):void 0,_=e.name||s.name||"Campaign",u=Number(s.deliver_at),k=u>0&&u<Number.MAX_SAFE_INTEGER,b=cf(n);b==="draft"&&n==="not_started"&&k&&u>Date.now()&&(b="scheduled");let S={id:s.campaign_id||s.id,name:_,family:af(l),kind:sf(l),status:b,subtitle:l.toUpperCase()+(v!=null?" \xB7 "+v+"% sent":""),progressPct:v,rawStatus:n||"draft"};Array.isArray(e.list_ids)&&e.list_ids.length&&(S.listCount=e.list_ids.length);let y=e.caller_id&&typeof e.caller_id=="object"?e.caller_id.phone_number:e.caller_id;y&&(S.callerId=lf(y));let H=e.drip||{},u2=Number(H.rate);return(e.method==="drip"||s.delivery_type==="drip")&&u2>0&&(S.dripRate=u2),k&&(S.deliverAt=u),H.timezone&&(S.timezone=String(H.timezone)),typeof e.disable_tcpa_hours=="boolean"&&(S.quietHours=!e.disable_tcpa_hours),S}function lf(r){let s=String(r||"").replace(/\D/g,"");return s.length===11&&s.charAt(0)==="1"?"+1 ("+s.slice(1,4)+") "+s.slice(4,7)+"-"+s.slice(7):s.length===10?"+1 ("+s.slice(0,3)+") "+s.slice(3,6)+"-"+s.slice(6):String(r||"")}function k8(r,s){let e={weekday:"short",month:"short",day:"numeric",hour:"numeric",minute:"2-digit",timeZoneName:"short"};if(s)try{return new Intl.DateTimeFormat("en-US",Object.assign({timeZone:s},e)).format(r)}catch(l){if(!(l instanceof RangeError))throw l}return new Intl.DateTimeFormat("en-US",e).format(r)}function N8(r){if(!r||typeof r!="object")return[];if(Array.isArray(r)){let l=[];for(let n=0;n<r.length;n++){let a=r[n];if(a&&a.label!=null&&a.value!=null){let o={label:String(a.label),value:String(a.value)};a.tone&&(o.tone=a.tone),l.push(o)}}return l}let s=[],e=Object.keys(w8);for(let l=0;l<e.length;l++){let n=e[l],a=r[n];typeof a=="number"&&Number.isFinite(a)?s.push({label:w8[n],value:String(a)}):typeof a=="string"&&a!==""&&s.push({label:w8[n],value:a})}return s}function sr(r){let s=r||{};return s.readonly?{canCreate:!1,canSend:!1}:s.token==null?{canCreate:!0,canSend:!0}:{canCreate:k4(s.token,"campaigns:write"),canSend:k4(s.token,"campaigns:send")}}function tf(r){if(!r)return document.body;if(typeof r=="string"){let s=document.querySelector(r);if(!s)throw new Error("open() container not found");return s}return r}function a6(r,s){let e=String(s||y8).replace(/\/$/,""),l=r?String(r).charAt(0)==="#"?r:"#"+r:"#/campaigns",n=e+l;return typeof window<"u"&&typeof window.open=="function"&&window.open(n,"_blank","noopener"),n}function R8(r){return new V4(r||A8)}function E1(){return $3||($3=R8(A8)),$3}async function cr(r){return E1().init(r)}function lr(r){E1().setTheme(r)}function tr(r){return E1().addErrorListener(r)}function rf(r){return E1().setToken(r)}async function rr(r){return E1().getStatus(r)}async function ir(r){return E1().list(r)}async function nr(r){return E1().start(r)}async function or(r){return E1().pause(r)}async function fr(r,s){return E1().getStats(r,s)}async function ur(r){return E1().open(r)}async function dr(){let r=$3;$3=null,r&&await r.close()}var A8,$3,y8,T8,w8,V4,H3=F(()=>{"use strict";z1();K1();Yt();p4();ie();F1();A8={},$3=null,y8="https://dropcowboy.com/app",T8=L2;w8={sent:"Sent",delivered:"Delivered",failed:"Failed",pending:"Pending",read:"Read",billable:"Billable",non_billable:"Non-billable",opened:"Opened",clicked:"Clicked",bounced:"Bounced",complained:"Complained"};V4=class{constructor(s){this.http=s&&s.http||A8.http||E8(),this.token=null,this.session=null,this.apiBase=T8,this.portalBase=y8,this.teamId=null,this.theme={},this.errorListeners=[]}async init(s){if(!s1(s))throw new Error("init({ token }) requires a site token from POST /embed/token");this.apiBase=s.campaignApiBase||s.apiBase||T8,this.portalBase=s.portalBase||y8,this._releaseSession(),this.session=c1(s,e=>this._applyToken(e)),this._applyToken(await l1(this.session))}setToken(s){if(!this.session)throw new Error("Call init({ token }) before setToken");return this.session.manager.setToken(s)}getTokenManager(){return this.session?this.session.manager:null}_applyToken(s){this.token=s||null;let e=B2(s);this.teamId=e.team_id||null}_releaseSession(){this.session&&(this.session.release(),this.session=null)}_authed(s){if(!this.session||!this.token)throw new Error("init({ token }) is required for /campaign/public");return this.session.manager.withAuthRetry(e=>s(U3(e)))}setTheme(s){this.theme=Object.assign({},this.theme,s||{}),this.theme.primary&&!this.theme.primaryColor&&(this.theme.primaryColor=this.theme.primary),o1(this.theme)}getTheme(){return this.theme}credHeaders(){if(!this.token)throw new Error("init({ token }) is required for /campaign/public");return U3(this.token)}addErrorListener(s){return this.errorListeners.push(s),()=>{this.errorListeners=this.errorListeners.filter(function(e){return e!==s})}}async list(s){let e=await this._authed(o=>this.http.get(Qt(this.apiBase,s),o)),l=b4(e),n=Array.isArray(l)?l:l&&l.campaigns||[],a=[];for(let o=0;o<n.length;o++)a.push(F3(n[o]));return a}async getStatus(s){if(!s)throw new Error("getStatus(campaignId) requires a campaign id");let e=await this._authed(l=>this.http.get(S4(this.apiBase,s),l));return F3(b4(e))}async start(s){if(!s)throw new Error("start(campaignId) requires a campaign id");let e=await this._authed(l=>this.http.post(Zt(this.apiBase,s),{},l));return b4(e)}async pause(s){if(!s)throw new Error("pause(campaignId) requires a campaign id");let e=await this._authed(l=>this.http.post(er(this.apiBase,s),{},l));return b4(e)}async getStats(s,e){if(!s)throw new Error("getStats(campaignId) requires a campaign id");let l=await this._authed(n=>this.http.get(ar(this.apiBase,s,e),n));return b4(l)}async open(s){if(!this.token)throw new Error("Call init({ token }) before open()");(typeof customElements>"u"||!customElements.get("dc-campaign-hub"))&&await Promise.resolve().then(()=>(I8(),pr));let e=s||{},l=document.createElement("dc-campaign-hub");l.tokenManager=this.getTokenManager(),l.readonly=e.readonly===!0,tf(e.container).appendChild(l);let a=this;return l.addEventListener("dc-campaign-select",function(o){let h=o&&o.detail&&o.detail.id;h&&a.getStats(h).then(function(m){l.stats=N8(m)}).catch(function(){l.stats=[]})}),l.addEventListener("dc-campaign-start",function(o){a._hubAction(l,"start",o&&o.detail&&o.detail.id)}),l.addEventListener("dc-campaign-pause",function(o){a._hubAction(l,"pause",o&&o.detail&&o.detail.id)}),await this._loadHub(l),l}async _loadHub(s){let e=[];try{e=await this.list({limit:20}),s.errorMessage=""}catch(a){this._reportHubError(s,a,"Campaigns could not be loaded.")}s.campaigns=e;let n=s.selectedId&&e.some(function(a){return a.id===s.selectedId})?s.selectedId:e.length&&e[0].id?e[0].id:"";if(n){s.selectedId=n;try{let a=N8(await this.getStats(n));a.length&&(s.stats=a)}catch{s.stats=[]}}}async _hubAction(s,e,l){if(!(!l||!Kt(e==="start"?"Start this campaign?":"Pause this campaign?"))){try{await(e==="start"?this.start(l):this.pause(l))}catch(a){this._reportHubError(s,a,e==="start"?"The campaign could not be started.":"The campaign could not be paused.");return}await this._loadHub(s)}}_reportHubError(s,e,l){let n=_2(e,l),a={code:n.code,message:n.message,reason:n.reason};s.errorMessage=n.message,s.dispatchEvent(new CustomEvent("dc-error",{detail:a,bubbles:!0,composed:!0}));for(let o=0;o<this.errorListeners.length;o++)this.errorListeners[o](a)}openInPortal(s){return a6(s||"#/campaigns",this.portalBase)}async close(){this._releaseSession(),this.token=null,this.errorListeners=[]}};ef({init:cr,setTheme:lr,addErrorListener:tr,list:ir,getStatus:rr,start:nr,pause:or,getStats:fr,open:ur,setToken:rf,close:dr,createEmbedCampaigns:R8})});var pr={};I6(pr,{DcCampaignHub:()=>U2});function hr(r){switch(r){case"live":return z`<span class="dc-pill is-online"><span class="dc-pdot"></span>Live</span>`;case"scheduled":return z`<span class="dc-pill is-info"><span class="dc-pdot"></span>Scheduled</span>`;case"paused":return z`<span class="dc-pill is-warning"><span class="dc-pdot"></span>Paused</span>`;case"draft":return z`<span class="dc-pill is-warning"><span class="dc-pdot"></span>Draft</span>`;default:return z`<span class="dc-pill"><span class="dc-pdot"></span>Done</span>`}}var s6,U2,I8=F(()=>{"use strict";P2();X2();X1();Q2();H3();s6={rvm:{icon:"voicemail",color:"#7c3aed"},"voice-broadcast":{icon:"bullhorn",color:"#2563eb"},sms:{icon:"sms",color:"#16a34a"},email:{icon:"envelope",color:"#0891b2"},"ai-voice":{icon:"robot",color:"#db2777"},"power-dialer":{icon:"phone",color:"#ea580c"}};U2=class extends X{constructor(){super(...arguments);this.readonly=!1;this.token="";this.tokenManager=null;this.campaigns=[];this.errorMessage="";this.selectedId="";this.filter="all";this.stats=[];this.feed=[];this.agents=[];this.createOpen=!1}get selected(){return this.campaigns.find(e=>e.id===this.selectedId)??this.campaigns[0]}get visible(){return this.filter==="all"?this.campaigns:this.filter==="running"?this.campaigns.filter(e=>e.status==="live"):this.filter==="scheduled"?this.campaigns.filter(e=>e.status==="scheduled"):this.campaigns.filter(e=>e.family===this.filter)}get controls(){let e=this.tokenManager?this.tokenManager.current()||"":this.token||null;return sr({token:e,readonly:this.readonly})}emit(e,l){this.dispatchEvent(new CustomEvent(e,{detail:l,bubbles:!0,composed:!0}))}create(e){this.createOpen=!1,this.emit("dc-campaign-create",{kind:e})}select(e){this.selectedId=e.id,this.dispatchEvent(new CustomEvent("dc-campaign-select",{detail:{id:e.id},bubbles:!0,composed:!0}))}setFilter(e){this.filter=e}renderList(){let e=this.selected,l=this.controls.canCreate;return z`
      <section class="list">
        <div class="lh">
          <h2>Campaigns</h2>
          ${l?z`<button
                class="dc-btn"
                style="padding:7px 12px"
                aria-haspopup="menu"
                aria-expanded=${this.createOpen?"true":"false"}
                @click=${()=>this.createOpen=!this.createOpen}
              >
                + New
              </button>`:D}
        </div>
        <div class="filters" role="tablist" aria-label="Campaign filter">
          ${["all","bulk","dialing","running","scheduled"].map(n=>z`<button
              class="f ${this.filter===n?"on":""}"
              role="tab"
              aria-selected=${this.filter===n}
              @click=${()=>this.setFilter(n)}
            >
              ${n==="all"?"All":n[0].toUpperCase()+n.slice(1)}
            </button>`)}
        </div>
        ${this.createOpen&&l?this.renderCreatePop():D}
        ${this.errorMessage&&this.visible.length?z`<div class="hub-err" role="alert">${this.errorMessage}</div>`:D}
        <div class="rows">
          ${this.visible.length?E2(this.visible,n=>n.id,n=>z`<button class="cmp ${e?.id===n.id?"sel":""}" @click=${()=>this.select(n)}>
                  <span class="tIcon" style="background:${s6[n.kind].color}">
                    ${J(s6[n.kind].icon)}
                  </span>
                  <div class="meta">
                    <div class="top"><span class="nm">${n.name}</span>${hr(n.status)}</div>
                    <div class="sub">${n.subtitle}</div>
                  </div>
                </button>`):z`<div class="empty">${this.errorMessage||"No campaigns match this filter."}</div>`}
        </div>
      </section>
    `}renderCreatePop(){return z`<div class="create-pop" role="menu" aria-label="New campaign type">
      <div class="ph">Bulk — fire from a list, no live agent</div>
      ${this.renderCreateItem("rvm","Ringless Voicemail","Drop a voicemail to the whole list")}
      ${this.renderCreateItem("voice-broadcast","Voice Broadcast","Play audio live with Press-1 transfer")}
      ${this.renderCreateItem("sms","SMS / MMS Broadcast","Text blast with merge variables")}
      ${this.renderCreateItem("ai-voice","AI Voice Broadcast","Conversational AI outbound")}
      <div class="ph">Dialing — launch agents into a session</div>
      ${this.renderCreateItem("power-dialer","Power Dialer session","Preview \xB7 Progressive \xB7 Predictive")}
    </div>`}renderCreateItem(e,l,n){return z`<div
      class="cc"
      role="menuitem"
      tabindex="0"
      @click=${()=>this.create(e)}
      @keydown=${a=>{(a.key==="Enter"||a.key===" ")&&(a.preventDefault(),this.create(e))}}
    >
      <span class="ci" style="background:${s6[e].color}">${J(s6[e].icon)}</span>
      <div><div class="nm">${l}</div><div class="ds">${n}</div></div>
    </div>`}renderSendControls(e){return this.controls.canSend?e.status==="live"?z`<button class="dc-iconbtn" title="Pause" aria-label="Pause ${e.name}" @click=${()=>this.emit("dc-campaign-pause",{id:e.id})}>
        ${J("pause")}
      </button>`:e.status==="paused"||e.status==="draft"?z`<button class="dc-iconbtn" title="Start" aria-label="Start ${e.name}" @click=${()=>this.emit("dc-campaign-start",{id:e.id})}>
        ${J("play")}
      </button>`:D:D}renderStats(){return z`<div class="stats">
      ${this.stats.map(e=>z`<div class="stat">
          <div class="v ${e.tone==="good"?"good":e.tone==="warn"?"warn":e.tone==="bad"?"bad":""}">
            ${e.value}
          </div>
          <div class="k">${e.label}</div>
        </div>`)}
    </div>`}renderBulkMonitor(e){return z`
      ${typeof e.progressPct=="number"?z`<div class="progress">
            <div class="pl">
              <span class="dc-muted">Delivery progress</span><strong>${e.progressPct}%</strong>
            </div>
            <div class="bar"><div class="fill" style="width:${e.progressPct}%"></div></div>
          </div>`:D}
      ${this.renderStats()}
      ${this.feed.length?z`<div class="card">
            <div class="ch">Live delivery feed<span class="sp"></span><span class="dc-light dc-xs">via Ably</span></div>
            ${E2(this.feed,l=>l.id,l=>z`<div class="frow">
                <span class="ic" style="background:#7c3aed">${J(l.icon)}</span>
                <div class="m"><div class="t">${l.title}</div><div class="s">${l.subtitle}</div></div>
                <span class="dc-light dc-xs">${l.when}</span>
              </div>`)}
          </div>`:D}
    `}renderDialingMonitor(){return z`
      ${this.renderStats()}
      ${this.agents.length?z`<div class="card">
            <div class="ch">
              Agents<span class="sp"></span>
            </div>
            ${E2(this.agents,e=>e.id,e=>z`<div class="frow">
                <span class="ava">${e.initials}</span>
                <div class="m"><div class="t">${e.name}</div><div class="s">${e.detail}</div></div>
                <span
                  class="agent-st ${e.state==="on-call"?"st-call":e.state==="wrap"?"st-wrap":"st-avail"}"
                >
                  ${e.state==="on-call"?"On call":e.state==="wrap"?"Wrap":"Available"}
                </span>
              </div>`)}
          </div>`:D}
    `}renderMonitor(){let e=this.selected;return e?z`
      <section class="mon">
        <div class="mh">
          <h2>${e.name} ${hr(e.status)}</h2>
          <span class="sp"></span>
          ${this.renderSendControls(e)}
        </div>
        <div class="mon-body">
          ${e.status==="draft"||e.status==="scheduled"?z`<div class="draft-note">
                ${e.status==="draft"?z`This campaign is still a draft — finish the wizard to pick an audience and audio, then launch.`:e.deliverAt?z`Scheduled — delivery starts <b>${k8(e.deliverAt,e.timezone)}</b>.
                        Stats will stream here once it goes live.`:z`Scheduled. Stats will stream here once it goes live.`}
              </div>`:e.family==="bulk"?this.renderBulkMonitor(e):this.renderDialingMonitor()}
        </div>
      </section>
    `:z`<div class="mon-body"><div class="draft-note">Select a campaign.</div></div>`}renderSetting(e,l){return z`<div class="kv"><span class="k">${e}</span><span>${l}</span></div>`}renderRail(e){if(!e)return D;let l=[];return e.callerId&&l.push(this.renderSetting("Caller ID",e.callerId)),e.dripRate&&l.push(this.renderSetting("Pace",`Drip \xB7 ${e.dripRate}/hr`)),e.deliverAt&&e.deliverAt>Date.now()&&l.push(this.renderSetting("Starts",k8(e.deliverAt,e.timezone))),typeof e.quietHours=="boolean"&&l.push(this.renderSetting("Quiet hours",e.quietHours?"On":"Off")),!e.listCount&&!l.length?D:z`
      <aside class="ctx" aria-label="Campaign settings">
        ${e.listCount?z`<h3>Audience</h3>${this.renderSetting("Lists",String(e.listCount))}`:D}
        ${l.length?z`<h3>Delivery</h3>${l}`:D}
      </aside>
    `}render(){let e=this.renderRail(this.selected);return z`
      <div class="app ${e===D?"no-rail":""}" role="region" aria-label="Campaign Hub">
        ${this.renderList()} ${this.renderMonitor()} ${e}
      </div>
    `}};U2.styles=[X.styles,r2`
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
    `],C([w({type:Boolean,reflect:!0})],U2.prototype,"readonly",2),C([w({type:String})],U2.prototype,"token",2),C([w({attribute:!1})],U2.prototype,"tokenManager",2),C([w({attribute:!1})],U2.prototype,"campaigns",2),C([w({type:String,attribute:"error-message"})],U2.prototype,"errorMessage",2),C([w({type:String,attribute:"selected-id"})],U2.prototype,"selectedId",2),C([w({type:String})],U2.prototype,"filter",2),C([w({attribute:!1})],U2.prototype,"stats",2),C([w({attribute:!1})],U2.prototype,"feed",2),C([w({attribute:!1})],U2.prototype,"agents",2),C([w({type:Boolean,attribute:"create-open"})],U2.prototype,"createOpen",2),U2=C([p2("dc-campaign-hub")],U2)});function nf(r){switch(r){case"live":return z`<span class="dc-pill is-online"><span class="dc-pdot"></span>Live</span>`;case"scheduled":return z`<span class="dc-pill is-info"><span class="dc-pdot"></span>Scheduled</span>`;case"paused":return z`<span class="dc-pill is-warning"><span class="dc-pdot"></span>Paused</span>`;case"completed":return z`<span class="dc-pill"><span class="dc-pdot"></span>Done</span>`;default:return z`<span class="dc-pill is-warning"><span class="dc-pdot"></span>Draft</span>`}}var O2,mr=F(()=>{"use strict";P2();X2();Q2();H3();O2=class extends X{constructor(){super(...arguments);this.campaignId="";this.token="";this.tokenManager=null;this.campaignApiBase="";this.name="";this.status="draft";this.subtitle="";this.loading=!1;this.errorMessage="";this.fetchGen=0;this.http=E8()}updated(e){(e.has("campaignId")||e.has("tokenManager")||e.has("token")&&!this.tokenManager)&&this.loadStatus()}async loadStatus(){if(!this.campaignId||!this.token&&!this.tokenManager)return;let e=++this.fetchGen;this.loading=!0,this.errorMessage="";let l=S4(this.campaignApiBase,this.campaignId);try{let n=this.tokenManager?await this.tokenManager.withAuthRetry(o=>this.http.get(l,U3(o))):await this.http.get(l,U3(this.token));if(e!==this.fetchGen)return;let a=F3(b4(n));this.name=a.name,this.status=a.status,this.subtitle=a.subtitle,this.progressPct=a.progressPct}catch(n){if(e!==this.fetchGen)return;let a=_2(n,"Unable to load campaign status");this.errorMessage=a.message,this.dispatchEvent(new CustomEvent("dc-error",{detail:{code:a.code,message:a.message,reason:a.reason,campaign_id:this.campaignId},bubbles:!0,composed:!0}))}finally{e===this.fetchGen&&(this.loading=!1)}}openPortal(){a6("#/campaigns"),this.dispatchEvent(new CustomEvent("dc-open-portal",{bubbles:!0,composed:!0}))}render(){return z`
      <section class="dc-panel card" aria-label="Campaign status">
        ${this.loading?z`<div class="sub">Loading campaign…</div>`:z`
              <div class="top">
                <div class="nm">${this.name||"Campaign"}</div>
                ${nf(this.status)}
              </div>
              <div class="sub">${this.subtitle||"Status from GET /campaign/public/campaigns/:id"}</div>
              ${typeof this.progressPct=="number"?z`<div class="bar"><div class="fill" style="width:${this.progressPct}%"></div></div>`:D}
              ${this.errorMessage?z`<div class="err">${this.errorMessage}</div>`:D}
              <button class="dc-btn" style="margin-top:12px" @click=${()=>this.openPortal()}>
                Open in portal
              </button>
              <p class="honest">
                Campaign create/edit wizards are not embedded. Manage sends, audiences, and compliance in
                DropCowboy.
              </p>
            `}
      </section>
    `}};O2.styles=[X.styles,r2`
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
    `],C([w({type:String,attribute:"campaign-id"})],O2.prototype,"campaignId",2),C([w({type:String})],O2.prototype,"token",2),C([w({attribute:!1})],O2.prototype,"tokenManager",2),C([w({type:String,attribute:"campaign-api-base"})],O2.prototype,"campaignApiBase",2),C([w({type:String})],O2.prototype,"name",2),C([w({type:String})],O2.prototype,"status",2),C([w({type:String})],O2.prototype,"subtitle",2),C([w({type:Number,attribute:"progress-pct"})],O2.prototype,"progressPct",2),C([w({type:Boolean})],O2.prototype,"loading",2),C([w({type:String,attribute:"error-message"})],O2.prototype,"errorMessage",2),C([M2()],O2.prototype,"fetchGen",2),O2=C([p2("dc-campaign-status")],O2)});var gr=F(()=>{"use strict";I8();mr();H3()});function P8(){return typeof crypto<"u"&&typeof crypto.randomUUID=="function"?crypto.randomUUID():"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(r){let s=Math.random()*16|0;return(r==="x"?s:s&3|8).toString(16)})}function ff(r){let s=String(r||L2).replace(/\/$/,"");return s.endsWith("/phone")?s:s+"/phone"}function uf(r,s){return ff(r)+"/public/sms/thread/"+encodeURIComponent(s)+"?limit=50"}function l6(r){if(r==null||r==="")return null;if(typeof r=="string"||typeof r=="number"){let a=String(r).trim();return a?{contact_id:null,phone:a,name:""}:null}if(typeof r!="object")return null;let s=r.contact&&typeof r.contact=="object"?r.contact:{},e=r.contact_id||r.contactId||s.contact_id||s.id||r.id||null,l=r.phone||r.phone_number||r.number||s.phone||s.phone_number||"",n=r.name||s.name||[r.first_name||s.first_name,r.last_name||s.last_name].filter(Boolean).join(" ")||"";return!e&&!l?null:{contact_id:e?String(e):null,phone:String(l||"").trim(),name:n}}function df(r){if(typeof r=="number")return r;let s=Date.parse(r);return Number.isNaN(s)?0:s}function pf(r){let s=f2(r),e=Array.isArray(s)?s:s&&(s.smss||s.messages)||[],l=[];for(let n=0;n<e.length;n++){let a=e[n]||{},o=a.sms_type==="inbound";l.push({id:String(a.sms_id||a.id||P8()),author:o?"agent":"visitor",text:String(a.sms_body||a.body||""),ts:df(a.created_at),status:o?void 0:"sent",channel:"sms"})}return l.sort(function(n,a){return n.ts-a.ts}),l}function vr(){let r=new Map;return{on:function(s,e){let l=r.get(s);return l||(l=new Set,r.set(s,l)),l.add(e),function(){l.delete(e)}},off:function(s,e){let l=r.get(s);l&&l.delete(e)},emit:function(s,e){let l=r.get(s);if(l)for(let n of l)n(e)}}}function zr(r){return{id:r.contact_id||"",name:r.name||r.phone||"Unknown",phone:r.phone||""}}var of,c6,Mr=F(()=>{"use strict";p4();i8();z1();n8();C4();H3();of="campaigns_token_required";c6=class{constructor(s){let e=s||{};this.tokenManager=e.tokenManager||null,this.campaignsTokenManager=e.campaignsTokenManager||null,this.phoneApiBase=e.phoneApiBase||L2,this.apiBase=e.apiBase||this.phoneApiBase,this.campaignApiBase=e.campaignApiBase||this.apiBase,this.from=e.from||null,this.voiceIvrId=e.voiceIvrId||null,this.http=e.http||x1(),this.createDialer=e.createDialer||function(){return new A3},this.createMessenger=e.createMessenger||function(){return new E3},this.createCampaigns=e.createCampaigns||function(){return new V4},this.onEvent=e.onEvent||function(){},this.now=e.now||Date.now,this.dialer=null,this.dialerReady=null,this.dialerOffs=[],this.line=null,this.messenger=null,this.messengerReady=null,this.campaigns=null,this.campaignsReady=null,this.contactCache=new Map,this.conversation=null,this.dialerTransport=this._buildDialerTransport(),this.messengerTransport=this._buildMessengerTransport()}async configure(s){let e=s||{},l={phone:this.phoneApiBase,api:this.apiBase,campaign:this.campaignApiBase},n=["phoneApiBase","apiBase","campaignApiBase","from","voiceIvrId"];for(let a=0;a<n.length;a++)e[n[a]]!==void 0&&(this[n[a]]=e[n[a]]||null);this.phoneApiBase=this.phoneApiBase||L2,this.apiBase=this.apiBase||this.phoneApiBase,this.campaignApiBase=this.campaignApiBase||this.apiBase,l.phone!==this.phoneApiBase&&(await this._discardDialer(),await this._discardMessenger()),l.api!==this.apiBase&&this.contactCache.clear(),l.campaign!==this.campaignApiBase&&await this._discardCampaigns()}hasCampaigns(){return!!this.campaignsTokenManager}async resolveTarget(s){let e=l6(s);if(!e)throw this._fail("invalid_target","Pass a phone number or { contact_id } to the Dock.");if(e.contact_id&&(!e.phone||!e.name)){let l=await this.lookupContact(e.contact_id);return{contact_id:e.contact_id,phone:e.phone||l.phone,name:e.name||l.name}}return e}async lookupContact(s){if(this.contactCache.has(s))return this.contactCache.get(s);let l=await this._requireManager().withAuthRetry(a=>this.http.get(x4(this.apiBase,s),D2(a))),n=G1(f2(l));return this.contactCache.set(s,n),n}async placeCall(s){let e;try{e=await this.resolveTarget(s)}catch(n){return this.report("dialer",n,"Could not look up that contact.")}if(!e.phone)return this.report("dialer",this._fail("no_phone","This contact has no phone number to call."));if(this.line&&this.line.status!=="ended")return this.report("dialer",this._fail("line_busy","Finish the current call before placing another."));let l={id:P8(),status:"dialing",direction:"outbound",number:e.phone,contact:zr(e)};this._setLine(l);try{await(await this._ensureDialer()).callPhone(e.phone,{contact:e.contact_id?zr(e):void 0})}catch(n){return await this._discardDialer(),this._setLine(Object.assign({},l,{status:"ended",endedAt:this.now()})),this.dialerTransport.emit("call:ended",{line:this.line,disposition:"failed",durationMs:0}),this.report("dialer",n,"The call could not be placed.")}return this.onEvent("call-started",{number:e.phone,contact_id:e.contact_id,line_id:l.id}),l}async hangup(){this.dialer&&this.dialer.sip&&typeof this.dialer.sip.hangup=="function"&&await this.dialer.sip.hangup()}async openConversation(s){let e=await this.resolveTarget(s);if(!e.phone)throw this._fail("no_phone","This contact has no phone number to text.");this.conversation=e;let l=[];if(e.contact_id)try{l=await this.loadThread(e.contact_id)}catch(n){this.report("messages",n,"Earlier messages could not be loaded.")}return{target:e,messages:l}}async loadThread(s){let l=await this._requireManager().withAuthRetry(n=>this.http.get(uf(this.phoneApiBase,s),D2(n)));return pf(l)}async sendText(s){let e=this.conversation;if(!e||!e.phone)throw this._fail("no_conversation","Open a conversation with dock.text({ contact_id }) first.");let l=await this._ensureMessenger(),n={body:s,from:this.from||void 0,voiceIvrId:this.voiceIvrId||void 0};e.contact_id&&(n.contactId=e.contact_id);let a=await l.sendMessage(e.phone,n);return{to:e.phone,contact_id:e.contact_id,sms_id:a&&(a.sms_id||a.id)||null}}async listCampaigns(){return(await this._ensureCampaigns()).list()}async close(){await this._discardDialer(),await this._discardMessenger(),await this._discardCampaigns(),this.contactCache.clear(),this.conversation=null}async setTokenManager(s){s!==this.tokenManager&&(this.tokenManager=s||null,await this._discardDialer(),await this._discardMessenger(),this.contactCache.clear())}async setCampaignsTokenManager(s){s!==this.campaignsTokenManager&&(this.campaignsTokenManager=s||null,await this._discardCampaigns())}_requireManager(){if(!this.tokenManager)throw this._fail("not_initialized","Call DropCowboy.dock.init({ token }) before using the Dock.");return this.tokenManager}_ensureDialer(){if(this.dialerReady)return this.dialerReady;let s=this._requireManager(),e=this.createDialer();return this.dialer=e,this.dialerReady=e.init({tokenManager:s,phoneApiBase:this.phoneApiBase}).then(()=>(this._bindDialer(e),e)).catch(l=>{throw this.dialer===e&&(this.dialer=null,this.dialerReady=null),l}),this.dialerReady}_bindDialer(s){let e=s.sip;e&&typeof e.onRinging=="function"&&this.dialerOffs.push(e.onRinging(()=>this._patchLine({status:"ringing"},"call:ringing"))),e&&typeof e.onConnected=="function"&&this.dialerOffs.push(e.onConnected(()=>{this.line&&this.line.status!=="connected"&&this.line.status!=="hold"&&this._patchLine({status:"connected",connectedAt:this.now()},"call:answered")})),this.dialerOffs.push(s.addCallEndedListener(l=>{if(!this.line||this.line.status==="ended")return;let n=Object.assign({},this.line,{status:"ended",endedAt:this.now()});this._setLine(n),this.dialerTransport.emit("call:ended",{line:n,disposition:l.disposition,durationMs:l.durationMs||0}),this.onEvent("call-ended",{number:n.number,contact_id:n.contact&&n.contact.id?n.contact.id:null,line_id:n.id,disposition:l.disposition||null,duration_ms:l.durationMs||0})}))}async _discardDialer(){let s=this.dialer,e=this.dialerOffs;this.dialer=null,this.dialerReady=null,this.dialerOffs=[];for(let l=0;l<e.length;l++)typeof e[l]=="function"&&e[l]();s&&await s.close().catch(function(){})}_ensureMessenger(){if(this.messengerReady)return this.messengerReady;let s=this._requireManager(),e=this.createMessenger();return this.messenger=e,this.messengerReady=e.init({tokenManager:s,phoneApiBase:this.phoneApiBase,from:this.from||void 0,voiceIvrId:this.voiceIvrId||void 0}).then(()=>e).catch(l=>{throw this.messenger===e&&(this.messenger=null,this.messengerReady=null),l}),this.messengerReady}async _discardMessenger(){let s=this.messenger;this.messenger=null,this.messengerReady=null,s&&await s.close().catch(function(){})}_ensureCampaigns(){if(!this.campaignsTokenManager)return Promise.reject(this._fail(of,"Campaign status needs a token with the campaigns scope. Pass getCampaignsToken to DropCowboy.dock.init()."));if(this.campaignsReady)return this.campaignsReady;let s=this.createCampaigns();return this.campaigns=s,this.campaignsReady=s.init({tokenManager:this.campaignsTokenManager,campaignApiBase:this.campaignApiBase}).then(()=>s).catch(e=>{throw this.campaigns===s&&(this.campaigns=null,this.campaignsReady=null),e}),this.campaignsReady}async _discardCampaigns(){let s=this.campaigns;this.campaigns=null,this.campaignsReady=null,s&&await s.close().catch(function(){})}_setLine(s){this.line=s,this.dialerTransport.emit("call:updated",s)}_patchLine(s,e){if(!this.line||this.line.status==="ended")return;let l=Object.assign({},this.line,s);this.line=l,this.dialerTransport.emit(e,l),this.dialerTransport.emit("call:updated",l)}_sipControl(s,e,l){let n=this.dialer&&this.dialer.sip;return!n||typeof n[s]!="function"?(this.report("dialer",this._fail("not_supported",l+" is not available in this dialer.")),!1):n[s](e)!==!1}_buildDialerTransport(){let s=vr(),e=this;return{on:s.on,off:s.off,emit:s.emit,callPhone:function(l,n){let a=n&&n.contact;return e.placeCall(a&&a.id?{contact_id:a.id,phone:l,name:a.name}:l)},hangup:function(){return e.hangup()},setMute:async function(l,n){e._sipControl("setMuted",n,"Mute")&&e._patchLine({muted:n},"call:updated")},setHold:async function(l,n){e._sipControl("setHeld",n,"Hold")&&e._patchLine({onHold:n,status:n?"hold":"connected"},"call:updated")},sendDtmf:async function(l,n){e._sipControl("sendDtmf",n,"Keypad tones")},sendChatMessage:function(){return Promise.reject(new Error("The dialer pane does not send chat messages."))},sendMessage:function(){return Promise.reject(new Error("The dialer pane does not send messages."))},searchContactByPhone:function(){return Promise.resolve(null)},getConnectionState:function(){return"connected"}}}_buildMessengerTransport(){let s=vr(),e=this,l=async function(n){let a={id:P8(),author:"visitor",text:n,ts:e.now(),status:"sending",channel:"sms"};s.emit("chat:message",a);try{let o=await e.sendText(n),h=Object.assign({},a,{status:"sent"});return s.emit("chat:message",h),e.onEvent("message-sent",o),h}catch(o){let h=Object.assign({},a,{status:"failed"});return s.emit("chat:message",h),e.report("messages",o,"The message was not sent."),h}};return{on:s.on,off:s.off,emit:s.emit,callPhone:function(){return Promise.reject(new Error("The messages pane does not place calls."))},hangup:function(){return Promise.resolve()},setHold:function(){return Promise.resolve()},setMute:function(){return Promise.resolve()},sendDtmf:function(){return Promise.resolve()},sendChatMessage:l,sendMessage:l,searchContactByPhone:function(){return Promise.resolve(null)},getConnectionState:function(){return"connected"}}}_fail(s,e){let l=new Error(e);return l.code=s,l}report(s,e,l){let n=_2(e,l);return this.onEvent("error",{code:n.code,message:n.message,reason:n.reason,pane:s,consent:m3(n)}),null}}});var Cr={};I6(Cr,{DcDock:()=>s2});function _r(r){let s=r.trim().split(/\s+/),e="";for(let l=0;l<s.length&&e.length<2;l++)s[l]&&(e+=s[l].charAt(0));return e.toUpperCase()||"#"}function t6(r){let s=r.name||r.phone||"Unknown";return{id:r.contact_id||"",name:s,phone:r.phone,initials:_r(s)}}var $8,hf,mf,D8,gf,s2,U8=F(()=>{"use strict";P2();X2();Q2();pt();vt();yt();jt();gr();Mr();$8=["dialer","messages","inbox","contacts","pipeline","campaigns"],hf={fromAttribute:r=>{if(r===null||r.trim()==="")return null;let e=r.split(",").map(l=>l.trim().toLowerCase()).filter(Boolean).filter(l=>$8.includes(l));return e.length>0?e:null},toAttribute:r=>r&&r.length>0?r.join(","):null},mf=new Set(["inbox","contacts","campaigns","pipeline"]),D8=[{pane:"dialer",icon:"phone",label:"Dialer"},{pane:"messages",icon:"envelope",label:"Messages"},{pane:"inbox",icon:"inbox",label:"Inbox"},{pane:"contacts",icon:"user",label:"Contacts"},{pane:"pipeline",icon:"chart",label:"Pipeline"},{pane:"campaigns",icon:"bullhorn",label:"Campaigns"}],gf="https://dropcowboy.com/app/#/building-blocks";s2=class extends X{constructor(){super(...arguments);this.open=!1;this.mode="floating";this.viewport=!1;this.pane="dialer";this.panes=null;this.dockRole="agent";this.auth="in";this.settingsOpen=!1;this.wide=!1;this.unreadCount=0;this.partnerName="";this.contactId="";this.contact=null;this.tokenManager=null;this.campaignsTokenManager=null;this.campaignsUnavailableReason="";this.phoneApiBase="";this.apiBase="";this.campaignApiBase="";this.from="";this.voiceIvrId="";this.visited=new Set;this.notices={};this.sessionExpired=!1;this.campaignsExpired=!1;this.retrying=!1;this.threadTarget=null;this.thread=[];this.threadLoading=!1;this.campaignRows=null;this.campaignsLoading=!1;this.selectedCampaignId="";this.session=null;this.offTokenChange=null;this.offCampaignsTokenChange=null;this.contactLookupGen=0;this.onSessionExpired=()=>{this.tokenManager&&this.tokenManager.isExpired()&&(this.sessionExpired=!0),this.campaignsTokenManager&&this.campaignsTokenManager.isExpired()&&(this.campaignsExpired=!0)}}connectedCallback(){super.connectedCallback(),typeof window<"u"&&window.addEventListener(p3,this.onSessionExpired),this.requestUpdate()}disconnectedCallback(){if(super.disconnectedCallback(),typeof window<"u"&&window.removeEventListener(p3,this.onSessionExpired),this.watchManagers(null,null),this.session){let e=this.session;this.session=null,e.close()}}async dial(e){if(!this.paneEnabled("dialer")){this.raise("dialer","pane_disabled","The dialer pane is not enabled on this Dock.");return}this.open=!0,this.pane="dialer",this.clearNotice("dialer");let l=this.ensureSession();if(!l){this.raise("dialer","not_initialized","Call DropCowboy.dock.init({ token }) before dialing.");return}this.bindFromTarget(e),await l.placeCall(e)}async text(e){if(!this.paneEnabled("messages")){this.raise("messages","pane_disabled","The messages pane is not enabled on this Dock.");return}this.open=!0,this.pane="messages",this.clearNotice("messages");let l=this.ensureSession();if(!l){this.raise("messages","not_initialized","Call DropCowboy.dock.init({ token }) before texting.");return}this.bindFromTarget(e),this.threadLoading=!0;try{let n=await l.openConversation(e);this.threadTarget=n.target,this.thread=n.messages,n.target.contact_id&&!this.contact?.name&&this.applyContact(n.target)}catch(n){this.threadTarget=null,this.thread=[],this.raiseFrom("messages",n,"Could not open that conversation.")}finally{this.threadLoading=!1}}setContact(e){let l=e?l6(e):null;if(!l){this.contactId="",this.contact=null;return}this.applyContact(l)}async hangup(){this.session&&await this.session.hangup()}get effectiveWide(){return this.wide||mf.has(this.pane)}get activeNav(){let e=(this.panes||[]).filter(l=>$8.includes(l));return e.length>0?D8.filter(l=>e.includes(l.pane)):this.campaignsTokenManager||this.campaignsUnavailableReason?D8:D8.filter(l=>l.pane!=="campaigns")}paneEnabled(e){return this.activeNav.some(l=>l.pane===e)}willUpdate(e){if(e.has("panes")||e.has("pane")||e.has("campaignsTokenManager")||e.has("campaignsUnavailableReason")){let l=this.activeNav;l.length>0&&!l.some(n=>n.pane===this.pane)&&(this.pane=l[0].pane)}(e.has("tokenManager")||e.has("campaignsTokenManager"))&&this.watchManagers(this.tokenManager,this.campaignsTokenManager),e.has("tokenManager")&&(this.sessionExpired=!!this.tokenManager&&this.tokenManager.isExpired(),this.session&&this.session.setTokenManager(this.tokenManager),this.threadTarget=null,this.thread=[]),e.has("campaignsTokenManager")&&(this.campaignsExpired=!!this.campaignsTokenManager&&this.campaignsTokenManager.isExpired(),this.session&&this.session.setCampaignsTokenManager(this.campaignsTokenManager),this.campaignRows=null,this.selectedCampaignId=""),this.session&&(e.has("phoneApiBase")||e.has("apiBase")||e.has("campaignApiBase")||e.has("from")||e.has("voiceIvrId"))&&this.session.configure(this.sessionConfig()),e.has("contactId")&&(this.contact?.id||"")!==this.contactId&&(this.contactId?this.applyContact({contact_id:this.contactId,phone:"",name:""}):this.contact=null),this.ensureSession(),this.open&&!this.visited.has(this.pane)&&(this.visited=new Set(this.visited).add(this.pane)),this.open&&this.pane==="campaigns"&&this.campaignRows===null&&!this.campaignsLoading&&this.loadCampaigns()}updated(e){e.has("pane")&&this.fire("dc-pane-change",{pane:this.pane})}sessionConfig(){return{phoneApiBase:this.phoneApiBase||void 0,apiBase:this.apiBase||void 0,campaignApiBase:this.campaignApiBase||void 0,from:this.from||void 0,voiceIvrId:this.voiceIvrId||void 0}}ensureSession(){if(this.session)return this.session;if(!this.tokenManager||!this.isConnected)return null;let e=this.sessionConfig();return this.session=new c6({tokenManager:this.tokenManager,campaignsTokenManager:this.campaignsTokenManager,phoneApiBase:e.phoneApiBase,apiBase:e.apiBase,campaignApiBase:e.campaignApiBase,from:e.from,voiceIvrId:e.voiceIvrId,onEvent:(l,n)=>this.onSessionEvent(l,n)}),this.session}onSessionEvent(e,l){if(e==="error"){let n=l,a=$8.includes(n.pane)?n.pane:this.pane;this.setNotice(a,{kind:n.consent?"consent":"error",message:n.message}),this.fire("dc-error",{code:n.code,message:n.message,reason:n.reason,pane:a});return}e==="call-started"&&this.fire("dc-call-started",l),e==="call-ended"&&this.fire("dc-call-ended",l),e==="message-sent"&&this.fire("dc-message-sent",l)}watchManagers(e,l){this.offTokenChange&&this.offTokenChange(),this.offCampaignsTokenChange&&this.offCampaignsTokenChange(),this.offTokenChange=e?e.onTokenChange(()=>{this.sessionExpired=!1}):null,this.offCampaignsTokenChange=l?l.onTokenChange(()=>{this.campaignsExpired=!1}):null}async retrySession(e){if(!(!e||this.retrying)){this.retrying=!0;try{await e.refresh()}catch{}finally{this.retrying=!1}}}bindFromTarget(e){let l=l6(e);l&&l.contact_id&&l.contact_id!==this.contactId&&this.applyContact(l)}applyContact(e){if(!e.contact_id){this.contact=t6(e),this.contactId="";return}if(this.contactId=e.contact_id,this.contact=t6(e),e.name&&e.phone)return;let l=this.ensureSession();if(!l)return;let n=++this.contactLookupGen;l.lookupContact(e.contact_id).then(a=>{n!==this.contactLookupGen||this.contactId!==e.contact_id||(this.contact=t6({contact_id:e.contact_id,name:e.name||a.name,phone:e.phone||a.phone}))}).catch(a=>{n===this.contactLookupGen&&this.raiseFrom("contacts",a,"Could not load that contact.")})}async loadCampaigns(){let e=this.ensureSession();if(!(!e||!this.campaignsTokenManager)){this.campaignsLoading=!0,this.clearNotice("campaigns");try{this.campaignRows=await e.listCampaigns()}catch(l){this.campaignRows=[],this.raiseFrom("campaigns",l,"Could not load campaigns.")}finally{this.campaignsLoading=!1}}}selectContact(e,l,n,a){e&&(this.applyContact({contact_id:e,phone:l||"",name:n||""}),this.paneEnabled("contacts")&&(this.pane="contacts"),this.fire("dc-contact-selected",{contact_id:e,phone:l||null,source:a}))}onInboxSelect(e){let l=e.detail||{};l.contact_id&&this.selectContact(l.contact_id,l.phone||null,l.name||null,"inbox")}onPipelineOpen(e){e.stopPropagation();let l=e.detail&&(e.detail.contact_id||e.detail.contactId);l&&this.selectContact(l,null,null,"pipeline")}onCardAction(e,l){e.stopPropagation();let n=e.detail||{},a={contact_id:n.contact_id||this.contactId||void 0,phone:n.phone||void 0,name:n.name};l==="dial"?this.dial(a):this.text(a)}currentTarget(){return this.contactId?{contact_id:this.contactId,phone:this.contact?.phone,name:this.contact?.name}:this.contact?.phone?{phone:this.contact.phone,name:this.contact.name}:null}setNotice(e,l){this.notices=Object.assign({},this.notices,{[e]:l})}clearNotice(e){if(!this.notices[e])return;let l=Object.assign({},this.notices);delete l[e],this.notices=l}raise(e,l,n){this.onSessionEvent("error",{code:l,message:n,reason:null,pane:e,consent:!1})}raiseFrom(e,l,n){if(this.session){this.session.report(e,l,n);return}let a=l;this.raise(e,a&&a.code||"request_failed",a&&a.message||n)}fire(e,l){this.dispatchEvent(new CustomEvent(e,{detail:l,bubbles:!0,composed:!0}))}go(e){this.pane=e}setMode(e){this.mode=e,this.open=!0}toggleOpen(e){this.open=e,this.fire("dc-dock-toggle",{open:e})}renderHead(){return z`<div class="dock-head">
      <span class="dot"></span><span class="t">Drop Cowboy</span>
      <span class="rolepill ${this.dockRole==="admin"?"admin":""}">
        ${this.dockRole==="admin"?"Admin":"Agent"}
      </span>
      <span class="sp"></span>
      <div class="dockmodes" role="group" aria-label="Docking mode">
        ${[["floating","window-restore","Floating"],["pinned","table-columns","Pinned side rail"],["fill","expand","Fill container"]].map(([e,l,n])=>z`<button
            class="dm ${this.mode===e?"on":""}"
            title=${n}
            @click=${()=>this.setMode(e)}
          >
            ${J(l)}
          </button>`)}
      </div>
      <button
        class="dc-iconbtn widebtn ${this.wide?"on":""}"
        title=${this.wide?"Compact view":"Wide view"}
        @click=${()=>this.wide=!this.wide}
      >
        ${this.wide?J("window-compact"):J("window-wide")}
      </button>
      <button class="dc-iconbtn" title="Minimize" @click=${()=>this.toggleOpen(!1)}>
        ${J("minus")}
      </button>
    </div>`}renderCtx(e){let l=this.contact;if(!l)return D;let n=this.currentTarget();return z`<div class="ctx">
      <span class="ava">${l.initials??_r(l.name||"#")}</span>
      <div class="who">
        <div class="nm">${l.name||"Loading contact\u2026"}</div>
        <div class="meta">${l.phone||"No phone number on file"}</div>
      </div>
      ${e==="dial"&&n&&l.phone?z`<button class="dc-btn" @click=${()=>this.dial(n)}>${J("phone")} Call</button>`:D}
      ${e==="text"&&n&&l.phone?z`<button class="dc-btn dc-secondary" @click=${()=>this.text(n)}>${J("sms")} Text</button>`:D}
    </div>`}renderNotice(e){let l=this.notices[e];return l?l.kind==="consent"?z`<div class="notice consent" role="alert"><strong>Consent required</strong>${l.message}</div>`:z`<div class="notice" role="alert">${l.message}</div>`:D}renderEmpty(e,l,n){return z`<div class="note"><strong>${e}</strong>${l}${n??D}</div>`}renderDialer(e){return z`
      ${this.renderCtx("dial")}
      ${this.renderNotice("dialer")}
      <dc-softphone .adapter=${e.dialerTransport}></dc-softphone>
    `}renderMessages(e){let l=this.threadTarget;if(!l){let n=this.currentTarget();return z`
        ${this.renderNotice("messages")}
        ${this.threadLoading?this.renderEmpty("Opening conversation\u2026",""):this.renderEmpty("No conversation open",n?"Text the contact you have open, or pick one from the inbox.":"Pick a contact, or call dock.text({ contact_id }) from your app.",n?z`<div><button class="dc-btn" @click=${()=>this.text(n)}>${J("sms")} Text ${this.contact?.name||""}</button></div>`:void 0)}
      `}return z`
      ${this.renderNotice("messages")}
      <dc-messenger
        inline
        channel="sms"
        .branding=${!1}
        .contact=${t6(l)}
        .messages=${this.thread}
        .adapter=${e.messengerTransport}
      ></dc-messenger>
    `}renderInbox(){return z`
      ${this.renderNotice("inbox")}
      <dc-shared-inbox
        .tokenManager=${this.tokenManager}
        phone-api-base=${this.phoneApiBase}
        from=${this.from}
        voice-ivr-id=${this.voiceIvrId}
        @dc-select-conversation=${this.onInboxSelect}
      ></dc-shared-inbox>
    `}renderContacts(){return this.contactId?z`
      ${this.renderNotice("contacts")}
      <dc-contact-card
        contact-id=${this.contactId}
        api-base=${this.apiBase}
        .tokenManager=${this.tokenManager}
        @dc-call=${e=>this.onCardAction(e,"dial")}
        @dc-text=${e=>this.onCardAction(e,"text")}
      ></dc-contact-card>
    `:z`
        ${this.renderNotice("contacts")}
        ${this.renderEmpty("No contact selected","Open a record in your app, pick a conversation in the inbox, or choose a card in the pipeline.")}
      `}renderPipeline(){return z`
      ${this.renderNotice("pipeline")}
      <dc-pipeline-board
        api-base=${this.apiBase}
        .tokenManager=${this.tokenManager}
        @dc-open-contact=${this.onPipelineOpen}
      ></dc-pipeline-board>
    `}renderCampaigns(){let e=this.campaignsTokenManager;if(!e&&this.campaignsUnavailableReason)return this.renderEmpty("Campaign status is not available",this.campaignsUnavailableReason);if(!e)return this.renderEmpty("Campaign status needs its own token","The Dock token covers calls, texts and contacts. To show campaign status, your app passes getCampaignsToken to DropCowboy.dock.init() with a site token that has the campaigns scope.");if(this.campaignsExpired)return this.renderEmpty("Campaign session expired",e.hasRefresher()?"Reconnect to keep watching campaign progress.":"Your app needs to provide a new campaigns token.",e.hasRefresher()?z`<div><button class="dc-btn" ?disabled=${this.retrying} @click=${()=>this.retrySession(e)}>
              ${this.retrying?"Reconnecting\u2026":"Retry"}
            </button></div>`:void 0);let l=this.campaignRows;return z`
      ${this.renderNotice("campaigns")}
      ${this.selectedCampaignId?z`<div class="campaign-detail">
            <dc-campaign-status
              campaign-id=${this.selectedCampaignId}
              campaign-api-base=${this.campaignApiBase||this.apiBase}
              .tokenManager=${e}
            ></dc-campaign-status>
          </div>`:D}
      ${this.campaignsLoading||l===null?this.renderEmpty("Loading campaigns\u2026",""):l.length===0?this.renderEmpty("No campaigns yet","Campaigns are built and started in Drop Cowboy; their progress shows here."):z`<div class="list" role="list">
              ${l.map(n=>z`<button
                  class="li ${n.id===this.selectedCampaignId?"sel":""}"
                  role="listitem"
                  @click=${()=>this.selectedCampaignId=n.id}
                >
                  <span class="ic">${J("bullhorn")}</span>
                  <span class="m"><span class="t">${n.name}</span><br /><span class="s">${n.subtitle}</span></span>
                </button>`)}
            </div>`}
    `}renderPaneBody(e,l){switch(e){case"dialer":return this.renderDialer(l);case"messages":return this.renderMessages(l);case"inbox":return this.renderInbox();case"contacts":return this.renderContacts();case"pipeline":return this.renderPipeline();case"campaigns":return this.renderCampaigns()}}renderPanes(){let e=this.session;if(!e)return this.renderEmpty("Not connected","Your app connects the Dock with DropCowboy.dock.init({ getToken }) using a site token minted on its server.");let l=this.activeNav.map(n=>n.pane).filter(n=>this.visited.has(n)||n===this.pane);return z`${l.map(n=>z`<div class="pane" ?hidden=${n!==this.pane} data-pane=${n}>${this.renderPaneBody(n,e)}</div>`)}`}renderExpired(){let e=this.tokenManager;if(!this.sessionExpired||!e)return D;let l=e.hasRefresher();return z`<div class="expired" role="alert">
      <span class="msg">
        <strong>Session expired.</strong>
        ${l?"Calls already in progress keep going; reconnect to load data and send.":"Your app needs to provide a new token (dock.setToken)."}
      </span>
      ${l?z`<button class="dc-btn" ?disabled=${this.retrying} @click=${()=>this.retrySession(e)}>
            ${this.retrying?"Reconnecting\u2026":"Retry"}
          </button>`:D}
    </div>`}renderConnect(){return z`<div class="connect">
      <div class="connect-inner">
        <div style="font-size:28px;color:var(--dc-primary-color)">${J("plug")}</div>
        <h2>${this.partnerName?`Connect ${this.partnerName} to Drop Cowboy`:"Connect to Drop Cowboy"}</h2>
        <p>This Dock is not signed in yet. Calling, texting and the inbox start working once your app connects it.</p>
        <p><code>DropCowboy.dock.init({ getToken })</code></p>
      </div>
    </div>`}renderSettings(){return z`<div class="settings" aria-hidden=${!this.settingsOpen}>
      <div class="set-head">
        <button class="back" @click=${()=>this.settingsOpen=!1}>
          ${J("arrow-left")} Back
        </button>
        <span class="t">Settings</span>
      </div>
      <div class="set-body">
        <p>
          Numbers, routing, recordings and Building Blocks settings (including “Use existing contact
          consent”) are managed in Drop Cowboy.
        </p>
        <a class="dc-btn" href=${gf} target="_blank" rel="noopener">
          ${J("gear")} Open Drop Cowboy settings
        </a>
      </div>
    </div>`}render(){return this.open?z`
      <div class="dock ${this.effectiveWide?"wide":""}" role="dialog" aria-label="Drop Cowboy Dock">
        ${this.renderHead()}
        <div class="dock-body">
          ${this.auth==="out"?this.renderConnect():D}
          <nav class="nav" aria-label="Dock surfaces">
            ${this.activeNav.map(e=>z`<button
                class=${this.pane===e.pane?"on":""}
                title=${e.label}
                @click=${()=>this.go(e.pane)}
              >
                ${J(e.icon)}
              </button>`)}
            <span class="navsp"></span>
            ${this.dockRole==="admin"?z`<button title="Settings (admin)" @click=${()=>this.settingsOpen=!0}>
                  ${J("gear")}
                </button>`:D}
          </nav>
          <div class="surface">
            ${this.renderExpired()}
            ${this.renderPanes()}
            ${this.renderSettings()}
          </div>
        </div>
      </div>
    `:z`<button class="launcher" aria-label="Open Drop Cowboy" @click=${()=>this.toggleOpen(!0)}>
        ${J("phone")}
        ${this.unreadCount>0?z`<span class="badge">${this.unreadCount}</span>`:D}
      </button>`}};s2.styles=[X.styles,r2`
      :host {
        display: block;
        position: relative;
        width: 100%;
        height: 100%;
        min-height: 480px;
      }
      :host([viewport]) {
        position: fixed;
        inset: 0;
        width: auto;
        height: auto;
        min-height: 0;
        z-index: 2147483000;
        pointer-events: none;
      }
      :host([viewport]) .launcher,
      :host([viewport]) .dock {
        pointer-events: auto;
      }
      .launcher {
        position: absolute;
        right: 24px;
        bottom: 24px;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background: var(--dc-primary-color);
        color: #fff;
        border: 0;
        cursor: pointer;
        box-shadow: var(--dc-shadow);
        display: grid;
        place-items: center;
        font-size: 24px;
        z-index: 30;
        transition: transform var(--dc-transition);
      }
      .launcher:hover {
        transform: scale(1.05);
      }
      .badge {
        position: absolute;
        top: -2px;
        right: -2px;
        background: var(--dc-danger);
        color: #fff;
        font-size: 10px;
        font-weight: 700;
        min-width: 18px;
        height: 18px;
        border-radius: 999px;
        display: grid;
        place-items: center;
        border: 2px solid var(--dc-bg-color);
      }
      .dock {
        position: absolute;
        background: var(--dc-bg-color);
        border: 1px solid var(--dc-border-color);
        box-shadow: var(--dc-shadow);
        z-index: 31;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        transition:
          width 0.26s var(--dc-ease-panel),
          height 0.26s var(--dc-ease-panel);
      }
      :host([mode='floating']) .dock {
        right: 24px;
        bottom: 24px;
        width: 384px;
        height: 624px;
        max-height: calc(100% - 48px);
        max-width: calc(100% - 48px);
        border-radius: var(--dc-radius);
      }
      :host([mode='floating']) .dock.wide,
      :host([mode='floating'][settings-open]) .dock {
        width: 760px;
        height: 664px;
      }
      :host([mode='pinned']) .dock {
        top: 0;
        right: 0;
        bottom: 0;
        width: 432px;
        height: auto;
        border-radius: 0;
        border-top: 0;
        border-bottom: 0;
        border-right: 0;
      }
      :host([mode='pinned']) .dock.wide,
      :host([mode='pinned'][settings-open]) .dock {
        width: 720px;
      }
      :host([mode='fill']) .dock {
        inset: 0;
        width: auto;
        height: auto;
        border-radius: 0;
        border: 0;
        box-shadow: none;
      }
      :host([mode='fill']) .widebtn {
        display: none;
      }
      .widebtn.on {
        background: var(--dc-primary-soft);
        color: var(--dc-primary-color);
      }
      .dockmodes {
        display: inline-flex;
        border: 1px solid var(--dc-border-color);
        border-radius: var(--dc-radius-sm);
        overflow: hidden;
        margin-right: 4px;
      }
      .dm {
        width: 30px;
        height: 28px;
        border: 0;
        background: var(--dc-bg-color);
        cursor: pointer;
        font-size: 13px;
        color: var(--dc-text-muted);
        display: grid;
        place-items: center;
      }
      .dm.on {
        background: var(--dc-primary-soft);
        color: var(--dc-primary-color);
      }
      .dock-head {
        display: flex;
        align-items: center;
        gap: 6px;
        padding: 12px 12px 12px 16px;
        border-bottom: 1px solid var(--dc-border-color);
      }
      .dock-head .dot {
        width: 11px;
        height: 11px;
        border-radius: 50%;
        background: var(--dc-primary-color);
      }
      .dock-head .t {
        font-weight: 700;
        white-space: nowrap;
        flex-shrink: 0;
      }
      .sp {
        flex: 1;
      }
      .rolepill {
        font-size: 10px;
        font-weight: 700;
        letter-spacing: 0.03em;
        text-transform: uppercase;
        padding: 3px 8px;
        border-radius: 999px;
        background: var(--dc-surface-2);
        color: var(--dc-text-muted);
      }
      .rolepill.admin {
        background: var(--dc-primary-soft);
        color: var(--dc-primary-color);
      }
      .dock-body {
        flex: 1;
        display: flex;
        min-height: 0;
        position: relative;
      }
      .nav {
        width: 60px;
        border-right: 1px solid var(--dc-border-color);
        background: var(--dc-surface-color);
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 10px 0;
        gap: 4px;
        flex-shrink: 0;
      }
      .nav button {
        width: 44px;
        height: 44px;
        border: 0;
        background: transparent;
        border-radius: var(--dc-radius-sm);
        cursor: pointer;
        font-size: 18px;
        color: var(--dc-text-muted);
        display: grid;
        place-items: center;
      }
      .nav button:hover {
        background: var(--dc-bg-color);
      }
      .nav button.on {
        background: var(--dc-primary-soft);
        color: var(--dc-primary-color);
      }
      .nav .navsp {
        flex: 1;
      }
      .surface {
        flex: 1;
        overflow-x: hidden;
        overflow-y: auto;
        min-width: 0;
        position: relative;
        display: flex;
        flex-direction: column;
        container-type: inline-size;
      }
      .pane {
        flex: 1;
        display: flex;
        flex-direction: column;
        min-height: 0;
      }
      .pane[hidden] {
        display: none;
      }
      .pane > dc-softphone,
      .pane > dc-messenger,
      .pane > dc-shared-inbox,
      .pane > dc-contact-card,
      .pane > dc-pipeline-board,
      .pane dc-campaign-status {
        width: 100%;
        max-width: none;
      }
      .pane > dc-softphone {
        align-self: center;
        max-width: 360px;
        padding: 12px 0;
      }
      .pane > dc-shared-inbox,
      .pane > dc-pipeline-board {
        flex: 1;
        height: auto;
        min-height: 420px;
      }
      .ctx {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px 16px;
        border-bottom: 1px solid var(--dc-border-color);
        background: var(--dc-surface-color);
      }
      .ctx .ava {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: var(--dc-primary-soft);
        color: var(--dc-primary-color);
        display: grid;
        place-items: center;
        font-weight: 700;
        flex-shrink: 0;
      }
      .ctx .who {
        flex: 1;
        min-width: 0;
      }
      .ctx .nm {
        font-weight: 700;
      }
      .ctx .meta {
        font-size: var(--dc-font-size-sm);
        color: var(--dc-text-muted);
      }
      .notice {
        margin: 10px 12px 0;
        padding: 10px 12px;
        border-radius: var(--dc-radius-sm);
        font-size: var(--dc-font-size-sm);
        background: var(--dc-danger-soft);
        color: var(--dc-danger-text);
      }
      .notice.consent {
        background: var(--dc-warning-soft);
        color: var(--dc-warning-text);
      }
      .notice strong {
        display: block;
        margin-bottom: 2px;
      }
      .expired {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 10px 14px;
        font-size: var(--dc-font-size-sm);
        background: var(--dc-warning-soft);
        color: var(--dc-warning-text);
        border-bottom: 1px solid var(--dc-border-color);
      }
      .expired .msg {
        flex: 1;
      }
      .note {
        padding: 30px 20px;
        text-align: center;
        color: var(--dc-text-muted);
        font-size: var(--dc-font-size-sm);
      }
      .note strong {
        display: block;
        color: var(--dc-text-color);
        margin-bottom: 4px;
      }
      .note .dc-btn {
        margin-top: 12px;
      }
      .list {
        padding: 6px 0;
      }
      .li {
        display: flex;
        align-items: center;
        gap: 10px;
        width: 100%;
        padding: 11px 16px;
        border: 0;
        border-bottom: 1px solid var(--dc-border-color);
        background: transparent;
        cursor: pointer;
        font: inherit;
        font-size: var(--dc-font-size-sm);
        color: var(--dc-text-color);
        text-align: left;
      }
      .li.sel {
        background: var(--dc-primary-soft);
      }
      .li .ic {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background: var(--dc-surface-2);
        display: grid;
        place-items: center;
        font-size: 13px;
        flex-shrink: 0;
      }
      .li .m {
        flex: 1;
        min-width: 0;
      }
      .li .t {
        font-weight: 600;
      }
      .li .s {
        font-size: var(--dc-font-size-xs);
        color: var(--dc-text-light);
      }
      .campaign-detail {
        padding: 12px;
      }
      .connect {
        position: absolute;
        inset: 0;
        background: var(--dc-bg-color);
        z-index: 8;
        display: flex;
        overflow: auto;
      }
      .connect-inner {
        margin: auto;
        max-width: 340px;
        padding: 28px 26px;
        text-align: center;
      }
      .connect h2 {
        font-size: 18px;
        margin: 12px 0 8px;
      }
      .connect p {
        font-size: var(--dc-font-size-sm);
        color: var(--dc-text-muted);
        margin: 0 0 8px;
      }
      .connect code {
        font-size: var(--dc-font-size-xs);
      }
      .settings {
        position: absolute;
        inset: 0;
        background: var(--dc-bg-color);
        display: flex;
        flex-direction: column;
        transform: translateX(100%);
        visibility: hidden;
        transition:
          transform 0.24s var(--dc-ease-panel),
          visibility 0s linear 0.24s;
        z-index: 5;
      }
      :host([settings-open]) .settings {
        transform: none;
        visibility: visible;
        transition: transform 0.24s var(--dc-ease-panel);
      }
      .set-head {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 12px 14px;
        border-bottom: 1px solid var(--dc-border-color);
      }
      .set-head .back {
        border: 0;
        background: transparent;
        cursor: pointer;
        font: inherit;
        font-weight: 600;
        color: var(--dc-primary-color);
        display: inline-flex;
        align-items: center;
        gap: 6px;
      }
      .set-head .t {
        font-weight: 700;
      }
      .set-body {
        padding: 20px 22px;
        font-size: var(--dc-font-size-sm);
        color: var(--dc-text-muted);
      }
      .set-body p {
        margin: 0 0 14px;
        max-width: 520px;
      }
    `],C([w({type:Boolean,reflect:!0})],s2.prototype,"open",2),C([w({type:String,reflect:!0})],s2.prototype,"mode",2),C([w({type:Boolean,reflect:!0})],s2.prototype,"viewport",2),C([w({type:String})],s2.prototype,"pane",2),C([w({attribute:"panes",converter:hf})],s2.prototype,"panes",2),C([w({type:String,attribute:"dock-role"})],s2.prototype,"dockRole",2),C([w({type:String})],s2.prototype,"auth",2),C([w({type:Boolean,attribute:"settings-open",reflect:!0})],s2.prototype,"settingsOpen",2),C([w({type:Boolean,reflect:!0})],s2.prototype,"wide",2),C([w({type:Number,attribute:"unread-count"})],s2.prototype,"unreadCount",2),C([w({type:String,attribute:"partner-name"})],s2.prototype,"partnerName",2),C([w({type:String,attribute:"contact-id"})],s2.prototype,"contactId",2),C([w({attribute:!1})],s2.prototype,"contact",2),C([w({attribute:!1})],s2.prototype,"tokenManager",2),C([w({attribute:!1})],s2.prototype,"campaignsTokenManager",2),C([w({attribute:!1})],s2.prototype,"campaignsUnavailableReason",2),C([w({type:String,attribute:"phone-api-base"})],s2.prototype,"phoneApiBase",2),C([w({type:String,attribute:"api-base"})],s2.prototype,"apiBase",2),C([w({type:String,attribute:"campaign-api-base"})],s2.prototype,"campaignApiBase",2),C([w({type:String})],s2.prototype,"from",2),C([w({type:String,attribute:"voice-ivr-id"})],s2.prototype,"voiceIvrId",2),C([M2()],s2.prototype,"visited",2),C([M2()],s2.prototype,"notices",2),C([M2()],s2.prototype,"sessionExpired",2),C([M2()],s2.prototype,"campaignsExpired",2),C([M2()],s2.prototype,"retrying",2),C([M2()],s2.prototype,"threadTarget",2),C([M2()],s2.prototype,"thread",2),C([M2()],s2.prototype,"threadLoading",2),C([M2()],s2.prototype,"campaignRows",2),C([M2()],s2.prototype,"campaignsLoading",2),C([M2()],s2.prototype,"selectedCampaignId",2),s2=C([p2("dc-dock")],s2)});var P6="__dcBundle",ka=/^DropCowboy./,P1=typeof window<"u"?window:globalThis,r0=gi();function gi(){let r={},s={},e=P1.DropCowboy;if(e&&typeof e=="object"){let n=Object.keys(e);for(let a=0;a<n.length;a++)r[n[a]]=e[n[a]]}let l=Object.keys(P1);for(let n=0;n<l.length;n++)ka.test(l[n])&&(s[l[n]]=P1[l[n]]);return{namespaces:r,globals:s}}function D6(r,s){return Object.prototype.hasOwnProperty.call(r,s)}function Aa(r,s,e,l){let n=Object.keys(r);for(let a=0;a<n.length;a++){let o=n[a];!l(o)||D6(e,o)||(D6(s,o)?r[o]!==s[o]&&(r[o]=s[o]):delete r[o])}}function Ea(r,s,e){return r&&r[P6]===e?r:(D6(s,P6)||Object.defineProperty(s,P6,{value:e}),s)}function vi(){return!0}function Ra(r){let s=r.namespaces||{},e=r.globals||{};(!P1.DropCowboy||typeof P1.DropCowboy!="object")&&(P1.DropCowboy={});let l=P1.DropCowboy;Aa(l,r0.namespaces,s,vi),Aa(P1,r0.globals,e,function(h){return ka.test(h)});let n={},a=Object.keys(s);for(let h=0;h<a.length;h++){let m=a[h];l[m]=Ea(r0.namespaces[m],s[m],r.bundle),n[m]=l[m]}let o=Object.keys(e);for(let h=0;h<o.length;h++){let m=o[h];P1[m]=Ea(r0.globals[m],e[m],r.bundle)}return n}function Ia(r,s){if("tokenManager"in r){r.tokenManager!==s.manager&&(r.tokenManager=s.manager);return}r.token=s.token}function Pa(r){let s=r.selector,e=r.apply,l=new WeakSet,n=null,a=null,o=null;function h(u){!n||!n.token||(u.token||u.tokenManager)&&!l.has(u)||(l.add(u),e(u,n))}function m(u){if(!u||u.nodeType!==1)return;u.matches(s)&&h(u);let k=u.querySelectorAll(s);for(let b=0;b<k.length;b++)h(k[b])}function v(){a&&(a.disconnect(),a=null),o&&(o(),o=null),n=null}function _(u,k){v(),!(typeof document>"u"||!u)&&(n={token:u.current(),manager:u,settings:k||{}},o=u.onTokenChange(function(b){n&&(n.token=b,m(document.documentElement))}),typeof MutationObserver=="function"&&(a=new MutationObserver(function(b){for(let S=0;S<b.length;S++){let y=b[S].addedNodes;for(let H=0;H<y.length;H++)m(y[H])}}),a.observe(document.documentElement,{childList:!0,subtree:!0})),m(document.documentElement))}return{start:_,stop:v}}U8();z1();K1();p4();F1();var xr={},W1=null,F8={error:"dc-error",callStarted:"dc-call-started",callEnded:"dc-call-ended",messageSent:"dc-message-sent",contactSelected:"dc-contact-selected",pane:"dc-pane-change",toggle:"dc-dock-toggle"},Lr=["phoneApiBase","apiBase","campaignApiBase","from","voiceIvrId"],vf="campaigns_token_unavailable";function zf(r){typeof window>"u"||(window.DropCowboy=window.DropCowboy||{},window.DropCowboy.dock=r)}function r6(r){return new H8(r||xr)}function W2(){return W1||(W1=r6(xr)),W1}async function Mf(r){return W2().init(r)}function _f(r){W2().setTheme(r)}function Cf(r){return W2().addPaneChangeListener(r)}function Lf(r){return W2().addDockToggleListener(r)}function xf(r){return W2().addErrorListener(r)}function bf(r){return W2().addCallStartedListener(r)}function Sf(r){return W2().addCallEndedListener(r)}function wf(r){return W2().addMessageSentListener(r)}function yf(r){return W2().addContactSelectedListener(r)}async function Tf(r,s){return W2().dial(r,s)}async function Nf(r,s){return W2().text(r,s)}async function Af(r){return W2().setContact(r)}async function Ef(r,s){return W2().open(r,s)}function kf(r){return W2().setMode(r)}function Rf(r){return W2().setPanes(r)}function If(r){return W2().setToken(r)}function Pf(){return W1?W1.getTokenManager():null}function Df(){return W1?W1.getCampaignsTokenManager():null}async function $f(){let r=W1;W1=null,r&&await r.close()}function Uf(r){if(!r.querySelectorAll)return null;let s=r.querySelectorAll("dc-dock");for(let e=0;e<s.length;e++)if(!s[e].tokenManager)return s[e];return null}function Ff(r){return{token:r.campaignsToken,getToken:r.getCampaignsToken,tokenManager:r.campaignsTokenManager}}var H8=class{constructor(s){this.token=null,this.session=null,this.campaignsSession=null,this.campaignsUnavailable=null,this.mode=s&&s.mode||"floating",this.dockRole=s&&s.dockRole||"agent",this.partnerName=s&&s.partnerName||"",this.panes=s&&s.panes||null,this.elementOptions={},this.contact=null,this.theme={},this.el=null,this.container=null,this.listeners={};let e=Object.keys(F8);for(let l=0;l<e.length;l++)this.listeners[e[l]]=[]}async init(s){if(!s1(s))throw new Error("init({ token }) requires a site token from POST /embed/token");this.mode=s.mode||this.mode,this.dockRole=s.dockRole||this.dockRole,this.partnerName=s.partnerName||this.partnerName,this.panes=s.panes||this.panes;for(let l=0;l<Lr.length;l++){let n=Lr[l];s[n]&&(this.elementOptions[n]=s[n])}this._releaseSession(),this.campaignsUnavailable=null,this.session=c1(s,l=>this._applyToken(l)),this._applyToken(await l1(this.session));let e=Ff(s);if(s1(e)){this.campaignsSession=c1(e,null);try{await l1(this.campaignsSession)}catch(l){this.campaignsSession=null,this._markCampaignsUnavailable(l)}}s.contact&&(this.contact=s.contact),this.el?this._applyToElement(this.el):(s.container||typeof document<"u")&&await this.ensureMounted(s.container)}setToken(s){if(!this.session)throw new Error("Call init({ token }) before setToken");return this.session.manager.setToken(s)}getTokenManager(){return this.session?this.session.manager:null}getCampaignsTokenManager(){return this.campaignsSession?this.campaignsSession.manager:null}getCampaignsUnavailable(){return this.campaignsUnavailable}_markCampaignsUnavailable(s){let e=_2(s,"Your app could not provide a campaigns token.");this.campaignsUnavailable={code:vf,message:"The campaigns token could not be loaded: "+e.message,reason:e.reason||e.code},this._emit("error",{code:this.campaignsUnavailable.code,message:this.campaignsUnavailable.message,reason:this.campaignsUnavailable.reason,pane:"campaigns"})}applyToDeclarativeElement(s){let e=Object.keys(this.elementOptions);for(let l=0;l<e.length;l++)s[e[l]]||(s[e[l]]=this.elementOptions[e[l]]);s.campaignsTokenManager||(s.campaignsTokenManager=this.getCampaignsTokenManager()),s.campaignsUnavailableReason=this.campaignsUnavailable?this.campaignsUnavailable.message:""}_applyToken(s){this.token=s||null;let e=B2(s);this.teamId=e.team_id||null}_releaseSession(){this.session&&(this.session.release(),this.session=null),this.campaignsSession&&(this.campaignsSession.release(),this.campaignsSession=null)}setTheme(s){this.theme=Object.assign({},this.theme,s||{}),this.theme.primary&&!this.theme.primaryColor&&(this.theme.primaryColor=this.theme.primary),o1(this.theme)}getTheme(){return this.theme}async ensureMounted(s){if(this.el)return this.el;(typeof customElements>"u"||!customElements.get("dc-dock"))&&await Promise.resolve().then(()=>(U8(),Cr));let e=this._resolveContainer(s);if(!e)return null;let l=e;if((!e.tagName||String(e.tagName).toLowerCase()!=="dc-dock")&&(l=Uf(e),!l&&e.appendChild&&(l=document.createElement("dc-dock"),e===document.body&&(l.viewport=!0),e.appendChild(l))),l){this._applyToElement(l);let n=Object.keys(F8);for(let a=0;a<n.length;a++){let o=n[a];l.addEventListener(F8[o],h=>{this._emit(o,h&&h.detail)})}this.el=l}return l}_applyToElement(s){s.mode=this.mode,s.dockRole=this.dockRole,s.partnerName=this.partnerName,s.panes=this.panes,s.auth=this.token?"in":"out",s.tokenManager=this.getTokenManager(),s.campaignsTokenManager=this.getCampaignsTokenManager(),s.campaignsUnavailableReason=this.campaignsUnavailable?this.campaignsUnavailable.message:"";let e=Object.keys(this.elementOptions);for(let l=0;l<e.length;l++)s[e[l]]=this.elementOptions[e[l]];this.contact&&s.setContact(this.contact)}_resolveContainer(s){return typeof document>"u"?null:s?typeof s=="string"?document.querySelector(s):s:document.body}async _requireElement(s,e){if(!this.token)throw new Error("Call init({ token }) before "+s+"()");return this.ensureMounted(e&&e.container)}async dial(s,e){let l=s&&typeof s=="object"&&(s.container||s.contact)&&!s.contact_id&&!s.phone,n=await this._requireElement("dial",l?s:e);if(!n)return null;let a=l?s.contact:s;return a?await n.dial(a):(n.pane="dialer",n.open=!0),n}async text(s,e){let l=await this._requireElement("text",e);return l?(await l.text(s),l):null}async setContact(s){return this.contact=s||null,this.el?(this.el.setContact(this.contact),this.el):null}async open(s,e){let l=await this._requireElement("open",e);return l?(s&&(l.pane=s),e&&e.contact&&await this.setContact(e.contact),l.open=!0,l):null}setMode(s){this.mode=s,this.el&&(this.el.mode=s)}setPanes(s){this.panes=s||null,this.el&&(this.el.panes=this.panes)}_addListener(s,e){return this.listeners[s].push(e),()=>{this.listeners[s]=this.listeners[s].filter(function(l){return l!==e})}}addPaneChangeListener(s){return this._addListener("pane",s)}addDockToggleListener(s){return this._addListener("toggle",s)}addErrorListener(s){return this._addListener("error",s)}addCallStartedListener(s){return this._addListener("callStarted",s)}addCallEndedListener(s){return this._addListener("callEnded",s)}addMessageSentListener(s){return this._addListener("messageSent",s)}addContactSelectedListener(s){return this._addListener("contactSelected",s)}_emit(s,e){let l=this.listeners[s]||[];for(let n=0;n<l.length;n++)l[n](e)}async close(){this.el&&(this.el.open=!1,this.el.tokenManager=null,this.el.campaignsTokenManager=null,this.el.campaignsUnavailableReason=""),this._releaseSession(),this.campaignsUnavailable=null,this.token=null,this.contact=null;let s=Object.keys(this.listeners);for(let e=0;e<s.length;e++)this.listeners[s[e]]=[]}};zf({init:Mf,setTheme:_f,dial:Tf,text:Nf,setContact:Af,open:Ef,setMode:kf,setPanes:Rf,addPaneChangeListener:Cf,addDockToggleListener:Lf,addErrorListener:xf,addCallStartedListener:bf,addCallEndedListener:Sf,addMessageSentListener:wf,addContactSelectedListener:yf,setToken:If,getTokenManager:Pf,getCampaignsTokenManager:Df,close:$f,createEmbedDock:r6});function br(r){let s=Pa({selector:"dc-dock",apply:function(e,l){r.applyToDeclarativeElement(e),Ia(e,l)}});return{start:function(){s.start(r.getTokenManager(),{})},stop:function(){s.stop()}}}var A2=r6(),Sr=br(A2),Hf={init:function(r){return A2.init(r).then(function(){Sr.start()})},setTheme:function(r){A2.setTheme(r)},dial:function(r,s){return A2.dial(r,s)},text:function(r,s){return A2.text(r,s)},setContact:function(r){return A2.setContact(r)},open:function(r,s){return A2.open(r,s)},setMode:function(r){return A2.setMode(r)},setPanes:function(r){return A2.setPanes(r)},addPaneChangeListener:function(r){return A2.addPaneChangeListener(r)},addDockToggleListener:function(r){return A2.addDockToggleListener(r)},addErrorListener:function(r){return A2.addErrorListener(r)},addCallStartedListener:function(r){return A2.addCallStartedListener(r)},addCallEndedListener:function(r){return A2.addCallEndedListener(r)},addMessageSentListener:function(r){return A2.addMessageSentListener(r)},addContactSelectedListener:function(r){return A2.addContactSelectedListener(r)},setToken:function(r){return A2.setToken(r)},getTokenManager:function(){return A2.getTokenManager()},getCampaignsTokenManager:function(){return A2.getCampaignsTokenManager()},close:function(){return Sr.stop(),A2.close()}};Ra({bundle:"dock",namespaces:{dock:Hf}});})();
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

(function(a,c,n,f,g,l,y,d){"use strict";const P=c.findByProps("transitionToGuild","openURL"),{TextStyleSheet:m}=c.findByProps("TextStyleSheet"),{Text:v}=l.General;function S(t){let{text:e}=t;return d.createElement(h,{color:"#049ce6",onPress:function(){return P.openURL(e)}},e)}function h(t){let{color:e,onPress:i,getChildren:o,children:r}=t;return d.createElement(v,{style:[m["text-md/normal"],{color:e||y.rawColors.PRIMARY_100}],onPress:i},o?.()??r)}let p=[];const A="https://links.asmr-stash.org/",R=c.findByProps("openLazy","hideActionSheet"),{FormRow:E}=l.Forms,{ScrollView:L,Text:T}=l.General,z=f.before("openLazy",R,function(t){const[e,i,o]=t;i==="MessageLongPressActionSheet"&&e.then(function(r){const s=f.after("default",r,function(G,k){n.React.useEffect(function(){return function(){s()}},[]);const[B,w]=k.props?.children?.props?.children?.props?.children,x=B?.props?.message??o?.message;if(!w||!x)return;const C=x.id;w.unshift(n.React.createElement(E,{label:"View in stash",onPress:function(){fetch(A+C).then(function(u){return u.text()}).then(function(u){return _(u)}),R.hideActionSheet()}}))})})});function _(t){const e=[];let i=/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/gm,o=t,r,s=0;for(;r=i.exec(o);)e.push(n.React.createElement(h,null,o.slice(s,r.index))),e.push(n.React.createElement(S,{text:r?.[0]})),s=i.lastIndex;g.showConfirmationAlert({title:"links",children:n.React.createElement(L,{style:{marginVertical:12,maxHeight:n.ReactNative.Dimensions.get("window").height*.7}},n.React.createElement(T,{selectable:!0},e))})}var b={onLoad:function(){p.push(z)},onUnload:function(){for(const t of p);}};return a.default=b,Object.defineProperty(a,"__esModule",{value:!0}),a})({},vendetta.metro,vendetta.metro.common,vendetta.patcher,vendetta.ui.alerts,vendetta.ui.components,vendetta.ui,window.React);

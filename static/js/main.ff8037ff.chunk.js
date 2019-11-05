(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{121:function(e,t,a){e.exports=a(302)},126:function(e,t,a){},250:function(e,t,a){},253:function(e,t,a){},289:function(e,t,a){},290:function(e,t,a){},297:function(e,t,a){},299:function(e,t,a){},302:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),i=a(63),l=a.n(i),o=(a(126),a(31)),c=a(18),s=a(16),m=a(7),u=a(6),p=a(66),d=(a(250),function(){return r.a.createElement(u.a,null,r.a.createElement(u.a.Group,{controlId:"contactForm.name"},r.a.createElement(u.a.Label,null,"Name:"),r.a.createElement(u.a.Control,{type:"text",placeholder:"Your Name"})),r.a.createElement(u.a.Group,{controlId:"contactForm.email"},r.a.createElement(u.a.Label,null,"Email:"),r.a.createElement(u.a.Control,{type:"email",placeholder:"your.name@email.com"})),r.a.createElement(u.a.Group,{controlId:"contactForm.reason"},r.a.createElement(u.a.Label,null,"Reason:"),r.a.createElement(u.a.Control,{as:"select"},r.a.createElement("option",null,"General"),r.a.createElement("option",null,"Report Problem"))),r.a.createElement(u.a.Group,{controlId:"contactForm.message"},r.a.createElement(u.a.Label,null,"Message:"),r.a.createElement(u.a.Control,{as:"textarea",placeholder:"Enter your message here",rows:"5"})),r.a.createElement(p.a,{variant:"dark",type:"submit",disabled:!0,onClick:function(e){e.preventDefault(),console.log("Contact form submitted")}},"(nothing actually happens if you click this)"))}),h=function(){return r.a.createElement("div",{className:"footer"},r.a.createElement("span",{className:"copyright"},"\xa92019 by Charlie Kelly"),r.a.createElement("span",{className:"social"},r.a.createElement(m.CloudinaryContext,{cloudName:"cantimaginewhy"},r.a.createElement("a",{target:"_blank",rel:"noopener noreferrer",href:"https://instagram.com/cant_imagine_why"},r.a.createElement(m.Image,{publicId:"instagram_logo",height:"100"})),r.a.createElement("a",{target:"_blank",rel:"noopener noreferrer",href:"https://facebook.com/acharliekelly"},r.a.createElement(m.Image,{publicId:"facebook_logo",height:"100"})),r.a.createElement("a",{target:"_blank",rel:"noopener noreferrer",href:"https://github.com/acharliekelly"},r.a.createElement(m.Image,{publicId:"github-logo",height:"100"})))))},g=(a(252),a(253),a(24)),b=a(25),y=a(27),f=a(26),w=a(28),E=a(115),v=a(114),I=a.n(v),k=a(67),N=a.n(k),_="cantimaginewhy",P=function(e){var t=function(e){return"https://res.cloudinary.com/".concat(_,"/image/list/").concat(e,".json")}(e);return N()(t)},C=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:500;return"https://res.cloudinary.com/".concat(_,"/w_").concat(t,"/").concat(e,".jpg")},S=(a(288),function(e){function t(){var e;return Object(g.a)(this,t),(e=Object(y.a)(this,Object(f.a)(t).call(this))).updateImages=function(t){P(t).then(function(t){e.setState({pictures:t.data.resources,isLoaded:!0})})},e.handleClickImage=function(e){},e.state={isLoaded:!1,pictures:[]},e}return Object(w.a)(t,e),Object(b.a)(t,[{key:"componentDidMount",value:function(){var e=this.props.tagName;this.updateImages(e)}},{key:"render",value:function(){var e=this.state,t=e.pictures;return e.isLoaded?r.a.createElement(I.a,{autoPlay:!0,duration:800,buttonsDisabled:!0,dotsDisabled:!0},t.map(function(e){return r.a.createElement(m.Image,{cloudName:"cantimaginewhy",publicId:e.public_id,crop:"fit",height:"300"})})):r.a.createElement(E.a,{variant:"dark",animation:"grow"})}}]),t}(n.Component));a(289);function x(){return r.a.createElement("div",{className:"content"},r.a.createElement("main",null,r.a.createElement("h1",null,"Can't Imagine Why"),r.a.createElement(S,{tagName:"panorama"})))}a(290);var O=function(){return r.a.createElement("div",{className:"content"},r.a.createElement("header",null,"About"),r.a.createElement("div",{className:"about-content"},r.a.createElement(m.Image,{className:"me-photo",cloudName:"cantimaginewhy",publicId:"me/face-41",width:"300"}),r.a.createElement("div",{className:"me-text"},r.a.createElement("section",null,"My name is Charlie Kelly. I\u2019ve been drawing and painting stuff for about a decade, and created this site as a way to display it all in one place."),r.a.createElement("section",null,r.a.createElement("p",null,"I took up art essentially because I found out it was possible to take up art as an adult. Which was mind-blowing to me \u2013 I\u2019d always assumed stuff like art, music, sports, etc were something you either got at birth or didn\u2019t. But then I met a guy who started drawing in his 30\u2019s, and he was pretty good! Also, I had a lot of free time, in an environment where too much free time can get you in trouble.")),r.a.createElement("section",null,"So, I started making art. At first, I stuck to designs that were more mathematical than artistic. I\u2019ve always admired Celtic knotwork, but had always struggled with trying to create my own designs. However, I came up with a style of my own that resembles plaitwork \u2013 like traditional knotwork in that it appears woven, but sticking more rigidly to right angles, like a lattice. From there I branched out into more traditional knotwork, and then into representational art. First plants and random objects, then people, and then landscapes and architecture. I also evolved from graphite and colored pencil to watercolors to acrylics."),r.a.createElement("section",null,"Because of where I learned to draw, however, I developed some unusual artistic styles based on the materials that were available. For example, although watercolor paint was available, the same cannot be said for the heavyweight, absorbent paper that is typically used by watercolor painters in the rest of the world. As I quickly learned, applying watercolor to regular paper will cause it to curl up and become misshapen. The only way to prevent this was to apply the pigment in tiny, non-contiguous dots. It turns out this is actually a style of painting, called Pointillism. It was championed by the French post-impressionist Georges Seurat. But I didn\u2019t realize it at the time; I was just trying to paint without ruining the paper."),r.a.createElement("section",null,"At present, my work is mostly divided between painted landscapes, and custom name tags/plates (the difference between and a name tag and a name plate is pretty much just size and complexity)."),r.a.createElement("section",null,"When the weather is nice, I prefer to paint my landscapes ",r.a.createElement("em",null,"en plein air"),", which means standing in front of the landscape while I'm painting it."),r.a.createElement("section",null,"I'm also into making websites. This is one such. It's actually way more complicated than necessary - if I were just trying to display and/or sell art, there are dozens of commercial products available. But that wouldn't really be fun for me. So instead I've created an application that is currently only semi-functional, but uses several interesting technologies that I'm trying to learn. If this topic interests you, more information is available in this ",r.a.createElement("a",{href:"https://cantimaginehow.blogspot.com",target:"_blank",rel:"noopener noreferrer"},"blog"),", and also in this ",r.a.createElement("a",{href:"https://github.com/acharliekelly/cantimaginewhy/",target:"_blank",rel:"noopener noreferrer"},"repository"),"."))))},j=a(116),A=[{name:"Location",index:0,options:[{name:"Downtown Boston",tag:"downtown-boston",thumbnail:"art/esplanade-sunset_2018",description:"Scenes from Downtown Boston"},{name:"Cambridge",tag:"cambridge",thumbnail:"art/memorial_drive_z68y3q",description:"Scenes from Cambridge"},{name:"Waltham",tag:"waltham",thumbnail:"art/early_fall_mt_feake",description:"Scenes from Waltham"},{name:"Charles River",tag:"charles-river",thumbnail:"art/watertown_dam-fs",description:"Scenes from along the Charles"},{name:"Greater Boston",tag:"boston-area",thumbnail:"art/seven_hills_park_hiiasw",description:"Around the Boston area"},{name:"Maine",tag:"maine",thumbnail:"art/parker_point_rgzpme",description:"Scenes from Maine"},{name:"Elsewhere",tag:"elsewhere",thumbnail:"art/bodiam-castle_2011",description:"Scenes from elsewhere"}]},{name:"Medium",index:1,options:[{name:"Pencil",tag:"pencil",thumbnail:"art/winter-house",description:"Graphite / Colored Pencil"},{name:"Watercolor Pencil",tag:"watercolor pencil",thumbnail:"art/leaving-star-island_2015",description:"Drawn first, then turned into watercolor by applying water"},{name:"Watercolor",tag:"watercolor",thumbnail:"art/late-spring-on-the-charles_2017",description:"Traditional watercolor painting with brush"},{name:"Acrylic",tag:"acrylic",thumbnail:"art/riparian_balcony-fs",description:"Layered acrylic paints"}]},{name:"Style",index:2,options:[{name:"Triptych",tag:"triptych",thumbnail:"art/winter-yosemite",description:"Picture divided into 3 (or more) panels"},{name:"Pointillist",tag:"pointillist",thumbnail:"art/fun-with-dots_2017",description:"Created by making tiny dots instead of brush strokes"},{name:"Nightscape",tag:"nightscape",thumbnail:"art/cambridge-night_2019",description:"Scenes from after dark, painted on black canvas"},{name:"Miniatures",tag:"miniature",thumbnail:"art/caterpillar_hill_qmwg7s",description:"Original is less than 6 inches on one side"},{name:"Panoramic",tag:"panorama",thumbnail:"art/winter-moon-2",description:"Long and thin"},{name:"Plein Air",tag:"en plein air",thumbnail:"art/early_fall_mt_feake",description:"Painted on site"}]},{name:"Season",index:3,options:[{name:"Summer",tag:"summer",thumbnail:"art/salt-pond",description:"Summer scenes"},{name:"Fall",tag:"autumn",thumbnail:"art/autumn-at-mt-feake_2017",description:"Fall scenes"},{name:"Winter",tag:"winter",thumbnail:"art/winter-walk",description:"Winter scenes"},{name:"Spring",tag:"spring",thumbnail:"art/esplanade-sunset_2018",description:"Spring scenes"}]},{name:"Color",index:4,options:[{name:"Blue",tag:"blue",thumbnail:"art/shamrock-i_26838853055_o_oqrvik",description:"Images with the color blue in them"},{name:"Green",tag:"green",thumbnail:"art/lotus_26804737776_o_i7e8dw",description:"Images with the color green in them"},{name:"Red",tag:"red",thumbnail:"art/winter-holidays-card-2015",description:"Images with some version of red in them"}]},{name:"Availability",index:5,options:[{name:"Original for Sale",tag:"for-sale",thumbnail:"art/memorial_drive_z68y3q",description:"You can purchase the original art piece"},{name:"Buy a Print",tag:"for-print",thumbnail:"art/esplanade-sunset_2018",description:"You can purchase a print"},{name:"Viewing Only",tag:"nfs",thumbnail:"nfs/eye_26745608572_o_zqbocw",description:"Feel free to look"}]}],G=(a(297),function(e){function t(e){var a;return Object(g.a)(this,t),(a=Object(y.a)(this,Object(f.a)(t).call(this,e))).handleSortSelect=function(e){a.setState({filterIndex:e,selectedNav:null}),a.props.handleClearGallery()},a.handleNavClick=function(e){a.setState({selectedNav:e}),a.props.handleNavChange(e.tag)},a.state={filterIndex:0,selectedNav:null},a}return Object(w.a)(t,e),Object(b.a)(t,[{key:"componentDidMount",value:function(){this.handleSortSelect(0)}},{key:"render",value:function(){var e=this,t=this.state,a=t.filterIndex,n=t.selectedNav,i=A[a];return r.a.createElement(m.CloudinaryContext,{cloudName:"cantimaginewhy"},r.a.createElement(s.a,{variant:"pills",defaultActiveKey:0,className:"gallery-nav justify-content-center",onSelect:this.handleSortSelect},r.a.createElement("span",{className:"label"},"Filter By:"),A.map(function(e){return r.a.createElement(s.a.Item,{key:e.name},r.a.createElement(s.a.Link,{eventKey:e.index},e.name))})),r.a.createElement("div",{className:"album-list"},i.options.map(function(t){var a="album-btn responsive thumbnail";return n&&n.tag===t.tag&&(a+=" selected-nav"),r.a.createElement("div",{key:t.tag,id:t.tag,className:a,onClick:function(){return e.handleNavClick(t)}},r.a.createElement(m.Image,{publicId:"".concat(t.thumbnail),height:"100",crop:"fit",quality:"80"},r.a.createElement(m.Transformation,{quality:"auto",fetchFormat:"auto"})),r.a.createElement("div",{className:"album-name"},t.name))})),n&&r.a.createElement("div",{className:"current-nav"},r.a.createElement("div",{className:"nav-title"},n.name),r.a.createElement("div",{className:"nav-description"},n.description)))}}]),t}(n.Component)),B=(a(298),a(299),function(e){function t(e){var a;return Object(g.a)(this,t),(a=Object(y.a)(this,Object(f.a)(t).call(this,e))).handleAlbumSelect=function(e){var t=e.target.id;console.log("Selected album: ",t),a.updateGallery(t)},a.updateGallery=function(e){P(e).then(function(t){a.setState({selectedAlbum:e,pictures:t.data.resources,imageViewOpen:!1,currentImage:null})})},a.clearGallery=function(){a.setState({pictures:[],selectedAlbum:null,imageViewOpen:!1,currentImage:null})},a.openImageView=function(e){var t={publicId:e.public_id,source:C(e.public_id,400),title:a.getPictureCaption(e),description:a.getPictureProperty(e,"alt"),location:a.getPictureProperty(e,"location"),medium:a.getPictureProperty(e,"medium"),size:a.getPictureProperty(e,"size"),year:a.getPictureProperty(e,"year"),forSale:"available"===a.getPictureProperty(e,"original"),forPrint:a.hasProperty("canvas-id")||a.hasProperty("poster-id"),price:a.getPictureProperty(e,"price","NFS"),materialInfo:a.hasProperty("medium")&&a.hasProperty("size")};a.setState({imageViewOpen:!0,currentImage:t})},a.getPictureCaption=function(e){return a.getPictureProperty(e,"caption","Untitled")},a.getPictureProperty=function(e,t){var a,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"";try{a=e.context.custom[t]}catch(r){a=n}return a},a.hasProperty=function(e){var t=a.props.currentImage,n=!1;try{n=null!=t.context.custom[e]}catch(r){return!1}return n},a.closeImageView=function(){a.setState({imageViewOpen:!1,currentImage:null})},a.openLightbox=function(){a.setState({lightboxOpen:!0})},a.closeLightbox=function(){a.setState({lightboxOpen:!1})},a.state={pictures:[],selectedAlbum:null,imageViewOpen:!1,currentImage:null,lightboxOpen:!1},a}return Object(w.a)(t,e),Object(b.a)(t,[{key:"componentDidMount",value:function(){var e=this.props.currentAlbum;e&&this.updateGallery(e)}},{key:"render",value:function(){var e,t=this,a=this.state,n=a.pictures,i=a.currentImage,l=a.imageViewOpen,o=a.lightboxOpen;return r.a.createElement("div",{className:"content"},r.a.createElement(m.CloudinaryContext,{cloudName:"cantimaginewhy"},r.a.createElement(G,{handleNavChange:this.updateGallery,handleClearGallery:this.clearGallery}),r.a.createElement("main",{className:"display-area"},r.a.createElement("div",{className:"gallery"},n.map(function(e){return r.a.createElement("div",{className:"responsive thumbnail",key:e.public_id},r.a.createElement(m.Image,{publicId:e.public_id,height:"100",crop:"fit",onClick:function(){return t.openImageView(e)}}))})),o&&r.a.createElement(j.a,{mainSrc:(e=i.publicId,"https://res.cloudinary.com/".concat(_,"/w_1000/w_500,l_ck_logo,o_30/").concat(e,".jpg")),onCloseRequest:this.closeLightbox}),l&&r.a.createElement("div",{className:"image-view"},r.a.createElement("img",{className:"display-image",alt:"",src:i.source,onClick:this.openLightbox}),r.a.createElement("div",{className:"image-info"},r.a.createElement("div",{className:"title"},i.title),r.a.createElement("div",{className:"info"},i.description),i.materialInfo&&r.a.createElement("div",{className:"info"},i.size,", ",i.medium),i.forSale&&r.a.createElement("div",{className:"options"},r.a.createElement("span",{className:"label"},"Buy Original:"),r.a.createElement("span",{className:"purchase buy-orig"},"$",i.price)),i.forPrint&&r.a.createElement("div",{className:"options"},r.a.createElement("span",{className:"label"},"Buy Print:"),r.a.createElement("span",{className:"purchase buy-print",onClick:function(){return console.log("Buy Poster #"+i.posterId)}},"Poster")))))))}}]),t}(n.Component)),L=function(){return r.a.createElement("div",{className:"content"},r.a.createElement("header",null,"Contact"),r.a.createElement("main",null,r.a.createElement(d,null)))},F=function(){return r.a.createElement("div",{className:"content"},r.a.createElement("header",null,"Shop"),r.a.createElement("main",{className:"todo"},"Put shopping stuff here"))},z=function(){return r.a.createElement("div",{className:"page-container"},r.a.createElement(o.a,{basename:"/"},r.a.createElement("header",{className:"menu"},r.a.createElement(m.Image,{cloudName:"cantimaginewhy",publicId:"ck_logo",className:"site-logo",height:"50"}),r.a.createElement(s.a,{className:"justify-content-center",defaultActiveKey:"/home"},r.a.createElement(s.a.Item,null,r.a.createElement(o.b,{to:"/home"},"Home")),r.a.createElement(s.a.Item,null,r.a.createElement(o.b,{to:"/artwork"},"Artwork")),r.a.createElement(s.a.Item,null,r.a.createElement(o.b,{to:"/about"},"About")))),r.a.createElement("div",{className:"content-wrapper"},r.a.createElement(c.a,{exact:!0,path:"/",component:x}),r.a.createElement(c.a,{path:"/home",component:x}),r.a.createElement(c.a,{path:"/about",component:O}),r.a.createElement(c.a,{path:"/contact",component:L}),r.a.createElement(c.a,{path:"/artwork",component:B}),r.a.createElement(c.a,{path:"/shop",component:F}))),r.a.createElement(h,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(r.a.createElement(z,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[121,1,2]]]);
//# sourceMappingURL=main.ff8037ff.chunk.js.map
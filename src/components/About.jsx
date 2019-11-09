import React from 'react';
// import { Image } from 'cloudinary-react';
import { Parallax } from "react-parallax";
import { cleanImageSrc } from '../utils/imageApi';

import '../css/about.scss';

const insideStyles = {
  background: "white",
  padding: 20,
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%,-50%)",
  opacity: 0.6
};

const AboutPage = () => (
  <div className="content">
    <header>About</header>
    <div className="about-content">
      <div className="me-text">
        <section>
        My name is Charlie Kelly. I’ve been drawing and painting stuff for about a decade, 
          and created this site as a way to display it all in one place. 
        </section>
        <Parallax bgImage={cleanImageSrc('me/caterpillar2')} strength={500}>
          <div style={{ height: 500 }}>
            <div style={insideStyles}>Me, painting</div>
          </div>
        </Parallax>
        
        <section>
        <p>I took up art essentially because I found out it was possible to take up art as an adult. 
          Which was mind-blowing to me – I’d always assumed stuff like art, music, sports, etc were something you 
          either got at birth or didn’t. But then I met a guy who started drawing in his 30’s, and he was pretty good! 
          Also, I had a lot of free time, in an environment where too much free time can get you in trouble.</p>
        </section>
        <section>
          So, I started making art. At first, I stuck to designs that were more mathematical than artistic. 
            I’ve always admired Celtic knotwork, but had always struggled with trying to create my own designs. 
            However, I came up with a style of my own that resembles plaitwork – like traditional knotwork in that it appears woven, 
            but sticking more rigidly to right angles, like a lattice. From there I branched out into more traditional knotwork, 
            and then into representational art. First plants and random objects, then people, and then landscapes and architecture. 
            I also evolved from graphite and colored pencil to watercolors to acrylics.
        </section>
        <section>
        Because of where I learned to draw, however, I developed some unusual artistic styles based on the materials 
        that were available. For example, although watercolor paint was available, the same cannot be said for the 
        heavyweight, absorbent paper that is typically used by watercolor painters in the rest of the world. 
        As I quickly learned, applying watercolor to regular paper will cause it to curl up and become misshapen. 
        The only way to prevent this was to apply the pigment in tiny, non-contiguous dots. It turns out this is actually 
        a style of painting, called Pointillism. It was championed by the French post-impressionist Georges Seurat. But 
        I didn’t realize it at the time; I was just trying to paint without ruining the paper.
        </section>
        <Parallax bgImage={cleanImageSrc('me/painting_trees')} strength={500}>
          <div style={{height: 500}}>
            <div style={insideStyles}>Painting Trees</div>
          </div>
        </Parallax>
        <section>
        At present, my work is mostly divided between painted landscapes, and custom name tags/plates 
        (the difference between and a name tag and a name plate is pretty much just size and complexity).
        </section>
        <section>
        When the weather is nice, I prefer to paint my landscapes <em>en plein air</em>, 
        which means standing in front of the landscape while I'm painting it.
        </section>
        <section>
        I'm also into making websites. This is one such. It's actually way more complicated than necessary - if I were just trying
        to display and/or sell art, there are dozens of commercial products available. But that wouldn't really be fun for me.
        So instead I've created an application that is currently only semi-functional, but uses several interesting technologies that
        I'm trying to learn. If this topic interests you, more information is available in this <a href="https://cantimaginehow.blogspot.com" target="_blank" rel="noopener noreferrer">blog</a>, 
        and also in this <a href="https://github.com/acharliekelly/cantimaginewhy/" target="_blank" rel="noopener noreferrer">repository</a>.
        </section>
        
      </div>
    </div>
    

  </div>
);

export default AboutPage;

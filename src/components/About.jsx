import React from 'react';
import { Image } from 'cloudinary-react';

import '../css/About.scss';

const AboutPage = () => (
  <div className="content">
    <header>About</header>
    <div className="about-content">
      <Image className="me-photo" cloudName="cantimaginewhy" publicId="me/face-41" width="300"/>
      <div className="me-text">
        <section>
        My name is Charlie Kelly. I’ve been drawing and painting stuff for about a decade, 
          and created this site as a way to display it all in one place. 
        </section>
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
        </section><section>
        At present, my work is mostly divided between painted landscapes, and custom name tags/plates 
        (the difference between and a name tag and a name plate is pretty much just size and complexity).
        <p>When the weather is nice, I prefer to paint my landscapes <em>en plein air</em>, 
        which means standing in front of the landscape while I'm painting it.</p>
        </section>
        <section>
          Here is a picture of me doing that.
          <Image className="me-photo" cloudName="cantimaginewhy" publicId="me/caterpillar2" width="600" />
        </section>

        
      </div>
    </div>
    

  </div>
);

export default AboutPage;

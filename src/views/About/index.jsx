import React from 'react';
import Tab from 'react-bootstrap/Tab';
import Container from 'react-bootstrap/Container';
import { Parallax } from "react-parallax";
import ExternalLink from '../../components/Buttons/ExternalLink';
import TabNavs from '../../components/Buttons/TabNavs';
import { cleanImageSrc } from '../../utils/cloudinaryApi';
import withSizes from 'react-sizes';
import { mapSizesToProps } from '../../utils/system';

import './about.scss';

const AboutPage = props => (
  <Container className="content about-content">
    <header className="intro-text">
      <section>
        <p>My name is Charlie Kelly, and this is my website. It's mine in the sense that I own the domain,
        but also because I created all the artwork, and also created the website, pretty much from 
        scratch. The reason I made a website is, art and websites are the
        two things I'm good at, and I want to show them off. Also, you can buy stuff. Or, hire me.</p>
        <p>More information about both topics can be found below.</p>
        </section>
    </header>
    {props.isDesktop && (
      <Parallax bgImage={cleanImageSrc('me/caterpillar2')} strength={600}>
        <div style={{ height: '40vh' }} />
      </Parallax>
    )}
    
    <Tab.Container defaultActiveKey="art">
      <TabNavs art tech />
      <Tab.Content>
        <Tab.Pane eventKey="art" className="art-content">
          <Container >
            <div className="me-text">
              <section>
              I took up art essentially because I found out it was possible to take up art as an adult. 
                Which was mind-blowing to me – I’d always assumed stuff like art, music, sports, etc were something you 
                either got at birth or didn’t. But then I met a guy who started drawing in his 30’s, and he was pretty good! 
                Also, I had a lot of free time, in an environment where too much free time can get you in trouble.
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
              
              <section>
              At present, I mostly do landscapes. When the weather is nice, I prefer to paint my landscapes 
              <em>en plein air</em>, which means standing in front of the landscape while I'm painting it.
              </section>
            </div>
          </Container>
        </Tab.Pane>

        <Tab.Pane eventKey="tech" className="tech-content">
          <Container>
          <div className="me-text">
          <section>
            I'm also into making websites. This is one such. In fact, if my goal were merely to sell art, 
            there are dozens of commercial platforms already available for that. What I really wanted to do
            is get really good at website (specifically ReactJS) while making a site that does EXACTLY what
            I want it to do, rather than merely the best I can do with the tools available. 
            </section>

            <section>
              When I said I made it from scratch, that's not technically accurate. I made it from
              create-react-app. The back end for this site (at the moment that I'm writing this) exists entirely
              within a free-tier account on Cloudinary. Everything other than retrieving images and metadata
              is done on the front end. 
              <p>I know, right? </p>
            </section>

            <section>
              If this topic interests you, I documented the process of creating this site, in a semi-regular 
              fashion, here on this{' '}<ExternalLink linkOnly 
              destinationUrl="https://cantimaginehow.blogspot.com">blog</ExternalLink>. You may also be interested
              in this{' '}<ExternalLink linkOnly 
              destinationUrl="https://github.com/acharliekelly/cantimaginewhy/">repository</ExternalLink>.
            
            </section>
        
          </div>
          </Container>
        </Tab.Pane>
      </Tab.Content>
    </Tab.Container>
    
  </Container>
);

export default withSizes(mapSizesToProps)(AboutPage);

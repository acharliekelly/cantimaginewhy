import React from 'react';
import Tab from 'react-bootstrap/Tab';
import Container from 'react-bootstrap/Container';
// import { Parallax } from "react-parallax";
import ExternalLink from '../../components/Buttons/ExternalLink';
import TabNavs from '../../components/Navs/TabNavs';


import './about.scss';

const AboutPage = props => (
  <Container className="content about-content">
    <header className="intro-text">
      <section>
        <p>My name is Charlie Kelly, and this is my website. It's mine in the sense that I own the domain,
        but also because I created all the artwork, and also created the website, pretty much from 
        scratch (technically from create-react-app). The reason I made a website is, art and websites are the
        two things I'm good at, and I want to show them off. Also, you can buy stuff. Or, hire me.</p>
        <p>More information about both topics can be found below.</p>
        </section>
    </header>
    <Tab.Container defaultActiveKey="art">
      <TabNavs />
      <Tab.Content>
        <Tab.Pane eventKey="art" className="art-content">


          {/* <Parallax bgImage={cleanImageSrc('me/caterpillar2')} strength={500}>
            <div style={{ height: 500 }} />
          </Parallax> */}
          <Container className="bg-area">
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
            At present, my work is mostly divided between painted landscapes, and custom name tags/plates 
            (the difference between and a name tag and a name plate is pretty much just size and complexity).
            </section>
            <section>
            When the weather is nice, I prefer to paint my landscapes <em>en plein air</em>, 
            which means standing in front of the landscape while I'm painting it.
            </section>
            </div>
          </Container>
        </Tab.Pane>
        <Tab.Pane eventKey="tech" className="tech-content">
          <Container className="bg-area">
          <div className="me-text">
          {/* <Parallax bgImage={cleanImageSrc('me/painting_trees')} strength={500}>
              <div style={{height: 500}} />
            </Parallax> */}
          <section>
            I'm also into making websites. This is one such. It's actually way more complicated than necessary - if I were just trying
            to display and/or sell art, there are dozens of commercial products available. But that wouldn't really be fun for me.
            So instead I've created an application from scratch, that uses several interesting technologies
            I've been trying to learn. If this topic interests you, more information is available in this 
            <ExternalLink 
              linkOnly 
              destinationUrl="https://cantimaginehow.blogspot.com" 
              linkText="blog" />, and also in this 
            <ExternalLink 
              linkOnly 
              destinationUrl="https://github.com/acharliekelly/cantimaginewhy/" 
              linkText="respository" />.
            
            </section>
        
          </div>
          </Container>
        </Tab.Pane>
      </Tab.Content>

      
        
    </Tab.Container>
    

  </Container>
);

export default AboutPage;

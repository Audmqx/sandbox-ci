import { compile, morph } from 'svg-path-morph';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const templates = document.getElementById('templates')
const bounds = templates.getBoundingClientRect()

const topLeftPercentage = document.getElementById('top-left-percentage')
const topRightPercentage = document.getElementById('top-right-percentage')
const botLeftPercentage = document.getElementById('bot-left-percentage')
const botRightPercentage = document.getElementById('bot-right-percentage')

const morphed = document.getElementById('morphed')

const paths = {
  topLeft: document.getElementById('top-left').getAttribute('d'),
  topRight: document.getElementById('top-right').getAttribute('d'),
  botLeft: document.getElementById('bot-left').getAttribute('d'),
  botRight: document.getElementById('bot-right').getAttribute('d')
}

const compiled = compile([
  paths.topLeft,
  paths.topRight,
  paths.botLeft,
  paths.botRight
])

const dist = (x1, y1, x2, y2) => {
  return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2))
}

const clamp = (value, min, max) => {
  return Math.min(Math.max(value, min), max)
}

window.addEventListener('mousemove', (e) => {
  let x = (e.clientX - bounds.left) / bounds.width
  let y = (e.clientY - bounds.top) / bounds.height

  if (x < 0 || x > 1 || y < 0 || y > 1) {
    x = 0
    y = 0
  }

  const distToMiddle = Math.sqrt(2) / 2

  const topRightPct = 1 - clamp(dist(x, y, 0, 0) / distToMiddle, 0, 1)
  const topLeftPct = 1 - clamp(dist(x, y, 1, 0) / distToMiddle, 0, 1)
  const botLeftPct = 1 - clamp(dist(x, y, 0, 1) / distToMiddle, 0, 1)
  const botRightPct = 1 - clamp(dist(x, y, 1, 1) / distToMiddle, 0, 1)

  topLeftPercentage.innerText = `${Math.round(topRightPct * 100)}%`
  topRightPercentage.innerText = `${Math.round(topLeftPct * 100)}%`
  botLeftPercentage.innerText = `${Math.round(botLeftPct * 100)}%`
  botRightPercentage.innerText = `${Math.round(botRightPct * 100)}%`

  morphed.setAttribute('d', morph(compiled, [
    topRightPct,
    topLeftPct,
    botLeftPct,
    botRightPct
  ]))
})

// All path elements in the page
const paths_2 = [...document.querySelectorAll('path.path-anim')];
	

// Animate the d attribute (path initial ) to the value in data-path-to;
// start when the top of its SVG reaches the bottom of the viewport and 
// end when the bottom of its SVG reaches the top of the viewport 
paths_2.forEach(el => {
    const svgEl = el.closest('svg');
    const pathTo = el.dataset.pathTo;

    gsap.timeline({
        scrollTrigger: {
            trigger: svgEl,
            start: "top bottom",
            end: "bottom top",
            scrub: true
        }
    })
    .to(el, {
        ease: 'none',
        attr: { d: pathTo }
    });
});



document.addEventListener("DOMContentLoaded", function(event) {

  
  const paths_loader = {
    from: document.getElementById('from_morph').getAttribute('d'),
    to: document.getElementById('to_morph').getAttribute('d'),
  }
  
  const compiled_loader = compile([
    paths_loader.from,
    paths_loader.to
  ])

      //  // Morph between the happy/angry faces
      //  const slightlyAngry = morph(
      //   compiled_loader,
      //   [
      //     0.5,  // 80% happy
      //     0.5   // 20% angry
      //   ]
      // )

      // // Use the face is the d attribute of a <path> element
      // document.getElementById('from_morph').setAttribute('d', slightlyAngry);
  
  let doc = document.querySelector('#click');

  doc.addEventListener('click', function(e){

    var tl = gsap.timeline();

    //we recommend breaking each to() onto its own line for legibility
    tl.to("#from_morph", {
      duration: 0.7,
      attr: { d: this.childNodes[1].children[0].dataset.pathTo },
      onComplete: tweenComplete
      }
      )
    .to("#click", {
      autoAlpha: 1,
      duration: 2,
      delay: 0.2,
      ease: "power2.inOut",
       css: { 
        bottom: "-50vh", 
        filter : "blur(95px) sepia(1)",
        } 
       });



      function tweenComplete(){

        var tl = gsap.timeline();

          tl.to(".logo_loader_container", {
          duration: 0.7,
          opacity: 0,
          }
          )
          .to('.loader_overlay', {
            duration: 1,
            delay: 0.3,
            css: {
              background: "#C7C7C7"
            }
            });
      }

        /* bottom: -50vh;
      filter: blur(95px); */
       

    // gsap.to("#from_morph", {
    //   duration: 0.7,
    //   attr: { d: this.childNodes[1].children[0].dataset.pathTo }
    //   }
    //   );
  })
  

});

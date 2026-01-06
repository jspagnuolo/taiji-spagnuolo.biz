// Initialize Lenis for smooth scrolling
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Prevent FOUC
document.body.style.visibility = 'visible';
gsap.to("body", { opacity: 1, duration: 1 });

// Progress Bar
gsap.to(".progress-bar", {
    width: "100%",
    ease: "none",
    scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 0,
    }
});

// Animate Sections
const sections = document.querySelectorAll(".master-section");

sections.forEach((section, index) => {
    
    const bgImage = section.querySelector(".bg-image");
    const content = section.querySelector(".content-wrap");
    
    // Pinning effect: Keep the section in place while we animate its contents
    // Actually, for this stack effect, let's try a strict pinning approach
    // where each section pins until the user scrolls 'through' it.
    
    // For this specific requested effect ("come into screen... text fading/zooming"):
    // We will let the user scroll normally, but use Parallax on the BG.
    
    // Parallax Background
    gsap.fromTo(bgImage, 
        { yPercent: -20 },
        {
            yPercent: 20,
            ease: "none",
            scrollTrigger: {
                trigger: section,
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        }
    );
    
    // Animate Content In
    gsap.fromTo(content,
        { 
            y: 100, 
            opacity: 0, 
            scale: 0.9 
        },
        {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: section,
                start: "top 60%", // When top of section hits 60% viewport height
                end: "top 20%",
                toggleActions: "play none none reverse"
            }
        }
    );
    
    // Image colorize on focus (Grayscale -> Color)
    gsap.to(bgImage, {
        filter: "grayscale(0%) contrast(100%) brightness(0.8)",
        duration: 1,
        scrollTrigger: {
            trigger: section,
            start: "top center",
            end: "bottom center",
            toggleActions: "play reverse play reverse"
        }
    });

});

// Lineage Connector Animation
gsap.fromTo(".lineage-connector", 
    { height: 0 },
    {
        height: "100%",
        scrollTrigger: {
            trigger: "body",
            start: "top top",
            end: "bottom bottom",
            scrub: 0
        }
    }
);

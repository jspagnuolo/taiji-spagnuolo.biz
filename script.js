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

    // Create a timeline for the pinned content
    // This makes the section 'stick' while we scroll through its text
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=100%", // Pin for one full viewport height of scrolling
            scrub: true,
            pin: true,
            anticipatePin: 1
        }
    });

    // Content entry/exit sequence
    tl.fromTo(content,
        { y: 60, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.4, ease: "power2.out" }
    )
        .to(content, { opacity: 1, duration: 0.2 }) // Hold position
        .to(content, { y: -60, opacity: 0, scale: 1.05, duration: 0.4, ease: "power2.in" });

    // Background Image Animation (Parallax + Color/Scale)
    // This happens over the entire scroll duration of the section
    gsap.fromTo(bgImage,
        {
            filter: "grayscale(100%) contrast(120%) brightness(0.5)",
            scale: 1.2
        },
        {
            filter: "grayscale(0%) contrast(100%) brightness(0.7)",
            scale: 1,
            ease: "none",
            scrollTrigger: {
                trigger: section,
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        }
    );
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

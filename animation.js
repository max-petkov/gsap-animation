// Variables
const logoContainer = document.querySelector(".logo-container");
const anotherLogo = document.querySelector(".another-logo");
const arrow = document.querySelector(".bi-arrow-down-right");
const arrowPath = document.querySelector(".bi-arrow-down-right path");
const questionContainer = document.querySelector(".question-container");
const buttons = document.querySelectorAll(".btn");

// Functions
const setSVGBorder = function (svgPath) {
  svgPath.style.strokeDasharray = svgPath.getTotalLength();
  svgPath.style.strokeDashoffset = svgPath.getTotalLength();
};

// Setting SVG paths
const svgPaths = document.querySelectorAll(".another-logo path");
const svgFillColors = [...svgPaths].map((path) => path.getAttribute("fill"));

svgPaths.forEach((path) => {
  setSVGBorder(path);
  path.setAttribute("stroke", "#fff");
  path.setAttribute("fill", "transparent");
});

setSVGBorder(arrowPath);

// Animation
svgPaths.forEach((path, i) => {
  gsap.to(svgPaths, {
    strokeDashoffset: 0,
    duration: 3,

    onComplete: () => {
      gsap.to(path, {
        stroke: "transparent",
        fill: svgFillColors[i],
        duration: 3,

        onComplete: () => {
          gsap.to(logoContainer, {
            top: "58px",
            left: "164px",
            scale: 0.5,
            duration: 1.5,
            ease: Bounce.easeOut,

            onComplete: () => {
              gsap.to(arrowPath, {
                strokeDashoffset: 0,
                duration: 2,

                onComplete: () => {
                  gsap.to(arrow, {
                    scale: 1.2,
                    duration: 1,
                    repeat: -1,
                    yoyo: true,
                  });

                  const questionTimeline = gsap.timeline();

                  questionTimeline
                    .to(questionContainer, {
                      right: 0,
                      left: "339px",
                      duration: 2,
                      ease: Elastic.easeOut,
                    })
                    .to(buttons, { y: 0, duration: 1, stagger: 1 });
                },
              });
            },
          });
        },
      });
    },
  });
});

// Variables
const logoContainer = document.querySelector(".logo-container");
const newLogoContainer = document.querySelector(".new-logo-container");
const newLogo = document.querySelector(".new-logo");
const newLogoSVGPath = document.querySelectorAll(".new-logo path");
const anotherLogo = document.querySelector(".another-logo");
const arrow = document.querySelector(".bi-arrow-down-right");
const arrowPath = document.querySelector(".bi-arrow-down-right path");
const questionContainer = document.querySelector(".question-container");
const buttons = document.querySelectorAll(".btn");
const declineButton = document.querySelector(".btn-decline");
const acceptButton = document.querySelector(".btn-accept");

// Functions
const setSVGBorder = function (svgPath) {
  svgPath.style.strokeDasharray = svgPath.getTotalLength();
  svgPath.style.strokeDashoffset = svgPath.getTotalLength();
};

// Setting SVG paths | Another Logo
const svgPaths = document.querySelectorAll(".another-logo path");
const svgFillColors = [...svgPaths].map((path) => path.getAttribute("fill"));

svgPaths.forEach((path) => {
  setSVGBorder(path);
  path.setAttribute("stroke", "#fff");
  path.setAttribute("stroke-width", "0.3");
  path.setAttribute("fill", "transparent");
});

// Setting SVG paths | New Logo
const newLogoFillColors = [...newLogoSVGPath].map((path) =>
  path.getAttribute("fill")
);

newLogoSVGPath.forEach((path) => {
  setSVGBorder(path);
  path.setAttribute("stroke", "#fff");
  path.setAttribute("stroke-width", "0.2");
  path.setAttribute("fill", "transparent");
});

// Setting SVG Path Arrow
setSVGBorder(arrowPath);

// Animation Part One
svgPaths.forEach((path, i) => {
  gsap.to(svgPaths, {
    strokeDashoffset: 0,
    duration: 3,

    onComplete: () => {
      console.log("Another logo path Complete...");
      gsap.to(path, {
        stroke: "transparent",
        fill: svgFillColors[i],
        duration: 3,

        onComplete: () => {
          console.log("Another logo fill color Complete...");

          gsap.to(logoContainer, {
            top: "58px",
            left: "164px",
            scale: 0.5,
            duration: 1.5,
            ease: Bounce.easeOut,

            onComplete: () => {
              console.log("Arrow Path Complete...");

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
                      ease: Bounce.easeOut,
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

// Animation Part Two
acceptButton.addEventListener("click", function (e) {
  const acceptTimeline = gsap.timeline({
    defaults: {
      duration: 1,
      opacity: 0,
    },
  });

  acceptTimeline
    .to(questionContainer, {
      top: "100%",
      ease: Power2.easeOut,
    })
    .to(arrow, {})
    .to(logoContainer, {
      onComplete: () => {
        console.log("new logo container complete");
        gsap.to(newLogoSVGPath, {
          strokeDashoffset: 0,
          duration: 1.5,
          stagger: 1,

          onComplete: () => {
            console.log("new logo path complete");
            newLogoSVGPath.forEach((path, i) => {
              gsap.to(path, {
                stroke: "transparent",
                fill: newLogoFillColors[i],
                duration: 2,

                onComplete: () => {
                  console.log("new logo fill color complete");
                  gsap.to(newLogo, {
                    scale: 1.01,
                    repeat: -1,
                    yoyo: true,
                    duration: 1,
                  });
                },
              });
            });
          },
        });
      },
    });
});

declineButton.addEventListener("click", function (e) {
  const errorList = document.querySelector(".error-list");
  errorList.insertAdjacentHTML(
    "beforeend",
    `
  <li class="error-list__container">
    <div class="error-list__item" style="transform: translate(0 , 0);">THIS IS NOT AN OPTION !</div>
  </li>
  `
  );
});

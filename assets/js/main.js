/**
 * Template Name: BizPage
 * Template URL: https://bootstrapmade.com/bizpage-bootstrap-business-template/
 * Updated: Aug 07 2024 with Bootstrap v5.3.3
 * Author: BootstrapMade.com
 * License: https://bootstrapmade.com/license/
 */

(function () {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector("body");
    const selectHeader = document.querySelector("#header");
    if (
      !selectHeader.classList.contains("scroll-up-sticky") &&
      !selectHeader.classList.contains("sticky-top") &&
      !selectHeader.classList.contains("fixed-top")
    )
      return;
    window.scrollY > 100
      ? selectBody.classList.add("scrolled")
      : selectBody.classList.remove("scrolled");
  }

  document.addEventListener("scroll", toggleScrolled);
  window.addEventListener("load", toggleScrolled);

  /**
   * Mobile Navigation
   */
  document.addEventListener("DOMContentLoaded", function () {
    // Sélectionner le bouton de toggle et le menu
    const mobileNavToggle = document.querySelector(".mobile-nav-toggle");
    const navmenu = document.getElementById("navmenu");

    // Ajouter un événement de clic pour ouvrir/fermer le menu
    mobileNavToggle.addEventListener("click", function () {
      // Toggle la classe pour l'état actif du menu
      navmenu.classList.toggle("mobile-nav-active");

      // Changer l'icône du bouton (de hamburger à X)
      if (navmenu.classList.contains("mobile-nav-active")) {
        mobileNavToggle.classList.remove("bi-list");
        mobileNavToggle.classList.add("bi-x");
      } else {
        mobileNavToggle.classList.remove("bi-x");
        mobileNavToggle.classList.add("bi-list");
      }
    });

    // Fermer le menu quand on clique sur un lien
    const navLinks = document.querySelectorAll(".navmenu > ul > li > a");
    navLinks.forEach((link) => {
      link.addEventListener("click", function () {
        navmenu.classList.remove("mobile-nav-active");
        mobileNavToggle.classList.remove("bi-x");
        mobileNavToggle.classList.add("bi-list");
      });
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector("#preloader");
  if (preloader) {
    window.addEventListener("load", () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector(".scroll-top");

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100
        ? scrollTop.classList.add("active")
        : scrollTop.classList.remove("active");
    }
  }
  scrollTop.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  window.addEventListener("load", toggleScrollTop);
  document.addEventListener("scroll", toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  }
  window.addEventListener("load", aosInit);

  /**
   * Auto generate the carousel indicators
   */
  document
    .querySelectorAll(".carousel-indicators")
    .forEach((carouselIndicator) => {
      carouselIndicator
        .closest(".carousel")
        .querySelectorAll(".carousel-item")
        .forEach((carouselItem, index) => {
          if (index === 0) {
            carouselIndicator.innerHTML += `<li data-bs-target="#${
              carouselIndicator.closest(".carousel").id
            }" data-bs-slide-to="${index}" class="active"></li>`;
          } else {
            carouselIndicator.innerHTML += `<li data-bs-target="#${
              carouselIndicator.closest(".carousel").id
            }" data-bs-slide-to="${index}"></li>`;
          }
        });
    });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: ".glightbox",
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll(".isotope-layout").forEach(function (isotopeItem) {
    let layout = isotopeItem.getAttribute("data-layout") ?? "masonry";
    let filter = isotopeItem.getAttribute("data-default-filter") ?? "*";
    let sort = isotopeItem.getAttribute("data-sort") ?? "original-order";

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector(".isotope-container"), function () {
      initIsotope = new Isotope(
        isotopeItem.querySelector(".isotope-container"),
        {
          itemSelector: ".isotope-item",
          layoutMode: layout,
          filter: filter,
          sortBy: sort,
        }
      );
    });

    isotopeItem
      .querySelectorAll(".isotope-filters li")
      .forEach(function (filters) {
        filters.addEventListener(
          "click",
          function () {
            isotopeItem
              .querySelector(".isotope-filters .filter-active")
              .classList.remove("filter-active");
            this.classList.add("filter-active");
            initIsotope.arrange({
              filter: this.getAttribute("data-filter"),
            });
            if (typeof aosInit === "function") {
              aosInit();
            }
          },
          false
        );
      });
  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function (swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Frequently Asked Questions Toggle
   */
  document
    .querySelectorAll(".faq-item h3, .faq-item .faq-toggle")
    .forEach((faqItem) => {
      faqItem.addEventListener("click", () => {
        faqItem.parentNode.classList.toggle("faq-active");
      });
    });

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener("load", function (e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: "smooth",
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */

  document.addEventListener("DOMContentLoaded", function () {
    // Modifier le sélecteur pour cibler les liens dans la nouvelle structure
    const navLinks = document.querySelectorAll(
      ".nav-links ul li a, .navmenu > ul li a"
    );

    // Le reste du code pour récupérer les sections reste identique
    const sections = [];
    navLinks.forEach((link) => {
      const href = link.getAttribute("href");
      if (href && href.startsWith("#") && href.length > 1) {
        const section = document.querySelector(href);
        if (section) {
          sections.push(section);
        }
      }
    });

    // Fonction pour déterminer quelle section est actuellement visible
    function getCurrentSection() {
      const scrollPosition = window.scrollY + 100;

      for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (
          scrollPosition >= sectionTop &&
          scrollPosition < sectionTop + sectionHeight
        ) {
          return section.id;
        }
      }

      return null;
    }

    // Fonction pour mettre à jour les classes actives des liens
    function updateActiveLinks() {
      const currentSectionId = getCurrentSection();

      // Retirer la classe 'active' de tous les liens
      navLinks.forEach((link) => {
        link.classList.remove("active");
      });

      // Si une section active est trouvée, ajouter la classe 'active' au lien correspondant
      if (currentSectionId) {
        navLinks.forEach((link) => {
          const href = link.getAttribute("href");
          if (href === `#${currentSectionId}`) {
            link.classList.add("active");
          }
        });
      }
    }

    // Ajouter un gestionnaire d'événements pour le clic sur les liens
    navLinks.forEach((link) => {
      link.addEventListener("click", function (e) {
        const href = this.getAttribute("href");

        if (href && href.startsWith("#") && href.length > 1) {
          e.preventDefault();
          const targetSection = document.querySelector(href);

          if (targetSection) {
            window.scrollTo({
              top: targetSection.offsetTop,
              behavior: "smooth",
            });

            setTimeout(updateActiveLinks, 500);
          }
        }
      });
    });

    // Écouter l'événement de défilement pour mettre à jour les liens actifs
    window.addEventListener("scroll", updateActiveLinks);

    // Exécuter la mise à jour initiale
    updateActiveLinks();
  });

  /* Services details */

  document.addEventListener("DOMContentLoaded", function () {
    const serviceLinks = document.querySelectorAll(".services-list a");
    const services = {
      tenues: {
        title:
          "Design personnalisé et impression de tenues qui incarnent votre identité",
        image: "assets/img/services.jpg",
        description:
          "Chez TRALAI, nous créons le design de vos polos, t-shirts ou chemises personnalisés, en lien avec votre logo ou en harmonie avec l'événement que vous organisez. En plus de la conception graphique, nous nous chargeons de l'impression des tenues, afin que vos collaborateurs ou invités portent fièrement l'image de votre entreprise.",
        points: [
          "Design sur-mesure : création de modèles uniques adaptés à votre identité et à vos besoins spécifiques",
          "Personnalisation complète : intégration de votre logo, de slogans ou de motifs en lien avec l'événement",
          "Impression professionnelle : du design à l'impression, nous garantissons une qualité irréprochable pour chaque vêtement",
        ],
      },
      goodies: {
        title: "Création de goodies et accessoires impactants",
        image: "assets/img/services.jpg",
        description:
          "Nous imaginons et créons des goodies, objets publicitaires et accessoires personnalisés qui renforcent l’image de votre entreprise et marquent les esprits de vos collaborateurs et clients. Que ce soit pour un événement spécial ou comme élément permanent de votre communication, nous vous offrons des solutions uniques.",
        points: [
          "Personnalisation : chaque objet est conçu sur mesure, pour refléter vos valeurs et votre identité visuelle",
          "Créativité : des designs originaux et innovants qui se démarquent",
          "Impact durable : des accessoires pratiques et esthétiques qui laissent une empreinte dans l’esprit de vos publics",
        ],
      },
      espaces: {
        title: "Aménagement d’espaces de travail qui inspirent",
        image: "assets/img/services.jpg",
        description:
          "Nous transformons vos bureaux et espaces de coworking pour qu&#39;ils reflètent l&#39;identité et les valeurs de votre entreprise. Chaque projet d'aménagement est conçu pour offrir un environnement de travail stimulant, fonctionnel et inspirant, en parfaite adéquationavec votre culture d'entreprise.",
        points: [
          "Design fonctionnel et esthétique : chaque espace est pensé pour optimiser l'usage tout en renforçant votre image",
          "Ambiance sur mesure : création d’un environnement de travail inspirant qui motive vos équipes",
          "Conseils experts : ergonomie, choix des matériaux, agencement et décoration adaptés à vos besoins",
        ],
      },
      evenements: {
        title: "Organisation d’événements internes marquants",
        image: "assets/img/services.jpg",
        description:
          "Nous organisons des événements internes sur mesure, tels que des séminaires stratégiques, des ateliers de teambuilding ou des sessions de formation, pour créer des moments mémorables qui renforcent la cohésion de vos équipes et véhiculent les valeurs de votre entreprise.",
        points: [
          "Personnalisation : chaque événement est conçu pour répondre à vos objectifs spécifiques et à la culture de votre entreprise",
          "Expériences immersives : des événements qui créent un impact durable grâce à des concepts originaux et adaptés",
          "Gestion clé en main : de la conception à la réalisation, nous nous occupons de tous les aspects pour vous garantir une expérience réussie",
        ],
      },
    };

    const detailsImg = document.querySelector(".services-img");
    const detailsTitle = document.querySelector("#service-details h3");
    const detailsDesc = document.querySelector("#service-details p");
    const detailsList = document.querySelector("#service-details ul");

    serviceLinks.forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault();

        // Sécurité : on vérifie si un lien actif existe avant de retirer la classe
        const currentActive = document.querySelector(".services-list a.active");
        if (currentActive) currentActive.classList.remove("active");

        this.classList.add("active");

        const key = this.textContent.trim().toLowerCase();

        let serviceKey = "";
        if (key.includes("tenues")) serviceKey = "tenues";
        else if (key.includes("goodies")) serviceKey = "goodies";
        else if (key.includes("espaces")) serviceKey = "espaces";
        else if (key.includes("événements")) serviceKey = "evenements";

        const service = services[serviceKey];
        if (!service) return;

        // Animation fluide
        const fadeTarget = document.querySelector("#service-details .col-lg-7");
        fadeTarget.style.opacity = 0;

        setTimeout(() => {
          detailsImg.src = service.image;
          detailsTitle.textContent = service.title;
          detailsDesc.textContent = service.description;

          detailsList.innerHTML = "";
          service.points.forEach((point) => {
            const li = document.createElement("li");
            li.innerHTML = `<i class="bi bi-check-circle"></i><span>${point}</span>`;
            detailsList.appendChild(li);
          });

          fadeTarget.style.opacity = 1;
        }, 300);
      });
    });
  });
})();

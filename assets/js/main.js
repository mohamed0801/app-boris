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
          "Nous imaginons et créons des goodies, objets publicitaires et accessoires personnalisés qui renforcent l'image de votre entreprise et marquent les esprits de vos collaborateurs et clients. Que ce soit pour un événement spécial ou comme élément permanent de votre communication, nous vous offrons des solutions uniques.",
        points: [
          "Personnalisation : chaque objet est conçu sur mesure, pour refléter vos valeurs et votre identité visuelle",
          "Créativité : des designs originaux et innovants qui se démarquent",
          "Impact durable : des accessoires pratiques et esthétiques qui laissent une empreinte dans l'esprit de vos publics",
        ],
      },
      espaces: {
        title: "Aménagement d'espaces de travail qui inspirent",
        image: "assets/img/services.jpg",
        description:
          "Nous transformons vos bureaux et espaces de coworking pour qu'ils reflètent l'identité et les valeurs de votre entreprise. Chaque projet d'aménagement est conçu pour offrir un environnement de travail stimulant, fonctionnel et inspirant, en parfaite adéquation avec votre culture d'entreprise.",
        points: [
          "Design fonctionnel et esthétique : chaque espace est pensé pour optimiser l'usage tout en renforçant votre image",
          "Ambiance sur mesure : création d'un environnement de travail inspirant qui motive vos équipes",
          "Conseils experts : ergonomie, choix des matériaux, agencement et décoration adaptés à vos besoins",
        ],
      },
      evenements: {
        title: "Organisation d'événements internes marquants",
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

        // Retirer la classe active de tous les liens
        const currentActive = document.querySelector(".services-list a.active");
        if (currentActive) currentActive.classList.remove("active");

        // Ajouter la classe active au lien cliqué
        this.classList.add("active");

        // Récupérer le type de service depuis l'attribut data-service
        let serviceKey = this.getAttribute("data-service");

        // Si aucun attribut data-service n'est trouvé, utiliser le texte du lien
        if (!serviceKey) {
          const key = this.textContent.trim().toLowerCase();

          if (key.includes("tenues")) serviceKey = "tenues";
          else if (key.includes("goodies")) serviceKey = "goodies";
          else if (key.includes("espaces") || key.includes("aménagement"))
            serviceKey = "espaces";
          else if (key.includes("événements") || key.includes("evenements"))
            serviceKey = "evenements";
        }

        const service = services[serviceKey];
        if (!service) return;

        // Animation fluide
        const fadeTarget = document.querySelector(".content-container");
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
/*******************************************************************
 * Devis Form
 * *****************************************************************/
document.addEventListener("DOMContentLoaded", function () {
  // Gestion des cartes de sélection des besoins
  const needsCards = document.querySelectorAll(".needs-card");

  needsCards.forEach((card) => {
    card.addEventListener("click", function () {
      // Retirer la classe active de toutes les cartes
      needsCards.forEach((c) => c.classList.remove("active"));

      // Ajouter la classe active à la carte cliquée
      this.classList.add("active");

      // Mettre à jour le sujet du formulaire en fonction de la sélection
      const serviceName = this.querySelector("h3").textContent;
      document.getElementById(
        "sujet"
      ).value = `Demande de devis pour ${serviceName}`;
    });
  });

  // Validation du formulaire
  document
    .getElementById("devis-form")
    .addEventListener("submit", function (e) {
      e.preventDefault();

      // Simuler l'envoi du formulaire
      alert(
        "Votre demande de devis a été envoyée avec succès! Nous vous contacterons très prochainement."
      );

      // Dans un vrai scénario, vous enverriez les données à votre backend ici
    });
});

/*******************************************************************
 * Portfolio Swipper
 * *****************************************************************/

document.addEventListener("DOMContentLoaded", function () {
  // Configuration des détails pour chaque slide du portfolio avec les chemins d'images
  const portfolioItems = [
    {
      // Slide 1
      imagePath: "assets/img/portfolio/app-1.jpg",
      category: "Goodies",
      client: "Tech Vision",
      date: "15 Janvier, 2023",
      title: "Application de gestion pour entreprise",
      description:
        "Cette application mobile professionnelle développée pour Tech Vision permet une gestion simplifiée des processus internes. Interface intuitive et fonctionnalités avancées permettent aux équipes de travailler plus efficacement, en parfaite mobilité.",
    },
    {
      // Slide 2
      imagePath: "assets/img/portfolio/product-1.jpg",
      category: "Tenues Corporate",
      client: "ASU Company",
      date: "01 Mars, 2022",
      title: "Collection de tenues personnalisées",
      description:
        "Une collection complète de tenues corporate conçue spécifiquement pour ASU Company. Ces polos, t-shirts et chemises reflètent parfaitement l'identité de la marque tout en offrant confort et style aux employés. Un design soigné qui renforce la cohésion d'équipe et l'image professionnelle.",
    },
    {
      // Slide 3
      imagePath: "assets/img/portfolio/branding-1.jpg",
      category: "Design d'Espace",
      client: "Harmonie Group",
      date: "12 Juin, 2022",
      title: "Aménagement d'espace de travail collaboratif",
      description:
        "Réaménagement complet des espaces de travail pour Harmonie Group, créant un environnement à la fois fonctionnel et inspirant. Notre design intègre les valeurs de l'entreprise tout en favorisant la collaboration et le bien-être des équipes.",
    },
    {
      // Slide 4
      imagePath: "assets/img/portfolio/books-1.jpg",
      category: "Événement Corporate",
      client: "Éditions Lumière",
      date: "20 Septembre, 2022",
      title: "Séminaire annuel & team building",
      description:
        "Organisation du séminaire annuel des Éditions Lumière combinant sessions stratégiques et activités de cohésion. L'événement a parfaitement reflété les valeurs de l'entreprise tout en renforçant les liens entre collaborateurs dans un cadre inspirant.",
    },
  ];

  // Fonction pour modifier les images et détails du carousel
  function updateCarouselWithNewImages(newImages) {
    const swiperElement = document.querySelector(
      ".portfolio-details-slider.swiper"
    );
    if (swiperElement && swiperElement.swiper) {
      const swiper = swiperElement.swiper;

      // Détruire l'instance Swiper actuelle
      swiper.destroy(true, true);

      // Vider le conteneur des slides
      const swiperWrapper = document.querySelector(
        ".portfolio-details-slider .swiper-wrapper"
      );
      swiperWrapper.innerHTML = "";

      // Créer de nouvelles slides avec les nouvelles images
      newImages.forEach((item) => {
        const slide = document.createElement("div");
        slide.className = "swiper-slide";

        const img = document.createElement("img");
        img.src = item.imagePath;
        img.alt = item.title || "";

        slide.appendChild(img);
        swiperWrapper.appendChild(slide);
      });

      // Réinitialiser le swiper avec la configuration existante
      const swiperConfig = JSON.parse(
        document.querySelector(".swiper-config").textContent
      );
      new Swiper(".portfolio-details-slider.swiper", swiperConfig);

      // Réattacher l'écouteur d'événements après réinitialisation
      const newSwiper = document.querySelector(
        ".portfolio-details-slider.swiper"
      ).swiper;

      newSwiper.on("slideChange", function () {
        updatePortfolioDetails(newSwiper.realIndex, newImages);
      });

      // Mettre à jour les détails pour la première slide
      updatePortfolioDetails(0, newImages);
    }
  }

  // Fonction pour mettre à jour les détails du portfolio
  function updatePortfolioDetails(slideIndex, items) {
    const details = items[slideIndex % items.length];

    if (details) {
      // Mise à jour des informations du projet
      document.querySelector(
        ".portfolio-info li:nth-child(1) strong"
      ).nextSibling.nodeValue = ": " + details.category;
      document.querySelector(
        ".portfolio-info li:nth-child(2) strong"
      ).nextSibling.nodeValue = ": " + details.client;
      document.querySelector(
        ".portfolio-info li:nth-child(3) strong"
      ).nextSibling.nodeValue = ": " + details.date;

      // Mise à jour de la description
      document.querySelector(".portfolio-description h2").textContent =
        details.title;
      document.querySelector(".portfolio-description p").textContent =
        details.description;
    }
  }

  // Attendre que Swiper soit initialisé
  const checkSwiper = setInterval(function () {
    const swiperElement = document.querySelector(
      ".portfolio-details-slider.swiper"
    );
    if (swiperElement && swiperElement.swiper) {
      clearInterval(checkSwiper);

      const swiper = swiperElement.swiper;

      // Configurer l'événement pour le changement de slide initial
      swiper.on("slideChange", function () {
        updatePortfolioDetails(swiper.realIndex, portfolioItems);
      });

      // Mettre à jour les détails pour la première slide
      updatePortfolioDetails(swiper.realIndex, portfolioItems);

      // Exemple: si vous voulez changer les images à partir d'un autre événement
      // Par exemple, en réponse à un clic sur un bouton
      document.addEventListener("click", function (e) {
        if (e.target && e.target.classList.contains("change-portfolio")) {
          const portfolioType = e.target.getAttribute("data-portfolio");

          // Vous pourriez avoir différentes configurations d'images
          // selon le type de portfolio
          if (portfolioType === "tenues") {
            const tenuesToShow = [
              {
                imagePath: "assets/img/portfolio/tenue-1.jpg",
                category: "Tenues Corporate",
                client: "Entreprise A",
                date: "10 Janvier, 2023",
                title: "Collection Élégance Professionnelle",
                description:
                  "Ensemble de tenues corporate haut de gamme combinant style moderne et confort pour le quotidien professionnel.",
              },
              {
                imagePath: "assets/img/portfolio/tenue-2.jpg",
                category: "Tenues Corporate",
                client: "Entreprise B",
                date: "15 Mars, 2023",
                title: "Uniformes Corporate Personnalisés",
                description:
                  "Uniforme sur-mesure reflétant l'identité visuelle de l'entreprise tout en offrant une liberté de mouvement optimale.",
              },
              // Ajoutez d'autres tenues si nécessaire
            ];
            updateCarouselWithNewImages(tenuesToShow);
          } else if (portfolioType === "goodies") {
            // Configuration pour les goodies
            const goodiesToShow = [
              // Définir les images et détails des goodies
            ];
            updateCarouselWithNewImages(goodiesToShow);
          }
          // Ajoutez d'autres conditions pour d'autres types de portfolio
        }
      });
    }
  }, 100);

  // Fonction utilitaire pour créer un bouton de changement de portfolio (exemple)
  function createPortfolioChangeButtons() {
    const buttonsContainer = document.createElement("div");
    buttonsContainer.className = "portfolio-change-buttons my-3";

    const buttonTypes = [
      { type: "tenues", text: "Voir Tenues" },
      { type: "goodies", text: "Voir Goodies" },
      { type: "espaces", text: "Voir Espaces" },
      { type: "evenements", text: "Voir Événements" },
    ];

    buttonTypes.forEach((btn) => {
      const button = document.createElement("button");
      button.className = "btn btn-sm btn-outline-primary m-1 change-portfolio";
      button.setAttribute("data-portfolio", btn.type);
      button.textContent = btn.text;
      buttonsContainer.appendChild(button);
    });

    // Insérer les boutons après le carousel
    const portfolioSlider = document.querySelector(".portfolio-details-slider");
    if (portfolioSlider) {
      portfolioSlider.parentNode.insertBefore(
        buttonsContainer,
        portfolioSlider.nextSibling
      );
    }
  }

  // Décommentez cette ligne si vous voulez ajouter des boutons pour changer les images
  // createPortfolioChangeButtons();
});

import toggleBodyLock from './../helpers/toggleBodyLock';
import { html, firstScreen, header } from './../helpers/elementsNodeList';

// Проверка браузера на поддержку .webp изображений ======================================================
function isWebp() {
  // Проверка поддержки webp
  const testWebp = (callback) => {
    const webP = new Image();

    webP.onload = webP.onerror = () => callback(webP.height === 2);
    webP.src =
      'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
  };

  // Добавление класса _webp или _no-webp для HTML
  testWebp((support) => {
    const className = support ? 'webp' : 'no-webp';
    html.classList.add(className);
  });
}

/* Проверка мобильного браузера */
const isMobile = {
  Android: () => navigator.userAgent.match(/Android/i),
  BlackBerry: () => navigator.userAgent.match(/BlackBerry/i),
  iOS: () => navigator.userAgent.match(/iPhone|iPad|iPod/i),
  Opera: () => navigator.userAgent.match(/Opera Mini/i),
  Windows: () => navigator.userAgent.match(/IEMobile/i),
  any: () =>
    isMobile.Android() ||
    isMobile.BlackBerry() ||
    isMobile.iOS() ||
    isMobile.Opera() ||
    isMobile.Windows(),
};

/* Добавление класса touch для HTML если браузер мобильный */
function addTouchClass() {
  // Добавление класса _touch для HTML если браузер мобильный
  if (isMobile.any()) {
    html.classList.add('touch');
  }
}

// Добавление loaded для HTML после полной загрузки страницы
function addLoadedClass() {
  window.addEventListener('load', () => {
    setTimeout(() => {
      html.classList.add('loaded');
    }, 0);
  });
}

// Получение хеша в адресе сайта
const getHash = () => location.hash?.replace('#', '');

// Указание хеша в адресе сайта
function setHash(hash) {
  hash = hash ? `#${hash}` : location.href.split('#')[0];
  history.pushState('', '', hash);
}
function homeRedirect() {
  var bookButton = document.getElementById("bookButton");
  if (bookButton) {
    bookButton.onclick = function() {
      window.open("https://calendly.com/detailingonwheels-ca/booking", "_blank");
    };
  }
}

// Универсальная функция для открытия и закрытия попапов ==================================================
const togglePopupWindows = () => {
  document.addEventListener('click', ({ target }) => {
    if (target.closest('[data-type]')) {
      const popup = document.querySelector(
        `[data-popup="${target.dataset.type}"]`
      );

      if (document.querySelector('._is-open')) {
        document.querySelectorAll('._is-open').forEach((modal) => {
          modal.classList.remove('_is-open');
        });
      }

      popup.classList.add('_is-open');
      toggleBodyLock(true);
    }

    if (
      target.classList.contains('_overlay-bg') ||
      target.closest('.button-close')
    ) {
      const popup = target.closest('._overlay-bg');

      popup.classList.remove('_is-open');
      toggleBodyLock(false);
    }
  });
};

const faqPage = () => {
  const items = document.querySelectorAll(".accordion button");

  function toggleAccordion() {
    const itemToggle = this.getAttribute('aria-expanded');
    
    for (var i = 0; i < items.length; i++) {
      items[i].setAttribute('aria-expanded', 'false');
    }
    
    if (itemToggle == 'false') {
      this.setAttribute('aria-expanded', 'true');
    }
  }
  items.forEach(item => item.addEventListener('click', toggleAccordion));
}

function burgerMenu () {
  const mobileNavButton = document.querySelector('.mobile-nav-button');
  const menuItems = document.querySelectorAll('.mobile-menu li a');

  function handleClick() {
    mobileNavButton.click();
  }

  menuItems.forEach((menuItem) => {
    menuItem.addEventListener('click', handleClick);
  });

  document.querySelector('.mobile-nav-button').addEventListener('click', function() {
      var line1 = document.querySelector(".mobile-nav-button .mobile-nav-button__line:nth-of-type(1)");
      var line2 = document.querySelector(".mobile-nav-button .mobile-nav-button__line:nth-of-type(2)");
      var line3 = document.querySelector(".mobile-nav-button .mobile-nav-button__line:nth-of-type(3)");
      
      line1.classList.toggle("mobile-nav-button__line--1");
      line2.classList.toggle("mobile-nav-button__line--2");
      line3.classList.toggle("mobile-nav-button__line--3");
      
      var mobileMenu = document.querySelector('.mobile-menu');
      mobileMenu.classList.toggle('mobile-menu--open');
      
      return false;
  });
}

export {
  isWebp,
  homeRedirect,
  addTouchClass,
  togglePopupWindows,
  addLoadedClass,
  burgerMenu,
  getHash,
  faqPage,
  setHash
};
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

    console.log(support ? 'webp поддерживается' : 'webp не поддерживается');
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

// Функция для фиксированной шапки при скролле ===========================================================
function headerFixed() {
  const headerStickyObserver = new IntersectionObserver(([entry]) => {
    header.classList.toggle('sticky', !entry.isIntersecting);
  });

  if (firstScreen) {
    headerStickyObserver.observe(firstScreen);
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

function validateForm() {
  var n = document.getElementById('name').value;
  var e = document.getElementById('email').value;
  var s = document.getElementById('subject').value;
  var m = document.getElementById('message').value;
  var onlyLetters = /^[a-zA-Z\s]*$/;
  var onlyEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (n === "" || n === null) {
    document.getElementById('nameLabel').innerHTML = 'Please enter your name';
    document.getElementById('name').style.borderColor = "red";
    return false;
  }

  if (!n.match(onlyLetters)) {
    document.getElementById('nameLabel').innerHTML = 'Please enter only letters';
    document.getElementById('name').style.borderColor = "red";
    return false;
  }

  if (e === "" || e === null) {
    document.getElementById('emailLabel').innerHTML = 'Please enter your email';
    document.getElementById('email').style.borderColor = "red";
    return false;
  }

  if (!e.match(onlyEmail)) {
    document.getElementById('emailLabel').innerHTML = 'Please enter a valid email address';
    document.getElementById('email').style.borderColor = "red";
    return false;
  }

  if (s === "" || s === null) {
    document.getElementById('subjectLabel').innerHTML = 'Please enter your subject';
    document.getElementById('subject').style.borderColor = "red";
    return false;
  }

  if (!s.match(onlyLetters)) {
    document.getElementById('subjectLabel').innerHTML = 'Please enter only letters';
    document.getElementById('subject').style.borderColor = "red";
    return false;
  }

  if (m === "" || m === null) {
    document.getElementById('messageLabel').innerHTML = 'Please enter your message';
    document.getElementById('message').style.borderColor = "red";
    return false;
  }

  return true;
}

function burgerMenu() {
    //Menu button on click event
    document.querySelector('.mobile-nav-button').addEventListener('click', function() {
      console.log('here');
      
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
  isMobile,
  addTouchClass,
  headerFixed,
  togglePopupWindows,
  addLoadedClass,
  getHash,
  faqPage,
  setHash,
  validateForm,
  burgerMenu,
};
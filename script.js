/* =========================================================
   ГЛАВНЫЙ JS-ФАЙЛ САЙТА
   Подключается в index.html перед </body>:
   <script src="script.js"></script>
========================================================= */

document.addEventListener('DOMContentLoaded', function () {

  /* ---------------------------------------------------------
     1. МОБИЛЬНОЕ МЕНЮ (бургер)
  --------------------------------------------------------- */
  var burger = document.querySelector('.burger');
  var nav = document.querySelector('.nav');
  var navLinks = document.querySelectorAll('.nav a');

  if (burger && nav) {
    burger.addEventListener('click', function () {
      nav.classList.toggle('active');
      burger.classList.toggle('active');
      document.body.classList.toggle('no-scroll');
    });

    navLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('active');
        burger.classList.remove('active');
        document.body.classList.remove('no-scroll');
      });
    });
  }

  /* ---------------------------------------------------------
     2. ПЛАВНЫЙ СКРОЛЛ ДО ЯКОРЕЙ
  --------------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId.length > 1) {
        var target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          var headerHeight = document.querySelector('.header')
            ? document.querySelector('.header').offsetHeight
            : 0;
          var top = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 10;
          window.scrollTo({ top: top, behavior: 'smooth' });
        }
      }
    });
  });

  /* ---------------------------------------------------------
     3. ФИКСАЦИЯ ШАПКИ ПРИ СКРОЛЛЕ (добавляет тень/фон)
  --------------------------------------------------------- */
  var header = document.querySelector('.header');
  if (header) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 10) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  /* ---------------------------------------------------------
     4. ПРОСТАЯ ВАЛИДАЦИЯ ФОРМЫ ОБРАТНОЙ СВЯЗИ
     (id формы должен быть "contact-form")
  --------------------------------------------------------- */
  var form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var nameField = form.querySelector('[name="name"]');
      var phoneField = form.querySelector('[name="phone"]');
      var emailField = form.querySelector('[name="email"]');
      var messageBox = form.querySelector('.form-message');

      var errors = [];

      if (nameField && nameField.value.trim().length < 2) {
        errors.push('Введите корректное имя');
      }

      if (phoneField) {
        var phoneClean = phoneField.value.replace(/\D/g, '');
        if (phoneClean.length < 10) {
          errors.push('Введите корректный номер телефона');
        }
      }

      if (emailField && emailField.value.trim() !== '') {
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailField.value.trim())) {
          errors.push('Введите корректный email');
        }
      }

      if (errors.length > 0) {
        if (messageBox) {
          messageBox.textContent = errors.join('. ');
          messageBox.style.color = '#dc2626';
        } else {
          alert(errors.join('. '));
        }
        return;
      }

      // Если валидация прошла — здесь можно подключить отправку
      // на сервер (fetch/AJAX) или на email-сервис (Formspree, EmailJS и т.д.)
      // Пример базовой отправки через fetch на свой backend:
      //
      // fetch('/send.php', {
      //   method: 'POST',
      //   body: new FormData(form)
      // }).then(...)

      if (messageBox) {
        messageBox.textContent = 'Спасибо! Ваша заявка отправлена.';
        messageBox.style.color = '#16a34a';
      } else {
        alert('Спасибо! Ваша заявка отправлена.');
      }

      form.reset();
    });
  }

  /* ---------------------------------------------------------
     5. ПОЯВЛЕНИЕ ЭЛЕМЕНТОВ ПРИ СКРОЛЛЕ (fade-in анимация)
     Добавьте класс "reveal" любому блоку в HTML
  --------------------------------------------------------- */
  var revealElements = document.querySelectorAll('.reveal');
  if (revealElements.length > 0 && 'IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealElements.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    revealElements.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  /* ---------------------------------------------------------
     6. КНОПКА "НАВЕРХ"
     Добавьте в HTML элемент: <button class="to-top">↑</button>
  --------------------------------------------------------- */
  var toTopBtn = document.querySelector('.to-top');
  if (toTopBtn) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 400) {
        toTopBtn.classList.add('show');
      } else {
        toTopBtn.classList.remove('show');
      }
    });

    toTopBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------------------------------------------------------
     7. ПРОСТОЙ СЛАЙДЕР / КАРУСЕЛЬ (если есть .slider на странице)
     Разметка:
     <div class="slider">
       <div class="slider-track">
         <div class="slide">...</div>
         <div class="slide">...</div>
       </div>
       <button class="slider-prev">‹</button>
       <button class="slider-next">›</button>
     </div>
  --------------------------------------------------------- */
  var sliders = document.querySelectorAll('.slider');
  sliders.forEach(function (slider) {
    var track = slider.querySelector('.slider-track');
    var slides = slider.querySelectorAll('.slide');
    var prevBtn = slider.querySelector('.slider-prev');
    var nextBtn = slider.querySelector('.slider-next');
    var index = 0;

    function updateSlider() {
      track.style.transform = 'translateX(-' + (index * 100) + '%)';
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', function () {
        index = (index + 1) % slides.length;
        updateSlider();
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', function () {
        index = (index - 1 + slides.length) % slides.length;
        updateSlider();
      });
    }

    // Автопрокрутка каждые 5 секунд
    if (slides.length > 1) {
      setInterval(function () {
        index = (index + 1) % slides.length;
        updateSlider();
      }, 5000);
    }
  });

});

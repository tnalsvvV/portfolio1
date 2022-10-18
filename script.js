const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const nav = document.querySelector('.nav');

const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

/////////////////////////////////////////////////////////////////modal window
const openModal = function (e) {
    e.preventDefault();
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
};

const closeModal = function (e) {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function(e) {
    if(e.key == 'Escape' && !modal.classList.contains('hidden')){
        closeModal();
    }
});

////////////////////////////////////////////////////////////////////Button scrolling(동작안됨)
// const btnScrollTo = document.querySelector('.btn--scroll-to');
// const section1 = document.querySelector('#section--1');

// btnScrollTo.addEventListener('click', function (e) {
//   const s1coords = section1.getBoundingClientRect();
//   console.log(s1coords);

//   console.log(e.target.getBoundingClientRect());

//   console.log('Current scroll (X/Y)', window.pageXOffset, pageYOffset);

//   console.log(
//     'height/width vewport',
//     document.documentElement.clientHeight,
//     document.documentElement.clientWidth
//   );

//   //Scrolling
//   // window.scrollTo(
//   //   s1coords.left + window.pageXoffset,
//   //   s1coords.top + window.pageYOffset
//   // );

//   // window.scrollTo({
//   //   left: s1coords.left + window.pageXoffset,
//   //   top: s1coords.top + window.pageYOffset,
//   //   behavior: 'smooth',
//   // });

//   section1.scrollIntoView({ behavior: 'smooth' });
// });

btnScrollTo.addEventListener('click', function(e) {
    const s1coords = section1.getBoundingClientRect();
    // console.log(s1coords);
    // console.log(e.target.getBoundingClientRect());
    // console.log('Current scroll (X/Y)', window.pageXOffset, window.pageYOffset);
    // console.log('height/width viewport', document.documentElement.clientHeight, document.documentElement.clientWidth);
    // Scrolling
    // window.scrollTo({
    //     left: s1coords.left + window.pageXOffset,
    //     top: s1coords.top + window.pageYOffset,
    //     behavior: 'smooth',
    // });
    
    section1.scrollIntoView({behavior: 'smooth'});
});

////////////////////////////////////////////////////////////////////page navigation
// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//      //console.log('LINK');
//     const id = this.getAttribute('href');
//     console.log(id);
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

//1.Add event listener to common parent element
//2.Determine what element originated the event

document.querySelector('.nav__links').addEventListener('click', function(e){
    if(e.target.classList.contains('nav__link')) {
        e.preventDefault();
        console.log(e.target);
        const id = e.target.getAttribute('href');
        console.log(id);
        document.querySelector(id).scrollIntoView({behavior:'smooth'});
    }
});

////////////////////////////////////////////////////////////////////////////tab
// const h1 = document.querySelector('h1');

// //Going downwards: child
// console.log(h1.querySelectorAll('.highlight'));
// console.log(h1.childNodes);
// console.log(h1.children);
// h1.firstElementChild.style.color = 'white';
// h1.lastElementChild.style.color = 'orangered';

// //Going upwards: parents
// console.log(h1.parentNode);
// console.log(h1.parentElement);

// h1.closest('.header').style.background = 'var(--gradient-secondary)';
// h1.closest('.header__title').style.background = 'var(--gradient-secondary)';
// h1.closest('h1').style.background = 'var(--gradient-primary)';

// //Going sideways: siblings
// console.log(h1.previousElementSibling);
// console.log(h1.nextElementSibling);

// console.log(h1.previousSibling);
// console.log(h1.nextSibling);

// console.log(h1.parentElement.children);
// [...h1.parentElement.children].forEach(function (el) {
//   if (el !== h1) el.style.transform = 'scale(0.5)';
// });

///////////적용
tabsContainer.addEventListener('click', function (e) {
//   const clicked = e.target;
    const clicked = e.target.closest('.operations__tab');
  console.log(clicked);

  // Guard clause
  if (!clicked) return;

  // Remove active classes
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  // Activate tab
  clicked.classList.add('operations__tab--active');

  // Activate content area
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active');
});

/////////////////////////////////////////////////////////////////menu fade animation
const handleHover = function(e) {
    if(e.target.classList.contains('nav__link')){
        const link = e.target;
        // console.log(link); //a요소들
        const siblings = link.closest('.nav').querySelectorAll('.nav__link');
        //link.closest('.nav') nav__item의 모든 nav__link에 접근하기 위함
        // console.log(siblings); //모든 .nav__link
        const logo = link.closest('.nav').querySelector('img');

        siblings.forEach(el => {
            if(el !==link)el.style.opacity = this;
        });
        logo.style.opacity = this;
        console.log(this); //over: 0.5 out: 1
    }
};

nav.addEventListener("mouseover", handleHover.bind(0.5));
nav.addEventListener("mouseout", handleHover.bind(1.0));

///////////////////////////////////////////////////////////////////sticky navigation
// //1. first way -- not recommended
// const initialCoords = section1.getBoundingClientRect();
// // console.log(initialCoords);

// window.addEventListener('scroll', function () {
//     //   console.log(window.scrollY);
    
//     if (this.window.scrollY > initialCoords.top) nav.classList.add('sticky');
//     else nav.classList.remove('sticky');
// });

//// 2. better way -- better way using Intersection Observer API
// const obsCallback = function (entries, observer) {
//   entries.forEach(entry => {
//     console.log(entry);
//   });
// };

// const obsOptions = {
//   root: null, //target (section1) to intersect the entire viewport //현재 보이는 뷰포트 그대로의 위치값
//   threshold: 0.1, //intersecting at 10% of the area to get noticed //10%의 스크롤 움직임
// };

// const observer = new IntersectionObserver(obsCallback, obsOptions);
// observer.observe(section1);

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;
  console.log(entry);

  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0, //when header is entirely out of viewport then event happens
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

/////////////////////////////////////////////////////////////////////Reveal sections
const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;
  console.log(entry);

  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target); //no more observing after postions read
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
  rootMargin: '200px',
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

////////////////////////////////////////////////////////////////////////lazy loading
const imgTargets = document.querySelectorAll('img[data-src]');
//console.log(imgTargets);

const loadImg = function (entries, observer) {
  const [entry] = entries;
  //console.log(entry);

  if (!entry.isIntersecting) return;

  //Replace src with data-src
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
});

imgTargets.forEach(img => imgObserver.observe(img));

///////////////////////////////////////////////////////////////////////////////////////////slider
//slider
const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  let curSlide = 0;
  const maxSlide = slides.length;

  // const slider = document.querySelector('.slider');
  // slider.style.transform = 'scale(0.4) translateX(-600px)';
  // slider.style.overflow = 'visible';

  // slides.forEach((s, i) => (s.style.transform = `translateX(${100 * i}%)`));
  //0%, 100%, 200%, 300%

  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  //functions
  const activateDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
      //when curSlide is 1, forEach loop is executed
    );
  };

  //next slide
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };
  const init = function () {
    createDots();
    activateDot(0);
    goToSlide(0);
  };
  init();

  //event handlers
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    console.log(e);
    if (e.key === 'ArrowLeft') prevSlide();
    e.key === 'ArrowRight' && nextSlide();
  });
  //curSlide = 1: -100%, 0%, 100%, 200%

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      console.log('DOT');
      // const slide = e.target.dataset.slide;
      const { slide } = e.target.dataset;
      console.log(slide);
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
slider();

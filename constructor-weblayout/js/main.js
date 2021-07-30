// new Swiper('.swiper-container', {
// 	loop: true,
// 	navigation: {
// 		nextEl: '.arrow',
// 	},
// 	breakpoints: {
// 		320: {
// 			slidesPerView: 1,
// 			spaceBetween: 20
// 		},
// 		541: {
// 			slidesPerView: 2,
// 			spaceBetween: 40
// 		}
// 	}
// });

// для кнпоки бургера:
// const menuButton = document.querySelector('.menu-button');
// const menu = document.querySelector('.header');
// menuButton.addEventListener('click', function () {
  // 	menuButton.classList.toggle('menu-button-active');
  // 	menu.classList.toggle('header-active');
// })


const getElement = (tagName, classNames, attributes) => { //  получает тэг, attributes это атрибуты тэга

  const element = document.createElement(tagName); // <tagName></tagName>
  if(classNames){ // есл передали classNames, массив классов ['', '', '']
    element.classList.add(...classNames); // ... spread оперратор, он раcписывает  элементы, то есть test hello world
  }

  if(attributes){ // attributes = { src: item.image, alt: item.title } { textContent: genre }
    for(const attribute in attributes){ // ЭТОТ ЦИКЛ ПЕРЕБИРАЕТ ОБЪЕКТЫ 
      console.log('attribute  ', attribute ); // src, alt
      element[attribute] = attributes[attribute]; 
    }
  }

  return element;
};



//                    param = { header: {logo, menu, social}, title }
const createHeader = ({ header: {logo, menu, social}, title }) => { // param  деструткруировали

  const header = getElement('header'); // получаем тэг <header> </header> 
  const container = getElement('div', ['container']); // <div class="container"> </div> 
  const wrapper = getElement('div', ['header']); // <div class="header"></div>

  if(logo){ // если лого передали param.header.logo
    const logo1 = getElement('img', ['logo']); // <img class="logo">
    logo1.src = logo; // до деструткризации было так  param.header.logo
    logo1.alt = 'Логотип ' + title; //до деструткризации было так   param.title
    wrapper.append(logo1);
  }

  if(menu){ // если свойство menu существует  param.header.menu
      const nav = getElement('nav', ['menu-list']); // родитель для ссылок меню
      //  до деструткризации было так param.header.menu  
      const allMenuLink = menu.map((item) => {  // перебираем массив [ {title: 'Описание', link: '#'}, {title: 'Трейлер', link: '#'}, {} ]
        const menuLink = getElement('a', ['menu-link'], { href: item.link, textContent: item.title }); // <a class="menu-link"></a>
        console.dir(menuLink);
        nav.append(menuLink); // <nav> <a class="menu-link"></a> </nav>
        // вместо нижних дву строк, сделали через деструктуризацию:
        // menuLink.href = item.link; // <a class="menu-link" href="#"></a>
        // menuLink.textContent = item.title; // <a class="menu-link" href="#">title</a>
        return menuLink; // <a></a>
    });

    wrapper.append(nav); // <nav> добавлем в <div class="header">
  }

  if(social){ // param.header.social
    const socialWrapper = getElement('div', ['social']); // <div class="social">
    //                 param.header.social
    const allSocial =  social.map((item) => {  // перебираем массив атрибутов [ {title: 'Twitter', link: '#', image: 'witcher/social/twitter.svg'}, {{title: 'Twitter', link: '#', image: 'witcher/social/twitter.svg'}}, {{title: 'Twitter', link: '#', image: 'witcher/social/twitter.svg'}}]
        const socialLink = getElement('a', ['social-link']); // <a class="social-link"></a>
        socialLink.append(getElement('img', [], { src: item.image, alt: item.title }));
        socialLink.href = item.link;

        return socialLink;
    });
    //console.log('allSocial ', allSocial);
    socialWrapper.append(...allSocial); //
    wrapper.append(socialWrapper);
  }

  if(menu){
    const menuBtn = getElement('button', ['menu-button']);

    menuBtn.addEventListener('click', () => {
        menuBtn.classList.toggle('menu-button-active');
        wrapper.classList.toggle('header-active');
    });
    container.append(menuBtn);

  }

  container.append(wrapper);
  header.append(container); // добавлzем  <div class="container"> </div>  в <header> </header>

  return header; //
};


const createMain = ( { title, main: { genre, rating, description, trailer, slider } }) => { // деструктризация, вместо двух строк ниже, объект передаем сразу же

  // const { title, main } = param;
  // const { genre, rating, description, trailer } = main; 
  // console.log({ rating, main, genre, title, description });

  const main = getElement('main');
  const container = getElement('div', ['container']);
  main.append(container);

  const wrapper = getElement('div', ['main-content']);
  container.append(wrapper);

  const content = getElement('div', ['content']);
  wrapper.append(content);

  //<span class="genre animated fadeInRight">2019,фэнтези</span>
  if(genre){ // если этот элемент есть
    const genreSpan = getElement('span', ['genre', 'animated', 'fadeInRight'], { textContent: genre });
    content.append(genreSpan);
  }

  if(rating){
    const ratingBlock = getElement('div', ['rating', 'animated', 'fadeInRight']);
  
    const ratingStars = getElement('div', ['rating-stars']);
  
    const ratingNumber = getElement('div', ['rating-number'], { textContent: `${rating}/10` });

    for(let i = 0; i < 10; i++){ //<img src="img/star.svg" alt="Рейтинг 7 из 10" class="star">
        const star = getElement('img', ['star'], { alt: i ? '' : `Рейтинг ${rating} из 10`,  src: i < rating ? 'img/star.svg' : 'img/star-o.svg'});
        ratingStars.append(star);
    }

    ratingBlock.append(ratingStars, ratingNumber); // append может прирмать несколько элементво, он их добавит поп орялку

    content.append(ratingBlock);
  }

  //<h1 class="main-title animated fadeInRight">Ведьмак</h1>
  content.append(getElement('h1', ['main-title', 'animated', 'fadeInRight'], { textContent: `${title}` }));

  if(description){
    const descriptionElem = getElement('p', ['main-description', 'animated', 'fadeInRight'], { textContent: description });
    content.append(descriptionElem);        
  }

  // <a href="https://www.youtube.com/watch?v=P0oJqfLzZzQ" class="button animated fadeInRight youtube-modal">Смотреть трейлер</a>:
  if(trailer){
    const youtubeLink = getElement('a', ['button', 'animated', 'fadeInRight', 'youtube-modal'], { href: `${trailer}`, textContent: 'Смотреть трейлер', ariaLabel: 'Смотреть трейлер' });

    const youtubeImageLink = getElement('a', ['play', 'youtube-modal'], { href: `${trailer}`});
    const iconYoutube = getElement('img', ['play-img'], { src: 'img/play.svg', alt: 'play', ariaHidden: true});

    youtubeImageLink.append(iconYoutube);
    content.append(youtubeLink);
    wrapper.append(youtubeImageLink);
  }

  if(slider){
    const sliderBlock = getElement('div', ['series']);
    const swiperBlock = getElement('div', ['swiper-container']);
    const swiperWrapper = getElement('div', ['swiper-wrapper']);
    const arrow = getElement('button', ['arrow']);

    const slides = slider.map((item) => { // перебираем массив [{},{},{},{}]
        const swiperSlide = getElement('div', ['swiper-slide']);
        const figure = getElement('figure', ['card']);
        const img  = getElement('img', ['card-img'], {src: '', alt: ''});
        const figcaprtion = getElement('figcaption', ['card-description']);
        const cardSubtitle = getElement('p', ['card-subtitle']);
        const cardTitle = getElement('p', ['card-title']);

        figcaprtion.append(cardSubtitle, cardTitle); // сперва добавится  cardSubtitle, потом cardTitle

        return slides;
    });
  }

  return main;
}; 

//отсюда все начниается:        
const movieConstructor = (selector, options) => { 

  const app = document.querySelector(selector);
  app.style.backgroundImage = options.background ? `url("${options.background}")` : ''; // `` - шаблонная строка, в  ней можо использват интерполяцию ${}

  if(options.favicon){ // если есть свойство favicon
    const index = options.favicon.lastIndexOf('.'); // ищет в строке  символ точки и возвращает ее индекс
    const type = options.favicon.substring(index + 1); // из строки возвращает подстроку начиная с index, т е  выведет png
    
    const favicon = getElement('link', [], { rel: 'shortcut icon', href: options.favicon, type: type === 'svg' ? 'image/svg-xml' : type });
    
    document.head.append(favicon); // 
  } 
  


  app.classList.add('body-app');
  document.title = options.title;
  document.favicon = options.favicon;

  if(options.header){ // если передали header
    app.append(createHeader(options)); // всатвляем верстку в родитель 
  }

  if(options.main){
    app.append(createMain(options));
  }
};


// .app класс:
movieConstructor('.app',  // вызов метода
    {
      title: 'Мой Ведьмак', 
      favicon: 'witcher/logo.png',
      background: 'witcher/background.jpg',
      header: {
        logo: 'witcher/logo.png', //путь относиельно html файла
        social: 
        [
          { title: 'Twitter', link: '#', image: 'witcher/social/twitter.svg' },
          { title: 'Instagram', link: '#', image: 'witcher/social/instagram.svg' }, 
          { title: 'Facebook', link: '#', image: 'witcher/social/facebook.svg' }
        ], 
        menu: 
        [
          { title: 'Описание', link: '#' },
          { title: 'Трейлер', link: '#' },
          { title: 'отзывы', link: '#' }
        ],
      },

      main: {
        genre: '2019 Фэнтези',
        rating: '8',
        description: 'Ведьмак Геральт, мутант и убийца чудовищ, на своей верной лошади по кличке Плотва путешествует по Континенту. За тугой мешочек чеканных монет этот мужчина избавит вас от всякой настырной нечисти — хоть от чудищ болотных, оборотней и даже заколдованных принцесс',
        trailer: 'https://www.youtube.com/watch?v=P0oJqfLzZzQ',
        slider: [
          {
            img: 'witcher/series/series-1.jpg',
            title: 'Начало конца',
            subtitle: 'Серия №1' 
          }, 
          {
            img: 'witcher/series/series-2.jpg',
            title: 'Четыре марки',
            subtitle: 'Серия №2' 
          },
          {
            img: 'witcher/series/series-3.jpg',
            title: 'Предательская луна',
            subtitle: 'Серия №3'
          }, 
          { 
            img: 'witcher/series/series-4.jpg',
            title: 'Банкеты, ублюдки и похороны',
            subtitle: 'Серия №4'
          }
        ]
      }
    }
    
  
  ); 
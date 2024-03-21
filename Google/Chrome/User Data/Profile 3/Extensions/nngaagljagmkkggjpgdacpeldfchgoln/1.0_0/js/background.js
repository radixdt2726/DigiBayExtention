const images = [
  '../img/background/quicktab-1920-1.png',
  '../img/background/quicktab-1920-2.png',
  '../img/background/quicktab-1920-3.png',
  '../img/background/quicktab-1920-4.png',
  '../img/background/quicktab-1920-5.png',
  '../img/background/quicktab-1920-6.png',
  '../img/background/quicktab-1920-7.png',
  '../img/background/quicktab-1920-8.png',
  '../img/background/quicktab-1920-9.png',
  '../img/background/quicktab-1920-10.png',
  '../img/background/quicktab-1920-11.png',
  '../img/background/quicktab-1920-12.png',
  '../img/background/quicktab-1920-13.png',
  '../img/background/quicktab-1920-14.png',
  '../img/background/quicktab-1920-15.png',
  '../img/background/quicktab-1920-16.png',
  '../img/background/quicktab-1920-17.png',
  '../img/background/quicktab-1920-18.png',
  '../img/background/quicktab-1920-19.png',
  '../img/background/quicktab-1920-20.jpg'
];

const imageNumber = images.length;
const whichImage  = Math.round(Math.random() * (imageNumber - 1));

document.write('<style>body,html{margin:0;padding:0}*{box-sizing:border-box}.qt_header{width:100%;background:url('+images[whichImage]+') center/cover no-repeat;min-height:100vh}</style>');

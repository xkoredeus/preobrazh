$(function() {
  $('.about__slider').owlCarousel({
      nav: true,
      items: 1,
      loop: false,
      dots: false,
      smartSpeed: 800,
      navText: ["<svg width='14' height='12' viewBox='0 0 14 12' xmlns='http://www.w3.org/2000/svg'><path d='M13 6L1 6M1 6L5.8 11M1 6L5.8 1' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/></svg>", "<svg width='14' height='12' viewBox='0 0 14 12' xmlns='http://www.w3.org/2000/svg'><path d='M1 6L13 6M13 6L8.2 11M13 6L8.2 1' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/></svg>"],
  });
  // tabs 
  $(document).ready(function () {
    $(".tabs__content-item:not(:first-child)").hide();
    $(".tabs__container div.tabs__content-item.active-tab").show();
    $('ul.tabs__list > li').click(function () {
      if (!($(this).hasClass('active'))) {
        var thisLi = $(this);
        var numLi = thisLi.index();
        thisLi.addClass('active').siblings().removeClass('active');
        thisLi.parent().next().children('div').hide().eq(numLi).fadeIn('slow');
      }
    });
  });
  $('.plan__slider').owlCarousel({
      nav: true,
      items: 1,
      loop: false,
      dots: false,
      smartSpeed: 800,
      navText: ["<svg width='14' height='12' viewBox='0 0 14 12' xmlns='http://www.w3.org/2000/svg'><path d='M13 6L1 6M1 6L5.8 11M1 6L5.8 1' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/></svg>", "<svg width='14' height='12' viewBox='0 0 14 12' xmlns='http://www.w3.org/2000/svg'><path d='M1 6L13 6M13 6L8.2 11M13 6L8.2 1' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/></svg>"],
  });
  $('.js-doc__toggle').on('click', function(){
    if ($(this).hasClass('active')) {
      $(this).removeClass('active').find('span').html('посмотреть подробнее');
      $('.doc__list').removeClass('active');

    } else {
      $(this).addClass('active').find('span').html('Скрыть');
      $('.doc__list').addClass('active');
    }
  });
  // stage slider
  var sync1 = $('.stage__bot');
  var sync2 = $('.stage__top');

  var thumbnailItemClass = '.owl-item';

  var slides = sync1.owlCarousel({
    startPosition: 0,
    items:1,
    loop:false,
    margin:0,
    nav: false,
    dots: false,
    smartSpeed: 700,
    autoplay:false,
    autoplayTimeout:6000,

    autoplayHoverPause:false,
    mouseDrag: false,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
  }).on('changed.owl.carousel', syncPosition);

  function syncPosition(el) {
    $owl_slider = $(this).data('owl.carousel');
    var loop = $owl_slider.options.loop;

    if(loop){
      var count = el.item.count-1;
      var current = Math.round(el.item.index - (el.item.count/2) - .5);
      if(current < 0) {
          current = count;
      }
      if(current > count) {
          current = 0;
      }
    }else{
      var current = el.item.index;
    }

    var owl_thumbnail = sync2.data('owl.carousel');
    var itemClass = "." + owl_thumbnail.options.itemClass;


    var thumbnailCurrentItem = sync2
    .find(itemClass)
    .removeClass("synced")
    .eq(current);

    thumbnailCurrentItem.addClass('synced');

    if (!thumbnailCurrentItem.hasClass('active')) {
      var duration = 300;
      sync2.trigger('to.owl.carousel',[current, duration, true]);
    }   
  }
  var thumbs = sync2.owlCarousel({
    startPosition: 0,
    items: 2,
    loop: false,
    margin: 10,
    autoplay:false,
    navText: ["<svg width='14' height='12' viewBox='0 0 14 12' xmlns='http://www.w3.org/2000/svg'><path d='M13 6L1 6M1 6L5.8 11M1 6L5.8 1' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/></svg>", "<svg width='14' height='12' viewBox='0 0 14 12' xmlns='http://www.w3.org/2000/svg'><path d='M1 6L13 6M13 6L8.2 11M13 6L8.2 1' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/></svg>"],
    nav: true,
    dots: false,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    onInitialized: function (e) {
      var thumbnailCurrentItem =  $(e.target).find(thumbnailItemClass).eq(this._current);
      thumbnailCurrentItem.addClass('synced');
    },
  })
  .on('click', thumbnailItemClass, function(e) {
      e.preventDefault();
      var duration = 300;
      var itemIndex =  $(e.target).parents(thumbnailItemClass).index();
      sync1.trigger('to.owl.carousel',[itemIndex, duration, true]);
  }).on("changed.owl.carousel", function (el) {
    var number = el.item.index;
    $owl_slider = sync1.data('owl.carousel');
    $owl_slider.to(number, 100, true);
  });
  $('.stage__bot-in').owlCarousel({
      nav: true,
      items: 1,
      loop: false,
      dots: false,
      smartSpeed: 800,
      mouseDrag: false,
      touchDrag: false,
      pullDrag: false,
      navText: ["<svg width='14' height='12' viewBox='0 0 14 12' xmlns='http://www.w3.org/2000/svg'><path d='M13 6L1 6M1 6L5.8 11M1 6L5.8 1' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/></svg>", "<svg width='14' height='12' viewBox='0 0 14 12' xmlns='http://www.w3.org/2000/svg'><path d='M1 6L13 6M13 6L8.2 11M13 6L8.2 1' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/></svg>"],
  });
  $('.header__hamb').on('click', function(e) {
      e.preventDefault();
      $('body').toggleClass('menu-open');
    });
  $(".header__nav").on("click","a", function (event) {
      event.preventDefault();
      $('.header__hamburger').removeClass('active');
      $('body').removeClass('menu-open');
      var id  = $(this).attr('href'),
          top = $(id).offset().top;
      $('body,html').animate({scrollTop: top - 60}, 800);
  });
  $('[data-fancybox]').fancybox({
    animationDuration : 600,
    animationEffect   : 'slide-in-in',
    touch : false
  });
  $('.offer__scroll').on('click', function() {
    $('html,body').animate({
        scrollTop: $('#about').offset().top},
        'slow');
  });
  
  //Закрываем AjaxForm popup после успешной отправки
  // $(document).on('af_complete', function(event,res) {
  //   if(res.success) parent.$.fancybox.close();
  // });
});
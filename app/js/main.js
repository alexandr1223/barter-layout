$(function () {

    $('img.img-svg').each(function(){
        var $img = $(this);
        var imgClass = $img.attr('class');
        var imgURL = $img.attr('src');
        $.get(imgURL, function(data) {
        var $svg = $(data).find('svg');
        if(typeof imgClass !== 'undefined') {
        $svg = $svg.attr('class', imgClass+' replaced-svg');
        }
        $svg = $svg.removeAttr('xmlns:a');
        if(!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
        $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
        }
        $img.replaceWith($svg);
        }, 'xml');
    }); 

    // var figure = $("video");
    // var vid = figure.find("video");
    
    // [].forEach.call(figure, function (item,index) {
    //     item.addEventListener('mouseover', hoverVideo.bind(item,index), false);
    //     item.addEventListener('mouseout', hideVideo.bind(item,index), false);
    // });
    
    // function hoverVideo(index, e) {
    //     vid[index].play(); 
    // }
    
    // function hideVideo(index, e) {
    //     vid[index].pause(); 
    // }
    var $window = $(window),
    lastScrollTop = 0;

    function onScroll (e) {
        var top = $window.scrollTop();
        if (lastScrollTop > top) {
            if (lastScrollTop > 200) {
                $('.header__nav--hide').css({'top': '0'})
            } else {
                $('.header__nav--hide').css({'top': '-100px'})
            }
           
        } else if (lastScrollTop < top) {
            $('.header__nav--hide').css({'top': '-100px'})
        }
        lastScrollTop = top;
    }

    $window.on('scroll', onScroll);

    function menu(menuBtn, block, close) {
        if (document.querySelector(menuBtn)) {
            document.querySelector(menuBtn).addEventListener('click', () => {
                document.querySelector(block).style.cssText = 'visibility: visible; z-index: 20; opacity: 1';
                document.querySelector(menuBtn).style.cssText = 'z-index: -10; opacity: 0';
                document.querySelector(close).style.cssText = 'z-index: 25; opacity: 1';
                if (document.documentElement.clientWidth < 767) {
                    document.body.style.overflow = 'hidden'
                }
            })
            document.querySelector(close).addEventListener('click', () => {
                document.querySelector(close).style.cssText = 'z-index: -10; opacity: 0';
                document.querySelector(menuBtn).style.cssText = 'z-index: 25; opacity: 1';
                document.querySelector(block).style.cssText = 'visibility: hidden; z-index: -10; opacity: 0';
                if (document.documentElement.clientWidth < 767) {
                    document.body.style.overflow = 'auto'
                }
            })
        }
    } 
    menu('.header__menuTop', '.header__list', '.header__closeTop');
    menu('.header__menu', '.header__list--hide', '.header__close');

    function viewMoreImages() {
        if (document.querySelector('.deals__block') && document.documentElement.clientWidth < 767) {
          document.querySelectorAll('.deals__item').forEach(function(item, i) {
            if (i >= 4) {
                item.classList.add('deals__item--hide')
            } else {
                // document.querySelector('.deals__more').style.display = 'none';
            }
            document.querySelector('.deals__more').addEventListener('click', () => {
                item.classList.remove('deals__item--hide');
                document.querySelector('.deals__more').style.display = 'none';
            })
          })
        } 
    }
    viewMoreImages();

    $(document).ready(function(){
        $(".header__list").on("click","a", function (event) {
            //отменяем стандартную обработку нажатия по ссылке
            event.preventDefault();
            var id  = $(this).attr('href'),
    
            //узнаем высоту от начала страницы до блока на который ссылается якорь
                top = $(id).offset().top - 110;
            $('body,html').animate({scrollTop: top}, 1500);
        });
    });

    function viewDealsVideo() {
        document.querySelectorAll('.deals__item').forEach(item => {
            item.addEventListener('click', () => {
                document.querySelector('.modal-video__title').textContent = item.dataset.title;
                document.querySelector('.modal-video iframe').src = item.dataset.video;
                document.querySelector('.modal-video').style.cssText = 'z-index: 20; opacity: 1; visibility: visible; left: 0';
            })
        })
        document.querySelector('.modal-video').addEventListener('click', (e) => {
            if (e.target.classList.contains('modal-video')) {
                document.querySelector('.modal-video').style.cssText = 'visibility: hidden; z-index: -10; opacity: 0; left: -100%'
            }
        })
        if (document.querySelector('.modal-video__mobile')) {
            document.querySelector('.modal-video__mobile').addEventListener('click', (e) => {
                console.log(e.target)
                document.querySelector('.modal-video').style.cssText = 'visibility: hidden; z-index: -10; opacity: 0; left: -100%'
            })
        }
    }
    viewDealsVideo();

    function openModal() {
        document.querySelectorAll('.modal-btn').forEach(item => {
            item.addEventListener('click', () => {
                document.querySelector('.modal').style.cssText = 'z-index: 30; opacity: 1; visibility: visible; left: 0';
            })
        })
        document.querySelector('.modal').addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                document.querySelector('.modal').style.cssText = 'visibility: hidden; z-index: -10; opacity: 0; left: -100%'
            }
        })
        if (document.querySelector('.modal__mobile')) {
            document.querySelector('.modal__mobile').addEventListener('click', (e) => {
                document.querySelector('.modal').style.cssText = 'visibility: hidden; z-index: -10; opacity: 0; left: -100%'
            })
        }
    }
    openModal();

    $(document).ready(function(){
        if (document.querySelector('.conditions') && document.documentElement.clientWidth < 768) {
            $('.conditions__block').slick({
                dots: false,
                slidesToShow: 1,
                slidesToScroll: 1,
                centerMode: true,
                arrows: false,
                variableWidth: true,
                infinite: true,
            });
        } 
        if (document.querySelector('.direction') && document.documentElement.clientWidth < 768) {
            $('.direction__list').slick({
                dots: false,
                slidesToShow: 1,
                slidesToScroll: 1,
                centerMode: true,
                arrows: false,
                variableWidth: true,
                infinite: true,
            });
        } 
      });
});
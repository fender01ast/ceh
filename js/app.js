document.addEventListener('DOMContentLoaded', function(){
    new WOW().init();

    /* <Плавный скролл к якорю> */
    $('a[href^="#"]').click(function() {
        var target = $(this.hash);
        if (target.length == 0) target = $('a[name="' + this.hash.substr(1) + '"]');
        if (target.length == 0) target = $('html');
        $('html, body').animate({ scrollTop: target.offset().top}, 1000);
        return false;
    });
    /* </Плавный скролл к якорю> */

    $('.header__nav-menu>ul>li>a').each(function(){
        let hrefLink = $(this).attr('href');
        if (document.location.pathname.indexOf( hrefLink ) >= 0) {
            $(this).addClass('current-page');
        }
    });
    $('.nav-menu__dropdown .nav-menu__dropdown-child>a').each(function(){
        let hrefLink = $(this).attr('href');
        if (document.location.pathname.indexOf( hrefLink ) >= 0) {
            $(this).addClass('current-page');
            $('.nav-menu__dropdown').addClass('current-page');
            $('.nav-menu__btn').addClass('current-page');
        }
    });

    /* <modal-window> */
    let modalWindow = $('#modal__wrapper');
    let openModalBtn = $('.link-btn, .modal-js__btn');
    let closeModalBtn = $('.modal__close-btn, .modal__overlay');
    
    function closeModal() {
        //modalWindow.css({'display':'none'});
        modalWindow.fadeOut();
        $('body').css({'overflow':'visible'});
        $.scrollify.enable();
    }
    function openModal(e) {
        e.preventDefault();
        modalWindow.fadeIn();
        $.scrollify.disable();
        $('body').css({'overflow':'hidden'});
    }
    
    openModalBtn.click(openModal);
    closeModalBtn.click(function(){
        closeModal();
    });
    /* </modal-window> */

    /* <toTopBtn> */
    let button = $('.toTopBtn');
    button.fadeOut();
    $(window).on('scroll', () => {
        if ( $(this).scrollTop() >= 50 && $(window).width() <= 767 ) {
            button.fadeIn();
          } else {
            button.fadeOut();
          }
    });
    /* </toTopBtn> */

    /* <progress-bar> */
    $(window).scroll(function() {
        let ratio = $(document).scrollTop() / (($(document).height() - $(window).height()) / 100);
        $("#progress").width(ratio + "%");
    });
    /* </progress-bar> */

    /* <footer date year> */
    let currentYear = new Date().getFullYear();
    document.getElementById('year-now').innerHTML = currentYear;
    /* </footer date year> */

    

    if ( ($( window ).width() <= 991) && (document.querySelector('.splide')) ) {
        /* <slider> */
        new Splide( '.splide', {
            type        : 'loop',
            perPage     : 3,
            focus       : 'center',
            width       : '100%',
            height      : '274px',
            pagination  : true,
            arrows      : false,
            autoplay    : true,
            interval    : '2500',
            drag        : true,
            lazyLoad    : true,
            gap         : '10px',
            breakpoints : {
                767: {
                    perPage  : 1,
                    height   : 'auto',
                },
                991: {
                    perPage  : 2,
                    height   : 'auto',
                }
            }
        } ).mount();
        /* </slider> */

        let imageHeight = $('.container.s4__img-container').height();
        $('#s4').css({
            'padding-bottom'    : imageHeight + 25 + 'px',
        });
    }

    /* <burger-menu> */
    let burgerMenu = $('.burger-menu__wrapper');
    let burgerClose = $('.burger-menu__close-btn');
    burgerMenu.click(function(){
        $('.header__nav-menu').css({
            'display':'block',
            'left':'0%',
        });
        $('body').css({'overflow':'hidden'});
        $.scrollify.disable();
    });
    burgerClose.click(function(){
        $('.header__nav-menu').css({
            'left':'-100%',
        });
        $('body').css({'overflow':'visible'});
        $.scrollify.enable();
    });
    /* </burger-menu> */

    let langArrow = $('.lang-switcher__arrow-img');
    if (document.location.pathname.indexOf('/landing.html') >= 0) {     // если страница === лендинг
        /* <lang switcher green> */
        $('.lang-switcher').hover( function(){
            langArrow.attr('src', 'images/menu-arrow_green.svg');
        }, function() {
            langArrow.attr('src', 'images/menu-arrow.svg');
        });
        /* <lang switcher green> */
        $('.link-btn,.individual-solution_wrapper').addClass('green-bgc');
        $('.section__title span').addClass('green-color');
        setTimeout(function(){
            $('.site-pagination ul li a').addClass('green-border');
        },200);

        if ( $( window ).width() <= 991 ) {
            $('.header__nav-menu').css({'background-image':'url(' + 'images/main-bg-img_green.jpg' + ')'});
        }
    } else {
        /* <lang switcher red> */
        $('.lang-switcher').hover( function(){
            langArrow.attr('src', 'images/menu-arrow_red.svg');
        }, function() {
            langArrow.attr('src', 'images/menu-arrow.svg');
        });
        /* <lang switcher red> */
    }
    if (document.location.pathname.indexOf('/corporate.html') >= 0) {   // если страница === корпоративный сайт
        /* <lang switcher blue> */
        $('.lang-switcher').hover( function(){
            langArrow.attr('src', 'images/menu-arrow_blue.svg');
        }, function() {
            langArrow.attr('src', 'images/menu-arrow.svg');
        });
        /* <lang switcher blue> */
        $('.link-btn,.individual-solution_wrapper').addClass('blue-bgc');
        $('.section__title span').addClass('blue-color');
        setTimeout(function(){
            $('.site-pagination ul li a').addClass('blue-border');
        },200);

        if ( $( window ).width() <= 991 ) {
            $('.header__nav-menu').css({'background-image':'url(' + 'images/main-bg-img_blue.jpg' + ')'});
        }
    }

    /* <tel mask> */
    if ( document.querySelector('form.modal__form') ) {
        function setCursorPosition(pos, elem) {
            elem.focus();
            if (elem.setSelectionRange) elem.setSelectionRange(pos, pos);
            else if (elem.createTextRange) {
                var range = elem.createTextRange();
                range.collapse(true);
                range.moveEnd("character", pos);
                range.moveStart("character", pos);
                range.select()
            }
        }
        
        function mask(event) {
            var matrix = "+7 (___) ___ ____",
                i = 0,
                def = matrix.replace(/\D/g, ""),
                val = this.value.replace(/\D/g, "");
            if (def.length >= val.length) val = def;
            this.value = matrix.replace(/./g, function(a) {
                return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? "" : a
            });
            if (event.type == "blur") {
                if (this.value.length == 2) this.value = ""
            } else setCursorPosition(this.value.length, this)
        };
            var input = document.querySelector("#user-tel");
            input.addEventListener("input", mask, false);
            input.addEventListener("focus", mask, false);
            input.addEventListener("blur", mask, false);
    }
    /* </tel mask> */

    $('.s3__item').click(function(e){
        e.preventDefault();
    });

    if ( document.getElementById('vanta-animation1') ) {
        VANTA.DOTS({
            el: "#vanta-animation1",
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.00,
            scaleMobile: 1.00,
            color: 0xb3b3b3,
            color2: 0xffffff,
            backgroundColor: 0xffffff,
            size: 2.60,
            spacing: 21.00
        });
    }

    /* <2gis map init> */
    if ( document.getElementById('map') ) {
        setTimeout(function(){
            var map;
            DG.then(function () {
                map = DG.map('map', {
                    center: [51.091198, 71.410682],
                    zoom: 15
                });

                DG.marker([51.091198, 71.410682]).addTo(map).bindPopup('Maxico.kz - IT Company');
            });
        },3000);
    }
    /* </2gis map init> */
});


function canUseWebp() {
    let elem = document.createElement('canvas');
    if (!!(elem.getContext && elem.getContext('2d'))) {
        return elem.toDataURL('image/webp').indexOf('data:image/webp') == 0;
    }
    return false;
}
window.onload = function () {
    let images = document.querySelectorAll('[data-bg]');
    for (let i = 0; i < images.length; i++) {
        let image = images[i].getAttribute('data-bg');
        images[i].style.backgroundImage = 'url(' + image + ')';
    }

    let isitFirefox = window.navigator.userAgent.match(/Firefox\/([0-9]+)\./);
    let firefoxVer = isitFirefox ? parseInt(isitFirefox[1]) : 0;

    if (canUseWebp() || firefoxVer >= 65) {
        let imagesWebp = document.querySelectorAll('[data-bg-webp]');
        for (let i = 0; i < imagesWebp.length; i++) {
            let imageWebp = imagesWebp[i].getAttribute('data-bg-webp');
            imagesWebp[i].style.backgroundImage = 'url(' + imageWebp + ')';
        }
    }

    if ( ($(window).width() > 320) && (document.querySelector('.section')) ) {
        /* <one page scroll> */
        $.scrollify({
            section : ".section",
            scrollSpeed: 800,
            overflowScroll: true,
            touchScroll:true,
            interstitialSection:".header,.footer",
            after:function() {
                $('.site-pagination a.active').removeClass('white');
                if ( window.location.href.indexOf('#1') >= 0 ) {
                    $('.site-pagination a.active').addClass('white');
                }
                if ( window.location.href.indexOf('#footer') >= 0 && $( window ).width() <= 1600 ) {
                    $('.site-pagination a.active').addClass('white');
                }
                if ( window.location.href.indexOf('#header') >= 0 ) {
                    $('.site-pagination>ul>li:first-child>a').addClass('active white');
                    $('.site-pagination>ul>li:first-child>a').parent().css({'margin':'8px'});
                }
            },
            before:function(i,panels) {
                var ref = panels[i].attr("data-section-name");
                $(".pagination .active").removeClass("active");
                $(".pagination").find("a[href=\"#" + ref + "\"]").addClass("active");
                $('.site-pagination li').css({'margin':'5px'});
                $('.site-pagination a.active').parent().css({'margin':'8px'});
            },
            afterResize:function() {
                $.scrollify.update();
            },
            afterRender:function() {
                var pagination = "<ul class=\"pagination\">";
                var activeClass = "";
                $(".section,.footer").each(function(i) {
                activeClass = "";
                if(i===$.scrollify.currentIndex()) {
                    activeClass = "active";
                }
                pagination += "<li><a class=\"" + activeClass + "\" href=\"#" + $(this).attr("data-section-name") + "\"><span class=\"hover-text\" style=\"display:none;\">" + $(this).attr("data-section-name").charAt(0).toUpperCase() + $(this).attr("data-section-name").slice(1) + "</span></a></li>";
                setTimeout(function(){
                    $('.site-pagination>ul>li:first-child>a').addClass('active white');
                    $('.site-pagination>ul>li:first-child>a').parent().css({'margin':'8px'});
                },100);
                });

                pagination += "</ul>";
        
                $(".site-pagination").append(pagination);
                $(".pagination a").on("click",$.scrollify.move);
            }
        });
        /* </one page scroll> */
    }
};
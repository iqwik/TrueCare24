$(document).ready(() => {
    let $body = $('body');
    // user data table
    new Table('.data-users', 'js/users.json', 'btnCall', './token.php');
    // feedback modal
    $body.on('click', '._kebab-menu-list-1', () => {
        new Modal('body','modal-feedback', '.burger', '.aside');
    });
    // burger menu
    let $aside = $('.aside');
    let $burger = $('.burger');
    $(document).on('click', '.burger', e => {
        e.preventDefault();
        if($body.hasClass('overflow-hidden')){
            removeClass();
        } else {
            addClass();
        }
    });
    $(window).on('resize', () => {
        if($(window).width() > 766 && $body.hasClass('overflow-hidden')){
            removeClass();
        }
    });
    let removeClass = () => {
        $body.removeClass('overflow-hidden');
        $aside.removeClass('show');
        $burger.removeClass('active');
        $aside.find('form').remove();
        $aside.find('.fulfillments-kpi-a').remove();
        $aside.find('.login').remove();
        window.scrollTo(0, $("#main-block").offset().top);
    };
    let addClass = () => {
        $body.addClass('overflow-hidden');
        $aside.addClass('show');
        $burger.addClass('active');
        $aside.append($('.left-side').html());
        $aside.find('.back-link').remove();
        $aside.find('.fulfillments-kpi-a').remove();
        $aside.append($('.right-side').html());
    };
});
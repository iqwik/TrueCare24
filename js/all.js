$(document).ready(() => {
    new Table('.data-users', 'js/users.json');
    $('body').on('click', '._kebab-menu-list-1', () => {
        new Modal('body','modal-feedback');
    });
    let $body = $('body');
    let $aside = $('.aside');
    let $burger = $('.burger');
    $(document).on('click', '.burger', e => {
        e.preventDefault();
        $aside.toggleClass('show');
        if($body.hasClass('overflow-hidden')){
            $body.removeClass('overflow-hidden');
            $burger.removeClass('active');
            $aside.find('form').remove();
            $aside.find('.fulfillments-kpi-a').remove();
            $aside.find('.login').remove();
        } else {
            $body.addClass('overflow-hidden');
            $burger.addClass('active');
            $aside.append($('.left-side').html());
            $aside.find('.back-link').remove();
            $aside.find('.fulfillments-kpi-a').remove();
            $aside.append($('.right-side').html());

        }
    });
    /*
    let $window = $(window);
    let $header = $('.header');
    let resize = () => {
        if($window.width() < 767){
            $header
                .removeClass('__align-items_center')
                .removeClass('__justify-content_space-between')
                .addClass('__flex-direction_column');
        } else {
            $header
                .removeClass('__flex-direction_column')
                .addClass('__align-items_center')
                .addClass('__justify-content_space-between');
        }
    }
    $window.on('resize', resize);
    $window.resize();*/
});
class Table {
    constructor(container, source) {
        this.container = container;
        this.source = source;
        this._init();
    }
    _init(){
        fetch(this.source)
            .then(response => response.json())
            .then(data => {
                data.forEach(user => {
                    this._renderUser(user);
                });
            });
    }
    _renderUser(user){
        let trClass = "data-users-tr";
        if (user.status === 4) trClass = "data-users-tr cancel";

        let $tr = $('<tr/>', {
            class: trClass,
            "data-id": user.id
        });

        let $tdType = $('<td/>', {
            class: "type-contract __flex __align-items_center __justify-content_space-between"
        });
        let srcFlag = 'img/Non%20Contracted.png';
        if (user.flag === true) srcFlag = 'img/Contracted.png';
        let $imgFlag = $('<img/>', {
            src: srcFlag,
            class: "contract",
            alt: ""
        });
        $imgFlag.appendTo($tdType);
        let srcImg = 'img/IC.png';
        if (user.type === 'agency') srcImg = 'img/Home%20care%20agency.png';
        let $imgType = $('<img/>', {
            src: srcImg,
            alt: ""
        });
        $imgType.appendTo($tdType);

        let $tdName = $('<td/>', {
            class: "user-name",
            text: user.name
        });
        let $tdEmail = $('<td/>', {
            text: user.email
        });
        let $tdPhone = $('<td/>', {
            text: user.phone
        });
        let $tdID = $('<td/>', {
            text: user.id
        });
        let $tdStatus = $('<td/>');
        let $aStatus = $('<a/>', {
            class: `user-status _status-${user.status.selected}`,
            href: "#",
            text: user.status.array[user.status.selected]
        });
        this._statusList(user.status.array).appendTo($aStatus);
        $aStatus.appendTo($tdStatus);
        $aStatus.click(e => {
            e.preventDefault();
            if($('.status-list').hasClass('active')){
                $('.status-list').removeClass('active');
            }
            $(e.target).find('.status-list').addClass('active');
        });
        let $tdBtns = $('<td/>');
        let $divBtns = $('<div/>', {
            class: "user-buttons __flex __align-items_center __justify-content_space-between"
        });
        let $btnChat = $('<a/>', {
            class: "btnChat",
            href: "#",
            text: "Chat"
        });
        let $btnCall = $('<a/>', {
            class: "btnCall",
            href: "#",
            text: "Call"
        });
        $btnChat.appendTo($divBtns);
        $btnCall.appendTo($divBtns);
        $divBtns.append('<a href="#"><img src="img/kebab%20menu%20hover.png" alt=""></a>');
        $divBtns.appendTo($tdBtns);
        $tdType.appendTo($tr);
        $tdName.appendTo($tr);
        $tdEmail.appendTo($tr);
        $tdPhone.appendTo($tr);
        $tdID.appendTo($tr);
        $tdStatus.appendTo($tr);
        $tdBtns.appendTo($tr);
        $tr.appendTo($(this.container));
    }
    _statusList(array){
        let $ul = $('<ul/>', {
            class: "status-list"
        });
        array.forEach((status, index) => {
            $ul.append(`<li class="status-list-li _status-${index}">${status}</li>`);
        });
        return $ul;
    }
}
class Table {
    constructor(container, source, btnCall, twilioSource) {
        this.container = container;
        this.source = source;
        this.btnCall = btnCall;
        this.twilioSource = twilioSource;
        this.users = [];
        this._init();
    }
    _init(){
        fetch(this.source)
            .then(response => response.json())
            .then(data => {
                data.forEach(user => {
                    this._renderUser(user, this.btnCall);
                    this.users.push(user);
                });
            });
        //this._jsonTwilio(this.twilioSource, this.btnCall);
    }
    _renderUser(user, btnCall){
        // <tr class="data-users-tr"></tr>  --tr
        let trClass = "data-users-tr";
        if (user.status.selected === 4) trClass = "data-users-tr cancel";
        let $tr = $('<tr/>', {
            class: trClass,
            "data-id": user.id
        });
        // <td>Type</td>  --type
        let $tdType = $('<td/>', {
            class: "type-contract",
            "data-label": "Type"
        });
        let $divType = $('<div/>', {
            class: "__flex __align-items_center __justify-content_space-between"
        });
        let srcFlag = 'img/Non%20Contracted.png';
        if (user.flag === true) srcFlag = 'img/Contracted.png';
        let $imgFlag = $('<img/>', {
            src: srcFlag,
            class: "contract",
            alt: ""
        });
        let srcImg = 'img/IC.png';
        if (user.type === 'agency') srcImg = 'img/Home%20care%20agency.png';
        let $imgType = $('<img/>', {
            src: srcImg,
            alt: ""
        });
        $imgFlag.appendTo($divType);
        $imgType.appendTo($divType);
        $divType.appendTo($tdType);
        // <td >
        let $tdName = $('<td/>', {
            class: "user-name",
            text: user.name,
            "data-label": "Name"
        });
        // <td>Email</td>  --Email
        let $tdEmail = $('<td/>', {
            text: user.email,
            "data-label": "Email"
        });
        // <td>Phone</td>  --Phone
        let $tdPhone = $('<td/>', {
            text: user.phone,
            "data-label": "Phone"
        });
        // <td>ID</td>  --ID
        let $tdID = $('<td/>', {
            text: user.id,
            "data-label": "ID"
        });
        // <td>Status</td>  --Status
        let $tdStatus = $('<td/>', {
            "data-label": "Status"
        });
        let $aStatus = $('<a/>', {
            class: `user-status _status-list-${user.status.selected}`,
            "data-id": user.id,
            "data-status": user.status.selected,
            href: "#"
        });
        $aStatus.append(`<span class="user-status-span">${user.status.array[user.status.selected]}</span>`);
        // create list
        this._createList(user.status.array, 'status-list', user.status.selected).appendTo($aStatus);
        $aStatus.appendTo($tdStatus);
        // show list on click
        this._showListOnClick($aStatus, '.status-list', 'active', true);

        // <td></td>  --Buttons (CHAT, CALL, Kebab Menu)
        let $tdBtns = $('<td/>', {
            class: "td-buttons"
        });
        let $divBtns = $('<div/>', {
            class: "user-buttons __flex __align-items_center __justify-content_space-between"
        });
        let $btnChat = $('<button/>', {
            class: "btnChat",
            text: "Chat"
        });
        let $btnCall = $('<button/>', {
            class: btnCall,
            text: "Call",
            "data-user-phone": user.phone.replace( /[(]|[)]|[-]|\s/g, ""),
            "data-user-name": user.name
        });
        $btnChat.appendTo($divBtns);
        $btnCall.appendTo($divBtns);
        let $kebabMenu = $('<a/>', {
            class: "kebab-menu",
            href: "#"
        });
        // call event
        this._callTo($btnCall, $btnCall.attr('class'));
        // create list
        this._createList(["Send info","Provide feedback", "Send reminder", "Background check"], 'kebab-menu-list').appendTo($kebabMenu);
        $kebabMenu.appendTo($divBtns);
        // show list on click
        this._showListOnClick($kebabMenu, '.kebab-menu-list', 'active');
        $divBtns.appendTo($tdBtns);
        $tdType.appendTo($tr);
        $tdName.appendTo($tr);
        $tdEmail.appendTo($tr);
        $tdPhone.appendTo($tr);
        $tdID.appendTo($tr);
        $tdStatus.appendTo($tr);
        $tdBtns.appendTo($tr);
        // appended it all to main container in <tbody>
        $tr.appendTo($(this.container));
    }
    _createList(array, ulClass, selected = -1){
        let $ul = $('<ul/>', {
            class: ulClass
        });
        if(selected > -1) $ul.append(`<li class="${ulClass}-li _${ulClass}-${selected}" data-val="${selected}">${array[selected]}</li>`);
        array.forEach((status, index) => {
            if(index !== selected) {
                $ul.append(`<li class="${ulClass}-li _${ulClass}-${index}" data-val="${index}">${status}</li>`);
            }
        });
        return $ul;
    }
    _showListOnClick(element, listClass, addClass, changeStatus = false){
        element.click(e => {
            e.preventDefault();
            if(changeStatus){
                if(e.target.tagName === 'LI') {
                    let dataID = $(e.target).parent().siblings('span').parent().data('id');
                    let dataStatus = $(e.target).parent().siblings('span').parent().data('status');
                    this._changeStatus(e.target, dataID, dataStatus);
                }
            }
            $(this.container).find(`.${addClass}`).removeClass(addClass);
            $(e.target).parent().find(listClass).addClass(addClass);
        });
    }
    _changeStatus(target, id, status){
        let find = this.users.find(user => user.id === id);
        $(`.user-status[data-id="${id}"]`)
            .removeClass(`${$(target).closest('.status-list').parent().attr('class')}`)
            .addClass('user-status')
            .addClass(`_status-list-${$(target).data('val')}`)
            .attr('data-status', $(target).data('val'))
            .find('span').text($(target).text());
        find.status.selected = $(target).data('val');
        if($(target).data('val') === 4) {
            $(`.data-users-tr[data-id="${id}"]`).addClass('cancel');
        } else {
            $(`.data-users-tr[data-id="${id}"]`).removeClass('cancel');
        }
        this._refreshSortList(find.status.array, find.status.selected, `.user-status[data-id="${id}"]`);
    }
    _refreshSortList(array, selected, parent){
        $(parent).find('.status-list').remove();
        this._createList(array, 'status-list', selected).appendTo($(parent));
        $(parent).appendTo($(parent).parent());
    }
    _callTo(element, btnClass){
        element.click(e => {
            e.preventDefault();
            let $form = $('#callTo');
            $form.find('.input-hidden._to').val('+79636626266');
            $form.find('.input-hidden._from').val('+12242680276');
            let $btnCall = $(`.${btnClass}`);
            $btnCall.addClass('disable');
            element.removeClass('disable').toggleClass('calling');
            if($btnCall.hasClass('disable')){
                $btnCall.prop('disabled', true);
            }
            if(!element.hasClass('calling')){
                element.text('Call');
                $btnCall.removeClass('disable');
                //Twilio.Device.disconnectAll();
                alert('Call ended.')
                $btnCall.prop('disabled', false);
            } else {
                element.text('Hangup');
                //let params = { To: '+12242680276' };
                alert(`\nwe will call to #: ${element.data('user-phone')}...\n\nbut now we're calling to test #: +12242680276`);
                //Twilio.Device.connect(params);
                let formData = $form.serialize();
                console.log(formData);
                $.ajax({
                    url: this.twilioSource,
                    type: 'POST',
                    data: formData,
                    success: data => {
                        console.log(`success! your phone will dialing now... ${data}`);
                    }
                });
                element.prop('disabled', false);
            }
        });
    }
    /*_jsonTwilio(source, element){
        $.getJSON(source)
            .done((data) => {
                console.log('Got a Token: ' + data.token);
                // Setup Twilio.Device
                Twilio.Device.setup(data.token);
                Twilio.Device.ready((device) => { console.log('Twilio.Device Ready!'); });
                Twilio.Device.error((error) => { console.log('Twilio.Device Error: ' + error.message); });
                Twilio.Device.connect((conn) => { console.log('Successfully established call!'); });
                Twilio.Device.disconnect((conn) => {
                    console.log('Call ended.');
                    $(`.${element}`).removeClass('calling').text('Call');
                    $(`.${this.btnCall}`).removeClass('disable').prop('disabled', false);
                });
                Twilio.Device.incoming((conn) => {
                    console.log('Incoming connection from ' + conn.parameters.From);
                    let archEnemyPhoneNumber = '+12099517118';
                    if (conn.parameters.From === archEnemyPhoneNumber) {
                        conn.reject();
                        console.log(`It"s your nemesis. Rejected call.`);
                    } else {
                        // accept the incoming connection and start two-way audio
                        conn.accept();
                    }
                });
            })
            .fail(function () { alert('Could not get a token from server!'); });
    }*/
}
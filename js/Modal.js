class Modal {
    constructor(container, modalClass){
        this.container = container;
        this.class = modalClass;
        this._init();
    }
    _init(){
        if($(this.container).find(`.${this.class}`).length < 1){
            let $modalOverlay = $('<div/>', {
                class: `${this.class}-overlay`
            })
            let $modalWrapper = $('<div/>', {
                class: this.class
            });
            let $modalHeading = $('<div/>', {
                class: `${this.class}__heading`
            });
            $modalHeading.append(`<h1 class="${this.class}__h1">Set the rating and provide<br>the feedback note:</h1>`);
            let $closeBtn = $('<a/>', {
                href: "#",
                class: "close-btn"
            });
            $closeBtn.appendTo($modalHeading);
            $closeBtn.click(e => {
                e.preventDefault();
                $modalWrapper.remove();
                $modalOverlay.remove();
            });
            let $modalBody = $('<div/>', {
                class: `${this.class}__body`
            });
            let $formFeedback = $('<form/>', {
                class: `${this.class}-form`,
                action: ""
            });
            let $starWrapper = $('<div/>', {
                class: "star-rating-wrapper"
            });
            for (let i = 5; i > 0; i--){
                let $starInput = $('<input/>', {
                    class: "star-rating__input",
                    id: `star-rating-${i}`,
                    type: "radio",
                    name: "rating",
                    value: i
                });
                let $starLabel = $('<label/>', {
                    class: "star-rating__ico",
                    for: `star-rating-${i}`,
                    title: `${i} of 5 stars`
                });
                $starInput.appendTo($starWrapper);
                $starLabel.appendTo($starWrapper);
            }
            let $textarea = $('<textarea/>', {
                class: `${this.class}_textarea`,
                name: "text",
                placeholder: "Type here"
            });
            let $saveBtn = $('<button/>', {
                class: "save-button",
                text: "save"
            });
            $starWrapper.appendTo($formFeedback);
            $textarea.appendTo($formFeedback);
            $saveBtn.appendTo($formFeedback);
            $formFeedback.appendTo($modalBody);

            $modalOverlay.appendTo($(this.container));
            $modalHeading.appendTo($modalWrapper);
            $modalBody.appendTo($modalWrapper);
            $modalWrapper.appendTo($(this.container));
        }
    }
}
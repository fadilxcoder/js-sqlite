import $ = require("jquery");

export class PreloaderService
{
    constructor() {
        this._handler();
    }

    _handler(): void {
        $(function() {
            let body: any = $('body');
            body.addClass('preloader-site');
        });

        $(window).on('load',function() {
            $('.preloader-wrapper').fadeOut();
            $('body').removeClass('preloader-site');
        });
    }
}
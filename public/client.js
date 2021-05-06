$(document).ready(readyNow);


var $content = $('.demoContent');

function readyNow() {
    $('.barSection').on('click', barClick);
    $('.demoContent').hide();
    $('.proxy').show();
    $('#proxy').toggleClass('clicked');
}

// function showContent(type){
//     alert(type);
//     $content.hide().filter('.' + type).show();
// }

function barClick(e){
    $('.barSection').removeClass('clicked');
    $(this).toggleClass('clicked');
    $('.demoContent').hide();
    switch (e.currentTarget.id) {
        case 'proxy':
            $('.proxy').show();
            break;
        case 'upload':
            $('.upload').show();
            break;
        case 'save':
            $('.save').show();
            break;
        default:
        // code block
    }

    // showContent(e.currentTarget.hash.slice(1));
    e.preventDefault();
}
// $('.barSection').click(function () {
//     $(this).toggleClass('clicked');
// });
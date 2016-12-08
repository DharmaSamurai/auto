$(document).ready(function() {

// SLIDER

$('#prv').click(function(){changeImg(false)});
$('#nxt').click(function(){changeImg(true)});

var runSlider = setInterval(startChangeImg, 2500);

function startChangeImg() {
    changeImg(true);
}

$('.slider').mouseenter(function() {
    clearInterval(runSlider);
});

$('.slider').mouseleave(function() {
    runSlider = setInterval(startChangeImg, 2500);
});

function changeImg(switcher) {
    var switcher = switcher;
    var zMainImg = $('#mainImg').css('z-index');
    var zMainImg2 = $('#mainImg2').css('z-index');

    // Which image is upper
    if (zMainImg > zMainImg2) {
        var imgLower = $('#mainImg2');
        var imgUpper = $('#mainImg');
        var srcImg = imgUpper.attr('src');
    }
    else {
        var imgLower = $('#mainImg');
        var imgUpper = $('#mainImg2');
        var srcImg = imgUpper.attr('src');
    }

    var i;

    //Getting number of image
    i = parseInt(srcImg.substr(-5, 1));

    //Previous or next image
    if (switcher) {
        if (i >= 6) {i = 1;}
        else {++i;}
    } else {
        if (i <= 1) {i = 6;}
        else {--i;}
    }

    // Setting new source of image
    srcImg = 'img/slider/' + i + '.jpg';
    imgLower.attr('src', srcImg);
    imgLower.fadeIn(1);

    imgUpper.fadeOut(1000, function() {
        imgLower.css('z-index', '2');
        imgUpper.css('z-index', '1');
    });
}

// FOOTER
$('.inp').focus(function() {
    // Change color of line
    var par = $(this).parent().attr('id');
    $('#' + par).css('border-bottom', '2px solid #B42637');

    // Scale label
    $('#' + par + ' > .inp').css('float', 'none');
    $('#' + par + ' > .inp').css('width', '100%');
    $('#' + par + ' > label').css('float', 'none');
    $('#' + par + ' > label').css('width', '100%');
    $('#' + par + ' > label').css('height', '30px');
    $('#' + par + ' > label').css('font-size', '13px');
});

$('.inp').blur(function() {
    // Change color of line
    var par = $(this).parent().attr('id');
    $('#' + par).css('border-bottom', '2px solid white');

    // Scale label
    $('#' + par + ' > .inp').css('float', 'left');
    $('#' + par + ' > .inp').css('width', '75%');
    $('#' + par + ' > label').css('float', 'left');
    $('#' + par + ' > label').css('width', '25%');
    $('#' + par + ' > label').css('height', '60px');
    $('#' + par + ' > label').css('font-size', '18px');
});

// SLIDER EARLIEST GROUPS
$('#sl_nxt2').click(function() {
    var itms_wdth = $('ul.sl_items2').width();
    var itm = $('ul.sl_items2 li.on').width();
    var cont_wdth = $('.bn_slider .sl_container').width();
    var left = parseFloat($('ul.sl_items2').css('margin-left').replace('px', '').replace('-', ''));
    var on = parseInt($('ul.sl_items2 li.on').attr('id').replace('slide_', ''));
    var nxt;
    var num;

    var itm2 = parseInt(itms_wdth/4);

    if (cont_wdth == itm2) {
        num = 4;
    } else {
        num = 3;
    }

    if (on < num) {
        nxt = on + 1;

        $('ul.sl_items2 li#slide_' + on).removeClass('on');
        $('ul.sl_items2 li#slide_' + nxt).addClass('on');

        $('ul.sl_items2').animate({
            marginLeft: "-" + (itm*on)
        }, 500);
    }
});

$('#sl_prv2').click(function() {
    var itms_wdth = $('ul.sl_items2').width();
    var itm = $('ul.sl_items2 li.on').width();
    var cont_wdth = $('.bn_slider .sl_container').width();
    var left = parseFloat($('ul.sl_items2').css('margin-left').replace('px', '').replace('-', ''));
    var on = parseInt($('ul.sl_items2 li.on').attr('id').replace('slide_', ''));
    var num = 1;
    var nxt;

    if (on > num) {
        nxt = on - 1;

        $('ul.sl_items2 li#slide_' + on).removeClass('on');
        $('ul.sl_items2 li#slide_' + nxt).addClass('on');

        left = left - itm;

        if (left < 0) {
            left = left * -1;
        }

        $('ul.sl_items2').animate({
            marginLeft: "-" + left
        }, 500);
    }
});

// SLIDER REVIEWS
// Changing radio markers
function change_radio(rel) {
    var rel = rel;
    var radio = '#sl_' + rel;
    $(radio).prop('checked', true);
}

$('#sl_prv').click(function() {
    var rel = $('ul.sl_items li.on').attr('id');
    rel = parseInt(rel.replace('slide_', ''));
    var step = $('.rv_slider').width();
    var marLft = parseInt($('ul.sl_items').css('margin-left').replace('px', ''));

    if (rel==1) {
        $('ul.sl_items').animate({
            marginLeft: "-" + step*2
        }, 500);

        $('ul.sl_items li#slide_1').removeClass('on');
        $('ul.sl_items li#slide_3').addClass('on');
        change_radio(3);
    } else {
        step = marLft + step;
        $('ul.sl_items').animate({
            marginLeft: step
        }, 500);

        $('ul.sl_items li#slide_' + rel).removeClass('on');
        $('ul.sl_items li#slide_' + (rel-1)).addClass('on');
        change_radio(rel-1);
    }
});

$('#sl_nxt').click(function() {
    var rel = $('ul.sl_items li.on').attr('id');
    rel = parseInt(rel.replace('slide_', ''));
    var step = $('.rv_slider').width();

    if (rel==3) {
        $('ul.sl_items').animate({
            marginLeft: 0
        }, 500);

        $('ul.sl_items li#slide_3').removeClass('on');
        $('ul.sl_items li#slide_1').addClass('on');
        change_radio(1);
    } else {
        $('ul.sl_items').animate({
            marginLeft: '-' + step*rel
        }, 500);

        $('ul.sl_items li#slide_' + rel).removeClass('on');
        $('ul.sl_items li#slide_' + (rel+1)).addClass('on');
        change_radio(rel+1);
    }
});

$('.sl_nav li label > span').click(function(e) {
    var ID = e.target.id;
    var rel = parseInt(ID.replace('sp_', ''));
    var step = $('.rv_slider').width();

    change_radio(rel);

    if (rel==1) {
        $('ul.sl_items').animate({
            marginLeft: 0
        }, 500);
    } else {
        $('ul.sl_items').animate({
            marginLeft: '-' + step*(rel-1)
        }, 500);
    }
});


// MODAL WINDOWS
// MODAL WINDOW - ENTER
$('.entr').click(function() {
    $('#modal_reg').css('display', 'none');
    $('#modal_pass').css('display', 'none');
    $('#modal_enter').css('display', 'block');
    $('#box').fadeIn(400,
        function() {
            $('#box')
                .css('display', 'block')
                .animate({
                    opacity: 1,
                    top: "50%"
                }, 200);
});

// CLOSE MODAL WINDOW
$('#modal_enter_close').click(function() {
    $('#box').animate({
        opacity: 0,
        top: '45%'
    }, 200,
        function() {
            $('#modal_enter').css('display', 'none');
        });
    });
});

// MODAL WINDOW - FORGOT
$('#forgot').click(function() {
    $('#modal_enter').css('display', 'none');
    $('#modal_reg').css('display', 'none');
    $('#modal_pass').css('display', 'block');
    $('#box3').fadeIn(400,
        function() {
            $('#box3')
                .css('display', 'block')
                .animate({
                    opacity: 1,
                    top: "50%"
                }, 200);
});

// CLOSE MODAL WINDOW
$('#modal_pass_close').click(function() {
    $('#box3').animate({
        opacity: 0,
        top: '45%'
    }, 200,
        function() {
            $('#modal_pass').css('display', 'none');
        });
    });
});

// MENU ADAPTIVE
var opnd = 0;
// MENU
function close_adp() {
    $('.menu_btn').css('background-image', 'url(img/menu.png)');
    opnd = 0;

    $('.all').animate({
        marginLeft: "0"
    }, 500);

    $('.all_adp').animate({
        marginLeft: "-85%"
    }, 500);
}

$('#menu_btn').click(function() {
    if (opnd) {
        close_adp();
    } else {
        $('.menu_btn').css('background-image', 'url(img/menu_close.png)');

        opnd = 1;

        $('.all').animate({
            marginLeft: "85%"
        }, 500);

        $('.all_adp').animate({
            marginLeft: "0"
        }, 500);
    }
});


$('nav.adp ul.menu li a').click(function() {
    close_adp();
});


});








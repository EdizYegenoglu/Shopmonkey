// Switch category
window.onload = () => {
    const tab_switchers = document.querySelectorAll('[data-switcher]');
    for (let i = 0; i< tab_switchers.length; i++) {
        const tab_switcher = tab_switchers[i];
        const page_id = tab_switcher.dataset.tab;
        tab_switcher.addEventListener('click', () => {
            document.querySelector('header ul li.is-active').classList.remove('is-active');
            tab_switcher.parentNode.classList.add('is-active');
            SwitchPage(page_id)
        });
    }
}

function SwitchPage (page_id) {
    const current_page = document.querySelector('section:first-of-type div.is-active');
    current_page.classList.remove('is-active');
    const next_page = document.querySelector(`section:first-of-type div[data-page="${page_id}"]`);
    next_page.classList.add('is-active');
    // sausjes only available on friet and snacks
        const sausOptie = $('.sauzen')
        // data tab friet
        if (next_page.innerHTML.indexOf('Friet') != -1){
            sausOptie.removeClass('sauzenNo')
        }
        // data tab snacks 
        else if(next_page.innerHTML.indexOf('Frikandel') != -1){
        sausOptie.removeClass('sauzenNo')
        }
        else{
        sausOptie.addClass('sauzenNo')
        }
}

// Enable Popup
const selectProduct = $('.order');
const disableScroll = $('body')
const popup = $('#productPopup');
const closePopup = $('.closePopupButton');

selectProduct.on('click', function(){
   var cur = $(this);
   var data = cur.data('product');
   popup.find('[data-product-image]').attr({'src': data.image, 'alt': data.title});
   popup.find('[data-product-title]').html(data.title);
   popup.find('[data-product-price]').val(data.price);
   popup.find('[data-product-id]').val(data._id);
    popup.addClass('popupEnabled');
    $('body').addClass('disableScroll');
});

closePopup.on('click', function(){
    popup.removeClass('popupEnabled');
    $('body').removeClass('disableScroll');
});

$(document).mouseup(function(e) {
    var container = popup.find('.popupScreen');

    if (!container.is(e.target) && container.has(e.target).length === 0) 
    {
        popup.removeClass('popupEnabled');
    $('body').removeClass('disableScroll');
    }
});

function disablePopup(){
    popup.classList.remove('popupEnabled')
    popup.classList.add('popupDisabled')
    disableScroll.classList.remove('disableScroll')
}

// Product counter 
$('.quantity button').on('click', function(){
    var cur = $(this);
    var input = cur.closest('.quantity').find('input');
    var quantity = parseInt(input.val());
    var way = cur.data('way');
    var min = input.attr('min');
    var max = input.attr('max');

    if (way == 'up') {
        if (quantity != max) {
            quantity++;
        } else {
            input.addClass('quantityError');
            setTimeout(function(){
                input.removeClass('quantityError');
            }, 800);
        }
    }

    if (way == 'down') {
        if (quantity != min) {
            quantity--;
        } else {
            input.addClass('quantityError');
            setTimeout(function(){
                input.removeClass('quantityError');
            }, 800);
        }
    }
    input.val(quantity);
});

$('.addToCart').on('click', function() {
    input.value = 1;
    count = 1;

    $('.addToCart').addClass('buttonClicked');
    setTimeout(function(){
        $('.addToCart').removeClass('buttonClicked');
            popup.removeClass('popupEnabled')
            popup.addClass('popupDisabled')
            disableScroll.removeClass('disableScroll')
    }, 800);    
});

var sum = 0;
$('.price').each(function(){
    sum += parseFloat(this.value);
});
$('.totalPrice').html('€ ' + sum)
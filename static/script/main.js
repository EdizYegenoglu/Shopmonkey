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
//    popup.find('[data-category-id]').val(data._id);
    console.log('prd-id: ' + data._id)
    console.log('price ' + data.price)

    popup.addClass('popupEnabled');
    $('body').addClass('disableScroll');
});

closePopup.on('click', function(){
    popup.removeClass('popupEnabled');
    $('body').removeClass('disableScroll');
});

$(document).mouseup(function(e) {
    var container = popup.find('.popupScreen');

    // if the target of the click isn't the container nor a descendant of the container
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
const input = document.querySelector('.quantityFieldset input');

var count = 1;
const addOne = document.querySelector('.quantityFieldset button:first-of-type');
addOne.addEventListener('click', addProduct);

function addProduct(){
    count += 1;
    input.value = + count;
}

const removeOne = document.querySelector('.quantityFieldset button:last-of-type');
removeOne.addEventListener('click', deleteProduct);

function deleteProduct(e){
    // const input = document.querySelector('.quantityFieldset input');

    if (input.value <= 1 ) {
        count = 1;
        input.value = count;
        input.classList.add('quantityError');
        setTimeout(function(){
            input.classList.remove('quantityError')
        }, 800);
    }
    else{
        count -= 1;
        input.value = count;
    }
}

$('.addToCart').on('click', function() {
    const popupProductId = document.querySelector('.popupProductId')
    const popupProductPrice = document.querySelector('.popupProductPrice')
    console.log(popupProductId.value)
    console.log(popupProductPrice.value)
    console.log('qty:  ' + input.value)
    console.log(input.value * popupProductPrice.value)
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




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

   popup.find('[data-product-image]').attr({'src': data.afbeelding, 'alt': data.titel});
   popup.find('[data-product-title]').html(data.titel);
   popup.find('[data-product-price]').html(data.prijs);
   popup.find('[data-product-id]').val(data._id);

    popup.addClass('popupEnabled');
    $('body').addClass('disableScroll');

    const input = document.querySelector('fieldset:first-of-type input');

    if (input.value <= 1 ) {
        count = 1;
        input.value = count;
        
        e.preventDefault;
        input.classList.remove('quantityError');
        void input.offsetWidth;
        input.classList.add('quantityError');
        // setTimeout(function(){
            
        // }, 500);
    }
    else{
        count -= 1;
        input.value = count;
    }
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
const input = document.querySelector('fieldset:first-of-type input');

var count = 1;
const addOne = document.querySelector('fieldset:first-of-type button:first-of-type');
addOne.addEventListener('click', addProduct);

function addProduct(){
    count += 1;
    input.value = + count;
}

const removeOne = document.querySelector('fieldset:first-of-type button:last-of-type');
removeOne.addEventListener('click', deleteProduct);

function deleteProduct(e){
    const input = document.querySelector('fieldset:first-of-type input');

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

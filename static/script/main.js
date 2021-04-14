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
const selectProduct = document.querySelector('.order');
const popup = document.querySelector('section:nth-of-type(2)');
const closePopup = document.querySelector('.closePopupButton');

selectProduct.addEventListener('click', enablePopup);
closePopup.addEventListener('click', disablePopup);
// popup.addEventListener('click', disablePopup);

function enablePopup(){
    popup.classList.add('popupEnabled')
    popup.classList.remove('popupDisabled')
}

function disablePopup(){
    popup.classList.remove('popupEnabled')
    popup.classList.add('popupDisabled')
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
    if (input.value <= 1) {
        count = 1;
        input.value = count;

        e.preventDefault;
        input.classList.remove('quantityError');
        void input.offsetWidth;
        input.classList.add('quantityError') 
    }
    else{
        count -= 1;
        input.value = count;
    }
}
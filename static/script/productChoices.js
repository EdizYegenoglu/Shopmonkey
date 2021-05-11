// const inputBox = document.querySelectorAll('fieldset:nth-of-type(2) input');
// const checkBox = document.querySelectorAll('form fieldset:nth-of-type(2) div label');

// checkBox.forEach((checkBox, index) => {
//     checkBox.addEventListener('click', () => {
//         if(inputBox[index].checked == true){
//             checkBox.classList.add('selected')
//         }
//         else{
//             checkBox.classList.remove('selected')
//         }
//     })
// });
// const inputBox = document.querySelector('fieldset:nth-of-type(2) input');
// for(i=0; i<inputBox.length; i++ ) {
//     inputBox[i].onclick = function(e) {
//         if(e.ctrlKey || e.metaKey) {
//             this.checked = false;
//         }
//     }
// }

// $('fieldset:nth-of-type(2) input').click(function(e){
//     if (e.ctrlKey || e.metaKey) {
//         $(this).prop('checked', false);
//     }
// });
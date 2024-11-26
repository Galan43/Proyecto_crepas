document.addEventListener('DOMContentLoaded', () => {    
    const modalCheckbox = document.getElementById('btn-modal');
    const modal = document.querySelector('.modal');

    modalCheckbox.addEventListener('change', () => {
        if (modalCheckbox.checked) {
            modal.classList.add('visible');
        } else {
            modal.classList.remove('visible');
        }
    })});

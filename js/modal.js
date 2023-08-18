const modalTrigger = document.querySelector('#btn-get');
const modal = document.querySelector('.modal');
const closeModalButton = document.querySelector('.modal_close');

let isOpen = false;
let hasClickedTrigger = false;
let hasScrolledToEnd = false;
let сounter; 

const openModal = () => {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    isOpen = true;
    window.removeEventListener('scroll', onScroll);
}

const closeModal = () => {
    modal.style.display = 'none';
    document.body.style.overflow = '';
}

const onScroll = () => {
    if (!isOpen && !hasClickedTrigger && !hasScrolledToEnd) {
        if (window.pageYOffset > 1000) {
            setTimeout(() => {
                openModal();
            }, 1500);
        }
    }
}

modalTrigger.onclick = () => {
    hasClickedTrigger = true;
    clearTimeout(сounter);
    openModal();
};

closeModalButton.onclick = () => closeModal();
modal.onclick = (event) => {
    if (event.target === modal) {
        closeModal();
    }
}

window.addEventListener('scroll', onScroll);

window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight && !hasScrolledToEnd) {
        hasScrolledToEnd = true;
        clearTimeout(сounter);
        if (!hasClickedTrigger && !isOpen) {
            сounter = setTimeout(() => {
                openModal();
            }, 10000);
        }
    } else if (!hasScrolledToEnd) {
        clearTimeout(сounter); // Отменяем таймер, если пользователь начал скроллить назад
    }
});

сounter = setTimeout(() => {
    if (!hasClickedTrigger && !hasScrolledToEnd) {
        openModal();
    }
}, 10000);

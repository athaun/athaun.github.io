function debounce(func, wait, immediate) {
    var timeout;
    return function() {
        var context = this, args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};

let firstCheck = true;
function checkScroll (e) {
    const cards = document.querySelectorAll('.fadeIn')

    cards.forEach(card => {
        const triggerPos = (window.scrollY + window.innerHeight) - card.offsetHeight / 2
        // Bottom of the card
        const cardBottom = card.offsetTop + card.offsetHeight

        if(triggerPos > card.offsetTop && window.scrollY < cardBottom) {
            card.classList.add('active');
        }
        if (firstCheck && (window.innerHeight - 300) > card.offsetTop) {
            card.classList.add('active');
        }
    })
    firstCheck = false;
}
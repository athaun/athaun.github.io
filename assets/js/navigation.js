document.querySelector('.mobile-menu-button').addEventListener('click', function () {
    const links = document.querySelector('.links');

    if (links.classList.contains('active')) {
        // If menu is open, add closing animation
        links.classList.remove('active');
        links.classList.add('closing');

        // Remove `closing` class after animation ends
        links.addEventListener(
            'animationend',
            () => {
                links.classList.remove('closing');
            },
            { once: true }
        );
    } else {
        // If menu is closed, open it with active class
        links.classList.add('active');
    }

});

// Update nav link click handler
document.querySelectorAll('#navbar .links a').forEach(link => {
    link.addEventListener('click', function() {
        const landingPage = document.querySelector('.landing-page');
        if (landingPage.style.display !== 'none' && !isTransitioning) {
            isTransitioning = true;
            hideLandingPage();
        }

        window.scrollTo(0, 0);
        
        // Close mobile menu if open
        const links = document.querySelector('.links');
        if (links.classList.contains('active')) {
            links.classList.remove('active');
            links.classList.add('closing');
            links.addEventListener(
                'animationend',
                () => {
                    links.classList.remove('closing');
                },
                { once: true }
            );
        }
    });
});

/* LANDING PAGE */
// Reset isTransitioning after animation completes
document.querySelector('.landing-page').addEventListener('transitionend', function() {
    isTransitioning = false;
});

document.querySelector('.scroll-indicator').addEventListener('click', function() {
    const landingPage = document.querySelector('.landing-page');
    if (landingPage.style.display !== 'none' && !isTransitioning) {
        isTransitioning = true;
        hideLandingPage();
    }
    
    // Close mobile menu if open
    const links = document.querySelector('.links');
    if (links.classList.contains('active')) {
        links.classList.remove('active');
        links.classList.add('closing');
        links.addEventListener(
            'animationend',
            () => {
                links.classList.remove('closing');
            },
            { once: true }
        );
    }
});

// Hide landing page after transition and slightly delay scroll unlock
const hideLandingPage = () => {
    const landingPage = document.querySelector('.landing-page');
    landingPage.classList.add('scrolling-out');

    setTimeout(() => {
        landingPage.style.display = 'none';
        window.scrollTo(0, 0);
        setTimeout(() => {
            document.body.classList.remove('no-scroll');
            window.scrollTo(0, 0);
        }, 100);
    }, 700); // Match the transition duration
};

// Lock scrolling immediately
const lockScroll = () => {
    document.body.classList.add('no-scroll');
};

// Initial scroll lock when the page loads
lockScroll();

// Track scroll position and disable all scrolling
let scrollAttempt = 0;
let isTransitioning = false;

// Handle scroll attempt to hide landing page
window.addEventListener('wheel', function (e) {
    const landingPage = document.querySelector('.landing-page');
    if (landingPage.style.display !== 'none' && !isTransitioning) {
        scrollAttempt += e.deltaY;
        if (Math.abs(scrollAttempt) > 100) {
            isTransitioning = true;
            hideLandingPage();
        }
        e.preventDefault();
    }
}, { passive: false });

// Handle touch events for mobile with the same smooth transition
let touchStart = 0;
window.addEventListener('touchstart', function (e) {
    touchStart = e.touches[0].clientY;
});

window.addEventListener('touchmove', function (e) {
    const landingPage = document.querySelector('.landing-page');
    if (landingPage.style.display !== 'none' && !isTransitioning) {
        const touchDiff = touchStart - e.touches[0].clientY;
        if (Math.abs(touchDiff) > 50) {
            isTransitioning = true;
            hideLandingPage();
        }
        e.preventDefault();
    }
}, { passive: false });

// Handle keypress events to prevent scrolling
window.addEventListener('keydown', (e) => {
    const keys = ['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '];
    if (keys.includes(e.key) && !isTransitioning) {
        e.preventDefault();
    }
});

// Reset isTransitioning after animation completes
document.querySelector('.landing-page').addEventListener('transitionend', function () {
    isTransitioning = false;
});


const rhqSticke = document.querySelector('.rhqSticke');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        rhqSticke.classList.add('rhqStickeLgActive');
    } else {
        rhqSticke.classList.remove('rhqStickeLgActive');
    }
});

    // Start
    const pathUrl = "*"
    // const pathUrl = "https://investsaudi.sa"

    window.onscroll = function() {
        let scrollPosition = window.scrollY || document.documentElement.scrollTop;
         let scrollHeight = document.body.scrollHeight;
          let clientHeight =  window.innerHeight;
        
        
        
        window.parent.postMessage({ scrollPosition: scrollPosition, scrollHeight: scrollHeight, clientHeight: clientHeight }, pathUrl);
    };

document.getElementById('mobStickyOpenBtn').addEventListener('click', function() {
    toggleRhqStickeState();
});

document.querySelectorAll('.rhqSticke ul li a').forEach(function(anchor) {
    anchor.addEventListener('click', function() {

         if (window.innerWidth <= 767) {
        toggleRhqStickeState();
        }

    });
});

function toggleRhqStickeState() {
    // Get the element with the class 'rhqSticke'
    var rhqStickeElement = document.querySelector('.rhqSticke');

    // Check if the element has the class 'rhqStickeActive'
    var isActive = rhqStickeElement.classList.contains('rhqStickeActive');

    // Send a message back to the parent window indicating the current state
    window.parent.postMessage({
        action: 'toggle',
        elementId: 'mobStickyOpenBtn',
        active: isActive ? 'active' : 'inactive'
    }, pathUrl);
}



document.querySelectorAll('.moreInfoBtn, .invDocViewBtn').forEach(function(anchor) {
 
    anchor.addEventListener('click', function() {
        popupAction();
    });
});

document.querySelectorAll('.journeyViewBoxCloseBtn, .flipClose, #journeyOverlay').forEach(function(anchor) {
 
    anchor.addEventListener('click', function() {
        popupActionClose();
    });
});


function popupAction() {
    // Send a message back to the parent window indicating the current state
    window.parent.postMessage({
        action: 'toggle',
        elementId: 'popupOpen',
        active: 'active'
    }, pathUrl);
}

function popupActionClose() {
    // Send a message back to the parent window indicating the current state
    window.parent.postMessage({
        action: 'toggle',
        elementId: 'popupClose',
        active: 'active'
    }, pathUrl);
}


// End
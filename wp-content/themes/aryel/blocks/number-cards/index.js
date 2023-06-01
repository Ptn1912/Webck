function numberCardsOnScroll() {
    if (window.innerWidth < 992) return;
    var titledBlocks = Array.from(document.querySelectorAll('.number-cards--with-title'));
    for (var block of titledBlocks) {
        var top = block.getBoundingClientRect().top;
        if (top > 0) {
            return (block.querySelector('.number-cards__left').style.top = '0px');
        }

        if (Math.abs(top) + block.querySelector('.number-cards__left').clientHeight >= block.clientHeight) {
            return (block.querySelector('.number-cards__left').style.top = `${
        block.clientHeight - block.querySelector('.number-cards__left').clientHeight
      }px`);
        }
        block.querySelector('.number-cards__left').style.top = `${Math.abs(top)}px`;
    }
}

function normalCardsResize() {
    if (window.innerWidth < 992) return;

    var blocks = Array.from(document.querySelectorAll('.number-cards--grid'));
    for (var block of blocks) {
        var cards = Array.from(block.querySelectorAll('.number-cards__card'));
        var max = 0;
        for (var card of cards) max = Math.max(card.clientHeight, max);

        if (max > 0)
            for (var card of cards) {
                card.style.height = `${max}px`;
            }
    }
}

window.addEventListener('load', function() {
    numberCardsOnScroll();
    normalCardsResize();
});
window.addEventListener('resize', function() {
    numberCardsOnScroll();
    normalCardsResize();
});
window.addEventListener('scroll', numberCardsOnScroll);
js-   document.addEventListener("DOMContentLoaded", function () {
    const wrapper = document.querySelector(".card-wrapper");
    const scrollIndicator = document.querySelector(".scroll-handle");

    
    let isDragging = false;
    let startX;
    let scrollLeft;

    wrapper.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.pageX - wrapper.offsetLeft;
        scrollLeft = wrapper.scrollLeft;
        wrapper.style.cursor = 'grabbing';
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - wrapper.offsetLeft;
        const walk = (x - startX) * 1.5; 
        wrapper.scrollLeft = scrollLeft - walk;
        updateScrollIndicator();
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
        wrapper.style.cursor = 'grab';
    });

    wrapper.addEventListener('mouseleave', () => {
        isDragging = false;
        wrapper.style.cursor = 'grab';
    });


    wrapper.addEventListener('touchstart', (e) => {
        startX = e.touches[0].pageX - wrapper.offsetLeft;
        scrollLeft = wrapper.scrollLeft;
    }, { passive: true });

    wrapper.addEventListener('touchmove', (e) => {
        const x = e.touches[0].pageX - wrapper.offsetLeft;
        const walk = (x - startX) * 1.5;
        wrapper.scrollLeft = scrollLeft - walk;
        updateScrollIndicator();
    }, { passive: true });

   
    wrapper.addEventListener('wheel', (e) => {
        wrapper.scrollLeft += e.deltaX || e.deltaY;
        updateScrollIndicator();
    });

  
    function updateScrollIndicator() {
        const scrollPercentage = 
            (wrapper.scrollLeft / (wrapper.scrollWidth - wrapper.clientWidth)) * 100;
        scrollIndicator.style.width = `${Math.min(100, Math.max(30, scrollPercentage))}%`;
    }

   
    updateScrollIndicator();
    window.addEventListener('resize', updateScrollIndicator);
});
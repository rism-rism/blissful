$(function() {
	var mySwiper = new Swiper('.swiper-container', {
		slidesPerView: 5,
		spaceBetween: 5,
		centerMode: true,
		fade: true,
		preventClicks: false,
		preventClicksPropagation: false,
    	nextButton: '.swiper-button-next',
    	prevButton: '.swiper-button-prev',
		breakpoints: {
      800: {
        slidesPerView: 3,
        spaceBetween: 1
      }
	  }
	});
});

// iPhone
if ( navigator.userAgent.indexOf('iPhone') > 0 ){
	document.write('<meta name="viewport" content="width=device-width">');

// iPod
} else if( navigator.userAgent.indexOf('iPod') > 0 ){
	document.write('<meta name="viewport" content="width=device-width">');

// Android
} else if( navigator.userAgent.indexOf('Android') > 0 ){
	document.write('<meta name="viewport" content="width=device-width">');

// iPad
} else if( navigator.userAgent.indexOf('iPad') > 0 ){
	document.write('<script src="https://cdnjs.cloudflare.com/ajax/libs/Swiper/3.4.1/js/swiper.min.js">\<\/script>');

// 縺昴�莉�
} else {
	document.write('<script src="https://cdnjs.cloudflare.com/ajax/libs/Swiper/3.4.1/js/swiper.min.js">\<\/script>');

}

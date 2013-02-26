// kill the safari bar
window.addEventListener("load",function() {
  setTimeout(function(){
    window.scrollTo(0, 1);
  }, 0);
});

$(document).ready(function() {

	$.scrollTo(0);

	$('.filter-select').chosen();

	// -- this should be for desktop viewing
	// $('.restaurant-panes').masonry({
	// 	itemSelector : '.pane',
	// 	columnWidth : 240,
	// 	isAnimated: true,
	// 	animationOptions: {
	// 		duration: 500
	// 	}
	// });

	$('.restaurant-panes').on('click', '.pane', function() {

		var pane = $(this);
		var info = pane.find('.additional-info');
		var is_info_visible = (pane.find('.additional-info:visible').length > 0);

		if(is_info_visible) {
			info.slideUp(200);
		} else {
			$('.additional-info').hide();
			info.slideDown(200).promise().done(function() {
				// helpful! http://jdfwarrior.tumblr.com/post/30795209561/flickering-scroll-from-jquery-scrollto-plugin-on-ios
				$.scrollTo( pane, 250, {offset: -10, axis: 'y'} );
			});
		}

		return false;
	});
});
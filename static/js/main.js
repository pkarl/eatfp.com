// I want capitalization.
String.prototype.capitalize = function () {
    return this.replace(/^./, function (x) {
        return x.toUpperCase();
    });
};

// I want a boolean .contains() method.
String.prototype.contains = function (str) {
	if(this.indexOf(str) >= 0) {
		return true
	}
    return false;
};

// kill the safari bar
window.addEventListener("load",function() {
  setTimeout(function(){
    window.scrollTo(0, 1);
  }, 0);
});

$(document).ready(function() {

	// reset the scroll position
	$.scrollTo(0);

	// write initial filter status message
	writeFilterStatus();

	// manipulate restaurant cards to look awesome.
	$('.restaurants').on('click', '.restaurant', function(e) {

		var restaurant = $(this);

		var details = restaurant.find('.restaurant-details');
		var photo = restaurant.find('.photo-frame');
		var controls = restaurant.find('.pane-controls');
		var others = $('.restaurant').not(restaurant);

		var opts = {queue: false, useTranslate3d: true};

		// reset other panels
		others.find('.photo-frame').slideDown(opts);
		others.find('.pane-controls').slideDown(opts);

		if(details.is(':visible')){
			// we can see the panel being clicked on...
			details.slideUp(opts);
			photo.slideDown(opts);
			controls.slideDown(opts);
		} else {
			// if this is a new panel...
			$('.restaurant-details').slideUp(opts);
			
			photo.slideUp(opts);
			controls.slideUp(opts);
			details.slideDown({
				queue: false, 
				complete: function() {
					// scroll to the top of our panel and give us a little space
					$.scrollTo( restaurant, 250, {offset: -10, axis: 'y'} );
				}
			});
		}
		e.stopPropagation();
	});

	$('.restaurants').on('click', 'a', function(e) {
		e.stopPropagation();
	});	

	// filter all of the things
	$('nav').on('click', 'button', function(e) {

		$('nav button').removeClass('active');
		$(this).addClass('active');

		var tag = $(this).find('.filter-button').text().toLowerCase();
		if( tag == 'everything.') {
			$('.restaurant').show();
		} else {
			$('.restaurant').each(function(i, val) {
				r = $(this);

				if( r.data()['tags'].contains( tag ) ) {
					r.show();
				} else {
					r.hide();
				}
			});
		}
		writeFilterStatus();
		return false;
	});

	// loop through telephone numbers + make them clickable
	$('.phone-number').each(function() {
		var clickable_num = $(this).text().match(/[0-9]+/g).join('');
		$(this).attr('href', 'tel:+1' + clickable_num);
	});


	// put today's hours when we can see them
	var days = ['sunday', 'monday','tuesday','wednesday','thursday','friday','saturday'];
	var now = new Date();
	var ht, today = days[ now.getDay() ];
	$('.' + today + ' td').addClass('today');

	$('.restaurant').each(function(i, val) {
		var r = $(this);
		ht = r.find('.hours-today');
		ht.html(today.capitalize() + ' &mdash; ' + r.find('.today.hours').text());
	});

	// give the user "X RESTAURANTS HIDDEN" copy
	function writeFilterStatus() {
		var num_visible = $('.restaurant').filter(':visible').length;
		var num_hidden = $('.restaurant').not(':visible').length;

		var status_el = $('.filter-status');

		status_el.html( 'showing ' + (num_hidden == 0 ? 'all ' : '') + num_visible + ' restaurant' + (num_visible > 1 ? 's' : '') );

		if( num_hidden > 0 ) {
			status_el.append( ', hiding ' + num_hidden );
		}
	}

	// swap out retina imagery
	if (window.devicePixelRatio == 2) {

          var images = $("img.hires");

          // loop through the images and make them hi-res
          for(var i = 0; i < images.length; i++) {

            // create new image name
            var imageType = images[i].src.substr(-4);
            var imageName = images[i].src.substr(0, images[i].src.length - 4);
            imageName += "@2x" + imageType;

            //rename image
            images[i].src = imageName;
          }
     }
});
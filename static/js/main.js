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

		others.find('.photo-frame').slideDown({queue: false});
		others.find('.photo-grame').slideDown({queue: false});

		if(details.is(':visible')){
			details.slideUp({queue: false});
			photo.slideDown({queue: false});
			controls.slideDown({queue: false});
		} else {

			$('.restaurant-details').slideUp({queue: false});
			
			photo.slideUp({queue: false});
			controls.slideUp({queue: false});

			details.slideDown({
				queue: false, 
				complete: function() {
					$.scrollTo( restaurant, 250, {offset: -10, axis: 'y'} );
				}
			});

		}

		return false;
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

		e.preventDefault();
	});


	// put today's hours when we can see them
	var days = ['sunday', 'monday','tuesday','wednesday','thursday','friday','saturday'];
	var now = new Date();
	var ht, today = days[ now.getDay() ];
	$('.' + today ).addClass('today');

	$('.restaurant').each(function(i, val) {
		var r = $(this);
		ht = r.find('.hours-today');
		ht.html(today.capitalize() + ' &mdash; ' + r.find('.today').text());
	});

	function writeFilterStatus() {
		var num_visible = $('.restaurant').filter(':visible').length;
		var num_hidden = $('.restaurant').not(':visible').length;

		var status_el = $('.filter-status');

		status_el.html( 'showing ' + (num_hidden == 0 ? 'all ' : '') + num_visible + ' restaurant' + (num_visible > 1 ? 's' : '') );

		if( num_hidden > 0 ) {
			status_el.append( ', hiding ' + num_hidden );
		}
	}
});
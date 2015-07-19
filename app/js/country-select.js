/**
 *  Country Select
 *   with mini flags
 *
 *  @author: Willem Labu <willem@pwl.co.za>
 */


(function($) {
	'use strict';
    
	// jQuery check
	if (typeof $ === 'undefined') {
		var x = 'The Country Select plugin requires jQuery.';
		window.console.warn(x);
       
		// Show them all
		var selects = document.getElementsByClassName('flags');
		for (var i = 0; i < selects.length; i++) {
			selects[i].style.visibility = 'visible';
		}

		return;
	}
    
     // load countries
    $("#africanCountries").html("");
    $.each(mCountryArray, function( i, l ){
         $("#africanCountries").append('<option class="flag flag-'+l.code+'">'+l.country+'</option>');
    });


	/**
	 *  Let's go!
	 */

	// Find all instances that we should handle
	var countrySelects = $('select.flags');

	// Wrap them in a div
	countrySelects.wrap($('<div />').addClass('countrySelect'));


	// Get a list of all the items in the select
	countrySelects.each(function(index, element) {

		if (!$(element).attr('name')) {
			window.console.warn('One of your country-select elements does not have a `name` attribute.\n ' +
				'It\'s been marked with a red border.');
			$(element).addClass('no-name');
			return;
		}

		// Set a few variables
		// Inside closure, so this will be run for each <select class="flags">
		var parent = $(this).parent('.countrySelect'),
			input = $('<input />'),
			items = $(element).children('.flag'),
			list = $('<ul />'),
			selected = {
				country: null,
				klass: null
			};

		/**
		 *  Loop through all the items in the <select>
		 *  and build our list.
		 *
		 *  <li><i class="flag flag-{countrycode}" />Country Name</li>
		 */
		items.each(function(index, country) {

			var text = $(country).text();
			var klass = $(country).attr('class');
			var li = $('<li />');
			var i = $('<i />').addClass(klass);

			if ($(country).attr('selected')) {
				selected.country = text;
				selected.klass = klass;
				li.addClass('selected');
			}

			list.append(li.append(i).append(text));

		});

		// Put our list in the DOM
		$(parent).append(list);

		/**
		 *  We don't need the <select> anymore.
		 *  Replace it with a hidden input with the same attributes
		 */

		// So.. Loop through all the attributes
		$.each(element.attributes, function(index, attribute) {
			// ..and add them to the <input>
			input.attr(attribute.name, attribute.value);
		});

		/**
		 *  Let's wrap the input nicely:
		 *
		 *  <div class="selectedCountry">
		 *    <div class="currentFlag"><i class="flag"></i></div>
		 *    <input {attributes} />
		 *    <i class="indicator"></i>
		 *  </div>
		 */
		var currentCountry = $('<div />').addClass('selectedCountry');
		var currentFlag = $('<div />').addClass('currentFlag').append($('<i />').addClass('flag').addClass(selected.klass));
		var indicator = $('<i />').addClass('indicator');

		currentCountry
			.append(currentFlag)
			.append(input.removeClass('flags').val(selected.country))
			.append(indicator);

		// Then remove the <select>
		$(element).remove();

		// ..and append the <input> to the DOM
		$(parent).prepend(currentCountry);

		// That's it!

	});



	/**
	 *  Let's initialize the functionality
	 */

	$('body').on('click', function() {
		$('.countrySelect ul').hide();
	});

	$('.selectedCountry').on('click', function(e) {
		e.stopPropagation();
		$(this).siblings('ul').toggle();
	});

	$('.countrySelect li').on('click', function() {

		var value = $(this).text();
		var flag = $(this).children('.flag').attr('class');

		$(this)
			.parent('ul')
			.siblings('.selectedCountry')
			.find('input')
			.val(value);

		$(this)
			.parent('ul')
			.siblings('.selectedCountry')
			.find('.flag')
			.attr('class', flag);

		// Emit an event that can be captured
		$(this).parent('ul').siblings('.selectedCountry').children('input').trigger('country-selected');

	});


})(window.jQuery);
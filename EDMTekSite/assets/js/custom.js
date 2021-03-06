jQuery(document).ready(function($) {
	// headroom
	$(".headroom").headroom({
		"tolerance": 20,
		"offset": 50,
		"classes": {
			"initial": "animated",
			"pinned": "slideDown",
			"unpinned": "slideUp"
		}
	});
	//da slider
	$('#da-slider').cslider({
		autoplay: true,
		bgincrement: 0
	});
	//Set the carousel options
	$('#quote-carousel').carousel({
	    pause: true,
		interval: 4000
	});
	// fancybox
	//$(".fancybox").fancybox();
	//isotope
	if ($('.isotopeWrapper').length) {
		var $container = $('.isotopeWrapper');
		var $resize = $('.isotopeWrapper').attr('id');
		// initialize isotope
		$container.isotope({
			itemSelector: '.isotopeItem',
			resizable: false, // disable normal resizing
			masonry: {
				columnWidth: $container.width() / $resize
			}
		});
		$("a[href='#top']").click(function() {
			$("html, body").animate({
				scrollTop: 0
			}, "slow");
			return false;
		});
		$('.navbar-inverse').on('click', 'li a', function() {
			$('.navbar-inverse .in').addClass('collapse').removeClass('in').css('height', '1px');
		});
		$('#filter a').click(function() {
			$('#filter a').removeClass('current');
			$(this).addClass('current');
			var selector = $(this).attr('data-filter');
			$container.isotope({
				filter: selector,
				animationOptions: {
					duration: 1000,
					easing: 'easeOutQuart',
					queue: false
				}
			});
			return false;
		});
		$(window).smartresize(function() {
			$container.isotope({
				// update columnWidth to a percentage of container width
				masonry: {
					columnWidth: $container.width() / $resize
				}
			});
		});
	}
	$("#contact-container-list").load("contact-list.html #contact-list li", function (response, status, xhr) {
		if (status == "error") {
			var msg = "Sorry but there was an error: ";
			alert(msg + xhr.status + " " + xhr.statusText);
		}
	});
});

function sendMail(formObj) {
    $.ajax({
        type: 'POST',
        url: 'https://mandrillapp.com/api/1.0/messages/send.json',
        data: {
            'key': 'BVXvqpA5lL7r7sJOX_DZGA',
            'message': {
                'from_email': formObj["emailId"].value,
                'to': [
                    {
                        'email': 'info@mcgtek.com',
                        'name': 'MCGTek',
                        'type': 'to'
                    }
                ],
                'autotext': 'true',
                'subject': 'Message from ' + formObj["name"].value,
                'html': formObj["message"].value + "<br/><br/>Name: " + formObj["name"].value + "<br/>Phone: " + formObj["phoneNo"].value
            }
        }
    }).done(function (response) {
        //console.log(response);
        formObj["emailId"].value = '';
        formObj["name"].value = '';
        formObj["message"].value = '';
        formObj["phoneNo"].value = '';
        alert("Message sent");
        //$('#myModal').on('shown.bs.modal', function() {
        //    $('#myInput').focus();
        //});
    });
    return true;
}
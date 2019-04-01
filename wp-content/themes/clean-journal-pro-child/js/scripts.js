/* Implement custom javascript here */

jQuery(document).ready(function($) {
  
	// jQuery UI Dialog for frontpage
	
	$( ".views-field-link, .contact-form-link" ).click(function() {
    var popupID = $(this).attr('id');

		$("#popup-" + popupID).dialog({
      modal: true,
			autoOpen: false,
			dialogClass: "no-close",
			modal: true,
			show: 'fade',
			hide: 'drop',
			open: function() {
        $('.ui-widget-overlay').addClass('custom-overlay');
			},
			close: function() {
					$('.ui-widget-overlay').removeClass('custom-overlay');
					$(this).dialog("destroy");
			},          
			draggable: false,
			width: "90%",
			maxWidth: "768px",
		});
		
		$("#popup-" + popupID).dialog('open');
  });

	// Edit the 'Not found' message on empty category pages
	
	var pageTitle = $(".no-results.not-found .page-header > h1").text();
	if (pageTitle == 'Nothing Found') {
		$(".no-results.not-found .page-header > h1").text("Coming soon");
		$(".no-results.not-found .page-header > h1").css("border-bottom", "none");
		$(".no-results.not-found .page-content").hide();
	}

	// Change <a> target for subscribe icon
	
	$(".header-top-right .custom-icon").attr('target','_self');
	
	
});
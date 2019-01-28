$(document).ready(function() { 
	$('#dialer').show();
  $('#contact-list').hide();
  $('#add-contact').hide();
});

$('#dialer-button').click(function() { 
	$('#dialer').show();
  $('#contact-list').hide();
  $('#add-contact').hide();
});

$('#contact-list-button').click(function() { 
	$('#dialer').hide();
  $('#contact-list').show();
  $('#add-contact').hide();
});

$('#add-contact-button').click(function() { 
	$('#dialer').hide();
  $('#contact-list').hide();
  $('#add-contact').show();
});
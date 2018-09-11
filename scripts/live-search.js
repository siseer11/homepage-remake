jQuery(document).ready(function($){

$('.live-search-list li').each(function(){
$(this).attr("search-term");
});

$('.live-search-box').on('keyup', function(){

var searchTerm = $(this).val().toLowerCase();

    $('.live-search-list li').each(function(){
		
		 
        if ($(this).filter('[search-term ^=' + searchTerm + ']').length > 0 || searchTerm.length < 1) {
            $(this).show();
        } else {
            $(this).hide();
			
        }

    });

});

});
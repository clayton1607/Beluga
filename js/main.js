jQuery(document).ready(function( $ ) {

  // Back to top button
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow');
    } else {
      $('.back-to-top').fadeOut('slow');
    }
  });
  $('.back-to-top').click(function(){
    $('html, body').animate({scrollTop : 0},1500, 'easeInOutExpo');
    return false;
  });

  // Stick the header at top on scroll
  $("#header").sticky({topSpacing:0, zIndex: '50'});

  // Intro background carousel
  $("#intro-carousel").owlCarousel({
    autoplay: true,
    dots: false,
    loop: true,
    animateOut: 'fadeOut',
    items: 1
  });

  // Initiate the wowjs animation library
  new WOW().init();

  // Initiate superfish on nav menu
  $('.nav-menu').superfish({
    animation: {
      opacity: 'show'
    },
    speed: 400
  });

  // Mobile Navigation
  if ($('#nav-menu-container').length) {
    var $mobile_nav = $('#nav-menu-container').clone().prop({
      id: 'mobile-nav'
    });
    $mobile_nav.find('> ul').attr({
      'class': '',
      'id': ''
    });
    $('body').append($mobile_nav);
    $('body').prepend('<button type="button" id="mobile-nav-toggle"><i class="fa fa-bars"></i></button>');
    $('body').append('<div id="mobile-body-overly"></div>');
    $('#mobile-nav').find('.menu-has-children').prepend('<i class="fa fa-chevron-down"></i>');

    $(document).on('click', '.menu-has-children i', function(e) {
      $(this).next().toggleClass('menu-item-active');
      $(this).nextAll('ul').eq(0).slideToggle();
      $(this).toggleClass("fa-chevron-up fa-chevron-down");
    });

    $(document).on('click', '#mobile-nav-toggle', function(e) {
      $('body').toggleClass('mobile-nav-active');
      $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
      $('#mobile-body-overly').toggle();
    });

    $(document).click(function(e) {
      var container = $("#mobile-nav, #mobile-nav-toggle");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
          $('#mobile-body-overly').fadeOut();
        }
      }
    });
  } else if ($("#mobile-nav, #mobile-nav-toggle").length) {
    $("#mobile-nav, #mobile-nav-toggle").hide();
  }

  // Smooth scroll for the menu and links with .scrollto classes
  $('.nav-menu a, #mobile-nav a, .scrollto').on('click', function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      if (target.length) {
        var top_space = 0;

        if ($('#header').length) {
          top_space = $('#header').outerHeight();

          if( ! $('#header').hasClass('header-fixed') ) {
            top_space = top_space - 20;
          }
        }

        $('html, body').animate({
          scrollTop: target.offset().top - top_space
        }, 1500, 'easeInOutExpo');

        if ($(this).parents('.nav-menu').length) {
          $('.nav-menu .menu-active').removeClass('menu-active');
          $(this).closest('li').addClass('menu-active');
        }

        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
          $('#mobile-body-overly').fadeOut();
        }
        return false;
      }
    }
  });


  // Porfolio - uses the magnific popup jQuery plugin
  $('.portfolio-popup').magnificPopup({
    type: 'image',
    removalDelay: 300,
    mainClass: 'mfp-fade',
    gallery: {
      enabled: true
    },
    zoom: {
      enabled: true,
      duration: 300,
      easing: 'ease-in-out',
      opener: function(openerElement) {
        return openerElement.is('img') ? openerElement : openerElement.find('img');
      }
    }
  });

  // Testimonials carousel (uses the Owl Carousel library)
  $(".testimonials-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    responsive: { 0: { items: 1 }, 768: { items: 2 }, 900: { items: 3 } }
  });

  // Clients carousel (uses the Owl Carousel library)
  $(".clients-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    responsive: { 0: { items: 2 }, 768: { items: 4 }, 900: { items: 6 }
    }
  });

  //Google Map
  var get_latitude = $('#google-map').data('latitude');
  var get_longitude = $('#google-map').data('longitude');

  function initialize_google_map() {
    var myLatlng = new google.maps.LatLng(get_latitude, get_longitude);
    var mapOptions = {
      zoom: 14,
      scrollwheel: false,
      center: myLatlng
    };
    var map = new google.maps.Map(document.getElementById('google-map'), mapOptions);
    var marker = new google.maps.Marker({
      position: myLatlng,
      map: map
    });
  }
  google.maps.event.addDomListener(window, 'load', initialize_google_map);

});

getPagination('#table-id');
getPagination('#table-id');
$('#maxRows').trigger('change');
function getPagination (table){

    $('#maxRows').on('change',function(){
      $('.pagination').html('');						// reset pagination div
      var trnum = 0 ;									// reset tr counter 
      var maxRows = parseInt($(this).val());			// get Max Rows from select option
      
      var totalRows = $(table+' tbody tr').length;		// numbers of rows 
     $(table+' tr:gt(0)').each(function(){			// each TR in  table and not the header
       trnum++;									// Start Counter 
       if (trnum > maxRows ){						// if tr number gt maxRows
         
         $(this).hide();							// fade it out 
       }if (trnum <= maxRows ){$(this).show();}// else fade in Important in case if it ..
     });											//  was fade out to fade it in 
     if (totalRows > maxRows){						// if tr total rows gt max rows option
       var pagenum = Math.ceil(totalRows/maxRows);	// ceil total(rows/maxrows) to get ..  
                             //	numbers of pages 
       for (var i = 1; i <= pagenum ;){			// for each page append pagination li 
       $('.pagination').append('<li data-page="'+i+'">\
                    <span>'+ i++ +'<span class="sr-only">(current)</span></span>\
                  </li>').show();
       }											// end for i 
   
       
    } 												// end if row count > max rows
    $('.pagination li:first-child').addClass('active'); // add active class to the first li 
      
      
      //SHOWING ROWS NUMBER OUT OF TOTAL DEFAULT
     showig_rows_count(maxRows, 1, totalRows);
      //SHOWING ROWS NUMBER OUT OF TOTAL DEFAULT

      $('.pagination li').on('click',function(e){		// on click each page
      e.preventDefault();
      var pageNum = $(this).attr('data-page');	// get it's number
      var trIndex = 0 ;							// reset tr counter
      $('.pagination li').removeClass('active');	// remove active class from all li 
      $(this).addClass('active');					// add active class to the clicked 
      
      
      //SHOWING ROWS NUMBER OUT OF TOTAL
     showig_rows_count(maxRows, pageNum, totalRows);
      //SHOWING ROWS NUMBER OUT OF TOTAL
      
      
      
       $(table+' tr:gt(0)').each(function(){		// each tr in table not the header
         trIndex++;								// tr index counter 
         // if tr index gt maxRows*pageNum or lt maxRows*pageNum-maxRows fade if out
         if (trIndex > (maxRows*pageNum) || trIndex <= ((maxRows*pageNum)-maxRows)){
           $(this).hide();		
         }else {$(this).show();} 				//else fade in 
       }); 										// end of for each tr in table
        });										// end of on click pagination list
  });
                    // end of on select change 
   
              // END OF PAGINATION 
  
}	


    

// SI SETTING
$(function(){
// Just to append id number for each row  
default_index();
        
});

//ROWS SHOWING FUNCTION
function showig_rows_count(maxRows, pageNum, totalRows) {
 //Default rows showing
      var end_index = maxRows*pageNum;
      var start_index = ((maxRows*pageNum)- maxRows) + parseFloat(1);
      var string = 'Showing '+ start_index + ' to ' + end_index +' of ' + totalRows + ' entries';               
      $('.rows_count').html(string);
}

// CREATING INDEX
function default_index() {
$('table tr:eq(0)').prepend('<th> ID </th>')

        var id = 0;

        $('table tr:gt(0)').each(function(){	
          id++
          $(this).prepend('<td>'+id+'</td>');
        });
}

// All Table search script
function FilterkeyWord_all_table() {

// Count td if you want to search on all table instead of specific column

var count = $('#table-id').children('tbody').children('tr:first-child').children('td').length; 

      // Declare variables
var input, filter, table, tr, td, i;
input = document.getElementById("search_input_all");
var input_value =     document.getElementById("search_input_all").value;
      filter = input.value.toLowerCase();
if(input_value !=''){
      table = document.getElementById("table-id");
      tr = table.getElementsByTagName("tr");

      // Loop through all table rows, and hide those who don't match the search query
      for (i = 1; i < tr.length; i++) {
        
        var flag = 0;
         
        for(j = 0; j < count; j++){
          td = tr[i].getElementsByTagName("td")[j];
          if (td) {
           
              var td_text = td.innerHTML;  
              if (td.innerHTML.toLowerCase().indexOf(filter) > -1) {
              //var td_text = td.innerHTML;  
              //td.innerHTML = 'shaban';
                flag = 1;
              } else {
                //DO NOTHING
              }
            }
          }
        if(flag==1){
                   tr[i].style.display = "";
        }else {
           tr[i].style.display = "none";
        }
      }
  }else {
    //RESET TABLE
    $('#maxRows').trigger('change');
  }
}

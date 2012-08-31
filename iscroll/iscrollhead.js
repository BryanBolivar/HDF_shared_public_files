var myScroll;
var a = 0;
function initialize_iScroll() {
	setHeight();	// Set the wrapper height. Not strictly needed, see setHeight() function below.

	// Please note that the following is the only line needed by iScroll to work. Everything else here is to make this demo fancier.
	myScroll = new iScroll('wscroller', {hScrollbar:false});
}

// Change wrapper height based on device orientation. Not strictly needed by iScroll, you may also use pure CSS techniques.
function setHeight() {
    var headerH = $('#header').is(":visible") ? $('#header').height() : 0;
    var footerH = $('#footer').is(":visible") ? $('#footer').height() : 0;
    var mb = -86;
    if($("#monthcal").css("display") === "block"){headerH = 268; mb = -311}else{headerH = 43}
    var wrapperH = $(window).height() - headerH - footerH;
    console.log(mb);

    $('#wscroller').height( wrapperH );
    $('#wrapper').css( "margin-bottom", mb );
}

// Prevent the whole screen to scroll when dragging elements outside of the scroller (ie:header/footer).
// If you want to use iScroll in a portion of the screen and still be able to use the native scrolling, do *not* preventDefault on touchmove.
$(document).bind('touchmove', function (e) { e.preventDefault(); });

function scroll_list( )
{
   // Now scroll the list so that the current selection is at the top
   setHeight();
   if(myScroll){    // Was iScroll properly initialized?
     myScroll.refresh();

     if( showinggrid ) {
	   myScroll.scrollTo( 0, 0, 0 );   // Must scroll to top or does
	   // not show
   } else {
    myScroll.scrollToElement( "#list" + selected_date, 0 );
  }
}
   else   // Handle case that iScroll was not initialized properly
    if(!showinggrid && selected_date)
     window.scroll(0,$("#list" + selected_date).offset().top);
   else
    window.scroll(0,0);
}

function scroll_reset_height( )
{
    setHeight();
    if(myScroll){
	myScroll.refresh();
    }
}

function scroll_to_top( )
{
   if(myScroll){    // Is iScroll initialized?
       myScroll.scrollTo( 0, 0, 0 );   // Scroll to top to show text
   } else {
       // for show detail also top off the window
       $('#wrapper').scrollTop(0);
       window.scroll(0,0);
   }
}

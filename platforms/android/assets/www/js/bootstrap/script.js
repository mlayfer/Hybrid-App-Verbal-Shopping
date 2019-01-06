/*
 * Websuit script
 */


$(document).ready(function () {    
    
    
    $('.circlestat').circliful();

    //PAGES-WINDOW.LOCATION
    $('.scan-btn-border').on('click', function(){
        window.location="history.html";
    });
    $('.report-element').on('click', function(){
        window.location="history-details.html";
    });
    $('#back-btn').on('click', function(){
        window.history.back();
    });
    $('#toform').on('click', function(){
        window.location="form.html";
    });
    $('.to-summary-report').on('click', function(){
        window.location="summary-report.html";
    });
    
    
    $('.scan-button-container').height($('.scan-button-container').width());

    //FORM-BTNS
    $('.tasks-list-element .btn-white').click(function(){
        $(this).addClass('active');
        $(this).parent().siblings().children().removeClass('active');
        
        if ($(this).hasClass('btn-time')) {
        $(this).children().html('15:35');
        
        };
        if ($(this).hasClass('btn-text')) {
        $(this).parent().prev().children().children().html('בוצע');
        
        };         
        if ($(this).hasClass('orange')) {
        window.location="reasonlist.html";    
        
        };
        if ($(this).hasClass('red')) {
        window.location="reasonlist.html";    
        
        };
        if ($(this).hasClass('green')) {
            $(this).parent().parent().parent().parent().parent().next().children().children().removeClass('active');
                      
        };
        
    });
    
    //Summery-report Location-btn
    $('.location-btn').on('click', function(){
        $(this).toggleClass('active');
        $('.overlay').show();  
        $('.pup5').addClass('show');         
    });
    $('.chosen-location').on('click', function(){
        $('.overlay').hide();
        $(this).parent().parent().parent().removeClass('show'); 
    });
    
    //Reason-list-element-btn
    $('.reason-list-element').on('click', function(){
        $(this).toggleClass('active');
        $(this).siblings('.reason-list-element').removeClass('active');
    });
    
    //POPUPS    
    $('.form-control').on('click', function(){
        $('.overlay').show();        
    });
    $('#close-btn').on('click', function(){
        $('.overlay').hide();        
    });            
    $('#pop1').on('click', function(){
        $('.overlay').show();  
        $('.pup1').addClass('show'); 
    });
    $('#pop2').on('click', function(){
        $('.overlay').show();  
        $('.pup2').addClass('show');          
    });
    $('#pop3').on('click', function(){
        $('.overlay').show();  
        $('.pup3').addClass('show');          
    });    
    $('#pop4').on('click', function(){
        $('.overlay').show();  
        $('.pup4').addClass('show');          
    });
    $('#pop6').on('click', function(){
        $('.overlay').show();  
        $('.pup6').addClass('show');               
    });
    $('.close-pop').on('click', function(){
        $('.overlay').hide();  
        $(this).parent().parent().parent().parent().removeClass('show');          
    });
    
    
    $('.camera-up-btn').on('click', function(){
         window.location="reasonlist-cam.html";        
    });
    
    $('.camera-photo-btn').on('click', function(){
         window.location="reasonlist-cam2.html";        
    });
    $('#reason-back-btn').on('click', function(){
         window.location="reasonlist.html";        
    });
    $('.reason-back-btn').on('click', function(){
         window.location="reasonlist.html";        
    });
    

    $('.report-element').on('click', function () {
        window.location="history-details.html";
    });
    
    //LIST ITEMS
    $('.chosen-location').click(function(){
        $(this).toggleClass('active');
        $(this).siblings('.chosen-location').removeClass('active');
    });
    $('.chosen-type').click(function(){
        $(this).toggleClass('active');
        $(this).siblings('.chosen-type').removeClass('active');
    });

    
    
    new stickyTitles(jQuery(".followMeBar")).load();
});

function stickyTitles(stickies) {

    var thisObj = this;

    thisObj.load = function() {

        stickies.each(function(){

            var thisSticky = jQuery(this).wrap('<div class="followWrap" />');
            thisSticky.parent().height(thisSticky.outerHeight());

            jQuery.data(thisSticky[0], 'pos', thisSticky.offset().top);

        });

        jQuery(window).off("scroll.stickies").on("scroll.stickies", function() {

            thisObj.scroll();

        });
    }

    thisObj.scroll = function() {

        stickies.each(function(i){

            var thisSticky = jQuery(this),
                nextSticky = stickies.eq(i+1),
                prevSticky = stickies.eq(i-1),
                pos = jQuery.data(thisSticky[0], 'pos');

            if (pos <= jQuery(window).scrollTop()) {

                thisSticky.addClass("fixed");

                if (nextSticky.length > 0 && thisSticky.offset().top >= jQuery.data(nextSticky[0], 'pos') - thisSticky.outerHeight()) {

                    thisSticky.addClass("absolute").css("top", jQuery.data(nextSticky[0], 'pos') - thisSticky.outerHeight());
                }

            } else {

                thisSticky.removeClass("fixed");

                if (prevSticky.length > 0 && jQuery(window).scrollTop() <= jQuery.data(thisSticky[0], 'pos')  - prevSticky.outerHeight()) {

                    prevSticky.removeClass("absolute").removeAttr("style");
                }
            }
        });
    }
}
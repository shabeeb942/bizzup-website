
$(document).ready(function() {

    if ($(window).width() <= 767) {
       var itemsPerSet = 10;
        var totalItems = $('#mobileTestiLogo .af_logo_thumb').length;
      $('.succBtnWrap').css({'display' : 'flex'});
   }else{
        var itemsPerSet = 19;
        var totalItems = $('#dTopTestiLogo .af_logo_thumb').length;
      $('.succBtnWrap').css({'display' : 'none'});
   
   }
      
       var currentIndex = 0;
       var autoplayInterval;
   
       function showItems(startIndex) {
          
            if ($(window).width() <= 767) {
            $('#mobileTestiLogo .af_logo_thumb').removeClass('active-set');
           $('#mobileTestiLogo .af_logo_thumb').slice(startIndex, startIndex + itemsPerSet).addClass('active-set animated zoomIn');         
           $('.af_logo_thumb2').addClass('active-set');
   
          }else{
            $('#dTopTestiLogo .af_logo_thumb').removeClass('active-set');
           $('#dTopTestiLogo .af_logo_thumb').slice(startIndex, startIndex + itemsPerSet).addClass('active-set');
          }
       }
   
       function nextItems() {
           if (currentIndex + itemsPerSet < totalItems) {
               currentIndex += itemsPerSet;
           } else {
               currentIndex = 0; // Reset to start if at the end
           }
           showItems(currentIndex);
       }
   
       function prevItems() {
           if (currentIndex - itemsPerSet >= 0) {
               currentIndex -= itemsPerSet;
           } else {
               currentIndex = Math.max(totalItems - itemsPerSet, 0); // Go to the last set if at the start
           }
           showItems(currentIndex);
       }
   
       showItems(currentIndex);
   
       // Next Button Click
       $('#succVideoCircleNextBtn').on('click', function() {
           nextItems();
       });
   
       // Prev Button Click
       $('#succVideoCirclePrevBtn').on('click', function() {
           prevItems();
       });
   
         // Next Button Click
       $('#succVideoCircleNextBtnMob').on('click', function() {
           nextItems();
       });
   
       // Prev Button Click
       $('#succVideoCirclePrevBtnMob').on('click', function() {
           prevItems();
       });
   
       // Autoplay function
       function startAutoplay() {
           autoplayInterval = setInterval(nextItems, 5000); // Change 3000 to your desired interval in milliseconds
       }
   
        // Start autoplay on page load
       if ($(window).width() <= 767) {
      // startAutoplay();
   }
   
       // function stopAutoplay() {
       //     clearInterval(autoplayInterval);
       // }
   
      
   
       // Optional: Stop autoplay on button hover
     //  $('#succVideoCircleNextBtn, #succVideoCirclePrevBtn, .af_rhqchange_imgsec_img').hover(stopAutoplay, startAutoplay);
   });
   
   
   
   
   // Select all play button wrappers
   const playButtons = document.querySelectorAll('.succ_play_btn_wrap');
   
   // Add click event listener to each play button
   playButtons.forEach(button => {
       button.addEventListener('click', function() {
           // Get the video source path from the custom attribute
           const videoSrc = this.getAttribute('video-scr');
   
           // Select the video element in the popup
           const videoPopup = document.querySelector('.succVideoPlayPopup video');
   
           // Update the video source
           videoPopup.src = videoSrc;
   
           // Show the video popup
           document.querySelector('.succVideoPlayPopup').style.display = 'block';
           document.querySelector('.succVideoPlayPopupOverLay').style.display = 'none';
   
           // Play the video
           videoPopup.play();
       });
   });
   
   // Function to close the video popup
   $('.succVideoCloseBtn, .af_logo_thumb ').on('click', function() {
       const videoPopup = document.querySelector('.succVideoPlayPopup');
       const videoPopupLayout = document.querySelector('.succVideoPlayPopupOverLay');
       const video = videoPopup.querySelector('video');
       
       // Pause the video
       video.pause();
       
       // Hide the video popup
       videoPopup.style.display = 'none';
       videoPopupLayout.style.display = 'none';
   
       // Remove the video source to stop the video from loading in the background
       video.src = '';
   });
   
   
    // Header Fixed Onscroll
        function updateScroll() {
   
   
   
   
           if ($(window).scrollTop() >= 80) {
               $("rhqSticke").addClass('stickyHeader animated  fadeInDown ');
             
                 // $(".headerLogo img").attr("src", themeURL+"assets/images/scap-white.png");
   
   
           } else {
               $("rhqSticke").removeClass("stickyHeader animated  fadeInDown ");
                //$(".headerLogo img").attr("src", themeURL+"assets/images/scap-white.png");
                
           }
       }
   
   
       $(function() {
           $(window).scroll(updateScroll);
           updateScroll();
       });
   
   
       $(document).ready(function () {
       // Cache selectors
       var lastId,
           topMenu = $(".rhqSticke .rhqStickeContainer ul"),
           topMenuHeight = topMenu.outerHeight() + 0,
           // All list items
           menuItems = topMenu.find("a"),
           // Anchors corresponding to menu items
           scrollItems = menuItems.map(function () {
               var item = $($(this).attr("href"));
               if (item.length) { return item; }
           });
   
       // Flag to differentiate between user scroll and programmatically triggered scroll
       var isScrolling = false;
   
       // Function to update the indicator based on the active class
       function updateIndicator(index) {
   
   
   
         var rhqLang = $('html').attr('lang');
      
   
       if (rhqLang === 'ar') {
           // Arabic Language
           if ($(window).width() <= 767) {
               translateValue = `translateY(calc(${index} * 100%))`;
           } else {
               translateValue = `translateX(calc(-${index} * 100%))`;
           }
       } else  {
           // English Language
           if ($(window).width() <= 767) {
               translateValue = `translateY(calc(${index} * 100%))`;
           } else {
               translateValue = `translateX(calc(${index} * 100%))`;
           }
       }
   
           // Update the transform and opacity properties of the .moveAni element
           $('.moveAni').css({
               'transform': translateValue,
               'opacity': 1
           });
       }
   
       // Bind click handler to menu items
   menuItems.click(function (e) {
       e.preventDefault();
       
        if ($(window).width() <= 767) {
       var href = $(this).attr("href"),
           offsetTop = href === "#" ? 0 : $(href).offset().top - topMenuHeight + 750;
       }else{
       var href = $(this).attr("href"),        
            offsetTop = href === "#" ? 0 : $(href).offset().top - topMenuHeight + 1;
       }
   
       // Remove 'active' class from all items immediately
       $(".rhqSticke ul li").removeClass("active");
   
       // Get the index of the clicked item
       var index = $(this).parent().attr('rhqSticke-index');
   
   
   
       // Add 'active' class to the clicked item
       $(this).parent().addClass("active");
   
       // Update the indicator position and opacity
       updateIndicator(index);
   
       // Disable scroll handling
       isScrolling = true;
   
       // Smooth scroll to the section
       $('html, body').stop().animate({
           scrollTop: offsetTop
       }, 800, function() {
           isScrolling = false; // Re-enable scroll handling after animation completes
       });
   });
   
   
       // Bind to scroll
       $(window).scroll(function () {
           if (isScrolling) return; // If scrolling was triggered by a click, do nothing
   
           // Get container scroll position
           var fromTop = $(this).scrollTop() + topMenuHeight;
   
           // If scroll position is 0, make the first li active
           if ($(this).scrollTop() === 0 || $(this).scrollTop() < 1000) {
               $(".rhqSticke ul li").removeClass("active");
               $(".rhqSticke ul li:first").addClass("active");
   
               // Update the indicator position
               updateIndicator(0);
               return; // Stop further execution if we're at the top
           }
   
           // Get id of current scroll item
           var cur = scrollItems.map(function () {
               if ($(this).offset().top < fromTop)
                   return this;
           });
           // Get the id of the current element
           cur = cur[cur.length - 1];
           var id = cur && cur.length ? cur[0].id : "";
   
           if (lastId !== id) {
               lastId = id;
               // Set/remove active class
               menuItems
                   .parent().removeClass("active")
                   .end().filter("[href='#" + id + "']").parent().addClass("active");
   
               // Get the index of the active item
               var activeIndex = $(".rhqSticke ul li.active").attr('rhqSticke-index');
   
               // Update the indicator position and opacity
               updateIndicator(activeIndex);
           }
       });
   
       // Ensure the first li is active if no other items are active
       if ($(".rhqSticke ul li.active").length === 0) {
           $(".rhqSticke ul li:first").addClass("active");
       }
   
       // Initial call to set the indicator position on page load
       var initialIndex = $(".rhqSticke ul li.active").attr('rhqSticke-index');
       updateIndicator(initialIndex);
   
   
   
      $('#mobStickyOpenBtn').click(function() {
       $('.rhqSticke').toggleClass('rhqStickeActive');
       $('.rhqStickeOverlay').toggle();
       // $('.mobStickyCloseBtn').toggle();
   });
   
   
   
       $('#mobStickyCloseBtn').click(function(){
           $('.rhqSticke').removeClass('rhqStickeActive');
           $('.rhqStickeOverlay').css({'display' : 'none'});
           $('.mobStickyCloseBtn ').css({'display' : 'none'});
       })
     if ($(window).width() <= 767) {
        $('.rhqSticke li').click(function(){
               $('.rhqSticke').removeClass('rhqStickeActive');
           $('.rhqStickeOverlay').css({'display' : 'none'});
           $('.mobStickyCloseBtn ').css({'display' : 'none'});
       })
   }
   
   
   //   document.getElementById('dualLink').addEventListener('click', function(event) {
   //     event.preventDefault(); // Prevents the default anchor behavior
   //     window.open('https://investsaudi.sa/en/login', '_blank'); // Opens the external URL in a new tab
      
   // });
   
   });
   
   
   function updateActiveItem(index) {
       // Remove the 'active' class from all list items
       $(".rhqSticke ul li").removeClass("active");
   
       // Add the 'active' class to the list item at the specified index
       $(".rhqSticke ul li").eq(index).addClass("active");
   }
   
   // Example usage: Set the first list item as active
   updateActiveItem(0);
   
   
   
       wow = new WOW(
              {
                animateClass: 'animated',
                offset:       150,
                callback:     function(box) {
                  console.log("WOW: animating <" + box.tagName.toLowerCase() + ">")
                }
              }
            );
            wow.init();
            
            
   
                function playVideo() {
       $('.videoPlayPopupOverLay').css({'display': 'none'});  
         $('.videoPlayPopup').css({'display': 'block'});
       $('.videoPlayPopup').addClass('');      
   }
   
      function playVideoClose() {
       $('.videoPlayPopupOverLay').css({'display': 'none'}); 
       $('.videoPlayPopup').removeClass('animated zoomIn');   
         $('.videoPlayPopup').css({'display': 'none'});
   }
   
   $(document).ready(function() {
       $(window).on('scroll', function() {
           $('#rhqRccordion1 .card').each(function() {
               var divTop = $(this).offset().top;
               var scrollPosition = $(window).scrollTop();
               var windowHeight = $(window).height();
               
               // Adding the 'active' class when scrolling down
               if (scrollPosition + windowHeight >= divTop + 500) {
                   $(this).addClass('active');
               } 
               // Removing the 'active' class when scrolling up
               else if (scrollPosition + windowHeight < divTop + 500) {
                   $(this).removeClass('active');
               }
           });
       });
   });
   
   
   
   $(window).on('load', function() {
     if ($(window).width() <= 991) {
   
      // Initially show the button and then hide it after 10 seconds
       $(".applyNowFloatBtn").removeClass("applyNowFloatBtnHide");
   
       setTimeout(function() {
           $(".applyNowFloatBtn").addClass("applyNowFloatBtnHide");
       }, 10000); // Add the class back after 10 seconds*/
   
   
   // Show the button when hovering over it
   $(".applyNowFloatBtn").mouseover(function() {
       $(this).removeClass("applyNowFloatBtnHide");
   });
   
   $('.applyNowFloatBtn .fb-icn-cricle').click(function(){
         // Prevent the default link action
           event.preventDefault();
   
           // Show the button by removing the class
           $('.applyNowFloatBtn').removeClass("applyNowFloatBtnHide");
           
           return false; // Stop any other handlers from being executed
   })
   
   // Hide the button when the mouse leaves
   $(".applyNowFloatBtn").mouseleave(function() {
       $(this).addClass("applyNowFloatBtnHide");
   });
   
   // Hide the button when the page is scrolled
   $(window).scroll(function() {
       $(".applyNowFloatBtn").addClass("applyNowFloatBtnHide");
   });
   }
   
   });
   
   $(document).ready(function(){
       // Initially hide all content sections and remove the 'active' class from all thumbnails
       $('.af_rhqCont_main').hide().removeClass('active');
       $('.af_logo_thumb, .more_testi_link').removeClass('active');
   
       // Set the default active section to #companyFour
       var defaultActiveLink = $('[href="#company2"]');
       var defaultTarget = defaultActiveLink.attr('href');
       
       // Add 'active' class to #companyFour link and show the corresponding section
       defaultActiveLink.addClass('active');
       $(defaultTarget).show().addClass('active');
   
       // Function to handle showing and hiding content
       function showContent(target) {
           // Remove 'active' class from all thumbnails and content sections
           $('.af_logo_thumb, .more_testi_link').removeClass('active');
           $('.af_rhqCont_main').hide().removeClass('active');
   
           // Add 'active' class to the clicked or hovered thumbnail and show the corresponding content
           $('[href="' + target + '"]').addClass('active');
           $(target).fadeIn(500).addClass('active');
       }
   
       // Event handlers for click and hover on thumbnails and Swiper slides
       $('.af_logo_thumb, .more_testi_link').on('click hover', function(event){
           event.preventDefault(); // Prevent default anchor behavior
   
           // Get the target content section's ID from the clicked or hovered link
           var target = $(this).attr('href');
   
           // Call the function to show the correct content
           showContent(target);
       });
   
   
   
   
       if ($(window).width() <= 1199) {
       $('.af_rhqchange_imgsec_img a').on('click', function(event) {
           event.preventDefault(); // Prevent the default anchor click behavior
   
           // Scroll to div2 regardless of screen size
           $('html, body').animate({
               scrollTop: $('.af_rhqcontent_sec').offset().top - 250
           }, 800); // You can adjust the duration (800ms) for the smooth scroll effect
       });
   }
   
   });
   
   $(document).ready(function() {
       // When the play button is clicked
       $('#af_playbtnWrap').click(function() {
           var videoSrc = $(this).closest('.rhqCompaniesItemVideo').find('.storyVideo').attr('src');
   
           // Set the iframe src to the popup's iframe and show the popup
           $('#popupVideoFrame').attr('src', videoSrc + "?autoplay=1");
           $('.af_videoPopup').fadeIn();
       });
   
       // Close the modal and hide the video popup
       $('.afvideoclose_modal').click(function() {
           $('.af_videoPopup').fadeOut();
           $('#popupVideoFrame').attr('src', ''); // Stop the video
       });
   
       // Optional: Close modal when clicking outside of the video content
       $('.af_videoPopup').click(function(event) {
           if (!$(event.target).closest('.af_videoModal_content').length) {
               $('.af_videoPopup').fadeOut();
               $('#popupVideoFrame').attr('src', ''); // Stop the video
           }
       });
   });
   
   
   
   
   
   
    // Flipbook main Js file
      jQuery(document).ready(function () {
       var flipBook; // Declare the flipBook variable globally
   
       // Event listener for the anchor tag with the class `invDocBtn`
       jQuery('.invDocViewBtn').on('click', function(e) {
           e.preventDefault(); // Prevent default action
             $('.rhqSticke').css({'opacity' : '0'});
           // Get the href attribute value from the clicked anchor tag
           var pdfUrl = jQuery(this).attr('href');
   
           // Update the `pdf` variable with the URL from the clicked anchor tag
           var pdf = pdfUrl;
   
           // Options for the flipBook
           var options = {
               height: 2000,
               duration: 700,
               backgroundColor: "#2f2d2fc2"
           };
   
           // Initialize flipBook with the provided PDF URL and options
           flipBook = jQuery("#flipbookContainer").flipBook(pdf, options);
   
           // Display the flipbook container
           jQuery('#flipbookContainerWrap').css('display', 'block');
       });
   
       // Event listener for the element with the class `flipClose`
       jQuery('.flipClose').on('click', function() {
              $('.rhqSticke').css({'opacity' : '1'});
           // Hide the flipbook container
           jQuery('#flipbookContainerWrap').css('display', 'none');
   
           // Clear the PDF URL and reload the flipbook with an empty URL
           var emptyPdf = ''; // Set an empty PDF URL
   
           // Reinitialize the flipbook with the empty PDF URL
           flipBook = jQuery("#flipbookContainer").flipBook(emptyPdf, {});
   
           // Clear the HTML content of the flipbook container
           jQuery("#flipbookContainer").empty();
       });
   });
   
   
   $(document).ready(function() {
       $('.moreInfoBtn').on('click', function() {
              $('.rhqSticke').css({'opacity' : '0'});
           var id = $(this).attr('id').replace('moreInfoBtn', '');
           
           // Display the corresponding journey view and overlay
           $('#journeyView' + id).css('display', 'block');
           $('#journeyView' + id).removeClass('animated zoomOut');
           $('#journeyView' + id).addClass('animated zoomIn');
            $('body').css({'overflow': 'hidden'});
           $('#journeyOverlay').css({
               'display': 'block',
               'background-color': 'rgba(0, 0, 0, 0.8)', // or any desired opacity
               'position': 'fixed',
               'top': 0,
               'left': 0,
               'width': '100%',
               'height': '100%',
               'z-index': 999999
           });
       });
   
      // Close journey view and overlay when the close button is clicked
       $('.journeyViewBoxCloseBtn').on('click', function() {
              $('.rhqSticke').css({'opacity' : '1'});
           $('#journeyOverlay').css('display', 'none');
           $('.journeyViewBox').css('display', 'none');
            $('.journeyViewBox').removeClass('animated zoomIn');
           $('.journeyViewBox').addClass('animated zoomOut');
           $('body').css({'overflow': ''});
       });
   
       // Optionally, close journey view and overlay when clicking on the overlay itself
       $('#journeyOverlay').on('click', function() {
           $(this).css('display', 'none');
           $('.journeyViewBox').css('display', 'none');
           $('body').css({'overflow': ''});
       });
   });
   
   
   
           var swiper = new Swiper(".afestablish-swiper", {
         slidesPerView: 1,
         spaceBetween: 10,
         pagination: {
           el: ".swiper-pagination",
           clickable: true,
         },
         breakpoints: {
            547: {
             slidesPerView: 2,
             spaceBetween: 0,
           },
           640: {
             slidesPerView: 2,
             spaceBetween: 10,
           },
           768: {
             slidesPerView: 2,
             spaceBetween: 10,
           },
            992: {
             slidesPerView: 2.5,
             spaceBetween: 10,
           },
           1024: {
             slidesPerView: 3,
             spaceBetween: 10,
           },
         },
       });
   
   
   
   
        function updateScroll() {
   
           if ($(window).scrollTop() >= 80) {
               $("header").addClass('stickyHeader animated  fadeInDown ');
             
                 // $(".headerLogo img").attr("src", themeURL+"assets/images/scap-white.png");
   
   
           } else {
               $("header").removeClass("stickyHeader animated  fadeInDown ");
                //$(".headerLogo img").attr("src", themeURL+"assets/images/scap-white.png");
                
           }
       }
   
       $(function() {
           $(window).scroll(updateScroll);
           updateScroll();
       });
   
   
   
       
       $(document).ready(function() {
       $('a').on('click', function(e) {
           var hrefValue = $(this).attr('href');
   
           // If href is empty or '#', prevent the default action
           if (hrefValue === '' || hrefValue === '#') {
               e.preventDefault();
               return false;
           }
       });
   });
   
   
       $(document).ready(function() {
   
   
           // Function to get language from URL
       function getLanguageFromUrl() {
           var currentUrl = window.location.href;
           if (currentUrl.includes('/ar')) {
               return 'ar';
           } else if (currentUrl.includes('/zh')) {
               return 'zh';
           } else {
               return 'en';
           }
       }
   
       // Define button text for each language
       var buttonTexts = {
           en: { readMore: 'Read more', hide: 'Hide' },
           ar: { readMore: 'قراءة المزيد', hide: 'إخفاء' },
           zh: { readMore: '查看更多', hide: '隐藏' }
       };
   
       // Get the current language from URL
       var currentLanguage = getLanguageFromUrl();
   
   
   
   
       $('.storyReadmoreBtn').on('click', function() {
           // Toggle the 'active' class on the closest parent with the class 'rhqCompaniesItemWrapper'
           var $parentWrapper = $(this).closest('.rhqCompaniesItemWrapper');
            var $button = $(this);
           $parentWrapper.toggleClass('active');
            // Check if the parent wrapper has the 'active' class
           if ($parentWrapper.hasClass('active')) {
               // If active, change the button text to 'Read less'
               $button.text(buttonTexts[currentLanguage].hide);
           } else {
               // If not active, revert the button text to 'Read more'
               $button.text(buttonTexts[currentLanguage].readMore);
           }
           
           // Scroll the closest parent with an ID into view
           var $parentWithId = $parentWrapper.closest('[id]');
      //      setTimeout(function(){
      // if ($parentWithId.length) {
      //          $parentWithId[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
      //      }
      //  },1000)
           
       });
   });
   
   
       // Function to check and toggle visibility of the 'storyReadmoreBtn' for each '.rhqStoryContentArea'
       function updateReadMoreButtons() {
           $('.rhqStoryContentArea').each(function() {
               var $contentArea = $(this);
               // Find the closest parent with the class 'rhqCompaniesItemWrapper'
               var $parentWrapper = $contentArea.closest('.rhqCompaniesItemWrapper');
               // Find the 'storyReadmoreBtn' within the closest parent
               var $readMoreBtn = $parentWrapper.find('.storyReadmoreBtn');
               
               // Check the height of the content area
               if ($contentArea.height() < 145) {
                   $readMoreBtn.hide(); // Hide button if height is less than 145px
                    $('.rhqStoryContentArea').removeClass('height-enable')
               } else {
                   $readMoreBtn.show(); // Show button if height is 145px or more
                   $('.rhqStoryContentArea').addClass('height-enable')
               }
           });
       }
   $('.af_logo_thumb').click(function(){   
   
       $('.rhqCompaniesItemWrapper').removeClass('active');
       setTimeout(function(){
        updateReadMoreButtons();
   
   
     let rhqStoryContentHeight = $('.af_rhqCont_main.active .rhqStoryContentArea').height();
     if(rhqStoryContentHeight <= 145){
       $('.af_rhqCont_main.active .rhqStoryContent').removeClass('low-height')
   
       $('.af_rhqCont_main.active .storyReadmoreBtn').hide()
     }else{
        $('.af_rhqCont_main.active .rhqStoryContent').addClass('low-height')
        $('.af_rhqCont_main.active .storyReadmoreBtn').show()
     }
   
    },500)
   
   
   
   })
   
   
   $(document).ready(function() {
       $('.storyReadmoreBtn').on('click', function() {
           $('.rhqStoryContent').scrollTop(0);
   
   
       });
   
   
    let rhqStoryContentHeight = $('.af_rhqCont_main.active .rhqStoryContentArea').height();
     if(rhqStoryContentHeight <= 145){
       $('.af_rhqCont_main.active .rhqStoryContent').removeClass('low-height');
        $('.af_rhqCont_main.active .storyReadmoreBtn').hide()
     }else{
        $('.af_rhqCont_main.active .rhqStoryContent').addClass('low-height')
         $('.af_rhqCont_main.active .storyReadmoreBtn').show()
     }
   
       
   });
   
   
   
     $(window).on('scroll', function () {
           var scrollTop = $(window).scrollTop();
           var documentHeight = $(document).height();
           var windowHeight = $(window).height();
           
           if ($(window).width() >= 768) {
   
           // Check if the user is near the bottom of the page
           if (scrollTop + windowHeight >= documentHeight - 100) { // Adjust 100 to your preference
               $('.applyNowFloatBtn').addClass('bottom-move');
           } else {
               $('.applyNowFloatBtn').removeClass('bottom-move');
           }
           }
       });
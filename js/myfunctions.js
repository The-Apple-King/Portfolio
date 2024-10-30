
$('html, body').css({
    overflow: 'hidden',
    height: '100%'
});

$(document).ready(function() {
    var canScroll = true,
      scrollController = null;

  function handleScroll(e) {
    var delta = (e.wheelDelta) ? -e.wheelDelta : e.detail * 20;
    // if we scroll enough up or down
    if (delta > 50 && canScroll) {
        canScroll = false;
    console.log("up");
    // timeout to avoid jumping page
        setTimeout(() => {
            canScroll = true;
        }, 500);
        updateHelper(1);
    } else if (delta < -50 && canScroll) {
        canScroll = false;
        console.log("down");
        setTimeout(() => {
            canScroll = true;
        }, 500);
        updateHelper(-1);
    }
  }

  // sync taskbars
  function updateNavs(nextPos) {
    $('.side-nav, .outer-nav').children().removeClass('is-active');
    $('.side-nav').children().eq(nextPos).addClass('is-active');
    $('.outer-nav').children().eq(nextPos).addClass('is-active');
  }

  //update the view

  // Determine scroll, swipe, and arrow key direction
  function updateHelper(param) {
    var curActive = $('.side-nav').find('.is-active'),
        curPos = $('.side-nav').children().index(curActive),
        lastItem = $('.side-nav').children().length - 1,
        nextPos = 0;

    if (param.type === "swipeup" || param.keyCode === 40 || param > 0) {
      if (curPos !== lastItem) {
        nextPos = curPos + 1;
        updateNavs(nextPos);
        updateContent(curPos, nextPos, lastItem);
      } else {
        updateNavs(nextPos);
        updateContent(curPos, nextPos, lastItem);
      }
    } else if (param.type === "swipedown" || param.keyCode === 38 || param < 0) {
      if (curPos !== 0) {
        nextPos = curPos - 1;
        updateNavs(nextPos);
        updateContent(curPos, nextPos, lastItem);
      } else {
        nextPos = lastItem;
        updateNavs(nextPos);
        updateContent(curPos, nextPos, lastItem);
      }
    }
  }

  // Update main content area
  function updateContent(curPos, nextPos, lastItem) {
    $('.main-content').children().removeClass('section--is-active');
    $('.main-content').children().eq(nextPos).addClass('section--is-active');
    $('.main-content .section').children().removeClass('section--next section--prev');

    if (curPos === lastItem && nextPos === 0 || curPos === 0 && nextPos === lastItem) {
      $('.main-content .section').children().removeClass('section--next section--prev');
    } else if (curPos < nextPos) {
      $('.main-content').children().eq(curPos).children().addClass('section--next');
    } else {
      $('.main-content').children().eq(curPos).children().addClass('section--prev');
    }

    if (nextPos !== 0 && nextPos !== lastItem) {
      $('.header--cta').addClass('is-active');
    } else {
      $('.header--cta').removeClass('is-active');
    }
  }


    // Attach the event listeners with passive: false
    window.addEventListener('mousewheel', handleScroll, { passive: false });
    window.addEventListener('DOMMouseScroll', handleScroll, { passive: false });

  // for work ive done just cycle through and update based on position
  function workSlider() {
    const $slider = $('.slider');
    const $items = $slider.children();
    
    $('.slider--prev, .slider--next').click(function() {
      const $this = $(this);
      const totalWorks = $items.length;
  
      let curLeft = $slider.find('.slider--item-left').index();
      let curCenter = $slider.find('.slider--item-center').index();
      let curRight = $slider.find('.slider--item-right').index();
  
      // Hide slider during transition
      $slider.animate({ opacity: 0 }, 400);
  
      setTimeout(function() {
        // Determine direction and calculate new positions
        const direction = $this.hasClass('slider--next') ? 1 : -1;
        const newLeft = (curLeft + direction + totalWorks) % totalWorks;
        const newCenter = (curCenter + direction + totalWorks) % totalWorks;
        const newRight = (curRight + direction + totalWorks) % totalWorks;
  
        // Update classes
        $items.removeClass('slider--item-left slider--item-center slider--item-right');
        $items.eq(newLeft).addClass('slider--item-left');
        $items.eq(newCenter).addClass('slider--item-center');
        $items.eq(newRight).addClass('slider--item-right');
  
        // Show slider after transition
        $slider.animate({ opacity: 1 }, 400);
      }, 400);
    });
  }
  
    workSlider();
});


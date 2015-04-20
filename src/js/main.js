// Touch device checking

function is_touch_device() {
  return 'ontouchstart' in window || 'onmsgesturechange' in window;
};

if (is_touch_device() === true) {
  $(".video video").replaceWith( "<div class='poster'></div>" );
}

// Touch device checking

function is_touch_device() {
  return 'ontouchstart' in window || 'onmsgesturechange' in window;
};

if (is_touch_device() === true) {
  $(".video video").remove();
  $(".video").css({
    "height" : "300px",
    "width" : "auto",
    "background-color" : "#394555",
    "background-repeat" : "no-repeat",
    "background-position" : "center",
    "background-image" : "url('img/poster.png')",
    "background-size" : "cover"
  });
}

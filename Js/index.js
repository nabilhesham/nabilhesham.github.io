// Rotate Text
var TxtRotate = function (el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = "";
  this.tick();
  this.isDeleting = false;
};

TxtRotate.prototype.tick = function () {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">' + this.txt + "</span>";

  var that = this;
  var delta = 300 - Math.random() * 100;

  if (this.isDeleting) {
    delta /= 2;
  }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === "") {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function () {
    that.tick();
  }, delta);
};

// on Load Window
var offset = $("nav.navbar").offset();
var top = offset.top;
window.onload = function () {
  var elements = document.getElementsByClassName("txt-rotate");
  for (var i = 0; i < elements.length; i++) {
    var toRotate = elements[i].getAttribute("data-rotate");
    var period = elements[i].getAttribute("data-period");
    if (toRotate) {
      var rotate = new TxtRotate(elements[i], JSON.parse(toRotate), period);
      rotate.tick();
    }
  }

  //   Scrolling
  var topscroll = $(window).scrollTop();
  if (topscroll == 0) {
    $("nav.navbar").removeClass("sticky");
  } else {
    $("nav.navbar").addClass("sticky");
  }
};

// Scroll Window
$(window).scroll(function () {
  // Sticky NavBAr
  var offset = $("nav.navbar").offset();
  var top = offset.top;
  if (top == 0) {
    $("nav.navbar").removeClass("sticky");
  } else {
    $("nav.navbar").addClass("sticky");
  }
});

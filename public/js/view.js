let hide = () => {
  if ($(window).width() > 552) {
    $("a.navbar-brand").hide();
  } else {
    $("a.navbar-brand").show();
  }
};
$(document).ready(function () {
  $(".carousel").carousel();
  hide();
  $(".section").hide();
  $(".about").show();
  $(".nav-link").click(function () {
    $("a.navbar-brand").html($(this).html());
    $(".nav-item.active").removeClass("active");
    $(this).parent().addClass("active");
    let id = $(this).attr("id");
    $(".section").hide();
    $(`.${id}`).show();
    if ($("#navbarNav").hasClass("in"))
      $(".arrow").removeClass("fa-angle-up").addClass("fa-angle-down");
    else $(".arrow").removeClass("fa-angle-down").addClass("fa-angle-up");
    // $(".navbar-collapse").collapse("hide");
  });
  $(".navbar-toggler").click(function () {
    // $(".arrow").toggleClass("fa-angle-down fa-angle-up");
    if ($("#navbarNav").hasClass("in"))
      $(".arrow").removeClass("fa-angle-up").addClass("fa-angle-down");
    else $(".arrow").removeClass("fa-angle-down").addClass("fa-angle-up");
  });
  $(".navbar-nav li a").on("click", function () {
    $(".navbar-collapse").collapse("hide");
  });
});
$(window).resize(function () {
  hide();
});

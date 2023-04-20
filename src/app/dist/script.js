$(document).ready(function(){
$(".b").click(function(){
    $(this).toggleClass("b");
    $(this).toggleClass("b-selected");
 });
});

var elem = document.querySelector('.carousel');
var flkty = new Flickity( elem, {
  // options
  cellalign: 'right',
  pageDots: false,
  groupCells: '20%',
  selectedAttraction: 0.03,
  friction: 0.15
});
var flkty = new Flickity( '.carousel', {
  // options
});
import $ from 'jquery';
import smoothScroll from 'jquery-smooth-scroll';
import waypoints from '../../../../node_modules/waypoints/lib/noframework.waypoints';

class LazyScroll {
  constructor() {
    this.lazy = $(".lazyload");
    this.hlinks = $(".header__nav a");

    this.addSmoothScroll();
    this.refreshWaypoints();

    this.itemsToReveal = $(".lazyload");
    this.waypointOffset = "85%";
    this.hideInit();
    this.createWaypoints();
  }

  hideInit(){
    this.itemsToReveal.addClass("reveal-item");
  }

  createWaypoints() {
    var constr = this;
    constr.itemsToReveal.each(function(){
      var item = this;
      new Waypoint({
        element: item,
        handler: function () {
          $(item).addClass("reveal-item--is-visible");
        },
        offset: constr.waypointOffset
      });
    });
  }

  refreshWaypoints(){
    this.lazy.on('load',function(){
      Waypoint.refreshAll();
    });
  }

  addSmoothScroll(){
    this.hlinks.smoothScroll();
  }

}

export default LazyScroll;

var dimension = new Dimension();

function Dimension() {
    // this.initialScreenWidth = $(window).width();
    //this.initialScreenHeight = $(window).height();
    this.screenWidth = $(window).width();
    this.screenHeight = $(window).height();
    this.screenWidthLandscape = this.screenHeight+20;
    this.screenHeightLandscape = this.screenWidth-20;
    this.isStartPortrait = ((this.screenHeight > this.screenWidth) ? true : false);

//    alert("this.screenWidth:" + this.screenWidth + " this.screenHeight:" + this.screenHeight + "  this.screenWidthLandscape:" + this.screenWidthLandscape +
// " this.screenHeightLandscape:" + this.screenHeightLandscape + " this.isStartPortrait:" + this.isStartPortrait);
}
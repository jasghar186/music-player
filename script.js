$("document").ready(function () {
    // loading animation 
    setTimeout(() => {
        $(".loading_container").css("display", "none")
    }, 2000)

    // loading animation ended

    // declare variables
    var audioelem = $(".audioelement");
    var audioimage = $("#songimg");
    var songtitle = $("#songtitle");
    var singername = $("#singername");
    var currentSlideNumber = $("#current_slide");
    var playBtn = $("#playsong");
    var pauseBtn = $("#pausesong");
    var prevBtn = $("#prevsong");
    var nextBtn = $("#nextsong");
    var volumeDesktop = $("#songvolumedesktop");
    var mutebtn = $("#mute");
    var volumeupbtn = $("#volumeup");
    var durationdesktop = $("#songdurationdesktop") ;
    var durationmobile = $("#durationmobile") ;
    var mobielmute = $("#mobilemute") ;
    var mobilevolumeup = $("#mobilevolumeup") ;
    var mobileslider = $("#mobilevolumeslider")
    var counter = 0;



    // next btn function
    $(nextBtn).click(function () {
        $.ajax({
            url: "musiclist.json",
            type: "GET",
            success: function (data) {
                counter++
                (counter > 4) ? counter = 0 : counter;
                // set audio attribute
                $(audioelem).attr("src", data[counter].songsrc);
                // get current slide number
                $(currentSlideNumber).html(data[counter].index);

                // get current audio image
                $(audioimage).attr("src", data[counter].imgsrc)
                $(songtitle).html(data[counter].title)
                $(singername).html(data[counter].singerName)
                playsong()
            }

        })
    })

    // prev btn function
    $(prevBtn).click(function () {
        $.ajax({
            url: "musiclist.json",
            type: "GET",
            success: function (data) {
                counter--
                (counter < 0) ? counter = 4 : counter;
                $(audioelem).attr("src", data[counter].songsrc);
                $(currentSlideNumber).html(data[counter].index)
                // get current audio image
                $(audioimage).attr("src", data[counter].imgsrc)
                $(songtitle).html(data[counter].title)
                $(singername).html(data[counter].singerName)
                playsong()
            }
        })
    })

    // events
    $(playBtn).click(playsong)

    function playsong() {
        $(audioelem).trigger("play");
        $(playBtn).css("display", "none");
        $(pauseBtn).css("display", "block")
        $(this).addClass("main")
    }


    $(pauseBtn).click(function () {
        $(audioelem).trigger("pause");
        $(this).css("display", "none");
        $(playBtn).css("display", "block")
    })

    // volume buttons desktop event function

    function setvolume(){
        console.log($(audioelem)[0].volume);
        $(audioelem)[0].volume = parseFloat($(this).val() / 100)
        playsong()
    }

   
      function volumeup(){
        $(audioelem)[0].volume = 1;
         $(volumeDesktop).val(100)
        $(mobileslider).val(100)
        $(this).toggleClass("main")
        playsong()
      }
      function mute(){
        $(audioelem)[0].volume = 0;
        $(volumeDesktop).val(0)
        $(mobileslider).val(0)
        $(this).toggleClass("main")
        playsong()
      }
    function setduration(){
        $(audioelem)[0].currentTime = Math.floor($(audioelem)[0].duration * parseFloat($(this).val() / 100))
        playsong()
    }
     // mute button function
     $(mutebtn).click(mute)

     $(volumeupbtn).click(volumeup)
         $(durationdesktop).change(setduration)
  $(durationmobile).change(setduration)
   $(mobileslider).change(setvolume)
   $(volumeDesktop).change(setvolume)
    $(mobielmute).click(mute)
    $(mobilevolumeup).click(volumeup)
})
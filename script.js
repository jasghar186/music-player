$("document").ready(function () {
   

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
    var durationdesktop = $("#songdurationdesktop");
    var durationmobile = $("#durationmobile");
    var mobielmute = $("#mobilemute");
    var mobilevolumeup = $("#mobilevolumeup");
    var mobileslider = $("#mobilevolumeslider")
    var counter = 0;


    
 // loading animation 
 setTimeout(() => {
    $("#loader_container").css("display", "none") ;
    // some default functions
    setvolume()
    
}, 2000)



    // events
    $(playBtn).click(playsong)
    $(pauseBtn).click(pausesong)
    $(mutebtn).click(mute)
    $(volumeupbtn).click(volumeup)
    $(durationdesktop).change(setduration)
    $(durationmobile).change(setduration)
    $(mobileslider).change(setvolume)
    $(volumeDesktop).change(setvolume)
    $(mobielmute).click(mute)
    $(mobilevolumeup).click(volumeup)


    // functions started

    function playsong() {
        $(audioelem).trigger("play");
        $(playBtn).css("display", "none");
        $(pauseBtn).css("display", "block")
        $(this).addClass("main")
    }


    function pausesong() {
        $(audioelem).trigger("pause");
        $(this).css("display", "none");
        $(playBtn).css("display", "block")
    }


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
                setvolume()
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
                setvolume()
            }
        })
    })



    // volume buttons desktop event function

    function setvolume() {
        $(audioelem)[0].volume = $(mobileslider).val() / 100 * 1
        $(audioelem)[0].volume = $(volumeDesktop).val() / 100 * 1
        
    

    }


    function volumeup() {
        $(audioelem)[0].volume = 1;
        $(volumeDesktop).val(100)
        $(mobileslider).val(100)
        $(this).toggleClass("main")
        $(mobielmute).removeClass("main");
        $(mutebtn).removeClass("main")
        playsong()
    }
    function mute() {
        $(audioelem)[0].volume = 0;
        $(volumeDesktop).val(0)
        $(mobileslider).val(0)
        $(this).toggleClass("main")
        $(volumeupbtn).removeClass("main");
        $(mobilevolumeup).removeClass("main")
        playsong()
    }
    function setduration() {

        $(audioelem)[0].currentTime = Math.floor($(audioelem)[0].duration / 100 * $(this).val());
        playsong()
    }

    function autoupdate() {
        $(durationmobile).val(100 / $(audioelem)[0].duration * $(audioelem)[0].currentTime)
        $(durationdesktop).val(100 / $(audioelem)[0].duration * $(audioelem)[0].currentTime)
    }
    setInterval(autoupdate, 1000);


})

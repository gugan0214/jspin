
    $('.box').fullpage({
        verticalCentered:true,
        slidesColor:["yellow","green","pink"],
        sectionsColor:["red","white","#2D2D2D","green"],
        anchors: ['page1', 'page2', 'page3', 'page4', 'page5'],
        menu: '#menu',
        afterLoad:function (onchor,index) {
            if(index===2){
                $(".jieshao1").addClass("leftIn")
                $(".jieshao2").addClass("rightIn")
                $(".ziwo").addClass("topIn")
                $(".sence").addClass("bottomIn")
            }
            if(index===3){
                $('#progressbar1').LineProgressbar({
                    percentage: 50,height: '3px',radius: '3px'
                });
                $('#progressbar2').LineProgressbar({
                    percentage: 25,
                    fillBackgroundColor: '#1abc9c'
                });
                $('#progressbar3').LineProgressbar({
                    percentage: 91,
                    fillBackgroundColor: '#e67e22',
                    height: '35px'
                });
                $('#progressbar4').LineProgressbar({
                    percentage: 98,
                    fillBackgroundColor: '#f1c40f',
                    height: '65px',
                    radius: '50px'
                });
            }
            if(index===4){
                $("#hexGrid ").css({
                    opacity:1
                })
            }

        },
        onLeave:function (index) {
            setTimeout(function () {
                if(index===2){
                    $(".jieshao1").removeClass("leftIn")
                    $(".jieshao2").removeClass("rightIn")
                    $(".ziwo").removeClass("topIn")
                    $(".sence").removeClass("bottomIn")
                }
                if(index===4){
                    $("#hexGrid ").css({
                        opacity:0
                    })
                }
            })
        }
    });





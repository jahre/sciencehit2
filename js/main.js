function initMap() {
  var dest = {lat: 53.927764, lng: 27.680846};
  var map = new google.maps.Map(document.getElementById('map'), {
    center: dest,
    zoom: 15,
    scrollwheel:false,
    draggable:false,
    disableDefaultUI:true
  });

  var marker = new google.maps.Marker({
    position: dest,
    map: map,
    title: 'vulica Akademika Kuprevicha 1/5'
  });
};

//===================================================jQuery Scripts==================================================
$(document).ready(function() {
 
  $('a[href^="#"]').click(function(){
          var el = $(this).attr('href');
          $('body').animate({
              scrollTop: $(el).offset().top}, 500);
          return false; 
  });
  

 /* var state = 1;
  $('#nav').on('click', function(){
    if(state){
      $(this).height(200);
      state = 0;
    }else{
      $(this).height(20);
      state = 1;
    }
  });*/
  
    
});

  function canvasTurnOff(){
    $('#canvasbg').css('display', 'none');
    $('.project-description').addClass('pd-mobile');
  };

  var nav = document.getElementById('nav');
  nav.addEventListener('click', menuOpen, false);

  var state = 1;
  function menuOpen() { 

    if(window.innerWidth < 550){
      if(state){
        nav.style.height = "200px";
        $('.sp_nav#nav').height(350);
        state = 0;
      }else{
        nav.style.height = "20px";
        state = 1;
      }  
    }
    return false;
  };

//===================================================Canvas Background==================================================
var canvasDots = function() {
    var canvas = document.getElementById('canvasbg'),
        ctx = canvas.getContext('2d'),
        colorDot = '#333',
        color = '#ff0000';

    var grd = ctx.createLinearGradient(0.000, canvas.height, canvas.width, canvas.height);
    // Add colors
    grd.addColorStop(0.000, 'rgba(33, 150, 243, 1.000)');
    grd.addColorStop(0.328, 'rgba(250, 69, 86, 1.000)');
    grd.addColorStop(0.630, 'rgba(33, 150, 243, 1.000)');
    grd.addColorStop(1.000, 'rgba(250, 69, 86, 1.000)');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.display = 'block';
    ctx.fillStyle = colorDot;
    ctx.lineWidth = .1;
    ctx.strokeStyle = grd;

    var mousePosition = [
      {
        x: 30 * canvas.width / 100,
        y: 30 * canvas.height / 100
      },
      {
        x: 80 * canvas.width / 100,
        y: 60 * canvas.height / 100
      },
      {
        x: 100 * canvas.width / 100,
        y: 100 * canvas.height / 100
      },
      {
        x: 15 * canvas.width / 100,
        y: 15 * canvas.height / 100
      },
      {
        x: 25 * canvas.width / 100,
        y: 90 * canvas.height / 100
      },
      {
        x: 50 * canvas.width / 100,
        y: 20 * canvas.height / 100
      },
            {
        x: window.innerWidth / 2,
        y: canvas.height / 2
      },
      {
        x: window.innerWidth / 1.1,
        y: canvas.height / 1.1
      },
      {
        x: window.innerWidth / 1.1,
        y: canvas.height / 10,
      },
      {
        x: 50 * canvas.width / 100,
        y: 20 * canvas.height / 100
      }
    ];

    var dots = {
        nb: 600,
        distance: 60,
        d_radius: 100,
        array: []
    };

    function Dot(){
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;

        this.vx = -.5 + Math.random();
        this.vy = -.5 + Math.random();

        this.radius = Math.random();
    }

    Dot.prototype = {
        create: function(){
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            ctx.fill();
        },

        animate: function(){
            for(i = 0; i < dots.nb; i++){

                var dot = dots.array[i];

                if(dot.y < 0 || dot.y > canvas.height){
                    dot.vx = dot.vx;
                    dot.vy = - dot.vy;
                }
                else if(dot.x < 0 || dot.x > canvas.width){
                    dot.vx = - dot.vx;
                    dot.vy = dot.vy;
                }
                dot.x += dot.vx;
                dot.y += dot.vy;
            }
        },

        line: function(){
            for(i = 0; i < dots.nb; i++){
                for(j = 0; j < dots.nb; j++){
                    i_dot = dots.array[i];
                    j_dot = dots.array[j];

                    if((i_dot.x - j_dot.x) < dots.distance && (i_dot.y - j_dot.y) < dots.distance && (i_dot.x - j_dot.x) > - dots.distance && (i_dot.y - j_dot.y) > - dots.distance){
                        for(var z = 0; z < mousePosition.length; z++){
                              if((i_dot.x - mousePosition[z].x) < dots.d_radius && (i_dot.y - mousePosition[z].y) < dots.d_radius && (i_dot.x - mousePosition[z].x) > - dots.d_radius && (i_dot.y - mousePosition[z].y) > - dots.d_radius){
                                  ctx.beginPath();
                                  ctx.moveTo(i_dot.x, i_dot.y);
                                  ctx.lineTo(j_dot.x, j_dot.y);
                                  ctx.stroke();
                                  ctx.closePath();
                              };
                        }
                    }
                }
            }
        }
    };

    function createDots(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for(i = 0; i < dots.nb; i++){
            dots.array.push(new Dot());
            dot = dots.array[i];
            dot.create();
        }

        dot.line();
        dot.animate();
    }

    window.onmousemove = function(parameter) {
        mousePosition[mousePosition.length - 1].x = parameter.pageX;
        mousePosition[mousePosition.length - 1].y = parameter.pageY - document.body.scrollTop;
    }


    setInterval(createDots, 1000/30);
};

/*window.onload = function() {
    canvasDots();
};*/

//make api url
var base_url = "https://www.googleapis.com/calendar/v3/calendars/mesmbjmsjogtjso0nrb0h1hb5c@group.calendar.google.com/events?";
var api_key = "key=";
var currentDay = new Date();
var api_options = "&" + "orderby=starttime" + "&" + "sortorder=ascending" + "&" + "timeMin=" + currentDay.toISOString();
lot_url = base_url + api_key + api_options;
var lot_events;
var data;
var countDownDate;


// API CALL
var lot_request = new XMLHttpRequest();
lot_request.open('GET', lot_url);
lot_request.setRequestHeader('Content-Type', 'application/json');
lot_request.onload = function() {
  if (lot_request.status >= 200 && lot_request.status < 400) {
    //console.log("Success!");
    data = JSON.parse(lot_request.responseText);
    lot_events = data.items;
    countdownTimer();
  } else {
    //console.log("We reached our target server, but it returned an error.");
    console.log(lot_request.status);
  }
};

lot_request.onerror = function() {
   // There was a connection error of some sort
   console.log("ERROR!!!");
};
lot_request.send();



function isToday(){
  document.getElementById("loader").remove();

  var questiondiv = document.createElement("DIV");
  questiondiv.id = "question";
  questiondiv.appendChild(document.createTextNode("IS LOT 49 TODAY?"));
  document.body.appendChild(questiondiv);

  document.getElementById("answer").innerHTML = "YES";
  document.body.classList.add('blue');
}

function isNotToday(){
  var questiondiv = document.createElement("DIV");
  questiondiv.id = "question";
  questiondiv.appendChild(document.createTextNode("IS LOT 49 TODAY?"));
  document.body.appendChild(questiondiv);

  document.getElementById("loader").remove();
  document.getElementById("answer").innerHTML = "NO";
  document.body.classList.add('red');
}

function countdownTimer(){

  var next_lot49 = lot_events[0];
  if(next_lot49 == null){
    isNotToday();
  }else{
    var t = next_lot49.start.dateTime;
    var google_date = t.split("T");
    var event_date = google_date[0].split("-");
    var event_time = google_date[1].split("-");
    var t = event_time[0].split(":");

    //make date object for next event
    var next_day = event_date[2];
    var next_month = event_date[1];
    var next_year = event_date[0];
    var next_hour = t[0];
    var next_min = t[1];
    var next_sec = t[2];
    countDownDate = new Date(next_year, (next_month-1), next_day , next_hour, next_min, next_sec)
    var todaysDate = new Date();

    console.log(countDownDate.getHours());
    console.log(todaysDate.getHours());
    var now = new Date();
    var ev = new Date(countDownDate);

    if(ev.setHours(0,0,0,0) == now.setHours(0,0,0,0)) {
      isToday();
      //if( todaysDate.getHours() > countDownDate.getHours() ){
      if(countDownDate <= todaysDate){
        //Start Has Passed!!
        console.log("Start Has Passed!!");
        var timerDiv = document.createElement("DIV");
        timerDiv.id = "timer";
        document.body.appendChild(timerDiv);
        document.getElementById("timer").innerHTML = "Lot 49 is happening"
      }else{
        console.log("Start is still to come!!");
        setTimer();
      }
    }else if(countDownDate <= todaysDate){
      console.log("IN THE PAST!!");
      isNotToday();
    }else{
      // Date is not today
      console.log("is not today!!");
      isNotToday();
      setTimer();
    }
  }
}



function setTimer(){
  var timerDiv = document.createElement("DIV");
  timerDiv.id = "timer";
  document.body.appendChild(timerDiv);

  setInterval(function() {
    updateTimer(getTimeRemaining(countDownDate));
  }, 1000);
}


function getTimeRemaining(endtime){
  var now = new Date().getTime();
  // Find the distance between now an the count down date
  var distance = endtime - now;
  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);
  return {
    'days': days,
    'hours': hours,
    'minutes': minutes,
    'seconds': seconds
  };
}

function updateTimer(time){



  var timerStg = "NEXT LOT 49 IS IN " + (time.days == 0 ? "" : time.days + " DAYS, ") + (time.hours == 0 ? "" : time.hours + " HOURS, ") + (time.minutes == 0 ? "" :  time.minutes + " MINUTES, ") + (time.seconds == 0 ? "" :  time.seconds + " SECONDS.")
  document.getElementById("timer").innerHTML = timerStg;
}

$(document).ready(function () {
    var dateString = moment().format("ddd, hA");
    $("#currentDay").html(dateString);

    var registeredHours = [];
  
    for (var hour = 9; hour < 22; hour++) {
      registeredHours.push(
        moment({
          hour
        }).format("h  a")
      );
      $(".container").append(`<div class="row timeBlock" data-time="${hour}"> 
           <!--hour column-->
               <div class="col-sm col-md-2 hour"> 
                 <p class=dayHour>${moment({ hour }).format("h  a")}</p>
               </div> 
               
           <!--user input text area-->
               <div class="col-sm col-md-8 d-flex description"> 
                 <textarea class=textArea></textarea> 
               </div> 
          
           <!--bootstrap saveBtn-->
               <div class="col-sm col-md-2 saveBtn">
               <i class="far fa-save fa-2x" id=icon></i>  
               </div>`);
    }

    var m = moment();
    $.each($(".timeBlock"), function (index, value) {
      let timeHour = $(value).attr("data-time");
      if (Number(timeHour) === m.hour()) {
        $(this).find("textarea").addClass("present");
      } else if (Number(timeHour) < m.hour()) {
        $(this).find("textarea").addClass("past");
      } else {
        $(this).find("textarea").addClass("future");
      }
    });
    
    let timeObj = {};
    if (localStorage.getItem("timeObj")) {
      timeObj = JSON.parse(localStorage.getItem("timeObj"));
    } else {
      timeObj = {
        "9": { time: "9", value: "" },
        "10": { time: "10", value: "" },
        "11": { time: "11", value: "" },
        "12": { time: "12", value: "" },
        "1": { time: "1", value: "" },
        "2": { time: "2", value: "" },
        "3": { time: "3", value: "" },
        "4": { time: "4", value: "" },
        "5": { time: "5", value: "" },
        "6": { time: "6", value: "" },
        "7": { time: "7", value: "" },
        "8": { time: "8", value: "" },
        "9": { time: "9", value: "" },
      };
    }
    $(".timeBlock").each(function () {
      $(this).find(".textArea").val(timeObj[$(this).attr("data-time")].value);
    });
  
    $(".saveBtn").on("click", function (event) {
      var timeValue = $(this).closest(".timeBlock").attr("data-time");
      var textValue = $(this).closest(".timeBlock").find(".textArea").val();
      timeObj[timeValue].value = textValue;
      localStorage.setItem("timeObj", JSON.stringify(timeObj));
    });
  });
  
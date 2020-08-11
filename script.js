var currentDay = moment().format("LLL");
var dayStart = moment("7:00", "h:ss");
var events = JSON.parse(localStorage.getItem("events"));

// what time/date is it?
var setDate = function () {
    $("#currentDay").text(currentDay);
}
// Add the time blocks.  Set dayStart value 1 hour prior to planner start time.
var setTimeBlocks = function () {
    $(".container").find(".hour").each(function () {
        dayStart.add(1, "hour");
        $(this).text(dayStart.format("LT"));
    })
}

// Handle that input
$(".text").click(function () {
    var text = $(this).text().trim();
    var eventInput = $("<textarea>").addClass("text col-sm-10").val(text);
    $(this).replaceWith(eventInput);
    eventInput.trigger("focus");
    hourBox();
});

//Azi! Light! (html inputs)
var hourBox = function () {
    $(".container").find(".hour").each(function () {
        var time = moment($(this).text(), "LT");
        var timeBlockState = Math.ceil(time.diff(moment(), "hours", true));
        console.log(timeBlockState);
        var textEl = $(this).next();
        if (timeBlockState < 0) {
            textEl.addClass("past")
        } else if (timeBlockState === 0) {
            textEl.addClass("present")
        } else if (timeBlockState > 0) {
            textEl.addClass("future")
        }
    })
}

// i need to save!
var setButtonIcon = function () {
    $(".container").find("button").each(function () {
        var iEl = $("<i>")
            .addClass("fas fa-save")
        $(this).append(iEl);
    })
}

// Let's load some events into a slot
var loadEvents = function () {
    if (events) {
        events.forEach(evnt => {
            console.log();
            var hour = $(`.hour:contains(${evnt.time.trim()})`);
            hour.siblings(".text").text(evnt.text);
        });
    }
}

// save data to local storage when clicking the clicker
$(".saveBtn").click(function (e) {
    e.preventDefault();
    var eventText = $(this).siblings(".text").val();
    var eventTime = $(this).siblings(".hour").text();
    if (!events) {
        events = [];
    }
    events.push({
        text: eventText,
        time: eventTime
    });
    localStorage.setItem("events", JSON.stringify(events));
});

setDate();
setTimeBlocks();
hourBox();
setButtonIcon();
loadEvents()
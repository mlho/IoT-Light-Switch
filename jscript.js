function clearNotif() {
    $("#saved-note").css("display", "none");
    $("#invalid-note").css("display", "none");
    $("#error-note").css("display", "none");
}

function validateTimeForm() {
    if (($("#h1").val() < 13 && $("#h1").val() > 0) && ($("#h2").val() < 13 && $("#h2").val() > 0)) {} else {
        clearNotif();
        $("#invalid-note").css("display", "inline-block");
        return false;
    }
    if (($("#m1").val() < 60 && $("#m1").val() > -1) && ($("#m2").val() < 60 && $("#m2").val() > -1)) {} else {
        clearNotif();
        $("#invalid-note").css("display", "inline-block");
        return false;
    }
    return true;
}

$(document).ready(function () {
    var isUp = 1;
    var disable = 0;

    $("#menu-button").click(function () {
        if (isUp) {
            $("#menu-container").slideDown();
            $("#menu-button").html("CANCEL");
            $("#save-button").css("display", "inline-block");
            isUp = 0;
            disable = 1;
        } else {
            clearNotif();
            $("#menu-container").slideUp();
            $("#menu-button").html("MENU");
            $("#save-button").css("display", "none");
            isUp = 1;
            disable = 0;
        }
    });

    $("#save-button").click(function () {

        if (validateTimeForm()) {

            var startHour = parseInt($("#h1").val());
            var endHour = parseInt($("#h2").val());
            var startMin = parseInt($("#m1").val());
            var endMin = parseInt($("#m2").val());

            if ($('input[name=startAMPM]:checked', '#timeForm').val() === 'pm' && startHour != 12) {
                startHour = parseInt($("#h1").val()) + 12;
            } else if ($('input[name=startAMPM]:checked', '#timeForm').val() === 'am' && startHour === 12) {
                startHour = "00";
            } else if ($('input[name=startAMPM]:checked', '#timeForm').val() === 'am' && startHour < 10) {
                startHour = "0" + $("#h1").val();
            }

            if ($('input[name=endAMPM]:checked', '#timeForm').val() === 'pm' && endHour != 12) {
                endHour = parseInt($("#h2").val()) + 12;
            } else if ($('input[name=endAMPM]:checked', '#timeForm').val() === 'am' && endHour === 12) {
                endHour = "00";
            } else if ($('input[name=endAMPM]:checked', '#timeForm').val() === 'am' && endHour < 10) {
                endHour = "0" + $("#h2").val();
            }

            if (startMin < 10 && ($("#m1").val().toString()).length < 2)
                startMin = "0" + $("#m1").val();
            else
                startMin = $("#m1").val();

            if (endMin < 10 && $("#m2").val().length < 2)
                endMin = "0" + $("#m2").val();
            else
                endMin = $("#m2").val();

            console.log(startHour + " : " + startMin);
            console.log(endHour + " : " + endMin);

            $.ajax({
                url: 'crono.php',
                type: 'POST',
                data: {
                    startHour: startHour,
                    startMin: startMin,

                    endHour: endHour,
                    endMin: endMin,
                },
                success: function () {
                    clearNotif();
                    $("#saved-note").css("display", "inline-block");
                },
                error: function () {
                    clearNotif();
                    $("#error-note").css("display", "inline-block");
                }
            });
        }
    });

    $("#on-container").click(function () {
        if (disable === 0) {
            $("#on-container").css("background", "#02D472");
            $("#on-container").css("color", "#2B2B2B");

            $("#off-container").css("background", "#2B2B2B");
            $("#off-container").css("color", "#FF4545");

            var a = new XMLHttpRequest();
            a.open("GET", "pinon.php");
            a.onreadystatechange = function () {
                if (a.readyState == 4) {
                    if (a.status != 200) {
                        alert("HTTP ERROR")
                    }
                }
            }
            a.send();
        }
    });
    $("#off-container").click(function () {
        if (disable === 0) {
            $("#on-container").css("background", "#2B2B2B");
            $("#on-container").css("color", "#02D472");

            $("#off-container").css("background", "#FF4545");
            $("#off-container").css("color", "#2B2B2B");

            var a = new XMLHttpRequest();
            a.open("GET", "pinoff.php");
            a.onreadystatechange = function () {
                if (a.readyState == 4) {
                    if (a.status != 200) {
                        alert("HTTP ERROR")
                    }
                }
            }
            a.send();
        }
    });

    var clickd;
    $(".time-box").on("click", function (e) {
        clickd = "#" + e.target.id;
    });

    $("#up-button").click(function () {
        if ($(clickd).val() == "")
            $(clickd).val(0);
        var numval = parseInt($(clickd).val());
        if (clickd === "#h1" || clickd === "#h2") {
            if (numval === 12) {
                numval = 1;
            } else {
                numval += 1;
            }
        } else if (clickd === "#m1" || clickd === "#m2") {
            if (numval === 59) {
                numval = 0;
            } else {
                numval += 1;
            }

            if (numval < 10) {
                numval = "0" + numval.toString();
            }
        }

        $(clickd).val(numval);
    });
    $("#down-button").click(function () {
        if ($(clickd).val() == "")
            $(clickd).val(0);
        var numval = parseInt($(clickd).val());
        if (clickd === "#h1" || clickd === "#h2") {
            if (numval === 1) {
                numval = 12;
            } else {
                numval -= 1;
            }
        } else if (clickd === "#m1" || clickd === "#m2") {
            if (numval === 0) {
                numval = 59;
            } else {
                numval -= 1;
            }

            if (numval < 10) {
                numval = "0" + numval.toString();
            }
        }

        $(clickd).val(numval);
    });
});


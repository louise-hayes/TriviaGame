    var questions = [

        {
            "questionText": "What year did the band U2 form?",
            "answers": ["1979", "1980", "1976"],
            "correctAns": "1976"
        }, {
            "questionText": "What was U2's debut Album",
            "answers": ["War", "Boy", "The Joshua Tree"],
            "correctAns": "Boy"
        },
        {
            "questionText": "What is Bono's real name",
            "answers": ["Paul Hewson", "Paul Jewson", "Jaul Pewson"],
            "correctAns": "Paul Hewson"
        }

    ];

    var activeQuestion;
    var index = -1;
    var intervalId;
    var timer;
    var wins = 0;
    var losses = 0;
    var gameCounter = 0;
    var clicked = 0;
    var unAnsweredCount = 0;



    function showQuestion() {
        $("#headerDiv").html("<h1>Totally Trivial Trivia!</h1>");
        $("#questionDiv").html("");
        $("#answerDiv").html("");
        $("timerDiv").html("");
        $("resetDiv").html("");

        timer = 10;
        stop();
        intervalId = setInterval(decrement, 1000);
        var timerDiv = $("#timerDiv").html("Time Remaining: " + timer);
        questions[index].answers.forEach(function (answer) {
            //initially this worked to show the answers as links
            // var hrefstring = '<a href="#" class="answerlink">' + answer + '</a>';
            // $("#answerDiv").append(hrefstring);
            $("#questionDiv").html(questions[index].questionText);
            var link = $("<a>");
            link.attr("href", "#");
            link.text(answer);
            link.addClass("answerlink");
            link.click(function () {

                checkAns(answer, index);
            });
            $("#answerDiv").append(link);


            // end of for each
        });
        if (clicked === 0) {
            unAnsweredCount++;
        };
    };


    function showImg() {
        $(showImgDiv).html('<img id="theImg" src="assets/images/img1.jpg" alt="the image" />');

        $("#showImgDiv").show();
        setTimeout(function () {
            console.log('in timeout');
            $("#showImgDiv").hide();
            init();
        }, 2000);
    };

    function decrement() {
        timer--;
        $("#timerDiv").html("Time Remaining: " + timer);
        console.log("in decrement");
        if (timer <= 0) {
            console.log("time is up ");
            stop();
            $("#questionDiv").text("");
            $("#answerDiv").html("Times up! The Answer is: " + questions[index].correctAns);
            showImg();
        }
    };


    function stop() {
        clearInterval(intervalId);
        $("#timerDiv").text("");
    };

    function checkAns(answerChosen, idx) {
        //console.log(event.target.innerHTML);
        //var answerChosen = event.target.innerHTML;
        clicked = 1;
        console.log(answerChosen);
        $("#questionDiv").text("");
        stop();
        if (answerChosen === questions[idx].correctAns) {
            wins++;
            console.log("you win");
            $("#answerDiv").html("You are correct! The Answer is: " + questions[idx].correctAns);
            // $("#winLooseMsgDiv").text("You are correct! The Answer is: " + questions[index].correctAns);
            showImg();

        } else if (clicked) { //and it is the wrong answer
            console.log("clicked but wrong answer");
            // if (answerChosen <= questions[index].correctAns) {
            losses++;
            $("#answerDiv").html("Sorry - You are incorrect! The Answer is: " + questions[idx].correctAns);
            showImg();
        }

    };

    function reset() {

        console.log("starting over");

        $("#resetDiv").empty();
        index = -1;
        wins = 0;
        losses = 0;
        unAnsweredCount = 0;
        init();


    };

    function init() {

        if (index === questions.length - 1) {

            $("#questionDiv").html("All Done! Here's How you Did:");
            $("#timerDiv").html("");

            $("#answerDiv").html("Wins: " + wins);
            $("#answerDiv").append(" Losses: " + losses);
            $("#answerDiv").append(" Unanswered: " + unAnsweredCount);


            $("#resetDiv").html("Start Over?");

            $("#resetDiv").on('click', reset);



        } else {
            index++;

            showQuestion();

        }
        console.log("in init");




        // checkAns(answers.question1, "1976", answers.correctAns1);

    };





    $(document).ready(function () {

        init();


    });
var Lottery = {
    LotteryId: 1,
    SecondsLeft: null,
    QiHao: null,
    Timer: null,
    Host: 'http://api.myola.com/',


    order: function () {
        console.log("Lottery Order");
    },
    initTimer: function () {
        clearInterval(Lottery.Timer);
        $.ajax({
            url: Lottery.Host + 'Lottery/GetLotteryBetTimeInfo',
            data: { lotteryId: Lottery.LotteryId },
            dataType: 'json',
            type: 'GET',
            success: function (data) {
                Lottery.QiHao = data.QiHao;
                Lottery.SecondsLeft = data.SecondsLeft;
                Lottery.Timer = setInterval(Lottery.runTimer, 1000);
            },
            error: function (data) {
                console.log(data);
            },
        });
    },
    runTimer: function () {

        $("#currentPeriod").html(Lottery.QiHao);
        var minutes = parseInt(Lottery.SecondsLeft / 60);
        var seconds = parseInt(Lottery.SecondsLeft % 60);
        var betTimer = "本期投注剩余时间："
            + "<em>" + (minutes > 9 ? parseInt(minutes / 10) : 0) + "</em>"
            + "<em>" + parseInt(minutes % 10) + "</em>分"
            + "<em>" + (seconds > 9 ? parseInt(seconds / 10) : 0) + "</em>"
            + "<em>" + parseInt(seconds % 10) + "</em>秒</p>";
        $(".betTimer").html(betTimer);
        Lottery.SecondsLeft -= 1;
        if (Lottery.SecondsLeft < 0) {

            Lottery.initTimer();
        }
    },
};
// +----------------------------------------------------------------------
// | Joinusad  
// +----------------------------------------------------------------------
// | Copyright (c) 2015-2016 http://www.joinusad.com/ All rights reserved.
// +----------------------------------------------------------------------
// | Author: xiaobudian <849351660@qq.com>
// +----------------------------------------------------------------------
// | CreateTime: 2016.12.10 14:56
// +----------------------------------------------------------------------

$(function () {
    $('#register').on('click', function () {
        $('#register').attr('disabled', 'disabled');
        if (common.isNullIpt('input[name="mobile"]', '请输入手机号')) {
            $('#register').removeAttr('disabled');
            return;
        } else {
            if (!common.validMobile($('input[name="mobile"]').val())) {
                $('#register').removeAttr('disabled');
                common.showErrors('手机号格式不正确', undefined);
                return;
            }
        }
        if (common.isNullIpt('input[name="vcode"]', '请填验证码')) {
            $('#register').removeAttr('disabled');
            return;
        }
        //var name = $('input[name="name"]').val();
        var mobile = $('input[name="mobile"]').val();
        var vcode = $('input[name="vcode"]').val();
        var authCode = $('#authCode').val();
        var openId = $('#openId').val();
        $.ajax({
            url: '/Login/Register',
            type: 'POST',
            dataType: 'json',
            data: {
                //name: name,
                'Mobile': mobile,
                'Vcode': vcode,
                'AuthCode': authCode,
                'OpenId': openId,
            },
            success: function (data) {
                $('#register').removeAttr('disabled');
                if (data == "success") {
                    common.showTips('注册成功', '/L/Index');
                } else {
                    common.showErrors(data, undefined);
                }
            },
            error: function (data) {
                $('#register').removeAttr('disabled');
                console.log(data);
            },
        });
    });
    timer = null;

    seconds = 60;
    $('#vcode').on('click', function () {
        $('#vcode').attr('disabled', "disabled");
        //seconds = 5;
        if (common.isNullIpt('input[name="mobile"]', '请输入手机号')) {
            $('#vcode').removeAttr('disabled');
            return;
        } else {
            if (!common.validMobile($('input[name="mobile"]').val())) {
                $('#vcode').removeAttr('disabled');
                common.showErrors("手机号格式不正确", undefined);
                return;
            }
        }


        var mobile = $('input[name="mobile"]').val();

        $.ajax({
            url: '/Login/SendVCode',
            type: 'POST',
            dataType: 'json',
            data: {
                mobile: mobile,
            },
            success: function (data) {

                if (data == "success") {
                    timer = setInterval(function () {
                        seconds--;
                        if (seconds == 0) {
                            $('#vcode').removeAttr('disabled');
                            clearInterval(timer);
                            $('#vcode').html("获取验证码");
                            return;
                        }
                        $('#vcode').html("重新发送(" + seconds + ")");
                    }, 1000);
                    common.showTips('已发送', undefined);
                } else {
                    $('#vcode').removeAttr('disabled');
                    common.showErrors(data, undefined);
                }
            },
            error: function () {
                $('#vcode').removeAttr('disabled');
            },
        })
    });
});



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
    $('#showTooltips').click(function (event) {
        if (common.isNullIpt('input[name="name"]', '请填写姓名')) {
            return;
        }
        if (common.isNullIpt('input[name="mobile"]', '请输入手机号')) {
            return;
        } else {
            if (!common.validMobile($('input[name="mobile"]').val())) {
                alert('手机号格式不正确');
                return;
            }
        }
        if (common.isNullIpt('input[name="code"]', '请填验证码')) {
            return;
        }
        var name = $('input[name="name"]').val();
        var mobile = $('input[name="mobile"]').val();
        var code = $('input[name="code"]').val();
        $.ajax({
            url: 'index.php?s=/Home/Account/register2',
            type: 'POST',
            dataType: 'json',
            data: {
                name: name,
                mobile: mobile,
                code: code
            },
            success: function (data) {
                if (data == 10008) {
                    alert('验证码错误');
                    $('input[name="code"]').val('');
                    $('.weui-vcode-img').attr('src','index.php?s=/Home/Account/verify/v/'+Math.random());
                }
                if (data == 10005) {
                    common.showTips('报名成功');
                }
                if (data == 10007) {
                    common.showTips('您已报名');
                }
            },
            error: function () {
            },
        })
    });
});



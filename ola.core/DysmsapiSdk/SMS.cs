﻿using Aliyun.Acs.Core;
using Aliyun.Acs.Core.Exceptions;
using Aliyun.Acs.Core.Profile;
using Aliyun.Acs.Dysmsapi.Model.V20170525;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ola.core.DysmsapiSdk
{
    public static class SMS
    {
        public static SendSmsResponse Send(string phoneNumbers, string signName, string templateCode, string templateParam, string outId)
        {
            String product = "Dysmsapi";//短信API产品名称
            String domain = "dysmsapi.aliyuncs.com";//短信API产品域名
            String accessKeyId = "LTAIb7LH1BytIx0y";//你的accessKeyId
            String accessKeySecret = "X1ISz1tRyDJPKTJOYToD4LNrmLl8Wp";//你的accessKeySecret

            IClientProfile profile = DefaultProfile.GetProfile("cn-hangzhou", accessKeyId, accessKeySecret);
            //IAcsClient client = new DefaultAcsClient(profile);
            //SingleSendSmsRequest request = new SingleSendSmsRequest();

            DefaultProfile.AddEndpoint("cn-hangzhou", "cn-hangzhou", product, domain);
            IAcsClient acsClient = new DefaultAcsClient(profile);
            SendSmsRequest request = new SendSmsRequest();
            try
            {
                //必填:待发送手机号。支持以逗号分隔的形式进行批量调用，批量上限为20个手机号码,批量调用相对于单条调用及时性稍有延迟,验证码类型的短信推荐使用单条调用的方式
                request.PhoneNumbers = phoneNumbers;
                //必填:短信签名-可在短信控制台中找到
                request.SignName = signName;
                //必填:短信模板-可在短信控制台中找到
                request.TemplateCode = templateCode;
                //可选:模板中的变量替换JSON串,如模板内容为"亲爱的${name},您的验证码为${code}"时,此处的值为
                request.TemplateParam = templateParam;
                //可选:outId为提供给业务方扩展字段,最终在短信回执消息中将此值带回给调用者
                request.OutId = outId;
                //请求失败这里会抛ClientException异常
                SendSmsResponse sendSmsResponse = acsClient.GetAcsResponse(request);
                return sendSmsResponse;
            }
            catch (ServerException e)
            {
                return new SendSmsResponse { Code = "Error", Message = "服务器端异常" };
            }
            catch (ClientException e)
            {
                return new SendSmsResponse { Code = "Error", Message = "客户端异常" };
            }
        }
    }
}


//------------------------------------------------------------------------------
// <auto-generated>
//     此代码已从模板生成。
//
//     手动更改此文件可能导致应用程序出现意外的行为。
//     如果重新生成代码，将覆盖对此文件的手动更改。
// </auto-generated>
//------------------------------------------------------------------------------


namespace ola.model
{

using System;
    using System.Collections.Generic;
    
public partial class LotteryOpenHistory
{

    public System.Guid Id { get; set; }

    public int LotteryId { get; set; }

    public string QiHao { get; set; }

    public string OpenNumber { get; set; }

    public string OpenTime { get; set; }

    public System.DateTime CreateTime { get; set; }

    public Nullable<System.DateTime> UpdateTime { get; set; }

    public int Source { get; set; }

    public string Forecast1 { get; set; }

    public string Forecast2 { get; set; }

    public string Forecast3 { get; set; }

    public bool Used { get; set; }

    public string CurrentForecastNumber { get; set; }

    public string ForecastFrom { get; set; }

    public string UsedBy { get; set; }

}

}

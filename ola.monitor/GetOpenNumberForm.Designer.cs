namespace ola.monitor
{
    partial class GetOpenNumberForm
    {
        /// <summary>
        /// 必需的设计器变量。
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// 清理所有正在使用的资源。
        /// </summary>
        /// <param name="disposing">如果应释放托管资源，为 true；否则为 false。</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows 窗体设计器生成的代码

        /// <summary>
        /// 设计器支持所需的方法 - 不要修改
        /// 使用代码编辑器修改此方法的内容。
        /// </summary>
        private void InitializeComponent()
        {
            this.components = new System.ComponentModel.Container();
            this.getOpenNumbertimer = new System.Windows.Forms.Timer(this.components);
            this.SuspendLayout();
            // 
            // getOpenNumbertimer
            // 
            this.getOpenNumbertimer.Interval = 3000;
            this.getOpenNumbertimer.Tick += new System.EventHandler(this.GetOpenNumbertimer_Tick);
            // 
            // GetOpenNumberForm
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 12F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(852, 478);
            this.Name = "GetOpenNumberForm";
            this.Text = "OLA监控系统";
            this.WindowState = System.Windows.Forms.FormWindowState.Maximized;
            this.ResumeLayout(false);

        }

        #endregion
        private System.Windows.Forms.Timer getOpenNumbertimer;
    }
}


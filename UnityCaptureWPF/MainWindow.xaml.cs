using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;
using WebEye.Controls.Wpf.StreamPlayerControl;

namespace UnityCaptureWPF
{
    /// <summary>
    /// MainWindow.xaml에 대한 상호 작용 논리
    /// </summary>
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();

            this.streamPlayerControl.StreamFailed += StreamPlayerControl_StreamHandler; 
            this.streamPlayerControl.StreamStarted += StreamPlayerControl_StreamHandler;
            this.streamPlayerControl.StreamStopped += StreamPlayerControl_StreamHandler;

            this.ConnectButton.Click += ConnectButton_Click;
            this.StopButton.Click += StopButton_Click;
        }

        private void StreamPlayerControl_StreamHandler(object sender, RoutedEventArgs e)
        {
            SetButtonEnabled();

            if (e.RoutedEvent.Name == "StreamFailed")
            {
                MessageBox.Show(((StreamFailedEventArgs)e).Error, "에러", MessageBoxButton.OK, MessageBoxImage.Error);
            }
            else if (e.RoutedEvent.Name == "StreamStopped")
            {

            }
        }

        private void ConnectButton_Click(object sender, RoutedEventArgs e)
        {
            try
            {
                Uri uri = new Uri(this.UrlTextBox.Text);
                
                this.streamPlayerControl.StartPlay(uri);
                //this.statusLabel.Text = "연결중...";
            }
            catch
            {

            }
        }

        private void StopButton_Click(object sender, RoutedEventArgs e)
        {
            this.streamPlayerControl.Stop();
        }

        private void SetButtonEnabled()
        {
            this.ConnectButton.IsEnabled = !this.streamPlayerControl.IsPlaying;
            this.StopButton.IsEnabled = this.streamPlayerControl.IsPlaying;
        }
    }
}

using System;
using System.IO;
using System.Reflection;
using System.Windows;
//using System.Windows.Shapes;
using Vlc.DotNet.Wpf;
using VlcPlayerWPF.Properties;

namespace VlcPlayerWPF
{
    /// <summary>
    /// MainWindow.xaml에 대한 상호 작용 논리
    /// </summary>
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();

            var currentAssembly = Assembly.GetEntryAssembly();
            var currentDirectory = new FileInfo(currentAssembly.Location).DirectoryName;
            // Default installation path of VideoLAN.LibVLC.Windows
            var libDirectory = new DirectoryInfo(Path.Combine(currentDirectory, "libvlc", IntPtr.Size == 4 ? "win-x86" : "win-x64"));

            this.MyControl.SourceProvider.CreatePlayer(libDirectory/* pass your player parameters here */);
            this.MyControl.SourceProvider.MediaPlayer.Play(new Uri("rtmp://192.168.0.114/live/stream_live"));
        }
    }
}

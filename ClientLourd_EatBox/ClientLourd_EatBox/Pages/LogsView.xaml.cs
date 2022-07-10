using ClientLourd_EatBox.Functions;
using ClientLourd_EatBox.Models;
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

namespace ClientLourd_EatBox.Pages
{
    /// <summary>
    /// Logique d'interaction pour Logs.xaml
    /// </summary>
    public partial class LogsView : Page
    {
        public Logs httpclient;
        public List<LogsModels> logs;
        public LogsView()
        {
            logs = new List<LogsModels> { };

            Action action = () =>
            {
                InitializeComponent();
                LogsTab.ItemsSource = GetObjectsLogs();

            };

            GetLogsfromDB(action);

        }

        public List<LogsModels> GetObjectsLogs()
        {
            logs = httpclient.LogsObjects;
            return logs;
        }

        public async void GetLogsfromDB(Action callback)
        {
            logs = await httpclient.GetLogsWithHttpClientFactory();
            callback();
        }

        private async void ReloadButton_Click(object sender, RoutedEventArgs e)
        {
            logs = await httpclient.GetLogsWithHttpClientFactory();
            LogsTab.ItemsSource = logs;
            LogsTab.Items.Refresh();

        }
    }
}

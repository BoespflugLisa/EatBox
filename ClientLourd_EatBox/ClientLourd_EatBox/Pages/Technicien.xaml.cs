using ClientLourd_EatBox.Functions;
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
    /// Logique d'interaction pour Technicien.xaml
    /// </summary>
    public partial class Technicien : Page
    {

        public LogsView Log;
        public Supervision Supervision;
        
        public Technicien()
        {
            InitializeComponent();
            this.Log = new LogsView();
            this.Supervision = new Supervision();        

        }

        private void Logs_Click(object sender, RoutedEventArgs e)
        {
            TecFrame.Content = this.Log;
        }

        private void Supervision_Click(object sender, RoutedEventArgs e)
        {
            TecFrame.Content = this.Supervision;
        }
    }
}

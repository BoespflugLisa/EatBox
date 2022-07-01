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
    /// Logique d'interaction pour Commercial.xaml
    /// </summary>
    public partial class Commercial : Page
    {
        public UsersView users;
        public OrdersView orders;
        public Commercial()
        {
            InitializeComponent();
            this.users = new UsersView();
            this.orders = new OrdersView();
        }

        private void UsersView_Click(object sender, RoutedEventArgs e)
        {
            ComFrame.Content = this.users;
        }

        private void Orders_Click(object sender, RoutedEventArgs e)
        {
            ComFrame.Content = this.orders;
        }



    }
}

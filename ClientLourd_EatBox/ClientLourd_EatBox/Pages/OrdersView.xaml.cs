using ClientLourd_EatBox.Functions;
using ClientLourd_EatBox.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel;
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
    /// Logique d'interaction pour OrdersView.xaml
    /// </summary>
    public partial class OrdersView : Page
    {
        public Orders httpclient;
        public List<OrdersModel> orders;

        public OrdersView()
        {
            orders = new List<OrdersModel> { };
            httpclient = Orders.GetInstance("Singleton Commandes");

            Action action = () =>
            {
                InitializeComponent();
                OrdersTab.ItemsSource = GetObjectsOrders();
                
           };

            GetOrdersfromDB(action);
        }

        public List<OrdersModel> GetObjectsOrders()
        {
            orders = httpclient.OrdersObjects;
            return orders;
        }

        public async void GetOrdersfromDB(Action callback)
        {           
            orders = await httpclient.GetOrdersWithHttpClientFactory();
            callback();
        }

        private async void ReloadButton_Click(object sender, RoutedEventArgs e)
        {
            orders = await httpclient.GetOrdersWithHttpClientFactory();
            OrdersTab.ItemsSource = orders;
            OrdersTab.Items.Refresh();
            
        }
    }
}

using ClientLourd_EatBox.Functions;
using ClientLourd_EatBox.Models;
using Newtonsoft.Json.Linq;
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
    public partial class Logs : Page
    {

        public Users httpclient;
        public List<UserModel> clients;
        public List<UserModel> livreurs;
        public List<UserModel> resto;
 
        public Logs()
        {
            clients = new List<UserModel> { };
            livreurs = new List<UserModel> { };
            resto = new List<UserModel> { };

            httpclient = Users.GetInstance("Singleton Clients");
            Action action = () => { 
                InitializeComponent(); 
                ClientsTab.ItemsSource = GetObjectsClients(); 
                LivreursTab.ItemsSource = GetObjectsLivreurs(); 
                RestosTab.ItemsSource = GetObjectsRestos();
            };
            GetUsersfromDB(action);

        }

        public List<UserModel> GetObjectsClients()
        {
            return clients;
        }

        public List<UserModel> GetObjectsLivreurs()
        {
            return livreurs;
        }
        public List<UserModel> GetObjectsRestos()
        {
            return resto;
        }


        public async void GetUsersfromDB(Action callback)
        {
           
            //users = JObject.Parse(await clients.GetUsersWithHttpClientFactory());
            (livreurs, resto, clients) = await httpclient.GetUsersWithHttpClientFactory();
            

            callback();
        }

        private async void OnKillProcess(object sender, RoutedEventArgs e)
        {
            Button btn = (Button)sender;
            string id = btn.Tag.ToString();
            httpclient.SuspendUserWithHttpClientFactory(id);

           
        }

    }
}

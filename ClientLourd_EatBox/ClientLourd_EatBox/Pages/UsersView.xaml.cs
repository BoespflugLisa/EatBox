using ClientLourd_EatBox.Functions;
using ClientLourd_EatBox.Models;
using Newtonsoft.Json.Linq;
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
    /// Logique d'interaction pour UsersView.xaml
    /// </summary>
    public partial class UsersView : Page
    {

        public Users httpclient;
        public List<UserModel> clients;
        public List<UserModel> livreurs;
        public List<UserModel> resto;
        public List<UserModel> developers;


        public UsersView()
        {
            clients = new List<UserModel> { };
            livreurs = new List<UserModel> { };
            resto = new List<UserModel> { };
            developers = new List<UserModel> { };

            httpclient = Users.GetInstance("Singleton Clients");
            Action action = () =>
            {
                InitializeComponent();
                ClientsTab.ItemsSource = GetObjectsClients();
                LivreursTab.ItemsSource = GetObjectsLivreurs();
                RestosTab.ItemsSource = GetObjectsRestos();
                DeveloperTab.ItemsSource = GetObjectsDevelopers();
            };


            GetUsersfromDB(action);


        }

        public List<UserModel> GetObjectsClients()
        {
            clients = httpclient.ClientsObjects;
            return clients;
        }

        public List<UserModel> GetObjectsDevelopers()
        {
            clients = httpclient.DevelopersObjects;
            return clients;
        }

        public List<UserModel> GetObjectsLivreurs()
        {
            livreurs = httpclient.LivreursObjects;
            return livreurs;
        }
        public List<UserModel> GetObjectsRestos()
        {
            resto = httpclient.RestoObjects;
            return resto;
        }


        public async void GetUsersfromDB(Action callback)
        {

            //users = JObject.Parse(await clients.GetUsersWithHttpClientFactory());
            (livreurs, resto, clients, developers) = await httpclient.GetUsersWithHttpClientFactory();


            callback();
        }

        private void SuspendUser(object sender, RoutedEventArgs e)
        {
            Button btn = (Button)sender;
            string id = btn.Tag.ToString();
            httpclient.SuspendUserWithHttpClientFactory(id);

        }

        private void DeleteUser(object sender, RoutedEventArgs e)
        {
            Button btn = (Button)sender;
            string id = btn.Tag.ToString();
            httpclient.DeleteUserWithHttpClientFactory(id);

            IEditableCollectionView clientTab = ClientsTab.Items; //Cast to interface
            IEditableCollectionView livreurTab = LivreursTab.Items; //Cast to interface
            IEditableCollectionView restoTab = RestosTab.Items; //Cast to interface
            IEditableCollectionView devTab = DeveloperTab.Items; //Cast to interface
            clientTab.Remove(ClientsTab.SelectedItem);
            livreurTab.Remove(LivreursTab.SelectedItem);
            restoTab.Remove(RestosTab.SelectedItem);
            devTab.Remove(RestosTab.SelectedItem);
        }

    }

}


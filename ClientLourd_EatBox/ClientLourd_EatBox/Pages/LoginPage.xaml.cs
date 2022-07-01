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
    /// Logique d'interaction pour LoginPage.xaml
    /// </summary>
    public partial class LoginPage : Page
    {
       
        private Frame MainFrame;
        public Technicien tec;
        public Commercial com;
        public bool IsCommercial;

        public LoginPage(Frame main)
        {
            InitializeComponent();
            MainFrame = main;
            com= new Commercial();
            tec = new Technicien();
            IsCommercial = true;
           


        }

        private void TextBox_TextChanged(object sender, TextChangedEventArgs e)
        {

        }

        private void Button_Click(object sender, RoutedEventArgs e)
        {
            if (!IsCommercial)
            {
                MainFrame.Content = tec;
            }
           else
            {
                MainFrame.Content = com;
            }
        }
    }
}

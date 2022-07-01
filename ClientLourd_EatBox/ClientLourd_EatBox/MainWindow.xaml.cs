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
using ClientLourd_EatBox.Pages;
using Microsoft.Extensions.DependencyInjection;

namespace ClientLourd_EatBox
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    /// 

    public partial class MainWindow : Window
    {
       
        
        
        public MainWindow()
        {
            InitializeComponent();
            
            MainFrame.Content = new LoginPage(this.MainFrame);
            
            

        }
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddHttpClient();

        }
    }


    }


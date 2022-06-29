﻿using System;
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

        public Logs Log;
        public Technicien()
        {
            InitializeComponent();
            this.Log = new Logs();

        }

        private void Logs_Click(object sender, RoutedEventArgs e)
        {
            TecFrame.Content = this.Log;
        }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ClientLourd_EatBox.Models
{
    public class OrdersModel
    {
        public string _id { get; set; }
        public int State { get; set; }
        public string StateInfo { get; set; } 
        public float Price { get; set; }
        public string[] StateText = new string[7] {"En attente de validation du restaurant", "En préparation du côté restaurant", "Le livreur prends la commande en charge",
        "Le livreur est en route", "Livrée", "A la recherche d\'un livreur", "Commande annulée" };



    public OrdersModel()
        {
           
        }

        public OrdersModel(string id, int state, float prix)
        {
            _id = id;
            Price = prix;
            StateInfo = StateText[state];
        }
    }
}

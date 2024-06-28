using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ClientLourd_EatBox.Models
{
    public class LogsModels
    {
        public string _id { get; set; }
        public string Date { get; set; }
        public string Username { get; set; }
        public string Message { get; set; }

        public LogsModels()
        {
            Message = "Un nouvel utilisateur s'est connecté";
        }

        public LogsModels(string ID, string date, string Lastname, string Firstname)
        {
            _id = ID;
            Date = date;
            Username = Firstname + " " + Lastname;
            Message = "Un nouvel utilisateur s'est connecté";
        }

        public LogsModels(string ID, string date, string Name)
        {
            _id = ID;
            Date = date;
            Username = Name;
            Message = "Un nouvel utilisateur s'est connecté";
        }
    }
}

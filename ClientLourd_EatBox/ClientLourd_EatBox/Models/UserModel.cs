using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ClientLourd_EatBox.Models
{
    public class UserModel
    {
        public string Email { get; set; }
        public string Role { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Name { get; set; }
        public string Type { get; set; }
        public string _id { get; set; }

        public UserModel() { }
        public UserModel(string id, string email, string firstname, string lastname, string role) //Création de livreur ou client
        {
            _id = id;
            Email = email;
            Role = role;
            FirstName = firstname;
            LastName = lastname;
        }

        public UserModel(string id, string email, string name, string type) //Création de restaurant
        {
            _id = id;
            Email = email;
            Role = "Restaurant";
            Name = name;
            Type = type;

        }
    }
}

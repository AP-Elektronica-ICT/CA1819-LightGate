using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using static System.Net.Mime.MediaTypeNames;



namespace Objective_API.Classes
{
    public class Base64Translator
    {
        public Base64Translator()
        {

        }

        public Image Base64ToImage(string base64String)
        {
            // Convert base 64 string to byte[]
            byte[] imageBytes = Convert.FromBase64String(base64String);


            // Convert byte[] to Image
            MemoryStream ms = new MemoryStream(imageBytes, 0, imageBytes.Length);
            Image image = Image.FromStream(ms, true);
            return image;


            /*using (var ms = new MemoryStream(imageBytes, 0, imageBytes.Length))
            {
                //Image image = Image.FromStream(ms, true);
                Image image = Image.FromStream(ms,true);
                return image;
            }*/
        }
        
    }
}

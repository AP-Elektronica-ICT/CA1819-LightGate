using Microsoft.AspNetCore.Server.Kestrel.Transport.Libuv.Internal.Networking;
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

        protected void ExportToImage(object sender, EventArgs e)
        {
            //Convert.FromBase64String()

            //string base64 = Request.Form[hfImageData.UniqueID].Split(',')[1];
            //byte[] bytes = Convert.FromBase64String(base64);
            //using (Image image = Image.FromStream(new MemoryStream(bytes)))
            //{
            //    image.Save("output.jpg", ImageFormat.Jpeg);  // Or Png
            //}
            //File.Copy(bytes.ToString() + ".jpg", "\\\\192.168.2.9\\Web");
        }

    }
}

using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Runtime.Serialization.Json;
using System.Text;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class Default3 : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        string[] paths = Directory.GetFiles(System.IO.Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "DICOMs")).Select(Path.GetFileName).ToArray();
        StringBuilder sb = new StringBuilder();
        sb.Append("{\"files\":[");
        for (int i = 0; i < paths.Length; i++)
        {
            sb.Append("{\"name\":\"");
            sb.Append(paths[i]);
            sb.Append("\"}");
            if (i < paths.Length - 1) sb.Append(",");
        }
        sb.Append("]}");
        Response.Write(sb.ToString());
    }
}
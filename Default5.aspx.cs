using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class Default5 : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        string fileName;
        StreamReader sr;
        try
        {
            fileName = Request.QueryString["fileName"];
        }
        catch (Exception)
        {
            throw new HttpException(400, "Bad Request");
        }
        if (string.IsNullOrEmpty(fileName)) throw new HttpException(400, "Bad Request");
        try
        {
            sr = new StreamReader(Context.Server.MapPath("~/ANNOTs/" + fileName));
        }
        catch (FileNotFoundException)
        {
            Response.Write("{\"annotations\":[]}");
            return;
        }
        StringBuilder sb = new StringBuilder();
        sb.Append("{\"annotations\":[");
        string line;
        while ((line = sr.ReadLine()) != null)
        {
            if (line != "")
            {
                sb.Append(line);
                sb.Append(",");
            }
        }
        if (sb[sb.Length - 1] == ',')
        {
            sb[sb.Length - 1] = ' ';
        }
        sb.Append("]}");
        sr.Close();
        Response.Write(sb.ToString());
    }
}
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class Default6 : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (Request.HttpMethod != "POST")
        {
            throw new HttpException(400, "Bad Request");
        }
        var x = Convert.ToInt32(Request.Form["x"]);
        var y = Convert.ToInt32(Request.Form["y"]);
        var note = Request.Form["note"];
        var fname = Request.Form["fname"];
        StreamWriter sw = new StreamWriter(Context.Server.MapPath("~/ANNOTs/" + fname), true);
        StringBuilder sb = new StringBuilder();
        sb.Append("{ \"x\": ");
        sb.Append(x.ToString());
        sb.Append(", \"y\": ");
        sb.Append(y.ToString());
        sb.Append(", \"note\": \"");
        sb.Append(note);
        sb.Append("\" }\r\n");
        sw.Write(sb.ToString());
        sw.Close();
        Response.Write(sb.ToString());
    }
}
using System;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;
using System.Reflection;
using Dicom.Imaging;
using Dicom.Imaging.Codec;

public partial class Default2 : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        Bitmap bmp;
        try
        {
            DicomTranscoder.LoadCodecs(System.IO.Path.Combine(System.AppDomain.CurrentDomain.BaseDirectory, "bin"), "Dicom.Native*.dll");
            var image = new DicomImage(Context.Server.MapPath("~/CT-MONO2-16-chest.dcm"));
            bmp = new Bitmap(image.RenderImage());
        }
        catch (Exception)
        {
            Console.WriteLine();
            throw;
        }
        //Bitmap bmp = new Bitmap(Context.Server.MapPath("~/sample.png"));
        int portX, portY, zoomLevel;
        try
        {
            portX = Convert.ToInt32(Request.QueryString["viewPortX"]);
            portY = Convert.ToInt32(Request.QueryString["viewPortY"]);
            zoomLevel = Convert.ToInt32(Request.QueryString["zoomLevel"]);
                
        }
        catch (Exception)
        {
            throw; //TODO handle
        }
        double baseScalingFactor = ((double)portX/bmp.Width > (double)portY/bmp.Height ? (double)portX/bmp.Width : (double)portY/bmp.Height);
        double interval = (1 - baseScalingFactor)/5;
        double scalingFactor = baseScalingFactor + zoomLevel*interval;
        Console.WriteLine("PX: {0}, PY: {1}, ZL: {2}", portX, portY, zoomLevel);
        Console.WriteLine("SF: {0}, iv: {1}, BSF: {2}", scalingFactor, interval, baseScalingFactor);
        Bitmap bmp2 = new Bitmap((int)(scalingFactor*bmp.Width), (int)(scalingFactor*bmp.Height));
        Graphics.FromImage(bmp2).InterpolationMode = InterpolationMode.High;
        Graphics.FromImage(bmp2).CompositingQuality = CompositingQuality.HighQuality;
        Graphics.FromImage(bmp2).SmoothingMode = SmoothingMode.AntiAlias;
        Graphics.FromImage(bmp2).DrawRectangle(Pens.Black, 0, 0, bmp2.Width, bmp2.Height);
        Graphics.FromImage(bmp2).DrawImage(bmp, 0, 0, (int)(scalingFactor * bmp.Width), (int)(scalingFactor * bmp.Height));
        Response.ContentType = "image/png";
        bmp2.Save(Response.OutputStream, ImageFormat.Png);
    }
}
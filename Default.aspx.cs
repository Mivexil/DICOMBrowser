﻿using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Imaging;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class _Default : System.Web.UI.Page
{
    Bitmap hugePicture;
    List<Bitmap> smallerPictures = new List<Bitmap>(); 
    protected void Page_Load(object sender, EventArgs e)
    {

    }
}
<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Default.aspx.cs" Inherits="_Default" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <link rel="stylesheet" href="DefaultStyleSheet.css" />
    <title></title>
</head>
<body>
    <form id="mainForm" runat="server">
        <div id="topPanel">
                <img src="mainlogo.png" id="mainLogo" />
                <span id="mainText">DICOM browser beta</span>
        </div>
        <div id="leftPanel">
            <asp:Button class="leftButton" ID="openFile" runat="server" Text="Open file..." /><br />
            <asp:Button class="leftButton" ID="browseImages" runat="server" Text="Browse images..." />
        </div>
        <div id="rightPanel">
        </div>
        <div id="centerPanel">
            <canvas id="mainCanvas"></canvas>          
        </div>
    </form>
</body>
</html>

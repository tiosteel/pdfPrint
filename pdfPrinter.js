jQuery.sap.declare("cust.pdfPrinter");
sap.ui.core.Control.extend("cust.pdfPrinter", {
	metadata : {
    properties : {
				objID: 	{type : "string"},
        pdfSrc: {type: "string"},
        id: {type: "string"}
			},
	},

	init : function() {

	},

  printPDF : function(url)
  {
		if (url !== undefined && url.toString()!=="")
		{
			this.setPdfSrc(url);
			this.rerender();
			if (sap.ui.Device.browser.versionStr === "11" && sap.ui.Device.browser.name === "ie")
			{
					this.getObj().printWithDialog();
			}
			else
			{
					this.getObj().contentWindow.print();
			}
		}
  },

  getObjID : function(){
    return this.getId()+"obj";
  },

	getObj : function(){
		return document.getElementById(this.getObjID());
	},

  renderer :{
    render: function (oRM, oControl) {
  			oRM.write("<div");
  			oRM.writeControlData(oControl);
  			oRM.addClass("pdfPrinter");
  			oRM.writeClasses();
  			oRM.write(">");
				if (sap.ui.Device.browser.versionStr === "11" && sap.ui.Device.browser.name === "ie")
				{
					oRM.write("<object");
					oRM.writeAttribute("id", oControl.getObjID());
					oRM.writeAttribute("height", "1px");
					oRM.writeAttribute("width", "1px");
					oRM.writeAttribute("type", "application/pdf");
					oRM.writeAttribute("data", oControl.getPdfSrc());
					oRM.write(">");
					oRM.write("</object>");
				}
				else
				{
					oRM.write("<iframe");
					oRM.writeAttribute("id", oControl.getObjID());
					oRM.writeAttribute("height", "1px");
					oRM.writeAttribute("width", "1px");
					oRM.writeAttribute("onload", oControl.printPDF());
					oRM.writeAttribute("src", oControl.getPdfSrc());
					oRM.write("/>");
				}
  			oRM.write("</div>");
  		}
  }
});

enyo.kind({
	name: "App",
	
	// Imports statics here for ease of usage.
	phoneGap: util.PhoneGapSuit,
	global: com.Global, 
	classes: "enyo-fit enyo-unselectable appBG inflatePadding",
	components: [
		{
			name:"appForm",
			kind: "FittableRows",
			components: [
				{   	
					tag:"h4",
					content:"Enter Original Image Size and Desired Icon Size"
				},
				{
						kind: "onyx.InputDecorator", 
						classes:"setWidthFull resetCorner roundedTop whiteInput",
						style:"height:55px",
						components: [
						{
							kind: "Input",
							type:"number",
							id:"txtWidth",
							name:"txtWidth",
 							classes:"inputFix setWidthFull",
							style:"height:40px;",
							placeholder: "Enter original width (without px)",
							attributes:{
								required:"required"
							}
						}
					]
				},

				{
						kind: "onyx.InputDecorator", 
						classes:"setWidthFull resetCorner whiteInput",
						style:"height:55px;",
						components: [
						{
							kind: "Input",
							type:"number",
							id:"txtHeight",
							name:"txtHeight",
 							classes:"inputFix setWidthFull",
							style:"height:40px;",
							placeholder: "Enter original height (without px)",
							attributes:{
								required:"required"
							}
						}
					]
				},
				{
						kind: "onyx.InputDecorator", 
						classes:"setWidthFull resetCorner whiteInput",
						style:"height:55px;",
						components: [
						{
							kind: "Input",
							type:"number",
							id:"txtIcon",
							name:"txtIcon",
 							classes:"inputFix setWidthFull",
							style:"height:40px;",
							placeholder: "Enter icons per row",
							attributes:{
								required:"required"
							}
						}
					]
				},
				{
						kind: "onyx.InputDecorator", 
						classes:"setWidthFull resetCorner roundedBottom whiteInput",
						style:"height:55px;",
						components: [
						{
							kind: "Input",
							type:"number",
							id:"txtPixel",
							name:"txtPixel",
 							classes:"inputFix setWidthFull",
							style:"height:40px;",
							placeholder: "Enter smallest icon size (px)",
							attributes:{
								required:"required"
							}
						}
					]
				}
			]

		},
		{
			tag:"h4",
			classes:"setWidthFull",
			style:"height:30px;margin-bottom:0px",
			content:"CSS Ratio Code"
		},
		{
			tag:"div",
			classes:"setWidth97 centerDiv",
			name:"txtCode",
			content:"Press submit to generate...",
			style:"height:250px;margin-bottom:10px;background:#fff;padding:12px"
		},
		
		{
				kind: "onyx.Button", 
				classes:"setWidthFull resetCorner",
				style:"height:40px",
				ontap:"validateThis",
				components: [
					{
						content:"Submit"
					}
				]
		}
	],
	
	create: function(inSender,inEvent) {
		this.inherited(arguments);
		//Always start your code below this.inherited.
		 
 	},
 	validateThis : function(inSender,inEvent){
 		var self = this;
 		var validateUtil = new util.Validator();
 		validateUtil.validate(this.$.appForm,onSuccessValidate,onFailValidate);
 		function onSuccessValidate(results){
 			var oWidth = parseInt( self.$.txtWidth.getValue(),10 );
 			var oHeight = parseInt( self.$.txtHeight.getValue(),10 );
 			var oIcons = parseInt( self.$.txtIcon.getValue(),10 );
 			var oPixel = parseInt( self.$.txtPixel.getValue(),10 );
 			var oRatio = (oWidth/oHeight);
 			var maxWidth = 0;
 			var computedRatioValue = 0;
 			if (oHeight < oWidth) {
 				//Height vs Pixel
 				maxWidth = (oIcons *  oPixel);
 				computedRatioValue = (oHeight * maxWidth) / oWidth;
 				self.$.txtCode.setContent("");
 				self.$.txtCode.setContent("background-size: "+maxWidth+"px "+computedRatioValue+"px !important;");
 			} else {
 				//Width vs Pixel
 				computedRatioValue = (oHeight * oPixel) / oWidth;
 				self.$.txtCode.setContent("");
 				self.$.txtCode.setContent("background-size: "+oPixel+"px "+computedRatioValue+"px !important;");
 			}
 			
 			
 			console.log(computedRatioValue+"px");
 		}
 		function onFailValidate(results){
 			self.phoneGap.alert("Please fill up the fields with valid input to proceed");
 			for (var i = 0; i < results.errors.length; i++) {
				results.errors[i].controller.setValue("");
				results.errors[i].controller.setAttribute("placeholder", "");
				results.errors[i].controller.setAttribute("placeholder", results.errors[i].message);		
			};
 		}
 	}
			
});
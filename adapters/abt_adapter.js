/* 
 * Product Information (PI) Event Adapter
 * Adapter to grab attributes and send to Product Information Event
 * requires: PI.js
 * 
 * Sean Burke 8/7/14
 */

(function(){
	var ccs_cc_pi_args = {};
	var c,s,t,p = {};
	if((s=$("script").text().match(/\['([\s\w-]+)', '([\s\w-]+)']/g))?s:null)
	{
		Array.prototype.forEach.call(s, function(el,i,array){ 
			t = el.match(/\['(\w+)', '(\w+)']/);
			ccs_cc_pi_args[t[1]] = t[2];
		});
	}
	var adapter= {
		           SKey: 'a62b622d', 	//subscriber key
		      ProductId: ccs_cc_pi_args['cpn'], //product number
		       SMfgName: ccs_cc_pi_args['mf'] || $("[itemscope] [itemprop='manufacturer'] [itemprop='name']").attr("content"), //manufacturer name
		         SMfgPn: ccs_cc_pi_args['pn'] || $("[itemtype$='Product'] [itemprop='model']").attr("content"),  //manufacturer part number
		      CatalogId: ccs_cc_pi_args['ccid'], //Catalog ID
		           LCID: ccs_cc_pi_args['lang'],  //Locale ID, language
                 Market: ccs_cc_pi_args['market'],  //market of product, 2 letter region code
		        SEanUpc: ccs_cc_pi_args['upcean'],  //UPC/EAN code
		          SkuId: null, 	//sku number CNET SKU ID (CDSID)
		            upc: (p=$("[itemtype$='Product'] [itemprop='productID']").attr("content").match(/[0-9]+/)) ? p[0]:null, 	//upc code
		          upc14: null, 	//upc14 code
		           isbn: null, 	//isbn number
		   	  userAgent: null,  //user agent of browser
			  	 ProdId: $("[itemtype$='Product'] [itemprop='productID']").attr("content") || null,  //Product ID that is grabbed from page 
			  	 ProdMf: $("[itemscope] [itemprop='manufacturer'] [itemprop='name']").attr("content"),  //Product Manufacturer grabbed from page
		       ProdName: $("[itemtype$='Product'] [itemprop='name']").text(), 	//name of product
	           ProdDesc: null, //$("#product_short_description [itemprop='description']").text(), 	//description of product
		      ProdModel: null, //$("[itemtype$='Product'] [itemprop='model']").attr("content"), 	//model number
		      ProdImage: null, //$("[itemtype$='Product'] [itemprop='image']").attr("content"), 	//product image
		   ProdCategory: $(".breadcrumb").text().replace(/\s/gi,' ').split("|").splice(0,-1).join("|"), 	//category of product as an Array
		   		 oiqCat: null,  //owneriq.net category
   		   oiqLifecycle: null,  //owneriq.net LifeCycle
		      ProdPrice: (p=$("[itemtype$='Product'] [itemprop='price']").text().match(/([\d\.,]+)/)) ? p[1] : null, 	//price of product
		  priceCurrency: $("[itemtype$='Product'] [itemprop='priceCurrency']").attr("content"), 	//unit of price, e.g. USD
		    priceSymbol: (p=$("[itemtype$='Product'] [itemprop='price']").text().match(/[^\s\d\.,]+/)) ? p[0] : null,  //symbol of price, e.g. $
		priceValidUntil: $("[itemtype$='Product'] [itemprop='priceValidUntil']").text() || null, 	//date of current price 
		   availability: (p=$("[itemprop='availability']").attr("href").match(/schema\.org\/(.+)/)) ? p[1] : null, 	//availability of product
		  itemCondition: (p=$("[itemprop='itemCondition']").attr("href").match(/schema\.org\/(.+)/)) ? p[1] : null, 	//condition of product
	};
	var ccs_pi = new PI(adapter); //create the PI object
	ccs_pi.send(); //send the PI object to hive

})();
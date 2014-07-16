var Platform;

function init () {
	Platform = {};
	var osname          = Ti.Platform.osname,
	        version         = Ti.Platform.version;

	// UI vars may not be available in a background task
	try {
		var height          = Ti.Platform.displayCaps.platformHeight,
		        width           = Ti.Platform.displayCaps.platformWidth,
		        screenWidthInch = Titanium.Platform.displayCaps.platformWidth / Titanium.Platform.displayCaps.dpi,
		        screenHeightInch= Titanium.Platform.displayCaps.platformHeight / Titanium.Platform.displayCaps.dpi;
		 
		var screenSizeInch      = Math.sqrt( Math.pow(screenWidthInch, 2) + Math.pow(screenHeightInch, 2) );
		 
		var isTablet = osname === 'ipad' || (osname === 'android' && screenSizeInch > 7 && (width > 899 || height > 899) );
		var isPhablet = (osname === 'android' && screenSizeInch >= 6 && screenSizeInch <= 7 && (width > 899 || height > 899) );
		Platform.iPhoneDevice = (Ti.Platform.displayCaps.density == 'high') ? 
				(
					(Ti.Platform.displayCaps.platformHeight == 480) ? 4 : 5
				)
				:
				3;
	}
	
	// set some default vars for non UI processes
	catch (e) {
		var isTablet = false;
		var isPhablet = false;
		Platform.iPhoneDevice = 5;
	}
	
	// set some global flags
	Platform.isTablet = isTablet;
	Platform.isPhablet = isPhablet;
	Platform.isPhone = (!isTablet && !isPhablet);
	Platform.isAndroid = (osname === 'android');
	Platform.isIos = (osname === 'ipad' || osname === 'iphone' || osname === 'ipod');
	Platform.isIos7 = (Platform.isIos && parseInt(Titanium.Platform.getVersion().split('.')[0]) == 7);
	Platform.isIos7Plus = (Platform.isIos && parseInt(Titanium.Platform.getVersion().split('.')[0]) >= 7);
}

if ( !Platform ) {
	init();
	Platform.reInit = init;
}

module.exports = Platform;
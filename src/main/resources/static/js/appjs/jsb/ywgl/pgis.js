var prefix = "/ywgl"
$(document).ready(function(){
	EzServerClient.GlobeParams.MapInitLevel = 15;	//设置pgis地图初始化大小
	onLoad();
//	showPeopleList();
	//showMapTimer();
	//queryMap();
	//FaceComparisonInit();
});

function onLoad() {
	parent.data;
	//1） ********构造地图控件对象，用于装载地图
	
	uEzMap = new EzMap(document.getElementById("mymap"));
	//2）********初始化地图，并显示地图
	uEzMap.initialize();
	uEzMap.addMapEventListener(EzEvent.MAP_MOUSEMOVE, function(e){
		document.getElementById("coordiate").innerHTML = "X:"+ e.mapPoint.x + "  Y:" + e.mapPoint.y; 
	});
	
	var longitude=parent.data.jd;//经度
	var latitude=parent.data.wd;//纬度
	
	var locationTemp = longitude+","+latitude;
	var point = new Point(locationTemp);
	if(longitude > 0 && latitude > 0){
		uEzMap.centerAtLatLng(point) ;
		showMarker(locationTemp);
	}
}

function showMarker(location){
	var locationTemp = location;
	 var uPoint = new Point(locationTemp);
	 var icon = new Icon();
	 icon.image =  '/images/gps.png';
	 var uHTMLOverLayMsg = new Marker(uPoint,icon);
	 uEzMap.addOverlay(uHTMLOverLayMsg);
}
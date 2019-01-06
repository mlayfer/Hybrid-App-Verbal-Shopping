var itemlist = JSON.parse(localStorage.getItem('items')) || [];
var imglist = JSON.parse(localStorage.getItem('images')) || [];
var quantitylist = JSON.parse(localStorage.getItem('quantities')) || [];

function removeA(arr) {
    var what, a = arguments, L = a.length, ax;
    while (L > 1 && arr.length) {
        what = a[--L];
        while ((ax= arr.indexOf(what)) !== -1) {
            arr.splice(ax, 1);
        }
    }
    return arr;
}

var app = {
    initialize: function() {this.bindEvents();},
    bindEvents: function() {document.addEventListener('deviceready', this.onDeviceReady, false);},
    onDeviceReady: function() {
        app.receivedEvent('deviceready');

document.getElementById("fullList").innerHTML = '';
for (var i=0; i<itemlist.length; i++)
    document.getElementById("fullList").innerHTML +=
            '<tr class="itemToBuy" id="row' + i + '">' +
                '<td class="qantityTD">' +
                '<i class="fa fa-plus-square" aria-hidden="true" onclick="changeValue(this, \'plus\')"></i>' +
                '<input type="number" value="' + quantitylist[i] + '" min="1" class="form-control quantity" disabled>' +
                '<i class="fa fa-minus-square" aria-hidden="true" onclick="changeValue(this, \'minus\')"></i></td>' +
                '</td>' +
                '<td class="picTD">' +
                '<center><img class="thumbnail" src="' + imglist[i] + '"></center></td>' +
                '<td class="itemName">' + itemlist[i] +'</td>' +
                '<td><center><i class="fa fa-times xIcon" aria-hidden="true" onclick="removeItem(this)"></i></center></td>' +
            '</tr>';
		
    window.plugins.speechRecognition.isRecognitionAvailable(function(available){if(!available){}
    window.plugins.speechRecognition.hasPermission(function (isGranted){if(isGranted){}else{window.plugins.speechRecognition.requestPermission(function (){}, function (err){});}}, function(err){});}, function (err) { });
    },

    receivedEvent: function(id) {

        var itemlist = JSON.parse(localStorage.getItem('items')) || [];
        var imglist = JSON.parse(localStorage.getItem('images')) || [];
        var quantitylist = JSON.parse(localStorage.getItem('quantities')) || [];

        document.getElementById("fullList").innerHTML = '';
        for (var i=0; i<itemlist.length; i++)
            document.getElementById("fullList").innerHTML +=
            '<tr class="itemToBuy" id="row' + i + '">' +
                '<td class="qantityTD">' +
                '<i class="fa fa-plus-square" aria-hidden="true" onclick="changeValue(this, \'plus\')"></i>' +
                '<input type="number" value="' + quantitylist[i] + '" min="1" class="form-control quantity" disabled>' +
                '<i class="fa fa-minus-square" aria-hidden="true" onclick="changeValue(this, \'minus\')"></i></td>' +
                '</td>' +
                '<td class="picTD">' +
                '<center><img class="thumbnail" src="' + imglist[i] + '"></center></td>' +
                '<td class="itemName">' + itemlist[i] + '</td>' +
                '<td><center><i class="fa fa-times xIcon" aria-hidden="true" onclick="removeItem(this)"></i></center></td>' +
            '</tr>';
    }
};
app.initialize();

function startRecognition(){
    window.plugins.speechRecognition.startListening(function (result) {
        var a = result[0];
        var res = a.split("евн");
        console.log(res);

        itemlist.unshift(result[0]);
        quantitylist.unshift('1');
        localStorage.setItem('items', JSON.stringify(itemlist));
        localStorage.setItem('quantities', JSON.stringify(quantitylist));
        $.ajax({
            type: "GET",
            dataType: "jsonp",
            url: "https://www.googleapis.com/customsearch/v1",
            data: {
            key: "AIzaSyCzb6SI_JRrp6xLLYV617Ary6n59h36ros",
            cx: "004286675445984025592:ypgpkv9fjd4",
            filter: "1",
            searchType: "image",
            //imgSize: "small",
            q: result[0] + " site:https://www.rami-levy.co.il/"
        }
  }).done(function(data) {
  if (data.searchInformation.totalResults == '0') {
      imglist.unshift('https://pbs.twimg.com/profile_images/2260555298/N_A_Facebook_blk_200x200.jpg');
  } else { imglist.unshift(data.items[0].image.thumbnailLink); }

        localStorage.setItem('images', JSON.stringify(imglist));
        document.getElementById("fullList").innerHTML = '';
        for (var i=0; i<itemlist.length; i++)
            document.getElementById("fullList").innerHTML += 
            '<tr class="itemToBuy" id="row'+i+'">' +
                '<td class="qantityTD">' +
                '<i class="fa fa-plus-square" aria-hidden="true" onclick="changeValue(this, \'plus\')"></i>' +
                '<input type="number" value="' + quantitylist[i] + '" min="1" class="form-control quantity" disabled>' +
                '<i class="fa fa-minus-square" aria-hidden="true" onclick="changeValue(this, \'minus\')"></i></td>' +
                '</td>' +
                '<td class="picTD">' +
                '<center><img class="thumbnail" src="' + imglist[i] + '"></center></td>' +
                '<td class="itemName">' + itemlist[i] + '</td>' +
                '<td><center><i class="fa fa-times xIcon" aria-hidden="true" onclick="removeItem(this)"></i></center></td>' +
            '</tr>';
  });
    }, function(err){
        console.error(err);
    }, {
        language: "he-IL",
        showPopup: true
    });
}

function startRecognitionStable() {
}

function emptyList(){
    itemlist = [];
    imglist = [];
    quantitylist = [];

    localStorage.removeItem("items");
    localStorage.removeItem("images");
    localStorage.removeItem("quantities");

    document.getElementById("fullList").innerHTML = '';
}

function emptyListStable() {
}

function removeItem(el){
     removeA(imglist, $(el).parent().parent().parent().find('.thumbnail')[0].currentSrc);
     removeA(itemlist, $(el).parent().parent().parent()[0].innerText.trim());
     removeA(quantitylist, $($(el).parent().parent().parent().find('.quantity')[0]).val());

     localStorage.setItem('items', JSON.stringify(itemlist));
     localStorage.setItem('images', JSON.stringify(imglist));
     localStorage.setItem('quantities', JSON.stringify(quantitylist));

     $(el).parent().parent().parent().remove();
}

function changeValue(el, operator) {
    var value = parseInt($($(el).parent().parent().find('input')[0]).val());
    if (operator == 'plus') $($(el).parent().parent().find('input')[0]).val(value + 1);
    if ((operator == 'minus') && ($($(el).parent().parent().find('input')[0]).val() > 1)) $($(el).parent().parent().find('input')[0]).val(value - 1);

    var $tr = $(el).closest('tr');
    var myRow = $tr.index();
    console.log($tr.attr('id').substr(3));
    quantitylist[$tr.attr('id').substr(3)] = $($(el).parent().parent().find('input')[0]).val();
    localStorage.setItem('quantities', JSON.stringify(quantitylist));

}
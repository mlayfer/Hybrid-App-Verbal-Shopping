function SendRequest(request, successCallBack, failCallBack)
{
    $.ajax({
        url: request.requestUri,
        headers: request.headers,
        method: request.method,
        data: request.data,
        dataType: 'xml',
        certificateSource : request.clientCert,
        success: function (data) {
        	alert("success");
     	   successCallBack(data);
        },
        error: function (data) {
        	alert("fail");
     	   failCallBack();
        }
    });
}
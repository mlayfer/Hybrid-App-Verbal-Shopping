'use strict';
/* Services */
var appServices = angular.module('appServices', []);

appServices.factory('smpManager', function ($rootScope, $q) {
    var factory = {};
    // public properties
    factory.smpUrl = "https://" + "dmp.rakevet.co.il" + ":8082";
    factory.products = {};
    factory.cleanHistory = {};
    factory.jobsTable = {};
    var connectionData = {
        DeviceType: "Android" // Windows, iOS, Android etc
    };
    factory.cleantype = {};
    factory.initFinished = false;
    //SMP SETTINGS
    factory.applicationContext = null;
    var clientCert2 = null;
    //factory.appCID = window.localStorage.getItem("appcid");
    factory.appId = "com.israelrail.as400jobs"; // Change this to app id on server
    // Optional initial connection context
    factory.userName = "";
    factory.dataStr = "";
    factory.context = {
        "serverHost": "dmp.rakevet.co.il", //Place your SMP 3.0 server name here
        "https": "yes",
        "serverPort": "8082",
        "user": "MyUserName", //For demo purposes, specify the user name you wish to register with here to save typing on the device
        "password": "MyPassword",  //Note, if you wish to use this user name and password to be passed to the backend OData producer, choose Basic as the SSO mechanism
        //The read method is sending the user name and password in an Authorization header with each request
        //Alternatively the AuthProxy plugin can respond to 401 challenges automatically when SAPKapselHandleHttpRequests=true
        //once set can be changed by calling sap.Logon.changePassword()
        "communicatorId": "REST",
        "passcode": "password",  //note hardcoding passwords and unlock passcodes are strictly for ease of use during development
                                 //once set can be changed by calling sap.Logon.managePasscode()
        "unlockPasscode": "password",
        "passcode_CONFIRM": "password",
        "ssoPasscode": "Password1"
    };

    factory.ImageGallery = [];
    factory.Places = [];
    factory.OHeaders = {};
    factory.posJson = {latitude: "", longitude: ""};

    var link = "https://dmp.rakevet.co.il:8082/";

    // public methods
    var errorCounter = 0;
    factory.init = function (cb) {
        console.log('blabla:');
        // Integrate datajs with HTTPS proxy
        OData.defaultHttpClient = sap.AuthProxy.generateODataHttpClient();
        if (navigator.platform.indexOf("i") === 0) { //iOS
            sap.AuthProxy.deleteCertificateFromStore(null, function () {
                alert("fail to delete client certificate");
            }, "user1");

            console.log("Running on iOS");
            connectionData.DeviceType = "iOS";
        }
        else {
            console.log("Running on Android");
            connectionData.DeviceType = "Android";
        }
        clientCert2 = new sap.AuthProxy.CertificateFromStore();
        window.localStorage.setItem("clientCert", JSON.stringify(clientCert2));

       // $rootScope.$broadcast('initFinished', true);
        var appCID = window.localStorage.getItem("appcid");
        factory.clientCert = clientCert2;

        if (appCID) {
            console.log("Already Registered");
            initHeader(appCID);
        } else {
            console.log("clientCert1" + JSON.stringify(factory.clientCert));
            //On Android, user must allow the app to use the certificate
            var sUrl = link + "odata/applications/latest/com.israelrail.as400jobs/Connections";
            var oHeaders = {};
            var request = {
                headers: oHeaders,
                certificateSource: factory.clientCert,
                requestUri: sUrl,
                data: connectionData,
                method: "POST"
            };
            console.log("About to register using " + JSON.stringify(request));
            OData.request(request, onSuccessForRegister, onError);
        }

        function onSuccessForRegister(result) {
            errorCounter = 0;
            var appCID2 = result.ApplicationConnectionId;
            window.localStorage.setItem("appcid", appCID2);
            initHeader(appCID2);
        }

        function initHeader(appCID2) {
            var oHeaders = {};
            oHeaders['X-SMP-APPCID'] = appCID2;
            oHeaders['content-type'] = "application/json";
            factory.OHeaders = oHeaders;
            console.log('Factory headers: ' + JSON.stringify(factory.OHeaders));
            factory.appCID = appCID2;
            factory.initFinished = true;
            if (cb) {
                console.log('status: init done');
                cb();
            }
        }

        function onError(error) {
            if ((error.response != null) && (error.response.statusCode != null) && (error.response.statusCode == 200)) {
                //successful unregister appears to call the error callback
                window.localStorage.setItem("appcid", "");
                alert("Successfully Unregistered");
                return;
            }
            console.log('error' + JSON.stringify(error));
            if (errorCounter++ < 3) {
                setTimeout(function () {
                    OData.request(request, onSuccessForRegister, onError);
                }, 1000);
            }

        }
    };

    factory.doRequest = function (url, cb) {
        //$("#loader").show();
        $(document).bind('touchstart', function (e) {
            e.preventDefault()
        });
        factory.clientCert = new sap.AuthProxy.CertificateFromStore();
        console.log("our appCID: " + factory.appCID);
        var request = {
            headers: factory.OHeaders,
            certificateSource: factory.clientCert,
            requestUri: url,
            method: "GET"
        };
        console.log('URL: ' + url);
        console.log('retrievedObject: ' + JSON.stringify(factory.clientCert));
        console.log('Factory headers: ' + JSON.stringify(factory.OHeaders));
        OData.read(request, function (response) {
                //$("#loader").hide();
                $(document).unbind('touchstart');
                if (cb) {
                    cb(response);
                    console.log('cb: ' + JSON.stringify(response));
                }
            }
            , function (error) {
                //$("#loader").hide();
                $(document).unbind('touchstart');
                console.log('retrievedObjectForError: ' + JSON.stringify(error));
                var dialogTitle = window.localStorage.getItem("dialogTitle");
                var dialogText = window.localStorage.getItem("dialogText");
                var dialogApprove = window.localStorage.getItem("dialogApprove");
            }, null);
    };

    factory.readTable = function (cb) {
        var pUrl = link + "com.israelrail.as400jobs/jobsSet('all')?$format=atom";
            var sUrl = encodeURI(pUrl);
        factory.doRequest(sUrl, function (response) {

            console.log('Jobs2: ' + JSON.stringify(response));
            console.log('Jobs3: ' + JSON.stringify(response['strXML']));

            var xmlText4 = JSON.stringify(response['strXML']);
            var xmlText3 = "<ArrayOfJOB>" + xmlText4.substr(139, xmlText4.length);
            xmlText3 = xmlText3.slice(0, -1);
            console.log('Jobs6: ' + xmlText3);

            var xmlDoc = x2js.parseXmlString(xmlText3);
            var jsonObj = x2js.xml2json(xmlDoc);
            console.log('Jobs5: ' + JSON.stringify(jsonObj));

            console.log('Jobs2result: ' + (jsonObj.ArrayOfJOB.JOB).length);
            console.log('Jobs2result: ' + jsonObj.ArrayOfJOB.JOB[0].ACTKEY);
            var Jobs = [];
            for (var i = 0; i < (jsonObj.ArrayOfJOB.JOB).length; i++) {
                var Job = {
                    _ACTKEY: jsonObj.ArrayOfJOB.JOB[i].ACTKEY,
                    _ACTKEY2: jsonObj.ArrayOfJOB.JOB[i].ACTKEY2,
                    _ACTLINE: jsonObj.ArrayOfJOB.JOB[i].ACTLINE,
                    _ACTTYP: jsonObj.ArrayOfJOB.JOB[i].ACTTYP,
                    _ACTDESC: jsonObj.ArrayOfJOB.JOB[i].ACTDESC,
                    _ACTPGM: jsonObj.ArrayOfJOB.JOB[i].ACTPGM,
                    _ACTLIB: jsonObj.ArrayOfJOB.JOB[i].ACTLIB,
                    _ACTJOB: jsonObj.ArrayOfJOB.JOB[i].ACTJOB,
                    _ACTJOBQ: jsonObj.ArrayOfJOB.JOB[i].ACTJOBQ,
                    _ACTLENQ: jsonObj.ArrayOfJOB.JOB[i].ACTLENQ,
                    _ACTSTS: jsonObj.ArrayOfJOB.JOB[i].ACTSTS,
                    _ACTDSP: jsonObj.ArrayOfJOB.JOB[i].ACTDSP,
                    _ACTCOLOR: jsonObj.ArrayOfJOB.JOB[i].ACTCOLOR,
                    _ACTCOLOR2: jsonObj.ArrayOfJOB.JOB[i].ACTCOLOR2,
                    _ACTMSGT: jsonObj.ArrayOfJOB.JOB[i].ACTMSGT,
                    _ACTTFUSA: jsonObj.ArrayOfJOB.JOB[i].ACTTFUSA,
                    _ARMSGSG: jsonObj.ArrayOfJOB.JOB[i].ARMSGSG,
                    _ARMSGDT: jsonObj.ArrayOfJOB.JOB[i].ARMSGDT,
                    _ARMSGTM: jsonObj.ArrayOfJOB.JOB[i].ARMSGTM,
                    _KPALVDT: jsonObj.ArrayOfJOB.JOB[i].KPALVDT,
                    _KPALVTM: jsonObj.ArrayOfJOB.JOB[i].KPALVTM,
                    _KPALVSTS: jsonObj.ArrayOfJOB.JOB[i].KPALVSTS,
                    _KPALVDESC: jsonObj.ArrayOfJOB.JOB[i].KPALVDESC,
                    _DATCHG: jsonObj.ArrayOfJOB.JOB[i].DATCHG,
                    _WSTCHG: jsonObj.ArrayOfJOB.JOB[i].WSTCHG
                };
                Jobs.push(Job);
            }
            factory.jobsTable = Jobs;
            console.log('Jobs2result: ' + JSON.stringify(Jobs));
            window.localStorage.setItem("JobsLocal", JSON.stringify(Jobs));
            if (cb) {
                cb(Jobs);
            }
        });
    };

    factory.makeAction = function (ACTION, ACTJOB, ACTPGM, ACTLIB, ACTKEY, cb) {
        var pUrl = link + "com.israrail.as400runjob/JobSet(ACTION='" + ACTION + "',ACTJOB='" + ACTJOB + "',ACTPGM='" + ACTPGM + "',ACTLIB='" + ACTLIB + "',ACTKEY='" + ACTKEY + "',ACTLEN='0')";
        var sUrl = encodeURI(pUrl);
        factory.doRequest(sUrl, function (response) {
            console.log('waaasdfgsdfaa: ' + JSON.stringify(response));
            if (cb) {
                cb(response);
            }
        });
    };
    return factory;
});

appServices.factory('onlineStatus', ["$window", "$rootScope", function ($window, $rootScope) {
    var onlineStatus = {};
    onlineStatus.onLine = $window.navigator.onLine;
    onlineStatus.isOnline = function () {
        return onlineStatus.onLine;
    };
    $window.addEventListener("online", function () {
        onlineStatus.onLine = true;
        $rootScope.$digest();
    }, true);
    $window.addEventListener("offline", function () {
        onlineStatus.onLine = false;
        $rootScope.$digest();
    }, true);
    return onlineStatus;
}]);

appServices.factory('smpLogger', ['$q', function ($q) {
    // private properties
    var factory = {};
    // public properties
    factory.logMessage = function () {
        var logMessage = document.getElementById("logMessage").value;
        console.log(logMessage);
    };
    factory.logMessage2 = function () {
        var logMessage = document.getElementById("logMessage2").value;
        var level = document.getElementById("level").value;
        if (level === "DEBUG") {
            sap.Logger.debug(logMessage);
        }
        else if (level === "INFO") {
            sap.Logger.info(logMessage);
        }
        else if (level === "WARN") {
            sap.Logger.warn(logMessage);
        }
        else if (level === "ERROR") {
            sap.Logger.error(logMessage);
        }
    };
    factory.uploadLog = function () {
        sap.Logger.upload(function () {
            alert("Upload Successful");
        }, function (e) {
            alert("Upload Failed. Status: " + e.statusCode + ", Message: " + e.statusMessage);
        });
    };
    factory.setLogLevel = function (logLevel) {
        sap.Logger.setLogLevel(logLevel);
        console.log("Log level set to " + logLevel);
        document.getElementById("span1").innerHTML = logLevel;
    };
    factory.getLogLevel = function () {
        sap.Logger.getLogLevel(getLogLevelSuccess, getLogLevelFailure);
    };
    function getLogLevelSuccess(level) {
        document.getElementById("span1").innerHTML = level;
        console.log("Log Level is " + level);
    }

    function getLogLevelFailure(error) {
        alert("Failure in getting log level" + JSON.stingify(error));
    }

    return factory;
}]);

$(document).ready(function () {
    document.addEventListener("deviceready", onDeviceReady, false);

});


var onDeviceReady = function () {
    var $body = angular.element(document.body);
    var $rootScope = $body.scope().$root;
    $rootScope.$broadcast('deviceReady', {});

    document.addEventListener("backbutton", onBackKeyDown, false);
};

var onBackKeyDown = function () {
    var $body = angular.element(document.body);
    var $rootScope = $body.scope().$root;
    $rootScope.$apply(function () {
        $rootScope.$broadcast('backbutton', {});
    });
};
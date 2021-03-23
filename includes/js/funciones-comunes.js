$(function(){
	startEventQuickQuoteSelect();
	startEventPhoneMenu();	
	
});

var facebook = (function () {
    function init() {
        (function (d, s, id) {
            var js,
                fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {
                return;
            }
            js = d.createElement(s);
            js.id = id;
			
			var defaulLocale = "es_ES";
			var fb_locale = MLocale.get("fb_locale");
			if(typeof fb_locale == 'undefined') fb_locale = defaulLocale;
			
            js.src = "//connect.facebook.net/" + fb_locale + "/all.js#xfbml=1";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    }
    return {
        init: init
    };
}());

var twitter = (function () {
    function init() {
        (function (d, s, id) {
            var js,
                fjs = d.getElementsByTagName(s)[0],
                p = /^http:/.test(d.location) ? 'http' : 'https';
            if (!d.getElementById(id)) {
                js = d.createElement(s);
                js.id = id;
                js.src = p + '://platform.twitter.com/widgets.js';
                fjs.parentNode.insertBefore(js, fjs);
            }
        }(document, 'script', 'twitter-wjs'));
    }
    return {
        init: init
    };
}());

var googlePlus = (function () {
    function init() {
		var defaulLocale = "es";
		var gp_locale = MLocale.get("gp_locale");
		if(typeof gp_locale == 'undefined') gp_locale = defaulLocale;
			
        window.___gcfg = {lang: gp_locale};
        (function () {
            var po = document.createElement('script'),
                s = document.getElementsByTagName('script')[0];
            po.type = 'text/javascript';
            po.async = true;
            po.src = 'https://apis.google.com/js/plusone.js';
            s.parentNode.insertBefore(po, s);
        }());
    }
    return {
        init: init
    };
}());

var pinterest = (function () {
    function init() {
        (function (d) {
            var f = d.getElementsByTagName('SCRIPT')[0],
                p = d.createElement('SCRIPT');
            p.type = 'text/javascript';
            p.async = true;
            p.src = '//assets.pinterest.com/js/pinit.js';
            f.parentNode.insertBefore(p, f);
        }(document));
    }
    return {
        init: init
    };
}());

function funcionesLoad() {
    "use strict";

    var sel = {
        selFacebook: '.facebook',
        selTwitter: '.twitter'
    },
        $facebookLength = $(sel.selFacebook).length,
        $twitterLength = $(sel.selTwitter).length;
        
    if ($facebookLength) {facebook.init(); }
    if ($twitterLength) {twitter.init(); }
}



$(window).on("load", funcionesLoad);
 
 
function startEventQuickQuoteSelect(){
	var isMobile = {
		Android: function() {
			return navigator.userAgent.match(/Android/i);
		},
		BlackBerry: function() {
			return navigator.userAgent.match(/BlackBerry/i);
		},
		iOS: function() {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
		Opera: function() {
			return navigator.userAgent.match(/Opera Mini/i);
		},
		Windows: function() {
			return navigator.userAgent.match(/IEMobile/i);
		},
	};
	$('form.select-form select').change(function(){
		var url = $('option:selected',this).val();
		
		if($('option:selected',this).attr('data-ventana')){
			if($('option:selected',this).attr('data-ventana') == "no") {
				$(location).attr('href',url);
			
			} else if($('option:selected',this).attr('data-ventana') == "si") {
				if (isMobile.Android() || isMobile.iOS()) {
					$(location).attr('target','_blank').attr('href',url)
				} else {
					window.open(url,'_blank');
				}
			
			} else {
				$(location).attr('href',url);
			}
		} else {
			$(location).attr('href',url);
		}

	});
}


function startEventPhoneMenu() {
	var cont = 0;
	if($("#phone-menu")) {
		$("div.box b.phone").append($("#phone-menu").text());
	}
}

function loadPhoneNumber() {
	var phoneNumberShow = $("#phone-menu").text();
	var htmlPhone = "";
	
	if($("#phone-menu a").length) {
		var phoneNumberCall = $("#phone-menu a").attr("href");
		htmlPhone = "<a href='"+phoneNumberCall+"'>"+phoneNumberShow+"</a>";
	} else {
		htmlPhone = phoneNumberShow;
	}
	
	if($("#phone-menu")) {
		$("div.col-lg-3 b.phone").append(htmlPhone);
	}
}

function loadClusterExample(urlCluster,parameter) {
var urlClusterGsa = urlCluster+parameter;

$.ajax({
  dataType: 'jsonp',
  url: urlClusterGsa,
  success: function(datos) {
    if(datos.clusters[0].clusters.length>0) $("#cluster_message").css("display","none");
    $.each(datos.clusters[0].clusters, function(idx,primo) {
      var href = "<a href='?q="+primo.label+"'>"+primo.label+"</a>";
      $("ul#cluster_label_container li#cluster_label"+idx).html(href);
    });
  },
  error: function() { alert("Error leyendo fichero jsonP"); }
});

}

function startEventLangReplaceDefault() {
	var valueOption = "";
	$('.language-selector ul li').each(function(i, data) {
		if($(this).find("a").attr("href")) {
			valueOption = $(this).find("a").attr("href");
			valueOption = replaceDefault(valueOption);
			$(this).find("a").attr("href",valueOption);
		}
	});
}

function replaceDefault(urlValue) {
	var lastString = urlValue.substring(urlValue.length-11, urlValue.length);
	if(lastString == "default.jsp") return urlValue.substring(0, urlValue.length-11);
	else return urlValue;
}

function GetURLParameter(sParam)
{
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++)
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam)
        {
            return sParameterName[1];
        }
    }
}


 
 
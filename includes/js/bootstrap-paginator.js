$(function(){
    startEventPaginationManagers2();
});

function startEventPaginationManagers2(){
    var departaments = $(".media-box");
    departaments.each(function(indice, elemento) {
        var numItems = $("#numPage").val();
        var numElements = $("#numtotal").val()
        var numPagTotal = numElements / numItems;
        var divPagination = $(elemento).find("div.pagination ul");
        var page = GetURLParameter('page');
          if (!page){
             page = 1;       
        }
        if(Math.ceil(numPagTotal) > 1) {
            setPagPosition2($(departaments).find("div.pagination ul"), page, Math.ceil(numPagTotal));
            }
    });
    



    function cleanPagination2(posi, numShow) {
        var numItems = $(posi).attr("data");
        var numPagTotal = $(posi).find("article").length / numItems;
        
        $(posi).find("article").each(function() {
            if($(this).attr("data-page") == numShow) {
                $(this).attr("pag-active", "on");
                $(this).css( "display", "block" );
            } else {
                $(this).removeAttr("pag-active");
                $(this).css( "display", "none" );
            }
            
        });
        
       // setPagPosition2($(posi).find("div.pagination ul"), numShow, numPagTotal);
        
    }
    
    function setPagPosition2(posi, numPos, totalPag) {
        var buildHtml = "";
        var currentUrl = document.location.toString();
        var pintarHref = ""; 
        var pintarHrefSplit = ""; 
        if(currentUrl.indexOf('?') > -1){
            if(currentUrl.indexOf('page') > -1){
                pintarHrefSplit = currentUrl.split("page");
                pintarHref = pintarHrefSplit[0];
            }else{
                pintarHref=currentUrl+"&";
            }
        }
        else{
            pintarHref=currentUrl+"?";   
        }
                               
        if(totalPag>5){
            if(numPos <= 3 && numPos > 1) buildHtml += "<li style='cursor:pointer;' data-page='1'><a href="+pintarHref+"page=1>1</a></li>";
            if(numPos > 3) buildHtml += "<li style='cursor:pointer;' data-page='1'><a href="+pintarHref+"page=1>1...</a></li>";
            if(numPos > 2) buildHtml += "<li style='cursor:pointer;' data-page='"+(numPos-1)+"'><a href="+pintarHref+"page="+(numPos-1)+">"+(numPos-1)+"</a></li>";
            buildHtml += "<li><strong>"+numPos+"</strong></li>";
            if(numPos < totalPag && numPos < (totalPag-1)) buildHtml += "<li style='cursor:pointer;' data-info='sig' data-page="+(parseInt(numPos)+1)+"><a href="+pintarHref+"page="+(parseInt(numPos)+1)+">"+(parseInt(numPos)+1)+"</a></li>";
            if(numPos <totalPag){
                if(numPos < (totalPag-2)){ buildHtml += "<li style='cursor:pointer;' data-page='"+totalPag+"'><a href="+pintarHref+"page="+totalPag+">..."+totalPag+"</a></li>";
                }else{ buildHtml += "<li style='cursor:pointer;' data-page='"+totalPag+"'><a href="+pintarHref+"page="+totalPag+">"+totalPag+"</a></li>";}
            }
            $(posi).html(buildHtml);
             $("a.next").attr( "href", "?page="+(parseInt(numPos)+1)+"" );
            $("a.prev").attr( "href", "?page="+(numPos-1)+"" );
        }else{
                                               
                                               for(i=1; i<=totalPag; i++) {
                                                               if(i==numPos) {
                                                                              buildHtml += "<li><strong>"+numPos+"</strong></li>";
                                                               }else{
                                                                              buildHtml += "<li style='cursor:pointer;' data-page='"+i+"'><a href="+pintarHref+"page="+i+">"+i+"</a></li>";
                                                               }
                                               }
                                               
                                               
            $(posi).html(buildHtml);
             $("a.next").attr( "href", "?page="+(parseInt(numPos)+1)+"" );
            $("a.prev").attr( "href", "?page="+(numPos-1)+"" );
        }
           
    }
}


$(document).ready(function() {
    var numItems = $("#numPage").val();
    var numElements = $("#numtotal").val()
    var numPagTotal = numElements / numItems;
    if(numItems){
        var page = GetURLParameter('page');
          if (!page){
             page = 1;       
        }
        if(parseInt(Math.ceil(numPagTotal))<6){
            $("div.pagination a.prev").css( "visibility", "hidden" );
            $("div.pagination a.next").css( "visibility", "hidden" );
        }else{
            if(page > 1){
                $("a.prev").css( "visibility", "visible" );
            }
            if(page < parseInt(Math.ceil(numPagTotal))){
                $("a.next").css( "visibility", "visible" );
            }
        }
    }
});

(function(){

var userId;
function inject(fn) {
    var script = document.createElement('script');
    script.setAttribute("type", "application/javascript");
    script.textContent = '(' + fn + ')();';
    document.body.appendChild(script); // run the script
    document.body.removeChild(script); // clean up
}

function sendBackUserId(){
    if(window.UserContext){
        window.postMessage({type:"userId",content:UserContext.userId},"*");
    }
}

window.addEventListener("message", function(event) {
    if(event.data.type === "userId"){
        userId = event.data.content;
    }
});

inject(sendBackUserId);

Mousetrap.bind(['ctrl+alt+d','command+d'],function(e){
    window.open("/setup/ui/listApexTraces.apexp?user_id="+ userId+"&user_logging=true",'_blank');
});

shortcut('s',"/_ui/platform/schema/ui/schemabuilder/SchemaBuilderUi?setupid=SchemaBuilder");
shortcut('u',"/005?setupid=ManageUsers");
shortcut('o',"/p/setup/custent/CustomObjectsPage");


function shortcut(char,url){
    Mousetrap.bind(['ctrl+alt+' + char,'command+' + char],function(e){
        document.location.assign(url);
     });
}

})();

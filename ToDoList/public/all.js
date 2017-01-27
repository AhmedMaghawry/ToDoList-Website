	$(document).ready(function(){
		$("#addTask").click(function(){
		$("#myModal").hide();
		$("#add").css("visibility","visible");
	});
	});
		$(document).ready(function(){
		$("#cancel").click(function(){
		$("#myModal").hide();
		$("#add").css("visibility","visible");
		});
		});
$(document).ready(function(){
		$("#add").click(function(){
		$("#myModal").show();
		$("#add").css("visibility","hidden");	
		});	
	});
/*$(document).ready(function(){
		$("#dodoo").on('mouseover',function(){
			$("#dodoo").text("ahmed");
		});	
	});*/
        var alltaskslist = [];
        var inProgresslist=[];
        var donelist = [];
        var archived = [];
        var all_all = [];
        var inpro_all = [];
        var do_all = [];
        var arch_all = [];
        var alltasks=0;
        var inprogress=0;
        var done=0;
        var arch=0;
        var count=0;
        var id;
        var name;
        var Des;
        var date;
        var state;
function task(id,name,date,Des,state,count){
    this.id = id;
    this.name = name;
    this.date = date;
    this.Des = Des;
    this.state =state;
    this.count=count;
};
function sendArrays() {
 var arrays = {
  'inProgressArray[]': inProgresslist,
  'completedArray[]': donelist,
'alltaskArray[]':alltaskslist,
  'archivedArray[]': archived,
  'all_all[]': all_all,
  'inpro_all[]': inpro_all,
'do_all[]':do_all,
  'arch_all[]': arch_all
 }
 $.ajax({
  url: "http://127.0.0.1:8081/array",
  type: "POST",
  dataType: 'json',
  contentType: 'application/json',
  data: JSON.stringify(arrays)

 });

}
function addtask(){
    var x1 = document.getElementById("name").value;
    var x2 = document.getElementById("date").value;
    var A1 = document.getElementById("Des").value;
    count = document.getElementById("date").value;
    if(count ==""){
    	count = 999999;
    }
    	if((x1 == "")){
    		alert ("ReEnter the Inputs");
    		$("#form1")[0].reset();	
    	}
    	else{
        var newtask=new task(alltasks,x1,x2,A1,"In Progress",count);
        inProgresslist.push(newtask);
        inpro_all[inprogress]=alltasks;
        alltaskslist.push(newtask);
    all_all[alltasks]=inprogress;
        inprogress++;
        drawInProgressTable();
    alltasks++;
    $("#form1")[0].reset();
    document.getElementById("allt").innerHTML= alltasks;
    document.getElementById("com").innerHTML= done;
    document.getElementById("pro").innerHTML= inprogress;
    document.getElementById("arce").innerHTML= arch;
    }
};
var id2;
var index2;
function Edit_all(id2,index2){
	document.getElementById('id01').style.display='block';
	this.id2=id2;
	this.index2=index2;
};
function edittask(){
    alltaskslist[id2].name=document.getElementById("nameed").value;
    alltaskslist[id2].Des=document.getElementById("Desed").value;
    alltaskslist[id2].date=document.getElementById("dateed").value;
    var x32_1 = document.getElementById("stateinped");
    var x32_2 = document.getElementById("statedoned");
    var x32_3 = document.getElementById("statearced");
    if (x32_1.checked){
        if (alltaskslist[id2].state!="In Progress"){
            if(alltaskslist[id2].state=="Done"){
                donelist.splice(index2,1);
                done--;
                alltaskslist[id2].state=x32_1.value;
                inProgresslist.push(alltaskslist[id2]);
                inprogress++;
                drawAllTasksTable();
            }
            else if (alltaskslist[id2].state=="Archived"){
                archived.splice(index2,1);
                arch--;
                alltaskslist[id2].state=x32_1.value;
                inProgresslist.push(alltaskslist[id2]);
                inprogress++;
                drawAllTasksTable();
            }
        }
        else {
            alltaskslist[id2].state=x32_1.value;
        }
    }
    else if (x32_2.checked) {
       if (alltaskslist[id2].state!="Done"){
            if(alltaskslist[id2].state=="In Progress"){
                inProgresslist.splice(index2,1);
                inprogress--;
                alltaskslist[id2].state=x32_2.value;
                donelist.push(alltaskslist[id2]);
                done++;
                drawAllTasksTable();
            }
            else if (alltaskslist[id2].state=="Archived"){
                archived.splice(index2,1);
                arch--;
                alltaskslist[id2].state=x32_2.value;
                donelist.push(alltaskslist[id2]);
                done++;
                drawAllTasksTable();
            }
        }
        else {
            alltaskslist[id2].state=x32_2.value
        }
    }
    else if (x32_3.checked){
        if (alltaskslist[id2].state!="Archived"){
            if(alltaskslist[id2].state=="In Progress"){
                inProgresslist.splice(index2,1);
                inprogress--;
                alltaskslist[id2].state=x32_3.value;
                archived.push(alltaskslist[id2]);
                arch++;
                drawAllTasksTable();
            }
            else if (alltaskslist[id2].state=="Done"){
                donelist.splice(index2,1);
                done--;
                alltaskslist[id2].state=x32_3.value;
                archived.push(alltaskslist[id2]);
                arch++;
                drawAllTasksTable();
            }
        }
        else {
        alltaskslist[id2].state=x32_3.value;
        }
    }
    $("#formed")[0].reset();
    document.getElementById("allt").innerHTML= alltasks;
    document.getElementById("com").innerHTML= done;
    document.getElementById("pro").innerHTML= inprogress;
    document.getElementById("arce").innerHTML= arch;
    drawAllTasksTable(); 
    document.getElementById('id01').style.display='none';
};
//Archive functions
function Archiveee(id3,index3){
  if (alltaskslist[id3].state=="In Progress"){
      alltaskslist[id3].state="Archived";
      archived.push(alltaskslist[id3]);
      arch_all.push(id3);
      inProgresslist.splice(index3,1);
      inpro_all.splice(id3,1);
      inprogress--;
  }
    else if(alltaskslist[id3].state=="Done"){
     alltaskslist[id3].state="Archived";
     archived.push(alltaskslist[id3]);
     arch_all.push(id3);
     donelist.splice(index3,1);
     do_all.splice(id3,1);
     done--;
  }
  arch++;
  document.getElementById("allt").innerHTML= alltasks;
    document.getElementById("com").innerHTML= done;
    document.getElementById("pro").innerHTML= inprogress;
    document.getElementById("arce").innerHTML= arch;
    drawAllTasksTable();
   
};
function Doneee(id4,index4){
    if (alltaskslist[id4].state=="In Progress"){
      alltaskslist[id4].state="Done";
      donelist.push(alltaskslist[id4]);
      do_all.push(id4);
      inProgresslist.splice(index4,1);
      inpro_all.splice(id4,1);
      inprogress--;
  }
    else if(alltaskslist[id4].state=="Archived"){
     alltaskslist[id4].state="Done";
     donelist.push(alltaskslist[id4]);
     do_all.push(id4);
     archived.splice(index4,1);
     arch_all.splice(id4,1);
     arch--;
  }
  done++;
  document.getElementById("allt").innerHTML= alltasks;
    document.getElementById("com").innerHTML= done;
    document.getElementById("pro").innerHTML= inprogress;
    document.getElementById("arce").innerHTML= arch;
    drawAllTasksTable();
};
function displayInput(){
    var  x= document.getElementById("new");
    x.innerHTML="<form id=\"form\">"
    x.innerHTML+="<input type=\"text\" id=\"name\" > Task Name<br>" ;
    x.innerHTML+="<input type=\"datetime\" id=\"date\"> Date <br>";
    x.innerHTML+="<input type=\"radio\" name=\"state\" id=\"stateinp\" value=\"In Progress\" > In Progress<br>";
    x.innerHTML+="<input type=\"radio\" name=\"state\" id=\"statedon\" value=\"Done\"> Done<br>";
    x.innerHTML+="<input type=\"radio\" name=\"state\" id=\"statearc\" value=\"Archived\"> Archived<br>";
    x.innerHTML+="<input type=\"Submit\" onclick=\"addtask();\"> ";
    x.innerHTML+="</form>"
};
function delete_all_checked(){
	var ch;
	for(var i=0;i<alltaskslist.length;i++){
		 ch= document.getElementById(i+200);
		if (ch.checked){
			Deleted(i,i);
		}
	}
	drawAllTasksTable();
};
function delete_pro_checked(){
	var ch;
	for(var i=0;i<inProgresslist.length;i++){
		 ch= document.getElementById(i);
		if (ch.checked){
			Delete_pro(inpro_all[i],i);
		}
	}
	drawInProgressTable();
};
function delete_com_checked(){
	var ch;
	for(var i=0;i<donelist.length;i++){
		 ch= document.getElementById(i);
		if (ch.checked){
			Delete_do(do_all[i],i);
		}
	}
	drawDoneTable();
};
function delete_arch_checked(){
	var ch;
	for(var i=0;i<archived.length;i++){
		 ch= document.getElementById(i);
		if (ch.checked ){
			Delete_arc(arch_all[i],i);
		}
	}
	drawArchivedTable();
};
function Arc_all_checked(){
	var ch;
	for(var i=0;i<alltaskslist.length;i++){
		 ch= document.getElementById(i);
		if (ch.checked){
			Archiveee(i,all_all[i]);
		}
	}
};
function Arc_pro_checked(){
	var ch;
	for(var i=0;i<inProgresslist.length;i++){
		 ch= document.getElementById(i);
		if (ch.checked){
			Archiveee(inpro_all[i],i);
		}
	}
};
function Arc_com_checked(){
	var ch;
	for(var i=0;i<donelist.length;i++){
		 ch= document.getElementById(i);
		if (ch.checked){
			Archiveee(do_all[i],i);
		}
	}
}
function Arc_arch_checked(){
	var ch;
	for(var i=0;i<archived.length;i++){
		ch= document.getElementById(i);
		if (ch.checked){
			Archiveee(arch_all[i],i);
			i++;
		}
	}
};
function sortAllTasksByName(){
  var temp;
  var i;
  var j;
    for( i=0 ; i<alltaskslist.length ; i++){
        for ( j=0 ; j<alltaskslist.length-1-i ; j++){
            if (alltaskslist[j].name>alltaskslist[j+1].name){
                temp=alltaskslist[j];
                alltaskslist[j]=alltaskslist[j+1];
                alltaskslist[j+1]=temp;
            }
        }
    }
    drawAllTasksTable();
};
function sortInProgressByName(){
  var temp;
  var i;
  var j;
    for(var i=0 ; i<inProgresslist.length ; i++){
        for (var j=0 ; j<inProgresslist.length-1-i ; j++){
            if (inProgresslist[j].name>inProgresslist[j+1].name){
                temp=inProgresslist[j];
                inProgresslist[j]=inProgresslist[j+1];
                inProgresslist[j+1]=temp;
            }
        }
    }
    drawInProgressTable();
};
function sortDoneByName(){
  var temp;
  var i;
  var j;
    for(var i=0 ; i<donelist.length ; i++){
        for (var j=0 ; j<donelist.length-1-i ; j++){
            if (donelist[j].name>donelist[j+1].name){
                temp=donelist[j];
                donelist[j]=donelist[j+1];
                donelist[j+1]=temp;
            }
        }
    }
    drawDoneTable();
};
function sortArchivedByName(){
  var temp;
  var i;
  var j;
    for(var i=0 ; i<archived.length ; i++){
        for (var j=0 ; j<archived.length-1-i ; j++){
            if (archived[j].name>archived[j+1].name){
                temp=archived[j];
                archived[j]=archived[j+1];
                archived[j+1]=temp;
            }
        }
    }
    drawArchivedTable();
};
function sortAllTasksByDate(){
  var temp;
  var i;
  var j;
    for( i=0 ; i<alltaskslist.length ; i++){
        for ( j=0 ; j<alltaskslist.length-1-i ; j++){
            if (alltaskslist[j].count>alltaskslist[j+1].count){
                temp=alltaskslist[j];
                alltaskslist[j]=alltaskslist[j+1];
                alltaskslist[j+1]=temp;
            }
        }
    }
    drawAllTasksTable();
};
function sortInProgressByDate(){
  var temp;
  var i;
  var j;
    for(var i=0 ; i<inProgresslist.length ; i++){
        for (var j=0 ; j<inProgresslist.length-1-i ; j++){
            if (inProgresslist[j].count>inProgresslist[j+1].count){
                temp=inProgresslist[j];
                inProgresslist[j]=inProgresslist[j+1];
                inProgresslist[j+1]=temp;
            }
        }
    }
    drawInProgressTable();
};
function sortDoneByDate(){
  var temp;
  var i;
  var j;
    for(var i=0 ; i<donelist.length ; i++){
        for (var j=0 ; j<donelist.length-1-i ; j++){
            if (donelist[j].count>donelist[j+1].count){
                temp=donelist[j];
                donelist[j]=donelist[j+1];
                donelist[j+1]=temp;
            }
        }
    }
    drawDoneTable();
};
function sortArchivedByDate(){
  var temp;
  var i;
  var j;
    for(var i=0 ; i<archived.length ; i++){
        for (var j=0 ; j<archived.length-1-i ; j++){
            if (archived[j].count>archived[j+1].count){
                temp=archived[j];
                archived[j]=archived[j+1];
                archived[j+1]=temp;
            }
        }
    }
    drawArchivedTable();
};
$(document).ready(function(){
     $('.ahmedee').popover({title: "Header", content: "Blabla", placement: "top" , trigger:"hover"});  
});
//-----------------------------------------------------------------------------------

//-----------------------------------------------------------------------------------
    var i;
function drawAllTasksTable(){ //var text = //document.getElementById("myTable").innerHTML;
    var text2 = "<h1> All Tasks</h1><br>";
	  var text ="<div align=\"right\" class=\"btn-group\">";
	text +="<button type=\"button\" id=\"deletesel\" onclick=\"delete_all_checked();\" class=\"btn btn-primary\"><b>Delete Selected</b></button>";
	text +="<button type=\"button\" id=\"archivesel\" onclick=\"Arc_all_checked();\" class=\"btn btn-primary\">Archive Selected</button>";
	text +="<button type=\"button\" id=\"archivesel\" onclick=\"sortAllTasksByName();\" class=\"btn btn-primary\">Sort By Name</button>";
	text +="<button type=\"button\" id=\"archivesel\" onclick=\"sortAllTasksByDate();\" class=\"btn btn-primary\">Sort By Date</button>";
    text +="<table  width=\"100%\"class=\"ahmed\">";
      text +="<thead>";
    text +="<tr >";
    text +="<th> </th>";
      text +="<th style=\"padding-top:5px;padding-bottom:5px;padding-left:20px;\">Task Name</th>";
      text +="<th style=\"padding-top:5px;padding-bottom:5px;padding-left:20px;\">Due Date</th>";
      text +="<th style=\"padding-top:5px;padding-bottom:5px;padding-left:20px;\">Statue</th>";
      text +="<th> </th>";
    text +="</tr>";
  text +="</thead>";
    for(i = 0; i< alltaskslist.length; i++){
         text +="<tbody>";
    text +="<tr>";
    text +="<td style=\"padding-top:5px;padding-bottom:5px;padding-left:20px;\">";
    text += "<input type=\"checkbox\" id=\"";
      text += i+200+"\"/>";
      text +="</td>";
      text +="<td title=\""+ alltaskslist[i].Des+"\" style=\"padding-top:5px;padding-bottom:5px;padding-left:20px;\">";
      text += "<a class=\"ahmedee\" title=\""+alltaskslist[i].Des+"\">";
      text +=alltaskslist[i].name;
      text += "</a>";
      text +="</td>";
      text +="<td style=\"padding-top:5px;padding-bottom:5px;padding-left:20px;\">";
      text += "<a class=\"ahmedee\" title=\""+alltaskslist[i].Des+"\">";
      text +=alltaskslist[i].date;
      text+="</a>";
      text +="</td>";
      text +="<td style=\"padding-top:5px;padding-bottom:5px;padding-left:20px;\">";
      text += "<a class=\"ahmedee\" title=\""+alltaskslist[i].Des+"\">";
      text +=alltaskslist[i].state;
      text += "</a>";
      text +="</td>";
      text +="<td style=\"padding-top:5px;padding-bottom:5px;padding-left:20px;\">";
      text += "<div class=\"dropdown\" align=\"center\">";
      text +="<a onclick=\"myFunction()\" class=\"dropbtn\" style=\"width: 200px;\" >";
      text +="<i class=\"fa fa-caret-down\" style=\"display: inline;\">";
      text +="</i>";
      text +="<b>";
      text+= "&#8642;";
      text +="</b>";
       text +="</a>";
       text +="<div id=\"myDropdown\" class=\"dropdown-content\">";
       text +="<a href=\"#\" id=\"edit\" onclick=\"Edit_all(";
       text += i+","+all_all[i];
       text +=")\">Edit Task</a>";
       text +="<a href=\"#\" onclick=\"Deleted(";
       text +=i+","+all_all[i];
       text +=");drawAllTasksTable();\">Delete Task</a>";
       text +="<a href=\"#\"onclick=\"Doneee(";
       text+= i+","+all_all[i];
       text+=")\">Mark As Done</a>";
       text +="<a href=\"#\" onclick=\"Archiveee(";
       text+=i+","+all_all[i];
       text+=")\">Archive</a>";
       text +="</div>";
       text +="</div>";
      text +="</td>";
    text +="</tr>";
  text +="</tbody>";      
    }
    text +="</table>";
    document.getElementById("mainTable").innerHTML = text;
    document.getElementById("new").innerHTML = text2;
};
function drawInProgressTable(){ //var text = //document.getElementById("myTable").innerHTML;
    var text2 = "<h1> In Progress Tasks</h1><br><br>";
	  var text ="<div align=\"right\" class=\"btn-group\">";
	text +="<button type=\"button\" id=\"deletesel\" onclick=\"delete_pro_checked();\" class=\"btn btn-primary\"><b>Delete Selected</b></button>";
	text +="<button type=\"button\" id=\"archivesel\" onclick=\"Arc_pro_checked();\" class=\"btn btn-primary\">Archive Selected</button>";
	text +="<button type=\"button\" id=\"archivesel\" onclick=\"sortInProgressByName();\" class=\"btn btn-primary\">Sort By Name</button>";
	text +="<button type=\"button\" id=\"archivesel\" onclick=\"sortInProgressByDate();\" class=\"btn btn-primary\">Sort By Date</button>";
    text +="<table  width=\"100%\"class=\"ahmed\">";
      text +="<thead>";
    text +="<tr >";
    text +="<th> </th>";
      text +="<th style=\"padding-top:5px;padding-bottom:5px;padding-left:20px;\">Task Name</th>";
      text +="<th style=\"padding-top:5px;padding-bottom:5px;padding-left:20px;\">Due Date</th>";
      text +="<th style=\"padding-top:5px;padding-bottom:5px;padding-left:20px;\">Statue</th>";
      text +="<th> </th>";
    text +="</tr>";
  text +="</thead>";
    for(i = 0; i< inProgresslist.length; i++){
         text +="<tbody>";
    text +="<tr class=\"dodo\">";
    text +="<td style=\"padding-top:5px;padding-bottom:5px;padding-left:20px;\">";
    text += "<input type=\"checkbox\" id=\"";
      text += inpro_all[i]+"\"/>";
      text += "</td>";
      text +="<td style=\"padding-top:5px;padding-bottom:5px;padding-left:20px;\">";
      text += "<a class=\"ahmedee\" title=\""+inProgresslist[i].Des+"\">";
      text +=inProgresslist[i].name;
      text +="</a>";
      text +="</td>";
      text +="<td style=\"padding-top:5px;padding-bottom:5px;padding-left:20px;\">";
      text += "<a class=\"ahmedee\" title=\""+inProgresslist[i].Des+"\">";
      text +=inProgresslist[i].date;
      text += "</a>";
      text +="</td>";
      text +="<td style=\"padding-top:5px;padding-bottom:5px;padding-left:20px;\">";
      text += "<a class=\"ahmedee\" title=\""+inProgresslist[i].Des+"\">";
      text +=inProgresslist[i].state;
      text +="</a>";
      text +="</td>";
      text +="<td style=\"padding-top:5px;padding-bottom:5px;padding-left:20px;\">";
      text += "<div class=\"dropdown\">";
      text +="<a onclick=\"myFunction()\" class=\"dropbtn\"style=\"width: 200px\">";
      text +="<i class=\"fa fa-caret-down\"></i>"
      text +="<b>";
      text+= "&#8642;";
      text +="</b>";
       text +="</a>";
       text +="<div id=\"myDropdown\" class=\"dropdown-content\">";
       text +="<a href=\"#\" id=\"edit\" onclick=\"Edit_all(";
       text += inpro_all[i]+","+i;
       text +=")\">Edit Task</a>";
       text +="<a href=\"#\" onclick=\"Delete_pro(";
       text +=inpro_all[i]+","+i;
       text +=");drawInProgressTable();\">Delete Task</a>";
       text +="<a href=\"#\"onclick=\"Doneee(";
       text+= inpro_all[i]+","+i;
       text+=")\">Mark As Done</a>";
       text +="<a href=\"#\" onclick=\"Archiveee(";
       text+=inpro_all[i]+","+i;
       text+=")\">Archive</a>";
       text +="</div>";
       text +="</div>";
      text +="</td>";
    text +="</tr>";
  text +="</tbody>";      
    }
    text +="</table>";
    document.getElementById("mainTable").innerHTML = text;
    document.getElementById("new").innerHTML = text2;
};
function drawDoneTable(){ //var text = //document.getElementById("myTable").innerHTML;
    var text2 = "<h1> Completed Tasks</h1><br><br>";
	  var text ="<div align=\"right\" class=\"btn-group\">";
	text +="<button type=\"button\" id=\"deletesel\" onclick=\"delete_com_checked();\" class=\"btn btn-primary\"><b>Delete Selected</b></button>";
	text +="<button type=\"button\" id=\"archivesel\" onclick=\"Arc_com_checked();\" class=\"btn btn-primary\">Archive Selected</button>";
	text +="<button type=\"button\" id=\"archivesel\" onclick=\"sortDoneByName();\" class=\"btn btn-primary\">Sort By Name</button>";
	text +="<button type=\"button\" id=\"archivesel\" onclick=\"sortDoneByDate();\" class=\"btn btn-primary\">Sort By Date</button>";
    text +="<table  width=\"100%\"class=\"ahmed\">";
      text +="<thead>";
    text +="<tr>";
    text +="<th> </th>";
      text +="<th style=\"padding-top:5px;padding-bottom:5px;padding-left:20px;\">Task Name</th>";
      text +="<th style=\"padding-top:5px;padding-bottom:5px;padding-left:20px;\">Due Date</th>";
      text +="<th style=\"padding-top:5px;padding-bottom:5px;padding-left:20px;\">Statue</th>";
      text +="<th> </th>";
    text +="</tr>";
  text +="</thead>";
    for(i = 0; i< donelist.length; i++){
        text +="<tbody>";
    text +="<tr class=\"line\">";
    text +="<td style=\"padding-top:5px;padding-bottom:5px;padding-left:20px;\">";
    text += "<input type=\"checkbox\" id=\"";
      text += do_all[i]+"\"/>";
      text += "</td>"
      text +="<td style=\"padding-top:5px;padding-bottom:5px;padding-left:20px;\">";
      text += "<a class=\"ahmedee\" title=\""+donelist[i].Des+"\">";
      text +=donelist[i].name;
      text+="</a>";
      text +="</td>";
      text +="<td style=\"padding-top:5px;padding-bottom:5px;padding-left:20px;\">";
      text += "<a class=\"ahmedee\" title=\""+donelist[i].Des+"\">";
      text +=donelist[i].date;
      text+="</a>";
      text +="</td>";
      text +="<td style=\"padding-top:5px;padding-bottom:5px;padding-left:20px;\">";
      text += "<a class=\"ahmedee\" title=\""+donelist[i].Des+"\">";
      text +=donelist[i].state;
      text +="</a>";
      text +="</td>";
      text +="<td>";
      text += "<div class=\"dropdown\">";
      text +="<a onclick=\"myFunction()\" class=\"dropbtn\" style=\"width: 200px\">";
      text +="<i class=\"fa fa-caret-down\"></i>";
      text +="<b>";
      text+= "&#8642;";
      text +="</b>";
       text +="</a>";
       text +="<div id=\"myDropdown\" class=\"dropdown-content\">";
       text +="<a href=\"#\" id=\"edit\" onclick=\"Edit_all(";
       text += do_all[i]+","+i;
       text +=")\">Edit Task</a>";
       text +="<a href=\"#\" onclick=\"Delete_do(";
       text +=do_all[i]+","+i;
       text +=");drawDoneTable();\">Delete Task</a>";
       text +="<a href=\"#\" onclick=\"Archiveee(";
       text+=do_all[i]+","+i;
       text+=")\">Archive</a>";
       text +="</div>";
       text +="</div>";
      text +="</td>";
    text +="</tr>";
  text +="</tbody>";     
    }
    text +="</table>";
    document.getElementById("mainTable").innerHTML = text;
    document.getElementById("new").innerHTML = text2;
};
function drawArchivedTable(){ //var text = //document.getElementById("myTable").innerHTML;
    var text2 = "<h1> Archived Tasks</h1><br><br>";
	  var text ="<div align=\"right\" class=\"btn-group\">";
	text +="<button type=\"button\" id=\"deletesel\" onclick=\"delete_arch_checked();\" class=\"btn btn-primary\"><b>Delete Selected</b></button>";
	text +="<button type=\"button\" id=\"archivesel\" onclick=\"Arc_arch_checked();\" class=\"btn btn-primary\">Archive Selected</button>";
	text +="<button type=\"button\" id=\"archivesel\" onclick=\"sortArchivedByName();\" class=\"btn btn-primary\">Sort By Name</button>";
	text +="<button type=\"button\" id=\"archivesel\" onclick=\"sortArchivedByDate();\" class=\"btn btn-primary\">Sort By Date</button>";
    text +="<table  width=\"100%\"class=\"ahmed\">";
      text +="<thead>";
    text +="<tr>";
    text +="<th> </th>";
      text +="<th style=\"padding-top:5px;padding-bottom:5px;padding-left:20px;\">Task Name</th>";
      text +="<th style=\"padding-top:5px;padding-bottom:5px;padding-left:20px;\">Due Date</th>";
      text +="<th style=\"padding-top:5px;padding-bottom:5px;padding-left:20px;\">Statue</th>";
      text +="<th> </th>";
    text +="</tr>";
  text +="</thead>";
    for(i = 0; i< archived.length; i++){
        text +="<tbody>";
    text +="<tr class=\"dodo\">";
    text +="<td style=\"padding-top:5px;padding-bottom:5px;padding-left:20px;\">";
    text += "<input type=\"checkbox\" id=\"";
      text += arch_all[i]+"\"/>";
      text += "</td>";
      text +="<td style=\"padding-top:5px;padding-bottom:5px;padding-left:20px;\">";
      text += "<a class=\"ahmedee\" title=\""+archived[i].Des+"\">";
      text +=archived[i].name;
      text+="</a>";
      text +="</td>";
      text +="<td style=\"padding-top:5px;padding-bottom:5px;padding-left:20px;\">";
      text += "<a class=\"ahmedee\" title=\""+archived[i].Des+"\">";
      text +=archived[i].date;
      text+="</a>";
      text +="</td>";
      text +="<td style=\"padding-top:5px;padding-bottom:5px;padding-left:20px;\">";
      text += "<a class=\"ahmedee\" title=\""+archived[i].Des+"\">";
      text +=archived[i].state;
      text +="</a>";
      text +="</td>";
      text +="<td>";
      text += "<div class=\"dropdown\">";
      text +="<a onclick=\"myFunction()\" class=\"dropbtn\" style=\"width: 200px\">";
      text +="<i class=\"fa fa-caret-down\"></i>";
      text +="<b>";
      text+= "&#8642;";
      text +="</b>";
       text +="</a>";
       text +="<div id=\"myDropdown\" class=\"dropdown-content\">";
       text +="<a href=\"#\" id=\"edit\" onclick=\"Edit_all(";
       text += arch_all[i]+","+i;
       text +=")\">Edit Task</a>";
       text +="<a href=\"#\" onclick=\"Delete_arc(";
       text +=arch_all[i]+","+i;
       text +=");drawArchivedTable();\">Delete Task</a>";
      text +="<a href=\"#\"onclick=\"Doneee(";
       text+= arch_all[i]+","+i;
       text+=")\">Mark As Done</a>";
       text +="</div>";
       text +="</div>";
      text +="</td>";
    text +="</tr>";
  text +="</tbody>";          
    }
    text +="</table>";
    document.getElementById("mainTable").innerHTML = text;
    document.getElementById("new").innerHTML = text2;
};
/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {

    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}
$('table tr').each(function(){
  $(this).find('th').first().addClass('first');
  $(this).find('th').last().addClass('last');
  $(this).find('td').first().addClass('first');
  $(this).find('td').last().addClass('last');
});

$('table tr').first().addClass('row-first');
$('table tr').last().addClass('row-last');

function Deleted(id,index){
alltaskslist.splice(id,1);
all_all.splice(index,1);
alltasks--;
var resultsub = $.grep(inProgresslist, function(e){ return e.id == id; });
if (resultsub.length == 0){
	resultsub = $.grep(donelist, function(e){ return e.id == id; });
	if(resultsub.length == 0){
		resultsub = $.grep(archived, function(e){ return e.id == id; });
		if(resultsub.length == 1){
			archived.splice(index,1);
			arch_all.splice(id,1);
			arch--;
		}
	}
	else{
		donelist.splice(index,1);
		do_all.splice(id,1);
		done--;
	}
}
else{
inProgresslist.splice(index,1);
inpro_all.splice(id,1);
inprogress--;
}
document.getElementById("allt").innerHTML= alltasks;
    document.getElementById("com").innerHTML= done;
    document.getElementById("pro").innerHTML= inprogress;
    document.getElementById("arce").innerHTML= arch;
}
function Delete_pro(id,index){
alltaskslist.splice(id,1);
alltasks--;
inProgresslist.splice(index,1);
inprogress--;
document.getElementById("allt").innerHTML= alltasks;
document.getElementById("com").innerHTML= done;
document.getElementById("pro").innerHTML= inprogress;
document.getElementById("arce").innerHTML= arch;
}
function Delete_do(id,index){
alltaskslist.splice(id,1);
alltasks--;
donelist.splice(index,1);
done--;
document.getElementById("allt").innerHTML= alltasks;
document.getElementById("com").innerHTML= done;
document.getElementById("pro").innerHTML= inprogress;
document.getElementById("arce").innerHTML= arch;
}
function Delete_arc(id,index){
alltaskslist.splice(id,1);
alltasks--;
archived.splice(index,1);
arch--;
document.getElementById("allt").innerHTML= alltasks;
document.getElementById("com").innerHTML= done;
document.getElementById("pro").innerHTML= inprogress;
document.getElementById("arce").innerHTML= arch;
}
$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip(); 
});

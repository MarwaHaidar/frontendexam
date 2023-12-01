let txtitem=document.getElementById("txtitem")
        let rdfruits=document.getElementById("rdfruits")
        let rdlegumes=document.getElementById("rdlegumes")
        let btnaddspecific=document.getElementById("btnaddspecific")
        let btnaddgeneral=document.getElementById("btnaddgeneral")
        let btnsearch=document.getElementById("btnsearch")
        let btndelete=document.getElementById("btndelete")
        let txtsearch=document.getElementById("txtsearch")
        let divfruits=document.getElementById("divfruits")
        let divlegumes=document.getElementById("divlegumes")
        let divfruitslegumes=document.getElementById("divfruitslegumes")
        let content=""
        window.onload=function(){
             loadlocalstorage();
}

    // Add specific items:

    btnaddspecific.addEventListener("click",function(){
        noduplication()
        if(txtitem.value=="" || (!rdfruits.checked && !rdlegumes.checked)){
            alert("Please enter details")
        }
        else{
            if(rdfruits.checked){
                content="Fruits!-"+txtitem.value;
                data=`<div class="alert alert-info" name="fruits">${content}</div>`
                divfruits.innerHTML+=data
            }
            if(rdlegumes.checked){
                content="Legumes!-"+txtitem.value;
                data=`<div class="alert alert-warning" name="legumes">${content}</div>`
                divlegumes.innerHTML+=data

            }
        }
        rdfruits.checked=false;
        rdlegumes.checked=false;
        txtitem.value="";
        savetolocalstorage();
       
    })
    


    // Add general items:
    btnaddgeneral.addEventListener("click",function(){
        noduplication()
        if(txtitem.value=="" || (!rdfruits.checked && !rdlegumes.checked)){
            alert("Please enter details")
        }
        else{
            if(rdfruits.checked){
                content="Fruits!-"+txtitem.value;
                data=`<div class="alert alert-primary" name="fruits" onclick="movealert(this)">${content}</div>`
                divfruitslegumes.innerHTML+=data;
               
            }
            if(rdlegumes.checked){
                content="Legumes!-"+txtitem.value;
                data=`<div class="alert alert-primary" name="legumes" onclick="movealert(this)">${content}</div>`
                divfruitslegumes.innerHTML+=data;
                
            }
        }
        rdfruits.checked=false;
        rdlegumes.checked=false;
        txtitem.value="";
        savetolocalstorage();
        
    })
    
    
    // Search item
    btnsearch.addEventListener("click", function () {
        
    let searchword = txtsearch.value.toLowerCase();
    

    let mainDivs = document.querySelectorAll('.maindiv');

    mainDivs.forEach(function (mainDiv) {
        let innerDivs = mainDiv.querySelectorAll('.alert');

        innerDivs.forEach(function (innerAlert) {
            let color = innerAlert.style.background;
            
            if (innerAlert.textContent.toLowerCase().includes(searchword)) {
                innerAlert.style.background = 'red';
            } else {
                innerAlert.style.background = color;
            }
        });
        txtsearch.value="";
        
    });
    
  
    
});
txtsearch.addEventListener('keydown', function () {
    mainDivs = document.querySelectorAll('.maindiv');

    mainDivs.forEach(function (mainDiv) {
        let innerDivs = mainDiv.querySelectorAll('.alert');

        innerDivs.forEach(function (innerAlert) {
            

            innerAlert.style.background = "";
        });
    });
});


//movealert function:
function movealert(element) {
    let name = element.getAttribute("name");
    if (name === "fruits") {
        element.className = "alert alert-info"; 
        divfruits.appendChild(element);
    }
    if (name === "legumes") {
        element.className = "alert alert-warning"; 
        divlegumes.appendChild(element);
    }
    savetolocalstorage();
}



// delete function

btndelete.addEventListener("click", function () {
    searchword = txtsearch.value.toLowerCase();
    mainDivs = document.querySelectorAll('.maindiv');

    mainDivs.forEach(function (mainDiv) {
        let innerdivs = mainDiv.querySelectorAll('div');

        innerdivs.forEach(function (innerdiv) {
            if (innerdiv.textContent.toLowerCase().includes(searchword)) {
                let confirmDelete = confirm ("Are you sure you want to delete this item?")
                if(confirmDelete){
                innerdiv.remove();}
            }
        });
    });
    savetolocalstorage();
    txtsearch.value=""
});




// Add to local storage

function savetolocalstorage(){
    localStorage.setItem('fruitsData',JSON.stringify(divfruits.innerHTML))
    localStorage.setItem('legumesData',JSON.stringify(divlegumes.innerHTML))
    localStorage.setItem('fruitslegumesData',JSON.stringify(divfruitslegumes.innerHTML))
}

function loadlocalstorage(){
    let fruitsData=localStorage.getItem('fruitsData')
    if(fruitsData){
        divfruits.innerHTML=JSON.parse(fruitsData)
    }

    let legumesData=localStorage.getItem('legumesData');
    if(legumesData){
        divlegumes.innerHTML=JSON.parse(legumesData);
    }
    let fruitslegumesData=localStorage.getItem('fruitslegumesData')
    if(fruitslegumesData){
        divfruitslegumes.innerHTML=JSON.parse(fruitslegumesData);
    }
}



function noduplication() {
    let item = txtitem.value.toLowerCase();
    mainDivs = document.querySelectorAll('.maindiv');

    for (let i = 0; i < mainDivs.length; i++) {
        innerDivs = mainDivs[i].querySelectorAll('div');

        for (let j = 0; j < innerDivs.length; j++) {
            if (innerDivs[j].textContent.toLowerCase().includes(item)) {
                confirmmsg = confirm("The item exists");
                if (confirmmsg) {
                    txtitem.value = "";
                    return; // Prevent further execution if duplicate found
                }
            }
        }
    }
}





















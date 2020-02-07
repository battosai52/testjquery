import $ from "jquery";

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'popper.js';

import selec from './select';
import changeName from './input';

export const membresDeLaFamille = [
    { name: "Jean", age: 29, jambes: 1 },
    { name: "Tim", jambes: 2, age: 55 },
    { name: "Zoé", jambes: 2, age: 11 },
    { name: "Marie-Lou", jambes: 2, age: 25 },
    { name: "Bernard", jambes: 2, age: 11 },
];

const ageMembre = membresDeLaFamille.filter(e => e.age===11)
console.log(ageMembre)

const map1 = membresDeLaFamille.map((a) => a.name);
console.log(map1)

const found = membresDeLaFamille.find(b => b.jambes === 1);
console.log(found)

const found1 = membresDeLaFamille.find(c => c.name.includes('-'));
console.log(found1)

const even = (d) => ((d.age >20)&&(d.age<30));
console.log(membresDeLaFamille.some(even));

const nombreJambes = (e) => e === 2;
console.log(membresDeLaFamille.every(nombreJambes));

const reducer = (accumulator, f) => accumulator + f.age ;
console.log(membresDeLaFamille.reduce(reducer,0));

const g = membresDeLaFamille.map(({name})=> name)
console.log(g);

const reducer1 = membresDeLaFamille.reduce(function (accumulator, h) {
    accumulator[h.name] = h.age;
    return accumulator;
}, {});
console.log(reducer1);
//construire une liste avec bootstrap et le tableau membresDeLaFamille
let corps=''
 corps+='<table class="table table-striped table-dark" ><thead><tr id="changement"><th scope="col">nom</th><th scope="col">age</th><th scope="col">jambes</th></tr></thead><tbody id="membres"></tbody></table>';
 $('body').first().html(corps);
 let membres='';
 
    

//creer un input qui fais une recherche par prenom

corps+='<div class="input-group"><div class="input-group-prepend"><span class="input-group-text" id="">Prénom</span></div><input type="text" class="form-control" id="nom"></div>';
$('body').first().html(corps);

//créer un select qui contient les choix de proprietes  nom age jambes
corps+='<select class="custom-select" id="selection"><option selected disabled>Choisir</option><option value="name">Nom</option><option value="age">Age</option><option value="jambes">Jambes</option></select>';
corps+='<div id="liste"></div>';
$('body').first().html(corps);
//button+2 inputs

corps+='<div class="input-group mb-3"><button type="button" class="btn btn-primary" id="ajout">Ajout colonne</button><input type="text" class="form-control" placeholder="Nom de la colonne" aria-label="Colonne" aria-describedby="basic-addon1" id="colonne" required><input type="text" class="form-control" placeholder="Proprietes de l\'objet" aria-label="Object" aria-describedby="basic-addon1" id="object" required></div>'
$('body').first().html(corps);

function testObject(){
    let newObject=Object.keys(membresDeLaFamille[0]);
    let verif=false;
    let i=0
    while(i<newObject.length && !verif){
        verif=document.getElementById('object').value===newObject[i] ; 
        i++;

    }
    if(document.getElementById('object').value==='' || verif){
        document.getElementById('object').style.border='red 2px solid';
        return false
    }else{
        document.getElementById('object').style.border='';
        return true;
    }
    
}
document.getElementById('nom').oninput=testObject;

function testColonne(){
    if(document.getElementById('colonne').value===''){
        document.getElementById('colonne').style.border='red 2px solid';
        return false;
    }else{
        document.getElementById('colonne').style.border='';
        return true;
    }
}
document.getElementById('colonne').oninput=testColonne;

function ajouter(){
    testObject();
    testColonne();
    if(testObject() && testColonne()){
    let newObject=Object.keys(membresDeLaFamille[0]);
    let objet=document.getElementById('object').value;
    let nomCol=document.getElementById('colonne').value;
    document.getElementById('changement').innerHTML+='<th scope="col">'+nomCol+'</th>';
    for (let i=0;i<membresDeLaFamille.length;i++){
        membresDeLaFamille[i][objet]='';
        document.getElementById('l'+i).innerHTML+='<td id="c'+newObject.length+'">'+membresDeLaFamille[i][objet]+'</td>';

    }
    document.getElementById('object').value='';
    document.getElementById('colonne').value='';
    for (let i=0;i<document.getElementsByTagName('td').length;i++){
        document.getElementsByTagName('td')[i].onclick=modif;
    }
}else{
    alert('la propriété ou le nom de la colonne existe déjà');
}
}
document.getElementById('ajout').onclick=ajouter;



//affichage tableau et activation des boutons
for (let i=0;i<membresDeLaFamille.length;i++){ 
    membres+='<tr id="l'+i+'"><td id="c0">'+membresDeLaFamille[i].name+'</td><td id="c1">'+membresDeLaFamille[i].age+'</td><td id="c2">'+membresDeLaFamille[i].jambes+'</td></tr>'
    }
$('#membres').html(membres);





document.getElementById('nom').oninput=changeName;
document.getElementById('selection').onchange=selec;

export function modif(e){
   let newObject=Object.keys(membresDeLaFamille[0])
   let valTab=prompt('Par quel valeur voulez vous remplacer le contenu de la case ?');
   e.target.innerHTML = valTab;
    let col = newObject[(e.target.id.substring(1))];
    let row = (e.target.parentNode.id.substring(1));
    membresDeLaFamille[row][col]=valTab;
 
}   
 
for (let i=0;i<document.getElementsByTagName('td').length;i++){
document.getElementsByTagName('td')[i].onclick=modif;
}

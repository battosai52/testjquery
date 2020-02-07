import {membresDeLaFamille , modif} from './machin';
import $ from "jquery";
export default function changeName(){
    let row='';
    let newObject=Object.keys(membresDeLaFamille[0]);
    let res=membresDeLaFamille.filter(prenom=>prenom.name.toLowerCase().includes($('#nom').val().toLowerCase()));
    for(let i= 0;i<res.length;i++){
        row+='<tr id="ligne'+i+'">';
        for (let j=0;j<newObject.length;j++){
       let variable=newObject[j];
        row+='<td id="'+j+'">'+res[i][variable]+'</td>';
    }
    row+='</tr>';
}
    $('#membres').html('');
    $('#membres').html(row);
    for (let i=0;i<document.getElementsByTagName('td').length;i++){
        document.getElementsByTagName('td')[i].onclick=modif;
        }
}
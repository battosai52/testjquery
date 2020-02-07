import {membresDeLaFamille} from './machin';
import $ from "jquery"
export default function selec(){


$('#liste').html('<ul class="list-group" id="membres2"></ul>');
let valeur=$('#selection option:checked').val();
let row='';
for(let i=0;i<membresDeLaFamille.length;i++){
    row+='<li class="list-group-item list-group-item-success">'+membresDeLaFamille[i][valeur]+'</li>';
}
$('#membres2').html(row);
}

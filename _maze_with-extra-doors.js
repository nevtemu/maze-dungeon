const field = document.getElementById("gameField");
const CELLS_COUNT = 20;
const BLOCKED_CELLS = 40;
const EXTRA_PASSAGE = 30;
for (let i=1; i<=CELLS_COUNT; i++){
    for(let j=1; j<=CELLS_COUNT; j++){
        let out = `<div class="node" id="${i}.${j}" style="grid-row: ${i}; grid-column: ${j};"></div>`;
        field.innerHTML+=out;
    }
}
let visited = [];
let pass = [];
function blockRandom (times){
    for (let i=1; i<=times; i++){
        let cell
        do{cell = document.getElementById(`${getRandom(1,CELLS_COUNT)}.${getRandom(1,CELLS_COUNT)}`);}
        while(visited.includes(cell.id))
        visited.push(cell.id);
        cell.style.backgroundColor="black";
    }
}
blockRandom(BLOCKED_CELLS)

function visit (y, x){
    if(visited.length<Math.pow(CELLS_COUNT,2)){
        let cell = document.getElementById(`${y}.${x}`);
        if (!visited.includes(cell.id)){
            visited.push(cell.id);
            pass.push(cell.id);
            cell.style.backgroundColor = "wheat";
        }
        let ways = [];
        let u = document.getElementById(`${y-1}.${x}`);
        let d = document.getElementById(`${y+1}.${x}`);
        let l = document.getElementById(`${y}.${x-1}`);
        let r = document.getElementById(`${y}.${x+1}`);
        if (u){ if(!visited.includes(u.id)){ways.push('u');}}
        if (d){ if(!visited.includes(d.id)){ways.push('d');}}
        if (l){ if(!visited.includes(l.id)){ways.push('l');}}
        if (r){ if(!visited.includes(r.id)){ways.push('r');}}
        if (ways.length >= 1){
            let direction = ways[getRandom(0, ways.length-1)]
            switch (direction){
                case 'u':
                    cell.style.borderTop = '1px solid wheat';
                    u.style.borderBottom = '1px solid wheat';
                    visit(y-1, x);
                    break;
                case 'd':
                    cell.style.borderBottom = '1px solid wheat';
                    d.style.borderTop = '1px solid wheat';
                    visit(y+1, x);
                    break;
                case 'l':
                    cell.style.borderLeft = '1px solid wheat';
                    l.style.borderRight = '1px solid wheat';
                    visit(y, x-1);
                    break;
                case 'r':
                    cell.style.borderRight = '1px solid wheat';
                    r.style.borderLeft = '1px solid wheat';
                    visit(y, x+1);
                    break;
            }
        }
        else {
            let newCell = visited[getRandom(0, visited.length -1)];
            let newX = newCell.split(".")[1];
            let newY = newCell.split(".")[0];
            visit(parseInt(newY), parseInt(newX))
        }
    }
    else {
        console.log(new Set(visited).size == visited.length)
    }
}
visit(1,1); //start point
function createExtraPassages (EXTRA_PASSAGE){
    for (let i=1; i<=EXTRA_PASSAGE; i++){
        let newDoor = pass[getRandom(0, pass.length -1)];
        let x = parseInt(newDoor.split(".")[1]);
        let y = parseInt(newDoor.split(".")[0]);
        let cell = document.getElementById(`${y}.${x}`);
        let ways = [];
        let u = document.getElementById(`${y-1}.${x}`);
        let d = document.getElementById(`${y+1}.${x}`);
        let l = document.getElementById(`${y}.${x-1}`);
        let r = document.getElementById(`${y}.${x+1}`);
        if (u){ if(pass.includes(u.id)){ways.push('u');}}
        if (d){ if(pass.includes(d.id)){ways.push('d');}}
        if (l){ if(pass.includes(l.id)){ways.push('l');}}
        if (r){ if(pass.includes(r.id)){ways.push('r');}}
        if (ways.length >= 1){
            let direction = ways[getRandom(0, ways.length-1)]
            switch (direction){
                case 'u':
                    cell.style.borderTop = '1px solid wheat';
                    u.style.borderBottom = '1px solid wheat';
                    break;
                case 'd':
                    cell.style.borderBottom = '1px solid wheat';
                    d.style.borderTop = '1px solid wheat';
                    break;
                case 'l':
                    cell.style.borderLeft = '1px solid wheat';
                    l.style.borderRight = '1px solid wheat';
                    break;
                case 'r':
                    cell.style.borderRight = '1px solid wheat';
                    r.style.borderLeft = '1px solid wheat';
                    break;
            }
        }
        else {
            i--;
        }
    }
}
function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min +1)) + min}
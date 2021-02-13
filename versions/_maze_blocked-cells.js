const field = document.getElementById("gameField");
const CELLS_COUNT = 20;
const BLOCKED_CELLS = 30;
for (let i=1; i<=CELLS_COUNT; i++){
    for(let j=1; j<=CELLS_COUNT; j++){
        let out = `<div class="node" id="${i}.${j}" style="grid-row: ${i}; grid-column: ${j};"></div>`;
        field.innerHTML+=out;
    }
}
let visited = [];
let passable = [];
function blockRandom (times){
    for (let i=1; i<=times; i++){
        let cell;
        let neighbors;
        do{
            neighbors = [];
            let x = getRandom(2,CELLS_COUNT); //to not block 1st cell - starting point of maze
            let y = getRandom(2,CELLS_COUNT);
            cell = document.getElementById(`${y}.${x}`);
            let u = document.getElementById(`${y-1}.${x}`);
            let d = document.getElementById(`${y+1}.${x}`);
            let l = document.getElementById(`${y}.${x-1}`);
            let r = document.getElementById(`${y}.${x+1}`);
            let ul = document.getElementById(`${y-1}.${x-1}`);
            let ur = document.getElementById(`${y-1}.${x+1}`);
            let dr = document.getElementById(`${y+1}.${x+1}`);
            let dl = document.getElementById(`${y+1}.${x-1}`);
            if (u){ if(visited.includes(u.id)){neighbors.push('u');}}
            if (d){ if(visited.includes(d.id)){neighbors.push('d');}}
            if (l){ if(visited.includes(l.id)){neighbors.push('l');}}
            if (r){ if(visited.includes(r.id)){neighbors.push('r');}}            
            if (ur){ if(visited.includes(ur.id)){neighbors.push('ur');}}            
            if (ul){ if(visited.includes(ul.id)){neighbors.push('ul');}}            
            if (dr){ if(visited.includes(dr.id)){neighbors.push('dr');}}            
            if (dl){ if(visited.includes(dl.id)){neighbors.push('dl');}}  
            console.log(neighbors)          
        }
        while(visited.includes(cell.id) || neighbors.length > 1)
        visited.push(cell.id);
        cell.style.backgroundColor="black";
    }
}
blockRandom(BLOCKED_CELLS)
let next;
function visit (y, x){
    if(visited.length<Math.pow(CELLS_COUNT,2)){
        let cell = document.getElementById(`${y}.${x}`);
        console.log(cell.id)
        if (!visited.includes(cell.id)){
            visited.push(cell.id);
            passable.push(cell.id)
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
            let newCell = passable[getRandom(0, passable.length -1)];
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
function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min +1)) + min}
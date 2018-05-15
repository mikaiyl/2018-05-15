    /*
     *      Includes
     */

const mazeArray = [ [ 'W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W' ],
                    [ 'W',' ',' ',' ','W',' ',' ',' ',' ',' ','W',' ',' ',' ',' ',' ','W',' ','W',' ','W' ],
                    [ 'W',' ','W',' ','W',' ','W','W','W',' ','W','W','W','W','W',' ','W',' ','W',' ','W' ],
                    [ 'W',' ','W',' ','W',' ',' ',' ','W',' ',' ',' ',' ',' ','W',' ','W',' ',' ',' ','W' ],
                    [ 'W',' ','W','W','W','W','W','W','W',' ','W',' ','W','W','W',' ','W',' ','W',' ','W' ],
                    [ 'W',' ',' ',' ',' ',' ',' ',' ',' ',' ','W',' ',' ',' ',' ',' ','W',' ','W',' ','W' ],
                    [ 'W',' ','W','W','W',' ','W','W','W','W','W',' ','W','W','W','W','W',' ','W',' ','W' ],
                    [ 'W',' ','W',' ',' ',' ','W',' ',' ',' ','W',' ','W',' ',' ',' ',' ',' ','W',' ','W' ],
                    [ 'W',' ','W','W','W','W','W',' ','W',' ','W',' ','W',' ','W','W','W',' ','W',' ','F' ],
                    [ 'C',' ',' ',' ',' ',' ','W',' ','W',' ','W',' ','W',' ','W',' ','W',' ','W','W','W' ],
                    [ 'W','W','W','W','W',' ','W',' ','W',' ','W',' ','W',' ','W',' ','W',' ','W',' ','W' ],
                    [ 'W',' ',' ',' ',' ',' ','W',' ','W',' ','W',' ',' ',' ','W',' ','W',' ','W',' ','W' ],
                    [ 'W',' ','W','W','W','W','W','W','W',' ','W','W','W','W','W',' ','W',' ','W',' ','W' ],
                    [ 'W',' ',' ',' ',' ',' ',' ',' ','W',' ',' ',' ',' ',' ',' ',' ','W',' ',' ',' ','W' ],
                    [ 'W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W' ] ]

const state = {
    charCol: 0,
    charRow: 9,
    maze: document.getElementById("maze"),
    charachter: document.createElement("div"),
}

state.charachter.id = "running-man";

    /*
     *      Setup
     */

/*
    Create DOM maze from maze array
*/

const printMazeToDOM = () => {
    for ( let mazeArrayRowIndex in mazeArray ) {

        let DOMRow = document.createElement("div");
        DOMRow.id = "r" + mazeArrayRowIndex;
        DOMRow.classList.add("row");
        
        for ( let mazeArrayColumnIndex in mazeArray[mazeArrayRowIndex] ){
            // create elements for flexbox
            let rowIndex = parseInt(mazeArrayRowIndex);
            let columnIndex = parseInt(mazeArrayColumnIndex);

            let DOMcell = document.createElement("div");
            DOMcell.classList.add("cell");
            
            DOMcell.classList.add("r" + mazeArrayRowIndex);
            DOMcell.classList.add("c" + mazeArrayColumnIndex);

            if ( mazeArray[mazeArrayRowIndex][mazeArrayColumnIndex] === "W" ) {
                DOMcell.dataset.wall = true;
            }
            DOMRow.appendChild(DOMcell);
        }
        state.maze.appendChild(DOMRow);
    }
    state.maze.querySelector("div#r9 div.c0").appendChild(state.charachter);
}

/*
    Listen for the movement keys and move the charachter appropriately.
*/

document.addEventListener('keydown', (event) => {
    const keyName = event.key;
    const waitTime = 230;

    if ( keyName == "ArrowDown" ) {
        if ( mazeArray[state.charRow+1][state.charCol] !== "W" && state.charRow < 14) {
            state.charRow += 1;
            state.charachter.style.transform = "rotate(0.25turn)";
            state.charachter.classList.add("animateS");
            setTimeout(() => unAnimate("S",moveMan()), waitTime);
        }
    } else if ( keyName == "ArrowUp" ) {
        if ( mazeArray[state.charRow-1][state.charCol] !== "W" && state.charRow > 0) {        
            state.charRow -= 1;
            state.charachter.style.transform = "rotate(-0.25turn)";
            state.charachter.classList.add("animateN");
            setTimeout(() => unAnimate("N",moveMan()), waitTime);
        }
    } else if ( keyName == "ArrowLeft" ) {
        if ( mazeArray[state.charRow][state.charCol-1] !== "W" && state.charCol > 0) {        
            state.charCol -= 1;
            state.charachter.style.transform = "scaleX(-1)";
            state.charachter.classList.add("animateW");
            setTimeout(() => unAnimate("W",moveMan()), waitTime);
        }
    } else if ( keyName == "ArrowRight" ) {
        if ( mazeArray[state.charRow][state.charCol+1] !== "W" && state.charCol < 20) {        
            state.charCol += 1;
            state.charachter.style.transform = "rotate(0turn)";
            state.charachter.classList.add("animateE");
            setTimeout(() => unAnimate("E",moveMan()), waitTime);
        }
    }
});

document.addEventListener('keyup', (event) => {
    if ( mazeArray[state.charRow][state.charCol] === "F" ) {
        // Call win function
        win();
    }
});

const win = () => {
    alert("You won!");
    state.maze.innerHTML = "";
    printMazeToDOM();
    state.charCol = 0;
    state.charRow = 9; 
}

const moveMan = () => {
    state.maze.querySelector("div.cell.r" + state.charRow + ".c" + state.charCol).appendChild(state.charachter);
}

const unAnimate = ( dir) => {
    if (dir === "N") {
        state.charachter.classList.remove("animateN");
    } else if (dir === "S") {
        state.charachter.classList.remove("animateS");
    } else if (dir === "E") {
        state.charachter.classList.remove("animateE");
    } else if (dir === "W") {
        state.charachter.classList.remove("animateW");
    }
}

    /*
     *      Main
     */

(() => {
    printMazeToDOM();
})();
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
}

    /*
     *      Setup
     */

/*
    Create DOM maze from maze array
*/

const printMazeToDOM = () => {
    for (let mazeArrayRowIndex in mazeArray) {
        for (let mazeArrayColumnIndex in mazeArray[mazeArrayRowIndex] ){
            // create elements add 1 so css grid starts at 1 not 0
            let row = parseInt(mazeArrayRowIndex) + 1;
            let column = parseInt(mazeArrayColumnIndex) + 1;
            let cell = document.createElement("div");
            cell.style.gridRow = row;
            cell.style.gridColumn = column;

            if ( mazeArray[mazeArrayRowIndex][mazeArrayColumnIndex] === "W" ) {
                cell.style.zIndex = 2;
                cell.dataset.wall = "true";
            } else if ( mazeArray[mazeArrayRowIndex][mazeArrayColumnIndex] === "C" ) {
                cell.id = "running-man";
            }

            state.maze.appendChild(cell);
        }
    }
    state.charachter = document.getElementById("running-man");
}

/*
    Listen for the movement keys and move the charachter appropriately.
*/

document.addEventListener('keydown', (event) => {
    const keyName = event.key;

    if ( keyName == "ArrowDown" ) {
        if ( mazeArray[state.charRow+1][state.charCol] !== "W") {
            state.charRow += 1;
            state.charachter.style.gridRow = state.charRow + 1;
            state.charachter.style.transform = "rotate(0.25turn)";
        }
    } else if ( keyName == "ArrowUp" ) {
        if ( mazeArray[state.charRow-1][state.charCol] !== "W" ) {        
            state.charRow -= 1;
            state.charachter.style.gridRow = state.charRow + 1;
            state.charachter.style.transform = "rotate(-0.25turn)";
        }
    } else if ( keyName == "ArrowLeft" ) {
        if ( mazeArray[state.charRow][state.charCol-1] !== "W" ) {        
            state.charCol -= 1;
            state.charachter.style.gridColumn = state.charCol + 1;
            state.charachter.style.transform = "scaleX(-1)";
        }
    } else if ( keyName == "ArrowRight" ) {
        if ( mazeArray[state.charRow][state.charCol+1] !== "W" ) {        
            state.charCol += 1;
            state.charachter.style.gridColumn = state.charCol + 1;
            state.charachter.style.transform = "rotate(0turn)";
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
}

    /*
     *      Main
     */

(() => {
    printMazeToDOM();
})();
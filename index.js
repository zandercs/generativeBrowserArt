(function() {
    
    // CONFIG
    let gridSize = 10;

    resetFontSize();

    window.addEventListener("resize", resetFontSize);

    function resetFontSize() {
        if (window.innerHeight <= window.innerWidth){
            document.querySelector("body").style.fontSize = (window.innerHeight / gridSize) + "px";
        } else {
            document.querySelector("body").style.fontSize = (window.innerWidth / gridSize) + "px";
        }
    }

    // CONFIG
    const defaultBlankCharFreq = 0;

    let intervals = [];

    // "⯐" : "⛋" ▩
    const nbsp = "&nbsp";
    
    const blackSq = "■";
    const whiteSq = "□";

    const hatchSq = "▩";

    const squares = ["⯐", "⛋", "▣","▤","▥","▦","▪","▫","◧","◨","◩","◪","◫","◰","◱","◲","◳","⛶","❏","❐","❑","❒","⟤","⟥", blackSq, whiteSq];

    // const triangles = ["⟁","⛛","◭","▴","▲","△","◢","◣","◤","◥","◬","⧊","⧎"];
    // Triangles from i2symbol.com
    const i2triangles = ["◄","▲","▼","►","◣","◥","▸","▾","▴","◂","◢","◤","◁","△","▽","▷","∆","∇","▻","◅","⊵","⊴","⊲","⊳","▵","▿","◃","▹","◭","◮","⋫","⋪","⋗","⋖","⫸","⫷","⋬","⋭","⊿","◬","≜","⑅"];
    const i2trianglesAbridged = ["◄","▲","▼","►","◣","◥","▸","▾","▴","◂","◢","◤","◁","△","▽","▷","∆","∇","▻","◅","⊲","⊳","▵","▿","◃","▹","◭","◮","⋗","⋖","⫸","⫷","⊿","◬","≜","⑅"];
    const triangles = ["⟁","⛛","◭","◮","▴","▲","△","◢","◣","◤","◥","◬","⧊","⧎","◀","◁","◂","◃","⧏","⧐","⧨","⧩","◸","◹","◺","◿","⟁"];
    const angledTriangles = ["◢","◣","◤","◥"];

    const trigrams = ["☰","☲","☱","☷","☳","☶","☵","☴"];

    const shades = ["░","▒","▓"];

    const countdown = ["5","4","3","2","1"];

    const colorPallette1 = ["#ff00ff", "#0CCDDB", "#FFF", "#2C1679"];

    const colorPallette2 = ["#ff00ff", "#FFF", "#0CCDDB"];

    // CONFIG
    const blankChar = nbsp;
    const blankColor = "#0CCDDB";

    let updateGridOrderedPosition = 0;

    let grid = document.getElementById("grid");

    grid.style.width = gridSize + "em";
    grid.style.height = gridSize + "em";


    // Set default color for Background Tiles
    document.body.style.color = blankColor;

    for (let rowNum = 0; rowNum < gridSize; rowNum++) {
        let row = document.createElement("div");
        row.className = "row";
        row.id = "row-" + rowNum;

        for (let colNum = 0; colNum < gridSize; colNum++) {
            let cell = document.createElement("div");
            let className = "cell";

            // console.log(rowNum)
            // console.log(rowNum > (gridSize / 2))
            
            if (colNum >= (gridSize / 2)) {
                // className += " backward";
                if (rowNum >= (gridSize / 2)) {
                    className += " bottomRight";
                } else {
                    className += " topRight";
                }
            } else {
                if (rowNum >= (gridSize / 2)) {
                    className += " bottomLeft";
                } else {
                    className += " topLeft";
                }
            }
            
            // if (rowNum >= (gridSize / 2)) {
            //     className += " upsideDown";
            // }
            cell.className = className;
            // cell.className = "cell";

            cell.id = rowNum + "-" + colNum;
            // cell.innerHTML = i % 2 == 0 ? blackSq : whiteSq;
            cell.innerHTML = blankChar;
            
            row.appendChild(cell);
        }

        grid.appendChild(row);
    }

    startRender();

    let pauseInterval = setInterval(()=>toggleRender(), 2500);

    // window.addEventListener("click", toggleRender);
    document.addEventListener("click", toggleFullScreen);

    function toggleFullScreen() {
        if (document.fullscreenElement) {
            document.exitFullscreen();
        } else {
            document.querySelector("body").requestFullscreen();
        }
    }
    
    function toggleRender(){
        if (intervals.length > 0) {
            stopRender();
        } else {
            startRender();
        }
    }

    function startRender() {

        // intervals.push(setInterval(updateGrid, 100, i2trianglesAbridged, colorPallette2, (i2trianglesAbridged.length * 2)));
        // intervals.push(setInterval(updateGrid, 150, squares.concat(trigrams), colorPallette1, squares.length + trigrams.length));
        // intervals.push(setInterval(updateGrid, 250, squares, colorPallette2, defaultBlankCharFreq));
        // intervals.push(setInterval(updateGrid, 200, triangles, colorPallette1, triangles.length));

        intervals.push(setInterval(updateGrid, 300, i2trianglesAbridged, colorPallette2, (i2trianglesAbridged.length * 2)));
        intervals.push(setInterval(updateGrid, 200, squares.concat(trigrams), colorPallette1, squares.length + trigrams.length));
        intervals.push(setInterval(updateGrid, 1500, squares, colorPallette2, defaultBlankCharFreq));
        intervals.push(setInterval(updateGrid, 1000, triangles, colorPallette1, triangles.length));

        // intervals.push(setInterval(updateGridOrdered, 250, angledTriangles, colorPallette1));
        // intervals.push(setInterval(updateGridExperiment, 150, countdown));
    }

    function stopRender() {
        intervals.forEach(interval => {
            clearInterval(interval);
        });
        intervals = [];
    }

    function updateGridOrdered(characterArr, colorPallette) {
        if (updateGridOrderedPosition > (characterArr.length-1)) {
            updateGridOrderedPosition = 0;
        }
        let cells = document.querySelectorAll(".cell");

        updateCells(cells, colorPallette, characterArr);
        updateGridOrderedPosition += 1;
    }
    

    function updateGrid(characterArr, colorPallette, blankCharFrequency) {

        let randomRow = getRandomInt((gridSize / 2));
        let randomCell = getRandomInt((gridSize / 2));
        let randomCellOp = (gridSize - 1) - randomCell;
        let randomRowOp = (gridSize - 1) - randomRow;

        let cells = [];
        cells.push(document.getElementById(randomRow + "-" + randomCell));
        cells.push(document.getElementById(randomRow + "-" + randomCellOp));
        cells.push(document.getElementById(randomRowOp + "-" + randomCell));
        cells.push(document.getElementById(randomRowOp + "-" + randomCellOp));

        let randomCharacter = getRandomInt(characterArr.length + blankCharFrequency);
        let character = randomCharacter < characterArr.length ? characterArr[randomCharacter] : blankChar;

        let color = hexToRGB(character === blankChar ? blankColor : colorPallette[getRandomInt(colorPallette.length)], 50);

        cells.forEach(cell => {
            // cell.innerHTML = "<span>" + character + "</span>";
            cell.innerHTML = character;
            updateCellColor(cell, color);
        });
    }

    function updateCells(cells, colorPallette, characterArr) {
        cells.forEach(cell => {
            cell.innerHTML = characterArr[updateGridOrderedPosition];
            updateCellColor(cell, colorPallette[getRandomInt(colorPallette.length)]);
        });
    }

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    function updateCellColor(cell, color) {
        cell.style.color = color;
    }

    function hexToRGB(hex, alpha) {
        var r = parseInt(hex.slice(1, 3), 16),
            g = parseInt(hex.slice(3, 5), 16),
            b = parseInt(hex.slice(5, 7), 16);
    
        if (alpha) {
            return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
        } else {
            return "rgb(" + r + ", " + g + ", " + b + ")";
        }
    }
    
 
 })();
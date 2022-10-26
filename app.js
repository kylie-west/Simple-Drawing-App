// Define UI elements
const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');
const pencilButton = document.querySelector('#pencil');
const eraserButton = document.querySelector('#eraser');
const clearButton = document.querySelector('#clear');
const toolSizeInput = document.querySelector('#size-input');
const colorInput = document.querySelector('#current-color');

window.addEventListener('load', () => {
    
    // Set canvas dimensions
    canvas.height = 600;
    canvas.width = 800;

    // Variables
    let isDrawing = false;
    let pencilActive = true;
    let eraserActive = false;

    function getMousePosition(canvas, e){
        const canvasRect = canvas.getBoundingClientRect();
        return {
            x: e.clientX - canvasRect.left,
            y: e.clientY - canvasRect.top
        };
    }

    pencil(); // Sets pencil as default tool

    // Drawing functions

    function startPosition(e){
        isDrawing = true;
        draw(e);
    }
    function draw(e){
        let mousePosition = getMousePosition(canvas, e);
        let positionX = mousePosition.x + 14;
        let positionY = mousePosition.y + 14;
        
        if(!isDrawing) return;

        // Default stroke styling
        ctx.lineWidth = toolSizeInput.value;
        ctx.lineCap = 'round';

        // Create stroke
        ctx.lineTo(positionX, positionY);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(positionX, positionY);
    }
    function finishedPosition(){
        isDrawing = false;
        ctx.beginPath(); // resets the path
    }
    

    // Toolbar functions

    function clearCanvas(){
        ctx.clearRect(0,0,800,600);
    }
    function eraser(){
        ctx.strokeStyle = '#fff';
        toolSizeInput.value = 60;
        eraserActive = true;
        pencilActive = false;
    }
    function pencil(){
        toolSizeInput.value = 2;
        ctx.strokeStyle = colorInput.value;
        pencilActive = true;
        eraserActive = false;
    }
    
    // Canvas event listeners
    canvas.addEventListener('mousedown', startPosition);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', finishedPosition);

    // Toolbar event listeners
    eraserButton.addEventListener('click', eraser)
    pencilButton.addEventListener('click', pencil)
    clearButton.addEventListener('click', clearCanvas)

    // Color change event listener
    colorInput.addEventListener('change', function(){
        if(pencilActive=true){
            ctx.strokeStyle = colorInput.value;
        }
    });


    // Custom file name
    const nameInput = document.querySelector('#image-name-input');

    // Download event listener
    document.querySelector('.download-form').addEventListener('submit', function(e){
        let dataURL = canvas.toDataURL();
        let downloadLink = document.createElement('a');
        
        downloadLink.setAttribute('download', `${nameInput.value}.png`);
        canvas.toBlob(function(blob) {
            let url = URL.createObjectURL(blob);
            downloadLink.setAttribute('href', url);
            downloadLink.click();
          });
       
        e.preventDefault();

    });

    
});
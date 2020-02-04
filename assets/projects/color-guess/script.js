var colors = []
var squares = document.querySelectorAll(".square");
var pickedDisp = document.querySelector("#picked");
var resetButton=document.querySelector("#reset");
var h1 = document.querySelector("h1");
var easyBtn = document.querySelector("#easyBtn");
var hardBtn = document.querySelector("#hardBtn");
var correct;
var size=6;
easyBtn.addEventListener("click",function(){
    size=3;
    hardBtn.classList.remove("selected");
    easyBtn.classList.add("selected");
    makeColors(size);
});
hardBtn.addEventListener("click",function(){
    size=6;
    hardBtn.classList.add("selected");
    easyBtn.classList.remove("selected");
    makeColors(size);
});
makeColors(size);
resetButton.addEventListener("click",function(){makeColors(size)});
function random_rgba() {
    var o = Math.floor, r = Math.random, s = 256;
    return 'rgb(' + o(r()*s) + ', ' + o(r()*s) + ', ' + o(r()*s) + ')';
}
function changeColors(color){
    for (var i=0; i<squares.length;i++){
        squares[i].style.backgroundColor = color;
    }
}
function makeColors(size){
    h1.style.backgroundColor="steelblue";
    resetButton.textContent= "New Colors"
    for(var i=0;i<size;i++){
        colors[i]=random_rgba();
    }
    correct=colors[Math.floor(Math.random()*size)];
    pickedDisp.textContent=correct.toUpperCase();
    for(var i=0;i<colors.length;i++){
        squares[i].style.display = "block";
        squares[i].style.backgroundColor = colors[i];
        squares[i].addEventListener("click",function(){
            var picked=this.style.backgroundColor;
            if (picked===correct)
            {
                changeColors(correct);
                resetButton.textContent= "Try Again?"
                h1.style.backgroundColor=correct;
            }
            else {
                this.style.backgroundColor="#232323";
            }
        });
    }
    if (squares.length>size){
        for(var i=size;i<squares.length;i++){
            squares[i].style.display = "none";
        }

    }
}
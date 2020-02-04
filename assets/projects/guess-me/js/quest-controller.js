'use strict';

$(document).ready(init);

function init() {
    createQuestsTree();
}

function onStartGuessing() {
    // TODO: hide the game-start section
    $('.game-start').hide()
    renderQuest();
    $('.quest').fadeIn('slow')
    // TODO: show the quest section
}

function renderQuest() {
    // TODO: select the <h2> inside quest and update its text by the currQuest text
    $('.quest h2').text(gCurrQuest.txt)
}

function onUserResponse(res) {

    // If this node has no children
    if (isChildless(gCurrQuest)) {
        if (res === 'yes') {
            showWin()
        } else {
            $('.quest').hide()
            $('.new-quest').show()
        }
    } else {
        setLastRes(res)
        moveToNextQuest(res);
        renderQuest();
    }
}

function onAddGuess() {
    var $elNewGuess = $('input[name="newGuess"]')
    var $elNewQuest = $('input[name="newQuest"]')
    addGuess($elNewQuest.val(),$elNewGuess.val())
    $elNewGuess.val('')
    $elNewQuest.val('')
    
    onRestartGame();
}
function showWin(){
    $('.quest').hide()
    $('.win-msg').show('slow')
}

function onRestartGame() {
    restartGame()
    $('.win-msg').hide()
    $('.new-quest').hide();
    $('.game-start').show();
    
    //TODO: reset the lastRes to null

}


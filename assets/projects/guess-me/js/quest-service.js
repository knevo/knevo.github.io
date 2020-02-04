var gQuestsTree;
var gCurrQuest;
var gPrevQuest = null;
var gLastRes = null;


function createQuestsTree() {
   
    gQuestsTree = loadFromStorage('game',createQuests())
    gCurrQuest = gQuestsTree;

    gPrevQuest = null;

}
function createQuests() {
     questsTree = createQuest('Male?');

    questsTree.yes = createQuest('Gandhi');
    questsTree.no = createQuest('Rita');
    return questsTree
}
function createQuest(txt) {
    return {
        txt: txt,
        yes: null,
        no: null
    }
}

function isChildless(node) {
    return (node.yes === null && node.no === null)
}

function moveToNextQuest(res) {
    // TODO: update the gPrevQuest, gCurrQuest global vars
    gPrevQuest = gCurrQuest
    gCurrQuest = gCurrQuest[res]
}
function setLastRes(res) {
    // TODO: update the lastRes global
    gLastRes = res
}

function addGuess(newQuestTxt, newGuessTxt) {
    // TODO: Create and Connect the 2 Quests to the quetsions tree using the gLastRes
    gPrevQuest[gLastRes] = createQuest(newQuestTxt)
    gPrevQuest[gLastRes].yes = createQuest(newGuessTxt)
    gPrevQuest[gLastRes].no = gCurrQuest
    saveToStorage('game',gQuestsTree)
}
function restartGame(){
    gLastRes = null
    gCurrQuest = gQuestsTree
}


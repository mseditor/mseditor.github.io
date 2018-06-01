$(window).keyup(function (e) {
    // //enter
    if (e.keyCode===13){
        var enterSelection = window.getSelection ? window.getSelection() : document.getSelection();
        var enterAnchorNode = enterSelection.anchorNode;
        if (enterAnchorNode===null||enterAnchorNode===undefined){
            return;
        }
        var thisLine=findLineDiv(enterAnchorNode,enterSelection);
        if (thisLine===null){
            return;
        }
        bindTodoEvt();
    }
    savePreDoc();
});

$(window).keydown(function (e) {
    //console.log(e);
    //Tab按键
    if (e.keyCode === 9) {
        e.preventDefault();
        document.execCommand("insertHtml", false, "&nbsp;&nbsp;&nbsp;&nbsp;");
    }
    //ctrl+d 删除一行
    if (e.keyCode===68&&e.ctrlKey){
        e.preventDefault();
        var selection = window.getSelection ? window.getSelection() : document.getSelection();
        var anchorNode = selection.anchorNode;
        var nowLine=findLineDiv(anchorNode,selection);
        if (nowLine!==null){
            nowLine.remove();
        }
        dealLastLine();
    }

    //S按键
    if (e.keyCode === 83 &&e.ctrlKey) {
        e.preventDefault();
        saveDoc();
    }
    //回退
    if (e.keyCode===90&&e.ctrlKey){
        retDoc();
        e.preventDefault();
    }
});

function findRootBelow(node) {
    var rootNode = $("#rich-body")[0];
    if (node.parentNode === rootNode) {
        return node;
    } else {
        return findRootBelow(node.parentNode);
    }
}

function saveDoc() {
    alert("save doc now");
}

docList=[];
docIndex=-1;

function savePreDoc() {
    var doc=$(".meditor-body").html();
    if (docList.length>0&&docList[docList.length-1]!==doc){
        docList.push(doc);
        docIndex=docList.length-1;
    }
    if (docList.length===0){
        docList.push(doc);
        docIndex=docList.length-1;
    }
}

function retDoc() {
    if (docIndex>0){
        docIndex--;
        $(".meditor-body").html(docList[docIndex]);
    }
}
export function getElementPageLeft(element){
    let actualLeft=element.offsetLeft;
    let parent=element.offsetParent;
    while(parent!=null){
        actualLeft+=parent.offsetLeft+(parent.offsetWidth-parent.clientWidth)/2;
        parent=parent.offsetParent;
    }
    return actualLeft;
}

export function getElementPageTop(element){
    let actualTop=element.offsetTop;
    let parent=element.offsetParent;
    while(parent!=null){
        actualTop+=parent.offsetTop+(parent.offsetWidth-parent.clientWidth)/2;
        parent=parent.offsetParent;
    }
    return actualTop;
}

export function randomFrom(lowerValue,upperValue)
{
    return Math.floor(Math.random() * (upperValue - lowerValue + 1) + lowerValue);
}
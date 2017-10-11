function doneTask() {
  if (this.parentNode.style.textDecoration == 'line-through') {
    this.parentNode.style.textDecoration = 'none';
  }
  else {
    this.parentNode.style.textDecoration = 'line-through';
  }
}

function destroyTask() {
  document.getElementsByTagName('body')[0].removeChild(this.parentNode);
}

function addInput() {
  if (event.keyCode == 13) {
    var div = document.createElement('div');
    var elem = document.getElementById('list');
    var check = document.createElement('input');
    var destroy = document.createElement('div');

    div.className = "new";
    check.className = "choose";
    check.type = "checkbox";
    destroy.className = "destroy";

    // if (!document.getElementsByClassName('new')[0]) {

    // }

    div.innerHTML = check.outerHTML + "   " + elem.value + destroy.outerHTML;
    document.body.appendChild(div);

    div.firstElementChild.addEventListener("click", doneTask);
    div.lastElementChild.addEventListener("click", destroyTask);

    elem.value = '';
  }
}

function addInput() {
  if (event.keyCode == 13) {
    var div = document.createElement('div');
    var elem = document.getElementById('list');

    div.className = "new";
    div.innerHTML = "<input class='choose' type='checkbox'>" + "   " + elem.value;

    document.body.appendChild(div);
    elem.value = '';
  }
}

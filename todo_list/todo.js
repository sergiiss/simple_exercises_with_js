function addInput() {
  if (event.keyCode == 13) {
    var div = document.createElement('div');
    var elem = document.getElementById('foo');

    div.className = "new";
    div.innerHTML = elem.value;
    document.body.appendChild(div);
    elem.value = '';
    }
}


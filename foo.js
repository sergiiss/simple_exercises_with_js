window.onload = function() {
  document.getElementById('toggle').onclick = function() {
  openbox('box', this);
  return false;
  }
}

function openbox(id, toggle) {
  var elem = document.getElementById(id);
  if(elem.style.display == 'block') {
    elem.style.display = 'none';
    toggle.innerHTML = 'Открыть';
  }
  else {
    elem.style.display = 'block';
    toggle.innerHTML = 'Закрыть';
  }
}

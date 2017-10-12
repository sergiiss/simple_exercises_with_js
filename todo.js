function changeShow(style, attribute) {
  var collection = document.getElementsByClassName(style);
  for (var i = 0; i < collection.length; ++i) {
    collection[i].style.display = attribute;
  }
}

function showActive() {
  changeShow('through', 'none');
  changeShow('through-remove', 'block');
}

function showAll() {
  changeShow('through', 'block');
  changeShow('through-remove', 'block');
}

function showCompleted() {
  changeShow('through', 'block');
  changeShow('through-remove', 'none');
}

function doneTask() {
  if (getComputedStyle(this.parentNode).textDecorationLine == 'line-through') {
    this.parentNode.classList.remove('through');
    this.parentNode.classList.add('through-remove');
  }
  else {
    this.parentNode.classList.add('through');
    this.parentNode.classList.remove('through-remove');
  }
  countTasks();
}

function destroyCompletedTasks() {
  while (document.getElementsByClassName('through')) {
    document.getElementById('input-field').removeChild(document.getElementsByClassName('through')[0]);
  }
}

function destroyTask() {
  document.getElementById('input-field').removeChild(this.parentNode);
  countTasks();

  if (document.getElementById('bottom-list0').innerHTML == 0) {
    document.body.removeChild(document.getElementById('bottom-list0'));
    document.body.removeChild(document.getElementById('bottom-list1'));
    document.body.removeChild(document.getElementById('bottom-list2'));
  }
}

function countTasks() {
  var counter = document.getElementsByClassName('through-remove').length;

  document.getElementById('bottom-list0').innerHTML = "<span id='count-tasks'>" + counter +
  ' tasks left' + "</span>" + "<span id='all'>All</span><span id='active'>Active</span>" +
  "<span id='completed'>Completed</span>" + "<span id='clear-completed'>Clear completed</span>";

  document.getElementById('bottom-list0').childNodes[1].addEventListener("click", showAll);
  document.getElementById('bottom-list0').childNodes[2].addEventListener("click", showActive);
  document.getElementById('bottom-list0').childNodes[3].addEventListener("click", showCompleted);
  document.getElementById('bottom-list0').childNodes[4].addEventListener("click", destroyCompletedTasks);
}

function addInput() {
  if (event.keyCode == 13) {
    var div = document.createElement('div');
    var elem = document.getElementById('list');
    var check = document.createElement('input');
    var destroy = document.createElement('div');

    div.className = "new";
    div.classList.add('through-remove');
    check.className = "choose";
    check.type = "checkbox";
    destroy.className = "destroy";

    if (!document.getElementsByClassName('new')[0]) {
      var bottom0 = document.createElement('div');
      var bottom1 = document.createElement('div');
      var bottom2 = document.createElement('div');

      bottom0.id = "bottom-list0";
      bottom1.id = "bottom-list1";
      bottom2.id = "bottom-list2";

      document.body.appendChild(bottom0);
      document.body.appendChild(bottom1);
      document.body.appendChild(bottom2);
    }

    div.innerHTML = check.outerHTML + "   " + elem.value + destroy.outerHTML;
    document.getElementById('input-field').appendChild(div);

    countTasks();

    div.firstElementChild.addEventListener("click", doneTask);
    div.lastElementChild.addEventListener("click", destroyTask);

    elem.value = '';
  }
}

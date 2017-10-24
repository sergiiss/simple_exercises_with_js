function changeShow(style, attribute) {
  var collection = document.getElementsByClassName(style);
  for (var i = 0; i < collection.length; ++i) {
    collection[i].style.display = attribute;
  }
}

function selectAllTasks() {
  var allTasks = $('.choose');
  var getStyle = getComputedStyle($('#select-all-tasks')[0]);

  if (getStyle.opacity == 0.3) {
    $('#select-all-tasks')[0].style.opacity = 0.9;
    for (var i = 0; i < allTasks.length; i++) {
      allTasks[i].parentNode.classList.remove('through-remove');
      allTasks[i].parentNode.classList.add('through');
      allTasks[i].checked = true;
    }
  }
  else {
    $('#select-all-tasks')[0].style.opacity = '';
    for (var i = 0; i < allTasks.length; i++) {
      allTasks[i].parentNode.classList.add('through-remove');
      allTasks[i].parentNode.classList.remove('through');
      allTasks[i].checked = false;
    }
  }
  countTasks();
  showAll();
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

function doneTask(selectString) {
  if (getComputedStyle(selectString.parentNode).textDecorationLine == 'line-through') {
    selectString.parentNode.classList.remove('through');
    selectString.parentNode.classList.add('through-remove');
    document.getElementById('select-all-tasks').style.opacity = '';
  }
  else {
    selectString.parentNode.classList.add('through');
    selectString.parentNode.classList.remove('through-remove');
  }

  var quantityTasks = document.getElementsByClassName('through').length;
  var quantityAllTasks = document.getElementsByClassName('new').length;

  if (quantityTasks == quantityAllTasks && quantityTasks != 0) {
    document.getElementById('select-all-tasks').style.opacity = 0.9;
  }
  else {
    document.getElementById('select-all-tasks').style.opacity = '';
  }

  countTasks();
}

function destroyBottomField() {
  if (document.getElementsByClassName('new').length == 0) {
    document.body.removeChild(document.getElementById('bottom-list0'));
    document.body.removeChild(document.getElementById('bottom-list1'));
    document.body.removeChild(document.getElementById('bottom-list2'));
  }
}

function changeArrow() {
  if (document.getElementsByClassName('new').length == 0) {
    document.getElementById('select-all-tasks').style.opacity = '';
    document.getElementById('select-all-tasks').style.display = '';
  }
}

function destroyCompletedTasks() {
  while (document.getElementsByClassName('through')[0]) {
    document.getElementById('input-field').removeChild(document.getElementsByClassName('through')[0]);
  }

  destroyBottomField();
  changeArrow();
}

function destroyTask() {
  document.getElementById('input-field').removeChild(this.parentNode);

  countTasks();
  destroyBottomField();
  changeArrow();
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
  document.getElementById('select-all-tasks').addEventListener("click", selectAllTasks);
}

function addInput() {
  var elem = document.getElementById('list');

  if (event.keyCode == 13 && elem.value != '') {
    var div = document.createElement('div');
    var check = document.createElement('input');
    var destroy = document.createElement('div');

    div.className = "new";
    div.classList.add('through-remove');
    check.className = "choose";
    check.type = "checkbox";
    destroy.className = "destroy";

    if (!document.getElementsByClassName('new')[0] && !document.getElementById('bottom-list0')) {
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

    div.firstElementChild.addEventListener("click", function() { doneTask(this); });
    div.lastElementChild.addEventListener("click", destroyTask);

    elem.value = '';
    document.getElementById('select-all-tasks').style.display = 'block';
  }
}

const http = new coreHTTP;

let theList = [];
const result = document.querySelector(".result");
const addButton =  document.querySelector(".add-btn");
addButton.addEventListener("click", httpPost);
const input =  document.querySelector("#listitem");


/* display list */
function ShowList() {

  let output = "<ul>";
  for (const name of theList.task) {
    let done;

    if (JSON.stringify(name.completed)==="false"){
      done = "";
    } else{
      done = "checked = 'checked'"
    }

    output += 
    `<div class="resultstwo">
    <div class = "taskCheckbox">
      <input type="checkbox" id="${name._id}" onChange="httpPutDone('${name._id}','${name.completed}')" ${done}>
      <label class="${name.completed ? 'completed' : ''}" for="${name._id}">${name.name}</label>
    </div>
    <div class="taskButton">
      <button type="submit" class="edit-btn" onClick="httpPutTask('${name._id}','${name.name}')">Edit</button>
      <button type="submit" class="del-btn" onClick="httpDelete('${name._id}')"> Delete </button>
    </div>
    </div>`;
  }
  output += "</ul>";
  
  result.innerHTML = output;
}

//get list
async function GetList() {
  theList = await http.get("./tm/tasks");
  ShowList();

}

//make a new task
async function httpPost(e) {
  if(((input.value) === "")==false){
    showLoading();
    await http.post("./tm/tasks",{name: input.value, completed: false} ); //input.value
    await GetList();
  }
}

//delete task
async function httpDelete(element) {
  showLoading();
  await http.delete("./tm/tasks/id/" + element); //input.value
  await GetList();

}

//mark as compleated in DB and cross off
async function httpPutTask(elementId, oldTask) {
  let changeTask = prompt("Please Enter New Task Name:", oldTask)
  if(changeTask !== oldTask && changeTask !== null){
    showLoading();
    await http.put("./tm/tasks/id/" + elementId,{name: changeTask});
    await GetList();
  } 
}

//mark as compleated in DB and cross off
async function httpPutDone(elementId, elementDone) {
  const boo = new Boolean(true);

  if (elementDone == "false"){
    showLoading();
    await http.put("./tm/tasks/id/" + elementId,{completed: boo});
    await GetList();
  } else{
    showLoading();
    await http.put("./tm/tasks/id/" + elementId,{completed: !boo});
    await GetList();
  }

}

// Loading functions
function showLoading() {
  result.innerHTML = "Loading...";
}

async function main() {
  showLoading();
  await GetList();
}

main();

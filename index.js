// コメント
const form = document.getElementById("form"); //これもオブジェクト
const input = document.getElementById("input");
const ul = document.getElementById("ul");

// 保存されたデータを取得
const todos=JSON.parse(localStorage.getItem("todos"));

if(todos)
{
    todos.forEach((todo) =>
    {
        add(todo);
    });
}

form.addEventListener("submit", function (event)
{
    event.preventDefault();// デフォルトのイベントが発生しない
    console.log(input.value);
    add();
});

function add(todo)
{
    let todoText=input.value;

    if(todo)
    {
        todoText=todo.text;
    }

    // if文内ではtodoTextのみでもできる
    if(todoText.length>0){
        const li = document.createElement("li");

        li.innerText=todoText;
        li.classList.add("list-group-item");

        if (todo && todo.completed)
        {
            li.classList.add("text-decoration-line-through");
        }

        li.addEventListener("contextmenu",function (event)
        {
            event.preventDefault();
            li.remove();
            saveData();
        });

        li.addEventListener("click",function()
        {
            li.classList.toggle("text-decoration-line-through");
            saveData();
        });
        ul.appendChild(li);
        input.value="";
        saveData();
    }
}

function saveData()
{
    const lists =document.querySelectorAll("li");
    let todos =[];

    lists.forEach((li) =>
    {
        todos.push(
        {  
            text: li.innerText,
            completed: li.classList.contains("text-decoration-line-through")
        });
    });
    // データを保存
    localStorage.setItem('todos',JSON.stringify(todos));
}
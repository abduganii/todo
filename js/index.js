const elForm = document.querySelector(".form")
const elList = document.querySelector(".list")
const elInput = document.querySelector(".input")

const elAllCount = document.querySelector('.all-count')
const elCompletedCount = document.querySelector('.completed-count')
const elUncompletedCount = document.querySelector('.Uncompleted-count')

const Template = document.querySelector("#todo-template").content

const localTodo = JSON.parse(window.localStorage.getItem("todos"))

const todoArr = localTodo || []


function handleDeleteTodo(evt) {
    const todosId = evt.target.dataset.id
    
    const foundIndex = todoArr.findIndex(todo => todo.id == todosId)
    todoArr.splice(foundIndex, 1)
    
    window.localStorage.setItem("todos",JSON.stringify(todoArr))


    randomTodos(todoArr, elList)
}

function handleCoplateTodo(evt) {
    const todosId = evt.target.dataset.id
    
    const found = todoArr.find(todo => todo.id == todosId)
    found.isComplyte = !found.isComplyte
    
    window.localStorage.setItem("todos",JSON.stringify(todoArr))

 
}

function randomTodos(arr, element) {
    element.innerHTML = ""
    
    let complateCount = 0
   
    
    arr.forEach(todo => {
        
        const elTemplate = Template.cloneNode(true)
        
        elTemplate.querySelector(".todo-text").textContent = todo.title
        const elComplate = elTemplate.querySelector(".is-complate")
        const elDaleteBtn =  elTemplate.querySelector(".todo-btn")
        
        elDaleteBtn.dataset.id = todo.id
        elComplate.dataset.id = todo.id
        elComplate.checked = todo.isComplyte

        
        if (todo.isComplyte) {
            complateCount++
        }
        elAllCount.textContent = arr.length
        elCompletedCount.textContent = complateCount
        elUncompletedCount.textContent = arr.length - complateCount

        elDaleteBtn.addEventListener("click" ,handleDeleteTodo)
        elComplate.addEventListener("click",handleCoplateTodo)


        element.appendChild(elTemplate)
    });
}


elForm.addEventListener("submit", function (evt) {
    evt.preventDefault();

    const todoInput = elInput.value.trim()
    const uniqueId =todoArr[todoArr.length - 1] ? todoArr[todoArr.length-1].id:0

    todoArr.push({
        id: uniqueId +1,
        title: todoInput,
        isComplyte:false,
    })
    
    elInput.value = ""

    window.localStorage.setItem("todos",JSON.stringify(todoArr))
    randomTodos(todoArr, elList)

})

randomTodos(todoArr, elList)

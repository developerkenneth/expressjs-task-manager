import axios from 'https://cdn.skypack.dev/axios';


const ul = document.querySelector("ul");
const form = document.querySelector("form");


function displayTasks(tasks) {
    let ulContent = ``;
    if (tasks) {
        tasks.forEach(task => {
            let css = '';
            if (task.completed == true) {
                css = "completed";
            }

            ulContent += `
            <li class="${css}"><span>${task.name}</span>
                        <div class="icons">
                            <span class="del" data-id="${task._id}">
                                <img width="24px"  src="./images/del.svg" alt="delete"></span>

                            <!-- edit btn -->
                            <a href="edit.html?id=${task._id}"><img width="24px"  src="./images/edit.svg" alt="edit"></a>
                        </div>
                    </li>
            `
        });

        ul.innerHTML = ulContent;
    }
}



// delete task
const handleDeleteTask = async (taskId) => {
    try {
        const url = `http://localhost:5000/api/tasks/${taskId}`;
        const response = await axios.delete(url);
        console.log(response.data);

    } catch (error) {
        console.log(error);
    }
}

const deleteTasks = () => {
    const allTask = document.querySelectorAll(".del");
    allTask.forEach((task) => {
        task.addEventListener("click", (e) => {
            const task = e.currentTarget;
            const taskId = task.dataset.id;
            handleDeleteTask(taskId);

            // this will remove the li
            task.parentElement.parentElement.remove();
        })
    });
}

const getTask = async () => {
    try {
        const url = "http://localhost:5000/api/tasks"
        const response = await axios.get(url);
        const tasks = response.data.tasks;

        displayTasks(tasks);
        deleteTasks();
    } catch (error) {
        console.error(error);
    }
};


form.addEventListener("submit",
    async function (e) {
        e.preventDefault();
        const taskInput = document.querySelector("#task");

        const task = taskInput.value;

        if (task.trim()) {

            try {
                const url = "http://localhost:5000/api/tasks"
                const response = await axios.post(url, { name: task });
                console.log(response.data);
                // display task
                getTask();


            } catch (error) {

            }
        }



    });


getTask();



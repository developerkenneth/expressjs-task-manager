import axios from 'https://cdn.skypack.dev/axios';
const ul = document.querySelector("ul");
const form = document.querySelector("form");
const msg = document.querySelector("#msg");


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
                msg.textContent = "added task successfully";
                msg.classList.add("success");
                msg.classList.remove("hidden");

                setTimeout(function () {
                    msg.classList.remove("success");
                    msg.classList.add("hidden");
                }, 5000);
                // display task
                getTask();
                return;


            } catch (error) {
                msg.textContent = "failed to add task";
                msg.classList.add("error");
                msg.classList.remove("hidden");

                setTimeout(function () {
                    msg.classList.remove("error");
                    msg.classList.add("hidden");
                }, 5000);
                return;

            }
        }


        msg.textContent = "please enter the name of the task";
        msg.classList.add("error");
        msg.classList.remove("hidden");

        setTimeout(function () {
            msg.classList.remove("error");
            msg.classList.add("hidden");
        }, 5000);

        return;



s
    });


getTask();



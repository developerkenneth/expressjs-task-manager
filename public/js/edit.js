import axios from 'https://cdn.skypack.dev/axios';

const task = document.querySelector("#task");
const completed = document.querySelector("#completed");
const msg = document.querySelector("#msg");

console.log(task);
const urlParams = new URLSearchParams(window.location.search);

// Get a specific value
const id = urlParams.get('id');


function displayTask(taskData) {

    task.value = taskData.name;
    completed.checked = taskData.completed;

}

const getTask = async () => {
    try {
        const url = `http://localhost:5000/api/tasks/${id}`;
        const response = await axios.get(url);
        const task = response.data.task;

        console.log(task);
        displayTask(task);

    } catch (error) {
        console.error(error);
    }
};


const form = document.querySelector("form");

form.addEventListener("submit",
    async function (e) {
        e.preventDefault();
        const task = document.querySelector("#task").value;
        let completed = document.querySelector("#completed").checked;


        if (task.trim()) {

            try {
                const url = `http://localhost:5000/api/tasks/${id}`;
                const response = await axios.put(url, { name: task, completed: completed });

                msg.textContent = "updated task successfully";
                msg.classList.add("success");
                msg.classList.remove("hidden");

                setTimeout(function () {
                    msg.classList.remove("success");
                    msg.classList.add("hidden");
                }, 5000);
                return;



            } catch (error) {

                msg.textContent = "failed to update task";
                msg.classList.add("error");
                msg.classList.remove("hidden");

                setTimeout(function () {
                    msg.classList.remove("error");
                    msg.classList.add("hidden");
                }, 5000);
                return;



            }
        }



    });
getTask();
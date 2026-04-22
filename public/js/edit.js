
const urlParams = new URLSearchParams(window.location.search);

// Get a specific value
const id = urlParams.get('id');


function displayTask(taskData) {

    const task = document.querySelector("#task");
    const completed = document.querySelector("#completed");

    task.value = taskData.name;
    completed.checked = taskData.completed;


}
const getTask = async () => {
    try {
        const url = `http://localhost:5000/api/tasks/${id}`;
        const response = await axios.get(url);
        const tasks = response.data.tasks;

        displayTask(tasks);

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
                console.log(response.data);
                // display task
                getTask();


            } catch (error) {

            }
        }



    });
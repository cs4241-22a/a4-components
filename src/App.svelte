<script>
	let data = "test";
	let editTask = '';

	const submit = function (e) {
		// prevent default form action from being carried out
		e.preventDefault();

		const task = document.querySelector("#task"),
			due = document.querySelector("#due"),
			json = { taskname: task.value, dueDate: due.value },
			body = JSON.stringify(json);

		fetch("/submit", {
			method: "POST",
			body,
		})
			.then((response) => response.json())
			.then((tasks) => {
				if (tasks.message) {
					alert(tasks.message);
				} else {
					updateData(tasks);
				}
			});
		let form = document.querySelector("form");
		form.reset();
		return false;
	};

	const markCompleted = function (taskname) {
		let body = JSON.stringify(taskname);
		fetch("/remove", {
			method: "POST",
			body,
		})
			.then((response) => response.json())
			.then((tasks) => updateData(tasks));
		return false;
	};

	const updateData = function (tasks) {
		data = tasks;
	};

	const update = function (name) {
		editTask = '';
		const taskhtml = document.getElementById(name);
		const task = taskhtml.querySelector("#task"),
			due = taskhtml.querySelector("#due"),
			json = {
				oldtaskname: name,
				taskname: task.value,
				dueDate: due.value,
			},
			body = JSON.stringify(json);
		fetch("/update", {
			method: "POST",
			body,
		})
			.then((response) => response.json())
			.then((tasks) => {
				if (tasks.message) {
					alert(tasks.message);
				} else {
					updateData(tasks);
				}
			});
	};

	const open = function (priority) {
		let dropdown = document.getElementsByClassName(`dropdown ${priority}`);
		if (dropdown[0].className.includes("closed")) {
			dropdown[0].className = `dropdown ${priority} open`;
			let container = document.getElementsByClassName(
				`container ${priority}`
			);
			container[0].className = `container ${priority} open`;
		} else {
			dropdown[0].className = `dropdown ${priority} closed`;
			let container = document.getElementsByClassName(
				`container ${priority}`
			);
			container[0].className = `container ${priority} closed`;
		}
	};

	window.onload = function () {
		fetch("/gettasks")
			.then((response) => response.json())
			.then((tasks) => updateData(tasks));
	};
</script>

<main>
	<h1 id="header">Todo</h1>
	<details>
		<summary class="high" on:click={() => open("high")}>
			<img
				src="drop-down-icon.jpg"
				class="dropdown high closed"
				alt="dropdown icon"
			/>
			<div class="priority high" />
		</summary>
		<div class="container high closed">
			{#each data as task}
				{#if task.priority === "high"}
					<div class="task-card" id={task.taskname}>
						{#if editTask !== task.taskname}
							<div class="task-block">
								<img
									class="pencil"
									src="pencil.png"
									alt="pencil"
									on:click={() => {
										editTask = task.taskname
									}}
								/>
								<div class="task-info">
									<h2>{task.taskname}</h2>
									<p>Due: {task.dueDate}</p>
									<p />
								</div>
								<img
									class="check"
									src="check.png"
									alt="check"
									on:click={() =>
										markCompleted(task.taskname)}
								/>
							</div>
						{:else}
							<input
								type="text"
								id="task"
								value={task.taskname}
							/>
							<input type="date" id="due" value={task.dueDate} />
							<div class="edit-imgs">
								<img
									src="cancel.png"
									alt="cancel button"
									on:click={() => {
										editTask = '';
									}}
								/>

								<img
									src="check.png"
									alt="confirm button"
									on:click={() => {
										update(task.taskname);
									}}
								/>
							</div>
						{/if}
						<hr />
					</div>
				{/if}
			{/each}
		</div>
	</details>
	<details>
		<summary class="medium" on:click={() => open("medium")}>
			<img
				src="drop-down-icon.jpg"
				class="dropdown medium closed"
				alt="dropdown icon"
			/>
			<div class="priority medium" />
		</summary>
		<div class="container medium closed">
			{#each data as task}
				{#if task.priority === "medium"}
					<div class="task-card" id={task.taskname}>
						{#if editTask !== task.taskname}
							<div class="task-block">
								<img
									class="pencil"
									src="pencil.png"
									alt="pencil"
									on:click={() => {
										editTask = task.taskname;
									}}
								/>
								<div class="task-info">
									<h2>{task.taskname}</h2>
									<p>Due: {task.dueDate}</p>
									<p />
								</div>
								<img
									class="check"
									src="check.png"
									alt="check"
									on:click={() =>
										markCompleted(task.taskname)}
								/>
							</div>
						{:else}
							<input
								type="text"
								id="task"
								value={task.taskname}
							/>
							<input type="date" id="due" value={task.dueDate} />
							<div class="edit-imgs">
								<img
									src="cancel.png"
									alt="cancel button"
									on:click={() => {
										editTask = '';
									}}
								/>

								<img
									src="check.png"
									alt="confirm button"
									on:click={() => {
										update(task.taskname);
									}}
								/>
							</div>
						{/if}
						<hr />
					</div>
				{/if}
			{/each}
		</div>
	</details>
	<details>
		<summary class="low" on:click={() => open("low")}>
			<img
				src="drop-down-icon.jpg"
				class="dropdown low closed"
				alt="dropdown icon"
			/>
			<div class="priority low" />
		</summary>
		<div class="container low closed">
			{#each data as task}
				{#if task.priority === "low"}
					<div class="task-card" id={task.taskname}>
						{#if editTask !== task.taskname}
							<div class="task-block">
								<img
									class="pencil"
									src="pencil.png"
									alt="pencil"
									on:click={() => {
										editTask = task.taskname;
									}}
								/>
								<div class="task-info">
									<h2>{task.taskname}</h2>
									<p>Due: {task.dueDate}</p>
									<p />
								</div>
								<img
									class="check"
									src="check.png"
									alt="check"
									on:click={() =>
										markCompleted(task.taskname)}
								/>
							</div>
						{:else}
							<input
								type="text"
								id="task"
								value={task.taskname}
							/>
							<input type="date" id="due" value={task.dueDate} />
							<div class="edit-imgs">
								<img
									src="cancel.png"
									alt="cancel button"
									on:click={() => {
										editTask = '';
									}}
								/>

								<img
									src="check.png"
									alt="confirm button"
									on:click={() => {
										update(task.taskname);
									}}
								/>
							</div>
						{/if}
						<hr />
					</div>
				{/if}
			{/each}
		</div>
	</details>
	<form action="none">
		<input type="text" id="task" placeholder="task name" />
		<input type="date" id="due" />
		<button on:click={submit}>submit</button>
	</form>
</main>

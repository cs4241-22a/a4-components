<script>

    let sleepData = [];

    async function submit(e) {
        e.preventDefault()
        const inputs = e.target.elements;
        const json = {
            timeSleep: inputs['sleep-time'].value,
            timeWakeUp: inputs['wake-time'].value,
            sleepRating: Number(inputs['sleep-rating'].value), // Out of 5
            hadDream: inputs['did-dream'].checked,
            dreamDescription: inputs['dream-description'].value,
        }
        const body = JSON.stringify(json);

        const rawRes = await fetch('/submit', {method: 'POST', body});
        const updatedData = await rawRes.json();

        updateSummaries(updatedData['summary']);
        json.id = updatedData['id']
        sleepData[json.id] = json;

        return false;
    }

    const updateSummaries = function (summary) {
        const averageHours = document.getElementById('average-hours-stat');
        const dreamPercentage = document.getElementById('dream-percentage-stat');
        const averageRating = document.getElementById('average-rating-stat');
        averageHours.innerText = `${Math.round(summary['averageTimeAsleep'] * 100) / 100}`;
        dreamPercentage.innerText = `${summary['dreamPercentage'].toFixed(2) * 100}%`;
        averageRating.innerText = `${Math.round(summary['averageSleepRating'] * 100) / 100}/5`;
    }

    const deleteItem = async function (ev) {
        const button = ev.target;
        const table = document.getElementById('sleep-data');
        const rowIndex = button.parentNode.parentNode.parentNode.rowIndex;
        table.deleteRow(rowIndex);
        const res = await fetch('/deleteEntry', {method: "DELETE", body: JSON.stringify({id: button.parentNode.id})});
        const summary = await res.json();
        updateSummaries(summary);
    }

    window.onload = function () {
        fetch('/getData')
            .then(res => res.json())
            .then(json => {
                updateSummaries(json['summary']);
                sleepData = json['sleepData']
                // updateData(json['sleepData'])
            })
    }
</script>

<svelte:head>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
</svelte:head>

<main class="grid-container">
    <div class="box" id="sleep-form-div">
        <form on:submit={submit} id="sleep-form">
            <label for="sleep-time">What time did you go to bed?</label>
            <input required type="datetime-local" id="sleep-time">

            <label for="wake-time">What time did you wake up?</label>
            <input required type="datetime-local" id="wake-time">

            <label for="sleep-rating">How would you rate your sleep?</label>
            <select required id="sleep-rating">
                <option selected disabled value="">Choose Rating</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>

            <label for="did-dream">Did you have a dream?</label>
            <input type="checkbox" id="did-dream">

            <label for="dream-description">What was your dream about?</label>
            <textarea id="dream-description" placeholder="In my dream..."></textarea>

            <button class="submit-button">submit</button>
        </form>
    </div>
    <div id="summary-stats">
        <div class="box stat">
            <h3>Average Hours Asleep</h3>
            <p id="average-hours-stat">---</p>
        </div>
        <div class="box stat">
            <h3>Likelihood to Dream</h3>
            <p id="dream-percentage-stat">---</p>
        </div>
        <div class="box stat">
            <h3>Average Sleep Rating</h3>
            <p id="average-rating-stat">---</p>
        </div>
    </div>
    <div id="form-responses" class="box">
        <h2>Your History</h2>
        <table id="sleep-data">
            <tr>
                <th>Time Asleep</th>
                <th>Time Awake</th>
                <th>Rating</th>
                <th>Did Dream</th>
                <th>Dream</th>
            </tr>
            {#if sleepData !== []}
                {#each Object.values(sleepData) as datum}
                    <tr>
                        <td>{new Date(datum['timeSleep']).toLocaleString()}</td>
                        <td>{new Date(datum['timeWakeUp']).toLocaleString()}</td>
                        <td>{datum['sleepRating']}</td>
                        <td>{datum['hadDream'] ? '✓' : '✗'}</td>
                        <td>{datum['hadDream'] ? (datum['dreamDescription'] ?? 'N/A') : 'N/A'}</td>
                        <td><button id="{datum.id}" class="delete-button" on:click={deleteItem}><span class="material-symbols-outlined">delete</span></button></td>
                    </tr>
                {/each}
            {/if}
        </table>
    </div>
</main>

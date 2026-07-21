// Function to format duration in seconds to HH:MM:SS or MM:SS format
function formatDuration(seconds) {
    seconds = Number(seconds);

    if (isNaN(seconds)) return "--";

    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60));
    const secs = seconds % 60;

    if (hours > 0) {
        return `${hours}:${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
    }

    return `${minutes}:${String(secs).padStart(2, "0")}`;
}

// Function to 60);
    const secs = seconds % 60;

    if (hours > 0) {
        return `${hours}:${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
    }

    return `${minutes}:${String(secs).padStart(2, "0")}`;
}

// Function to fetch personal record for a given distance
function fetchPersonalRecord(distance) {
    fetch("../backend/personal_record.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `pr-distance=${distance}`
    })
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
        if (data) {
            document.getElementById("distance").textContent =
                data.distance_km || "--";

            document.getElementById("pace").textContent = data.average_pace || "--";

            document.getElementById("duration").textContent = formatDuration(
                data.duration_seconds,
            );
        } else {
            // Clear data if no record found
            document.getElementById("distance").textContent = "--";
            document.getElementById("pace").textContent = "--";
            document.getElementById("duration").textContent = "--";
        }
    })
    .catch((error) => {
        console.error("Error fetching personal record:", error);
        document.getElementById("distance").textContent = "Error";
        document.getElementById("pace").textContent = "Error";
        document.getElementById("duration").textContent = "Error";
    });
}

// Initialize with default value
document.addEventListener("DOMContentLoaded", function() {
    // Fetch initial record for default selection (5km)
    fetchPersonalRecord(5);
});

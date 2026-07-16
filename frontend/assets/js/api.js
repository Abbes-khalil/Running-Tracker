// API Service for communicating with the backend PHP endpoints
class APIService {
  constructor(baseURL = '') {
    this.baseURL = baseURL;
  }

  // Helper method to handle fetch responses
  async handleResponse(response) {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  }

  // Get all runs/activities
  async getRuns() {
    try {
      const response = await fetch(`${this.baseURL}/backend/runs/list.php`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include' // Include cookies for session-based auth
      });
      return await this.handleResponse(response);
    } catch (error) {
      console.error('Error fetching runs:', error);
      throw error;
    }
  }

  // Create a new run
  async createRun(runData) {
    try {
      const response = await fetch(`${this.baseURL}/backend/runs/create.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(runData),
        credentials: 'include'
      });
      return await this.handleResponse(response);
    } catch (error) {
      console.error('Error creating run:', error);
      throw error;
    }
  }

  // Update an existing run
  async updateRun(runId, runData) {
    try {
      const response = await fetch(`${this.baseURL}/backend/runs/update.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: runId, ...runData }),
        credentials: 'include'
      });
      return await this.handleResponse(response);
    } catch (error) {
      console.error('Error updating run:', error);
      throw error;
    }
  }

  // Delete a run
  async deleteRun(runId) {
    try {
      const response = await fetch(`${this.baseURL}/backend/runs/delete.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: runId }),
        credentials: 'include'
      });
      return await this.handleResponse(response);
    } catch (error) {
      console.error('Error deleting run:', error);
      throw error;
    }
  }

  // Get statistics from runs data
  async getStats() {
    try {
      const runs = await this.getRuns();
      return this.calculateStats(runs);
    } catch (error) {
      console.error('Error getting stats:', error);
      throw error;
    }
  }

  // Calculate statistics from runs data
  calculateStats(runs) {
    if (!Array.isArray(runs) || runs.length === 0) {
      return {
        totalDistance: 0,
        totalTime: 0,
        activitiesCount: 0,
        avgPace: 0,
        recentActivities: []
      };
    }

    // Calculate total distance
    const totalDistance = runs.reduce((sum, run) => {
      return sum + parseFloat(run.distance_km || 0);
    }, 0);

    // Calculate total time (in seconds)
    const totalTimeSeconds = runs.reduce((sum, run) => {
      // Convert duration string (HH:MM:SS) to seconds
      const timeParts = (run.duration || '0:0:0').split(':').map(Number);
      let seconds = 0;
      if (timeParts.length === 3) {
        seconds = (timeParts[0] * 3600) + (timeParts[1] * 60) + timeParts[2];
      } else if (timeParts.length === 2) {
        seconds = (timeParts[0] * 60) + timeParts[1];
      } else if (timeParts.length === 1) {
        seconds = timeParts[0];
      }
      return sum + seconds;
    }, 0);

    // Calculate average pace (time per km in minutes)
    let avgPace = 0;
    if (totalDistance > 0) {
      // Convert total time to minutes, then divide by distance
      const totalTimeMinutes = totalTimeSeconds / 60;
      avgPace = totalTimeMinutes / totalDistance;
    }

    // Sort runs by date (most recent first) and take top 5
    const recentActivities = [...runs]
      .sort((a, b) => new Date(b.run_date) - new Date(a.run_date))
      .slice(0, 5);

    return {
      totalDistance: parseFloat(totalDistance.toFixed(2)),
      totalTime: totalTimeSeconds,
      activitiesCount: runs.length,
      avgPace: parseFloat(avgPace.toFixed(2)),
      recentActivities: recentActivities
    };
  }
}

// Create and export a default instance
const apiService = new APIService();
export default apiService;
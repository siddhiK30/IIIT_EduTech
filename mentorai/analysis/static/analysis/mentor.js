// Sample data
const sampleData = {
    alerts: [
        { type: 'warning', message: 'Math homework completion rate dropped below 80%' },
        { type: 'success', message: 'Science quiz scores improved by 15%' },
        { type: 'danger', message: 'Reading assignments pending for 3 days' }
    ],
    timeline: [
        { title: 'Completed Algebra Module', description: 'Score: 92% - Excellent understanding of concepts' },
        { title: 'Started Science Project', description: 'Topic: Renewable Energy Sources' },
        { title: 'Reading Challenge', description: 'Finished 3 books this month' }
    ],
    skills: [
        { name: 'Critical Thinking', progress: 85 },
        { name: 'Problem Solving', progress: 78 },
        { name: 'Communication', progress: 92 }
    ],
    activities: [
        { icon: 'calculator', title: 'Interactive Math Practice', description: 'Focus on geometry concepts' },
        { icon: 'book', title: 'Reading Challenge', description: 'Complete chapter 5 with comprehension' }
    ],
    meetings: [
        { icon: 'video', title: 'Parent-Teacher Conference', time: 'Tomorrow at 3:00 PM', status: 'warning', statusText: 'Pending Confirmation' },
        { icon: 'users', title: 'Study Group Session', time: 'Friday at 4:00 PM', status: 'success', statusText: 'Confirmed' }
    ]
};

// Initialize the dashboard
document.addEventListener('DOMContentLoaded', () => {
    initializeAlerts();
    initializeTimeline();
    initializeSkills();
    initializeActivities();
    initializeMeetings();
    setupEventListeners();
    initializeProgressAnimations();
});

// Initialize alerts
function initializeAlerts() {
    const alertsContainer = document.getElementById('alertsContainer');
    alertsContainer.innerHTML = '';

    sampleData.alerts.forEach(alert => {
        const alertElement = document.createElement('div');
        alertElement.className = `alert alert-${alert.type}`;
        alertElement.innerHTML = `<strong>${alert.type.charAt(0).toUpperCase() + alert.type.slice(1)}:</strong> ${alert.message}`;
        alertsContainer.appendChild(alertElement);
    });
}

// Initialize timeline
function initializeTimeline() {
    const timeline = document.getElementById('learningTimeline');
    timeline.innerHTML = '';

    sampleData.timeline.forEach(item => {
        const timelineItem = document.createElement('li');
        timelineItem.className = 'timeline-item';
        timelineItem.innerHTML = `
            <h3>${item.title}</h3>
            <p>${item.description}</p>
        `;
        timeline.appendChild(timelineItem);
    });
}

// Initialize skills
function initializeSkills() {
    const skills = document.querySelectorAll('.skill-progress');
    skills.forEach(skill => {
        // Start with 0 width
        skill.style.width = '0%';
        
        // Animate to target width
        setTimeout(() => {
            skill.style.width = skill.getAttribute('style').split(':')[1];
        }, 200);
    });
}

// Initialize activities
function initializeActivities() {
    const activitiesList = document.getElementById('activitiesList');
    activitiesList.innerHTML = '';

    sampleData.activities.forEach(activity => {
        const activityItem = document.createElement('li');
        activityItem.className = 'activity-item';
        activityItem.innerHTML = `
            <div class="meeting-card">
                <div class="icon">
                    <i class="fas fa-${activity.icon}"></i>
                </div>
                <div class="meeting-info">
                    <h3>${activity.title}</h3>
                    <p>${activity.description}</p>
                </div>
            </div>
        `;
        activitiesList.appendChild(activityItem);
    });
}

// Initialize meetings
function initializeMeetings() {
    const meetingsContainer = document.getElementById('meetingsContainer');
    meetingsContainer.innerHTML = '';

    sampleData.meetings.forEach(meeting => {
        const meetingElement = document.createElement('div');
        meetingElement.className = 'meeting-card';
        meetingElement.innerHTML = `
            <div class="icon">
                <i class="fas fa-${meeting.icon}"></i>
            </div>
            <div class="meeting-info">
                <h3>${meeting.title}</h3>
                <p>${meeting.time}</p>
                <span class="badge badge-${meeting.status}">${meeting.statusText}</span>
            </div>
        `;
        meetingsContainer.appendChild(meetingElement);
    });
}

// Initialize progress animations
function initializeProgressAnimations() {
    const progressBars = document.querySelectorAll('.progress');
    progressBars.forEach(bar => {
        const targetWidth = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
            bar.style.width = targetWidth;
        }, 100);
    });
}

// Setup event listeners
function setupEventListeners() {
    // Notification button
    const notificationBtn = document.getElementById('notificationBtn');
    notificationBtn.addEventListener('click', () => {
        alert('Notifications panel will be implemented here');
    });


    // Make cards interactive
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('click', () => {
            card.style.transform = 'scale(1.02)';
            setTimeout(() => {
                card.style.transform = 'translateY(-5px)';
            }, 200);
        });
    });
}

// Update progress function
function updateProgress(subject, value) {
    const progressElement = document.getElementById(`${subject}Progress`);
    const percentageElement = document.getElementById(`${subject}Percentage`);
    
    if (progressElement && percentageElement) {
        progressElement.style.width = `${value}%`;
        percentageElement.textContent = value;
    }
}

// Add new alert function
function addAlert(type, message) {
    const alertsContainer = document.getElementById('alertsContainer');
    const alertElement = document.createElement('div');
    alertElement.className = `alert alert-${type}`;
    alertElement.innerHTML = `<strong>${type.charAt(0).toUpperCase() + type.slice(1)}:</strong> ${message}`;
    alertsContainer.insertBefore(alertElement, alertsContainer.firstChild);
    
    // Remove alert after 5 seconds
    setTimeout(() => {
        alertElement.style.opacity = '0';
        setTimeout(() => alertElement.remove(), 300);
    }, 5000);
}

// Add new meeting function
function addMeeting(meeting) {
    const meetingsContainer = document.getElementById('meetingsContainer');
    const meetingElement = document.createElement('div');
    meetingElement.className = 'meeting-card';
    meetingElement.innerHTML = `
        <div class="icon">
            <i class="fas fa-${meeting.icon}"></i>
        </div>
        <div class="meeting-info">
            <h3>${meeting.title}</h3>
            <p>${meeting.time}</p>
            <span class="badge badge-${meeting.status}">${meeting.statusText}</span>
        </div>
    `;
    meetingsContainer.appendChild(meetingElement);
}

// Update statistics function
function updateStatistics(stats) {
    Object.keys(stats).forEach(stat => {
        const element = document.getElementById(stat);
        if (element) {
            element.textContent = stats[stat];
        }
    });
}

// Add new resource function
function addResource(resource) {
    const resourcesList = document.getElementById('resourcesList');
    const resourceItem = document.createElement('li');
    resourceItem.className = 'resource-item';
    resourceItem.innerHTML = `
        <div class="resource-icon">
            <i class="fas fa-${resource.icon}"></i>
        </div>
        <div class="resource-content">
            <h3>${resource.title}</h3>
            <p>${resource.description}</p>
            <div class="resource-tags">
                ${resource.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
        </div>
    `;
    resourcesList.appendChild(resourceItem);
}

// Update skill progress function
function updateSkillProgress(skillName, percentage) {
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
        if (item.querySelector('.skill-name').textContent === skillName) {
            item.querySelector('.skill-percentage').textContent = `${percentage}%`;
            item.querySelector('.skill-progress').style.width = `${percentage}%`;
        }
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initializeSkills();
});

function redirectToCalendar(calendarUrl) {
    window.open(calendarUrl, '_blank');
}

// Function to initialize meetings (you can call this from your mentor.js)
function initializeMeetings() {
    // You can dynamically populate meetings here if needed
    const meetings = [
        {
            title: "Parent-Teacher Conference",
            time: "Tomorrow at 3:00 PM",
            status: "Pending Confirmation",
            icon: "video",
            calendarUrl: "https://calendar.google.com/calendar/u/0/r/eventedit?text=Parent-Teacher+Conference&dates=20250215T150000Z/20250215T160000Z"
        },
        {
            title: "Study Group Session",
            time: "Friday at 4:00 PM",
            status: "Confirmed",
            icon: "users",
            calendarUrl: "https://calendar.google.com/calendar/u/0/r/eventedit?text=Study+Group+Session&dates=20250216T160000Z/20250216T170000Z"
        }
    ];
    
    // You can use this to dynamically populate the meetings container
    const container = document.getElementById('meetingsContainer');
    // Add code here if you want to populate meetings dynamically
}

document.getElementById("viewReportBtn").addEventListener("click", function () {
    window.location.href = "/download-progress-pdf/";
});
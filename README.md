# Learning Journal PWA

A fully installable Progressive Web Application (PWA) that serves as a reflective learning journal, built with a Flask backend and modern offline-first frontend technologies.

## 🌟 Features

- **Progressive Web App (PWA)** installable on mobile and desktop
- **Offline Capability** loads instantly without internet via Service Workers
- **Offline Notification** real-time alert banner when connectivity is lost
- **Full-stack Architecture** with Flask backend and vanilla JavaScript frontend
- **Dark/Light Theme** with persistent local storage
- **CRUD Operations** for journal reflections (Create, Read, Delete)
- **RESTful API** with proper HTTP methods (GET, POST, DELETE)
- **Responsive Design** mobile-first approach
- **JSON Data Storage** with Flask file handling
- **Export Functionality** for backup and sharing

## 🛠️ Technology Stack

### PWA Technologies (Lab 7)
- **Service Workers** for caching and offline network interception
- **Web App Manifest** for installability and native-app feel
- **Cache Storage API** for storing shell assets (HTML/CSS/JS)
- **Navigator API** for online/offline status detection

### Frontend
- HTML5, CSS3, JavaScript (ES6+)
- Fetch API for backend communication
- Local Storage API for client-side persistence
- CSS Grid & Flexbox for layouts

### Backend
- **Flask** Python web framework
- RESTful API endpoints
- Custom routing for Service Worker scope (`/sw.js`)
- JSON file-based data storage

### Deployment
- **PythonAnywhere** for Flask backend hosting
- GitHub for version control

## 📁 Project Structure
```text
/mysite
├── flask_app.py             # Main Flask application (with SW route)
├── backend/
│   └── reflections.json     # Data storage (auto-created)
├── templates/               # HTML templates
│   ├── index.html           # Homepage
│   ├── journal.html         # Journal entries page
│   ├── about.html           # About me page
│   └── projects.html        # Projects portfolio
└── static/                  # Static assets
    ├── manifest.json        # PWA Manifest file
    ├── images/              # PWA Icons
    │   ├── icon-192.png
    │   └── icon-512.png
    ├── css/
    │   └── style.css        # Main stylesheet
    └── js/
        ├── sw.js            # Service Worker (Logic for offline cache)
        ├── storage.js       # Local storage management
        ├── script.js        # Core functionality & Offline detection
        ├── browser.js       # Form handling & API calls
        ├── jsonhandler.js   # JSON data management
        └── thirdparty.js    # External API integrations

```
## 🚀 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/reflections` | Retrieve all journal entries |
| `POST` | `/api/reflections` | Create a new journal entry |
| `DELETE` | `/api/reflections/delete` | Delete most recent entry |
| `GET` | `/sw.js` | Special route to serve Service Worker from root scope |

## 🎯 Key Learning Outcomes

- **[span_0](start_span)Service Worker Lifecycle:** Understanding install, activate, and fetch events[span_0](end_span)
- **[span_1](start_span)Caching Strategies:** Implementing "Cache First" or "Network First" logic[span_1](end_span)
- **[span_2](start_span)Offline UX:** Managing user experience when the network fails[span_2](end_span)
- **[span_3](start_span)Frontend-Backend Integration:** Connecting Flask APIs with asynchronous JS[span_3](end_span)
- **[span_4](start_span)PWA Configuration:** Configuring Manifests and ensuring secure contexts (HTTPS)[span_4](end_span)

## 🌐 Live Demo

- **Flask Backend**: [soman010.pythonanywhere.com](https://soman010.pythonanywhere.com)
- **GitHub Repository**: [github.com/Somantam/Learning-journal-PWA](https://github.com/Somantam/Learning-journal-PWA)

## 📝 Usage

1. **Install:** Click the "Install" button in your browser address bar (Desktop) or "Add to Home Screen" (Mobile).
2. **Go Offline:** Turn off your internet/WiFi.
3. **Test:** Refresh the page—the app will still load and display pages!
4. **Journal:** View reflections (cached) or add new ones (synced when online).
5. **Theme:** Toggle between dark/light theme (persisted locally).

## 👨‍💻 Developer

**Soman Tamang** BSc (Hons) Computer Science Student  
[GitHub Profile](https://github.com/Somantam)

---

*Built for Mobile Application Development course - Lab 7: PWA & Offline Implementation*

# Learning Journal PWA

A Progressive Web Application (PWA) that serves as a reflective learning journal, built with Flask backend and modern frontend technologies.

## 🌟 Features

- **Full-stack PWA** with Flask backend and vanilla JavaScript frontend
- **Dark/Light Theme** with persistent local storage
- **CRUD Operations** for journal reflections (Create, Read, Delete)
- **RESTful API** with proper HTTP methods (GET, POST, DELETE)
- **Responsive Design** mobile-first approach
- **Real-time Updates** without page refresh
- **JSON Data Storage** with Flask file handling
- **Export Functionality** for backup and sharing

## 🛠️ Technology Stack

### Frontend
- HTML5, CSS3, JavaScript (ES6+)
- Progressive Web App (PWA) features
- Fetch API for backend communication
- Local Storage API for client-side persistence
- CSS Grid & Flexbox for layouts

### Backend
- **Flask** Python web framework
- RESTful API endpoints
- JSON file-based data storage
- CORS-enabled for frontend communication

### Deployment
- **PythonAnywhere** for Flask backend hosting
- GitHub Pages for static frontend demo

## 📁 Project Structure
```
/mysite
├──flask_app.py              # Main Flask application
├──backend/
│└── reflections.json      # Data storage (auto-created)
├──templates/                # HTML templates
│├── index.html           # Homepage
│├── journal.html         # Journal entries page
│├── about.html           # About me page
│└── projects.html        # Projects portfolio
└──static/                  # Static assets
├── css/
│   └── style.css        # Main stylesheet
└── js/
├── storage.js       # Local storage management
├── script.js        # Core functionality
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

## 🎯 Key Learning Outcomes

- Frontend-backend architecture and communication
- RESTful API design and implementation
- Flask web framework and deployment
- Progressive Web App development
- JSON data management and persistence
- Mobile-first responsive design
- JavaScript Fetch API and DOM manipulation

## 🌐 Live Demo

- **Flask Backend**: [soman010.pythonanywhere.com](https://soman010.pythonanywhere.com)
- **GitHub Repository**: [github.com/Somantam/Learning-journal-PWA](https://github.com/Somantam/Learning-journal-PWA)

## 📝 Usage

1. Visit the Journal page to view existing reflections
2. Add new reflections using the form
3. Toggle between dark/light theme
4. Export reflections as JSON file
5. Delete recent entries as needed

## 👨‍💻 Developer

**Soman Tamang**  
BSc (Hons) Computer Science Student  
[GitHub Profile](https://github.com/Somantam)

---

*Built for Mobile Application Development course - Lab 6: Frontend & Backend Integration*

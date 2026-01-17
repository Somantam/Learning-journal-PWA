# 🎓 **Learning Journal PWA**
A fully installable **Progressive Web Application (PWA)** that serves as a reflective learning journal and productivity tool — built with a **Flask backend** and modern **offline‑first frontend technologies**.

---

## 🌟 **Features**

- **Progressive Web App (PWA):** Installable on mobile and desktop with native‑like performance  
- **Offline Capability:** Loads instantly without internet using Service Workers  
- **Offline Notification:** Real‑time red alert banner when connectivity is lost  
- **Focus Timer (Mini Project):** Pomodoro‑style timer with state persistence + notifications  
- **Full‑Stack Architecture:** Flask backend + vanilla JavaScript frontend  
- **Dark/Light Theme:** User preference saved via LocalStorage  
- **CRUD Operations:** Create, Read, Delete journal entries  
- **RESTful API:** Standard GET, POST, DELETE endpoints  
- **Responsive Design:** Mobile‑first using CSS Grid & Flexbox  
- **JSON Data Storage:** Persistent server‑side storage  
- **Export Functionality:** Download journal entries as JSON  

---

## 🛠️ **Technology Stack**

### **PWA Technologies (Lab 7)**
- **Service Workers:** Caching + network interception (`sw.js`)  
- **Web App Manifest:** Installability, icons, standalone mode  
- **Cache Storage API:** Stores the application shell  
- **Navigator API:** Detects online/offline status  

### **Mini Project (Productivity Tool)**
- **JavaScript Intervals:** Real‑time countdown logic  
- **LocalStorage API:** Saves timestamps to persist timer state  
- **Notification API:** Alerts when study session completes  

### **Frontend**
- HTML5, CSS3, JavaScript (ES6+)  
- Fetch API for backend communication  
- LocalStorage for theme + timer state  
- CSS Grid & Flexbox for responsive UI  

### **Backend**
- **Flask** micro‑framework  
- RESTful API endpoints  
- Custom routing for Service Worker scope (`/sw.js`)  
- JSON file‑based storage (`reflections.json`)  

### **Deployment**
- **PythonAnywhere** for hosting  
- **GitHub** for version control  

```

## 📁 **Project Structure**

/mysite
├── flask_app.py             # Main Flask application (routes & API)
├── backend/
│   └── reflections.json      # Persistent data storage
├── templates/               # HTML templates
│   ├── index.html            # Homepage
│   ├── journal.html          # Journal entries page
│   ├── projects.html         # Portfolio page
│   ├── about.html            # About page
│   └── timer.html            # Focus Timer (Mini Project)
└── static/                  # Static assets
├── manifest.json         # PWA Manifest configuration
├── images/              # Application Icons
│   ├── icon-192.png
│   └── icon-512.png
├── css/
│   └── style.css         # Global styles & responsive design
└── js/
├── sw.js             # Service Worker (Caching logic)
├── storage.js        # Theme & Local Storage management
├── script.js         # Core UI logic & Offline detection
├── browser.js        # Form handling & API calls
├── jsonhandler.js    # JSON data fetching & rendering
├── thirdparty.js     # External API integration (Quotes)
└── timer.js          # Focus Timer logic (Mini Project)

```

## 🚀 **API Endpoints**

| Method | Endpoint                   | Description                          |
|--------|-----------------------------|--------------------------------------|
| GET    | `/api/reflections`         | Retrieve all journal entries (JSON)  |
| POST   | `/api/reflections`         | Create a new journal entry           |
| DELETE | `/api/reflections/delete`  | Delete the most recent entry         |
| GET    | `/sw.js`                   | Serve Service Worker from root scope |
| GET    | `/timer`                   | Serve the Focus Timer page           |

```

## 🎯 **Key Learning Outcomes**

- **Service Worker Lifecycle:** Install, activate, fetch events  
- **State Management:** Persistent timer using LocalStorage  
- **Asynchronous JS:** async/await with Flask APIs  
- **Mobile‑First Design:** Responsive layouts for all screens  
- **Cloud Deployment:** WSGI + static file config on PythonAnywhere  

```

## 🌐 **Live Demo**

- **Live Application:** https://soman010.pythonanywhere.com  
- **GitHub Repository:** https://github.com/Somantam/Learning-journal-PWA  

```

## 📝 **Usage**

- **Install:** Click the “Install” button in your browser  
- **Offline Mode:** Disconnect internet to see offline banner  
- **Timer:** Use Focus Timer (works even if you switch tabs)  
- **Journal:** Write reflections synced to server when online  
- **Theme:** Toggle Dark Mode anytime  

```

## 👨‍💻 **Developer**

**Soman Tamang**  
BSc (Hons) Computer Science Student  
Built for **Mobile Application Development – Final Portfolio**

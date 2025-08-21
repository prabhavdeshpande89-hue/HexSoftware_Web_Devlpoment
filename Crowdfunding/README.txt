🌐 Crowdfunding Platform

A simple crowdfunding web application built with Flask where users
can: - Create projects - Set funding goals - View project details -
Contribute to projects (dummy payment system)

------------------------------------------------------------------------

🚀 Features

-   Create and manage crowdfunding projects
-   Set project goals and track raised funds
-   Dummy payment system for contributions
-   Clean and professional UI with gradient background and centered
    layout
-   Simple project folder structure for beginners

------------------------------------------------------------------------

📂 Project Structure

    Crowdfunding/
    │── app.py                # Main Flask app
    │── instance/             # SQLite database (auto-created)
    │── static/
    │   └── style.css         # Styling (gradient, fonts, borders)
    │── templates/
    │   ├── index.html        # Homepage - list of projects
    │   ├── create.html       # Form to create a new project
    │   ├── project.html      # Project details + contribute button
    │   └── contribute.html   # Contribution form (dummy)
    │── requirements.txt      # Python dependencies
    │── README.md             # Project documentation

------------------------------------------------------------------------

⚙️ Installation & Setup

1. Clone the repository

    git clone https://github.com/yourusername/crowdfunding-flask.git
    cd crowdfunding-flask

2. Create a virtual environment (recommended)

    python3 -m venv venv
    source venv/bin/activate   # On Linux/Mac
    venv\Scriptsctivate      # On Windows

3. Install dependencies

    pip install -r requirements.txt

4. Run the application

    python3 app.py

The server will start at:
👉 http://127.0.0.1:5000

------------------------------------------------------------------------

🖼️ Screenshots

Homepage

Crowdfunding Homepage UI

Create Project

Project creation UI

------------------------------------------------------------------------

💡 Future Enhancements

-   Real payment gateway integration (Razorpay/Stripe)
-   User authentication & profiles
-   Project categories & search functionality
-   Admin dashboard for managing projects



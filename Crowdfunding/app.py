from flask import Flask, render_template, request, redirect, url_for, flash

app = Flask(__name__)
app.secret_key = "dummy_secret_key"

# Dummy storage for projects
projects = []

@app.route('/')
def index():
    return render_template('index.html', projects=projects)

@app.route('/create', methods=['GET', 'POST'])
def create():
    if request.method == 'POST':
        title = request.form['title']
        description = request.form['description']
        goal = request.form['goal']
        projects.append({
            'id': len(projects) + 1,
            'title': title,
            'description': description,
            'goal': goal,
            'raised': 0
        })
        flash("Project created successfully!", "success")
        return redirect(url_for('index'))
    return render_template('create.html')

@app.route('/project/<int:project_id>')
def project(project_id):
    project = next((p for p in projects if p['id'] == project_id), None)
    return render_template('project.html', project=project)

@app.route('/contribute/<int:project_id>', methods=['GET', 'POST'])
def contribute(project_id):
    project = next((p for p in projects if p['id'] == project_id), None)
    if request.method == 'POST':
        amount = int(request.form['amount'])
        project['raised'] += amount
        flash(f"Dummy payment successful! You contributed ₹{amount}", "success")
        return redirect(url_for('project', project_id=project_id))
    return render_template('contribute.html', project=project)

if __name__ == "__main__":
    app.run(debug=True)

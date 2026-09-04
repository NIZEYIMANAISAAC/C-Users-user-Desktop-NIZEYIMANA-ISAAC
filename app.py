import os

from flask import Flask, render_template, request, redirect, url_for, flash

app = Flask(__name__)
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'development-only-secret')

nav_links = [
    ('Home', 'index'),
    ('About', 'about'),
    ('Academics', 'academics'),
    ('Admissions', 'admissions'),
    ('Contact', 'contact'),
]

@app.context_processor
def inject_nav():
    return dict(nav_links=nav_links)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/academics')
def academics():
    return render_template('academics.html')

@app.route('/admissions')
def admissions():
    return render_template('admissions.html')

@app.route('/contact', methods=['GET', 'POST'])
def contact():
    submitted = False
    if request.method == 'POST':
        name = request.form.get('name', '').strip()
        email = request.form.get('email', '').strip()
        message = request.form.get('message', '').strip()
        if not name or not email or not message:
            flash('Please complete all fields before sending your message.', 'error')
        else:
            # Here you would connect email or DB storage. For prototype, we flash.
            flash('Thank you! Your message has been received.', 'success')
            submitted = True
    return render_template('contact.html', submitted=submitted)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=int(os.environ.get('PORT', 5000)), debug=False)

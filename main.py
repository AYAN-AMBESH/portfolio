# import html
from flask import Flask,request,render_template
# from commands import help
app = Flask(__name__)


@app.route('/')
def main():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True,port=8080)
var CWD = "home";

const sandbox = {
  env: {
    bin: ["cat", "ls", "pwd", "cd", "write", "clear"],
    home: {
      "about_me.txt": "My name is Ayan Ambesh and im known as Sinister Draco\nlink: <a target='_blank' href='https://drive.google.com/file/d/1CqLUGXbL2wkt7uSeqlgILZjHfasGtoJx/view?usp=share_link'>Resume</a>",
      "status.txt": "I am a student studying computer science",
      "contact_me.txt": "You can contact me at ambesh12k@gmail.com",
    },

  },
  command: ["cat", "ls", "pwd", "cd", "write", "clear", "help"],
};

function pwd() {
  return [`env/${CWD}`]
}

function ls() {
  var out = [];
  if (CWD == "home") {
    out = Object.keys(sandbox.env.home);
  } else if (CWD == "bin") {
    out = sandbox.env.bin;
  }
  return out;
}

function help() {
  var help = [
    "cat   :prints the content of a file",
    "ls    :list all the files in the directory",
    "pwd   :prints the working directory",
    "cd    :changes directory",
    "Write :writes to a file",
    "clear : Clears the screen"
  ]
  return help;
}

function clear() {
  var e = document.getElementById("output");
  var child = e.lastElementChild;
  while (child) {
    e.removeChild(child);
    child = e.lastElementChild;
  }
  return []
}

function cat(input) {
  var out = [];
  for (let i = 0; i < input.length; i++) {
    if (input[i] in sandbox.env[CWD]) {
      out.push(sandbox.env[CWD][input[i]]);
    } else {
      out.push("file not found!");
    }
  }
  return out;
}

function cd(input) {
  var dir = input.slice(1, input.length);
  if (dir in sandbox.env) {
    CWD = dir;
    return [`changed working dir to ${dir}`];
  } else {
    return ["directory not found"];
  }
}

function run(command) {
  const token = command.split(" ");
  if (sandbox.command.includes(token[0])) {
    switch (token[0]) {
      case "cat":
        return cat(token.slice(1, token.length));
      case "ls":
        return ls();
      case "help":
        return help();
      case "pwd":
        return pwd();
      case "cd":
        return cd(token[1]);
      case "write":
        break;
      case "clear":
        clear();
    }
  } else {
    return ["command not found!!"];
  }
}

var el = document.getElementById("input");
el.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    var output = document.getElementById("output");
    var input = document.getElementById("command").value;
    output.innerHTML += "<pre>$ " + input + "</pre>";

    var out = run(input);
    for (let i = 0; i < out.length; i++) {
      output.innerHTML += "<pre>" + out[i] + "</pre>";
    }
    var input = (document.getElementById("command").value = "");
  }
});

document.getElementById('command').addEventListener('blur', function () {
  this.value.length > 3 || this.focus();
});
var CWD = "home/ambesh";

const sandbox = {
  env: {
    bin: {
      "cat": "prints the content of a file", 
      "ls": "list all the files in the directory", 
      "pwd": "prints the current directory", 
      "cd": "changes directory", 
      "write": "writes to a file", 
      "clear": "clears the screen"
    },
    home: {
      ambesh: {
        "about_me.txt": "My name is Ayan Ambesh and im known by many names, Haven(current username)\nlink: <a target='_blank' href=''>Resume</a>",
        "status.txt": "I am a student studying computer science",
        "contact_me.txt": "not rn im busy",
      }
    },
    etc:{
      "contact.txt": "Email: ambesh.infosec@gmail.com \nGitHub: https://github.com/AYAN-AMBESH \nLinkedIn: https://www.linkedin.com/in/ayan-ambesh/",
    },
  },
  command: ["cat", "ls", "pwd", "cd", "write", "clear", "help"],
};

function pwd() {
  return [`env/${CWD}`]
}

function cat(input) {
  var out = [];
  let current = CWD.split('/').reduce((obj, path) => obj[path], sandbox.env);
  for (let i = 0; i < input.length; i++) {
    if (input[i] in current) {
      out.push(current[input[i]]);
    } else {
      out.push("file not found!");
    }
  }
  return out;
}

function ls() {
  var out = [];
  if (CWD === '') {
    out = Object.keys(sandbox.env);
  } else {
    try {
      let current = CWD.split('/').reduce((obj, path) => obj[path], sandbox.env);
      out = Object.keys(current);
    } catch (e) {
      out = ["directory not found"];
    }
  }
  return out;
}

function cd(input) {
  if (!input) return ["no directory specified"];
  
  let newPath = input;
  if (input === '/') {
    CWD = '';
    return [`changed working dir to root`];
  } else if (input.startsWith('/')) {
    newPath = input.slice(1);
  } else if (input === '..') {
    if (CWD === '') return [`already at root`];
    let parts = CWD.split('/');
    parts.pop();
    newPath = parts.join('/');
  } else {
    newPath = CWD ? CWD + '/' + input : input;
  }

  try {
    let pathExists = newPath.split('/').reduce((obj, path) => obj[path], sandbox.env);
    if (pathExists) {
      CWD = newPath;
      return [`changed working dir to ${newPath || 'root'}`];
    }
  } catch (e) {
    return ["directory not found"];
  }
  return ["directory not found"];
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


function write(args) {
  if (args.length < 2) {
    return ["Usage: write <filename> <content>"];
  }

  const filename = args[0];
  const content = args.slice(1).join(' ');
  
  try {
    let current = CWD.split('/').reduce((obj, path) => obj[path], sandbox.env);
    
    if (filename in current) {
      return [`File ${filename} already exists`];
    }
    
    current[filename] = content;
    return [`Created file ${filename}`];
  } catch (e) {
    return ["Cannot write file in this location"];
  }
}


const outputDiv = document.getElementById('output');
const commandInput = document.getElementById('command');

function appendOutput(output) {
  const pre = document.createElement('pre');
  if (Array.isArray(output)) {
    pre.textContent = output.join('\n');
  } else {
    pre.textContent = output;
  }
  outputDiv.appendChild(pre);
}

function handleCommand(command) {
  const args = command.trim().split(' ');
  const cmd = args[0].toLowerCase();
  const params = args.slice(1);

  switch (cmd) {
    case 'ls':
      return ls();
    case 'pwd':
      return pwd();
    case 'cd':
      return cd(params[0]);
    case 'cat':
      return cat(params);
    case 'clear':
      outputDiv.innerHTML = '';
      return [];
    case 'write':
      return write(params);
    case 'help':
      return help();
    default:
      return [`Command not found: ${cmd}`];
  }
}

commandInput.addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
    const command = this.value;
    
    appendOutput(`$ ${command}`);
    
    const output = handleCommand(command);
    if (output && output.length) {
      appendOutput(output);
    }
    
    this.value = '';
  }
});

window.addEventListener('load', () => {
  commandInput.focus();
});

document.querySelector('.main').addEventListener('click', () => {
  commandInput.focus();
});
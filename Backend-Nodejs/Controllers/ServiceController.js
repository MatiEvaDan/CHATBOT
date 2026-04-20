const { exec, execFile } = require("child_process");

exports.start = (req, res) => {
  execFile("powershell.exe", ["-Command", "Start-Service BookService"], (err) => {
    if (err) return res.status(500).send(err.message);
    res.send("started");
  });
};

exports.stop = (req, res) => {
  execFile("powershell.exe", ["-Command", "Stop-Service BookService"], (err) => {
    if (err) return res.status(500).send(err.message);
    res.send("stopped");
  });
};

exports.status = (req, res) => {
  exec("powershell Get-Service BookService", (err, stdout) => {
    res.send(stdout);
  });
};
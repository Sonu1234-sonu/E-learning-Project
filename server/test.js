import express from 'express';
import fs from 'fs';
const app = express();
const port = 5000;

fs.writeFileSync('test.log', 'Starting server...\n');

app.get('/', (req, res) => {
    res.send("server is working ");
});

app.listen(port, () => {
    fs.appendFileSync('test.log', `Server is running on http://localhost:${port}\n`);
});
});
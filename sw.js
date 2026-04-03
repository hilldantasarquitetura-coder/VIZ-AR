const http = require('http');
const fs = require('fs');
const path = require('path');

// Define a porta onde o servidor vai rodar
const PORT = 3000;

const server = http.createServer((req, res) => {
    // Define o arquivo padrão como index.html se a rota for a raiz '/'
    let filePath = '.' + req.url;
    if (filePath === './') {
        filePath = './index.html';
    }

    // Identifica a extensão do arquivo para enviar o tipo correto (MIME type)
    const extname = String(path.extname(filePath)).toLowerCase();
    const mimeTypes = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
    };

    const contentType = mimeTypes[extname] || 'application/octet-stream';

    // Lê e serve o arquivo solicitado
    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('<h1>404 - Arquivo não encontrado</h1>', 'utf-8');
            } else {
                res.writeHead(500);
                res.end('Erro interno do servidor: ' + error.code + ' \n');
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

// Inicia o servidor
server.listen(PORT, () => {
    console.log(`✅ Servidor rodando com sucesso!`);
    console.log(`👉 Acesse no seu navegador: http://localhost:${PORT}`);
    console.log(`Para encerrar o servidor, pressione CTRL + C`);
});

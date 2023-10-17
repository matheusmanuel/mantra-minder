const express = require('express');
const mantraRoutes = require('./routes/mantraRoutes');
const app = express();
const port = 3000;

/*
    - Os middlewares do Express são usados para processar as solicitações antes que elas atinjam as rotas.
    - express.static: Este middleware é usado para servir arquivos estáticos, como imagens, CSS ou JavaScript, 
    localizados na pasta public. Ele mapeia esses arquivos para serem acessíveis em URLs.
    - express.json(): Este middleware permite que o aplicativo interprete solicitações no formato JSON.
*/

app.use(express.json());
app.use(mantraRoutes);

app.get('/',(req,res)=>{
    res.send('Olá Mundo!');
});

// A aplicação vai ficar escutando aqui essa porta.
app.listen(port, ()=>{
    console.log(`server runnig in ${port}`);
});
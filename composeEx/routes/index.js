import { Router } from 'express';
import { connection } from 'mongoose';
var router = Router();
require('marko/node-require').install()// Habilita o uso do template Marko
import '@marko/express';
import Book, { find, insertMany } from '../models/Book';
import indexTemplate from '../views/index.marko';


// Busca a página e carrega os livros
router.get('/', (req, res) => {
    console.log("Exibindo a Home!")
    if(connection.readyState){
        find({}).then((books) => {
            res.marko(indexTemplate, {books: books})
        })
    }else{
        res.marko(indexTemplate)
    }
})


// Seed nos arquivos
router.get('/seed', (req,res) => {
    let livros = [
        new Book({
            name: "Arduino prático", 
            price: "R$39,90", 
            description: "10 projetos para executar, aprender, modificar e dominar o mundo", 
            cover: "arduino.jpg"
        }),
        new Book(
        {
            name: "MongoDB", 
            price: "R$39,90", 
            description: "Construa novas aplicações com novas tecnologias",  
            cover: "mongo.png"
        }),
         new Book({
            name: "Mean", 
            price: "R$39,90", 
            description: "Full stack JavaScript com MongoDB, Express, Angular e Node" ,
            cover: "mean.png"
        }),
        new Book({
            name: "Node.js", 
            price: "R$39,90", 
            description: "Os primeiros passos com Node.js",  
            cover: "livro-node.jpg"
        }),
        new Book({
            name: "TDD", 
            price: "R$39,90", 
            description: "Teste e Design no Mundo Real",  
            cover: "tdd.png"
        }),
        new Book(
        {
            name: "Métricas Ágeis", 
            price: "R$39,90", 
            description: "Obtenha melhores resultados em sua equipe",  
            cover: "metricas-ageis.jpg"
        })


    ]
                    
         
    insertMany(livros).then(moogoseDocuments => {
        console.log(moogoseDocuments, "Inseridos com sucesso")
    }).catch(err => {
        console.log(err)
    })  
    res.send("Livros salvos");
    
})

export default router;
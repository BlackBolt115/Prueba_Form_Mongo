const express = require('express');
const router = express.Router();
var Connection = require('tedious').Connection; 

// config for your database
var config = {  
    server: '104.198.248.20',  
    authentication: {
        type: 'default',
        options: {
            userName: 'dev_test', 
            password: 'D3v3l0p3r2021*'  
        }
    },
    options: {
        encrypt: true,
        database: 'DEV_TEST'  
    }
};  

var connection = new Connection(config);  
connection.on('connect', function(err) {  
    // If no error, then good to proceed.  
    console.log("Connected");  
    //executeStatement1();
});
    
connection.connect();



var Request = require('tedious').Request;  
var TYPES = require('tedious').TYPES;  
  
function executeStatement1() { 
    request = new Request("CREATE TABLE GASR13082021 (id INT NOT NULL, rangoInicial INT NOT NULL, rangoFinal INT NOT NULL, cantidad INT NOT NULL, PRIMARY KEY(id));", function(err) {  
        if (err) {  
            console.log(err);
        }  
    });
    connection.execSql(request); 
}

function executeStatement2(id, contador, inicio, fin) { 
    request = new Request("INSERT INTO GASR13082021(id, rangoInicial, rangoFinal, cantidad) VALUES ("+id+", "+inicio+", "+fin+", "+contador+");", function(err) {  
        if (err) {  
            console.log(err);
        }  
    });
            
    request.on('requestCompleted', function () {
        executeStatement();
    });

    connection.execSql(request); 
}

function executeStatement() {
        request = new Request("SELECT * FROM GASR13082021;", function(err) {  
            if (err) {  
                console.log(err);
            }  
        });
        var result = "";  
        request.on('row', function(columns) {  
            columns.forEach(function(column) {  
              if (column.value === null) {  
                console.log('NULL');  
              } else {  
                result+= column.value + " ";  
              }  
            });  
            console.log(result);  
            result ="";  
        });  
  
        request.on('done', function(rowCount, more) {  
            console.log(rowCount + ' rows returned');  
        });  

        connection.execSql(request);  
    }  





router.get('/', (req, res) =>{
    res.render('index');
});

var id=12;
router.post('/PrimePracticeApi/primes', (req, res)=>{
    const inicio = parseInt(req.body.inicio);
    const fin = parseInt(req.body.fin);
    let resultado = [];
    let contador=0;
    for(let i=inicio; i<=fin; i++){
        let flag=0;

        for(let j=2; j<i; j++){
            if(i%j==0){
                flag=1;
                break;
            }
        }

        if(flag ==0){
            resultado[contador]=i;
            contador = contador + 1;
        }

    }
    console.log(contador);
    console.log(resultado);
    id++;
    executeStatement2(id, contador, inicio, fin);
    if(contador<100){
        res.send(resultado);
    }else{
        res.send('Cantidad de Números primos entre '+inicio+' y '+fin+' son: '+contador);
    }
    
});

module.exports = router;
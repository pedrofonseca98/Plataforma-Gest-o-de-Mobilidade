var express = require("express");
var path = require("path");
var mysql = require("mysql");
var session = require("express-session");
var bodyParser = require("body-parser");
const { isBuffer } = require("util");
var nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const saltRounds = 10;
var Utilizador;

var app = express();

const db = mysql.createConnection({

    host:"localhost",
    user:"root",
    password:"",
    database:"project"
});


db.connect((err)=>{

    if(err){
        throw err;
    }
    console.log("Mysql connected")

});

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());




var transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
	  user: 'poikop007@gmail.com',
	  pass: 'Soulindo007'
	}
  });
  



//-----------------------Funções routing----------------------------------------
//FUNCIONARIOS
//submit funcionario
app.post('/submitUser', function(req, res, next) {

    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;
	var telemovel = req.body.telemovel;
	var CC = req.body.CC;
	var freguesia = req.body.freguesia;

	db.query('SELECT * FROM accounts WHERE email = ? ',[email],function (err, result) {
		db.query('SELECT * FROM passageiros WHERE email = ? ',[email],function (err, result2) {
		if (result.length > 0 || result2.length > 0 ){
			res.send("Erro email já existe");
		}else{
		 bcrypt.hash(password, saltRounds, function(err, hash) {
				var sql = `INSERT INTO accounts ( name, email, password, telemovel, CC , freguesia) VALUES ('${name}', '${email}', '${hash}', '${telemovel}', '${CC}','${freguesia}')`;
				db.query(sql,function (err, data) {
					if (err) throw err;
				});
			});
			/*
			var mailOptions = {
				from: 'poikop007@gmail.com',
				to: email,
				subject: 'Boleias do Fundão',
				text: 'Obrigado por se registar no nosso site aguarde pela sua confirmação para poder ajudar ! '
			  };

			  transporter.sendMail(mailOptions, function(error, info){
				if (error) {
				  console.log(error);
				} else {
				  console.log('Email sent: ' + info.response);
				}
			  });	  
			  */
			  res.redirect("/");
		}
	});
});
	

});



//listar boleias 
app.get("/listaBoleias", function(req,res){

	var sql = "SELECT * FROM boleiasidavolta";
	db.query(sql,function(err,data,fields){
	if (err) throw err;
	res.render("../views/boleiasLista",{ title: 'boleiasidavolta list', userData: data} );
	});

});

//listar boleias ida e volta e aceitar boleias

app.get("/boleiasteste", function(req,res){
	if (req.session.loggedin==1) {		
		var sql = 'SELECT * FROM boleiasidavolta WHERE permfinal = "Não Aceite"';
		db.query(sql,function(err,data,fields){
			if (err) throw err;
		res.render("../views/boleiasteste",{ title: 'boleiasidavolta list', userData: data} );
		});
}
});

function calPontos(p1, p2) {

var aux = 5;

	if(p1 == "Fundão" ){

		if (p2 == "Alcaide"){ aux = 12; }
		if (p2 == "Alcaria"){ aux = 15; }
		if (p2 == "Alcongosta"){ aux = 10; }
		if (p2 == "Alpedrinha") { aux = 20;	}
		if (p2 == "Barroca"){ aux = 33; }
		if (p2 == "Bogas de Cima"){ aux = 32; }
		if (p2 == "Capinha"){ aux = 25;	}
		if (p2 == "Castelo Novo"){ aux = 20; }
		if (p2 == "Enxames"){ aux = 18; }
		if (p2 == "Fatela"){ aux = 10; }
		if (p2 == "Fundão"){ aux = 5; }
		if (p2 == "Janeiro de Cima e Bogas de Baixo"){ aux = 50; }
		if (p2 == "Lavacolhos"){ aux = 18; }
		if (p2 == "Orca") { aux = 27; 	}
		if (p2 == "Pêro Viseu"){ aux = 17; }
		if (p2 == "Póvoa de Atalaia e Atalaia do Campo"){ aux = 22; }
		if (p2 == "Silvares"){ aux = 23; }
		if (p2 == "Soalheira"){ aux = 23; }
		if (p2 == "Souto da Casa"){ aux = 10; }
		if (p2 == "Telhado"){ aux = 12; }
		if (p2 == "Três Povos"){ aux = 30; }
		if (p2 == "Vale de Prazeres e Mata da Rainha"){ aux = 18; }
	}
	if(p1 == "Alcaide" ){

		if (p2 == "Alcaide"){ aux = 12; }
		if (p2 == "Alcaria"){ aux = 15; }
		if (p2 == "Alcongosta"){ aux = 10; }
		if (p2 == "Alpedrinha") { aux = 20;	}
		if (p2 == "Barroca"){ aux = 33; }
		if (p2 == "Bogas de Cima"){ aux = 32; }
		if (p2 == "Capinha"){ aux = 25;	}
		if (p2 == "Castelo Novo"){ aux = 20; }
		if (p2 == "Enxames"){ aux = 18; }
		if (p2 == "Fatela"){ aux = 10; }
		if (p2 == "Fundão"){ aux = 5; }
		if (p2 == "Janeiro de Cima e Bogas de Baixo"){ aux = 50; }
		if (p2 == "Lavacolhos"){ aux = 18; }
		if (p2 == "Orca") { aux = 27; 	}
		if (p2 == "Pêro Viseu"){ aux = 17; }
		if (p2 == "Póvoa de Atalaia e Atalaia do Campo"){ aux = 22; }
		if (p2 == "Silvares"){ aux = 23; }
		if (p2 == "Soalheira"){ aux = 23; }
		if (p2 == "Souto da Casa"){ aux = 10; }
		if (p2 == "Telhado"){ aux = 12; }
		if (p2 == "Três Povos"){ aux = 30; }
		if (p2 == "Vale de Prazeres e Mata da Rainha"){ aux = 18; }
	}
	if(p1 == "Alcaria" ){

		if (p2 == "Alcaide"){ aux = 12; }
		if (p2 == "Alcaria"){ aux = 15; }
		if (p2 == "Alcongosta"){ aux = 10; }
		if (p2 == "Alpedrinha") { aux = 20;	}
		if (p2 == "Barroca"){ aux = 33; }
		if (p2 == "Bogas de Cima"){ aux = 32; }
		if (p2 == "Capinha"){ aux = 25;	}
		if (p2 == "Castelo Novo"){ aux = 20; }
		if (p2 == "Enxames"){ aux = 18; }
		if (p2 == "Fatela"){ aux = 10; }
		if (p2 == "Fundão"){ aux = 5; }
		if (p2 == "Janeiro de Cima e Bogas de Baixo"){ aux = 50; }
		if (p2 == "Lavacolhos"){ aux = 18; }
		if (p2 == "Orca") { aux = 27; 	}
		if (p2 == "Pêro Viseu"){ aux = 17; }
		if (p2 == "Póvoa de Atalaia e Atalaia do Campo"){ aux = 22; }
		if (p2 == "Silvares"){ aux = 23; }
		if (p2 == "Soalheira"){ aux = 23; }
		if (p2 == "Souto da Casa"){ aux = 10; }
		if (p2 == "Telhado"){ aux = 12; }
		if (p2 == "Três Povos"){ aux = 30; }
		if (p2 == "Vale de Prazeres e Mata da Rainha"){ aux = 18; }
	}
	if(p1 == "Alpedrinha" ){

		if (p2 == "Alcaide"){ aux = 12; }
		if (p2 == "Alcaria"){ aux = 15; }
		if (p2 == "Alcongosta"){ aux = 10; }
		if (p2 == "Alpedrinha") { aux = 20;	}
		if (p2 == "Barroca"){ aux = 33; }
		if (p2 == "Bogas de Cima"){ aux = 32; }
		if (p2 == "Capinha"){ aux = 25;	}
		if (p2 == "Castelo Novo"){ aux = 20; }
		if (p2 == "Enxames"){ aux = 18; }
		if (p2 == "Fatela"){ aux = 10; }
		if (p2 == "Fundão"){ aux = 5; }
		if (p2 == "Janeiro de Cima e Bogas de Baixo"){ aux = 50; }
		if (p2 == "Lavacolhos"){ aux = 18; }
		if (p2 == "Orca") { aux = 27; 	}
		if (p2 == "Pêro Viseu"){ aux = 17; }
		if (p2 == "Póvoa de Atalaia e Atalaia do Campo"){ aux = 22; }
		if (p2 == "Silvares"){ aux = 23; }
		if (p2 == "Soalheira"){ aux = 23; }
		if (p2 == "Souto da Casa"){ aux = 10; }
		if (p2 == "Telhado"){ aux = 12; }
		if (p2 == "Três Povos"){ aux = 30; }
		if (p2 == "Vale de Prazeres e Mata da Rainha"){ aux = 18; }
	}

	return aux;
}

app.post("/aceitarBoleia",function(req, res, next){
	var id = req.body.id;
	var aux;
	var pontos;
	var viagem = "Ida";
	if (req.session.loggedin==1) {
		db.query('SELECT * FROM accounts WHERE email = ? ', [Utilizador], function(err, results, fields) {
			db.query('SELECT * from boleiasidavolta WHERE id = ?' ,[id],function(err,dataBoleia,fields) {
			
				db.query('UPDATE boleiasidavolta SET perm1 = "Aceite" WHERE id = ?' ,[id],function(err,data,fields) {
				}); 
				db.query('UPDATE boleiasidavolta SET permfinal = "Aceite" WHERE perm1 = "Aceite" AND perm2 = "Aceite" ;', (err,result) => {
					if(err) throw err;
				});
				db.query('UPDATE boleiasidavolta SET permfinal = "Aceite" WHERE perm1 = "Aceite" AND localfinal2 IS NULL ', (err,result) => {
					if(err) throw err;
				});
				var boleia = "O utilizad@r " + dataBoleia[0].name + " vai de " + dataBoleia[0].freguesia + ":" + dataBoleia[0].localinicial + " para "  + dataBoleia[0].freguesia1 + ":" + dataBoleia[0].localfinal + " das: " + dataBoleia[0].horainicial + " até " + dataBoleia[0].horafinal ;

				db.query(`INSERT INTO boleiasaceites (idUtilizador, idBoleia , nomeFuncionario , idFuncionario , viagem , nomePassageiro , contactoPassageiro  , boleiaPassageiro) VALUES ('${dataBoleia[0].idUtilizador}','${id}','${results[0].name}','${results[0].id}','${viagem}','${dataBoleia[0].name}','${dataBoleia[0].telemovel}','${boleia}')`, (err,result) => {
					if(err) throw err;
				});
					
				pontos = calPontos(dataBoleia[0].freguesia,dataBoleia[0].freguesia1);
				console.log("Pontos adicionados "+pontos);
				aux = results[0].pontos+pontos;

				db.query(`UPDATE accounts SET pontos = "?" WHERE email = ? ` ,[aux, Utilizador],function(err,data,fields) {
						console.log(aux);
					}); 	
			}); 

	});	
	res.redirect("/boleiasteste");
	}
});


app.post("/aceitarBoleia2",function(req, res, next){
	var id = req.body.id;
	var aux;
	var pontos;
	var viagem = "Volta";
	if (req.session.loggedin==1) {
		db.query('SELECT * FROM accounts WHERE email = ? ', [Utilizador], function(err, results, fields) {

			db.query('SELECT * from boleiasidavolta WHERE id = ?' ,[id],function(err,dataBoleia,fields) {

   				db.query('UPDATE boleiasidavolta SET perm2 = "Aceite" WHERE id = ? ' ,[id],function(err,data,fields) {
				}); 
				db.query('UPDATE boleiasidavolta SET permfinal = "Aceite" WHERE perm1 = "Aceite" AND perm2 = "Aceite" ;', (err,result) => {
      			  if(err) throw err;
   				 });

				var boleia = "O utilizad@r " + dataBoleia[0].name + " vai de " + dataBoleia[0].freguesia2 + ":" + dataBoleia[0].localinicial2 + " para "  + dataBoleia[0].freguesia3 + ":" + dataBoleia[0].localfinal2 + " das: " + dataBoleia[0].horainicial2 + " até " + dataBoleia[0].horafinal2 ;

				db.query(`INSERT INTO boleiasaceites (idUtilizador , idBoleia , nomeFuncionario , idFuncionario , viagem , nomePassageiro , contactoPassageiro  , boleiaPassageiro) VALUES ('${dataBoleia[0].idUtilizador}','${id}','${results[0].name}','${results[0].id}','${viagem}','${dataBoleia[0].name}','${dataBoleia[0].telemovel}','${boleia}')`, (err,result) => {
					if(err) throw err;
				});
			
					pontos = calPontos(dataBoleia[0].freguesia2,dataBoleia[0].freguesia3);
					console.log("Pontos adicionados "+pontos);
					aux = results[0].pontos+pontos;
	
						db.query(`UPDATE accounts SET pontos = "?" WHERE email = ? ` ,[aux, Utilizador],function(err,data,fields) {
							console.log(aux);
						}); 	
				}); 


		});	
	}
	res.redirect("/boleiasteste");
});


//Dados do funcionario
app.get("/funcionario", function(req,res){
	if (req.session.loggedin==1) {
	db.query('SELECT * FROM accounts WHERE email = ?',[Utilizador],function(err,data,fields){
	if (err) throw err;
	res.render("../views/funcionario",{ title: 'funcionario ', userData: data} );
	});
	}else{
	console.log("tentativa de entrada")
	}
});


app.get("/funcionarioAlterar", function(req,res){
	if (req.session.loggedin==1) {
	db.query('SELECT * FROM accounts WHERE email = ?',[Utilizador],function(err,data,fields){
	if (err) throw err;
	res.render("../views/funcionarioAlterar",{ title: 'funcionario ', userData: data} );
	});
	}
});

//alterar dados funcionario
app.post('/alterarDadosFuncionario', function(req, res, next) {

	var nome = req.body.nome;
	var telemovel = req.body.telemovel;
	var CC = req.body.CC;
	var freguesia = req.body.freguesia;
	if (req.session.loggedin==1) {
	if(nome){
		db.query('UPDATE accounts SET name = ?  WHERE email = ? ;',[nome,Utilizador], (err,result) => {
			if(err) throw err;
		});
	}
	if(telemovel){
		db.query('UPDATE accounts SET telemovel = ?  WHERE email = ? ;',[telemovel,Utilizador], (err,result) => {
			if(err) throw err;
		});
	}
	if(CC){
		db.query('UPDATE accounts SET CC = ?  WHERE email = ? ;',[CC,Utilizador], (err,result) => {
			if(err) throw err;
		});
	}
	if(freguesia){
		db.query('UPDATE accounts SET freguesia = ?  WHERE email = ? ;',[freguesia,Utilizador], (err,result) => {
			if(err) throw err;
		});
	}
    res.redirect("/funcionario");
	}
});


//boleias Aceites funcionario
app.get("/funBoleiasAceites", function(req,res){
	if (req.session.loggedin==1) {

	db.query('SELECT * FROM accounts WHERE email = ?',[Utilizador],function(err,result,fields){
		
		db.query('SELECT * FROM boleiasaceites WHERE idFuncionario = ?',[result[0].id],function(err,data,fields){

				res.render("../views/funcionarioAceites",{ title: 'funcionario ', userData: data} );
			});	

	});

	}
});


//------------------------------------------------------------------------------------------------------------

//login  
app.post('/loginAdmin', function(req, res) {
	var email = req.body.email;
    var name  = req.body.name;
	var password = req.body.password;
	var flag = 0;
	if (email && password) {

		db.query('SELECT * FROM admins WHERE email = ? AND password = ?', [email, password], function(err, results, fields) {
			if (results.length > 0 ) {
				req.session.loggedin = 2;
				req.session.name = name;
				res.redirect("/loggedAdmin"); 
			}
		});

		db.query('SELECT * FROM accounts WHERE email = ? AND perm = 1 ', [email], function(err, results, fields) {
			if (results.length > 0 ) {
			bcrypt.compare(password, results[0].password).then(function(result) {
			if (result == true ) {
				req.session.loggedin = 1;
				Utilizador = email;	
				res.redirect("/boleiasteste");
				}
			});
			}
		});

		db.query('SELECT * FROM passageiros WHERE email = ? ', [email], function(err, results, fields) {
			if (results.length > 0) {
				bcrypt.compare(password, results[0].password).then(function(result) {
			if (result == true ) {
				req.session.loggedin = 3;
				Utilizador = req.body.email;
				res.redirect("/loggedPassageiro");
		
			}
		});
		}
		});
	}

});


//________________________________________________________________________________________________________________
//ADMIN



// listar funcionários 
app.get("/darPermissao", function(req,res){
	if (req.session.loggedin==2) {
	var sql = "SELECT * FROM accounts  ";
	db.query(sql,function(err,data,fields){
	if (err) throw err;
	res.render("../views/darPermissao",{ title: 'accounts list', userData: data} );
	});

}
});


// mudar permissões funcionários
app.post("/altPermissao",function(req, res, next){
	var id = req.body.id;
	if (req.session.loggedin==2) {
    db.query('UPDATE accounts SET perm = 1 WHERE id = ? ',[id],function(err,data,fields) {
			//console.log(data);
	}); 
	db.query('SELECT * FROM  accounts WHERE id = ? ',[id],function(err,result,fields) {

				/*				
		var mailOptions = {
			from: 'poikop007@gmail.com',
			to: results[0].email,
			subject: 'Boleias do Fundão',
			text: 'Tem uma nova boleia na sua zona! '
		  };

		  transporter.sendMail(mailOptions, function(error, info){
			if (error) {
			  console.log(error);
			} else {
			  console.log('Email sent: ' + info.response);
			}
		  });	  
		  */
			
	}); 
	res.redirect("/darPermissao");
	}
});

app.post("/altPermissao2",function(req, res, next){
	var id = req.body.id;
	if (req.session.loggedin==2) {
    db.query('UPDATE accounts SET perm = 0 WHERE id = ? ',[id],function(err,data,fields) {
	//	console.log(data);
	}); 
	res.redirect("/darPermissao");
	}
});

app.post("/removerCondutor",function(req, res, next){
	var id = req.body.id;
	if (req.session.loggedin==2) {
    db.query('DELETE FROM accounts WHERE id = ?',[id],function(err,data,fields) {
	//	console.log(data);
	}); 
	res.redirect("/darPermissao");
	}
});


//Listar as boleias no admin
app.get("/listaBoleiasAdmin", function(req,res){
	if (req.session.loggedin==2) {
	var sql = 'SELECT * FROM boleiasidavolta ';
	db.query(sql,function(err,data,fields){
	if (err) throw err;
	res.render("../views/boleiasListaAdmin",{ title: 'boleiasidavolta list', userData: data} );
	});
}
});
//listar passageiros
app.get("/listaPassageiros", function(req,res){
	if (req.session.loggedin==2) {
	var sql = 'SELECT * FROM passageiros ';
	db.query(sql,function(err,data,fields){
	if (err) throw err;
	res.render("../views/listaPassageirosAdmin",{ title: 'passageiros list', userData: data} );
	});
}
});

//remover passageiros
app.post("/removerPassageiro",function(req, res, next){
	var id = req.body.id;	
	if (req.session.loggedin==2) {
    db.query('DELETE FROM passageiros WHERE id = ?' ,[id],function(err,data,fields) {
		var sql = 'SELECT * FROM passageiros ';
		db.query(sql,function(err,data,fields){
		if (err) throw err;
		res.render("../views/listaPassageirosAdmin",{ title: 'passageiros list', userData: data} );
		});
	});
	}
});

// lista de boleias Aceites
app.get("/listaBoleiasAceites", function(req,res){
	if (req.session.loggedin==2) {
	var sql = 'SELECT * FROM boleiasaceites ';
	db.query(sql,function(err,data,fields){
	if (err) throw err;
	res.render("../views/listaBoleiasAceites",{ title: 'boleiasidavolta list', userData: data} );
	});
	}
});

//Registar utilizadores sem mail e pass( guests)
app.post('/regUtilizador', function(req, res, next) {

    var name = req.body.name;
	var telemovel = req.body.telemovel;
	var CC = req.body.CC;
	var freguesia = req.body.freguesia;
	if (req.session.loggedin==2) {
	db.query('SELECT * FROM passageiros WHERE telemovel = ? ',[telemovel],function (err, result) {
		if (result.length > 0 ){
			console.log("erro nao da para ensirir");
		}else{
   			var sql = `INSERT INTO passageiros ( name, telemovel, CC , freguesia ) VALUES ('${name}','${telemovel}', '${CC}', '${freguesia}')`;
    		db.query(sql,function (err, data) {
    			if (err) throw err;
   			 });
		}

	 });
	}
    res.redirect("/loggedAdmin");
});

app.post('/boleiaAdmin', function(req, res, next) {

	var name = req.body.nome;
	var telemovel = req.body.telemovel;
	var CC = req.body.CC;
	var data = req.body.data;
	var horainicial = req.body.horainicial;
	var horafinal = req.body.horafinal;
	var localinicial = req.body.localinicial;
	var localfinal = req.body.localfinal;
	var freguesia = req.body.freguesia;
	var freguesia1 = req.body.freguesia1;
	var descricao = req.body.descricao;

	if (req.session.loggedin==2) {
 		var sql1 = `INSERT INTO boleiasidavolta ( name, telemovel, CC, data, horainicial , horafinal , freguesia , localinicial , freguesia1 , localfinal, descricao) VALUES ('${name}', '${telemovel}', '${CC}','${data}','${horainicial}','${horafinal}','${freguesia}','${localinicial}','${freguesia1}','${localfinal}','${descricao}')`;
   		db.query(sql1,function (err, data) {
    		if (err) throw err;
  		 });

    res.redirect("/loggedAdmin");
	}
});

app.post('/boleiaAdminIV', function(req, res, next) {

	var name = req.body.nome;
	var telemovel = req.body.telemovel;
	var CC = req.body.CC;
	var data = req.body.data;
	var horainicial1 = req.body.horainicial1;
	var horafinal1 = req.body.horafinal1;
	var localinicial1 = req.body.localinicial1;
	var localfinal1 = req.body.localfinal1;
	var horainicial2 = req.body.horainicial2;
	var horafinal2 = req.body.horafinal2;
	var localinicial2 = req.body.localinicial2;
	var localfinal2 = req.body.localfinal2;
	var freguesia = req.body.freguesia;
	var freguesia1 = req.body.freguesia1;
	var freguesia2 = req.body.freguesia2;
	var freguesia3 = req.body.freguesia3;
	var descricao = req.body.descricao;

	if (req.session.loggedin==2) {
	db.query('SELECT * FROM passageiros WHERE email = ?',[Utilizador],function(err,result,fields){
	
		var sql2 = `INSERT INTO boleiasidavolta ( name, telemovel, CC, data, horainicial , horafinal , freguesia ,localinicial , freguesia1 , localfinal, horainicial2 , horafinal2 , freguesia2 , localinicial2 , freguesia3 , localfinal2 , descricao) VALUES ('${name}', '${telemovel}', '${CC}', '${data}','${horainicial1}','${horafinal1}','${freguesia}','${localinicial1}','${freguesia1}','${localfinal1}','${horainicial2}','${horafinal2}','${freguesia2}','${localinicial2}','${freguesia3}','${localfinal2}','${descricao}')`;
    	db.query(sql2,function (err, data) {
    		if (err) throw err;
    	});
	});
	
    res.redirect("/loggedAdmin");
	}
});

app.post("/addcupao",function(req, res, next){
	var cupao = req.body.cupao;
	var ncupoes = req.body.ncupoes;
	var custo = req.body.custo;
	var estado = "Não Redimido"
	var numeroCupao =	Math.floor(Math.random() * (999999999999 - 900000000000)) + 900000000000;
	if (req.session.loggedin==2) {
		while(ncupoes>0){
			var seed =	Math.floor(Math.random() * (999999999 - 900000000)) + 900000000;
   			 db.query(`INSERT INTO cupoes (cupao , numeroCupao , custo , estado , seed) VALUES ('${cupao}','${numeroCupao}','${custo}','${estado}','${seed}')`,function(err,data,fields) {
			}); 
		ncupoes--;
		}
	res.redirect("/loggedAdmin");
	}
});


app.get("/cupoens", function(req,res){
	if (req.session.loggedin==1) {
		db.query('SELECT * FROM accounts WHERE email = ?',[Utilizador],function(err,result,fields){
			var sql = 'SELECT * FROM cupoes WHERE estado = "Não Redimido"';
			db.query(sql,function(err,data,fields){
				if (err) throw err;
			res.render("../views/cupoens",{ pontosData: result, userData: data} );
			});
		});
	}
});

app.post("/redimirCupao",function(req, res, next){
	var id = req.body.id;
	var pontosFinais; 
	if (req.session.loggedin==1) {
		db.query('SELECT * FROM  accounts WHERE email = ?',[Utilizador],function(err,result,fields){
			db.query('SELECT * FROM cupoes WHERE id = ?',[id],function(err,results,fields){
						pontosFinais = result[0].pontos - results[0].custo ;
				if( result[0].pontos > results[0].custo ){
				db.query('UPDATE accounts SET pontos = ?  WHERE email = ? ',[pontosFinais,Utilizador],function(err,data,fields) {
				}); 
				db.query('UPDATE cupoes SET estado =  "Redimido" , idCondutor = "?" WHERE id = ? ',[result[0].id,id],function(err,data,fields) {
				}); 

					
				var mailOptions = {
				from: 'poikop007@gmail.com',
				to: result[0].email,
				subject: 'Boleias do Fundão: CUPÃO Redimido',
				text: 'Obrigado por utilizar a nossa plataforma ! \n O seu cupão é '+ results[0].cupao + ' o código do seu cupão é ' + results[0].seed ,
				};
				transporter.sendMail(mailOptions, function(err, info){
							if(err) throw err;
				  });	  
				
				}
			
				else{
					res.send("ERROR nao pode redimir");
				}
		
			}); 
		}); 
	


	res.redirect("/boleiasteste");
	}
});



//_________________________________________________________________________________________________
//PASSAGEIRO


// sumit boleia Ida
app.post('/submitBoleiaIda', function(req, res, next) {

	var data = req.body.data;
	var dataFinal = req.body.dataFinal;
	var horainicial = req.body.horainicial;
	var horafinal = req.body.horafinal;
	var localinicial = req.body.localinicial;
	var localfinal = req.body.localfinal;
	var freguesia = req.body.freguesia;
	var freguesia1 = req.body.freguesia1;
	var descricao = req.body.descricao;

	var it;

	if (req.session.loggedin==3) {
		if (dataFinal){
				
			var splitsInicio = data.split('-', 3);
			var splitsFinal = dataFinal.split('-', 3);

			var diaInicio =	parseInt(splitsInicio[2]);
			var diaFinal = parseInt(splitsFinal[2]);

			db.query('SELECT * FROM passageiros WHERE email = ?',[Utilizador],function(err,result,fields){	
				var diferenca = diaFinal - diaInicio ; 
				for(it=0;it<diferenca+1;it++){
					if (diaFinal >= diaInicio){
					
						var auxData = splitsInicio[0]+ '-' + splitsInicio[1]+ '-' + diaInicio;
						var sql1 = `INSERT INTO boleiasidavolta ( idUtilizador ,name, telemovel, CC, data, horainicial , horafinal , freguesia , localinicial , freguesia1 , localfinal, descricao, dataFinal) VALUES ('${result[0].id}','${result[0].name}', '${result[0].telemovel}', '${result[0].CC}','${auxData}','${horainicial}','${horafinal}','${freguesia}','${localinicial}','${freguesia1}','${localfinal}','${descricao}','${dataFinal}')`;	
						db.query(sql1,function (err, data) {
							if (err) throw err;
						});	
					}
				diaInicio++;
				}
			});
		}else{

			db.query('SELECT * FROM passageiros WHERE email = ?',[Utilizador],function(err,result,fields){
 				var sql1 = `INSERT INTO boleiasidavolta ( idUtilizador, name, telemovel, CC, data, horainicial , horafinal , freguesia , localinicial , freguesia1 , localfinal, descricao, dataFinal) VALUES ('${result[0].id}','${result[0].name}', '${result[0].telemovel}', '${result[0].CC}','${data}','${horainicial}','${horafinal}','${freguesia}','${localinicial}','${freguesia1}','${localfinal}','${descricao}','${dataFinal}')`;
   				db.query(sql1,function (err, data) {
    				if (err) throw err;
  				 });
				});
			}
	db.query('SELECT * FROM accounts WHERE freguesia = ?',[freguesia],function(err,results,fields){

			if (results.length > 0){
				for (i= 0 ; i<results.length ; i++){	
					console.log(results[i].email);	
					/*				
			var mailOptions = {
				from: 'poikop007@gmail.com',
				to: results[i].email,
				subject: 'Boleias do Fundão',
				text: 'Tem uma nova boleia na sua zona! '
			  };

			  transporter.sendMail(mailOptions, function(error, info){
				if (error) {
				  console.log(error);
				} else {
				  console.log('Email sent: ' + info.response);
				}
			  });	  
			  */
				}
			}
	 });


    res.redirect("/loggedPassageiro");
	}
});

// sumit boleia Ida e volta 
app.post('/submitBoleiaIdaVolta', function(req, res, next) {

	var data = req.body.data;
	var dataFinal = req.body.dataFinal;
	var horainicial1 = req.body.horainicial1;
	var horafinal1 = req.body.horafinal1;
	var localinicial1 = req.body.localinicial1;
	var localfinal1 = req.body.localfinal1;
	var horainicial2 = req.body.horainicial2;
	var horafinal2 = req.body.horafinal2;
	var localinicial2 = req.body.localinicial2;
	var localfinal2 = req.body.localfinal2;
	var freguesia = req.body.freguesia;
	var freguesia1 = req.body.freguesia1;
	var freguesia2 = req.body.freguesia2;
	var freguesia3 = req.body.freguesia3;
	var descricao = req.body.descricao;
	var i,j;

	if (req.session.loggedin==3) {
		if (dataFinal){
				
			var splitsInicio = data.split('-', 3);
			var splitsFinal = dataFinal.split('-', 3);

			var diaInicio =	parseInt(splitsInicio[2]);
			var diaFinal = parseInt(splitsFinal[2]);

			db.query('SELECT * FROM passageiros WHERE email = ?',[Utilizador],function(err,result,fields){	
				var diferenca = diaFinal - diaInicio ; 
				for(it=0;it<diferenca+1;it++){
					if (diaFinal >= diaInicio){
					
						var auxData = splitsInicio[0]+ '-' + splitsInicio[1]+ '-' + diaInicio;
						var sql2 = `INSERT INTO boleiasidavolta (idUtilizador, name, telemovel, CC, data, horainicial , horafinal , freguesia ,localinicial , freguesia1 , localfinal, horainicial2 , horafinal2 , freguesia2 , localinicial2 , freguesia3 , localfinal2 , descricao, dataFinal) VALUES ('${result[0].id}','${result[0].name}', '${result[0].telemovel}', '${result[0].CC}', '${auxData}','${horainicial1}','${horafinal1}','${freguesia}','${localinicial1}','${freguesia1}','${localfinal1}','${horainicial2}','${horafinal2}','${freguesia2}','${localinicial2}','${freguesia3}','${localfinal2}','${descricao}','${dataFinal}')`;
						db.query(sql2,function (err, data) {
							if (err) throw err;
						});
					}
				diaInicio++;
				}
			});
		}else{

			db.query('SELECT * FROM passageiros WHERE email = ?',[Utilizador],function(err,result,fields){
				var sql2 = `INSERT INTO boleiasidavolta ( idUtilizador, name, telemovel, CC, data, horainicial , horafinal , freguesia ,localinicial , freguesia1 , localfinal, horainicial2 , horafinal2 , freguesia2 , localinicial2 , freguesia3 , localfinal2 , descricao, dataFinal) VALUES ('${result[0].id}','${result[0].name}', '${result[0].telemovel}', '${result[0].CC}', '${data}','${horainicial1}','${horafinal1}','${freguesia}','${localinicial1}','${freguesia1}','${localfinal1}','${horainicial2}','${horafinal2}','${freguesia2}','${localinicial2}','${freguesia3}','${localfinal2}','${descricao}','${dataFinal}')`;
				db.query(sql2,function (err, data) {
					if (err) throw err;
				});
				});
			}
	
	db.query('SELECT * FROM accounts WHERE freguesia = ? ',[freguesia],function(err,results,fields){

		if (results.length > 0){
			for (i= 0 ; i<results.length ; i++){	
				console.log(results[i].email);	
				/*				
		var mailOptions = {
			from: 'poikop007@gmail.com',
			to: results[i].email,
			subject: 'Boleias do Fundão',
			text: 'Tem uma nova boleia na sua zona! '
		  };

		  transporter.sendMail(mailOptions, function(error, info){
			if (error) {
			  console.log(error);
			} else {
			  console.log('Email sent: ' + info.response);
			}
		  });	  
		  */
			}
		}
	 });

	 db.query('SELECT * FROM accounts WHERE freguesia = ? ',[freguesia2],function(err,results,fields){

		if (results.length > 0){
			for (j= 0 ; j<results.length ; j++){	
				console.log(results[j].email);	
				/*				
		var mailOptions = {
			from: 'poikop007@gmail.com',
			to: results[j].email,
			subject: 'Boleias do Fundão',
			text: 'Tem uma nova boleia na sua zona! '
		  };
		  transporter.sendMail(mailOptions, function(error, info){
			if (error) {
			  console.log(error);
			} else {
			  console.log('Email sent: ' + info.response);
			}
		  });	  
		  */
			}
		}
	});

    res.redirect("/loggedPassageiro");
	}
});

app.post('/submitPassageiro', function(req, res, next) {

    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;
	var telemovel = req.body.telemovel;
	var CC = req.body.CC;
	var freguesia = req.body.freguesia;

	db.query('SELECT * FROM passageiros WHERE email = ? ',[email],function (err, result) {
		if (result.length > 0 ){
			console.log("erro nao da para ensirir");
		}else{
			bcrypt.hash(password, saltRounds, function(err, hash) {
   			var sql = `INSERT INTO passageiros ( name, email, password, telemovel, CC , freguesia ) VALUES ('${name}', '${email}', '${hash}', '${telemovel}', '${CC}', '${freguesia}')`;
    		db.query(sql,function (err, data) {
    			if (err) throw err;
   			 });
			});
		}

	 });

    res.redirect("/");
});


//Dados do utilizador
app.get("/utilizador", function(req,res){
	if (req.session.loggedin==3) {
	db.query('SELECT * FROM passageiros WHERE email = ?',[Utilizador],function(err,data,fields){
	if (err) throw err;
	res.render("../views/utilizador",{ title: 'utilizador ', userData: data} );
	});
}
});

app.get("/utilizadorAlterar", function(req,res){
	if (req.session.loggedin==3) {
	db.query('SELECT * FROM passageiros WHERE email = ?',[Utilizador],function(err,data,fields){
	if (err) throw err;
	res.render("../views/utilizadorAlterar",{ title: 'utilizador ', userData: data} );
	});
	}
});

//alterar dados
app.post('/alterarDados', function(req, res, next) {

	var nome = req.body.nome;
	var telemovel = req.body.telemovel;
	var CC = req.body.CC;
	var freguesia = req.body.freguesia;
	if (req.session.loggedin==3) {
	if(nome){
		db.query('UPDATE passageiros SET name = ?  WHERE email = ? ;',[nome,Utilizador], (err,result) => {
			if(err) throw err;
		});
	}
	if(telemovel){
		db.query('UPDATE passageiros SET telemovel = ?  WHERE email = ? ;',[telemovel,Utilizador], (err,result) => {
			if(err) throw err;
		});
	}
	if(CC){
		db.query('UPDATE passageiros SET CC = ?  WHERE email = ? ;',[CC,Utilizador], (err,result) => {
			if(err) throw err;
		});
	}
	if(freguesia){
		db.query('UPDATE passageiros SET freguesia = ?  WHERE email = ? ;',[freguesia,Utilizador], (err,result) => {
			if(err) throw err;
		});
	}

    res.redirect("/utilizador");
	}
});

//As minhas Boleias 

app.get("/minhasBoleias", function(req,res){
	if (req.session.loggedin==3) {		
		db.query('SELECT * FROM passageiros WHERE email = ?',[Utilizador],function(err,result,fields){
		

		db.query('SELECT * FROM boleiasidavolta WHERE idUtilizador = ? ',[result[0].id],function(err,data,fields){
			if (err) throw err;
		res.render("../views/boleiasPassageiro",{ title: 'boleiasAtuais list', userData: data} );
		});
	
	});	
}
});

//____________________________________________________________________________________________________

// logout
app.get("/logout", function(req,res){
	req.session.loggedin =false;
    res.redirect("/");
	Utilizador="";
});


//_____________________________________________________________________________________________________

app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "views"));

app.set("view engine","ejs");

app.use("/",require("./routes/web"));
app.use("/api",require("./routes/api"));


app.listen(app.get("port"),function(){

    console.log("server up on port " + app.get("port"));
});

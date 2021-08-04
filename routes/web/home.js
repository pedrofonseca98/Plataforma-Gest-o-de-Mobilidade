var express = require("express");
var bodyParser = require("body-parser");
var mysql = require("mysql");

var db = require("../../app");


var router = express.Router();

// HOME 

router.get("/", function(req , res){

      res.render("index");
  });
  

router.get("/about", function(req,res){

    res.render("../views/homeabout");

});

// FUNCIONARIOS

router.get("/singup", function(req,res){

    res.render("../views/singup");

});

router.get("/login", function(req,res){

    res.render("../views/login");

});

router.get("/logged", function(req, res) {
	if (req.session.loggedin==1) {
		res.render("../views/logged");
	} else {
		res.send('Please login to view this page!');
	}
	res.end();
});



router.get("/listaBoleias", function(req,res){
	if (req.session.loggedin==1) {
    res.render("../views/boleiasLista");
	}else{
		res.send("erro. tem de estar autenticado");
	}

});


router.get("/listaBoleias2", function(req,res){
	if (req.session.loggedin==1) {
    res.render("../views/boleiasLista2");
	}else{
		res.send("erro. tem de estar autenticado");
	}

});
/*
router.get("/boleiasteste", function(req,res){
	if (req.session.loggedin==1) {
    res.render("../views/boleiasteste");
	}else{
		res.send("erro. tem de estar autenticado");
	}

});
*/
router.get("/funcionario", function(req, res) {
	if (req.session.loggedin==1) {
		res.render("../views/funcionario");
	} else {
		res.send('Please login to view this page!');
	}
	res.end();
});

router.get("/funcionarioAlterar", function(req, res) {
	if (req.session.loggedin==1) {
		res.render("../views/funcionarioAlterar");
	} else {
		res.send('Please login to view this page!');
	}
	res.end();
});

router.get("/cupoens", function(req, res) {
	if (req.session.loggedin==1) {
		res.render("../views/cupoens");
	} else {
		res.send('Please login to view this page!');
	}
	res.end();
});


//-----------------------------------------------


// ADMINS 

router.get("/loginAdmin", function(req,res){

    res.render("../views/loginAdmin");


});

router.get("/loggedAdmin", function(req, res) {
	if (req.session.loggedin==2) {
		res.render("../views/loggedAdmin");
	} else {
		res.send('Please login to view this page!');
	}
	res.end();
});



router.get("/listaBoleiasAdmin", function(req,res){
	if (req.session.loggedin==2) {
	res.render("../views/boleiasListaAdmin");
} else {
	res.send('Please login to view this page!');
}
res.end();
});

router.get("/listaPassageirosAdmin", function(req,res){
	if (req.session.loggedin==2) {
	res.render("../views/boleiasListaAdmin");
} else {
	res.send('Please login to view this page!');
}
res.end();
});


router.get("/listaBoleiasAceites", function(req,res){
	if (req.session.loggedin==2) {
	res.render("../views/listaBoleiasAceites");
} else {
	res.send('Please login to view this page!');
}
res.end();
});

router.get("/regUtilizadorAdmin", function(req,res){
	if (req.session.loggedin==2) {
	res.render("../views/registoAdmin");
} else {
	res.send('Please login to view this page!');
}
res.end();
});
router.get("/pedirBoleiaAdmin", function(req,res){
	if (req.session.loggedin==2) {
	res.render("../views/pedirBoleiaAdmin");
} else {
	res.send('Please login to view this page!');
}
res.end();
});

router.get("/pedirBoleiaAdminIV", function(req,res){
	if (req.session.loggedin==2) {
	res.render("../views/pedirBoleiaAdminIV");
} else {
	res.send('Please login to view this page!');
}
res.end();
});

router.get("/adicionarCupao", function(req, res) {
	if (req.session.loggedin==2) {
		res.render("../views/adicionarCupao");
	} else {
		res.send('Please login to view this page!');
	}
	res.end();
});



//PASSAGEIROS

router.get("/singupPassageiro", function(req,res){

    res.render("../views/singupPassageiro");

});

router.get("/loginPassageiro", function(req,res){

    res.render("../views/loginPassageiro");


});
router.get("/ajuda", function(req,res){

    res.render("../views/homeboleias");


});

router.get("/erro", function(req,res){

    res.render("../views/erro");


});



router.get("/loggedPassageiro", function(req, res) {
	if (req.session.loggedin==3) {
		res.render("../views/loggedPassageiro");
	} else {
		res.send('Please login to view this page!');
	}
	res.end();
});

router.get("/pedirBoleiaIda", function(req, res) {
	if (req.session.loggedin==3) {
		res.render("../views/pedirBoleiaIda");
	} else {
		res.send('Please login to view this page!');
	}
	res.end();
});


router.get("/pedirBoleiaIdaVolta", function(req, res) {
	if (req.session.loggedin==3) {
		res.render("../views/pedirBoleiaIdaVolta");
	} else {
		res.send('Please login to view this page!');
	}
	res.end();
});

router.get("/utilizador", function(req, res) {
	if (req.session.loggedin==3) {
		res.render("../views/utilizador");
	} else {
		res.send('Please login to view this page!');
	}
	res.end();
});

router.get("/utilizadorAlterar", function(req, res) {
	if (req.session.loggedin==3) {
		res.render("../views/utilizadorAlterar");
	} else {
		res.send('Please login to view this page!');
	}
	res.end();
});


module.exports = router;
  
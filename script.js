let nbRelance = 0;
let nbValidation =0;

function unDes() {
	let unDes = Math.floor(Math.random()*6)+1;
	return unDes
	}

function enlevePossibilite() {
	$('.possible td:nth-child(2) .btn').fadeOut('fast');
	$('.possible td:nth-child(2) .btn-success').empty();
	}

function faceIdentique(tableau) {
	let nbIndex = [0,0,0,0,0,0];
	for (let face = 1; face < 7; face++) {
		let iTab = 0
		while ( iTab < 5 ) {
			if (tableau.indexOf(face, iTab) != -1) {
				iTab = (tableau.indexOf(face, iTab)+1);
				nbIndex[(face-1)]++;
				} else { 
					iTab = iTab +5; 
					}
		}
	}
	return nbIndex;	
	}

function possibilite(tableau) {
	let Sec = 5;
	let indexScore = ['#UN','#DEUX','#TROIS','#QUATRE','#CINQ','#SIX'];
	let nbFace = faceIdentique(tableau);
	let suiteTest = nbFace.join('').split('0');

	if (nbRelance < 2) {
		Sec = 0;
	}

	for (let i = 0; i<6; i++) {
		if ( nbFace[i] > 0 && $(indexScore[i]).hasClass('possible')) {
			$(indexScore[i]+' td:nth-child(2) .btn-success').html(nbFace[i]*(i+1)).fadeIn('slow');
			} else if ($(indexScore[i]).hasClass('possible')) {
				$(indexScore[i]+' td:nth-child(2) .btn-danger').fadeIn('slow');
				}
	}

	let suiteMemoire = 0;
	for (let i = 0; i < suiteTest.length; i++) {
		if (suiteTest[i].length > suiteMemoire) {
			suiteMemoire = suiteTest[i].length;
		}
	}
	if (suiteMemoire === 5 && $('#SUITE').hasClass('possible')) {
		$('#SUITE td:nth-child(2) .btn-success').html(40+Sec).fadeIn('slow');
		} else if (suiteMemoire === 4 && $('#SUITE').hasClass('possible')) {
			$('#SUITE td:nth-child(2) .btn-success').html(30+Sec).fadeIn('slow');
			} else if ($('#SUITE').hasClass('possible')) {
				$('#SUITE td:nth-child(2) .btn-danger').fadeIn('slow');
				}

	if (nbFace.indexOf(3) != -1 && nbFace.indexOf(2) != -1 && $('#FULL').hasClass('possible')) {
		$('#FULL td:nth-child(2) .btn-success').html(30+Sec).fadeIn('slow');
		} else if ($('#FULL').hasClass('possible')) {
			$('#FULL td:nth-child(2) .btn-danger').fadeIn('slow');
			}

	if ( (nbFace.indexOf(3) != -1 || nbFace.indexOf(4) != -1 || nbFace.indexOf(5) != -1 ) && $('#BRELAN').hasClass('possible')) {
		$('#BRELAN td:nth-child(2) .btn-success').html(20+Sec).fadeIn('slow');
	} else if ($('#BRELAN').hasClass('possible')) {
		$('#BRELAN td:nth-child(2) .btn-danger').fadeIn('slow');
	}
	
	if ( (nbFace.indexOf(4) != -1 || nbFace.indexOf(5) != -1) && $('#CARRE').hasClass('possible')) {
		$('#CARRE td:nth-child(2) .btn-success').html(40+Sec).fadeIn('slow');
		} else if ($('#CARRE').hasClass('possible')) {
				$('#CARRE td:nth-child(2) .btn-danger').fadeIn('slow');
				}

	if (nbFace.indexOf(5) != -1 && $('#YAMS').hasClass('possible')) {
		$('#YAMS td:nth-child(2) .btn-success').html(50+Sec).fadeIn('slow');
		} else if ($('#YAMS').hasClass('possible')) {
				$('#YAMS td:nth-child(2) .btn-danger').fadeIn('slow');
				}

	if ($('#CHANCE').hasClass('possible')) {
		$('#CHANCE td:nth-child(2) .btn-success').html(tableau[0]+tableau[1]+tableau[2]+tableau[3]+tableau[4]).fadeIn('slow');
	}

}

function lanceDes() {
	$('#relancer').hide();
	let desInterval = setInterval(function() {
		for (let i = 0; i < $('.lancable').length; i++) {
			let desCourant = $('.lancable')[i]
			$(desCourant).attr('src', 'face'+unDes()+'.png').hide().fadeIn(200);
		}
	},200);

	setTimeout(function(){
		let mesDesLance = [];
		clearInterval(desInterval);
		for (let i = 0; i < 5; i++) {
			mesDesLance.push(Number(/\d/.exec( $('#des'+i).attr('src'))[0]));
		}
		possibilite(mesDesLance);
		if (nbRelance > 0) {
			$('#relancer').fadeIn('slow');
		}
	},1500);
}

function afficheRelance() {
	$('.nbRelance').html('relance : '+nbRelance).fadeIn('slow');
}

function barrer(ligneClique) {
	let contenu = ligneClique.children('td:nth-child(1)').html();
	ligneClique.addClass('danger').removeClass('possible warning');
	ligneClique.children('td:nth-child(1)').html('<s>'+contenu+'</s>');
	enlevePossibilite();
	afficheTotal();
	afficheDes();
}

function valider(ligneClique) {
	ligneClique.addClass('success').removeClass('possible warning');
	enlevePossibilite();
	afficheTotal();
	afficheDes();
}

function afficheDes() {
	$('#relancer').show().hide();
	$('#mesDes').fadeOut('slow', function() {
		$('#lancer').fadeIn('fast', function() {
			$('.des').removeClass('lancable unlancable').addClass('lancable');
		});	
	});
}

function afficheTotal() {
	let nbSuccess = $('tbody:eq(0) tr.success').length;
	let total = 0;
	for (let i = 0; i < nbSuccess; i++) {
		total = total + Number($('tbody:eq(0) tr.success td:nth-child(2) .btn-success').eq(i).prop("textContent"));
	};
	if (total >= 63) {
		$('#PRIME').parent().removeClass('warning').addClass('primeSuccess');
		$('#PRIME').next().html(35);
	} else if ($('tbody:eq(0) .possible').length == 0 && total < 63) {
		$('#PRIME').parent().removeClass('warning').addClass('danger');
		$('#PRIME').next().html('0');	
		$('#PRIME').html('<s>63+ Prime</s>');
	}
	$('#total').html(total);

	let totalSecSup = 0;
	if (total >= 63) {
		totalSecSup = total + 35;
		} else {
			totalSecSup = total;
			}
	$('#totalSecSup').html(totalSecSup);

	let nbSuccessInf = $('tbody:eq(1) tr.success').length;
	let totalSecInf = 0;
	for (let i = 0; i < nbSuccessInf; i++) {
		totalSecInf = totalSecInf + Number($('tbody:eq(1) tr.success td:nth-child(2) .btn-success').eq(i).html());
	};
	$('#totalSecInf').html(totalSecInf);

	let totalGen = totalSecSup + totalSecInf;
	$('#totalGen').html(totalGen);

}

function affichageRatio() {
	$('html').css('height', $(window).height());
	$('body').css({'max-width': $('html').width(), 'max-height': $('html').height()});
	if ( ($('html').width()/$('html').height()) < (16/9)) {
		$('body').width($('html').width());	
		$('body').height($('html').width()/(16/9));
	} else if ( ($('html').width()/$('html').height()) > (16/9) ) {
		$('body').height($('html').height());
		$('body').width($('html').height()*(16/9));	
	}	
	let htmlBodyDiff = (($('html').height()-($('body').height()+2)))/2;
	$('body').css('margin-top', htmlBodyDiff+'px');
	// autres
	$('table button').height($('table button').parent().height()*0.76);
	$('table button').css('max-height', $('table button').parent().height());
	$('.desContainer').height($('.desContainer').width());
}

function openPage(pageName, elmnt, color) {
    $('.bandeauHaut').hide();
    $(".onglet").css('background-color', "");;
	$('.tHeader, #'+pageName).css('background-color', color).show();

    $(elmnt).css('background-color', color);
}

$(document).ready(function() {

	affichageRatio();
	$(window).resize(function() {
		affichageRatio();
    });

	$('table button, #mesDes, #relancer, .nbRelance, .bandeauHaut').hide();
	$("#defaultOpen").click();

	$('#lancer').click(function() {
		$(this).hide();
		lanceDes();
		nbValidation = 1;
		nbRelance = 2;
		afficheRelance();
		$('#mesDes').fadeIn('fast');
		affichageRatio();	
	});
	$('#relancer').click(function() {
		if (nbRelance > 0) {
			lanceDes();
			nbRelance--;
			}
		afficheRelance();
		enlevePossibilite();
	});

	$('table button').click(function() {
		if (nbValidation > 0 && $(this).parent().parent().hasClass('possible')) {
			if ($(this).hasClass('btn-success')) {
				valider($(this).parent().parent());
				$(this).prop("disabled",true);
				$('.nbRelance').fadeOut('slow');
				nbValidation--;
			} else if ($(this).hasClass('btn-danger')) {
				barrer($(this).parent().parent());
				nbValidation--;
				$(this).prop("disabled",true);
				$('.nbRelance').fadeOut('slow');
				}
				}	
	});

	$('.des').click(function() {
		$(this).toggleClass('lancable unlancable');
		if ($('.lancable').length == 0) {
			$('#relancer').fadeOut('fast');
			} else if ( $('.lancable').length > 0 && nbRelance > 0) {
				$('#relancer').fadeIn('fast');
				}
	});

});
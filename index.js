$(function(){
	var model =[
		//['Number ','Name','Countclick','Image','isAdmin'],
		['1','lolo','0','cat01.jpg',true],['2','pipi','0','cat02.jpg',true],['3','cili','0','cat03.jpg',false],
		['4','coco','0','cat04.jpg',true],['5','mimi','0','cat05.jpg',false],['6','nini','0','cat06.jpg',true]
	];

	var octopus ={
		init:function(){
			//model exite the first
			view.init();
			this.idCurrent=0;
			UpdateCat.init();
		},
		getListCat: function(){
			return model;
		},
		getDetaisCatbyId:function(id){
			idCurrent=id;
			return model[id];
		},
		setCountbyId:function(id,count){
			model[id-1][2]= count;// The id is start with 0 should be -1 & second Element is the CountClick
		},
		getAdmin: function(){
			var disabled =  model[idCurrent][4] ;//== true ? true : false;
			return disabled;
		},
		UpdateCat:function(Name,Click,Image){
			if(Name != '')
			model[idCurrent][1]=Name;
			if(Click != '')
			model[idCurrent][2]=Click;
			if(Image != '')
			model[idCurrent][3]=Image;
		},
		UpdateCatListView:function(){
			view.render();
		}

		
	}

	var view = {
		init: function(){

			ListCats = $('#listCats tbody'),
			ListCatEvent = $('#listCats tbody tr'),
			DetaisCat = $("#DetaisCat");

			idCat = $('#idCat'),
			idcount =$('#idcount'),
			$Image = $('#catImg'),
			NameCat = $('#namecat');

			view.render();
			UpdateCat.init();
		},
		render: function(){
			var htmlStr ='';
			octopus.getListCat().forEach(function(cat){
				// DRY
				htmlStr +='<tr>';
				htmlStr +='<th>'+cat[0]+'</th>';// id
				htmlStr +='<th>'+cat[1]+'</th>';// Name
				htmlStr += '</tr>';
				
			});
			ListCats.html(htmlStr);
			// Add Event Click to Table tr And Replace the window with Data Cat Id Select By User
			$('#listCats tbody tr').on('click',function(e){

				var id =parseInt(this.cells[0].innerText);
				var dataDetaiscat = octopus.getDetaisCatbyId(id -1 );
				DetaisCat.show();
				// DRY
				octopus.idCurrent=dataDetaiscat[0];

				idCat.html(dataDetaiscat[0]);
				NameCat.html(dataDetaiscat[1]);
				idcount.html(dataDetaiscat[2]);
				$Image.attr('src',dataDetaiscat[3]);
				
			
				
			});
			$Image.off();
			// Count the time click the Image and To the Data to a Model
			$Image.on('click',function(e){
				count =parseInt(idcount[0].innerText) + 1;
				idcount.html(count);
				console.info(count);
				octopus.setCountbyId(idCat[0].innerText,count);
			})
		}

	}
var UpdateCat ={
	init:function(){
		$formAdmin = $('#formadmin'),
		isAdmin=$('#btnisAdmin'),
		$Name =$('#editName'),
		$image = $('#editImage'),
		$Click = $('#editClick'),
		Save = $('#submit'),
		Cancel = $('#cancel');
		UpdateCat.render();
	},
	render: function(){
		isAdmin.click(function(){
			if(octopus.getAdmin()) 
			$formAdmin.show();
			else
			$formAdmin.hide();
		}),
		Cancel.click(function(){
			$formAdmin.hide();
		}),
		Save.click(function(){
			octopus.UpdateCat($Name.val(),$Click.val(),$image.val());
			octopus.UpdateCatListView();
			console.log(model);
		});
		
	}
}	



octopus.init();
});
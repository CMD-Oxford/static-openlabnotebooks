jQuery( document ).ready(function() {
	var ketcherFrame = document.getElementById('ketcher-frame');
	
	
	// Get the modal
	var modal = document.getElementById('myModal');

	// Get the button that opens the modal
	var btn = document.getElementsByClassName("sub-search")[0];

	// Get the <span> element that closes the modal
	var span = document.getElementsByClassName("close")[0];

	// When the user clicks on the button, open the modal 
	btn.onclick = function() {
		modal.style.display = "block";
		ketcherFrame.src = '/wp-content/plugins/sgc-chem-structures/ketcher/ketcher.html';
	}

	// When the user clicks on <span> (x), close the modal
	span.onclick = function() {
		modal.style.display = "none";
	}

	// When the user clicks anywhere outside of the modal, close it
	window.onclick = function(event) {
		if (event.target == modal) {
			modal.style.display = "none";
		}
	}
	
	
	
	jQuery("#search-ok").on("click", function() {
		//Get hold of the Ketcher element
		var ketcher = null;
		
		if ('contentDocument' in ketcherFrame) {
			ketcher = ketcherFrame.contentWindow.ketcher;
			var molBlock = ketcher.getMolfile();
			//console.log(molBlock);
			var molBlockReplaced = molBlock.replace( /\n/g, "|8888|");
			molBlockReplaced = molBlockReplaced.replace(/ /g, "|7777|");
			
			var sim_threshold =  jQuery('#threshold').val();
			console.log(sim_threshold);
			
			//Search request			
			var url = 'https://thesgc.github.io/static-openlabnotebooks/wp-content/plugins/sgc-chem-structures/sgc-chem-search.php';
			var params = 'molblock=' + molBlockReplaced + '&threshold=' + sim_threshold;
			//console.log(params);
			var http = new XMLHttpRequest();
			http.open('POST', url, true);
			http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			
			http.onreadystatechange = function() {
				if(this.readyState == 4 && this.status == 200) {
			
					//Generate results table
					//console.log('Response: ' + http.response);
					var searchResults = document.getElementById('search-results');

				  var table = document.createElement('table');
					
					var thead = document.createElement('thead');
					thead.innerHTML = '<tr><th>Structure</th><th>Title</th><th>Author</th><th>Catgeories</th></tr>';		
					
					var tbdy = document.createElement('tbody');
					
					var results_obj = JSON.parse(http.responseText);
					for (var key in results_obj) {
						var single_compound  = results_obj[key];
						console.log(single_compound);
						
						if (single_compound.error == 'Internal error - please contact the system administrator') {
							alert('Error');
							return;
						}
						
						var image = single_compound.png_image;
						var postID = single_compound.elnid;
						var title = single_compound.title;		
							var tr = document.createElement('tr');
					
					
								var td1 = document.createElement('td');
								var img = document.createElement("img");
								img.src = 'data\:image\/png;base64,' + image;
								td1.appendChild(img);
								
								var td2 = document.createElement('td');
								
								var link = document.createElement('a');
								link.href = window.location.host + '/index.php?page_id=' + postID;
								td2.appendChild(link);
							

								td2.setAttribute('valign', 'middle');
								td2.style.verticalAlign = 'middle';
	
								link.appendChild(document.createTextNode(title));
								
								
								tr.appendChild(td1);
								tr.appendChild(td2);

								var authorTd = document.createElement('td');
								authorTd.appendChild(document.createTextNode(single_compound.author));
								tr.appendChild(authorTd);
								authorTd.setAttribute('valign', 'middle');
								authorTd.style.verticalAlign = 'middle';

								var catTd = document.createElement('td');
								catTd.appendChild(document.createTextNode(single_compound.categories));
								tr.appendChild(catTd);
								catTd.setAttribute('valign', 'middle');
								catTd.style.verticalAlign = 'middle';

							
							tbdy.appendChild(tr);
					}
					
					table.appendChild(thead);
					table.appendChild(tbdy);
					searchResults.innerHTML = '';
					searchResults.appendChild(table);
					
				}
			}
			http.send(params);


		}
	});

	
	jQuery('#select-type').change(function(){
		if(jQuery(this).val() == 'similarity'){
			jQuery('#threshold').val('').prop( "disabled", false);
		}
		else {
			jQuery('#threshold').val('').prop( "disabled", true);
		}
	});


})

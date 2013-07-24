$(function(){
	$('body').on('flatdoc:ready', function(){
		$('.content h3').each(function(){
			var link = document.createElement('a');
			link.href = '#' + this.id;
			link.textContent = '#';

			this.innerHTML = this.textContent.replace(/^(.*)(\.|#)/gi,'<small>$1</small>$2');
			//console.log(link.href)
			$(this).append(link);
		});

		$('.menu ul.level-3 li a').each(function(){
			this.innerHTML = this.textContent.replace(/^(.*)(\.|#)/gi,'$2');
		});	
	});
});
define(['Gremlin'], function(G){
  return G.define('HelloWorld', function(){
    this.el.innerHTML = 'Hello World!';
  })
});
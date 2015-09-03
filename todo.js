$(document).ready( function() {

  // MODEL
  var Todo = Backbone.Model.extend({
    defaults: {
      title: '',
      // order: function that finds the next one Todos.nextOrder();
      done: false
    }

  });


  // COLLECTION

  var Todos = Backbone.Collection.extend({
    model: Todo,

  });



  // MODEL VIEW

  // toggle done state

  var TodoView = Backbone.View.extend({
    template: _.template('<div class="todo-item"><div class="todo-title"><%- title %></div><div class="todo-done"><%- done %></div>'),

    render: function() {
      this.$el.html(this.template(this.model.attributes));
      return this.$el;
    }


  });




  // APP VIEW
  var AppView = Backbone.View.extend({

    el: $('body'),

    render: function() {
      this.$el.empty();
      // calls rendertodo on each todo item
      this.collection.forEach(this.rendertodo, this);
    },

    rendertodo: function(todo) {
      // renders view for each todo item
      var todoview = new TodoView({model: todo});
      this.$el.append(todoview.render());
    }
    
  });

  var todoList = [{title:'eat dinner'}, {title:'sleep'}, {title:'drink water'}];
  var todos = new Todos(todoList); //creates empty collection of todo list. dont pass anything in because you have no data right now to create a collection
  var todo = new Todo(); //creates defaulted todo item

  var app = new AppView({el: $('body'), collection: todos}).render(); // renders the app view in the body

}) ;
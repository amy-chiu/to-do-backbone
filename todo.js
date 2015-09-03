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

    initialize: function() {
      this.model.on('change', this.render, this); //anytime there is a change on the model, rerender. you can also set it to all and it will detect anything
    },

    events: {
      'click .todo-done': 'toggle'
    },

    toggle: function() { //this has to rerender, which you have in your initialize. ALSO make sure to use get and set to access your attributes in the model. view knows of the model bc of when it was instantiated. 

      if(this.model.get('done') === false) {
        this.model.set('done', true);
      } else {
        this.model.set('done', false);
      }
    

    },


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
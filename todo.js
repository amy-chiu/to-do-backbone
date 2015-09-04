$(document).ready( function() {

  // MODEL
  var Todo = Backbone.Model.extend({
    defaults: {
      title: '',
      // order: function that finds the next one Todos.nextOrder();
      done: 'done'
    }

  });


  // COLLECTION

  var Todos = Backbone.Collection.extend({
    model: Todo,


  });


  // MODEL VIEW

  // toggle done state

  var TodoView = Backbone.View.extend({
    template: _.template('<div class="todo-item"><div class="todo-done"><%- done %></div><div class="todo-title"><%- title %></div></div>'),

    initialize: function() {
      this.model.on('change', this.render, this); //anytime there is a change on the model, rerender. you can also set it to all and it will detect anything
    },

    events: {
      'click .todo-done': 'toggle'
    },

    toggle: function() { //this has to rerender, which you have in your initialize. ALSO make sure to use get and set to access your attributes in the model. view knows of the model bc of when it was instantiated. 

      //if(this.model.get('done') === 'done') {
        this.model.destroy(); // removes from the list when you click false
      //}
      // } else {
      //   this.model.set('done', false);
      // }

    },

    render: function() {
      this.$el.html(this.template(this.model.attributes));
      return this.$el;
    }

  });

  var InputView = Backbone.View.extend({
    el: '<div class ="form"><input type="text" class="input-value"></input><button type="submit" class="submit">add item</button></div>',

    events: {
      'click .submit': 'captureValue'
    },

    captureValue: function() {
      var inputVal = this.$el.find('.input-value').val(); // can also use $('.input-value') - doing it with $el limits the search on the DOM
      this.collection.add([  //soooo this is adding correctly to the collection, but when the appview renders it, you need to specify the event listener to be on "add" or "all"
        {'title': inputVal}
      ]);

    },

    render: function() {
       return this.$el;
    }
  });


  // APP VIEW
  var AppView = Backbone.View.extend({

    el: $('body'),

    initialize: function() {
      this.collection.on('all', this.render, this) 
    },

    render: function() {
      this.$el.empty();
      var inputField = new InputView({collection: todos}); 
      this.$el.append(inputField.render()); // this wasn't working because we needed to create a render function on inputview
      this.collection.forEach(this.rendertodo, this); // calls rendertodo on each todo item
    },

    rendertodo: function(todo) {
      // renders view for each todo item
      var todoview = new TodoView({model: todo});
      this.$el.append(todoview.render());
    }
    
  });

  //MAKE SURE YOU INSTANTIATE SHIT

  var todoList = [{title:'eat dinner'}, {title:'sleep'}, {title:'drink water'}];
  var todos = new Todos(todoList); //creates empty collection of todo list. dont pass anything in because you have no data right now to create a collection
  var todo = new Todo(); //creates defaulted todo item

  var app = new AppView({el: $('body'), collection: todos}).render(); // renders the app view in the body

}) ;
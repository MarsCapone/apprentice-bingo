var app = angular.module("apprenticeBingo", []);

app.factory("Tile", function() {
  "use strict";
  var Tile = function(value) {
    this.value = value;
    this.marked = false;
    this.inBingo = false;
  };
  
  Tile.prototype.change = function() {
    this.marked = !this.marked;
  };
  
  return Tile;
});


app.factory("BingoTable", function(Tile) {
  "use strict";
  var BingoTable = function(size) {
    this.table = [];
    this.size = size;
  };
  
  BingoTable.prototype.populate = function(dataset) {
    var tableValues = _.sample(dataset, this.size * this.size);
    
    for (var r=0; r<this.size; r++) {
      var row = [];
      for (var c=0; c<this.size; c++) {
        row[c] = new Tile(tableValues[(r*this.size) + c]);
      }
      this.table[r] = row;
    }
  };
  
  BingoTable.prototype.setWin = function() {
    var win = BingoTable.prototype.checkWin();
    if (win) {
      for (var tile in win) {
        tile.bingo = true;
      }
    }
  };
  
  BingoTable.prototype.reset = function() {
    for (var r=0; r<this.size; r++) {
      for (var c=0; c<this.size; c++) {
        var tile = this.table[r][c];
        tile.marked = false;
        tile.inBingo = false;
      }
    }
  };
  
  
  BingoTable.prototype.checkWin = function() {
  /* Possible ways to win, where N is the number 
      of rows and columns.
  1. N tiles in same row.
  2. N tiles in same column.
  3. N tiles where row == column
  4. N tiles where the row is N-r, col is c
   */
   
    var win = false;
    
    var isMarked = function(r, c) {
      return this.table[r][c].marked;
    };
   
    return win;
  };
  
  return BingoTable;
});

app.controller("apprenticeBingoController",  function($scope, $http, BingoTable) {
  "use strict";
	$http.get("data.json")
	     .then(function(response) {
	       $scope.content = response.data;
	     });
	$scope.config = {
	  gridTypes: ["candidates", "tasks", "interviews"], 
	  tableCounts: [1, 2, 3]};
	$scope.bingoSize = {size: 3, tableCount: 1};
	$scope.gridType = "tasks";
	$scope.bingoTables = null;
	$scope.getBingoTables = function(dataset) {
	  var tables = [];
	  for (var i=0; i<$scope.bingoSize.tableCount; i++) {
	    var bT = new BingoTable($scope.bingoSize.size);
	    bT.populate($scope.content[$scope.gridType]);
	    tables[i] = bT;
	  }
	  return tables;
	};
});
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
    if (this.inBingo) {
      this.inBingo = false;
    }
  };
  
  return Tile;
});


app.factory("BingoTable", function(Tile) {
  "use strict";
  var BingoTable = function(size) {
    this.table = [];
    this.N = size;
  };
  
  BingoTable.prototype.populate = function(dataset) {
    var tableValues = _.sample(dataset, this.N * this.N);
    
    for (var r=0; r<this.N; r++) {
      var row = [];
      for (var c=0; c<this.N; c++) {
        row[c] = new Tile(tableValues[(r*this.N) + c]);
      }
      this.table[r] = row;
    }
  };
  
  BingoTable.prototype.reset = function() {
    for (var r=0; r<this.N; r++) {
      for (var c=0; c<this.N; c++) {
        var tile = this.table[r][c];
        tile.marked = false;
        tile.inBingo = false;
      }
    }
  };
  
  
  BingoTable.prototype.hasWon = function() {
  /* Possible ways to win, where N is the number 
      of rows and columns.
  1. N tiles in same row.
  2. N tiles in same column.
  3. N tiles where row == column
  4. N tiles where the row is N-r, col is c
   */
   
    var size = this.N;
    var table = this.table;
    var tiles = [];
    var tile = null;
    var isMarked = function(r, c) {
      return table[r][c].marked;
    };
   
    var checkRow = function(row) {
      for (var i=0; i<size; i++) {
        if (!isMarked(row, i)) {
          tiles = [];
          return false;
        } 
        tile = table[row][i];
        if (tiles.indexOf(tile) < 0) {
          tiles.push(tile);
        }
      }
      return true;
    };
    
    var checkColumn = function(column) {
      for (var i=0; i<size; i++) {
        if (!isMarked(i, column)) {
          tiles = [];
          return false;
        } 
        tile = table[i][column];
        if (tiles.indexOf(tile) < 0) {
          tiles.push(tile);
        }
      }
      return true;
    };
    
    var checkDiagonals = function() {
      var d1 = true; var d2 = true;
      for (var i=0; i<size; i++) {
        if (!isMarked(i, i)) {
          d1 = false;
          break;
        } 
        tile = table[i][i];
        if (tiles.indexOf(tile) < 0) {
          tiles.push(tile);
        }
      }
      for (var j=0; j<size; j++) {
        if (!isMarked(size-j-1, j)) {
          d2 = false;
          break;
        } 
        tile = table[size-1-j][j];
        if (tiles.indexOf(tile) < 0) {
          tiles.push(tile);
        }
      }
      return d1 || d2;
    };
   
    for (var k=0; k<this.N; k++) {
      var rowCheck = checkRow(k);
      var columnCheck = checkColumn(k);
      if (rowCheck || columnCheck) {
        console.log("win along a row");
        return tiles;
      }
    }
    if (checkDiagonals()) {
      console.log("win along a diagonal");
      return tiles;
    }
    return false;
  };
  
  return BingoTable;
});

app.controller("apprenticeBingoController",  function($scope, $http, BingoTable) {
  "use strict";
	$http.get("./app/data.json")
	     .then(function(response) {
	       $scope.content = response.data;
	     });
	$scope.config = {
	  gridTypes: ["candidates", "tasks", "interviews"], 
	  tableCounts: [1, 2, 3]
	};
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
	$scope.setWins = function() {
	  var result = false;
	  for (var n=0; n<$scope.bingoTables.length; n++) {
	    var tiles = $scope.bingoTables[n].hasWon();
	    if (tiles) {
	      //result = tiles;
	      // some possibity of having connected tiles change colours,
	      // but haven't quite worked out logistics.
	      //TODO ^that.
	      result = true;
	      break;
	    }
	  }
	  
	  //result.forEach(function(tile) {
	  //   tile.inBingo = true;
	  //});
	  
	  $scope.win = result;
	};
	$scope.win = false;
});
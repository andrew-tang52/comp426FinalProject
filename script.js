
//using jquery and coding logic for reversi

$(function () {

  var board = $('.grid');
  var black = $('.blackDisplay');
  var white = $('.whiteDisplay');
  var winner = $('.winner');
  var squares = 64;

  setupGrid();

  var $lis = board.find('li');
  var turn = 'white';

  $lis.on('click', makeMove);

  function setupGrid() {
    board.empty();

    while (squares--) {
      board.append('<li />');
    }

    //add the first four squares in the middle of the board 

    //takes the element at the index of the 4 middle pieces
    $('li:eq(27), li:eq(36)').addClass('white');
    $('li:eq(28), li:eq(35)').addClass('black');
  }

  function makeMove(e) {
    //el is square clicked
    var el = $(e.target);
    //checks for other conditions before placing piece
    //if cell is free then you check square for matches
    if (cellIsFree(el)) checkForMatches(el);
  }

  function checkForMatches($el) {
    var index = $lis.index($el);
    //only can go where there is a token on other side of opposite color pieces
    var validMoves = [1, 9, 8, 7, -1, -9, -8, -7].filter(function (n) {
      //filter for n
      return checkDirection(n, index);
    });
    if (validMoves.length) {
        //console.log('validMoves:', validMoves);
      $el.addClass(turn);
      //after the piece is placed then switch whos turn it is
      toggleTurn();
    }
  }

  //check if the space has a token in it
  function cellIsFree($el) {
    return !$el.hasClass('white') && !$el.hasClass('black');
  }

  function toggleTurn() {
    turn = opposingColor(turn);
    board.toggleClass('whiteGo blackGo');
  }

  function opposingColor(currentTurn) {
    return currentTurn === 'white' ? 'black' : 'white';
  }

  //see if spot if valid by checking all cases 
  function overEdge(n, index) {
    return overTop(n, index) || overBottom(n, index) || overRight(n, index) || overLeft(n, index);
  }

  function overTop(n, index) {
    return index + n < 0;
  }

  function overBottom(n, index) {
    return index + n > 63;
  }

  function overLeft(n, index) {
    return index % 8 === 0 && (index + n) % 8 === 7;
  }

  function overRight(n, index) {
    return index % 8 === 7 && (index + n) % 8 === 0;
  }

  function checkDirection(n, index) {
    var toFlip = [];
    var looping = true;

    while (looping) {
      // starting from the index clicked, first check if it's on the edge, and if the first move would take it over the edge - if so break and don't bother looping again
      if (checkIfEdge(index) && overEdge(n, index)) {
        looping = false;
        break;
      }
      // add n to the index to check the next cell in that direction
      index += n;
      // grab that cell from the DOM
      var $el = $lis.eq(index);
      // if there is a cell and the cell does not have the opposing color don't bother looping again, else push cell into toFlip
      if (!$el.hasClass(opposingColor(turn))) looping = false;
      else toFlip.push($el);
    }

    if (toFlip.length) return isValidMove(toFlip, n);
  }

  function isValidMove(toFlip, n) {
    // find last element in toFlip array and find its index in the $lis array
    var $el = toFlip[toFlip.length - 1];
    var index = $lis.index($el);

    // if it's on the edge, and the next move would take it over the edge, empty the toFlip array
    if (checkIfEdge(index) && overEdge(n, index)) {
      toFlip = [];
    }

    // if there are still elements in the array, and the next counter has the correct class, flip all of the counters
    if (toFlip.length && $lis.eq(index + n).hasClass(turn)) {
      flipCounters(toFlip);
      return true;
    }

    return false;
  }

  //counts each flip
  function flipCounters(toFlip) {
    var classToAdd = turn;
    $.each(toFlip, function (i, $el) {
      setTimeout(function () {
        return addClasses($el, classToAdd);
      }, 100 * (i + 1));
    });
  }

  //actual placing tokens 
  function addClasses($el, classToAdd) {
    $el.addClass(classToAdd + ' pulse').removeClass(opposingColor(classToAdd)).delay(1000).queue(function () {
      $el.removeClass('pulse').dequeue();
    });
    updateDisplay();
  }

  function checkIfEdge(index) {
    return index < 8 || index > 55 || index % 8 === 0 || index % 8 === 7;
  }

  function updateDisplay() {
    black.text($('.black').length);
    white.text($('.white').length);
    checkForWin();
  }

  function checkForWin() {
      //check to see if board is full
    if ($('li:not(.white):not(.black)').length === 0) {
      if ($('.black').length > $('.white').length) {
        winner.text('Black wins!');
      } else if ($('.black').length < $('.white').length) {
        winner.text('White wins!');
      } else {
        winner.text('It\'s a draw!');
      }
    }
  }
});
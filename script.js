let board = [];
let width = 70;
let height = 50;
let cells = width * height;
let running = 0;
let delay = 50;
let generation = 0;
let ReactCell;

$(document).ready(function() {
	$(".gen").text("0");
	$(".population").text("0");
	clearBoard();
	initialSet();
	createBoard();
	activateBoard();
	running = 1;
	runIt();
});


function clearBoard() {
	board = [];
	for (let i = 0; i < (cells); i++) {
		board[i] = {id: i, status: "cell dead"};
	}
	generation = 0;
	$(".gen").text("0");
};

function createBoard() {
	$('#container').empty();

	ReactCell = React.createClass({
		
		getInitialState: function() {
			return {cellBoard: board};
		},
		componentDidMount: function() {
		},
		componentWillUnmount: function() {
		},
		updateCells: function() {
			this.setState({cellBoard: this.props.board});
		},
		render: function() {

			return (
				<div>
					{this.props.board.map(function(cell, i) {
						return(<div className={cell.status} key={i} id={i}></div>);
					})
					}
				</div>
			);
	    }
	});
		
	drawBoard();
}

function runGeneration() {

	let newBoard = [];

	let cellStatus = '';

	for (let i = 0; i < (cells); i++) {

		newBoard.push({id: i, status: "cell dead"});

		let check = cellCheck(i);

		if ((board[i].status == "cell alive" || board[i].status == "cell alive old") && (check == 3 || check == 2)) {
			newBoard[i] = {id: i, status: "cell alive old"};
		}
		if (board[i].status == "cell dead" && check == 3) {
			newBoard[i] = {id: i, status: "cell alive"};
		}

	};
	
	for (let i = 0; i < cells; i++) {
		if (board[i].status == "cell alive" || board[i].status == "cell alive old") {break;}
		if (i == cells - 1) {
      $('.clear').addClass('activeButton');
      setTimeout(function() {
        $('.clear').removeClass('activeButton');
      }, 400);
			running = 0;
			clearBoard();
			drawBoard();
		}
	}
	
	return newBoard;
};


function drawBoard(passedBoard) {
	ReactDOM.render(<ReactCell board={board} generation={generation}/>, document.getElementById('container'));
};


function activateBoard() {
	$('.cell').click(function() {
		var cellNum = $(this).attr('id');
		if (board[cellNum].status == "cell alive" || board[cellNum].status == "cell alive old") {
			board[cellNum].status = "cell dead";
		} else {
			board[cellNum].status = "cell alive";
		}
		drawBoard();
		console.log(cellNum + " " + board[cellNum].status);
	})

	$('.clear').click(function() {
		$('.stop').removeClass('activeButton');
		$('.clear').addClass('activeButton');
		setTimeout(function() {
			$('.clear').removeClass('activeButton');
		}, 700);
		running = 0;
		generation = 0;
		clearBoard();
		drawBoard();
		$(".gen").text('0');
		$(".population").text('0');
	});

	$('.run').click(function() {
		$('.stop').removeClass('activeButton');
		$('.reset').removeClass('activeButton');
		$('.run').addClass('activeButton');
		setTimeout(function() {
			$('.run').removeClass('activeButton');
		}, 700);
		running = 1;
		runIt();
	});

	$('.stop').click(function() {
		$('.stop').addClass('activeButton');
		running = 0;
	});

	$('.50').click(function() {
		running = 0;
		width = 50;
		height = 30;
		cells = width * height;
		clearBoard();
		createBoard();
		$('.70').removeClass('activeButton');
		$('.100').removeClass('activeButton');
		$('.50').addClass('activeButton');
		$('.cell:nth-child(70n + 1)').css("clear", "none");
		$('.cell:nth-child(100n + 1)').css("clear", "none");
		$('.cell:nth-child(50n + 1)').css("clear", "both");
		$('.cell').css({"width":"12px","height":"12px"})
		$('#container').css({"width": "650px", "height": "390px"});
		removeListeners();	
		activateBoard();
		console.log("w: " + width + " h: " + height);
	});
	$('.70').click(function() {
		running = 0;
		width = 70;
		height = 50;
		cells = width * height;
		clearBoard();
		createBoard(board);
		$('.50').removeClass('activeButton');
		$('.100').removeClass('activeButton');
		$('.70').addClass('activeButton');
		$('.cell:nth-child(100n + 1)').css("clear", "none");
		$('.cell:nth-child(50n + 1)').css("clear", "none");
		$('.cell:nth-child(70n + 1)').css("clear", "both");
		$('.cell').css({"width":"11px","height":"11px"})
		$('#container').css({"width": "840px", "height": "600px"});
		removeListeners();		
		activateBoard();
		console.log("w: " + width + " h: " + height);
	});
	$('.100').click(function() {
		running = 0;
		width = 100;
		height = 80;
		cells = width * height;
		clearBoard();
		createBoard(board);
		$('.50').removeClass('activeButton');
		$('.70').removeClass('activeButton');
		$('.100').addClass('activeButton');
		$('.cell:nth-child(50n + 1)').css("clear", "none");
		$('.cell:nth-child(70n + 1)').css("clear", "none");
		$('.cell:nth-child(100n + 1)').css("clear", "both");
		$('.cell').css({"width":"8px","height":"8px"})
		$('#container').css({"width": "900", "height": "720"});
		removeListeners();
		activateBoard();
		console.log("w: " + width + " h: " + height);
	});
	$('.slow').click(function() {
		delay = 200;
		$('.medium').removeClass('activeButton');
		$('.fast').removeClass('activeButton');
		$('.slow').addClass('activeButton');
	});
	$('.medium').click(function() {
		delay = 110;
		$('.slow').removeClass('activeButton');
		$('.fast').removeClass('activeButton');
		$('.medium').addClass('activeButton');
	});
	$('.fast').click(function() {
		delay = 50;
		$('.slow').removeClass('activeButton');
		$('.medium').removeClass('activeButton');
		$('.fast').addClass('activeButton');
	});
};

function removeListeners() {
	$('.50').off();
	$('.70').off();
	$('.100').off();
	$('.run').off();
	$('.reset').off();
	$('.stop').off();
	$('.cell').off();
	$('.slow').off();
	$('.medium').off();
	$('.fast').off();
};

function runIt() {
	if (running == 1) {
		setTimeout(function() {
      generation++;
			board = runGeneration();
			$(".gen").text(generation);
			setTimeout(function() {
				drawBoard();
				runIt();
			},delay);
		},0);
	}
};


function cellCheck(i) {

	let count = 0;
	let borderCell = 0;

	if (i >= 0 && i <= (width - 1)) {
		borderCell = 1;
		let dif = width - i;
		if (board[cells - dif].status == "cell alive" 
			|| board[cells - dif].status == "cell alive old") {
			count++;
		}
		if (i != 0 && (board[cells - dif - 1].status == "cell alive" 
			|| board[cells - dif - 1].status == "cell alive old")) {
			count++;
		}
		if (i != (width - 1) && (board[cells - dif + 1].status == "cell alive" 
			|| board[cells - dif + 1].status == "cell alive old")) {
			count++;
		}
		if (i != 0 && (board[i + width - 1].status == "cell alive" 
			|| board[i + width - 1].status == "cell alive old")) {
			count++;
		}
		if (board[i + width].status == "cell alive" 
			|| board[i + width].status == "cell alive old") {
			count++;
		}
		if (i != (width - 1) && (board[i + width + 1].status == "cell alive" 
			|| board[i + width + 1].status == "cell alive old")) {
			count++;
		}
		if (i != 0 && (board[i - 1].status == "cell alive" 
			|| board[i - 1].status == "cell alive old")) {
			count++;
		}
		if (i != (width - 1) && (board[i + 1].status == "cell alive" 
			|| board[i + 1].status == "cell alive old")) {
			count++;
		}
	}
	if (i >= (cells - width) && i <= (cells - 1)) {
		borderCell = 1;
		let dif = i + width - cells;
		if (board[dif].status == "cell alive" 
			|| board[dif].status == "cell alive old") {
			count++;
		}
		if (i != (cells - width) && (board[dif - 1].status == "cell alive" 
			|| board[dif - 1].status == "cell alive old")) {
			count++;
		}
		if (i != (cells - 1) && (board[dif + 1].status == "cell alive" 
			|| board[dif + 1].status == "cell alive old")) {
			count++;
		}
		if (i != (cells - width) && (board[i - width - 1].status == "cell alive" 
			|| board[i - width - 1].status == "cell alive old")) {
			count++;
		}
		if (board[i - width].status == "cell alive" 
			|| board[i - width].status == "cell alive old") {
			count++;
		}
		if (i != (cells - 1) && (board[i - width + 1].status == "cell alive" 
			|| board[i - width + 1].status == "cell alive old")) {
			count++;
		}
		if (i != (cells - width) && (board[i - 1].status == "cell alive" 
			|| board[i - 1].status == "cell alive old")) {
			count++;
		}
		if (i != (cells - 1) && (board[i + 1].status == "cell alive" 
			|| board[i + 1].status == "cell alive old")) {
			count++;
		}

	}
	
	if (((i + 1) % width) == 0) {
		borderCell = 1;
		if (board[i - width + 1].status == "cell alive" 
			|| board[i - width + 1].status == "cell alive old") {
			count++;
		}
		
		if (i != (cells - 1) && (board[i + 1].status == "cell alive" 
			|| board[i + 1].status == "cell alive old")) {
			count++;
		}
		if (i == (cells - 1) && (board[0].status == "cell alive" 
			|| board[0].status == "cell alive old")) {
			count++;
		}
		if (i > width && (board[i - (2 * width) + 1].status == "cell alive" 
			|| board[i - (2 * width) + 1].status == "cell alive old")) {
			count++;
		}
		if (i == width - 1 && (board[(cells - width)].status == "cell alive" 
			|| board[(cells - width)].status == "cell alive old")) {
			count++;
		}

		if (i != (width - 1) && i != (cells - 1) && (board[i - width].status == "cell alive" 
			|| board[i - width].status == "cell alive old")) {
			count++;
		}

		if (i != (cells - 1) && i != (width - 1) && (board[i + width].status == "cell alive" 
			|| board[i + width].status == "cell alive old")) {
			count++;
		}
		if (i != (cells - 1) && i != (width - 1) && (board[i + width - 1].status == "cell alive" 
			|| board[i + width - 1].status == "cell alive old")) {
			count++;
		}
		if (i != (cells - 1) && i != (width - 1) && (board[i - 1].status == "cell alive" 
			|| board[i - 1].status == "cell alive old")) {
			count++;
		}
		if (i != (width - 1) && i != (cells - 1) && (board[i - width - 1].status == "cell alive" 
			|| board[i - width - 1].status == "cell alive old")) {
			count++;
		}
		if (i == (width - 1) && (board[cells - width - 1].status == "cell alive" 
			|| board[cells - width - 1].status == "cell alive old")) {
			count++;
		}

	}
	if (((i) % width) == 0 || i == 0) {
		borderCell = 1;
		if (board[i + width - 1].status == "cell alive" 
			|| board[i + width - 1].status == "cell alive old") {
			count++;
		}

		if (i != (cells - width) && (board[i + (width * 2) - 1].status == "cell alive" 
			|| board[i + (width * 2) - 1].status == "cell alive old")) {
			count++;
		}
    
		if (i == (cells - width) && (board[width - 1].status == "cell alive" 
			|| board[width - 1].status == "cell alive old")) {
			count++;
		}
		
		if (i >= width && (board[i - 1].status == "cell alive" 
			|| board[i - 1].status == "cell alive old")) {
			count++;
		}

		if (i == 0 && (board[cells - 1].status == "cell alive" 
			|| board[cells - 1].status == "cell alive old")) {
			count++;
		}

		if (i != (width + 1) && i != (cells - width) && i != 0 && (board[i - width].status == "cell alive" 
			|| board[i - width].status == "cell alive old")) {
			count++;
		}
		
		if (i < (cells - width) && i != 0 && (board[i + width].status == "cell alive" 
			|| board[i + width].status == "cell alive old")) {
			count++;
		}

		if (i != 0 && i != (cells - width) && (board[i - width + 1].status == "cell alive" 
			|| board[i - width + 1].status == "cell alive old")) {
			count++;
		}
		
		if (i != 0 && i != (cells - width) && (board[i + 1].status == "cell alive" 
			|| board[i + 1].status == "cell alive old")) {
			count++;
		}
		
		if (i < (cells - width) && i != 0) {
			if (board[i + width + 1].status == "cell alive" 
				|| board[i + width + 1].status == "cell alive old") {
				count++;
			}
		} 

	}

	if (borderCell == 0) {
		if (board[i - width].status == "cell alive" 
			|| board[i - width].status == "cell alive old") {
			count++;
		}
		if (board[i - width - 1].status == "cell alive" 
			|| board[i - width - 1].status == "cell alive old") {
			count++;
		}
		if (board[i - width + 1].status == "cell alive" 
			|| board[i - width + 1].status == "cell alive old") {
			count++;
		}
		if (board[i - 1].status == "cell alive" 
			|| board[i - 1].status == "cell alive old") {
			count++;
		}
		if (board[i + 1].status == "cell alive" 
			|| board[i + 1].status == "cell alive old") {
			count++;
		}
		if (board[i + width].status == "cell alive" 
			|| board[i + width].status == "cell alive old") {
			count++;
		}
		if (board[i + width - 1].status == "cell alive" 
			|| board[i + width - 1].status == "cell alive old") {
			count++;
		}
		if (board[i + width + 1].status == "cell alive" 
			|| board[i + width + 1].status == "cell alive old") {
			count++;
		}
	}
	return count;
};

function initialSet() {
  
	for (let i = 0; i < cells; i++) {
		let schrodingersCell = Math.floor(Math.random() * 2);
		if (schrodingersCell === 0) {
			board[i] = {id: i, status: "cell alive old"};
		} else {
			board[i] = {id: i, status: "cell dead"};
		}
	}
};










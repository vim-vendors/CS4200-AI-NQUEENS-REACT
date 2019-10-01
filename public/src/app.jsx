import React from 'react';
import ReactDOM from 'react-dom';
import Chessboard from "chessboardjsx";
import 'normalize.css/normalize.css';
import './styles/styles.scss';

const n = 8 ;
var count = 0;
var col = new Array(n);
//used to store once a solution has been reached
var solution = new Array(n);
//used to store an array of solutions
var solutions = [];

function promising(row) {
    for (let i = 0; i < row; i++) {
        if (col[row] === col[i] || Math.abs(col[row] - col[i]) === row - i) {
            return false;
        }
    }
    return true;
}

function queens(n, row) {
    if (row == n) {      
        count += 1;
        console.log('Solution No. ' + count )
        for (let i = 0; i < n; i++) {	
            for (let j = 0; j < n; j++) {
            	if (j === col[i]){
       		  		solution[i] = j;
            	}
            }
            console.log('\n');
            //pushing finished solution to solutions array
            let temp = [];
            for(let x = 0; x < solution.length; x++){
                if (solution[x] !== undefined){
                    temp.push(solution[x]);
                }
            }
            if (temp.length === n){
                solutions.push(temp);
                solution = [];
            }
        }

    } else {
        for (let i = 0; i < n; i++) {
            col[row] = i;
            if (promising(row)) {
                queens(n, (row + 1));
            }
        }
    }
}

queens(n, 0, col);

//at this point solutions has an array filled with solution states and can be fed to react
// for(let x = 0; x < solutions.length; x++){
//     console.log(solutions[x]);
// }

const alphas = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
const betas = [8,7,6,5,4,3,2,1];
let queen_positions = [];
//need to create a react component that changes chessboard state based on arrays 
for(let x = 0; x < solutions.length; x++){
	var positions = new Object();
	let temp_str = "";
	for (let y=0; y < solutions[0].length; y++){
		 temp_str += "\"" + alphas[solutions[x][y]] + betas[y] +  "\"" + ": \"bQ\" , ";		
	}
	temp_str = temp_str.slice(0, -3); 
	temp_str = '{ ' + temp_str + ' }'
	var obj = JSON.parse(temp_str);
    queen_positions.push(obj);
    
}

class Interval extends React.Component {
          constructor(props) {
            super(props);
            this.state = { seconds: 0, index: 0 };
          }

          tick() {
            this.setState(prevState => ({
              seconds: prevState.seconds + 1
            }));
          }

          componentDidMount() {
            this.interval = setInterval(() => this.tick(), 3000);
          }

          componentWillUnmount() {
            clearInterval(this.interval);
          }

          render() {
            return (
              <div>
                <Chessboard position={queen_positions[this.state.index++]} />
              </div>
            );
          }

}



ReactDOM.render(<Interval />, document.getElementById('app'));




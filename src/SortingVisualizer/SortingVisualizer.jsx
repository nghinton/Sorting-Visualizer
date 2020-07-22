import React from 'react';
import $ from 'jquery';
import {getMergeSortAnimations} from '../SortingAlgorithms/sortingAlgorithms.js';
import {getQuickSortAnimations} from '../SortingAlgorithms/sortingAlgorithms.js';
import {getHeapSortAnimations} from '../SortingAlgorithms/sortingAlgorithms.js';
import {getBubbleSortAnimations} from '../SortingAlgorithms/sortingAlgorithms.js';
import './SortingVisualizer.css';

// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 1;

// This is the main color of the array bars.
const PRIMARY_COLOR = 'white';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'red';

// Change this value for the number of bars (value) in the array.
const NUMBER_OF_ARRAY_BARS = Math.floor((($(window).innerWidth()-20) / 3) * 0.5);

// Change this value for the height (height) of the bars in the array
const HEIGHT_OF_ARRAY_BARS = Math.floor($(window).innerHeight());

export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      algorithm: 0,         // 0 = Merge Sort
                            // 1 = Heap Sort
                            // 2 = Quick Sort
                            // 3 = Bubble Sort
      default: '#333',
      colors: [
        "#4caf50",          // Green
        "#008cba",          // Blue
        "#f44336",          // Red
        "#ff4fa2"           // Pink
      ],
      array: []
    };

  }

  componentDidMount() {
    this.resetArray();
  }

  resetArray() {
    const array = [];
    for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
      var value = Math.floor((HEIGHT_OF_ARRAY_BARS - 5) / NUMBER_OF_ARRAY_BARS) * i + 5;
      array.push(value);
    }
    this.setState({array: array});
  }

  setMergeSort() {
    this.setState({ algorithm: 0});
    const buttons = document.getElementsByTagName('button');
    buttons[1].style.backgroundColor = this.state.colors[0];
    buttons[2].style.backgroundColor = this.state.default;
    buttons[3].style.backgroundColor = this.state.default;
    buttons[4].style.backgroundColor = this.state.default;
  }

  setQuickSort() {
    this.setState({ algorithm: 1});
    const buttons = document.getElementsByTagName('button');
    buttons[1].style.backgroundColor = this.state.default;
    buttons[2].style.backgroundColor = this.state.colors[1];
    buttons[3].style.backgroundColor = this.state.default;
    buttons[4].style.backgroundColor = this.state.default;
  }

  setHeapSort() {
    this.setState({ algorithm: 2});
    const buttons = document.getElementsByTagName('button');
    buttons[1].style.backgroundColor = this.state.default;
    buttons[2].style.backgroundColor = this.state.default;
    buttons[3].style.backgroundColor = this.state.colors[2];
    buttons[4].style.backgroundColor = this.state.default;
  }

  setBubbleSort() {
    this.setState({ algorithm: 3});
    const buttons = document.getElementsByTagName('button');
    buttons[1].style.backgroundColor = this.state.default;
    buttons[2].style.backgroundColor = this.state.default;
    buttons[3].style.backgroundColor = this.state.default;
    buttons[4].style.backgroundColor = this.state.colors[3];
  }

  shuffleArray() {
    const array = this.state.array;
    for (let i = 0; i < NUMBER_OF_ARRAY_BARS; ++i) {
      var x = randomIntFromInterval(0, NUMBER_OF_ARRAY_BARS-1);
      var y = randomIntFromInterval(0, NUMBER_OF_ARRAY_BARS-1);
      this.swapValues(array, x, y)
    }
    this.setState({array});
    console.log(this.state.array);
  }

  swapValues(array, x, y) {
    let temp = array[x];
    array[x] = array[y];
    array[y] = temp;
  }

  sortArray() {
    const algorithm = this.state.algorithm;
    switch (algorithm) {
      case(0) :
        this.mergeSort();
        break;
      case(1) :
        this.quickSort();
        break;
      case(2) :
        this.heapSort();
        break;
      case(3) :
        this.bubbleSort();
        break;
      default :
        this.mergeSort();
        break;
    }
  }

  mergeSort() {
    const animations = getMergeSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
    console.log(this.state.array);
  }

  quickSort() {
    const animations = getQuickSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      console.log(animations[i]);
    }
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const [barOneIdx, barTwoIdx, oldBarOneHeight, oldBarTwoHeight, type] = animations[i];
      if (type === 0) {
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = SECONDARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else if (type === 1) {
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        setTimeout(() => {
          barOneStyle.height = `${oldBarTwoHeight}px`;
          barTwoStyle.height = `${oldBarOneHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
    console.log(this.state.array);
  }

  heapSort() {
    const animations = getHeapSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const [barOneIdx, barTwoIdx, oldBarOneHeight, oldBarTwoHeight, type] = animations[i];
      if (type === 0) {
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = SECONDARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else if (type === 1) {
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        setTimeout(() => {
          barOneStyle.height = `${oldBarTwoHeight}px`;
          barTwoStyle.height = `${oldBarOneHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
    console.log(this.state.array);
  }

  bubbleSort() {
    const animations = getBubbleSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const [barOneIdx, barTwoIdx, oldBarOneHeight, oldBarTwoHeight, type] = animations[i];
      if (type === 0) {
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = SECONDARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else if (type === 1) {
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        setTimeout(() => {
          barOneStyle.height = `${oldBarTwoHeight}px`;
          barTwoStyle.height = `${oldBarOneHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
    console.log(this.state.array);
  }

  render() {
    const {array} = this.state;

    return (
      <div className="app-container">

        <div className="navbar">
          <div className="shuffle">
            <p>Shuffle the array!</p>
            <button onClick={() => this.shuffleArray()}>Shuffle Array</button>
          </div>
          <div className="algorithms">
            <p>Sorting Algorithms: </p>
            <div className="sortingButtons">
              <button style={{ backgroundColor: this.state.colors[0]
                            }} className="button1" onClick={() => this.setMergeSort()}>Merge Sort</button>
              <button style={{ backgroundColor: this.state.default
                            }} className="button2" onClick={() => this.setQuickSort()}>Quick Sort</button>
              <button style={{ backgroundColor: this.state.default
                            }} className="button3" onClick={() => this.setHeapSort()}>Heap Sort</button>
              <button style={{ backgroundColor: this.state.default
                            }} className="button4" onClick={() => this.setBubbleSort()}>Bubble Sort</button>
            </div>
          </div>
          <div className="sort">
            <p>Sort the array!</p>
            <button onClick={() => this.sortArray()}>Sort Array</button>
          </div>
        </div>

        <div className="array-container">
          {array.map((value, idx) => (
            <div
              className="array-bar"
              key={idx}
              style={{
                backgroundColor: PRIMARY_COLOR,
                height: `${value}px`,
              }}></div>
          ))}
        </div>

      </div>
      
    );

  }
}

// From https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

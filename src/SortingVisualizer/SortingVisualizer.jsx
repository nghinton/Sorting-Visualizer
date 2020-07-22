import React from 'react';
import $ from 'jquery';
import {getMergeSortAnimations} from '../SortingAlgorithms/sortingAlgorithms.js';
import {getQuickSortAnimations} from '../SortingAlgorithms/sortingAlgorithms.js';
import {getHeapSortAnimations} from '../SortingAlgorithms/sortingAlgorithms.js';
import {getBubbleSortAnimations} from '../SortingAlgorithms/sortingAlgorithms.js';
import './SortingVisualizer.css';

// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 5;

// This is the main color of the array bars.
const PRIMARY_COLOR = 'white';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'red';

// Change this value for the number of bars (value) in the array.
const NUMBER_OF_ARRAY_BARS = 100; //Math.floor((($(window).innerWidth()-20) / 3) * 0.5);

// Change this value for the height (height) of the bars in the array
const HEIGHT_OF_ARRAY_BARS = Math.floor($(window).innerHeight() * 0.8);

export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showMenu: false,
      text: 'Algorithms',
      algorithm: 0,         // 0 = Merge Sort
                            // 1 = Heap Sort
                            // 2 = Quick Sort
                            // 3 = Bubble Sort
      array: [],
    };

    this.showMenu = this.showMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
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

  showMenu() {
    this.setState({ showMenu: true }, () => {
      document.addEventListener('click', this.closeMenu);
    });
  }
  
  closeMenu() {
    this.setState({ showMenu: false }, () => {
      document.removeEventListener('click', this.closeMenu);
    });
  }

  setMergeSort() {
    this.setState({ algorithm: 0});
    this.setState({ text: 'Merge Sort' })
    this.closeMenu();
  }

  setHeapSort() {
    this.setState({ algorithm: 1});
    this.setState({ text: 'Heap Sort' })
    this.closeMenu();
  }

  setQuickSort() {
    this.setState({ algorithm: 2});
    this.setState({ text: 'Quick Sort' })
    this.closeMenu();
  }

  setBubbleSort() {
    this.setState({ algorithm: 3});
    this.setState({ text: 'Bubble Sort' })
    this.closeMenu();
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
        this.heapSort();
        break;
      case(2) :
        this.quickSort();
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
    console.log(animations.length);
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

  render() {
    const {array} = this.state;
    const {text} = this.state;

    return (
      <div className="app-container">

        <div className="navbar">
          <button onClick={() => this.shuffleArray()}>Shuffle Array</button>
            <button className="dropbtn" onClick={() => this.showMenu()}>{text}</button> {
            this.state.showMenu ? (
              <div className="dropdown-content" id="myDropdown">
                <button onClick={() => this.setMergeSort()}>Merge Sort</button>
                <button onClick={() => this.setQuickSort()}>Quick Sort</button>
                <button onClick={() => this.setHeapSort()}>Heap Sort</button>
                <button onClick={() => this.setBubbleSort()}>Bubble Sort</button>
              </div>
            ) : (
              null
            )
            }
          <button onClick={() => this.sortArray()}>Sort Array</button>
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

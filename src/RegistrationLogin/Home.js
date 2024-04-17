import React from 'react';
import nurseryImage from './nurseryimg.jpg';
import Logo from './Logo.png';
import { Link } from 'react-router-dom';
import Header from '../Header';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayText: '',
      fullText: 'Welcome to Shree Samarth Nursery...!'
    };
  }

  componentDidMount() {
    this.animateText();
  }

  animateText = () => {
    const { fullText } = this.state;
    let i = 0;
    const intervalId = setInterval(() => {
      if (i <= fullText.length) {
        this.setState({ displayText: fullText.slice(0, i) });
        i++;
      } else {
        clearInterval(intervalId);
      }
    }, 200); 
  }

  render() {
    const { displayText } = this.state;
    return (
    
      <div className="fixed top-0 left-0 w-full h-full overflow-y-auto flex flex-col">
        
       
        <div className="absolute inset-0 overflow-hidden">
          <img
            className="object-cover w-full h-full"
            src={nurseryImage}
            alt="Nursery Trees"
          />
        </div>
        
        <div className="absolute inset-0 bg-black opacity-25"></div>
       
        <div className="relative z-10 flex flex-col items-center justify-center h-full">
          <h1 className="text-4xl font-bold text-white mb-8" style={{ backgroundImage: 'linear-gradient(to right, purple, red)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{displayText}</h1>
          <div className="flex space-x-4">
            <Link to="/admin-login"> 
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
                Login as Admin
              </button>
            </Link>
            <Link to="/employee-login"> 
              <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">
                Login as Employee
              </button>
            </Link>
          </div>
          
          <div className="absolute top-4 right-4 flex justify-center items-center bg-gradient-to-r from-blue-500 to-green-500 rounded-full w-32 h-32 bg-white">
            <img src={Logo} alt="Logo" className="w-32 h-32" />
          </div>
        </div>
      </div>
    );
  }
}

export default Home;

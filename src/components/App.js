import React from 'react';
import SearchBar from './SearchBar';
import Youtube from '../apis/Youtube';
import VideoList from './VideoList';
import VideoDetail from './VideoDetail';

const KEY = 'AIzaSyDtMjT23GZPX0jWH0spgpRQt8kHw5F55tI';

class App extends React.Component {

  state = {videos: [], selectedVideo: null}

  componentDidMount() {
    this.onHandleSubmit('buildings');
    
  }

onHandleSubmit = async term => {

const response = await Youtube.get(  '/search' ,{
  params: {
    q: term,
    part: 'snippet',
    type: 'video',
    maxResults: 5,
    key: KEY
  } 
});

this.setState({
  videos: response.data.items,
  selectedVideo: response.data.items[0]
});
  
}

onVideoSelect = (video) => {
  this.setState({selectedVideo: video})
}


  render() {
    return (
      <div className="ui container">
        <SearchBar onSubmit={this.onHandleSubmit} />
        <div className="ui grid">
            <div className="ui row">
                <div className="eleven wide column">
                  <VideoDetail video={this.state.selectedVideo} />
                </div>
                <div className="five wide column">
                <VideoList onVideoSelect={this.onVideoSelect} videos={this.state.videos} />
                </div>
                
            </div>
          </div>
      </div>
      );
  }
 
}

export default App;

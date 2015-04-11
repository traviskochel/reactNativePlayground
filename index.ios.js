/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var REQUEST_URL = 'https://raw.githubusercontent.com/facebook/react-native/master/docs/MoviesExample.json';

var MOCKED_MOVIES_DATA = [
  {title: 'Title', year: '2015', posters: {thumbnail: 'http://i.imgur.com/UePbdph.jpg'}},
  {title: '2001: A Space Odyssey', year: '1968', posters: {thumbnail: 'http://i.imgur.com/UePbdph.jpg'}},
];

var React = require('react-native');
var {
  AppRegistry,
  Image,
  ListView,
  StyleSheet,
  Text,
  TextInput,
  View,
} = React;


var reactNativePlayground = React.createClass({
  getInitialState: function() {
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
    };
  },
  fetchData: function() {
    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData.movies),
          loaded: true,
        });
      })
      .done();
  },
  componentDidMount: function() {
    this.fetchData();
  },
  updateTitle: function(event) {
    this.setState({
      title: 'ddddd'
    });
  },
  curTitle: function(movie){
    var title = this.props.title;
    if (title == '') {
      title = movie.title
    }
    return title;
  },
  render: function() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderMovie}
        style={styles.listView}
      />
    );
  },

  renderLoadingView: function() {
    return (
      <View style={styles.container}>
        <Text>
          Loading movies...
        </Text>
      </View>
    );
  },

  renderMovie: function(movie) {
    return (
      <MovieRow movie={movie} key={movie.title} />
    );
  },

});

var MovieRow = React.createClass({
   getInitialState: function() {
    return {
      title: ''
    };
  },
  updateTitle: function(text){
    this.setState({title: text});
  },
  curTitle: function(){
    var title = this.state.title;
    if (title == '' ) {
      title = this.props.movie.title;
    }
    return title;
  },
  render: function(){
    return (
      <View style={styles.container}>
        <Image
          source={{uri: this.props.movie.posters.thumbnail}}
          style={styles.thumbnail}
        />
        <View style={styles.rightContainer}>
          <Text style={styles.title}>{this.curTitle()}</Text>
          <Text style={styles.year}>{this.props.movie.year}</Text>
          <TextInput style={styles.textInput} onChangeText={this.updateTitle} />
        </View>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EEE',
    borderBottomWidth: 1,
    borderColor: '#DDD'
  },
  rightContainer: {
    flex: 1,
    margin: 10,
  },
  thumbnail: {
    width: 53,
    height: 81,
    margin: 10,
    marginRight: 0,
  },
  title: {
    fontSize: 20,
    marginBottom: 3,
    textAlign: 'left',
    fontWeight: 'bold',
  },
  year: {
    textAlign: 'left',

  },
  listView: {
    paddingTop: 20,
    backgroundColor: '#F5FCFF',
  },
  textInput: {
    height: 30,
    fontSize: 14,
    paddingLeft: 10,
    paddingRight: 10, 
    borderColor: '#ccc', 
    backgroundColor: "#ddd",
    borderWidth: 1,
  },
});

AppRegistry.registerComponent('reactNativePlayground', () => reactNativePlayground);

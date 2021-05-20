import React, { Component } from 'react'
import firebase from './firebase'
import Calendar from 'react-calendar'
import './App.css'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      date: null,
      //月のデータ
      month_days: {
        20210522: { is_holiday: true },
        20210523: { text: '課題' },
        20210524: { text: '課題2' }
      }
    };
    this.getTileClass = this.getTileClass.bind(this);
    this.getTileContent = this.getTileContent.bind(this);
  }   
  

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ user })
    })   
  }

  login() {
    const provider = new firebase.auth.GoogleAuthProvider()
    firebase.auth().signInWithPopup(provider)
  }

  logout() {
    firebase.auth().signOut()
  }

   // state の日付と同じ表記に変換
   getFormatDate(date) {
    return `${date.getFullYear()}${('0' + (date.getMonth() + 1)).slice(-2)}${('0' + date.getDate()).slice(-2)}`;
  }

  //日付のクラスを付与 (祝日用)
  getTileClass({ date, view }) {
    // 月表示のときのみ
    if (view !== 'month') {
      return '';
    }
    const day = this.getFormatDate(date);
    return (this.state.month_days[day] && this.state.month_days[day].is_holiday) ?
      'holiday' : '';
  }

  //日付の内容を出力
  getTileContent({ date, view }) {
    // 月表示のときのみ
    if (view !== 'month') {
      return null;
    }
    const day = this.getFormatDate(date);
    return (
      <p>
        <br />
        {(this.state.month_days[day] && this.state.month_days[day].text) ?
          this.state.month_days[day].text : ' '
        }
      </p>
    );
  }

  render() {

        // jsonファイルの読み込み中は以下を表示
        if (this.state.loading) {
          return (<div>Now loading</div>)
        }
        
    return (

      
      <div className="App">
        <p className="App-intro">
          UID: {this.state.user && this.state.user.uid}
        </p>
        <p>
        ユーザーネーム：{this.state.user && this.state.user.displayName}
        </p>

        {this.state.user ? (
          <button onClick={this.logout}>Google Logout</button>
        ) : (
          <button onClick={this.login}>Google Login</button>
        )}
        <Calendar 
         locale="ja-JP"
        tileContent={this.getTileContent}
        />
      </div>
    )
  }
}
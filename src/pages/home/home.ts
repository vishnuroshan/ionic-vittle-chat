import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
// import * as figlet from 'figlet';
import { Socket } from 'ng-socket-io';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  public roomName: string;
  public message = 'vishnu';
  public messages = [];
  constructor(private socket: Socket, public navCtrl: NavController) {
    this.getMessages().subscribe(message => {
      this.messages.push(message);
    });

    this.getUsers().subscribe(data => {
      let user = data['user'];
      if (data['event'] === 'left') {
        console.log('User left: ' + user);
      } else {
        console.log('User joined: ' + user);
      }
    });
  }

  ngOnInit() {

    // this.generateFiglet('Hello');
  }

  joinChat() {
    console.log(this.roomName)
    this.socket.connect();
    this.socket.emit('set-roomName', this.roomName);

    // this.navCtrl.push('ChatRoomPage', { nickname: this.roomName });
  }

  sendMessage() {
    this.socket.emit('add-message', { text: this.message });
  }

  getMessages() {
    let observable = new Observable(observer => {
      this.socket.on('message', (data) => {
        observer.next(data);
      });
    })
    return observable;
  }

  getUsers() {
    let observable = new Observable(observer => {
      this.socket.on('users-changed', (data) => {
        observer.next(data);
      });
    });
    return observable;
  }

  ionViewWillLeave() {
    this.socket.disconnect();
  }



}

import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
// import * as figlet from 'figlet';
import { Socket } from 'ng-socket-io';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  public roomName: string;
  constructor(private socket: Socket, public navCtrl: NavController) {
  }

  ngOnInit() {
    // this.generateFiglet('Hello');
  }

  // generateFiglet(text): any {
  //   figlet(text, function (err, figlet) {
  //     console.log(figlet);
  //   });
  // }

  joinChat() {
    console.log(this.roomName)
    this.socket.connect();
    this.socket.emit('set-roomName', this.roomName);
    // this.navCtrl.push('ChatRoomPage', { nickname: this.roomName });
  }


}
